import { useState } from "react";
import Spinner from "./Spinner";

const CATEGORIES = [
  { value: "GENERAL", label: "General" },
  { value: "EXAM", label: "Exam" },
  { value: "EVENT", label: "Event" },
];

const PRIORITIES = [
  { value: "NORMAL", label: "Normal" },
  { value: "URGENT", label: "Urgent" },
];

function toDateInputValue(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toISOString().split("T")[0];
}

export default function NoticeForm({ initialData, onSubmit, loading }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [category, setCategory] = useState(initialData?.category || "GENERAL");
  const [priority, setPriority] = useState(initialData?.priority || "NORMAL");
  const [publishDate, setPublishDate] = useState(
    toDateInputValue(initialData?.publishDate) || ""
  );
  const [image, setImage] = useState(initialData?.image || "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      title,
      body,
      category,
      priority,
      publishDate,
      image: image || null,
    });
  }

  const isEditing = Boolean(initialData);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="notice-title"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="notice-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter notice title"
          required
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="notice-body"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Body <span className="text-red-500">*</span>
        </label>
        <textarea
          id="notice-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter notice content"
          required
          rows={4}
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="notice-category"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="notice-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="notice-priority"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            id="notice-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="notice-publish-date"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Publish Date <span className="text-red-500">*</span>
        </label>
        <input
          id="notice-publish-date"
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          required
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="notice-image"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Image URL{" "}
          <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          id="notice-image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={loading}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 active:scale-[0.98]"
          aria-label={isEditing ? "Update notice" : "Create notice"}
        >
          {loading && <Spinner />}
          {isEditing ? "Update Notice" : "Create Notice"}
        </button>
      </div>
    </form>
  );
}
