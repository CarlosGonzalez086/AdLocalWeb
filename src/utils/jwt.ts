export interface JwtBasePayload {
  exp?: number;
  [key: string]: unknown;
}

export const decodeJwtPayload = <T extends JwtBasePayload = JwtBasePayload>(
  token: string,
): T | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    const binary = window.atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);

    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};
