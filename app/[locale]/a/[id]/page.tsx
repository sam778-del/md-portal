import { notFound } from "next/navigation"
import { forms } from "../../../forms"
import { FormStepper } from "./form-stepper"

export default function FormPage({ params }: { params: { id: string } }) {
  const formData = forms[params.id as keyof typeof forms]

  if (!formData) {
    notFound()
  }

  return (
    <main className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full md:w-full lg:max-w-[430px] bg-white min-h-screen">
        <FormStepper formId={params.id} />
      </div>
    </main>
  )
}

