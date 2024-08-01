import { TierT } from "@/types";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

function PriceCard({ tier, redirect }: { tier: TierT; redirect: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg bg-gray-900 dark:bg-white ">
      {/* top */}
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="flex justify-center">
          <span className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide uppercase rounded-full text-gray-50 dark:text-gray-900">
            {tier.name}
          </span>
        </div>
        <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none text-white dark:text-gray-900">
          ${tier.priceMonthly}
          <span className="pt-8 ml-1 text-xl font-medium leading-8 text-gray-90 dark:text-gray-400">
            /mes
          </span>
        </div>
      </div>
      {/* bottom */}
      <div className="px-6 pt-6 pb-8 h-full sm:p-10 sm:pt-6">
        {/* features list */}
        <ul>
          {tier.features.map((feature, i) => (
            <li className="flex items-start mt-4" key={i}>
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-green-500"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="ml-3 text-base leading-6 text-white dark:text-gray-900">
                {feature}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-md shadow">
          {redirect ? (
            <Link
              href="/register"
              className="flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
            >
              Comprar Plan
            </Link>
          ) : (
            tier.id && <CheckoutButton />
          )}
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
