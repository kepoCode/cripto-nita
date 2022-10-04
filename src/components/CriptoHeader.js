import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import BASEURL from "../api/criptosStats";

const CriptoHeader = (criptosInfo) => {
    const [topCripto, setTopCripto] = useState();
    const crypto = criptosInfo.criptosInfo

    useEffect(() => {
        const criptoInfo = async () => {
            const info = await BASEURL.get("/coins/markets", {
                params: {
                    vs_currency: "eur",
                    ids: crypto.join(),
                }
            })
            setTopCripto(info.data);
        }
        criptoInfo()
    });

    function currencyFormat(current_price) {
        return  parseFloat(current_price).toFixed(2).replace(/(?=(\d{3})+(?!\d))/g, '.' ) + ' €'
      }

    return (
        <Block>
            {topCripto ?
                topCripto.map((cripto) =>
                    <>
                        <p>{cripto.name} - {currencyFormat(cripto.current_price)} /</p>
                    </>
                )
                : null}
        </Block>
    )
}

const Block = styled.div`
    display: flex;
    height: 30px;
    justify-content: space-between;
    background: #dad6d6;
    z-index: 10;
`;

export default CriptoHeader