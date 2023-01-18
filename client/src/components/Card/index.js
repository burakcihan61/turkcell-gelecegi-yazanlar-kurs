import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../context/BasketContext";

const Card = ({ item }) => {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find(
    (basket_item) => basket_item.id === item._id
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Link to={`/products/${item._id}`}>
        <Image
          src={item.photos[0]}
          alt="product"
          loading="laxy"
          boxSize="300px"
          objectFit="cover"
        />
        <Box p={4}>
          <Box display="flex" alignItems="baseline">
            {moment().subtract(10, "days").calendar()}
          </Box>
          <Box mt={1} fontWeight="semibold" as="h4" lineHeight="baseline">
            {item.title}
          </Box>
          <Box>{item.price} TL</Box>
        </Box>
      </Link>
      <Button
        colorScheme={findBasketItem ? "pink" : "green"}
        variant="solid"
        onClick={() => addToBasket(item, findBasketItem)}
      >
        {findBasketItem ? "Remove from baseket" : "Add to basket"}
      </Button>
    </Box>
  );
};

export default Card;
