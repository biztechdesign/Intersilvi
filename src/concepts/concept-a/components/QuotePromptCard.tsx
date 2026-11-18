import { quotePrompt } from "@/content/homepage";
import { ButtonLink } from "./Button";

/**
 * Navy prompt block in the category grid. Its button goes to a verified on-page destination (the contact section);
 * see `quotePrompt.pendingIntegration` in src/content/homepage.ts.
 */
export function QuotePromptCard() {
  return (
    <div className="flex h-full min-h-[13rem] flex-col justify-between gap-6 rounded-md bg-surface-inverse p-6 text-fg-inverse sm:min-h-[15rem] sm:p-7 lg:min-h-0">
      <div>
        <h3 className="max-w-[16ch] text-h3 font-bold">{quotePrompt.title}</h3>
        <p className="mt-3 max-w-[34ch] text-body-sm text-fg-inverse-muted">{quotePrompt.body}</p>
      </div>
      <ButtonLink href={quotePrompt.action.href} variant="design" className="self-start">
        {quotePrompt.action.label}
      </ButtonLink>
    </div>
  );
}
