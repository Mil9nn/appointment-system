export interface FormField {
  key: string;
  question: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'textarea';
  validation: 'required' | 'optional';
  placeholder?: string;
}

export const MEDICAL_FORM_FIELDS: FormField[] = [
  {
    key: 'birthDate',
    question: "What's your date of birth? (MM/DD/YYYY)",
    type: 'date',
    validation: 'required',
    placeholder: '01/01/1990'
  },
  {
    key: 'gender',
    question: "What's your gender?",
    type: 'text',
    validation: 'required',
    placeholder: 'Male, Female, or Other'
  },
  {
    key: 'allergies',
    question: "Do you have any allergies? (Type 'none' if you don't have any)",
    type: 'textarea',
    validation: 'optional',
    placeholder: 'Penicillin, Nuts, etc. or "none"'
  },
  {
    key: 'currentMedication',
    question: "Are you currently taking any medications? (Type 'none' if you're not)",
    type: 'textarea',
    validation: 'optional',
    placeholder: 'Aspirin, Metformin, etc. or "none"'
  },
  {
    key: 'familyMedicalHistory',
    question: "Any relevant family medical history? (Type 'none' if not applicable)",
    type: 'textarea',
    validation: 'optional',
    placeholder: 'Heart disease, diabetes, etc. or "none"'
  },
  {
    key: 'pastMedicalHistory',
    question: "Any past medical conditions or surgeries? (Type 'none' if not applicable)",
    type: 'textarea',
    validation: 'optional',
    placeholder: 'Previous surgeries, conditions, etc. or "none"'
  }
];