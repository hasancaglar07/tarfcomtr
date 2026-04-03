import {
  ApplicationStatus,
  ChairAssistantChair,
  ChairAssistantDocumentType,
} from '@prisma/client'

export const chairAssistantPageTitle = 'TARF Düşünce Enstitüsü Kürsü Asistan Alımı'
export const chairAssistantPageDescription =
  'TARF Düşünce Enstitüsü bünyesindeki kürsüler için kürsü asistanı başvuru ilanı ve başvuru formu.'

export const chairAssistantRequestedDocuments = [
  'Lisans diploması',
  'Lisansüstü öğrenci belgesi',
  'YDS veya YÖKDİL sınav belgesi',
  'Akademik özgeçmiş ve yayın listesi',
  'Adli sicil belgesi',
] as const

export const chairAssistantResponsibilities = [
  'Kendi uzmanlık alanına ilişkin ulusal ve uluslararası sempozyum, kongre, çalıştay, fuar ve benzeri akademik/entelektüel organizasyonları takip etmek, güncel ilmî ve düşünsel gelişmelerden haberdar olmak.',
  'Kürsü Başkanı ve kürsü bünyesinde görev yapan araştırmacılarla koordineli bir çalışma yürütmek, gerekli durumlarda ortak süreçlere destek sağlamak.',
  'Kürsü Başkanı tarafından verilen araştırma, içerik üretimi, organizasyon ve raporlama çalışmalarını zamanında ve düzenli şekilde yerine getirmek.',
  'Uzmanlık alanına ilişkin kitap, rapor, broşür, makale, analiz ve benzeri yayın çalışmalarına katkı sunmak; gerekli durumlarda bu çalışmaları hazırlamak veya süreçlerini takip etmek.',
  'Alanına yönelik çevrim içi ve yüz yüze eğitim, seminer, atölye, konferans ve benzeri programların planlanması, organizasyonu ve yürütülmesine katkı sağlamak.',
  'TARF Düşünce Enstitüsü’nün diğer birimleri ve çalışanlarıyla uyum içerisinde çalışmak, kurumun ortak proje ve faaliyetlerinde aktif rol üstlenmek.',
  'Uzmanlık alanına ilişkin sosyal medya ve dijital platformlar için nitelikli içerik üretmek, bu içeriklerin planlanması, hazırlanması ve yayımlanma süreçlerini takip etmek.',
] as const

export const chairAssistantChairs = [
  {
    value: ChairAssistantChair.egitim,
    label: 'Eğitim Kürsüsü',
    shortLabel: 'Eğitim',
    requirements: [
      'Üniversitelerin Eğitim Bilimleri anabilim dallarına bağlı bilim dallarında yüksek lisans veya doktora yapıyor olmak.',
      'Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.',
    ],
  },
  {
    value: ChairAssistantChair.aile,
    label: 'Aile Kürsüsü',
    shortLabel: 'Aile',
    requirements: [
      'Üniversitelerin Sosyoloji, Din Sosyolojisi, Aile Danışmanlığı, Aile Sosyolojisi, Çocuk Gelişimi, Klinik Psikoloji (çift ve aile odaklı), Din Psikolojisi bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.',
      'Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.',
    ],
  },
  {
    value: ChairAssistantChair.genclik,
    label: 'Gençlik Kürsüsü',
    shortLabel: 'Gençlik',
    requirements: [
      'Üniversitelerin Sosyoloji, Din Sosyolojisi, Psikoloji, Din Psikolojisi, Gelişim Psikolojisi, Klinik Psikoloji, Medya İletişim, Gençlik Çalışmaları bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.',
      'Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.',
    ],
  },
  {
    value: ChairAssistantChair.tarih_kultur_ve_medeniyet,
    label: 'Tarih, Kültür ve Medeniyet Kürsüsü',
    shortLabel: 'Tarih, Kültür ve Medeniyet',
    requirements: [
      'Üniversitelerin Tarih (özellikle Osmanlı, İslam ve Dünya Tarihi), Sanat Tarihi, Antropoloji, Sosyoloji (kültür ve medeniyet odaklı), İslam Tarihi ve Medeniyeti, Türk Dili ve Edebiyatı, Felsefe (özellikle düşünce tarihi) bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.',
      'Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.',
    ],
  },
  {
    value: ChairAssistantChair.bilim_ve_teknoloji,
    label: 'Bilim ve Teknoloji Kürsüsü',
    shortLabel: 'Bilim ve Teknoloji',
    requirements: [
      'Üniversitelerin Bilgisayar Mühendisliği, Elektrik-Elektronik Mühendisliği, Yazılım Mühendisliği, Yapay Zeka ve Veri Mühendisliği, Malzeme Bilimi ve Mühendisliği, Biyoteknoloji, Moleküler Biyoloji ve Genetik, Uzay Havacılık Mühendisliği, Astronomi ve Uzay Bilimleri, Veri Bilimi, Veri Analitiği, Bilim tarihi ve Felsefesi bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.',
      'Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.',
    ],
  },
  {
    value: ChairAssistantChair.uluslararasi_iliskiler_ve_dis_politika,
    label: 'Uluslararası İlişkiler ve Dış Politika Kürsüsü',
    shortLabel: 'Uluslararası İlişkiler ve Dış Politika',
    requirements: [
      'Üniversitelerin Uluslararası İlişkiler, Siyaset Bilimi, Diplomasi ve Dış Politika Çalışmaları, Bölge Çalışmaları (Ortadoğu, Avrupa, Asya vb), Güvenlik Çalışmaları, Uluslararası Hukuk, Ekonomi (Uluslararası Ekonomi, Politik Ekonomi) bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.',
      'Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.',
    ],
  },
  {
    value: ChairAssistantChair.cevre_iklim_ve_sehir,
    label: 'Çevre, İklim ve Şehir Kürsüsü',
    shortLabel: 'Çevre, İklim ve Şehir',
    requirements: [
      'Üniversitelerin Çevre Mühendisliği, Şehir Bölge Planlama, Ekoloji, Ekosistem Bilimleri, Coğrafya, İklim Bilimleri, Meteoroloji Mühendisliği, Enerji Sistemleri/Yenilenebilir Enerji, Tarım ve Doğa Bilimleri, Peyzaj-Mimarlık, Mimarlık bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.',
      'Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.',
    ],
  },
] as const

