import { writePortfolioImagesManifest } from "./manifest-utils.mjs";

const outManifest = writePortfolioImagesManifest(process.cwd());
const keyCount = Object.keys(outManifest).length;

console.log(`Wrote public/portfolio-images-manifest.json with ${keyCount} media groups`);
