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
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import LaunchAppButton from "./LaunchAppButton.component";
interface Props {
  children: React.ReactNode;
}

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export default function Nav({ user }: { user: User | null }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { t } = useTranslation();
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
            <Text display={{ base: "inline-block", lg: "none" }} fontWeight={"bold"}>
              {APP_NAME}
            </Text>
          </Box>

          <Flex alignItems={"center"}>
       
            <ThemeToggleButton />
            <Stack direction={"row"} ml={2} spacing={7}>
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
                        {t("global:greetings")}, {user.name}
                      </p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        router.push("/profile");
                      }}
                    >
                      {t("global:profile")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        signOut();
                      }}
                    >
                      {t("global:logout")}
                    </MenuItem>
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
