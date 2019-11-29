import { Produto, ProdutoDocument } from "./Produto";

/**
 * Retorna os produtos que satisfazerem as condições dadas nos
 * parâmetros especificados.
 * 
 * @param {Object} params Parâmetros da busca.
 * @return {Promise} Promessa contendo os produtos.
 */
export const get = async (params: object = {}): Promise<ProdutoDocument[]> => {
    const paramsDefault =  { ativo: true };
    params = { ...paramsDefault, ...params };
    const produtos = await Produto.find(params);
    return produtos;
};

/**
 * Retorna um produto dado o seu ID.
 * 
 * @param {String} id ID do produto a ser retornado.
 * @return {Promise} Promessa contendo o produto.
 */
export const getPorId = async (id: string): Promise<ProdutoDocument> => {
    const produto = await Produto.getPorId(id);
    return produto;
};

/**
 * Salva um produto.
 * 
 * @param {JSON} produto Produto a ser salvo.
 * @return {Promise} Promessa contendo o produto salvo.
 */
export const salva = async (produtoJSON: JSON): Promise<ProdutoDocument> => {
    const produto = new Produto(produtoJSON);
    return await produto.save();
};

/**
 * Atualiza um produto.
 * 
 * @param {Produto} produto Produto a ser atualizado.
 * @return {Promise} Promessa contendo o produto atualizado.
 */
export const atualiza = async (produto: ProdutoDocument): Promise<ProdutoDocument> => {
    const opcoes = { new: true }; // Deve retornar o produto atualizado.
    const produtoAtualizado = await Produto
        .findByIdAndUpdate(produto._id, produto, opcoes);
    return produtoAtualizado;
};
