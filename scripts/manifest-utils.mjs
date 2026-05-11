import path from "node:path";
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";

const MEDIA_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg", ".mp4", ".webm", ".mov"]);

const listMediaFilesInFolder = (absoluteFolderPath, sortMode = "name") => {
  try {
    const entries = readdirSync(absoluteFolderPath, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const absolutePath = path.join(absoluteFolderPath, entry.name);
        let mtimeMs = 0;
        try {
          mtimeMs = statSync(absolutePath).mtimeMs ?? 0;
        } catch {
          mtimeMs = 0;
        }
        return { name: entry.name, mtimeMs };
      })
      .filter((file) => MEDIA_EXTENSIONS.has(path.extname(file.name).toLowerCase()));

    if (sortMode === "mtime_desc") {
      entries.sort((a, b) => b.mtimeMs - a.mtimeMs);
    } else {
      entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));
    }

    return entries.map((file) => file.name);
  } catch {
    return [];
  }
};

const buildPortfolioImagesManifest = (rootDir) => {
  const baseDir = path.resolve(rootDir, "public", "portfolio-images");
  const manifest = {};
  if (!existsSync(baseDir)) return manifest;

  readdirSync(baseDir).forEach((folderName) => {
    const absoluteFolderPath = path.join(baseDir, folderName);
    let isDirectory = false;
    try {
      isDirectory = statSync(absoluteFolderPath).isDirectory();
    } catch {
      isDirectory = false;
    }
    if (!isDirectory) return;

    const rootFiles = listMediaFilesInFolder(absoluteFolderPath);
    if (rootFiles.length > 0) {
      manifest[folderName] = rootFiles.map((fileName) => `/portfolio-images/${folderName}/${fileName}`);
    }

    readdirSync(absoluteFolderPath).forEach((nestedName) => {
      const nestedPath = path.join(absoluteFolderPath, nestedName);
      let nestedIsDirectory = false;
      try {
        nestedIsDirectory = statSync(nestedPath).isDirectory();
      } catch {
        nestedIsDirectory = false;
      }
      if (!nestedIsDirectory) return;

      const nestedFiles = listMediaFilesInFolder(
        nestedPath,
        nestedName.toLowerCase() === "preview" ? "mtime_desc" : "name",
      );
      if (nestedFiles.length === 0) return;

      const key = `${folderName}/${nestedName}`;
      manifest[key] = nestedFiles.map((fileName) => `/portfolio-images/${folderName}/${nestedName}/${fileName}`);
    });
  });

  return manifest;
};

const writePortfolioImagesManifest = (rootDir) => {
  const manifest = buildPortfolioImagesManifest(rootDir);
  const outPath = path.resolve(rootDir, "public", "portfolio-images-manifest.json");
  writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifest;
};

const portfolioImagesManifestPlugin = () => ({
  name: "portfolio-images-manifest",
  configureServer(server) {
    const rootDir = server.config.root;
    const watchedBase = path.resolve(rootDir, "public", "portfolio-images");
    const normalize = (p) => p.split("\\").join("/");
    const watchedBaseNorm = normalize(watchedBase).toLowerCase();
    const manifestPathNorm = normalize(path.resolve(rootDir, "public", "portfolio-images-manifest.json")).toLowerCase();

    const rebuildManifest = () => {
      try {
        writePortfolioImagesManifest(rootDir);
      } catch {
        // Ignore transient fs errors while files are being copied.
      }
    };

    rebuildManifest();

    const maybeRebuild = (filePath) => {
      const normalized = normalize(filePath).toLowerCase();
      if (normalized === manifestPathNorm) return;
      if (normalized.startsWith(watchedBaseNorm)) rebuildManifest();
    };

    server.watcher.on("add", maybeRebuild);
    server.watcher.on("change", maybeRebuild);
    server.watcher.on("unlink", maybeRebuild);
    server.watcher.on("addDir", maybeRebuild);
    server.watcher.on("unlinkDir", maybeRebuild);
  },
  generateBundle() {
    const manifest = writePortfolioImagesManifest(process.cwd());
    this.emitFile({
      type: "asset",
      fileName: "portfolio-images-manifest.json",
      source: JSON.stringify(manifest),
    });
  },
});

export { buildPortfolioImagesManifest, writePortfolioImagesManifest, portfolioImagesManifestPlugin };
