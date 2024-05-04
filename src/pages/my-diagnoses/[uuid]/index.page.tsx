
export default function DiagnosePage(){
    return <p>main diagnose page</p>
}



import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
  } from "next";
  
  import { getServerSession } from "next-auth/next";
  import { authOptions } from "@/pages/api/auth/[...nextauth].page";
  import User from "@/types/user/User";
  
  export const getServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    let user = null;
    if (!session || !session.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    user = session.user;
    const {
      query: { uuid },
    } = context;
  
    return {
      props: { user, uuid },
    };
  };
  