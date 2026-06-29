import { SEARCH_CONFIG } from "./config";
import { scoreSearchItem } from "./scoring";
import { SearchItem, SearchResult } from "./types";

export function searchItems(
  items: SearchItem[],
  query: string,
  limit: number = SEARCH_CONFIG.maxResults
): SearchResult[] {
  const cleanQuery = query.trim();

  if (cleanQuery.length < SEARCH_CONFIG.minQueryLength) {
    return [];
  }

  return items
    .map((item) => ({
      ...item,
      score: scoreSearchItem(item, cleanQuery),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}