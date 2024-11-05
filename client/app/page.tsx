import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen grid place-items-center">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-primary">Welcome to ChatBox</h1>
        <p>
          ChatBox is a chat application that allows you to chat with your
          friends and family.
        </p>

        <div className="w-[350px] grid grid-cols-2 gap-3 mx-auto">
          <Button>
            <Link href={"/register"}>Create account</Link>
          </Button>

          <Button variant={"secondary"}>
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
