import _defineProperty from '@babel/runtime/helpers/defineProperty';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Copyright {
  /**
   * @param author - Owner of licence
   * @param year - Year of licence
   * @param license - Type of licence
   * @see http://www.topografix.com/gpx/1/1/#type_copyrightType
   */
  constructor(author, {
    year,
    license
  }) {
    _defineProperty(this, "author", void 0);

    _defineProperty(this, "year", void 0);

    _defineProperty(this, "license", void 0);

    this.author = author;
    this.year = year || null;
    this.license = license || null;
  }

  toObject() {
    const {
      author,
      year,
      license
    } = this;
    return _objectSpread({
      attributes: {
        author
      }
    }, year ? {
      year
    } : {}, {}, license ? {
      license
    } : {});
  }

}

export default Copyright;
