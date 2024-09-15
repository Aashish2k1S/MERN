import {
  Button,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  Container,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

  const { createProduct } = useProductStore(); // Updated to match your store

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct); // Corrected method name

    console.log("Toast Condition:", success, message);

    if (!success) {
      // Corrected capitalization of 'success'
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    console.log("Success:", success);
    console.log("Message:", message);

    console.log("Product added:", newProduct);
  };

  return (
    <Container maxW={"60%"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"xl"} textAlign={"center"} mt={4} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={
                (e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Number(e.target.value),
                  }) // Ensuring price is a number
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
