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
import { Loader2, Save, Plus, X } from "lucide-react"
import type { PropertyInfo } from "@/lib/content"

export function PropertyEditor() {
  const [property, setProperty] = useState<PropertyInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newAmenity, setNewAmenity] = useState("")
  const [newImage, setNewImage] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadProperty()
  }, [])

  const loadProperty = async () => {
    const supabase = createClient()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.from("property_info").select("*").single()

      if (error) throw error
      setProperty(data)
    } catch (error) {
      console.error("Error loading property:", error)
      toast({
        title: "Error",
        description: "Failed to load property information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveProperty = async () => {
    if (!property) return

    const supabase = createClient()
    setIsSaving(true)

    try {
      const { error } = await supabase.from("property_info").update(property).eq("id", property.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Property information updated successfully!",
      })
    } catch (error) {
      console.error("Error saving property:", error)
      toast({
        title: "Error",
        description: "Failed to save property information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updateProperty = (field: keyof PropertyInfo, value: any) => {
    if (!property) return
    setProperty({ ...property, [field]: value })
  }

  const addAmenity = () => {
    if (!property || !newAmenity.trim()) return
    updateProperty("amenities", [...property.amenities, newAmenity.trim()])
    setNewAmenity("")
  }

  const removeAmenity = (index: number) => {
    if (!property) return
    const newAmenities = property.amenities.filter((_, i) => i !== index)
    updateProperty("amenities", newAmenities)
  }

  const addImage = () => {
    if (!property || !newImage.trim()) return
    updateProperty("images", [...property.images, newImage.trim()])
    setNewImage("")
  }

  const removeImage = (index: number) => {
    if (!property) return
    const newImages = property.images.filter((_, i) => i !== index)
    updateProperty("images", newImages)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading property information...</span>
      </div>
    )
  }

  if (!property) {
    return <div>No property information found.</div>
  }

  return (
    <div className="space-y-6">
      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveProperty} disabled={isSaving}>
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Property Name</Label>
            <Input
              id="name"
              value={property.name}
              onChange={(e) => updateProperty("name", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={property.description || ""}
              onChange={(e) => updateProperty("description", e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={property.address || ""}
              onChange={(e) => updateProperty("address", e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="maxGuests">Max Guests</Label>
              <Input
                id="maxGuests"
                type="number"
                value={property.max_guests}
                onChange={(e) => updateProperty("max_guests", Number.parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={property.bedrooms}
                onChange={(e) => updateProperty("bedrooms", Number.parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                value={property.bathrooms}
                onChange={(e) => updateProperty("bathrooms", Number.parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="price">Price per Night (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={property.price_per_night}
                onChange={(e) => updateProperty("price_per_night", Number.parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity, index) => (
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
              placeholder="Add new amenity"
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

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {property.images.map((image, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded">
                <span className="flex-1 text-sm font-mono">{image}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add image URL"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addImage()}
            />
            <Button onClick={addImage} disabled={!newImage.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
