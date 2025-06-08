import { z } from "zod";

const questionsEn = [
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

const questionsMl = [
  {
    id: "final_wishes",
    section: "ഭാഗം 1: നിങ്ങളുടെ അന്തിമ ആഗ്രഹങ്ങൾ",
    title: "നിങ്ങളുടെ അന്തിമ ആഗ്രഹങ്ങൾ",
    questions: [
      {
        id: "remains_handling",
        text: "നിങ്ങളുടെ മൃതദേഹം എങ്ങനെ സംസ്കരിക്കണമെന്ന് നിങ്ങൾ ആഗ്രഹിക്കുന്നു?",
        type: "select",
        options: [
          { value: "cremated", label: "എന്നെ ദഹിപ്പിക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു." },
          { value: "buried", label: "എന്നെ അടക്കം ചെയ്യാൻ ഞാൻ ആഗ്രഹിക്കുന്നു." },
          { value: "no_preference", label: "എനിക്ക് മുൻഗണനയില്ല." },
          { value: "other", label: "മറ്റുള്ളവ (ദയവായി വ്യക്തമാക്കുക)" }
        ]
      },
      {
        id: "remains_other",
        text: "നിങ്ങളുടെ മറ്റ് മുൻഗണന വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "നിങ്ങളുടെ മുൻഗണന നൽകുക",
        conditional: {
          field: "remains_handling",
          value: "other"
        }
      },
      {
        id: "memorial_service",
        text: "ഏതുതരം സ്മാരക സേവനമാണ് നിങ്ങൾ ആഗ്രഹിക്കുന്നത്?",
        type: "select",
        options: [
          { value: "traditional", label: "ഒരു പരമ്പരാഗത ശവസംസ്കാര സേവനം." },
          { value: "celebration", label: "കൂടുതൽ അനൗപചാരികമായ ജീവിത ആഘോഷം." },
          { value: "no_service", label: "ഒരു സേവനവുമില്ല." },
          { value: "other", label: "മറ്റുള്ളവ (ദയവായി വ്യക്തമാക്കുക)" }
        ]
      },
      {
        id: "memorial_other",
        text: "നിങ്ങളുടെ മറ്റ് മുൻഗണന വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "നിങ്ങളുടെ മുൻഗണന നൽകുക",
        conditional: {
          field: "memorial_service",
          value: "other"
        }
      },
      {
        id: "final_resting_place",
        text: "നിങ്ങളുടെ അന്തിമ വിശ്രമസ്ഥലം എവിടെയായിരിക്കണമെന്ന് നിങ്ങൾ ആഗ്രഹിക്കുന്നു?",
        type: "select",
        options: [
          { value: "specific", label: "ഒരു പ്രത്യേക ശ്മശാനം അല്ലെങ്കിൽ സ്ഥലം" },
          { value: "family_decide", label: "എന്റെ കുടുംബം തീരുമാനിക്കട്ടെ." },
          { value: "no_preference", label: "മുൻഗണനയില്ല." }
        ]
      },
      {
        id: "resting_place_details",
        text: "ശ്മശാനം അല്ലെങ്കിൽ സ്ഥലം വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "നിർദ്ദിഷ്ട സ്ഥലം നൽകുക",
        conditional: {
          field: "final_resting_place",
          value: "specific"
        }
      },
      {
        id: "organ_donation",
        text: "നിങ്ങൾ അവയവ ദാതാവാകാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?",
        type: "select",
        options: [
          { value: "yes_any", label: "അതെ, പ്രത്യാരോപണത്തിനോ വൈദ്യ ഗവേഷണത്തിനോ വേണ്ടി എന്റെ ഏതെങ്കിലും അവയവങ്ങളുടെയോ ടിഷ്യൂകളുടെയോ ദാനത്തിന് ഞാൻ സമ്മതിക്കുന്നു." },
          { value: "yes_specific", label: "അതെ, എന്നാൽ പ്രത്യേക അവയവങ്ങൾ/ടിഷ്യൂകൾ മാത്രം" },
          { value: "no", label: "ഇല്ല, ഞാൻ അവയവ ദാതാവാകാൻ ആഗ്രഹിക്കുന്നില്ല." }
        ]
      },
      {
        id: "specific_organs",
        text: "ഏതെല്ലാം അവയവങ്ങൾ/ടിഷ്യൂകൾ വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "നിർദ്ദിഷ്ട അവയവങ്ങൾ അല്ലെങ്കിൽ ടിഷ്യൂകൾ പട്ടികപ്പെടുത്തുക",
        conditional: {
          field: "organ_donation",
          value: "yes_specific"
        }
      }
    ]
  },
  {
    id: "financial_assets",
    section: "ഭാഗം 2: നിങ്ങളുടെ സാമ്പത്തിക സ്വത്തുക്കൾ",
    title: "നിങ്ങളുടെ സാമ്പത്തിക സ്വത്തുക്കൾ",
    questions: [
      {
        id: "primary_bank_distribution",
        text: "നിങ്ങളുടെ പ്രാഥമിക ബാങ്ക് അക്കൗണ്ടിലെ ഫണ്ടുകൾ എങ്ങനെ വിതരണം ചെയ്യണം?",
        type: "select",
        options: [
          { value: "specific_person", label: "ഒരു പ്രത്യേക വ്യക്തിക്ക്" },
          { value: "children_equally", label: "എന്റെ കുട്ടികൾക്കിടയിൽ തുല്യമായി വിഭജിക്കണം." },
          { value: "specific_individuals", label: "നിർദ്ദിഷ്ട വ്യക്തികൾക്കിടയിൽ തുല്യമായി വിഭജിക്കണം" },
          { value: "residuary_estate", label: "എന്റെ ശേഷിക്കുന്ന സ്വത്തിലേക്ക് (നിങ്ങളുടെ സ്വത്തുകളുടെ ബാക്കി) ചേർക്കണം." }
        ]
      },
      {
        id: "primary_bank_person",
        text: "അവരുടെ പൂർണ്ണ നാമവും ബന്ധവും നൽകുക:",
        type: "text",
        placeholder: "പൂർണ്ണ നാമവും ബന്ധവും",
        conditional: {
          field: "primary_bank_distribution",
          value: "specific_person"
        }
      },
      {
        id: "primary_bank_individuals",
        text: "അവരുടെ പൂർണ്ണ നാമങ്ങൾ പട്ടികപ്പെടുത്തുക:",
        type: "text",
        placeholder: "പൂർണ്ണ നാമങ്ങൾ പട്ടികപ്പെടുത്തുക",
        conditional: {
          field: "primary_bank_distribution",
          value: "specific_individuals"
        }
      },
      {
        id: "other_bank_accounts",
        text: "നിങ്ങൾക്ക് മറ്റ് ബാങ്ക് അക്കൗണ്ടുകൾ (സേവിംഗ്സ്, ചെക്കിംഗ്, മുതലായവ) ഉണ്ടോ?",
        type: "select",
        options: [
          { value: "same_distribution", label: "അതെ, എന്റെ പ്രാഥമിക അക്കൗണ്ടിന്റെ അതേ രീതിയിൽ ഫണ്ടുകൾ വിതരണം ചെയ്യാൻ ഞാൻ ആഗ്രഹിക്കുന്നു." },
          { value: "different_wishes", label: "അതെ, ഓരോന്നിനും എനിക്ക് വ്യത്യസ്ത ആഗ്രഹങ്ങളുണ്ട്" },
          { value: "no", label: "ഇല്ല." }
        ]
      },
      {
        id: "other_bank_details",
        text: "ഓരോ അക്കൗണ്ടിനും വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "ഓരോ അക്കൗണ്ടിനുമുള്ള നിങ്ങളുടെ ആഗ്രഹങ്ങൾ വ്യക്തമാക്കുക",
        conditional: {
          field: "other_bank_accounts",
          value: "different_wishes"
        }
      },
      {
        id: "stocks_bonds_handling",
        text: "നിങ്ങളുടെ ഓഹരി പോർട്ട്‌ഫോളിയോ, മ്യൂച്വൽ ഫണ്ടുകൾ, ബോണ്ടുകൾ എന്നിവ എങ്ങനെ കൈകാര്യം ചെയ്യണം?",
        type: "select",
        options: [
          { value: "specific_person", label: "ഒരു പ്രത്യേക വ്യക്തിക്ക്" },
          { value: "liquidated", label: "ലിക്വിഡേറ്റ് ചെയ്ത് വരുമാനം വിതരണം ചെയ്യണം" },
          { value: "divided_equally", label: "നിർദ്ദിഷ്ട ആളുകൾക്കിടയിൽ തുല്യമായി വിഭജിക്കണം" },
          { value: "residuary_estate", label: "എന്റെ ശേഷിക്കുന്ന സ്വത്തിലേക്ക് ചേർക്കണം." }
        ]
      },
      {
        id: "stocks_specific_person",
        text: "വ്യക്തിയെ വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "വ്യക്തിയുടെ പേര്",
        conditional: {
          field: "stocks_bonds_handling",
          value: "specific_person"
        }
      },
      {
        id: "stocks_liquidated_to",
        text: "ആരാണ് വരുമാനം ലഭിക്കേണ്ടതെന്ന് വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "ആർക്കാണ് വരുമാനം ലഭിക്കേണ്ടത്",
        conditional: {
          field: "stocks_bonds_handling",
          value: "liquidated"
        }
      },
      {
        id: "stocks_divided_among",
        text: "ആരാരുടെ ഇടയിൽ വിഭജിക്കണമെന്ന് വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "ആളുകളെ പട്ടികപ്പെടുത്തുക",
        conditional: {
          field: "stocks_bonds_handling",
          value: "divided_equally"
        }
      },
      {
        id: "gold_crypto_handling",
        text: "നിങ്ങളുടെ സ്വർണ്ണം, ഡിജിറ്റൽ സ്വർണ്ണം, ക്രിപ്റ്റോകറൻസികൾ എന്നിവയുടെ കൈവശമുള്ളവയ്ക്ക് എന്ത് സംഭവിക്കണം?",
        type: "select",
        options: [
          { value: "specific_person", label: "ആസ്തികളും ആവശ്യമായ ആക്സസ് വിവരങ്ങളും ലഭിക്കുന്ന ഒരു പ്രത്യേക വ്യക്തിക്ക്" },
          { value: "sold", label: "വിറ്റ് വരുമാനം ആർക്കെങ്കിലും നൽകണം" },
          { value: "residuary_estate", label: "എന്റെ ശേഷിക്കുന്ന സ്വത്തിലേക്ക് ചേർക്കണം." }
        ]
      },
      {
        id: "gold_crypto_person",
        text: "വ്യക്തിയെ വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "വ്യക്തിയുടെ പേര്",
        conditional: {
          field: "gold_crypto_handling",
          value: "specific_person"
        }
      },
      {
        id: "gold_crypto_proceeds_to",
        text: "ആരാണ് വരുമാനം ലഭിക്കേണ്ടതെന്ന് വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "ആർക്കാണ് വരുമാനം ലഭിക്കേണ്ടത്",
        conditional: {
          field: "gold_crypto_handling",
          value: "sold"
        }
      }
    ]
  },
  {
    id: "debts_receivables",
    section: "ഭാഗം 3: കടങ്ങളും സ്വീകാര്യതകളും",
    title: "കടങ്ങളും സ്വീകാര്യതകളും",
    questions: [
      {
        id: "debt_settlement",
        text: "ഏതെങ്കിലും കുടിശ്ശിക കടങ്ങൾ (വായ്പകൾ, EMI കൾ, ക്രെഡിറ്റ് കാർഡ് ബാലൻസുകൾ, \"ഇപ്പോൾ വാങ്ങുക, പിന്നീട് പണമടയ്ക്കുക\" സേവനങ്ങൾ) എങ്ങനെ തീർപ്പാക്കണം?",
        type: "select",
        options: [
          { value: "from_estate", label: "ഏതെങ്കിലും സ്വത്തുക്കൾ വിതരണം ചെയ്യുന്നതിന് മുമ്പ് എന്റെ സ്വത്തിൽ നിന്ന് പണമടയ്ക്കണം." },
          { value: "life_insurance", label: "ഈ കടങ്ങൾ കവർ ചെയ്യാൻ ഉദ്ദേശിച്ചുള്ള ഒരു പ്രത്യേക ലൈഫ് ഇൻഷുറൻസ് പോളിസി എനിക്കുണ്ട്." },
          { value: "no_debts", label: "എനിക്ക് കാര്യമായ കടങ്ങളൊന്നുമില്ല." }
        ]
      },
      {
        id: "major_receivables",
        text: "നിങ്ങൾക്ക് കാര്യമായ തുക കടപ്പെട്ടിരിക്കുന്ന ആരെങ്കിലും ഉണ്ടോ?",
        type: "select",
        options: [
          { value: "yes_collect", label: "അതെ, ഈ തുക ശേഖരിച്ച് എന്റെ സ്വത്തിലേക്ക് ചേർക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു" },
          { value: "yes_forgive", label: "അതെ, പക്ഷേ എന്റെ മരണത്തിൽ ഞാൻ കടം ക്ഷമിക്കുന്നു." },
          { value: "no", label: "ഇല്ല." }
        ]
      },
      {
        id: "receivables_details",
        text: "അവരുടെ പേരും കടപ്പെട്ട ഏകദേശ തുകയും നൽകുക:",
        type: "text",
        placeholder: "പേരും കടപ്പെട്ട തുകയും",
        conditional: {
          field: "major_receivables",
          value: "yes_collect"
        }
      }
    ]
  },
  {
    id: "personal_belongings",
    section: "ഭാഗം 4: നിങ്ങളുടെ വ്യക്തിഗത വസ്തുക്കൾ",
    title: "നിങ്ങളുടെ വ്യക്തിഗത വസ്തുക്കൾ",
    questions: [
      {
        id: "jewelry_distribution",
        text: "നിർദ്ദിഷ്ട ആളുകളിലേക്ക് പോകാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്ന നിർദ്ദിഷ്ട ആഭരണങ്ങളോ അലങ്കാരങ്ങളോ നിങ്ങൾക്കുണ്ടോ?",
        type: "select",
        options: [
          { value: "specific_items", label: "അതെ, നിർദ്ദിഷ്ട ആളുകൾക്കായി എനിക്ക് നിർദ്ദിഷ്ട ഇനങ്ങളുണ്ട്" },
          { value: "all_to_one", label: "എന്റെ എല്ലാ ആഭരണങ്ങളും അലങ്കാരങ്ങളും ഒരാൾക്ക് പോകണം" },
          { value: "divide_among", label: "എന്റെ ആഭരണങ്ങളും അലങ്കാരങ്ങളും നിർദ്ദിഷ്ട ആളുകൾക്കിടയിൽ വിഭജിക്കണം" },
          { value: "residuary_estate", label: "എന്റെ ശേഷിക്കുന്ന സ്വത്തിലേക്ക് ചേർക്കണം." }
        ]
      },
      {
        id: "jewelry_specific_items",
        text: "ഇനവും സ്വീകർത്താവും പട്ടികപ്പെടുത്തുക:",
        type: "text",
        placeholder: "ഇനം: സ്വീകർത്താവ്",
        conditional: {
          field: "jewelry_distribution",
          value: "specific_items"
        }
      },
      {
        id: "jewelry_all_to_one_person",
        text: "വ്യക്തിയെ വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "വ്യക്തിയുടെ പേര്",
        conditional: {
          field: "jewelry_distribution",
          value: "all_to_one"
        }
      },
      {
        id: "jewelry_divide_among_people",
        text: "ആരാരുടെ ഇടയിൽ വിഭജിക്കണമെന്ന് വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "ആളുകളെ പട്ടികപ്പെടുത്തുക",
        conditional: {
          field: "jewelry_distribution",
          value: "divide_among"
        }
      }
    ]
  },
  {
    id: "digital_life",
    section: "ഭാഗം 5: നിങ്ങളുടെ ഡിജിറ്റൽ ജീവിതം",
    title: "നിങ്ങളുടെ ഡിജിറ്റൽ ജീവിതം",
    questions: [
      {
        id: "electronic_devices",
        text: "നിങ്ങളുടെ വ്യക്തിഗത ഇലക്ട്രോണിക് ഉപകരണങ്ങൾക്ക് (സ്മാർട്ട്ഫോണുകൾ, ലാപ്ടോപ്പുകൾ, ടാബ്ലെറ്റുകൾ മുതലായവ) എന്ത് സംഭവിക്കണം?",
        type: "select",
        options: [
          { value: "wiped_given", label: "ഉപകരണങ്ങൾ വൃത്തിയാക്കി ആർക്കെങ്കിലും നൽകാം" },
          { value: "destroyed", label: "എന്റെ ഡാറ്റ സംരക്ഷിക്കാൻ ഉപകരണങ്ങൾ ഭൗതികമായി നശിപ്പിക്കണം." },
          { value: "kept_with_data", label: "ഉപകരണങ്ങൾ ആർക്കെങ്കിലും സൂക്ഷിക്കാം, അവർക്ക് അവയിലെ ഡാറ്റയിലേക്കും പ്രവേശനമുണ്ടാകും." }
        ]
      },
      {
        id: "devices_given_to",
        text: "ആർക്കാണ് ഉപകരണങ്ങൾ ലഭിക്കേണ്ടതെന്ന് വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "വ്യക്തിയുടെ പേര്",
        conditional: {
          field: "electronic_devices",
          value: "wiped_given"
        }
      },
      {
        id: "devices_kept_by",
        text: "ആർ ഉപകരണങ്ങൾ സൂക്ഷിക്കണമെന്ന് വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "വ്യക്തിയുടെ പേര്",
        conditional: {
          field: "electronic_devices",
          value: "kept_with_data"
        }
      }
    ]
  },
  {
    id: "data_backup_consent",
    section: "ഭാഗം 6: ഡാറ്റ ബാക്കപ്പിനും ആക്സസിനുമുള്ള സമ്മതം",
    title: "ഡാറ്റ ബാക്കപ്പിനും ആക്സസിനുമുള്ള സമ്മതം",
    questions: [
      {
        id: "transaction_history_backup",
        text: "നിങ്ങൾ പോയതിനുശേഷം എന്തെങ്കിലും സാമ്പത്തിക തർക്കങ്ങൾ തീർപ്പാക്കാൻ സഹായിക്കുന്നതിന്, നിങ്ങളുടെ സാമ്പത്തിക ഇടപാട് ചരിത്രം (ബാങ്ക് സ്റ്റേറ്റ്‌മെന്റുകൾ, ക്രെഡിറ്റ് കാർഡ് സ്റ്റേറ്റ്‌മെന്റുകൾ, മുതലായവ) ബാക്കപ്പ് ചെയ്യാൻ നിങ്ങളുടെ എക്സിക്യൂട്ടറിന് നിങ്ങൾ സമ്മതം നൽകുന്നുണ്ടോ?",
        type: "radio",
        options: [
          { value: "yes", label: "അതെ, വ്യക്തമായ സാമ്പത്തിക രേഖ നൽകാൻ ഞാൻ ഇതിന് സമ്മതിക്കുന്നു." },
          { value: "no", label: "ഇല്ല." }
        ]
      },
      {
        id: "social_media_handling",
        text: "നിങ്ങളുടെ സോഷ്യൽ മീഡിയ അക്കൗണ്ടുകൾക്ക് എന്ത് സംഭവിക്കണം?",
        type: "select",
        options: [
          { value: "memorialized", label: "അവ സ്മാരകമാക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു (പ്ലാറ്റ്ഫോം ഇത് വാഗ്ദാനം ചെയ്യുന്നുവെങ്കിൽ)." },
          { value: "deleted", label: "അവ ശാശ്വതമായി ഇല്ലാതാക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു." },
          { value: "manager_authority", label: "എന്റെ ഡിജിറ്റൽ അസറ്റ് മാനേജർക്ക് അവ അനുയോജ്യമെന്ന് തോന്നുന്ന രീതിയിൽ കൈകാര്യം ചെയ്യാനുള്ള അധികാരം ഞാൻ നൽകുന്നു." }
        ]
      }
    ]
  },
  {
    id: "people_in_charge",
    section: "ഭാഗം 7: ചുമതലയുള്ള ആളുകൾ",
    title: "ചുമതലയുള്ള ആളുകൾ",
    questions: [
      {
        id: "executor_name",
        text: "നിങ്ങളുടെ ഭൗതിക സ്വത്തുക്കൾ കൈകാര്യം ചെയ്യേണ്ടത് ആരാണ്? (പൂർണ്ണ നാമം)",
        type: "text",
        placeholder: "എക്സിക്യൂട്ടറുടെ പൂർണ്ണ നാമം"
      },
      {
        id: "executor_relationship",
        text: "അവരുമായുള്ള നിങ്ങളുടെ ബന്ധമെന്താണ്?",
        type: "text",
        placeholder: "നിങ്ങളുമായുള്ള ബന്ധം"
      },
      {
        id: "alternate_executor_name",
        text: "ഈ വ്യക്തിക്ക് പ്രവർത്തിക്കാൻ കഴിയുകയോ മനസ്സില്ലാത്തതോ ആണെങ്കിൽ, ആരായിരിക്കണം ബദൽ? (പൂർണ്ണ നാമം)",
        type: "text",
        placeholder: "ബദൽ എക്സിക്യൂട്ടറുടെ പൂർണ്ണ നാമം"
      },
      {
        id: "alternate_executor_relationship",
        text: "അവരുമായുള്ള നിങ്ങളുടെ ബന്ധമെന്താണ്?",
        type: "text",
        placeholder: "നിങ്ങളുമായുള്ള ബന്ധം"
      },
      {
        id: "digital_manager_name",
        text: "നിങ്ങളുടെ ഡിജിറ്റൽ സ്വത്തുക്കൾ കൈകാര്യം ചെയ്യേണ്ടത് ആരാണ്? (പൂർണ്ണ നാമം)",
        type: "text",
        placeholder: "ഡിജിറ്റൽ അസറ്റ് മാനേജറുടെ പൂർണ്ണ നാമം"
      },
      {
        id: "digital_manager_relationship",
        text: "അവരുമായുള്ള നിങ്ങളുടെ ബന്ധമെന്താണ്?",
        type: "text",
        placeholder: "നിങ്ങളുമായുള്ള ബന്ധം"
      },
      {
        id: "alternate_digital_manager_name",
        text: "ഈ വ്യക്തിക്ക് പ്രവർത്തിക്കാൻ കഴിയുകയോ മനസ്സില്ലാത്തതോ ആണെങ്കിൽ, ആരായിരിക്കണം ബദൽ? (പൂർണ്ണ നാമം)",
        type: "text",
        placeholder: "ബദൽ ഡിജിറ്റൽ അസറ്റ് മാനേജറുടെ പൂർണ്ണ നാമം"
      },
      {
        id: "alternate_digital_manager_relationship",
        text: "അവരുമായുള്ള നിങ്ങളുടെ ബന്ധമെന്താണ്?",
        type: "text",
        placeholder: "നിങ്ങളുമായുള്ള ബന്ധം"
      },
      {
        id: "residuary_clause",
        text: "നിങ്ങളുടെ എസ്റ്റേറ്റിൽ ശേഷിക്കുന്ന എന്തെങ്കിലും സ്വത്തുക്കൾ എങ്ങനെ കൈകാര്യം ചെയ്യണം?",
        type: "select",
        options: [
          { value: "one_person", label: "ഒരാൾക്ക് പൂർണ്ണമായും നൽകണം" },
          { value: "group_equally", label: "ഒരു കൂട്ടം ആളുകൾക്കിടയിൽ തുല്യമായി വിഭജിക്കണം" },
          { value: "charity", label: "ഒരു പ്രത്യേക ചാരിറ്റിക്ക് സംഭാവന ചെയ്യണം" }
        ]
      },
      {
        id: "residuary_one_person",
        text: "വ്യക്തിയെ വ്യക്തമാക്കുക:",
        type: "text",
        placeholder: "വ്യക്തിയുടെ പേര്",
        conditional: {
          field: "residuary_clause",
          value: "one_person"
        }
      },
      {
        id: "residuary_group",
        text: "അവരുടെ പൂർണ്ണ നാമങ്ങൾ പട്ടികപ്പെടുത്തുക:",
        type: "text",
        placeholder: "പൂർണ്ണ നാമങ്ങൾ പട്ടികപ്പെടുത്തുക",
        conditional: {
          field: "residuary_clause",
          value: "group_equally"
        }
      },
      {
        id: "residuary_charity",
        text: "ചാരിറ്റിയുടെ പേര് നൽകുക:",
        type: "text",
        placeholder: "ചാരിറ്റിയുടെ പേര്",
        conditional: {
          field: "residuary_clause",
          value: "charity"
        }
      }
    ]
  }
];

export function getQuestions(language: 'en' | 'ml' = 'en') {
  return language === 'ml' ? questionsMl : questionsEn;
}

export function generateContent(responses: Record<string, any>, language: 'en' | 'ml' = 'en'): string {
  let content = "LAST WILL AND TESTAMENT\n\n";
  
  content += "I, being of sound mind and body, do hereby make, publish, and declare this to be my Last Will and Testament, hereby revoking all wills and codicils previously made by me.\n\n";

  // Final Wishes
  if (responses.remains_handling) {
    const remainsHandling: Record<string, string> = {
      cremated: "I wish to be cremated.",
      buried: "I wish to be buried.",
      no_preference: "I have no preference for how my remains are handled.",
      other: responses.remains_other || "I have specified other preferences for my remains."
    };
    content += `Regarding my remains, ${remainsHandling[responses.remains_handling]} `;
  }

  if (responses.memorial_service) {
    const memorialService: Record<string, string> = {
      traditional: "I would like a traditional funeral service to be held.",
      celebration: "I would prefer a more informal celebration of life.",
      no_service: "I do not want any service at all.",
      other: responses.memorial_other || "I have specified other preferences for my memorial service."
    };
    content += `${memorialService[responses.memorial_service]} `;
  }

  if (responses.final_resting_place) {
    const restingPlace: Record<string, string> = {
      specific: `I would like my final resting place to be at ${responses.resting_place_details || "the location I have specified"}.`,
      family_decide: "I would like my family to decide where my final resting place should be.",
      no_preference: "I have no preference for where my final resting place should be."
    };
    content += `${restingPlace[responses.final_resting_place]}\n\n`;
  }

  if (responses.organ_donation) {
    const organDonation: Record<string, string> = {
      yes_any: "I consent to the donation of any of my organs or tissues for transplantation or medical research.",
      yes_specific: `I consent to the donation of the following specific organs or tissues: ${responses.specific_organs || "those I have specified"}.`,
      no: "I do not wish to be an organ donor."
    };
    content += `${organDonation[responses.organ_donation]}\n\n`;
  }

  // Financial Assets
  if (responses.primary_bank_distribution) {
    const bankDistribution: Record<string, string> = {
      specific_person: `I want the funds in my primary bank account to go to ${responses.primary_bank_person || "the person I have specified"}.`,
      children_equally: "I want the funds in my primary bank account to be divided equally among my children.",
      specific_individuals: `I want the funds in my primary bank account to be divided equally among ${responses.primary_bank_individuals || "the individuals I have listed"}.`,
      residuary_estate: "I want the funds in my primary bank account to be added to my residuary estate."
    };
    content += `${bankDistribution[responses.primary_bank_distribution]} `;
  }

  if (responses.other_bank_accounts && responses.other_bank_accounts !== "no") {
    const otherBanks: Record<string, string> = {
      same_distribution: "My other bank accounts should be distributed in the same way as my primary account.",
      different_wishes: `As for my other bank accounts, I want them handled as follows: ${responses.other_bank_details || "according to my detailed instructions"}.`
    };
    content += `${otherBanks[responses.other_bank_accounts]} `;
  }

  if (responses.stocks_bonds_handling) {
    const stocksHandling: Record<string, string> = {
      specific_person: `I want my stock portfolio, mutual funds, and bonds to go to ${responses.stocks_specific_person || "the person I have specified"}.`,
      liquidated: `I want my stock portfolio, mutual funds, and bonds to be liquidated and the proceeds distributed to ${responses.stocks_liquidated_to || "the recipient I have specified"}.`,
      divided_equally: `I want my stock portfolio, mutual funds, and bonds to be divided equally among ${responses.stocks_divided_among || "the people I have listed"}.`,
      residuary_estate: "I want my stock portfolio, mutual funds, and bonds to be added to my residuary estate."
    };
    content += `${stocksHandling[responses.stocks_bonds_handling]} `;
  }

  if (responses.gold_crypto_handling) {
    const goldCryptoHandling: Record<string, string> = {
      specific_person: `I want my holdings of gold, digital gold, and cryptocurrencies to go to ${responses.gold_crypto_person || "the person I have specified"}, who will receive the assets and any necessary access information.`,
      sold: `I want my holdings of gold, digital gold, and cryptocurrencies to be sold and the proceeds given to ${responses.gold_crypto_proceeds_to || "the recipient I have specified"}.`,
      residuary_estate: "I want my holdings of gold, digital gold, and cryptocurrencies to be added to my residuary estate."
    };
    content += `${goldCryptoHandling[responses.gold_crypto_handling]}\n\n`;
  }

  // Debts and Receivables
  if (responses.debt_settlement) {
    const debtSettlement: Record<string, string> = {
      from_estate: "I want any outstanding debts to be paid from my estate before any assets are distributed.",
      life_insurance: "I have a specific life insurance policy that I intend to cover my debts.",
      no_debts: "I have no significant debts that need to be settled."
    };
    content += `${debtSettlement[responses.debt_settlement]} `;
  }

  if (responses.major_receivables) {
    const receivables: Record<string, string> = {
      yes_collect: `${responses.receivables_details || "Someone"} owes me money and I want this amount to be collected and added to my estate.`,
      yes_forgive: "While someone owes me money, I forgive this debt upon my passing.",
      no: "No one owes me any significant amount of money."
    };
    content += `${receivables[responses.major_receivables]}\n\n`;
  }

  // Personal Belongings
  if (responses.jewelry_distribution) {
    const jewelryDist: Record<string, string> = {
      specific_items: `I want specific pieces of my jewelry and ornaments to go to specific people as follows: ${responses.jewelry_specific_items || "according to my detailed list"}.`,
      all_to_one: `I want all my jewelry and ornaments to go to ${responses.jewelry_all_to_one_person || "the person I have specified"}.`,
      divide_among: `I want my jewelry and ornaments to be divided among ${responses.jewelry_divide_among_people || "the people I have listed"}.`,
      residuary_estate: "I want my jewelry and ornaments to be added to my residuary estate."
    };
    content += `${jewelryDist[responses.jewelry_distribution]} `;
  }

  if (responses.primary_residence && responses.primary_residence !== "no_real_estate") {
    const residenceHandling: Record<string, string> = {
      specific_person: `I want my primary residence to go to ${responses.residence_specific_person || "the person I have specified"}.`,
      sold: `I want my primary residence to be sold and the proceeds distributed to ${responses.residence_proceeds_to || "the recipient I have specified"}.`,
      trust: `I want my primary residence to be held in a trust for the benefit of ${responses.residence_trust_beneficiary || "the beneficiary I have specified"}.`
    };
    content += `${residenceHandling[responses.primary_residence]} `;
  }

  if (responses.other_properties && responses.other_properties !== "no") {
    const otherProps: Record<string, string> = {
      same_as_primary: "I want my other properties to be handled in the same way as my primary residence.",
      different_wishes: `As for my other properties, I want them handled as follows: ${responses.other_properties_details || "according to my specific instructions"}.`
    };
    content += `${otherProps[responses.other_properties]} `;
  }

  if (responses.vehicles && responses.vehicles !== "no_vehicles") {
    const vehicleHandling: Record<string, string> = {
      specific_person: `I want my vehicles to go to specific people as follows: ${responses.vehicles_details || "according to my detailed instructions"}.`,
      sold: `I want my vehicles to be sold and the proceeds distributed to ${responses.vehicles_proceeds_to || "the recipient I have specified"}.`
    };
    content += `${vehicleHandling[responses.vehicles]} `;
  }

  if (responses.collectibles && responses.collectibles !== "no") {
    const collectiblesHandling: Record<string, string> = {
      specific_recipient: `I want my collections and valuable items to go to specific people as follows: ${responses.collectibles_specific || "according to my detailed instructions"}.`,
      appraised_sold: `I want my collections and valuable items to be appraised and sold, with the proceeds going to ${responses.collectibles_proceeds_to || "the recipient I have specified"}.`,
      residuary_estate: "I want my collections and valuable items to be added to my residuary estate."
    };
    content += `${collectiblesHandling[responses.collectibles]} `;
  }

  if (responses.intellectual_property && responses.intellectual_property !== "no") {
    const ipHandling: Record<string, string> = {
      all_to_one: `I want all my intellectual property rights and future income to go to ${responses.ip_all_to_person || "the person I have specified"}.`,
      specific_instructions: `I have specific instructions for my different intellectual properties: ${responses.ip_specific_instructions || "as detailed in my instructions"}.`
    };
    content += `${ipHandling[responses.intellectual_property]} `;
  }

  if (responses.certificates_trophies) {
    const certificatesHandling: Record<string, string> = {
      specific_person: `I want my important certificates and trophies to be given to ${responses.certificates_person || "the person I have specified"}.`,
      family: "I want my important certificates and trophies to be kept together and given to my family.",
      disposed: "My important certificates and trophies can be disposed of."
    };
    content += `${certificatesHandling[responses.certificates_trophies]} `;
  }

  if (responses.physical_diary && responses.physical_diary !== "none") {
    const diaryHandling: Record<string, string> = {
      given_readable: `I want my personal diaries or journals to be given to ${responses.diary_person_readable || "the person I have specified"}, with the understanding that they can read them.`,
      given_not_readable: `I want my personal diaries or journals to be given to ${responses.diary_person_not_readable || "the person I have specified"}, with instructions that they should not be read.`,
      destroyed: "I want my personal diaries or journals to be destroyed."
    };
    content += `${diaryHandling[responses.physical_diary]} `;
  }

  if (responses.physical_artworks && responses.physical_artworks !== "no") {
    const artworkHandling: Record<string, string> = {
      specific_items: `I want specific physical artworks to go to specific people as follows: ${responses.artworks_specific || "according to my detailed list"}.`,
      all_to_one: `I want all my physical artworks to be given to ${responses.artworks_all_to_person || "the person I have specified"}.`,
      residuary_estate: "I want my physical artworks to be added to my residuary estate."
    };
    content += `${artworkHandling[responses.physical_artworks]}\n\n`;
  }

  // Digital Life
  if (responses.electronic_devices) {
    const deviceHandling: Record<string, string> = {
      wiped_given: `I want my electronic devices to be wiped clean and given to ${responses.devices_given_to || "the person I have specified"}.`,
      destroyed: "I want my electronic devices to be physically destroyed to protect my data.",
      kept_with_data: `I want my electronic devices to be kept by ${responses.devices_kept_by || "the person I have specified"}, who will also have access to the data on them.`
    };
    content += `${deviceHandling[responses.electronic_devices]} `;
  }

  if (responses.phone_number) {
    const phoneHandling: Record<string, string> = {
      terminated: "I want my primary mobile phone number to be terminated.",
      transferred: `I want ${responses.phone_number_person || "the person I have specified"} to take over my phone number.`
    };
    content += `${phoneHandling[responses.phone_number]} `;
  }

  if (responses.password_manager === "yes") {
    content += "I use a password manager and will provide the master password and instructions to my chosen digital asset manager. ";
  }

  if (responses.subscriptions) {
    const subscriptionHandling: Record<string, string> = {
      canceled: "I want all my paid subscriptions to be canceled.",
      list_instructions: "I have a list of subscriptions with instructions for my digital asset manager."
    };
    content += `${subscriptionHandling[responses.subscriptions]} `;
  }

  if (responses.digital_items && responses.digital_items !== "no") {
    const digitalItemsHandling: Record<string, string> = {
      transferred: `I want my digital items to be transferred to ${responses.digital_items_transferred_to || "the person I have specified"}.`,
      list_instructions: "I have a list with specific instructions for my digital items."
    };
    content += `${digitalItemsHandling[responses.digital_items]}\n\n`;
  }

  // Data Backup Consent
  if (responses.transaction_history_backup) {
    const backupConsent = responses.transaction_history_backup === "yes" ? 
      "I consent to my executor backing up my financial transaction history to provide a clear financial record." :
      "I do not consent to backing up my financial transaction history.";
    content += `${backupConsent} `;
  }

  if (responses.social_media_handling) {
    const socialMedia: Record<string, string> = {
      memorialized: "I want my social media accounts to be memorialized if the platform offers this option.",
      deleted: "I want my social media accounts to be permanently deleted.",
      manager_authority: "I give my digital asset manager the authority to manage my social media accounts as they see fit."
    };
    content += `${socialMedia[responses.social_media_handling]} `;
  }

  if (responses.photos_videos_backup) {
    const photosBackup: Record<string, string> = {
      full_backup: "I consent to my digital asset manager backing up all my photos and videos from my devices and cloud storage to be shared with my loved ones.",
      specific_folders: `I consent to my digital asset manager backing up only specific folders or albums: ${responses.specific_photo_folders || "those I have specified"}.`,
      no: "I do not want my photos and videos backed up or shared."
    };
    content += `${photosBackup[responses.photos_videos_backup]} `;
  }

  if (responses.chat_backup) {
    const chatBackup: Record<string, string> = {
      all_chats: "I consent to a backup of all my chat histories from messaging apps.",
      specific_chats: `I consent to a backup of only specific chats with: ${responses.specific_chats || "those I have specified"}.`,
      no: "I do not consent to backing up my chat histories."
    };
    content += `${chatBackup[responses.chat_backup]} `;
  }

  const digitalConsents = [];
  if (responses.digital_notes_backup === "yes") digitalConsents.push("digital notes");
  if (responses.call_history_backup === "yes") digitalConsents.push("call history and recordings");
  if (responses.contacts_backup === "yes") digitalConsents.push("contacts list");
  if (responses.local_files_backup === "yes") digitalConsents.push("local device files");
  if (responses.google_takeout === "yes") digitalConsents.push("Google data via Google Takeout");

  if (digitalConsents.length > 0) {
    content += `I also consent to the backup of my ${digitalConsents.join(", ")}. `;
  }

  if (responses.mail_backup) {
    const mailBackup: Record<string, string> = {
      all_accounts: "I consent to my digital asset manager accessing and backing up all my email accounts.",
      specific_accounts: `I consent to my digital asset manager accessing and backing up only these specific email accounts: ${responses.specific_email_accounts || "those I have listed"}.`,
      no: "I do not consent to accessing or backing up my email accounts."
    };
    content += `${mailBackup[responses.mail_backup]} `;
  }

  if (responses.important_app_data === "yes") {
    content += `I want to ensure that data from these specific apps is backed up: ${responses.specific_apps || "those I have listed"}. `;
  }

  if (responses.digital_art && responses.digital_art !== "none") {
    const digitalArtHandling: Record<string, string> = {
      preserved: `I want my digital art to be preserved and given to ${responses.digital_art_recipient || "the person I have specified"}.`,
      deleted: "I want my digital art to be deleted."
    };
    content += `${digitalArtHandling[responses.digital_art]}\n\n`;
  }

  // People in Charge
  if (responses.executor_name) {
    content += `I appoint ${responses.executor_name}`;
    if (responses.executor_relationship) {
      content += `, my ${responses.executor_relationship},`;
    }
    content += " to be the executor of my will and handle my physical assets. ";

    if (responses.alternate_executor_name) {
      content += `If this person is unable or unwilling to act, I appoint ${responses.alternate_executor_name}`;
      if (responses.alternate_executor_relationship) {
        content += `, my ${responses.alternate_executor_relationship},`;
      }
      content += " as alternate executor. ";
    }
  }

  if (responses.digital_manager_name) {
    content += `I appoint ${responses.digital_manager_name}`;
    if (responses.digital_manager_relationship) {
      content += `, my ${responses.digital_manager_relationship},`;
    }
    content += " to manage my digital assets and online presence. ";

    if (responses.alternate_digital_manager_name) {
      content += `If this person is unable or unwilling to act, I appoint ${responses.alternate_digital_manager_name}`;
      if (responses.alternate_digital_manager_relationship) {
        content += `, my ${responses.alternate_digital_manager_relationship},`;
      }
      content += " as alternate digital asset manager. ";
    }
  }

  // Residuary Clause
  if (responses.residuary_clause) {
    const residuary: Record<string, string> = {
      one_person: `I want any remaining assets in my estate to be given entirely to ${responses.residuary_one_person || "the person I have specified"}.`,
      group_equally: `I want any remaining assets in my estate to be divided equally among ${responses.residuary_group || "the people I have listed"}.`,
      charity: `I want any remaining assets in my estate to be donated to ${responses.residuary_charity || "the charity I have specified"}.`
    };
    content += `${residuary[responses.residuary_clause]}\n\n`;
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