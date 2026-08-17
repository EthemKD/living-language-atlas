import { loadContent, validateContent } from './content-contracts.mjs';

const result = validateContent(await loadContent());
if (result.errors.length) {
  for (const error of result.errors) console.error(`CONTENT ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Content contracts passed: ${JSON.stringify(result.counts)}`);
}
