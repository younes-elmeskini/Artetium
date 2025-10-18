import Image from "next/image";
import React from "react";

interface Categorytype {
    image:string;
    name:string;
}

export default function Category(category:Categorytype) {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5">
      <Image
        src={category.image}
        alt={"name"}
        width={200}
        height={200}
        className="rounded-full bg-[#e7ebee]"
      />
      <p>{category.name}</p>
    </div>
  );
}
