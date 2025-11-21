#!/usr/bin/env bash
# Script to generate Android APK from AFOQT PWA using Bubblewrap
# Prerequisites: Node.js 14+, JDK 8+, Android SDK

set -e

echo "=================================================="
echo "AFOQT Quest - APK Generator"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js 14 or higher from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Check if Bubblewrap is installed
if ! command -v bubblewrap &> /dev/null; then
    echo ""
    echo "📦 Bubblewrap CLI not found. Installing..."
    npm install -g @bubblewrap/cli
    echo "✅ Bubblewrap installed successfully"
else
    echo "✅ Bubblewrap is already installed"
fi

echo ""
echo "=================================================="
echo "Initializing APK project..."
echo "=================================================="
echo ""

# Create a temporary directory for the APK project
APK_DIR="./apk-build"
mkdir -p "$APK_DIR"
cd "$APK_DIR"

echo "This will create an Android APK for AFOQT Quest"
echo ""
echo "Please provide the following information:"
echo "(Press Enter to use default values)"
echo ""

# Get package name
read -p "Package ID (default: com.github.swolem12.afoqtapp): " PACKAGE_ID
PACKAGE_ID=${PACKAGE_ID:-com.github.swolem12.afoqtapp}

# Get app version
read -p "App version (default: 1.0.0): " APP_VERSION
APP_VERSION=${APP_VERSION:-1.0.0}

echo ""
echo "=================================================="
echo "Configuration:"
echo "=================================================="
echo "App Name: AFOQT Quest"
echo "Package ID: $PACKAGE_ID"
echo "Version: $APP_VERSION"
echo "URL: https://swolem12.github.io/AFOQT-app/"
echo "=================================================="
echo ""

# Initialize Bubblewrap project
# Note: Bubblewrap will prompt for additional configuration interactively
# Recommended: Package ID: $PACKAGE_ID, Version: $APP_VERSION
echo "Initializing Bubblewrap project (interactive prompts will follow)..."
bubblewrap init --manifest https://swolem12.github.io/AFOQT-app/manifest.json

echo ""
echo "=================================================="
echo "Building APK..."
echo "=================================================="
echo ""

# Build the APK
bubblewrap build

echo ""
echo "=================================================="
echo "✅ SUCCESS!"
echo "=================================================="
echo ""
echo "Your APK has been generated!"
echo ""
echo "📱 APK Location: $APK_DIR/app-release-signed.apk"
echo ""
echo "To install on your phone:"
echo "1. Enable 'Install from Unknown Sources' in Android Settings"
echo "2. Transfer the APK to your phone"
echo "3. Open the APK file to install"
echo ""
echo "Or install via ADB:"
echo "  adb install app-release-signed.apk"
echo ""
echo "=================================================="
