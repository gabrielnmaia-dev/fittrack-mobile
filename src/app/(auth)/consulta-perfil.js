import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { USUARIOS, OBJETIVOS_DISPONIVEIS } from '@/data/usuarioMock';
import { COLORS, SPACING, BORDER_RADIUS } from '@/theme/colors';
import { CONTENT_MAX_WIDTH } from '@/constants';

/**
 * Tela de consulta e atualização do perfil físico.
 * O usuário vê apenas os próprios dados e pode editá-los.
 */
export default function ConsultaPerfilScreen() {
  const usuario = USUARIOS[0]; // admin / admin — apenas o próprio perfil

  const [idade, setIdade] = useState(String(usuario.perfilFisico.idade));
  const [altura, setAltura] = useState(String(usuario.perfilFisico.altura));
  const [peso, setPeso] = useState(String(usuario.perfilFisico.peso));
  const [objetivo, setObjetivo] = useState(usuario.perfilFisico.objetivo);
  const [mensagem, setMensagem] = useState(null);

  function atualizar() {
    setMensagem(null);

    // Validação: valores devem ser positivos
    if (!idade || Number(idade) <= 0) {
      setMensagem({ tipo: 'erro', texto: 'Informe uma idade maior que zero.' });
      return;
    }

    if (!altura || Number(altura) <= 0) {
      setMensagem({ tipo: 'erro', texto: 'Informe uma altura maior que zero.' });
      return;
    }

    if (!peso || Number(peso) <= 0) {
      setMensagem({ tipo: 'erro', texto: 'Informe um peso maior que zero.' });
      return;
    }

    // Simula atualização (substituir por API real depois)
    usuario.perfilFisico.idade = Number(idade);
    usuario.perfilFisico.altura = Number(altura);
    usuario.perfilFisico.peso = Number(peso);
    usuario.perfilFisico.objetivo = objetivo;

    setMensagem({ tipo: 'sucesso', texto: 'Perfil atualizado com sucesso!' });
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
            <TouchableOpacity onPress={() => router.goBack()} style={styles.voltar}>
              <Text style={styles.voltarTexto}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Meu Perfil Físico</Text>
            <Text style={styles.subtitulo}>
              Aqui você consulta e edita seus próprios dados.
            </Text>

            <Text style={styles.label}>Idade (anos)</Text>
            <TextInput
              style={styles.input}
              value={idade}
              onChangeText={setIdade}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              value={altura}
              onChangeText={setAltura}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Objetivo</Text>
            <View style={styles.objetivos}>
              {OBJETIVOS_DISPONIVEIS.map((obj) => (
                <TouchableOpacity
                  key={obj}
                  style={[
                    styles.opcao,
                    objetivo === obj && styles.opcaoSelecionada,
                  ]}
                  onPress={() => setObjetivo(obj)}
                >
                  <Text style={[styles.opcaoTexto, objetivo === obj && styles.opcaoAtiva]}>
                    {obj}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {mensagem && (
              <View style={[styles.mensagem, mensagem.tipo === 'erro' && styles.mensagemErro]}>
                <Text style={[styles.mensagemTexto, mensagem.tipo === 'erro' && styles.mensagemTextoErro]}>
                  {mensagem.texto}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.botao, mensagem?.tipo === 'erro' && styles.botaoDesabilitado]}
              onPress={atualizar}
            >
              <Text style={styles.botaoTexto}>Atualizar perfil</Text>
            </TouchableOpacity>
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  content: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
  voltar: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  voltarTexto: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  titulo: {
    marginTop: 16,
    marginBottom: 6,
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitulo: {
    marginBottom: 24,
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 6,
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.input,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontSize: 15,
    marginBottom: 16,
  },
  objetivos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  opcaoSelecionada: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(190, 244, 67, 0.15)',
  },
  opcaoTexto: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  opcaoAtiva: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  mensagem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 211, 153, 0.12)',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  mensagemErro: {
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
  },
  mensagemTexto: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '600',
  },
  mensagemTextoErro: {
    color: '#F87171',
  },
  botao: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginBottom: 16,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
});
