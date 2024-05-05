import NextLink from "next/link";
import { Icon, Flex, Box } from "@chakra-ui/react";

const SideBarItem = ({ icon, path, children, active, ...rest }: any) => {
  return (
    <NextLink href={path} style={{ textDecoration: "none" }}>
      <Box
        align="center"
        p="4"
        role="group"
        cursor="pointer"
        color={active ? "black" : "white"}
        bg={active ? "white" : "brand.100"}
        className="hover:font-bold transition ease-in-out"
        display={"block"}
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
                boxShadow: "15px 15px 0 white",
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
                boxShadow: "15px -15px 0 white",
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
       <Box display={{base:"none",lg:"inline-block"}}>
       {children}
       </Box>
      </Box>
    </NextLink>
  );
};
export default SideBarItem;
