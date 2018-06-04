export default {
  name: 'stock-market',
  title: 'Фондовый рынок',
  tables: [
    {
      instruments: [
        {
          SECID: 'SBER',
          BOARDID: 'TQBR',
        },
        {
          SECID: 'GAZP',
          BOARDID: 'TQBR',
        },
        {
          SECID: 'LKOH',
          BOARDID: 'TQBR',
        },
        {
          SECID: 'ALRS',
          BOARDID: 'TQBR',
        },
        {
          SECID: 'MOEX',
          BOARDID: 'TQBR',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'LAST', 'LASTTOPREVPRICE'],
      type: 'shares',
      name: 'Акции',
      interval: 30000,
      chart: true,
    },
    {
      instruments: [
        {
          SECID: 'SU26216RMFS0',
          BOARDID: 'TQOB',
        },
        {
          SECID: 'SU26215RMFS2',
          BOARDID: 'TQOB',
        },
        {
          SECID: 'SU26207RMFS9',
          BOARDID: 'TQOB',
        },
        {
          SECID: 'SU26221RMFS0',
          BOARDID: 'TQOB',
        },
        {
          SECID: 'SU26218RMFS6',
          BOARDID: 'TQOB',
        },
      ],
      cellNames: ['SHORTNAME', 'TRADEDATE', 'DURATION', 'YIELDCLOSE', 'CLOSE', 'LASTCHANGE'],
      type: 'bonds',
      name: 'ОФЗ',
      interval: 30000,
      chart: true,
    },
    {
      instruments: [
        {
          SECID: 'XS0088543193',
          BOARDID: 'TQOD',
        },
        {
          SECID: 'XS0993162683',
          BOARDID: 'TQOD',
        },
        {
          SECID: 'XS0922301717',
          BOARDID: 'TQOD',
        },
        {
          SECID: 'XS0191754729',
          BOARDID: 'TQOD',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'YIELD', 'LAST', 'LASTCHANGE'],
      type: 'bonds',
      name: 'Еврооблигации',
      interval: 30000,
      chart: true,
    },
  ],
};
