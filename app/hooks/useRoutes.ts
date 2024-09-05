import { useMemo } from "react";
import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { HiUsers, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { HiChat } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  // const router = useRouter();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => {
          signOut();
          // router.replace("/");
        },
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
