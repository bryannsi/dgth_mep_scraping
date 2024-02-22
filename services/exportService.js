import fs from "fs";
import path from "path";

const jsonExport = (filePath, fileName, data) => {
  let fileNamePath = path.normalize(path.join(filePath, fileName));

  try {
    let dataJson = JSON.stringify(data, null, 2);
    fs.appendFileSync(fileNamePath, dataJson);
    return fileNamePath;
    // console.log(`Datos guardados con exito en ${fileNamePath}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { jsonExport };
