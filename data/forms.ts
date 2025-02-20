type DoctorMessage = {
    type: string;
    style: string;
    text: string;
  };
  
  type ConditionalField = {
    type: string;
    placeholder?: string;
  };
  
  type Field = {
    id: string;
    type: string;
    label: string;
    checked?: boolean;
    conditional?: ConditionalField[];
    description?: string;
  };
  
  type RevisionChange = {
    field: string;
    previousValue: string;
    newValue: string;
  };
  
  type UploadedFile = {
    name: string;
    url: string;
  };
  
  type Revision = {
    id: string;
    timestamp: string;
    changes: RevisionChange[];
    uploadedFiles?: UploadedFile[];
  };
  
  type SubmitButton = {
    label: string;
  };
  
  type Form = {
    id: string;
    title: string;
    description: string;
    doctorMessage: DoctorMessage;
    fields: Field[];
    revisions: Revision[];
    submitButton: SubmitButton;
  };
  
  const formsData: Record<string, Form> = {
    "123456": {
      id: "123456",
      title: "This is a message from Dr. John",
      description: "Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire...",
      doctorMessage: {
        type: "alert",
        style: "warning",
        text: "Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire..."
      },
      fields: [
        {
          id: "vision_issues_1",
          type: "checkbox",
          label: "I have vision issues such as nearsightedness, farsightedness, or astigmatism",
          checked: false,
          conditional: [
            {
              type: "textarea",
              placeholder: "Please describe your vision issues..."
            }
          ]
        },
        {
          id: "seizures_2",
          type: "checkbox",
          label: "I have a history of seizures or epilepsy",
          checked: false,
          conditional: [
            {
              type: "textarea",
              placeholder: "Please provide details about your condition..."
            }
          ]
        },
        {
          id: "migraines_3",
          type: "checkbox",
          label: "I experience frequent migraines or headaches",
          checked: false,
          conditional: [
            {
              type: "textarea",
              placeholder: "Please describe the frequency and severity of your migraines..."
            }
          ]
        },
        {
          id: "vertigo_4",
          type: "checkbox",
          label: "I suffer from vertigo or dizziness",
          checked: false,
          conditional: [
            {
              type: "textarea",
              placeholder: "Please provide details about your vertigo or dizziness..."
            }
          ]
        },
        {
          id: "none_of_the_above",
          type: "checkbox",
          label: "None of the above",
          checked: false
        },
        {
          id: "mri_upload",
          type: "file",
          label: "Click here to upload",
          description: "It will be very effective if you have an available MRI test to upload:"
        }
      ],
      revisions: [],
      submitButton: {
        label: "Approve and continue"
      }
    },
    "987654": {
      id: "987654",
      title: "This is a message from Dr. John",
      description: "Please answer the following question related to your health and brain condition.",
      doctorMessage: {
        type: "alert",
        style: "warning",
        text: "Dr. John has added a new question to your form. Please review and answer accordingly."
      },
      fields: [
        {
          id: "doctor_question_1",
          type: "checkbox",
          label: "Have you experienced visual distortions or blurriness when using AR glasses?",
          checked: false,
          conditional: [
            {
              type: "textarea",
              placeholder: "Please describe any symptoms or difficulties you encountered..."
            }
          ]
        }
      ],
      revisions: [
        {
          id: "rev1",
          timestamp: "2024-11-15T10:00:00Z",
          changes: [
            {
              field: "brain_injury_1",
              previousValue: "",
              newValue: "I had a motorcycle accident last week but the doctor said I am ok."
            },
            {
              field: "brain_injury_2",
              previousValue: "",
              newValue: "I suffer from migraines twice a month, often triggered by bright screens."
            },
            {
              field: "brain_injury_3",
              previousValue: "",
              newValue: "I have experienced two seizures in the past five years, triggered by flashing lights."
            },
            {
              field: "brain_injury_4",
              previousValue: "",
              newValue: "I experience dizziness when using AR headsets for more than 30 minutes."
            },
            {
              field: "brain_injury_5",
              previousValue: "",
              newValue: "I experience motion sickness when using AR glasses for extended periods."
            }
          ],
          uploadedFiles: [
            {
              name: "drwho_29831.pdf",
              url: "/uploads/drwho_29831.pdf"
            }
          ]
        },
        {
          id: "rev2",
          timestamp: "2024-11-20T12:00:00Z",
          changes: [
            {
              field: "brain_injury_1",
              previousValue: "I had a motorcycle accident last week but the doctor said I am ok.",
              newValue: "Removed from the form as it was no longer relevant."
            },
            {
              field: "brain_injury_2",
              previousValue: "I suffer from migraines twice a month, often triggered by bright screens.",
              newValue: "Removed from the form by Dr. John."
            },
            {
              field: "brain_injury_3",
              previousValue: "I have experienced two seizures in the past five years, triggered by flashing lights.",
              newValue: "Removed from the form by Dr. John."
            },
            {
              field: "brain_injury_4",
              previousValue: "I experience dizziness when using AR headsets for more than 30 minutes.",
              newValue: "Removed from the form by Dr. John."
            },
            {
              field: "brain_injury_5",
              previousValue: "I experience motion sickness when using AR glasses for extended periods.",
              newValue: "Removed from the form by Dr. John."
            }
          ]
        }
      ],
      submitButton: {
        label: "Approve and continue"
      }
    }
  };
  
  export default formsData;  