"use server";

import { authOptions } from "@/auth";
import { adminDb } from "@/firebase-admin";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const generatePortalLink = async () => {
  const session = await getServerSession(authOptions);
  const host = headers().get("host");

  if (!session?.user.id)
    return console.error("No se encontro el Id del usuario");
  const {
    user: { id },
  } = session;

  const returnUrl =
    process.env.NODE_ENV === "development"
      ? `http://${host}/register`
      : `https://${host}/register`;

  const doc = await adminDb.collection("customers").doc(id).get();

  if (!doc.data) {
    return console.error("No se encontro registro de cutomer con el id: ", id);
  }
  const stripeId = doc.data()!.stripeId;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: returnUrl,
  });

  redirect(stripeSession.url);
};
