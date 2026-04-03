import path from 'path'
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

let fontsRegistered = false

function ensureFontsRegistered() {
  if (fontsRegistered) {
    return
  }

  Font.register({
    family: 'Noto Sans PDF',
    fonts: [
      {
        src: path.join(
          process.cwd(),
          'node_modules/@fontsource/noto-sans/files/noto-sans-latin-ext-400-normal.woff',
        ),
        fontWeight: 400,
      },
      {
        src: path.join(
          process.cwd(),
          'node_modules/@fontsource/noto-sans/files/noto-sans-latin-ext-700-normal.woff',
        ),
        fontWeight: 700,
      },
    ],
  })

  fontsRegistered = true
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 34,
    fontFamily: 'Noto Sans PDF',
    fontSize: 10.5,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  brand: {
    fontSize: 10,
    color: '#ea580c',
    fontWeight: 700,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    fontSize: 19,
    lineHeight: 1.3,
    fontWeight: 700,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.6,
  },
  metaGrid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
    marginBottom: 10,
  },
  metaLabel: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  metaValue: {
    marginTop: 4,
    fontSize: 10.5,
    color: '#0f172a',
    lineHeight: 1.5,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0f172a',
  },
  questionCard: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  questionLabel: {
    fontSize: 8.5,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  answer: {
    marginTop: 5,
    fontSize: 10.5,
    lineHeight: 1.55,
    color: '#0f172a',
  },
  documentRow: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
  },
  note: {
    marginTop: 10,
    fontSize: 10,
    lineHeight: 1.6,
    color: '#334155',
  },
})

export type ChairAssistantPdfQuestion = {
  label: string
  answer: string
}

export type ChairAssistantPdfDocument = {
  label: string
  fileName: string
}

export type ChairAssistantApplicationPdfProps = {
  createdAtLabel: string
  statusLabel: string
  candidateName: string
  chairLabel: string
  email: string
  phone: string
  city: string
  adminNote?: string | null
  questions: ChairAssistantPdfQuestion[]
  documents: ChairAssistantPdfDocument[]
}

export function ChairAssistantApplicationPdf({
  createdAtLabel,
  statusLabel,
  candidateName,
  chairLabel,
  email,
  phone,
  city,
  adminNote,
  questions,
  documents,
}: ChairAssistantApplicationPdfProps) {
  ensureFontsRegistered()

  return (
    <Document title={`Kürsü Asistan Başvurusu - ${candidateName}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>TARF Düşünce Enstitüsü</Text>
        <Text style={styles.title}>Kürsü Asistanı Başvuru PDF Çıktısı</Text>
        <Text style={styles.subtitle}>
          Bu belge admin panelindeki özel başvuru kaydından otomatik üretilmiştir.
        </Text>

        <View style={styles.metaGrid}>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Başvuru Sahibi</Text>
            <Text style={styles.metaValue}>{candidateName}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Kürsü</Text>
            <Text style={styles.metaValue}>{chairLabel}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>E-posta</Text>
            <Text style={styles.metaValue}>{email}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Telefon</Text>
            <Text style={styles.metaValue}>{phone}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Şehir</Text>
            <Text style={styles.metaValue}>{city}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Kayıt / Durum</Text>
            <Text style={styles.metaValue}>
              {createdAtLabel}
              {'\n'}
              {statusLabel}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Form Cevapları</Text>
          {questions.map((question) => (
            <View key={question.label} style={styles.questionCard}>
              <Text style={styles.questionLabel}>{question.label}</Text>
              <Text style={styles.answer}>{question.answer}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yüklenen Evraklar</Text>
          {documents.map((document) => (
            <View key={document.label} style={styles.documentRow}>
              <Text style={styles.questionLabel}>{document.label}</Text>
              <Text style={styles.answer}>{document.fileName}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin Notu</Text>
          <Text style={styles.note}>{adminNote && adminNote.length > 0 ? adminNote : 'Not eklenmemiş.'}</Text>
        </View>
      </Page>
    </Document>
  )
}
