import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet as S } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as I } from '@expo/vector-icons';
import { COLORS } from '@/theme/colors';
import { FONT_FAMILY } from '@/constants';
import { Wordmark } from '@/components/BrandLogo';
import StatusMessage from '@/components/StatusMessage';

const X = {
  bg: '#0D0F10', card: '#1B1F22', inner: '#14171A', line: '#2A2F33',
  orange: '#FF9F5A', red: '#8F1B00', redCard: '#3A1A1C',
};

const OPTIONS = [
  { key: 'local', title: 'APENAS DESTE APARELHO', tag: 'Padrão',
    text: 'Invalida o token de acesso local e limpa biometria em cache. Suas outras sessões (desktop/tablet) continuam conectadas.' },
  { key: 'global', title: 'REVOGAR TODAS AS SESSÕES', tag: 'Global', danger: true,
    text: 'Desconecta imediatamente todos os 3 dispositivos vinculados e invalida Refresh Tokens por protocolo de segurança total.' },
];

// onConfirm(scope) recebe 'local' ou 'global': faça o logout de verdade ali.
export default function EncerrarSessaoScreen({ navigation, onConfirm }) {
  const [scope, setScope] = useState('local');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const confirm = async () => {
    setError('');
    setLoading(true);
    try {
      await onConfirm?.(scope);
    } catch {
      setError('Não foi possível encerrar a sessão. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>ENCERRAR SESSÃO</Text>
        <Text style={s.sub}>Confirme o encerramento da sua sessão ativa no dispositivo atual ou em todas as instâncias conectadas.</Text>

        <View style={s.card}>
          <View style={[s.row, s.userBox]}>
            <View style={s.avatar}><I name="account" size={32} color={COLORS.textSecondary} /></View>
            <View style={{ flex: 1 }}>
              <Text style={s.name}>FELIPE SILVA</Text>
              <Text style={s.muted} numberOfLines={1}>@felipe.dev • Plano Atleta Pro</Text>
            </View>
            <Text style={s.badge}> SESSÃO ATIVA </Text>
          </View>
          <View style={s.device}>
            <Text style={s.muted}>DISPOSITIVO</Text>
            <Text style={s.deviceName}>iPhone 15 Pro</Text>
            <Text style={s.muted}>São Paulo, BR (Atual)</Text>
          </View>
        </View>

        <Text style={s.scope}>ESCOPO DE SAÍDA</Text>
        {OPTIONS.map((o) => (
          <Pressable key={o.key} onPress={() => setScope(o.key)} style={[s.option, scope === o.key && { backgroundColor: '#222A2D' }]}>
            <View style={s.radio}>{scope === o.key && <View style={s.dot} />}</View>
            <View style={{ flex: 1 }}>
              <View style={s.row}>
                <Text style={s.optionTitle}>{o.title}</Text>
                <Text style={[s.tag, o.danger && { color: COLORS.error }]}>{o.tag}</Text>
              </View>
              <Text style={s.optionText}>{o.text}</Text>
            </View>
          </Pressable>
        ))}

        <StatusMessage text={error} />
        <Pressable style={[s.confirm, loading && { opacity: 0.55 }]} disabled={loading} onPress={confirm}>
          <I name="power" size={24} color={COLORS.textPrimary} />
          <Text style={s.confirmText}>ENCERRAR SESSÃO AGORA</Text>
        </Pressable>
        <Pressable style={s.cancel} onPress={() => navigation?.goBack()}>
          <Text style={s.cancelText}>CANCELAR E CONTINUAR NO FITTRACK</Text>
        </Pressable>
        <Wordmark fontSize={14} color="#B8BDC1" style={s.brand} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = S.create({
  safe: { flex: 1, backgroundColor: X.bg },
  content: { padding: 20, gap: 12 },
  title: { fontFamily: FONT_FAMILY.display, fontSize: 48, fontWeight: '800', color: '#F0F2F2' },
  sub: { fontSize: 17, lineHeight: 26, color: COLORS.textSecondary, marginBottom: 12 },
  card: { backgroundColor: X.card, borderRadius: 24, padding: 16, gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, justifyContent: 'space-between' },
  userBox: { backgroundColor: '#22272B', borderRadius: 16, padding: 14, justifyContent: 'flex-start' },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: X.inner, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: FONT_FAMILY.display, fontSize: 24, fontWeight: '800', color: COLORS.textPrimary },
  muted: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  badge: { fontSize: 12, fontWeight: '800', color: COLORS.primary, backgroundColor: 'rgba(198,241,53,0.18)', borderRadius: 8, overflow: 'hidden' },
  device: { backgroundColor: '#0E1113', borderRadius: 16, padding: 16, alignSelf: 'flex-start', minWidth: '45%' },
  deviceName: { fontSize: 22, fontWeight: '600', color: COLORS.textPrimary, marginVertical: 4 },
  scope: { fontSize: 18, fontWeight: '800', color: COLORS.textSecondary, marginTop: 12 },
  option: { flexDirection: 'row', gap: 16, backgroundColor: X.card, borderRadius: 24, padding: 20 },
  radio: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#0E1113', alignItems: 'center', justifyContent: 'center' },
  dot: { width: 18, height: 18, borderRadius: 9, backgroundColor: COLORS.primary },
  optionTitle: { flexShrink: 1, fontSize: 19, fontWeight: '800', color: COLORS.textPrimary },
  tag: { fontSize: 13, fontWeight: '800', color: COLORS.textSecondary, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8, overflow: 'hidden', paddingHorizontal: 8, paddingVertical: 3 },
  optionText: { fontSize: 17, lineHeight: 25, color: COLORS.textSecondary, marginTop: 6 },
  brand: { alignSelf: 'center', marginTop: 16 },
  confirm: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, backgroundColor: X.red, borderRadius: 16, paddingVertical: 22, marginTop: 20 },
  confirmText: { fontFamily: FONT_FAMILY.display, fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  cancel: { alignItems: 'center', backgroundColor: X.card, borderRadius: 16, paddingVertical: 22 },
  cancelText: { fontSize: 17, fontWeight: '800', color: '#D5DADD' },
});