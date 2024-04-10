import { schema } from "./index";

export function PaymentOptions({ paymentColumn }: typeof schema._type) {
  return (
    <div className="md:max-w-[250px]">
      {paymentColumn?.title && <p className="mb-4">{paymentColumn?.title}</p>}
      <div className="flex flex-wrap w-full items-center justify-start gap-x-2.5 gap-y-[30px]">
        {paymentColumn?.payments?.map((payment) => (
          <div key={payment?.url}>
            <img
              className="max-h-6"
              src={payment?.url || "/"}
              alt={payment?.alt || ""}
              // width="40"
              // height="30"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
