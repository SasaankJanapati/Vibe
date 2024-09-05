"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4
            text-white hover:text-black hover:bg-[#58d3f5c2]`,
        active && "bg-[#2ba4c5a6]"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
