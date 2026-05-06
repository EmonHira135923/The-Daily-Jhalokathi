const formatBanglaDate = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const toBoolean = (value) => value === true || value === "true";

export const toPublicNews = (item) => ({
  id: item._id?.toString?.() || item.id,
  title: item.title || "",
  slug: item.slug?.toLowerCase?.() || "",
  description:
    item.description ||
    (Array.isArray(item.content) ? item.content[0] : item.content) ||
    "",
  image: item.image || item.thumbnail || "",
  time: item.time || "",
  date: item.date || "",
  formattedDate: formatBanglaDate(item.createdAt),
  featured: toBoolean(item.featured),
  side: toBoolean(item.side),
});

export const toPublicBreakingNews = (item) => ({
  id: item._id?.toString?.() || item.id,
  title: item.title || "",
});
