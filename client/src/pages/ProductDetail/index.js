import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";

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
      <Text as="h2" fontSize="2xl">
        {data.description}
      </Text>
    </div>
  );
};

export default ProductDetail;
