import React from "react";
import { TEMPLATE } from "./TemplateList";
import Image from "next/image";
import Link from "next/link";

function TemplateCard(item: TEMPLATE) {
  return (
    <Link
      href={`/dashboard/content/` + item?.slug}
      className="p-5 shadow-md rounded-md border bg-white hover:scale-105 flex flex-col gap-3 cursor-pointer transition-transform duration-200"
    >
      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium text-lg">{item.name}</h2>
      <p className="text-gray-500 line-clamp-3">{item.desc}</p>
    </Link>
  );
}

export default TemplateCard;
