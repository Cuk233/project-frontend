import {
  Flex,
  Checkbox,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errormsg = "";
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );
      if (response.data.message == "Register success") {
        toast({
          title: "Register success",
          description: "Please check your email for verification link.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/login");
          setIsLoading(false);
        }, 2000);
      } else {
        toast({
          title: "Register failed",
          status: "error",
          description: response.data.message,
          duration: 3000,
          isClosable: true,
        });
        console.log(response.data);
      }
      errormsg += response.data;
      console.log(errormsg.message);
      // handle successful registration
    } catch (error) {
      toast({
        title: "Register Failed",
        status: "error",
        description: error.response.data.message,
        duration: 3000,
        isClosable: true,
      });
      console.error(error.response.data);
      // handle registration error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                  title="Password must contain at least 8 characters including at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                />
              </FormControl>

              <FormControl id="confirmPassword" isRequired mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  pattern={formData.password}
                  title="Passwords do not match"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Register
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Register;
