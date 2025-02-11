import { z } from "zod";

// Replace existing questions with the funeral preferences questionnaire
export const questions = [
  {
    id: "funeral_preferences",
    section: "Funeral Preferences",
    title: "Funeral Arrangements",
    questions: [
      {
        id: "funeral_remains",
        text: "How would you like your remains to be handled?",
        type: "select",
        options: [
          { value: "burial", label: "Burial" },
          { value: "cremation", label: "Cremation" },
          { value: "donation", label: "Donation to science" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "funeral_remains_other",
        text: "Please specify how you would like your remains to be handled:",
        type: "text",
        placeholder: "Enter your preference",
        conditional: { field: "funeral_remains", value: "other" }
      },
      {
        id: "funeral_location",
        text: "Do you have a preferred location for your final resting place?",
        type: "select",
        options: [
          { value: "yes", label: "Yes (please specify)" },
          { value: "no_preference", label: "No preference" }
        ]
      },
      {
        id: "funeral_location_text",
        text: "Please specify the location:",
        type: "text",
        placeholder: "Enter location",
        conditional: { field: "funeral_location", value: "yes" }
      },
      {
        id: "funeral_religious",
        text: "Would you like your funeral to follow any specific religious traditions?",
        type: "select",
        options: [
          { value: "yes", label: "Yes (please specify religion)" },
          { value: "non_religious", label: "No, I prefer a non-religious ceremony" },
          { value: "no_preference", label: "No preference" }
        ]
      },
      {
        id: "funeral_religious_details",
        text: "Please specify the religion:",
        type: "text",
        placeholder: "Enter the religion",
        conditional: { field: "funeral_religious", value: "yes" }
      },
      {
        id: "funeral_requests",
        text: "Do you have any specific requests for your funeral service?",
        type: "select",
        options: [
          { value: "yes", label: "Yes (please describe)" },
          { value: "no", label: "No specific requests" }
        ]
      },
      {
        id: "funeral_requests_details",
        text: "Please describe your specific requests for your funeral service:",
        type: "text",
        placeholder: "Enter your requests",
        conditional: { field: "funeral_requests", value: "yes" }
      },
      {
        id: "funeral_elements",
        text: "Would you like any specific music, readings, or other elements included in your funeral service?",
        type: "select",
        options: [
          { value: "yes", label: "Yes (please specify)" },
          { value: "no", label: "No specific requests" }
        ]
      },
      {
        id: "funeral_elements_details",
        text: "Please specify the music, readings, or other elements:",
        type: "text",
        placeholder: "Enter details",
        conditional: { field: "funeral_elements", value: "yes" }
      }
    ]
  }
];

// Update generateContent to output funeral preferences dynamically
export function generateContent(responses: Record<string, any>): string {
  let content = "LAST WILL AND TESTAMENT\n\n";
  content += "DIGITAL ASSETS AND ACCOUNTS\n\n";
  // ...existing sections...

  // Append Funeral Preferences Section
  content += "V. FUNERAL PREFERENCES\n\n";
  const name = responses.name || "I";
  content += `${name}, hereby express my wishes regarding my funeral arrangements. `;

  if (responses.funeral_remains) {
    const remainsAction = responses.funeral_remains === "other" && responses.funeral_remains_other
      ? responses.funeral_remains_other
      : {
        burial: "be handled through burial",
        cremation: "be cremated",
        donation: "be donated to science"
      }[responses.funeral_remains] || "";
    content += `I desire that my remains ${remainsAction}. `;
  }

  if (responses.funeral_location === "yes" && responses.funeral_location_text) {
    content += `I would like my final resting place to be at ${responses.funeral_location_text}. `;
  }

  if (responses.funeral_religious) {
    if (responses.funeral_religious === "yes" && responses.funeral_religious_details) {
      content += `I request that my funeral service follow the traditions of the ${responses.funeral_religious_details} faith. `;
    } else if (responses.funeral_religious === "non_religious") {
      content += "I prefer a non-religious ceremony for my funeral service. ";
    } else if (responses.funeral_religious === "no_preference") {
      content += "I have no specific preference regarding the religious nature of my funeral service. ";
    }
  }

  if (responses.funeral_requests === "yes" && responses.funeral_requests_details) {
    content += `For my funeral service, I would like ${responses.funeral_requests_details}. `;
  }

  if (responses.funeral_elements === "yes" && responses.funeral_elements_details) {
    content += `I wish for the following to be included in my funeral service: ${responses.funeral_elements_details}. `;
  } else if (responses.funeral_elements === "no") {
    content += "I leave the details of my funeral service to the discretion of my family and loved ones. ";
  }

  // ...existing code...
  return content;
}