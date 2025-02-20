import React, { useState } from "react";
import { UploadCloud, ChevronDown } from "lucide-react";
import formsData from '@/data/forms';

interface Field {
    id: string;
    type: string;
    label: string;
    description?: string;
    conditional?: { placeholder: string }[];
}

interface Form {
    title: string;
    description: string;
    fields: Field[];
    submitButton: { label: string };
}

interface MessegeProps {
    handleNext: () => void;
}

const Messege: React.FC<MessegeProps> = ({ handleNext }) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const form = formsData["123456"] as Form;
    const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

    const handleCheckboxChange = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };
    
    const handleRevisionClick = () => {
        setShowDetails(!showDetails);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            alert(`File uploaded: ${file.name}`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-4/6 bg-white rounded-2xl shadow-xl p-4">
                <img src="/logo.png" alt="Sparkles Logo" className="w-32 mb-10" />

                <h2 className="text-lg font-medium text-gray-800 mb-2">{form.title}</h2>
                <div className="mb-4 border rounded shadow-sm">
                    <div className="p-4">
                        <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                            {form.description}
                        </div>
                        
                        {form.fields.map((data, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-md my-3">
                                {data.id === 'mri_upload' && (
                                    <p className="text-gray-700">{data.description}</p>
                                )}
                                <label className="flex items-center">
                                    <input
                                        type={data.type}
                                        className="mr-2"
                                        checked={checkedItems[index] || false}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    {data.label}
                                </label>
                                {checkedItems[index] && data.conditional && (
                                    <textarea 
                                        className="w-full p-2 border rounded mt-2" 
                                        placeholder={data.conditional[0]?.placeholder || ''}
                                    ></textarea>
                                )}
                            </div>
                        ))}

                        <button 
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded" 
                            onClick={handleNext}
                        >
                            {form.submitButton.label}
                        </button>
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    <h3 className="font-medium mb-2">Revision history</h3>
                    <div
                        className="bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200 flex justify-between items-center"
                        onClick={handleRevisionClick}
                    >
                        <p className="text-gray-800 font-medium">20th Nov, 2024</p>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                    {showDetails && (
                        <div className="mt-2 p-3 bg-gray-50 border rounded">
                            <p className="text-gray-700">
                                Not suffering from mental illness. Not suffering from brain seizure. Did have traumatic event related to head: “Had a motorcycle accident last week but the doctor said I am ok” (file uploaded: drwho_29381.pdf)
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messege;
