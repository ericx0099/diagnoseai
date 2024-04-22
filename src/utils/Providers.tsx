import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
