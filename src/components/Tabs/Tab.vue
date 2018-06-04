<template>
  <div
    v-show="isActive"
    :aria-hidden="!isActive"
    class="tabs__tab-panel"
    :id="hash"
    role="tabpanel">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    id: { default: null },
    name: { required: true },
  },
  data: () => ({
    isActive: false,
    isVisible: true,
  }),
  computed: {
    hash() {
      return this.id
        ? `#${this.id}`
        : `#${this.name.toLowerCase().replace(/ /g, '-')}`;
    },
  },
};
</script>
