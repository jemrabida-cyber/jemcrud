#!/bin/bash
# Render build script

echo "Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

echo "Building NestJS application..."
npm run build

echo "Build completed successfully!"
