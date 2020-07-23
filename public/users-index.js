(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-index"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/users/index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/users/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    role: {
      type: String
    }
  },
  data: function data() {
    return {
      filters: {
        role: this.role
      },
      users: [],
      links: {},
      meta: {},
      page: 1,
      sorter: {
        target: "username",
        order: "asc"
      },
      loading: false,
      role_options: [],
      current_filters: {}
    };
  },
  mounted: function mounted() {
    this.getUsers();
    this.getRoleOptions();
  },
  computed: {
    filteredItems: function filteredItems() {
      var filtered_items = [];

      if (this.notEmptyObject(this.current_filters)) {
        var _this$current_filters = this.current_filters,
            username_or_email = _this$current_filters.username_or_email,
            role = _this$current_filters.role;
        if (username_or_email) filtered_items.push(username_or_email);
        if (role) filtered_items.push("Role #".concat(role));
      }

      return filtered_items;
    }
  },
  methods: {
    getUsers: function getUsers() {
      var _this = this;

      this.loading = true;
      axios.get("api/admin/users", {
        params: {
          page: this.page,
          filters: this.filters,
          sorter: this.sorter
        }
      }).then(function (response) {
        _this.users = response.data.data;
        _this.links = response.data.links;
        _this.meta = response.data.meta;
        _this.current_filters = response.data.current_filters;
      })["catch"](function (error) {
        _this.alertError();
      })["finally"](function () {
        _this.loading = false;
      });
    },
    searchUser: function searchUser() {
      this.page = 1;
      this.getUsers();
    },
    getRoleOptions: function getRoleOptions() {
      var _this2 = this;

      this.makeApiRequest("admin/roles/options").then(function (response) {
        _this2.role_options = response.data;
      });
    },
    showCrew: function showCrew(crew_id) {
      window.location.href = "http://devilfish.local" + "/admin/users/".concat(crew_id);
    },
    createCrew: function createCrew() {
      window.location.href = "http://devilfish.local" + "/admin/users/create";
    },
    goToPage: function goToPage(pageNumber) {
      if (pageNumber) {
        this.page = pageNumber;
        this.getUsers();
      }
    },
    resetFilters: function resetFilters() {
      this.filters = {};
      this.getUsers();
    },
    sortByName: function sortByName(sortOrder) {
      this.page = 1;
      this.sorter = {
        target: "username",
        order: sortOrder
      };
      this.getUsers();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/users/index.vue?vue&type=template&id=d278d1e0&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/users/index.vue?vue&type=template&id=d278d1e0&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
              _c("label", [_vm._v("Username/Email")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.filters.username_or_email,
                    expression: "filters.username_or_email"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "text", maxlength: "30" },
                domProps: { value: _vm.filters.username_or_email },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.filters,
                      "username_or_email",
                      $event.target.value
                    )
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
                _c("label", [_vm._v("Role")]),
                _vm._v(" "),
                _c("v-select", {
                  staticClass: "text-capitalize",
                  attrs: {
                    "append-to-body": "",
                    reduce: function(role) {
                      return role.label
                    },
                    options: _vm.role_options
                  },
                  model: {
                    value: _vm.filters.role,
                    callback: function($$v) {
                      _vm.$set(_vm.filters, "role", $$v)
                    },
                    expression: "filters.role"
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
            staticClass: "btn btn-primary float-right",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.searchUser()
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
        _c("h3", { staticClass: "card-title" }, [_vm._v("Users")]),
        _vm._v(" "),
        _vm.users.length
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
                            return _vm.sortByName("asc")
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
                            return _vm.sortByName("desc")
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
            _vm._l(_vm.users, function(item, index) {
              return _c("tr", { key: index }, [
                _c("td", [_vm._v(_vm._s(index + _vm.meta.from))]),
                _vm._v(" "),
                _c("td", [
                  _c("a", { attrs: { href: "/admin/users/" + item.id } }, [
                    _vm._v(_vm._s(item.username || "N/A"))
                  ])
                ]),
                _vm._v(" "),
                _c("td", [
                  _c("a", { attrs: { href: "/admin/users/" + item.id } }, [
                    _vm._v(_vm._s(item.email || "N/A"))
                  ])
                ])
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
      _c("h3", { staticClass: "card-title" }, [_vm._v("Users")])
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
        _c("th", [_vm._v("Username")]),
        _vm._v(" "),
        _c("th", [_vm._v("Email")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/users/index.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/admin/users/index.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_d278d1e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=d278d1e0&scoped=true& */ "./resources/js/components/admin/users/index.vue?vue&type=template&id=d278d1e0&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/users/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_d278d1e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_d278d1e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d278d1e0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/users/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/users/index.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/admin/users/index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/users/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/users/index.vue?vue&type=template&id=d278d1e0&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/admin/users/index.vue?vue&type=template&id=d278d1e0&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_d278d1e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=d278d1e0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/users/index.vue?vue&type=template&id=d278d1e0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_d278d1e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_d278d1e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);