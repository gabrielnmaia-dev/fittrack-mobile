import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/components/BrandLogo';
import FormField from '@/components/FormField';
import PrimaryButton from '@/components/PrimaryButton';
import StatusMessage from '@/components/StatusMessage';
import { COLORS, SPACING, BORDER_RADIUS } from '@/theme/colors';
import { CONTENT_MAX_WIDTH, FONT_FAMILY } from '@/constants';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/**
 * RF01 — Tela de criação de conta.
 */
export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState(null);

  const senhaValida = senha.length >= 8;
  const numeroValido = /\d/.test(senha);

  function validar() {
    const novosErros = {};

    if (nome.trim().length < 3) {
      novosErros.nome = 'Informe seu nome completo.';
    }

    if (!email.trim()) {
      novosErros.email = 'Informe seu e-mail.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      novosErros.email = 'Esse e-mail não parece válido.';
    }

    if (senha.length < 8) {
      novosErros.senha = 'A senha precisa ter pelo menos 8 caracteres.';
    } else if (!numeroValido) {
      novosErros.senha = 'A senha precisa ter pelo menos 1 número.';
    }

    if (confirmarSenha !== senha) {
      novosErros.confirmarSenha = 'As senhas não conferem.';
    }

    if (!aceitouTermos) {
      novosErros.termos = 'É necessário aceitar os termos para continuar.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function criarCadastro() {
    setMensagem(null);

    if (!validar()) {
      setMensagem({ tipo: 'erro', texto: 'Revise os campos destacados antes de continuar.' });
      return;
    }

    setCarregando(true);

    // TODO: substituir pela chamada real da API (EXPO_PUBLIC_API_URL).
    setTimeout(() => {
      setCarregando(false);
      setMensagem({ tipo: 'sucesso', texto: 'Cadastro criado! Você já pode entrar.' });
    }, 900);
  }

  function voltar() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/(auth)/login');
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
            <View style={styles.header}>
              <Pressable
                onPress={voltar}
                style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
                accessibilityRole="button"
                accessibilityLabel="Voltar"
              >
                <MaterialCommunityIcons name="arrow-left" size={20} color={COLORS.textPrimary} />
              </Pressable>

              <Brand markSize={22} wordmarkSize={15} />
            </View>

            <View style={styles.tabs}>
              <View style={styles.tabActive}>
                <Text style={styles.tabActiveText}>NOVA MATRÍCULA</Text>
              </View>
              <Text style={styles.tabInactive}>PROTOCOLO ALETA</Text>
            </View>

            <Text style={styles.title}>CRIAR CONTA</Text>
            <Text style={styles.subtitle}>
              Configure seu perfil de alto performance e ative a telemetria biométrica para sua
              periodização.
            </Text>

            <FormField
              label="Nome completo"
              icon="account-outline"
              placeholder="Ex: Felipe Silva"
              rightIcon="account-outline"
              rightIconLabel="Nome completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="name"
              error={erros.nome}
              containerStyle={styles.field}
            />

            <FormField
              label="E-mail (usuário)"
              icon="at"
              placeholder="felipe@exemplo.com ou @felipe.dev"
              rightIcon="email-outline"
              rightIconLabel="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              textContentType="emailAddress"
              error={erros.email}
              containerStyle={styles.field}
            />

            <FormField
              label="Senha segura"
              icon="lock-outline"
              placeholder="Mínimo 8 dígitos alfa-numéricos"
              rightIcon={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
              rightIconLabel={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              onPressRightIcon={() => setMostrarSenha((value) => !value)}
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
              textContentType="newPassword"
              error={erros.senha}
              containerStyle={styles.field}
            />

            <View style={styles.requirements}>
              <RequirementItem label="Mínimo 8 caracteres" satisfied={senhaValida} />
              <RequirementItem label="Ao menos 1 número" satisfied={numeroValido} divided />
            </View>

            <FormField
              label="Confirmar senha"
              icon="shield-check-outline"
              placeholder="Repita sua senha"
              rightIcon={mostrarConfirmacao ? 'eye-outline' : 'eye-off-outline'}
              rightIconLabel={mostrarConfirmacao ? 'Ocultar confirmação' : 'Mostrar confirmação'}
              onPressRightIcon={() => setMostrarConfirmacao((value) => !value)}
              secureTextEntry={!mostrarConfirmacao}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              textContentType="newPassword"
              error={erros.confirmarSenha}
              containerStyle={styles.field}
            />

            <Pressable
              onPress={() => setAceitouTermos((value) => !value)}
              style={styles.termsRow}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: aceitouTermos }}
            >
              <View style={[styles.checkbox, aceitouTermos && styles.checkboxChecked]}>
                {aceitouTermos ? (
                  <MaterialCommunityIcons name="check" size={13} color={COLORS.onPrimary} />
                ) : null}
              </View>

              <Text style={styles.termsText}>
                Concordo com os{' '}
                <Text style={styles.termsLink}>Termos de Uso</Text> e a{' '}
                <Text style={styles.termsLink}>Política de Privacidade Biomecânica</Text>
              </Text>
            </Pressable>

            {erros.termos ? <Text style={styles.termsError}>{erros.termos}</Text> : null}

            {mensagem ? (
              <StatusMessage type={mensagem.tipo} text={mensagem.texto} style={styles.message} />
            ) : null}

            <PrimaryButton
              label="Criar cadastro"
              onPress={criarCadastro}
              loading={carregando}
              style={styles.button}
            />

            <Pressable onPress={() => router.replace('/(auth)/login')} style={styles.footer}>
              <Text style={styles.footerText}>Já possui uma conta ativa? </Text>
              <Text style={styles.footerLink}>ENTRAR ›</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function RequirementItem({ label, satisfied, divided }) {
  return (
    <View style={[styles.requirement, divided && styles.requirementDivided]}>
      <View style={styles.requirementRow}>
        <View style={[styles.bullet, satisfied && styles.bulletSatisfied]} />
        <Text style={[styles.requirementText, satisfied && styles.requirementTextSatisfied]}>{label}</Text>
      </View>
    </View>
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  content: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButtonPressed: {
    backgroundColor: COLORS.input,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  tabActiveText: {
    color: COLORS.onPrimary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  tabInactive: {
    marginLeft: 12,
    color: COLORS.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 18,
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.display,
    fontSize: 30,
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: SPACING.lg,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  field: {
    marginBottom: SPACING.md,
  },
  requirements: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: -4,
    marginBottom: SPACING.md,
  },
  requirement: {
    flex: 1,
    paddingVertical: 10,
  },
  requirementDivided: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    paddingLeft: 16,
    marginLeft: 16,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.textMuted,
    marginRight: 8,
  },
  bulletSatisfied: {
    backgroundColor: COLORS.primary,
  },
  requirementText: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  requirementTextSatisfied: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  termsText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  termsLink: {
    color: COLORS.textPrimary,
    textDecorationLine: 'underline',
  },
  termsError: {
    marginTop: 6,
    color: COLORS.error,
    fontSize: 12,
  },
  message: {
    marginTop: SPACING.md,
  },
  button: {
    marginTop: SPACING.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  footerLink: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
