const FALLBACK_BASE = "https://image.tmdb.org/t/p/";

// Builds a TMDB image URL from the configuration stored in redux.
// `size` should be one of the sizes TMDB exposes (w342, w780, original...).
export const imageUrl = (config, path, size = "original") => {
  if (!path) return null;
  const base = config?.images?.secure_base_url || FALLBACK_BASE;
  return base + size + path;
};
