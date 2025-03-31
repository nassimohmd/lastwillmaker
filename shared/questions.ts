import { z } from "zod";

export const questions = [
  {
    id: "personal_info",
    section: "Personal Information",
    title: "Personal Information",
    questions: [
      {
        id: "full_name",
        text: "What is your full name?",
        type: "text",
        placeholder: "Enter your full legal name",
      },
      {
        id: "fathers_name",
        text: "What is your father's name?",
        type: "text",
        placeholder: "Enter your father's full name",
      },
    ],
  },
  {
    id: "funeral_preferences",
    section: "Funeral and Memorial Preferences",
    title: "Funeral and Memorial Preferences",
    questions: [
      {
        id: "funeral_preference",
        text: "How would you like your funeral to be handled?",
        type: "radio",
        options: [
          { value: "religious", label: "Traditional religious ceremony" },
          {
            value: "simple",
            label: "Simple cremation or burial without ceremony",
          },
          {
            value: "memorial",
            label: "Memorial gathering with friends and family",
          },
          { value: "other_decide", label: "I want someone else to decide" },
        ],
      },
    ],
  },
  {
    id: "organ_donations",
    section: "Organ Donations",
    title: "Organ Donations",
    questions: [
      {
        id: "organ_donation",
        text: "Are you willing to donate your organs after death?",
        type: "radio",
        options: [
          { value: "all", label: "Yes, donate all usable organs" },
          { value: "specific", label: "Yes, but only specific organs" },
          { value: "none", label: "No, I do not wish to donate" },
        ],
      },
      {
        id: "specific_organs",
        text: "Which specific organs would you like to donate?",
        type: "radio",
        placeholder: "List the specific organs you wish to donate",
        conditional: {
          field: "organ_donation",
          value: "specific",
        },
      },
    ],
  },
  {
    id: "insurance",
    section: "Health and Life Insurance",
    title: "Health and Life Insurance",
    questions: [
      {
        id: "insurance_policies",
        text: "Do you have any health or life insurance policies?",
        type: "radio",
        options: [
          { value: "both", label: "Yes, both" },
          { value: "life_only", label: "Only life insurance" },
          { value: "health_only", label: "Only health insurance" },
          { value: "none", label: "No insurance" },
        ],
      },
    ],
  },
  {
    id: "employment",
    section: "Employment Benefits",
    title: "Employment Benefits",
    questions: [
      {
        id: "employment_status",
        text: "Are you currently employed?",
        type: "radio",
        options: [
          { value: "full_time", label: "Yes, full-time" },
          { value: "part_time", label: "Yes, part-time or freelance" },
          { value: "unemployed", label: "No, unemployed" },
        ],
      },
    ],
  },
  {
    id: "bank_accounts",
    section: "Bank Accounts",
    title: "Bank Accounts",
    questions: [
      {
        id: "has_bank_accounts",
        text: "Do you have bank accounts that need to be managed or closed?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "bank_details",
        text: "List your banking institutions:",
        type: "text",
        placeholder: "Enter bank names separated by commas",
        conditional: {
          field: "has_bank_accounts",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "investments",
    section: "Investments",
    title: "Investments (Stocks, Mutual Funds, etc.)",
    questions: [
      {
        id: "has_investments",
        text: "Do you have any financial investments?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, in various forms" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "investment_details",
        text: "Provide details about your investments:",
        type: "text",
        placeholder:
          "List your investments (e.g., stocks, mutual funds, bonds)",
        conditional: {
          field: "has_investments",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "debts",
    section: "Financial Obligations",
    title: "Debts, Loans, EMIs, Pay Later",
    questions: [
      {
        id: "has_debts",
        text: "Do you have any debts or financial obligations?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "debt_details",
        text: "List your debts and financial obligations:",
        type: "text",
        placeholder:
          "Describe your debts (e.g., home loan, car loan, credit cards)",
        conditional: {
          field: "has_debts",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "jewellery",
    section: "Personal Property",
    title: "Jewellery and Ornamentals",
    questions: [
      {
        id: "has_jewellery",
        text: "Do you own any jewellery or ornamentals?",
        type: "radio",
        options: [
          {
            value: "specify",
            label: "Yes, and I wish to specify who gets them",
          },
          { value: "family_decide", label: "Yes, but let my family decide" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "jewellery_details",
        text: "Specify distribution of your jewellery and ornamentals:",
        type: "text",
        placeholder: "List items and their intended recipients",
        conditional: {
          field: "has_jewellery",
          value: "specify",
        },
      },
    ],
  },
  {
    id: "receivables",
    section: "Receivables",
    title: "Receivables (Money owed to you)",
    questions: [
      {
        id: "has_receivables",
        text: "Are there any people who owe you money?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "receivable_details",
        text: "Provide details about money owed to you:",
        type: "text",
        placeholder: "List who owes you money and approximately how much",
        conditional: {
          field: "has_receivables",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "legal_documents",
    section: "Legal Documents",
    title: "Legal Documents (House Documents, etc.)",
    questions: [
      {
        id: "has_legal_docs",
        text: "Do you have any important legal documents?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "legal_doc_details",
        text: "List your important legal documents:",
        type: "text",
        placeholder: "E.g., property deeds, vehicle titles, birth certificates",
        conditional: {
          field: "has_legal_docs",
          value: "yes",
        },
      },
    ],
  },
];

export function generateContent(responses: Record<string, any>): string {
  let content = "LAST WILL AND TESTAMENT\n\n";

  // Personal Information
  if (responses.full_name || responses.fathers_name) {
    content += "PERSONAL INFORMATION\n\n";

    if (responses.full_name) {
      content += `I, ${responses.full_name}, `;
    } else {
      content += "I, ";
    }

    if (responses.fathers_name) {
      content += `son/daughter of ${responses.fathers_name}, `;
    }

    content +=
      "being of sound mind and body, do hereby make, publish, and declare this to be my Last Will and Testament, hereby revoking all wills and codicils previously made by me.\n\n";
  }

  // Funeral Preferences
  content += "I. FUNERAL AND MEMORIAL PREFERENCES\n\n";

  if (responses.funeral_preference) {
    const preferences: Record<string, string> = {
      religious:
        "I would like my final rites to be conducted as a traditional religious ceremony, in a way that respects my beliefs and brings comfort to my loved ones.",
      simple:
        "I would like my final rites to be conducted as a simple cremation or burial without ceremony, in a way that respects my beliefs and brings comfort to my loved ones.",
      memorial:
        "I would like my final rites to be conducted as a memorial gathering with friends and family, in a way that respects my beliefs and brings comfort to my loved ones.",
      other_decide:
        "I would like my final rites to be decided by my loved ones, in a way that respects my beliefs and brings comfort to them.",
    };

    const preference =
      preferences[responses.funeral_preference as keyof typeof preferences] ||
      "";
    content += `1. ${preference}\n\n`;
  }

  // Organ Donations
  content += "II. ORGAN DONATIONS\n\n";

  if (responses.organ_donation) {
    const donations: Record<string, string> = {
      all: "I wish for all usable organs to be donated after my passing, as a final act of giving.",
      specific:
        "I wish for specific organs to be donated after my passing, as a final act of giving.",
      none: "I do not wish to donate my organs after my passing.",
    };

    const donation =
      donations[responses.organ_donation as keyof typeof donations] || "";
    content += `1. ${donation}`;

    if (responses.organ_donation === "specific" && responses.specific_organs) {
      content += ` The specific organs I wish to donate are: ${responses.specific_organs}.`;
    }

    content += "\n\n";
  }

  // Health and Life Insurance
  content += "III. HEALTH AND LIFE INSURANCE\n\n";

  if (responses.insurance_policies) {
    const policies: Record<string, string> = {
      both: "I have both health and life insurance policies",
      life_only: "I have only life insurance",
      health_only: "I have only health insurance",
      none: "I have no insurance",
    };

    const policy =
      policies[responses.insurance_policies as keyof typeof policies] || "";
    content += `1. ${policy}, and I would like the benefits to be claimed and used as per the nominee details mentioned in the policy.\n\n`;
  }

  // Employment Benefits
  content += "IV. EMPLOYMENT BENEFITS\n\n";

  if (responses.employment_status) {
    const status: Record<string, string> = {
      full_time:
        "At the time of writing this, I am employed full-time, and any benefits or dues from my employer should be claimed by my nominee or legal heir.",
      part_time:
        "At the time of writing this, I am employed part-time or freelance, and any benefits or dues from my employer should be claimed by my nominee or legal heir.",
      unemployed: "At the time of writing this, I am unemployed.",
    };

    const employmentStatus =
      status[responses.employment_status as keyof typeof status] || "";
    content += `1. ${employmentStatus}\n\n`;
  }

  // Bank Accounts
  content += "V. BANK ACCOUNTS\n\n";

  if (responses.has_bank_accounts === "yes") {
    content +=
      "1. I have bank accounts that should be accessed and closed, with balances transferred to my nominee or heirs.";

    if (responses.bank_details) {
      content += ` These accounts are with the following institutions: ${responses.bank_details}.`;
    }

    content += "\n\n";
  } else if (responses.has_bank_accounts === "no") {
    content +=
      "1. I do not have any bank accounts that need to be managed or closed.\n\n";
  }

  // Investments
  content += "VI. INVESTMENTS\n\n";

  if (responses.has_investments === "yes") {
    content +=
      "1. I have made investments in various forms, and I want them to be transferred or liquidated as per the needs of my family.";

    if (responses.investment_details) {
      content += ` These investments include: ${responses.investment_details}.`;
    }

    content += "\n\n";
  } else if (responses.has_investments === "no") {
    content += "1. I do not have any financial investments.\n\n";
  }

  // Debts and Financial Obligations
  content += "VII. DEBTS AND FINANCIAL OBLIGATIONS\n\n";

  if (responses.has_debts === "yes") {
    content +=
      "1. I request my family to settle the following obligations, if any, from my estate:";

    if (responses.debt_details) {
      content += ` ${responses.debt_details}.`;
    }

    content += "\n\n";
  } else if (responses.has_debts === "no") {
    content +=
      "1. I do not have any debts or financial obligations that need to be settled.\n\n";
  }

  // Jewellery and Ornamentals
  content += "VIII. JEWELLERY AND ORNAMENTALS\n\n";

  if (responses.has_jewellery) {
    const jewellery: Record<string, string> = {
      specify:
        "My jewellery and ornamentals should be distributed as specified.",
      family_decide:
        "My jewellery and ornamentals should be decided by my family.",
      no: "I do not have any jewellery or ornamentals to distribute.",
    };

    const jewelleryStatus =
      jewellery[responses.has_jewellery as keyof typeof jewellery] || "";
    content += `1. ${jewelleryStatus}`;

    if (responses.has_jewellery === "specify" && responses.jewellery_details) {
      content += ` The distribution should be as follows: ${responses.jewellery_details}.`;
    }

    content += "\n\n";
  }

  // Receivables
  content += "IX. RECEIVABLES\n\n";

  if (responses.has_receivables === "yes") {
    content +=
      "1. If anyone owes me money, I would like my family or executor to recover it, as appropriate.";

    if (responses.receivable_details) {
      content += ` This includes: ${responses.receivable_details}.`;
    }

    content += "\n\n";
  } else if (responses.has_receivables === "no") {
    content +=
      "1. There are no outstanding debts owed to me that need to be recovered.\n\n";
  }

  // Legal Documents
  content += "X. LEGAL DOCUMENTS\n\n";

  if (responses.has_legal_docs === "yes") {
    content +=
      "1. My important documents should be secured and handed over to my legal heir or executor.";

    if (responses.legal_doc_details) {
      content += ` These documents include: ${responses.legal_doc_details}.`;
    }

    content += "\n\n";
  } else if (responses.has_legal_docs === "no") {
    content +=
      "1. I do not have any important legal documents to be secured.\n\n";
  }

  content +=
    "This document represents my wishes regarding the distribution of my assets and handling of my affairs. I understand that laws vary by jurisdiction, and I have consulted with legal professionals as necessary.\n\n";

  content += "Dated: " + new Date().toLocaleDateString() + "\n\n";
  content += "_______________________________\n";
  if (responses.full_name) {
    content += `${responses.full_name} (Testator)\n\n`;
  } else {
    content += "Signature\n\n";
  }

  return content;
}
