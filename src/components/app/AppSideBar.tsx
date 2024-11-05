import React, { ReactNode } from "react";
import {
  Box,

  Text,

} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

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
      name: t("diagnosis:new_diagnose"),
      icon: IoMdAddCircle,
      path: "/new-diagnose",
      keyPath: "new-diagnose",
      paths: ["/new-diagnose"],
    },
    {
      name: t("diagnosis:my_diagnoses"),
      icon: TbHealthRecognition,
      path: "/my-diagnoses",
      keyPath: "my-diagnoses",
      paths: [
        "/my-diagnoses",
        "/my-diagnoses/[uuid]",
        "/my-diagnoses/[uuid]/answer",
      ],
    },
    {
      name: t("global:profile"),
      icon: FaUserCircle,
      path: "/profile",
      keyPath: "profile",
      paths: [
        "/profile",     
      ],
    },
  ];

  return (
    <Box transition="3s ease" zIndex={99999999} minW={"10vw"}>
      <Text
        color={"white"}
        fontWeight={"bold"}
        textAlign={"center"}
        mt={5}
        display={{ base: "none", lg: "inline-block" }}
      >
        {APP_NAME}
      </Text>
      <Box height="100%" mt={{ base: 24, lg: 10 }}>
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
