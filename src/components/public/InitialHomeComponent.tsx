import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  Image,
  Card,
  Grid
  , CardHeader, CardBody, CardFooter
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BsStars } from "react-icons/bs";
import MainDiagnoseInputComponent from "../prediction/MainDiagnoseInputComponent";

const items = [
  {
    src: "Medicine-bro.svg",
    title: "LOREM",
    description: "",
  },
  {
    src: "health-image-2.png",
    title: "IPSUM",
    description: "",
  },
  {
    src: "health-image-3.png",
    title: "DOLOR",
    description: "",
  },
  {
    src: "health-image-4.png",
    title: "SITAMET",
    description: "",
  },
];
const CardInformation = ({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string;
}) => {
  return (
    <Card shadow={"xl"}>
     <CardBody>
     <Flex justifyContent={"center"}>
     <Image src={src} width={300} />
     </Flex>
     <Stack mt='6' spacing='3'>
      <Heading size='md'>{title}</Heading>
      <Text>
      {description}
      </Text>
    
    </Stack>
     </CardBody>

    </Card>
  );
};
export default function CallToActionWithIllustration() {
  const { t } = useTranslation();
  return (
    <>
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}

        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Get diagnosed{" "}
            <Text as={"span"} color={"#52f716"}>
              with AI <Icon fontSize={45} as={BsStars} />
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            {t("global:homeDescription")}
          </Text>
          <MainDiagnoseInputComponent />
        </Stack>
      </Container>
      <Grid w={"100%"} gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr 1fr" }} gridGap={10} mb={50}>
        {items.map((item, i) => {
          return <CardInformation key={i} {...item} />;
        })}
      </Grid>
    </>
  );
}
