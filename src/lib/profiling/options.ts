export type IndustryId =
  | "software_it"
  | "marketing_advertising"
  | "ecommerce_retail"
  | "finance_banking"
  | "healthcare"
  | "education"
  | "real_estate"
  | "media_publishing"
  | "manufacturing"
  | "legal"
  | "consulting_agency"
  | "nonprofit"
  | "government"
  | "other";

export type TeamSizeId =
  | "solo"
  | "1_5"
  | "6_15"
  | "16_50"
  | "51_200"
  | "201_1000"
  | "1000_plus";

export type WorkTypeId =
  | "founder_owner"
  | "product_management"
  | "engineering_development"
  | "design_ux"
  | "marketing_growth"
  | "sales_bizdev"
  | "operations"
  | "customer_support"
  | "content_writing"
  | "data_analytics"
  | "finance_accounting"
  | "hr_people"
  | "legal_compliance"
  | "education_training"
  | "healthcare_clinical"
  | "research"
  | "project_management"
  | "other";

export type Option<T extends string> = {
  id: T;
  label: string;
  description?: string;
};

export const industries: Option<IndustryId>[] = [
  { id: "software_it", label: "Software / IT" },
  { id: "marketing_advertising", label: "Marketing / Advertising" },
  { id: "ecommerce_retail", label: "E-commerce / Retail" },
  { id: "finance_banking", label: "Finance / Banking" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "real_estate", label: "Real estate" },
  { id: "media_publishing", label: "Media / Publishing" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "legal", label: "Legal" },
  { id: "consulting_agency", label: "Consulting / Agency" },
  { id: "nonprofit", label: "Non-profit" },
  { id: "government", label: "Government" },
  { id: "other", label: "Other" },
];

export const teamSizes: Option<TeamSizeId>[] = [
  { id: "solo", label: "Just me (solo)" },
  { id: "1_5", label: "1–5 people" },
  { id: "6_15", label: "6–15 people" },
  { id: "16_50", label: "16–50 people" },
  { id: "51_200", label: "51–200 people" },
  { id: "201_1000", label: "201–1000 people" },
  { id: "1000_plus", label: "1000+ people" },
];

const commonWorkTypes: Option<WorkTypeId>[] = [
  { id: "founder_owner", label: "Founder / Owner" },
  { id: "product_management", label: "Product management" },
  { id: "project_management", label: "Project management" },
  { id: "engineering_development", label: "Engineering / Development" },
  { id: "design_ux", label: "Design / UX" },
  { id: "data_analytics", label: "Data / Analytics" },
  { id: "marketing_growth", label: "Marketing / Growth" },
  { id: "sales_bizdev", label: "Sales / Business development" },
  { id: "operations", label: "Operations" },
  { id: "customer_support", label: "Customer support" },
  { id: "content_writing", label: "Content / Writing" },
  { id: "finance_accounting", label: "Finance / Accounting" },
  { id: "hr_people", label: "People / HR" },
  { id: "legal_compliance", label: "Legal / Compliance" },
  { id: "research", label: "Research" },
  { id: "other", label: "Other" },
];

