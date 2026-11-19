/**
 * Registration field definitions, from the current site's "Create New Account" form.
 *
 * The form shown depends on "What type of customer are you?". Only the Individual / Kennel form is confirmed. Until the
 * Company and Association fields are known they use the same field list: change `fieldsByType` (add, remove or reorder
 * keys) and the form follows, with no change to the form component.
 */
export type CustomerType = "company" | "association" | "individual";

export const DEFAULT_CUSTOMER_TYPE: CustomerType = "individual";

export const customerTypes: { id: CustomerType; label: string }[] = [
  { id: "company", label: "Company" },
  { id: "association", label: "Association" },
  { id: "individual", label: "Individual / Kennel" },
];

export type FieldKey = "email" | "password" | "confirm" | "firstName" | "lastName" | "phone" | "street" | "city" | "postalCode" | "country" | "region" | "vatNumber";

export interface FieldDef {
  key: FieldKey;
  label: string;
  required: boolean;
  /** Two short fields can share a row on wider screens. */
  pairWithNext?: boolean;
}

export const fieldDefs: Record<FieldKey, FieldDef> = {
  email: { key: "email", label: "Email address", required: true },
  password: { key: "password", label: "Password", required: true },
  confirm: { key: "confirm", label: "Confirm password", required: true },
  firstName: { key: "firstName", label: "First name", required: true, pairWithNext: true },
  lastName: { key: "lastName", label: "Last name", required: true },
  phone: { key: "phone", label: "Phone", required: true },
  street: { key: "street", label: "Street address", required: true },
  city: { key: "city", label: "City", required: true, pairWithNext: true },
  postalCode: { key: "postalCode", label: "Zip/Postal code", required: true },
  country: { key: "country", label: "Country", required: true },
  region: { key: "region", label: "State/Province", required: false },
  vatNumber: { key: "vatNumber", label: "VAT number", required: false },
};

const INDIVIDUAL_FIELDS: FieldKey[] = ["email", "password", "confirm", "firstName", "lastName", "phone", "street", "city", "postalCode", "country", "region", "vatNumber"];

/** Company and Association: PLACEHOLDER, the same fields as Individual / Kennel until the real ones are supplied. */
export const fieldsByType: Record<CustomerType, FieldKey[]> = {
  individual: INDIVIDUAL_FIELDS,
  company: INDIVIDUAL_FIELDS,
  association: INDIVIDUAL_FIELDS,
};

export const countries = ["Sweden", "Norway", "Denmark", "Finland", "Germany", "United Kingdom"];
export const DEFAULT_COUNTRY = "Sweden";
