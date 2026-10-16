import dayjs from "dayjs";

export const releaseDateOf = (item) =>
  item?.release_date || item?.first_air_date || "";

export const formatDate = (value, pattern = "MMM D, YYYY") => {
  if (!value) return "";
  const date = dayjs(value);
  return date.isValid() ? date.format(pattern) : "";
};

export const scoreTone = (score) => {
  if (score >= 7) return "high";
  if (score >= 5) return "mid";
  return "low";
};
