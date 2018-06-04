import index from './index';
import stockMarket from './stock-market';
import currencyAndMetals from './currency-and-precious-metals';
import futuresMarket from './futures-market';

export default {
  types: ['index', 'shares', 'currency', 'futures', 'bonds'],
  items: [index, stockMarket, currencyAndMetals, futuresMarket],
};
