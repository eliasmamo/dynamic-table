<template lang="pug">
  th(@click.stop="onContentClick"
      :class="{edit: editMode, error: error}"
      v-on-clickaway="onClickAway" )
    span.content(v-show="!editMode") {{ header.title }}
    span.edit(v-show="editMode")
      input(ref="input" v-model="editValue"
          v-on:keyup.enter="onClickAway" v-on:keyup.esc="onCancel")
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import { mapGetters } from 'vuex';

export default {
  mixins: [clickaway],
  name: 'HeaderCell',
  props: ['colIndex', 'id'],
  data() {
    return {
      editValue: '',
      error: false,
    };
  },
  mounted() {
    this.editValue = this.header.title;
  },
  computed: {
    ...mapGetters(['getColByIndex', 'editingCell']),
    header() {
      return this.getColByIndex(this.colIndex);
    },
    editMode() {
      return this.editingCell === this.id;
    },
  },
  watch: {
    editingCell(newVal, oldVal) {
      if (oldVal === this.id && newVal !== this.id) {
        this.submit();
      }
    },
  },
  methods: {
    onClickAway() {
      if (this.editMode) {
        this.submit();
      }
    },
    onCancel() {
      this.editValue = this.header.title;
      this.$store.commit('editCell', { cellId: null });
    },
    submit() {
      if (this.editValue.length === 0) {
        this.error = true;
      } else {
        this.error = false;
      }

      this.$store.commit('editCell', { cellId: null });
      return this.$store.commit('updateHeaderCell', { colIndex: this.colIndex, title: this.editValue });
    },
    onContentClick() {
      this.$store.commit('editCell', { cellId: this.id });
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
th {
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
