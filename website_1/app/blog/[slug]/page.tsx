import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/strapi";
import type { Metadata } from "next";

export const revalidate = 60;

// Generate static params for all articles (optional - for static generation)
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | HQ Blogs`,
    description: article.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Simple markdown-like rendering for body text
  const renderBody = (text: string | undefined | null) => {
    if (!text) {
      return <p className="text-zinc-400 italic">No content available.</p>;
    }
    return text.split("\n\n").map((paragraph, index) => {
      // Check for headers
      if (paragraph.startsWith("# ")) {
        return (
          <h2
            key={index}
            className="mb-6 mt-12 text-3xl font-bold text-white first:mt-0"
          >
            {paragraph.slice(2)}
          </h2>
        );
      }
      if (paragraph.startsWith("## ")) {
        return (
          <h3
            key={index}
            className="mb-4 mt-10 text-2xl  text-white first:mt-0"
          >
            {paragraph.slice(3)}
          </h3>
        );
      }
      if (paragraph.startsWith("### ")) {
        return (
          <h4
            key={index}
            className="mb-3 mt-8 text-xl font-semibold text-white first:mt-0"
          >
            {paragraph.slice(4)}
          </h4>
        );
      }

      // Check for code blocks
      if (paragraph.startsWith("```") && paragraph.endsWith("```")) {
        const code = paragraph.slice(3, -3).trim();
        return (
          <pre
            key={index}
            className="my-6 overflow-x-auto rounded-xl bg-zinc-800/50 p-6 font-mono text-sm text-zinc-300"
          >
            <code>{code}</code>
          </pre>
        );
      }

      // Check for blockquotes
      if (paragraph.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="my-6 border-l-4 border-amber-500/50 pl-6 italic text-zinc-400"
          >
            {paragraph.slice(2)}
          </blockquote>
        );
      }

      // Check for bullet lists
      if (paragraph.includes("\n- ")) {
        const items = paragraph.split("\n- ").filter(Boolean);
        return (
          <ul key={index} className="my-6 space-y-2 pl-6">
            {items.map((item, i) => (
              <li
                key={i}
                className="relative text-lg leading-relaxed text-zinc-300 before:absolute before:-left-4 before:text-amber-500 before:content-['•']"
              >
                {item.startsWith("- ") ? item.slice(2) : item}
              </li>
            ))}
          </ul>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="mb-6 text-lg leading-relaxed text-zinc-300">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-[#0d0d0d]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to all articles
            </Link>
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                HQ
              </span>
              <span className="text-zinc-300">Blogs</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="relative">
        {/* Hero gradient */}
        <div className="absolute inset-0 h-96 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-40 top-40 h-60 w-60 rounded-full bg-rose-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-16">
          {/* Article header */}
          <header className="mb-12">
            <time className="mb-4 block text-sm font-medium uppercase tracking-widest text-amber-500">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="text-xl leading-relaxed text-zinc-400">
              {article.description}
            </p>
          </header>

          {/* Divider */}
          <div className="mb-12 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

          {/* Article body */}
          <div className="prose-custom">{renderBody(article.body)}</div>

          {/* Article footer */}
          <footer className="mt-16 border-t border-zinc-800/50 pt-12">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div>
                <p className="text-sm text-zinc-500">
                  Last updated on{" "}
                  {new Date(article.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Link
                href="/"
                className="group flex items-center gap-2 rounded-full bg-zinc-800/50 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg hover:shadow-amber-500/10"
              >
                <svg
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to all articles
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}

