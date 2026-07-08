const CATEGORY_STYLES = {
  EXAM: "bg-blue-50 text-blue-700 ring-blue-600/20",
  EVENT: "bg-green-50 text-green-700 ring-green-600/20",
  GENERAL: "bg-gray-50 text-gray-600 ring-gray-500/20",
};

const CATEGORY_LABELS = {
  EXAM: "Exam",
  EVENT: "Event",
  GENERAL: "General",
};

export default function CategoryBadge({ category }) {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.GENERAL;
  const label = CATEGORY_LABELS[category] || category;

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {label}
    </span>
  );
}
