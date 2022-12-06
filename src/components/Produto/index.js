import { Container } from './styles';
import { memo, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { CarrinhoContext } from 'common/context/Carrinho';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
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

  return (
    <Container>
      <div>
        <img
          src={`/assets/${foto}.png`}
          alt={`foto de ${nome}`}
        />
        <p>
          {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton
          color="secondary"
        >
          <RemoveIcon />
        </IconButton>
        <IconButton onClick={() => addProduto({ nome, foto, id, valor })}>
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  )
}

export default memo(Produto)