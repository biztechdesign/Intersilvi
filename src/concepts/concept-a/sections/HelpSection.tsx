import { help, newsletter } from "@/content/homepage";
import { contact, openingHours } from "@/content/site";
import { Icon } from "../components/Icon";
import { NewsletterForm } from "../components/NewsletterForm";
import { PendingFact } from "../components/PendingFact";

/** Customer support (confirmed phone, email and address) next to the newsletter sign-up. */
export function HelpSection() {
  const channel =
    "inline-flex min-h-12 max-w-full items-center gap-4 text-h3 font-semibold underline decoration-line-strong decoration-1 underline-offset-[0.25em] hover:decoration-brand-yellow hover:decoration-[3px] [overflow-wrap:anywhere]";
  return (
    <section id="help" aria-labelledby="help-title" className="bg-surface py-section">
      <div className="ds-container grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div data-stagger="" className="grid content-start gap-5">
          <h2 id="help-title" className="text-h2 max-w-heading">
            {help.title}
          </h2>
          <p className="text-lead max-w-lead text-fg-secondary">{help.body}</p>
          <ul className="mt-2 grid gap-2">
            <li>
              <a href={contact.phoneHref} className={channel}>
                <Icon name="phone" size={26} className="flex-none text-brand-navy" />
                <span className="tabular">{contact.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={channel}>
                <Icon name="mail" size={26} className="flex-none text-brand-navy" />
                <span>{contact.email}</span>
              </a>
            </li>
          </ul>
          <p className="text-body-sm text-fg-secondary">
            Opening hours: <PendingFact fact={openingHours} render={(v) => v.join(", ")} />
          </p>
        </div>
        <div data-reveal="" className="grid content-start gap-4 rounded-md bg-surface-alt p-6 sm:p-10">
          <h2 className="text-h3 font-bold">{newsletter.title}</h2>
          <p className="max-w-[44ch] text-fg-secondary">{newsletter.body}</p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
