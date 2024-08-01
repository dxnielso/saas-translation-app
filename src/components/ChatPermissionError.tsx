import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

function ChatPermissionError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="size-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex">
        <p className="flex-1">
          No tienes permiso para acceder a este chat <br />
          <span className="font-bold">
            Por favor, pide al administrador que te agregue al chat
          </span>
        </p>

        <Link href="/chat" replace>
          <Button variant="destructive">Descartar</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}

export default ChatPermissionError;
