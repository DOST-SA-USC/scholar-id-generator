import React from "react";
import Image from "next/image";

import { Mail } from "lucide-react";

import { UserData } from "@/types";

const IDCardTemplate = ({
  children,
  bgImage,
  mode,
}: {
  children: React.ReactNode;
  bgImage: string;
  mode: "front" | "back";
}) => {
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

const IDCard = React.forwardRef<
  HTMLDivElement,
  { doesDataExist: boolean; data: UserData }
>(({ doesDataExist, data }, ref) => {
  return (
    <div
      id="id-card"
      className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-6"
      ref={ref}
    >
      {/* Front Side of ID Card */}
      <IDCardTemplate bgImage="/assets/idSkinFront.png" mode="front">
        {doesDataExist ? (
          <>
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
                {data.program} - {data.year_level}
              </h2>
              <div
                className="w-[182px] h-[220px] bg-gray-500"
                style={{
                  backgroundImage: data.pictureURL
                    ? `url(${data.pictureURL})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <h3 className="font-primary font-extrabold text-sm leading-3 mt-1">
                {data.first_name} {data.middle_name} {data.last_name}
              </h3>
              <p className="font-bold text-[10px]">
                {data.scholarship_type} - {data.award_year}
              </p>
              <p className="text-[10px] mt-1">{data.usc_id}</p>
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
          </>
        ) : null}
      </IDCardTemplate>

      {/* Back Side of ID Card */}
      <IDCardTemplate bgImage="/assets/idSkinBack.png" mode="back">
        {doesDataExist ? (
          <>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
          </>
        ) : null}
      </IDCardTemplate>
    </div>
  );
});

export default IDCard;
