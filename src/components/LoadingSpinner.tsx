import Spinner from "@/images/svg/spinner.svg";
import Image from "next/image";

function LoadingSpinner() {
  return (
    <figure className="w-full grid place-content-center">
      <Image src={Spinner} alt="Spinner" width={25} height={25} />
    </figure>
  );
}

export default LoadingSpinner;
