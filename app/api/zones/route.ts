import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { z } from "zod";

// Validation schema for zone data
const zoneSchema = z.object({
  type: z.enum(["demand", "supply"]),
  status: z.enum(["fresh", "tested"]),
  upperRange: z.number().positive(),
  lowerRange: z.number().positive(),
  presetRating: z.number().int().min(1).max(5),
  userRating: z.number().int().min(1).max(5).nullable(),
  stock: z.object({
    id: z.string().min(1),
    symbol: z.string().min(1),
    name: z.string().min(1),
  }),
});

// Validation schema for PUT (allows partial updates)
const updateZoneSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["demand", "supply"]).optional(),
  status: z.enum(["fresh", "tested"]).optional(),
  upperRange: z.number().positive().optional(),
  lowerRange: z.number().positive().optional(),
  presetRating: z.number().int().min(1).max(5).optional(),
  userRating: z.number().int().min(1).max(5).nullable().optional(),
  stock: z
    .object({
      id: z.string().min(1),
      symbol: z.string().min(1),
      name: z.string().min(1),
    })
    .optional(),
});

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("stockzonetracker");
    const collection = db.collection("zones");
    const zones = await collection.find({}).toArray();
    return NextResponse.json(zones, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch zones", error);
    return NextResponse.json({ error: "Failed to fetch zones" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = zoneSchema.parse(body);

    const client = await clientPromise;
    const db = client.db("stockzonetracker");
    const collection = db.collection("zones");

    // Check for duplicate stock symbol to avoid redundant zones
    const existingZone = await collection.findOne({ "stock.symbol": validatedData.stock.symbol });
    if (existingZone) {
      return NextResponse.json({ error: "Zone with this stock symbol already exists" }, { status: 400 });
    }

    const newZone = {
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(newZone);
    return NextResponse.json({ ...newZone, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Failed to create zone", error);
    return NextResponse.json({ error: "Failed to create zone" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = updateZoneSchema.parse(body);
    const { id, ...updateFields } = validatedData;

    const client = await clientPromise;
    const db = client.db("stockzonetracker");
    const collection = db.collection("zones");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Zone not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Zone updated successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Failed to update zone", error);
    return NextResponse.json({ error: "Failed to update zone" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = z.object({ id: z.string().min(1) }).parse(body);

    const client = await clientPromise;
    const db = client.db("stockzonetracker");
    const collection = db.collection("zones");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Zone not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Zone deleted successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Failed to delete zone", error);
    return NextResponse.json({ error: "Failed to delete zone" }, { status: 500 });
  }
}