import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";
import { parseArgs } from "node:util";

const STATIC_DIRS = {
  1: "./1. no sw counter",
  2: "./2. import sw",
  3: "./3. importscript sw",
  4: "./4. broadcast sw",
  5: "./5. shared worker",
  6: "./6. metacom",
};

const { values: args } = parseArgs({
  options: {
    port: {
      type: "string",
      short: "p",
      default: "3000",
    },
    dir: {
      type: "string",
      short: "d",
      default: "1",
    },
  },
});

const PORT = Number(args.port);

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "text/javascript",
  mjs: "text/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const STATIC_PATH = path.join(process.cwd(), STATIC_DIRS[args.dir]);

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("index.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  // const streamPath = found ? filePath : `${STATIC_PATH}/404.html`;
  const streamPath = found ? filePath : `${STATIC_PATH}/index.html`;
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
