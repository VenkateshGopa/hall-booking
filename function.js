const fs = require('fs')
const loadData = (filename) => {
    try {
      const databuff = fs.readFileSync(filename);
      const dataJson = databuff.toString();
      return JSON.parse(dataJson);
    } catch (e) {
      return [];
    }
  };

const savedata = (filename, data) => {
  const dataJson = JSON.stringify(data);
  fs.writeFileSync(filename, dataJson);
};

module.exports={
    loadData,
    savedata
}