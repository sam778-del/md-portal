export default {
  "123456": {
    id: "123456",
    title: "Patient Questionnaire",
    description: "Please answer the following questions to help us understand your health.",
    fields: [
      {
        id: "allergies",
        type: "checkbox",
        label: "Do you have any allergies?",
        conditional: [
          {
            type: "textarea",
            placeholder: "Please list your allergies.",
          },
        ],
      },
      {
        id: "medications",
        type: "checkbox",
        label: "Are you currently taking any medications?",
        conditional: [
          {
            type: "textarea",
            placeholder: "Please list your medications.",
          },
        ],
      },
      // Add more fields as needed
    ],
    revisions: [],
    submitButton: {
      label: "Submit",
    },
  },
  // Add more forms as needed
}

