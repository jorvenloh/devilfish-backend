(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["articles-show"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/shortcuts.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/shortcuts.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/show.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/show.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plugins_Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/plugins/Editor */ "./resources/js/plugins/Editor.js");
/* harmony import */ var _components_admin_articles_shortcuts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/admin/articles/shortcuts */ "./resources/js/components/admin/articles/shortcuts.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    shortcuts: _components_admin_articles_shortcuts__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      loading: true,
      article: {},
      editor: {}
    };
  },
  created: function created() {
    this.getArticle();
  },
  methods: {
    getArticle: function getArticle() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.loading = true;
                axios.get("admin/articles/".concat(_this.articleId)).then(function (response) {
                  _this.article = response.data.data;

                  _this.setupEditor();
                })["catch"](function (error) {
                  _this.alertError({}, error.response.data.errors);
                })["finally"](function () {
                  _this.loading = false;
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    setupEditor: function setupEditor() {
      this.editor = Object(_plugins_Editor__WEBPACK_IMPORTED_MODULE_1__["default"])({
        data: this.article.body
      });
    },
    updateStatus: function updateStatus(status) {
      var _this2 = this;

      this.confirm(function () {
        _this2.patchArticle({
          status: status
        });
      });
    },
    updateTitle: function updateTitle() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _yield$_this3$$swal$f, editedTitle;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this3.$swal.fire({
                  title: "Edit Title",
                  input: "text",
                  confirmButtonText: "Save",
                  showCloseButton: true,
                  showCancelButton: true,
                  inputValue: _this3.article.title
                });

              case 2:
                _yield$_this3$$swal$f = _context2.sent;
                editedTitle = _yield$_this3$$swal$f.value;

                if (editedTitle) {
                  _this3.patchArticle({
                    title: editedTitle.trim()
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    saveArticle: function saveArticle() {
      var _this4 = this;

      this.loading = true;
      this.editor.save().then(function (outputData) {
        _this4.confirm(function () {
          _this4.patchArticle({
            body: outputData
          });
        });
      })["catch"](function (error) {
        console.log("Saving failed: ", error);
      })["finally"](function () {
        _this4.loading = false;
      });
    },
    patchArticle: function patchArticle(payload) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this5.loading = true;

                _this5.makeApiRequest("admin/articles/".concat(_this5.articleId), "patch", payload).then(function (response) {
                  _this5.article = response.data.article;

                  _this5.alertSuccess();
                })["catch"](function (error) {
                  _this5.alertError();
                })["finally"](function () {
                  _this5.loading = false;
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.btn-tool[data-v-d7e56158] {\n    margin: -5px -0px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/shortcuts.vue?vue&type=template&id=79d7e826&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/shortcuts.vue?vue&type=template&id=79d7e826& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card" }, [
      _c("div", { staticClass: "card-header" }, [
        _c("i", { staticClass: "fas fa-code" }),
        _vm._v("\n        Content Elements\n    ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card-body" }, [
        _c("dl", { staticClass: "row" }, [
          _c("dt", { staticClass: "col-sm-2" }, [_vm._v("Header")]),
          _vm._v(" "),
          _c("dd", { staticClass: "col-sm-10" }, [_vm._v("'CTRL+SHIFT+H'")]),
          _vm._v(" "),
          _c("dt", { staticClass: "col-sm-2" }, [
            _vm._v("\n                Embed\n                "),
            _c("i", { staticClass: "fab fa-youtube" })
          ]),
          _vm._v(" "),
          _c("dd", { staticClass: "col-sm-10" }, [
            _vm._v("Paste the URL of the embed - Supported Youtube & Coub")
          ]),
          _vm._v(" "),
          _c("dt", { staticClass: "col-sm-2" }, [_vm._v("Embed Link")]),
          _vm._v(" "),
          _c("dd", { staticClass: "col-sm-10" }, [
            _vm._v("'CTRL+SHIFT+A' - Insert links back to own products")
          ]),
          _vm._v(" "),
          _c("dt", { staticClass: "col-sm-2" }, [_vm._v("Simple Image")]),
          _vm._v(" "),
          _c("dd", { staticClass: "col-sm-10" }, [
            _vm._v("Paste the URL of the image")
          ]),
          _vm._v(" "),
          _c("dt", { staticClass: "col-sm-2" }, [_vm._v("List")]),
          _vm._v(" "),
          _c("dd", { staticClass: "col-sm-10" }, [_vm._v("'CMD+SHIFT+Q'")]),
          _vm._v(" "),
          _c("dt", { staticClass: "col-sm-2" }, [_vm._v("Quote")]),
          _vm._v(" "),
          _c("dd", { staticClass: "col-sm-10" }, [_vm._v("'CMD+SHIFT+O'")])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/show.vue?vue&type=template&id=d7e56158&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/show.vue?vue&type=template&id=d7e56158&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    [
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-header" }, [
          _vm.article.title
            ? _c("h3", { staticClass: "card-title text-capitalize" }, [
                _c("span", { staticClass: "right badge badge-primary" }, [
                  _vm._v(_vm._s(_vm.article.status))
                ]),
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.article.title) +
                    "\n            "
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-tool position-absolute mb-1",
              attrs: {
                type: "button",
                "data-toggle": "tooltip",
                "data-placement": "right",
                title: "Edit Title"
              },
              on: { click: _vm.updateTitle }
            },
            [_c("i", { staticClass: "fas fa-edit" })]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "card-tools" }, [
            _vm.article.author
              ? _c("div", { staticClass: "d-inline text-secondary" }, [
                  _c(
                    "span",
                    {
                      attrs: {
                        "data-toggle": "tooltip",
                        "data-placement": "left",
                        title: "Author"
                      }
                    },
                    [_vm._v(_vm._s(_vm.article.author.username))]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.article.body
              ? _c("small", { staticClass: "text-secondary" }, [
                  _c("i", { staticClass: "far fa-fw fa-clock" }),
                  _vm._v(
                    "\n                    Last Update " +
                      _vm._s(
                        _vm._f("toStandardDateTime")(
                          _vm.article.updated_at,
                          true
                        )
                      ) +
                      "\n                "
                  )
                ])
              : _vm._e()
          ])
        ]),
        _vm._v(" "),
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "card-footer" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-primary ml-2 float-right",
              attrs: { disabled: _vm.loading, type: "button" },
              on: {
                click: function($event) {
                  return _vm.saveArticle()
                }
              }
            },
            [
              _c("i", {
                staticClass: "far fa-fw fa-edit",
                attrs: { "aria-hidden": "true" }
              }),
              _vm._v("\n                Save\n            ")
            ]
          ),
          _vm._v(" "),
          _vm.article.status
            ? _c("div", { staticClass: "d-inline float-right" }, [
                _vm.article.status == "published"
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btn-danger",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.updateStatus("unstaged")
                          }
                        }
                      },
                      [
                        _c("i", {
                          staticClass: "fas fa-fw fa-level-down-alt",
                          attrs: { "aria-hidden": "true" }
                        }),
                        _vm._v(
                          "\n                    Unstage\n                "
                        )
                      ]
                    )
                  : _c(
                      "button",
                      {
                        staticClass: "btn btn-success",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.updateStatus("published")
                          }
                        }
                      },
                      [
                        _c("i", {
                          staticClass: "fas fa-fw fa-share-square",
                          attrs: { "aria-hidden": "true" }
                        }),
                        _vm._v(
                          "\n                    Publish\n                "
                        )
                      ]
                    )
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _vm.loading
          ? _c("div", { staticClass: "overlay dark" }, [
              _c("i", { staticClass: "fas fa-2x fa-sync-alt fa-spin" })
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("shortcuts")
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-body" }, [
      _c("div", { attrs: { id: "editorjs" } })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/articles/shortcuts.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/admin/articles/shortcuts.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shortcuts_vue_vue_type_template_id_79d7e826___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shortcuts.vue?vue&type=template&id=79d7e826& */ "./resources/js/components/admin/articles/shortcuts.vue?vue&type=template&id=79d7e826&");
/* harmony import */ var _shortcuts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shortcuts.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/articles/shortcuts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _shortcuts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _shortcuts_vue_vue_type_template_id_79d7e826___WEBPACK_IMPORTED_MODULE_0__["render"],
  _shortcuts_vue_vue_type_template_id_79d7e826___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/articles/shortcuts.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/articles/shortcuts.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/admin/articles/shortcuts.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shortcuts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./shortcuts.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/shortcuts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shortcuts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/articles/shortcuts.vue?vue&type=template&id=79d7e826&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/admin/articles/shortcuts.vue?vue&type=template&id=79d7e826& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_shortcuts_vue_vue_type_template_id_79d7e826___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./shortcuts.vue?vue&type=template&id=79d7e826& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/shortcuts.vue?vue&type=template&id=79d7e826&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_shortcuts_vue_vue_type_template_id_79d7e826___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_shortcuts_vue_vue_type_template_id_79d7e826___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/articles/show.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/admin/articles/show.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _show_vue_vue_type_template_id_d7e56158_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./show.vue?vue&type=template&id=d7e56158&scoped=true& */ "./resources/js/components/admin/articles/show.vue?vue&type=template&id=d7e56158&scoped=true&");
/* harmony import */ var _show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/articles/show.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _show_vue_vue_type_style_index_0_id_d7e56158_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css& */ "./resources/js/components/admin/articles/show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _show_vue_vue_type_template_id_d7e56158_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _show_vue_vue_type_template_id_d7e56158_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d7e56158",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/articles/show.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/articles/show.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/admin/articles/show.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./show.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/show.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/articles/show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/components/admin/articles/show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_0_id_d7e56158_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/show.vue?vue&type=style&index=0&id=d7e56158&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_0_id_d7e56158_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_0_id_d7e56158_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_0_id_d7e56158_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_0_id_d7e56158_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_0_id_d7e56158_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/admin/articles/show.vue?vue&type=template&id=d7e56158&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/admin/articles/show.vue?vue&type=template&id=d7e56158&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_d7e56158_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./show.vue?vue&type=template&id=d7e56158&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/show.vue?vue&type=template&id=d7e56158&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_d7e56158_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_d7e56158_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/plugins/Editor.js":
/*!****************************************!*\
  !*** ./resources/js/plugins/Editor.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editorjs_editorjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @editorjs/editorjs */ "./node_modules/@editorjs/editorjs/dist/editor.js");
/* harmony import */ var _editorjs_editorjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_editorjs_editorjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editorjs_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @editorjs/header */ "./node_modules/@editorjs/header/dist/bundle.js");
/* harmony import */ var _editorjs_header__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_editorjs_header__WEBPACK_IMPORTED_MODULE_1__);



var LinkTool = __webpack_require__(/*! @editorjs/link */ "./node_modules/@editorjs/link/dist/bundle.js");

var SimpleImage = __webpack_require__(/*! @editorjs/simple-image */ "./node_modules/@editorjs/simple-image/dist/bundle.js");

var List = __webpack_require__(/*! @editorjs/list */ "./node_modules/@editorjs/list/dist/bundle.js");

var Embed = __webpack_require__(/*! @editorjs/embed */ "./node_modules/@editorjs/embed/dist/bundle.js");

var Quote = __webpack_require__(/*! @editorjs/quote */ "./node_modules/@editorjs/quote/dist/bundle.js"); //import ImageTool from '@editorjs/image';
//const RawTool = require('@editorjs/raw');


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  options = Object.assign({
    /**
     * Id of Element that should contain the Editor
     */
    holder: 'editorjs',
    placeholder: 'Let`s write an awesome article!',

    /**
     * Log LEVEL
     * VERBOSE - Show all messages (default)
     * INFO	- Show info and debug messages
     * WARN	- Show only warn messages
     * ERROR - Show only error messages
     */
    logLevel: 'INFO',

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {
      //Refer: https://github.com/editor-js/header
      header: {
        "class": _editorjs_header__WEBPACK_IMPORTED_MODULE_1___default.a,
        shortcut: 'CMD+SHIFT+H',
        config: {
          placeholder: 'Enter a header',
          levels: [1, 2, 3, 4, 5],
          defaultLevel: 1
        }
      },
      //Refer: https://github.com/editor-js/link
      linkTool: {
        "class": LinkTool,
        shortcut: 'CMD+SHIFT+A',
        config: {
          endpoint: 'http://devilfish.local/api/admin/products/link'
        }
      },
      //Refer: https://github.com/editor-js/simple-image
      image: SimpleImage,
      //Refer: https://github.com/editor-js/list
      list: {
        "class": List,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+Q'
      },
      //Refer: https://github.com/editor-js/embed
      embed: {
        "class": Embed,
        inlineToolbar: true,
        config: {
          services: {
            youtube: true,
            coub: true
          }
        }
      },
      //Refer: https://github.com/editor-js/quote
      quote: {
        "class": Quote,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+O',
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author'
        }
      } //Refer: https://github.com/editor-js/image
      // imageTool: {
      //     class: ImageTool,
      //     shortcut: 'CMD+SHIFT+Z',
      //     config: {
      //         endpoints: {
      //             byFile: 'http://devilfish.local/api/admin/products/images/file', // Your backend file uploader endpoint
      //             //byUrl: 'http://devilfish.local/api/admin/products/images/link', // Your endpoint that provides uploading by Url
      //         }
      //     }
      // }
      //Refer: https://github.com/editor-js/raw
      //raw: RawTool,

    }
  }, options);
  return new _editorjs_editorjs__WEBPACK_IMPORTED_MODULE_0___default.a(options);
});

/***/ })

}]);