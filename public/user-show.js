(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user-show"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/users/show.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/users/show.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    userId: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    var _ref;

    return _ref = {
      loading: false,
      avatar: null,
      user: {}
    }, _defineProperty(_ref, "avatar", null), _defineProperty(_ref, "roles", {}), _defineProperty(_ref, "profile", {}), _ref;
  },
  mounted: function mounted() {
    this.getUser();
  },
  methods: {
    getUser: function getUser() {
      var _this = this;

      this.loading = true;
      axios.get("api/admin/users/".concat(this.userId)).then(function (response) {
        _this.reconstructItems(response.data.data);
      })["catch"](function (error) {
        _this.alertError();
      })["finally"](function () {
        _this.loading = false;
      });
    },
    reconstructItems: function reconstructItems(response) {
      var avatar = response.avatar,
          roles = response.roles,
          profile = response.profile,
          userData = _objectWithoutProperties(response, ["avatar", "roles", "profile"]);

      this.user = userData;
      this.avatar = avatar;
      this.roles = roles;
      this.profile = profile;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/users/show.vue?vue&type=template&id=1b7225af&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/users/show.vue?vue&type=template&id=1b7225af&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-4" }, [
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-body box-profile" }, [
          _c("div", { staticClass: "text-center" }, [
            _vm.avatar
              ? _c("img", {
                  staticClass: "profile-user-img img-fluid img-circle",
                  attrs: { src: _vm.avatar, alt: "Avatar" }
                })
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("h3", { staticClass: "profile-username text-center" }, [
            _vm._v(_vm._s(_vm.user.username || "Anonymous"))
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "text-muted text-center mb-0" }, [
            _vm._v(
              "\n                    " +
                _vm._s(_vm.user.email) +
                "\n                    "
            ),
            _vm.user.email_verified_at
              ? _c("i", {
                  staticClass: "fas fa-check text-success",
                  attrs: {
                    "data-toggle": "tooltip",
                    "data-placement": "right",
                    title: "Verified"
                  }
                })
              : _vm._e()
          ]),
          _vm._v(" "),
          _vm.roles.length
            ? _c(
                "p",
                { staticClass: "text-muted text-capitalize text-center mb-0" },
                [_vm._v(_vm._s(_vm.roles[0].name))]
              )
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
      _vm.notEmptyObject(_vm.profile)
        ? _c("div", { staticClass: "card" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _c("dl", { staticClass: "row text-capitalize m-0" }, [
                _c("dt", { staticClass: "col-sm-4" }, [_vm._v("First Name")]),
                _vm._v(" "),
                _c("dd", { staticClass: "col-sm-8" }, [
                  _c("span", { staticClass: "float-sm-right" }, [
                    _vm._v(_vm._s(_vm.profile.first_name || "N/A"))
                  ])
                ]),
                _vm._v(" "),
                _c("dt", { staticClass: "col-sm-4" }, [_vm._v("Last Name")]),
                _vm._v(" "),
                _c("dd", { staticClass: "col-sm-8" }, [
                  _c("span", { staticClass: "float-sm-right" }, [
                    _vm._v(_vm._s(_vm.profile.last_name || "N/A"))
                  ])
                ]),
                _vm._v(" "),
                _c("dt", { staticClass: "col-sm-4" }, [_vm._v("Gender")]),
                _vm._v(" "),
                _c("dd", { staticClass: "col-sm-8" }, [
                  _c("span", { staticClass: "float-sm-right" }, [
                    _vm._v(_vm._s(_vm.profile.gender || "N/A"))
                  ])
                ]),
                _vm._v(" "),
                _c("dt", { staticClass: "col-sm-4" }, [_vm._v("D.O.B")]),
                _vm._v(" "),
                _c("dd", { staticClass: "col-sm-8" }, [
                  _c("span", { staticClass: "float-sm-right" }, [
                    _vm._v(_vm._s(_vm.profile.birthday_at || "N/A"))
                  ])
                ]),
                _vm._v(" "),
                _c("dt", { staticClass: "col-sm-4" }, [_vm._v("Contact")]),
                _vm._v(" "),
                _c("dd", { staticClass: "col-sm-8" }, [
                  _c("span", { staticClass: "float-sm-right" }, [
                    _vm._v(_vm._s(_vm.profile.contact || "N/A"))
                  ])
                ]),
                _vm._v(" "),
                _c("dt", { staticClass: "col-sm-4" }, [_vm._v("Address 1")]),
                _vm._v(" "),
                _c("dd", { staticClass: "col-sm-8" }, [
                  _c("span", { staticClass: "float-sm-right" }, [
                    _vm._v(_vm._s(_vm.profile.address_line_one || "N/A"))
                  ])
                ]),
                _vm._v(" "),
                _c("dt", { staticClass: "col-sm-4" }, [_vm._v("Address 2")]),
                _vm._v(" "),
                _c("dd", { staticClass: "col-sm-8" }, [
                  _c("span", { staticClass: "float-sm-right" }, [
                    _vm._v(_vm._s(_vm.profile.address_line_two || "N/A"))
                  ])
                ])
              ])
            ])
          ])
        : _vm._e()
    ]),
    _vm._v(" "),
    _vm._m(1)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", { staticClass: "card-title" }, [_vm._v("Profile")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-8" }, [
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-header" }, [
          _c("h3", { staticClass: "card-title" }, [_vm._v("Coming Soon")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [_vm._v("Coming Soon")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/users/show.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/admin/users/show.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _show_vue_vue_type_template_id_1b7225af_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./show.vue?vue&type=template&id=1b7225af&scoped=true& */ "./resources/js/components/admin/users/show.vue?vue&type=template&id=1b7225af&scoped=true&");
/* harmony import */ var _show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/users/show.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _show_vue_vue_type_template_id_1b7225af_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _show_vue_vue_type_template_id_1b7225af_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1b7225af",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/users/show.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/users/show.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/admin/users/show.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./show.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/users/show.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/users/show.vue?vue&type=template&id=1b7225af&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/admin/users/show.vue?vue&type=template&id=1b7225af&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_1b7225af_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./show.vue?vue&type=template&id=1b7225af&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/users/show.vue?vue&type=template&id=1b7225af&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_1b7225af_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_1b7225af_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);