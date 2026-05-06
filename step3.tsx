import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { router } from 'expo-router'
import { Colors, Font, Spacing, Radius } from '../../constants/theme'
import { useKodoStore } from '../../store/kodoStore'
import { getRoadmap } from '../../constants/roadmaps'

const STEPS = [
  'analizando nivel inicial',
  'estructurando temas por semana',
  'calculando tiempos de sesión',
  'configurando recordatorios',
]

export default function Step3Generate() {
  const { onboarding, setActiveRoadmap, progress, setCurrentTopic } = useKodoStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)

  useEffect(() => {
    // simula el proceso de generación paso a paso
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setCurrentStep(i + 1)
          setProgressWidth(((i + 1) / STEPS.length) * 100)
        }, (i + 1) * 700)
      )
    })

    // al terminar, genera el roadmap y navega
    timers.push(
      setTimeout(() => {
        const roadmap = getRoadmap(
          onboarding.subject ?? 'inglés',
          onboarding.level ?? 'zero',
          onboarding.timePerDay ?? 60
        )

        if (roadmap) {
          setActiveRoadmap(roadmap)
          const firstWeek = roadmap.weeks[0]
          const firstTopic = firstWeek?.topics[0]
          if (firstWeek && firstTopic) {
            setCurrentTopic(firstWeek.id, firstTopic.id)
          }
        }

        router.replace('/(tabs)/roadmap')
      }, STEPS.length * 700 + 800)
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <View style={s.center}>
          <View style={s.icon}>
            <Text style={s.iconText}>⌘</Text>
          </View>

          <Text style={s.title}>creando tu roadmap</Text>
          <Text style={s.subtitle}>
            kōdo está organizando tus temas,{'\n'}tiempos y secuencia de aprendizaje.
          </Text>

          <View style={s.barBg}>
            <View style={[s.barFill, { width: `${progressWidth}%` }]} />
          </View>

          <View style={s.steps}>
            {STEPS.map((step, i) => {
              const isDone = i < currentStep
              const isActive = i === currentStep
              return (
                <View
                  key={step}
                  style={[s.step, isDone && s.stepDone, isActive && s.stepActive]}
                >
                  <View
                    style={[
                      s.stepDot,
                      isDone && s.stepDotDone,
                      isActive && s.stepDotActive,
                    ]}
                  />
                  <Text style={[s.stepText, isDone && s.stepTextDone, isActive && s.stepTextActive]}>
                    {step}{isDone ? ' ✓' : isActive ? '...' : ''}
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, paddingHorizontal: Spacing.xl },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: Colors.borderActive,
    borderRadius: Radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconText: {
    fontFamily: Font.mono,
    fontSize: 22,
    color: Colors.textMuted,
  },
  title: {
    fontFamily: Font.mono,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Font.mono,
    fontSize: 11,
    color: Colors.textDim,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  barBg: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.bgCard,
    borderRadius: 1,
    marginBottom: Spacing.xl,
  },
  barFill: {
    height: 2,
    backgroundColor: Colors.accent,
    borderRadius: 1,
  },
  steps: { width: '100%', gap: Spacing.sm },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
  },
  stepDone: { borderColor: Colors.border },
  stepActive: { borderColor: Colors.borderActive },
  stepDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.border,
  },
  stepDotDone: { backgroundColor: Colors.accent },
  stepDotActive: { backgroundColor: Colors.accentStrong },
  stepText: {
    fontFamily: Font.mono,
    fontSize: 11,
    color: Colors.textDim,
  },
  stepTextDone: { color: Colors.textMuted },
  stepTextActive: { color: Colors.textSecondary },
})
