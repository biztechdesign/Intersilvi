# Concept B: product-led redesign (archived 2026-11-17)

The product-led refinement of Concept B was set aside and the earlier Concept B (horse hero, four tall category cards,
light-blue selected awards, rosette customization preview, dark photographic craft section) was restored.

| Folder | Contents |
|---|---|
| `src-concept-b-redesign/` | The redesigned `src/concepts/concept-b` tree, plus `_app-concept-b-page.tsx` (its page) and `_showcase.ts` (its product data) |
| `checkpoints-pre-redesign/` | Raw Claude Code file checkpoints (`<hash>@v2` = the restored earlier version, `@v3` = mid-redesign) |
| `docs/` | `CONCEPT-B-REFINEMENT.md` (critique, coverage report, asset provenance) and the 1440, 768 and 390px screenshots |

To bring the redesign back: copy `src-concept-b-redesign/` over `src/concepts/concept-b/`, and `_app-concept-b-page.tsx` over `src/app/concept-b/page.tsx`.
The shared `getShowcaseProducts()` adapter method, the optional `Product.specs` field and `src/lib/commerce/mock/showcase.ts` were left in place (additive, unused by the restored Concept B).
