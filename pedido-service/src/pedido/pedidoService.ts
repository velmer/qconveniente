import { Pedido, PedidoDocument } from "./Pedido";

/**
 * Retorna os pedidos que satisfazerem as condições dadas nos
 * parâmetros especificados.
 * 
 * @param {Object} params Parâmetros da busca.
 * @return {Promise} Promessa contendo os pedidos.
 */
export const get = async (params: object = {}): Promise<PedidoDocument[]> => {
    const pedidos = await Pedido.find(params);
    return pedidos;
};

/**
 * Retorna um pedido dado o seu ID.
 * 
 * @param {String} id ID do pedido a ser retornado.
 * @return {Promise} Promessa contendo o pedido.
 */
export const getPorId = async (id: string): Promise<PedidoDocument> => {
    const pedido = await Pedido.getPorId(id);
    return pedido;
};

/**
 * Salva um pedido.
 * 
 * @param {JSON} pedido Pedido a ser salvo.
 * @return {Promise} Promessa contendo o pedido salvo.
 */
export const salva = async (pedidoJSON: JSON): Promise<PedidoDocument> => {
    const pedido = new Pedido(pedidoJSON);
    return await pedido.save();
};

/**
 * Atualiza um pedido.
 * 
 * @param {Pedido} pedido Pedido a ser atualizado.
 * @return {Promise} Promessa contendo o pedido atualizado.
 */
export const atualiza = async (pedido: PedidoDocument): Promise<PedidoDocument> => {
    const opcoes = { new: true }; // Deve retornar o pedido atualizado.
    const pedidoAtualizado = await Pedido
        .findByIdAndUpdate(pedido._id, pedido, opcoes);
    return pedidoAtualizado;
};

/**
 * Exclui um pedido.
 * 
 * @param {string} id ID do Pedido a ser excluído.
 * @return {Promise} Promessa vazia.
 */
export const exclui = async (id: string): Promise<any> => {
    await getPorId(id);
    await Pedido.findByIdAndRemove(id);
};