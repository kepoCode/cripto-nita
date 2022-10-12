export function percentageFormat(percentage) {
    return parseFloat(percentage).toFixed(3);
  }
export function currencyFormat(current_price) {
    return (
      parseFloat(current_price)
        .toFixed(2)
        .replace(/(?=(\d{3})+(?!\d))/g, '.') + ' €'
    );
  }
