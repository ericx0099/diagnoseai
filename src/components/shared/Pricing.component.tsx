import User from "@/types/user/User";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  FormLabel,
  Switch,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import useApi from "@/hooks/api/useApi";
import AuthPopupComponent from "../auth/AuthPopupComponent";
interface Props {
  children: React.ReactNode;
}

function PriceWrapper(props: Props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function ThreeTierPricing({user} : {user: User | null}) {
  const [mode, setMode] = useState("/month");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSwitchChange = (event: any) => {
    setMode(event.target.checked ? "/year" : "/month"); // Cambia el valor de acuerdo al estado del switch
  };
  const { t } = useTranslation();
  const {post} =  useApi();
  const router = useRouter();
  const plans = [
    {
        link:
          process.env.NODE_ENV == "development"
            ? "https://buy.stripe.com/test_3csg0Hag6cpp5kQ5kn"
            : "price_1QHUTMDeIPgDAIz9aZIRaABD",
        priceId: "price_1QHUhLDeIPgDAIz9Kb2asLgG",
        price: 4.95,
        duration: "/month",
        duration_translation: t("plans:month"),
        name: "Mini",
        pros: [t("plans:5_diagnoses_month"), t('plans:20_ai_tokens'),t("plans:xat_amb_ia")],
        popular: false
      },
    {
      link:
        process.env.NODE_ENV == "development"
          ? "https://buy.stripe.com/test_dR629Rcoe755fZu3ce"
          : "price_1QHUTMDeIPgDAIz9aZIRaABD",
      priceId: "price_1QHUTMDeIPgDAIz9aZIRaABD",
      price: 9.95,
      duration: "/month",
      duration_translation: t("plans:month"),
      name: "Basic",
      pros: [t("plans:20_diagnoses_month"), t('plans:50_ai_tokens'),t("plans:xat_amb_ia")],
      popular: true
    },
    {
        link:
          process.env.NODE_ENV == "development"
            ? "https://buy.stripe.com/test_dR66q70FwahheVq9AE"
            : "price_1QHUTMDeIPgDAIz9aZIRaABD",
        priceId: "price_1QHUl2DeIPgDAIz9TQgsxvl0",
        price: 19.95,
        duration: "/month",
        duration_translation: t("plans:month"),
        name: "Pro",
        pros: [t("plans:50_diagnoses_month"), t('plans:150_ai_tokens'),t("plans:xat_amb_ia")],
        popular: false
      },
      {
        link:
          process.env.NODE_ENV == "development"
            ? "https://buy.stripe.com/test_bIY8yfbkaahh14A3ch"
            : "price_1QHUTMDeIPgDAIz9aZIRaABD",
        priceId: "price_1QHUnbDeIPgDAIz9KV5AwRqE",
        price: 34.95,
        duration: "/month",
        duration_translation: t("plans:month"),
        name: "Master",
        pros: [t("plans:200_diagnoses_month"), t('plans:500_ai_tokens'),t("plans:xat_amb_ia")],
        popular: false
      },
    /*{
      link:
        process.env.NODE_ENV == "development"
          ? "https://buy.stripe.com/test_5kA8yfgEu899aFafYZ"
          : "",
      priceId:
        process.env.NODE_ENV == "development"
          ? "price_1QGP20DeIPgDAIz9h02v5LU1"
          : "",
      price: 49.5,
      duration: "/year",
      duration_translation: t("plans:year"),
      name: "Basic",
      pros: [t("plans:20_diagnoses_month"), t("plans:xat_amb_ia")],
    }, */
  ];
  const createCheckoutSession = async (priceId:string) => {
    const result = await post<string>("/payments/create-checkout-session",{priceId, email: user?.email})
    if(result?.success){
        router.push(result.data);
    }
  }
  return (
    <Box py={12}>
        
      <AuthPopupComponent isOpen={isOpen} onClose={onClose} />
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Start with 14-day free trial. No credit card needed. Cancel at
          anytime.
        </Text>
        {/*<Flex>
          {" "}
          <FormLabel htmlFor="isDisabled">{t("plans:pay_annually")}</FormLabel>
          <Switch id="isDisabled" onChange={handleSwitchChange} />
        </Flex> */}
      </VStack>

      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        {plans.map((plan) => {
          if (plan.duration != mode) {
            return <></>;
          }

          return (
            <PriceWrapper>
              <Box position="relative">
                <Box
                  position="absolute"
                  top="-16px"
                  left="50%"
                  style={{ transform: "translate(-50%)" }}
                >
                    {
                        plan.popular && (
                            <Text
                            textTransform="uppercase"
                            bg={useColorModeValue("brand.300", "brand.700")}
                            px={3}
                            py={1}
                            color={useColorModeValue("gray.900", "gray.300")}
                            fontSize="sm"
                            fontWeight="600"
                            rounded="xl"
                          >
                            {t("plans:most_popular")}
                          </Text>
                        )
                    }
               
                </Box>
                <Box py={4} px={12}>
                  <Text fontWeight="500" fontSize="2xl">
                    {plan.name}
                  </Text>
                  <HStack justifyContent="center">
                    <Text fontSize="3xl" fontWeight="600">
                      €
                    </Text>
                    <Text fontSize="5xl" fontWeight="900">
                      {plan.price}
                    </Text>
                    <Text fontSize="3xl" color="gray.500">
                      {plan.duration_translation}
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  bg={useColorModeValue("gray.50", "gray.700")}
                  py={4}
                  borderBottomRadius={"xl"}
                >
                  <List spacing={3} textAlign="start" px={12}>
                    {plan.pros.map((pro) => (
                      <ListItem>
                        <ListIcon as={FaCheckCircle} color="green.500" />
                        {pro}
                      </ListItem>
                    ))}
                  </List>
                  <Box w="80%" pt={7}>
                    <Button w="full" colorScheme="green"
                    onClick={() => {
                        user ? createCheckoutSession(plan.priceId)
                        : onOpen()
                    }}
                    >
                      {t("plans:start")}
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </PriceWrapper>
          );
        })}
      </Stack>
    </Box>
  );
}
