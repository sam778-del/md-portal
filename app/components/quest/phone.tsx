import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface PhoneVerificationProps {
  handleNext: () => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({ handleNext }) => {
  const [phone, setPhone] = useState<string>('');
  const router = useRouter();

  const onSubmit = () => {
    if (phone !== "") {
      handleNext();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-4/6 max-w-md flex flex-col items-center text-center">
        <img src="/logo.png" alt="Sparkles Logo" className="w-32 mb-10" />

        <h2 className="text-xl font-bold text-black mb-3">Please insert your phone number to receive code:</h2>

        <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full mb-6">
          <select className="bg-transparent border-none text-gray-700 text-lg mr-2">
            <option value="+33">+33</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input
            type="text"
            placeholder="054*******25"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full text-lg border-none focus:ring-0 outline-none"
          />
        </div>

        <button 
          onClick={onSubmit} 
          className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition" 
          disabled={phone === ""}
        >
          Receive code
        </button>
      </div>
    </div>
  );
};

export default PhoneVerification;