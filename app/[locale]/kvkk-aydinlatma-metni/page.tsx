import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, FileText, Lock, Eye, UserCheck, Mail } from 'lucide-react'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale } = await params
    const locale = normalizeLocale(rawLocale)
    return buildPageMetadata({ locale, page: 'kvkk', pathSegments: ['kvkk-aydinlatma-metni'] })
}

type KvkkContent = {
    title: string
    subtitle: string
    lastUpdated: string
    sections: {
        title: string
        icon: typeof Shield
        content: string[]
    }[]
    contactTitle: string
    contactText: string
}

const kvkkContent: Record<'tr' | 'en' | 'ar', KvkkContent> = {
    tr: {
        title: 'KVKK Aydınlatma Metni',
        subtitle: 'Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma yükümlülüğü',
        lastUpdated: 'Son güncelleme: 25 Aralık 2024',
        sections: [
            {
                title: '1. Veri Sorumlusu',
                icon: Shield,
                content: [
                    'TARF Akademi ("Kuruluş" veya "biz") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan şekilde işlemekteyiz.',
                    'Adres: Aşağı Öveçler Mahallesi, 1324. Cadde, No: 63/B, Çankaya/ANKARA',
                    'E-posta: info@tarf.com.tr',
                ],
            },
            {
                title: '2. İşlenen Kişisel Veriler',
                icon: FileText,
                content: [
                    'Başvuru formu aracılığıyla toplanan kişisel veriler:',
                    '• Kimlik bilgileri: Ad, soyad',
                    '• İletişim bilgileri: E-posta adresi, telefon numarası',
                    '• Mesleki bilgiler: Kurum/şirket/okul bilgisi',
                    '• Başvuru içeriği: Başvuru türü, talep konusu, mesaj içeriği',
                ],
            },
            {
                title: '3. Kişisel Verilerin İşlenme Amaçları',
                icon: Eye,
                content: [
                    'Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:',
                    '• Başvurunuzun değerlendirilmesi ve yanıtlanması',
                    '• Eğitim programları, etkinlikler ve hizmetler hakkında bilgilendirme yapılması',
                    '• İşbirliği ve partnerlik taleplerinin değerlendirilmesi',
                    '• Yasal yükümlülüklerin yerine getirilmesi',
                    '• Kurumsal iletişim faaliyetlerinin yürütülmesi',
                ],
            },
            {
                title: '4. Kişisel Verilerin Aktarılması',
                icon: Lock,
                content: [
                    'Kişisel verileriniz, KVKK\'nın 8. ve 9. maddelerinde belirtilen şartlara uygun olarak:',
                    '• Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşlarına',
                    '• Hizmet aldığımız iş ortaklarımıza (hosting, e-posta hizmeti vb.)',
                    '• Açık rızanız dahilinde üçüncü kişilere aktarılabilmektedir.',
                ],
            },
            {
                title: '5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi',
                icon: UserCheck,
                content: [
                    'Kişisel verileriniz, web sitemizdeki başvuru formu aracılığıyla elektronik ortamda toplanmaktadır.',
                    'Hukuki sebepler:',
                    '• Açık rızanız (KVKK m.5/1)',
                    '• Sözleşmenin kurulması veya ifası (KVKK m.5/2-c)',
                    '• Veri sorumlusunun meşru menfaati (KVKK m.5/2-f)',
                    '• Hukuki yükümlülüğün yerine getirilmesi (KVKK m.5/2-ç)',
                ],
            },
            {
                title: '6. KVKK Kapsamındaki Haklarınız',
                icon: Mail,
                content: [
                    'KVKK\'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:',
                    '• Kişisel verilerinizin işlenip işlenmediğini öğrenme',
                    '• Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme',
                    '• Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme',
                    '• Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme',
                    '• Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme',
                    '• KVKK\'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme',
                    '• Düzeltme, silme veya yok etme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme',
                    '• İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme',
                    '• Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
                    '',
                    'Haklarınızı kullanmak için info@tarf.com.tr adresine başvurabilirsiniz.',
                ],
            },
        ],
        contactTitle: 'İletişim',
        contactText: 'KVKK kapsamındaki haklarınız veya kişisel verilerinizin işlenmesi hakkında sorularınız için bizimle iletişime geçebilirsiniz.',
    },
    en: {
        title: 'KVKK Privacy Notice',
        subtitle: 'Information notice under the Personal Data Protection Law',
        lastUpdated: 'Last updated: December 25, 2024',
        sections: [
            {
                title: '1. Data Controller',
                icon: Shield,
                content: [
                    'As TARF Academy ("Organization" or "we"), we process your personal data as described below in our capacity as data controller under Law No. 6698 on Personal Data Protection ("KVKK").',
                    'Address: Aşağı Öveçler Mahallesi, 1324. Cadde, No: 63/B, Çankaya/ANKARA, Turkey',
                    'Email: info@tarf.com.tr',
                ],
            },
            {
                title: '2. Personal Data Collected',
                icon: FileText,
                content: [
                    'Personal data collected through the application form:',
                    '• Identity information: Name, surname',
                    '• Contact information: Email address, phone number',
                    '• Professional information: Organization/company/school',
                    '• Application content: Application type, subject, message content',
                ],
            },
            {
                title: '3. Purposes of Processing',
                icon: Eye,
                content: [
                    'Your personal data is processed for the following purposes:',
                    '• Evaluating and responding to your application',
                    '• Providing information about educational programs, events, and services',
                    '• Evaluating collaboration and partnership requests',
                    '• Fulfilling legal obligations',
                    '• Conducting corporate communication activities',
                ],
            },
            {
                title: '4. Transfer of Personal Data',
                icon: Lock,
                content: [
                    'Your personal data may be transferred in accordance with Articles 8 and 9 of KVKK to:',
                    '• Authorized public institutions when legally required',
                    '• Our business partners providing services (hosting, email services, etc.)',
                    '• Third parties with your explicit consent',
                ],
            },
            {
                title: '5. Method and Legal Basis of Collection',
                icon: UserCheck,
                content: [
                    'Your personal data is collected electronically through the application form on our website.',
                    'Legal bases:',
                    '• Your explicit consent (KVKK Art.5/1)',
                    '• Necessity for contract performance (KVKK Art.5/2-c)',
                    '• Legitimate interests of the data controller (KVKK Art.5/2-f)',
                    '• Legal obligation (KVKK Art.5/2-ç)',
                ],
            },
            {
                title: '6. Your Rights Under KVKK',
                icon: Mail,
                content: [
                    'Under Article 11 of KVKK, you have the following rights:',
                    '• To learn whether your personal data is processed',
                    '• To request information if your personal data is processed',
                    '• To learn the purpose of processing and whether it is used accordingly',
                    '• To know third parties to whom your data is transferred',
                    '• To request correction of incomplete or inaccurate data',
                    '• To request deletion or destruction under Article 7 of KVKK',
                    '• To request notification of corrections, deletions, or destructions to third parties',
                    '• To object to results against you arising from automated analysis',
                    '• To claim compensation for damages due to unlawful processing',
                    '',
                    'To exercise your rights, please contact info@tarf.com.tr',
                ],
            },
        ],
        contactTitle: 'Contact',
        contactText: 'For questions about your rights under KVKK or the processing of your personal data, please contact us.',
    },
    ar: {
        title: 'إشعار خصوصية KVKK',
        subtitle: 'إشعار المعلومات بموجب قانون حماية البيانات الشخصية',
        lastUpdated: 'آخر تحديث: 25 ديسمبر 2024',
        sections: [
            {
                title: '1. مراقب البيانات',
                icon: Shield,
                content: [
                    'بصفتنا أكاديمية TARF ("المنظمة" أو "نحن")، نقوم بمعالجة بياناتك الشخصية كما هو موضح أدناه بصفتنا مراقب البيانات بموجب القانون رقم 6698 بشأن حماية البيانات الشخصية ("KVKK").',
                    'العنوان: Aşağı Öveçler Mahallesi, 1324. Cadde, No: 63/B, Çankaya/ANKARA, Turkey',
                    'البريد الإلكتروني: info@tarf.com.tr',
                ],
            },
            {
                title: '2. البيانات الشخصية المجمعة',
                icon: FileText,
                content: [
                    'البيانات الشخصية المجمعة من خلال نموذج الطلب:',
                    '• معلومات الهوية: الاسم، اللقب',
                    '• معلومات الاتصال: البريد الإلكتروني، رقم الهاتف',
                    '• المعلومات المهنية: المؤسسة/الشركة/المدرسة',
                    '• محتوى الطلب: نوع الطلب، الموضوع، محتوى الرسالة',
                ],
            },
            {
                title: '3. أغراض المعالجة',
                icon: Eye,
                content: [
                    'تتم معالجة بياناتك الشخصية للأغراض التالية:',
                    '• تقييم طلبك والرد عليه',
                    '• تقديم معلومات حول البرامج التعليمية والفعاليات والخدمات',
                    '• تقييم طلبات التعاون والشراكة',
                    '• الوفاء بالالتزامات القانونية',
                    '• إجراء أنشطة الاتصال المؤسسي',
                ],
            },
            {
                title: '4. نقل البيانات الشخصية',
                icon: Lock,
                content: [
                    'قد يتم نقل بياناتك الشخصية وفقًا للمادتين 8 و 9 من KVKK إلى:',
                    '• المؤسسات العامة المختصة عند الضرورة القانونية',
                    '• شركاء الأعمال الذين يقدمون خدمات (الاستضافة، خدمات البريد الإلكتروني، إلخ)',
                    '• أطراف ثالثة بموافقتك الصريحة',
                ],
            },
            {
                title: '5. طريقة الجمع والأساس القانوني',
                icon: UserCheck,
                content: [
                    'يتم جمع بياناتك الشخصية إلكترونيًا من خلال نموذج الطلب على موقعنا.',
                    'الأسس القانونية:',
                    '• موافقتك الصريحة (KVKK المادة 5/1)',
                    '• ضرورة تنفيذ العقد (KVKK المادة 5/2-c)',
                    '• المصالح المشروعة لمراقب البيانات (KVKK المادة 5/2-f)',
                    '• الالتزام القانوني (KVKK المادة 5/2-ç)',
                ],
            },
            {
                title: '6. حقوقك بموجب KVKK',
                icon: Mail,
                content: [
                    'بموجب المادة 11 من KVKK، لديك الحقوق التالية:',
                    '• معرفة ما إذا كانت بياناتك الشخصية تتم معالجتها',
                    '• طلب معلومات إذا تمت معالجة بياناتك الشخصية',
                    '• معرفة الغرض من المعالجة وما إذا كان يتم استخدامها وفقًا لذلك',
                    '• معرفة الأطراف الثالثة التي يتم نقل بياناتك إليها',
                    '• طلب تصحيح البيانات غير الكاملة أو غير الدقيقة',
                    '• طلب الحذف أو الإتلاف بموجب المادة 7 من KVKK',
                    '• طلب إخطار الأطراف الثالثة بالتصحيحات أو الحذف أو الإتلاف',
                    '• الاعتراض على النتائج ضدك الناشئة عن التحليل الآلي',
                    '• المطالبة بالتعويض عن الأضرار الناجمة عن المعالجة غير القانونية',
                    '',
                    'لممارسة حقوقك، يرجى الاتصال بـ info@tarf.com.tr',
                ],
            },
        ],
        contactTitle: 'اتصل بنا',
        contactText: 'للاستفسارات حول حقوقك بموجب KVKK أو معالجة بياناتك الشخصية، يرجى الاتصال بنا.',
    },
}

