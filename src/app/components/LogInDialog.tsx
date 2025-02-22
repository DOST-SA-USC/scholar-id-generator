"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod schema for form validation
const formSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address.")
    .refine((email) => email.endsWith("usc.edu.ph"), {
      message: "Must be a USC email address.",
    }),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

type LoginData = z.infer<typeof formSchema>;

const LogInDialog = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<LoginData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginData) => {
    console.log("Form Data:", data);
    // do somthn
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-3xl">Log In</DialogTitle>
        <DialogDescription>Enter your credentials to log in.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">USC Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="ID@usc.edu.ph"
            {...register("email")}
          />
          {isSubmitted && errors.email && (
            <p className="text-destructive text-xs">{errors.email?.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
          />
          {isSubmitted && errors.password && (
            <p className="text-destructive text-xs">
              {errors.password?.message}
            </p>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              router.push("/id");
            }}
            disabled={isSubmitting}
          >
            Proceed (no login)
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging In..." : "Log In"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default LogInDialog;
