'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import '@/styles/react-quill.css'

type RichTextEditorProps = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: [2, 3, 4, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'blockquote', 'code-block'],
        ['clean'],
      ],
    }),
    [],
  )

  if (!mounted) {
    return (
      <textarea
        className="min-h-[200px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        defaultValue={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  return (
    <div className="rich-text bg-slate-950/60 rounded-lg border border-slate-800">
      {/* @ts-expect-error quill types */}
      <ReactQuill value={value} onChange={onChange} placeholder={placeholder} modules={modules} />
    </div>
  )
}
