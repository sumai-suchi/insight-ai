import React from "react";
export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  links: [string, string][];
}
export default function Team() {
  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      imageUrl: "/images/alice.jpg",
      bio: "Former AI researcher at Stanford, passionate about democratizing content creation.",
      links: [
        ["LinkedIn", "https://linkedin.com/in/alicejohnson"],
        ["Twitter", "https://twitter.com/alicejohnson"],
        ["GitHub", "https://github.com"],
      ],
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      imageUrl: "/images/alice.jpg",
      bio: "15+ years in machine learning and natural language processing.",
      links: [
        ["LinkedIn", "https://linkedin.com/in/alicejohnson"],
        ["Twitter", "https://twitter.com/alicejohnson"],
        ["GitHub", "https://github.com"],
      ],
    },
    {
      name: "Emily Watson",
      role: "Head of Product",
      imageUrl: "/images/alice.jpg",
      bio: "Product visionary with experience at leading tech companies.",
      links: [
        ["LinkedIn", "https://linkedin.com/in/alicejohnson"],
        ["Twitter", "https://twitter.com/alicejohnson"],
        ["GitHub", "https://github.com"],
      ],
    },
    {
      name: "Head of Product",
      role: "Head of Marketing",
      imageUrl: "/images/alice.jpg",
      bio: "Digital marketing expert helping creators worldwide succeed.",
      links: [
        ["LinkedIn", "https://linkedin.com/in/alicejohnson"],
        ["Twitter", "https://twitter.com/alicejohnson"],
        ["GitHub", "https://github.com"],
      ],
    },
  ];
  return (
    <div className="max-w-7xl">
      <h1 className="text-4xl font-bold text-center">Our Team</h1>
      <p className="text-center mt-4 text-lg">
        Meet the passionate individuals behind our mission.
      </p>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center border rounded-2xl overflow-hidden"
          >
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-48 object-cover bg-gray-400"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mt-4">{member.name}</h2>
              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="mt-2 text-gray-700">{member.bio}</p>
              <div className="mt-4 flex space-x-3">
                {member.links.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
