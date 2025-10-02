"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

const languages = [
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
]

export function LanguageSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentLang = searchParams.get("lang") || "nl"

  const handleLanguageChange = (langCode: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    if (langCode === "nl") {
      params.delete("lang")
    } else {
      params.set("lang", langCode)
    }
    const query = params.toString()
    router.push(query ? `/?${query}` : "/")
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-white" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant="ghost"
            size="sm"
            onClick={() => handleLanguageChange(lang.code)}
            className={`text-white hover:bg-white/20 ${
              currentLang === lang.code ? "bg-white/20 font-bold" : ""
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.code.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  )
}
