import React from "react";
import { Input } from "./ui/input";
import { AllFormFields, StepFormData } from "@/types.ts/MutliformTypes";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";

export default function FormField({
  id,
  label,
  errors,
  register,
  type = "text",
  maxLength,
}: {
  id: keyof AllFormFields;
  label: string;
  errors: Record<string, { message?: string }>;
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} maxLength={maxLength} {...register(id)} />

      {errors[id] && (
        <p className="text-sm text-destructive"> {errors[id]?.message}</p>
      )}
    </div>
  );
}
