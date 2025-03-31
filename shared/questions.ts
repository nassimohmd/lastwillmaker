// Define types for the question structure
export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: string;
  placeholder?: string;
  options?: Option[];
  conditional?: {
    field: string;
    value: string;
  };
}

export interface QuestionSection {
  id: string;
  title: string;
  questions: Question[];
}

// Define all questions for the digital assets will and testament
export const questions: QuestionSection[] = [
  {
    id: "basic",
    title: "Basic Information",
    questions: [
      {
        id: "name",
        text: "What is your full name?",
        type: "text",
        placeholder: "Enter your full legal name"
      },
      {
        id: "email",
        text: "What is your email address?",
        type: "text",
        placeholder: "Enter your primary email"
      }
    ]
  },
  {
    id: "social_media",
    title: "Social Media Accounts",
    questions: [
      {
        id: "instagram_action",
        text: "What should be done with your Instagram account?",
        type: "radio",
        options: [
          { value: "delete", label: "Delete it completely" },
          { value: "memorialize", label: "Memorialize it" },
          { value: "keep", label: "Keep it as it is" },
          { value: "transfer", label: "Transfer ownership to someone" }
        ]
      },
      {
        id: "instagram_transfer",
        text: "Who should receive access to your Instagram account?",
        type: "text",
        placeholder: "Enter full name of the person",
        conditional: {
          field: "instagram_action",
          value: "transfer"
        }
      },
      {
        id: "other_social_accounts",
        text: "Which other social media platforms do you use?",
        type: "multiselect",
        options: [
          { value: "facebook", label: "Facebook" },
          { value: "twitter", label: "Twitter/X" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "tiktok", label: "TikTok" },
          { value: "youtube", label: "YouTube" },
          { value: "pinterest", label: "Pinterest" },
          { value: "snapchat", label: "Snapchat" }
        ]
      }
    ]
  },
  {
    id: "messaging_apps",
    title: "Messaging Applications",
    questions: [
      {
        id: "messaging_apps_used",
        text: "Which messaging apps do you use?",
        type: "multiselect",
        options: [
          { value: "whatsapp", label: "WhatsApp" },
          { value: "telegram", label: "Telegram" },
          { value: "signal", label: "Signal" },
          { value: "instagram_dm", label: "Instagram DMs" },
          { value: "fb_messenger", label: "Facebook Messenger" }
        ]
      },
      {
        id: "backup_chats",
        text: "Should your chats be backed up?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, back up all chats" },
          { value: "selective", label: "Only back up specific conversations" },
          { value: "no", label: "No, delete all chats" }
        ]
      },
      {
        id: "specific_chats",
        text: "Are there specific conversations that should be preserved as evidence (e.g., loan agreements)?",
        type: "text",
        placeholder: "List names of people and why their chats should be preserved",
        conditional: {
          field: "backup_chats",
          value: "selective"
        }
      }
    ]
  },
  {
    id: "digital_finances",
    title: "Digital Financial Assets",
    questions: [
      {
        id: "digital_payment",
        text: "Which digital payment services do you use?",
        type: "multiselect",
        options: [
          { value: "paypal", label: "PayPal" },
          { value: "venmo", label: "Venmo" },
          { value: "cashapp", label: "Cash App" },
          { value: "apple_pay", label: "Apple Pay" },
          { value: "google_pay", label: "Google Pay" },
          { value: "crypto", label: "Cryptocurrency wallets" }
        ]
      },
      {
        id: "crypto_ownership",
        text: "Do you own any cryptocurrency?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]
      },
      {
        id: "crypto_instructions",
        text: "How should your cryptocurrency assets be handled?",
        type: "select",
        options: [
          { value: "transfer", label: "Transfer to specific beneficiary" },
          { value: "sell", label: "Sell and add to estate" },
          { value: "donate", label: "Donate to charity" }
        ],
        conditional: {
          field: "crypto_ownership",
          value: "yes"
        }
      }
    ]
  },
  {
    id: "email_accounts",
    title: "Email Accounts",
    questions: [
      {
        id: "email_providers",
        text: "Which email providers do you use?",
        type: "multiselect",
        options: [
          { value: "gmail", label: "Gmail" },
          { value: "outlook", label: "Outlook/Hotmail" },
          { value: "yahoo", label: "Yahoo Mail" },
          { value: "proton", label: "ProtonMail" },
          { value: "work", label: "Work Email" },
          { value: "other", label: "Other Email" }
        ]
      },
      {
        id: "email_action",
        text: "What should happen to your email accounts?",
        type: "radio",
        options: [
          { value: "delete", label: "Delete all accounts" },
          { value: "archive", label: "Archive important emails and delete accounts" },
          { value: "transfer", label: "Provide access to a trusted person" }
        ]
      },
      {
        id: "email_person",
        text: "Who should receive access to your email accounts?",
        type: "text",
        placeholder: "Enter full name of the person",
        conditional: {
          field: "email_action",
          value: "transfer"
        }
      }
    ]
  },
  {
    id: "cloud_storage",
    title: "Cloud Storage",
    questions: [
      {
        id: "cloud_services",
        text: "Which cloud storage services do you use?",
        type: "multiselect",
        options: [
          { value: "google_drive", label: "Google Drive" },
          { value: "dropbox", label: "Dropbox" },
          { value: "onedrive", label: "Microsoft OneDrive" },
          { value: "icloud", label: "Apple iCloud" },
          { value: "box", label: "Box" }
        ]
      },
      {
        id: "cloud_content",
        text: "What type of content is stored in your cloud accounts?",
        type: "multiselect",
        options: [
          { value: "photos", label: "Personal photos" },
          { value: "documents", label: "Important documents" },
          { value: "backups", label: "Device backups" },
          { value: "work", label: "Work-related files" },
          { value: "creative", label: "Creative works/projects" }
        ]
      },
      {
        id: "cloud_action",
        text: "How should your cloud storage be handled?",
        type: "radio",
        options: [
          { value: "preserve_all", label: "Preserve all content" },
          { value: "selective", label: "Preserve selective content" },
          { value: "delete", label: "Delete all content" }
        ]
      }
    ]
  }
];

