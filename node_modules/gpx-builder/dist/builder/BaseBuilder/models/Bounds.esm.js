import _defineProperty from '@babel/runtime/helpers/defineProperty';

class Bounds {
  /**
   * @see http://www.topografix.com/gpx/1/1/#type_boundsType
   */
  constructor(minlat, minlon, maxlat, maxlon) {
    _defineProperty(this, "minlat", void 0);

    _defineProperty(this, "minlon", void 0);

    _defineProperty(this, "maxlat", void 0);

    _defineProperty(this, "maxlon", void 0);

    this.minlat = minlat;
    this.minlon = minlon;
    this.maxlat = maxlat;
    this.maxlon = maxlon;
  }

  toObject() {
    const {
      minlat,
      minlon,
      maxlat,
      maxlon
    } = this;
    return {
      attributes: {
        minlat,
        minlon,
        maxlat,
        maxlon
      }
    };
  }

}

export default Bounds;
