import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d0d0d] px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-rose-500/5" />
      
      <div className="relative text-center">
        <div className="mb-8">
          <span className="text-8xl font-bold text-zinc-800">404</span>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-white">Article not found</h1>
        <p className="mb-8 max-w-md text-lg text-zinc-400">
          The article you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-medium text-black transition-all hover:shadow-lg hover:shadow-amber-500/25"
        >
          <svg
            className="h-5 w-5"
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
          Back to homepage
        </Link>
      </div>
    </div>
  );
}

