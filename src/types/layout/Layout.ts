import User from "../user/User"
interface PublicLayoutProps  {
    user: User | null;
    children: JSX.Element[] | JSX.Element
}

export default PublicLayoutProps;