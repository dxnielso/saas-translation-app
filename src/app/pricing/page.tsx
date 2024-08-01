import MainParagraph from "@/components/MainParagraph";
import MainTitle from "@/components/MainTitle";
import PricingCards from "@/components/PricingCards";

function PricingPage() {
  return (
    <main className="flex flex-col ">
      {/* hero */}
      <div className="bg-gray-50 dark:bg-gray-900 ">
        <div className="py-20 px-8 max-w-6xl mx-auto">
          <MainTitle text="El precio justo para ti seas quien seas" />
          <MainParagraph
            text="Estamos 99% seguros que tenemos un plan que cubra con el"
            highlight="100% de tus necesidades."
          />
        </div>
      </div>

      {/* pricing */}
      <div className="bg-gray-800 dark:bg-gray-50">
        <div className="pb-20 px-8 xl:px-0 max-w-3xl mx-auto">
          <div className="relative -top-16">
            <PricingCards redirect={true} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default PricingPage;
