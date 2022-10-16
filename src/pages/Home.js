import React from 'react'
import styled, { keyframes } from 'styled-components'

import TopCripto from '../components/TopCripto'
import AllCripto from '../components/AllCripto'
import CriptoHeader from '../components/CriptoHeader'

const Home = () => {
  const criptos = ['bitcoin', 'ethereum', 'cardano']

  return (
    <>
      <CriptoHeader criptosInfo={criptos} />
      <Header>
        <BlockLeft>
          <Title>Analiza los precios de las criptomonedas</Title>
          <TopCripto criptosInfo={criptos} />
          <AllCripto />
        </BlockLeft>
      </Header>
    </>
  )
}

const animation = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 0 100%;
  }
  100% {
    background-position: 0 0;
  }
`

const Header = styled.div`
  animation: ${animation} 10s linear infinite;
  background: url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png')
    center/cover;
  height: 60vh;
  padding: 0.5rem;
  text-align: center;
  @media screen and (max-width: 869px) {
    padding-top: 40px;
  }
  @media screen and (max-width: 414px) {
    padding-top: 20px;
  }
`

const BlockLeft = styled.div`
  font-size: 30px;
`

const Title = styled.h1`
  margin: 40px;
  text-align: center;
  font-weight: bold;
  color: #ffffff;

  @media screen and (max-width: 414px) {
    font-size: 32px;
  }
`

export default Home
