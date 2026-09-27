# Published-content boundary

The deployed public Worker currently lives in `apps/public-site/workers` because
React Router's Cloudflare adapter builds it together with the server-rendered
React application. Keep D1 read helpers and published-only repository code in
this package when that layer is implemented; do not add editorial writes here.

