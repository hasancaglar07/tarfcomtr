import {
    ApplicationStatus,
    ChairAssistantChair,
    ChairAssistantDocumentType,
    ChairAssistantGraduateLevel,
    type ChairAssistantApplication,
} from "@prisma/client";

export const chairAssistantPageTitle =
    "TARF Düşünce Enstitüsü Kürsü Asistan Alımı";
export const chairAssistantPageDescription =
    "TARF Düşünce Enstitüsü bünyesindeki kürsüler için kürsü asistanı başvuru ilanı ve başvuru formu.";
export const chairAssistantFormTitle =
    "TARF DÜŞÜNCE ENSTİTÜSÜ Kürsü Asistan Başvuru Formu";

export const chairAssistantRequestedDocuments = [
    "Lisans diploması",
    "YDS / YÖKDİL sınav belgesi",
    "Adli sicil belgesi",
    "Lisansüstü öğrenci belgesi",
    "Akademik özgeçmiş ve yayın listesi",
    "Vesikalık fotoğraf",
] as const;

export const chairAssistantResponsibilities = [
    "Kendi uzmanlık alanına ilişkin ulusal ve uluslararası sempozyum, kongre, çalıştay, fuar ve benzeri akademik/entelektüel organizasyonları takip etmek, güncel ilmî ve düşünsel gelişmelerden haberdar olmak.",
    "Kürsü Başkanı ve kürsü bünyesinde görev yapan araştırmacılarla koordineli bir çalışma yürütmek, gerekli durumlarda ortak süreçlere destek sağlamak.",
    "Kürsü faaliyetleri kapsamında gerçekleştirilen organizasyon ve raporlama çalışmalarını zamanında ve düzenli şekilde yerine getirmek.",
    "Uzmanlık alanına ilişkin kitap, rapor, broşür, makale, analiz ve benzeri yayın çalışmalarına katkı sunmak; gerekli durumlarda bu çalışmaları hazırlamak veya süreçlerini takip etmek.",
    "Uzmanlık alanına ilişkin sosyal medya ve dijital platformlar için nitelikli içerik üretmek; bu içeriklerin planlanması, hazırlanması ve yayımlanma süreçlerini takip etmek.",
] as const;

export const chairAssistantChairs = [
    {
        value: ChairAssistantChair.egitim,
        label: "Eğitim Kürsüsü",
        shortLabel: "Eğitim",
        requirements: [
            "Üniversitelerin Eğitim Bilimleri anabilim dallarına bağlı bilim dallarında yüksek lisans veya doktora yapıyor olmak.",
            "Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.",
        ],
    },
    {
        value: ChairAssistantChair.aile,
        label: "Aile Kürsüsü",
        shortLabel: "Aile",
        requirements: [
            "Üniversitelerin Sosyoloji, Din Sosyolojisi, Aile Danışmanlığı, Aile Sosyolojisi, Çocuk Gelişimi, Klinik Psikoloji (çift ve aile odaklı), Din Psikolojisi bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.",
            "Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.",
        ],
    },
    {
        value: ChairAssistantChair.genclik,
        label: "Gençlik Kürsüsü",
        shortLabel: "Gençlik",
        requirements: [
            "Üniversitelerin Sosyoloji, Din Sosyolojisi, Psikoloji, Din Psikolojisi, Gelişim Psikolojisi, Klinik Psikoloji, Medya İletişim, Gençlik Çalışmaları bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.",
            "Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.",
        ],
    },
    {
        value: ChairAssistantChair.tarih_kultur_ve_medeniyet,
        label: "Tarih, Kültür ve Medeniyet Kürsüsü",
        shortLabel: "Tarih, Kültür ve Medeniyet",
        requirements: [
            "Üniversitelerin Tarih (özellikle Osmanlı, İslam ve Dünya Tarihi), Sanat Tarihi, Antropoloji, Sosyoloji (kültür ve medeniyet odaklı), İslam Tarihi ve Medeniyeti, Türk Dili ve Edebiyatı, Felsefe (özellikle düşünce tarihi) bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.",
            "Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.",
        ],
    },
    {
        value: ChairAssistantChair.uluslararasi_iliskiler_ve_dis_politika,
        label: "Uluslararası İlişkiler ve Dış Politika Kürsüsü",
        shortLabel: "Uluslararası İlişkiler ve Dış Politika",
        requirements: [
            "Üniversitelerin Uluslararası İlişkiler, Siyaset Bilimi, Diplomasi ve Dış Politika Çalışmaları, Bölge Çalışmaları (Ortadoğu, Avrupa, Asya vb), Güvenlik Çalışmaları, Uluslararası Hukuk, Ekonomi (Uluslararası Ekonomi, Politik Ekonomi) bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.",
            "Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.",
        ],
    },
    {
        value: ChairAssistantChair.bilim_ve_teknoloji,
        label: "Bilim ve Teknoloji Kürsüsü",
        shortLabel: "Bilim ve Teknoloji",
        requirements: [
            "Üniversitelerin Bilgisayar Mühendisliği, Elektrik-Elektronik Mühendisliği, Yazılım Mühendisliği, Yapay Zeka ve Veri Mühendisliği, Malzeme Bilimi ve Mühendisliği, Biyoteknoloji, Moleküler Biyoloji ve Genetik, Uzay Havacılık Mühendisliği, Astronomi ve Uzay Bilimleri, Veri Bilimi, Veri Analitiği, Bilim tarihi ve Felsefesi bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.",
            "Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.",
        ],
    },
    {
        value: ChairAssistantChair.cevre_iklim_ve_sehir,
        label: "Çevre, İklim ve Şehir Kürsüsü",
        shortLabel: "Çevre, İklim ve Şehir",
        requirements: [
            "Üniversitelerin Çevre Mühendisliği, Şehir Bölge Planlama, Ekoloji, Ekosistem Bilimleri, Coğrafya, İklim Bilimleri, Meteoroloji Mühendisliği, Enerji Sistemleri / Yenilenebilir Enerji, Tarım ve Doğa Bilimleri, Peyzaj Mimarlığı ve Mimarlık bilim dallarından birinde yüksek lisans veya doktora yapıyor olmak.",
            "Arapça, Almanca, Fransızca, İngilizce, Rusça dillerinden birinden YDS veya YÖKDİL sınavından 55 ve üzeri almış olmak.",
        ],
    },
] as const;

