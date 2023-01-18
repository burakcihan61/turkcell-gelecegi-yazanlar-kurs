import {
  Alert,
  Box,
  Button,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { postOrder } from "../../api";
import { useBasket } from "../../context/BasketContext";

const Basket = () => {
  const [address, setAddress] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    postOrder(input);
    emptyBasket();
    return onClose();
  };

  return (
    <Box p={5}>
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket.</Alert>
      )}
      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal" }}>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: 15 }}>
                <Link to={`/products/${item.id}`}>
                  <Text fontSize={18} mb={5}>
                    {item.title} - {item.price} TL
                  </Text>
                  <Image
                    loading="layz"
                    htmlWidth={150}
                    src={item.image}
                    alt="basket item"
                  ></Image>
                </Link>
                <Button
                  mt={2}
                  size="sm"
                  colorScheme="red"
                  onClick={() => {
                    removeFromBasket(item.id);
                  }}
                >
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>
          <Box mt={10}>
            <Text fontSize={22}>Total : {total} TL</Text>
          </Box>

          <Button mt={2} size="sm" colorScheme="green" onClick={onOpen}>
            Order
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Adress</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default Basket;
