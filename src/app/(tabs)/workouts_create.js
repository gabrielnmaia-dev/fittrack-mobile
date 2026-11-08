import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CONTENT_MAX_WIDTH, FONT_FAMILY } from '@/constants';
import { BORDER_RADIUS, COLORS, SPACING } from '@/theme/colors';

const DURACAO_MIN = 10;
const DURACAO_MAX = 180;
const DURACAO_PASSO = 5;

// Estimativas simples por nível (kcal por minuto e carga)
const NIVEIS = [
  { id: 'Iniciante', subtitulo: 'Adaptação', kcalMin: 6.5, carga: 'LEVE' },
  { id: 'Intermediário', subtitulo: 'Volume & Carga', kcalMin: 8.4, carga: 'MODERADA' },
  { id: 'Avançado', subtitulo: 'Alta intensidade', kcalMin: 10.5, carga: 'INTENSA' },
];

const EXERCICIOS_INICIAIS = [
  { id: '1', grupo: 'PEITO', nome: 'Supino Inclinado com Halteres', series: 3, reps: 12, cargaKg: 36 },
  { id: '2', grupo: 'PEITO', nome: 'Crucifixo Reto com Halteres', series: 3, reps: 12, cargaKg: 28 },
  { id: '3', grupo: 'TRÍCEPS', nome: 'Tríceps Corda na Polia', series: 3, reps: 15, cargaKg: 25 },
  { id: '4', grupo: 'TRÍCEPS', nome: 'Tríceps Francês Unilateral', series: 3, reps: 12, cargaKg: 14 },
];

function Campo({ rotulo, nota, children }) {
  return (
    <View style={styles.field}>
      <View style={styles.fieldHeader}>
        <Text style={styles.fieldLabel}>{rotulo}</Text>
        {nota ? <Text style={styles.fieldNote}>{nota}</Text> : null}
      </View>
      {children}
    </View>
  );
}

/**
 * RF10 — Cadastro de Treino.
 * Nome, descrição, duração, nível, exercícios associados e alerta de descanso.
 */
