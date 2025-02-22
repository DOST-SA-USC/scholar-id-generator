"use client";
import React from "react";
import { useRouter } from "next/navigation";

import EditDialog from "./EditDialog";
import SaveDialog from "./SaveDialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FilePenLine, Save, LogOut } from "lucide-react";

const ButtonGroup = () => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-between">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              onClick={() => {
                router.push("/");
              }}
              size="icon"
            >
              <LogOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Log Out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FilePenLine /> Edit
            </Button>
          </DialogTrigger>
          <EditDialog />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Save /> Save
            </Button>
          </DialogTrigger>
          <SaveDialog />
        </Dialog>
      </div>
    </div>
  );
};

export default ButtonGroup;
