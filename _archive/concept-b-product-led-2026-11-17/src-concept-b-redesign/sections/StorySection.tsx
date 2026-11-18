import { story } from "@/content/homepage";
import { ConfirmMark } from "../components/ConfirmMark";

/**
 * Our story: a typographic statement with three proof points separated by rules (no icon cards).
 * The founding wording is unconfirmed, so it carries an asterisk and a visible footnote. Proof points use confirmed facts only.
 */
export function StorySection() {
  return (
    <section aria-labelledby="story-title" className="bg-b-navy-deep py-b-section text-b-on-navy">
      <div className="b-container">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <h2 id="story-title" className="b-display text-b-display-1 [text-wrap:balance]">
            {story.title}
          </h2>
          <div className="grid gap-3">
            <p className="b-display text-b-display-3 font-medium italic text-b-yellow">
              <ConfirmMark fact={story.founded} />
            </p>
            <p className="max-w-[44ch] text-b-lead text-b-on-navy-2">{story.body}</p>
          </div>
        </div>
        <ul className="mt-14 grid gap-0 border-t border-b-rule-navy sm:grid-cols-3">
          {story.proofPoints.map((p) => (
            <li key={p.title} className="grid content-start gap-2 border-b border-b-rule-navy py-6 sm:border-b-0 sm:border-l sm:px-8 sm:first:border-l-0 sm:first:pl-0">
              <h3 className="b-display text-[1.5rem] font-semibold leading-tight">{p.title}</h3>
              <p className="max-w-[34ch] text-b-on-navy-2">{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-b-label text-b-on-navy-2">
          <span className="font-bold text-b-yellow">*</span> Founding wording to be confirmed: the live About page and the client reference differ.
        </p>
      </div>
    </section>
  );
}
