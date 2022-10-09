import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import BASEURL from '../api/criptosStats';

const AllCripto = () => {
  const [topCripto, setTopCripto] = useState([]);

  useEffect(() => {
    const criptoInfo = async () => {
      const info = await BASEURL.get('/coins/markets', {
        params: {
          vs_currency: 'eur',
          price_change_percentage: '1h,24h,7d',
        },
      });
      setTopCripto(info.data);
    };
    criptoInfo();
  });

  function percentageFormat(percentage) {
    return parseFloat(percentage).toFixed(3);
  }
  function currencyFormat(current_price) {
    return (
      parseFloat(current_price)
        .toFixed(2)
        .replace(/(?=(\d{3})+(?!\d))/g, '.') + ' €'
    );
  }

  return (
    <Container>
      <Table>
        <Head>
          <Title>Nombre</Title>
          <Title>Simbolo</Title>
          <Title>Precio</Title>
          <Title>Porcentage 24h</Title>
          <Title>Volumen Total</Title>
        </Head>
        {topCripto.length > 0 &&
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
          ))}
      </Table>
    </Container>
  );
};

const Container = styled.div`
  overflow: auto;
`

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
