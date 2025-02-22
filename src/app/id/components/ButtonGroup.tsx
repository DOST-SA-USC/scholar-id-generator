"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { FilePenLine, Save, LogOut } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  secondary?: true;
  clickFunc: () => void;
}

const ButtonComponent = ({
  icon,
  tooltip,
  secondary,
  clickFunc,
}: ButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={clickFunc}
            variant={secondary ? "secondary" : "default"}
            size="icon"
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ButtonGroup = () => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-between">
      <ButtonComponent
        icon={<LogOut />}
        tooltip="Logout"
        clickFunc={() => {
          router.push("/");
        }}
      />
      <div className="flex gap-2">
        <ButtonComponent
          icon={<FilePenLine />}
          tooltip="Edit ID"
          secondary
          clickFunc={() => {
            console.log("Edit ID");
          }}
        />
        <ButtonComponent
          icon={<Save />}
          tooltip="Save ID"
          secondary
          clickFunc={() => {
            console.log("Save ID");
          }}
        />
      </div>
    </div>
  );
};

export default ButtonGroup;
