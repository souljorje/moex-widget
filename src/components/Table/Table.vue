<template>
  <table class="table">
    <tbody class="table__body">
      <tableRow
        v-for="(row, index) in rows"
        :key="row.id"
        :class="['table__row', {'table__row_even': index % 2 !== 0}]"
        @rowShown="checkRow($event)"
        :boardId="row.boardId"
        :rowId="row.id"
        :cells="row.cells"
        :chart="chart"
        :type="type"
        />
    </tbody>
  </table>
</template>

<style lang="stylus">
.table
  width 100%
  min-width 290px
  @media (min-width: 768px) {
    max-width 340px
  }
  &__row
    background-color #f7f7f7
    &_even
      background-color #e9eaed
  &__cell
    text-align right
    font-size 13px
    padding 2px
    &:first-child
      text-align left
</style>

<script>
import tableRow from './Row';
import requestData from '../../mixins/requestData';

export default {
  mixins: [requestData],
  components: {
    tableRow,
  },
  props: {
    config: Object,
  },
  data() {
    return {
      chart: false,
      ...this.config,
      rows: [
        {
          id: '',
          cells: null,
        },
      ],
    };
  },
  methods: {
    async generateURL() {
      const instrumentsPairs = this.instruments.map(
        item => `${item.BOARDID}:${item.SECID}`,
      );
      const globalSecuritiesURL = this.$store.state[this.type].URLs.securitiesURL;
      this.securitiesURL = globalSecuritiesURL + instrumentsPairs;
      // this.defaultPath = this.$store.state[this.type].URLs.defaultPath;
      return true;
    },
    /**
     * Parses securities data and generates rows of table.
     * @param {object} data - Data of security
     */
    parseSecurities(data) {
      const rows = [];
      const filters = this.$store.state[this.type].filters;
      const columns = this.$store.state[this.type].columns;
      data.securities.data.forEach((item) => {
        const rowIndex = data.securities.data.indexOf(item);
        /* Row contains it's ID, board ID and cells */
        const row = {
          boardId: item[1],
          id: item[0],
          cells: [],
        };
        /**
        * First I thought that is should just pass columns names
        * as property of config, but then I realized what is
        * filters request for and decided that I should
        * use only "widget" columns which I recieved from filters
        * endpoint, but then I realized that it was a mistake,
        * so I returned to first solution. If you uncomment commented
        * lines, and comment first three it will work as I thought fisrt.
        */
        // this.filters.forEach((filterId) => {
        //   const columnData = this.columns[filterId];
        this.cellNames.forEach((cellName) => {
          const filterId = filters.find(filter => columns[filter].name === cellName);
          const columnData = columns[filterId];
          // const cellName = columnData.name;
          /* First look for needed cell in securities */
          let cellLocation = 'securities';
          let cellIndex = data[cellLocation].columns.indexOf(cellName);
          /* If no, look in marketdata */
          if (cellIndex === -1) {
            cellLocation = 'marketdata';
            cellIndex = data[cellLocation].columns.indexOf(cellName);
          }
          /*
           * Cell contains data of column, it's value and name.
           */
          const cell = {
            ...columnData,
            name: cellName,
            value: data[cellLocation].data[rowIndex][cellIndex] || '–',
          };
          row.cells.push(cell);
        });
        rows.push(row);
      });
      this.rows = rows;
    },
    /**
     * Closes open chart when we click on another row.
     * Better to take a look at Row component to understand.
     */
    checkRow(event) {
      // Clicked row
      const targetRow = event.vm;
      // If clicked row is not row with shown chat
      if (this.shownRow && this.shownRow.rowId !== targetRow.rowId) {
        // and chart is shown – close it's chart
        if (this.shownRow.chartShown) {
          this.shownRow.toggleChart();
        }
      }
      this.shownRow = event.vm;
    },
  },
  /**
   * Honestly the most complicated thing to understand
   * for me is a proper way of asynchronous mounting
   * of child components after getting data in parent.
   * I didn't find any good solution, and would like to
   * ask how to do it better?
   * This setTimeout is just a dummy way.
   */
  created() {
    setTimeout(() => {
      this.generateURL()
        .then(() =>
          this.requestData(this.securitiesURL),
        )
        .then((data) => {
          this.parseSecurities(data);
        });
    }, 2000);
    setInterval(() => {
      this.requestData(this.securitiesURL)
        .then((data) => {
          this.parseSecurities(data);
        });
    }, this.interval);
  },
};
</script>
