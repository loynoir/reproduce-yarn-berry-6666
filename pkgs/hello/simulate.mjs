import { readFile } from "node:fs/promises";
import { stderr, stdout } from "node:process";

/** @type {Array<{ type: "stdout" | "stderr"; value: string }>} */
const data = JSON.parse(
  await readFile("./simulate.json", "utf8"),
);

for (const el of data) {
  switch (el.type) {
    case "stdout":
      stdout.write(el.value);
      break;
    case "stderr":
      stderr.write(el.value);
      break;
    default:
      throw new Error();
  }
}
