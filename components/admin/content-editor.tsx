"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save } from "lucide-react"

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
  { code: "en", name: "English" },
  { code: "nl", name: "Nederlands" },
  { code: "fr", name: "Français" },
]

export function ContentEditor() {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [translations, setTranslations] = useState<ContentTranslation[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
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
      // Load sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from("content_sections")
        .select("*")
        .order("section_name")

      if (sectionsError) throw sectionsError

      // Load translations
      const { data: translationsData, error: translationsError } = await supabase
        .from("content_translations")
        .select("*")

      if (translationsError) throw translationsError

      setSections(sectionsData || [])
      setTranslations(translationsData || [])
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

  const updateTranslation = (sectionId: string, content: string) => {
    setTranslations((prev) => {
      const existing = prev.find((t) => t.section_id === sectionId && t.language_code === selectedLanguage)

      if (existing) {
        return prev.map((t) => (t.id === existing.id ? { ...t, content } : t))
      } else {
        // Create new translation
        const newTranslation: ContentTranslation = {
          id: `temp-${Date.now()}`,
          section_id: sectionId,
          language_code: selectedLanguage,
          content,
        }
        return [...prev, newTranslation]
      }
    })
  }

  const saveContent = async () => {
    const supabase = createClient()
    setIsSaving(true)

    try {
      // Update existing translations and insert new ones
      for (const translation of translations) {
        if (translation.id.startsWith("temp-")) {
          // Insert new translation
          const { error } = await supabase.from("content_translations").insert({
            section_id: translation.section_id,
            language_code: translation.language_code,
            content: translation.content,
          })
          if (error) throw error
        } else {
          // Update existing translation
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

      // Reload content to get fresh IDs
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

  const getTranslationContent = (sectionId: string) => {
    const translation = translations.find((t) => t.section_id === sectionId && t.language_code === selectedLanguage)
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

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="flex justify-between items-center">
        <div>
          <Label htmlFor="language">Select Language</Label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={saveContent} disabled={isSaving}>
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Content Sections */}
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
                  <Label htmlFor={section.id}>Content</Label>
                  <Textarea
                    id={section.id}
                    value={getTranslationContent(section.id)}
                    onChange={(e) => updateTranslation(section.id, e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor={section.id}>Content</Label>
                  <Input
                    id={section.id}
                    value={getTranslationContent(section.id)}
                    onChange={(e) => updateTranslation(section.id, e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
