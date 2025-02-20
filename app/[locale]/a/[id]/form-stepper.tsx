"use client"

import { useState } from "react"
import { forms } from "@/app/forms"
import { Button } from "@/app/components/ux/button"
import { Checkbox } from "@/app/components/ux/checkbox"
import { Input } from "@/app/components/ux/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ux/select"
import { Logo } from "@/app/components/ux/Logo"
import { SuccessIcon } from "@/app/components/ux/Success"
import { Textarea } from "@/app/components/ux/textarea"
import { Alert, AlertDescription } from "@/app/components/ux/alert"
import { format } from "date-fns"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ux/collapsible"
import { ChevronDown, Upload } from "lucide-react"

export function FormStepper({ formId }: { formId: string }) {
  const [step, setStep] = useState(0)
  const [phone, setPhone] = useState("")
  const [countryCode, setCountryCode] = useState("+33")
  const [code, setCode] = useState("")
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({})

  const formData = forms[formId as keyof typeof forms]

  const allCheckboxesChecked = formData.fields.some(field => answers[field.id])

  const getAlertStyles = (style: string) => {
    const styles = {
      warning: {
        background: "bg-[#FFF4F4]",
        text: "text-[#73001F]",
        border: "border-[#FFF4F4]",
      },
      error: {
        background: "bg-[#FEF2F2]",
        text: "text-[#991B1B]",
        border: "border-red-200",
      },
      info: {
        background: "bg-blue-50",
        text: "text-blue-800",
        border: "border-blue-200",
      },
      success: {
        background: "bg-green-50",
        text: "text-green-800",
        border: "border-green-200",
      },
    }

    return styles[style as keyof typeof styles] || styles.info
  }

  const alertStyles = getAlertStyles(formData.doctorMessage.style)

  const steps = [
    // Welcome Step
    <div key="welcome" className="space-y-6 h-full flex flex-col">
      <Logo />
      <div className="flex-grow flex flex-col justify-end space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-[40px] text-[#000229]">Welcome to the quest</h1>
          <p className="text-sm text-[#6B7488]">it is great to see you, we would like to let you know that all the data is confident la lka ka </p>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="consent"
            checked={answers.consent}
            onCheckedChange={(checked) => setAnswers((prev) => ({ ...prev, consent: checked as boolean }))}
          />
          <label htmlFor="consent" className="text-sm leading-[20px] font-medium text-[#414651]">
            I approve to provide this information to a doctor on your behalf...
          </label>
        </div>

        <Button
          className="w-full bg-emerald-500 hover:bg-emerald-600"
          disabled={!answers.consent}
          onClick={() => setStep(1)}
        >
          Get started
        </Button>
      </div>
    </div>,

    // Phone Step
    <div key="phone" className="space-y-6">
      <Logo />

      <div className="space-y-2">
        <h2 className="text-xl text-[#000229]">Please insert your phone number to receive code:</h2>
      </div>

      <div className="flex items-center border rounded-[14px] border-gray-300 overflow-hidden">
        <Select
          defaultValue={countryCode}
          onValueChange={(value) => setCountryCode(value)}
        >
          <SelectTrigger className="w-[100px] border-none focus:ring-0">
            <SelectValue placeholder="Code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="+33">+33</SelectItem>
            <SelectItem value="+44">+44</SelectItem>
            <SelectItem value="+1">+1</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-gray-400 px-2">|</span>
        <Input
          type="number"
          placeholder="054-*******25"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border-none focus:ring-0 flex-grow"
        />
      </div>

      <Button className="w-full bg-emerald-500 hover:bg-emerald-600"
        onClick={() => setStep(2)}
        disabled={phone.trim() === ''}
      >
        Receive code
      </Button>
    </div>,

    // Verification Step
    <div key="verification" className="space-y-6">
      <Logo />

      <div className="space-y-2">
        <h2 className="text-xl text-[#000229]">Enter the 6-digit code we sent you at {`(${countryCode})`} {phone}</h2>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Input
            key={i}
            type="text"
            maxLength={1}
            className="w-full text-center text-xl border border-gray-300 rounded-[14px] h-12 focus:ring-2 focus:ring-emerald-500"
            value={code[i] || ""}
            onChange={(e) => {
              const newCode = code.split("");
              newCode[i] = e.target.value.replace(/\D/, "");
              setCode(newCode.join(""));

              if (e.target.value && i < 5) {
                const nextInput = document.getElementById(`code-${i + 1}`);
                if (nextInput instanceof HTMLInputElement) {
                  nextInput.focus();
                }
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !code[i] && i > 0) {
                const prevInput = document.getElementById(`code-${i - 1}`);
                if (prevInput instanceof HTMLInputElement) {
                  prevInput.focus();
                }
              }
            }}
            id={`code-${i}`}
            name={`code-${i}`}
          />
        ))}
      </div>

      <Button
        className="w-full bg-emerald-500 hover:bg-emerald-600"
        onClick={() => setStep(3)}
        disabled={code.length !== 6}
      >
        View information
      </Button>
    </div>,

    // Form Step
    <div key="form" className="space-y-6 h-full flex flex-col">
      <Logo />

      {formId === "987654" && formData.revisions ? (
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-[#000229]">{formData.title}</h2>
          {/* <p className="text-sm text-[#6B7488]">{formData.description}</p> */}
          {formData.doctorMessage && (
            <Alert className={`${alertStyles.background} border ${alertStyles.border} rounded-2xl p-6`}>
              <AlertDescription className={`${alertStyles.text} text-sm leading-7`}>
                {formData.doctorMessage.text}
              </AlertDescription>
            </Alert>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-[#000229]">Welcome to the quest</h2>
          <p className="text-sm text-[#6B7488]">Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire </p>
        </div>
      )}

      {formId === "987654" && formData.revisions ? (
        <>
          <div className="space-y-4">
            {formData.fields.map((field: any) => (
              <div key={field.id} className="space-y-2">
                {field.conditional.map((conditionalField: any, idx: number) => {
                  if (conditionalField.type === "textarea") {
                    return (
                      <div key={idx} className="space-y-4">
                        <Textarea
                          placeholder={conditionalField.placeholder}
                          className="w-full min-h-[120px] text-base leading-6 text-[#0A0A29] placeholder:text-[#9CA3AF] rounded-2xl border border-[#E5E7EB] p-4 focus:ring-2 focus:ring-[#00BA88]"
                        />
                      </div>
                    )
                  } else if (conditionalField.type === "file") {
                    // Create a unique key using the field id and the index.
                    const fileKey = `${field.id}-file-upload-${idx}`

                    return (
                      <div key={idx} className="space-y-4">
                        <p className="text-[#535862] text-sm">
                          {conditionalField.description}
                        </p>

                        <input
                          type="file"
                          id={fileKey}
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            if (file) {
                              setUploadedFiles((prev) => ({
                                ...prev,
                                [fileKey]: file,
                              }))
                              console.log("Selected file:", file)
                            }
                          }}
                        />

                        <Button
                          variant="outline"
                          className="w-auto h-auto px-6 py-3 rounded-[14px] border border-[#E5E7EB] bg-white text-[#414651] hover:bg-gray-50 space-x-2"
                          onClick={() => document.getElementById(fileKey)?.click()}
                        >
                          <Upload className="w-5 h-5" />
                          <span>Click here to upload</span>
                        </Button>

                        {uploadedFiles[fileKey] && (
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm text-[#414651]">
                              {uploadedFiles[fileKey].name}
                            </span>
                            <button
                              onClick={() =>
                                setUploadedFiles((prev) => {
                                  const newFiles = { ...prev }
                                  delete newFiles[fileKey]
                                  return newFiles
                                })
                              }
                              className="text-red-500 hover:underline ml-2"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
              </div>
            ))}
          </div>
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-600"
            onClick={() => setStep(4)}
          >
            {formData.submitButton.label}
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          {formData.fields.map((field: any) => (
            <div key={field.id} className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id={field.id}
                  checked={answers[field.id]}
                  onCheckedChange={(checked) =>
                    setAnswers((prev: any) => ({ ...prev, [field.id]: checked }))
                  }
                />
                <label htmlFor={field.id} className="text-sm font-medium text-[#161719]">
                  {field.label}
                </label>
              </div>

              {answers[field.id] && field.conditional && (
                <>
                  {field.conditional.map((conditionalField: any, idx: number) => {
                    if (conditionalField.type === "textarea") {
                      return (
                        <div key={idx} className="space-y-4">
                          <Textarea
                            placeholder={conditionalField.placeholder}
                            className="w-full min-h-[120px] text-base leading-6 text-[#0A0A29] placeholder:text-[#9CA3AF] rounded-2xl border border-[#E5E7EB] p-4 focus:ring-2 focus:ring-[#00BA88]"
                          />
                        </div>
                      )
                    } else if (conditionalField.type === "file") {
                      // Create a unique key for each file upload field
                      const fileKey = `${field.id}-file-upload-${idx}`

                      return (
                        <div key={idx} className="space-y-4">
                          <p className="text-[#535862] text-sm">
                            {conditionalField.description}
                          </p>

                          <input
                            type="file"
                            id={fileKey}
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0]
                              if (file) {
                                setUploadedFiles((prev) => ({
                                  ...prev,
                                  [fileKey]: file,
                                }))
                                console.log("Selected file:", file)
                              }
                            }}
                          />

                          <Button
                            variant="outline"
                            className="w-auto h-auto px-6 py-3 rounded-[14px] border border-[#E5E7EB] bg-white text-[#414651] hover:bg-gray-50 space-x-2"
                            onClick={() => document.getElementById(fileKey)?.click()}
                          >
                            <Upload className="w-5 h-5" />
                            <span>Click here to upload</span>
                          </Button>

                          {uploadedFiles[fileKey] && (
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-sm text-[#414651]">
                                {uploadedFiles[fileKey].name}
                              </span>
                              <button
                                onClick={() =>
                                  setUploadedFiles((prev) => {
                                    const newFiles = { ...prev }
                                    delete newFiles[fileKey]
                                    return newFiles
                                  })
                                }
                                className="text-red-500 hover:underline ml-2"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    } else {
                      return null
                    }
                  })}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {formId === "987654" && formData.revisions && (
        <div className="space-y-4">
          <h3 className="text-[16px] leading-[24px] font-medium text-[#161719]">Revision history</h3>
          {formData.revisions.map((revision) => (
            <Collapsible key={revision.id}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between w-full p-4 bg-[#F7F8F8] rounded-t-2xl data-[state=closed]:rounded-2xl hover:bg-[#F0F1F1] transition-colors">
                  <span className="text-base font-medium text-[#000229]">
                    {format(new Date(revision.timestamp), "do MMM, yyyy")}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#6B7488] transition-transform duration-200 data-[state=open]:rotate-180" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="bg-[#F7F8F8] px-4 pb-4 rounded-b-2xl space-y-3">
                  {revision.changes.map((change, idx) => (
                    <div key={idx} className="text-[14px] leading-[20px] text-[#535862]">
                      {change.newValue}
                    </div>
                  ))}
                  {revision?.uploadedFiles && revision.uploadedFiles.length > 0 && (
                    <div className="space-y-1">
                      {revision.uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center space-x-1">
                          <span className="text-[14px] leading-[20px] text-[#535862]">(file uploaded:</span>
                          <a href={file.url} className="text-[14px] leading-[20px] text-[#00BA88] hover:underline">
                            {file.name}
                          </a>
                          <span className="text-[14px] leading-[20px] text-[#535862]">)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}

      {formId !== "987654" && (
        <div className="flex-grow flex flex-col justify-end space-y-6">
          {allCheckboxesChecked && (
            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600"
              onClick={() => setStep(4)}
            >
              {formData.submitButton.label}
            </Button>
          )}
        </div>
      )}
    </div>,

    // Success Step
    <div className="space-y-16 h-full">
      <Logo />

      <div className="space-y-8 text-center">
        <div className="relative w-20 h-20 mx-auto">
          <SuccessIcon />
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-xl font-medium text-[#000229]">Thank you, Andrew Gomez</h2>
          <p className="text-[#6B7488] text-sm">
            Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire
            Lorem ipsum welcome to questionnaire Lorem ipsum welcome to questionnaire
          </p>
        </div>
      </div>
    </div>,
  ]

  return (
    <div className="w-full px-6 py-12 flex flex-col gap-16 h-full">
      {/* Current Step */}
      {steps[step]}
    </div>
  )
}

