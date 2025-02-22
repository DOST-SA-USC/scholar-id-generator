"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { SignInButton } from "@clerk/clerk-react";

const LogInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button className="w-full">Log In</Button>
    </SignInButton>
  );
};

export default LogInButton;
