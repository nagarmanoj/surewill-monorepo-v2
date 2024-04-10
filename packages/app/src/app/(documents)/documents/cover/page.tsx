import { Logo } from "./Logo";

const SurewillLink = () => (
  <a href="https://surewill.com.au" target="_blank" rel="noopener noreferrer">
    <span className="font-semibold">surewill</span>.com.au
  </a>
);

export default function CoverPage({
  searchParams,
}: {
  searchParams: {
    name: string;
  };
}) {
  return (
    <div className="text-center">
      <div className="mb-36 mt-44 flex justify-center">
        <Logo size="lg" />
      </div>
      <h1 className="mb-72 text-5xl font-semibold leading-relaxed">
        Last Will and Testament of {searchParams.name}
      </h1>
      <p className="mb-8">
        Surewill is a tech platform that enables you to make your Will. We do
        not give legal advice. Our platform suits people with simple estate
        planning needs. If your needs are more complicated or contentious, we
        suggest you seek legal advice.
      </p>
      <div className="text-xl">
        <SurewillLink />
      </div>
    </div>
  );
}
