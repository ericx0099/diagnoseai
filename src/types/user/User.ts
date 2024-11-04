import { DefaultUser } from "next-auth";
import { Language } from "../language/language";

interface User extends DefaultUser {
  user_id: number;
  name: string;
  email: string;
  uuid: string;
  active: boolean;
  image: string;
  language: string;
}
export default User;
