// components/SeoInsights.tsx
export default function SeoInsights() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-green-600 text-2xl">◎</span> SEO Insights
      </h2>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Score Trend</span>
          <span className="font-medium">89/100</span>
        </div>
        {/* Simple gradient line chart simulation */}
        <div className="relative h-24 bg-gray-50 rounded-lg overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 h-full bg-linear-to-t from-green-500/30 via-green-400/20 to-transparent"
            style={{
              clipPath: 'polygon(0 80%, 25% 65%, 50% 55%, 75% 45%, 100% 35%, 100% 100%, 0 100%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-green-600" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <InsightItem label="Keyword Optimization" value="Good" status="success" />
        <InsightItem label="Missing Meta Tags" value="3 Found" status="warning" />
        <InsightItem label="Readability Score" value="89/100" status="info" />
      </div>
    </div>
  );
}

interface InsightItemProps {
  label: string;
  value: string;
  status: 'success' | 'warning' | 'info';
}

function InsightItem({ label, value, status }: InsightItemProps) {
  const colors = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-orange-100 text-orange-800 border-orange-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <div className={`flex justify-between items-center p-3 rounded-lg border ${colors[status]}`}>
      <span className="font-medium">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}