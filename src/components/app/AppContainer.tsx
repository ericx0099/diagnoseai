import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  maxW?: string;
}
const AppContainer = ({ children, maxW, ...rest }: Props) => {
  return <Container {...rest} maxW={maxW ? maxW : "auto"} >{children}</Container>;
};

export default AppContainer;