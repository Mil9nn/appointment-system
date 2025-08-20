"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { savePatientData } from "@/lib/appwrite";

// Simple form fields configuration
const FORM_FIELDS = [
  {
    key: "birthDate",
    question: "What's your date of birth? (MM/DD/YYYY)",
    type: "date",
    required: true,
    placeholder: "01/01/1990",
  },
  {
    key: "gender",
    question: "What's your gender?",
    type: "text",
    required: true,
    placeholder: "Male, Female, or Other",
  },
  {
    key: "allergies",
    question: "Any allergies? (Type 'none' if you don't have any)",
    type: "textarea",
    required: false,
    placeholder: 'Penicillin, Nuts, etc. or "none"',
  },
  {
    key: "currentMedication",
    question: "Current medications? (Type 'none' if you're not taking any)",
    type: "textarea",
    required: false,
    placeholder: 'Aspirin, Metformin, etc. or "none"',
  },
  {
    key: "familyMedicalHistory",
    question: "Family medical history? (Type 'none' if not applicable)",
    type: "textarea",
    required: false,
    placeholder: 'Heart disease, diabetes, etc. or "none"',
  },
  {
    key: "pastMedicalHistory",
    question:
      "Past medical conditions or surgeries? (Type 'none' if not applicable)",
    type: "textarea",
    required: false,
    placeholder: 'Previous surgeries, conditions, etc. or "none"',
  },
];

// Simple validation without AI
const validateInput = (field, value) => {
  if (field.required && !value.trim()) {
    return { isValid: false, message: "This field is required." };
  }

  switch (field.type) {
    case "email":
      if (value && !value.includes("@")) {
        return {
          isValid: false,
          message: "Please enter a valid email address.",
        };
      }
      break;
    case "tel":
      if (value && value.length < 10) {
        return {
          isValid: false,
          message: "Please enter a complete phone number.",
        };
      }
      break;
  }

  return { isValid: true };
};

export default function MedicalForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentQuestionIndex < FORM_FIELDS.length) {
      setCurrentQuestion(FORM_FIELDS[currentQuestionIndex].question);
      // Pre-fill if we have data (for going back)
      const fieldKey = FORM_FIELDS[currentQuestionIndex].key;
      setCurrentInput(formData[fieldKey] || "");
    }
    inputRef.current?.focus();
  }, [currentQuestionIndex, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentField = FORM_FIELDS[currentQuestionIndex];

    // Validate input
    const validation = validateInput(currentField, currentInput);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setError("");
    setIsLoading(true);

    // Save to form data
    const newFormData = {
      ...formData,
      [currentField.key]: currentInput,
    };
    setFormData(newFormData);

    // Move to next question after brief delay
    setTimeout(async () => {
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex >= FORM_FIELDS.length) {
        // Form completed - save to database
        setCurrentQuestion(
          "Perfect! ✅ Medical information submitted successfully!"
        );
        setIsCompleted(true);

        try {
          const result = await savePatientData(newFormData);
          if (result.success) {
            console.log("Data saved successfully:", result.data);
          } else {
            console.error("Save failed:", result.error);
            setError("Failed to save data. Please try again.");
          }
        } catch (error) {
          console.error("Save error:", error);
          setError("Failed to save data. Please try again.");
        }
      } else {
        // Move to next question
        setCurrentQuestionIndex(nextIndex);
        setCurrentInput("");
      }

      setIsLoading(false);
    }, 800);
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setError("");
    }
  };

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
    setError("");
  };

  const progress = (currentQuestionIndex / FORM_FIELDS.length) * 100;
  const currentField = FORM_FIELDS[currentQuestionIndex];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-300">Medical information form</span>
            <span className="text-sm text-gray-300">
              {isCompleted
                ? "100%"
                : `${currentQuestionIndex + 1} of ${FORM_FIELDS.length}`}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${isCompleted ? 100 : progress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="p-8">
          {/* Back Button */}
          {currentQuestionIndex > 0 && !isCompleted && (
            <button
              onClick={goBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Previous</span>
            </button>
          )}

          {/* Question */}
          <div className="mb-5">
            <p className="text-base font-semibold text-white">
              {currentQuestion}
            </p>
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </div>

          {/* Input Section */}
          {!isCompleted && (
            <div className="space-y-4">
              <div className="relative">
                {currentField?.type === "textarea" ? (
                  <textarea
                    ref={inputRef}
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder={
                      currentField?.placeholder || "Type your answer here..."
                    }
                    className="w-full h-20 text-white placeholder-gray-400 p-5 text-lg focus:outline-none border-b-2 focus:border-blue-500 transition-all duration-200 border-gray-600/30 resize-none"
                    disabled={isLoading}
                    rows={4}
                  />
                ) : (
                  <input
                    ref={inputRef}
                    type={currentField?.type || "text"}
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
                    placeholder={
                      currentField?.placeholder || "Type your answer here..."
                    }
                    className="w-full text-white placeholder-gray-400 p-6 text-md focus:outline-none border-b-2 focus:border-blue-500 transition-all duration-200 border-gray-600/30"
                    disabled={isLoading}
                  />
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-blue-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}

          {/* Completion State */}
          {isCompleted && (
            <div className="space-y-6 flex flex-col">
              <p className="text-gray-300 text-md">
                Your health information has been securely recorded. This data
                will help our care team better understand your medical history
                and provide you with more accurate diagnosis and personalized
                treatment.
              </p>

              <p>You may now proceed to book your appointment.</p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 self-center text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                Continue to Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
