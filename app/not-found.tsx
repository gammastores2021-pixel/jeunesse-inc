import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen grid place-items-center bg-surface px-6 text-center">
        <div className="max-w-md">
          <p className="eyebrow mb-4">404</p>
          <h1 className="font-display text-display-md text-primary">Page not found</h1>
          <p className="mt-3 text-mute">The page you requested could not be located.</p>
          <Link href="/en" className="btn btn-primary mt-8">
            Return home
          </Link>
        </div>
      </body>
    </html>
  );
}
