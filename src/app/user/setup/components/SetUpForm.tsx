"use client";

import React from "react";

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
  firstName: z.string().nonempty({ message: "First Name is required." }),
  middleName: z.string().nonempty({ message: "Middle Name is required." }),
  lastName: z.string().nonempty({ message: "Last Name is required." }),
  program: z.string().nonempty({ message: "Program is required." }),
  yearLevel: z.string().nonempty({ message: "Year level is required." }),
  uscID: z.string().nonempty({ message: "USC ID is required." }),
  birthDate: z.string().nonempty({ message: "BirthDate is required." }),
  scholarshipType: z
    .string()
    .nonempty({ message: "Scholarship Type is required." }),
  yearOfAward: z.string().nonempty({ message: "Year of Award is required." }),
});

interface SetUpFormProps {
  userID: string;
}

const SetUpForm = ({ userID }: SetUpFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      program: "",
      yearLevel: "",
      uscID: "",
      birthDate: "",
      scholarshipType: "",
      yearOfAward: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form Data:", data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
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
            name="middleName"
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
            name="lastName"
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
                      <SelectItem value="BSCS">BSCS</SelectItem>
                      <SelectItem value="BSIT">BSIT</SelectItem>
                      <SelectItem value="BSIS">BSIS</SelectItem>
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
            name="yearLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Year Level</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
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
            name="uscID"
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
            name="scholarshipType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Scholarship Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Scholarship Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Type 1</SelectItem>
                      <SelectItem value="2">Type 2</SelectItem>
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
            name="yearOfAward"
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
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter BirthDate</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SetUpForm;
