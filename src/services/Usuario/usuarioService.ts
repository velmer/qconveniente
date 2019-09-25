import { Usuario, UsuarioDocument } from "../../models/usuario/Usuario";

/**
 * Retorna os usuários que satisfazerem as condições dadas nos
 * parâmetros especificados.
 * 
 * @param {Object} params Parâmetros da busca.
 * @return {Promise} Promessa contendo os usuarios.
 */
export const get = async (params: object = {}): Promise<UsuarioDocument[]> => {
    const usuarios = await Usuario.find(params);
    return usuarios;
};

/**
 * Retorna um usuário dado o seu ID.
 * 
 * @param {String} id ID do usuario a ser retornado.
 * @return {Promise} Promessa contendo o usuario.
 */
export const getPorId = async (id: string): Promise<UsuarioDocument> => {
    const usuario = await Usuario.getPorId(id);
    return usuario;
};

/**
 * Retorna um usuário dado o seu nome de usuário.
 * 
 * @param {String} nomeUsuario Nome de usuário do usuario a ser retornado.
 * @return {Promise} Promessa contendo o usuario.
 */
export const getPorNomeUsuario = async (nomeUsuario: string): Promise<UsuarioDocument> => {
    const usuario = await Usuario.getPorNomeUsuario(nomeUsuario);
    return usuario;
};

/**
 * Salva um usuário.
 * 
 * @param {JSON} usuario Usuário a ser salvo.
 * @return {Promise} Promessa contendo o usuario salvo.
 */
export const salva = async (usuarioJSON: JSON): Promise<UsuarioDocument> => {
    const usuario = new Usuario(usuarioJSON);
    return await usuario.save();
};

/**
 * Atualiza um usuário.
 * 
 * @param {Usuario} usuario Usuário a ser atualizado.
 * @return {Promise} Promessa contendo o usuario atualizado.
 */
export const atualiza = async (usuario: UsuarioDocument): Promise<UsuarioDocument> => {
    const opcoes = { new: true }; // Deve retornar o usuário atualizado.
    const usuarioAtualizado = await Usuario
        .findByIdAndUpdate(usuario._id, usuario, opcoes);
    return usuarioAtualizado;
};

/**
 * Exclui um usuário.
 * 
 * @param {string} id ID do Usuário a ser excluído.
 * @return {Promise} Promessa vazia.
 */
export const exclui = async (id: string): Promise<any> => {
    await getPorId(id);
    await Usuario.findByIdAndRemove(id);
};