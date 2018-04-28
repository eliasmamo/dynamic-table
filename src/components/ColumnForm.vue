<template lang="pug">
  #modal1.modal(ref="modal")
    .modal-content
      h4 Add Column
      form(v-on:submit.prevent="submit")
        .row
          .input-field.col.s6.validate(required)
            input(placeholder="Enter column title." name="column_title" v-model="title")
            label.active(for="column_title") Column title
          .input-field.col.s6
            select(v-model="type" ref="select")
              option(value="" disabled="" selected="") Choose your option
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
import Multiselect from 'vue-multiselect';

export default {
  name: 'ColumnForm',
  components: {
    Multiselect,
  },
  data() {
    return {
      instance: null,
      type: null,
      title: null,
      options: [],
      required: false,
      value: [],
      types: ['Text', 'Number', 'Date', 'Select'],
    };
  },
  mounted() {
    this.instance = window.M.Modal.init(this.$refs.modal);
    this.selectInstance = window.M.FormSelect.init(this.$refs.select);
    this.$nextTick(() => window.M.updateTextFields());
    // window.M.updateTextFields();
  },
  methods: {
    open() {
      this.instance.open();
    },
    close() {
      this.instance.close();
    },
    addTag(newTag) {
      this.options.push({ name: newTag, code: newTag });
      this.value.push({ name: newTag, code: newTag });
    },
    isValid() {
      // validate it and show errors if any
      return true;
    },
    submit() {
      if (this.isValid()) {
        // eslint-disable-next-line
        console.log('submitting');
        this.$store.commit('addNewColumn', {
          title: this.title,
          type: this.type,
          options: this.options,
          required: this.required,
        });

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
}
</style>
