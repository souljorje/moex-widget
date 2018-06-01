<template>
  <tr v-if="chart" @click="toggleChart" style="cursor: pointer">
    <td v-for="cell in cells" :key="cell.id">{{ cell.value }}</td>
  </tr>
  <tr v-else>
    <td v-for="cell in cells" :key="cell.id">{{ cell.value }}</td>
  </tr>
</template>

<style lang="stylus">

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
    toggleChart(event) {
      if (this.chartRendered) {
        const targetRow = event.currentTarget;
        if (targetRow.chartShown) {
          /* eslint-disable no-param-reassign */
          targetRow.chartShown = false;
          this.chartElement.style.display = 'none';
        } else {
          /* eslint-disable no-param-reassign */
          targetRow.chartShown = true;
          this.$emit('rowShown', {
            targetRow,
            rowChart: this.chartElement,
          });
          this.chartElement.style.removeProperty('display');
        }
      } else {
        this.renderChart(event);
      }
    },
    renderChart(event) {
      const chartRow = document.createElement('tr');
      chartRow.innerHTML = `
        <td>
          <img src="${this.chartSrc}">
        </td>
      `;
      event.currentTarget.after(chartRow);
      this.chartElement = chartRow;
      this.chartRendered = true;
      this.toggleChart(event);
    },
    generateChartUrl() {
      const defaultHeaders = '.png?c.width=336&z1.width=336&z1_c.width=336&c.height=168&z1.height=168&z1_c.height=168&template=adv_no_volume&_=1527833411788&compare=&compare_template=adv_no_volume_comp&candles=72&interval=10';
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

      this.chartSrc = `https://iss.moex.com/cs/engines/${this.defaultPath}${path}securities/${this.rowId}${defaultHeaders}`;
    },
  },
  created() {
    if (this.chart) {
      this.generateChartUrl();
    }
  },
};
</script>
