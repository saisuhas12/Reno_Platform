import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import PriorityBadge from "./PriorityBadge";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NoticeCard({ notice, onDelete }) {
  return (
    <article className="group flex flex-col rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow duration-150 hover:shadow-md">
      {notice.image && (
        <div className="overflow-hidden rounded-t-xl">
          <img
            src={notice.image}
            alt={`Image for ${notice.title}`}
            className="h-44 w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <CategoryBadge category={notice.category} />
          <PriorityBadge priority={notice.priority} />
        </div>

        <h2 className="mb-1.5 text-base font-semibold leading-snug text-slate-900">
          {notice.title}
        </h2>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
          {notice.body}
        </p>

        <time
          dateTime={notice.publishDate}
          className="mb-4 block text-xs text-slate-400"
        >
          {formatDate(notice.publishDate)}
        </time>

        <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
          <Link
            href={`/notices/${notice.id}/edit`}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
            aria-label={`Edit notice: ${notice.title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
              <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
            </svg>
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(notice)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
            aria-label={`Delete notice: ${notice.title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.712Z"
                clipRule="evenodd"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
