export const getItemCategories = (items) => {
  if (!items) return [];

  return Array.from(
    new Set(
      items
        .map((item) => item.category.toLowerCase())
        .filter((category) => category.trim() !== "")
    )
  )
    .map((category) => category.charAt(0).toUpperCase() + category.slice(1))
    .sort();
};

export const getPackageCategories = (packages) => {
  if (!packages) return [];

  return Array.from(
    new Set(
      packages
        .map((pkg) => pkg.category.toLowerCase())
        .filter((category) => category.trim() !== "")
    )
  )
    .map((category) => category.charAt(0).toUpperCase() + category.slice(1))
    .sort();
};
