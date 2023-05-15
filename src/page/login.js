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

function Login() {
  const [emailOrUsername, setemailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errormsg = "";
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        formData
      );
      if (response.data.message == "login success") {
        toast({
          title: "Login berhasil",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/profile");
          setIsLoading(false);
        }, 3000);
      } else {
        toast({
          title: "Login gagal",
          status: "error",
          description: response.data.message,
          duration: 3000,
          isClosable: true,
        });
        console.log(response.data);
      }
      localStorage.setItem("token", response.data.token);
      errormsg += response.data;
      // handle successful registration
    } catch (error) {
      toast({
        title: "Login gagal",
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
          <Heading fontSize={"4xl"}>Login into our website</Heading>
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
                <FormLabel>Username or email</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your username or email"
                  id="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
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
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
