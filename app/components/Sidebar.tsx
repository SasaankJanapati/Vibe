import { getCurrentUser } from "../actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-[97vh] flex">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="h-full flex-1">{children}</main>
    </div>
  );
};
export default Sidebar;
