"use client";

import React, { useState, useRef } from "react";
import { insertData, uploadPicture } from "@/lib/db";
import { useRouter } from "next/navigation";
import programsList from "@/data/programs.json";
import scholarshipTypeList from "@/data/scholarshipType.json";
import yearLevelList from "@/data/yearLevel.json";
import { LoaderCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  first_name: z.string().nonempty({ message: "First Name is required." }),
  middle_name: z.string().nonempty({ message: "Middle Name is required." }),
  last_name: z.string().nonempty({ message: "Last Name is required." }),
  birth_date: z.string().nonempty({ message: "Birth date is required." }),
  program: z.string().nonempty({ message: "Program is required." }),
  year_level: z.string().nonempty({ message: "Year level is required." }),
  usc_id: z.string().length(8, { message: "USC ID must be 8 digits." }),
  scholarship_type: z
    .string()
    .nonempty({ message: "Scholarship Type is required." }),
  award_year: z
    .string()
    .length(4, { message: "Year of Award must be 4 digits." }),
});

import { toast } from "sonner";

const TextInput = ({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const SelectInput = ({
  name,
  label,
  placeholder,
  options,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: string[] | Record<string, string>;
}) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(options)
                ? options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))
                : Object.entries(options).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const SetUpForm = ({ userID }: { userID: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      birth_date: "",
      program: "",
      year_level: "",
      usc_id: "",
      scholarship_type: "",
      award_year: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [picturePreview, setPicturePreview] = useState<File>();
  const [pictureInputHover, setPictureInputHover] = useState(false);
  const [pictureInputErrorMessage, setPictureInputErrorMessage] = useState("");
  const pictureInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!picturePreview) {
      setPictureInputErrorMessage("Picture is required.");
      return;
    }

    setIsSubmitting(true);

    // Toast promise handling
    await toast.promise(
      (async () => {
        const res = await insertData({
          ...data,
          user_id: userID,
          usc_id: data.usc_id.toString(),
          award_year: data.award_year.toString(),
        });

        if (res === "Duplicate USC_ID_KEY") {
          form.setError("usc_id", {
            type: "manual",
            message: "USC ID already exists.",
          });
          throw new Error("USC ID already exists.");
        }

        if (res === "INSERTED SUCCESSFULLY") {
          await uploadPicture(picturePreview, userID);
        }

        router.refresh();
      })(),
      {
        loading: "Submitting data...",
        success: "Form submitted successfully!",
        error: "Failed to submit. Please try again.",
      }
    );
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPicturePreview(file);
      setPictureInputErrorMessage("");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormItem>
            <FormLabel>
              <span
                className={`${
                  pictureInputErrorMessage ? "text-[#BF4040]" : ""
                }`}
              >
                Picture
              </span>
            </FormLabel>
            <FormControl>
              <div
                className="w-[132px] h-[170px] bg-gray-500"
                onMouseEnter={() => setPictureInputHover(true)}
                onMouseLeave={() => setPictureInputHover(false)}
                style={{
                  backgroundImage: `url(${
                    picturePreview ? URL.createObjectURL(picturePreview) : ""
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => pictureInputRef.current?.click()}
              >
                {pictureInputHover && (
                  <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-50 text-white cursor-pointer">
                    <Upload />
                  </div>
                )}
                <Input
                  type="file"
                  id="pictureInput"
                  placeholder="Select Picture"
                  className="hidden"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handlePictureChange}
                  ref={pictureInputRef}
                />
              </div>
            </FormControl>
            {pictureInputErrorMessage && (
              <FormMessage>{pictureInputErrorMessage}</FormMessage>
            )}
          </FormItem>

          <div className="col-span-2 gap-4">
            <TextInput
              name="first_name"
              label="First Name"
              placeholder="Enter First Name"
            />
            <TextInput
              name="middle_name"
              label="Middle Name"
              placeholder="Enter Middle Name"
            />
            <TextInput
              name="last_name"
              label="Last Name"
              placeholder="Enter Last Name"
            />
          </div>
          <SelectInput
            name="program"
            label="Select Program"
            placeholder="Program"
            options={programsList}
          />
          <SelectInput
            name="year_level"
            label="Select Year Level"
            placeholder="Year Level"
            options={yearLevelList}
          />
          <TextInput
            name="usc_id"
            label="USC Student ID"
            placeholder="USC Student ID"
            type="number"
          />
          <SelectInput
            name="scholarship_type"
            label="Select Scholarship Type"
            placeholder="Scholarship Type"
            options={scholarshipTypeList}
          />
          <TextInput
            name="award_year"
            label="Year of Award"
            placeholder="Year of Award"
            type="number"
          />
          <TextInput name="birth_date" label="Birth Date" type="date" />
        </div>
        <Button
          onClick={() => {
            // for picture input validation
            if (!picturePreview) {
              setPictureInputErrorMessage("Picture is required.");
            }
          }}
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SetUpForm;
