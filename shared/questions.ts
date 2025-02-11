import { z } from "zod";

export const questions = [
  {
    id: "social_media",
    section: "Social Media Accounts",
    questions: [
      {
        id: "remains_handling",
        text: "How would you like your remains to be handled?",
        type: "select",
        options: [
          { value: "burial", label: "Burial" },
          { value: "cremation", label: "Cremation" },
          { value: "donation", label: " Donation to science" },
          { value: "other", label: "Other" },
        ],
      },
      { id: "remains_burial",
          text: "Where should be buried",
          type: "select",
          options: [
            { value: "home", label: "Home" },
            { value: "mosque", label: "Local Mosque" },
            { value: "cemetery", label: "Local cemetery" },
            { value: "Public", label: "Any public place" },
            { value: "other", label: "Other" },
            ],
          conditional: {
            field: "remains_handling",
            value: "burial",
          },
        },
      {
        id: "burial_other",
        text: "Please specify where to bury",
        type: "text",
        placeholder: "Enter your preference",
        conditional: {
          field: "remains_burial",
          value: "other",
        },
      },
      { id: "remains_cremation",
        text: "Where should be cremated",
        type: "select",
        options: [
          { value: "home", label: "Home" },
          { value: "crematorium", label: "Public Crematoriums" },
          { value: "Temple", label: "Temple" },
          { value: "other", label: "Other" },
          ],
        conditional: {
          field: "remains_handling",
          value: "cremation",
        },
      },
      {
        id: "cremate_other",
        text: "Please specify where to cremate",
        type: "text",
        placeholder: "Enter your preference",
        conditional: {
          field: "remains_cremation",
          value: "other",
        },
      },
      {
        id: "remains_other",
        text: "Please specify what should be done with your remains",
        type: "text",
        placeholder: "Enter your preference",
        conditional: {
          field: "remains_handling",
          value: "other",
        },
      },
    ],
  },
];

{
  id: "2",
  section: "2",
  questions: [
    {
      id: "thendi",
      text: "Poda patti",
      type: "select",
      options: [
        { value: "burial", label: "Burial" },
        { value: "cremation", label: "Cremation" },
        { value: "donation", label: " Donation to science" },
        { value: "other", label: "Other" },
      ],
    },
  ],
},
];

export function generateContent(responses: Record<string, any>): string {
  let content = "LAST WILL AND TESTAMENT\n\n";

  // Social Media Section
  content += "I. SOCIAL MEDIA ACCOUNTS\n\n";

  // Instagram handling
  if (responses.instagram) {
    let instagramAction;
    if (responses.instagram === "other" && responses.instagram_other) {
      instagramAction = responses.instagram_other;
    } else {
      instagramAction =
        {
          delete: "should be deleted",
          memorialize: "should be memorialized",
          keep: "should be kept as is",
        }[responses.instagram] || "should be handled as specified";
    }
    content += `1. My Instagram account ${instagramAction}.\n\n`;
  }

  // Other social media accounts
  if (responses.other_social_accounts?.length) {
    content += `2. My other social media accounts (${responses.other_social_accounts.join(", ")}) `;
    if (responses.social_media_instruction) {
      const action = {
        delete_all: "should all be deleted",
        memorialize_all: "should be memorialized",
        transfer: "should be transferred to my designated family member",
      }[responses.social_media_instruction];
      content += `${action}.\n\n`;
    }
  }

  // Messaging Apps Section
  content += "II. MESSAGING APPLICATIONS\n\n";

  if (responses.messaging_apps?.length) {
    content += `1. I use the following messaging applications: ${responses.messaging_apps.join(", ")}.\n\n`;
  }

  if (responses.backup_chats === "yes") {
    content += "2. My chat history should be backed up securely.";
    if (responses.important_chats) {
      content += ` Specifically, conversations with ${responses.important_chats} should be preserved as they may contain important evidence or documentation.`;
    }
    content += "\n\n";
  } else if (responses.backup_chats === "no") {
    content += "2. All chat histories should be deleted.\n\n";
  }

  // Digital Finance Section
  content += "III. DIGITAL FINANCIAL ASSETS\n\n";

  if (responses.crypto_wallets === "yes") {
    content += "1. I own cryptocurrency wallets. ";
    if (responses.wallet_instructions) {
      content += `Instructions for accessing these wallets: ${responses.wallet_instructions}\n\n`;
    }
  }

  if (responses.online_banking === "yes" && responses.banking_details) {
    content += `2. I maintain online banking accounts with the following institutions: ${responses.banking_details}. Proper legal procedures should be followed to transfer or close these accounts.\n\n`;
  }

  // Email Accounts Section
  content += "IV. EMAIL ACCOUNTS\n\n";

  if (responses.primary_email) {
    const emailAction = {
      delete: "should be deleted after 30 days",
      archive: "should have important emails archived and then be deleted",
      transfer: "should be transferred to a designated family member",
      auto_reply: "should remain active with an automatic reply message",
    }[responses.primary_email];

    content += `1. My primary email account ${emailAction}.`;
    if (responses.primary_email === "archive" && responses.important_emails) {
      content += ` The following emails/folders should be preserved: ${responses.important_emails}`;
    }
    content += "\n\n";
  }

  return content;
}
