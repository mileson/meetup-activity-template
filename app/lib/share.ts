"use client";

type ShareOrDownloadOptions = {
  url: string;
  filename: string;
  onFallback?: (message: string) => void;
};

export function buildDownloadFilename(name: string | undefined, imageUrl: string) {
  const safeName = (name || "入场凭证").replace(/[\\/:*?"<>|]/g, "_");
  const pathname = imageUrl.split("?")[0] || "";
  const match = pathname.match(/\.([a-zA-Z0-9]+)$/);
  const extension = match ? match[1].toLowerCase() : "png";
  return `${safeName}.${extension}`;
}

export async function shareOrDownload({
  url,
  filename,
  onFallback,
}: ShareOrDownloadOptions) {
  let blob: Blob | null = null;

  try {
    const response = await fetch(url);
    if (response.ok) {
      blob = await response.blob();
    }
  } catch {
    blob = null;
  }

  if (blob && navigator.share && navigator.canShare) {
    const file = new File([blob], filename, {
      type: blob.type || "image/png",
    });

    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "入场凭证",
          text: "入场时出示即可",
        });
        return "shared";
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return "canceled";
        }
      }
    }
  }

  const link = document.createElement("a");
  const objectUrl = blob ? URL.createObjectURL(blob) : url;
  link.href = objectUrl;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  if (blob) {
    URL.revokeObjectURL(objectUrl);
  }
  onFallback?.("已下载到文件/下载，请保存到相册");
  return "downloaded";
}
