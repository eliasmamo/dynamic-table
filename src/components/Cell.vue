<template lang="pug">
  td(@click.stop="onContentClick"
      :class="{edit: editMode, error: error}"
      v-on-clickaway="onClickAway" )
    span.content(v-show="!editMode") {{ cellValue }}
    span.edit(v-show="editMode")
      input(v-if="column.type == 'Text'" ref="inputText" v-model="editValue"
          v-on:keyup.enter="onClickAway" v-on:keyup.esc="onCancel")
      input(v-if="column.type == 'Number'" type="number" ref="inputNumber" v-model="editValue"
          v-on:keyup.enter="onClickAway" v-on:keyup.esc="onCancel")
      select(v-if="column.type == 'Select'" ref="inputSelect" v-model="editValue"
          v-on:keyup.enter="onClickAway" v-on:keyup.esc="onCancel")
        option(v-for="option in column.options" :value="option") {{ option }}
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import { mapGetters } from 'vuex';
import validator from '../helpers/validator';

export default {
  mixins: [clickaway],
  name: 'Cell',
  props: ['cellValue', 'colIndex', 'type', 'id'],
  data() {
    return {
      editValue: '',
      editMode: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters(['getColByIndex', 'header']),
    column() {
      return this.getColByIndex(this.colIndex);
    },
  },
  mounted() {
    this.editValue = this.cellValue;
    if (this.column.type === 'Select') {
      this.selectInstance = window.M.FormSelect.init(this.$refs.inputSelect);
    }

    if (!validator.isValid(this.editValue, this.column)) {
      this.error = true;
    }
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
    onCancel() {
      this.editValue = this.cellValue;
      this.editMode = false;
    },
    submit() {
      if (validator.isValid(this.editValue, this.column)) {
        this.editMode = false;
        this.error = false;
        return this.$emit('cell-edited', { column: this.colIndex, value: this.editValue });
      }

      this.error = true;
      return false;
    },
    onContentClick() {
      this.editMode = true;
      this.$nextTick(() => {
        if (this.column.type === 'Select') {
          const event = document.createEvent('Event');
          event.initEvent('input', true, true);
          this.$refs.inputSelect.dispatchEvent(event);
          this.$refs.inputSelect.dispatchEvent(event);
        }
        this.$refs[`input${this.column.type}`].focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
td {
  &:hover {
    background: #eee;
  }
  &.edit {
    border: 1px solid black;
  }
  &.error {
    background: #fff3f3;
  }
  &.edit.error {
    border: 1px solid red;
  }
  cursor: pointer;
  span {
    input {
      width: inherit;
    }
  }
}
</style>
