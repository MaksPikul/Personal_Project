import Image from "next/image";
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {


  return (

    <main className="flex h-full flex-col items-center justify-center bg-red-700">
      <div className="space-y-6">
        <h1 className="font-semibold text-white"> LorenIpsum </h1>

        <div>
          <LoginButton>
            <Button variant="secondary">
              Sign in
            </Button>
          </LoginButton>

        </div>
      </div>
    </main>

  )
}