// Helper for typescript casting
const getOptionsOrEmpty = (question: Question): Option[] => {
  return question.options || [];
};

// Function to get option label by value
const getOptionLabel = (optionsList: Option[], value: string): string => {
  const option = optionsList.find(opt => opt.value === value);
  return option ? option.label : value;
};

// Function to format array of values into a readable list
const formatList = (values: string[], options: Option[] | undefined): string => {
  if (!values || values.length === 0) return "";
  if (!options) return values.join(", ");
  
  const labels = values.map(val => getOptionLabel(options, val));
  
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  
  return labels.slice(0, -1).join(", ") + ", and " + labels[labels.length - 1];
};

// Generate content for the will and testament document
export const generateContent = (responses: Record<string, any>): string => {
  const date = new Date().toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  let content = `DIGITAL ASSETS WILL AND TESTAMENT\n\nDate: ${date}\n\n`;
  
  // Basic Information
  if (responses.name) {
    content += `I, ${responses.name}, being of sound mind, hereby declare this as my will and testament regarding my digital assets and accounts.\n\n`;
  }
  
  // Social Media Accounts
  content += "SOCIAL MEDIA ACCOUNTS\n\n";
  
  // Instagram
  if (responses.instagram_action) {
    content += "Instagram Account: ";
    
    switch (responses.instagram_action) {
      case "delete":
        content += "I direct that my Instagram account should be deleted completely after my passing.\n\n";
        break;
      case "memorialize":
        content += "I wish for my Instagram account to be memorialized as a remembrance.\n\n";
        break;
      case "keep":
        content += "My Instagram account should remain as is without any changes.\n\n";
        break;
      case "transfer":
        content += `I direct that ownership and access to my Instagram account should be transferred to ${responses.instagram_transfer || "my designated digital executor"}.\n\n`;
        break;
    }
  }
  
  // Other social media
  if (responses.other_social_accounts && responses.other_social_accounts.length > 0) {
    const socialOptions = getOptionsOrEmpty(questions[1].questions[2]);
    const socialPlatformsList = formatList(responses.other_social_accounts, socialOptions);
    
    content += `Other Social Media Accounts: I maintain accounts on ${socialPlatformsList}. These accounts should be handled in accordance with the same directive as my Instagram account unless specified otherwise in a separate document.\n\n`;
  }
  
  // Messaging Apps
  content += "MESSAGING APPLICATIONS\n\n";
  
  if (responses.messaging_apps_used && responses.messaging_apps_used.length > 0) {
    const messagingOptions = getOptionsOrEmpty(questions[2].questions[0]);
    const messagingAppsList = formatList(responses.messaging_apps_used, messagingOptions);
    
    content += `I use the following messaging applications: ${messagingAppsList}.\n\n`;
    
    if (responses.backup_chats) {
      switch (responses.backup_chats) {
        case "yes":
          content += "All my chat conversations should be backed up securely before closing any accounts.\n\n";
          break;
        case "no":
          content += "All my chat conversations should be deleted without being reviewed or backed up.\n\n";
          break;
        case "selective":
          content += `Specific conversations that should be preserved: ${responses.specific_chats || "None specifically noted"}. All other conversations can be deleted.\n\n`;
          break;
      }
    }
  }
  
  // Digital Financial Assets
  content += "DIGITAL FINANCIAL ASSETS\n\n";
  
  if (responses.digital_payment && responses.digital_payment.length > 0) {
    const paymentOptions = getOptionsOrEmpty(questions[3].questions[0]);
    const paymentServicesList = formatList(responses.digital_payment, paymentOptions);
    
    content += `Digital Payment Services: I maintain accounts with ${paymentServicesList}. These accounts should be properly closed after any funds are transferred to my estate.\n\n`;
  }
  
  if (responses.crypto_ownership === "yes") {
    content += "Cryptocurrency Assets: ";
    
    if (responses.crypto_instructions) {
      switch (responses.crypto_instructions) {
        case "transfer":
          content += "I direct that all my cryptocurrency holdings be transferred to my designated beneficiary as specified in my detailed digital asset inventory.\n\n";
          break;
        case "sell":
          content += "I direct that all my cryptocurrency holdings be sold and the proceeds added to my estate for distribution.\n\n";
          break;
        case "donate":
          content += "I direct that all my cryptocurrency holdings be donated to charitable organizations as specified in my detailed digital asset inventory.\n\n";
          break;
      }
    }
  }
  
  // Email Accounts
  content += "EMAIL ACCOUNTS\n\n";
  
  if (responses.email_providers && responses.email_providers.length > 0) {
    const emailOptions = getOptionsOrEmpty(questions[4].questions[0]);
    const emailProvidersList = formatList(responses.email_providers, emailOptions);
    
    content += `I maintain email accounts with the following providers: ${emailProvidersList}.\n\n`;
    
    if (responses.email_action) {
      switch (responses.email_action) {
        case "delete":
          content += "I direct that all my email accounts be deleted after my passing without review.\n\n";
          break;
        case "archive":
          content += "I direct that important emails be archived and preserved before the accounts are closed.\n\n";
          break;
        case "transfer":
          content += `I direct that access to my email accounts be granted to ${responses.email_person || "my designated digital executor"} for proper management and eventual closure.\n\n`;
          break;
      }
    }
  }
  
  // Cloud Storage
  content += "CLOUD STORAGE\n\n";
  
  if (responses.cloud_services && responses.cloud_services.length > 0) {
    const cloudOptions = getOptionsOrEmpty(questions[5].questions[0]);
    const cloudServicesList = formatList(responses.cloud_services, cloudOptions);
    
    content += `I use the following cloud storage services: ${cloudServicesList}.\n\n`;
    
    if (responses.cloud_content && responses.cloud_content.length > 0) {
      const contentOptions = getOptionsOrEmpty(questions[5].questions[1]);
      const contentTypesList = formatList(responses.cloud_content, contentOptions);
      
      content += `These cloud accounts contain: ${contentTypesList}.\n\n`;
    }
    
    if (responses.cloud_action) {
      switch (responses.cloud_action) {
        case "preserve_all":
          content += "I direct that all content in my cloud accounts be preserved and transferred to my heirs.\n\n";
          break;
        case "selective":
          content += "I direct that only important documents and personal photos be preserved from my cloud accounts, and the rest can be deleted.\n\n";
          break;
        case "delete":
          content += "I direct that all content in my cloud accounts be deleted after my passing.\n\n";
          break;
      }
    }
  }
  
  // Conclusion
  content += "EXECUTION\n\n";
  content += "This document represents my wishes regarding the handling of my digital assets. I understand that additional technical steps and documentation may be required to implement these directives.\n\n";
  content += `Signed: ${responses.name || "_____________________"}\n\n`;
  content += `Date: ${date}\n\n`;
  
  return content;
};