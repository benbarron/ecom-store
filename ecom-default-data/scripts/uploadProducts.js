const AppSearchClient = require("@elastic/app-search-node");
const products = require("./products.json");
const apiKey = "private-u22qtpmoog8pzrbrsjm83kgo";
const baseUrlFn = () => "http://35.202.58.140:3002/api/as/v1/";
const client = new AppSearchClient(undefined, apiKey, baseUrlFn);

const send = async () => {
  var arr = [];
  for (let i = 0; i < products.length; i++) {
    arr.push({
      ...products[i],
      category: products[i].category.map((c) => c.name),
    });
    if (i % 99 === 0) {
      try {
        await client.indexDocuments("products-engine", arr);
        console.log(`Documents uploaded: ${i}`);
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
      arr = [];
    }
  }
};

send();
