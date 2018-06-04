export default {
  name: 'currency-and-precious-metals',
  title: 'Валютный рынок и драгметаллы',
  tables: [
    {
      instruments: [
        {
          SECID: 'USD000UTSTOM',
          BOARDID: 'CETS',
        },
        {
          SECID: 'EUR_RUB__TOM',
          BOARDID: 'CETS',
        },
        {
          SECID: 'EURUSD000TOM',
          BOARDID: 'CETS',
        },
        {
          SECID: 'CNYRUB_TOM',
          BOARDID: 'CETS',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'LAST', 'CHANGE'],
      type: 'currency',
      name: 'Спот',
      interval: 30000,
      chart: true,
    },
    {
      instruments: [
        {
          SECID: 'USD000TODTOM',
          BOARDID: 'CETS',
        },
        {
          SECID: 'EUR000TODTOM',
          BOARDID: 'CETS',
        },
        {
          SECID: 'EURUSDTODTOM',
          BOARDID: 'CETS',
        },
        {
          SECID: 'USDRUB_TOM1D',
          BOARDID: 'CETS',
        },
        {
          SECID: 'USDRUB_TOM1W',
          BOARDID: 'CETS',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'LAST', 'CHANGE'],
      type: 'currency',
      name: 'Своп',
      interval: 30000,
      chart: true,
    },
    {
      instruments: [
        {
          SECID: 'GLDRUB_TOM',
          BOARDID: 'CETS',
        },
        {
          SECID: 'SLVRUB_TOM',
          BOARDID: 'CETS',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'LAST', 'CHANGE'],
      type: 'currency',
      name: 'Драгметаллы',
      interval: 30000,
      chart: true,
    },
  ],
};
