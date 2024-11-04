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
import LaunchAppButton from "../app/LaunchAppButton.component";
import { useTranslation } from "react-i18next";

interface Props {
  children: React.ReactNode;
}

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export default function Nav({ user }: { user: User | null }) {
  const {t} = useTranslation();
  return (
    <>
      <Box pt={5} display={"flex"} justifyContent={"center"} zIndex={999999999}> 
        <Flex  zIndex={999999999}
          bg={useColorModeValue("white", "gray.700")}
          h={16}
          px={4}
          alignItems={"center"}
          justifyContent={"space-between"}
          maxW={"6xl"}
          minW={{ base: "100%", lg: "6xl" }}
          borderRadius={"30px"}
          position={"fixed"}
          shadow={"2xl"}
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
          fontWeight={"bold"}
        >
          <Box>{APP_NAME}</Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
            {user && <LaunchAppButton />}
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
                        size={"md"}
                        src={
                          user.image
                            ? user.image
                            : "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <MenuItem>{t('global:profile')}</MenuItem>
              
            
                    <MenuDivider />

                    <MenuItem>{t("global:logout")}</MenuItem>
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
