"use client";

import { Button } from "@/components/ui/button";
import { useSubscriptionStore } from "@/store/store";
import { MessageSquarePlusIcon, ReceiptRussianRubleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import {
  addChatRef,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/ChatMembers";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { ToastAction } from "./ui/toast";

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setLoading(true);
    toast({
      title: "Creando nuevo chat",
      description: "Estamos creando un nuevo chat para ti.",
      duration: 3000,
    });

    // revisamos si el usuario tiene un plan pro para no limitarlo a la creacion de un chat
    const noOfChats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && noOfChats >= 3) {
      toast({
        title: "Limite de Chats",
        description:
          "No puedes crear más de 3 chats. Debes suscribirte a un plan PRO para crear más chats.",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Actualizar"
            onClick={() => router.push("/register")}
          >
            Actualizar a Pro
          </ToastAction>
        ),
      });
      return;
    }

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Chat creado",
          description: "Tu nuevo chat fue creado",
          className: "bg-green-600 text-white",
          duration: 3000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Ocurrio un error al intentar crear el chat",
          variant: "destructive",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });

    router.push("/chat/abc");
  };

  if (isLarge) {
    return (
      <div>
        <Button variant="default" onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : "Crear nuevo chat"}
        </Button>
      </div>
    );
  }
  return (
    <Button onClick={createNewChat} variant={"ghost"}>
      <MessageSquarePlusIcon className="text-black dark:text-white" />
    </Button>
  );
}

export default CreateChatButton;
