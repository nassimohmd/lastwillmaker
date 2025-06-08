import { z } from "zod";

export const questions = [
  {
    id: "final_wishes",
    section: "Part 1: Your Final Wishes",
    title: "Your Final Wishes",
    questions: [
      {
        id: "remains_handling",
        text: "How would you like your remains to be handled?",
        type: "select",
        options: [
          { value: "cremated", label: "I wish to be cremated." },
          { value: "buried", label: "I wish to be buried." },
          { value: "no_preference", label: "I have no preference." },
          { value: "other", label: "Other (please specify)" }
        ]
      },
      {
        id: "remains_other",
        text: "Please specify your other preference:",
        type: "text",
        placeholder: "Enter your preference",
        conditional: {
          field: "remains_handling",
          value: "other"
        }
      },
      {
        id: "memorial_service",
        text: "What kind of memorial service would you prefer?",
        type: "select",
        options: [
          { value: "traditional", label: "A traditional funeral service." },
          { value: "celebration", label: "A more informal celebration of life." },
          { value: "no_service", label: "No service at all." },
          { value: "other", label: "Other (please specify)" }
        ]
      },
      {
        id: "memorial_other",
        text: "Please specify your other preference:",
        type: "text",
        placeholder: "Enter your preference",
        conditional: {
          field: "memorial_service",
          value: "other"
        }
      },
      {
        id: "final_resting_place",
        text: "Where would you like your final resting place to be?",
        type: "select",
        options: [
          { value: "specific", label: "A specific cemetery or location" },
          { value: "family_decide", label: "My family to decide." },
          { value: "no_preference", label: "No preference." }
        ]
      },
      {
        id: "resting_place_details",
        text: "Please specify the cemetery or location:",
        type: "text",
        placeholder: "Enter the specific location",
        conditional: {
          field: "final_resting_place",
          value: "specific"
        }
      },
      {
        id: "organ_donation",
        text: "Do you wish to be an organ donor?",
        type: "select",
        options: [
          { value: "yes_any", label: "Yes, I consent to the donation of any of my organs or tissues for transplantation or medical research." },
          { value: "yes_specific", label: "Yes, but only for specific organs/tissues" },
          { value: "no", label: "No, I do not wish to be an organ donor." }
        ]
      },
      {
        id: "specific_organs",
        text: "Please specify which organs/tissues:",
        type: "text",
        placeholder: "List the specific organs or tissues",
        conditional: {
          field: "organ_donation",
          value: "yes_specific"
        }
      }
    ]
  },
  {
    id: "financial_assets",
    section: "Part 2: Your Financial Assets",
    title: "Your Financial Assets",
    questions: [
      {
        id: "primary_bank_distribution",
        text: "How should the funds in your primary bank account be distributed?",
        type: "select",
        options: [
          { value: "specific_person", label: "To a specific person" },
          { value: "children_equally", label: "To be divided equally among my children." },
          { value: "specific_individuals", label: "To be divided equally among specific individuals" },
          { value: "residuary_estate", label: "To be added to my residuary estate (the remainder of your assets)." }
        ]
      },
      {
        id: "primary_bank_person",
        text: "Please provide their full name and relationship:",
        type: "text",
        placeholder: "Full name and relationship",
        conditional: {
          field: "primary_bank_distribution",
          value: "specific_person"
        }
      },
      {
        id: "primary_bank_individuals",
        text: "Please list their full names:",
        type: "text",
        placeholder: "List full names",
        conditional: {
          field: "primary_bank_distribution",
          value: "specific_individuals"
        }
      },
      {
        id: "other_bank_accounts",
        text: "Do you have other bank accounts (savings, checking, etc.)?",
        type: "select",
        options: [
          { value: "same_distribution", label: "Yes, and I want the funds distributed in the same way as my primary account." },
          { value: "different_wishes", label: "Yes, and I have different wishes for each" },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "other_bank_details",
        text: "Please specify for each account:",
        type: "text",
        placeholder: "Specify your wishes for each account",
        conditional: {
          field: "other_bank_accounts",
          value: "different_wishes"
        }
      },
      {
        id: "stocks_bonds_handling",
        text: "How should your stock portfolio, mutual funds, and bonds be handled?",
        type: "select",
        options: [
          { value: "specific_person", label: "To a specific person" },
          { value: "liquidated", label: "To be liquidated and the proceeds distributed" },
          { value: "divided_equally", label: "To be divided equally among specific people" },
          { value: "residuary_estate", label: "To be added to my residuary estate." }
        ]
      },
      {
        id: "stocks_specific_person",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "stocks_bonds_handling",
          value: "specific_person"
        }
      },
      {
        id: "stocks_liquidated_to",
        text: "Please specify who should receive the proceeds:",
        type: "text",
        placeholder: "Who should receive the proceeds",
        conditional: {
          field: "stocks_bonds_handling",
          value: "liquidated"
        }
      },
      {
        id: "stocks_divided_among",
        text: "Please specify who they should be divided among:",
        type: "text",
        placeholder: "List the people",
        conditional: {
          field: "stocks_bonds_handling",
          value: "divided_equally"
        }
      },
      {
        id: "gold_crypto_handling",
        text: "What should happen to your holdings of gold, digital gold, and cryptocurrencies?",
        type: "select",
        options: [
          { value: "specific_person", label: "To a specific person who will receive the assets and any necessary access information" },
          { value: "sold", label: "To be sold and the proceeds given to someone" },
          { value: "residuary_estate", label: "To be added to my residuary estate." }
        ]
      },
      {
        id: "gold_crypto_person",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "gold_crypto_handling",
          value: "specific_person"
        }
      },
      {
        id: "gold_crypto_proceeds_to",
        text: "Please specify who should receive the proceeds:",
        type: "text",
        placeholder: "Who should receive the proceeds",
        conditional: {
          field: "gold_crypto_handling",
          value: "sold"
        }
      }
    ]
  },
  {
    id: "debts_receivables",
    section: "Part 3: Debts and Receivables",
    title: "Debts and Receivables",
    questions: [
      {
        id: "debt_settlement",
        text: "How should any outstanding debts (loans, EMIs, credit card balances, \"buy now, pay later\" services) be settled?",
        type: "select",
        options: [
          { value: "from_estate", label: "To be paid from my estate before any assets are distributed." },
          { value: "life_insurance", label: "I have a specific life insurance policy intended to cover these debts." },
          { value: "no_debts", label: "I have no significant debts." }
        ]
      },
      {
        id: "major_receivables",
        text: "Is there anyone who owes you a significant amount of money?",
        type: "select",
        options: [
          { value: "yes_collect", label: "Yes, and I want this amount to be collected and added to my estate" },
          { value: "yes_forgive", label: "Yes, but I forgive the debt upon my passing." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "receivables_details",
        text: "Please provide their name and the approximate amount owed:",
        type: "text",
        placeholder: "Name and amount owed",
        conditional: {
          field: "major_receivables",
          value: "yes_collect"
        }
      }
    ]
  },
  {
    id: "personal_belongings",
    section: "Part 4: Your Personal Belongings",
    title: "Your Personal Belongings",
    questions: [
      {
        id: "jewelry_distribution",
        text: "Do you have specific pieces of jewelry or ornaments you'd like to go to certain people?",
        type: "select",
        options: [
          { value: "specific_items", label: "Yes, I have specific items for specific people" },
          { value: "all_to_one", label: "All my jewelry and ornaments should go to one person" },
          { value: "divide_among", label: "My jewelry and ornaments should be divided among specific people" },
          { value: "residuary_estate", label: "To be added to my residuary estate." }
        ]
      },
      {
        id: "jewelry_specific_items",
        text: "Please list the item and the recipient:",
        type: "text",
        placeholder: "Item: Recipient",
        conditional: {
          field: "jewelry_distribution",
          value: "specific_items"
        }
      },
      {
        id: "jewelry_all_to_one_person",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "jewelry_distribution",
          value: "all_to_one"
        }
      },
      {
        id: "jewelry_divide_among_people",
        text: "Please specify who they should be divided among:",
        type: "text",
        placeholder: "List the people",
        conditional: {
          field: "jewelry_distribution",
          value: "divide_among"
        }
      },
      {
        id: "primary_residence",
        text: "What should happen to your primary residence?",
        type: "select",
        options: [
          { value: "specific_person", label: "To a specific person" },
          { value: "sold", label: "To be sold and the proceeds distributed" },
          { value: "trust", label: "To be held in a trust for the benefit of someone" },
          { value: "no_real_estate", label: "I do not own real estate." }
        ]
      },
      {
        id: "residence_specific_person",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "primary_residence",
          value: "specific_person"
        }
      },
      {
        id: "residence_proceeds_to",
        text: "Please specify who should receive the proceeds:",
        type: "text",
        placeholder: "Who should receive the proceeds",
        conditional: {
          field: "primary_residence",
          value: "sold"
        }
      },
      {
        id: "residence_trust_beneficiary",
        text: "Please specify the beneficiary of the trust:",
        type: "text",
        placeholder: "Beneficiary of the trust",
        conditional: {
          field: "primary_residence",
          value: "trust"
        }
      },
      {
        id: "other_properties",
        text: "Do you own other properties?",
        type: "select",
        options: [
          { value: "same_as_primary", label: "Yes, and I want them handled in the same way as my primary residence." },
          { value: "different_wishes", label: "Yes, and I have different wishes for each" },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "other_properties_details",
        text: "Please specify your wishes for each property:",
        type: "text",
        placeholder: "Specify wishes for each property",
        conditional: {
          field: "other_properties",
          value: "different_wishes"
        }
      },
      {
        id: "vehicles",
        text: "What are your wishes for your vehicle(s)?",
        type: "select",
        options: [
          { value: "specific_person", label: "To a specific person" },
          { value: "sold", label: "To be sold and the proceeds distributed" },
          { value: "no_vehicles", label: "I do not own any vehicles." }
        ]
      },
      {
        id: "vehicles_details",
        text: "Please specify the vehicle and recipient:",
        type: "text",
        placeholder: "Vehicle: Recipient",
        conditional: {
          field: "vehicles",
          value: "specific_person"
        }
      },
      {
        id: "vehicles_proceeds_to",
        text: "Please specify who should receive the proceeds:",
        type: "text",
        placeholder: "Who should receive the proceeds",
        conditional: {
          field: "vehicles",
          value: "sold"
        }
      },
      {
        id: "collectibles",
        text: "Do you have any collections (stamps, coins, art, etc.) or other valuable items?",
        type: "select",
        options: [
          { value: "specific_recipient", label: "Yes, and I want them to go to specific people" },
          { value: "appraised_sold", label: "To be appraised and sold, with the proceeds going to someone" },
          { value: "residuary_estate", label: "To be added to my residuary estate." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "collectibles_specific",
        text: "Please specify the collection and recipient:",
        type: "text",
        placeholder: "Collection: Recipient",
        conditional: {
          field: "collectibles",
          value: "specific_recipient"
        }
      },
      {
        id: "collectibles_proceeds_to",
        text: "Please specify who should receive the proceeds:",
        type: "text",
        placeholder: "Who should receive the proceeds",
        conditional: {
          field: "collectibles",
          value: "appraised_sold"
        }
      },
      {
        id: "intellectual_property",
        text: "Do you own any intellectual property (copyrights, trademarks, patents, royalties)?",
        type: "select",
        options: [
          { value: "all_to_one", label: "Yes, and I want all rights and future income to go to one person" },
          { value: "specific_instructions", label: "Yes, and I have specific instructions for different properties" },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "ip_all_to_person",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "intellectual_property",
          value: "all_to_one"
        }
      },
      {
        id: "ip_specific_instructions",
        text: "Please specify your instructions for different properties:",
        type: "text",
        placeholder: "Specific instructions",
        conditional: {
          field: "intellectual_property",
          value: "specific_instructions"
        }
      },
      {
        id: "certificates_trophies",
        text: "What should be done with your important certificates and trophies?",
        type: "select",
        options: [
          { value: "specific_person", label: "To be given to a specific person" },
          { value: "family", label: "To be kept together and given to my family." },
          { value: "disposed", label: "They can be disposed of." }
        ]
      },
      {
        id: "certificates_person",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "certificates_trophies",
          value: "specific_person"
        }
      },
      {
        id: "physical_diary",
        text: "What are your wishes for any personal diaries or journals you keep?",
        type: "select",
        options: [
          { value: "given_readable", label: "To be given to a specific person, with the understanding that they can read them" },
          { value: "given_not_readable", label: "To be given to a specific person, with instructions that they should not be read" },
          { value: "destroyed", label: "To be destroyed." },
          { value: "none", label: "I do not have any." }
        ]
      },
      {
        id: "diary_person_readable",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "physical_diary",
          value: "given_readable"
        }
      },
      {
        id: "diary_person_not_readable",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "physical_diary",
          value: "given_not_readable"
        }
      },
      {
        id: "physical_artworks",
        text: "Do you own any physical artworks that you have not already addressed?",
        type: "select",
        options: [
          { value: "specific_items", label: "Yes, and I want specific artworks to go to specific people" },
          { value: "all_to_one", label: "All my artworks should be given to one person" },
          { value: "residuary_estate", label: "To be added to my residuary estate." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "artworks_specific",
        text: "Please specify the artwork and recipient:",
        type: "text",
        placeholder: "Artwork: Recipient",
        conditional: {
          field: "physical_artworks",
          value: "specific_items"
        }
      },
      {
        id: "artworks_all_to_person",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "physical_artworks",
          value: "all_to_one"
        }
      }
    ]
  },
  {
    id: "digital_life",
    section: "Part 5: Your Digital Life",
    title: "Your Digital Life",
    questions: [
      {
        id: "electronic_devices",
        text: "What should happen to your personal electronic devices (smartphones, laptops, tablets, etc.)?",
        type: "select",
        options: [
          { value: "wiped_given", label: "The devices can be wiped clean and given to someone" },
          { value: "destroyed", label: "The devices should be physically destroyed to protect my data." },
          { value: "kept_with_data", label: "The devices can be kept by someone, who will also have access to the data on them." }
        ]
      },
      {
        id: "devices_given_to",
        text: "Please specify who should receive the devices:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "electronic_devices",
          value: "wiped_given"
        }
      },
      {
        id: "devices_kept_by",
        text: "Please specify who should keep the devices:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "electronic_devices",
          value: "kept_with_data"
        }
      },
      {
        id: "phone_number",
        text: "What should be done with your primary mobile phone number?",
        type: "select",
        options: [
          { value: "terminated", label: "The line should be terminated." },
          { value: "transferred", label: "I would like a specific person to take over the number" }
        ]
      },
      {
        id: "phone_number_person",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "phone_number",
          value: "transferred"
        }
      },
      {
        id: "password_manager",
        text: "Do you use a password manager?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, and I will provide the master password and instructions to my chosen digital asset manager." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "subscriptions",
        text: "What should be done with your paid subscriptions (streaming services, software, etc.)?",
        type: "select",
        options: [
          { value: "canceled", label: "All subscriptions should be canceled." },
          { value: "list_instructions", label: "I have a list of subscriptions with instructions for my digital asset manager." }
        ]
      },
      {
        id: "digital_items",
        text: "Do you own other digital items not covered (domain names, NFTs, digital books, music, or movies)?",
        type: "select",
        options: [
          { value: "transferred", label: "Yes, and I want them transferred to someone" },
          { value: "list_instructions", label: "Yes, and I have a list with specific instructions." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "digital_items_transferred_to",
        text: "Please specify who they should be transferred to:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "digital_items",
          value: "transferred"
        }
      }
    ]
  },
  {
    id: "data_backup_consent",
    section: "Part 6: Consent for Data Backup and Access",
    title: "Consent for Data Backup and Access",
    questions: [
      {
        id: "transaction_history_backup",
        text: "To help settle any financial disputes after you're gone, do you consent to your executor backing up your financial transaction history (bank statements, credit card statements, etc.)?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, I consent to this to provide a clear financial record." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "social_media_handling",
        text: "What should happen to your social media accounts?",
        type: "select",
        options: [
          { value: "memorialized", label: "I want them to be memorialized (if the platform offers this)." },
          { value: "deleted", label: "I want them to be permanently deleted." },
          { value: "manager_authority", label: "I give my digital asset manager the authority to manage them as they see fit." }
        ]
      },
      {
        id: "photos_videos_backup",
        text: "Do you consent to your digital asset manager backing up all your photos and videos from your devices and cloud storage (Google Photos, iCloud, etc.) to be shared with your loved ones?",
        type: "select",
        options: [
          { value: "full_backup", label: "Yes, I consent to a full backup and sharing." },
          { value: "specific_folders", label: "Yes, but only specific folders or albums" },
          { value: "no", label: "No, I do not want my photos and videos backed up or shared." }
        ]
      },
      {
        id: "specific_photo_folders",
        text: "Please specify which folders or albums:",
        type: "text",
        placeholder: "Specify folders or albums",
        conditional: {
          field: "photos_videos_backup",
          value: "specific_folders"
        }
      },
      {
        id: "chat_backup",
        text: "Do you consent to your digital asset manager backing up your chat histories from messaging apps to preserve important conversations?",
        type: "select",
        options: [
          { value: "all_chats", label: "Yes, I consent to a backup of all chats." },
          { value: "specific_chats", label: "Yes, but only specific chats" },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "specific_chats",
        text: "Please specify with whom:",
        type: "text",
        placeholder: "Specify people or groups",
        conditional: {
          field: "chat_backup",
          value: "specific_chats"
        }
      },
      {
        id: "digital_notes_backup",
        text: "Do you consent to the backup of your digital notes (from apps like Apple Notes, Google Keep, Evernote)?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, I consent to a full backup." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "call_history_backup",
        text: "Do you consent to the backup of your call history and any call recordings on your devices?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "contacts_backup",
        text: "Do you consent to the backup of your contacts list?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "mail_backup",
        text: "Do you consent to your digital asset manager accessing and backing up your email accounts to manage outstanding affairs and notify contacts?",
        type: "select",
        options: [
          { value: "all_accounts", label: "Yes, I consent to the access and backup of all my email accounts." },
          { value: "specific_accounts", label: "Yes, but only specific accounts" },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "specific_email_accounts",
        text: "Please list the specific accounts:",
        type: "text",
        placeholder: "List email accounts",
        conditional: {
          field: "mail_backup",
          value: "specific_accounts"
        }
      },
      {
        id: "local_files_backup",
        text: "Do you consent to a general backup of all files on your local devices (computers, hard drives) to ensure nothing important is missed?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "google_takeout",
        text: "Google Takeout allows for a complete download of your data from various Google services. Do you consent to your digital asset manager using this feature to back up your Google data (Map history, Calendar, GPay transactions, Photos, Docs, etc.)?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes." },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "important_app_data",
        text: "Are there any other specific apps whose data you want to ensure is backed up?",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No." }
        ]
      },
      {
        id: "specific_apps",
        text: "Please list the apps:",
        type: "text",
        placeholder: "List the apps",
        conditional: {
          field: "important_app_data",
          value: "yes"
        }
      },
      {
        id: "digital_art",
        text: "Do you create any sort of art (songs, drawings/painting, writing, dance clips)?",
        type: "select",
        options: [
          { value: "preserved", label: "I want it to be preserved and given to someone" },
          { value: "deleted", label: "I want it to be deleted." },
          { value: "none", label: "I have not created any digital art." }
        ]
      },
      {
        id: "digital_art_recipient",
        text: "Please specify who should receive your digital art:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "digital_art",
          value: "preserved"
        }
      }
    ]
  },
  {
    id: "people_in_charge",
    section: "Part 7: The People in Charge",
    title: "The People in Charge",
    questions: [
      {
        id: "executor_name",
        text: "Who should handle your physical assets? (Full Name)",
        type: "text",
        placeholder: "Full name of the executor"
      },
      {
        id: "executor_relationship",
        text: "What is their relationship to you?",
        type: "text",
        placeholder: "Relationship to you"
      },
      {
        id: "alternate_executor_name",
        text: "If this person is unable or unwilling to act, who should be the alternate? (Full Name)",
        type: "text",
        placeholder: "Full name of the alternate executor"
      },
      {
        id: "alternate_executor_relationship",
        text: "What is their relationship to you?",
        type: "text",
        placeholder: "Relationship to you"
      },
      {
        id: "digital_manager_name",
        text: "Who should manage your digital assets? (Full Name)",
        type: "text",
        placeholder: "Full name of the digital asset manager"
      },
      {
        id: "digital_manager_relationship",
        text: "What is their relationship to you?",
        type: "text",
        placeholder: "Relationship to you"
      },
      {
        id: "alternate_digital_manager_name",
        text: "If this person is unable or unwilling to act, who should be the alternate? (Full Name)",
        type: "text",
        placeholder: "Full name of the alternate digital asset manager"
      },
      {
        id: "alternate_digital_manager_relationship",
        text: "What is their relationship to you?",
        type: "text",
        placeholder: "Relationship to you"
      },
      {
        id: "residuary_clause",
        text: "How should any remaining assets in your estate be handled?",
        type: "select",
        options: [
          { value: "one_person", label: "To be given entirely to one person" },
          { value: "group_equally", label: "To be divided equally among a group of people" },
          { value: "charity", label: "To be donated to a specific charity" }
        ]
      },
      {
        id: "residuary_one_person",
        text: "Please specify the person:",
        type: "text",
        placeholder: "Name of the person",
        conditional: {
          field: "residuary_clause",
          value: "one_person"
        }
      },
      {
        id: "residuary_group",
        text: "Please list their full names:",
        type: "text",
        placeholder: "List full names",
        conditional: {
          field: "residuary_clause",
          value: "group_equally"
        }
      },
      {
        id: "residuary_charity",
        text: "Please provide the charity's name:",
        type: "text",
        placeholder: "Charity name",
        conditional: {
          field: "residuary_clause",
          value: "charity"
        }
      }
    ]
  }
];

