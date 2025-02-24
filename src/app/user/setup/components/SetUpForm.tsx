"use client";

import React from "react";
import { insertData } from "@/lib/db";
import { useRouter } from "next/navigation";
import programsList from "@/data/programs.json";
import scholarshipTypeList from "@/data/scholarshipType.json";
import yearLevelList from "@/data/yearLevel.json";
import { LoaderCircle } from "lucide-react";
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

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await insertData({ ...data, user_id: userID });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default SetUpForm;
