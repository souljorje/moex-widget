<template>
  <tr>
    <td v-for="cell in cells" :key="cell.name">{{ cell.value }}</td>
  </tr>
</template>

<style lang="stylus">

</style>

<script>
export default {
  props: {
    cells: Array,
  },
};
</script>
