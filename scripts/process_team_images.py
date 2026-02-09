import os
from PIL import Image

# Configuration
SOURCE_DIR = "/Users/nikita/Documents/My_Projects/Pagenineteen2"
DEST_DIR = "/Users/nikita/Documents/My_Projects/Pagenineteen2/src/assets/images/team"
TARGET_WIDTH = 800

# Mapping source filenames to destination filenames (without extension)
# Note: Source files have " v5.jpg" suffix based on user input
files_map = {
    "Altaibayar v5.jpg": "Altaibayar",
    "Louis v5.jpg": "Louis",
    "Oliver v5.jpg": "Oliver",
    "Pedro v5.jpg": "Pedro",
    "Tarik v5.jpg": "Tarik",
    "Will v5.jpg": "Will",
    "Zo v5.jpg": "Zo"
}

def process_images():
    if not os.path.exists(DEST_DIR):
        os.makedirs(DEST_DIR)
        print(f"Created directory: {DEST_DIR}")

    for src_filename, dest_name in files_map.items():
        src_path = os.path.join(SOURCE_DIR, src_filename)
        dest_path = os.path.join(DEST_DIR, f"{dest_name}.webp")

        if not os.path.exists(src_path):
            print(f"Warning: Source file not found: {src_path}")
            continue

        try:
            with Image.open(src_path) as img:
                # Calculate new height to maintain aspect ratio
                width_percent = (TARGET_WIDTH / float(img.size[0]))
                new_height = int((float(img.size[1]) * float(width_percent)))
                
                # Resize
                img = img.resize((TARGET_WIDTH, new_height), Image.Resampling.LANCZOS)
                
                # Save as WebP
                img.save(dest_path, "WEBP", quality=85)
                print(f"Processed: {src_filename} -> {dest_name}.webp ({TARGET_WIDTH}x{new_height})")
                
        except Exception as e:
            print(f"Error processing {src_filename}: {e}")

if __name__ == "__main__":
    process_images()
