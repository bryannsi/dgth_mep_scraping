import fs from "fs";
import path from "path";

const jsonExport = (filePath, fileName, data) => {
  const fileNamePath = path.normalize(path.join(filePath, fileName));
  try {
    // write new data
    const dataJson = JSON.stringify(data, null, 2);
    fs.appendFileSync(fileNamePath, dataJson);
    return fileNamePath;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const truncateData = (filePath, fileName) => {
  try {
    const fileNamePath = path.normalize(path.join(filePath, fileName));
    // truncate all data content
    fs.writeFileSync(fileNamePath, "");
  } catch (error) {
    console.error(error);
  }
};

export { jsonExport, truncateData };
