"use client";

import React from "react";
import Link from "next/link";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const LogInDialog = () => {
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
          <DialogDescription>
            Include Login Form Here in the future.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button asChild>
            <Link href="/id">Log In</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default LogInDialog;
