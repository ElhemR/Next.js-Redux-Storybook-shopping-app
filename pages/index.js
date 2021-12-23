import { getStock } from "../redux/receiverSlice";
import { Banner, Card,Grid } from "shopping-app-ui-library"

import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { addItem } from "../redux/basketSlice";

const Receivers = ({ receivers, getStock, addItem }) => {
  useEffect(() => {
    // Get list of receivers that are in stock
    getStock();
  }, []);

  const stock = useSelector((state) => state.stock);
  const basket = useSelector((state) => state.basket);

  //Filter out the receiver which is out of stock and add prices
  var filtered = receivers.filter(function (el) {
    return stock.stock.some((item) => {
      if (item.fields) {
        el.fields.productPrice = item.fields.price;
        return item.fields.productId === el.fields.productId.toString();
      }
    });
  });
  const array=  [1]
  console.log( filtered.map((rec, index) => (
    <Card
      name={rec.fields.productName}
      image={rec.fields.productImage.fields.file.url}
      price={rec.fields.productPrice}
      loadingState={basket.processing.some(
        (item) => item.productCode === rec.fields.productName
      )}
      inBasket={basket.items.some(
        (item) => item.productCode === rec.fields.productName
      )}
      onClick={() => {
        addItem({
          productCode: rec.fields.productName,
          productPrice: rec.fields.productPrice,
        });
      }}
    ></Card>
)))
  return (
    <div>
      <Banner numberItems={getNumberOfItems(basket.items)} amount={calculatePrice(basket.items)}></Banner>
      <div> 
        {filtered.map((rec, index) => (
            <Card
              name={rec.fields.productName}
              image={rec.fields.productImage.fields.file.url}
              price={rec.fields.productPrice}
              loadingState={basket.processing.some(
                (item) => item.productCode === rec.fields.productName
              )}
              inBasket={basket.items.some(
                (item) => item.productCode === rec.fields.productName
              )}
              onClick={() => {
                addItem({
                  productCode: rec.fields.productName,
                  productPrice: rec.fields.productPrice,
                });
              }}
            ></Card>
        ))}
      </div>
    </div>
  );
};

const client = require("contentful").createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticProps = async () => {
  const receivers = await client.getEntries();
  return {
    props: {
      receivers: receivers.items,
    },
  };
};

function calculatePrice(items) {
  let price = 0;
  for (let i of items) {
    price = price + i.productPrice;
  }
  return price;
}

function getNumberOfItems(items) {
  return items.length;
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getStock, addItem })(Receivers);
