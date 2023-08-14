class CaixaDaLanchonete {
    constructor() {
        this.menu = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        ];
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        let total = 0;
        let hasPrincipal = false;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            const menuItem = this.menu.find(menuItem => menuItem.codigo === codigo);

            if (!menuItem) {
                return "Item inválido!";
            }

            if (menuItem.descricao.includes('extra')) {
                if (!hasPrincipal) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            } else {
                hasPrincipal = true;
            }

            total += menuItem.valor * parseInt(quantidade);
        }

        if (!['dinheiro', 'debito', 'credito'].includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (total === 0) {
            return "Quantidade inválida!";
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95; // Aplica desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === 'credito') {
            total *= 1.03; // Aplica acréscimo de 3% para pagamento em crédito
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
