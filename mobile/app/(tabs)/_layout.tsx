import { Tabs } from 'expo-router'
import { Text, StyleSheet } from 'react-native'
import { Colors, Font } from '../../constants/theme'

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={[s.tabLabel, focused && s.tabLabelActive]}>
      {label}
    </Text>
  )
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: s.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="inicio" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="roadmap"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="roadmap" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="stats" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="metas" focused={focused} />,
        }}
      />
    </Tabs>
  )
}

const s = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.bg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 56,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontFamily: Font.mono,
    fontSize: 10,
    color: Colors.textDim,
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: Colors.textSecondary,
  },
})
