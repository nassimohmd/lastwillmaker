export const questions = [
  {
    id: "social_media",
    section: "Digital Assets",
    title: "Social Media Accounts",
    questions: [
      {
        id: "instagram",
        text: "What should be done with your Instagram account?",
        type: "select",
        options: [
          { value: "delete", label: "Delete it" },
          { value: "memorialize", label: "Memorialize it" },
          { value: "keep", label: "Keep it as is" }
        ]
      },
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
  }
];

export function generateContent(responses: Record<string, any>): string {
  let content = "LAST WILL AND TESTAMENT\n\n";
  content += "DIGITAL ASSETS AND ACCOUNTS\n\n";

  // Instagram handling
  if (responses.instagram) {
    const action = {
      delete: "should be deleted",
      memorialize: "should be memorialized",
      keep: "should be kept as is"
    }[responses.instagram];
    
    content += `1. My Instagram account ${action}.\n\n`;
  }

  // Messaging apps
  if (responses.messaging_apps?.length) {
    content += `2. I use the following messaging applications: ${responses.messaging_apps.join(", ")}.\n\n`;
  }

  // Chat backups
  if (responses.backup_chats === "yes") {
    content += "3. My chat history should be backed up securely.";
    if (responses.important_chats) {
      content += ` Specifically, conversations with ${responses.important_chats} should be preserved as they may contain important evidence or documentation.`;
    }
    content += "\n\n";
  } else {
    content += "3. All chat histories should be deleted.\n\n";
  }

  return content;
}
