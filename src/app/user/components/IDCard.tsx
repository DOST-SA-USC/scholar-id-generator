import React from "react";
import { useQRCode } from "next-qrcode";

import { IDData } from "@/types";

import { formatPhoneNumber, formatDate } from "@lib/utils";

const IDCardTemplate = ({
  children,
  bgImage,
  className,
  doesDataExist,
}: {
  children: React.ReactNode;
  bgImage: string;
  className?: string;
  doesDataExist: boolean;
}) => {
  return (
    <div
      className={`bg-primary-foreground text-[#334FA2] w-[340px] h-[570px] border-2 border-[#E0E3EB] rounded-lg flex flex-col items-center translate-x-0 ${className}`}
      style={{
        backgroundImage: doesDataExist ? `url('${bgImage}')` : "",
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
  { doesDataExist: boolean; data: IDData }
>(({ doesDataExist, data }, ref) => {
  const { Image: QRCode } = useQRCode();

  return (
    <div
      id="id-card"
      className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-6"
      ref={ref}
    >
      {/* Front Side of ID Card */}
      <IDCardTemplate
        bgImage="/assets/idSkinFront.png"
        className="pt-48"
        doesDataExist={doesDataExist}
      >
        {doesDataExist ? (
          <>
            <div
              className="w-[165px] h-[213px] bg-gray-500 rounded-lg drop-shadow-xl"
              style={{
                backgroundImage: `url(${
                  data.pictureURL ? data.pictureURL : "/assets/noPFP.png"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <h1 className="font-extrabold text-xl text-center mt-4 leading-5 px-2">
              {data.first_name.toUpperCase()} {data.middle_name.toUpperCase()}{" "}
              {data.last_name.toUpperCase()}
            </h1>
            <div className="flex justify-between w-full font-medium text-xs px-12 mt-2">
              <p>
                {data.scholarship_type} - {data.award_year}
              </p>
              <p>{data.usc_id}</p>
            </div>
            <p className="text-[#ECF0F3] font-black text-xl text-center w-full absolute bottom-2">
              {data.program.toUpperCase()}
            </p>
          </>
        ) : null}
      </IDCardTemplate>

      {/* Back Side of ID Card */}
      <IDCardTemplate
        bgImage="/assets/idSkinBack.png"
        className="pt-[6.8rem]"
        doesDataExist={doesDataExist}
      >
        {doesDataExist ? (
          <>
            <div className="absolute top-6 left-6 font-semibold text-[10px] leading-3">
              <p>Contact No.: {formatPhoneNumber(data.contact_number)}</p>
              <p>Date of Birth: {formatDate(data.birth_date)}</p>
            </div>

            <QRCode
              text={JSON.stringify({
                full_name: `${data.first_name} ${data.middle_name} ${data.last_name}`,
                usc_id: data.usc_id,
                program: data.program,
                contact_number: data.contact_number,
                scholarship_type: data.scholarship_type,
                award_year: data.award_year,
              })}
              options={{
                type: "image/jpeg",
                quality: 1,
                errorCorrectionLevel: "M",
                margin: 0,
                scale: 4,
                width: 130,
                color: {
                  dark: "#334FA2",
                  light: "#ECF0F3",
                },
              }}
            />
            <div>
              <h1 className="mt-[5rem] font-extrabold text-xl text-center leading-5">
                KEITH TEJENO
              </h1>
              <p className="flex justify-between w-full font-medium text-xs">
                DOST SA USC PRESIDENT
              </p>
            </div>
          </>
        ) : null}
      </IDCardTemplate>
    </div>
  );
});

IDCard.displayName = "IDCard";
export default IDCard;
