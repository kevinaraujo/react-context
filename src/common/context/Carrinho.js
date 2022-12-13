import { createContext, useContext, useEffect, useState } from "react";

export const CarrinhoContext = createContext();

CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);
    const [qtdProdutos, setQtdProdutos] = useState(0);

    return (
        <CarrinhoContext.Provider 
        value={{ 
            carrinho, 
            setCarrinho,
            qtdProdutos,
            setQtdProdutos
        }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {
    const { 
        carrinho, 
        setCarrinho, 
        qtdProdutos, 
        setQtdProdutos 
    } = useContext(CarrinhoContext);

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

    useEffect(() => {
        const newQtd = carrinho.reduce((total, item) => total + item.qtd, 0)
        setQtdProdutos(newQtd);
    }, [carrinho, setQtdProdutos]);

    return {
        carrinho,
        setCarrinho,
        addProduto,
        removerProduto,
        qtdProdutos
    };
}