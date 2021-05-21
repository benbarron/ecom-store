const { fork } = require("child_process");
const products = require("./../data/products.json");

const main = async () => {
  for (let i = 0, j = 0; i < products.length; i += 1000, j++) {
    let process = fork(`./scripts/filterSetOfImages.js`, [j, i, i + 1000]);
    process.on("error", (err) => {
      console.log(err);
    });
    process.on("message", (data) => {
      console.log(data);
    });
  }
};

main();
