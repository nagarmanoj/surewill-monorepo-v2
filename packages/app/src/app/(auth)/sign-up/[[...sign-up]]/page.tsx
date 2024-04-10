import { SignUpForm } from "~/components/SignUp";

export default function SignUpPage() {
  return (
    <div className="container mb-auto flex flex-col justify-center sm:w-[calc(440px+4rem)]">
      <div>
        <h2 className="mb-6 w-full self-start text-center text-xl font-semibold">
          Create your free account.
        </h2>
      </div>
      <SignUpForm />
    </div>
  );
}
