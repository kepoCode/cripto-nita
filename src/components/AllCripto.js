import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import BASEURL from '../api/criptosStats';
import { currencyFormat, percentageFormat } from '../util/utilFunctions';

const INITIALPARAMS = {
  vs_currency: 'eur',
  price_change_percentage: '1h,24h,7d'
}

const AllCripto = () => {
  const [topCripto, setTopCripto] = useState([]);
  const [hide, setHide] = useState(false);
  const [params, setParams] = useState(INITIALPARAMS);
  const inputSearch = useRef(null);

  const handleOnChange = (e) => {
    inputSearch.current.value = e.target.value;
  }

  const applyFilter = () => {
    setParams({...params, ids: inputSearch.current.value })
    inputSearch.current.value = null;
    setHide(true)
  }

  const handleOnKeyDown = (e) => {
    if(e.key === 'Enter') {
      applyFilter();
    }
  }

  const handleOnclick = () => {
    if(inputSearch.current.value !== "") {
      applyFilter();
    } else {
      setParams(INITIALPARAMS)
      setHide(false);
    }
  };

  useEffect(() => {
    const criptoInfo = async () => {
      const info = await BASEURL.get('/coins/markets', {params});
      setTopCripto(info.data);
    };
    criptoInfo();
  }, [params]);

  return (
    <Container>
      <Filter>
        <label hidden={hide}>Filtro de búsqueda: </label>
        <input type='text' placeholder='Ej ethereum' ref={inputSearch} onChange={(e) => handleOnChange(e)} onKeyDown={handleOnKeyDown} hidden={hide}></input>
        <button type='button' onClick={handleOnclick} hidden={hide}>Buscar</button>
        <button type='button' onClick={handleOnclick} hidden={!hide}>Limpiar búsqueda</button>
      </Filter>
      <Table>
        <Head>
          <Title>Nombre</Title>
          <Title>Simbolo</Title>
          <Title>Precio</Title>
          <Title>Porcentaje 24h</Title>
          <Title>Volumen Total</Title>
        </Head>
        {topCripto.length > 0 ?
          topCripto.map((cripto) => (
            <Row key={cripto.id}>
              <Column>
                <img width="20px" src={cripto.image} alt="CriptoNita" />
                {cripto.name}
              </Column>
              <Column>{cripto.symbol.toUpperCase()}</Column>
              <Column>{currencyFormat(cripto.current_price)}%</Column>
              <Column>
                {percentageFormat(cripto.price_change_percentage_24h)}
              </Column>
              <Column>{currencyFormat(cripto.total_volume)}</Column>
            </Row>
          )) : <span>No se ha encontrado información</span>}
      </Table>
    </Container>
  );
};

const Container = styled.div`
  overflow: auto;
`;

const Filter = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: .5rem;
  margin-top: 30px;
  justify-content: center;
  align-items: center
`;

const Table = styled.div`
  max-width: 80rem;
  width: 100%;
  margin: 4rem auto;
  background: #0d0712;
  display: table;
  border-radius: 12px;
  border: 1px solid #314158;
  overflow: hidden;
  text-align: left;
  font-size: 1rem;
  box-shadow: 0 12px 20px -6px #46628056;
`;

const Head = styled.div`
  background: #466280;
  display: table-row;
`;

const Title = styled.h4`
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  display: table-cell;
`;

const Row = styled.div`
  display: table-row;

  &:nth-child(2n) {
    background: #263044;
  }
`;

const Column = styled.div`
  padding: 0.5rem 1rem;
  display: table-cell;

  img {
    margin-right: 1rem;
  }
`;

export default AllCripto;
