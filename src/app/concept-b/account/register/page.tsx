import type { Metadata } from "next";
import { RegisterForm } from "@/concepts/concept-b/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Create an account" };

/** Registration: one centred form at a comfortable reading width (not stretched across the container). */
export default function RegisterPage() {
  return (
    <div className="ds-container py-10 lg:py-14">
      <section aria-labelledby="register-title" className="mx-auto max-w-[34rem] rounded-lg border border-line bg-surface p-6 shadow-sm sm:p-8">
        <h1 id="register-title" className="text-h2">
          Create an account
        </h1>
        <p className="mb-6 mt-2 text-body text-fg-secondary">Create your Silvi account to manage orders and save your details for future purchases.</p>
        <RegisterForm />
      </section>
    </div>
  );
}
