import { Download, Printer, Edit } from "lucide-react";

export function NextSteps() {
  return (
    <div className="mb-10">
      <h3 className="mb-2 text-2xl font-semibold">Next Steps</h3>
      <p className="mb-2 text-brand-gray">
        Please follow the instructions to make this Will legally binding:
      </p>
      <ul>
        <li className="mb-2 flex items-center font-semibold">
          <Download className="text-brand-green" />{" "}
          <span className="ml-2 text-brand-purple">Download</span>
        </li>
        <li className="mb-2 flex items-center font-semibold">
          <Printer className="text-brand-green" />{" "}
          <span className="ml-2 text-brand-purple">Print</span>
        </li>
        <li className="mb-2 flex items-center font-semibold">
          <Edit className="text-brand-green" />{" "}
          <span className="ml-2 text-brand-purple">Sign</span>
        </li>
      </ul>
    </div>
  );
}