export const chairAssistantDocumentDefinitions = [
  {
    type: ChairAssistantDocumentType.undergraduate_diploma,
    label: 'Lisans diploması',
    helper: 'PDF veya JPG olarak yükleyin.',
  },
  {
    type: ChairAssistantDocumentType.graduate_student_certificate,
    label: 'Lisansüstü öğrenci belgesi',
    helper: 'PDF veya JPG olarak yükleyin.',
  },
  {
    type: ChairAssistantDocumentType.language_exam_result,
    label: 'YDS veya YÖKDİL sınav belgesi',
    helper: 'PDF veya JPG olarak yükleyin.',
  },
  {
    type: ChairAssistantDocumentType.academic_cv,
    label: 'Akademik özgeçmiş ve yayın listesi',
    helper: 'Tek PDF veya JPG olarak yükleyin.',
  },
  {
    type: ChairAssistantDocumentType.criminal_record,
    label: 'Adli sicil belgesi',
    helper: 'PDF veya JPG olarak yükleyin.',
  },
] as const

export const chairAssistantStatusLabels: Record<ApplicationStatus, string> = {
  new: 'Yeni',
  in_review: 'İncelemede',
  closed: 'Kapatıldı',
}

export const chairAssistantStatusColors: Record<ApplicationStatus, string> = {
  new: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
  in_review: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
  closed: 'bg-slate-500/20 text-slate-200 border-slate-500/40',
}

export const chairAssistantStatusOptions: ApplicationStatus[] = ['new', 'in_review', 'closed']

export const chairAssistantAcceptedFileExtensions = '.pdf,.jpg,.jpeg'
export const chairAssistantAllowedMimeTypes = ['application/pdf', 'image/jpeg'] as const
export const chairAssistantMaxFileSize = 10 * 1024 * 1024

export const chairAssistantQuestions = [
  { key: 'fullName', label: '1. Adınız ve soyadınız nedir?' },
  { key: 'phone', label: '2. Telefon numaranız nedir?' },
  { key: 'email', label: '3. E-posta adresiniz nedir?' },
  { key: 'city', label: '4. İkamet ettiğiniz şehir nedir?' },
  { key: 'chair', label: '5. Başvurmak istediğiniz kürsü hangisidir?' },
  { key: 'undergraduateInfo', label: '6. Lisans mezuniyet bölümünüz ve üniversiteniz nedir?' },
  {
    key: 'graduateProgramInfo',
    label:
      '7. Hâlen yüksek lisans mı yoksa doktora mı yapıyorsunuz? (Program ve üniversite ile birlikte yazınız)',
  },
  { key: 'academicFields', label: '8. Akademik çalışma alanlarınız nelerdir?' },
  { key: 'thesisTopic', label: '9. Varsa tez konunuz veya yoğunlaştığınız araştırma başlığı nedir?' },
  { key: 'languageScore', label: '10. Yabancı dil bilginiz nedir? (Dil + sınav + puan)' },
  {
    key: 'previousWork',
    label: '11. Daha önce yer aldığınız akademik, sosyal veya kurumsal çalışmalar nelerdir?',
  },
  { key: 'motivation', label: '12. Başvurduğunuz kürsüye neden katılmak istiyorsunuz?' },
  { key: 'contribution', label: '13. Bu kürsüye nasıl bir katkı sunabilirsiniz?' },
  { key: 'weeklyAvailability', label: '14. Haftalık ortalama ne kadar zaman ayırabilirsiniz?' },
  {
    key: 'attendanceCommitment',
    label: '15. Online ve yüz yüze çalışmalara düzenli katılım sağlayabilir misiniz?',
  },
  { key: 'additionalNotes', label: '16. Eklemek istediğiniz bir husus var mı?' },
  { key: 'accuracyDeclarationAccepted', label: '17. Verdiğim bilgilerin doğru olduğunu beyan ediyorum.' },
] as const

export function formatChairAssistantChair(chair: ChairAssistantChair) {
  return (
    chairAssistantChairs.find((item) => item.value === chair)?.shortLabel ??
    chairAssistantChairs.find((item) => item.value === chair)?.label ??
    chair
  )
}

export function formatChairAssistantDocumentType(type: ChairAssistantDocumentType) {
  return chairAssistantDocumentDefinitions.find((item) => item.type === type)?.label ?? type
}

export function isChairAssistantMimeTypeAllowed(mimeType?: string | null) {
  return !!mimeType && chairAssistantAllowedMimeTypes.includes(mimeType as (typeof chairAssistantAllowedMimeTypes)[number])
}

export function sanitizeUploadFileName(fileName: string) {
  return fileName
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function slugifyFilePart(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
