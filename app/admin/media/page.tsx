import { MediaLibrary } from '@/components/admin/media-library'
import { BlobUpload } from '@/components/admin/blob-upload'

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">Medya kütüphanesi</h1>
            <p className="text-sm text-slate-400">
              Son yüklenen dosyalar (Blob). Kapak/galeri için URL kopyalayın; arama ve filtreleri
              kullanın.
            </p>
          </div>
        </div>

        <BlobUpload />

        <MediaLibrary />
      </div>
    </div>
  )
}
