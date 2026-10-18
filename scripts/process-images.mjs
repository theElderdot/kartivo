import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { exiftool } from "exiftool-vendored";

const root = process.cwd();
const assets = path.resolve(
  "C:/Users/wesker/.cursor/projects/c-Users-wesker-Projects-kartivo/assets",
);

const jobs = [
  {
    source: "kartivo-wave-starter-full.jpg",
    dest: "public/images/products/kartivo-wave-starter.webp",
    description:
      "AI-generated concept photograph of the KARTIVO Wave Starter soft-top surfboard. Not a photograph of a manufactured board.",
  },
  {
    source: "kartivo-ocean-cruiser-full.jpg",
    dest: "public/images/products/kartivo-ocean-cruiser.webp",
    description:
      "AI-generated concept photograph of the KARTIVO Ocean Cruiser funboard. Not a photograph of a manufactured board.",
  },
  {
    source: "kartivo-wave-pro-full.jpg",
    dest: "public/images/products/kartivo-wave-pro.webp",
    description:
      "AI-generated concept photograph of the KARTIVO Wave Pro shortboard. Not a photograph of a manufactured board.",
  },
  {
    source: "kartivo-volt-electric.jpg",
    dest: "public/images/products/kartivo-volt-electric.webp",
    description:
      "AI-generated concept photograph of the KARTIVO Volt electric surfboard. Not a photograph of a manufactured board.",
  },
  {
    source: "kartivo-hero.jpg",
    dest: "public/images/hero.webp",
    description:
      "AI-generated lifestyle photograph of a surfer on an unbranded board. Not a product photo.",
  },
  {
    source: "aquavolt-drift-bodyboard.jpg",
    dest: "public/images/products/aquavolt-drift-bodyboard.webp",
    description:
      "AI-generated concept photograph of the AQUAVOLT Drift bodyboard. Not a photograph of a manufactured board. No motor.",
  },
  {
    source: "aquavolt-glide-skimboard.jpg",
    dest: "public/images/products/aquavolt-glide-skimboard.webp",
    description:
      "AI-generated concept photograph of the AQUAVOLT Glide skimboard. Not a photograph of a manufactured board. No motor.",
  },
];

const digitalSource =
  "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia";

function hasSourceType(value) {
  if (!value) return false;
  const text = Array.isArray(value) ? value.join(" ") : String(value);
  return /trainedAlgorithmicMedia/i.test(text);
}

const only = process.argv[2];
const selected = only ? jobs.filter((job) => job.dest.includes(only) || job.source.includes(only)) : jobs;
if (selected.length === 0) throw new Error(`No image job matches ${only}`);

try {
  for (const job of selected) {
    const source = path.join(assets, job.source);
    const dest = path.join(root, job.dest);
    await mkdir(path.dirname(dest), { recursive: true });

    const before = await exiftool.read(source);
    const meta = await sharp(source).metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    const productImage = job.dest.includes("/products/");
    const longSide = Math.max(width, height);
    const shortSide = Math.min(width, height);
    if (productImage && (longSide < 1000 || shortSide < 500)) {
      throw new Error(`${job.source} is ${width}x${height}. Refusing to upscale.`);
    }
    if (width < 500 || height < 500) {
      throw new Error(`${job.source} is ${width}x${height}.`);
    }

    await sharp(source).rotate().webp({ quality: 86, effort: 5 }).toFile(dest);
    await exiftool.write(dest, {}, [
      "-overwrite_original",
      "-tagsFromFile",
      source,
      "-all:all",
    ]);

    const copied = await exiftool.read(dest);
    const tags = {};
    if (!hasSourceType(copied.DigitalSourceType)) {
      const preserved = before.DigitalSourceType;
      tags["XMP-iptcExt:DigitalSourceType"] = preserved
        ? String(Array.isArray(preserved) ? preserved[0] : preserved)
        : digitalSource;
    }
    if (!copied.Description && !copied.ImageDescription) {
      tags.Description = job.description;
    }
    if (Object.keys(tags).length > 0) {
      await exiftool.write(dest, tags, ["-overwrite_original"]);
    }

    const after = await exiftool.read(dest);
    const bytes = await readFile(dest);
    const embedded = bytes.toString("latin1").includes("trainedAlgorithmicMedia");
    console.log(
      JSON.stringify({
        file: job.dest,
        sourceSize: `${width}x${height}`,
        outputSize: `${after.ImageWidth}x${after.ImageHeight}`,
        sourceDigitalSourceType: before.DigitalSourceType ?? null,
        digitalSourceType: after.DigitalSourceType ?? null,
        embedded,
      }),
    );
    if (!hasSourceType(after.DigitalSourceType) && !embedded) {
      throw new Error(`Missing DigitalSourceType on ${job.dest}`);
    }
  }
} finally {
  await exiftool.end();
}
