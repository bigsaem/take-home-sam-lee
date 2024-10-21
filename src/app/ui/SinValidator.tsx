"use client";

import { useState } from "react";
import { validateSIN } from "@/lib/validateSIN";

export const SINValidator: React.FC = () => {
  const [sin, setSin] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSin(e.target.value);
    setIsValid(null);
  };

  const handleValidate = () => {
    const result = validateSIN(sin);
    setIsValid(result);
  };

  return (
    <div>
      <h1 className="text-center m-5 font-bold text-xl">SIN Validator</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-5">
        <input
          type="text"
          value={sin}
          className="bg-slate-900 text-white py-2 px-3 rounded-md"
          onChange={handleInputChange}
          placeholder="Enter SIN (9 digits)"
          maxLength={9}
          autoFocus
        />
        <button
          className="bg-indigo-500 text-white text-sm font-semibold rounded-md py-2 px-3 my-5 sm:my-0"
          onClick={handleValidate}
        >
          Validate SIN
        </button>
      </div>
      {isValid === true && <p className="text-green-600 px-2 py-2">Valid SIN</p>}
      {isValid === false && (
        <p className="text-rose-600 px-2 py-2">Invalid SIN</p>
      )}
      {isValid === null && <p className="min-h-10 py-2"></p>}
    </div>
  );
};

export default SINValidator;
