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

const EditDialog = () => {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit ID</DialogTitle>
          <DialogDescription>
            Include ID Form Here in the future.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default EditDialog;
