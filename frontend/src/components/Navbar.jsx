import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textGradient = useColorModeValue(
    "linear(to-r, pink.400, purple.500)",
    "linear(to-r, rgb(197, 161, 68), rgb(153, 108, 44))"
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "35" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={textGradient}
          bgClip={"text"}
          _hover={{
            transform: 'scale(1.1)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Link to={"/"}>༺Art Gallery༻</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"} display={{ base: "none", sm: "flex" }}>
          <Link to={"/create"}>
            <Tooltip label="Create New Artwork" placement="bottom">
              <Button>
                <PlusSquareIcon fontSize={20} />
              </Button>
            </Tooltip>
          </Link>

          <Tooltip label={`Switch to ${colorMode === "light" ? "Dark" : "Light"} Mode`} placement="bottom">
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
            </Button>
          </Tooltip>
        </HStack>
      </Flex>

      {showButton && (
        <Button
          position="fixed"
          bottom={4}
          right={4}
          onClick={scrollToTop}
          colorScheme="blue"
        >
          <ArrowUpIcon />
        </Button>
      )}
    </Container>
  );
};

export default Navbar;

