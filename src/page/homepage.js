import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  VStack,
  Text,
  Button,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
function Homepage() {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContents = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`http://localhost:3001/contents/view`);
        const newContents = response.data;
        setContents((prevContents) => [...prevContents, ...newContents]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchContents();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box p={4}>
      <Sidebar />
      <VStack spacing={4} align="stretch">
        {contents.map((content) => (
          <Box
            key={content.id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            bg={("white", "gray.700")}
          >
            <Text fontWeight="bold">{content.title}</Text>
            <Text>{content.description}</Text>
          </Box>
        ))}
        {isLoading && <Spinner />}
        {!isLoading && (
          <Button
            onClick={loadMore}
            disabled={isLoading}
            isLoading={isLoading}
            loadingText="Loading..."
          >
            Load More
          </Button>
        )}
      </VStack>
    </Box>
  );
}

export default Homepage;
