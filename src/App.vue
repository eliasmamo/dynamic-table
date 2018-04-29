<template lang="pug">
  #app
    .container
      .row
        .col.s12
          a.waves-effect.waves-light.btn(@click.stop="onAddColumnClick")
            i.material-icons.left add
            | Add Column
          a.waves-effect.waves-light.btn(@click.stop="onAddRowsClick")
            i.material-icons.left add
            | Add 10 Rows
          column-form(ref="form")
      .row
        .col.s12
          dynamic-table

</template>

<script>
import dynamicTable from './components/DynamicTable';
import ColumnForm from './components/ColumnForm';

export default {
  name: 'App',
  components: {
    dynamicTable,
    ColumnForm,
  },
  methods: {
    onAddColumnClick() {
      this.$refs.form.open();
    },
    onAddRowsClick() {
      this.$store.commit('addRows');
    },
  },
};
</script>

<style lang="scss">
#app {
  margin-top: 60px;
}
</style>
