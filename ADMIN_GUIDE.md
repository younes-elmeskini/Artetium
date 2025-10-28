# Admin Product Management Guide

## Overview
This guide explains the product management system that has been added to the Artetium application.

## Features

### 1. **Product API Routes** (`/api/products`)

#### GET `/api/products`
- Fetches all products with optional filters
- **Query Parameters:**
  - `category`: Filter by category (e.g., `Category_1`)
  - `search`: Search by name or description
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)
- **Response:**
  ```json
  {
    "products": [...],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 20,
      "totalPages": 5
    }
  }
  ```

#### POST `/api/products`
- Creates a new product
- **Authentication:** Required (JWT token in cookies)
- **Body:**
  ```json
  {
    "name": "Product Name",
    "category": "Category_1",
    "cover": "https://example.com/image.jpg",
    "description": "Product description",
    "price": "1999",
    "solde": false,
    "BestSeller": true
  }
  ```

#### GET `/api/products/[id]`
- Fetches a single product by ID

#### PUT `/api/products/[id]`
- Updates an existing product
- **Authentication:** Required

#### DELETE `/api/products/[id]`
- Deletes a product
- **Authentication:** Required

### 2. **Admin Pages**

#### `/admin/products`
- **Access:** Protected (requires authentication)
- List all products with search and filter
- Actions: Edit, Delete
- Add new product button

#### `/admin/products/add`
- **Access:** Protected (requires authentication)
- Form to create new products
- Real-time image preview
- Validation for required fields

#### `/admin/products/edit/[id]`
- **Access:** Protected (requires authentication)
- Edit existing products
- Pre-fills form with current data
- Real-time image preview

### 3. **Updated Catalogue Page**

#### `/catalogue`
- Fetches products from API
- Real-time search functionality
- Category filter buttons
- Pagination support
- Loading states
- Error handling

### 4. **FilterHero Component**
Enhanced with:
- Search input
- Category filter buttons
- "Manage Products" button
- Mobile-responsive design

## Security

### Middleware Protection (`src/middleware.ts`)
- All `/admin/*` routes are protected
- Requires valid JWT token in cookies
- Redirects to `/auth/login` if not authenticated

### API Authentication
- Uses `Verify()` utility function
- Validates JWT token from cookies
- Returns 401 Unauthorized for invalid tokens

## Database Schema

The Prisma schema defines products with:
```prisma
model Products {
  id          String       @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  category    CategoryType
  cover       String
  description String
  price       String
  solde       Boolean
  BestSeller  Boolean
}
```

## Usage

### Adding a Product
1. Log in to the application
2. Navigate to `/admin/products`
3. Click "Add Product"
4. Fill in the form:
   - Product Name (required)
   - Category (required)
   - Image URL (required)
   - Description (required)
   - Price in MAD (required)
   - Toggle "On Sale" or "Best Seller" (optional)
5. Click "Create Product"

### Editing a Product
1. Navigate to `/admin/products`
2. Find the product you want to edit
3. Click the Edit icon
4. Modify the fields
5. Click "Update Product"

### Filtering Products in Catalogue
1. Navigate to `/catalogue`
2. Use the search bar to search by name or description
3. Click category buttons to filter by category
4. Click "All" to show all products

## Code Quality

✅ **No linter errors**
✅ **TypeScript strict mode**
✅ **Optimized API calls**
✅ **Proper error handling**
✅ **Loading states**
✅ **Mobile responsive**

## API Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | List products with filters |
| POST | `/api/products` | Yes | Create product |
| GET | `/api/products/[id]` | No | Get single product |
| PUT | `/api/products/[id]` | Yes | Update product |
| DELETE | `/api/products/[id]` | Yes | Delete product |

## Error Handling

All API routes include proper error handling:
- 400: Bad Request (missing fields)
- 401: Unauthorized (invalid token)
- 404: Not Found (product doesn't exist)
- 500: Server Error (database issues)

Frontend includes:
- Toast notifications for success/error
- Loading spinners
- Graceful error messages

