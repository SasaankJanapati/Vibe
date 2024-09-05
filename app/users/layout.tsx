import Sidebar from "../components/Sidebar";
import { getUsers } from "../actions/getUsers";
import UsersList from "./components/UsersList";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UsersList items={users!} />
        {children}
      </div>
      ;
    </Sidebar>
  );
};
export default UsersLayout;
