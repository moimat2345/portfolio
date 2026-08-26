import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const cvPath = join(process.cwd(), "public", "cv-mateo-nuskovski.pdf");

test("the downloadable CV is a real PDF asset", () => {
  assert.equal(existsSync(cvPath), true, "the public CV file is missing");

  const signature = readFileSync(cvPath).subarray(0, 5).toString("ascii");
  assert.equal(signature, "%PDF-");
});
