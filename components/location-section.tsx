"use client"

import Image from "next/image"
import { MapPin, Trees, Mountain, Waves } from "lucide-react"

interface LocationsSectionProps {
  title: string
  description: string
  lang: "nl" | "en" | "fr"
}

export function LocationsSection({
  title,
  description,
  lang,
}: LocationsSectionProps) {
  const labels = {
    nl: {
      explore: "Ontdek de omgeving",
      subtitle:
        "Onze B&B ligt op een perfecte locatie om natuur, dorpjes en activiteiten te ontdekken.",
      nearby: "Dichtbij stranden, bergen en pittoreske dorpen",
      marker: "Onze locatie",
    },
    en: {
      explore: "Explore the surroundings",
      subtitle:
        "Our B&B is perfectly located to discover nature, villages, and activities nearby.",
      nearby: "Close to beaches, mountains, and charming villages",
      marker: "Our location",
    },
    fr: {
      explore: "Découvrez les environs",
      subtitle:
        "Notre B&B est idéalement situé pour découvrir la nature, les villages et les activités.",
      nearby: "Proche des plages, montagnes et villages charmants",
      marker: "Notre emplacement",
    },
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-100/60 to-green-50/30 dark:from-green-950/40 dark:to-green-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4 dark:bg-green-950/40 dark:text-green-300">
            <MapPin className="w-4 h-4" />
            {labels[lang].explore}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden border border-green-200/60 shadow-2xl bg-white dark:bg-zinc-900">
            <Image
              src="/location.jpeg"
              alt="France map"
              width={1200}
              height={1200}
              className="w-full h-auto object-cover"
              priority
            />

            {/* Floating badge */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-green-200">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <MapPin className="w-4 h-4 text-green-500" />
                {labels[lang].marker}
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="space-y-5">
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900 border border-green-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950/50">
                  <Waves className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {lang === "nl"
                      ? "Dicht bij de kust"
                      : lang === "fr"
                      ? "Proche de la côte"
                      : "Close to the coast"}
                  </h3>

                  <p className="text-muted-foreground">
                    {lang === "nl"
                      ? "Geniet van prachtige stranden en zonnige kustplaatsen in de buurt."
                      : lang === "fr"
                      ? "Profitez des magnifiques plages et villages côtiers à proximité."
                      : "Enjoy beautiful beaches and sunny coastal villages nearby."}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900 border border-green-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-950/50">
                  <Trees className="w-6 h-6 text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {lang === "nl"
                      ? "Rustige natuur"
                      : lang === "fr"
                      ? "Nature paisible"
                      : "Peaceful nature"}
                  </h3>

                  <p className="text-muted-foreground">
                    {lang === "nl"
                      ? "Perfect voor wandelingen, ontspanning en het ontdekken van charmante dorpjes."
                      : lang === "fr"
                      ? "Parfait pour les promenades, la détente et la découverte de villages charmants."
                      : "Perfect for walks, relaxation, and discovering charming villages."}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900 border border-green-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-950/50">
                  <Mountain className="w-6 h-6 text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {lang === "nl"
                      ? "Avontuur & ontdekking"
                      : lang === "fr"
                      ? "Aventure & découverte"
                      : "Adventure & discovery"}
                  </h3>

                  <p className="text-muted-foreground">
                    {lang === "nl"
                      ? "Ontdek verborgen plekken, lokale markten en unieke uitzichten."
                      : lang === "fr"
                      ? "Découvrez des lieux cachés, marchés locaux et vues uniques."
                      : "Discover hidden places, local markets, and unique viewpoints."}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="rounded-3xl p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl">
              <div className="text-lg font-semibold mb-2">
                {labels[lang].nearby}
              </div>

              <p className="text-white/90 text-sm leading-relaxed">
                {lang === "nl"
                  ? "Een ideale uitvalsbasis voor koppels, gezinnen en reizigers die Zuid-Frankrijk willen ontdekken."
                  : lang === "fr"
                  ? "Un point de départ idéal pour les couples, familles et voyageurs souhaitant découvrir le sud de la France."
                  : "An ideal base for couples, families, and travelers exploring the south of France."}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}