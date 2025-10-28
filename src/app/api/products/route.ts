import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Verify } from "../utils/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// GET all products with optional filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.products.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: "desc" },
      }),
      prisma.products.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    
    // Check if it's a database connection error
    if ((error as unknown as PrismaClientKnownRequestError).code === "P2010" || (error as unknown as Error).message?.includes("connect")) {
      return NextResponse.json(
        { 
          error: "Database connection failed. Please check your DATABASE_URL environment variable.",
          details: "Unable to connect to MongoDB. Make sure your MongoDB Atlas cluster is running and accessible."
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to fetch products", details: (error as unknown as Error).message },
      { status: 500 }
    );
  }
}

// POST create a new product
export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    await Verify();

    const body = await req.json();
    const { name, category, cover, description, price, solde, BestSeller } =
      body;

    // Validate required fields
    if (!name || !category || !cover || !description || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.products.create({
      data: {
        name,
        category,
        cover,
        description,
        price,
        solde: solde || false,
        BestSeller: BestSeller || false,
      },
    });

    return NextResponse.json({ message: "Product created successfully" }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating product:", error);
    
    if ((error as unknown as Error).message?.includes("Unauthorized")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create product", details: (error as unknown as Error).message },
      { status: 500 }
    );
  }
}

