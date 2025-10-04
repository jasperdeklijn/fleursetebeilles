"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
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
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (langCode: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    if (langCode === "nl") {
      params.delete("lang")
    } else {
      params.set("lang", langCode)
    }
    const query = params.toString()
    router.push(query ? `/?${query}` : "/")
    setOpen(false)
  }

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center text-white p-2 rounded hover:bg-white/20 transition"
      >
        <Globe className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-black/80 backdrop-blur-md text-white rounded-lg shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/20 transition ${
                currentLang === lang.code ? "bg-white/20 font-bold" : ""
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
