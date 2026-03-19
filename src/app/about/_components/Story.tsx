import Image from "next/image";
import React from "react";
import story from "./Story-IMG.png";
export default function Story() {
  return (
    <div className="flex flex-col items-center max-w-7xl justify-center gap-6 py-10 px-4">
      <h1 className="text-4xl font-bold text-center">Our Story</h1>
      <p className="lg:text-lg text-center mt-4 max-w-2xl mx-auto">
        Born from a passion to democratize content creation, we've built the
        most intuitive AI platform for creators worldwide. Our journey began
        with a simple idea: to empower everyone to create
      </p>
      <div className="flex flex-col gap-6 md:flex-row items-center">
        <div className="rounded-xl overflow-hidden w-full md:w-1/2">
          <Image
            height={200}
            width={350}
            className="w-full"
            src={story}
            alt="Our Story"
          />
        </div>
        <div className="flex text-sm lg:text-lg gap-4 p-6 flex-col w-full md:w-1/2">
          <p className="w-full ">
            Founded in 2023, we recognized that content creators were spending
            countless hours writing, editing, and optimizing their content. We
            knew there had to be a better way.
          </p>
          <p className="w-full ">
            By combining cutting-edge AI technology with deep understanding of
            content creation workflows, we've built a platform that enhances
            creativity rather than replacing it.
          </p>
          <p className="w-full ">
            Today, over 50,000 creators trust our platform to help them produce
            exceptional content faster and more efficiently than ever before.
          </p>
        </div>
      </div>
    </div>
  );
}
