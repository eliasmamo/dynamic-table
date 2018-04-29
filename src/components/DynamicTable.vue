<template lang="pug">
  .table
    .no-content(v-if="rowsCount == 0")
      .row
        .col.s12
          .card-panel.teal.lighten-5 No Data To Display
    table(v-if="columnsCount > 0")
      thead
        tr
          th(width="50px") #
          header-cell(v-for="(column, index) in header"
            :key="index"
            :id="0 + '_' + index"
            :colIndex="index")
          //- th(v-for="(column, index) in header") {{ column.title }}
      tbody
        row(v-for="row, index in rows" :index="index" :key="index")
</template>
<script>
import { mapGetters } from 'vuex';
import headerCell from './HeaderCell';
import row from './Row';

export default {
  name: 'DynamicTable',
  components: {
    row,
    headerCell,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['header', 'rows', 'rowsCount', 'columnsCount']),
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>


</style>
