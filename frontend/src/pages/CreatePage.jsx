import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useArtworkGallery } from "../store/artwork";


const CreatePage = () => {
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    date: "",
    artist: "",
    image: "",
  });
  const toast = useToast();

  const { createArtwork } = useArtworkGallery();

  const handleAddArtwork = async() => {
    const { success, message } = await createArtwork(newArtwork);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewArtwork({ title: "", date: "", artist: "", image: "" });
  };
  

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Artwork
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} 
        shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder='Artwork Title'
              name='title'
              value={newArtwork.title}
              onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value})}
            /> 

            <Input
              placeholder='Date'
              name='date'
              value={newArtwork.date}
              onChange={(e) => setNewArtwork({ ...newArtwork, date: e.target.value})}
            /> 

            <Input
              placeholder='Artist'
              name='artist'
              value={newArtwork.artist}
              onChange={(e) => setNewArtwork({ ...newArtwork, artist: e.target.value})}
            /> 

            <Input
              placeholder='Image URL'
              name='image'
              value={newArtwork.image}
              onChange={(e) => setNewArtwork({ ...newArtwork, image: e.target.value})}
            /> 

            <Button colorScheme='blue' onClick={handleAddArtwork} w='full'>
              Add Artwork
            </Button>
          </VStack>
        </Box>
      </VStack>
  </Container>
  );
};
export default CreatePage;