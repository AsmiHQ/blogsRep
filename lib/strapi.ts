// Strapi API Service
// Handles all communication with your Strapi CMS

const STRAPI_URL = "https://methodical-oasis-f89f5b0f3b.strapiapp.com";

// TypeScript types for Strapi response
export interface SharedRichText {
  __component: "shared.rich-text";
  id: number;
  body: string;
}

// You can add more block types here as needed
export type Block = SharedRichText;

export interface ArticleRaw {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  blocks?: Block[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Flattened article with body extracted from blocks
export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Helper function to extract body from blocks
function extractBodyFromBlocks(blocks?: Block[]): string {
  if (!blocks || blocks.length === 0) return "";
  
  // Find all rich-text blocks and concatenate their body content
  const richTextBlocks = blocks.filter(
    (block): block is SharedRichText => block.__component === "shared.rich-text"
  );
  
  return richTextBlocks.map((block) => block.body).join("\n\n");
}

// Transform raw article to flattened article
function transformArticle(raw: ArticleRaw): Article {
  return {
    id: raw.id,
    documentId: raw.documentId,
    title: raw.title,
    description: raw.description,
    slug: raw.slug,
    body: extractBodyFromBlocks(raw.blocks),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    publishedAt: raw.publishedAt,
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Fetch all articles from Strapi
export async function getArticles(categorySlug?: string): Promise<Article[]> {
  try {
    const categoryFilter = categorySlug
      ? `&filters[category][slug][$eq]=${categorySlug}`
      : "";
    const response = await fetch(
      `${STRAPI_URL}/api/articles?sort=publishedAt:desc&pagination[limit]=1000&populate=blocks`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds for fresh content
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const data: StrapiResponse<ArticleRaw[]> = await response.json();
    return data.data.map(transformArticle);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

// Fetch a single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=blocks`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    const data: StrapiResponse<ArticleRaw[]> = await response.json();
    const rawArticle = data.data[0];
    return rawArticle ? transformArticle(rawArticle) : null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

// Get all article slugs for static generation
export async function getAllArticleSlugs(): Promise<string[]> {
  const articles = await getArticles();
  return articles.map((article) => article.slug);
}

