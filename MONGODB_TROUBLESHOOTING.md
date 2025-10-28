# MongoDB Connection Troubleshooting

## Error: Database Connection Failed

If you're seeing this error:
```
Kind: Server selection timeout: No available servers
Error: received fatal alert: InternalError
```

### Common Causes and Solutions

## 1. **MongoDB Atlas Cluster is Paused**

**Symptom:** "No available servers" error

**Solution:**
- Log into [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Click on your cluster
- If the cluster is **paused** (gray status), click "Resume" or "Wake up"

---

## 2. **Missing or Incorrect DATABASE_URL**

**Symptom:** Connection timeout or authentication error

**Solution:**
1. Check your `.env` file (or `.env.local`):
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority"
   ```

2. Get the correct connection string from MongoDB Atlas:
   - Go to Atlas Dashboard
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

---

## 3. **IP Address Not Whitelisted**

**Symptom:** Connection refused or timeout

**Solution:**
1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Add Current IP Address" (for development)
4. Or add `0.0.0.0/0` for development (⚠️ **Remove in production!**)

---

## 4. **Database User Not Created**

**Symptom:** Authentication failed

**Solution:**
1. In MongoDB Atlas, go to "Database Access"
2. Click "Add New Database User"
3. Create a user with "Read and write to any database" permissions
4. Set a strong password
5. Update your `.env` with the new credentials

---

## 5. **SSL/TLS Certificate Issues**

**Symptom:** "received fatal alert" errors

**Solution:**
1. Make sure your connection string includes SSL parameters:
   ```
   ?ssl=true&retryWrites=true&w=majority
   ```

2. Try updating Prisma schema to include SSL:
   ```prisma
   datasource db {
     provider = "mongodb"
     url      = env("DATABASE_URL")
   }
   ```

---

## 6. **Environment Variables Not Loaded**

**Symptom:** Using wrong database URL

**Solution:**
1. Make sure you have a `.env.local` file in your project root
2. Restart your dev server after changing `.env`:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

---

## Quick Test

Run this to check your connection:

```bash
# Test Prisma connection
npx prisma db pull

# Or check your connection string
node -e "console.log(process.env.DATABASE_URL)"
```

---

## Alternative: Use Local MongoDB (Development)

If Atlas continues to give issues, you can use local MongoDB:

1. **Install MongoDB locally:**
   ```bash
   # macOS
   brew install mongodb-community
   
   # Start MongoDB
   brew services start mongodb-community
   ```

2. **Update your DATABASE_URL in `.env`:**
   ```env
   DATABASE_URL="mongodb://localhost:27017/artetium"
   ```

3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

---

## Still Having Issues?

1. **Check MongoDB Atlas Status:** https://status.mongodb.com/
2. **Check Prisma logs:** Look for more details in the terminal
3. **Verify network connectivity:** Try pinging MongoDB servers
4. **Review Prisma documentation:** https://www.prisma.io/docs

---

## Example `.env` file

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/artetium?retryWrites=true&w=majority"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Environment
NODE_ENV="development"
NEXT_PUBLIC_NODE_ENV="development"
```

---

## Quick Checklist

- [ ] MongoDB Atlas cluster is running (not paused)
- [ ] DATABASE_URL is set in `.env` or `.env.local`
- [ ] Your IP address is whitelisted in MongoDB Atlas
- [ ] Database user exists and has correct permissions
- [ ] Password in DATABASE_URL is correct
- [ ] Dev server was restarted after changing `.env`
- [ ] Using `mongodb+srv://` protocol (not `mongodb://`)

