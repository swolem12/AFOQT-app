# Quick Start: Version Management System

## 🚀 TL;DR - For Busy Developers

### The Problem You Just Solved
Users had to manually clear cache every time you pushed updates. **Now it's automatic!**

### How It Works (30-second version)
1. You push code to GitHub
2. GitHub Actions updates `version-manifest.json` with new cache version
3. Users open the app → it detects the new version
4. App refreshes automatically with fresh content
5. No manual cache clearing needed. Ever.

---

## Quick Commands

### See Current Version
```bash
cat version-manifest.json
```
Shows cache version and content hash.

### Update Version Locally
```bash
node update-version.js
```
Generates new hash and increments version if content changed.

### Force Version Bump
```bash
node update-version.js --force
```
Increments version regardless of content changes.

---

## Typical Workflow

### 1. Add New Questions
```bash
# Create JSON file in Test Content/
# Example: Test Content/Arithmetic/arithmetic_new_topic_beginner_part1.json
vi Test\ Content/Arithmetic/arithmetic_new_topic_beginner_part1.json
```

### 2. Commit and Push
```bash
git add Test\ Content/
git commit -m "Add new arithmetic questions"
git push origin main
```

### 3. That's It!
- GitHub Actions runs automatically
- `version-manifest.json` updates
- Users see new content on next visit

---

## File Locations Cheat Sheet

| What | Where |
|------|-------|
| Version source | `version-manifest.json` |
| GitHub Actions | `.github/workflows/update-version.yml` |
| Automation script | `.github/scripts/generate-version-manifest.js` |
| Local script | `update-version.js` |
| Documentation | `docs/VERSION_SYSTEM.md` |
| SW hook | `sw.js` lines 50-94 |
| App hook | `app.js` lines 10172-10220 |

---

## When Things Happen

| Event | What Triggers |
|-------|---------------|
| Push to GitHub | GitHub Actions runs automatically |
| Content changed | Cache version increments by 1 |
| User opens app | Version check happens (console: `📡 Version Check`) |
| Version mismatch | Service Workers unregistered, page reloads |
| User sees new content | Automatic, no action needed |

---

## How to Verify It's Working

### Local Test
```bash
# 1. Update manifest
node update-version.js

# 2. Check it changed
git diff version-manifest.json

# 3. Commit and push
git add version-manifest.json
git commit -m "test version bump"
git push
```

### Browser Test
1. Open app in incognito window
2. Open DevTools Console (F12)
3. Filter for "📡 Version Check"
4. Should see: `📡 Version Check: Current=X, Stored=Y`

### GitHub Actions Test
1. Push to main
2. Go to: Repo → Actions tab
3. See `update-version` workflow running
4. Check workflow logs for success

---

## Troubleshooting

### "Version not updating"
- Push included changes to `Test Content/`
- Check GitHub Actions logs (Repo → Actions)
- Try local script: `node update-version.js`

### "Users not seeing new content"
- Tell them to open in incognito/private mode
- Or manually trigger: `node update-version.js --force`

### "SW still cached?"
- App.js checks version BEFORE SW registration
- If app.js check works, content will be fresh
- SW is backup layer

### "Check GitHub Actions Status"
```
Repository → Actions → update-version workflow
Look for ✅ (success) or ❌ (failed)
```

---

## What NOT to Worry About

✅ Users will NOT see "downloading" or "updating" messages  
✅ Users will NOT need to clear cache manually  
✅ Users will NOT lose progress (stored in IndexedDB)  
✅ App will NOT break if version check fails (works offline)  
✅ You do NOT need to do anything special when pushing  

---

## Automatic vs Manual Updates

### Automatic (Recommended)
```
Push → GitHub Actions → Auto-update manifest
```
- Set and forget
- No manual steps
- Uses GitHub's infrastructure

### Manual (For Development)
```
node update-version.js → Local manifest update → Commit → Push
```
- Useful for testing
- Full control over version bumping
- Good for non-content changes

---

## Architecture at a Glance

```
┌─ version-manifest.json ◄── Source of Truth
│   (cached version number)
│
├─ Service Worker (sw.js)
│   └─ Backup: Checks version in activate event
│
└─ App Init (app.js)
    └─ Primary: Checks version on load
        └─ If version changed → Hard reload
```

---

## Environment Setup

### For GitHub Actions (Automatic)
- ✅ Already configured in `.github/workflows/update-version.yml`
- ✅ No API keys or secrets needed
- ✅ Runs on every push automatically

### For Local Development
```bash
# Already have Node.js? Just run:
node update-version.js

# Don't have Node.js?
# Download from: https://nodejs.org/
# Then: node update-version.js
```

---

## FAQ

**Q: How often is the version checked?**  
A: Once per visit (on page load). Cached between sessions.

**Q: What if network fails during version check?**  
A: App continues normally using existing cache. Works offline!

**Q: Can I manually control which users get updates?**  
A: Yes, but it's manual. By default, everyone gets new content on next visit.

**Q: Do I need to restart anything?**  
A: No. Version system is fully client-side and automatic.

**Q: What's the performance impact?**  
A: Negligible. Single 500-byte file check per visit.

**Q: Can I roll back to previous version?**  
A: Yes, revert the manifest file in Git: `git revert <commit>`

**Q: Are there any server costs?**  
A: No! Everything is static files and client-side logic.

---

## Success Indicators

✅ `node update-version.js` runs without errors  
✅ `version-manifest.json` has incrementing `cacheVersion`  
✅ GitHub Actions workflows show green checkmarks  
✅ Console shows `📡 Version Check` messages  
✅ New questions appear after version bump  

---

## Still Have Questions?

See full documentation: `docs/VERSION_SYSTEM.md`

Or review the code:
- Service Worker: `sw.js` (lines 50-94)
- App boot: `app.js` (lines 10172-10220)
- Local script: `update-version.js`

---

**Remember:** The system handles everything automatically. You just push code! 🚀
