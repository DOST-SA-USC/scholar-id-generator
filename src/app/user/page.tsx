import React from "react";

import { currentUser } from "@clerk/nextjs/server";
import { fetchData } from "@/lib/db";

import Content from "./components/Content";

const ID = async () => {
  const user = await currentUser();
  if (!user) return null;

  const data = await fetchData(user.id);
  const doesDataExist = data !== null;

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center p-8">
      <div className="flex flex-col gap-2">
        <Content isIDSetUp={doesDataExist} data={data} />
      </div>
    </div>
  );
};

export default ID;
