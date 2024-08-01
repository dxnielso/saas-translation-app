// import { authOptions } from "@/auth";
import MainTitle from "@/components/MainTitle";
import PricingCards from "@/components/PricingCards";
// import { getServerSession } from "next-auth";

async function RegisterPage() {
  // const session = await getServerSession(authOptions);
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="pt-20 pb-5 px-8 lg:px-0">
        <MainTitle text="Actualiza tu plan" />
      </div>
      <div className="pb-20 max-w-3xl px-8 xl:px-0 mx-auto">
        <PricingCards redirect={false} />
      </div>
    </main>
  );
}

export default RegisterPage;
