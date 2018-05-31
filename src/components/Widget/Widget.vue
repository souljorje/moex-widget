<template>
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
      name: 'MegaWidget!',
    }"/>
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
