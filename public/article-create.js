(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["article-create"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/create.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/create.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/plugins/Editor */ "./resources/js/plugins/Editor.js");
/* harmony import */ var _components_admin_articles_shortcuts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/admin/articles/shortcuts */ "./resources/js/components/admin/articles/shortcuts.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    shortcuts: _components_admin_articles_shortcuts__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      form: {
        title: "",
        body: ""
      },
      loading: false,
      editor: {},
      errors: []
    };
  },
  created: function created() {
    var _this = this;

    this.loading = true;
    this.editor = Object(_plugins_Editor__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.editor.isReady.then(function () {
      _this.loading = false;
      console.log("Editor.js is ready to work!");
    })["catch"](function (reason) {
      console.log("Editor.js initialization failed because of ".concat(reason));
    });
  },
  methods: {
    saveArticle: function saveArticle() {
      var _this2 = this;

      this.loading = true;
      this.editor.save().then(function (outputData) {
        _this2.form.body = outputData;
        console.log(outputData);

        _this2.confirm(function () {
          axios.post("api/admin/articles", _this2.form).then(function (response) {
            _this2.alertSuccess();

            _this2.clearForm();

            _this2.navigate("/admin/articles/".concat(response.data.article.id), "_self");
          })["catch"](function (error) {
            console.log(error);
            _this2.errors = error.response.data.errors;

            _this2.alertError({}, error.response.data.errors);
          });
        });
      })["catch"](function (error) {
        console.log("Mat 7", error);
        console.log("Saving failed: ", error);
      })["finally"](function () {
        _this2.loading = false;
      });
    },
    clearForm: function clearForm() {
      this.editor.clear();
      this.form = {};
    }
  }
});

/***/ }),

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/create.vue?vue&type=template&id=27daea13&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/articles/create.vue?vue&type=template&id=27daea13& ***!
  \************************************************************************************************************************************************************************************************************************/
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
        _c("div", { staticClass: "card-body" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "title" } }, [_vm._v("Title")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.form.title,
                  expression: "form.title"
                }
              ],
              staticClass: "form-control",
              attrs: { type: "text", id: "title", placeholder: "Untitled" },
              domProps: { value: _vm.form.title },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.form, "title", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm.errors.title
              ? _c("span", { staticClass: "help-block text-danger d-block" }, [
                  _vm._v(_vm._s(_vm.errors.title[0]))
                ])
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card" }, [
        _vm._m(0),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "card-footer text-right" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-success",
              attrs: { disabled: _vm.loading, type: "button" },
              on: {
                click: function($event) {
                  return _vm.saveArticle()
                }
              }
            },
            [
              _c("i", {
                staticClass: "far fa-fw fa-save mr-1",
                attrs: { "aria-hidden": "true" }
              }),
              _vm._v("Save\n            ")
            ]
          )
        ])
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
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", { staticClass: "card-title" }, [
        _c("i", { staticClass: "far fa-file-alt" }),
        _vm._v("\n                Content\n            ")
      ])
    ])
  },
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

/***/ "./resources/js/components/admin/articles/create.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/admin/articles/create.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_vue_vue_type_template_id_27daea13___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create.vue?vue&type=template&id=27daea13& */ "./resources/js/components/admin/articles/create.vue?vue&type=template&id=27daea13&");
/* harmony import */ var _create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/articles/create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_vue_vue_type_template_id_27daea13___WEBPACK_IMPORTED_MODULE_0__["render"],
  _create_vue_vue_type_template_id_27daea13___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/articles/create.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/articles/create.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/admin/articles/create.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./create.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/articles/create.vue?vue&type=template&id=27daea13&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/admin/articles/create.vue?vue&type=template&id=27daea13& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_template_id_27daea13___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./create.vue?vue&type=template&id=27daea13& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/articles/create.vue?vue&type=template&id=27daea13&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_template_id_27daea13___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_template_id_27daea13___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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