import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { Colors, Font, Spacing, Radius } from '../../constants/theme'
import { useKodoStore } from '../../store/kodoStore'
import type { Week } from '../../constants/roadmaps'

export default function RoadmapScreen() {
  const { activeRoadmap, progress, completeTopic, setCurrentTopic } = useKodoStore()

  if (!activeRoadmap) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.empty}>
          <Text style={s.emptyText}>// sin roadmap activo</Text>
        </View>
      </SafeAreaView>
    )
  }

  const completedTopics = new Set(progress.completedTopics)
  const totalTopics = activeRoadmap.weeks.reduce((acc, w) => acc + w.topics.length, 0)
  const completedCount = progress.completedTopics.length
  const progressPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0

  const currentWeekIndex = activeRoadmap.weeks.findIndex(
    (w) => w.id === progress.currentWeekId
  )

  const getWeekStatus = (weekIndex: number) => {
    if (weekIndex < currentWeekIndex) return 'done'
    if (weekIndex === currentWeekIndex) return 'active'
    return 'locked'
  }

  const handleTopicPress = (week: Week, topicId: string) => {
    const status = getWeekStatus(activeRoadmap.weeks.findIndex((w) => w.id === week.id))
    if (status === 'locked') return
    if (completedTopics.has(topicId)) return
    completeTopic(topicId)
    // avanzar al siguiente tópico si existe
    const nextTopic = week.topics.find((t) => !completedTopics.has(t.id) && t.id !== topicId)
    if (nextTopic) {
      setCurrentTopic(week.id, nextTopic.id)
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>

        <View style={s.header}>
          <View>
            <Text style={s.title}>{activeRoadmap.subject}</Text>
            <Text style={s.subtitle}>
              // roadmap.{activeRoadmap.subject.replace(' ', '_')}.{activeRoadmap.level} — {activeRoadmap.totalWeeks} semanas
            </Text>
          </View>
          <View style={s.badge}>
            <Text style={s.badgeText}>
              {activeRoadmap.level === 'zero' ? 'desde cero' : activeRoadmap.level} · {activeRoadmap.timePerDay >= 60 ? `${activeRoadmap.timePerDay / 60}h` : `${activeRoadmap.timePerDay}m`}/día
            </Text>
          </View>
        </View>

        <View style={s.progressRow}>
          <Text style={s.sectionLabel}>progreso</Text>
          <Text style={s.progressPct}>
            sem {Math.min(currentWeekIndex + 1, activeRoadmap.totalWeeks)} de {activeRoadmap.totalWeeks}
          </Text>
        </View>
        <View style={s.barBg}>
          <View style={[s.barFill, { width: `${progressPct}%` }]} />
        </View>

        <View style={s.weeks}>
          {activeRoadmap.weeks.map((week, wi) => {
            const status = getWeekStatus(wi)
            return (
              <View
                key={week.id}
                style={[
                  s.weekCard,
                  status === 'active' && s.weekCardActive,
                  status === 'locked' && s.weekCardLocked,
                ]}
              >
                <View style={s.weekHeader}>
                  <Text style={[s.weekTitle, status === 'active' && s.weekTitleActive]}>
                    {week.label}
                  </Text>
                  <Text style={[s.weekStatus, status === 'done' && s.weekStatusDone]}>
                    {status === 'done' ? 'completado' : status === 'active' ? 'en progreso' : 'bloqueado'}
                  </Text>
                </View>

                <View style={s.topics}>
                  {week.topics.map((topic) => {
                    const isDone = completedTopics.has(topic.id)
                    const isCurrentTopic = topic.id === progress.currentTopicId
                    return (
                      <TouchableOpacity
                        key={topic.id}
                        style={s.topicRow}
                        onPress={() => handleTopicPress(week, topic.id)}
                        disabled={status === 'locked' || isDone}
                        activeOpacity={0.6}
                      >
                        <View style={[
                          s.topicDot,
                          isDone && s.topicDotDone,
                          isCurrentTopic && s.topicDotActive,
                        ]} />
                        <Text style={[
                          s.topicText,
                          isDone && s.topicTextDone,
                          isCurrentTopic && s.topicTextActive,
                        ]}>
                          {topic.title}
                        </Text>
                        {isDone && <Text style={s.topicCheck}>✓</Text>}
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontFamily: Font.mono, fontSize: 13, color: Colors.textDim },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  title: { fontFamily: Font.mono, fontSize: 20, color: Colors.textPrimary },
  subtitle: { fontFamily: Font.mono, fontSize: 10, color: Colors.textDim, marginTop: 3 },
  badge: {
    backgroundColor: Colors.bgCardActive,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  badgeText: { fontFamily: Font.mono, fontSize: 10, color: Colors.textDim },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: Spacing.lg,
  },
  sectionLabel: {
    fontFamily: Font.mono,
    fontSize: 10,
    color: Colors.textDim,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  progressPct: { fontFamily: Font.mono, fontSize: 10, color: Colors.textDim },
  barBg: {
    height: 2,
    backgroundColor: Colors.border,
    borderRadius: 1,
    marginBottom: Spacing.lg,
  },
  barFill: { height: 2, backgroundColor: Colors.accent, borderRadius: 1 },
  weeks: { gap: Spacing.sm },
  weekCard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  weekCardActive: { borderColor: Colors.borderActive },
  weekCardLocked: { opacity: 0.35 },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  weekTitle: { fontFamily: Font.mono, fontSize: 12, color: Colors.textMuted },
  weekTitleActive: { color: Colors.textSecondary },
  weekStatus: { fontFamily: Font.mono, fontSize: 10, color: Colors.textDim },
  weekStatusDone: { color: Colors.textMuted },
  topics: { gap: Spacing.xs },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 3,
  },
  topicDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  topicDotDone: { backgroundColor: Colors.accent },
  topicDotActive: { backgroundColor: Colors.accentStrong },
  topicText: { fontFamily: Font.mono, fontSize: 11, color: Colors.textDim, flex: 1 },
  topicTextDone: { color: Colors.textMuted },
  topicTextActive: { color: Colors.textSecondary },
  topicCheck: { fontFamily: Font.mono, fontSize: 10, color: Colors.accent },
})
