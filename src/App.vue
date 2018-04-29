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
          a.waves-effect.waves-light.btn(@click.stop="onSaveClick")
            i.material-icons.left save
            | Save
          a.waves-effect.waves-light.btn(@click.stop="onDeleteClick")
            i.material-icons.left delete
            | Delete
          column-form(ref="form")
      .row
        .col.s12
          dynamic-table
      appPreloader
</template>

<script>
import dynamicTable from './components/DynamicTable';
import ColumnForm from './components/ColumnForm';
import appPreloader from './components/Preloader';

export default {
  name: 'App',
  components: {
    dynamicTable,
    ColumnForm,
    appPreloader,
  },
  mounted() {
    this.$store.dispatch('fetch');
  },
  methods: {
    onAddColumnClick() {
      this.$refs.form.open();
    },
    onAddRowsClick() {
      this.$store.commit('addRows');
    },
    onSaveClick() {
      this.$store.dispatch('save');
    },
    onDeleteClick() {
      this.$store.dispatch('delete');
    },
  },
};
</script>

<style lang="scss">
#app {
  margin-top: 60px;
  table {
    td, th {
      max-width: 50px;
      word-wrap: break-word;
    }
  }
}
</style>
