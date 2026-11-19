"use client";

import { useRouter } from "next/navigation";
import { AccountPicker } from "@/concepts/concept-b/components/auth/AccountPicker";
import { AUTH_ROUTES } from "@/lib/auth/config";
import { safeNext } from "@/lib/auth/validate";
import { BASE, HOME } from "@/concepts/concept-b/base";
import { REVIEW_MODE } from "@/lib/reviewMode";

export function ChooseAccountClient() {
  const router = useRouter();
  return (
    <AccountPicker
      onSelected={() => router.push(safeNext(new URLSearchParams(window.location.search).get("next"), BASE) ?? (REVIEW_MODE ? HOME : `${BASE}${AUTH_ROUTES.account}`))}
    />
  );
}
