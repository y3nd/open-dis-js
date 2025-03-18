class OrientationConverter {
  constructor() {
    // Constants
    this.DEG2RAD = Math.PI / 180.0;
    this.RAD2DEG = 180.0 / Math.PI;
  }

  // Basic vector operations
  // Using [x,y,z] arrays for vectors.
  dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  cross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  }

  normalize(v) {
    const mag = Math.sqrt(this.dot(v, v));
    return [v[0] / mag, v[1] / mag, v[2] / mag];
  }

  // Rotate a vector v around axis u by angle (radians)
  rotateVector(v, angleRadians, u) {
    // Rodrigues' rotation formula:
    // v_rot = v*cosθ + (u×v)*sinθ + u*(u·v)*(1 - cosθ)
    const cosθ = Math.cos(angleRadians);
    const sinθ = Math.sin(angleRadians);

    const uNorm = this.normalize(u);
    const dotUV = this.dot(uNorm, v);
    const crossUV = this.cross(uNorm, v);

    const term1 = [v[0] * cosθ, v[1] * cosθ, v[2] * cosθ];
    const term2 = [crossUV[0] * sinθ, crossUV[1] * sinθ, crossUV[2] * sinθ];
    const term3 = [uNorm[0] * dotUV * (1 - cosθ), uNorm[1] * dotUV * (1 - cosθ), uNorm[2] * dotUV * (1 - cosθ)];

    return [
      term1[0] + term2[0] + term3[0],
      term1[1] + term2[1] + term3[1],
      term1[2] + term2[2] + term3[2],
    ];
  }

  // Convert latitude/longitude to a local North-East-Down (NED) frame.
  // Here we follow the logic of CalculateNorthEastDownVectorsFromLatLon from the provided code.
  // Latitude, Longitude in degrees.
  // Returns {North: [x,y,z], East: [x,y,z], Down: [x,y,z]}
  calculateNorthEastDownVectorsFromLatLon(latDeg, lonDeg) {
    // Start with a known reference frame:
    // N: Z-axis, E: Y-axis, D: -X-axis as initial guess
    let north = [0, 0, 1];
    let east = [0, 1, 0];
    let down = [-1, 0, 0];

    // Rotate around North by Longitude
    east = this.rotateVector(east, lonDeg * this.DEG2RAD, north);
    down = this.rotateVector(down, lonDeg * this.DEG2RAD, north);

    // Rotate around -East by Latitude
    const negEast = [-east[0], -east[1], -east[2]];
    north = this.rotateVector(north, latDeg * this.DEG2RAD, negEast);
    down = this.rotateVector(down, latDeg * this.DEG2RAD, negEast);

    return { north: north, east: east, down: down };
  }

  // Apply heading, pitch, roll (in degrees) to NED frame
  // Similar to ApplyHeadingPitchRollToNorthEastDownVector
  // Heading about Down, Pitch about East, Roll about North
  applyHeadingPitchRollToNED(headingDeg, pitchDeg, rollDeg, NED) {
    let X = NED.north; // Start with North as X
    let Y = NED.east;  // East as Y
    let Z = NED.down;  // Down as Z

    // Rotate around Z by Heading
    X = this.rotateVector(X, headingDeg * this.DEG2RAD, Z);
    Y = this.rotateVector(Y, headingDeg * this.DEG2RAD, Z);

    // Rotate around Y by Pitch
    X = this.rotateVector(X, pitchDeg * this.DEG2RAD, Y);
    Z = this.rotateVector(Z, pitchDeg * this.DEG2RAD, Y);

    // Rotate around X by Roll
    Y = this.rotateVector(Y, rollDeg * this.DEG2RAD, X);
    Z = this.rotateVector(Z, rollDeg * this.DEG2RAD, X);

    return { X: X, Y: Y, Z: Z };
  }

  calculateHeadingPitchRollFromPsiThetaPhiRadians(psiThetaPhiRadians, latitudeDegrees, longitudeDegrees) {
    const psiThetaPhiDegrees = {
      psi: psiThetaPhiRadians.psi * this.RAD2DEG,
      theta: psiThetaPhiRadians.theta * this.RAD2DEG,
      phi: psiThetaPhiRadians.phi * this.RAD2DEG
    };

    return this.calculateHeadingPitchRollFromPsiThetaPhi(psiThetaPhiDegrees, latitudeDegrees, longitudeDegrees);
  }

  // Convert Psi/Theta/Phi (DIS Euler angles) at a given latitude/longitude back to heading/pitch/roll
  // This follows the logic from CalculateHeadingPitchRollDegreesFromPsiThetaPhiDegreesAtLatLon
  // PsiThetaPhiDegrees: {Psi, Theta, Phi} in degrees
  // LatitudeDegrees, LongitudeDegrees: Position on Earth
  // Returns {Heading, Pitch, Roll} in degrees
  calculateHeadingPitchRollFromPsiThetaPhi(psiThetaPhiDegrees, latitudeDegrees, longitudeDegrees) {
    // Compute the local NED frame at the given lat/lon
    const NED = this.calculateNorthEastDownVectorsFromLatLon(latitudeDegrees, longitudeDegrees);

    // Start from a reference frame: X0=(1,0,0), Y0=(0,1,0), Z0=(0,0,1)
    const X0 = [1, 0, 0];
    const Y0 = [0, 1, 0];
    const Z0 = [0, 0, 1];

    // Interpret Psi/Theta/Phi as heading/pitch/roll in a local-level sense and rotate the reference frame
    const HPR = { heading: psiThetaPhiDegrees.psi, pitch: psiThetaPhiDegrees.theta, roll: psiThetaPhiDegrees.phi };

    const rotated = this.applyHeadingPitchRollToNED(HPR.heading, HPR.pitch, HPR.roll, { north: X0, east: Y0, down: Z0 });
    const X3 = rotated.X;
    const Y3 = rotated.Y;
    // Z3 = rotated.Z not directly needed here

    // Compute heading, pitch, roll relative to the local NED:
    // Heading = atan2(X3·East, X3·North)
    const heading = Math.atan2(this.dot(X3, NED.east), this.dot(X3, NED.north)) * this.RAD2DEG;

    // Pitch = Math.atan2(-X3·Down, sqrt((X3·North)^2+(X3·East)^2))
    const x3DotDown = this.dot(X3, NED.down);
    const x3DotNorth = this.dot(X3, NED.north);
    const x3DotEast = this.dot(X3, NED.east);
    const pitch = Math.atan2(-x3DotDown, Math.sqrt(x3DotNorth * x3DotNorth + x3DotEast * x3DotEast)) * this.RAD2DEG;

    // After applying heading/pitch, re-apply them to get a frame to measure roll against
    const postHP = this.applyHeadingPitchRollToNED(heading, pitch, 0, NED);
    const Y2 = postHP.Y;
    const Z2 = postHP.Z;

    // Roll = atan2(Y3·Z2, Y3·Y2)
    const roll = Math.atan2(this.dot(Y3, Z2), this.dot(Y3, Y2)) * this.RAD2DEG;

    return { heading: heading, pitch: pitch, roll: roll };
  }
}

export default OrientationConverter;
export { OrientationConverter };

// // Example usage:
// // Suppose we have DIS Euler angles psi=30°, theta=10°, phi=5° at latitude=45°, longitude=-93°.
// // We want to find the heading, pitch, roll:
// const converter = new DISOrientationConverter();
// const psiThetaPhiDegrees = {Psi: 30, Theta: 10, Phi: 5};
// const lat = 45;
// const lon = -93;
// const hpr = converter.calculateHeadingPitchRollFromPsiThetaPhi(psiThetaPhiDegrees, lat, lon);
// console.log("Heading:", hpr.Heading, "Pitch:", hpr.Pitch, "Roll:", hpr.Roll);
