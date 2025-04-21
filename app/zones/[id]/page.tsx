"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Bell, Calendar, Clock, Star } from "lucide-react"
import { mockZones } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function ZoneDetailPage() {
  const params = useParams()
  const zoneId = params.id as string

  // In a real app, this would fetch data from an API
  const zone = mockZones.find((z) => z.id === zoneId) || mockZones[0]

  const [userRating, setUserRating] = useState<number | null>(zone.userRating)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  const handleRating = (rating: number) => {
    // In a real app, this would call an API to save the rating
    setUserRating(rating)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/zones">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Zones
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-2xl">{zone.stock.symbol}</CardTitle>
                    <Badge variant={zone.type === "demand" ? "success" : "destructive"} className="ml-2">
                      {zone.type === "demand" ? "Demand Zone" : "Supply Zone"}
                    </Badge>
                    <Badge variant="outline">{zone.status}</Badge>
                  </div>
                  <CardDescription className="text-lg">{zone.stock.name}</CardDescription>
                </div>
                <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Bell className="mr-2 h-4 w-4" />
                      Set Price Alert
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set Price Alert for {zone.stock.symbol}</DialogTitle>
                      <DialogDescription>Get notified when the price reaches your target</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Target Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          defaultValue={
                            zone.type === "demand" ? zone.lowerRange.toString() : zone.upperRange.toString()
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select defaultValue={zone.type === "demand" ? "below" : "above"}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="above">Price goes above</SelectItem>
                            <SelectItem value="below">Price goes below</SelectItem>
                            <SelectItem value="equals">Price equals</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAlertDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAlertDialogOpen(false)}>Create Alert</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Zone Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Upper Range:</span>
                        <span className="font-medium">₹{zone.upperRange.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lower Range:</span>
                        <span className="font-medium">₹{zone.lowerRange.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Range Width:</span>
                        <span className="font-medium">₹{(zone.upperRange - zone.lowerRange).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium capitalize">{zone.status}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Time Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Created Date:
                        </span>
                        <span className="font-medium">{new Date(zone.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          Created Time:
                        </span>
                        <span className="font-medium">{new Date(zone.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Rating Information</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Preset Rating:</span>
                          <span className="font-medium">{zone.presetRating}/5</span>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "h-5 w-5",
                                star <= zone.presetRating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground",
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Your Rating:</span>
                          <span className="font-medium">{userRating ? `${userRating}/5` : "Not rated"}</span>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "h-5 w-5 cursor-pointer transition-colors",
                                userRating && star <= userRating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-muted-foreground hover:text-yellow-500",
                              )}
                              onClick={() => handleRating(star)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
                    <Textarea placeholder="Share your thoughts about this zone..." className="min-h-[100px]" />
                    <Button className="mt-2 w-full">Submit Comment</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Chart</CardTitle>
              <CardDescription>Historical price movement and zone visualization</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/40 rounded-md">
              <p className="text-muted-foreground">Chart visualization will be displayed here</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Market Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Price:</span>
                    <span className="font-medium">₹2,435.75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Day Change:</span>
                    <span className="font-medium text-green-500">+15.25 (0.63%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Day Range:</span>
                    <span className="font-medium">₹2,420.50 - ₹2,440.25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume:</span>
                    <span className="font-medium">3.2M</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="font-medium mb-2">Distance to Zone</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To Upper Range:</span>
                      <span className="font-medium">₹15.00 (0.62%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To Lower Range:</span>
                      <span className="font-medium">₹15.50 (0.64%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Full Market Data</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockZones.slice(0, 3).map((similarZone) => (
                  <Link href={`/zones/${similarZone.id}`} key={similarZone.id}>
                    <div className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-md transition-colors">
                      <div>
                        <div className="font-medium">{similarZone.stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{similarZone.type} zone</div>
                      </div>
                      <Badge variant={similarZone.type === "demand" ? "success" : "destructive"} className="ml-2">
                        {similarZone.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trading Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                View in Demat Account
              </Button>
              <Button className="w-full">Place Order</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

