import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Stack,
  Divider,
  useColorModeValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";

function UserProfilePage() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user profile data from API
    const fetchUserProfile = async () => {
      const response = await axios.get("http://localhost:3001/profile/view", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(response.data.user);
      console.log(response.data.result);
    };

    fetchUserProfile();
  }, []);
  console.log(userData.profile_pic);
  return (
    <Box maxW="800px" mx="auto" mt={10} p={4}>
      <Box mb={6} textAlign="center">
        <Avatar
          size="2xl"
          name="Test"
          src={`/images/profile/${userData.profile_pic}`}
        />
        <Text mt={4} fontSize="2xl">
          {userData.fullname}
        </Text>
        <Text mt={2} color="gray.600">
          {userData.username}
        </Text>
      </Box>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Box borderWidth="1px" borderRadius="md" overflow="hidden">
            <img src="https://via.placeholder.com/600x600" alt="Post" />
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box borderWidth="1px" borderRadius="md" overflow="hidden">
            <img src="https://via.placeholder.com/300x300" alt="Post" />
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box borderWidth="1px" borderRadius="md" overflow="hidden">
            <img src="https://via.placeholder.com/300x300" alt="Post" />
          </Box>
        </GridItem>
        {/* Add more posts here */}
      </Grid>
    </Box>
  );
}
export default UserProfilePage;
