import { z } from "zod";

export const questions = [
  {
    id: "social_media",
    section: "Social Media Accounts",
    title: "Social Media Accounts",
    questions: [
      {
        id: "instagram",
        text: "What should be done with your Instagram account?",
        type: "select",
        options: [
          { value: "delete", label: "Delete it" },
          { value: "memorialize", label: "Memorialize it" },
          { value: "keep", label: "Keep it as is" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "instagram_other",
        text: "Please specify what should be done with your Instagram account:",
        type: "text",
        placeholder: "Enter your preference",
        conditional: {
          field: "instagram",
          value: "other"
        }
      },
      {
        id: "other_social_accounts",
        text: "Do you have any other social media accounts that need to be managed?",
        type: "multiselect",
        options: [
          { value: "facebook", label: "Facebook" },
          { value: "twitter", label: "Twitter/X" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "tiktok", label: "TikTok" }
        ]
      },
      {
        id: "social_media_instruction",
        text: "What should be done with these accounts?",
        type: "select",
        options: [
          { value: "delete_all", label: "Delete all accounts" },
          { value: "memorialize_all", label: "Memorialize all accounts" },
          { value: "transfer", label: "Transfer to a family member" }
        ],
        conditional: {
          field: "other_social_accounts",
          value: ["facebook", "twitter", "linkedin", "tiktok"]
        }
      }
    ]
  },
  {
    id: "messaging",
    section: "Messaging Applications",
    title: "Messaging Apps & Communication",
    questions: [
      {
        id: "messaging_apps",
        text: "Which messaging apps do you use?",
        type: "multiselect",
        options: [
          { value: "whatsapp", label: "WhatsApp" },
          { value: "telegram", label: "Telegram" },
          { value: "signal", label: "Signal" },
          { value: "instagram_dm", label: "Instagram Direct" }
        ]
      },
      {
        id: "backup_chats",
        text: "Should your chats be backed up?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]
      },
      {
        id: "important_chats",
        text: "Are there any specific chats that should be preserved as evidence?",
        type: "text",
        placeholder: "Enter names separated by commas",
        conditional: {
          field: "backup_chats",
          value: "yes"
        }
      }
    ]
  },
  {
    id: "digital_finance",
    section: "Digital Financial Assets",
    title: "Digital Financial Assets",
    questions: [
      {
        id: "crypto_wallets",
        text: "Do you own any cryptocurrency wallets?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]
      },
      {
        id: "wallet_instructions",
        text: "Please provide instructions for accessing your crypto wallets:",
        type: "text",
        placeholder: "Enter secure instructions for wallet access",
        conditional: {
          field: "crypto_wallets",
          value: "yes"
        }
      },
      {
        id: "online_banking",
        text: "Do you have any online-only bank accounts?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]
      },
      {
        id: "banking_details",
        text: "List your online banking institutions:",
        type: "text",
        placeholder: "Enter bank names separated by commas",
        conditional: {
          field: "online_banking",
          value: "yes"
        }
      }
    ]
  },
  {
    id: "email_accounts",
    section: "Email Accounts",
    title: "Email Accounts",
    questions: [
      {
        id: "primary_email",
        text: "What should be done with your primary email account?",
        type: "select",
        options: [
          { value: "delete", label: "Delete after 30 days" },
          { value: "archive", label: "Archive important emails and delete" },
          { value: "transfer", label: "Transfer to a family member" },
          { value: "auto_reply", label: "Set up auto-reply and keep active" }
        ]
      },
      {
        id: "important_emails",
        text: "Are there any important emails that should be preserved?",
        type: "text",
        placeholder: "Describe important emails or folders to preserve",
        conditional: {
          field: "primary_email",
          value: "archive"
        }
      }
    ]
  }
];

export function generateContent(responses: Record<string, any>): string {
  let content = "LAST WILL AND TESTAMENT\n\n";
  content += "DIGITAL ASSETS AND ACCOUNTS\n\n";

  // Social Media Section
  content += "I. SOCIAL MEDIA ACCOUNTS\n\n";

  // Instagram handling
  if (responses.instagram) {
    let instagramAction;
    if (responses.instagram === "other" && responses.instagram_other) {
      instagramAction = responses.instagram_other;
    } else {
      instagramAction = {
        delete: "should be deleted",
        memorialize: "should be memorialized",
        keep: "should be kept as is"
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
        transfer: "should be transferred to my designated family member"
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
      auto_reply: "should remain active with an automatic reply message"
    }[responses.primary_email];

    content += `1. My primary email account ${emailAction}.`;
    if (responses.primary_email === "archive" && responses.important_emails) {
      content += ` The following emails/folders should be preserved: ${responses.important_emails}`;
    }
    content += "\n\n";
  }

  return content;
}