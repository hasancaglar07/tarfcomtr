'use client'

import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import '@/styles/react-quill.css'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  FolderOpen,
  ImageIcon,
  Loader2,
  StretchHorizontal,
  Upload,
  Video,
} from 'lucide-react'
import { MediaPickerModal } from './media-picker'

// Import ReactQuill type for ref
import type ReactQuillType from 'react-quill'

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return RQ
  },
  {
    ssr: false,
    loading: () => <div className="h-[300px] w-full animate-pulse rounded-lg bg-slate-800" />,
  }
)

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

type ImageWidthPreset = 'small' | 'medium' | 'large' | 'full'
type ImageAlignPreset = 'left' | 'center' | 'right'

const imageWidthMap: Record<ImageWidthPreset, string> = {
  small: '40%',
  medium: '60%',
  large: '80%',
  full: '100%',
}

const imageWidthLabels: Record<ImageWidthPreset, string> = {
  small: 'Dar',
  medium: 'Orta',
  large: 'Geniş',
  full: 'Tam',
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
  'color',
  'background',
  'image',
  'video',
  'align',
  'width',
]

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<ReactQuillType | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image')
  const [mounted, setMounted] = useState(false)
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)
  const [mediaPickerFilter, setMediaPickerFilter] = useState<'image' | 'video'>('image')
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)
  const [selectedImageWidth, setSelectedImageWidth] = useState<ImageWidthPreset>('full')
  const [selectedImageAlign, setSelectedImageAlign] = useState<ImageAlignPreset>('center')

  useEffect(() => {
    setMounted(true)
  }, [])

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('kind', file.type.startsWith('video') ? 'video' : 'image')

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        alert(`Yükleme hatası: ${error.error || 'Bilinmeyen hata'}`)
        return null
      }

      const data = await res.json()
      return data.url
    } catch (err) {
      console.error('Upload error:', err)
      alert('Dosya yüklenirken bir hata oluştu.')
      return null
    }
  }, [])

  const getQuillEditor = useCallback(() => {
    if (!quillRef.current) return null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editor = (quillRef.current as any)?.getEditor?.()
    if (editor) return editor
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (quillRef.current as any)?.editor || null
  }, [])

  const clearImageSelection = useCallback(() => {
    const editor = getQuillEditor()
    const root = editor?.root as HTMLElement | undefined
    root?.querySelectorAll('img.ql-selected-image').forEach((image) => {
      image.classList.remove('ql-selected-image')
    })
    setSelectedImage(null)
  }, [getQuillEditor])

  const syncSelectedImageState = useCallback((image: HTMLImageElement | null) => {
    if (!image) {
      setSelectedImage(null)
      return
    }

    const width = image.style.width || image.getAttribute('width') || '100%'
    const widthPreset =
      width === '40%' ? 'small' : width === '60%' ? 'medium' : width === '80%' ? 'large' : 'full'

    const parentAlign = image.parentElement instanceof HTMLElement
      ? image.parentElement.style.textAlign || image.parentElement.getAttribute('align') || ''
      : ''
    const align = parentAlign === 'right' ? 'right' : parentAlign === 'center' ? 'center' : 'left'

    setSelectedImage(image)
    setSelectedImageWidth(widthPreset)
    setSelectedImageAlign(align)
  }, [])

  const highlightSelectedImage = useCallback((image: HTMLImageElement | null) => {
    const editor = getQuillEditor()
    const root = editor?.root as HTMLElement | undefined
    root?.querySelectorAll('img.ql-selected-image').forEach((node) => {
      node.classList.remove('ql-selected-image')
    })

    if (image) {
      image.classList.add('ql-selected-image')
    }
  }, [getQuillEditor])

  const persistEditorHtml = useCallback(() => {
    const editor = getQuillEditor()
    if (!editor) return
    onChange(editor.root.innerHTML)
  }, [getQuillEditor, onChange])

  const insertMediaUrl = useCallback((url: string, type: 'image' | 'video') => {
    const editor = getQuillEditor()
    if (editor) {
      const range = editor.getSelection(true) || { index: editor.getLength() - 1 }
      editor.insertEmbed(range.index, type, url)
      editor.setSelection(range.index + 1)
      if (type === 'image') {
        window.setTimeout(() => {
          const root = editor.root as HTMLElement
          const images = root.querySelectorAll('img')
          const image = images.item(images.length - 1) as HTMLImageElement | null
          if (!image) return
          image.style.width = '100%'
          image.style.maxWidth = '100%'
          image.style.height = 'auto'
          if (image.parentElement instanceof HTMLElement) {
            image.parentElement.style.textAlign = 'center'
          }
          highlightSelectedImage(image)
          syncSelectedImageState(image)
          onChange(editor.root.innerHTML)
        }, 0)
      }
    } else {
      // Fallback
      if (type === 'image') {
        onChange(
          value +
            `<p style="text-align:center;"><img src="${url}" width="100%" style="max-width:100%;height:auto;" /></p>`,
        )
      } else {
        const embedUrl = convertToEmbedUrl(url)
        onChange(value + `<p><iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe></p>`)
      }
    }
  }, [getQuillEditor, highlightSelectedImage, onChange, syncSelectedImageState, value])

  const setImageWidth = useCallback((width: ImageWidthPreset) => {
    if (!selectedImage) return
    selectedImage.style.width = imageWidthMap[width]
    selectedImage.setAttribute('width', imageWidthMap[width])
    selectedImage.style.maxWidth = '100%'
    selectedImage.style.height = 'auto'
    setSelectedImageWidth(width)
    persistEditorHtml()
    window.setTimeout(() => {
      highlightSelectedImage(selectedImage)
      syncSelectedImageState(selectedImage)
    }, 0)
  }, [highlightSelectedImage, persistEditorHtml, selectedImage, syncSelectedImageState])

  const setImageAlign = useCallback((align: ImageAlignPreset) => {
    if (!selectedImage) return
    if (selectedImage.parentElement instanceof HTMLElement) {
      selectedImage.parentElement.style.textAlign = align
      selectedImage.parentElement.setAttribute('align', align)
    }
    setSelectedImageAlign(align)
    persistEditorHtml()
    window.setTimeout(() => {
      highlightSelectedImage(selectedImage)
      syncSelectedImageState(selectedImage)
    }, 0)
  }, [highlightSelectedImage, persistEditorHtml, selectedImage, syncSelectedImageState])

  const handleEditorImageSelection = useCallback((target: EventTarget | null) => {
    const element = target instanceof HTMLElement ? target : null
    const image = element?.closest('img') as HTMLImageElement | null

    if (image) {
      highlightSelectedImage(image)
      syncSelectedImageState(image)
      return
    }

    clearImageSelection()
  }, [clearImageSelection, highlightSelectedImage, syncSelectedImageState])

  const openMediaPicker = (type: 'image' | 'video') => {
    setMediaPickerFilter(type)
    setMediaPickerOpen(true)
  }

  const handleMediaSelect = (url: string) => {
    insertMediaUrl(url, mediaPickerFilter)
  }

  const handleUploadClick = (type: 'image' | 'video') => {
    setUploadType(type)
    fileInputRef.current?.click()
  }

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (uploadType === 'image' && !file.type.startsWith('image/')) {
      alert('Lütfen bir resim dosyası seçin.')
      return
    }
    if (uploadType === 'video' && !file.type.startsWith('video/')) {
      alert('Lütfen bir video dosyası seçin.')
      return
    }

    // Size limits
    const maxSize = uploadType === 'image' ? 10 * 1024 * 1024 : 100 * 1024 * 1024
    if (file.size > maxSize) {
      alert(`Dosya çok büyük. Maksimum: ${uploadType === 'image' ? '10MB' : '100MB'}`)
      return
    }

    setUploading(true)
    try {
      const url = await uploadFile(file)
      if (url) {
        insertMediaUrl(url, uploadType)
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [uploadFile, uploadType, insertMediaUrl])

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link'],
        ['clean'],
      ],
    },
  }), [])

  return (
    <div className="rich-text-editor overflow-hidden rounded-lg border border-slate-700 bg-slate-900 text-slate-100">
      {/* Custom toolbar for image/video */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-700 bg-slate-800 px-2 py-1.5">
        {/* Image options */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => openMediaPicker('image')}
            disabled={uploading}
            className="flex items-center gap-1 rounded-l border border-slate-600 bg-slate-700 px-2 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-600 disabled:opacity-50"
            title="Kütüphaneden resim seç"
          >
            <FolderOpen className="h-3.5 w-3.5" />
            <ImageIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleUploadClick('image')}
            disabled={uploading}
            className="flex items-center gap-1 rounded-r border border-l-0 border-slate-600 bg-slate-700 px-2 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-600 disabled:opacity-50"
            title="Yeni resim yükle"
          >
            <Upload className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Video options */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => openMediaPicker('video')}
            disabled={uploading}
            className="flex items-center gap-1 rounded-l border border-slate-600 bg-slate-700 px-2 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-600 disabled:opacity-50"
            title="Kütüphaneden video seç"
          >
            <FolderOpen className="h-3.5 w-3.5" />
            <Video className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleUploadClick('video')}
            disabled={uploading}
            className="flex items-center gap-1 rounded-r border border-l-0 border-slate-600 bg-slate-700 px-2 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-600 disabled:opacity-50"
            title="Yeni video yükle"
          >
            <Upload className="h-3.5 w-3.5" />
          </button>
        </div>

        {uploading && (
          <span className="ml-2 flex items-center gap-1 text-xs text-orange-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            Yükleniyor...
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-b border-slate-700 bg-slate-900/80 px-3 py-2">
        <div className="text-xs text-slate-400">
          Görsele tıklayın, ardından boyut ve hizalama seçin.
        </div>
        {selectedImage ? (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800 p-1">
              <span className="px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <StretchHorizontal className="mr-1 inline h-3 w-3" />
                Boyut
              </span>
              {(Object.keys(imageWidthMap) as ImageWidthPreset[]).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setImageWidth(preset)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                    selectedImageWidth === preset
                      ? 'bg-orange-500 text-slate-950'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {imageWidthLabels[preset]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800 p-1">
              <span className="px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Hizalama
              </span>
              {[
                { value: 'left' as const, icon: AlignLeft, label: 'Sol' },
                { value: 'center' as const, icon: AlignCenter, label: 'Orta' },
                { value: 'right' as const, icon: AlignRight, label: 'Sağ' },
              ].map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setImageAlign(option.value)}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                      selectedImageAlign === option.value
                        ? 'bg-orange-500 text-slate-950'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>

      {mounted && (
        <div
          onClickCapture={(event) => handleEditorImageSelection(event.target)}
          onMouseUpCapture={(event) => handleEditorImageSelection(event.target)}
        >
          <ReactQuill
            // @ts-expect-error - ReactQuill has ref support but types are incomplete
          ref={(el: ReactQuillType | null) => {
            quillRef.current = el
          }}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            className="min-h-[250px]"
          />
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={uploadType === 'image' ? 'image/*' : 'video/*'}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
        filter={mediaPickerFilter}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        .rich-text-editor .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #334155 !important;
          background: #1e293b !important;
        }
        .rich-text-editor .ql-container.ql-snow {
          border: none !important;
          font-family: inherit !important;
          font-size: 0.875rem !important;
        }
        .rich-text-editor .ql-editor {
          min-height: 250px !important;
          color: #f1f5f9 !important;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #64748b !important;
          font-style: normal !important;
        }
        .rich-text-editor .ql-snow .ql-stroke {
          stroke: #94a3b8 !important;
        }
        .rich-text-editor .ql-snow .ql-fill {
          fill: #94a3b8 !important;
        }
        .rich-text-editor .ql-snow .ql-picker {
          color: #94a3b8 !important;
        }
        .rich-text-editor .ql-snow .ql-picker-options {
          background-color: #1e293b !important;
          border-color: #334155 !important;
        }
        .rich-text-editor .ql-editor img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 8px !important;
          margin: 8px 0 !important;
        }
        .rich-text-editor .ql-editor img.ql-selected-image {
          outline: 3px solid rgba(249, 115, 22, 0.9) !important;
          outline-offset: 3px !important;
        }
        .rich-text-editor .ql-editor iframe,
        .rich-text-editor .ql-editor video {
          max-width: 100% !important;
          border-radius: 8px !important;
          margin: 8px 0 !important;
        }
        .rich-text-editor .ql-snow .ql-tooltip {
          background-color: #1e293b !important;
          border-color: #334155 !important;
          color: #f1f5f9 !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }
        .rich-text-editor .ql-snow .ql-tooltip input[type=text] {
          background-color: #0f172a !important;
          border-color: #475569 !important;
          color: #f1f5f9 !important;
        }
        .rich-text-editor .ql-snow .ql-tooltip a.ql-action,
        .rich-text-editor .ql-snow .ql-tooltip a.ql-remove {
          color: #fb923c !important;
        }
      `}} />
    </div>
  )
}

// Helper function to convert YouTube/Vimeo URLs to embed format
function convertToEmbedUrl(url: string): string {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  // Return as-is if not YouTube/Vimeo
  return url
}
