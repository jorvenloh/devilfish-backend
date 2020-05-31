<style lang="scss" scoped>
@import "../../sass/_variables.scss";

.datatable__clickable {
  cursor: pointer;
}

.datatable__select {
  line-height: 40px;
}

.datatable__select__actions {
  float: right;
}

.datatable__select__actions__range {
  align-items: center;
  display: flex;
}

.datatable__select__actions__range__pagination {
  min-height: 40px;
  margin: 0 10px;
  text-align: center;
}

.datatable__btn {
  background-color: transparent;
  color: $blue;
  margin: 0.25rem;
  outline: 0;
  padding: 0;
  text-align: center;
  height: 30px;
  width: 30px;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;
}

.datatable__dir_btn {
  font-size: 11px;
  line-height: 1rem;
}

.datatable__number_btn:hover,
.datatable__number_btn:focus,
.datatable__select__actions .active {
  border-bottom: 2px solid $blue;
  border-radius: 0px;
  font-weight: 700;
  color: $blue;
}

.datatable__btn:hover:enabled {
  font-weight: 700;
}

.datatable__dir_btn:hover:enabled {
  transform: scale(1.3);
  color: $blue;
}

.datatable__expandable__column {
  width: 2px;
}

.pagination_dotted {
  color: $blue;
}

.pagination_dotted + .pagination_dotted {
  display: none;
}
</style>


