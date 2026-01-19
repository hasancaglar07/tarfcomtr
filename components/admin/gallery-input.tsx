'use client'

import { useState, useRef } from 'react'
import { ImageIcon, FolderOpen, Upload, X, Loader2, Plus } from 'lucide-react'
import { MediaPickerModal } from './media-picker'

interface GalleryInputProps {
    value: string
    onChange: (urls: string) => void
    label?: string
    id?: string
    name?: string
    helpText?: string
}

export function GalleryInput({
    value,
    onChange,
    label = 'Galeri',
    id,
    name,
    helpText,
}: GalleryInputProps) {
    const [pickerOpen, setPickerOpen] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Parse URLs from comma separated string
    const urls = value
        .split(',')
        .map((u) => u.trim())
        .filter((u) => u.length > 0)

    const addUrl = (url: string) => {
        if (urls.includes(url)) return
        const newUrls = [...urls, url]
        onChange(newUrls.join(', '))
    }

    const removeUrl = (urlToRemove: string) => {
        const newUrls = urls.filter((u) => u !== urlToRemove)
        onChange(newUrls.join(', '))
    }

    const handleUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Lütfen bir resim dosyası seçin.')
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('Dosya çok büyük. Maksimum: 10MB')
            return
        }

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('kind', 'image')

            const res = await fetch('/api/media/upload', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                const error = await res.json()
                alert(`Yükleme hatası: ${error.error || 'Bilinmeyen hata'}`)
                return
            }

            const data = await res.json()
            addUrl(data.url)
        } catch (err) {
            console.error('Upload error:', err)
            alert('Dosya yüklenirken bir hata oluştu.')
        } finally {
            setUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            Array.from(files).forEach((file) => handleUpload(file))
        }
    }

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm text-slate-300" htmlFor={id}>
                    {label}
                </label>
            )}

            {/* Gallery preview */}
            <div className="flex flex-wrap gap-2">
                {urls.map((url, index) => (
                    <div
                        key={`${url}-${index}`}
                        className="group relative h-16 w-16 overflow-hidden rounded-lg border border-slate-700"
                    >
                        <img
                            src={url}
                            alt={`Gallery ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeUrl(url)}
                            className="absolute right-0.5 top-0.5 rounded bg-red-500/80 p-0.5 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
                            title="Kaldır"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}

                {/* Add buttons */}
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => setPickerOpen(true)}
                        disabled={uploading}
                        className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-600 text-slate-400 transition hover:border-slate-500 hover:text-slate-300 disabled:opacity-50"
                        title="Kütüphaneden seç"
                    >
                        <FolderOpen className="h-5 w-5" />
                        <span className="mt-0.5 text-[10px]">Seç</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-600 text-slate-400 transition hover:border-slate-500 hover:text-slate-300 disabled:opacity-50"
                        title="Yeni yükle"
                    >
                        {uploading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-orange-400" />
                        ) : (
                            <>
                                <Upload className="h-5 w-5" />
                                <span className="mt-0.5 text-[10px]">Yükle</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Hidden URL input for form submission */}
            <input
                id={id}
                name={name}
                type="hidden"
                value={value}
            />

            {helpText && (
                <p className="text-xs text-slate-500">{helpText}</p>
            )}

            {/* Hidden file input - allows multiple */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Media Picker Modal */}
            <MediaPickerModal
                isOpen={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onSelect={addUrl}
                filter="image"
            />
        </div>
    )
}