export const workTypesByIndustry: Record<IndustryId, Option<WorkTypeId>[]> = {
  software_it: commonWorkTypes,
  marketing_advertising: [
    { id: "founder_owner", label: "Founder / Owner" },
    { id: "marketing_growth", label: "Marketing / Growth" },
    { id: "content_writing", label: "Content / Writing" },
    { id: "design_ux", label: "Design / Creative" },
    { id: "sales_bizdev", label: "Sales / Account management" },
    { id: "data_analytics", label: "Analytics" },
    { id: "operations", label: "Operations" },
    { id: "other", label: "Other" },
  ],
  ecommerce_retail: [
    { id: "founder_owner", label: "Founder / Owner" },
    { id: "operations", label: "Operations / Fulfillment" },
    { id: "marketing_growth", label: "Marketing / Growth" },
    { id: "content_writing", label: "Content / Merchandising" },
    { id: "customer_support", label: "Customer support" },
    { id: "data_analytics", label: "Data / Analytics" },
    { id: "finance_accounting", label: "Finance / Accounting" },
    { id: "other", label: "Other" },
  ],
  finance_banking: [
    { id: "finance_accounting", label: "Finance / Accounting" },
    { id: "data_analytics", label: "Data / Analytics" },
    { id: "operations", label: "Operations" },
    { id: "legal_compliance", label: "Risk / Compliance" },
    { id: "product_management", label: "Product management" },
    { id: "sales_bizdev", label: "Sales / Relationship management" },
    { id: "other", label: "Other" },
  ],
  healthcare: [
    { id: "healthcare_clinical", label: "Clinical / Patient care" },
    { id: "operations", label: "Operations / Admin" },
    { id: "research", label: "Research" },
    { id: "legal_compliance", label: "Compliance" },
    { id: "data_analytics", label: "Data / Analytics" },
    { id: "marketing_growth", label: "Marketing" },
    { id: "other", label: "Other" },
  ],
  education: [
    { id: "education_training", label: "Teaching / Training" },
    { id: "content_writing", label: "Content / Curriculum" },
    { id: "operations", label: "Operations / Admin" },
    { id: "data_analytics", label: "Data / Analytics" },
    { id: "marketing_growth", label: "Marketing" },
    { id: "other", label: "Other" },
  ],
  real_estate: [
    { id: "sales_bizdev", label: "Sales / Brokerage" },
    { id: "operations", label: "Operations / Property management" },
    { id: "marketing_growth", label: "Marketing" },
    { id: "finance_accounting", label: "Finance" },
    { id: "legal_compliance", label: "Legal" },
    { id: "other", label: "Other" },
  ],
  media_publishing: [
    { id: "content_writing", label: "Content / Writing" },
    { id: "marketing_growth", label: "Marketing / Audience growth" },
    { id: "design_ux", label: "Design / Creative" },
    { id: "operations", label: "Operations / Production" },
    { id: "data_analytics", label: "Analytics" },
    { id: "sales_bizdev", label: "Sales / Partnerships" },
    { id: "other", label: "Other" },
  ],
  manufacturing: [
    { id: "operations", label: "Operations / Production" },
    { id: "project_management", label: "Project management" },
    { id: "engineering_development", label: "Engineering" },
    { id: "finance_accounting", label: "Finance" },
    { id: "legal_compliance", label: "Compliance" },
    { id: "other", label: "Other" },
  ],
  legal: [
    { id: "legal_compliance", label: "Legal / Compliance" },
    { id: "operations", label: "Operations" },
    { id: "sales_bizdev", label: "Business development" },
    { id: "content_writing", label: "Content / Research" },
    { id: "other", label: "Other" },
  ],
  consulting_agency: [
    { id: "founder_owner", label: "Founder / Owner" },
    { id: "project_management", label: "Project management" },
    { id: "marketing_growth", label: "Marketing" },
    { id: "sales_bizdev", label: "Sales" },
    { id: "content_writing", label: "Content / Delivery" },
    { id: "operations", label: "Operations" },
    { id: "other", label: "Other" },
  ],
  nonprofit: [
    { id: "operations", label: "Operations" },
    { id: "marketing_growth", label: "Marketing / Community" },
    { id: "content_writing", label: "Content" },
    { id: "finance_accounting", label: "Finance" },
    { id: "hr_people", label: "People / HR" },
    { id: "other", label: "Other" },
  ],
  government: [
    { id: "operations", label: "Operations / Admin" },
    { id: "legal_compliance", label: "Policy / Compliance" },
    { id: "data_analytics", label: "Data / Analytics" },
    { id: "project_management", label: "Program management" },
    { id: "other", label: "Other" },
  ],
  other: commonWorkTypes,
};

export function getWorkTypesForIndustry(industryId: IndustryId | string | null | undefined) {
  const key = (industryId || "other") as IndustryId;
  return workTypesByIndustry[key] || workTypesByIndustry.other;
}


