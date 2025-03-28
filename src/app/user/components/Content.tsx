"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import IDCard from "./IDCard";

import { IDData } from "@/types";
import ButtonGroup from "./ButtonGroup";

const Content = ({ isIDSetUp, data }: { isIDSetUp: boolean; data: IDData }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: isIDSetUp ? data.usc_id : "ID_CARD",
  });

  return (
    <>
      <ButtonGroup isIDSetUp={isIDSetUp} handlePrint={handlePrint} />
      <IDCard doesDataExist={isIDSetUp} data={data} ref={contentRef} />
    </>
  );
};

export default Content;
