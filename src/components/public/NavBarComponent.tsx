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

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export default function Nav({ user }: { user: User | null }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        px={4}
        mt={5}
        mx={{base:5,md:200}}
        borderRadius={"30px"}
        border={"1px solid #3af05e"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
      
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
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
                    src={user && user.image ? user.image : "https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                {user && (
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={user.image ? user.image : "https://avatars.dicebear.com/api/male/username.svg"}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.name} - {user.email}</p>
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
