"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowUpDown, Bell, Eye, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ZoneCardProps {
  zone: {
    id: string
    type: "demand" | "supply"
    status: "fresh" | "tested"
    upperRange: number
    lowerRange: number
    createdAt: string
    presetRating: number
    userRating: number | null
    stock: {
      id: string
      symbol: string
      name: string
    }
  }
}

export default function ZoneCard({ zone }: ZoneCardProps) {
  const [userRating, setUserRating] = useState<number | null>(zone.userRating)

  const handleRating = (rating: number) => {
    // In a real app, this would call an API to save the rating
    setUserRating(rating)
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        zone.type === "demand" ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center">
              {zone.stock.symbol}
              <Badge variant={zone.type === "demand" ? "success" : "destructive"} className="ml-2">
                {zone.type === "demand" ? "Demand" : "Supply"}
              </Badge>
              <Badge variant="outline" className="ml-2">
                {zone.status}
              </Badge>
            </CardTitle>
            <CardDescription>{zone.stock.name}</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Set price alert</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Range:</span>
            <span className="font-medium flex items-center">
              ₹{zone.lowerRange.toFixed(2)} - ₹{zone.upperRange.toFixed(2)}
              <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground" />
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Created:</span>
            <span className="font-medium">{new Date(zone.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Preset Rating:</span>
            <span className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-4 w-4",
                    star <= zone.presetRating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground",
                  )}
                />
              ))}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Your Rating:</span>
            <span className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-4 w-4 cursor-pointer transition-colors",
                    userRating && star <= userRating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-muted-foreground hover:text-yellow-500",
                  )}
                  onClick={() => handleRating(star)}
                />
              ))}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link href={`/zones/${zone.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

