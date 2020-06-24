const cors = require("cors");
const express = require("express");
// TODO: add a strip key
const strip = require("stripe")(
  "sk_test_51GxBpJIKGrlJ4qLwV1dHE2o8RUeNqzWbTjLGqZnpslihs7OcSrUPCfB8iCqENfeZ42ENwrgWnP1HbNsMfySXI8Zv00pn9uF2Pj"
);
const uuid = require("uuid");
const app = express();

//middleware
app.use(express.json());
app.use(cors());

// Routes

app.get("/", (req, res) => {
  res.send("Working...");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("Product", product);
  console.log("Price", product.price);
  const idempontencyKey = uuid.v4();

  strip.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      strip.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(`Error ${err}`));
});
//Listen
const port = 8282;
app.listen(port, () => {
  console.log(`Listing at ${port}`);
});
