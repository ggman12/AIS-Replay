'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Track {
  /**
   * @see http://www.topografix.com/gpx/1/1/#type_trkType
   */
  // eslint-disable-next-line complexity
  constructor(trkseg, {
    name,
    cmt,
    desc,
    src,
    link,
    number,
    type,
    extensions
  } = {}) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "cmt", void 0);

    _defineProperty(this, "desc", void 0);

    _defineProperty(this, "src", void 0);

    _defineProperty(this, "link", void 0);

    _defineProperty(this, "number", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "extensions", void 0);

    _defineProperty(this, "trkseg", void 0);

    this.name = name || null;
    this.cmt = cmt || null;
    this.desc = desc || null;
    this.src = src || null;
    this.link = link || null;
    this.number = number || null;
    this.type = type || null;
    this.extensions = extensions || null;
    this.trkseg = trkseg || null;
  }

  setSegments(trkseg) {
    this.trkseg = trkseg;
    return this;
  } // eslint-disable-next-line complexity


  toObject() {
    const {
      name,
      cmt,
      desc,
      src,
      link,
      number,
      type,
      extensions,
      trkseg
    } = this;
    return _objectSpread({}, name ? {
      name
    } : {}, {}, cmt ? {
      cmt
    } : {}, {}, desc ? {
      desc
    } : {}, {}, src ? {
      src
    } : {}, {}, link ? {
      link: link.toObject()
    } : {}, {}, number ? {
      number
    } : {}, {}, type ? {
      type
    } : {}, {}, extensions ? {
      extensions
    } : {}, {}, trkseg ? {
      trkseg: trkseg.map(segment => segment.toObject())
    } : {});
  }

}

module.exports = Track;
