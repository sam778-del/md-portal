import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

interface VerificationCodeProps {
  handleNext: () => void;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({ handleNext }) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to next input if a number is entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Move focus to previous input when backspace is pressed on an empty field
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-4/6 max-w-md flex flex-col items-center text-center">
        <img src="/logo.png" alt="Sparkles Logo" className="w-32 mb-10" />

        <h2 className="text-xl font-bold text-black mb-3">
          Enter the 6-digit code we sent you at (+33) 146 67 64 87
        </h2>

        <div className="flex space-x-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              maxLength={1}
              className="w-10 h-10 text-center text-lg border border-gray-300 rounded"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-teal-400 text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-500 transition"
        >
          View information
        </button>
      </div>
    </div>
  );
};

export default VerificationCode;