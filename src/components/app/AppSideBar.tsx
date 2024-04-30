import React, { ReactNode } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Card,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { BsFillPinMapFill } from "react-icons/bs";
import { BsRobot } from "react-icons/bs";
import { GiMoneyStack, GiArtificialIntelligence } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import SideBarItem from "./SidebarItem";
const Sidebar = ({ onClose, ...rest }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = rest;

  const LinkItems = [
    {
      name: t("app:my_diagnoses"),
      icon: BsRobot,
      path: "/my-diagnoses",
      keyPath: "my-diagnoses",
    },
  ];

  return (
    <Box
      transition="3s ease"
      pos="fixed"
      h="90vh"
      {...rest}
      paddingBottom={25}
      display={"flex"}
      zIndex={99999999}
    >
      <Card borderRadius={30} shadow={"xl"} boxShadow={" rgba(58, 240, 94, 0.5) 0px 5px 36px 0px,rgba(58, 240, 94, 0.5) 0px 0px 0px 1px;"}>

        {LinkItems.map((item, index) => {
          return (
            <SideBarItem
              key={index}
              path={item.path}
              icon={item.icon}
              color={"black"}
              bg={"white"}
            >
              {item.name}
            </SideBarItem>
          );
        })}
        {user && user.role == "admin" && (
          <SideBarItem key={"users"} path={"/users"} icon={FaUserAlt}>
            Users
          </SideBarItem>
        )}
      </Card>
    </Box>
  );
};

export default Sidebar;
