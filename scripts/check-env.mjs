import { spawnSync } from "node:child_process";

const nodeMajor = Number(process.versions.node.split(".")[0]);

if (nodeMajor !== 24) {
  console.warn(
    `Expected Node 24 LTS from .nvmrc; found ${process.versions.node}. Run \"nvm use\" before installing dependencies.`,
  );
}

if (nodeMajor < 22) {
  process.exitCode = 1;
}

const java = spawnSync("java", ["-version"], { encoding: "utf8" });
if (java.error) {
  console.error("Java was not found. Install a JDK, preferably Java 21 LTS.");
  process.exitCode = 1;
} else {
  const firstLine = (java.stderr || java.stdout).split("\n")[0];
  console.log(`Java: ${firstLine}`);
}

const maven = spawnSync("mvn", ["--version"], { encoding: "utf8" });
if (maven.error) {
  console.error("Maven was not found. Install Maven 3.6.3 or newer.");
  process.exitCode = 1;
} else {
  console.log(`Maven: ${maven.stdout.split("\n")[0]}`);
}

console.log(`Node: v${process.versions.node}`);

