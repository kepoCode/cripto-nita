import React, { useEffect, useState } from 'react';
import styled from "styled-components";

import BASEURL from "../api/criptosStats";

const AllCripto = () => {
  const [topCripto, setTopCripto] = useState();

  useEffect(() => {
    const criptoInfo = async () => {
      const info = await BASEURL.get("/coins/markets", {
        params: {
          vs_currency: "eur",
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
    return parseFloat(current_price).toFixed(2).replace(/(?=(\d{3})+(?!\d))/g, '.') + ' €'
  }

  return (
    <Title>
      <div class="table">
        <div class="table-header">
          <div class="header__item">Nombre</div>
          <div class="header__item">Simbolo</div>
          <div class="header__item">Precio</div>
          <div class="header__item">Porcentage 24h</div>
          <div class="header__item">Volumen Total</div>
        </div>
        <div class="table-content">
          {topCripto ?
            topCripto.map((cripto) =>
              <div class="table-row">
                <div class="table-data">
                  <img width='20px' src={cripto.image} alt="CriptoNita" />
                  {cripto.name}
                </div>
                <div class="table-data">{cripto.symbol}</div>
                <div class="table-data">{currencyFormat(cripto.current_price)}%</div>
                <div class="table-data">{percentageFormat(cripto.price_change_percentage_24h)}</div>
                <div class="table-data">{currencyFormat(cripto.total_volume)}</div>
              </div>
            ) : null
          }
        </div>
      </div>
    </Title>
  )
}

const Title = styled.div`
  margin-top: 100px;
  font-size: 20px;
	margin-right:auto;
	margin-left:auto;
	display:flex;
	justify-content:center;
	align-items:center;
	min-height:100vh;

  .table {
	width:100%;
	border:1px solid $color-form-highlight;
}

.table-header {
	display:flex;
	width:100%;
	background:#000;
	padding:($half-spacing-unit * 1.5) 0;
}

.table-row {
	display:flex;
	width:100%;
	padding:($half-spacing-unit * 1.5) 0;
	
	&:nth-of-type(odd) {
		background:$color-form-highlight;
	}
}

.table-data, .header__item {
	flex: 1 1 20%;
	text-align:center;
}

.header__item {
	text-transform:uppercase;
  color: #FFF;
}

.filter__link {
	color:white;
	text-decoration: none;
	position:relative;
	display:inline-block;
	padding-left:$base-spacing-unit;
	padding-right:$base-spacing-unit;
	
	&::after {
		content:'';
		position:absolute;
		right:-($half-spacing-unit * 1.5);
		color:white;
		font-size:$half-spacing-unit;
		top: 50%;
		transform: translateY(-50%);
	}
	
	&.desc::after {
		content: '(desc)';
	}

	&.asc::after {
		content: '(asc)';
	}
}

`;

export default AllCripto