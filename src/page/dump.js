return (
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box
        p={8}
        mx="auto"
        maxW="md"
        borderWidth={1}
        borderRadius="lg"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
      >
        <Stack spacing={4} align="center">
          {userData ? (
            <>
              <Avatar
                size="xl"
                name={userData.username}
                src={userData.profilePic}
              />
              <Text fontWeight="bold" fontSize="2xl">
                {userData.username}
              </Text>
              <Text>{userData.bio}</Text>
            </>
          ) : (
            <Text>Loading user profile...</Text>
          )}
          <Divider />
          <Text fontSize="sm" color="gray.500">
            Data retrieved from user profile
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}