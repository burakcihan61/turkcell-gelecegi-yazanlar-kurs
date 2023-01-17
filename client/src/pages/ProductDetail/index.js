import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Text, Button, Box, Image } from "@chakra-ui/react";

const ProductDetail = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery(["product", id], () =>
    fetchProduct(id)
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Button colorScheme="pink">Add to basket</Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <p>{data.description}</p>
      <Box margin="10px">
        <Image
          src={data.image}
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
