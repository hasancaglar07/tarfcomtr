'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Settings } from '@/lib/api'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'

interface ContactCTAProps {
  locale: string
  settings?: Settings
}

const defaultContent = {
  tr: {
    title: 'Bizimle İletişime Geçin',
    subtitle: 'Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız',
    name_placeholder: 'Adınız',
    email_placeholder: 'E-posta Adresiniz',
    message_placeholder: 'Mesajınız',
    send_button: 'Mesaj Gönder',
    email_label: 'E-posta',
    phone_label: 'Telefon',
    address_label: 'Adres',
    email_value: 'bilgi@verenel.org.tr',
    phone_value: '+90 312 283 00 00',
    address_value: 'Aşağı Öveçler MH 1324. CD No:63\nDikmen, 06460 Çankaya/Ankara'
  },
  en: {
    title: 'Get In Touch',
    subtitle: 'Have questions? We are happy to help',
    name_placeholder: 'Your Name',
    email_placeholder: 'Your Email',
    message_placeholder: 'Your Message',
    send_button: 'Send Message',
    email_label: 'Email',
    phone_label: 'Phone',
    address_label: 'Address',
    email_value: 'bilgi@verenel.org.tr',
    phone_value: '+90 312 283 00 00',
    address_value: 'Aşağı Öveçler MH 1324. CD No:63\nDikmen, 06460 Çankaya/Ankara'
  },
  ar: {
    title: 'تواصل معنا',
    subtitle: 'هل لديك أسئلة؟ يسعدنا مساعدتك',
    name_placeholder: 'اسمك',
    email_placeholder: 'بريدك الإلكتروني',
    message_placeholder: 'رسالتك',
    send_button: 'إرسال الرسالة',
    email_label: 'البريد الإلكتروني',
    phone_label: 'الهاتف',
    address_label: 'العنوان',
    email_value: 'bilgi@verenel.org.tr',
    phone_value: '+90 312 283 00 00',
    address_value: 'Aşağı Öveçler MH 1324. CD No:63\nDikmen, 06460 Çankaya/Ankara'
  }
}

export function ContactCTA({ locale, settings }: ContactCTAProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en
  const contactInfo = {
    email: settings?.contact_email || content.email_value,
    phone: settings?.contact_phone || content.phone_value,
    address: settings?.contact_address || content.address_value,
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
              <p className="text-xl text-muted-foreground">
                {content.subtitle}
              </p>
              </div>
            </StaggerItem>

            {/* Contact Info Cards */}
            <StaggerItem>
              <div className="space-y-4">
              <Card className="p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{content.email_label}</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{content.phone_label}</h3>
                    <a 
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{content.address_label}</h3>
                    <p className="text-muted-foreground">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </Card>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right Side - Contact Form */}
          <Animate variant="slideUp" delay={0.2}>
            <Card className="p-8 shadow-2xl">
            <form className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder={content.name_placeholder}
                  className="h-12"
                  required
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder={content.email_placeholder}
                  className="h-12"
                  required
                />
              </div>

              <div>
                <Textarea
                  placeholder={content.message_placeholder}
                  className="min-h-[150px] resize-none"
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full group"
              >
                {content.send_button}
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
            </Card>
          </Animate>
        </div>
      </div>
    </section>
  )
}
