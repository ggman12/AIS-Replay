'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Segment {
  /**
   * @see http://www.topografix.com/gpx/1/1/#type_trksegType
   */
  constructor(trkpt, extensions = null) {
    _defineProperty(this, "trkpt", void 0);

    _defineProperty(this, "extensions", void 0);

    this.trkpt = trkpt;
    this.extensions = extensions || null;
  }

  setPoints(trkpt) {
    this.trkpt = trkpt;
    return this;
  }

  toObject() {
    const {
      trkpt,
      extensions
    } = this;
    return _objectSpread({
      trkpt: trkpt.map(point => point.toObject())
    }, extensions ? {
      extensions
    } : {});
  }

}

module.exports = Segment;
