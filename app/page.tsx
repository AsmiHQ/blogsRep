import Link from "next/link";
import { getArticles } from "@/lib/strapi";

export const revalidate = 60; // Revalidate page every 60 seconds

export default async function Home() {
  const articles = await getArticles("hiring");

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        
        <nav className="relative z-10 mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                HQ
              </span>
              <span className="text-zinc-300">Blogs</span>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              Ideas worth
              <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                exploring.
              </span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-zinc-400">
              Discover insights, stories, and perspectives that spark curiosity and inspire action.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-rose-500/10 blur-3xl" />
      </header>

      {/* Articles Section */}
      <main className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          <span className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Latest Articles
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 rounded-full bg-zinc-800/50 p-6">
              <svg
                className="h-12 w-12 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-300">No articles yet</h3>
            <p className="max-w-md text-zinc-500">
              Publish your first article in Strapi and it will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-amber-500/5"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Card gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Accent line */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex flex-1 flex-col p-6">
                  {/* Date */}
                  <time className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  {/* Title */}
                  <h2 className="mb-3 text-xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-amber-400">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">
                    {article.description}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-sm font-medium text-amber-500 transition-all duration-300 group-hover:gap-3">
                    <span>Read article</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                HQ
              </span>
              <span className="text-zinc-300">Blogs</span>
            </div>
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} HQ Blogs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
