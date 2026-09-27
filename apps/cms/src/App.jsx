import { useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api";

export default function App() {
  const [health, setHealth] = useState({ status: "checking" });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiBaseUrl}/system/health`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(setHealth)
      .catch((error) => {
        if (error.name !== "AbortError") {
          setHealth({ status: "unavailable", message: error.message });
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-canvas px-5 py-10 text-ink sm:px-8 lg:px-12">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-panel border border-line bg-surface p-7 shadow-soft sm:p-10">
          <p className="eyebrow">Owner workspace</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
            Build the publishing system one verified layer at a time.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            This Vite interface is the private CMS. In production, Spring Boot
            serves its compiled files and handles every request under
            <code className="code-chip">/api</code>.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="button-primary" type="button">
              Create first draft
            </button>
            <button className="button-secondary" type="button">
              Open media library
            </button>
          </div>
        </div>

        <aside className="rounded-panel border border-line bg-ink p-7 text-canvas shadow-soft sm:p-8">
          <p className="eyebrow text-mist">Environment</p>
          <dl className="mt-6 space-y-5">
            <StatusRow label="Vite mode" value={import.meta.env.MODE} />
            <StatusRow label="App layer" value={import.meta.env.VITE_APP_ENV} />
            <StatusRow label="API" value={health.status} />
            {health.storage && (
              <StatusRow label="Storage" value={health.storage} />
            )}
          </dl>
        </aside>
      </section>
    </main>
  );
}

function StatusRow({ label, value }) {
  return (
    <div className="border-b border-white/15 pb-4 last:border-0 last:pb-0">
      <dt className="text-xs font-semibold tracking-[0.16em] text-mist uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-base font-medium">{value ?? "not set"}</dd>
    </div>
  );
}

