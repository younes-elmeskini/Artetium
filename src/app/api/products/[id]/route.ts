import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Verify } from "../../utils/utils";
import { unlink } from "fs/promises";
import path from "path";

// GET single product by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error("Error fetching product:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch product", details: (error as unknown as Error).message },
      { status: 500 }
    );
  }
}

// PUT update a product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    await Verify();

    const { id } = await params;
    const body = await req.json();
    const { name, category, cover, description, price, solde, BestSeller } =
      body;

    // Check if product exists
    const existingProduct = await prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete the old image if it's being replaced and it's in the uploads folder
    if (cover !== existingProduct.cover && existingProduct.cover?.startsWith("/uploads/")) {
      try {
        const oldImagePath = path.join(
          process.cwd(),
          "public",
          existingProduct.cover
        );
        await unlink(oldImagePath);
        console.log(`Deleted old image: ${existingProduct.cover}`);
      } catch (err: unknown) {
        console.error(`Failed to delete old image: ${existingProduct.cover}`, err);
        // Continue with product update even if image deletion fails
      }
    }

    // Update product
    const product = await prisma.products.update({
      where: { id },
      data: {
        name,
        category,
        cover,
        description,
        price,
        solde,
        BestSeller,
      },
    });

    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error("Error updating product:", error);

    if ((error as unknown as Error).message?.includes("Unauthorized")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update product", details: (error as unknown as Error).message },
      { status: 500 }
    );
  }
}

// DELETE a product
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    await Verify();

    const { id } = await params;

    // Check if product exists
    const existingProduct = await prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete the image file if it's in the uploads folder
    if (existingProduct.cover && existingProduct.cover.startsWith("/uploads/")) {
      try {
        const imagePath = path.join(
          process.cwd(),
          "public",
          existingProduct.cover
        );
        await unlink(imagePath);
        console.log(`Deleted image: ${existingProduct.cover}`);
      } catch (err: unknown) {
        console.error(`Failed to delete image: ${existingProduct.cover}`, err);
        // Continue with product deletion even if image deletion fails
      }
    }

    // Delete product
    await prisma.products.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting product:", error);

    if ((error as unknown as Error).message?.includes("Unauthorized")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete product", details: (error as unknown as Error).message },
      { status: 500 }
    );
  }
}

