import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./Pagamento";
import { UsuarioContext } from "./Usuario";

export const CarrinhoContext = createContext();

CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);
    const [qtdProdutos, setQtdProdutos] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

    return (
        <CarrinhoContext.Provider 
        value={{ 
            carrinho, 
            setCarrinho,
            qtdProdutos,
            setQtdProdutos,
            valorTotalCarrinho,
            setValorTotalCarrinho
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
        setQtdProdutos, 
        valorTotalCarrinho,
        setValorTotalCarrinho
    } = useContext(CarrinhoContext);

    const {
        formaPgto
    } = usePagamentoContext();
    
    const { setSaldo } = useContext(UsuarioContext);
   
 
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

    const efetuarCompra = () => {
        setCarrinho([]);
        setSaldo(saldoAtual => saldoAtual - valorTotalCarrinho);
    }

    useEffect(() => {
        const { novaQtd, novoTotal } = carrinho.reduce((contador, item) => ({
            novaQtd: contador.novaQtd + item.qtd,
            novoTotal: contador.novoTotal + (item.valor * item.qtd)
        }), {
            novaQtd: 0,
            novoTotal: 0
        })
        setQtdProdutos(novaQtd);
        setValorTotalCarrinho(novoTotal * (formaPgto ? formaPgto.juros : 1))
    }, [carrinho, setQtdProdutos, formaPgto]);

    return {
        carrinho,
        setCarrinho,
        addProduto,
        removerProduto,
        qtdProdutos,
        setQtdProdutos,
        valorTotalCarrinho,
        efetuarCompra
    };
}