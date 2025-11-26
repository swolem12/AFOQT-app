# Converting AFOQT App to APK

This guide explains how to use the AFOQT app on your Android phone, including options to install it as a PWA (Progressive Web App) or convert it to an APK file.

## Option 1: Install as PWA (Recommended - No APK Needed!)

The **easiest and fastest** way to use this app on your phone is to install it as a PWA. This works exactly like a native app without needing an APK file.

### Steps to Install PWA on Android:

1. **Open Chrome Browser** on your Android phone
2. **Navigate to**: https://swolem12.github.io/AFOQT-app/
3. **Tap the menu** (three dots ⋮ in the top-right corner)
4. **Select "Add to Home screen"** or **"Install app"**
   - You may see a popup saying "Add AFOQT Quest to Home screen"
5. **Tap "Add"** or **"Install"**
6. The app icon will appear on your home screen
7. **Launch the app** from your home screen - it runs in fullscreen mode without browser UI
8. The app works **100% offline** after the first visit

### Benefits of PWA Installation:
✅ **No APK download required** - installs directly from the website  
✅ **Automatic updates** - always get the latest version  
✅ **Works offline** - full functionality without internet  
✅ **Fullscreen mode** - looks and feels like a native app  
✅ **Same as APK** - functionally identical to a native app  
✅ **No Google Play required** - install directly from browser  

---

## Option 2: Generate APK File (Advanced)

If you specifically need an APK file (e.g., for distribution or sideloading), you can convert this PWA to an APK using one of the following methods:

### Method A: Using PWABuilder.com (Easiest)

[PWABuilder](https://www.pwabuilder.com/) is a free Microsoft tool that converts PWAs to APKs automatically.

**Steps:**

1. **Visit**: https://www.pwabuilder.com/
2. **Enter the URL**: `https://swolem12.github.io/AFOQT-app/`
3. **Click "Start"**
4. PWABuilder will analyze the PWA and show a report card
5. **Click on "Android"** in the "Publish your PWA" section
6. **Select "TWA (Trusted Web Activity)"** or **"Service Worker"** option
7. **Configure settings**:
   - App name: AFOQT Quest
   - Package ID: com.swolem12.afoqtapp (or your preference)
   - Version: 1.0.0
   - Host: swolem12.github.io
   - Start URL: /AFOQT-app/
8. **Click "Generate"**
9. **Download the APK** or Android Studio project
10. **Sign the APK** (PWABuilder can do this for you)
11. **Install on your phone** by enabling "Install from Unknown Sources" in Settings

**APK Signing Note**: For distribution outside Google Play, you'll need to sign the APK. PWABuilder can generate a signing key for you.

### Method B: Using Bubblewrap CLI (Developer Option)

[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) is Google's official tool for creating TWA APKs from PWAs.

**Prerequisites:**
- Node.js 14 or higher
- JDK 8 or higher
- Android SDK

**Steps:**

```bash
# Install Bubblewrap
npm install -g @bubblewrap/cli

# Initialize your project
bubblewrap init --manifest https://swolem12.github.io/AFOQT-app/manifest.json

# Answer the prompts:
# - Application name: AFOQT Quest
# - Short name: AFOQT Quest
# - Package ID: com.swolem12.afoqtapp
# - Host: swolem12.github.io
# - Start URL: /AFOQT-app/
# - Theme color: #00ffff
# - Background color: #000000

# Build the APK
bubblewrap build

# The APK will be generated in: ./app-release-signed.apk
```

**Install the APK:**
```bash
# Connect your phone via USB with debugging enabled
adb install app-release-signed.apk
```

Or transfer the APK to your phone and install it manually.

### Method C: Using Android Studio (Full Control)

For complete control, you can create a native Android app that wraps the PWA.

**Steps:**

1. **Install Android Studio**
2. **Create a new project** with "Empty Activity"
3. **Add dependencies** in `build.gradle`:
   ```gradle
   implementation 'androidx.browser:browser:1.5.0'
   ```
4. **Create a Trusted Web Activity** that loads your PWA
5. **Configure Digital Asset Links** for verification
6. **Build and sign the APK**

This method requires Android development knowledge but gives you full control over the app.

---

## Comparison: PWA vs APK

| Feature | PWA (Install from Browser) | APK File |
|---------|---------------------------|----------|
| Installation | Tap "Add to Home screen" | Download & install APK |
| Updates | Automatic | Manual or via store |
| Distribution | Share website URL | Share APK file |
| Storage | ~5-10 MB | ~5-15 MB |
| Permissions | Browser-managed | Android-managed |
| Offline | ✅ Yes | ✅ Yes |
| Performance | ✅ Excellent | ✅ Excellent |
| Complexity | ⭐ Very Easy | ⭐⭐⭐ Moderate |

---

## Recommended Approach

**For personal use**: Install as PWA (Option 1) - it's instant and works perfectly.

**For distribution**: 
- Share the website URL and installation instructions
- OR generate an APK using PWABuilder (Method A)

**For app stores**: Use Bubblewrap or Android Studio to create a production APK

---

## Troubleshooting

### PWA Installation Issues

**Problem**: "Add to Home screen" option not showing
- **Solution**: Make sure you're using Chrome or Edge browser on Android
- **Solution**: Visit the website via HTTPS (not HTTP)
- **Solution**: Try waiting a few seconds for the browser to detect the PWA

**Problem**: App doesn't work offline
- **Solution**: Visit the app once while online to cache the files
- **Solution**: Check that service workers are enabled in browser settings

### APK Installation Issues

**Problem**: "App not installed" error
- **Solution**: Enable "Install from Unknown Sources" in Android Settings
- **Solution**: Make sure the APK is properly signed
- **Solution**: Check that you have enough storage space

**Problem**: Digital Asset Links verification failed
- **Solution**: Ensure `.well-known/assetlinks.json` is properly configured on your domain
- **Solution**: Use a package name that matches your domain

---

## Additional Resources

- [PWA Install Guide](https://web.dev/install-criteria/)
- [PWABuilder Documentation](https://docs.pwabuilder.com/)
- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [Trusted Web Activities Guide](https://developer.chrome.com/docs/android/trusted-web-activity/)

---

## Questions?

If you have any questions about installing or using this app, please open an issue on GitHub.
