import User from "@/types/user/User";
import ThemeToggleButton from "../public/ThemeToggleButton";
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
  Divider,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export default function Nav({ user }: { user: User | null }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Box>
            <Text display={{base:"inline-block",lg:"none"}}>{APP_NAME}</Text>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
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
      <Divider />
    </>
  );
}
