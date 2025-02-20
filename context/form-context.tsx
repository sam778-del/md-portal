"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { FormState } from "../types/form"
import formsData from "../forms-data"

type Action =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_CODE"; payload: string }
  | { type: "SET_FORM_ID"; payload: string }
  | { type: "SET_ANSWER"; payload: { id: string; value: any } }

const initialState: FormState = {
  currentStep: 0,
  phoneNumber: "",
  verificationCode: "",
  answers: {},
}

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload }
    case "SET_PHONE":
      return { ...state, phoneNumber: action.payload }
    case "SET_CODE":
      return { ...state, verificationCode: action.payload }
    case "SET_FORM_ID":
      return {
        ...state,
        formId: action.payload,
        formData: formsData[action.payload as keyof typeof formsData],
      }
    case "SET_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.id]: action.payload.value,
        },
      }
    default:
      return state
  }
}

const FormContext = createContext<{
  state: FormState
  dispatch: React.Dispatch<Action>
} | null>(null)

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>
}

export function useForm() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useForm must be used within a FormProvider")
  }
  return context
}

