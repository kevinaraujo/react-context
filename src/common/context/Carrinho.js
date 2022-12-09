import { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext();

CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);

    return (
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {
    console.log('result', useContext(CarrinhoContext));
    const { carrinho, setCarrinho } = useContext(CarrinhoContext);

    const mudarQtd = (id, qtd) => {
        return carrinho.map(item => {
            if (item.id === id) {
                item.qtd += qtd;
            }
            return item;
        })
    }

    function addProduto(novoProduto) {
        const temProduto = carrinho.some(item => item.id === novoProduto.id);

        if (!temProduto) {
            novoProduto.qtd = 1;
            return setCarrinho(carrinhoAnterior =>
                [...carrinhoAnterior, novoProduto]
            );
        }

        setCarrinho(mudarQtd(novoProduto.id, 1))
    }

    const removerProduto = (id) => {
        const produto = carrinho.find(item => item.id === id);
        const ultimoQtd = produto.qtd === 1;

        if (ultimoQtd) {
            return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(item => item.id !== id ));
        }
        
        setCarrinho(mudarQtd(produto.id, -1))
    }

    return {
        carrinho,
        setCarrinho,
        addProduto,
        removerProduto
    };
}