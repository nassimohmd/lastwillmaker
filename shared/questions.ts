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
          { value: "tiktok", label: "TikTok" },
          { value: "snapchat", label: "Snapchat" },
          { value: "threads", label: "Threads" },
          { value: "youtube", label: "YouTube" }
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
          value: ["facebook", "twitter", "linkedin", "tiktok", "snapchat", "threads", "youtube"]
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
          { value: "instagram_dm", label: "Instagram Direct" },
          { value: "messenger", label: "Facebook Messenger" },
          { value: "discord", label: "Discord" },
          { value: "slack", label: "Slack" }
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
      },
      {
        id: "digital_payment",
        text: "Do you use digital payment services?",
        type: "multiselect",
        options: [
          { value: "paypal", label: "PayPal" },
          { value: "venmo", label: "Venmo" },
          { value: "cashapp", label: "Cash App" },
          { value: "applepay", label: "Apple Pay" },
          { value: "googlepay", label: "Google Pay" }
        ]
      }
    ]
  },
  {
    id: "cloud_storage",
    section: "Cloud Storage",
    title: "Cloud Storage & Important Files",
    questions: [
      {
        id: "cloud_services",
        text: "Which cloud storage services do you use?",
        type: "multiselect",
        options: [
          { value: "google_drive", label: "Google Drive" },
          { value: "dropbox", label: "Dropbox" },
          { value: "icloud", label: "iCloud" },
          { value: "onedrive", label: "OneDrive" },
          { value: "box", label: "Box" }
        ]
      },
      {
        id: "important_files",
        text: "Are there any important files or folders that should be preserved?",
        type: "text",
        placeholder: "Describe important files or folders to preserve",
        conditional: {
          field: "cloud_services",
          value: ["google_drive", "dropbox", "icloud", "onedrive", "box"]
        }
      },
      {
        id: "cloud_action",
        text: "What should be done with your cloud storage accounts?",
        type: "select",
        options: [
          { value: "delete", label: "Delete after backing up important files" },
          { value: "transfer", label: "Transfer to a designated person" },
          { value: "keep", label: "Keep accounts active" }
        ],
        conditional: {
          field: "cloud_services",
          value: ["google_drive", "dropbox", "icloud", "onedrive", "box"]
        }
      }
    ]
  },
  {
    id: "subscriptions",
    section: "Subscriptions & Memberships",
    title: "Subscriptions & Memberships",
    questions: [
      {
        id: "streaming_services",
        text: "Which streaming services do you subscribe to?",
        type: "multiselect",
        options: [
          { value: "netflix", label: "Netflix" },
          { value: "hulu", label: "Hulu" },
          { value: "disney", label: "Disney+" },
          { value: "amazon", label: "Amazon Prime" },
          { value: "spotify", label: "Spotify" },
          { value: "apple_music", label: "Apple Music" },
          { value: "youtube", label: "YouTube Premium" }
        ]
      },
      {
        id: "subscription_action",
        text: "What should be done with your subscriptions?",
        type: "select",
        options: [
          { value: "cancel_all", label: "Cancel all subscriptions" },
          { value: "transfer_some", label: "Transfer some to family members" },
          { value: "keep_all", label: "Keep all subscriptions active" }
        ],
        conditional: {
          field: "streaming_services",
          value: ["netflix", "hulu", "disney", "amazon", "spotify", "apple_music", "youtube"]
        }
      },
      {
        id: "transfer_details",
        text: "Which subscriptions should be transferred and to whom?",
        type: "text",
        placeholder: "E.g., Netflix to my spouse, Spotify to my son",
        conditional: {
          field: "subscription_action",
          value: "transfer_some"
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
      },
      {
        id: "secondary_emails",
        text: "Do you have any secondary email accounts?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]
      },
      {
        id: "secondary_email_action",
        text: "What should be done with these accounts?",
        type: "select",
        options: [
          { value: "delete_all", label: "Delete all secondary accounts" },
          { value: "forward", label: "Forward important emails and delete" }
        ],
        conditional: {
          field: "secondary_emails",
          value: "yes"
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
    let instagramAction: string;
    if (responses.instagram === "other" && responses.instagram_other) {
      instagramAction = responses.instagram_other;
    } else {
      const actions: Record<string, string> = {
        delete: "should be deleted",
        memorialize: "should be memorialized",
        keep: "should be kept as is"
      };
      instagramAction = actions[responses.instagram as keyof typeof actions] || "should be handled as specified";
    }
    content += `1. My Instagram account ${instagramAction}.\n\n`;
  }

  // Other social media accounts
  if (responses.other_social_accounts?.length) {
    content += `2. My other social media accounts (${responses.other_social_accounts.join(", ")}) `;
    if (responses.social_media_instruction) {
      const actions: Record<string, string> = {
        delete_all: "should all be deleted",
        memorialize_all: "should be memorialized",
        transfer: "should be transferred to my designated family member"
      };
      const action = actions[responses.social_media_instruction as keyof typeof actions] || "";
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

  if (responses.digital_payment?.length) {
    content += `3. I use the following digital payment services: ${responses.digital_payment.join(", ")}. These accounts should be properly closed following the respective platform's procedures.\n\n`;
  }

  // Cloud Storage Section
  content += "IV. CLOUD STORAGE\n\n";

  if (responses.cloud_services?.length) {
    content += `1. I use the following cloud storage services: ${responses.cloud_services.join(", ")}.\n\n`;
    
    if (responses.important_files) {
      content += `2. The following files/folders should be preserved: ${responses.important_files}.\n\n`;
    }
    
    if (responses.cloud_action) {
      const actions: Record<string, string> = {
        delete: "should be deleted after backing up important files",
        transfer: "should be transferred to a designated person",
        keep: "should be kept active"
      };
      const action = actions[responses.cloud_action as keyof typeof actions] || "";
      
      content += `3. My cloud storage accounts ${action}.\n\n`;
    }
  }

  // Subscriptions Section
  content += "V. SUBSCRIPTIONS & MEMBERSHIPS\n\n";

  if (responses.streaming_services?.length) {
    content += `1. I subscribe to the following services: ${responses.streaming_services.join(", ")}.\n\n`;
    
    if (responses.subscription_action) {
      const actions: Record<string, string> = {
        cancel_all: "should all be cancelled",
        transfer_some: "should be handled according to the transfer details below",
        keep_all: "should be kept active"
      };
      const action = actions[responses.subscription_action as keyof typeof actions] || "";
      
      content += `2. My subscriptions ${action}.\n\n`;
      
      if (responses.subscription_action === "transfer_some" && responses.transfer_details) {
        content += `3. Transfer details: ${responses.transfer_details}.\n\n`;
      }
    }
  }

  // Email Accounts Section
  content += "VI. EMAIL ACCOUNTS\n\n";

  if (responses.primary_email) {
    const actions: Record<string, string> = {
      delete: "should be deleted after 30 days",
      archive: "should have important emails archived and then be deleted",
      transfer: "should be transferred to a designated family member",
      auto_reply: "should remain active with an automatic reply message"
    };
    const emailAction = actions[responses.primary_email as keyof typeof actions] || "";

    content += `1. My primary email account ${emailAction}.`;
    if (responses.primary_email === "archive" && responses.important_emails) {
      content += ` The following emails/folders should be preserved: ${responses.important_emails}`;
    }
    content += "\n\n";
  }

  if (responses.secondary_emails === "yes") {
    const actions: Record<string, string> = {
      delete_all: "should all be deleted",
      forward: "should have important emails forwarded and then be deleted"
    };
    const secondaryAction = responses.secondary_email_action || "delete_all";
    const action = actions[secondaryAction as keyof typeof actions] || "";
    
    content += `2. My secondary email accounts ${action}.\n\n`;
  }

  content += "This document represents my wishes regarding my digital assets and accounts. I understand that digital property laws vary by jurisdiction, and I have consulted with legal professionals as necessary.\n\n";
  
  content += "Dated: " + new Date().toLocaleDateString() + "\n\n";
  content += "_______________________________\n";
  content += "Signature\n\n";
  
  return content;
}