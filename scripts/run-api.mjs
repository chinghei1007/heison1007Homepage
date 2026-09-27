import { spawn } from "node:child_process";

const profile = process.argv[2] ?? "development";
const child = spawn(
  "mvn",
  [
    "-f",
    "apps/editorial-api/pom.xml",
    "spring-boot:run",
    `-Dspring-boot.run.profiles=${profile}`,
  ],
  { stdio: "inherit" },
);

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});

