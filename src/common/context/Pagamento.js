import { createContext, useContext, useState } from  'react';

export const PagamentoContext = createContext();
PagamentoContext.displayName = "Pagamento";

export const PagamentoProvider = ({ children }) => {
    const tiposPgto = [{
        nome: "Boleto",
        juros: 1,
        id: 1
    },{
        nome: "Cartão de Crédito",
        juros: 1.3,
        id: 2
    },{
        nome: "Pix",
        juros: 1,
        id: 3
    },{
        nome: "Crediário",
        juros: 5,
        id: 4
    }];

    const [formaPgto, setFormaPgto] = useState(tiposPgto[0]);

    return (
        <PagamentoContext.Provider value={{tiposPgto, formaPgto, setFormaPgto}}>
            { children }
        </PagamentoContext.Provider>
    )
}

export const usePagamentoContext = () => {
    const {
        tiposPgto, 
        formaPgto, 
        setFormaPgto
    } = useContext(PagamentoContext);


    function mudarFormaPgto(id) {
        const pgtoAtual = tiposPgto.find(item => item.id === id);
        
        setFormaPgto(pgtoAtual);
    }

    return {
        tiposPgto, 
        formaPgto,
        mudarFormaPgto
    }
}