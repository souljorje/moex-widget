export default {
  name: 'futures-market',
  title: 'Срочный рынок',
  tables: [
    {
      instruments: [
        {
          SECID: 'GZ',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'MX',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'RI',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'SR',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'VI',
          BOARDID: 'RFUD',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'LAST', 'LASTTOPREVPRICE'],
      type: 'futures',
      name: 'Фондовый',
      interval: 30000,
      chart: true,
    },
    {
      instruments: [
        {
          SECID: 'BR',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'CU',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'GD',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'SA',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'SV',
          BOARDID: 'RFUD',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'LAST', 'LASTTOPREVPRICE'],
      type: 'futures',
      name: 'Товарный',
      interval: 30000,
      chart: true,
    },
    {
      instruments: [
        {
          SECID: 'ED',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'Eu',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'O2',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'O4',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'Si',
          BOARDID: 'RFUD',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'LAST', 'LASTTOPREVPRICE'],
      type: 'futures',
      name: 'Денежный',
      interval: 30000,
      chart: true,
    },
  ],
};
