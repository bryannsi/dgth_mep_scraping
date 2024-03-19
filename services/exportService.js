const jsonExport = (writeFile, filePath, data) => {
  try {
    let dataJson = flattenArrayOfArrays(data);
    // write new data
    dataJson = JSON.stringify(dataJson, null, 2);
    writeFile(filePath, dataJson);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const truncateData = (writeFile, filePath) => {
  try {
    // truncate all data content
    writeFile(filePath, "");
  } catch (error) {
    console.error(error);
  }
};

function flattenArrayOfArrays (arrays) {
  return arrays.reduce((flatArray, subArray) => flatArray.concat(subArray), []);
}

export { jsonExport, truncateData };
