"use client";
import React, { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { FilePenLine, Printer, LogOut, LoaderCircle } from "lucide-react";

import { debounce } from "@/lib/utils";

const ButtonGroup = ({
  isIDSetUp,
  handlePrint,
}: {
  isIDSetUp: boolean;
  handlePrint: () => void;
}) => {
  const router = useRouter();

  const { signOut } = useClerk();
  const [logOutLoading, setLogOutLoading] = useState(false);

  const handleLogout = async () => {
    setLogOutLoading(true);
    await signOut().then(() => {
      setLogOutLoading(false);
      router.push("/");
    });
  };

  return (
    <div className="w-full flex justify-between">
      <Button
        variant="secondary"
        onClick={debounce(() => {
          toast.promise(handleLogout, {
            loading: "Logging Out...",
            success: () => {
              return "Logged Out Successfully!";
            },
            error: "Error",
          });
        })}
        size="icon"
      >
        {logOutLoading ? (
          <span className="animate-spin">
            <LoaderCircle />
          </span>
        ) : (
          <LogOut />
        )}
      </Button>
      <div className="flex gap-2">
        <Button
          className={isIDSetUp ? "opacity-50" : ""}
          onClick={debounce(() => {
            if (!isIDSetUp) {
              router.push("/user/setup");
              return;
            }
            toast.info("Contact DOST SA USC to edit ID.");
          })}
        >
          <FilePenLine /> {isIDSetUp ? "Edit" : "Set Up"}
        </Button>
        <Button
          onClick={debounce((e) => {
            if (!isIDSetUp) {
              toast.warning("Set Up ID first before printing.");
              e.preventDefault();
              return;
            }

            toast.info("Tip:", {
              description:
                "If some parts of the ID are not rendering correctly, please click the button again.",
            });

            handlePrint();
          })}
          className={!isIDSetUp ? "opacity-50 cursor-not-allowed" : ""}
        >
          <Printer /> Print
        </Button>
      </div>
    </div>
  );
};

export default memo(ButtonGroup);
