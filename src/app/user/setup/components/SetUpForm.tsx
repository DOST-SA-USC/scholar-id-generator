"use client";

import React, { useState, useRef, useEffect } from "react";
import { insertData, uploadPicture } from "@/lib/db";
import { useRouter } from "next/navigation";
import { programsList, scholarshipTypesList } from "@/data/data";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Upload } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const currentYear = new Date().getFullYear();
const FormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .nonempty({ message: "First Name is required." }),
  middle_name: z
    .string()
    .trim()
    .nonempty({ message: "Middle Name is required." }),
  last_name: z.string().trim().nonempty({ message: "Last Name is required." }),
  birth_date: z
    .string()
    .nonempty({ message: "Birth date is required." })
    .refine(
      (date) => {
        const birthDate = new Date(date);
        const today = new Date();
        return birthDate <= today && birthDate.getFullYear() > 1900;
      },
      {
        message:
          "Please enter a valid birth date (not in the future and after 1900).",
      }
    ),
  program: z.string().nonempty({ message: "Program is required." }),
  usc_id: z
    .string()
    .nonempty({ message: "USC ID is required." })
    .length(8, { message: "USC ID must be 8 digits." })
    .regex(/^\d{8}$/, { message: "USC ID must contain only digits." }),
  scholarship_type: z
    .string()
    .nonempty({ message: "Scholarship Type is required." }),
  award_year: z
    .string()
    .nonempty({ message: "Year of Award is required." })
    .length(4, { message: "Year of Award must be 4 digits." })
    .regex(/^\d{4}$/, { message: "Year must contain only digits." })
    .refine(
      (year) => {
        const yearNum = parseInt(year);
        return yearNum >= 2018 && yearNum <= currentYear - 1;
      },
      { message: `Year must be between 2018 and ${currentYear - 1}.` }
    ),
  contact_number: z
    .string()
    .nonempty({ message: "Contact Number is required." })
    .regex(/^09\d{9}$/, {
      message:
        "Please enter a valid contact number in this format: 09XXXXXXXXX (11 digits).",
    }),
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
      usc_id: "",
      scholarship_type: "",
      award_year: "",
      contact_number: "",
    },
  });
  const formData = form.getValues();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [picturePreview, setPicturePreview] = useState<File | null>();
  const [pictureInputHover, setPictureInputHover] = useState(false);
  const [pictureInputErrorMessage, setPictureInputErrorMessage] = useState("");
  const pictureInputRef = useRef<HTMLInputElement>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Cleanup picture preview URL on unmount
  useEffect(() => {
    return () => {
      if (picturePreview) {
        URL.revokeObjectURL(URL.createObjectURL(picturePreview));
      }
    };
  }, [picturePreview]);

  const displayFormErrors = (errors: FieldErrors) => {
    const errorLabels: Record<string, string> = {
      first_name: "First Name",
      middle_name: "Middle Name",
      last_name: "Last Name",
      birth_date: "Birth Date",
      program: "Program",
      usc_id: "USC ID",
      scholarship_type: "Scholarship Type",
      award_year: "Year of Award",
      contact_number: "Contact Number",
      picture: "Picture",
    };

    const errorFields: string[] = [];

    if (!picturePreview) {
      errorFields.push("picture");
    }

    if (errors) {
      Object.keys(errors).forEach((field) => {
        if (field !== "picture" || !errorFields.includes("picture")) {
          errorFields.push(field);
        }
      });
    }

    if (errorFields.length >= 9) {
      toast.error("Error", {
        description: "All fields are required.",
      });
      return;
    }

    if (errorFields.length > 0 && errorFields.length <= 3) {
      errorFields.forEach((field) => {
        const label = errorLabels[field];
        const message = errors?.[field]?.message || `${label} is required.`;
        toast.error(label, {
          description: `${message}`,
        });
      });
    } else if (errorFields.length > 3) {
      const formattedFields = errorFields.map((field) => errorLabels[field]);

      toast.error(
        <div>
          <p className="font-semibold mb-1">
            Please check the following fields:
          </p>
          <p className="text-xs">{formattedFields.join(", ")}</p>
        </div>
      );
    }
  };

  const confirmSubmit = () => {
    // for picture input validation
    if (!picturePreview) {
      setPictureInputErrorMessage("Picture is required.");
      return;
    }

    setShowConfirmDialog(true);
  };

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

          toast.error("Duplicate USC ID", {
            description: `A user with the USC ID ${data.usc_id} already exists. If this is a mistake, please contact DOST SA USC for assistance.`,
          });

          throw new Error("USC ID already exists.");
        }

        if (res === "Duplicate USER_ID_KEY") {
          toast.error("Duplicate User ID", {
            description: `A user with the same USER ID already exists. If this is a mistake, please contact DOST SA USC for assistance.`,
          });

          throw new Error("Duplicate USER_ID_KEY");
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

    setIsSubmitting(false);
  };

  const validatePicture = (file: File) => {
    if (!file) {
      return "Profile picture is required.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size should not exceed 5MB.";
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Only JPG, JPEG, and PNG files are allowed.";
    }

    return null;
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const error = validatePicture(file);

      if (error) {
        setPictureInputErrorMessage(error);
        e.target.value = "";
        toast.error(error);
        return;
      }

      setPicturePreview(file);
      setPictureInputErrorMessage("");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(confirmSubmit, (errors) => {
            displayFormErrors(errors);
          })}
          className="w-full space-y-6"
        >
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
                      picturePreview
                        ? URL.createObjectURL(picturePreview)
                        : "/assets/noPFP.png"
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
              name="scholarship_type"
              label="Select Scholarship Type"
              placeholder="Scholarship Type"
              options={scholarshipTypesList}
            />
            <TextInput
              name="usc_id"
              label="USC Student ID"
              placeholder="01234567"
              type="number"
            />
            <TextInput
              name="award_year"
              label="Year of Award"
              placeholder="20xx"
              type="number"
            />
            <TextInput
              name="contact_number"
              label="Contact Number"
              placeholder="09123456789"
              type="text"
            />
            <TextInput name="birth_date" label="Birth Date" type="date" />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Submit Information
          </Button>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogTitle>Confirm Submission</DialogTitle>
          <div className="py-4">
            <p>
              Please ensure all information is accurate before submitting. For
              any corrections, you will need to contact DOST SA USC for
              assistance.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Go Back
            </Button>
            <Button onClick={() => onSubmit(formData)} disabled={isSubmitting}>
              Confirm Submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SetUpForm;
