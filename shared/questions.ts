import { z } from "zod";

/*
  Last Will – Questions & Output Templates (India-focused)
  -------------------------------------------------------
  Shape: A typed catalogue of topics, each with multiple‑choice questions and a natural
  language output template that references answers via human‑readable placeholders
  (e.g., [Funeral.Method]).

  NOTE: Keep people placeholders (e.g., [Spouse], [Children], [Executor], [DigitalCustodian])
  in your global People collection form. Here we only reference them in labels/placeholders.
*/

// ────────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────────

export type TopicID =
  | "funeral"
  | "organ_donation"
  | "bank_accounts"
  | "investments"
  | "debts"
  | "jewellery"
  | "receivables"
  | "legal_documents"
  | "real_estate"
  | "vehicles"
  | "collectibles"
  | "intellectual_property"
  | "certificates"
  | "journals"
  | "devices"
  | "gadgets"
  | "sim_numbers"
  | "artworks"
  | "password_manager"
  | "subscriptions"
  | "digital_goods"
  | "txn_history_backup"
  | "social_media"
  | "photos_videos"
  | "chats"
  | "digital_notes"
  | "call_history"
  | "call_recordings"
  | "contacts"
  | "phone_audio"
  | "email"
  | "local_files"
  | "google_takeout"
  | "app_data"
  | "create_art"
  | "residuary"
  | "physical_handler"
  | "digital_handler";

export type QuestionType = "single" | "multi";

export interface OptionInput {
  type: "text" | "number" | "textarea";
  name: string; // e.g., "Funeral.PlaceName" or "SIM.RetentionDays"
  placeholder?: string;
  required?: boolean;
}

export interface Option {
  id: string; // unique within the question
  label: string; // user-visible
  value?: string; // optional machine-friendly value
  input?: OptionInput; // optional free-text/number input
}

export interface Condition {
  questionId: string; // depends on prior question
  operator: "equals" | "notEquals" | "in" | "notIn";
  value: string | string[];
}

export interface Question {
  id: string; // unique within topic
  text: string;
  type: QuestionType;
  options: Option[];
  required?: boolean;
  showIf?: Condition[]; // conditional visibility
}

export interface Topic {
  id: TopicID;
  label: string;
  questions: Question[];
  template: string; // output text with placeholders like [Funeral.Method]
}

// Utility option to keep consistency
const NA: Option = { id: "na", label: "Not applicable / skip", value: "na" };

// Helper to create a Yes/No with NA
function yesNoNA(prefix: string): Option[] {
  return [
    { id: `${prefix}_yes`, label: "Yes", value: "yes" },
  { id: `${prefix}_no`, label: "No", value: "no" },
    NA,
  ];
}

// ────────────────────────────────────────────────────────────────────────────────
// Catalogue of Topics
// ────────────────────────────────────────────────────────────────────────────────

