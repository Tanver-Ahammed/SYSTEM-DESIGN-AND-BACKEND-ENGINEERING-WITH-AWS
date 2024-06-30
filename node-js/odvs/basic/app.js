const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

let totalByteSend = 0;

// middleware to track byte sent
app.use((req, res, next) => {
  let byteSend = 0;

  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk, encoding, callback) {
    if (chunk) {
      byteSend += Buffer.byteLength(chunk, encoding);
    }
    return originalWrite.call(res, chunk, encoding, callback);
  };

  res.end = function (chunk, encoding, callback) {
    if (chunk) {
      byteSend += Buffer.byteLength(chunk, encoding);
    }
    totalByteSend += byteSend;
    console.log(`Byte send for this request: ${byteSend}`);
    console.log(`Total byte sent: ${totalByteSend}`);
    return originalEnd.call(res, chunk, encoding, callback);
  };

  next();
});

app.get("/video", (req, res) => {
  const videoPath = path.join(__dirname, "video.mp4");
  const videoStat = fs.statSync(videoPath);
  const fileSize = videoStat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      res
        .status(416)
        .send("Requested range not satisfiable\n" + start + " >= " + fileSize);
      return;
    }

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
