import Image from "next/image";

export default function Loader() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-8 bg-[#35427C]  text-white animate-fade-slide-up">
      <Image
        src="/loading.gif"
        width={128}
        height={128}
        alt="logo"
        unselectable="on"
        unoptimized
      />
      <h1 className="text-lg font-bold">Loading...</h1>
    </div>
  );
}
