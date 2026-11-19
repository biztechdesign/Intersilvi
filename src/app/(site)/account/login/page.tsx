import type { Metadata } from "next";
import { ButtonLink } from "@/design-system";
import { LoginForm } from "@/concepts/concept-b/components/auth/LoginForm";
import { AUTH_ROUTES } from "@/lib/auth/config";
import { BASE } from "@/concepts/concept-b/base";

export const metadata: Metadata = { title: "Sign in" };

/**
 * Customer login. Two columns on desktop: the returning-customer form (primary, a raised white card) and a quieter
 * new-customer panel. They stack below 1024px with the form first. Social sign-in is not offered because no provider is connected.
 */
export default function LoginPage() {
  return (
    <div className="ds-container py-10 lg:py-14">
      <div className="mx-auto grid max-w-[62rem] items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        <section aria-labelledby="login-title" className="rounded-lg border border-line bg-surface p-6 shadow-sm sm:p-8">
          <h1 id="login-title" className="text-h2">
            Welcome back
          </h1>
          <p className="mb-6 mt-2 text-body text-fg-secondary">Sign in to your account to view orders and manage your details.</p>
          <LoginForm />
        </section>

        <aside aria-labelledby="new-title" className="rounded-lg bg-surface-alt p-6 sm:p-8">
          <h2 id="new-title" className="text-h4">
            New to Silvi?
          </h2>
          <p className="mb-6 mt-2 text-body text-fg-secondary">Create an account to manage your details, view your orders and make future purchases easier.</p>
          <ButtonLink href={`${BASE}${AUTH_ROUTES.register}`} variant="outline" block>
            Create an account
          </ButtonLink>
        </aside>
      </div>
    </div>
  );
}
