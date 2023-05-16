import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Textarea,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function ProfileEdit() {
  const [userData, setUserData] = useState({});
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data from API
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profile/view", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullname", fullname);
      formData.append("bio", bio);
      formData.append("profile_pic", profilePic);

      const response = await axios.put(
        "http://localhost:3001/profile/edit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      navigate("/profile");
      // Tambahkan logika untuk menangani respon sukses
    } catch (error) {
      console.error(error);
      // Tambahkan logika untuk menangani error
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="userName">
            <FormLabel>Profile Picture</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  src={`/images/profile/${userData.profile_pic}`}
                ></Avatar>
              </Center>
              <Center w="full">
                <input
                  type="file"
                  id="profilePic"
                  accept="image/jpeg,image/png"
                  onChange={handleProfilePicChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder={userData.username}
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="fullname" isRequired>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder={userData.fullname}
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </FormControl>
          <FormControl id="bio" isRequired>
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder={userData.bio}
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
export default ProfileEdit;
