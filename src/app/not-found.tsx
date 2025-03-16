import React from "react";
import Link from "next/link";

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

import { ArrowLeft } from "lucide-react";

export default function Profile() {
  return (
    <div className="w-full h-screen flex justify-center items-center p-8">
      <Card className="min-w-80 h-auto">
        <CardHeader>
          <Avatar>
            <AvatarImage src="../logo.png" />
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
          <h1 className="text-center">
            <span className="text-destructive font-bold">Error 404</span>. Page
            Not Found
          </h1>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/">
              <ArrowLeft /> Go back
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
