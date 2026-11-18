## Fast UI implementation workflow

For small, clearly scoped UI changes:

- Do not create task lists or detailed implementation plans.
- Do not enter planning mode unless explicitly requested.
- Do not use task-tracking tools for localized changes.
- Inspect only relevant components and styles.
- Implement directly with minimal file changes.
- Run targeted validation.
- Report changes concisely.

For major features, architectural changes or complex
interactions, planning and task tracking are allowed.

## Impeccable workflow: paused during the home build

Until the home page is fully built:

- Do not invoke the impeccable skill or any other design skill.
- Do not launch impeccable subagents (finish reviewer, documenter, asset producer).
- Do not write or update DESIGN.md, PRODUCT.md or .impeccable files.
- Build from the screenshot or user brief, and do one screenshot comparison per change.
- A full design review is a separate pass later, only when the user asks for it.

## Visual implementation quality

For UI changes based on a screenshot:

- Treat the screenshot as the visual layout reference.
- Preserve existing brand colours and approved content.
- Match component proportions, alignment and spacing.
- Verify text colours, icon treatments and button heights.
- Check active, hover and default states.
- Compare the rendered result against the reference
  before reporting completion.
- Fix obvious visual mismatches in the same task.
- Do not consider successful compilation alone
  sufficient evidence of UI quality.
