import { NextResponse } from "next/server"
import { mockZones } from "@/lib/mock-data"

export async function GET(request: Request) {
  // In a real app, this would fetch data from a database
  return NextResponse.json(mockZones)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real app, this would validate and save to a database
    const newZone = {
      id: `zone${mockZones.length + 1}`,
      ...body,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newZone, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create zone" }, { status: 500 })
  }
}