export const TOPICS: Topic[] = [
  // Funeral & Memorial Preferences
  {
    id: "funeral",
    label: "Funeral & Memorial Preferences",
    questions: [
      {
        id: "method",
        text: "What do you prefer for your remains?",
        type: "single",
        options: [
          { id: "cremation", label: "Cremation" },
          { id: "burial", label: "Burial" },
          { id: "donate_body", label: "Donate body to medical college (where feasible)" },
          { id: "family_decide", label: "Family to decide" },
          NA,
        ],
      },
      {
        id: "rites",
        text: "Should any religious/faith customs be followed?",
        type: "single",
        options: [
          { id: "as_per_faith", label: "As per my faith’s rites" },
          { id: "simple", label: "Simple, non-religious" },
          { id: "family_decide", label: "Family to decide" },
          NA,
        ],
      },
      {
        id: "place",
        text: "Where should the ceremony/remembrance be held?",
        type: "single",
        options: [
          { id: "hometown", label: "Hometown" },
          { id: "current_city", label: "Current city" },
          { id: "family_decide", label: "Family to decide" },
          { id: "other", label: "Other (specify)", input: { type: "text", name: "Funeral.PlaceName", placeholder: "Place name" } },
          NA,
        ],
      },
      {
        id: "remains",
        text: "Any preference for ashes/remains?",
        type: "single",
        options: [
          { id: "immerse", label: "Immerse (specify place)", input: { type: "text", name: "Funeral.AshesPlace", placeholder: "e.g., Varanasi, hometown river" } },
          { id: "keep_memorial", label: "Keep in family memorial" },
          { id: "family_decide", label: "Family to decide" },
          NA,
        ],
      },
    ],
    template:
      "I prefer [Funeral.Method] and ask that [Funeral.Rites] be observed. If practical, I want the ceremony in [Funeral.Place]. For my ashes/remains, please [Funeral.RemainsWish]. If circumstances make this impractical, my family may decide respectfully.",
  },

  // Organ Donations
  {
    id: "organ_donation",
    label: "Organ Donations",
    questions: [
      {
        id: "scope",
        text: "Do you wish to donate organs?",
        type: "single",
        options: [
          { id: "any", label: "Donate any eligible organs" },
          { id: "specific", label: "Donate only specific organs" },
          { id: "no", label: "Do not donate" },
          { id: "family_decide", label: "Family to decide" },
        ],
      },
      {
        id: "which",
        text: "If specific, which organs?",
        type: "multi",
        showIf: [{ questionId: "scope", operator: "equals", value: "specific" }],
        options: [
          { id: "eyes", label: "Eyes" },
          { id: "kidneys", label: "Kidneys" },
          { id: "liver", label: "Liver" },
          { id: "heart", label: "Heart" },
          { id: "other", label: "Other (specify)", input: { type: "text", name: "OrganDonate.Other", placeholder: "Specify organ(s)" } },
          NA,
        ],
      },
    ],
    template:
      "I wish to [OrganDonate.Scope]. If specific, I consent to donate [OrganDonate.List] in accordance with applicable law and medical feasibility.",
  },

  // Bank Accounts
  {
    id: "bank_accounts",
    label: "Bank Accounts",
    questions: [
      {
        id: "distribution",
        text: "How should bank balances be handled?",
        type: "single",
        options: [
          { id: "to_spouse", label: "Transfer to [Spouse]" },
          { id: "to_children", label: "Split equally among [Children]" },
          { id: "as_nominees", label: "Transfer as per existing nominees" },
          { id: "residuary", label: "Add to residuary estate" },
          { id: "other", label: "Other (specify)", input: { type: "textarea", name: "Bank.OtherRule", placeholder: "Describe distribution rule" } },
          NA,
        ],
      },
      {
        id: "joint",
        text: "If joint accounts exist, what should happen?",
        type: "single",
        options: [
          { id: "survivor_continues", label: "Survivor to continue as per bank rules" },
          { id: "close_and_distribute", label: "Close and distribute per my wishes above" },
          NA,
        ],
      },
      {
        id: "list_location",
        text: "Where is the account list stored?",
        type: "single",
        options: [
          { id: "attached", label: "Attached list" },
          { id: "with_executor", label: "With [Executor]" },
          { id: "password_manager", label: "In my password manager (emergency access)" },
          NA,
        ],
      },
    ],
    template:
      "My bank accounts (as listed at [Bank.ListLocation]) shall be [Bank.DistributionRule]. Joint accounts shall be [Bank.JointRule], subject to bank rules.",
  },

  // Investments (stocks, mutual, bonds, digital gold, gold, crypto)
  {
    id: "investments",
    label: "Investments",
    questions: [
      {
        id: "method",
        text: "How should investments be distributed?",
        type: "single",
        options: [
          { id: "in_kind", label: "Transfer in‑kind to beneficiaries where allowed" },
          { id: "liquidate", label: "Liquidate and distribute cash" },
          { id: "as_nominees", label: "Follow existing nominees" },
          { id: "residuary", label: "Add to residuary estate" },
          NA,
        ],
      },
      {
        id: "crypto",
        text: "How should crypto be handled?",
        type: "single",
        options: [
          { id: "access_then_transfer", label: "[DigitalCustodian] gets access via password manager; transfer as per method" },
          { id: "liquidate_then_distribute", label: "[DigitalCustodian] liquidates and distributes as above" },
          NA,
        ],
      },
      {
        id: "separate_gold",
        text: "Is physical gold covered here or under Jewellery?",
        type: "single",
        options: [
          { id: "under_jewellery", label: "Under Jewellery (recommended)" },
          { id: "here", label: "Handle within Investments" },
          NA,
        ],
      },
    ],
    template:
      "My financial investments shall be [Invest.Method]. For crypto, [Invest.CryptoRule] using credentials stored at [PasswordManager.Location], subject to platform terms and law.",
  },

  // Debts / Loans / EMI / Pay‑Later
  {
    id: "debts",
    label: "Debts, Loans, EMI, Pay‑Later",
    questions: [
      {
        id: "pay_rule",
        text: "How should known debts be handled?",
        type: "single",
        options: [
          { id: "pay", label: "Pay from estate" },
          { id: "verify_then_pay", label: "Verify first, then pay" },
          { id: "contest_unclear", label: "Contest if unclear" },
          NA,
        ],
      },
      {
        id: "insufficient",
        text: "If estate funds are insufficient:",
        type: "single",
        options: [
          { id: "legal_priority", label: "Pay in legal priority" },
          { id: "settle_negotiate", label: "Settle/negotiage" },
          { id: "executor_decides", label: "Executor to decide" },
          NA,
        ],
      },
    ],
    template:
      "I direct that my lawful debts, EMIs, and obligations be [Debt.PayRule]. If the estate is insufficient, they shall be handled by [Debt.InsufficiencyRule] as per law.",
  },

  // Jewellery & Ornamentals
  {
    id: "jewellery",
    label: "Jewellery & Ornamentals",
    questions: [
      {
        id: "beneficiary",
        text: "Who receives jewellery?",
        type: "single",
        options: [
          { id: "to_spouse", label: "[Spouse]" },
          { id: "to_children_eq", label: "Split among [Children] equally" },
          { id: "specific_split", label: "Specific items to specific people (I will list)", input: { type: "textarea", name: "Jewels.ItemMap", placeholder: "e.g., Gold bangles → [Daughter]; Ring → [Mother]" } },
          { id: "sell_residuary", label: "Sell and add to residuary" },
          NA,
        ],
      },
      {
        id: "list_location",
        text: "Where is the jewellery inventory kept?",
        type: "single",
        options: [
          { id: "attached", label: "Attached list with photos" },
          { id: "with_executor", label: "With [Executor]" },
          { id: "bank_locker", label: "Bank locker (enter details)", input: { type: "text", name: "Jewels.Locker", placeholder: "Bank & locker number" } },
          NA,
        ],
      },
    ],
    template:
      "My jewellery and ornamentals listed at [Jewels.ListLocation] go to [Jewels.BeneficiaryRule]. Items in locker [Jewels.Locker] are included.",
  },

  // Major Receivables (money owed to me)
  {
    id: "receivables",
    label: "Major Receivables",
    questions: [
      {
        id: "collect_rule",
        text: "Should receivables (money owed to you) be pursued?",
        type: "single",
        options: [
          { id: "collect_fully", label: "Yes, collect fully" },
          { id: "try_once_then_waive", label: "Try once; waive if hardship" },
          { id: "waive_all", label: "Waive all" },
          NA,
        ],
      },
      {
        id: "pay_to",
        text: "If collected, who receives the funds?",
        type: "single",
        options: [
          { id: "spouse", label: "[Spouse]" },
          { id: "children_eq", label: "[Children] equally" },
          { id: "residuary", label: "Residuary estate" },
          { id: "specific", label: "Specific person (enter)", input: { type: "text", name: "Receivables.Person", placeholder: "Name" } },
          NA,
        ],
      },
    ],
    template:
      "Any sums owed to me should be [Receivables.CollectRule]. Amounts realized shall be paid to [Receivables.PayTo].",
  },

  // Legal Documents (like house papers)
  {
    id: "legal_documents",
    label: "Legal Documents",
    questions: [
      {
        id: "location",
        text: "Where are original legal documents kept?",
        type: "single",
        options: [
          { id: "home", label: "At home (enter location)", input: { type: "text", name: "Docs.HomeLocation", placeholder: "Cupboard/safe details" } },
          { id: "bank_locker", label: "Bank locker (enter details)", input: { type: "text", name: "Docs.Locker", placeholder: "Bank & locker number" } },
          { id: "with_person", label: "With [Executor/Lawyer]" },
          NA,
        ],
      },
      {
        id: "handover",
        text: "Who should safeguard and hand them over?",
        type: "single",
        options: [
          { id: "executor", label: "[Executor]" },
          { id: "physical_custodian", label: "[PhysicalCustodian]" },
          { id: "spouse", label: "[Spouse]" },
          NA,
        ],
      },
    ],
    template:
      "My original legal documents are stored at [Docs.Location]. I authorize [Docs.HandoverPerson] to access and hand them over to beneficiaries.",
  },

  // Houses / Plots / Real Estate
  {
    id: "real_estate",
    label: "Houses / Plots / Real Estate",
    questions: [
      {
        id: "rule_per_property",
        text: "For each property, choose what should happen (paste mapping if specific).",
        type: "single",
        options: [
          { id: "give_specific", label: "Give to specific person(s) (paste mapping)", input: { type: "textarea", name: "Realty.Map", placeholder: "Property → Beneficiary" } },
          { id: "share_equally", label: "Share among beneficiaries equally" },
          { id: "sell_residuary", label: "Sell; add proceeds to residuary" },
          { id: "life_interest", label: "Life interest for someone, then to others (describe)", input: { type: "textarea", name: "Realty.LifeInterest", placeholder: "e.g., [Parent] may reside until lifetime; then to [Children]" } },
          NA,
        ],
      },
      {
        id: "loan_rule",
        text: "If a property has a loan:",
        type: "single",
        options: [
          { id: "repay_transfer", label: "Repay and transfer" },
          { id: "transfer_with_loan", label: "Transfer with loan (if bank permits)" },
          { id: "sell_clear", label: "Sell to clear loan" },
          NA,
        ],
      },
      {
        id: "occupancy",
        text: "Occupancy after death:",
        type: "single",
        options: [
          { id: "allow_x_months", label: "Allow current occupants to remain for X months", input: { type: "number", name: "Realty.OccupancyMonths", placeholder: "Months" } },
          { id: "immediate_transfer", label: "Immediate transfer/possession to beneficiary" },
          { id: "executor_decides", label: "Executor to decide" },
          NA,
        ],
      },
    ],
    template:
      "My immovable properties shall be [Realty.RulePerProperty]. If any loan exists, it shall be [Realty.LoanRule]. Occupancy shall follow [Realty.OccupancyRule].",
  },

  // Vehicles
  {
    id: "vehicles",
    label: "Vehicles",
    questions: [
      {
        id: "rule",
        text: "For each vehicle, choose action (paste mapping if specific).",
        type: "single",
        options: [
          { id: "transfer_specific", label: "Transfer to specific person(s) (paste mapping)", input: { type: "textarea", name: "Vehicle.Map", placeholder: "Vehicle → Beneficiary" } },
          { id: "sell_residuary", label: "Sell and add to residuary" },
          { id: "donate", label: "Donate if feasible" },
          NA,
        ],
      },
      {
        id: "dues",
        text: "Insurance/loan status handling:",
        type: "single",
        options: [
          { id: "clear_dues", label: "Clear dues then transfer" },
          { id: "transfer_with_dues", label: "Transfer with dues (if allowed)" },
          NA,
        ],
      },
    ],
    template: "My vehicles shall be [Vehicle.RulePerItem] after clearing dues as [Vehicle.DuesRule].",
  },

  // Collectibles & Valuables
  {
    id: "collectibles",
    label: "Collectibles & Valuables",
    questions: [
      {
        id: "rule",
        text: "How should collectibles/valuables be handled?",
        type: "single",
        options: [
          { id: "give_specific", label: "Give to specific person(s) (paste mapping)", input: { type: "textarea", name: "Collectibles.Map", placeholder: "Item → Beneficiary" } },
          { id: "split_equally", label: "Split among beneficiaries" },
          { id: "sell_residuary", label: "Sell at fair value/auction; add to residuary" },
          NA,
        ],
      },
      {
        id: "valuer",
        text: "If valuation needed, who oversees it?",
        type: "single",
        options: [
          { id: "executor", label: "[Executor]" },
          { id: "appointed_valuer", label: "Appointed valuer" },
          NA,
        ],
      },
    ],
    template: "My collectibles and valuables shall be [Collectibles.Rule], with valuation by [Collectibles.Valuer] if required.",
  },

  // Intellectual Property
  {
    id: "intellectual_property",
    label: "Intellectual Property (copyrights, royalties)",
    questions: [
      {
        id: "beneficiary",
        text: "Who inherits IP rights/royalties?",
        type: "single",
        options: [
          { id: "spouse", label: "[Spouse]" },
          { id: "children_eq", label: "[Children] equally" },
          { id: "specific", label: "[SpecificPerson] (enter)", input: { type: "text", name: "IP.Specific", placeholder: "Name" } },
          { id: "trust_charity", label: "A trust/charity (enter)", input: { type: "text", name: "IP.Charity", placeholder: "Trust/Charity name" } },
          NA,
        ],
      },
      {
        id: "manager",
        text: "Who manages licensing/royalty collection?",
        type: "single",
        options: [
          { id: "ip_manager", label: "[IPManager]" },
          { id: "executor", label: "[Executor]" },
          { id: "spouse", label: "[Spouse]" },
          NA,
        ],
      },
    ],
    template: "My intellectual property and any present/future royalties shall pass to [IP.Beneficiary] and be administered by [IP.Manager].",
  },

  // Certificates & Trophies
  {
    id: "certificates",
    label: "Certificates & Trophies",
    questions: [
      {
        id: "certs",
        text: "Academic/work certificates should be:",
        type: "single",
        options: [
          { id: "to_family_member", label: "Hand to a family member for safekeeping (enter)", input: { type: "text", name: "Certificates.Keeper", placeholder: "Name" } },
          { id: "store_with_docs", label: "Store with legal documents" },
          NA,
        ],
      },
      {
        id: "trophies",
        text: "Trophies/mementos should be:",
        type: "single",
        options: [
          { id: "to_specific", label: "Given to specific people (paste mapping)", input: { type: "textarea", name: "Certificates.TrophyMap", placeholder: "Trophy → Beneficiary" } },
          { id: "keep_family", label: "Kept within family" },
          { id: "donate", label: "Donated to school/club" },
          NA,
        ],
      },
    ],
    template: "My certificates and trophies shall be [Certificates.Rule].",
  },

  // Physical Diary / Journals
  {
    id: "journals",
    label: "Physical Diary / Journals",
    questions: [
      {
        id: "rule",
        text: "What to do with journals?",
        type: "single",
        options: [
          { id: "give_specific", label: "Give to a specific person (enter)", input: { type: "text", name: "Journals.Person", placeholder: "Name" } },
          { id: "archive_private", label: "Archive privately with [Executor]" },
          { id: "destroy_unread", label: "Destroy unread" },
          NA,
        ],
      },
    ],
    template: "My diaries/journals should be [Journals.Rule], respecting privacy.",
  },

  // Mobiles & Computers
  {
    id: "devices",
    label: "Mobiles & Computers",
    questions: [
      {
        id: "per_item",
        text: "Who gets each phone/computer? (paste mapping or choose generic)",
        type: "single",
        options: [
          { id: "map", label: "Specific device → person (paste mapping)", input: { type: "textarea", name: "Devices.Map", placeholder: "Device → Beneficiary" } },
          { id: "wipe_donate", label: "Wipe and donate" },
          { id: "sell_residuary", label: "Sell and add to residuary" },
          NA,
        ],
      },
      {
        id: "data",
        text: "Data handling before handover?",
        type: "single",
        options: [
          { id: "backup_then_handover", label: "Backup to a drive/cloud before handover (enter)", input: { type: "text", name: "Devices.BackupLocation", placeholder: "Drive/Cloud name" } },
          { id: "no_backup_wipe", label: "Do not backup; wipe directly" },
          { id: "digital_custodian_decides", label: "[DigitalCustodian] decides" },
          NA,
        ],
      },
    ],
    template: "My phones and computers shall be [Devices.RulePerItem]. Before transfer, data shall be [Devices.DataRule].",
  },

  // Other Gadgets
  {
    id: "gadgets",
    label: "Other Gadgets (cameras, tablets, etc.)",
    questions: [
      {
        id: "rule",
        text: "How should other gadgets be handled?",
        type: "single",
        options: [
          { id: "give_specific", label: "Give to specific people (paste mapping)", input: { type: "textarea", name: "Gadgets.Map", placeholder: "Gadget → Beneficiary" } },
          { id: "wipe_then_donate_or_sell", label: "Wipe, then donate/sell" },
          { id: "add_residuary", label: "Add to residuary" },
          NA,
        ],
      },
    ],
    template: "My other gadgets shall be [Gadgets.Rule] after responsible data handling.",
  },

  // SIM & Phone Numbers
  {
    id: "sim_numbers",
    label: "SIM & Phone Numbers",
    questions: [
      {
        id: "rule",
        text: "What to do with active mobile numbers?",
        type: "single",
        options: [
          { id: "port_transfer", label: "Port/transfer to a family member if permitted (enter)", input: { type: "text", name: "SIM.Transferee", placeholder: "Name" } },
          { id: "close_after_days", label: "Close after X days", input: { type: "number", name: "SIM.RetentionDays", placeholder: "Days" } },
          { id: "keep_for_otp_then_close", label: "Keep for OTP recovery for X days via [DigitalCustodian], then close", input: { type: "number", name: "SIM.OTPDays", placeholder: "Days" } },
          NA,
        ],
      },
    ],
    template: "My mobile numbers shall be [SIM.Rule], including temporary retention for account recovery if selected.",
  },

  // Physical Artworks
  {
    id: "artworks",
    label: "Physical Artworks",
    questions: [
      {
        id: "rule",
        text: "Who receives artworks?",
        type: "single",
        options: [
          { id: "specific", label: "Specific pieces to specific people (paste mapping)", input: { type: "textarea", name: "Art.Map", placeholder: "Artwork → Beneficiary" } },
          { id: "split_by_piece", label: "Split by piece as listed" },
          { id: "sell_gallery", label: "Sell via gallery/auction; add to residuary" },
          { id: "donate", label: "Donate to museum/school" },
          NA,
        ],
      },
    ],
    template: "My artworks shall be [Art.Rule] as per the inventory.",
  },

  // Password Manager
  {
    id: "password_manager",
    label: "Password Manager",
    questions: [
      {
        id: "emergency",
        text: "Do you authorize emergency access?",
        type: "single",
        options: [
          { id: "to_digital_custodian", label: "Yes, to [DigitalCustodian]" },
          { id: "to_spouse", label: "Yes, to [Spouse]" },
          { id: "no", label: "No" },
          NA,
        ],
      },
      {
        id: "recovery",
        text: "Where is the master key/recovery kept?",
        type: "single",
        options: [
          { id: "in_app_emergency", label: "Emergency access contact set in app" },
          { id: "sealed_env", label: "Sealed envelope with [Executor]" },
          NA,
        ],
      },
    ],
    template: "I authorize [Password.EmergencyAccessPerson] to use my password manager emergency access/recovery kept at [Password.RecoveryLocation] solely to execute this will.",
  },

  // Subscriptions
  {
    id: "subscriptions",
    label: "Subscriptions",
    questions: [
      {
        id: "rule",
        text: "What should happen to paid subscriptions?",
        type: "single",
        options: [
          { id: "cancel_immediate", label: "Cancel immediately" },
          { id: "cancel_cycle_end", label: "Let run till end of billing cycle, then cancel" },
          { id: "transfer_if_possible", label: "Transfer if possible (enter)", input: { type: "text", name: "Subs.Transferee", placeholder: "Name" } },
          NA,
        ],
      },
    ],
    template: "My subscriptions shall be [Subs.Rule].",
  },

  // Digitally Owned Things (licence‑based)
  {
    id: "digital_goods",
    label: "Digitally Owned Things (eBooks, apps, game libraries, etc.)",
    questions: [
      {
        id: "rule",
        text: "Preferred action for digital purchases (subject to platform terms)?",
        type: "single",
        options: [
          { id: "transfer", label: "Transfer to a person where terms allow (enter)", input: { type: "text", name: "DigitalGoods.Transferee", placeholder: "Name" } },
          { id: "cancel_non_transferable", label: "If non‑transferable, cancel/close only" },
          { id: "family_library", label: "Add access to family library if supported" },
          NA,
        ],
      },
    ],
    template: "My digital purchases shall be [DigitalGoods.Rule], subject to platform terms.",
  },

  // Consent to backup transaction history
  {
    id: "txn_history_backup",
    label: "Transaction History – Consent to Backup",
    questions: [
      {
        id: "scope",
        text: "Permit backup and review of transaction history?",
        type: "single",
        options: [
          { id: "full", label: "Yes, full history for settling/defending claims" },
          { id: "last_24m", label: "Yes, only last 24 months" },
          { id: "no", label: "No" },
          NA,
        ],
      },
      {
        id: "access",
        text: "Who may access it?",
        type: "single",
        options: [
          { id: "executor", label: "[Executor]" },
          { id: "digital_custodian", label: "[DigitalCustodian]" },
          { id: "both", label: "Both" },
          NA,
        ],
      },
    ],
    template: "I consent to [TxnHistory.Scope] backup and review by [TxnHistory.Access] solely to settle or defend claims.",
  },

  // Social Media
  {
    id: "social_media",
    label: "Social Media",
    questions: [
      {
        id: "action",
        text: "What should happen to social media accounts?",
        type: "single",
        options: [
          { id: "memorialize", label: "Memorialize where possible" },
          { id: "delete", label: "Delete permanently" },
          { id: "archive_then_delete", label: "Download archive, then delete" },
          NA,
        ],
      },
      {
        id: "farewell",
        text: "Farewell post?",
        type: "single",
        options: [
          { id: "yes", label: "Yes (enter message)", input: { type: "textarea", name: "Social.Message", placeholder: "Your farewell message" } },
          { id: "no", label: "No" },
          { id: "family_decide", label: "Family to decide" },
          NA,
        ],
      },
    ],
    template: "My social media accounts shall be [Social.Action]. If selected, post my farewell message: [Social.Message].",
  },

  // Photos & Videos – Consent to Backup
  {
    id: "photos_videos",
    label: "Local/Cloud Photos & Videos (Consent to Backup)",
    questions: [
      {
        id: "backup_scope",
        text: "Backup media before any deletions?",
        type: "single",
        options: [
          { id: "full", label: "Yes, full backup" },
          { id: "family_albums", label: "Yes, family albums only" },
          { id: "no", label: "No" },
          NA,
        ],
      },
      {
        id: "access",
        text: "Who can access the backed up media?",
        type: "single",
        options: [
          { id: "spouse", label: "[Spouse]" },
          { id: "family_group", label: "Family group" },
          { id: "specific", label: "Specific person (enter)", input: { type: "text", name: "Photos.Person", placeholder: "Name" } },
          NA,
        ],
      },
    ],
    template: "I consent to [Photos.BackupScope] of my photos/videos, accessible to [Photos.Access].",
  },

  // Chats – Consent to Backup
  {
    id: "chats",
    label: "Chats (WhatsApp, Telegram, Instagram DMs) – Consent to Backup",
    questions: [
      {
        id: "scope",
        text: "Backup chats?",
        type: "single",
        options: [
          { id: "important_only", label: "Yes, only marked ‘Important’" },
          { id: "all", label: "Yes, all chats" },
          { id: "no", label: "No" },
          NA,
        ],
      },
      {
        id: "post_rule",
        text: "After backup:",
        type: "single",
        options: [
          { id: "keep_private", label: "Keep private with [DigitalCustodian]" },
          { id: "share_specific", label: "Share with specific person (enter)", input: { type: "text", name: "Chats.SharePerson", placeholder: "Name" } },
          { id: "delete_everywhere", label: "Delete from devices/cloud" },
          NA,
        ],
      },
    ],
    template: "I consent to [Chats.BackupScope] of my chat history to [Chats.Handler], with subsequent [Chats.PostRule].",
  },

  // Digital Notes – Consent to Backup
  {
    id: "digital_notes",
    label: "Digital Notes (Consent to Backup)",
    questions: [
      {
        id: "scope",
        text: "Backup notes?",
        type: "single",
        options: [
          { id: "all", label: "Yes, all" },
          { id: "selected_books", label: "Yes, only certain notebooks (enter)", input: { type: "text", name: "Notes.Notebooks", placeholder: "e.g., Personal, Work" } },
          { id: "no", label: "No" },
          NA,
        ],
      },
      {
        id: "access",
        text: "Who can access the notes backup?",
        type: "single",
        options: [
          { id: "spouse", label: "[Spouse]" },
          { id: "executor", label: "[Executor]" },
          { id: "specific", label: "Specific person (enter)", input: { type: "text", name: "Notes.Person", placeholder: "Name" } },
          NA,
        ],
      },
    ],
    template: "I consent to [Notes.Scope] backup of my notes and handover to [Notes.Access].",
  },

  // Call History – Consent to Backup
  {
    id: "call_history",
    label: "Call History (Consent to Backup)",
    questions: [
      {
        id: "scope",
        text: "Backup call logs?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "last_12m", label: "Yes, last 12 months only" },
          { id: "no", label: "No" },
          NA,
        ],
      },
    ],
    template: "I consent to backup of [Calls.Scope] call records for estate purposes.",
  },

  // Call Recordings – Consent to Backup
  {
    id: "call_recordings",
    label: "Call Recordings / Voice Memos (Consent to Backup)",
    questions: [
      {
        id: "scope",
        text: "Backup personal call recordings/voice memos?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "important_only", label: "Yes, only tagged ‘Important’" },
          { id: "no", label: "No" },
          NA,
        ],
      },
    ],
    template: "I consent to [CallRecs.Scope] backup of call recordings/voice memos for estate purposes.",
  },

  // Contacts – Consent to Backup
  {
    id: "contacts",
    label: "Contacts (Consent to Backup)",
    questions: [
      {
        id: "access",
        text: "Backup contacts and share with:",
        type: "single",
        options: [
          { id: "family_group", label: "Family group" },
          { id: "executor", label: "[Executor]" },
          { id: "specific", label: "Specific person (enter)", input: { type: "text", name: "Contacts.Person", placeholder: "Name" } },
          { id: "no", label: "Do not backup/share" },
          NA,
        ],
      },
    ],
    template: "I consent to backing up my contacts and sharing with [Contacts.Access].",
  },

  // Phone Recordings (device audio / voice notes) – Consent
  {
    id: "phone_audio",
    label: "Phone Recordings / Device Audio (Consent to Backup)",
    questions: [
      {
        id: "scope",
        text: "Backup device audio/voice notes?",
        type: "single",
        options: [
          { id: "all", label: "Yes, all" },
          { id: "folders_only", label: "Yes, only specific folders (enter)", input: { type: "text", name: "PhoneAudio.Folders", placeholder: "Folder names" } },
          { id: "no", label: "No" },
          NA,
        ],
      },
    ],
    template: "I consent to [PhoneAudio.Scope] backup of device audio/voice notes.",
  },

  // Email – Consent to Backup
  {
    id: "email",
    label: "Email (Consent to Backup)",
    questions: [
      {
        id: "rule",
        text: "Email handling preference:",
        type: "single",
        options: [
          { id: "archive_then_close", label: "Download full mailbox archives; then close accounts" },
          { id: "keep_90_then_close", label: "Keep active 90 days for OTP/recovery; then close" },
          { id: "close_immediately", label: "Immediate closure; no archive" },
          NA,
        ],
      },
      {
        id: "access",
        text: "Who gets email access?",
        type: "single",
        options: [
          { id: "digital_custodian", label: "[DigitalCustodian]" },
          { id: "executor", label: "[Executor]" },
          { id: "both", label: "Both" },
          NA,
        ],
      },
    ],
    template: "My email accounts shall be [Email.Rule], with access to [Email.Access].",
  },

  // Local Device Files – Consent to Backup
  {
    id: "local_files",
    label: "Local Device Files (Consent to Backup)",
    questions: [
      {
        id: "scope",
        text: "Backup scope for local device files:",
        type: "single",
        options: [
          { id: "full_images", label: "Full disk images" },
          { id: "docs_media_only", label: "Documents & media only" },
          { id: "no", label: "No backup" },
          NA,
        ],
      },
    ],
    template: "I consent to [LocalFiles.Scope] backup of local device files for estate management.",
  },

  // Google Takeout – Consent
  {
    id: "google_takeout",
    label: "Google Takeout (Maps, Calendar, Photos, Docs, Tasks, GPay) – Consent",
    questions: [
      {
        id: "scope",
        text: "Authorize Google Takeout?",
        type: "single",
        options: [
          { id: "complete", label: "Yes, complete takeout" },
          { id: "exclude_location", label: "Yes, but exclude location history" },
          { id: "no", label: "No" },
          NA,
        ],
      },
      {
        id: "access",
        text: "Who may request/download the Takeout?",
        type: "single",
        options: [
          { id: "digital_custodian", label: "[DigitalCustodian]" },
          { id: "executor", label: "[Executor]" },
          { id: "both", label: "Both" },
          NA,
        ],
      },
    ],
    template: "I authorize [GTakeout.Scope] via Google Takeout by [GTakeout.Access] for estate purposes.",
  },

  // Any Important App Data to Backup
  {
    id: "app_data",
    label: "Any Important App Data to Backup",
    questions: [
      {
        id: "scope",
        text: "Backup app data (banking, UPI, wallets, productivity)?",
        type: "single",
        options: [
          { id: "yes_list_apps", label: "Yes (list apps)", input: { type: "textarea", name: "AppData.Apps", placeholder: "e.g., GPay, PhonePe, Paytm, Notion" } },
          { id: "finance_only", label: "Only finance apps" },
          { id: "no", label: "No" },
          NA,
        ],
      },
    ],
    template: "I consent to backup of [AppData.Scope] for the named apps for estate settlement.",
  },

  // Do you create any art?
  {
    id: "create_art",
    label: "Do you create any art? (songs, drawings/painting, writing, dance clips)",
    questions: [
      {
        id: "disposition",
        text: "How should your creative works/drafts be handled?",
        type: "single",
        options: [
          { id: "share_privately", label: "Share privately with family" },
          { id: "publish_selected", label: "Publish selected works (list)", input: { type: "textarea", name: "Artworks.PublishList", placeholder: "List works to publish" } },
          { id: "archive_no_public", label: "Keep archived; no public release" },
          { id: "ip_manager_decides", label: "Assign to [IPManager] to decide" },
          NA,
        ],
      },
      {
        id: "physical",
        text: "Physical originals go to:",
        type: "single",
        options: [
          { id: "specific", label: "Specific person (enter)", input: { type: "text", name: "Artworks.PhysicalPerson", placeholder: "Name" } },
          { id: "family_keep", label: "Family to keep" },
          { id: "donate", label: "Donate" },
          NA,
        ],
      },
    ],
    template: "My creative works (finished and drafts) shall be [Artworks.Disposition]. Physical originals go to [Artworks.PhysicalRule].",
  },

  // Residuary Clause
  {
    id: "residuary",
    label: "Residuary Clause",
    questions: [
      {
        id: "primary",
        text: "Who gets the residuary estate (everything not mentioned)?",
        type: "single",
        options: [
          { id: "spouse", label: "[Spouse]" },
          { id: "children_eq", label: "[Children] equally" },
          { id: "parents_eq", label: "[Parents] equally" },
          { id: "specific", label: "Specific person (enter)", input: { type: "text", name: "Residuary.Person", placeholder: "Name" } },
          { id: "charity", label: "Charity (enter)", input: { type: "text", name: "Residuary.Charity", placeholder: "Charity name" } },
          { id: "split_percent", label: "Split by percentages (paste)", input: { type: "textarea", name: "Residuary.Split", placeholder: "Name → %" } },
          NA,
        ],
      },
      {
        id: "contingency",
        text: "If a residuary beneficiary predeceases you:",
        type: "single",
        options: [
          { id: "per_stirpes", label: "Their share to their children (per stirpes)" },
          { id: "redistribute_survivors", label: "Re‑distribute among survivors equally" },
          { id: "to_alternate", label: "To an alternate (enter)", input: { type: "text", name: "Residuary.Alternate", placeholder: "Name" } },
          { id: "executor_within_family", label: "As executor decides within family" },
          NA,
        ],
      },
    ],
    template: "I give the rest and residue of my estate to [Residuary.PrimaryRule]. If any such beneficiary does not survive me, then [Residuary.ContingencyRule].",
  },

  // Who should handle physical assets
  {
    id: "physical_handler",
    label: "Who should handle physical assets? (and alternate)",
    questions: [
      {
        id: "primary",
        text: "Primary physical assets handler:",
        type: "single",
        options: [
          { id: "executor", label: "[Executor]" },
          { id: "physical_custodian", label: "[PhysicalCustodian]" },
          { id: "spouse", label: "[Spouse]" },
          { id: "specific", label: "Specific person (enter)", input: { type: "text", name: "Physical.PrimaryPerson", placeholder: "Name" } },
          NA,
        ],
      },
      {
        id: "alternate",
        text: "Alternate if primary cannot serve:",
        type: "single",
        options: [
          { id: "alt1", label: "Alternate 1 (enter)", input: { type: "text", name: "Physical.Alt1", placeholder: "Name" } },
          { id: "alt2", label: "Alternate 2 (enter)", input: { type: "text", name: "Physical.Alt2", placeholder: "Name" } },
          NA,
        ],
      },
    ],
    template: "I appoint [Physical.Primary] to take charge of my physical assets, with [Physical.Alternate] as alternate.",
  },

  // Who should manage digital assets
  {
    id: "digital_handler",
    label: "Who should manage digital assets? (and alternate)",
    questions: [
      {
        id: "primary",
        text: "Primary digital assets custodian:",
        type: "single",
        options: [
          { id: "digital_custodian", label: "[DigitalCustodian]" },
          { id: "executor", label: "[Executor]" },
          { id: "spouse", label: "[Spouse]" },
          { id: "specific", label: "Specific person (enter)", input: { type: "text", name: "Digital.PrimaryPerson", placeholder: "Name" } },
          NA,
        ],
      },
      {
        id: "alternate",
        text: "Alternate if primary cannot serve:",
        type: "single",
        options: [
          { id: "alt1", label: "Alternate 1 (enter)", input: { type: "text", name: "Digital.Alt1", placeholder: "Name" } },
          { id: "alt2", label: "Alternate 2 (enter)", input: { type: "text", name: "Digital.Alt2", placeholder: "Name" } },
          NA,
        ],
      },
    ],
    template: "I appoint [Digital.Primary] as my digital assets custodian, with [Digital.Alternate] as alternate, to act strictly per my consents above.",
  },
];

// Default export
export default TOPICS;
