const AppSearchClient = require("@elastic/app-search-node");
const stores = require("./stores.json");
const apiKey = "private-u22qtpmoog8pzrbrsjm83kgo";
const baseUrlFn = () => "http://35.202.58.140:3002/api/as/v1/";
const client = new AppSearchClient(undefined, apiKey, baseUrlFn);

const send = async () => {
  var arr = [];
  for (let i = 0; i < stores.length; i++) {
    arr.push({
      id: stores[i].id,
      store_type: stores[i].storeType,
      time_zone: stores[i].timeZone,
      open_date: stores[i].openDate,
      name: stores[i].name,
      postal_code: stores[i].postalCode,
      address: stores[i].address1,
      city: stores[i].city,
      state: stores[i].state,
      country: stores[i].country,
      latitude: stores[i].latitude,
      longitude: stores[i].longitude,
      phone_number: stores[i].phone_number,
    });
    if (i % 99 === 0) {
      try {
        const res = await client.indexDocuments("stores-engine", arr);
        console.log(res);
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
