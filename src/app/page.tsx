import Link from "next/link";

/** Index of the concept prototypes. Deliberately unstyled beyond basics: each concept owns its own look. */
export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: "40rem", margin: "4rem auto", padding: "0 1rem", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "1.5rem" }}>Intersilvi homepage prototypes</h1>
      <ul>
        <li>
          <Link href="/concept-a">Concept A: Premium Scandinavian commerce</Link>
        </li>
        <li>
          <Link href="/concept-b">Concept B: Refined contemporary commerce</Link>
        </li>
        <li>
          <Link href="/design-system">Design system</Link>
        </li>
      </ul>
    </main>
  );
}
