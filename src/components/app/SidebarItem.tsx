import NextLink from "next/link";
import { Icon, Flex, Box } from "@chakra-ui/react";

const SideBarItem = ({ icon, path, children, ...rest }: any) => {
  return (
    <NextLink href={path} style={{ textDecoration: "none" }}>
      <Box
        align="center"
        p="4"
        role="group"
        cursor="pointer"
        color="black"
        bg={"#F8F8F8"}
        display={"block"}
        borderLeftRadius={"50"}
        position={"relative"}
        _before={{
          content: '""',
          position: "absolute",
          top: "-30px",
          right: "0",
          width: "30px",
          height: "30px",
          background: "brand.100",
          borderRadius: "50%",
          boxShadow: "15px 15px 0 #F8F8F8",
        }}
        _after={{
          content: '""',
          position: "absolute",
          bottom: "-30px",
          right: "0",
          width: "30px",
          height: "30px",
          background: "brand.100",
          borderRadius: "50%",
          boxShadow: "15px -15px 0 #F8F8F8",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Box>
    </NextLink>
  );
};
export default SideBarItem;
