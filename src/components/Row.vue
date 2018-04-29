<template lang="pug">
  tr
    td {{ index }}
    cell(v-for="(options, colIndex) in header"
        :type="options.type"
        :colIndex="colIndex"
        :key="'row'+ index + '_' + colIndex"
        :id="'row'+ index + '_' + colIndex"
        :cell-value="getRowByIndex(index)[colIndex].value"
        @cell-edited="onCellEdited")
</template>

<script>
import { mapGetters } from 'vuex';
import Cell from './Cell';

export default {
  name: 'Row',
  props: ['index'],
  components: {
    Cell,
  },
  computed: {
    ...mapGetters(['getRowByIndex', 'header']),
  },
  methods: {
    onCellEdited({ column, value }) {
      // eslint-disable-next-line
      console.log('on-cell-edited');
      this.$store.commit('updateRow', { row: this.index, column, value });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