export const chairAssistantDocumentDefinitions = [
    {
        type: ChairAssistantDocumentType.undergraduate_diploma,
        label: "Lisans Diploması",
        helper: "PDF veya JPG olarak ekleyin.",
    },
    {
        type: ChairAssistantDocumentType.language_exam_result,
        label: "YDS / YÖKDİL Belgesi",
        helper: "PDF veya JPG olarak ekleyin.",
    },
    {
        type: ChairAssistantDocumentType.criminal_record,
        label: "Adli Sicil Belgesi",
        helper: "PDF veya JPG olarak ekleyin.",
    },
    {
        type: ChairAssistantDocumentType.graduate_student_certificate,
        label: "Lisansüstü Öğrenci Belgesi",
        helper: "PDF veya JPG olarak ekleyin.",
    },
    {
        type: ChairAssistantDocumentType.academic_cv,
        label: "Akademik Özgeçmiş ve Yayın Listesi",
        helper: "Tek PDF veya JPG olarak ekleyin.",
    },
    {
        type: ChairAssistantDocumentType.portrait_photo,
        label: "Vesikalık Fotoğraf",
        helper: "JPG, JPEG veya PNG formatında vesikalık fotoğrafınızı ekleyin.",
        accept: ".jpg,.jpeg,.png",
    },
] as const;

export const chairAssistantGraduateLevelOptions = [
    {
        value: ChairAssistantGraduateLevel.yuksek_lisans,
        label: "Yüksek Lisans",
    },
    { value: ChairAssistantGraduateLevel.doktora, label: "Doktora" },
] as const;

export const turkishCities = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Aksaray",
    "Amasya",
    "Ankara",
    "Antalya",
    "Ardahan",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bartın",
    "Batman",
    "Bayburt",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Düzce",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkâri",
    "Hatay",
    "Iğdır",
    "Isparta",
    "İstanbul",
    "İzmir",
    "Kahramanmaraş",
    "Karabük",
    "Karaman",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırıkkale",
    "Kırklareli",
    "Kırşehir",
    "Kilis",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Mardin",
    "Mersin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Osmaniye",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Şanlıurfa",
    "Şırnak",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Uşak",
    "Van",
    "Yalova",
    "Yozgat",
    "Zonguldak",
] as const;

export const chairAssistantStatusLabels: Record<ApplicationStatus, string> = {
    new: "Yeni",
    in_review: "İncelemede",
    closed: "Kapatıldı",
};

export const chairAssistantStatusColors: Record<ApplicationStatus, string> = {
    new: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
    in_review: "bg-amber-500/20 text-amber-200 border-amber-500/40",
    closed: "bg-slate-500/20 text-slate-200 border-slate-500/40",
};

export const chairAssistantStatusOptions: ApplicationStatus[] = [
    "new",
    "in_review",
    "closed",
];

export const chairAssistantAcceptedFileExtensions = ".pdf,.jpg,.jpeg,.png";
export const chairAssistantAllowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
] as const;
export const chairAssistantMaxFileSize = 10 * 1024 * 1024;

export type ChairAssistantQuestionAnswer = {
    label: string;
    answer: string;
};

