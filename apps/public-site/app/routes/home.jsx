import { useLoaderData } from "react-router";

export function meta() {
  return [
    { title: "Heison — Calligraphy, audio, and code" },
    {
      name: "description",
      content: "A personal studio for calligraphy, audio reviews, and software projects.",
    },
  ];
}

export async function loader({ context }) {
  return {
    environment: context.cloudflare?.env?.APP_ENV ?? "development",
  };
}

export default function Home() {
  const { environment } = useLoaderData();

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <a className="font-serif text-xl font-semibold" href="/en/">
          Heison Studio
        </a>
        <nav aria-label="Primary navigation">
          <ul className="flex gap-5 text-sm text-muted">
            <li><a className="nav-link" href="#calligraphy">Calligraphy</a></li>
            <li><a className="nav-link" href="#audio">Audio</a></li>
            <li><a className="nav-link" href="#code">Code</a></li>
          </ul>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <p className="eyebrow">Personal studio · {environment}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.08] font-semibold tracking-tight sm:text-7xl">
          Quiet work, carefully observed and openly documented.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
          This first server-rendered route proves the Cloudflare foundation. D1
          content loaders, bilingual routes, and the shared design system come next.
        </p>
      </section>
    </main>
  );
}

