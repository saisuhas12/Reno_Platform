const VALID_CATEGORIES = ["EXAM", "EVENT", "GENERAL"];
const VALID_PRIORITIES = ["NORMAL", "URGENT"];

export function validateNotice(data) {
  const errors = [];

  if (!data.title || typeof data.title !== "string" || !data.title.trim()) {
    errors.push("Title is required.");
  }

  if (!data.body || typeof data.body !== "string" || !data.body.trim()) {
    errors.push("Body is required.");
  }

  if (!data.category || !VALID_CATEGORIES.includes(data.category)) {
    errors.push(
      `Category must be one of: ${VALID_CATEGORIES.join(", ")}.`
    );
  }

  if (!data.priority || !VALID_PRIORITIES.includes(data.priority)) {
    errors.push(
      `Priority must be one of: ${VALID_PRIORITIES.join(", ")}.`
    );
  }

  if (!data.publishDate) {
    errors.push("Publish date is required.");
  } else {
    const date = new Date(data.publishDate);
    if (isNaN(date.getTime())) {
      errors.push("Publish date is invalid.");
    }
  }

  if (data.image && typeof data.image === "string" && data.image.trim()) {
    try {
      const url = new URL(data.image.trim());
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.push("Image URL must use http or https protocol.");
      }
    } catch {
      errors.push("Image URL is invalid.");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

