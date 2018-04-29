import Vue from 'vue';
import Vuex from 'vuex';
import { keys, isObject, cloneDeep, reduce, times } from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberOfRowsToAdd: 10,
    loading: false,
    editingCell: '',
    table: {
      headerLastIndex: 0,
      rowsLastIndex: 0,
      header: {},
      rows: {},
    },
  },

  getters: {
    getTable: state => state.table,
    editingCell: state => state.editingCell,
    rowLastIndex: state => state.table.rowsLastIndex,
    headerLastIndex: state => state.table.headerLastIndex,
    rows: state => state.table.rows,
    loading: state => state.loading,
    header: state => state.table.header,
    rowsCount: state => keys(state.table.rows).length,
    columnsCount: state => keys(state.table.header).length,
    getRowByIndex(state) {
      // eslint-disable-next-line
      return (index) => {
        return state.table.rows && isObject(state.table.rows) ? state.table.rows[index] : null;
      };
    },
    getColByIndex(state) {
      // eslint-disable-next-line
      return (index) => {
        const headerNotEmpty = state.table.header && isObject(state.table.header);
        return headerNotEmpty ? state.table.header[index] : null;
      };
    },
  },

  mutations: {
    updateRow(state, { row, column, value }) {
      const result = cloneDeep(state.table.rows[row]);
      result[column].value = value;
      state.table.rows = {
        ...state.table.rows,
        [row]: result,
      };
    },
    updateHeaderCell(state, { colIndex, title }) {
      const cell = cloneDeep(state.table.header[colIndex]);
      cell.title = title;
      state.table.header = {
        ...state.table.header,
        [colIndex]: cell,
      };
    },
    addNewColumn(state, { title, type, required, options }) {
      let newHeader = { title, type, required };
      if (type === 'Select') {
        newHeader = { ...newHeader, options };
      }
      state.table.headerLastIndex += 1;
      const header = { ...state.table.header, [state.table.headerLastIndex]: newHeader };

      const rows = reduce(state.table.rows, (acc, item, key) => {
        acc[key] = {
          ...item,
          [state.table.headerLastIndex]: { value: null },
        };
        return acc;
      }, {});

      state.table = { ...state.table, header, rows };
    },
    addRows(state) {
      if (state.table.headerLastIndex === 0) return;
      const emptyRow = reduce(state.table.header, (acc, col, key) => {
        acc[key] = { value: null };
        return acc;
      }, {});

      let rows = times(10, () => cloneDeep(emptyRow));

      rows = reduce(rows, (acc, row) => {
        state.table.rowsLastIndex += 1;
        acc[state.table.rowsLastIndex] = row;
        return acc;
      }, {});

      state.table.rows = {
        ...state.table.rows,
        ...rows,
      };
    },
    editCell(state, { cellId }) {
      state.editingCell = cellId;
    },
    setTable(state, table) {
      state.table = table;
    },
  },
  actions: {
    save({ state }) {
      state.loading = true;
      setTimeout(() => {
        state.loading = false;
        localStorage.setItem('table', JSON.stringify(this.state.table));
      }, 200);
    },
    delete({ state }) {
      state.loading = true;
      setTimeout(() => {
        state.loading = false;
        localStorage.removeItem('table');
        state.table = {
          headerLastIndex: 0,
          rowsLastIndex: 0,
          header: {},
          rows: {},
        };
      }, 200);
    },
    fetch({ commit, state }) {
      state.loading = true;
      setTimeout(() => {
        state.loading = false;
        let table = localStorage.getItem('table');
        if (table && table.length > 0) {
          table = JSON.parse(table);
          commit('setTable', table);
        }
      }, 200);
    },
  },
});
