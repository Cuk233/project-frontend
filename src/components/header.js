import { Link } from "react-router-dom";
import { Box, Flex, Heading, Spacer, Button, Text } from "@chakra-ui/react";

function Header() {
  return (
    <Box bg="gray.300" px="4">
      <Flex alignItems="center" justifyContent="space-between" h="16">
        <Link to="/">
          <Heading size="md">My Shop</Heading>
        </Link>
        <Spacer />
        <Flex alignItems="center">
          <Link to="/products">
            <Button mr="4">Products</Button>
          </Link>
          <Link to="/categories">
            <Button mr="4">Categories</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
