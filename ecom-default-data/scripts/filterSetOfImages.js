const fs = require("fs");
const axios = require("axios");
const products = require("./../data/products.json");
const output = [];

const main = async () => {
  const processNumber = process.argv[2];
  const start = process.argv[3];
  const end = process.argv[4];
  for (const product of products.slice(start, end + 1)) {
    try {
      await axios.get(products[0].image);
      output.push(product);
    } catch (e) {
      console.log(e);
    }
  }
  fs.writeFileSync(
    `./data/filtered-products-${processNumber}.json`,
    JSON.stringify(output)
  );
};

main();
