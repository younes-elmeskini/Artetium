import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex gap-6">
      <button className="flex flex-col justify-items-center gap-3 hover:scale-105 transition">
        <div className="w-[200px] h-[200px] object-cover">
          <Image
            src={"/images/intercore.jpg"}
            alt={"inter"}
            height={300}
            width={300}
            className="w-full h-full"
          />
        </div>
        <p className="text-gray-600">Processeurs Intel Core</p>
      </button>
      <button className="flex flex-col justify-items-center gap-3">
      <div className="w-[200px] h-[200px] object-cover">
          <Image
            src={"/images/ryzen.jpg"}
            alt={"inter"}
            height={300}
            width={300}
            className="w-full h-full"
          />
        </div>
        <p className="text-gray-600">Processeurs AMD Ryzen</p>
      </button>
    </div>



  );
}
