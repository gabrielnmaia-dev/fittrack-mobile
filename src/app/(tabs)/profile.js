import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet as S } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as I } from '@expo/vector-icons';
import { COLORS } from '@/theme/colors';
import { FONT_FAMILY } from '@/constants';
import { router } from 'expo-router';

const X = {
  bg: '#0D0F10', card: '#1B1F22', inner: '#14171A', line: '#2A2F33',
  orange: '#FF9F5A', red: '#8F1B00', redCard: '#3A1A1C',
};

const METRICS = [
  { label: 'PESO ATUAL', value: '78.4', unit: 'kg', foot: 'Meta: 80.0 kg  •  98%', bar: 0.98 },
  { label: 'ESTATURA', value: '1.79', unit: 'm', foot: 'IMC estimado: 24.5' },
  { label: '% GORDURA (BF)', value: '12.8', unit: '%', foot: 'Faixa Atlética Ideal', dot: X.orange },
  { label: 'MASSA MAGRA', value: '68.2', unit: 'kg', foot: '+1.2 kg este mês', dot: COLORS.primary },
];
const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
const DONE = 5; // dias concluídos (SEG–SEX)
const GUIDES = [
  ['dumbbell', 'Hipertrofia & Força Muscular', 'Foco no protocolo de sobrecarga progressiva'],
  ['apple', 'Bulking Limpo', 'Meta calórica diária: 2.200 kcal/dia'],
  ['bell-ring-outline', 'Hidratação & Lembretes', 'Intervalo de 2h (3.5L diários)', 'ATIVO'],
];
const ACCOUNT = [
  ['card-account-details-outline', 'Dados Pessoais & Biometria'],
  ['monitor-cellphone', 'Dispositivos Conectados', 'Apple iPhone 15 Pro • Sincronizado'],
  ['shield-outline', 'Segurança & Senha'],
  ['tune-variant', 'Preferências de Notificações'],
];
const TABS = [['Home', 'home-outline'], ['Treinos', 'dumbbell'], ['Dieta', 'silverware-fork-knife'], ['Perfil', 'account-circle-outline']];

const Title = ({ icon, children }) => (
  <View style={s.title}><I name={icon} size={22} color={COLORS.primary} /><Text style={s.h2}>{children}</Text></View>
);

const Row = ({ icon, title, sub, badge, color = COLORS.textPrimary, bg, onPress }) => (
  <Pressable onPress={onPress} style={[s.row, bg && { backgroundColor: bg }]}>
    <I name={icon} size={26} color={bg ? color : COLORS.textSecondary} />
    <View style={{ flex: 1 }}>
      <Text style={[s.rowTitle, { color }]}>{title}</Text>
      {sub && <Text style={s.muted}>{sub}</Text>}
    </View>
    {badge ? <Text style={s.badge}>{badge}</Text> : <I name="chevron-right" size={24} color={bg ? color : COLORS.textSecondary} />}
  </Pressable>
);

