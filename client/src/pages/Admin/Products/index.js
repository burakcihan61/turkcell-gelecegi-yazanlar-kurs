import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <Link to="/admin/products/new">
        <Button>new</Button>
      </Link>
    </div>
  );
};

export default Products;
