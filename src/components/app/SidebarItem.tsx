import NextLink from "next/link";
import { Icon, Flex, Box, Card } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
const SideBarItem = ({ icon, path, children, active, ...rest }: any) => {
  return (
    <NextLink href={path} style={{ textDecoration: "none" }}>
      <Card
        mb={10}
        align="center"
        boxShadow={"none"}
        p="4"
        bg={active ? '' : "brand.100"}
        role="group"
        cursor="pointer"
        className="hover:font-bold transition ease-in-out"
        display={"block"}
        _hover={{
          bg:useColorModeValue("#FFFFFF","#2D3748",)
        }}
        borderLeftRadius={"50"}
        position={"relative"}
        _before={
          active 
            ? {
                content: '""',
                position: "absolute",
                top: "-30px",
                right: "0",
                width: "30px",
                height: "30px",
                background: "brand.100",
                borderRadius: "50%",
                boxShadow: useColorModeValue(
                  "15px 15px 0 #FFFFFF",
                  "15px 15px 0 #2D3748"
                ),
              }
            : {}
        }
        _after={
          active
            ? {
                content: '""',
                position: "absolute",
                bottom: "-30px",
                right: "0",
                width: "30px",
                height: "30px",
                background: "brand.100",
                borderRadius: "50%",
                boxShadow: useColorModeValue(
                  "15px -15px 0 #FFFFFF",
                  "15px -15px 0 #2D3748"
                ),
              }
            : {}
        }
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="26"
            _groupHover={{
              color: "black",
              fontWeight: "bold",
            }}
            as={icon}
          />
        )}
        <Box display={{ base: "none", lg: "inline-block" }} fontWeight={"bold"}>{children}</Box>
      </Card>
    </NextLink>
  );
};
export default SideBarItem;
