# Configuration Vercel Blob Storage

Ce projet utilise Vercel Blob Storage pour le stockage des fichiers uploadés (images de produits).

## Configuration sur Vercel

### 1. Créer un Store de Blob sur Vercel

1. Allez sur votre dashboard Vercel
2. Sélectionnez votre projet
3. Allez dans l'onglet "Storage"
4. Cliquez sur "Create Database"
5. Sélectionnez "Blob" 
6. Donnez un nom à votre store (par exemple: `artetium-blob`)
7. Sélectionnez la région la plus proche
8. Cliquez sur "Create"

### 2. Obtenir le Token d'Accès

1. Une fois le Blob Store créé, cliquez dessus
2. Allez dans l'onglet "Settings"
3. Copiez le **"Read and Write Token"**

### 3. Ajouter la Variable d'Environnement

1. Dans votre projet Vercel, allez dans "Settings" > "Environment Variables"
2. Ajoutez une nouvelle variable :
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: Le token que vous avez copié
3. Cliquez sur "Save"
4. Redéployez votre application

### 4. Configuration Locale (Optionnel)

Pour tester localement, créez un fichier `.env.local` à la racine du projet :

```env
BLOB_READ_WRITE_TOKEN=votre_token_ici
```

**Note**: Vous pouvez obtenir le token depuis votre dashboard Vercel > Storage > votre-store > Settings > Read and Write Token

## Fonctionnement

- Les images uploadées sont maintenant stockées dans Vercel Blob Storage au lieu du système de fichiers local
- Les URLs retournées sont des URLs publiques accessibles depuis Internet
- Les fichiers persistent entre les déploiements
- Plus de problèmes avec le système de fichiers en lecture seule sur Vercel

## Ressources

- [Documentation Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- [API Vercel Blob](https://vercel.com/docs/storage/vercel-blob/using-blob-sdk)

