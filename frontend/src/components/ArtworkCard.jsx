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
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useArtworkGallery } from "../store/artwork";
import { useState } from "react";

const ArtworkCard = ({ artwork }) => {
	const [updatedArtwork, setUpdatedArtwork] = useState(artwork);
	
	const titleColor = useColorModeValue("gray.700", "gray.200")
	const textColor = useColorModeValue("gray.700", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteArtwork, updateArtwork } = useArtworkGallery();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteArtwork = async (pid) => {
		const { success, message } = await deleteArtwork(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateArtwork = async (pid, updatedArtwork) => {
		const { success, message } = await updateArtwork(pid, updatedArtwork);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Artwork updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
		shadow='lg'
		rounded='lg'
		overflow='hidden'
		transition='all 0.3s'
		_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
		bg={bg}
		w={{lg: "90%" }} 
		mx="auto"
		>
			<Image
			src={artwork.image}
			alt={artwork.title}
			w="full"
			h="auto"
			objectFit="contain"
			/>

			<Box p={4}>
				<Heading as='h2' fontSize='1.5rem' mb={2} color={titleColor}>
					{artwork.title}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={1}>
					Date: {artwork.date}
				</Text>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={3}>
					Artist: {artwork.artist}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteArtwork(artwork._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Artwork</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Artwork Title'
								name='title'
								value={updatedArtwork.title}
								onChange={(e) => setUpdatedArtwork({ ...updatedArtwork, title: e.target.value })}
							/>
							<Input
								placeholder='Date'
								name='date'
								value={updatedArtwork.date}
								onChange={(e) => setUpdatedArtwork({ ...updatedArtwork, date: e.target.value })}
							/>
                            <Input
								placeholder='Artist'
								name='artist'
								value={updatedArtwork.artist}
								onChange={(e) => setUpdatedArtwork({ ...updatedArtwork, artist: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedArtwork.image}
								onChange={(e) => setUpdatedArtwork({ ...updatedArtwork, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateArtwork(artwork._id, updatedArtwork)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default ArtworkCard;