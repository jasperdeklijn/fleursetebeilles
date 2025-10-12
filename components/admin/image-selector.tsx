"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Check } from "lucide-react"

const AVAILABLE_IMAGES = [
  "/IMG_20250907_172002.jpg",
  "/IMG_20251002_175854.jpg",
  "/IMG_20251006_155403.jpg",
  "/IMG_20251007_170916.jpg",
  "/IMG_20251006_155420_1.jpg",
  "/IMG_20251007_171543.jpg",
  "/IMG_20251007_170933.jpg",
]

interface ImageSelectorProps {
  selectedImages: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  title?: string
}

export function ImageSelector({ selectedImages, onImagesChange, maxImages, title = "Selecteer afbeelingen" }: ImageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleImage = (image: string) => {
    if (selectedImages.includes(image)) {
      onImagesChange(selectedImages.filter((img) => img !== image))
    } else {
      if (maxImages && selectedImages.length >= maxImages) {
        return
      }
      onImagesChange([...selectedImages, image])
    }
  }

  const removeImage = (image: string) => {
    onImagesChange(selectedImages.filter((img) => img !== image))
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">{title}</label>
          <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Sluit gallerij" : "Toon gallerij"}
          </Button>
        </div>

        {selectedImages.length > 0 && (
          <div className="space-y-2 mb-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded bg-muted/50">
                <img src={image} alt="" className="w-12 h-12 object-cover rounded" />
                <span className="flex-1 text-sm font-mono truncate">{image}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeImage(image)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {selectedImages.length === 0 && (
          <p className="text-sm text-muted-foreground mb-4">Geen afbeeldingen geselecteerd. Klik "Gallerij" om afbeeldingen te kiezen.</p>
        )}
      </div>

      {isOpen && (
        <Card>
          <CardContent className="pt-6">
            {maxImages && (
              <p className="text-sm text-muted-foreground mt-4">
                {selectedImages.length} van de maximaal {maxImages} afbeeldingen geselecteerd.
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {AVAILABLE_IMAGES.map((image) => {
                const isSelected = selectedImages.includes(image)
                return (
                  <button
                    key={image}
                    onClick={() => toggleImage(image)}
                    className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${
                      isSelected ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={image} alt={image} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                      {image.split("/").pop()}
                    </div>
                  </button>
                )
              })}
            </div>
          
          </CardContent>
        </Card>
      )}
    </div>
  )
}
