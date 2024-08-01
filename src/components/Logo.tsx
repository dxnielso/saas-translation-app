import LogoImage from "@/images/logos/logo-2.svg";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex justify-center items-center w-56 h-10">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <Image priority src={LogoImage} alt="Logo" className="dark:invert" />
        </AspectRatio>
      </div>
    </Link>
  );
}

export default Logo;
