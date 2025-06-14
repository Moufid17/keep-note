import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button";
import { ModeToggle } from "../common/DarkModeToggle";
import LogoutButton from "../common/LogoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "../ui/sidebar";

export default async function Header() {
  const user = await getUser();
  return (
    <header className={`relative flex justify-center h-24 w-full`}>
      <div className="absolute flex h-20 mt-4 w-full items-center justify-between px-3 sm:px-6 rounded-2xl border gap-2">
        <div className="flex items-center gap-4">
          {user && (<div><SidebarTrigger className="h-full"/></div>)}
          <div>
            <Link href={"/"} className="flex items-center gap-2">
            <Image src={"/app.svg"} width={60} height={60} alt="logo" priority className="rounded-full" />
            <h1 className="hidden md:visible md:flex flex-col pb-1 text-2xl font-semibold leading-6">
              Keep <span>Notes</span>
            </h1>
          </Link>
          </div>
        </div>
        <div className="flex gap-4">
          {user ? (
            <LogoutButton />
          ) : (
                <>
                  <Button asChild className="sm:block">
                    <Link href={"/sign-up"} >
                      Sign Up
                    </Link>
                  </Button>
                  <Button asChild variant="outline" >
                    <Link href={"/login"}>
                      Login
                    </Link>
                  </Button>
                </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
