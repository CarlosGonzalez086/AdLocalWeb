const HEX_COLOR_RE = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const DATA_IMAGE_RE =
  /^data:image\/(?:png|jpeg|jpg|webp|gif);base64,[a-z0-9+/=\s]+$/i;
const CSS_UNSAFE_URL_RE = /["'()\\\r\n]/;

export function sanitizeHexColor(
  value: string | null | undefined,
  fallback: string,
): string {
  const trimmed = value?.trim();
  if (!trimmed || !HEX_COLOR_RE.test(trimmed)) {
    return fallback;
  }
  return trimmed;
}

export function sanitizeSafeImageUrl(
  value: string | null | undefined,
  options?: { allowDataImage?: boolean; rejectCssChars?: boolean },
): string | null {
  const raw = value?.trim();
  if (!raw) return null;

  if (options?.rejectCssChars && CSS_UNSAFE_URL_RE.test(raw)) {
    return null;
  }

  if (DATA_IMAGE_RE.test(raw)) {
    return options?.allowDataImage ? raw : null;
  }

  if (
    raw.startsWith("/") &&
    !raw.startsWith("//") &&
    !raw.startsWith("/\\")
  ) {
    return raw;
  }

  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" || parsed.protocol === "http:"
      ? parsed.toString()
      : null;
  } catch {
    return null;
  }
}
