import { useState } from "react";
import formsData from '@/data/forms';
import { UploadCloud } from "lucide-react";

interface Field {
    type: string;
    label: string;
    conditional?: { placeholder: string }[];
}

interface Form {
    description: string;
    fields: Field[];
    submitButton: { label: string };
}

interface FormPageProps {
    handleNext: () => void;
}

const FormPage: React.FC<FormPageProps> = ({ handleNext }) => {
    const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const form = formsData["123456"] as Form;

    const handleCheckboxChange = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            alert(`File uploaded: ${file.name}`);
        }
    };

    return (
        <div className="w-4/6 mx-auto min-h-screen flex flex-col items-center justify-center bg-white p-6 md:w-2/6">
            <img src="/logo.png" alt="Sparkles Logo" className="w-32 mb-10" />
            <h1 className="text-xl font-bold text-center mt-6">Welcome to the quest</h1>
            <p className="text-gray-600 text-center my-2 px-4">{form.description}</p>

            <form className="w-full flex flex-col gap-4">
                {form.fields.map((data, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md">
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
                        {checkedItems[index] && (
                            <>
                                <label
                                    htmlFor="file-upload"
                                    className="flex items-center justify-center mb-4 border border-dashed border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50"
                                >
                                    <UploadCloud className="w-5 h-5 text-gray-500 mr-2" />
                                    <span className="text-gray-600">
                                        {uploadedFile ? uploadedFile.name : "Click here to upload"}
                                    </span>
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </>
                        )}
                    </div>
                ))}
                <button type="button" className="w-full bg-green-500 text-white py-2 rounded mt-4" onClick={handleNext}>
                    {form.submitButton.label}
                </button>
            </form>
        </div>
    );
};

export default FormPage;
