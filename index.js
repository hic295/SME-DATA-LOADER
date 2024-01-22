const {fetchAllProducts } = require("./getAlldata/getData");
const { processChunks } = require("./getAlldata/processChunk");
const {sfObject} = require("./ShopifyQuery/queries");
require("dotenv").config();
const express = require('express')
const cors = require('cors');
const app = express();
const port = 3000 ;
const path = require('path');
let shopName =process.env.SHOPIFY_STORE_NAME;

app.use(cors());
async function synchronizeSalesforceAndShopify() {
  try {
     const shopifyTotalData = await fetchAllProducts();
    // console.log("Total Records Length>:",shopifyTotalData.length)
     console.log("Total object :",shopifyTotalData[1])
     await processChunks(shopifyTotalData,shopName,sfObject);
  } catch (error) {
    console.error("Error:", error);
  }
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/apiRunMe', async (req , res)=>{
  await synchronizeSalesforceAndShopify();
  res.send(200)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})