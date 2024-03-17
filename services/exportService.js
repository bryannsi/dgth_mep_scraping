const jsonExport = (writeFile, filePath, data) => {
  try {
    // write new data
    const dataJson = JSON.stringify(data, null, 2);
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

export { jsonExport, truncateData };
