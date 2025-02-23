import React from "react";
import Image from "next/image";

import ButtonGroup from "./components/ButtonGroup";

import { Mail } from "lucide-react";

interface IDCardProps {
  children: React.ReactNode;
  bgImage: string;
  mode: "front" | "back";
}

const IDCard = ({ children, bgImage, mode }: IDCardProps) => {
  return (
    <div
      className={`bg-primary-foreground w-[340px] h-[570px] border-2 border-[#E0E3EB] rounded-lg flex flex-col justify-between gap-4 p-8 ${
        mode === "front" ? "items-start" : "items-end"
      }`}
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
};

const ID = () => {
  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center p-8">
      <div className="flex flex-col gap-2">
        <ButtonGroup />
        <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-6">
          <IDCard bgImage="./assets/idSkinFront.png" mode="front">
            {/* Card Heading */}
            <div className="flex gap-2">
              <Image
                src="/logo.png"
                width={48}
                height={48}
                alt="logo"
                draggable={false}
              />
              <div className="flex flex-col justify-center items-start">
                <h1 className="font-primary font-extrabold text-lg leading-3">
                  DOST SA USC
                </h1>
                <p className="text-[6px]">intellege. excellence. competence</p>
              </div>
            </div>
            {/* Card Content */}
            <div>
              <h2 className="font-primary font-extrabold text-lg">
                {"{program}"} - {"{year}"}
              </h2>
              <Image
                src="/assets/noPFP.png"
                width={200}
                height={0}
                alt="id"
                draggable={false}
              />
              <h3 className="font-primary font-extrabold text-sm leading-3 mt-1">
                {"{full_name}"}
              </h3>
              <p className="font-bold text-[10px]">
                {"{type}"} - {"{year}"}
              </p>
              <p className="text-[10px] mt-1">{"{usc_id}"}</p>
            </div>
            {/* Card Footer */}
            <ul className="text-[8px] font-extrabold">
              <li className="flex gap-1 justify-start items-center mb-1">
                <Image
                  src="/assets/facebook.svg"
                  width={15}
                  height={15}
                  alt="fb"
                  draggable={false}
                />{" "}
                dostsausc
              </li>
              <li className="flex gap-1 justify-start items-center">
                <Mail
                  size={16}
                  className="bg-black rounded-full text-white p-[3px]"
                />
                uscdostsa@gmail.com
              </li>
            </ul>
          </IDCard>
          <IDCard bgImage="./assets/idSkinBack.png" mode="back">
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
          </IDCard>
        </div>
      </div>
    </div>
  );
};

export default ID;
