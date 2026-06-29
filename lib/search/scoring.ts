import { SEARCH_CONFIG } from "./config";
import { normalize } from "./normalize";
import { SearchItem } from "./types";

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter((word) => word.length >= SEARCH_CONFIG.minQueryLength);
}

function fieldScore(
  fieldValue: string | undefined,
  tokens: string[],
  weight: number
) {
  if (!fieldValue) return 0;

  const normalizedField = normalize(fieldValue);
  let score = 0;

  for (const token of tokens) {
    if (normalizedField === token) {
      score += weight * 3;
    } else if (normalizedField.startsWith(token)) {
      score += weight * 2;
    } else if (normalizedField.includes(token)) {
      score += weight;
    }
  }

  return score;
}

export function scoreSearchItem(item: SearchItem, query: string) {
  const tokens = tokenize(query);

  if (tokens.length === 0) return 0;

  const matchScore =
    fieldScore(item.title, tokens, SEARCH_CONFIG.weights.title) +
    fieldScore(item.keywords, tokens, SEARCH_CONFIG.weights.keywords) +
    fieldScore(item.description, tokens, SEARCH_CONFIG.weights.description) +
    fieldScore(item.content, tokens, SEARCH_CONFIG.weights.content);

  if (matchScore === 0) return 0;

  return matchScore + SEARCH_CONFIG.typeBoost[item.type];
}