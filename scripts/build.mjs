import { spawnSync } from "node:child_process";

const steps = [
  ["Clean the Spring build", "mvn", ["-f", "apps/editorial-api/pom.xml", "clean"]],
  ["Build the CMS into Spring static resources", "npm", ["--workspace", "@homepage/cms", "run", "build"]],
  ["Build the public Cloudflare app", "npm", ["--workspace", "@homepage/public-site", "run", "build"]],
  ["Verify and package Spring Boot", "mvn", ["-f", "apps/editorial-api/pom.xml", "verify"]],
];

for (const [label, command, args] of steps) {
  console.log(`\n${label}`);
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

