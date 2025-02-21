import React from "react";
import LandingCard from "@app-components/LandingCard";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="min-w-80 h-auto">
        <LandingCard />
      </div>
    </div>
  );
}
