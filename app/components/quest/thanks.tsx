import React from "react";

type ThankYouScreenProps = {
  handleNext: () => void;
};

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ handleNext }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-4/6 text-center">
        <img src="/logo.png" alt="Sparkles Logo" className="w-32 mb-10" />

        <div className="flex flex-col items-center">
          <div className="bg-green-100 rounded-full p-4 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Thank you, Andrew Gomez
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum welcome to questionnaire Lorem ipsum welcome to
            questionnaire Lorem ipsum welcome to questionnaire Lorem ipsum
            welcome to questionnaire
          </p>

          {/* Add a "Next" button */}
          <button 
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={handleNext}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;