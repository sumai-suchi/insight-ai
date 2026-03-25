import React from "react";
export interface JourneyMilestone {
  title: string;
  description: string;
  date: string;
}
function Jurney() {
  const milestones: JourneyMilestone[] = [
    {
      title: "Company Founded",
      description: "Started with a vision to revolutionize content creation",
      date: "2023",
    },
    {
      title: "Product Launch",
      description: "Released our AI-powered content platform to the public",
      date: "2024",
    },
    {
      title: "Rapid Growth",
      description: "Reached 50,000 active users and 10M+ words generated",
      date: "2025",
    },
    {
      title: "Innovation Award",
      description: "Recognized as the leading AI content creation platform",
      date: "2026",
    },
  ];
  return (
    <div className="max-w-7xl">
      <h1 className="text-4xl font-bold text-center">Our Journey</h1>
      <p className="text-lg text-center mt-4">
        From humble beginnings to a thriving community, our journey has been one
        of passion, perseverance, and growth.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="p-6 flex flex-col justify-start rounded-2xl border border-purple-500 gap-4 shadow-md bg-purple-50 dark:bg-gray-800"
          >
            <p className="text-gray-200 w-16 p-2 px-4 text-sm bg-primary rounded-full">
              {milestone.date}
            </p>
            <h2 className="text-2xl font-semibold">{milestone.title}</h2>
            <p className="text-gray-600 text-sm">{milestone.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jurney;
