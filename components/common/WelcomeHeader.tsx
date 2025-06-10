import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button";
import { ModeToggle } from "../common/DarkModeToggle";
import LogoutButton from "../common/LogoutButton";
import { getUser } from "@/auth/server";

async function WelcomeHeader() {
  const user = await getUser();
  return (
    <header className="relative flex justify-center h-24 w-full mx-auto">
      <div className="absolute z-2 flex gap-2 h-20 mt-4 sm:w-full md:w-[90%] items-center justify-between px-3 sm:px-6 rounded-2xl border bg-background shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
        <div className="flex items-center">
          <div>
            <Link href={"/"} className="flex items-center gap-2">
              <Image src={"/app.svg"} width={60} height={60} alt="logo" priority className="rounded-full" />
              <h1 className="hidden md:visible md:flex flex-col pb-1 text-2xl font-semibold leading-6">
                Keep <span>Notes</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          {user ? (
            <>
              <Button asChild size={"sm"}>
                <Link href={"/notes"} >
                  Dashboard
                </Link>
              </Button>
              <LogoutButton />
            </>
          ) : (
                <>
                  <Button asChild size={"sm"}>
                    <Link href={"/sign-up"} >
                      Sign Up
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size={"sm"}>
                    <Link href={"/login"}>
                      Login
                    </Link>
                  </Button>
                </>
          )}
          <ModeToggle/>
        </div>
      </div>
    </header>
  )
}

export default WelcomeHeader