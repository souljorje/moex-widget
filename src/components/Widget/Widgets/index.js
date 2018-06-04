export default {
  name: 'index',
  title: 'Индексы',
  tables: [
    {
      instruments: [
        {
          SECID: 'IMOEX',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'RTSI',
          BOARDID: 'RTSI',
        },
        {
          SECID: 'MICEXBMI',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'RTSSTD',
          BOARDID: 'RTSI',
        },
        {
          SECID: 'RVI',
          BOARDID: 'RTSI',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'CURRENTVALUE', 'LASTCHANGEPRC'],
      type: 'index',
      name: 'Акции',
      interval: 30000,
      chart: true,
    },
    {
      instruments: [
        {
          SECID: 'RGBITR',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'MICEXCBITR',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'MICEXMBITR',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'MICEXCBITR3Y',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'MICEXCBITR5Y',
          BOARDID: 'SNDX',
        },
      ],
      cellNames: ['SECID', 'TIME', 'CURRENTVALUE', 'LASTCHANGEPRC'],
      type: 'index',
      name: 'Облигации',
      interval: 30000,
      chart: true,
    },
    {
      instruments: [
        {
          SECID: 'RUPCI',
          BOARDID: 'RTSI',
        },
        {
          SECID: 'RUPMI',
          BOARDID: 'RTSI',
        },
        {
          SECID: 'RUPAI',
          BOARDID: 'RTSI',
        },
      ],
      cellNames: ['SHORTNAME', 'CURRENTVALUE', 'LASTCHANGEPRC'],
      type: 'index',
      name: 'Пенсионные',
      interval: 30000,
      chart: true,
    },
    {
      instruments: [
        {
          SECID: 'MXREPO',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'MOEXREPOEQ',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'RPGCC',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'MOEXREPO1W',
          BOARDID: 'SNDX',
        },
        {
          SECID: 'RPGCC1W',
          BOARDID: 'SNDX',
        },
      ],
      cellNames: ['SHORTNAME', 'TRADEDATE', 'TIME', 'CURRENTVALUE', 'LASTCHANGE'],
      type: 'index',
      name: 'Репо',
      interval: 30000,
      chart: true,
    },
  ],
};
