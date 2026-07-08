export default function SkeletonCard() {
  return (
    <div
      className="animate-pulse rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
      aria-hidden="true"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="h-5 w-14 rounded-md bg-slate-200" />
        <div className="h-5 w-16 rounded-md bg-slate-200" />
      </div>
      <div className="mb-2 h-5 w-3/4 rounded bg-slate-200" />
      <div className="mb-4 space-y-2">
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-5/6 rounded bg-slate-100" />
      </div>
      <div className="h-3 w-1/3 rounded bg-slate-100" />
    </div>
  );
}
