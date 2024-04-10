import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";
import type { Will, Prisma } from "@prisma/client";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import PDFMerger from "pdf-merger-js";
import { surewillAppUrl, awsAccessKey, awsSecretKey } from "../env";
import { prisma } from "../libs/prisma";

const client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
});

export const getWillOwnerName = (will: Will) => {
  if (will?.middleName) {
    return `${will.firstName} ${will.middleName} ${will.lastName}`;
  }
  return `${will.firstName} ${will.lastName}`;
};

const getWillPageUrl = (willId: string, generationKey: string) => {
  return `${surewillAppUrl}/documents/${willId}?key=${generationKey}`;
};

export const generateAndUploadWill = async (will: Will) => {
  let browser;
  const coverPageTempFilePath = `/tmp/${will.id}-cover.pdf`;
  const willTempFilePath = `/tmp/${will.id}-will.pdf`;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      ignoreHTTPSErrors: true,
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
    });
    const page = await browser.newPage();

    const willOwnerName = getWillOwnerName(will);
    const coverPageUrl = `${surewillAppUrl}/documents/cover?name=${willOwnerName}`;
    console.log(`Navigating to Will Cover Page ${coverPageUrl}...`);
    await page.goto(coverPageUrl);
    await page.pdf({
      path: coverPageTempFilePath,
      pageRanges: "1",
      printBackground: true,
      format: "A4",
      margin: {
        top: "60px",
        left: "30px",
        right: "30px",
      },
    });
    console.log("Cover Page saved as PDF");

    const willPageUrl = getWillPageUrl(will.id, will.generationKey);
    console.log(`Navigating to Will Document Page ${willPageUrl}...`);
    await page.goto(willPageUrl);

    const templatesDirectory = path.join(process.cwd(), "templates");
    const templateHeader = fs.readFileSync(
      templatesDirectory + "/header.html",
      "utf8"
    );
    const templateFooter = fs.readFileSync(
      templatesDirectory + "/footer.html",
      "utf8"
    );
    const footerWithName = templateFooter.replace("{{name}}", willOwnerName);

    await page.pdf({
      path: willTempFilePath,
      displayHeaderFooter: true,
      headerTemplate: templateHeader,
      footerTemplate: footerWithName,
      printBackground: true,
      format: "A4",
      margin: {
        top: "100px",
        bottom: "120px",
        left: "40px",
        right: "40px",
      },
    });
    console.log("Will Document Page saved as PDF.");

    console.log("Starting merging of PDFs...");
    const pdfMerger = new PDFMerger();
    await pdfMerger.add(`${templatesDirectory}/instructions.pdf`);
    await pdfMerger.add(coverPageTempFilePath);
    await pdfMerger.add(willTempFilePath);
    await pdfMerger.save(`/tmp/${will.id}-will-final.pdf`);
    console.log("Merging finished.");

    console.log("Uploading to S3...");
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${will.id}/will.pdf`,
      Body: fs.createReadStream(`/tmp/${will.id}-will-final.pdf`),
      ContentType: "application/pdf",
    });
    const response = await client.send(command);
    console.log(response);
    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error(
        `File upload failed with status ${response.$metadata.httpStatusCode}`
      );
    }
    console.log("Upload complete.");
  } finally {
    console.log("Closing browser...");
    await browser?.close();
    console.log("Browser closed.");
    console.log("Removing tmp files...");
    fs.rmSync(coverPageTempFilePath, {
      force: true,
    });
    fs.rmSync(willTempFilePath, {
      force: true,
    });
    fs.rmSync(`/tmp/${will.id}-will-final.pdf`, {
      force: true,
    });
    console.log("Files removed.");
  }
};

export const updateWillGenerationValues = async (will: Will) => {
  const now = new Date();
  const willUpdateData: Prisma.WillUpdateInput = will.firstGeneratedAt
    ? {
        lastGeneratedAt: now,
      }
    : {
        firstGeneratedAt: now,
        lastGeneratedAt: now,
      };
  return prisma.will.update({
    where: {
      id: will.id,
    },
    data: willUpdateData,
  });
};
