"use client"

import { useEffect } from "react"
import { recordPaperRead } from "@/lib/profile"

export default function PaperReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Record after 30 seconds — actual reading, not bounce
    const timer = setTimeout(() => {
      recordPaperRead(slug)
    }, 30_000)
    return () => clearTimeout(timer)
  }, [slug])

  return null
}
