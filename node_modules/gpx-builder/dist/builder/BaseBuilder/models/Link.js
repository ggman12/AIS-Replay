'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Link {
  /**
   * @see http://www.topografix.com/gpx/1/1/#type_linkType
   */
  constructor(href, {
    text,
    type
  }) {
    _defineProperty(this, "href", void 0);

    _defineProperty(this, "text", void 0);

    _defineProperty(this, "type", void 0);

    this.href = href;
    this.text = text || null;
    this.type = type || null;
  }

  toObject() {
    const {
      href,
      text,
      type
    } = this;
    return _objectSpread({
      attributes: {
        href
      }
    }, text ? {
      text
    } : {}, {}, type ? {
      type
    } : {});
  }

}

module.exports = Link;
