import User from "@/types/user/User";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useApi from "@/hooks/api/useApi";
interface UserPlanProps {
  user: User;
}

const UserPlan = ({ user }: UserPlanProps) => {
  const { get } = useApi();
  const generateCustomerPortalLink = async () => {
    const response = await get<string>("/payments/portal-link");
    if (response?.success) {
      return response.data;
    }
    return null;
  };

  const handleManageSuscription = async() => {
    const link = await generateCustomerPortalLink();
    if(link){
        return window.open(link,'_self')
    }
    
    alert('Error generating Portal Link')

  }

  return <Button onClick={handleManageSuscription}>Manage suscription</Button>;
};

export default UserPlan;
