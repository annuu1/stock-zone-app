"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Filter, Search } from "lucide-react"
import ZoneCard from "@/components/zone-card"
import { mockZones } from "@/lib/mock-data"

export default function ZonesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredZones = mockZones.filter((zone) => {
    const matchesSearch =
      zone.stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "demand") return matchesSearch && zone.type === "demand"
    if (filter === "supply") return matchesSearch && zone.type === "supply"
    if (filter === "fresh") return matchesSearch && zone.status === "fresh"
    if (filter === "tested") return matchesSearch && zone.status === "tested"

    return matchesSearch
  })

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demand & Supply Zones</h1>
          <p className="text-muted-foreground mt-1">View and analyze stock zones for better trading decisions</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/alerts">
            <Button size="sm">
              Set Alerts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by stock name or symbol..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter zones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Zones</SelectItem>
            <SelectItem value="demand">Demand Zones</SelectItem>
            <SelectItem value="supply">Supply Zones</SelectItem>
            <SelectItem value="fresh">Fresh Zones</SelectItem>
            <SelectItem value="tested">Tested Zones</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="demand">Demand</TabsTrigger>
          <TabsTrigger value="supply">Supply</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredZones.map((zone) => (
              <ZoneCard key={zone.id} zone={zone} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="demand" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredZones
              .filter((zone) => zone.type === "demand")
              .map((zone) => (
                <ZoneCard key={zone.id} zone={zone} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="supply" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredZones
              .filter((zone) => zone.type === "supply")
              .map((zone) => (
                <ZoneCard key={zone.id} zone={zone} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="watchlist" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">Login to view your watchlist</p>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-center mt-8">
        <Button variant="outline" size="sm" className="mx-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm" className="mx-1">
          1
        </Button>
        <Button variant="outline" size="sm" className="mx-1">
          2
        </Button>
        <Button variant="outline" size="sm" className="mx-1">
          3
        </Button>
        <Button variant="outline" size="sm" className="mx-1">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

