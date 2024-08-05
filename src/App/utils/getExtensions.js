function getExtensions(type) {
  let extensions = {
    image: [
      ".ai",
      ".bmp",
      ".cdr",
      ".dng",
      ".eps",
      ".gif",
      ".ico",
      ".jpeg",
      ".jpg",
      ".png",
      ".psd",
      ".raw",
      ".svg",
      ".tif",
      ".tiff",
      ".webp",
      ".xcf",
    ],
    video: [".mp4", ".ogg", ".webm"],
  };

  return extensions[type] || null;
}

export default getExtensions;
