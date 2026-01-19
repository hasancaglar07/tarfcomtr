'use client'

import { useState, useRef } from 'react'
import { ImageIcon, FolderOpen, Upload, X, Loader2 } from 'lucide-react'
import { MediaPickerModal } from './media-picker'

interface ImageInputProps {
    value: string
    onChange: (url: string) => void
    label?: string
    placeholder?: string
    id?: string
    name?: string
    helpText?: string
}

export function ImageInput({
    value,
    onChange,
    label,
    placeholder = 'Resim URL\'si',
    id,
    name,
    helpText,
}: ImageInputProps) {
    const [pickerOpen, setPickerOpen] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

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
            onChange(data.url)
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
        const file = e.target.files?.[0]
        if (file) {
            handleUpload(file)
        }
    }

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm text-slate-300" htmlFor={id}>
                    {label}
                </label>
            )}

            <div className="flex gap-2">
                {/* Preview or placeholder */}
                <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
                    {value ? (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={value}
                                alt="Preview"
                                className="h-full w-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => onChange('')}
                                className="absolute right-1 top-1 rounded bg-red-500/80 p-0.5 text-white transition hover:bg-red-500"
                                title="Kaldır"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-500">
                            <ImageIcon className="h-8 w-8" />
                        </div>
                    )}
                    {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                            <Loader2 className="h-6 w-6 animate-spin text-orange-400" />
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-1">
                    <button
                        type="button"
                        onClick={() => setPickerOpen(true)}
                        disabled={uploading}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
                    >
                        <FolderOpen className="h-3.5 w-3.5" />
                        Kütüphaneden Seç
                    </button>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
                    >
                        <Upload className="h-3.5 w-3.5" />
                        Yeni Yükle
                    </button>
                </div>
            </div>

            {/* URL input for manual entry */}
            <input
                id={id}
                name={name}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            />

            {helpText && (
                <p className="text-xs text-slate-500">{helpText}</p>
            )}

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Media Picker Modal */}
            <MediaPickerModal
                isOpen={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onSelect={onChange}
                filter="image"
            />
        </div>
    )
}
