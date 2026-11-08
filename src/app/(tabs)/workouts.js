import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark, Wordmark } from '@/components/BrandLogo';
import { CONTENT_MAX_WIDTH, FONT_FAMILY } from '@/constants';
import { BORDER_RADIUS, COLORS, SPACING } from '@/theme/colors';

// Cores por nível (iniciante | intermediário | avançado)
const NIVEIS = {
  Iniciante: { cor: COLORS.success, fundo: 'rgba(34, 197, 94, 0.15)' },
  Intermediário: { cor: COLORS.warning, fundo: 'rgba(251, 191, 36, 0.15)' },
  Avançado: { cor: '#F87171', fundo: 'rgba(248, 113, 113, 0.15)' },
};

const FILTROS = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

// Dados de exemplo (trocar pela API/banco quando existir)
const TREINOS = [
  { id: '1', nome: 'Hipertrofia — Peito & Tríceps', duracaoMinutos: 50, exerciciosQtd: 5, nivel: 'Intermediário' },
  { id: '2', nome: 'Full Body Iniciante', duracaoMinutos: 40, exerciciosQtd: 6, nivel: 'Iniciante' },
  { id: '3', nome: 'Pernas & Glúteos', duracaoMinutos: 60, exerciciosQtd: 7, nivel: 'Avançado' },
  { id: '4', nome: 'Costas & Bíceps', duracaoMinutos: 45, exerciciosQtd: 5, nivel: 'Intermediário' },
];

const META_SEMANAL = { concluidos: 3, total: 5 };

function TreinoCard({ treino, onPress }) {
  const nivel = NIVEIS[treino.nivel];
  return (
    <Pressable
      onPress={() => onPress(treino)}
      style={({ pressed }) => [styles.workoutCard, pressed && styles.workoutCardPressed]}
      accessibilityLabel={`Abrir treino ${treino.nome}`}
    >
      <View style={styles.workoutTopRow}>
        <View style={styles.workoutTitleRow}>
          <View style={[styles.levelDot, { backgroundColor: nivel.cor }]} />
          <Text style={styles.workoutName} numberOfLines={1}>
            {treino.nome}
          </Text>
        </View>
        <View style={[styles.levelPill, { backgroundColor: nivel.fundo }]}>
          <Text style={[styles.levelPillText, { color: nivel.cor }]}>
            {treino.nivel.toUpperCase()}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textMuted} />
      </View>

      <View style={styles.workoutMetaRow}>
        <MaterialCommunityIcons name="clock-outline" size={14} color={COLORS.textSecondary} />
        <Text style={styles.workoutMetaText}>
          {treino.duracaoMinutos} min · {treino.exerciciosQtd} exercícios
        </Text>
      </View>
    </Pressable>
  );
}

/**
 * Tela 3 — Módulo de Treinos (RF06 a RF12).
 * Lista de treinos ativos com busca e filtro por nível.
 */
export default function WorkoutsScreen() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');

  const treinosFiltrados = useMemo(
    () =>
      TREINOS.filter(
        (t) =>
          (filtro === 'Todos' || t.nivel === filtro) &&
          t.nome.toLowerCase().includes(busca.trim().toLowerCase())
      ),
    [busca, filtro]
  );

  const handleAbrirTreino = (treino) => {
    // TODO: navegar para o detalhe do treino
  };

  const handleCriarTreino = () => {
    // TODO: navegar para a criação de treino
    router.push('/(tabs)/workouts_create')
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={treinosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TreinoCard treino={item} onPress={handleAbrirTreino} />}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            {/* Topo institucional */}
            <View style={styles.header}>
              <View style={styles.brandRow}>
                <BrandMark size={28} />
                <Wordmark fontSize={18} style={styles.brandWordmark} />
              </View>

              <View style={styles.headerRight}>
                <Pressable style={styles.bellButton} accessibilityLabel="Notificações">
                  <MaterialCommunityIcons name="bell-outline" size={22} color={COLORS.textPrimary} />
                  <View style={styles.bellDot} />
                </Pressable>
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
            </View>

            {/* Título */}
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.titleSubtitle}>Seus planos</Text>
                <Text style={styles.title}>TREINOS</Text>
              </View>
              <View style={styles.activePill}>
                <Text style={styles.activePillText}>{TREINOS.length} ativos</Text>
              </View>
            </View>

            {/* Busca */}
            <View style={styles.searchBox}>
              <MaterialCommunityIcons name="magnify" size={20} color={COLORS.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nome ou objetivo"
                placeholderTextColor={COLORS.textMuted}
                value={busca}
                onChangeText={setBusca}
                returnKeyType="search"
              />
            </View>

            {/* Filtros por nível */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersRow}
            >
              {FILTROS.map((f) => {
                const ativo = f === filtro;
                return (
                  <Pressable
                    key={f}
                    onPress={() => setFiltro(f)}
                    style={[styles.filterChip, ativo && styles.filterChipActive]}
                  >
                    <Text style={[styles.filterChipText, ativo && styles.filterChipTextActive]}>
                      {f === 'Todos' ? `${f} (${TREINOS.length})` : f}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum treino encontrado. Tente outro nome ou filtro.
          </Text>
        }
        ListFooterComponent={
          <View style={styles.footerBlock}>
            <View style={styles.goalRow}>
              <MaterialCommunityIcons name="lightning-bolt" size={16} color={COLORS.primary} />
              <Text style={styles.goalLabel}>Meta semanal ativa</Text>
              <Text style={styles.goalValue}>
                {META_SEMANAL.concluidos} / {META_SEMANAL.total} dias
              </Text>
            </View>

            <Pressable
              onPress={handleCriarTreino}
              style={({ pressed }) => [
                styles.createButton,
                pressed && styles.createButtonPressed,
              ]}
            >
              <MaterialCommunityIcons name="plus" size={20} color={COLORS.onPrimary} />
              <Text style={styles.createButtonText}>Criar novo treino</Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: 32,
  },

  // Cabeçalho
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandWordmark: {
    marginLeft: 8,
    letterSpacing: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bellButton: {
    padding: 6,
  },
  bellDot: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
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

  // Título
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 2,
  },
  title: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 30,
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  activePill: {
    backgroundColor: 'rgba(190, 244, 67, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: BORDER_RADIUS.pill,
    borderWidth: 1,
    borderColor: 'rgba(190, 244, 67, 0.3)',
  },
  activePillText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },

  // Busca
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
  },

  // Filtros
  filtersRow: {
    gap: 8,
    paddingVertical: 14,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BORDER_RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.onPrimary,
    fontWeight: '800',
  },

  // Cards de treino
  workoutCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 12,
  },
  workoutCardPressed: {
    borderColor: COLORS.primary,
  },
  workoutTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  workoutTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  workoutName: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  levelPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
  },
  levelPillText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  workoutMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
    marginLeft: 14,
  },
  workoutMetaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: 13,
    marginTop: 32,
  },

  // Rodapé da lista: meta semanal + botão
  footerBlock: {
    marginTop: 4,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  goalLabel: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  goalValue: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '800',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 14,
  },
  createButtonPressed: {
    backgroundColor: COLORS.primaryPressed,
  },
  createButtonText: {
    color: COLORS.onPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
});