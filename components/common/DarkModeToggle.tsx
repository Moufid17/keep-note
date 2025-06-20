"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import useIsClient from "@/hooks/useIsClient"

export function ModeToggle() {
  const isMounted = useIsClient()
  const { theme, setTheme } = useTheme()

  if (!isMounted) return null

  return (
    <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? ( <Sun/> ) : ( <Moon /> )}
    </Button>
  )
}