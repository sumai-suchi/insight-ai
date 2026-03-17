// components/AiContentTools.tsx
import { Pencil, Sparkles, FileText, MessageSquare, BarChart3 } from 'lucide-react';

export default function AiContentTools() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-purple-600" />
        AI Content Editor Access
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <ToolCard
          icon={<Pencil className="h-6 w-6 text-purple-600" />}
          label="Open Editor"
          bgColor="bg-purple-100"
        />
        <ToolCard
          icon={<Sparkles className="h-6 w-6 text-blue-600" />}
          label="Auto Blog Generator"
          bgColor="bg-blue-100"
        />
        <ToolCard
          icon={<FileText className="h-6 w-6 text-green-600" />}
          label="Headline Generator"
          bgColor="bg-green-100"
        />
        <ToolCard
          icon={<MessageSquare className="h-6 w-6 text-orange-600" />}
          label="Product Description"
          bgColor="bg-orange-100 border-2 border-orange-500"
          isActive
        />
        <ToolCard
          icon={<BarChart3 className="h-6 w-6 text-pink-600" />}
          label="Rewrite Content"
          bgColor="bg-pink-100"
        />
      </div>
    </div>
  );
}

interface ToolCardProps {
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  isActive?: boolean;
}

function ToolCard({ icon, label, bgColor, isActive = false }: ToolCardProps) {
  return (
    <button
      className={`
        flex flex-col items-center justify-center gap-3 p-4 rounded-lg transition-all
        ${bgColor} hover:shadow-md hover:scale-[1.03] active:scale-95
        ${isActive ? 'ring-2 ring-orange-500 shadow-orange-200' : 'border border-gray-200'}
      `}
    >
      <div className="p-3 rounded-full bg-white/80">{icon}</div>
      <span className="text-sm font-medium text-gray-800 text-center">{label}</span>
    </button>
  );
}