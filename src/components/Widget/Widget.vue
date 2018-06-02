<template>
  <div class="row">
    <div class="column column_md-6">
      <widgetTable
        :config="{
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
          name: 'Indexes -> Stocks',
          interval: 5000,
          chart: true,
        }"/>
    </div>

    <div class="column column_md-6">
      <widgetTable
        :config="{
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
          name: 'Indexes -> Bonds',
          interval: 5000,
        }"/>
    </div>
    <div class="column column_md-6">
      <widgetTable
        :config="{
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
          name: 'Indexes -> Pension',
          interval: 5000,
        }"/>
    </div>
    <div class="column column_md-6">
      <widgetTable
        :config="{
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
          name: 'Indexes -> REPO',
          interval: 5000,
        }"/>
    </div>
    <!-- <widgetTable
    :config="{
      instruments: [
        {
          SECID: 'GD',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'BR',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'SV',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'CU',
          BOARDID: 'RFUD',
        },
        {
          SECID: 'SA',
          BOARDID: 'RFUD',
        },
      ],
      cellNames: ['SHORTNAME', 'TIME', 'LAST', 'LASTTOPREVPRICE'],
      type: 'futures',
      name: 'Futures!',
      interval: 5000,
    }"/> -->
  </div>


</template>

<style lang="stylus">

</style>

<script>
import widgetTable from '../Table/Table';

export default {
  components: {
    widgetTable,
  },
};
</script>
