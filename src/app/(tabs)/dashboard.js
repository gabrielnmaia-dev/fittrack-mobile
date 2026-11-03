import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark, Wordmark } from '@/components/BrandLogo';
import { CONTENT_MAX_WIDTH, FONT_FAMILY } from '@/constants';
import { BORDER_RADIUS, COLORS, SPACING } from '@/theme/colors';

/**
 * RF18 — Dashboard Principal da Aplicação (Tela 2).
 * Resumo de treino e resumo de dieta com calorias e macronutrientes.
 */
export default function DashboardScreen() {
  // Dados do atleta (baseados em RF04/RF05/RF18 e RN03)
  const [atleta] = useState({
    nome: 'Felipe Dev',
    usuario: 'felipe.dev',
    objetivo: 'Ganhar músculo', // RN03: 'perder peso', 'ganhar músculo', 'manter peso'
    pesoAtual: '78.5 kg',
  });

  // Dados do plano nutricional (RF13, RF14, RF17, RF18)
  const [nutricao] = useState({
    planoAtivo: 'Hipertrofia Limpa (Fase 2)',
    metaCalorias: 2800,
    caloriasConsumidas: 2150,
    macros: {
      proteina: { atual: 168, meta: 195, unidade: 'g', cor: '#BEF443' },
      carboidrato: { atual: 245, meta: 330, unidade: 'g', cor: '#0EA5E9' },
      gordura: { atual: 52, meta: 70, unidade: 'g', cor: '#F59E0B' },
    },
    refeicoes: [
      { id: '1', nome: 'Café da Manhã', horario: '08:00', calorias: 580, concluida: true },
      { id: '2', nome: 'Almoço Balanceado', horario: '12:30', calorias: 820, concluida: true },
      { id: '3', nome: 'Lanche Pré-Treino', horario: '16:30', calorias: 420, concluida: true },
      { id: '4', nome: 'Jantar Pós-Treino', horario: '20:00', calorias: 680, concluida: false },
      { id: '5', nome: 'Ceia Proteica', horario: '22:30', calorias: 300, concluida: false },
    ],
  });

  // Dados de treino (RF09, RF10, RF18)
  const [treino] = useState({
    treinosAtivosSemana: 4,
    metaSemanal: 5,
    treinoRecente: {
      nome: 'Treino A — Peito, Ombros & Tríceps',
      nivel: 'Intermediário', // iniciante | intermediário | avançado
      duracaoMinutos: 55,
      exerciciosQtd: 6,
      ultimoRegistro: 'Hoje às 07:15',
    },
    diasSemana: [
      { dia: 'S', concluido: true, hoje: false },
      { dia: 'T', concluido: true, hoje: false },
      { dia: 'Q', concluido: true, hoje: true },
      { dia: 'Q', concluido: false, hoje: false },
      { dia: 'S', concluido: false, hoje: false },
      { dia: 'S', concluido: false, hoje: false },
      { dia: 'D', concluido: false, hoje: false },
    ],
  });

  // Cálculo de calorias (RF17)
  const diferencaCalorica = nutricao.metaCalorias - nutricao.caloriasConsumidas;
  const statusCalorico =
    diferencaCalorica > 0
      ? { texto: `Abaixo da meta (${diferencaCalorica} kcal restantes)`, cor: COLORS.primary }
      : diferencaCalorica === 0
      ? { texto: 'Meta diária atingida!', cor: COLORS.success }
      : { texto: `Acima da meta (+${Math.abs(diferencaCalorica)} kcal)`, cor: COLORS.warning };

  const percentualCalorias = Math.min(
    100,
    Math.round((nutricao.caloriasConsumidas / nutricao.metaCalorias) * 100)
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Topo institucional */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.brandRow}>
                <BrandMark size={28} />
                <Wordmark fontSize={18} style={styles.brandWordmark} />
              </View>
              <Text style={styles.greetingTitle}>OLÁ, {atleta.nome.split(' ')[0].toUpperCase()} 👋</Text>
              <Text style={styles.greetingSubtitle}>Acompanhamento diário de evolução</Text>
            </View>

            <Pressable
              onPress={() => router.push('/(tabs)/profile')}
              style={styles.profileBadge}
              accessibilityLabel="Ir para o perfil"
            >
              <View style={styles.avatarMini}>
                <Text style={styles.avatarMiniText}>FD</Text>
              </View>
            </Pressable>
          </View>

          {/* Badge de Objetivo Físico (RN03) */}
          <View style={styles.objectiveCard}>
            <View style={styles.objectiveLeft}>
              <MaterialCommunityIcons name="target" size={18} color={COLORS.primary} />
              <Text style={styles.objectiveLabel}>OBJETIVO ATUAL</Text>
            </View>
            <View style={styles.objectivePill}>
              <Text style={styles.objectiveValue}>{atleta.objetivo.toUpperCase()}</Text>
            </View>
          </View>

          {/* CARD 1: Nutrição & Calorias (RF17, RF18) */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderTitleRow}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(190, 244, 67, 0.15)' }]}>
                  <MaterialCommunityIcons name="fire" size={20} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.cardCategory}>METAS DO DIA • RF18</Text>
                  <Text style={styles.cardTitle}>Calorias & Dieta</Text>
                </View>
              </View>
              <Pressable
                onPress={() => router.push('/(tabs)/progress')}
                style={styles.detailsLink}
              >
                <Text style={styles.detailsLinkText}>Detalhes</Text>
                <MaterialCommunityIcons name="chevron-right" size={16} color={COLORS.primary} />
              </Pressable>
            </View>

            <Text style={styles.planNameText}>
              <Text style={styles.planNameLabel}>Plano ativo: </Text>
              {nutricao.planoAtivo}
            </Text>

            {/* Destaque numérico de calorias */}
            <View style={styles.caloriesRow}>
              <View>
                <Text style={styles.caloriesNumber}>{nutricao.caloriasConsumidas}</Text>
                <Text style={styles.caloriesUnit}>kcal consumidas</Text>
              </View>
              <View style={styles.caloriesMetaBox}>
                <Text style={styles.caloriesMetaText}>Meta: {nutricao.metaCalorias} kcal</Text>
                <Text style={[styles.caloriesStatusBadge, { color: statusCalorico.cor }]}>
                  {statusCalorico.texto}
                </Text>
              </View>
            </View>

            {/* Barra de progresso calórico */}
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${percentualCalorias}%` }]} />
            </View>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressPercentText}>{percentualCalorias}% concluído</Text>
              <Text style={styles.progressRemainingText}>{diferencaCalorica > 0 ? `${diferencaCalorica} kcal para a meta` : 'Meta atingida'}</Text>
            </View>

            {/* Divisor */}
            <View style={styles.divider} />

            {/* Macronutrientes (Proteínas, Carbos, Gorduras) */}
            <Text style={styles.macrosSectionTitle}>MACRONUTRIENTES</Text>
            <View style={styles.macrosGrid}>
              {/* Proteína */}
              <View style={styles.macroItem}>
                <View style={styles.macroHeader}>
                  <Text style={styles.macroName}>Proteína</Text>
                  <Text style={styles.macroValues}>
                    {nutricao.macros.proteina.atual}/{nutricao.macros.proteina.meta}g
                  </Text>
                </View>
                <View style={styles.macroBarBg}>
                  <View
                    style={[
                      styles.macroBarFill,
                      {
                        width: `${Math.min(100, (nutricao.macros.proteina.atual / nutricao.macros.proteina.meta) * 100)}%`,
                        backgroundColor: nutricao.macros.proteina.cor,
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Carboidrato */}
              <View style={styles.macroItem}>
                <View style={styles.macroHeader}>
                  <Text style={styles.macroName}>Carboidrato</Text>
                  <Text style={styles.macroValues}>
                    {nutricao.macros.carboidrato.atual}/{nutricao.macros.carboidrato.meta}g
                  </Text>
                </View>
                <View style={styles.macroBarBg}>
                  <View
                    style={[
                      styles.macroBarFill,
                      {
                        width: `${Math.min(100, (nutricao.macros.carboidrato.atual / nutricao.macros.carboidrato.meta) * 100)}%`,
                        backgroundColor: nutricao.macros.carboidrato.cor,
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Gordura */}
              <View style={styles.macroItem}>
                <View style={styles.macroHeader}>
                  <Text style={styles.macroName}>Gordura</Text>
                  <Text style={styles.macroValues}>
                    {nutricao.macros.gordura.atual}/{nutricao.macros.gordura.meta}g
                  </Text>
                </View>
                <View style={styles.macroBarBg}>
                  <View
                    style={[
                      styles.macroBarFill,
                      {
                        width: `${Math.min(100, (nutricao.macros.gordura.atual / nutricao.macros.gordura.meta) * 100)}%`,
                        backgroundColor: nutricao.macros.gordura.cor,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* CARD 2: Treinos Ativos & Treino Recente (RF09, RF10, RF18) */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderTitleRow}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(14, 165, 233, 0.15)' }]}>
                  <MaterialCommunityIcons name="dumbbell" size={20} color={COLORS.secondary} />
                </View>
                <View>
                  <Text style={styles.cardCategory}>ROTINA SEMANAL • RF18</Text>
                  <Text style={styles.cardTitle}>Treinos Ativos</Text>
                </View>
              </View>
              <Pressable
                onPress={() => router.push('/(tabs)/workouts')}
                style={styles.detailsLink}
              >
                <Text style={styles.detailsLinkText}>Treinos</Text>
                <MaterialCommunityIcons name="chevron-right" size={16} color={COLORS.primary} />
              </Pressable>
            </View>

            {/* Dias da semana com treinos */}
            <View style={styles.weekCalendar}>
              {treino.diasSemana.map((item, index) => (
                <View key={index} style={styles.dayCol}>
                  <Text style={[styles.dayLetter, item.hoje && styles.dayLetterToday]}>
                    {item.dia}
                  </Text>
                  <View
                    style={[
                      styles.dayCircle,
                      item.concluido && styles.dayCircleCompleted,
                      item.hoje && styles.dayCircleToday,
                    ]}
                  >
                    {item.concluido ? (
                      <MaterialCommunityIcons name="check" size={14} color={COLORS.onPrimary} />
                    ) : item.hoje ? (
                      <View style={styles.todayDot} />
                    ) : (
                      <Text style={styles.dayEmptyText}>•</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.activeWorkoutsCountBox}>
              <MaterialCommunityIcons name="lightning-bolt" size={16} color={COLORS.primary} />
              <Text style={styles.activeWorkoutsCountText}>
                <Text style={styles.activeWorkoutsCountHighlight}>{treino.treinosAtivosSemana}</Text> de {treino.metaSemanal} treinos concluídos nesta semana
              </Text>
            </View>

            {/* Card Interno: Treino Mais Recente */}
            <View style={styles.recentWorkoutCard}>
              <View style={styles.recentWorkoutTopRow}>
                <View style={styles.recentBadge}>
                  <Text style={styles.recentBadgeText}>TREINO MAIS RECENTE</Text>
                </View>
                <Text style={styles.recentTimestamp}>{treino.treinoRecente.ultimoRegistro}</Text>
              </View>

              <Text style={styles.recentWorkoutName}>{treino.treinoRecente.nome}</Text>

              {/* Chips de especificações */}
              <View style={styles.chipsRow}>
                <View style={styles.chip}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.chipText}>{treino.treinoRecente.duracaoMinutos} min</Text>
                </View>

                <View style={styles.chip}>
                  <MaterialCommunityIcons name="chart-line" size={14} color={COLORS.primary} />
                  <Text style={[styles.chipText, { color: COLORS.primary }]}>
                    {treino.treinoRecente.nivel}
                  </Text>
                </View>

                <View style={styles.chip}>
                  <MaterialCommunityIcons name="weight-lifter" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.chipText}>{treino.treinoRecente.exerciciosQtd} exercícios</Text>
                </View>
              </View>

              {/* Botão de ação para iniciar/ver treino */}
              <Pressable
                onPress={() => router.push('/(tabs)/workouts')}
                style={({ pressed }) => [
                  styles.workoutActionButton,
                  pressed && styles.workoutActionButtonPressed,
                ]}
              >
                <MaterialCommunityIcons name="play" size={18} color={COLORS.onPrimary} />
                <Text style={styles.workoutActionButtonText}>Iniciar Novo Treino</Text>
              </Pressable>
            </View>
          </View>

          {/* CARD 3: Refeições Programadas de Hoje (RF15, RF16) */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderTitleRow}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(251, 191, 36, 0.15)' }]}>
                  <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={COLORS.warning} />
                </View>
                <View>
                  <Text style={styles.cardCategory}>DIÁRIO NUTRICIONAL</Text>
                  <Text style={styles.cardTitle}>Refeições de Hoje</Text>
                </View>
              </View>
              <Text style={styles.mealsSummaryCount}>3/5 Feitas</Text>
            </View>

            <View style={styles.mealsList}>
              {nutricao.refeicoes.map((meal) => (
                <View key={meal.id} style={styles.mealItem}>
                  <View style={styles.mealLeft}>
                    <View
                      style={[
                        styles.mealCheckCircle,
                        meal.concluida && styles.mealCheckCircleDone,
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={meal.concluida ? 'check' : 'clock-outline'}
                        size={14}
                        color={meal.concluida ? COLORS.onPrimary : COLORS.textMuted}
                      />
                    </View>
                    <View>
                      <Text style={[styles.mealName, meal.concluida && styles.mealNameDone]}>
                        {meal.nome}
                      </Text>
                      <Text style={styles.mealTime}>{meal.horario}</Text>
                    </View>
                  </View>
                  <Text style={styles.mealCalories}>{meal.calorias} kcal</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Rodapé institucional */}
          <View style={styles.footer}>
            <Text style={styles.footerBrand}>FITTRACK • MOBILE</Text>
            <Text style={styles.footerVersion}>Versão 1.0.0 • RF18 Dashboard</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingBottom: 32,
  },
  container: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },

  // Cabeçalho
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 8,
  },
  headerLeft: {
    flex: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  brandWordmark: {
    marginLeft: 8,
    letterSpacing: 2,
  },
  greetingTitle: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 26,
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  greetingSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  profileBadge: {
    padding: 4,
  },
  avatarMini: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiniText: {
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.display,
    fontSize: 16,
  },

  // Objetivo
  objectiveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  objectiveLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  objectiveLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  objectivePill: {
    backgroundColor: 'rgba(190, 244, 67, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: BORDER_RADIUS.pill,
    borderWidth: 1,
    borderColor: 'rgba(190, 244, 67, 0.3)',
  },
  objectiveValue: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Cards gerais
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  detailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  detailsLinkText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },

  // Plano e Calorias
  planNameText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    marginBottom: 16,
  },
  planNameLabel: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  caloriesRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  caloriesNumber: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 38,
    color: COLORS.textPrimary,
    lineHeight: 44,
  },
  caloriesUnit: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  caloriesMetaBox: {
    alignItems: 'flex-end',
  },
  caloriesMetaText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  caloriesStatusBadge: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },

  // Barra de progresso calórico
  progressBarBg: {
    height: 10,
    backgroundColor: '#262D31',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressPercentText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  progressRemainingText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },

  // Divisor
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 18,
  },

  // Macros
  macrosSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginBottom: 12,
  },
  macrosGrid: {
    gap: 12,
  },
  macroItem: {},
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  macroName: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  macroValues: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  macroBarBg: {
    height: 6,
    backgroundColor: '#262D31',
    borderRadius: 3,
    overflow: 'hidden',
  },
  macroBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Treinos - Calendário semanal
  weekCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    backgroundColor: '#15191C',
    padding: 12,
    borderRadius: 14,
  },
  dayCol: {
    alignItems: 'center',
    gap: 6,
  },
  dayLetter: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  dayLetterToday: {
    color: COLORS.primary,
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#232A2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleCompleted: {
    backgroundColor: COLORS.primary,
  },
  dayCircleToday: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  dayEmptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  activeWorkoutsCountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  activeWorkoutsCountText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  activeWorkoutsCountHighlight: {
    color: COLORS.textPrimary,
    fontWeight: '800',
  },

  // Treino Mais Recente
  recentWorkoutCard: {
    backgroundColor: '#22282C',
    borderRadius: BORDER_RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recentWorkoutTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recentBadge: {
    backgroundColor: 'rgba(14, 165, 233, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
  },
  recentBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
    letterSpacing: 0.8,
  },
  recentTimestamp: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  recentWorkoutName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1B2023',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  workoutActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 12,
  },
  workoutActionButtonPressed: {
    backgroundColor: COLORS.primaryPressed,
  },
  workoutActionButtonText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: '700',
  },

  // Refeições
  mealsSummaryCount: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  mealsList: {
    gap: 10,
    marginTop: 4,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#20262A',
    padding: 12,
    borderRadius: BORDER_RADIUS.md,
  },
  mealLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mealCheckCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2D353A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealCheckCircleDone: {
    backgroundColor: COLORS.primary,
  },
  mealName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  mealNameDone: {
    color: COLORS.textSecondary,
  },
  mealTime: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  mealCalories: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  // Rodapé
  footer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  footerBrand: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 14,
    color: COLORS.textMuted,
    letterSpacing: 2,
  },
  footerVersion: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
