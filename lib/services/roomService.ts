import { createClient } from "@/lib/supabase/server"
import { Room } from "@/lib/types/room"
import { fallbackRoom } from "@/lib/constants/fallbacks"

export async function getRoomInfo(): Promise<Room> {
  try {
    const supabase = await createClient()

    const { data: property, error } = await supabase
      .from("rooms")
      .select("*")
      .maybeSingle<Room>()

    if (error) throw error

    return property || fallbackRoom
  } catch (error) {
    console.error("Error in getRoomInfo:", error)
    return fallbackRoom
  }
}
export async function getAllRooms(): Promise<Room[]> {
  try {
    const supabase = await createClient()
    
    const { data: rooms, error } = await supabase
      .from("rooms")
      .select("*")
      .order("id", { ascending: true }) // Ensure consistent order
      
    if (error) throw error
    return rooms || [fallbackRoom]
  } catch (error) {
    console.error("Error in getAllRooms:", error)
    return [fallbackRoom]
  }
}
