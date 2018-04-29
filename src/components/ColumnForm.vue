<template lang="pug">
  #modal1.modal(ref="modal")
    .modal-content
      h4 Add Column
      ul.errors
        li(v-for="message in errors") {{ message }}
      form(v-on:submit.prevent="submit")
        .row
          .input-field.col.s6.validate(required)
            input(placeholder="Enter column title." ref="input" name="column_title" v-model="title")
            label.active(for="column_title") Column title
          .input-field.col.s6
            select(v-model="type" ref="select")
              option(:value="item" v-for="item in types") {{item}}
            label Type
          input-tag(
            v-if="type == 'Select'"
            :tags.sync="options"
            placeholder="Add Options")
          .switch.col.s6
            label
              | Required
              input(type="checkbox" v-model="required")
              span.lever
    .modal-footer
      a.modal-action.modal-close.waves-effect.waves-green.btn-flat(
        href="#!") Cancel
      a.modal-action.modal-close.waves-effect.waves-green.btn-flat(
        href="#!"
        @click.stop="submit") Add
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ColumnForm',
  data() {
    return {
      instance: null,
      type: 'Text',
      title: null,
      options: [],
      required: false,
      errors: [],
      value: [],
      types: ['Text', 'Number', 'Date', 'Select'],
    };
  },
  computed: {
    ...mapGetters(['headerLastIndex']),
  },
  mounted() {
    this.instance = window.M.Modal.init(this.$refs.modal);
    this.selectInstance = window.M.FormSelect.init(this.$refs.select);
    this.$nextTick(() => {
      window.M.updateTextFields();
      this.$refs.input.focus();
    });
  },
  methods: {
    reset() {
      this.title = '';
      this.type = 'Text';
      this.$refs.select.value = 'Text';
      this.selectInstance = window.M.FormSelect.init(this.$refs.select);
      this.options = [];
      this.required = false;
    },
    open() {
      this.reset();
      this.instance.open();
      this.$refs.input.focus();
    },
    close() {
      this.instance.close();
    },
    addTag(newTag) {
      this.options.push({ name: newTag, code: newTag });
      this.value.push({ name: newTag, code: newTag });
    },
    isValid() {
      this.errors = [];
      // validate it and show errors if any
      if (this.title.length === 0) this.errors.push('Title should not be empty');
      if (this.type === 'Select' && this.options.length === 0) this.errors.push('Select should have options');

      return this.errors.length === 0;
    },
    submit() {
      if (this.isValid()) {
        this.$store.commit('addNewColumn', {
          title: this.title,
          type: this.type,
          options: this.options,
          required: this.required,
        });

        if (this.headerLastIndex === 1) this.$store.commit('addRows');

        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  min-height: 350px;
  .vue-input-tag-wrapper {
    margin: 10px;
  }
  .errors {
    color: red;
  }
}
</style>
