import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="border-b bg-darkBackground border-button-background py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <HomeIcon className="w-6 h-6 text-lightBlue" />
            <Image
              src="/logo2.png"
              alt="Pixel X Logo"
              width={120}
              height={40}
              priority
            />
          </div>
        </Link>
      </div>
    </header>
  );
};
