#!/bin/bash
# Render build script

echo "Installing dependencies with legacy peer deps (including dev dependencies)..."
npm install --include=dev --legacy-peer-deps

echo "Building NestJS application..."
npm run build

echo "Build completed successfully!"
