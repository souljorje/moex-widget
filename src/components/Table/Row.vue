<template>
  <tr @click="chart ? toggleChart($event) : null" :style="chart ? 'cursor: pointer' : ''">
    <td v-for="cell in cells" :key="cell.id">
      <span>{{ cell.value }}</span>
      <span>{{ cell.value }}</span>
    </td>
  </tr>
  <!-- <tr v-else>
    <td v-for="cell in cells" :key="cell.id">{{ cell.value }}</td>
  </tr> -->
</template>

<style lang="stylus">
$preloader-size = 40px;

.chart-row {
  height: 168px;
  position: relative;

  img {
    position: relative;
    z-index: 1;
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
  props: {
    config: Object,
  },
  data() {
    return {
      ...this.config,
    };
  },
  methods: {
    generateTickerLink() {
      // return "|" + engine + "|" + market + "|" + board + "|" + security;
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
    toggleChart(event) {
      debugger;
      const targetRow = event.currentTarget;
      if (targetRow.chartShown) {
        targetRow.chartShown = false;
        this.chartElement.remove();
      } else {
        this.renderChart(event).then(() => {
          targetRow.chartShown = true;
          this.$emit('rowShown', {
            targetRow,
            rowChart: this.chartElement,
          });
        });
      }
      // if (this.chartRendered) {
      //   const targetRow = event.currentTarget;
      //   if (targetRow.chartShown) {
      //     /* eslint-disable no-param-reassign */
      //     targetRow.chartShown = false;
      //     this.chartElement.style.display = 'none';
      //   } else {
      //     /* eslint-disable no-param-reassign */
      //     targetRow.chartShown = true;
      //     this.$emit('rowShown', {
      //       targetRow,
      //       rowChart: this.chartElement,
      //     });
      //     this.chartElement.style.removeProperty('display');
      //   }
      // } else {
      //   this.renderChart(event);
      // }
    },
    async renderChart(event) {
      const chartRow = document.createElement('tr');
      chartRow.classList.add('chart-row');
      chartRow.innerHTML = `
        <td colspan='${this.cells.length}'>
          <img src='${this.chartSrc}'>
        </td>
      `;
      event.currentTarget.after(chartRow);
      this.chartElement = chartRow;
      // this.chartRendered = true;
      // this.toggleChart(event);
    },
    generateChartUrl() {
      const defaultHeaders =
        '.png?c.width=336&z1.width=336&z1_c.width=336&c.height=168&z1.height=168&z1_c.height=168&template=adv_no_volume&_=1527833411788&compare=&compare_template=adv_no_volume_comp&candles=72&interval=10';
      let path;
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

      this.chartSrc = `https://iss.moex.com/cs/engines/${
        this.defaultPath
      }${path}securities/${this.rowId}${defaultHeaders}`;
    },
  },
  created() {
    this.generateTickerLink();
    if (this.chart) {
      this.generateChartUrl();
    }
  },
};
</script>
