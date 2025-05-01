import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button";
import { ModeToggle } from "../common/DarkModeToggle";
import LogoutButton from "../common/LogoutButton";

function Header() {
  const user = 1;
  return (
    <header className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-6"
        style={{
            boxShadow: "0px 2px 5px rgb(126, 217, 87)",
        }}>
        <Link href={"/"} className="flex items-end gap-2">
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
                <Button asChild className="hidden sm:block">
                  <Link href={"/"} >
                    Sign Up
                  </Link>
                </Button>
                <Button asChild variant={"outline"} >
                  <Link href={"/"}>
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