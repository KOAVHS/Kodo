import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { Colors, Font } from '../constants/theme'
import { useKodoStore } from '../store/kodoStore'

export default function Index() {
  const { activeRoadmap } = useKodoStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeRoadmap) {
        router.replace('/(tabs)/roadmap')
      } else {
        router.replace('/onboarding/step1')
      }
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={s.container}>
      <Text style={s.logo}>kōdo</Text>
      <Text style={s.sub}>// study like a developer</Text>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontFamily: Font.mono,
    fontSize: 32,
    color: '#888',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sub: {
    fontFamily: Font.mono,
    fontSize: 11,
    color: '#2e2e2e',
    letterSpacing: 1,
  },
})
