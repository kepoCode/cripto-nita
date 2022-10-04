import React, { useState, useEffect } from 'react'
import styled from "styled-components";

import BASEURL from "../api/criptosStats";

const TopCripto = (criptosInfo) => {
    const [topCripto, setTopCripto] = useState();
    const crypto = criptosInfo.criptosInfo

    useEffect(() => {
      const criptoInfo = async () => {
        const info = await BASEURL.get("/coins/markets", {
          params: {
            vs_currency: "eur",
            ids: crypto.join(),
            price_change_percentage: "1h,24h,7d"
          }
        })
        setTopCripto(info.data);
      }
      criptoInfo()
    });

    function percentageFormat(percentage) {
      return parseFloat(percentage).toFixed(3)
    }

    function currencyFormat(current_price) {
      return  parseFloat(current_price).toFixed(2).replace(/(?=(\d{3})+(?!\d))/g, '.' ) + ' €'
    }

  return (
    <BlockCripto>
      {topCripto ? 
        topCripto.map((cripto) =>
          <Cripto key={cripto.id}>
            {//console.log('cripto', cripto)
            }
            <BlockImage>       
              <Block>
                <Image src={cripto.image} alt="CriptoNita" />
                <Percentage>{percentageFormat(cripto.price_change_percentage_24h)}%</Percentage>
                <CriptoName>{cripto.name}</CriptoName>
              </Block>
            </BlockImage>
            <Block>{currencyFormat(cripto.current_price)}</Block>
          </Cripto>
        )
      : null}
    </BlockCripto>
  )
}

const BlockCripto = styled.div`
  position: relative;
  display: inline-block;
`;

const CriptoName = styled.p`
  margin: 5px 30px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: #111111;
  float: right;

  @media screen and (max-width: 414px) {
    font-size: 15px;
    margin: 0px 27px;
  }
`;

const BlockImage = styled.div`
  display: block;
  position: relative;
  float: left;
  width: 100%;
`;
const Percentage = styled.p`
  position: absolute;
  right: 0;
  top: 0;

  @media screen and (max-width: 869px) {
    font-size: 15px;
  }
  @media screen and (max-width: 414px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 40px;

  @media screen and (max-width: 869px) {
    width: 18px;
  }
`;

const Cripto = styled.div`
  display: inline-block;
  width: 250px;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);

  @media screen and (max-width: 869px) {
    width: 180px;
    margin: 15px;
    padding: 15px;
  }

  @media screen and (max-width: 414px) {
    margin: 6px;
    padding: 5px;
  }
`;

const Block = styled.div`
  display: block;
  width: 100%;
  margin-top: 20px;
  font-size: 23px;
  @media screen and (max-width: 869px) {
    font-size: 15px;
  }
`;

export default TopCripto