export default function PerfilScreen() {

  function logout() {
    router.replace('/finalizacao');
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.h1}><Text style={{ color: COLORS.primary }}>● </Text>PERFIL</Text>
          <I name="bell-outline" size={26} color={COLORS.textSecondary} />
        </View>

        <View style={s.card}>
          <View style={s.line}>
            <View style={s.avatar}><I name="account" size={44} color={COLORS.textSecondary} /></View>
            <View style={{ flex: 1 }}>
              <View style={s.nameRow}>
                <Text style={s.name}>FELIPE SILVA</Text>
                <Text style={[s.badge, s.pro]}>PRO</Text>
              </View>
              <Text style={s.muted}>@felipe.dev</Text>
            </View>
            <Pressable style={s.edit}><I name="pencil-outline" size={18} color={COLORS.primary} /><Text style={s.text}> Editar</Text></Pressable>
          </View>
          <View style={[s.line, s.inner, { marginTop: 16 }]}>
            <I name="check-decagram-outline" size={26} color={X.orange} />
            <Text style={s.text}>Nível Intermediário</Text>
            <Text style={s.muted}>Membro desde Jan 2024</Text>
          </View>
        </View>

        <Title icon="ruler">TELEMETRIA CORPORAL</Title>
        <View style={s.grid}>
          {METRICS.map((m) => (
            <View key={m.label} style={[s.card, s.metric]}>
              <Text style={s.muted}>{m.label}</Text>
              <Text style={s.big}>{m.value}<Text style={s.unit}> {m.unit}</Text></Text>
              {m.bar && <View style={s.track}><View style={[s.fill, { width: `${m.bar * 100}%` }]} /></View>}
              <Text style={[s.muted, { marginTop: 8 }]}>{m.dot && <Text style={{ color: m.dot }}>● </Text>}{m.foot}</Text>
            </View>
          ))}
        </View>

        <View style={[s.card, { marginTop: 12 }]}>
          <View style={s.between}>
            <Text style={s.h2}>RITMO SEMANAL</Text>
            <Text style={s.badge}> 100% META </Text>
          </View>
          <View style={{ marginVertical: 16, gap: 12 }}>
            {[DAYS.slice(0, 3), DAYS.slice(3)].map((row, r) => (
              <View key={r} style={s.between}>
                {row.map((d) => {
                  const done = DAYS.indexOf(d) < DONE;
                  return (
                    <View key={d} style={s.day}>
                      <Text style={[s.dayText, done && { color: COLORS.primary }]}>{d}</Text>
                      <View style={[s.circle, done && { backgroundColor: COLORS.primary }]}>
                        <I name={done ? 'check' : 'minus'} size={20} color={done ? COLORS.onPrimary : COLORS.textSecondary} />
                      </View>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
          <View style={s.between}>
            <View style={[s.inner, s.stat]}><Text style={s.muted}>Treinos no Mês</Text><Text style={s.statValue}>22 <Text style={s.muted}>sessões</Text></Text></View>
            <View style={[s.inner, s.stat]}><Text style={s.muted}>Média Diária</Text><Text style={s.statValue}>2.180 <Text style={s.muted}>kcal</Text></Text></View>
          </View>
        </View>

        <Title icon="radar">DIRETRIZES ATIVAS</Title>
        <View style={s.list}>
          {GUIDES.map(([icon, title, sub, badge]) => <Row key={title} icon={icon} title={title} sub={sub} badge={badge} />)}
        </View>

        <Title icon="account-cog-outline">CONTA & SEGURANÇA</Title>
        <View style={s.list}>
          {ACCOUNT.map(([icon, title, sub]) => <Row key={title} icon={icon} title={title} sub={sub} />)}
          <Row icon="logout" title="Encerrar Sessão" sub="Desconectar deste dispositivo com segurança"
            color={COLORS.error} bg={X.redCard} onPress={logout} />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const s = S.create({
  safe: { flex: 1, backgroundColor: X.bg },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  h1: { fontFamily: FONT_FAMILY.display, fontSize: 30, fontWeight: '800', color: COLORS.textPrimary },
  h2: { fontFamily: FONT_FAMILY.display, fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  title: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 28, marginBottom: 14 },
  card: { backgroundColor: X.card, borderRadius: 24, padding: 20 },
  inner: { backgroundColor: X.inner, borderRadius: 16, padding: 14 },
  line: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: X.inner, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: FONT_FAMILY.display, fontSize: 22, fontWeight: '800', color: COLORS.textPrimary},
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', columnGap: 8 },
  text: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  muted: { fontSize: 15, color: COLORS.textSecondary },
  badge: { paddingHorizontal: 10, paddingVertical: 3, fontSize: 13, fontWeight: '800', color: COLORS.primary, backgroundColor: 'rgba(198,241,53,0.16)', borderRadius: 8, overflow: 'hidden' },
  edit: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metric: { width: '48%', flexGrow: 1, borderRadius: 16 },
  big: { fontFamily: FONT_FAMILY.display, fontSize: 46, fontWeight: '800', color: COLORS.textPrimary, marginTop: 6 },
  unit: { fontSize: 18, color: COLORS.textSecondary, fontWeight: '500' },
  track: { height: 8, borderRadius: 4, backgroundColor: X.line, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: COLORS.primary },
  day: { alignItems: 'center', gap: 6 },
  dayText: { fontSize: 12, fontWeight: '800', color: COLORS.textSecondary },
  circle: { width: 40, height: 40, borderRadius: 20, backgroundColor: X.line, alignItems: 'center', justifyContent: 'center' },
  stat: { flex: 1 },
  statValue: { fontFamily: FONT_FAMILY.display, fontSize: 28, fontWeight: '800', color: COLORS.textPrimary, marginTop: 4 },
  list: { backgroundColor: X.card, borderRadius: 24, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20 },
  rowTitle: { fontSize: 19, fontWeight: '700' },
  brand: { alignSelf: 'center', marginTop: 28 },
  tabs: { flexDirection: 'row', paddingTop: 12, paddingBottom: 8, borderTopWidth: 1, borderTopColor: X.line },
  tab: { flex: 1, alignItems: 'center', gap: 4 },
  tabText: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  day: { flex: 1, alignItems: 'center', gap: 2 },
});
