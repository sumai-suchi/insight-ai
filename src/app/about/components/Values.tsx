import React from "react";
export interface Value {
  title: string;
  description: string;
}
export default function Values() {
  const values: Value[] = [
    {
      title: "Mission-Driven",
      description:
        "Empowering creators to produce exceptional content with cutting-edge AI technology.",
    },
    {
      title: "User-Focused",
      description:
        "Every feature is designed with our users in mind, ensuring the best experience possible.",
    },
    {
      title: "Innovation First",
      description:
        "Constantly pushing boundaries to deliver the most advanced AI content solutions.",
    },
    {
      title: "Trust & Security",
      description:
        "Your data and content are protected with enterprise-grade security measures.",
    },
  ];
  return (
    <div className="max-w-6xl">
      <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
      <p>The principles that guide everything we do</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {values.map((value, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl shadow-md bg-gray-100 dark:bg-gray-800"
          >
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-600 text-sm">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
