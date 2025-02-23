import React from "react";

import { currentUser } from "@clerk/nextjs/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SetUpForm from "./components/SetUpForm";

export default async function Profile() {
  const user = await currentUser();
  return (
    <div className="w-full h-screen flex justify-center items-start md:items-center p-4 md:p-8">
      <Card className="min-w-80 h-auto">
        <CardHeader>
          <CardTitle className="font-primary font-extrabold text-2xl">
            Set Up Your Account
          </CardTitle>
          <CardDescription>
            Let's get you started. Fill out the form below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {user && <SetUpForm userID={user?.id} />}
        </CardContent>
        <CardFooter className="text-sm">
          <p>© 2025, DOST SA USC. All Rights Reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
