"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentEditor } from "./content-editor"
import { RoomsEditor } from "./rooms-editor"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut,  Home, FileText, Building, DoorOpen, MapPinned } from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">BnB Beheer Paneel</h1>
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Bekijk website
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout} disabled={isLoggingOut}>
                <LogOut className="h-4 w-4 mr-2" />
                {isLoggingOut ? "Bezig met uitloggen..." : "Uitloggen"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Inhoud
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <DoorOpen className="h-4 w-4" />
              Kamers
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <MapPinned className="h-4 w-4" />
              Activiteiten
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Inhoud beheren</CardTitle>
                <p className="text-muted-foreground">Bewerk de tekst die op uw website verschijnt.</p>
              </CardHeader>
              <CardContent>
                {/* preserve spaces & newlines when previewing or showing content */}
                <div className="whitespace-pre-wrap">
                  <ContentEditor />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms">
            <Card>
              <CardHeader>
                <CardTitle>Kamers beheren</CardTitle>
                <p className="text-muted-foreground">Maak en bewerk kamers voor uw eigendom.</p>
              </CardHeader>
              <CardContent>
                <RoomsEditor />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Locale activiteiten</CardTitle>
                <p className="text-muted-foreground">Maak en bewerk activiteiten.</p>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
