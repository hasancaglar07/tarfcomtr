export function stripImages(html: string): string {
  if (!html) return ""

  // Remove <img> tags (self-closing or standard)
  let result = html.replace(/<img[^>]*>/gi, "")

  // Remove empty <figure> wrappers left after stripping images
  result = result.replace(/<figure[^>]*>\s*<\/figure>/gi, "")

  return result
}

