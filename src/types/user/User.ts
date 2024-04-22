import { DefaultUser } from "next-auth";

interface User extends DefaultUser {
  user_id: number;
  name: string;
  email: string;
  uuid: string;
  active: boolean;
}
export default User;
