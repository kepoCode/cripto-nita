import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import BASEURL from '../api/criptosStats';
import { currencyFormat, percentageFormat } from '../util/utilFunctions';

const TopCripto = (criptosInfo) => {
  const [topCripto, setTopCripto] = useState([]);
  const crypto = criptosInfo.criptosInfo;

  useEffect(() => {
    const criptoInfo = async () => {
      const info = await BASEURL.get('/coins/markets', {
        params: {
          vs_currency: 'eur',
          ids: crypto.join(),
          price_change_percentage: '1h,24h,7d',
        },
      });
      setTopCripto(info.data);
    };
    criptoInfo();
  }, [crypto]);

  return (
    <Container>
      {topCripto.length > 0 &&
        topCripto.map((cripto) => (
          <Block key={cripto.id}>
            <Icon src={cripto.image} alt="CriptoNita" />
            <Percentage>
              {percentageFormat(cripto.price_change_percentage_24h)}%
            </Percentage>
            <Name>{cripto.name}</Name>
            <Price>{currencyFormat(cripto.current_price)}</Price>
          </Block>
        ))}
    </Container>
  );
};

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 40rem) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const Block = styled.div`
  padding: 1rem;
  border-radius: 12px;
  background-color: #314158;
  box-shadow: 0 0 0 1px #466280, 0 5px 12px -4px #263044;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 280px;
  position: relative;
  color: #fff;
  overflow: hidden;
  cursor: default;
`;

const Icon = styled.img`
  position: absolute;
  width: 120px;
  height: 120px;
  left: 0;
  top: 0;
  transform: translate(-20%, -20%);
  opacity: 0.3;
`;

const Percentage = styled.span`
  font-size: 0.875rem;
  align-self: flex-end;
`;

const Name = styled.h3`
  font-size: 2rem;
  margin: 0.25rem;
  font-weight: bold;
  position: relative;
`;

const Price = styled.span`
  font-size: 1.25rem;
`;

export default TopCripto;
