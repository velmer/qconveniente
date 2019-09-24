import { Gestor, GestorDocument } from "../../models/gestor/Gestor";

/**
 * Retorna os gestores que satisfazerem as condições dadas nos
 * parâmetros especificados.
 * 
 * @param {Object} params Parâmetros da busca.
 * @return {Promise} Promessa contendo os gestores.
 */
export const get = async (params: object = {}): Promise<GestorDocument[]> => {
    const gestores = await Gestor.find(params);
    return gestores;
};

/**
 * Retorna um gestor dado o seu ID.
 * 
 * @param {String} id ID do gestor a ser retornado.
 * @return {Promise} Promessa contendo o gestor.
 */
export const getPorId = async (id: string): Promise<GestorDocument> => {
    const gestor = await Gestor.getById(id);
    return gestor;
};

/**
 * Salva um gestor.
 * 
 * @param {Gestor|Object} gestor Gestor a ser salvo.
 * @return {Promise} Promessa contendo o gestor salvo.
 */
export const salva = async (gestorJSON: JSON): Promise<GestorDocument> => {
    const gestor = new Gestor(gestorJSON);
    return await gestor.save();
};

/**
 * Atualiza um gestor.
 * 
 * @param {Gestor} gestor Gestor a ser atualizado.
 * @return {Promise} Promessa contendo o gestor atualizado.
 */
export const atualiza = async (gestor: GestorDocument): Promise<GestorDocument> => {
    const opcoes = { new: true }; // Deve retornar o gestor atualizado.
    const gestorAtualizado = await Gestor
        .findByIdAndUpdate(gestor._id, gestor, opcoes);
    return gestorAtualizado;
};

/**
 * Exclui um gestor.
 * 
 * @param {string} id ID do Gestor a ser excluído.
 * @return {Promise} Promessa vazia.
 */
export const exclui = async (id: string): Promise<any> => {
    await getPorId(id);
    await Gestor.findByIdAndRemove(id);
};