<template>
  <div>
    <div class="position-relative table-responsive">
      <div class="loading__container" v-if="is_loading">
        <span class="loading__text">
          <i class="fas fa-circle-notch fa-spin"></i>
          <span class="sr-only">Loading...</span>
        </span>
      </div>

      <table class="table" :class="tableClass">
        <thead>
          <tr style="vertical-align: top;">
            <slot name="headers">
              <th v-if="checkExpandable" class="datatable__expandable__column"></th>
              <th v-if="numbering" class="text-center">No.</th>
              <th
                v-for="(column,index) in columns"
                :class="getHeaderClass(column)"
                @click="sortItem(column.field, index, column.type)"
              >
                {{ column.name }}
                <span v-if="checkSortable(column)">
                  <i
                    class="fas fa-sort-amount-down"
                    v-if="(column.field == sortableColumn.field) && (sortableColumn.type == 'desc')"
                  ></i>
                  <i
                    class="fas fa-sort-amount-up"
                    v-else-if="(column.field == sortableColumn.field) && (sortableColumn.type == 'asc')"
                  ></i>
                  <i class="fas fa-sort" v-else></i>
                </span>
              </th>
            </slot>
          </tr>
        </thead>

        <tbody v-if="rows">
          <template v-for="(row, index) in rows">
            <tr v-if="validateChildren(row, index)">
              <td v-if="checkExpandable" class="datatable__expandable__column"></td>
              <td width="5%" v-if="numbering" class="text-center">{{ index_start_from + index }}</td>
              <slot name="items" :item="row" :index="index">
                <td
                  v-for="(column, columnIndex) in columns"
                  :class="getRowClass(column)"
                >{{ row[column.field] ? row[column.field] : "" }}</td>
              </slot>
            </tr>

            <template v-else>
              <tr @click="expand(index)">
                <td
                  class="datatable__expandable__column"
                  v-if="expandableRow[index] && checkExpandable"
                >
                  <i class="fa fa-angle-down"></i>
                </td>
                <td
                  class="datatable__expandable__column"
                  v-else-if="!expandableRow[index] && checkExpandable"
                >
                  <i class="fa fa-angle-right"></i>
                </td>
                <slot name="items" :item="row">
                  <td
                    v-for="(column, columnIndex) in columns"
                  >{{ row[column.field] ? row[column.field] : "" }}</td>
                </slot>
              </tr>
              <tr
                v-for="(row, rowIndex) in row[children]"
                v-if="expandableRow[index]"
                class="datatable__expand"
              >
                <td class="datatable__expandable__column"></td>
                <slot name="items" :item="row">
                  <td
                    v-for="(column, columnIndex) in columns"
                  >{{ row[column.field] ? row[column.field] : "" }}</td>
                </slot>
              </tr>
            </template>
          </template>

          <tr v-if="rows.length < 1">
            <td
              :colspan="numbering ? columns.length + 1 : columns.length"
              style="text-align: center;"
            >No data found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="datatable__select row ml-2 mt-3 no-print" v-if="paginate">
      <div class="datatable__select__actions">
        <div class="datatable__select__actions__range">
          <button
            class="btn datatable__btn datatable__dir_btn"
            @click="goPrev()"
            type="button"
            :disabled="checkPrev || is_loading"
          >
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </button>

          <div v-if="pagination.meta && pagination.meta.last_page > 1">
            <button
              class="btn datatable__btn datatable__number_btn"
              v-if="visiblePagination(index)"
              v-for="index in pagination.meta.last_page"
              @click="goToPage(index)"
              :class="{'active' : index == meta.current_page }"
              :disabled="index == meta.current_page"
            >{{ index }}</button>
          </div>

          <button
            class="btn datatable__btn datatable__dir_btn"
            @click="goNext()"
            type="button"
            :disabled="checkNext || is_loading"
          >
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </button>

          <div class="datatable__select__actions__range__pagination" v-if="meta">
            <small
              class="text-muted"
            >Showing {{ meta.from | numberFormat }} - {{ meta.to | numberFormat }} of {{ meta.total | numberFormat }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let origin = window.location.origin;
var qs = require("qs");

export default {
  props: {
    children: {
      type: String,
      default: "children"
    },

    columns: {
      type: Array,
      default: () => []
    },

    expandable: {
      type: Boolean,
      default: false
    },

    items: {
      type: Array,
      default: () => []
    },

    numbering: {
      type: Boolean,
      default: false
    },

    paginate: {
      type: Boolean,
      default: false
    },

    pagination: {
      type: Object,
      default: () => {}
    },

    paginationData: {
      type: Object,
      default: () => {
        return { page: "" };
      }
    },

    paginationMethod: {
      type: String,
      default: "get"
    },

    paginationRange: {
      type: Number,
      default: 3
    },

    tableClass: {
      type: String,
      default: "table-striped table-hover"
    }
  },

  data() {
    return {
      checkExpandable: false,

      expandableRow: [],

      is_loading: false,

      links: {},

      meta: {},

      rows: [],

      index_start_from: 1,

      sortableColumn: {
        field: "",
        type: "default"
      }
    };
  },

  mounted: function() {
    this.rows = this.items;
    this.meta = this.pagination.meta;
    this.links = this.pagination.links;
  },

  methods: {
    goToPage(pageNumber) {
      this.toggleLoading();
      this.$set(this.paginationData, "page", pageNumber);

      axios
        .get(this.pagination.meta.path, {
          params: this.paginationData,
          paramsSerializer: function(params) {
            return qs.stringify(params, { arrayFormat: "brackets" });
          }
        })
        .then(response => {
          this.rows = response.data.data;
          this.links = response.data.links;
          this.meta = response.data.meta;
          this.initExpandableRow();
          this.initSortableColumn();
          if (this.numbering) this.index_start_from = this.meta.from;
        })
        .finally(() => {
          this.toggleLoading();
          this.$set(this.paginationData, "page", "");
        });
    },

    goPrev() {
      this.goToPage(this.meta.current_page - 1);
    },

    goNext() {
      this.goToPage(this.meta.current_page + 1);
    },

    toggleLoading: function() {
      this.is_loading = !this.is_loading;
    },

    validateChildren: function(row, key) {
      if (this.checkExpandable) {
        if (row[this.children]) {
          if (row[this.children].length > 0) {
            return false;
          }
        }
      }
      return true;
    },

    expand: function(key) {
      Vue.set(this.expandableRow, key, !this.expandableRow[key]);
    },

    initExpandableRow: function() {
      this.expandableRow = [];
      this.checkExpandable = this.expandable;
      if (this.checkExpandable) {
        var validation = false;
        for (var i = 0; i < this.rows.length; i++) {
          this.expandableRow.push(false);
          if (this.rows[i][this.children]) {
            if (this.rows[i][this.children].length > 0) {
              validation = true;
            }
          }
        }
        this.checkExpandable = validation;
      }
    },

    initSortableColumn: function() {
      this.sortableColumn.field = "";
      this.sortableColumn.type = "default";
    },

    getHeaderClass: function(column) {
      let className = "";
      if (column.align) {
        className += "text-" + column.align;
      }
      if (column.sortable) {
        className += " datatable__clickable";
      }
      return className;
    },

    getRowClass: function(column) {
      let className = "";
      if (column.align) {
        className += "text-" + column.align;
      }
      return className;
    },

    sortItem: function(field, index, type) {
      if (!this.checkSortable(this.columns[index])) {
        return "";
      }
      this.sortableColumn.field = field;
      this.sortableColumn.type =
        this.sortableColumn.type == "asc" ? "desc" : "asc";

      if (this.sortableColumn.type != "default") {
        this.rows = _.orderBy(this.rows, field, [this.sortableColumn.type]);
      }

      this.initExpandableRow();
    },

    checkSortable: function(column) {
      if (column.hasOwnProperty("sortable")) {
        if (column.sortable) {
          return true;
        }
      }
      return false;
    },

    visiblePagination(index) {
      if (index) {
        if (
          index == 1 ||
          index == this.meta.last_page ||
          Math.abs(index - this.meta.current_page) <= this.paginationRange
        ) {
          return true;
        }
      }

      return false;
    }
  },

  computed: {
    checkPrev() {
      if (this.meta) {
        if (this.links.prev) return false;
      }
      return true;
    },

    checkNext() {
      if (this.meta) {
        if (this.links.next) return false;
      }
      return true;
    }
  },

  watch: {
    items: function() {
      if (this.paginate) {
        this.links = this.pagination.links;
        this.meta = this.pagination.meta;
      }
      this.rows = this.items;
      this.initExpandableRow();
    }
  }
};
</script>
