import { spawn } from "node:child_process";

const processes = [
  ["API", "node", ["scripts/run-api.mjs", "development"]],
  ["CMS", "npm", ["--workspace", "@homepage/cms", "run", "dev"]],
  ["PUBLIC", "npm", ["--workspace", "@homepage/public-site", "run", "dev"]],
].map(([name, command, args]) => {
  const child = spawn(command, args, { stdio: "inherit" });
  child.on("exit", (code) => {
    if (code && code !== 0) console.error(`${name} exited with code ${code}`);
  });
  return child;
});

function stop() {
  for (const child of processes) child.kill("SIGTERM");
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);

