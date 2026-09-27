import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "./app.css";

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-24 text-ink">
      <p className="eyebrow">{notFound ? "Not found" : "Unexpected error"}</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold">
        {notFound ? "This page is not here." : "The page could not be rendered."}
      </h1>
    </main>
  );
}

