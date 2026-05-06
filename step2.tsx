import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { Colors, Font, Spacing, Radius } from '../../constants/theme'
import { useKodoStore } from '../../store/kodoStore'
import type { Level, TimePerDay } from '../../constants/roadmaps'

const TIME_OPTIONS: { value: TimePerDay; label: string; sublabel: string }[] = [
  { value: 15, label: '15m', sublabel: 'poco tiempo' },
  { value: 30, label: '30m', sublabel: 'casual' },
  { value: 60, label: '1h', sublabel: 'consistente' },
  { value: 120, label: '2h+', sublabel: 'intensivo' },
]

const LEVEL_OPTIONS: { value: Level; label: string; sublabel: string }[] = [
  { value: 'zero', label: 'desde cero', sublabel: 'nunca lo estudié' },
  { value: 'basic', label: 'básico', sublabel: 'conozco lo esencial' },
  { value: 'intermediate', label: 'intermedio', sublabel: 'quiero profundizar' },
]

export default function Step2Time() {
  const { onboarding, setOnboarding } = useKodoStore()
  const selectedTime = onboarding.timePerDay
  const selectedLevel = onboarding.level

  const canContinue = selectedTime !== null && selectedLevel !== null

  const handleContinue = () => {
    if (!canContinue) return
    router.push('/onboarding/step3')
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
        <Text style={s.stepIndicator}>paso 2 de 3</Text>
        <Text style={s.title}>¿cuánto tiempo{'\n'}tienes al día?</Text>
        <Text style={s.subtitle}>
          kōdo ajusta el ritmo del roadmap según tu disponibilidad real.
        </Text>

        <View style={s.timeGrid}>
          {TIME_OPTIONS.map((opt) => {
            const isSelected = selectedTime === opt.value
            return (
              <TouchableOpacity
                key={opt.value}
                style={[s.timeCard, isSelected && s.timeCardSelected]}
                onPress={() => setOnboarding({ timePerDay: opt.value })}
                activeOpacity={0.7}
              >
                <Text style={[s.timeVal, isSelected && s.timeValSelected]}>
                  {opt.label}
                </Text>
                <Text style={[s.timeSub, isSelected && s.timeSubSelected]}>
                  {opt.sublabel}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <Text style={s.sectionLabel}>// nivel actual</Text>
        <View style={s.levelOptions}>
          {LEVEL_OPTIONS.map((opt) => {
            const isSelected = selectedLevel === opt.value
            return (
              <TouchableOpacity
                key={opt.value}
                style={[s.option, isSelected && s.optionSelected]}
                onPress={() => setOnboarding({ level: opt.value })}
                activeOpacity={0.7}
              >
                <Text style={[s.optionName, isSelected && s.optionNameSelected]}>
                  {opt.label}
                </Text>
                <Text style={[s.optionTag, isSelected && s.optionTagSelected]}>
                  {opt.sublabel}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={s.dots}>
          <View style={s.dot} />
          <View style={[s.dot, s.dotActive]} />
          <View style={s.dot} />
        </View>

        <TouchableOpacity
          style={[s.btn, !canContinue && s.btnDisabled]}
          onPress={handleContinue}
          disabled={!canContinue}
          activeOpacity={0.8}
        >
          <Text style={[s.btnText, !canContinue && s.btnTextDisabled]}>
            continuar →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },
  stepIndicator: {
    fontFamily: Font.mono,
    fontSize: 11,
    color: Colors.textDim,
    letterSpacing: 1,
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Font.mono,
    fontSize: 22,
    color: Colors.textPrimary,
    lineHeight: 30,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Font.mono,
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: Spacing.xl,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  timeCard: {
    width: '47%',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  timeCardSelected: {
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.bgCardActive,
  },
  timeVal: {
    fontFamily: Font.mono,
    fontSize: 18,
    color: Colors.textMuted,
  },
  timeValSelected: { color: Colors.textPrimary },
  timeSub: {
    fontFamily: Font.mono,
    fontSize: 10,
    color: Colors.textDim,
    marginTop: 2,
  },
  timeSubSelected: { color: Colors.textMuted },
  sectionLabel: {
    fontFamily: Font.mono,
    fontSize: 10,
    color: Colors.textDim,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  levelOptions: { gap: Spacing.sm, marginBottom: Spacing.xl },
  option: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.bgCardActive,
  },
  optionName: {
    fontFamily: Font.mono,
    fontSize: 13,
    color: Colors.textMuted,
  },
  optionNameSelected: { color: Colors.textSecondary },
  optionTag: {
    fontFamily: Font.mono,
    fontSize: 10,
    color: Colors.textDim,
  },
  optionTagSelected: { color: Colors.textMuted },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  dot: {
    height: 3,
    width: 14,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  dotActive: { width: 22, backgroundColor: Colors.accent },
  btn: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderActive,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  btnDisabled: { borderColor: Colors.border, opacity: 0.4 },
  btnText: {
    fontFamily: Font.mono,
    fontSize: 12,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  btnTextDisabled: { color: Colors.textDim },
})
