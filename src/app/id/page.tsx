import React from "react";
import Image from "next/image";

import ButtonGroup from "./components/ButtonGroup";

const ID = () => {
  return (
    <div className="min-w-screen min-h-screen p-8 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2">
        <ButtonGroup />
        <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Images are TEMPORARY and are for reference only, will convert to real components later. */}
          <Image
            src="/idFront.png"
            width={340}
            height={420}
            alt="id"
            className="border-2 border-black border-opacity-5 rounded-lg"
            draggable={false}
          />
          <Image
            src="/idBack.png"
            width={340}
            height={420}
            alt="id"
            className="border-2 border-black border-opacity-5 rounded-lg"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ID;
