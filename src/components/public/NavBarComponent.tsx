import User from "@/types/user/User";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import ThemeToggleButton from "./ThemeToggleButton";

interface Props {
  children: React.ReactNode;
}

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export default function Nav({ user }: { user: User | null }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box pt={5} display={"flex"} justifyContent={"center"}>
        <Flex
          bg={useColorModeValue("white", "gray.700")}
          h={16}
          px={4}
          alignItems={"center"}
          justifyContent={"space-between"}
          maxW={"6xl"}
          minW={{ base: "100%", lg: "6xl" }}
          borderRadius={"30px"}
          boxShadow={" rgba(58, 240, 94, 0.5) 0px 10px 36px 0px,rgba(58, 240, 94, 0.5) 0px 0px 0px 1px;"}
        >
          <Box>{APP_NAME}</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <ThemeToggleButton />

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      user && user.image
                        ? user.image
                        : "https://avatars.dicebear.com/api/male/username.svg"
                    }
                  />
                </MenuButton>
                {user && (
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          user.image
                            ? user.image
                            : "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>
                        {user.name} - {user.email}
                      </p>
                    </Center>
                    <br />
                    <MenuDivider />

                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                )}
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
