import React, { ReactNode } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Card,
  Divider,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { BsFillPinMapFill } from "react-icons/bs";
import { BsRobot } from "react-icons/bs";
import { TbHealthRecognition } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import SideBarItem from "./SidebarItem";
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const Sidebar = ({ onClose, ...rest }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = rest;


  const LinkItems = [
    {
      name: t("diagnosis:my_diagnoses"),
      icon: TbHealthRecognition,
      path: "/my-diagnoses",
      keyPath: "my-diagnoses",
      paths: ["/my-diagnoses","/my-diagnoses/[uuid]","/my-diagnoses/[uuid]/answer"]
    },
  ];
  console.log(router.pathname)
  return (
    <Box transition="3s ease"  zIndex={99999999} minW={"10vw"}>
      <Text color={"white"} fontWeight={"bold"} textAlign={"center"} mt={5} display={{base:"none",lg:"inline-block"}}>{APP_NAME}</Text>
      <Box height="100%" mt={{base:24,lg:10}}>
        {LinkItems.map((item, index) => {
          return (
            <SideBarItem
              key={index}
              path={item.path}
              icon={item.icon}
              active={item.paths.includes(router.pathname)}
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
      </Box>
    </Box>
  );
};

export default Sidebar;