export default async function KvkkPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale } = await params
    const locale = normalizeLocale(rawLocale)
    const content = kvkkContent[locale as keyof typeof kvkkContent] || kvkkContent.tr

    return (
        <>
            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-emerald-200/30 blur-[100px]" />
                    </div>
                    <div className="container relative text-center space-y-6">
                        <Badge className="mx-auto w-fit" variant="secondary">
                            <Shield className="h-4 w-4 mr-2" />
                            KVKK
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold">{content.title}</h1>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            {content.subtitle}
                        </p>
                        <p className="text-sm text-muted-foreground/70">{content.lastUpdated}</p>
                    </div>
                </section>

                {/* Content Sections */}
                <div className="container py-16">
                    <div className="mx-auto max-w-4xl space-y-8">
                        {content.sections.map((section, index) => {
                            const IconComponent = section.icon
                            return (
                                <Card key={index} className="overflow-hidden">
                                    <div className="flex items-start gap-4 p-6 border-b bg-muted/30">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <IconComponent className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-semibold">{section.title}</h2>
                                    </div>
                                    <div className="p-6 space-y-3">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p
                                                key={pIndex}
                                                className={`text-muted-foreground leading-relaxed ${paragraph.startsWith('•') ? 'pl-4' : ''
                                                    } ${paragraph === '' ? 'h-2' : ''}`}
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </Card>
                            )
                        })}

                        {/* Contact Card */}
                        <Card className="border-dashed border-primary/40 bg-primary/5 p-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{content.contactTitle}</h3>
                                    <p className="text-muted-foreground mb-4">{content.contactText}</p>
                                    <a
                                        href="mailto:info@tarf.com.tr"
                                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90"
                                    >
                                        <Mail className="h-4 w-4" />
                                        info@tarf.com.tr
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}
