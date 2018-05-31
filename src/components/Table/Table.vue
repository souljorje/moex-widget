<template>
  <table>
    <thead>
      <tr>
        <th>
          {{ name || text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tableRow v-for="row in rows" :key="row.name" :cells="row.cells"/>
    </tbody>
  </table>
</template>

<style lang="stylus">

</style>

<script>
import tableRow from './Row';

export default {
  components: {
    tableRow,
  },
  props: {
    config: Object,
  },
  data() {
    return {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptate eligendi reiciendis nulla animi asperiores explicabo ut placeat quisquam velit eaque facilis illo soluta, nesciunt porro sunt laborum delectus aliquam.',
      ...this.config,
      rows: [
        {
          name: '',
          cells: null,
        },
      ],
    };
  },
  // computed: {
  //   rows: {
  //     get() {
  //       return this.generatedRows;
  //     },
  //     set(data) {
  //       this.generatedRows = this.generateRows(data);
  //     }
  //   }
  // },
  methods: {
    async requestData() {
      debugger;
      const instrumentsPairs = this.instruments.map(item => `${item.BOARDID}:${item.SECID}`);
      const response = await this.$http.get(`stock/markets/index/securities.jsonp?callback=this.parseData&iss.meta=off&iss.only=securities,marketdata&securities=${instrumentsPairs.join(',')}&lang=ru&_=1527752178411`);
      if (response.status !== 200) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const data = await response.text();
      if (!data) {
        throw new Error('No response data!');
      } else {
        /* eslint-disable no-eval */
        eval(data);
      }
    },
    parseData(data) {
      const rows = [];
      this.instruments.forEach((item) => {
        const row = {
          name: item.SECID,
          cells: [],
        };
        this.cellNames.forEach((cellName) => {
          let cellLocation = 'securities';
          let cellIndex = data[cellLocation].columns.indexOf(cellName);
          if (cellIndex === -1) {
            cellLocation = 'marketdata';
            cellIndex = data[cellLocation].columns.indexOf(cellName);
          }
          const cell = {
            name: cellName,
            value: data[cellLocation].data[item.SECID][cellIndex] || '–',
          };
          row.cells.push(cell);
        });
        rows.push(row);
      });
      debugger;
      this.rows = rows;
    },
  },
  created() {
    this.requestData();
  },
};
</script>