export function formatChairAssistantChair(chair: ChairAssistantChair) {
    return (
        chairAssistantChairs.find((item) => item.value === chair)?.shortLabel ??
        chairAssistantChairs.find((item) => item.value === chair)?.label ??
        chair
    );
}

export function formatChairAssistantGraduateLevel(
    level?: ChairAssistantGraduateLevel | null,
) {
    return (
        chairAssistantGraduateLevelOptions.find((item) => item.value === level)
            ?.label ?? "-"
    );
}

export function formatChairAssistantDocumentType(
    type: ChairAssistantDocumentType,
) {
    return (
        chairAssistantDocumentDefinitions.find((item) => item.type === type)
            ?.label ?? type
    );
}

export function isChairAssistantMimeTypeAllowed(mimeType?: string | null) {
    return (
        !!mimeType &&
        chairAssistantAllowedMimeTypes.includes(
            mimeType as (typeof chairAssistantAllowedMimeTypes)[number],
        )
    );
}

export function sanitizeUploadFileName(fileName: string) {
    return fileName
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export function slugifyFilePart(value: string) {
    return value
        .toLocaleLowerCase("tr-TR")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function formatReference(
    firstName?: string | null,
    lastName?: string | null,
    phone?: string | null,
) {
    const name = [firstName, lastName].filter(Boolean).join(" ").trim();
    if (!name && !phone) {
        return "-";
    }
    if (!name) {
        return phone || "-";
    }
    if (!phone) {
        return name;
    }
    return `${name} · ${phone}`;
}

export function getChairAssistantQuestionAnswers(
    application: Pick<
        ChairAssistantApplication,
        | "fullName"
        | "phone"
        | "email"
        | "city"
        | "chair"
        | "undergraduateInfo"
        | "graduateLevel"
        | "mastersProgram"
        | "doctorateProgram"
        | "graduateProgramInfo"
        | "academicFields"
        | "thesisTopic"
        | "previousWork"
        | "motivation"
        | "weeklyAvailability"
        | "referenceOneFirstName"
        | "referenceOneLastName"
        | "referenceOnePhone"
        | "referenceTwoFirstName"
        | "referenceTwoLastName"
        | "referenceTwoPhone"
        | "accuracyDeclarationAccepted"
    >,
): ChairAssistantQuestionAnswer[] {
    return [
        { label: "ADI SOYADI", answer: application.fullName },
        { label: "TELEFON NO", answer: application.phone },
        { label: "E-POSTA", answer: application.email },
        { label: "İKAMET ETTİĞİNİZ ŞEHİR", answer: application.city },
        {
            label: "BAŞVURMAK İSTEDİĞİNİZ KÜRSÜ",
            answer: formatChairAssistantChair(application.chair),
        },
        { label: "LİSANS MEZUNİYETİ", answer: application.undergraduateInfo },
        {
            label: "YÜKSEK LİSANS / DOKTORA SEVİYESİ",
            answer: formatChairAssistantGraduateLevel(
                application.graduateLevel,
            ),
        },
        {
            label: "YÜKSEK LİSANS",
            answer:
                application.mastersProgram ||
                application.graduateProgramInfo ||
                "-",
        },
        { label: "DOKTORA", answer: application.doctorateProgram || "-" },
        {
            label: "AKADEMİK ÇALIŞMA ALANLARINIZ",
            answer: application.academicFields,
        },
        {
            label: "YOĞUNLAŞTIĞINIZ ARAŞTIRMA BAŞLIĞI YA DA ALANI",
            answer: application.thesisTopic || "-",
        },
        {
            label: "DAHA ÖNCE YER ALDIĞINIZ AKADEMİK, SOSYAL VEYA KURUMSAL ÇALIŞMALAR",
            answer: application.previousWork || "-",
        },
        {
            label: "BAŞVURDUĞUNUZ KÜRSÜYE NEDEN KATILMAK İSTİYORSUNUZ?",
            answer: application.motivation,
        },
        {
            label: "KÜRSÜ ÇALIŞMALARINA HAFTALIK NE KADAR ZAMAN AYIRABİLİRSİNİZ?",
            answer: application.weeklyAvailability,
        },
        {
            label: "REFERANS - 1",
            answer: formatReference(
                application.referenceOneFirstName,
                application.referenceOneLastName,
                application.referenceOnePhone,
            ),
        },
        {
            label: "REFERANS - 2",
            answer: formatReference(
                application.referenceTwoFirstName,
                application.referenceTwoLastName,
                application.referenceTwoPhone,
            ),
        },
        {
            label: "DOĞRULUK BEYANI",
            answer: application.accuracyDeclarationAccepted ? "Evet" : "Hayır",
        },
    ];
}
