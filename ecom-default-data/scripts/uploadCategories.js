const AppSearchClient = require("@elastic/app-search-node");
const categories = require("./categories.json");
const apiKey = "private-u22qtpmoog8pzrbrsjm83kgo";
const baseUrlFn = () => "http://35.202.58.140:3002/api/as/v1/";
const client = new AppSearchClient(undefined, apiKey, baseUrlFn);

const send = async () => {
  var arr = [];
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].subCategories && categories[i].subCategories.length) {
      arr.push({
        id: categories[i].id,
        name: categories[i].name,
        sub_categories: categories[i].subCategories
          ? categories[i].subCategories.map((c) => c.name)
          : [],
      });
    }
    if (arr.length === 99) {
      try {
        await client.indexDocuments("categories-engine", arr);
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
