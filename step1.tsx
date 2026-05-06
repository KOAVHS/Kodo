import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { router } from 'expo-router'
import { Colors, Font, Spacing, Radius } from '../../constants/theme'
import { FREE_SUBJECTS, PRO_SUBJECT_LABEL } from '../../constants/roadmaps'
import { useKodoStore } from '../../store/kodoStore'

const SUBJECTS = [
  { name: 'inglés', tag: 'idioma', pro: false },
  { name: 'programación', tag: 'tecnología', pro: false },
  { name: 'matemáticas', tag: 'exactas', pro: false },
  { name: 'diseño', tag: 'creativo', pro: false },
  { name: PRO_SUBJECT_LABEL, tag: '✦ pro', pro: true },
]

export default function Step1Subject() {
  const { onboarding, setOnboarding } = useKodoStore()
  const selected = onboarding.subject

  const handleSelect = (name: string, isPro: boolean) => {
    if (isPro) return  // bloquear hasta implementar RevenueCat
    setOnboarding({ subject: name })
  }

  const handleContinue = () => {
    if (!selected) return
    router.push('/onboarding/step2')
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <Text style={s.stepIndicator}>paso 1 de 3</Text>
        <Text style={s.title}>¿qué quieres{'\n'}aprender?</Text>
        <Text style={s.subtitle}>
          kōdo genera tu roadmap completo — temas, horarios y tiempos de estudio.
        </Text>

        <View style={s.options}>
          {SUBJECTS.map((item) => {
            const isSelected = selected === item.name
            return (
              <TouchableOpacity
                key={item.name}
                style={[s.option, isSelected && s.optionSelected, item.pro && s.optionPro]}
                onPress={() => handleSelect(item.name, item.pro)}
                activeOpacity={0.7}
              >
                <Text style={[s.optionName, isSelected && s.optionNameSelected, item.pro && s.optionNamePro]}>
                  {item.name}
                </Text>
                <Text style={[s.optionTag, isSelected && s.optionTagSelected]}>
                  {item.tag}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={s.dots}>
          <View style={[s.dot, s.dotActive]} />
          <View style={s.dot} />
          <View style={s.dot} />
        </View>

        <TouchableOpacity
          style={[s.btn, !selected && s.btnDisabled]}
          onPress={handleContinue}
          disabled={!selected}
          activeOpacity={0.8}
        >
          <Text style={[s.btnText, !selected && s.btnTextDisabled]}>
            continuar →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
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
  options: {
    flex: 1,
    gap: Spacing.sm,
  },
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
  optionPro: {
    opacity: 0.5,
  },
  optionName: {
    fontFamily: Font.mono,
    fontSize: 13,
    color: Colors.textMuted,
  },
  optionNameSelected: {
    color: Colors.textSecondary,
  },
  optionNamePro: {
    color: Colors.textDim,
  },
  optionTag: {
    fontFamily: Font.mono,
    fontSize: 10,
    color: Colors.textDim,
    letterSpacing: 0.5,
  },
  optionTagSelected: {
    color: Colors.textMuted,
  },
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
  dotActive: {
    width: 22,
    backgroundColor: Colors.accent,
  },
  btn: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderActive,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  btnDisabled: {
    borderColor: Colors.border,
    opacity: 0.4,
  },
  btnText: {
    fontFamily: Font.mono,
    fontSize: 12,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  btnTextDisabled: {
    color: Colors.textDim,
  },
})
