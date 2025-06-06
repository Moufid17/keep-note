import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button";
import { ModeToggle } from "../common/DarkModeToggle";
import LogoutButton from "../common/LogoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "../ui/sidebar";

async function Header() {
  const user = await getUser();
  return (
    <header className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-6 shadow-header-brand-400">
      <Link href={"/"} className="flex items-center gap-2">
        {user && (<SidebarTrigger />)}
        <Image src={"/app.svg"} width={60} height={60} alt="logo" priority className="rounded-full" />
        <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
          Keep <span>Notes</span>
        </h1>
      </Link>
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
    </header>
  )
}

export default Header