<template lang="pug">
  td(@click.stop="onContentClick")
    .content(v-if="!editMode") {{ cellValue }}
    .edit(v-show="editMode"  v-on-clickaway="onClickAway")
      input(ref="input" v-model="editValue" v-on:keyup.enter="onClickAway")
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [clickaway],
  name: 'Cell',
  props: ['cellValue', 'column', 'type'],
  data() {
    return {
      editValue: '',
      editMode: false,
    };
  },
  mounted() {
    this.editValue = this.cellValue;
  },
  watch: {
    cellValue(newVal) {
      // eslint-disable-next-line
      console.log('cell value changes to', newVal);
      this.editValue = newVal;
    },
  },
  methods: {
    onClickAway() {
      if (this.editMode) {
        this.submit();
      }
    },
    submit() {
      this.editMode = false;
      this.$emit('cell-edited', { column: this.column, value: this.editValue });
    },
    onContentClick() {
      this.editMode = true;
      setTimeout(() => this.$refs.input.focus(), 0);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
