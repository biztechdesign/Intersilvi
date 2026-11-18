import type { Metadata } from "next";
import { ChooseAccountClient } from "./ChooseAccountClient";

export const metadata: Metadata = { title: "Choose an account" };

/** Where a customer with several linked accounts lands after signing in. Also the place to review the modal. */
export default function ChooseAccountPage() {
  return (
    <div className="ds-container grid min-h-[50vh] content-start py-10 lg:py-14">
      <ChooseAccountClient />
    </div>
  );
}
