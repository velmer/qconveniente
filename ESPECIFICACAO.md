# Especificação QConveniente

## UC1: CRUD de Estabelecimento

Deve ser possível fazer CRUD (*create, read, update, delete*) de estabelecimentos. Todo estabelecimento possui um conjunto de propriedades, sendo algumas dessas obrigatórias e outras não. Dentre as obrigatórias, temos: o nome do estabelecimento, as suas categorias, as formas de pagamento, os telefones, o valor da entrega e o horário de funcionamento. Quanto as não obrigatórias, temos: o tempo médio de entrega, as seções e subseções do menu de produtos a venda, a nota (avaliação), um indicador de inadimplência (falta de pagamento), um indicador de inatividade (por exemplo, o establecimento não está realizando entregas no momento) e um endereço.

As categorias do estabelecimento podem ser:
- Água
- Gás
- Bebida e Conveniência

## UC2: CRUD de Gestores do Estabelecimento

Um Estabelecimento deve possuir pelo menos um gestor, o qual é o responsável pelo estabelecimento. Além disso, podem existir mais de um gestor para um mesmo estabelecimento. Nesse sentido, deve ser possível fazer CRUD (*create, read, update, delete*) de gestores. Um gestor deve possui um nome de usuário, uma senha, um nível de permissão e o estabelecimento a qual o mesmo pertence.

Os niveis de permissão do gestor podem ser:
- Gerente
- Funcionário

Um gerente pode realizar todas as ações com seu estabelecimento, enquanto um funcionário tem ações limitadas. Por exemplo, um funcionário não pode atualizar o estabelecimento indicando que o mesmo está inativo.

## UC3: CRUD de Produtos

Cada estabelecimento possui uma coleção de produtos a venda. Por isso, deve ser possível fazer CRUD (*create, read, update, delete*) de produtos. Um produto deve possuir, obrigatoriamente, nome, preço e o estabelecimento a qual ele pertence, além disso ele pode possuir descrição, tamanho, indicação de inatividade (por exemplo, o produto acabou no estoque) e as indicações de qual a seção e subseção do produto.

## UC4: CRUD de Usuários

Até o momento, já existem estabelecimentos com seus respectivos gestores e produtos a venda, porém ainda não existe usuários para comprar tais produtos. Nesse sentido, deve ser possível fazer CRUD (*create, read, update, delete*) de usuários. Um usuário deve possuir, obrigatoriamente, nome completo, email, nome de usuário, senha, cpf e endereço de entrega.

## UC5: CRUD de Pedidos

Nosso usuários devem pode comprar produtos de um estabelecimento, para isso ele realizará um pedido a um estabelecimento. Nesse sentido, deve ser possível fazer CRUD (*create, read, update, delete*) de pedidos. Um pedido representa um conjunto de produtos a serem comprados por um usuário. Um pedido deve possuir valor total, valor da entrega, a forma de pagamento selecionada, status, os produtos as serem comprados, o usuário realizado a compra e seu respectivo endereço e a qual estabelecimento o pedido está sendo feito. Além disso, um pedido pode possuir troco, caso a forma de pagamento seja dinheiro, e uma avaliação de 1 a 5.

O status de um pedido representa em que momento da compra o mesmo está, podendo assumir as opções:
- Rascunho (Ainda sendo montado pelo usuário)
- Realizado (Realizado e deve ser confirmado pelo estabelecimento)
- Confirmado (O estabelecimento confirmou o pedido e está preparando-o)
- Pronto (Pronto para ser entregue)
- Saiu para entrega (Saiu para entrega)
- Entregue (Foi entrega ao usuário solicitante)
- Não entregue (Não foi possível entregar o pedido)
- Cancelado (Usuário ou estabelecimento cancelaram ou pedido)

Além disso, caso adicionarmos um produto diretamente a um pedido, não poderemos adicioná-lo mais de uma vez. Portanto, é necessário relacionar um produto a um pedido de forma que possamos inserir quantidade, observações, etc.