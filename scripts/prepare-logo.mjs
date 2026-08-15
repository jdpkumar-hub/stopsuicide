import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve(
  "C:/Users/jdpku/.cursor/projects/c-Projects-stopsuicide/assets/c__Users_jdpku_AppData_Roaming_Cursor_User_workspaceStorage_5060538aa607627b726cf24aec89382c_images_ChatGPT_Image_Aug_15__2026__02_55_37_PM-755a3575-f568-448d-9d7e-6836b0892a30.png",
);
const ROOT = path.resolve(import.meta.dirname, "..");
const LOGO_DIR = path.join(ROOT, "public/images/logo");
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "src/app");

function isRed(r, g, b) {
  return r > 130 && r > g + 35 && r > b + 35;
}

function isBackground(r, g, b) {
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (isRed(r, g, b)) return false;
  return sat < 22 && luma > 72;
}

function floodKnockout(data, width, height) {
  const px = Buffer.from(data);
  const seen = new Uint8Array(width * height);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (seen[idx]) return;
    const i = idx * 4;
    if (!isBackground(px[i], px[i + 1], px[i + 2])) return;
    seen[idx] = 1;
    stack.push(idx);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const idx = stack.pop();
    const x = idx % width;
    const y = (idx / width) | 0;
    const i = idx * 4;
    px[i + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] === 0) continue;
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    if (luma > 238 && sat < 18 && !isRed(r, g, b)) {
      px[i + 3] = Math.max(0, Math.min(255, Math.round((248 - luma) * 16)));
    }
  }

  return px;
}

function invertBlacks(data) {
  const px = Buffer.from(data);
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] === 0) continue;
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    if (!isRed(r, g, b)) {
      px[i] = 255 - r;
      px[i + 1] = 255 - g;
      px[i + 2] = 255 - b;
    }
  }
  return px;
}

function boundingBox(data, width, height, minAlpha = 24) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] < minAlpha) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

