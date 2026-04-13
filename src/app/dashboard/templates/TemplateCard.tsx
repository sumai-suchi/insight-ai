import React from "react";
import { TEMPLATE } from "./TemplateList";
import Image from "next/image";
import Link from "next/link";

function TemplateCard(item: TEMPLATE) {
  return (
    <Link
      href={`/dashboard/templates/content/` + item?.slug}
      className="group rounded-xl border border-[var(--brand-secondary)] bg-white shadow-lg hover:shadow-xl hover:scale-[1.03] flex flex-col h-full cursor-pointer transition-all duration-200 overflow-hidden"
      style={{ boxShadow: "0 4px 24px 0 rgba(15,40,84,0.08)" }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-24 bg-[var(--brand-primary)]">
          <Image
            src={item.icon}
            alt={item.name}
            width={48}
            height={48}
            className="drop-shadow-md"
          />
        </div>
        <div className="flex flex-col gap-2 px-5 py-4 flex-1 justify-between bg-[var(--brand-secondary)] transition-colors duration-200 group-hover:bg-[#00b7dd]">
          <h2 className="font-semibold text-lg text-white group-hover:text-[var(--brand-primary)] transition-colors">
            {item.name}
          </h2>
          <p className="text-gray-300 text-sm line-clamp-3 min-h-[48px] group-hover:text-white">
            {item.desc}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TemplateCard;
