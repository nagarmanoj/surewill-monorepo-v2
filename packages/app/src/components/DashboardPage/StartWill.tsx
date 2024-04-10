import { WillType } from "./WillType";
import { WILL_TYPES_CONFIG } from "./config";

type Props = {
  userFirstName?: string | null;
  isEdit?: boolean;
};

export function StartWill({ userFirstName, isEdit = false }: Props) {
  const renderHeadingText = () => {
    if (isEdit) {
      return `Hi ${userFirstName}, choose a template for your Will...`;
    }
    return `Hi ${userFirstName}, let's create your Will...`;
  };
  return (
    <div className="container">
      <h2 className="mb-12 text-3xl font-semibold text-brand-purple">
        {renderHeadingText()}
      </h2>
      <h3 className="mb-2 text-2xl">
        Quickstart <span className="font-light">(5 mins)</span>
      </h3>
      <p className="mb-8 text-brand-gray">
        Choose from one of our ready-to-go templates that suit most people
      </p>
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {WILL_TYPES_CONFIG.slice(0, 3).map((willTypeConfig) => (
          <WillType key={willTypeConfig.willType} {...willTypeConfig} />
        ))}
      </div>
      <h3 className="mb-2 text-2xl">
        Detailed <span className="font-light">(15 mins)</span>
      </h3>
      <p className="mb-6 text-brand-gray">
        Answer some simple questions about who does and gets what
      </p>
      <div className="flex items-start">
        <WillType {...WILL_TYPES_CONFIG[3]} />
      </div>
    </div>
  );
}
