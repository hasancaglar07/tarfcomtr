const DEFAULT_IMAGE = '/img/tarf.png'

export const getDefaultImage = () => DEFAULT_IMAGE

export const resolveImageSrc = (src?: string | null, fallback: string = DEFAULT_IMAGE) => {
  if (!src) {
    return fallback
  }

  const trimmed = src.trim()
  if (!trimmed) {
    return fallback
  }

  const isAbsoluteUrl = /^https?:\/\//i.test(trimmed)
  const isRootRelative = trimmed.startsWith('/')

  if (isAbsoluteUrl || isRootRelative) {
    return trimmed
  }

  return fallback
}

