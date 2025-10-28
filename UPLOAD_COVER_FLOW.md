# 📸 Upload de l'Image de Couverture (Cover)

## 🔄 Flux complet d'upload

### **1. Frontend - Sélection de l'image** 📁

```typescript:src/app/admin/products/add/page.tsx
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);
  const fd = new FormData();
  fd.append("file", file);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    
    if (!res.ok) {
      toast.error(data.error || "Failed to upload image");
      return;
    }

    // Sauvegarde l'URL dans l'état
    setFormData((prev) => ({ ...prev, cover: data.url }));
    toast.success("Image uploaded successfully");
  } catch (error) {
    toast.error("Failed to upload image");
  } finally {
    setUploading(false);
  }
};
```

**Étapes :**
1. ✅ Utilisateur sélectionne un fichier
2. ✅ Création d'un FormData avec le fichier
3. ✅ Envoi à `/api/upload` via POST
4. ✅ Affichage d'un indicateur de chargement
5. ✅ Sauvegarde de l'URL dans `formData.cover`

### **2. Backend - Traitement de l'upload** ⚙️

```typescript:src/app/api/upload/route.ts
export async function POST(req: NextRequest) {
  try {
    await Verify();  // Vérification de l'authentification

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Vérification du token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ 
        error: "Blob storage not configured" 
      }, { status: 500 });
    }

    // Upload vers Vercel Blob Storage
    const blob = await put(file.name, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url, name: blob.pathname });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
```

**Étapes :**
1. ✅ Authentification via `Verify()`
2. ✅ Extraction du fichier depuis FormData
3. ✅ Validation du token Vercel Blob
4. ✅ Upload vers Vercel Blob Storage
5. ✅ Retour de l'URL publique

### **3. Résultat** 🎯

**Réponse de succès :**
```json
{
  "url": "https://xyzid.public.blob.vercel-storage.com/nom-du-fichier.jpg",
  "name": "/nom-du-fichier.jpg"
}
```

**URL sauvegardée dans :**
```typescript
formData.cover = "https://xyzid.public.blob.vercel-storage.com/nom-du-fichier.jpg"
```

## 📋 Formulaires

### **Ajout de produit** (`/admin/products/add`)

```tsx
<input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  disabled={uploading}
/>
{uploading && (
  <div className="mt-2">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-600"></div>
    Uploading image...
  </div>
)}
```

### **Édition de produit** (`/admin/products/edit/[id]`)

Même mécanisme que pour l'ajout, avec remplacement de l'image existante.

## 🎨 Prévisualisation

```tsx
{formData.cover && (
  <div className="mt-3">
    <Image
      width={128}
      height={128}
      src={formData.cover}
      alt="Preview"
      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
    />
  </div>
)}
```

## 🔐 Sécurité

1. ✅ **Authentification requise** - Seuls les admins peuvent uploader
2. ✅ **Validation du type** - Seulement les images (`accept="image/*"`)
3. ✅ **Vérification du token** - BLOB_READ_WRITE_TOKEN doit être configuré
4. ✅ **Accès public** - Les images sont accessibles publiquement
5. ✅ **Noms de fichiers uniques** - Générés automatiquement par Vercel

## ⚙️ Configuration requise

**Variables d'environnement :**
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_token
```

**Obtenir le token :**
1. Vercel Dashboard → Votre projet
2. Storage → Créer un Blob Store
3. Settings → Copy "Read and Write Token"
4. Ajouter dans les variables d'environnement

## 📊 Exemple de données

**Avant l'upload :**
```typescript
formData = {
  name: "",
  category: "Category_1",
  cover: "",  // Vide
  description: "",
  price: "",
  // ...
}
```

**Après l'upload :**
```typescript
formData = {
  name: "",
  category: "Category_1",
  cover: "https://xyzid.public.blob.vercel-storage.com/image.jpg",  // URL
  description: "",
  price: "",
  // ...
}
```

## ✅ Validation avant création

Le formulaire vérifie que l'image est uploadée :

```typescript:src/app/admin/products/add/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.cover) {
    toast.error("Please upload a product image");
    return;
  }
  
  // ... reste du code
};
```

## 🚀 Avantages de Vercel Blob

- ✅ **Persistance** - Les images persistent entre les déploiements
- ✅ **CDN intégré** - Chargement rapide partout
- ✅ **Pas de limite de taille** (dans des limites raisonnables)
- ✅ **URLs publiques** - Accessibles directement
- ✅ **Pas de gestion de fichiers** - Tout est géré par Vercel

## 📝 Résumé

```
Utilisateur → Sélection image → Upload vers Vercel Blob → URL retournée → 
Sauvegarde dans formData.cover → Création du produit avec l'URL
```

