'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ShareButtonProps = {
  title?: string
  url?: string
  locale?: string
  className?: string
}

const labels = {
  tr: {
    share: 'Paylaş',
    copied: 'Kopyalandı',
  },
  en: {
    share: 'Share',
    copied: 'Copied',
  },
  ar: {
    share: 'شارك',
    copied: 'تم النسخ',
  },
}

export function ShareButton({ title, url, locale = 'tr', className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const content = labels[locale as keyof typeof labels] ?? labels.tr

  async function handleShare() {
    const shareUrl = url || window.location.href
    const shareTitle = title || document.title

    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, url: shareUrl })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // Ignore cancelled native share dialogs.
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleShare}
      className={className}
      aria-label={copied ? content.copied : content.share}
    >
      {copied ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
      {copied ? content.copied : content.share}
    </Button>
  )
}
