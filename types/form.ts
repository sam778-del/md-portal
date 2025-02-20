export interface FormField {
    id: string
    type: "checkbox" | "file"
    label: string
    checked?: boolean
    conditional?: {
      type: "textarea"
      placeholder: string
    }[]
    description?: string
  }
  
  export interface DoctorMessage {
    type: "alert"
    style: "warning"
    text: string
  }
  
  export interface FormData {
    id: string
    title: string
    description: string
    doctorMessage?: DoctorMessage
    fields: FormField[]
    revisions: any[]
    submitButton: {
      label: string
    }
  }
  
  export interface FormState {
    currentStep: number
    phoneNumber: string
    verificationCode: string
    formId?: string
    formData?: FormData
    answers: Record<string, any>
  }
  
  