export default function CreateWorkoutScreen() {
  const [nome, setNome] = useState('Hipertrofia Superior — Peito & Tríceps');
  const [descricao, setDescricao] = useState(
    'Rotina focada em ativação peitoral e sobrecarga progressiva nas 4 semanas. Intervalos controlados de descanso.'
  );
  const [duracao, setDuracao] = useState(50);
  const [nivel, setNivel] = useState('Intermediário');
  const [exercicios, setExercicios] = useState(EXERCICIOS_INICIAIS);
  const [alertaDescanso, setAlertaDescanso] = useState(true);
  const [erro, setErro] = useState('');

  const nivelAtual = NIVEIS.find((n) => n.id === nivel);
  const gastoEstimado = Math.round((duracao * nivelAtual.kcalMin) / 10) * 10;
  const volumeTotal = useMemo(
    () => exercicios.reduce((total, e) => total + e.series, 0),
    [exercicios]
  );

  const ajustarDuracao = (delta) =>
    setDuracao((atual) => Math.min(DURACAO_MAX, Math.max(DURACAO_MIN, atual + delta)));

  const removerExercicio = (id) =>
    setExercicios((lista) => lista.filter((e) => e.id !== id));

  const handleVoltar = () => {
    if (router.canGoBack()) {
      router.push('/(tabs)/workouts');
    } else {
      router.replace('/(tabs)/workouts');
    }
  };

  const handleAdicionarExercicio = () => {
    // TODO: abrir seleção/cadastro de exercício e adicionar à lista
  };

  const handleSalvar = () => {
    if (!nome.trim()) {
      setErro('Informe o nome do treino.');
      return;
    }
    if (exercicios.length === 0) {
      setErro('Adicione pelo menos um exercício ao treino.');
      return;
    }
    setErro('');
    // TODO: enviar { nome, descricao, duracao, nivel, exercicios, alertaDescanso } para a API
    router.replace('/(tabs)/workouts');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Barra superior */}
        <View style={styles.topBar}>
          <Pressable onPress={handleVoltar} style={styles.circleButton} accessibilityLabel="Voltar">
            <MaterialCommunityIcons name="chevron-left" size={22} color={COLORS.textPrimary} />
          </Pressable>
          <Text style={styles.topBarTitle}>CADASTRAR EXERCÍCIO</Text>
          <View style={styles.circleButtonSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Contexto */}
            <View style={styles.tagRow}>
              <View style={styles.tagLeft}>
                <View style={styles.tagDot} />
                <Text style={styles.tagText}>RF10 • GESTÃO DE TREINOS</Text>
              </View>
              <Text style={styles.stepText}>ETAPA 1/2</Text>
            </View>

            <Text style={styles.title}>CADASTRAR TREINO</Text>
            <Text style={styles.subtitle}>
              Monte rotinas personalizadas associando exercícios, séries e cargas semanais.
            </Text>

            {/* Estimativas */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>CARGA ESTIMADA</Text>
                <Text style={styles.statValue}>{nivelAtual.carga}</Text>
                <Text style={styles.statHint}>Baseada no nível escolhido</Text>
              </View>
              <View style={[styles.statCard, styles.statCardHighlight]}>
                <Text style={styles.statLabel}>GASTO ESTIMADO</Text>
                <Text style={[styles.statValue, styles.statValueHighlight]}>
                  ~{gastoEstimado} KCAL
                </Text>
                <Text style={styles.statHint}>Varia com a duração</Text>
              </View>
            </View>

            {/* Nome */}
            <Campo rotulo="NOME DO TREINO *" nota="OBRIGATÓRIO">
              <View style={styles.inputBox}>
                <MaterialCommunityIcons name="dumbbell" size={18} color={COLORS.primary} />
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Ex.: Peito & Tríceps"
                  placeholderTextColor={COLORS.textMuted}
                  maxLength={60}
                />
              </View>
            </Campo>

            {/* Descrição */}
            <Campo rotulo="DESCRIÇÃO DO TREINO" nota="OPCIONAL">
              <View style={[styles.inputBox, styles.textAreaBox]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={descricao}
                  onChangeText={setDescricao}
                  placeholder="Objetivo, observações, intervalos..."
                  placeholderTextColor={COLORS.textMuted}
                  multiline
                  maxLength={240}
                  textAlignVertical="top"
                />
              </View>
            </Campo>

            {/* Duração */}
            <Campo rotulo="DURAÇÃO ESTIMADA" nota="ALVO EM MINUTOS">
              <View style={styles.durationRow}>
                <Pressable
                  onPress={() => ajustarDuracao(-DURACAO_PASSO)}
                  style={styles.stepButton}
                  accessibilityLabel="Diminuir duração"
                >
                  <MaterialCommunityIcons name="minus" size={20} color={COLORS.textPrimary} />
                </Pressable>

                <View style={styles.durationValueBox}>
                  <Text style={styles.durationValue}>
                    {duracao}
                    <Text style={styles.durationUnit}> min</Text>
                  </Text>
                  <Text style={styles.durationSub}>Tempo total previsto</Text>
                </View>

                <Pressable
                  onPress={() => ajustarDuracao(DURACAO_PASSO)}
                  style={styles.stepButton}
                  accessibilityLabel="Aumentar duração"
                >
                  <MaterialCommunityIcons name="plus" size={20} color={COLORS.textPrimary} />
                </Pressable>
              </View>
              <View style={styles.hintRow}>
                <MaterialCommunityIcons name="information-outline" size={13} color={COLORS.textMuted} />
                <Text style={styles.hintText}>
                  Tempo ideal para treinos de alta intensidade no meio do dia.
                </Text>
              </View>
            </Campo>

            {/* Nível */}
            <Campo rotulo="NÍVEL DE DIFICULDADE" nota="OBRIGATÓRIO">
              <View style={styles.levelRow}>
                {NIVEIS.map((n) => {
                  const ativo = n.id === nivel;
                  return (
                    <Pressable
                      key={n.id}
                      onPress={() => setNivel(n.id)}
                      style={[styles.levelCard, ativo && styles.levelCardActive]}
                      accessibilityLabel={`Nível ${n.id}`}
                    >
                      <Text style={[styles.levelTitle, ativo && styles.levelTitleActive]}>
                        {n.id.toUpperCase()}
                      </Text>
                      <Text style={styles.levelSub}>{n.subtitulo}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </Campo>

            {/* Exercícios */}
            <View style={styles.field}>
              <View style={styles.fieldHeader}>
                <Text style={styles.fieldLabel}>EXERCÍCIOS ASSOCIADOS ({exercicios.length})</Text>
                <Pressable onPress={handleAdicionarExercicio} style={styles.addButton}>
                  <MaterialCommunityIcons name="plus" size={14} color={COLORS.primary} />
                  <Text style={styles.addButtonText}>ADICIONAR</Text>
                </Pressable>
              </View>

              <View style={styles.summaryBar}>
                <Text style={styles.summaryText}>VOLUME TOTAL • {volumeTotal} SÉRIES</Text>
                <Text style={styles.summaryText}>DURAÇÃO • {duracao} MIN</Text>
              </View>

              {exercicios.length === 0 ? (
                <Text style={styles.emptyText}>
                  Nenhum exercício adicionado. Toque em "Adicionar" para começar.
                </Text>
              ) : (
                <View style={styles.exerciseList}>
                  {exercicios.map((ex, index) => (
                    <View key={ex.id} style={styles.exerciseItem}>
                      <View style={styles.exerciseIndex}>
                        <Text style={styles.exerciseIndexText}>{index + 1}</Text>
                      </View>
                      <View style={styles.exerciseInfo}>
                        <Text style={styles.exerciseGroup}>{ex.grupo}</Text>
                        <Text style={styles.exerciseName} numberOfLines={1}>
                          {ex.nome}
                        </Text>
                        <Text style={styles.exerciseMeta}>
                          {ex.series} séries × {ex.reps} reps ({ex.cargaKg} kg)
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => removerExercicio(ex.id)}
                        style={styles.removeButton}
                        accessibilityLabel={`Remover ${ex.nome}`}
                      >
                        <MaterialCommunityIcons name="trash-can-outline" size={18} color={COLORS.textMuted} />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Alerta de descanso */}
            <View style={styles.switchCard}>
              <View style={styles.switchTexts}>
                <Text style={styles.switchTitle}>NOTIFICAÇÃO DE DESCANSO</Text>
                <Text style={styles.switchSub}>
                  Dispara o alerta sonoro/vibratório ao fim do descanso.
                </Text>
              </View>
              <Switch
                value={alertaDescanso}
                onValueChange={setAlertaDescanso}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.onPrimary}
              />
            </View>

            {erro ? (
              <View style={styles.errorBox}>
                <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#F87171" />
                <Text style={styles.errorText}>{erro}</Text>
              </View>
            ) : null}

            {/* Ações */}
            <Pressable
              onPress={handleSalvar}
              style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
            >
              <MaterialCommunityIcons name="content-save-outline" size={20} color={COLORS.onPrimary} />
              <Text style={styles.saveButtonText}>SALVAR E PUBLICAR TREINO</Text>
            </Pressable>

            <Pressable onPress={handleVoltar} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>CANCELAR E VOLTAR</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingBottom: 24,
  },
  container: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
  },

  // Barra superior
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: 8,
    paddingBottom: 12,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButtonSpacer: {
    width: 40,
    height: 40,
  },
  topBarTitle: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 16,
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },

  // Contexto
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tagLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  stepText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  title: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 34,
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
    marginBottom: 16,
  },

  // Estimativas
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 14,
  },
  statCardHighlight: {
    borderColor: 'rgba(190, 244, 67, 0.4)',
    backgroundColor: 'rgba(190, 244, 67, 0.08)',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  statValue: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  statValueHighlight: {
    color: COLORS.primary,
  },
  statHint: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  // Campos
  field: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  fieldNote: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 0.8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  textAreaBox: {
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  textArea: {
    minHeight: 64,
  },

  // Duração
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationValueBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(190, 244, 67, 0.08)',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(190, 244, 67, 0.4)',
    paddingVertical: 10,
  },
  durationValue: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 28,
    color: COLORS.primary,
  },
  durationUnit: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  durationSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  hintText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textMuted,
  },

  // Nível
  levelRow: {
    flexDirection: 'row',
    gap: 8,
  },
  levelCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  levelCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(190, 244, 67, 0.1)',
  },
  levelTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  levelTitleActive: {
    color: COLORS.primary,
  },
  levelSub: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },

  // Exercícios
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: BORDER_RADIUS.pill,
    borderWidth: 1,
    borderColor: 'rgba(190, 244, 67, 0.4)',
    backgroundColor: 'rgba(190, 244, 67, 0.1)',
  },
  addButtonText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.8,
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.6,
  },
  exerciseList: {
    gap: 8,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 12,
  },
  exerciseIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(190, 244, 67, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseIndexText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseGroup: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.8,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 1,
  },
  exerciseMeta: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  removeButton: {
    padding: 6,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: 13,
    paddingVertical: 20,
  },

  // Alerta de descanso
  switchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 14,
    marginBottom: 16,
  },
  switchTexts: {
    flex: 1,
  },
  switchTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.8,
  },
  switchSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  // Erro
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.4)',
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    flex: 1,
    color: '#F87171',
    fontSize: 13,
    fontWeight: '600',
  },

  // Ações
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: 16,
  },
  saveButtonPressed: {
    backgroundColor: COLORS.primaryPressed,
  },
  saveButtonText: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 15,
    color: COLORS.onPrimary,
    letterSpacing: 1.5,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  cancelButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
});