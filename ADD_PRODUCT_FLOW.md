# Flux d'Ajout de Produit

## 📋 Vue d'ensemble

Le système d'ajout de produit fonctionne en **2 étapes** :

### **Étape 1 : Upload de l'image**

**Frontend :** `src/app/admin/products/add/page.tsx`
```typescript
handleFileChange → fetch("/api/upload", { method: "POST", body: FormData })
```

**Backend :** `src/app/api/upload/route.ts`
```typescript
POST /api/upload
- Authentification (Verify())
- Upload vers Vercel Blob Storage
- Retourne { url: "...", name: "..." }
```

### **Étape 2 : Création du produit**

**Frontend :** `src/app/admin/products/add/page.tsx`
```typescript
handleSubmit → fetch("/api/products", { method: "POST", body: JSON })
```

**Backend :** `src/app/api/products/route.ts`
```typescript
POST /api/products
- Authentification (Verify())
- Validation des champs requis
- Création dans MongoDB via Prisma
- Retourne { message: "Product created successfully" }
```

## 🔄 Flux complet

```
1. Utilisateur sélectionne une image
   ↓
2. Image uploadée → Vercel Blob Storage
   ↓
3. URL de l'image sauvegardée dans l'état
   ↓
4. Utilisateur remplit le formulaire
   ↓
5. Soumission du formulaire
   ↓
6. Données envoyées à /api/products
   ↓
7. Produit créé dans MongoDB
   ↓
8. Redirection vers /admin/products
```

## ✅ Validation

**Champs requis :**
- `name` : Nom du produit
- `category` : Catégorie (Category_1, Category_2, etc.)
- `cover` : URL de l'image (uploadée au préalable)
- `description` : Description du produit
- `price` : Prix en MAD

**Champs optionnels :**
- `solde` : Boolean (false par défaut)
- `BestSeller` : Boolean (false par défaut)

## 🔐 Authentification

Les deux routes nécessitent une authentification :
- `/api/upload` : Vérifie l'authentification avant l'upload
- `/api/products` : Vérifie l'authentification avant la création

## 🌐 Configuration requise

**Variables d'environnement :**
```env
BLOB_READ_WRITE_TOKEN=token_vercel_blob
DATABASE_URL=mongodb_connection_string
```

## 📝 Exemples

### Données envoyées au POST /api/products
```json
{
  "name": "Chaise design",
  "category": "Category_1",
  "cover": "https://blob.vercel-storage.com/...",
  "description": "Une belle chaise moderne",
  "price": "299.99",
  "solde": false,
  "BestSeller": true
}
```

### Réponse de succès
```json
{
  "message": "Product created successfully"
}
```

### Réponse d'erreur
```json
{
  "error": "Missing required fields"
}
```

