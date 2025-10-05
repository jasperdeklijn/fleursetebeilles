"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Loader as Loader2, Plus, Pencil, Trash2, X, Save, ArrowUp, ArrowDown } from "lucide-react"
import type { Room } from "@/lib/types/room"
import { ImageSelector } from "./image-selector"

export function RoomsEditor() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingRoom, setEditingRoom] = useState<Partial<Room> | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [newAmenity, setNewAmenity] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    const supabase = createClient()
    setIsLoading(true)

    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("sort_order", { ascending: true })

      if (error) throw error
      setRooms(data || [])
    } catch (error) {
      console.error("Error loading rooms:", error)
      toast({
        title: "Error",
        description: "Failed to load rooms. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const startCreating = () => {
    setIsCreating(true)
    setEditingRoom({
      name: "",
      description: "",
      max_guests: 2,
      bed_type: "Queen Bed",
      size_sqm: 0,
      price_per_night: 0,
      amenities: [],
      images: [],
      is_available: true,
      sort_order: rooms.length,
    })
  }

  const startEditing = (room: Room) => {
    setEditingRoom({ ...room })
    setIsCreating(false)
  }

  const cancelEditing = () => {
    setEditingRoom(null)
    setIsCreating(false)
    setNewAmenity("")
  }

  const saveRoom = async () => {
    if (!editingRoom) return

    const supabase = createClient()
    setIsSaving(true)

    try {
      if (isCreating) {
        const { error } = await supabase.from("rooms").insert([editingRoom])
        if (error) throw error
        toast({
          title: "Success",
          description: "Room created successfully!",
        })
      } else {
        const { error } = await supabase.from("rooms").update(editingRoom).eq("id", editingRoom.id)
        if (error) throw error
        toast({
          title: "Success",
          description: "Room updated successfully!",
        })
      }

      await loadRooms()
      cancelEditing()
    } catch (error) {
      console.error("Error saving room:", error)
      toast({
        title: "Error",
        description: "Failed to save room. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const deleteRoom = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return

    const supabase = createClient()

    try {
      const { error } = await supabase.from("rooms").delete().eq("id", id)
      if (error) throw error

      toast({
        title: "Success",
        description: "Room deleted successfully!",
      })

      await loadRooms()
    } catch (error) {
      console.error("Error deleting room:", error)
      toast({
        title: "Error",
        description: "Failed to delete room. Please try again.",
        variant: "destructive",
      })
    }
  }

  const moveRoom = async (id: string, direction: "up" | "down") => {
    const currentIndex = rooms.findIndex((r) => r.id === id)
    if (currentIndex === -1) return
    if (direction === "up" && currentIndex === 0) return
    if (direction === "down" && currentIndex === rooms.length - 1) return

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    const newRooms = [...rooms]
    const temp = newRooms[currentIndex]
    newRooms[currentIndex] = newRooms[newIndex]
    newRooms[newIndex] = temp

    const supabase = createClient()

    try {
      const updates = newRooms.map((room, index) => ({
        id: room.id,
        sort_order: index,
      }))

      for (const update of updates) {
        const { error } = await supabase.from("rooms").update({ sort_order: update.sort_order }).eq("id", update.id)
        if (error) throw error
      }

      await loadRooms()
    } catch (error) {
      console.error("Error reordering rooms:", error)
      toast({
        title: "Error",
        description: "Failed to reorder rooms. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateField = (field: keyof Room, value: any) => {
    if (!editingRoom) return
    setEditingRoom({ ...editingRoom, [field]: value })
  }

  const addAmenity = () => {
    if (!editingRoom || !newAmenity.trim()) return
    const amenities = editingRoom.amenities || []
    updateField("amenities", [...amenities, newAmenity.trim()])
    setNewAmenity("")
  }

  const removeAmenity = (index: number) => {
    if (!editingRoom) return
    const amenities = editingRoom.amenities || []
    updateField(
      "amenities",
      amenities.filter((_, i) => i !== index)
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Kamers laden...</span>
      </div>
    )
  }

  if (editingRoom) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{isCreating ? "Nieuwe kamer aanmaken" : "Kamer wijzigen"}</h3>
          <div className="flex gap-2">
            <Button onClick={saveRoom} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              {isSaving ? "Opslaan..." : "Opslaan"}
            </Button>
            <Button variant="outline" onClick={cancelEditing}>
              Annuleren
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basis informatie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Kamer naam</Label>
              <Input
                id="name"
                value={editingRoom.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="o.a, Luxe Suite"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Omschrijving</Label>
              <Textarea
                id="description"
                value={editingRoom.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Omgschrijf de kamer..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="maxGuests">Maximale Gasten</Label>
                <Input
                  id="maxGuests"
                  type="number"
                  value={editingRoom.max_guests || 1}
                  onChange={(e) => updateField("max_guests", Number.parseInt(e.target.value) || 1)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bedType">Bed Type</Label>
                <Input
                  id="bedType"
                  value={editingRoom.bed_type || ""}
                  onChange={(e) => updateField("bed_type", e.target.value)}
                  placeholder="e.g., King Bed"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="sizeSqm">Oppervlakte (m²)</Label>
                <Input
                  id="sizeSqm"
                  type="number"
                  step="0.1"
                  value={editingRoom.size_sqm || 0}
                  onChange={(e) => updateField("size_sqm", Number.parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="price">Prijs per nacht (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={editingRoom.price_per_night || 0}
                  onChange={(e) => updateField("price_per_night", Number.parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isAvailable"
                checked={editingRoom.is_available || false}
                onChange={(e) => updateField("is_available", e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="isAvailable">Kamer is beschikbaar</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voorzieningen & Faciliteiten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(editingRoom.amenities || []).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {amenity}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeAmenity(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Voeg een voorziening toe"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addAmenity()}
              />
              <Button onClick={addAmenity} disabled={!newAmenity.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Afbeeldingen</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageSelector
              selectedImages={editingRoom.images || []}
              onImagesChange={(images) => updateField("images", images)}
              title="Kamer afbeeldingen"
              maxImages={4}
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {rooms.length} {rooms.length === 1 ? "kamer" : "kamers"} totaal
        </p>
        <Button onClick={startCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Kamer toevoegen
        </Button>
      </div>

      {rooms.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">Er bestaan nog geen kamers</p>
            <Button onClick={startCreating}>
              <Plus className="h-4 w-4 mr-2" />
              Kamer toevoegen
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {rooms.map((room, index) => (
            <Card key={room.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{room.name}</h3>
                      {!room.is_available && <Badge variant="secondary">Unavailable</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{room.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                      <div>
                        <span className="font-medium">Maximale Gasten:</span> {room.max_guests}
                      </div>
                      <div>
                        <span className="font-medium">Bed:</span> {room.bed_type}
                      </div>
                      <div>
                        <span className="font-medium">Grootte Kamer:</span> {room.size_sqm} m²
                      </div>
                      <div>
                        <span className="font-medium">Prijs:</span> €{room.price_per_night}/per nacht
                      </div>
                    </div>
                    {room.amenities && room.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {room.amenities.map((amenity, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveRoom(room.id, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveRoom(room.id, "down")}
                        disabled={index === rooms.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => startEditing(room)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Wijzigen
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteRoom(room.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Verwijderen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
