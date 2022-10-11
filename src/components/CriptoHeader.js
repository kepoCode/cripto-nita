import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BASEURL from '../api/criptosStats';
import { currencyFormat } from '../util/utilFunctions';

const CriptoHeader = (criptosInfo) => {
  const [topCripto, setTopCripto] = useState([]);
  const crypto = criptosInfo.criptosInfo;

  useEffect(() => {
    const criptoInfo = async () => {
      const info = await BASEURL.get('/coins/markets', {
        params: {
          vs_currency: 'eur',
          ids: crypto.join(),
        },
      });
      setTopCripto(info.data);
    };
    criptoInfo();
  }, [crypto]);


  return (
    <TopBar>
      <Container>
        {topCripto.length > 0 &&
          topCripto.map((cripto) => (
            <strong key={cripto.id}>
              {cripto.name} - {currencyFormat(cripto.current_price)}
            </strong>
          ))}
      </Container>
    </TopBar>
  );
};

const TopBar = styled.div`
  background: #466280;
  padding: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  max-width: 80rem;
  margin: 0 auto;
  text-transform: uppercase;
`;

export default CriptoHeader;
