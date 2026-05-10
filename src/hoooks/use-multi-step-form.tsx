import {
  billingInfoSchema,
  personalInfoSchema,
  professionalInfoSchema,
  Step,
  StepFormData,
} from "@/types.ts/MutliformTypes";
import { Briefcase, CreditCard, User } from "lucide-react";
import { useState } from "react";

const stepSchema = [
  personalInfoSchema,
  professionalInfoSchema,
  billingInfoSchema,
];

export const steps: Step[] = [
  { id: "personal", name: "Personal Info", icon: User },
  { id: "professional", name: "Professional Info", icon: Briefcase },
  { id: "billing", name: "Billing Info", icon: CreditCard },
];

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StepFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const getCurrentStepSchema = () => stepSchema[currentStep];

  const goToNextStep = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

  const goToPrevStep = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  const updateFormData = (newData: Partial<StepFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const submitForm = (data: StepFormData) => {
    console.log("Final data", data);
    setIsSubmitted(true);
  };

  const resertForm = () => {
    setFormData({});
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  return {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,

    goToNextStep,
    goToPrevStep,
    updateFormData,
    submitForm,
    resertForm,
    getCurrentStepSchema,
  };
}
