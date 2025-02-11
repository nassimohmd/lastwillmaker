import { z } from "zod";

export const questions = [
  {
    id: "2",
    section: "2",
    questions: [
      {
        id: "name",
        text: "Full Name",
        type: "text",
      },
      {
        id: "father_name",
        text: "Father's Name",
        type: "text",
      },
    ],
  },
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

export function generateContent(responses: Record<string, any>): string {
  let content = "LAST WILL AND TESTAMENT\n\n";
  
  // Add greeting with name and father's name
  if (responses.name && responses.father_name) {
    content += `I, ${responses.name}, son of ${responses.father_name}, do hereby revoke all my formal Wills, Codicils and Testamentary disposition made by m. I declare this to be my last Will and Testament\n\n`;

     content += `I maintain good health, and possess a sound mind. This Will is made by me on my own independent decision and free volition. Have not be influenced, cajoled or coerced in any manner whatsoever\n\n`;
  }

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

  // Funeral arrangements}

  return content;
}
