'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full animate-pulse rounded-lg bg-slate-800" />,
})

interface RichTextEditorProps {
    value: string
    onChange: (content: string) => void
    placeholder?: string
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['link', 'clean'],
    ],
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
]

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    return (
        <div className="rich-text-editor overflow-hidden rounded-lg border border-slate-700 bg-slate-900 text-slate-100">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="min-h-[250px]"
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
      `}} />
        </div>
    )
}
