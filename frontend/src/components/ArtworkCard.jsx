import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	Text,
	Tooltip,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useArtworkGallery } from "../gallery/artwork";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ArtworkCard = ({ artwork }) => {
	const [updatedArtwork, setUpdatedArtwork] = useState(artwork);
	const [isLiked, setIsLiked] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	const titleColor = useColorModeValue("gray.700", "gray.200");
	const textColor = useColorModeValue("gray.700", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("rgb(146, 120, 196)", "rgb(197, 161, 68)");

	const { deleteArtwork, updateArtwork } = useArtworkGallery();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteArtwork = async (pid) => {
		const { success, message } = await deleteArtwork(pid);
		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleUpdateArtwork = async (pid, updatedArtwork) => {
		const { success, message } = await updateArtwork(pid, updatedArtwork);
		onClose();
		toast({
			title: success ? "Success" : "Error",
			description: success ? "Artwork updated successfully" : message,
			status: success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-7px)", shadow: "xl" }}
			bg={bg}
			border="2px"
			borderColor={borderColor}
			w={{ lg: "90%" }}
			mx="auto"
		>
			<Skeleton isLoaded={imageLoaded}>
				<Image
					src={artwork.image}
					alt={artwork.title}
					onLoad={() => setImageLoaded(true)}
					borderRadius="md"
					shadow="md"
					border="4px"
					borderColor={borderColor}
					w="full"
					h="auto"
					objectFit="contain"
				/>
			</Skeleton>

			<Box p={4}>
				<Heading as="h2" fontSize="1.5rem" mb={2} color={titleColor}>
					{artwork.title}
				</Heading>

				<Text fontWeight="bold" fontSize="xl" color={textColor} mb={1}>
					Date: {artwork.date}
				</Text>

				<Text fontWeight="bold" fontSize="xl" color={textColor} mb={3}>
					Artist: {artwork.artist}
				</Text>

				<HStack spacing={2} justify="space-between">
					<HStack spacing={2}>
						<Tooltip label="Edit this artwork">
							<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
						</Tooltip>
						<Tooltip label="Delete this artwork">
							<IconButton
								icon={<DeleteIcon />}
								onClick={() => handleDeleteArtwork(artwork._id)}
								colorScheme="red"
							/>
						</Tooltip>
					</HStack>
					<Tooltip label={isLiked ? "Unlike this artwork" : "Like this artwork"}>
						<IconButton
							icon={isLiked ? <FaHeart /> : <FaRegHeart />}
							onClick={() => setIsLiked(!isLiked)}
							colorScheme={isLiked ? "red" : "gray"}
						/>
					</Tooltip>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose} motionPreset="scale">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Artwork</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder="Artwork Title"
								name="title"
								value={updatedArtwork.title}
								onChange={(e) =>
									setUpdatedArtwork({ ...updatedArtwork, title: e.target.value })
								}
							/>
							<Input
								placeholder="Date"
								name="date"
								value={updatedArtwork.date}
								onChange={(e) =>
									setUpdatedArtwork({ ...updatedArtwork, date: e.target.value })
								}
							/>
							<Input
								placeholder="Artist"
								name="artist"
								value={updatedArtwork.artist}
								onChange={(e) =>
									setUpdatedArtwork({ ...updatedArtwork, artist: e.target.value })
								}
							/>
							<Input
								placeholder="Image URL"
								name="image"
								value={updatedArtwork.image}
								onChange={(e) =>
									setUpdatedArtwork({ ...updatedArtwork, image: e.target.value })
								}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => handleUpdateArtwork(artwork._id, updatedArtwork)}
						>
							Update
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default ArtworkCard;
