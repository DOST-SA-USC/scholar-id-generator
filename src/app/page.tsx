import React from "react";
import Link from "next/link";

import LogInDialog from "./components/LogInDialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center p-8">
      <Card className="min-w-80 h-auto">
        <CardHeader>
          <Avatar>
            <AvatarImage src="./logo.png" />
            <AvatarFallback>logo</AvatarFallback>
          </Avatar>

          <CardTitle className="font-primary font-extrabold">
            DOST SA USC
          </CardTitle>
          <CardDescription>
            DOST Scholars’ Association in the University of San Carlos.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Log In</Button>
            </DialogTrigger>
            <LogInDialog />
          </Dialog>
          <Button className="w-full" variant="outline" asChild>
            <Link href="https://www.facebook.com/dostsausc" target="_blank">
              <ExternalLink /> Facebook
            </Link>
          </Button>
        </CardContent>
        <CardFooter className="text-sm">
          <p>© 2025, DOST SA USC. All Rights Reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
