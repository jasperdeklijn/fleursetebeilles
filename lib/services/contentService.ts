import { createClient } from "@/lib/supabase/server"
import { fallbackContent } from "@/lib/constants/fallbacks"

export async function getContent(language = "en") {
  try {
    const supabase = await createClient()

    const { data: translations, error } = await supabase
      .from("content_translations")
      .select(`
        content,
        content_sections!inner(section_key)
      `)
      .eq("language_code", language)

    if (error) {
      console.error("Error fetching content:", error.message)
      return fallbackContent[language as keyof typeof fallbackContent] || fallbackContent.en
    }

    const contentMap: Record<string, string> = {}
    translations?.forEach((translation: any) => {
      contentMap[translation.content_sections.section_key] = translation.content
    })

    return contentMap
  } catch (error) {
    console.error("Error in getContent:", error)
    return fallbackContent[language as keyof typeof fallbackContent] || fallbackContent.en
  }
}
