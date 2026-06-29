export type SearchItem = {
  id: number;
  title: string;
  description?: string;
  content?: string;
  keywords?: string;
  url: string;
  type:
    | "page"
    | "news"
    | "program"
    | "project"
    | "employee"
    | "campus"
    | "announcement";
};

export type SearchResult = SearchItem & {
  score: number;
};