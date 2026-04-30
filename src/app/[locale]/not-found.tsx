import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text">404</h1>
        <p className="mt-4 text-text-mute">Page not found.</p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 glass rounded-full text-sm hover:bg-white/[0.08] transition-colors"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
