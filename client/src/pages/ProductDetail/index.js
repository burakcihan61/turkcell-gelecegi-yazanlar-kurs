import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Text, Button, Box, Image } from "@chakra-ui/react";
import { useBasket } from "../../context/BasketContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, error, data } = useQuery(["product", id], () =>
    fetchProduct(id)
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const findBasketItem = items.find((item) => item.id === data._id);

  return (
    <div>
      <Button
        colorScheme={findBasketItem ? "pink" : "green"}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <p>{data.description}</p>
      <Box margin="10px">
        <Image
          src={data.photos[0]}
          alt="product"
          loading="laxy"
          boxSize="500px"
          objectFit="cover"
        />
      </Box>
    </div>
  );
};

export default ProductDetail;
