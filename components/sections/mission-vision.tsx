'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Sparkles } from 'lucide-react'

interface MissionVisionProps {
  locale: string
}

const missionVisionCopy = {
  tr: {
    label: 'Misyon, vizyon ve değerler',
    missionTitle: 'Misyon',
    mission:
      'Bilgi, teknoloji ve değer temelli eğitimi birleştirerek gençleri zihinsel, kültürel ve teknolojik açıdan geleceğe hazırlamak.',
    visionTitle: 'Vizyon',
    vision:
      'Türkiye\'nin ve bölgenin en yenilikçi ve en güvenilir teknoloji–akademi ekosistemi olmak.',
    valuesTitle: 'Değerler',
    values: [
      'Yenilikçilik',
      'Üretkenlik',
      'Etik ve değerler',
      'Toplumsal fayda',
      'İşbirliği',
      'Sürekli öğrenme',
      'Güven',
    ],
  },
  en: {
    label: 'Mission, vision and values',
    missionTitle: 'Mission',
    mission:
      'To combine knowledge, technology and value-based education to prepare young people for the future intellectually, culturally and technologically.',
    visionTitle: 'Vision',
    vision:
      'To become the most innovative and trusted tech–academy ecosystem in the region.',
    valuesTitle: 'Values',
    values: [
      'Innovation',
      'Productivity',
      'Ethics and values',
      'Social impact',
      'Collaboration',
      'Lifelong learning',
      'Trust',
    ],
  },
  ar: {
    label: 'الرسالة والرؤية والقيم',
    missionTitle: 'الرسالة',
    mission:
      'دمج المعرفة والتقنية والتعليم القائم على القيم لإعداد الشباب لمستقبل قوي فكرياً وثقافياً وتقنياً.',
    visionTitle: 'الرؤية',
    vision:
      'أن نكون المنظومة الأكاديمية–التقنية الأكثر ابتكاراً ومصداقية في المنطقة.',
    valuesTitle: 'القيم',
    values: [
      'الابتكار',
      'الإنتاجية',
      'الأخلاق والقيم',
      'الأثر المجتمعي',
      'التعاون',
      'التعلم المستمر',
      'الثقة',
    ],
  },
} as const

export function MissionVision({ locale }: MissionVisionProps) {
  const content =
    missionVisionCopy[locale as keyof typeof missionVisionCopy] ?? missionVisionCopy.en

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-orange-50/50 via-white to-slate-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        className="absolute -top-20 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-orange-300/20 to-amber-300/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-2 text-xs font-bold uppercase tracking-widest text-orange-800 shadow-lg mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4" />
            {content.label}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Mission Card */}
          <motion.div
            variants={cardVariants}
            className="group relative"
            whileHover={{ y: -10 }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

            <div className="relative h-full rounded-3xl border-2 border-orange-200/60 bg-white/90 backdrop-blur-sm p-8 shadow-xl">
              {/* Icon */}
              <motion.div
                className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-4 shadow-lg"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Target className="h-8 w-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {content.missionTitle}
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
                <p className="text-slate-600 leading-relaxed">
                  {content.mission}
                </p>
              </div>

              {/* Decorative Element */}
              <motion.div
                className="absolute -top-3 -right-3 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 p-3 shadow-xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-3 h-3 rounded-full bg-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={cardVariants}
            className="group relative"
            whileHover={{ y: -10 }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

            <div className="relative h-full rounded-3xl border-2 border-blue-200/60 bg-white/90 backdrop-blur-sm p-8 shadow-xl">
              {/* Icon */}
              <motion.div
                className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-4 shadow-lg"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Eye className="h-8 w-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {content.visionTitle}
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                <p className="text-slate-600 leading-relaxed">
                  {content.vision}
                </p>
              </div>

              {/* Decorative Element */}
              <motion.div
                className="absolute -top-3 -right-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 p-3 shadow-xl"
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-3 h-3 rounded-full bg-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Values Card */}
          <motion.div
            variants={cardVariants}
            className="group relative"
            whileHover={{ y: -10 }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

            <div className="relative h-full rounded-3xl border-2 border-purple-200/60 bg-white/90 backdrop-blur-sm p-8 shadow-xl">
              {/* Icon */}
              <motion.div
                className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 shadow-lg"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="h-8 w-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {content.valuesTitle}
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />

                {/* Values Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {content.values.map((value, index) => (
                    <motion.span
                      key={value}
                      className="inline-flex items-center rounded-full border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 text-sm font-semibold text-purple-800 shadow-sm hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {value}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Decorative Element */}
              <motion.div
                className="absolute -top-3 -right-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-3 shadow-xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-3 h-3 rounded-full bg-white" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
