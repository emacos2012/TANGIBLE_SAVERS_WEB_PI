# Tangible Savers Web - Fix Issues TODO

## Current Task Progress
✅ Plan approved  
✅ 1. Fixed lib/firebase.ts - Removed hardcoded credentials, added env validation

## Implementation Steps (from approved plan):

### Phase 1: Security Fixes (High Priority)
- [✅] 1. Remove hardcoded Firebase credentials from lib/firebase.ts ✓
- [✅] 2. Fix hardcoded service account path in lib/firebase-admin.ts ✓
- [✅] 3. Delete sensitive validation files ✓
- [✅] 4. Create clean validation.md ✓

### Phase 2: Config Fixes
- [✅] 5. Fix next.config.ts (remove invalid turbopack, add proper env/images config) ✓
- [✅] 6. Add null safety to authContext.tsx ✓

### Phase 3: Verification
- [✅] 7. Create .env.example template ✓
- [✅] 8. Update .gitignore for env files ✓
- [ ] 9. Run npm install, lint, build tests
- [ ] 10. Update TODO files

**Next Step:** Phase 1 #2 - lib/firebase-admin.ts

**Status:** In Progress

