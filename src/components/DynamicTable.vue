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
          th(v-for="(column, index) in header") {{ column.title }}
      tbody
        row(v-for="row, index in rows" :index="index" :key="index")
</template>
<script>
import { mapGetters } from 'vuex';
import row from './Row';

export default {
  name: 'DynamicTable',
  components: {
    row,
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
