import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Table, Popconfirm } from "antd";

const Products = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery(
    "admin:products",
    fetchProductList
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("admin:products");
    },
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure"
              okText="Yes"
              cancelText="No"
              placement="left"
              onCancel={() => console.log("iptal edildi")}
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("delete Mutation");
                  },
                });
              }}
            >
              <a href="/#" style={{ marginLeft: 10 }}>
                Delete
              </a>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl">Products</Text>
        <Link to="/admin/products/new">
          <Button colorScheme="green">New Product</Button>
        </Link>
      </Flex>

      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  );
};

export default Products;
