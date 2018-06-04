export default {
  methods: {
    async requestData(url) {
      /* eslint-disable no-unused-vars */
      const getData = data => data;
      const response = await this.$http.get(url);
      if (response.status !== 200) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const data = await response.text();
      if (!data) {
        throw new Error('No response data!');
      } else {
        /* eslint-disable no-eval */
        return eval(data);
      }
    },
  },
};
