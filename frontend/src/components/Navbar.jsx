import {
  Button,
  Flex,
  HStack,
  Container,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { IoSunnyOutline, IoMoonSharp } from "react-icons/io5";
import { useProductStore } from "../store/product";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { products } = useProductStore();

  return (
    <Container maxW={"60%"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-l, #7928CA, #FF0080)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoSunnyOutline /> : <IoMoonSharp />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