async function pngFromRaw(data, info) {
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

function pngToIco(images) {
  const count = images.length;
  const headerSize = 6 + 16 * count;
  let offset = headerSize;
  const entries = images.map((img) => {
    const entry = { ...img, offset, bytes: img.png.length };
    offset += img.png.length;
    return entry;
  });
  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  let cursor = 6;
  for (const entry of entries) {
    buf.writeUInt8(entry.width >= 256 ? 0 : entry.width, cursor);
    buf.writeUInt8(entry.height >= 256 ? 0 : entry.height, cursor + 1);
    buf.writeUInt8(0, cursor + 2);
    buf.writeUInt8(0, cursor + 3);
    buf.writeUInt16LE(1, cursor + 4);
    buf.writeUInt16LE(32, cursor + 6);
    buf.writeUInt32LE(entry.bytes, cursor + 8);
    buf.writeUInt32LE(entry.offset, cursor + 12);
    cursor += 16;
  }
  for (const entry of entries) {
    entry.png.copy(buf, entry.offset);
  }
  return buf;
}

async function squarePad(input, size, background) {
  return sharp(input)
    .resize(size, size, { fit: "contain", background, withoutEnlargement: false })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  await mkdir(LOGO_DIR, { recursive: true });

  const decoded = await sharp(SRC).removeAlpha().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const knocked = floodKnockout(decoded.data, decoded.info.width, decoded.info.height);
  const box = boundingBox(knocked, decoded.info.width, decoded.info.height);
  if (box.width < 8 || box.height < 8) {
    throw new Error(`Invalid logo bounding box: ${JSON.stringify(box)}`);
  }
  console.log("content box", box);
  const fullPng = await pngFromRaw(knocked, decoded.info);
  const trimmedLight = await sharp(fullPng).extract(box).png({ compressionLevel: 9 }).toBuffer();
  const lightMeta = await sharp(trimmedLight).metadata();

  const darkRaw = invertBlacks(
    (await sharp(trimmedLight).ensureAlpha().raw().toBuffer({ resolveWithObject: true })).data,
  );
  const trimmedDark = await pngFromRaw(darkRaw, {
    width: lightMeta.width,
    height: lightMeta.height,
  });

  const rowOpacity = [];
  const lightRaw = await sharp(trimmedLight).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < lightRaw.info.height; y++) {
    let count = 0;
    for (let x = 0; x < lightRaw.info.width; x++) {
      if (lightRaw.data[(y * lightRaw.info.width + x) * 4 + 3] > 40) count++;
    }
    rowOpacity.push(count / lightRaw.info.width);
  }
  let gapStart = -1;
  for (let y = Math.floor(lightRaw.info.height * 0.38); y < Math.floor(lightRaw.info.height * 0.72); y++) {
    if (rowOpacity[y] < 0.04) {
      gapStart = y;
      break;
    }
  }
  const iconHeight = gapStart > 80 ? gapStart - 4 : Math.round(lightMeta.height * 0.58);
  console.log({ box, lightMeta, iconHeight, gapStart });
  const safeIconHeight = Math.max(80, Math.min(iconHeight, lightMeta.height - 8));
  const iconSheet = await sharp(trimmedLight)
    .extract({ left: 0, top: 0, width: lightMeta.width, height: safeIconHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const iconBox = boundingBox(iconSheet.data, iconSheet.info.width, iconSheet.info.height, 40);
  const iconLight = await sharp(iconSheet.data, {
    raw: { width: iconSheet.info.width, height: iconSheet.info.height, channels: 4 },
  })
    .extract(iconBox)
    .png({ compressionLevel: 9 })
    .toBuffer();
  const iconMeta = await sharp(iconLight).metadata();
  const iconDarkRaw = invertBlacks(
    (await sharp(iconLight).ensureAlpha().raw().toBuffer({ resolveWithObject: true })).data,
  );
  const iconDark = await pngFromRaw(iconDarkRaw, { width: iconMeta.width, height: iconMeta.height });

  const logoLight = await sharp(trimmedLight)
    .resize({ width: 720, withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  const logoDark = await sharp(trimmedDark)
    .resize({ width: 720, withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  const markLight = await sharp(iconLight)
    .resize({ width: 512, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const markDark = await sharp(iconDark)
    .resize({ width: 512, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(path.join(LOGO_DIR, "logo.png"), logoLight);
  await writeFile(path.join(LOGO_DIR, "logo-dark.png"), logoDark);
  await writeFile(path.join(LOGO_DIR, "icon.png"), markLight);
  await writeFile(path.join(LOGO_DIR, "icon-dark.png"), markDark);

  const cream = { r: 255, g: 255, b: 255, alpha: 1 };
  const clear = { r: 0, g: 0, b: 0, alpha: 0 };
  const fav16 = await squarePad(iconLight, 16, clear);
  const fav32 = await squarePad(iconLight, 32, clear);
  const apple = await squarePad(iconLight, 180, cream);
  const android192 = await squarePad(iconLight, 192, cream);
  const android512 = await squarePad(iconLight, 512, cream);

  await writeFile(path.join(PUBLIC, "favicon-16x16.png"), fav16);
  await writeFile(path.join(PUBLIC, "favicon-32x32.png"), fav32);
  await writeFile(path.join(PUBLIC, "apple-touch-icon.png"), apple);
  await writeFile(path.join(PUBLIC, "android-chrome-192x192.png"), android192);
  await writeFile(path.join(PUBLIC, "android-chrome-512x512.png"), android512);
  await writeFile(path.join(APP, "icon.png"), fav32);
  await writeFile(path.join(APP, "apple-icon.png"), apple);

  const ico = pngToIco([
    { width: 16, height: 16, png: fav16 },
    { width: 32, height: 32, png: fav32 },
  ]);
  await writeFile(path.join(PUBLIC, "favicon.ico"), ico);
  await writeFile(path.join(APP, "favicon.ico"), ico);

  const ogLogo = await sharp(trimmedLight).resize({ height: 430 }).png().toBuffer();
  const ogLogoMeta = await sharp(ogLogo).metadata();
  const og = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      {
        input: ogLogo,
        left: Math.round((1200 - ogLogoMeta.width) / 2),
        top: Math.round((630 - ogLogoMeta.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(path.join(LOGO_DIR, "og.png"), og);
  await writeFile(path.join(PUBLIC, "og.png"), og);

  const finalLogo = await sharp(logoLight).metadata();
  const finalMark = await sharp(markLight).metadata();
  console.log(
    JSON.stringify(
      {
        box,
        iconHeight,
        logo: { width: finalLogo.width, height: finalLogo.height, bytes: logoLight.length },
        mark: { width: finalMark.width, height: finalMark.height, bytes: markLight.length },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
