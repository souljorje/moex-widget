<template>
  <carousel :perPageCustom="[[0, 1], [768, 2]]">
    <slide
      v-for="widget in widgets.items"
      :key="widget.name"
      class="widget-slide">
      <span>{{ widget.title }}</span>
      <appTabs>
        <appTab
          v-for="(tableConfig, index) in widget.tables"
          :key="widget.name + index"
          :id="widget.name + index"
          :name="tableConfig.name">
          <widgetTable
            :key="widget.name + 'table' + index"
            :config="tableConfig"
            :style="{'min-height': tableConfig.instruments.length * 19 + 'px'}"/>
        </appTab>
      </appTabs>
    </slide>
  </carousel>
</template>

<style lang="stylus">
.widget-slide
  @media (max-width 768px)
    display flex
    justify-content center
    max-width 100%
</style>

<script>
import appTabs from '../Tabs/Tabs';
import appTab from '../Tabs/Tab';
import widgetTable from '../Table/Table';
import widgets from './Widgets/Widgets';
import requestData from '../../mixins/requestData';

export default {
  mixins: [requestData],
  /**
   * Widgets is an object with configs
   * for each instance of widget.
   */
  data() {
    return {
      widgets,
    };
  },
  methods: {
    /**
     * Generates URLs for requests depending on type of data.
     * @param {string} type - Type of data.
     */
    async generateURLs(type) {
      this.$store.state[type].URLs = {};
      const defaultHeaders = 'iss.meta=off&lang=ru&';
      const headers = {
        filters:
          'securities/columns/filters.jsonp?callback=getData&iss.only=filters&',
        columns:
          'securities/columns.jsonp?callback=getData&iss.only=securities,marketdata&',
        securities:
          'securities.jsonp?callback=getData&iss.only=securities,marketdata&',
      };
      let customHeaders;
      let path;
      /**
       * Of course I understand that pathes should be more flexible,
       * but my task is quite narrow, so I decided not to try to
       * foresee everything.
       */
      switch (type) {
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
      this.$store.state[type].URLs.defaultPath = path;
      Object.keys(headers).forEach((header) => {
        let url = `${path}${headers[header]}${defaultHeaders}`;
        if (header === 'securities') {
          url += `${customHeaders}`;
        }
        this.$store.state[type].URLs[`${header}URL`] = url;
      });
      return true;
    },
    /**
     * Parses filters
     * @param {object} data - Received filters data.
     * @param {string} type - Type of data.
     */
    async parseFilters(data, type) {
      const idIndex = data.filters.columns.indexOf('id');
      const filters = data.filters.data.map(filter => filter[idIndex]);
      this.$store.state[type].filters = filters;
    },
    /**
     * Parses columns
     * @param {object} data - Received columns data.
     * @param {string} type - Type of data.
     */
    async parseColumns(data, type) {
      const filters = this.$store.state[type].filters;
      /**
       * Creating columns object.
       * @returns {object} { filterId: null, ... }
       */
      const columns = filters.reduce((acc, item) => {
        acc[item] = null;
        return acc;
      }, {});
      const columnsNames = data.securities.columns;
      /**
       * Creates column object
       * @param {object} columnData - Data of column
       * @param {number} columnId - ID of column
       * columns = {
       *  columnId: {
       *    columnProperty: columnValue,
       *    ...
       *  }
       * }
       */
      const generateColumn = (columnData, columnId) => {
        const column = columnsNames.reduce((acc, item, index) => {
          acc[item] = columnData[index];
          return acc;
        }, {});
        columns[columnId] = column;
      };
      const fullData = [...data.securities.data, ...data.marketdata.data];
      /**
       * Iterates through all recieved columns and stores needed.
       */
      fullData.forEach((column) => {
        const columnId = column[0];
        if (columns[columnId] === null) {
          generateColumn(column, columnId);
        }
      });
      this.$store.state[type].columns = columns;
    },
    /**
     * Makes requests for filters and columns
     * of each type of data
     * @param {string} type - Type of data.
     */
    async init(type) {
      this.$store.state[type] = {};
      await this.generateURLs(type);
      const filtersURL = this.$store.state[type].URLs.filtersURL;
      const filtersData = await this.requestData(filtersURL);
      await this.parseFilters(filtersData, type);
      const columnsURL = this.$store.state[type].URLs.columnsURL;
      const columnsData = await this.requestData(columnsURL);
      const columnsParsed = await this.parseColumns(columnsData, type);
      return columnsParsed;
    },
  },
  components: {
    widgetTable,
    appTabs,
    appTab,
  },
  created() {
    widgets.types.forEach((type) => {
      this.init(type);
    });
  },
};
</script>
