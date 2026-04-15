# Fix Mistakes & Deploy to GitHub - Progress Tracker

## Approved Plan Steps:

### 1. Fix next.config.ts (user priority)
- [✅] Add TypeScript safety for env vars
- [✅] Ensure React 19 / Next 16 compat (experimental if needed)
- [✅] Verify no TS errors

**Current Status: Step 1 Complete - Step 2 Next**

### 2. Complete lib/firebase-admin.ts
- [✅] Add proper Admin SDK init with service account env
- [✅] Export verifyIdToken, adminFirestore, adminAuth

### 3. Polish lib/piAuth.ts
- [ ] Add validation to updateUserProfile

### 4. Update TODO files
- [✅] Mark all items in TODO_FIXES.md ✅
- [✅] Update other TODOs progress

**Current Status: Step 4 Complete - Step 5 Verify**

### 5. Verify & Test
- [ ] npm run lint
- [ ] npm run build
- [ ] npm run dev (test key pages)

### 6. GitHub Setup & Push
- [ ] Check/install gh CLI
- [ ] git add/commit all fixes
- [ ] gh repo create tangible-savers-web --public (or private)
- [ ] git push origin main

**Current Status: Starting Step 1**
