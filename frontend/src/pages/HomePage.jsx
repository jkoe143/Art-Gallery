import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useArtworkGallery } from "../store/artwork";
import ArtworkCard from "../components/ArtworkCard";

const HomePage = () => {
	const { fetchArtworks, artworks } = useArtworkGallery();

	useEffect(() => {
		fetchArtworks();
	}, [fetchArtworks]);
	console.log("artworks", artworks);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, pink.400, purple.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
                    Current Artworks ✧
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{artworks.map((artwork) => (
						<ArtworkCard key={artwork._id} artwork={artwork} />
					))}
				</SimpleGrid>

				{artworks.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No artworks found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create an artwork
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;