(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["articles-index"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    status: {
      type: String
    }
  },
  data: function data() {
    return {
      loading: true,
      page: 1,
      filters: {
        status: this.status
      },
      sorter: {
        target: "title",
        order: "asc"
      },
      current_filters: {},
      links: {},
      meta: {},
      searching_threshold: 1,
      author_options: [],
      tag_options: [],
      status_options: [],
      articles: {},
      columns: [{
        name: "Title",
        field: "title"
      }, {
        name: "Last Update",
        field: "updated_at"
      }, {
        name: "Status",
        field: "status"
      }, {
        name: "Action",
        align: "center"
      }]
    };
  },
  computed: {
    filteredItems: function filteredItems() {
      var filtered_items = [];

      if (this.notEmptyObject(this.current_filters)) {
        var _this$current_filters = this.current_filters,
            title = _this$current_filters.title,
            author = _this$current_filters.author,
            tag = _this$current_filters.tag,
            status = _this$current_filters.status;
        if (title) filtered_items.push(title);
        if (author) filtered_items.push("Author #".concat(author));
        if (tag) filtered_items.push("Tag #".concat(tag));
        if (status) filtered_items.push(status);
      }

      return filtered_items;
    },
    statusOptions: function statusOptions() {
      var options = [];

      _.forEach(this.status_options, function (value, key) {
        options.push({
          label: value,
          value: key
        });
      });

      return options;
    }
  },
  mounted: function mounted() {
    this.getArticles();
    this.getStatusOptions();
    this.getAuthorOptions();
  },
  methods: {
    getArticles: function getArticles() {
      var _this = this;

      this.loading = true;
      axios.get("admin/articles", {
        params: {
          page: this.page,
          filters: this.filters,
          sorter: this.sorter
        }
      }).then(function (response) {
        _this.articles = response.data.data;
        _this.links = response.data.links;
        _this.meta = response.data.meta;
        _this.current_filters = response.data.current_filters;
      })["catch"](function (error) {
        _this.alertError({}, error.response.data.errors);
      })["finally"](function () {
        _this.loading = false;
      });
    },
    getStatusOptions: function getStatusOptions() {
      var _this2 = this;

      axios.get("admin/articles/options/status").then(function (response) {
        _this2.status_options = response.data;
      });
    },
    getAuthorOptions: function getAuthorOptions() {
      var _this3 = this;

      axios.get("admin/articles/options/author").then(function (response) {
        _this3.author_options = response.data;
      });
    },
    editArticle: function editArticle(article_id) {
      this.navigate("/admin/articles/".concat(article_id), "_blank");
    },
    showArticle: function showArticle(article_id) {
      this.navigate("/articles/".concat(article_id), "_blank", "client");
    },
    searchArticles: function searchArticles() {
      this.page = 1;
      this.getArticles();
    },
    createArticle: function createArticle() {
      this.navigate("/admin/articles/create", "_blank");
    },
    onTagSearch: function onTagSearch(search, loading) {
      var _this4 = this;

      if (search.length >= this.searching_threshold) {
        loading(true);
        axios.get("admin/tags/options", {
          params: {
            name: search
          }
        }).then(function (response) {
          _this4.tag_options = response.data;
        })["catch"](function (error) {
          _this4.alertError();
        })["finally"](function () {
          loading(false);
        });
      }
    },
    sortByTitle: function sortByTitle(sortOrder) {
      this.page = 1;
      this.sorter = {
        target: "title",
        order: sortOrder
      };
      this.getArticles();
    },
    goToPage: function goToPage(pageNumber) {
      if (pageNumber) {
        this.page = pageNumber;
        this.getArticles();
      }
    },
    resetFilters: function resetFilters() {
      this.filters = {};
      this.getArticles();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/index.vue?vue&type=template&id=318da20b&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/index.vue?vue&type=template&id=318da20b& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "card" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "card-body" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-sm-4" }, [
            _c("div", { staticClass: "form-group" }, [
              _c("label", [_vm._v("Title")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.filters.title,
                    expression: "filters.title"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "Name", maxlength: "30" },
                domProps: { value: _vm.filters.title },
                on: {
                  keyup: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.searchArticles()
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.filters, "title", $event.target.value)
                  }
                }
              })
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-sm-4" }, [
            _c(
              "div",
              { staticClass: "form-group" },
              [
                _c("label", [_vm._v("Author")]),
                _vm._v(" "),
                _c("v-select", {
                  attrs: {
                    "append-to-body": "",
                    options: _vm.author_options,
                    reduce: function(author) {
                      return author.value
                    }
                  },
                  model: {
                    value: _vm.filters.author,
                    callback: function($$v) {
                      _vm.$set(_vm.filters, "author", $$v)
                    },
                    expression: "filters.author"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-sm-4" }, [
            _c(
              "div",
              { staticClass: "form-group" },
              [
                _c("label", [_vm._v("Tag")]),
                _vm._v(" "),
                _c("v-select", {
                  attrs: {
                    "append-to-body": "",
                    options: _vm.tag_options,
                    reduce: function(tag) {
                      return tag.value
                    }
                  },
                  on: { search: _vm.onTagSearch },
                  model: {
                    value: _vm.filters.tag,
                    callback: function($$v) {
                      _vm.$set(_vm.filters, "tag", $$v)
                    },
                    expression: "filters.tag"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-sm-4" }, [
            _c(
              "div",
              { staticClass: "form-group" },
              [
                _c("label", [_vm._v("Status")]),
                _vm._v(" "),
                _c("v-select", {
                  staticClass: "text-capitalize",
                  attrs: {
                    "append-to-body": "",
                    options: _vm.statusOptions,
                    reduce: function(status) {
                      return status.value
                    }
                  },
                  model: {
                    value: _vm.filters.status,
                    callback: function($$v) {
                      _vm.$set(_vm.filters, "status", $$v)
                    },
                    expression: "filters.status"
                  }
                })
              ],
              1
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card-footer" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-outline-success float-left",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.createArticle()
              }
            }
          },
          [
            _c("i", {
              staticClass: "fas fa-plus",
              attrs: { "aria-hidden": "true" }
            }),
            _vm._v("\n                Create New\n            ")
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-primary float-right",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.searchArticles()
              }
            }
          },
          [
            _c("i", {
              staticClass: "fas fa-search",
              attrs: { "aria-hidden": "true" }
            }),
            _vm._v("\n                Search\n            ")
          ]
        )
      ]),
      _vm._v(" "),
      _vm.loading
        ? _c("div", { staticClass: "overlay dark" }, [
            _c("i", { staticClass: "fas fa-2x fa-sync-alt fa-spin" })
          ])
        : _vm._e()
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row mb-3" }, [
      _c("div", { staticClass: "col" }, [
        _c("div", [
          _c(
            "button",
            { staticClass: "btn btn-default btn-badge text-capitalize mr-2" },
            [_vm._v("Found " + _vm._s(_vm.meta.total))]
          ),
          _vm._v(" "),
          _vm.filteredItems.length
            ? _c(
                "div",
                { staticClass: "d-inline" },
                [
                  _vm._l(_vm.filteredItems, function(item, index) {
                    return _c(
                      "button",
                      {
                        key: index,
                        staticClass: "btn btn-warning btn-badge text-capitalize"
                      },
                      [_vm._v(_vm._s(item))]
                    )
                  }),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-danger ml-2",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.resetFilters()
                        }
                      }
                    },
                    [
                      _c("i", {
                        staticClass: "fas fa-redo",
                        attrs: { "aria-hidden": "true" }
                      }),
                      _vm._v(
                        "\n                        Reset\n                    "
                      )
                    ]
                  )
                ],
                2
              )
            : _vm._e()
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card" }, [
      _c("div", { staticClass: "card-header" }, [
        _c("h3", { staticClass: "card-title" }, [_vm._v("Articles")]),
        _vm._v(" "),
        _vm.articles.length
          ? _c("div", { staticClass: "card-tools" }, [
              _c("div", { staticClass: "btn-group" }, [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "dropdown-menu dropdown-menu-right" },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "dropdown-item",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.sortByTitle("asc")
                          }
                        }
                      },
                      [
                        _c("i", {
                          staticClass: "fas fa-sort-alpha-down",
                          attrs: { "aria-hidden": "true" }
                        }),
                        _vm._v(
                          "\n                            Title (A-Z)\n                        "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "dropdown-item",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.sortByTitle("desc")
                          }
                        }
                      },
                      [
                        _c("i", {
                          staticClass: "fas fa-sort-alpha-down-alt",
                          attrs: { "aria-hidden": "true" }
                        }),
                        _vm._v(
                          "\n                            Title (Z-A)\n                        "
                        )
                      ]
                    )
                  ]
                )
              ])
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card-body p-0" }, [
        _c("table", { staticClass: "table table-striped" }, [
          _vm._m(2),
          _vm._v(" "),
          _c(
            "tbody",
            { staticClass: "text-capitalize" },
            _vm._l(_vm.articles, function(item, index) {
              return _c("tr", { key: index }, [
                _c("td", [_vm._v(_vm._s(index + 1))]),
                _vm._v(" "),
                _c("td", [
                  _c("a", { attrs: { href: "/admin/articles/" + item.id } }, [
                    _vm._v(_vm._s(item.title || "Untitled"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", [
                  _c("a", { attrs: { href: "/admin/articles/" + item.id } }, [
                    _vm._v(_vm._s(item.author.username || "Anonymous"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(item.status || "--"))]),
                _vm._v(" "),
                _c("td", [
                  _vm._v(
                    _vm._s(
                      _vm._f("toStandardDateTime")(
                        item.updated_at || "--",
                        true
                      )
                    )
                  )
                ]),
                _vm._v(" "),
                _c(
                  "td",
                  { staticClass: "text-center", attrs: { width: "10%" } },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-sm btn-warning",
                        attrs: {
                          type: "button",
                          "data-toggle": "tooltip",
                          "data-placement": "top",
                          title: "Edit Article"
                        },
                        on: {
                          click: function($event) {
                            return _vm.editArticle(item.id)
                          }
                        }
                      },
                      [
                        _c("i", {
                          staticClass: "fas fa-edit",
                          attrs: { "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-sm btn-success",
                        attrs: {
                          type: "button",
                          "data-toggle": "tooltip",
                          "data-placement": "top",
                          title: "Preview Article"
                        },
                        on: {
                          click: function($event) {
                            return _vm.showArticle(item.id)
                          }
                        }
                      },
                      [
                        _c("i", {
                          staticClass: "fas fa-eye",
                          attrs: { "aria-hidden": "true" }
                        })
                      ]
                    )
                  ]
                )
              ])
            }),
            0
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c(
            "div",
            { staticClass: "col" },
            [
              _c("v-paginator", {
                staticClass: "m-3",
                attrs: {
                  links: _vm.links,
                  meta: _vm.meta,
                  filters: _vm.filters,
                  loading: _vm.loading,
                  position: "left"
                },
                on: { "go-to-page": _vm.goToPage }
              })
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _vm.loading
        ? _c("div", { staticClass: "overlay dark" }, [
            _c("i", { staticClass: "fas fa-2x fa-sync-alt fa-spin" })
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", { staticClass: "card-title" }, [_vm._v("Filters")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-tool",
        attrs: {
          type: "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        }
      },
      [
        _c("i", {
          staticClass: "fas fa-bars fa-fw",
          attrs: { "aria-hidden": "true" }
        })
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticStyle: { width: "10px" } }, [_vm._v("#")]),
        _vm._v(" "),
        _c("th", [_vm._v("Title")]),
        _vm._v(" "),
        _c("th", [_vm._v("Author")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")]),
        _vm._v(" "),
        _c("th", [_vm._v("Last Update")]),
        _vm._v(" "),
        _c("th", [_vm._v("Action")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/articles/index.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/admin/articles/index.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_318da20b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=318da20b& */ "./resources/js/components/admin/articles/index.vue?vue&type=template&id=318da20b&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/articles/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_318da20b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_318da20b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/articles/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/articles/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/admin/articles/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/articles/index.vue?vue&type=template&id=318da20b&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/admin/articles/index.vue?vue&type=template&id=318da20b& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_318da20b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=318da20b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/index.vue?vue&type=template&id=318da20b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_318da20b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_318da20b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);