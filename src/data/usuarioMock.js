// Usuários mock do FitTrack (apenas para desenvolvimento/testes).
// Em produção esses dados viriam de uma API real via EXPO_PUBLIC_API_URL.

export const USUARIOS = [
  {
    id: 1,
    usuario: 'admin',
    senha: 'admin',
    nome: 'Administrador',
    perfilFisico: {
      idade: 25,
      altura: 175,
      peso: 75,
      objetivo: 'manter peso',
    },
  },
];

// Busca um usuário pelo usuário e senha informados.
export function buscarUsuario(usuario, senha) {
  return USUARIOS.find((u) => u.usuario === usuario && u.senha === senha);
}

// Objetivos físicos disponíveis no sistema.
export const OBJETIVOS_DISPONIVEIS = ['perder peso', 'ganhar músculo', 'manter peso'];
