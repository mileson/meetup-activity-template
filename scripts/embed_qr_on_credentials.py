#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def load_font(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size=size)
            except Exception:
                continue
    return ImageFont.load_default()


def rounded_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size, size), radius=radius, fill=255)
    return mask


def process_image(credential_path: Path, qr_path: Path, out_path: Path):
    base = Image.open(credential_path).convert("RGBA")
    w, h = base.size

    qr = Image.open(qr_path).convert("RGBA")
    qr_size = max(120, min(int(w * 0.2), 240))
    qr_size = int(qr_size * 0.9)
    qr = qr.resize((qr_size, qr_size), Image.LANCZOS)

    radius = int(qr_size * 0.16)
    mask = rounded_mask(qr_size, radius)

    padding = int(w * 0.04)
    qr_x = w - padding - qr_size
    qr_y = h - padding - qr_size + 20

    base.paste(qr, (qr_x, qr_y), mask=mask)

    draw = ImageDraw.Draw(base)
    font_size = max(12, int(w * 0.024))
    font = load_font(font_size)
    text = "扫码快速验证"
    vertical_text = "\n".join(list(text))

    bbox = draw.multiline_textbbox((0, 0), vertical_text, font=font, spacing=2)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]

    text_x = qr_x - 12 - text_w
    if text_x < padding:
        text_x = padding
    text_y = qr_y + int((qr_size - text_h) * 0.5)
    if text_y < padding:
        text_y = padding

    draw.multiline_text(
        (text_x, text_y),
        vertical_text,
        font=font,
        spacing=2,
        fill=(156, 156, 156, 255),
        align="center",
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(out_path, quality=95)


def main():
    parser = argparse.ArgumentParser(description="Embed rounded QR codes onto credential images.")
    parser.add_argument("--credentials-dir", default="exports/凭证", help="凭证图片目录")
    parser.add_argument("--qr-dir", default="exports/qrcodes", help="二维码图片目录")
    parser.add_argument("--out-dir", default="exports/凭证_带二维码", help="输出目录")
    parser.add_argument("--overwrite", action="store_true", help="覆盖原凭证图片")
    args = parser.parse_args()

    cred_dir = Path(args.credentials_dir)
    qr_dir = Path(args.qr_dir)
    out_dir = Path(args.out_dir)

    if args.overwrite:
        out_dir = cred_dir

    if not cred_dir.exists():
        raise SystemExit(f"凭证目录不存在: {cred_dir}")
    if not qr_dir.exists():
        raise SystemExit(f"二维码目录不存在: {qr_dir}")

    for cred in sorted(cred_dir.glob("*.png")):
        stem = cred.stem
        name = stem.split(" ", 1)[-1]
        qr_path = qr_dir / f"{name}.png"
        if not qr_path.exists():
            print(f"跳过 {cred.name}: 未找到二维码 {qr_path.name}")
            continue
        out_path = out_dir / cred.name
        process_image(cred, qr_path, out_path)
        print(f"输出 {out_path}")


if __name__ == "__main__":
    main()
