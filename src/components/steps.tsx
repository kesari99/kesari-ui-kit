import { useForm } from "react-hook-form";
import { CardTitle } from "./ui/card";
import { StepFormData } from "@/types.ts/MutliformTypes";
import FormField from "./form-field";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface StepProps {
  errors: Record<string, { message?: string }>;
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}

const PersonalInfoStep = ({ errors, register }: StepProps) => {
  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Personal Information</CardTitle>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="First Name"
          register={register}
          errors={errors}
        />
        <FormField
          id="lastName"
          label="Last Name"
          register={register}
          errors={errors}
        />
      </div>
      <FormField
        id="email"
        label="Email Address"
        register={register}
        errors={errors}
        type="email"
      />
      <FormField
        id="phone"
        label="Phone Number"
        register={register}
        errors={errors}
        type="tel"
      />
    </div>
  );
};

const ProfessionalInfoStep = ({ errors, register, setValue }: StepProps) => {
  const [experience, setExperince] = useState("");
  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Professional Information</CardTitle>
      <FormField
        id="company"
        label="Company"
        register={register}
        errors={errors}
      />
      <FormField
        id="position"
        label="Position"
        register={register}
        errors={errors}
      />

      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Select
          onValueChange={(value) => {
            setValue?.(
              "experience",
              value as Extract<
                StepFormData,
                { experience: string }
              >["experience"],
              { shouldValidate: true },
            );
            setExperince(value);
            value = { experience };
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.experience && (
          <p className="text-sm text-destructive">
            {errors.experience.message}
          </p>
        )}
      </div>
      <FormField
        id="industry"
        label="Industry"
        register={register}
        errors={errors}
      />
    </div>
  );
};

const BillinglInfoStep = ({ errors, register, setValue }: StepProps) => {
  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Personal Information</CardTitle>

      <FormField
        id="cardNumber"
        label="Card Number"
        register={register}
        errors={errors}
        maxLength={16}
      />
      <FormField
        id="cardHolder"
        label="Cardholder Name"
        register={register}
        errors={errors}
      />

      {/* Two-column layout for expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="expiryDate"
          label="Expiry Date"
          register={register}
          errors={errors}
          maxLength={5}
        />
        <FormField
          id="cvv"
          label="CVV"
          register={register}
          errors={errors}
          maxLength={4}
        />
      </div>
    </div>
  );
};

export { ProfessionalInfoStep, PersonalInfoStep, BillinglInfoStep };
