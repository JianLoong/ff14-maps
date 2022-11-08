`for file in ./*; do cwebp -v 50 "$file" -o "${file%.*}.webp"; done`
