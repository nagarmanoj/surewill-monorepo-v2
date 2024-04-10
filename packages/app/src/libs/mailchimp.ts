import mailchimpFactory, {
  MessageAttachment,
  MessagesMessage,
} from "@mailchimp/mailchimp_transactional";
import { env } from "@/env.mjs";
import { getWillDocumentName } from "~/utils/will";

export const mailchimp = mailchimpFactory(env.MANDRILL_API_KEY);

export const sendTemplate = async ({
  templateName,
  toEmail,
  content,
  attachments = [],
  messageArgs = {},
}: {
  templateName: string;
  toEmail: string;
  content: Array<{ name: string; content: string }>;
  attachments?: MessageAttachment[];
  messageArgs?: Partial<MessagesMessage>;
}) => {
  const result = await mailchimp.messages.sendTemplate({
    template_name: templateName,
    template_content: [],
    message: {
      to: [{ email: toEmail }],
      merge: true,
      merge_language: "handlebars",
      global_merge_vars: content,
      attachments,
      ...messageArgs,
    },
  });
  if (Array.isArray(result) && result[0].status === "rejected") {
    console.log(result);
    throw new Error(`Email was not sent, ${toEmail}`);
  }
};

export const sendWillCreatedWillOwnerEmail = ({
  toEmail,
  willOwnerFirstName,
  willOwnerLastName,
  willAttachment,
  isWillUpdate,
}: {
  toEmail: string;
  willOwnerFirstName: string;
  willOwnerLastName: string;
  willAttachment: string;
  isWillUpdate: boolean;
}) => {
  const fileName = getWillDocumentName({
    firstName: willOwnerFirstName,
    lastName: willOwnerLastName,
  });
  const messageArgs = isWillUpdate
    ? {}
    : {
        bcc_address: "surewill.com.au+e542fcc522@invite.trustpilot.com",
      };
  return sendTemplate({
    templateName: isWillUpdate
      ? env.EMAIL_TEMPLATE_SLUG_OWNER_WILL_UPDATED
      : env.EMAIL_TEMPLATE_SLUG_OWNER_WILL_CREATED,
    toEmail,
    messageArgs,
    content: [
      {
        name: "firstName",
        content: willOwnerFirstName,
      },
    ],
    attachments: [
      {
        name: fileName,
        content: willAttachment,
        type: "application/pdf",
      },
    ],
  });
};

export const sendWillCreatedWillExecutorEmail = ({
  toEmail,
  executorName,
  willOwnerName,
}: {
  toEmail: string;
  executorName: string;
  willOwnerName: string;
}) => {
  return sendTemplate({
    templateName: env.EMAIL_TEMPLATE_SLUG_EXECUTOR_WILL_CREATED,
    toEmail,
    content: [
      {
        name: "executorName",
        content: executorName,
      },
      {
        name: "willOwnerName",
        content: willOwnerName,
      },
    ],
  });
};

export const sendWillCreatedWillBackupExecutorEmail = ({
  toEmail,
  backupExecutorName,
  willOwnerName,
}: {
  toEmail: string;
  backupExecutorName: string;
  willOwnerName: string;
}) => {
  return sendTemplate({
    templateName: env.EMAIL_TEMPLATE_SLUG_BACKUP_EXECUTOR_WILL_CREATED,
    toEmail,
    content: [
      {
        name: "backupExecutorName",
        content: backupExecutorName,
      },
      {
        name: "willOwnerName",
        content: willOwnerName,
      },
    ],
  });
};