export function generateContent(responses: Record<string, any>): string {
  let content = "LAST WILL AND TESTAMENT\n\n";
  
  // Personal Information Header
  content += "I, being of sound mind and body, do hereby make, publish, and declare this to be my Last Will and Testament, hereby revoking all wills and codicils previously made by me.\n\n";

  // Part 1: Final Wishes
  content += "PART 1: FINAL WISHES\n\n";
  
  if (responses.remains_handling) {
    const remainsHandling: Record<string, string> = {
      cremated: "I wish to be cremated.",
      buried: "I wish to be buried.",
      no_preference: "I have no preference for how my remains are handled.",
      other: responses.remains_other || "Other preference specified."
    };
    content += `1. Disposition of Remains: ${remainsHandling[responses.remains_handling]}\n\n`;
  }

  if (responses.memorial_service) {
    const memorialService: Record<string, string> = {
      traditional: "I prefer a traditional funeral service.",
      celebration: "I prefer a more informal celebration of life.",
      no_service: "I prefer no service at all.",
      other: responses.memorial_other || "Other memorial preference specified."
    };
    content += `2. Memorial Service: ${memorialService[responses.memorial_service]}\n\n`;
  }

  if (responses.final_resting_place) {
    const restingPlace: Record<string, string> = {
      specific: `I would like my final resting place to be at: ${responses.resting_place_details || "[location specified]"}.`,
      family_decide: "I would like my family to decide my final resting place.",
      no_preference: "I have no preference for my final resting place."
    };
    content += `3. Final Resting Place: ${restingPlace[responses.final_resting_place]}\n\n`;
  }

  if (responses.organ_donation) {
    const organDonation: Record<string, string> = {
      yes_any: "I consent to the donation of any of my organs or tissues for transplantation or medical research.",
      yes_specific: `I consent to the donation of the following specific organs/tissues: ${responses.specific_organs || "[organs specified]"}.`,
      no: "I do not wish to be an organ donor."
    };
    content += `4. Organ Donation: ${organDonation[responses.organ_donation]}\n\n`;
  }

  // Part 2: Financial Assets
  content += "PART 2: FINANCIAL ASSETS\n\n";

  if (responses.primary_bank_distribution) {
    const bankDistribution: Record<string, string> = {
      specific_person: `My primary bank account funds should go to: ${responses.primary_bank_person || "[person specified]"}.`,
      children_equally: "My primary bank account funds should be divided equally among my children.",
      specific_individuals: `My primary bank account funds should be divided equally among: ${responses.primary_bank_individuals || "[individuals specified]"}.`,
      residuary_estate: "My primary bank account funds should be added to my residuary estate."
    };
    content += `1. Primary Bank Account: ${bankDistribution[responses.primary_bank_distribution]}\n\n`;
  }

  if (responses.other_bank_accounts && responses.other_bank_accounts !== "no") {
    const otherBanks: Record<string, string> = {
      same_distribution: "My other bank accounts should be distributed in the same way as my primary account.",
      different_wishes: `My other bank accounts should be handled as follows: ${responses.other_bank_details || "[details specified]"}.`
    };
    content += `2. Other Bank Accounts: ${otherBanks[responses.other_bank_accounts]}\n\n`;
  }

  if (responses.stocks_bonds_handling) {
    const stocksHandling: Record<string, string> = {
      specific_person: `My stock portfolio, mutual funds, and bonds should go to: ${responses.stocks_specific_person || "[person specified]"}.`,
      liquidated: `My stock portfolio, mutual funds, and bonds should be liquidated and the proceeds distributed to: ${responses.stocks_liquidated_to || "[recipient specified]"}.`,
      divided_equally: `My stock portfolio, mutual funds, and bonds should be divided equally among: ${responses.stocks_divided_among || "[people specified]"}.`,
      residuary_estate: "My stock portfolio, mutual funds, and bonds should be added to my residuary estate."
    };
    content += `3. Stocks, Mutual Funds, and Bonds: ${stocksHandling[responses.stocks_bonds_handling]}\n\n`;
  }

  if (responses.gold_crypto_handling) {
    const goldCryptoHandling: Record<string, string> = {
      specific_person: `My holdings of gold, digital gold, and cryptocurrencies should go to: ${responses.gold_crypto_person || "[person specified]"}, who will receive the assets and any necessary access information.`,
      sold: `My holdings of gold, digital gold, and cryptocurrencies should be sold and the proceeds given to: ${responses.gold_crypto_proceeds_to || "[recipient specified]"}.`,
      residuary_estate: "My holdings of gold, digital gold, and cryptocurrencies should be added to my residuary estate."
    };
    content += `4. Gold, Digital Gold, and Cryptocurrencies: ${goldCryptoHandling[responses.gold_crypto_handling]}\n\n`;
  }

  // Part 3: Debts and Receivables
  content += "PART 3: DEBTS AND RECEIVABLES\n\n";

  if (responses.debt_settlement) {
    const debtSettlement: Record<string, string> = {
      from_estate: "Any outstanding debts should be paid from my estate before any assets are distributed.",
      life_insurance: "I have a specific life insurance policy intended to cover my debts.",
      no_debts: "I have no significant debts."
    };
    content += `1. Debt Settlement: ${debtSettlement[responses.debt_settlement]}\n\n`;
  }

  if (responses.major_receivables) {
    const receivables: Record<string, string> = {
      yes_collect: `The following person owes me money and this amount should be collected and added to my estate: ${responses.receivables_details || "[details specified]"}.`,
      yes_forgive: "While someone owes me money, I forgive this debt upon my passing.",
      no: "No one owes me any significant amount of money."
    };
    content += `2. Money Owed to Me: ${receivables[responses.major_receivables]}\n\n`;
  }

  // Part 4: Personal Belongings
  content += "PART 4: PERSONAL BELONGINGS\n\n";

  if (responses.jewelry_distribution) {
    const jewelryDist: Record<string, string> = {
      specific_items: `Specific jewelry and ornaments should go to specific people as follows: ${responses.jewelry_specific_items || "[items and recipients specified]"}.`,
      all_to_one: `All my jewelry and ornaments should go to: ${responses.jewelry_all_to_one_person || "[person specified]"}.`,
      divide_among: `My jewelry and ornaments should be divided among: ${responses.jewelry_divide_among_people || "[people specified]"}.`,
      residuary_estate: "My jewelry and ornaments should be added to my residuary estate."
    };
    content += `1. Jewelry and Ornaments: ${jewelryDist[responses.jewelry_distribution]}\n\n`;
  }

  if (responses.primary_residence && responses.primary_residence !== "no_real_estate") {
    const residenceHandling: Record<string, string> = {
      specific_person: `My primary residence should go to: ${responses.residence_specific_person || "[person specified]"}.`,
      sold: `My primary residence should be sold and the proceeds distributed to: ${responses.residence_proceeds_to || "[recipient specified]"}.`,
      trust: `My primary residence should be held in a trust for the benefit of: ${responses.residence_trust_beneficiary || "[beneficiary specified]"}.`
    };
    content += `2. Primary Residence: ${residenceHandling[responses.primary_residence]}\n\n`;
  }

  if (responses.other_properties && responses.other_properties !== "no") {
    const otherProps: Record<string, string> = {
      same_as_primary: "My other properties should be handled in the same way as my primary residence.",
      different_wishes: `My other properties should be handled as follows: ${responses.other_properties_details || "[details specified]"}.`
    };
    content += `3. Other Properties: ${otherProps[responses.other_properties]}\n\n`;
  }

  if (responses.vehicles && responses.vehicles !== "no_vehicles") {
    const vehicleHandling: Record<string, string> = {
      specific_person: `My vehicles should go to specific people as follows: ${responses.vehicles_details || "[vehicle and recipient specified]"}.`,
      sold: `My vehicles should be sold and the proceeds distributed to: ${responses.vehicles_proceeds_to || "[recipient specified]"}.`
    };
    content += `4. Vehicles: ${vehicleHandling[responses.vehicles]}\n\n`;
  }

  // Additional personal belongings sections would continue here...

  // Part 5: Digital Life
  content += "PART 5: DIGITAL LIFE\n\n";

  if (responses.electronic_devices) {
    const deviceHandling: Record<string, string> = {
      wiped_given: `My electronic devices should be wiped clean and given to: ${responses.devices_given_to || "[person specified]"}.`,
      destroyed: "My electronic devices should be physically destroyed to protect my data.",
      kept_with_data: `My electronic devices should be kept by: ${responses.devices_kept_by || "[person specified]"}, who will also have access to the data on them.`
    };
    content += `1. Electronic Devices: ${deviceHandling[responses.electronic_devices]}\n\n`;
  }

  if (responses.phone_number) {
    const phoneHandling: Record<string, string> = {
      terminated: "My primary mobile phone number should be terminated.",
      transferred: `I would like the following person to take over my phone number: ${responses.phone_number_person || "[person specified]"}.`
    };
    content += `2. Phone Number: ${phoneHandling[responses.phone_number]}\n\n`;
  }

  // Part 6: Data Backup Consent
  content += "PART 6: CONSENT FOR DATA BACKUP AND ACCESS\n\n";

  if (responses.transaction_history_backup) {
    const backupConsent = responses.transaction_history_backup === "yes" ? 
      "I consent to my executor backing up my financial transaction history to provide a clear financial record." :
      "I do not consent to backing up my financial transaction history.";
    content += `1. Financial Records Backup: ${backupConsent}\n\n`;
  }

  if (responses.social_media_handling) {
    const socialMedia: Record<string, string> = {
      memorialized: "I want my social media accounts to be memorialized (if the platform offers this).",
      deleted: "I want my social media accounts to be permanently deleted.",
      manager_authority: "I give my digital asset manager the authority to manage my social media accounts as they see fit."
    };
    content += `2. Social Media: ${socialMedia[responses.social_media_handling]}\n\n`;
  }

  // Part 7: People in Charge
  content += "PART 7: APPOINTMENTS\n\n";

  if (responses.executor_name) {
    content += `1. Executor: I appoint ${responses.executor_name}`;
    if (responses.executor_relationship) {
      content += ` (${responses.executor_relationship})`;
    }
    content += " to be the executor of my will and handle my physical assets.\n\n";

    if (responses.alternate_executor_name) {
      content += `   Alternate Executor: If the above person is unable or unwilling to act, I appoint ${responses.alternate_executor_name}`;
      if (responses.alternate_executor_relationship) {
        content += ` (${responses.alternate_executor_relationship})`;
      }
      content += " as alternate executor.\n\n";
    }
  }

  if (responses.digital_manager_name) {
    content += `2. Digital Asset Manager: I appoint ${responses.digital_manager_name}`;
    if (responses.digital_manager_relationship) {
      content += ` (${responses.digital_manager_relationship})`;
    }
    content += " to manage my digital assets and online presence.\n\n";

    if (responses.alternate_digital_manager_name) {
      content += `   Alternate Digital Asset Manager: If the above person is unable or unwilling to act, I appoint ${responses.alternate_digital_manager_name}`;
      if (responses.alternate_digital_manager_relationship) {
        content += ` (${responses.alternate_digital_manager_relationship})`;
      }
      content += " as alternate digital asset manager.\n\n";
    }
  }

  // Residuary Clause
  if (responses.residuary_clause) {
    const residuary: Record<string, string> = {
      one_person: `Any remaining assets in my estate should be given entirely to: ${responses.residuary_one_person || "[person specified]"}.`,
      group_equally: `Any remaining assets in my estate should be divided equally among: ${responses.residuary_group || "[people specified]"}.`,
      charity: `Any remaining assets in my estate should be donated to: ${responses.residuary_charity || "[charity specified]"}.`
    };
    content += `3. Residuary Clause: ${residuary[responses.residuary_clause]}\n\n`;
  }

  content += "This document represents my final wishes regarding the distribution of my assets and handling of my affairs. I understand that laws vary by jurisdiction, and I have consulted with legal professionals as necessary.\n\n";
  
  content += "Dated: " + new Date().toLocaleDateString() + "\n\n";
  content += "_______________________________\n";
  content += "Signature\n\n";
  content += "_______________________________\n";
  content += "Witness 1 Signature\n\n";
  content += "_______________________________\n";
  content += "Witness 2 Signature\n\n";
  
  return content;
}