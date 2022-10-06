import React, { useEffect, useState } from 'react';
import styled from "styled-components";

import TopCripto from '../components/TopCripto';
import AllCripto from './AllCripto';

const Home = () => {
  const criptos= ["bitcoin", "ethereum", "cardano"]

  return (
    <Header>
      <BlockLeft>
        <Title>Analiza los precios de las criptomonedas</Title>
        <TopCripto criptosInfo={criptos} />
        <AllCripto />
      </BlockLeft>
    </Header>
  )
}

const Header = styled.div`  
  background-image: url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png');
  height: 500px;
  padding-top: 150px;
  text-align: center;
  @media screen and (max-width: 869px) {
    padding-top: 40px;
  }
  @media screen and (max-width: 414px) {
    padding-top: 20px;
  }
}
`;
const BlockLeft = styled.div`
  font-size: 30px;
`;
const Title = styled.h1`
  margin: 40px;
  text-align: center;
  font-weight: bold;
  color: #ffffff;

  @media screen and (max-width: 414px) {
    font-size: 32px;
  }
`;

export default Home