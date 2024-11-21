#!/bin/bash

# Check if a target directory is provided
if [ -z "$1" ]; then
	echo "Usage: $0 <target-directory>"
	exit 1
fi

TARGET_DIR="$1"

# Check if the provided path is a directory
if [ ! -d "$TARGET_DIR" ]; then
	echo "Error: $TARGET_DIR is not a valid directory."
	exit 1
fi

# Rename all .js files to .ts
find "$TARGET_DIR" -type f -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.ts"' {} \;

# Rename all .jsx files to .tsx
find "$TARGET_DIR" -type f -name "*.jsx" -exec bash -c 'mv "$0" "${0%.jsx}.tsx"' {} \;

echo "Renaming complete in $TARGET_DIR!"
