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
  birth_date: z.string().nonempty({ message: "birth_date is required." }),
  program: z.string().nonempty({ message: "program is required." }),
  year_level: z.string().nonempty({ message: "Year level is required." }),
  usc_id: z.string().nonempty({ message: "USC ID is required." }),
  scholarship_type: z
    .string()
    .nonempty({ message: "Scholarship Type is required." }),
  award_year: z.string().nonempty({ message: "Year of Award is required." }),
});

interface SetUpFormProps {
  userID: string;
}

const SetUpForm = ({ userID }: SetUpFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      program: "",
      year_level: "",
      usc_id: "",
      birth_date: "",
      scholarship_type: "",
      award_year: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await insertData({ ...data, user_id: userID });
    router.push("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter First Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Middle Name */}
          <FormField
            control={form.control}
            name="middle_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Middle Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select Program */}
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Program</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programsList.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select Year Level */}
          <FormField
            control={form.control}
            name="year_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Year Level</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(yearLevelList).map(([key, value]) => (
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

          {/* USC Student ID */}
          <FormField
            control={form.control}
            name="usc_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter USC Student ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="USC Student ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Scholarship Type */}
          <FormField
            control={form.control}
            name="scholarship_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Scholarship Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Scholarship Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {scholarshipTypeList.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Year of Award */}
          <FormField
            control={form.control}
            name="award_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Year of Award</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Year of Award" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Birth Date */}
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter birth_date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="animate-spin">
              <LoaderCircle />
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SetUpForm;
