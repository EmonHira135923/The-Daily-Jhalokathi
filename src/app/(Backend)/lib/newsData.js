export const categories = [
  { name: "জাতীয়", slug: "national" },
  { name: "আন্তর্জাতিক", slug: "international" },
  { name: "রাজনীতি", slug: "politics" },
  { name: "বাণিজ্য", slug: "business" },
  { name: "অর্থনীতি", slug: "economics" },
  { name: "স্বাস্থ্য", slug: "health" },
  { name: "শিক্ষা", slug: "education" },
  { name: "অপরাধ", slug: "crime" },
  { name: "খেলাধুলা", slug: "sports" },
  { name: "বিনোদন", slug: "entertainment" },
  { name: "মতামত", slug: "opinion" },
];

export const getCategoryName = (slug) => {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
};
