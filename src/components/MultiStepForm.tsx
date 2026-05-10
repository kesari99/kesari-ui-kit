import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepFormData } from "@/types.ts/MutliformTypes";
import { useMultiStepForm } from "@/hoooks/use-multi-step-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProgressSteps from "./ProgressSteps";
import {
  BillinglInfoStep,
  PersonalInfoStep,
  ProfessionalInfoStep,
} from "./steps";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
const MultiStepForm = () => {
  //Custom hook

  const {
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
  } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [currentStep, formData, reset]);

  const onNext = async (data: StepFormData) => {
    //Manual Validation check
    const isValid = await trigger();
    if (!isValid) return;

    const updatedData = { ...formData, ...data };
    console.log(data, formData);
    updateFormData(updatedData);
    //Merge currentStep data with all previou steps
    if (isLastStep) {
      try {
        submitForm(updatedData);
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <ProgressSteps currentStep={currentStep} steps={steps} />
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <PersonalInfoStep register={register} errors={errors} />
          )}
          {currentStep === 1 && (
            <ProfessionalInfoStep
              register={register}
              errors={errors}
              setValue={setValue} //needed for select component
            />
          )}
          {currentStep === 2 && (
            <BillinglInfoStep register={register} errors={errors} />
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={goToPrevStep}
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleSubmit(onNext)}
            >
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ChevronRight className="w-4 h-4 mr-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;
