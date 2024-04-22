import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { signIn } from "next-auth/react";
const GoogleButtonComponent = () => {
  const { t } = useTranslation();
  return (
    <Flex
      gap={5}
      className=" transition duration-150 ease-in-out hover:scale-105 duration-300"
      p={5}
      borderRadius={"20px"}
      cursor={"pointer"}
      shadow={"lg"}
      onClick={() => {
        signIn("google");
      }}
    >
      <Box>
        <Image
          alt="Google Logo Signin"
          width={20}
          height={20}
          src="/img/google.png"
        />
      </Box>
      <Text fontWeight={"bold"}>{t("auth:login_with_google")}</Text>
    </Flex>
  );
};

export default GoogleButtonComponent;
