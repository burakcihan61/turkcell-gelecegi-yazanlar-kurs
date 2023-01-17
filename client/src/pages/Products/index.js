import React from "react";
import Card from "../../components/Card";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchProductList } from "../../api";

const Products = () => {
  const { isLoading, error, data } = useQuery("products", fetchProductList);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {data.map((item, key) => (
          <Card key={key} item={item} />
        ))}
      </Grid>
    </div>
  );
};

export default Products;
