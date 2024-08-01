import { TierT } from "@/types";
import PriceCard from "./PriceCard";

const tiers: TierT[] = [
  {
    name: "Estandar",
    id: null,
    href: "#",
    priceMonthly: 0.0,
    description: "Comienza una conversación con cualquier persona, donde sea!",
    features: [
      "20 mensajes limite por chat",
      "2 participantes limite por chat",
      "3 chats limite en la cuenta",
      "Soporte de 2 lenguajes",
    ],
  },
  {
    name: "Pro",
    id: 2,
    href: "#",
    priceMonthly: 49.99,
    description: "Desbloquea la máxima potencia con el plan Pro!",
    features: [
      "Mensajes ilimitados por chat",
      "Participantes ilimitados por chat",
      "Número de chats ilimitados",
      "Soporte de 10 lenguajes",
      "Acceso a caracteristicas futuas antes que nadie",
    ],
  },
];

function PricingCards({ redirect }: { redirect: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:gap-x-10 lg:gap-x-16 sm:grid-cols-2">
      {tiers.map((tier) => (
        <PriceCard key={tier.name} tier={tier} redirect={redirect} />
      ))}
    </div>
  );
}

export default PricingCards;
