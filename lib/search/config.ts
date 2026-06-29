export const SEARCH_CONFIG = {
  minQueryLength: 2,

  maxResults: 20,

  weights: {
    title: 100,
    keywords: 80,
    description: 40,
    content: 20,
  },

  typeBoost: {
    page: 100,
    program: 90,
    news: 70,
    project: 60,
    employee: 50,
    campus: 40,
    announcement: 30,
  },
} as const;