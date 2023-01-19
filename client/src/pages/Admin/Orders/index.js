import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { fetchOrder } from "../../../api";

const Orders = () => {
  const { isLoading, isError, data } = useQuery("admin:orders", fetchOrder);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error :(</div>;
  console.log(data);
  return (
    <div>
      <Text fontSize="2xl">Order</Text>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>USER</Th>
            <Th>ADDRESS</Th>
            <Th>ITEMS</Th>
            <Th>CreatedAt</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td isNumeric>{item.items.length}</Td>
              <Td>{item.createdAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Orders;
