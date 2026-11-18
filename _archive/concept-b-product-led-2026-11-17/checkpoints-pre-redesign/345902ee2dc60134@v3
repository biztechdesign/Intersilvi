import { help, newsletter } from "@/content/homepage";
import { contact, openingHours } from "@/content/site";
import { Icon } from "../components/Icon";
import { NewsletterForm } from "../components/NewsletterForm";
import { PendingFact } from "../components/PendingFact";

/** Customer support (confirmed phone, email) beside the newsletter, on one flat ground: no boxes inside boxes. */
export function HelpSection() {
  const channel =
    "inline-flex min-h-12 max-w-full items-center gap-3 text-b-display-3 font-semibold underline decoration-b-rule-strong decoration-1 underline-offset-[0.25em] hover:decoration-b-yellow hover:decoration-[3px] [overflow-wrap:anywhere]";
  return (
    <section id="help" aria-labelledby="help-title" className="scroll-mt-24 bg-b-linen py-b-section">
      <div className="b-container grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
        <div className="grid content-start gap-4">
          <h2 id="help-title" className="b-h2 max-w-[16ch]">
            {help.title}
          </h2>
          <p className="b-lead text-b-ink-2">{help.body}</p>
          <ul className="mt-2 grid gap-1">
            <li>
              <a href={contact.phoneHref} className={channel}>
                <Icon name="phone" size={26} className="flex-none text-b-navy" />
                <span className="tabular">{contact.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={channel}>
                <Icon name="mail" size={26} className="flex-none text-b-navy" />
                <span>{contact.email}</span>
              </a>
            </li>
          </ul>
          <p className="text-b-small text-b-ink-2">
            Opening hours: <PendingFact fact={openingHours} render={(v) => v.join(", ")} />
          </p>
        </div>
        <div className="grid content-start gap-4 border-t border-b-rule-strong pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <h2 className="b-display text-b-display-3">{newsletter.title}</h2>
          <p className="max-w-[44ch] text-b-ink-2">{newsletter.body}</p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
