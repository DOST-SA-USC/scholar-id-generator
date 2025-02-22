"use client";
import React from "react";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const SaveDialog = () => {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save ID</DialogTitle>
          <DialogDescription>Save ID</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default SaveDialog;
