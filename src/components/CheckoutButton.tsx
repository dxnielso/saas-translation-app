"use client";

import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton";

function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isLoadingSubscription = subscription === undefined;
  const isSubscribed =
    subscription?.status === "active" && subscription?.role === "pro";

  const createCheckoutSession = async () => {
    if (!session?.user.id) return;

    // put a document into direbase db
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1PiPH6RwUfirJQYHKvJyEeeY",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    //  ... stripe will create a checkout session
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`Ocurrio un error: ${error.message}`);
        setLoading(false);
      }

      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    });
    // redirect user to checkout session
  };

  return (
    <div>
      {/* If suscribed show me the user is suscribed */}
      {isSubscribed && (
        <>
          <hr className="mt-3" />
          <p className="py-3 text-center font-medium text-xs text-indigo-600">
            Estas suscrito a Pro
          </p>
        </>
      )}

      <button
        type="button"
        onClick={() => createCheckoutSession()}
        className="w-full rounded-md shadow flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent hover:bg-indigo-500 focus:outline-none focus:shadow-outline
    focus:shadow-outline"
      >
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={() => createCheckoutSession()}>Comprar Plan</button>
        )}
      </button>
    </div>
  );
}

export default CheckoutButton;
