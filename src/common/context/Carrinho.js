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

    function addProduto(novoProduto) {
        const temProduto = carrinho.some(item => item.id === novoProduto.id);

        if (!temProduto) {
            novoProduto.qtd = 1;
            return setCarrinho(carrinhoAnterior =>
                [...carrinhoAnterior, novoProduto]
            );
        }

        setCarrinho(carrinhoAnterior => carrinhoAnterior.map(item => {
            if (item.id === novoProduto.id) {
                item.qtd += 1;
            }
            return item;
        }))
    }

    return {
        carrinho,
        setCarrinho,
        addProduto
    };
}