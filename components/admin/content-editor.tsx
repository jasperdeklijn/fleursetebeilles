"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Languages } from "lucide-react"

interface ContentSection {
  id: string
  section_key: string
  section_name: string
  content_type: string
}

interface ContentTranslation {
  id: string
  section_id: string
  language_code: string
  content: string
}

const languages = [
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
]

export function ContentEditor() {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [translations, setTranslations] = useState<Record<string, ContentTranslation[]>>({
    nl: [],
    en: [],
    fr: [],
  })
  const [selectedLanguage, setSelectedLanguage] = useState("nl")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    const supabase = createClient()
    setIsLoading(true)

    try {
      const { data: sectionsData, error: sectionsError } = await supabase
        .from("content_sections")
        .select("*")
        .order("section_name")

      if (sectionsError) throw sectionsError

      const { data: translationsData, error: translationsError } = await supabase
        .from("content_translations")
        .select("*")

      if (translationsError) throw translationsError

      setSections(sectionsData || [])

      const translationsByLanguage: Record<string, ContentTranslation[]> = {
        nl: [],
        en: [],
        fr: [],
      }

      translationsData?.forEach((translation) => {
        if (translationsByLanguage[translation.language_code]) {
          translationsByLanguage[translation.language_code].push(translation)
        }
      })

      setTranslations(translationsByLanguage)
    } catch (error) {
      console.error("Error loading content:", error)
      toast({
        title: "Error",
        description: "Failed to load content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateTranslation = (sectionId: string, content: string, langCode: string) => {
    setTranslations((prev) => {
      const langTranslations = prev[langCode] || []
      const existing = langTranslations.find((t) => t.section_id === sectionId && t.language_code === langCode)

      if (existing) {
        return {
          ...prev,
          [langCode]: langTranslations.map((t) => (t.id === existing.id ? { ...t, content } : t)),
        }
      } else {
        const newTranslation: ContentTranslation = {
          id: `temp-${Date.now()}-${langCode}`,
          section_id: sectionId,
          language_code: langCode,
          content,
        }
        return {
          ...prev,
          [langCode]: [...langTranslations, newTranslation],
        }
      }
    })
  }

  const saveContent = async () => {
    const supabase = createClient()
    setIsSaving(true)

    try {
      const allTranslations = Object.values(translations).flat()

      for (const translation of allTranslations) {
        if (translation.id.startsWith("temp-")) {
          const { error } = await supabase.from("content_translations").insert({
            section_id: translation.section_id,
            language_code: translation.language_code,
            content: translation.content,
          })
          if (error) throw error
        } else {
          const { error } = await supabase
            .from("content_translations")
            .update({ content: translation.content })
            .eq("id", translation.id)
          if (error) throw error
        }
      }

      toast({
        title: "Success",
        description: "Content updated successfully!",
      })

      await loadContent()
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getTranslationContent = (sectionId: string, langCode: string) => {
    const langTranslations = translations[langCode] || []
    const translation = langTranslations.find((t) => t.section_id === sectionId && t.language_code === langCode)
    return translation?.content || ""
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading content...</span>
      </div>
    )
  }

  const renderContentFields = (langCode: string) => {
    return (
      <div className="grid gap-4">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="text-lg">{section.section_name}</CardTitle>
              <p className="text-sm text-muted-foreground">Key: {section.section_key}</p>
            </CardHeader>
            <CardContent>
              {section.content_type === "rich_text" ? (
                <div>
                  <Label htmlFor={`${section.id}-${langCode}`}>Content</Label>
                  <Textarea
                    id={`${section.id}-${langCode}`}
                    value={getTranslationContent(section.id, langCode)}
                    onChange={(e) => updateTranslation(section.id, e.target.value, langCode)}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor={`${section.id}-${langCode}`}>Content</Label>
                  <Input
                    id={`${section.id}-${langCode}`}
                    value={getTranslationContent(section.id, langCode)}
                    onChange={(e) => updateTranslation(section.id, e.target.value, langCode)}
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          <div>
            <h3 className="text-lg font-semibold">Multi-Language Content</h3>
            <p className="text-sm text-muted-foreground">Edit content for all languages</p>
          </div>
        </div>

        <Button onClick={saveContent} disabled={isSaving}>
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          {languages.map((lang) => (
            <TabsTrigger key={lang.code} value={lang.code} className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map((lang) => (
          <TabsContent key={lang.code} value={lang.code}>
            {renderContentFields(lang.code)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
