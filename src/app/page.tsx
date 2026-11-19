import type { Metadata } from "next";
import ConceptBLayout from "./concept-b/layout";
import ConceptBHome from "./concept-b/page";

export const metadata: Metadata = { title: { absolute: "Intersilvi" } };

/** The site's address (/) shows the Concept B homepage. /concept-b still works. */
export default function Home() {
  return (
    <ConceptBLayout>
      <ConceptBHome />
    </ConceptBLayout>
  );
}
