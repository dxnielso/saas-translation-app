"use client";

import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function UpgradeBanner() {
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isPro = subscription?.role == "pro";
  const router = useRouter();

  if (subscription === undefined || isPro) return null;
  return (
    <Button
      onClick={() => router.push("/register")}
      className="w-full rounded-none bg-gradient-to-r from-[#7775D6] to-[#E935C1] text-center text-white px-5 py-2 hover:shadow-md hover:opacity-75 transition-all"
    >
      Actualiza a Pro y disfruta de todos los benficios!
    </Button>
  );
}

export default UpgradeBanner;
