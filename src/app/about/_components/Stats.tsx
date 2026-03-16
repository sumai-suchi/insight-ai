export interface Stats {
  label: string;
  value: string;
}
export default function Stats() {
  const stats: Stats[] = [
    { label: "Users", value: "10K+" },
    { label: "Projects", value: "500+" },
    { label: "Countries", value: "50+" },
    { value: "4.8/5", label: "Rating" },
  ];
  return (
    <div className="max-w-6xl w-full grid grid-cols-2 md:grid-cols-4 justify-between">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center">
          <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
