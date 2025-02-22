import React from "react";
import LandingCard from "@app-components/LandingCard";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="min-w-80 h-auto">
        <LandingCard />
      </div>
    </div>
  );
}
