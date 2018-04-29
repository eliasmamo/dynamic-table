<template lang="pug">
  td(@click.stop="onContentClick"
      :class="{edit: editMode, error: error}"
      v-on-clickaway="onClickAway" )
    span.content(v-show="!editMode") {{ cellValue }}
    span.edit(v-show="editMode")
      input(v-if="column.type == 'Text'" ref="inputText" v-model="editValue"
          v-on:keyup.enter="onClickAway" v-on:keyup.esc="onCancel")
      input.datepicker(v-if="column.type == 'Date'" ref="inputDate" v-model="editValue"
          @select="onDateSelect" @on-select="onDateSelect"
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
import { cloneDeep } from 'lodash';
import validator from '../helpers/validator';

export default {
  mixins: [clickaway],
  name: 'Cell',
  props: ['cellValue', 'colIndex', 'type', 'id'],
  data() {
    return {
      selectInstance: null,
      dateInstance: null,
      editValue: '',
      editMode: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters(['getColByIndex', 'header', 'editingCell']),
    column() {
      return cloneDeep(this.getColByIndex(this.colIndex));
    },
  },
  mounted() {
    this.editValue = this.cellValue;
    if (this.column.type === 'Select') {
      this.selectInstance = window.M.FormSelect.init(this.$refs.inputSelect);
    }
    if (this.column.type === 'Date') {
      this.dateInstance = window.M.Datepicker.init(this.$refs.inputDate, {
        format: 'mm/dd/yyyy',
        autoClose: true,
        onClose: this.onDateSelect,
      });
    }

    if (!validator.isValid(this.editValue, this.column)) {
      this.error = true;
    }
  },
  destroyed() {
    if (this.column.type === 'Date') {
      this.dateInstance.destroy();
    }
  },
  watch: {
    cellValue(newVal) {
      this.editValue = newVal;
    },
    editingCell() {
      if (this.editMode && this.editingCell !== this.id) {
        this.onClickAway();
      }
    },
  },
  methods: {
    onDateSelect() {
      const event = document.createEvent('Event');
      event.initEvent('input', true, true);
      this.$refs.inputDate.dispatchEvent(event);
    },
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
      if (!validator.isValid(this.editValue, this.column)) {
        this.error = true;
        this.$store.commit('editCell', { cellId: this.id });
      } else {
        this.error = false;
      }

      this.editMode = false;
      return this.$emit('cell-edited', { column: this.colIndex, value: this.editValue });
    },
    onContentClick() {
      this.editMode = true;
      this.$store.commit('editCell', { cellId: this.id });
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
