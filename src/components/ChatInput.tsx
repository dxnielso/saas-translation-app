"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, Form, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  limitedMessagesRef,
  messagesRef,
  User,
} from "@/lib/converters/Message";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const formSchema = z.object({
  input: z.string().max(1000),
});

function ChatInput({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const inputCopy = values.input.trim();
    form.reset();
    if (inputCopy.length === 0) return;
    if (!session?.user) return;

    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && messages >= 20) {
      toast({
        title: "Limite de mensajes",
        description:
          "Límite de 20 mensajes alcanzado. Si deseas seguir utilizando el chat, puedes contratar un plan Pro.",
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

    const userToStore: User = {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };

    addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore,
    });
  };
  return (
    <div className="sticky bottom-0 right-0 left-0 bg-gray-50 dark:bg-gray-900">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 mb-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Escribe un mensaje en cualquier idioma"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-violet-600 text-white">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChatInput;
