import Vue from 'vue';
import Vuex from 'vuex';
import { keys, isObject, cloneDeep, map, reduce, times } from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberOfRowsToAdd: 10,
    table: {
      headerLastIndex: 1,
      rowsLastIndex: 1,
      header: {
        1: {
          title: 'column1',
          type: 'Text',
          required: false,
        },
      },
      rows: {
        1: {
          1: {
            value: 'val1',
          },
        },
      },
    },
  },

  getters: {
    getTable: state => state.table,
    rowLastIndex: state => state.table.rowsLastIndex,
    rows: state => state.table.rows,
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
    addNewColumn(state, { title, type, required, options }) {
      debugger;
      let newHeader = { title, type, required };
      if (type === 'Select') {
        newHeader = { ...newHeader, options };
      }
      state.table.headerLastIndex += 1;
      const header = { ...state.table.header, [state.table.headerLastIndex]: newHeader };

      state.table.rowsLastIndex += 1;
      debugger;
      const rows = map(state.table.rows, item => ({
        ...item,
        [state.table.headerLastIndex]: { value: null },
      }));

      state.table = { ...state.table, header, rows };
    },
    addSingleRow() {

    },
    addRows(state) {
      debugger;
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
  },
});
