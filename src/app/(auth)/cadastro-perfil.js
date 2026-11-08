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
 * Tela de cadastro do perfil físico.
 * Permite informar idade, altura, peso e objetivo pela primeira vez.
 */
export default function CadastroPerfilScreen() {
  const usuario = USUARIOS[0]; // admin / admin

  const [idade, setIdade] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [objetivo, setObjetivo] = useState(OBJETIVOS_DISPONIVEIS[0]);
  const [mensagem, setMensagem] = useState(null);

  function salvar() {
    setMensagem(null);

    // Validação simples: valores devem ser positivos
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

    // Simula salvamento (substituir por API real depois)
    usuario.perfilFisico.idade = Number(idade);
    usuario.perfilFisico.altura = Number(altura);
    usuario.perfilFisico.peso = Number(peso);
    usuario.perfilFisico.objetivo = objetivo;

    setMensagem({ tipo: 'sucesso', texto: 'Perfil cadastrado com sucesso!' });
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
            <Text style={styles.titulo}>Cadastro de Perfil</Text>
            <Text style={styles.subtitulo}>
              Informe seus dados físicos e seu objetivo.
            </Text>

            <Text style={styles.label}>Idade (anos)</Text>
            <TextInput
              style={styles.input}
              value={idade}
              onChangeText={setIdade}
              keyboardType="numeric"
              placeholder="Ex: 25"
            />

            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              value={altura}
              onChangeText={setAltura}
              keyboardType="numeric"
              placeholder="Ex: 175"
            />

            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
              placeholder="Ex: 75"
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
              onPress={salvar}
            >
              <Text style={styles.botaoTexto}>Cadastrar perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.replace('/(tabs)/dashboard')}
              style={styles.voltar}
            >
              <Text style={styles.voltarTexto}>Voltar</Text>
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
  voltar: {
    marginBottom: 24,
  },
  voltarTexto: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
