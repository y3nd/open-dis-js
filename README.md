# Open DIS for JavaScript / TypeScript

<!-- <span class="badge-npmversion"><a href="https://npmjs.org/package/open-dis" title="View this project on NPM"><img src="https://img.shields.io/npm/v/open-dis.svg" alt="NPM version" /></a></span> -->

## Introduction

A JavaScript implementation of DIS that decodes IEEE 1278.1
binary data format messages and turns them into JavaScript
objects.

This library is intended to be used on the client side with
the WebSocket receiving data. The WebSocket hands off an
event message with binary data attached, and the
library decodes it and turns it into an object.

The code also includes some simple coordinate system transforms
to change DIS world coordinates to (lat, lon, alt) or to a
position in a local tanget plane coordinate system.

## Goal
**The main goal for this project is to build a web viewer for DIS v6 (IEEE Std 1278.1a-1998)**

## Roadmap
- [x] Migrate to modern ESM project structure
- [x] DIS6 ESPDU decoding
- [ ] DIS6 entity removal
- [ ] DIS6 support

**No DIS7 (IEEE Std 1278.1a-2012) support is planned for now.**
**Encoding is not fully supported and might be removed soon**

## Build
```bash
npm run build
```

## Build

## Upgrade dependencies
```bash
npm run upgrade
```

# Release
# Examples

