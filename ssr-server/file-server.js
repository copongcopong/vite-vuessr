const path = require('path')
const mime = require('mime-types');
const fs = require('fs');

var CACHE = {};

const getFileStats = (filePath) => {
  if (!fs.existsSync(filePath)) {
      return;
  }
  const fileExtension = path.extname(filePath);
  const contentType = mime.lookup(fileExtension);
  const { mtimeMs, size } = fs.statSync(filePath);
  const lastModified = new Date(mtimeMs).toUTCString();

  return { filePath, lastModified, size, contentType };
};

module.exports = (dir) => (req, res, next) => {
  //console.log({req, res}, req.url)
  var url = req.url;
  if (url === '/' || url.indexOf('.') < 0) return next();

  try {
    const filePath = dir + url//path.resolve(dir, url);
    const fileStats = getFileStats(filePath);
    //console.log({dir, fileStats, filePath})
    if (!fileStats) {
      console.log({filePath})
      res.status('404');
      res.end();
      return;
  }

  const { contentType, lastModified, size } = fileStats;
  const ifModifiedSince = req.headers['if-modified-since'];

  if (ifModifiedSince === lastModified) {
      res.status('304');
      res.raw.end();
      return;
  }

  res.header('Content-Type', contentType);
  res.header('Last-Modified', lastModified);
  let fileData;
  if (CACHE[filePath] == undefined) {
    fileData = fs.readFileSync(filePath);
    CACHE[filePath] = {
      data: fileData,
      fileStats
    }
  } else {
    fileData = CACHE[filePath]['data'];
  }
  res.send(fileData);

  } catch (e) {
    console.log(e)
  }
  next()
}