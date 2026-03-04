export default function ActionCard({
  icon,
  label,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  gradient: string;
}) {
  return (
    <div
      className={`bg-linear-to-r ${gradient} text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:scale-105 transition`}
    >
      <div className="bg-white/20 p-3 rounded-full">{icon}</div>
      <p className="font-medium">{label}</p>
    </div>
  );
}