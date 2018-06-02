<template>
  <table>
    <thead>
      <tr>
        <th>
          {{ name || text }}
          <button @click="suffleRows">
            Shuffle
          </button>
        </th>
      </tr>
    </thead>
    <tbody is="transition-group" name="slide">
      <!-- <transition-group tag="tbody" > -->
        <tableRow
          v-for="row in rows"
          :key="row.id"
          @rowShown="checkRow($event)"
          :config="{
            boardId: row.boardId,
            rowId: row.id,
            cells: row.cells,
            defaultPath: defaultPath,
            chart,
            type,
          }"
        />
      <!-- </transition-group> -->
    </tbody>
  </table>
</template>

<style lang="stylus">

td
  text-align right
  font-size 13px
  padding 2px
  &:first-child
    text-align left

.table-row-move
  transition all .5s

$translate = 20px
$duration = 0.5s
.slide
  &-enter
    opacity 0
    transform translateY($translate)
  &-enter-active
    animation slide-in $duration ease forwards
    transition $duration ease opacity
  &-leave-active
    animation slide-out $duration ease forwards
    transition $duration ease opacity
    opacity 0
    position absolut
    &.card-column
      width 50%
  &-move
    transition transform 0.3s
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
    suffleRows() {
      const shuffleArray = arr => arr
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
      this.rows = shuffleArray(this.rows);
    },
    async generateUrl() {
      const instrumentsPairs = this.instruments.map(item => `${item.BOARDID}:${item.SECID}`);
      const defaultHeaders = 'iss.meta=off&lang=ru&';
      const headers = {
        filters: 'securities/columns/filters.jsonp?callback=this.parseFilters&iss.only=filters&',
        columns: 'securities/columns.jsonp?callback=this.parseColumns&iss.only=securities,marketdata&',
        securities: 'securities.jsonp?callback=this.parseData&iss.meta=off&iss.only=securities,marketdata&',
      };
      let customHeaders;
      let path;
      /**
       * Of course I understand that pathes should be more flexible,
       * but my task is quite narrow, so I decided not to try to
       * foresee everything.
       */
      switch (this.type) {
        case 'futures':
          path = 'futures/markets/forts/';
          customHeaders = 'previous_session=0&nearest=1&sectypes=';
          break;
        case 'index':
          path = 'stock/markets/index/';
          customHeaders = 'securities=';
          break;
        case 'bonds':
          path = 'stock/markets/bonds/';
          customHeaders = 'securities=';
          break;
        case 'shares':
          path = 'stock/markets/shares/';
          customHeaders = 'securities=';
          break;
        case 'currency':
          path = 'currency/markets/selt/';
          customHeaders = 'securities=';
          break;
        default:
          throw new Error('Type of table is not defined');
      }
      this.defaultPath = path;
      Object.keys(headers).forEach((type) => {
        let url = `${path}${headers[type]}${defaultHeaders}}`;
        if (type === 'securities') {
          url += `${customHeaders}${instrumentsPairs.join(',')}`;
        }
        this[`${type}URL`] = url;
      });
    },
    async requestData() {
      const response = await this.$http.get(this.securitiesURL);
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
      data.securities.data.forEach((item) => {
        const rowIndex = data.securities.data.indexOf(item);
        const row = {
          boardId: item[1],
          id: item[0],
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
            value: data[cellLocation].data[rowIndex][cellIndex] || '–',
          };
          row.cells.push(cell);
        });
        rows.push(row);
      });
      this.rows = rows;
    },
    checkRow(event) {
      debugger;
      const targetRow = event.targetRow;
      if (this.shownRow !== targetRow) {
        if (this.shownChart) {
          this.shownChart.remove();
          this.shownRow.chartShown = false;
        }
        this.shownRow = event.targetRow;
      }
      this.shownChart = event.rowChart;
      // if (this.shownRow !== targetRow) {
      //   if (this.shownChart) {
      //     this.shownChart.style.display = 'none';
      //   }
      //   targetRow.chartShown = false;
      //   this.shownRow = event.targetRow;
      //   this.shownChart = event.rowChart;
      // }
    },
  },
  created() {
    this.generateUrl()
      .then(() => {
        this.requestData();
      }, (error) => {
        throw new Error(error);
      })
      .catch((error) => {
        throw new Error(error);
      });
    // setInterval(() => {
    //   this.requestData();
    // }, this.interval);
  },
};
</script>
