import { story } from "@/content/homepage";
import { PendingFact } from "../components/PendingFact";
import { SectionHeader } from "../components/SectionHeader";

/** Brand history and credibility on navy: confirmed facts only, with the founding wording held as a placeholder. */
export function StorySection() {
  return (
    <section aria-labelledby="story-title" className="bg-surface-inverse py-section text-fg-inverse">
      <div className="ds-container">
        <SectionHeader id="story-title" tone="dark" title={story.title} intro={story.body} meta={<PendingFact fact={story.founded} tone="dark" />} />
        <ul data-stagger="" className="grid gap-10 md:grid-cols-3 md:gap-0">
          {story.proofPoints.map((p, i) => (
            <li key={p.title} className={`grid content-start gap-3 border-t-2 border-brand-yellow pt-6 md:pr-10 ${i > 0 ? "md:pl-10" : ""}`}>
              <h3 className="text-lead font-semibold text-fg-inverse">{p.title}</h3>
              <p className="max-w-[34ch] text-fg-inverse-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
