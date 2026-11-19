import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/concepts/concept-b/components/auth/RegisterForm";
import { BASE } from "@/concepts/concept-b/base";

export const metadata: Metadata = { title: "Create an account" };

/**
 * Registration, laid out like the current site: a centred page title, then one card with a "New customers" heading,
 * a short line pointing existing customers to sign in, and the form. The card is wide enough (40rem) for the three
 * customer-type options to share one row.
 */
export default function RegisterPage() {
  return (
    <div className="ds-container py-10 lg:py-14">
      <h1 className="text-center text-h1">Create an account</h1>
      <section aria-labelledby="new-customers-title" className="mx-auto mt-8 max-w-[40rem] rounded-lg border border-line bg-surface p-6 shadow-sm sm:p-8">
        <h2 id="new-customers-title" className="border-b border-line pb-4 text-h4">
          New customers
        </h2>
        <p className="mb-6 mt-4 text-body-sm text-fg-secondary">
          Create your Silvi account to manage orders and save your details. If you already have an account,{" "}
          <Link href={`${BASE}/account/login`} className="font-semibold">
            sign in with your email address
          </Link>
          .
        </p>
        <RegisterForm />
      </section>
    </div>
  );
}
