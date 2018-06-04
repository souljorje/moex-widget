<template>
  <tr ref="row" @click="chart ? toggleChart($event) : null" :style="chart ? 'cursor: pointer' : ''">
    <td
      class="table__cell"
      v-for="cell in cells"
      :key="cell.id"
      :title="cell.title">
      <span v-if="cell.is_linked || cell.name === 'SECID'">
        <a :href="`https://www.moex.com${tickerLink}`">{{ cell.value }}</a>
      </span>
      <span
        v-else-if="cell.trend_by && cell.value !== '–' && cells.indexOf(cell) === cells.length - 1"
        :class="{
          'is-dynamic': true,
          'is-dynamic_up': cell.value > 0,
          'is-dynamic_down': cell.value < 0,
        }">
        {{ cell.value > 0 ? '+' : '' }}{{ cell.value }}{{ cell.has_percent ? '%' : '' }}
      </span>
      <span v-else-if="cell.name === 'TRADEDATE'">
        {{ formatDate(new Date(cell.value)) }}
      </span>
      <span v-else-if="cell.type === 'time'">
        {{ formatTime(cell.value) }}
      </span>
      <span v-else>
        {{ cell.value }}{{ cell.has_percent && cell.value !== '–' ? '%' : '' }}
      </span>
    </td>
  </tr>
</template>

<style lang="stylus">
$preloader-size = 40px;

.is-dynamic
  &_up
    color #090
  &_down
    color #c00

.chart-row {
  position: relative;
  img {
    position: relative;
    z-index: 1;
    max-width 100%;
  }
  td {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 'calc(50% - ((%s + 5px) / 2))' % $preloader-size;
      left: 'calc(50% - (%s / 2))' % $preloader-size;
      width: $preloader-size;
      height: $preloader-size;
      border: 2px solid #d5d8e6;
      border-top-color: #87abca;
      border-radius: $preloader-size;
      animation: spin 1s infinite linear;
    }
  }
}
</style>

<script>
export default {
  props: [
    'boardId',
    'rowId',
    'cells',
    'chart',
    'type',
  ],
  data() {
    return {
      // ...this.config,
    };
  },
  methods: {
    formatDate(date) {
      let dd = date.getDate();
      if (!dd) return '–';
      if (dd < 10) {
        dd = `0${dd}`;
      }
      let mm = date.getMonth() + 1;
      if (mm < 10) {
        mm = `0${mm}`;
      }
      let yy = date.getFullYear() % 100;
      if (yy < 10) {
        yy = `0${yy}`;
      }
      return `${dd}.${mm}.${yy}`;
    },
    formatTime(time) {
      return time.split(':').slice(0, 2).join(':');
    },
    /**
     * Generates link for linked element
     */
    generateTickerLink() {
      switch (this.type) {
        case 'index':
          this.tickerLink = `/ru/index/${this.rowId}`;
          break;
        case 'bonds':
        case 'shares':
          this.tickerLink = `/ru/issue.aspx?board=${this.boardId}&code=${this.rowId}`;
          break;
        case 'futures':
          this.tickerLink = `/ru/contract.aspx?code=${this.rowId}`;
          break;
        default:
          this.tickerLink = `/ru/issue/${this.rowId}/${this.boardId}`;
          break;
      }
    },
    toggleChart() {
      if (this.chartShown) {
        this.chartElement.remove();
        this.chartShown = false;
      } else {
        this.chartShown = true;
        this.renderChart()
          .then(() => {
            this.$emit('rowShown', {
              vm: this,
            });
          });
      }
    },
    /**
     * Adds chart after row
     */
    async renderChart() {
      const parentRow = this.$refs.row;
      const tableWidth = this.$parent.$el.getBoundingClientRect().width || 336;
      const chartRow = document.createElement('tr');
      chartRow.classList.add('chart-row');
      chartRow.style.height = `${tableWidth / 2}px`;
      chartRow.innerHTML = `
        <td colspan='${this.cells.length}'>
          <img src='${this.generateChartUrl(tableWidth)}'>
        </td>
      `;
      parentRow.after(chartRow);
      this.chartElement = chartRow;
    },
    /**
     * Generates URL for chart image.
     */
    generateChartUrl(width) {
      const imgHeight = width / 2;
      const defaultHeaders =
        `.png?c.width=${width}&z1.width=${width}&z1_c.width=${width}&c.height=${imgHeight}&z1.height=${imgHeight}&z1_c.height=${imgHeight}&template=adv_no_volume&_=1527833411788&compare=&compare_template=adv_no_volume_comp&candles=72&interval=10`;
      let path;
      const defaultPath = this.$store.state[this.type].URLs.defaultPath;
      switch (this.type) {
        case 'futures':
          path = 'boardgroups/45/';
          break;
        case 'index':
          path = 'boardgroups/9/';
          break;
        case 'bonds':
          path = 'boardgroups/58/';
          break;
        case 'shares':
          path = 'boardgroups/57/';
          break;
        case 'currency':
          path = 'boardgroups/13/';
          break;
        default:
          throw new Error('Type of table is not defined');
      }
      return `https://iss.moex.com/cs/engines/${defaultPath}${path}securities/${this.rowId}${defaultHeaders}`;
    },
  },
  created() {
    this.generateTickerLink();
  },
  updated() {
    if (this.chartShown) {
      this.chartElement.remove();
      this.renderChart();
    }
  },
};
</script>
