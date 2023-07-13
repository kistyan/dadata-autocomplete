"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DaDataAutocomplete;
var _react = _interopRequireWildcard(require("react"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Autocomplete = _interopRequireDefault(require("@mui/material/Autocomplete"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function DaDataAutocomplete(_ref) {
  var _ref$token = _ref.token,
    token = _ref$token === void 0 ? 'b64560af54b95583ac2711f8ecb9744514f08b11' : _ref$token,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'address' : _ref$type,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? 'Адрес' : _ref$label,
    _ref$initialQuery = _ref.initialQuery,
    initialQuery = _ref$initialQuery === void 0 ? '' : _ref$initialQuery,
    value = _ref.value,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function (event, newValue) {
      console.log(newValue);
    } : _ref$onChange,
    inputProps = _ref.inputProps;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    suggestions = _useState2[0],
    setSuggestions = _useState2[1];
  var _useState3 = (0, _react.useState)(value ? value.value : initialQuery),
    _useState4 = _slicedToArray(_useState3, 2),
    inputValue = _useState4[0],
    setInputValue = _useState4[1];
  var updateSuggestions = function updateSuggestions(newInputValue) {
    if (newInputValue) {
      _axios["default"].post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/' + type, {
        query: newInputValue
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        }
      }).then(function (response) {
        setSuggestions(response.data.suggestions);
      })["catch"](function (error) {
        console.log(error);
      });
    } else {
      setSuggestions([]);
    }
  };
  var handleFocus = function handleFocus(event, newInputValue) {
    updateSuggestions(event.target.value);
  };
  var handleInputChange = function handleInputChange(event, newInputValue) {
    setInputValue(newInputValue);
    updateSuggestions(newInputValue);
  };
  var handleChange = function handleChange(event, newValue) {
    onChange(event, newValue);
  };
  return /*#__PURE__*/_react["default"].createElement(_Autocomplete["default"], _extends({
    freeSolo: true,
    filterOptions: function filterOptions(x) {
      return x;
    },
    options: suggestions,
    getOptionLabel: function getOptionLabel(option) {
      return option.value;
    },
    onInputChange: handleInputChange,
    onFocus: handleFocus,
    onChange: handleChange,
    inputValue: inputValue,
    value: value
  }, inputProps, {
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_react["default"].createElement(_TextField["default"], _extends({}, params, {
        label: label
      }));
    },
    renderOption: function renderOption(props, option, _ref2) {
      var inputValue = _ref2.inputValue;
      return /*#__PURE__*/_react["default"].createElement("li", props, /*#__PURE__*/_react["default"].createElement("div", null, option.value, type === 'fms_unit' && /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          fontSize: '0.8rem'
        }
      }, /*#__PURE__*/_react["default"].createElement("br", null), "\u041A\u043E\u0434 \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u044F ", option.data.code)));
    }
  }));
}