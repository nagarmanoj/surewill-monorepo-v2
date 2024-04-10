import { getWillOwnerName, type Will } from "../utils";

const SignatureSection = ({ witnessNumber }: { witnessNumber: number }) => (
  <div className="grid grid-cols-2 grid-rows-5 w-[550px] gap-6">
    <div>
      <span className="font-semibold">Witness {witnessNumber}</span> signature:
    </div>
    <div className="border-b-2 border-dotted border-black pb-1" />
    <div>Full name:</div>
    <div className="border-b-2 border-dotted border-black pb-1" />
    <div>Occupation:</div>
    <div className="border-b-2 border-dotted border-black pb-1" />
    <div>Address:</div>
    <div className="border-b-2 border-dotted border-black pb-1" />
    <div>Date:</div>
    <div className="border-b-2 border-dotted border-black pb-1" />
  </div>
);

type Props = {
  will: Will;
};

export function SignaturePage({ will }: Props) {
  return (
    <>
      <div className="break-after-page" />
      <div>
        <div className="mb-20">
          <p className="py-6">
            DATED ......... day of the month
            ..................................... In the year
            .......................
          </p>
          <p>
            The testator, {getWillOwnerName(will)}, signed in the presence of
            both of us being present at the same time, and we attested the
            testator&apos;s signature in the presence of the testator and each
            other.
          </p>
        </div>
        <div className="flex justify-end mb-20">
          <div>
            <div className="border-b-2 border-dotted border-black pb-1 w-[275px] mb-1" />
            <div className="text-end">
              <span className="font-semibold">Testator</span>,{" "}
              {getWillOwnerName(will)}
            </div>
          </div>
        </div>
        <div className="mb-20">
          <SignatureSection witnessNumber={1} />
        </div>
        <SignatureSection witnessNumber={2} />
      </div>
    </>
  );
}
