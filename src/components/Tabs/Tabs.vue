<template>
  <div class="tabs">
    <menu role="tablist" class="tabs__links">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="tabs__link-wrapper"
        role="presentation" v-show="tab.isVisible">
        <a
          v-html="tab.name"
          :aria-controls="tab.hash"
          :aria-selected="tab.isActive"
          @click.prevent="selectTab(tab.hash)"
          :href="tab.hash"
          :class="['tabs__link', { 'is-active': tab.isActive }]"
          role="tab">
        </a>
      </li>
    </menu>
    <div class="tabs__panels">
      <slot/>
    </div>
  </div>
</template>

<style lang="stylus">
.tabs
  width 100%
  &__links
    display flex
    flex-wrap wrap
    list-style none
    margin 3px 0
  &__link
    color #0275d8
    border 1px solid transparent
    border-top-right-radius 4px
    border-top-left-radius 4px
    padding 4px 12px
    font-size 13px
    transition .3s ease border-color, .3s ease color
    &.is-active
      color #000
      border-color #ddd #ddd #fff
  &__tab-panel
    animation fade-in .3s ease
</style>


<script>
export default {
  props: {
    options: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    tabs: [],
    activeTabHash: '',
  }),
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    if (this.tabs.length) {
      this.selectTab(this.tabs[0].hash);
    }
  },
  methods: {
    findTab(hash) {
      return this.tabs.find(tab => tab.hash === hash);
    },
    selectTab(selectedTabHash) {
      const selectedTab = this.findTab(selectedTabHash);
      if (!selectedTab) {
        return;
      }
      this.tabs.forEach((tab) => {
        tab.isActive = tab.hash === selectedTab.hash;
      });
      this.activeTabHash = selectedTab.hash;
    },
  },
};
</script>
