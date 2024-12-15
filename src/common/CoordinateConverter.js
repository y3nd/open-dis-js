class CoordinateConverter {
  constructor() {
    this.RADIANS_TO_DEGREES = 180.0 / Math.PI;
    this.DEGREES_TO_RADIANS = Math.PI / 180.0;
    this.a = 6378137.0; // semi-major axis (WGS 84)
    this.b = 6356752.3142; // semi-minor axis (WGS 84)
  }

  /**
   * Converts DIS xyz world coordinates to latitude and longitude (IN DEGREES).
   * This algorithm may not be 100% accurate near the poles. Uses WGS84.
   *
   * @param {Object} position - The input position {x, y, z}
   * @returns {Object} The converted coordinates {latitude, longitude, altitude}
   */
  convertDisToLatLongInDegrees(position) {
    const { x, y, z } = position;
    const answer = [0.0, 0.0, 0.0];
    const W = Math.sqrt(x * x + y * y);

    const eSquared = (this.a * this.a - this.b * this.b) / (this.a * this.a);
    const ePrimeSquared = (this.a * this.a - this.b * this.b) / (this.b * this.b);

    // Calculate longitude
    if (x >= 0) {
      answer[1] = Math.atan(y / x);
    } else if (x < 0 && y >= 0) {
      answer[1] = Math.atan(y / x) + Math.PI;
    } else {
      answer[1] = Math.atan(y / x) - Math.PI;
    }

    // Calculate latitude
    const tanBZero = (this.a * z) / (this.b * W);
    const BZero = Math.atan(tanBZero);
    const tanPhi =
      (z + ePrimeSquared * this.b * Math.pow(Math.sin(BZero), 3)) /
      (W - this.a * eSquared * Math.pow(Math.cos(BZero), 3));
    const phi = Math.atan(tanPhi);
    answer[0] = phi;

    // Calculate altitude
    const rSubN =
      (this.a * this.a) /
      Math.sqrt(
        this.a * this.a * Math.cos(phi) ** 2 +
          this.b * this.b * Math.sin(phi) ** 2
      );
    answer[2] = W / Math.cos(phi) - rSubN;

    return {
      latitude: answer[0] * this.RADIANS_TO_DEGREES,
      longitude: answer[1] * this.RADIANS_TO_DEGREES,
      altitude: answer[2],
    };
  }

  /**
   * Converts latitude, longitude, and geodetic height (elevation) into DIS XYZ.
   * Uses the WGS84 ellipsoid.
   *
   * @param {Object} latLonAlt - The input {lat, lon, alt} in degrees and meters
   * @returns {Object} The converted coordinates {x, y, z} in meters
   */
  getXYZfromLatLonAltDegrees(latLonAlt) {
    const latitudeRadians = latLonAlt.lat * this.DEGREES_TO_RADIANS;
    const longitudeRadians = latLonAlt.lon * this.DEGREES_TO_RADIANS;

    const cosLat = Math.cos(latitudeRadians);
    const sinLat = Math.sin(latitudeRadians);

    const rSubN =
      (this.a * this.a) /
      Math.sqrt(
        this.a * this.a * cosLat ** 2 + this.b * this.b * sinLat ** 2
      );

    const X = (rSubN + latLonAlt.alt) * cosLat * Math.cos(longitudeRadians);
    const Y = (rSubN + latLonAlt.alt) * cosLat * Math.sin(longitudeRadians);
    const Z =
      ((this.b * this.b) / (this.a * this.a)) * rSubN * sinLat +
      latLonAlt.alt * sinLat;

    return { x: X, y: Y, z: Z };
  }
}

export default CoordinateConverter;
export { CoordinateConverter };
