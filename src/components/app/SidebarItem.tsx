
import NextLink from "next/link";
import { Icon, Flex } from "@chakra-ui/react";

const SideBarItem = ({ icon, path, children, ...rest }: any) => {
    return (
      <NextLink
        href={path}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "#00BFFF",
            color: "white",
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
        </Flex>
      </NextLink>
    );
  };
  export default SideBarItem;