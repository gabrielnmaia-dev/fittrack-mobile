import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark, Wordmark } from '@/components/BrandLogo';
import Input from '@/components/Input';
import PrimaryButton from '@/components/PrimaryButton';
import StatusMessage from '@/components/StatusMessage';
import { COLORS, SPACING, BORDER_RADIUS } from '@/theme/colors';
import { CONTENT_MAX_WIDTH, FONT_FAMILY } from '@/constants';

/**
 * RF02 — Tela de login.
 */
export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarAcesso, setLembrarAcesso] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  function validar() {
    if (!usuario.trim()) {
      setMensagem({ tipo: 'erro', texto: 'Informe seu usuário para continuar.' });
      return false;
    }

    if (!senha) {
      setMensagem({ tipo: 'erro', texto: 'Informe sua senha para continuar.' });
      return false;
    }

    return true;
  }

  function entrar() {
    setMensagem(null);

    if (!validar()) return;

    setCarregando(true);

    // TODO: substituir pela chamada real da API (EXPO_PUBLIC_API_URL).
    setTimeout(() => {
      setCarregando(false);
      setMensagem({ tipo: 'sucesso', texto: 'Acesso liberado. Bem-vindo ao FitTrack!' });
    }, 900);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.brand}>
              <BrandMark size={46} />
              <Wordmark fontSize={26} style={styles.wordmark} />
              <Text style={styles.tagline}>Treino e dieta, um plano só.</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Usuário</Text>
                <Text style={styles.labelStrong}>ATLETA ID</Text>
              </View>

              <Input
                value={usuario}
                onChangeText={setUsuario}
                placeholder="felipe.dev"
                leftIcon="at"
                textContentType="username"
                containerStyle={styles.input}
                accessibilityLabel="Usuário"
              />

              <View style={[styles.labelRow, styles.labelRowSpaced]}>
                <Text style={styles.label}>Senha</Text>
                <Pressable onPress={() => setMensagem({ tipo: 'erro', texto: 'Recuperação de senha em breve.' })}>
                  <Text style={styles.forgot}>Esqueceu?</Text>
                </Pressable>
              </View>

              <Input
                value={senha}
                onChangeText={setSenha}
                placeholder="supersecreto"
                leftIcon="lock-outline"
                secureTextEntry={!mostrarSenha}
                textContentType="password"
                rightIcon={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
                rightIconLabel={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                onPressRightIcon={() => setMostrarSenha((value) => !value)}
                returnKeyType="go"
                onSubmitEditing={entrar}
                containerStyle={styles.input}
                accessibilityLabel="Senha"
              />

              <View style={styles.switchRow}>
                <Switch
                  value={lembrarAcesso}
                  onValueChange={setLembrarAcesso}
                  trackColor={{ false: '#333C40', true: COLORS.primary }}
                  activeTrackColor={COLORS.primary}
                  thumbColor="#FFFFFF"
                  activeThumbColor="#FFFFFF"
                  ios_backgroundColor="#333C40"
                  accessibilityLabel="Lembrar acesso"
                />
                <Text style={styles.switchLabel}>Lembrar acesso</Text>
              </View>

              {mensagem ? <StatusMessage type={mensagem.tipo} text={mensagem.texto} style={styles.message} /> : null}

              <PrimaryButton label="Entrar" onPress={entrar} loading={carregando} style={styles.button} />
            </View>

            <Pressable onPress={() => router.push('/(auth)/register')} style={styles.createAccount}>
              <Text style={styles.createAccountText}>Não tem conta? </Text>
              <Text style={styles.createAccountLink}>Criar cadastro</Text>
            </Pressable>

            <Text style={styles.footer}>FITTRACK</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  content: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
  },
  brand: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  wordmark: {
    marginTop: 14,
    letterSpacing: 3,
  },
  tagline: {
    marginTop: 6,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRowSpaced: {
    marginTop: 18,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  labelStrong: {
    color: COLORS.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  input: {
    marginTop: 10,
  },
  forgot: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  switchLabel: {
    marginLeft: 10,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  message: {
    marginTop: 16,
  },
  button: {
    marginTop: 18,
  },
  createAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  createAccountText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  createAccountLink: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    marginTop: SPACING.lg,
    textAlign: 'center',
    color: '#394145',
    fontFamily: FONT_FAMILY.display,
    fontSize: 9,
    letterSpacing: 5,
  },
});
