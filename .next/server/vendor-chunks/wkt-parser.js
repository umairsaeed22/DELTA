"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/wkt-parser";
exports.ids = ["vendor-chunks/wkt-parser"];
exports.modules = {

/***/ "(ssr)/./node_modules/wkt-parser/index.js":
/*!******************************************!*\
  !*** ./node_modules/wkt-parser/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ \"(ssr)/./node_modules/wkt-parser/parser.js\");\n/* harmony import */ var _process__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./process */ \"(ssr)/./node_modules/wkt-parser/process.js\");\nvar D2R = 0.01745329251994329577;\n\n\n\nvar knownTypes = ['PROJECTEDCRS', 'PROJCRS', 'GEOGCS', 'GEOCCS', 'PROJCS', 'LOCAL_CS', 'GEODCRS',\n  'GEODETICCRS', 'GEODETICDATUM', 'ENGCRS', 'ENGINEERINGCRS'];\n\nfunction rename(obj, params) {\n  var outName = params[0];\n  var inName = params[1];\n  if (!(outName in obj) && (inName in obj)) {\n    obj[outName] = obj[inName];\n    if (params.length === 3) {\n      obj[outName] = params[2](obj[outName]);\n    }\n  }\n}\n\nfunction d2r(input) {\n  return input * D2R;\n}\n\nfunction cleanWKT(wkt) {\n  var keys = Object.keys(wkt);\n  for (var i = 0, ii = keys.length; i <ii; ++i) {\n    var key = keys[i];\n    // the followings are the crs defined in\n    // https://github.com/proj4js/proj4js/blob/1da4ed0b865d0fcb51c136090569210cdcc9019e/lib/parseCode.js#L11\n    if (knownTypes.indexOf(key) !== -1) {\n      setPropertiesFromWkt(wkt[key]);\n    }\n    if (typeof wkt[key] === 'object') {\n      cleanWKT(wkt[key]);\n    }\n  }\n}\n\nfunction setPropertiesFromWkt(wkt) {\n  if (wkt.AUTHORITY) {\n    var authority = Object.keys(wkt.AUTHORITY)[0];\n    if (authority && authority in wkt.AUTHORITY) {\n      wkt.title = authority + ':' + wkt.AUTHORITY[authority];\n    }\n  }\n  if (wkt.type === 'GEOGCS') {\n    wkt.projName = 'longlat';\n  } else if (wkt.type === 'LOCAL_CS') {\n    wkt.projName = 'identity';\n    wkt.local = true;\n  } else {\n    if (typeof wkt.PROJECTION === 'object') {\n      wkt.projName = Object.keys(wkt.PROJECTION)[0];\n    } else {\n      wkt.projName = wkt.PROJECTION;\n    }\n  }\n  if (wkt.AXIS) {\n    var axisOrder = '';\n    for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {\n      var axis = [wkt.AXIS[i][0].toLowerCase(), wkt.AXIS[i][1].toLowerCase()];\n      if (axis[0].indexOf('north') !== -1 || ((axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'north')) {\n        axisOrder += 'n';\n      } else if (axis[0].indexOf('south') !== -1 || ((axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'south')) {\n        axisOrder += 's';\n      } else if (axis[0].indexOf('east') !== -1 || ((axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'east')) {\n        axisOrder += 'e';\n      } else if (axis[0].indexOf('west') !== -1 || ((axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'west')) {\n        axisOrder += 'w';\n      }\n    }\n    if (axisOrder.length === 2) {\n      axisOrder += 'u';\n    }\n    if (axisOrder.length === 3) {\n      wkt.axis = axisOrder;\n    }\n  }\n  if (wkt.UNIT) {\n    wkt.units = wkt.UNIT.name.toLowerCase();\n    if (wkt.units === 'metre') {\n      wkt.units = 'meter';\n    }\n    if (wkt.UNIT.convert) {\n      if (wkt.type === 'GEOGCS') {\n        if (wkt.DATUM && wkt.DATUM.SPHEROID) {\n          wkt.to_meter = wkt.UNIT.convert*wkt.DATUM.SPHEROID.a;\n        }\n      } else {\n        wkt.to_meter = wkt.UNIT.convert;\n      }\n    }\n  }\n  var geogcs = wkt.GEOGCS;\n  if (wkt.type === 'GEOGCS') {\n    geogcs = wkt;\n  }\n  if (geogcs) {\n    //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){\n    //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;\n    //}\n    if (geogcs.DATUM) {\n      wkt.datumCode = geogcs.DATUM.name.toLowerCase();\n    } else {\n      wkt.datumCode = geogcs.name.toLowerCase();\n    }\n    if (wkt.datumCode.slice(0, 2) === 'd_') {\n      wkt.datumCode = wkt.datumCode.slice(2);\n    }\n    if (wkt.datumCode === 'new_zealand_1949') {\n      wkt.datumCode = 'nzgd49';\n    }\n    if (wkt.datumCode === 'wgs_1984' || wkt.datumCode === 'world_geodetic_system_1984') {\n      if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {\n        wkt.sphere = true;\n      }\n      wkt.datumCode = 'wgs84';\n    }\n    if (wkt.datumCode === 'belge_1972') {\n      wkt.datumCode = 'rnb72';\n    }\n    if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {\n      wkt.ellps = geogcs.DATUM.SPHEROID.name.replace('_19', '').replace(/[Cc]larke\\_18/, 'clrk');\n      if (wkt.ellps.toLowerCase().slice(0, 13) === 'international') {\n        wkt.ellps = 'intl';\n      }\n\n      wkt.a = geogcs.DATUM.SPHEROID.a;\n      wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);\n    }\n\n    if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {\n      wkt.datum_params = geogcs.DATUM.TOWGS84;\n    }\n    if (~wkt.datumCode.indexOf('osgb_1936')) {\n      wkt.datumCode = 'osgb36';\n    }\n    if (~wkt.datumCode.indexOf('osni_1952')) {\n      wkt.datumCode = 'osni52';\n    }\n    if (~wkt.datumCode.indexOf('tm65')\n      || ~wkt.datumCode.indexOf('geodetic_datum_of_1965')) {\n      wkt.datumCode = 'ire65';\n    }\n    if (wkt.datumCode === 'ch1903+') {\n      wkt.datumCode = 'ch1903';\n    }\n    if (~wkt.datumCode.indexOf('israel')) {\n      wkt.datumCode = 'isr93';\n    }\n  }\n  if (wkt.b && !isFinite(wkt.b)) {\n    wkt.b = wkt.a;\n  }\n\n  function toMeter(input) {\n    var ratio = wkt.to_meter || 1;\n    return input * ratio;\n  }\n  var renamer = function(a) {\n    return rename(wkt, a);\n  };\n  var list = [\n    ['standard_parallel_1', 'Standard_Parallel_1'],\n    ['standard_parallel_1', 'Latitude of 1st standard parallel'],\n    ['standard_parallel_2', 'Standard_Parallel_2'],\n    ['standard_parallel_2', 'Latitude of 2nd standard parallel'],\n    ['false_easting', 'False_Easting'],\n    ['false_easting', 'False easting'],\n    ['false-easting', 'Easting at false origin'],\n    ['false_northing', 'False_Northing'],\n    ['false_northing', 'False northing'],\n    ['false_northing', 'Northing at false origin'],\n    ['central_meridian', 'Central_Meridian'],\n    ['central_meridian', 'Longitude of natural origin'],\n    ['central_meridian', 'Longitude of false origin'],\n    ['latitude_of_origin', 'Latitude_Of_Origin'],\n    ['latitude_of_origin', 'Central_Parallel'],\n    ['latitude_of_origin', 'Latitude of natural origin'],\n    ['latitude_of_origin', 'Latitude of false origin'],\n    ['scale_factor', 'Scale_Factor'],\n    ['k0', 'scale_factor'],\n    ['latitude_of_center', 'Latitude_Of_Center'],\n    ['latitude_of_center', 'Latitude_of_center'],\n    ['lat0', 'latitude_of_center', d2r],\n    ['longitude_of_center', 'Longitude_Of_Center'],\n    ['longitude_of_center', 'Longitude_of_center'],\n    ['longc', 'longitude_of_center', d2r],\n    ['x0', 'false_easting', toMeter],\n    ['y0', 'false_northing', toMeter],\n    ['long0', 'central_meridian', d2r],\n    ['lat0', 'latitude_of_origin', d2r],\n    ['lat0', 'standard_parallel_1', d2r],\n    ['lat1', 'standard_parallel_1', d2r],\n    ['lat2', 'standard_parallel_2', d2r],\n    ['azimuth', 'Azimuth'],\n    ['alpha', 'azimuth', d2r],\n    ['srsCode', 'name']\n  ];\n  list.forEach(renamer);\n  if (!wkt.long0 && wkt.longc && (wkt.projName === 'Albers_Conic_Equal_Area' || wkt.projName === 'Lambert_Azimuthal_Equal_Area')) {\n    wkt.long0 = wkt.longc;\n  }\n  if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === 'Stereographic_South_Pole' || wkt.projName === 'Polar Stereographic (variant B)')) {\n    wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);\n    wkt.lat_ts = wkt.lat1;\n  } else if (!wkt.lat_ts && wkt.lat0 && wkt.projName === 'Polar_Stereographic') {\n    wkt.lat_ts = wkt.lat0;\n    wkt.lat0 = d2r(wkt.lat0 > 0 ? 90 : -90);\n  }\n}\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(wkt) {\n  var lisp = (0,_parser__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(wkt);\n  var type = lisp[0];\n  var obj = {};\n  (0,_process__WEBPACK_IMPORTED_MODULE_1__.sExpr)(lisp, obj);\n  cleanWKT(obj);\n  return obj[type];\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2t0LXBhcnNlci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUM4QjtBQUNFOztBQUVoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DLE9BQU87QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsUUFBUTtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFlLG9DQUFTO0FBQ3hCLGFBQWEsbURBQU07QUFDbkI7QUFDQTtBQUNBLEVBQUUsK0NBQUs7QUFDUDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcTGVub3ZvXFxEZXNrdG9wXFxmaW5hbFxcbm9kZV9tb2R1bGVzXFx3a3QtcGFyc2VyXFxpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgRDJSID0gMC4wMTc0NTMyOTI1MTk5NDMyOTU3NztcbmltcG9ydCBwYXJzZXIgZnJvbSAnLi9wYXJzZXInO1xuaW1wb3J0IHtzRXhwcn0gZnJvbSAnLi9wcm9jZXNzJztcblxudmFyIGtub3duVHlwZXMgPSBbJ1BST0pFQ1RFRENSUycsICdQUk9KQ1JTJywgJ0dFT0dDUycsICdHRU9DQ1MnLCAnUFJPSkNTJywgJ0xPQ0FMX0NTJywgJ0dFT0RDUlMnLFxuICAnR0VPREVUSUNDUlMnLCAnR0VPREVUSUNEQVRVTScsICdFTkdDUlMnLCAnRU5HSU5FRVJJTkdDUlMnXTtcblxuZnVuY3Rpb24gcmVuYW1lKG9iaiwgcGFyYW1zKSB7XG4gIHZhciBvdXROYW1lID0gcGFyYW1zWzBdO1xuICB2YXIgaW5OYW1lID0gcGFyYW1zWzFdO1xuICBpZiAoIShvdXROYW1lIGluIG9iaikgJiYgKGluTmFtZSBpbiBvYmopKSB7XG4gICAgb2JqW291dE5hbWVdID0gb2JqW2luTmFtZV07XG4gICAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDMpIHtcbiAgICAgIG9ialtvdXROYW1lXSA9IHBhcmFtc1syXShvYmpbb3V0TmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkMnIoaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0ICogRDJSO1xufVxuXG5mdW5jdGlvbiBjbGVhbldLVCh3a3QpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh3a3QpO1xuICBmb3IgKHZhciBpID0gMCwgaWkgPSBrZXlzLmxlbmd0aDsgaSA8aWk7ICsraSkge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIC8vIHRoZSBmb2xsb3dpbmdzIGFyZSB0aGUgY3JzIGRlZmluZWQgaW5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcHJvajRqcy9wcm9qNGpzL2Jsb2IvMWRhNGVkMGI4NjVkMGZjYjUxYzEzNjA5MDU2OTIxMGNkY2M5MDE5ZS9saWIvcGFyc2VDb2RlLmpzI0wxMVxuICAgIGlmIChrbm93blR5cGVzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgIHNldFByb3BlcnRpZXNGcm9tV2t0KHdrdFtrZXldKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB3a3Rba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNsZWFuV0tUKHdrdFtrZXldKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0UHJvcGVydGllc0Zyb21Xa3Qod2t0KSB7XG4gIGlmICh3a3QuQVVUSE9SSVRZKSB7XG4gICAgdmFyIGF1dGhvcml0eSA9IE9iamVjdC5rZXlzKHdrdC5BVVRIT1JJVFkpWzBdO1xuICAgIGlmIChhdXRob3JpdHkgJiYgYXV0aG9yaXR5IGluIHdrdC5BVVRIT1JJVFkpIHtcbiAgICAgIHdrdC50aXRsZSA9IGF1dGhvcml0eSArICc6JyArIHdrdC5BVVRIT1JJVFlbYXV0aG9yaXR5XTtcbiAgICB9XG4gIH1cbiAgaWYgKHdrdC50eXBlID09PSAnR0VPR0NTJykge1xuICAgIHdrdC5wcm9qTmFtZSA9ICdsb25nbGF0JztcbiAgfSBlbHNlIGlmICh3a3QudHlwZSA9PT0gJ0xPQ0FMX0NTJykge1xuICAgIHdrdC5wcm9qTmFtZSA9ICdpZGVudGl0eSc7XG4gICAgd2t0LmxvY2FsID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHdrdC5QUk9KRUNUSU9OID09PSAnb2JqZWN0Jykge1xuICAgICAgd2t0LnByb2pOYW1lID0gT2JqZWN0LmtleXMod2t0LlBST0pFQ1RJT04pWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB3a3QucHJvak5hbWUgPSB3a3QuUFJPSkVDVElPTjtcbiAgICB9XG4gIH1cbiAgaWYgKHdrdC5BWElTKSB7XG4gICAgdmFyIGF4aXNPcmRlciA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwLCBpaSA9IHdrdC5BWElTLmxlbmd0aDsgaSA8IGlpOyArK2kpIHtcbiAgICAgIHZhciBheGlzID0gW3drdC5BWElTW2ldWzBdLnRvTG93ZXJDYXNlKCksIHdrdC5BWElTW2ldWzFdLnRvTG93ZXJDYXNlKCldO1xuICAgICAgaWYgKGF4aXNbMF0uaW5kZXhPZignbm9ydGgnKSAhPT0gLTEgfHwgKChheGlzWzBdID09PSAneScgfHwgYXhpc1swXSA9PT0gJ2xhdCcpICYmIGF4aXNbMV0gPT09ICdub3J0aCcpKSB7XG4gICAgICAgIGF4aXNPcmRlciArPSAnbic7XG4gICAgICB9IGVsc2UgaWYgKGF4aXNbMF0uaW5kZXhPZignc291dGgnKSAhPT0gLTEgfHwgKChheGlzWzBdID09PSAneScgfHwgYXhpc1swXSA9PT0gJ2xhdCcpICYmIGF4aXNbMV0gPT09ICdzb3V0aCcpKSB7XG4gICAgICAgIGF4aXNPcmRlciArPSAncyc7XG4gICAgICB9IGVsc2UgaWYgKGF4aXNbMF0uaW5kZXhPZignZWFzdCcpICE9PSAtMSB8fCAoKGF4aXNbMF0gPT09ICd4JyB8fCBheGlzWzBdID09PSAnbG9uJykgJiYgYXhpc1sxXSA9PT0gJ2Vhc3QnKSkge1xuICAgICAgICBheGlzT3JkZXIgKz0gJ2UnO1xuICAgICAgfSBlbHNlIGlmIChheGlzWzBdLmluZGV4T2YoJ3dlc3QnKSAhPT0gLTEgfHwgKChheGlzWzBdID09PSAneCcgfHwgYXhpc1swXSA9PT0gJ2xvbicpICYmIGF4aXNbMV0gPT09ICd3ZXN0JykpIHtcbiAgICAgICAgYXhpc09yZGVyICs9ICd3JztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGF4aXNPcmRlci5sZW5ndGggPT09IDIpIHtcbiAgICAgIGF4aXNPcmRlciArPSAndSc7XG4gICAgfVxuICAgIGlmIChheGlzT3JkZXIubGVuZ3RoID09PSAzKSB7XG4gICAgICB3a3QuYXhpcyA9IGF4aXNPcmRlcjtcbiAgICB9XG4gIH1cbiAgaWYgKHdrdC5VTklUKSB7XG4gICAgd2t0LnVuaXRzID0gd2t0LlVOSVQubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh3a3QudW5pdHMgPT09ICdtZXRyZScpIHtcbiAgICAgIHdrdC51bml0cyA9ICdtZXRlcic7XG4gICAgfVxuICAgIGlmICh3a3QuVU5JVC5jb252ZXJ0KSB7XG4gICAgICBpZiAod2t0LnR5cGUgPT09ICdHRU9HQ1MnKSB7XG4gICAgICAgIGlmICh3a3QuREFUVU0gJiYgd2t0LkRBVFVNLlNQSEVST0lEKSB7XG4gICAgICAgICAgd2t0LnRvX21ldGVyID0gd2t0LlVOSVQuY29udmVydCp3a3QuREFUVU0uU1BIRVJPSUQuYTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2t0LnRvX21ldGVyID0gd2t0LlVOSVQuY29udmVydDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFyIGdlb2djcyA9IHdrdC5HRU9HQ1M7XG4gIGlmICh3a3QudHlwZSA9PT0gJ0dFT0dDUycpIHtcbiAgICBnZW9nY3MgPSB3a3Q7XG4gIH1cbiAgaWYgKGdlb2djcykge1xuICAgIC8vaWYod2t0LkdFT0dDUy5QUklNRU0mJndrdC5HRU9HQ1MuUFJJTUVNLmNvbnZlcnQpe1xuICAgIC8vICB3a3QuZnJvbV9ncmVlbndpY2g9d2t0LkdFT0dDUy5QUklNRU0uY29udmVydCpEMlI7XG4gICAgLy99XG4gICAgaWYgKGdlb2djcy5EQVRVTSkge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9IGdlb2djcy5EQVRVTS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSBnZW9nY3MubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAod2t0LmRhdHVtQ29kZS5zbGljZSgwLCAyKSA9PT0gJ2RfJykge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9IHdrdC5kYXR1bUNvZGUuc2xpY2UoMik7XG4gICAgfVxuICAgIGlmICh3a3QuZGF0dW1Db2RlID09PSAnbmV3X3plYWxhbmRfMTk0OScpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAnbnpnZDQ5JztcbiAgICB9XG4gICAgaWYgKHdrdC5kYXR1bUNvZGUgPT09ICd3Z3NfMTk4NCcgfHwgd2t0LmRhdHVtQ29kZSA9PT0gJ3dvcmxkX2dlb2RldGljX3N5c3RlbV8xOTg0Jykge1xuICAgICAgaWYgKHdrdC5QUk9KRUNUSU9OID09PSAnTWVyY2F0b3JfQXV4aWxpYXJ5X1NwaGVyZScpIHtcbiAgICAgICAgd2t0LnNwaGVyZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ3dnczg0JztcbiAgICB9XG4gICAgaWYgKHdrdC5kYXR1bUNvZGUgPT09ICdiZWxnZV8xOTcyJykge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9ICdybmI3Mic7XG4gICAgfVxuICAgIGlmIChnZW9nY3MuREFUVU0gJiYgZ2VvZ2NzLkRBVFVNLlNQSEVST0lEKSB7XG4gICAgICB3a3QuZWxscHMgPSBnZW9nY3MuREFUVU0uU1BIRVJPSUQubmFtZS5yZXBsYWNlKCdfMTknLCAnJykucmVwbGFjZSgvW0NjXWxhcmtlXFxfMTgvLCAnY2xyaycpO1xuICAgICAgaWYgKHdrdC5lbGxwcy50b0xvd2VyQ2FzZSgpLnNsaWNlKDAsIDEzKSA9PT0gJ2ludGVybmF0aW9uYWwnKSB7XG4gICAgICAgIHdrdC5lbGxwcyA9ICdpbnRsJztcbiAgICAgIH1cblxuICAgICAgd2t0LmEgPSBnZW9nY3MuREFUVU0uU1BIRVJPSUQuYTtcbiAgICAgIHdrdC5yZiA9IHBhcnNlRmxvYXQoZ2VvZ2NzLkRBVFVNLlNQSEVST0lELnJmLCAxMCk7XG4gICAgfVxuXG4gICAgaWYgKGdlb2djcy5EQVRVTSAmJiBnZW9nY3MuREFUVU0uVE9XR1M4NCkge1xuICAgICAgd2t0LmRhdHVtX3BhcmFtcyA9IGdlb2djcy5EQVRVTS5UT1dHUzg0O1xuICAgIH1cbiAgICBpZiAofndrdC5kYXR1bUNvZGUuaW5kZXhPZignb3NnYl8xOTM2JykpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAnb3NnYjM2JztcbiAgICB9XG4gICAgaWYgKH53a3QuZGF0dW1Db2RlLmluZGV4T2YoJ29zbmlfMTk1MicpKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ29zbmk1Mic7XG4gICAgfVxuICAgIGlmICh+d2t0LmRhdHVtQ29kZS5pbmRleE9mKCd0bTY1JylcbiAgICAgIHx8IH53a3QuZGF0dW1Db2RlLmluZGV4T2YoJ2dlb2RldGljX2RhdHVtX29mXzE5NjUnKSkge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9ICdpcmU2NSc7XG4gICAgfVxuICAgIGlmICh3a3QuZGF0dW1Db2RlID09PSAnY2gxOTAzKycpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAnY2gxOTAzJztcbiAgICB9XG4gICAgaWYgKH53a3QuZGF0dW1Db2RlLmluZGV4T2YoJ2lzcmFlbCcpKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ2lzcjkzJztcbiAgICB9XG4gIH1cbiAgaWYgKHdrdC5iICYmICFpc0Zpbml0ZSh3a3QuYikpIHtcbiAgICB3a3QuYiA9IHdrdC5hO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9NZXRlcihpbnB1dCkge1xuICAgIHZhciByYXRpbyA9IHdrdC50b19tZXRlciB8fCAxO1xuICAgIHJldHVybiBpbnB1dCAqIHJhdGlvO1xuICB9XG4gIHZhciByZW5hbWVyID0gZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiByZW5hbWUod2t0LCBhKTtcbiAgfTtcbiAgdmFyIGxpc3QgPSBbXG4gICAgWydzdGFuZGFyZF9wYXJhbGxlbF8xJywgJ1N0YW5kYXJkX1BhcmFsbGVsXzEnXSxcbiAgICBbJ3N0YW5kYXJkX3BhcmFsbGVsXzEnLCAnTGF0aXR1ZGUgb2YgMXN0IHN0YW5kYXJkIHBhcmFsbGVsJ10sXG4gICAgWydzdGFuZGFyZF9wYXJhbGxlbF8yJywgJ1N0YW5kYXJkX1BhcmFsbGVsXzInXSxcbiAgICBbJ3N0YW5kYXJkX3BhcmFsbGVsXzInLCAnTGF0aXR1ZGUgb2YgMm5kIHN0YW5kYXJkIHBhcmFsbGVsJ10sXG4gICAgWydmYWxzZV9lYXN0aW5nJywgJ0ZhbHNlX0Vhc3RpbmcnXSxcbiAgICBbJ2ZhbHNlX2Vhc3RpbmcnLCAnRmFsc2UgZWFzdGluZyddLFxuICAgIFsnZmFsc2UtZWFzdGluZycsICdFYXN0aW5nIGF0IGZhbHNlIG9yaWdpbiddLFxuICAgIFsnZmFsc2Vfbm9ydGhpbmcnLCAnRmFsc2VfTm9ydGhpbmcnXSxcbiAgICBbJ2ZhbHNlX25vcnRoaW5nJywgJ0ZhbHNlIG5vcnRoaW5nJ10sXG4gICAgWydmYWxzZV9ub3J0aGluZycsICdOb3J0aGluZyBhdCBmYWxzZSBvcmlnaW4nXSxcbiAgICBbJ2NlbnRyYWxfbWVyaWRpYW4nLCAnQ2VudHJhbF9NZXJpZGlhbiddLFxuICAgIFsnY2VudHJhbF9tZXJpZGlhbicsICdMb25naXR1ZGUgb2YgbmF0dXJhbCBvcmlnaW4nXSxcbiAgICBbJ2NlbnRyYWxfbWVyaWRpYW4nLCAnTG9uZ2l0dWRlIG9mIGZhbHNlIG9yaWdpbiddLFxuICAgIFsnbGF0aXR1ZGVfb2Zfb3JpZ2luJywgJ0xhdGl0dWRlX09mX09yaWdpbiddLFxuICAgIFsnbGF0aXR1ZGVfb2Zfb3JpZ2luJywgJ0NlbnRyYWxfUGFyYWxsZWwnXSxcbiAgICBbJ2xhdGl0dWRlX29mX29yaWdpbicsICdMYXRpdHVkZSBvZiBuYXR1cmFsIG9yaWdpbiddLFxuICAgIFsnbGF0aXR1ZGVfb2Zfb3JpZ2luJywgJ0xhdGl0dWRlIG9mIGZhbHNlIG9yaWdpbiddLFxuICAgIFsnc2NhbGVfZmFjdG9yJywgJ1NjYWxlX0ZhY3RvciddLFxuICAgIFsnazAnLCAnc2NhbGVfZmFjdG9yJ10sXG4gICAgWydsYXRpdHVkZV9vZl9jZW50ZXInLCAnTGF0aXR1ZGVfT2ZfQ2VudGVyJ10sXG4gICAgWydsYXRpdHVkZV9vZl9jZW50ZXInLCAnTGF0aXR1ZGVfb2ZfY2VudGVyJ10sXG4gICAgWydsYXQwJywgJ2xhdGl0dWRlX29mX2NlbnRlcicsIGQycl0sXG4gICAgWydsb25naXR1ZGVfb2ZfY2VudGVyJywgJ0xvbmdpdHVkZV9PZl9DZW50ZXInXSxcbiAgICBbJ2xvbmdpdHVkZV9vZl9jZW50ZXInLCAnTG9uZ2l0dWRlX29mX2NlbnRlciddLFxuICAgIFsnbG9uZ2MnLCAnbG9uZ2l0dWRlX29mX2NlbnRlcicsIGQycl0sXG4gICAgWyd4MCcsICdmYWxzZV9lYXN0aW5nJywgdG9NZXRlcl0sXG4gICAgWyd5MCcsICdmYWxzZV9ub3J0aGluZycsIHRvTWV0ZXJdLFxuICAgIFsnbG9uZzAnLCAnY2VudHJhbF9tZXJpZGlhbicsIGQycl0sXG4gICAgWydsYXQwJywgJ2xhdGl0dWRlX29mX29yaWdpbicsIGQycl0sXG4gICAgWydsYXQwJywgJ3N0YW5kYXJkX3BhcmFsbGVsXzEnLCBkMnJdLFxuICAgIFsnbGF0MScsICdzdGFuZGFyZF9wYXJhbGxlbF8xJywgZDJyXSxcbiAgICBbJ2xhdDInLCAnc3RhbmRhcmRfcGFyYWxsZWxfMicsIGQycl0sXG4gICAgWydhemltdXRoJywgJ0F6aW11dGgnXSxcbiAgICBbJ2FscGhhJywgJ2F6aW11dGgnLCBkMnJdLFxuICAgIFsnc3JzQ29kZScsICduYW1lJ11cbiAgXTtcbiAgbGlzdC5mb3JFYWNoKHJlbmFtZXIpO1xuICBpZiAoIXdrdC5sb25nMCAmJiB3a3QubG9uZ2MgJiYgKHdrdC5wcm9qTmFtZSA9PT0gJ0FsYmVyc19Db25pY19FcXVhbF9BcmVhJyB8fCB3a3QucHJvak5hbWUgPT09ICdMYW1iZXJ0X0F6aW11dGhhbF9FcXVhbF9BcmVhJykpIHtcbiAgICB3a3QubG9uZzAgPSB3a3QubG9uZ2M7XG4gIH1cbiAgaWYgKCF3a3QubGF0X3RzICYmIHdrdC5sYXQxICYmICh3a3QucHJvak5hbWUgPT09ICdTdGVyZW9ncmFwaGljX1NvdXRoX1BvbGUnIHx8IHdrdC5wcm9qTmFtZSA9PT0gJ1BvbGFyIFN0ZXJlb2dyYXBoaWMgKHZhcmlhbnQgQiknKSkge1xuICAgIHdrdC5sYXQwID0gZDJyKHdrdC5sYXQxID4gMCA/IDkwIDogLTkwKTtcbiAgICB3a3QubGF0X3RzID0gd2t0LmxhdDE7XG4gIH0gZWxzZSBpZiAoIXdrdC5sYXRfdHMgJiYgd2t0LmxhdDAgJiYgd2t0LnByb2pOYW1lID09PSAnUG9sYXJfU3RlcmVvZ3JhcGhpYycpIHtcbiAgICB3a3QubGF0X3RzID0gd2t0LmxhdDA7XG4gICAgd2t0LmxhdDAgPSBkMnIod2t0LmxhdDAgPiAwID8gOTAgOiAtOTApO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih3a3QpIHtcbiAgdmFyIGxpc3AgPSBwYXJzZXIod2t0KTtcbiAgdmFyIHR5cGUgPSBsaXNwWzBdO1xuICB2YXIgb2JqID0ge307XG4gIHNFeHByKGxpc3AsIG9iaik7XG4gIGNsZWFuV0tUKG9iaik7XG4gIHJldHVybiBvYmpbdHlwZV07XG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wkt-parser/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wkt-parser/parser.js":
/*!*******************************************!*\
  !*** ./node_modules/wkt-parser/parser.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseString);\n\nvar NEUTRAL = 1;\nvar KEYWORD = 2;\nvar NUMBER = 3;\nvar QUOTED = 4;\nvar AFTERQUOTE = 5;\nvar ENDED = -1;\nvar whitespace = /\\s/;\nvar latin = /[A-Za-z]/;\nvar keyword = /[A-Za-z84_]/;\nvar endThings = /[,\\]]/;\nvar digets = /[\\d\\.E\\-\\+]/;\n// const ignoredChar = /[\\s_\\-\\/\\(\\)]/g;\nfunction Parser(text) {\n  if (typeof text !== 'string') {\n    throw new Error('not a string');\n  }\n  this.text = text.trim();\n  this.level = 0;\n  this.place = 0;\n  this.root = null;\n  this.stack = [];\n  this.currentObject = null;\n  this.state = NEUTRAL;\n}\nParser.prototype.readCharicter = function() {\n  var char = this.text[this.place++];\n  if (this.state !== QUOTED) {\n    while (whitespace.test(char)) {\n      if (this.place >= this.text.length) {\n        return;\n      }\n      char = this.text[this.place++];\n    }\n  }\n  switch (this.state) {\n    case NEUTRAL:\n      return this.neutral(char);\n    case KEYWORD:\n      return this.keyword(char)\n    case QUOTED:\n      return this.quoted(char);\n    case AFTERQUOTE:\n      return this.afterquote(char);\n    case NUMBER:\n      return this.number(char);\n    case ENDED:\n      return;\n  }\n};\nParser.prototype.afterquote = function(char) {\n  if (char === '\"') {\n    this.word += '\"';\n    this.state = QUOTED;\n    return;\n  }\n  if (endThings.test(char)) {\n    this.word = this.word.trim();\n    this.afterItem(char);\n    return;\n  }\n  throw new Error('havn\\'t handled \"' +char + '\" in afterquote yet, index ' + this.place);\n};\nParser.prototype.afterItem = function(char) {\n  if (char === ',') {\n    if (this.word !== null) {\n      this.currentObject.push(this.word);\n    }\n    this.word = null;\n    this.state = NEUTRAL;\n    return;\n  }\n  if (char === ']') {\n    this.level--;\n    if (this.word !== null) {\n      this.currentObject.push(this.word);\n      this.word = null;\n    }\n    this.state = NEUTRAL;\n    this.currentObject = this.stack.pop();\n    if (!this.currentObject) {\n      this.state = ENDED;\n    }\n\n    return;\n  }\n};\nParser.prototype.number = function(char) {\n  if (digets.test(char)) {\n    this.word += char;\n    return;\n  }\n  if (endThings.test(char)) {\n    this.word = parseFloat(this.word);\n    this.afterItem(char);\n    return;\n  }\n  throw new Error('havn\\'t handled \"' +char + '\" in number yet, index ' + this.place);\n};\nParser.prototype.quoted = function(char) {\n  if (char === '\"') {\n    this.state = AFTERQUOTE;\n    return;\n  }\n  this.word += char;\n  return;\n};\nParser.prototype.keyword = function(char) {\n  if (keyword.test(char)) {\n    this.word += char;\n    return;\n  }\n  if (char === '[') {\n    var newObjects = [];\n    newObjects.push(this.word);\n    this.level++;\n    if (this.root === null) {\n      this.root = newObjects;\n    } else {\n      this.currentObject.push(newObjects);\n    }\n    this.stack.push(this.currentObject);\n    this.currentObject = newObjects;\n    this.state = NEUTRAL;\n    return;\n  }\n  if (endThings.test(char)) {\n    this.afterItem(char);\n    return;\n  }\n  throw new Error('havn\\'t handled \"' +char + '\" in keyword yet, index ' + this.place);\n};\nParser.prototype.neutral = function(char) {\n  if (latin.test(char)) {\n    this.word = char;\n    this.state = KEYWORD;\n    return;\n  }\n  if (char === '\"') {\n    this.word = '';\n    this.state = QUOTED;\n    return;\n  }\n  if (digets.test(char)) {\n    this.word = char;\n    this.state = NUMBER;\n    return;\n  }\n  if (endThings.test(char)) {\n    this.afterItem(char);\n    return;\n  }\n  throw new Error('havn\\'t handled \"' +char + '\" in neutral yet, index ' + this.place);\n};\nParser.prototype.output = function() {\n  while (this.place < this.text.length) {\n    this.readCharicter();\n  }\n  if (this.state === ENDED) {\n    return this.root;\n  }\n  throw new Error('unable to parse string \"' +this.text + '\". State is ' + this.state);\n};\n\nfunction parseString(txt) {\n  var parser = new Parser(txt);\n  return parser.output();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2t0LXBhcnNlci9wYXJzZXIuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGlFQUFlLFdBQVcsRUFBQzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxMZW5vdm9cXERlc2t0b3BcXGZpbmFsXFxub2RlX21vZHVsZXNcXHdrdC1wYXJzZXJcXHBhcnNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBwYXJzZVN0cmluZztcblxudmFyIE5FVVRSQUwgPSAxO1xudmFyIEtFWVdPUkQgPSAyO1xudmFyIE5VTUJFUiA9IDM7XG52YXIgUVVPVEVEID0gNDtcbnZhciBBRlRFUlFVT1RFID0gNTtcbnZhciBFTkRFRCA9IC0xO1xudmFyIHdoaXRlc3BhY2UgPSAvXFxzLztcbnZhciBsYXRpbiA9IC9bQS1aYS16XS87XG52YXIga2V5d29yZCA9IC9bQS1aYS16ODRfXS87XG52YXIgZW5kVGhpbmdzID0gL1ssXFxdXS87XG52YXIgZGlnZXRzID0gL1tcXGRcXC5FXFwtXFwrXS87XG4vLyBjb25zdCBpZ25vcmVkQ2hhciA9IC9bXFxzX1xcLVxcL1xcKFxcKV0vZztcbmZ1bmN0aW9uIFBhcnNlcih0ZXh0KSB7XG4gIGlmICh0eXBlb2YgdGV4dCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBhIHN0cmluZycpO1xuICB9XG4gIHRoaXMudGV4dCA9IHRleHQudHJpbSgpO1xuICB0aGlzLmxldmVsID0gMDtcbiAgdGhpcy5wbGFjZSA9IDA7XG4gIHRoaXMucm9vdCA9IG51bGw7XG4gIHRoaXMuc3RhY2sgPSBbXTtcbiAgdGhpcy5jdXJyZW50T2JqZWN0ID0gbnVsbDtcbiAgdGhpcy5zdGF0ZSA9IE5FVVRSQUw7XG59XG5QYXJzZXIucHJvdG90eXBlLnJlYWRDaGFyaWN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNoYXIgPSB0aGlzLnRleHRbdGhpcy5wbGFjZSsrXTtcbiAgaWYgKHRoaXMuc3RhdGUgIT09IFFVT1RFRCkge1xuICAgIHdoaWxlICh3aGl0ZXNwYWNlLnRlc3QoY2hhcikpIHtcbiAgICAgIGlmICh0aGlzLnBsYWNlID49IHRoaXMudGV4dC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY2hhciA9IHRoaXMudGV4dFt0aGlzLnBsYWNlKytdO1xuICAgIH1cbiAgfVxuICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICBjYXNlIE5FVVRSQUw6XG4gICAgICByZXR1cm4gdGhpcy5uZXV0cmFsKGNoYXIpO1xuICAgIGNhc2UgS0VZV09SRDpcbiAgICAgIHJldHVybiB0aGlzLmtleXdvcmQoY2hhcilcbiAgICBjYXNlIFFVT1RFRDpcbiAgICAgIHJldHVybiB0aGlzLnF1b3RlZChjaGFyKTtcbiAgICBjYXNlIEFGVEVSUVVPVEU6XG4gICAgICByZXR1cm4gdGhpcy5hZnRlcnF1b3RlKGNoYXIpO1xuICAgIGNhc2UgTlVNQkVSOlxuICAgICAgcmV0dXJuIHRoaXMubnVtYmVyKGNoYXIpO1xuICAgIGNhc2UgRU5ERUQ6XG4gICAgICByZXR1cm47XG4gIH1cbn07XG5QYXJzZXIucHJvdG90eXBlLmFmdGVycXVvdGUgPSBmdW5jdGlvbihjaGFyKSB7XG4gIGlmIChjaGFyID09PSAnXCInKSB7XG4gICAgdGhpcy53b3JkICs9ICdcIic7XG4gICAgdGhpcy5zdGF0ZSA9IFFVT1RFRDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVuZFRoaW5ncy50ZXN0KGNoYXIpKSB7XG4gICAgdGhpcy53b3JkID0gdGhpcy53b3JkLnRyaW0oKTtcbiAgICB0aGlzLmFmdGVySXRlbShjaGFyKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdoYXZuXFwndCBoYW5kbGVkIFwiJyArY2hhciArICdcIiBpbiBhZnRlcnF1b3RlIHlldCwgaW5kZXggJyArIHRoaXMucGxhY2UpO1xufTtcblBhcnNlci5wcm90b3R5cGUuYWZ0ZXJJdGVtID0gZnVuY3Rpb24oY2hhcikge1xuICBpZiAoY2hhciA9PT0gJywnKSB7XG4gICAgaWYgKHRoaXMud29yZCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jdXJyZW50T2JqZWN0LnB1c2godGhpcy53b3JkKTtcbiAgICB9XG4gICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICB0aGlzLnN0YXRlID0gTkVVVFJBTDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNoYXIgPT09ICddJykge1xuICAgIHRoaXMubGV2ZWwtLTtcbiAgICBpZiAodGhpcy53b3JkICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmN1cnJlbnRPYmplY3QucHVzaCh0aGlzLndvcmQpO1xuICAgICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IE5FVVRSQUw7XG4gICAgdGhpcy5jdXJyZW50T2JqZWN0ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICBpZiAoIXRoaXMuY3VycmVudE9iamVjdCkge1xuICAgICAgdGhpcy5zdGF0ZSA9IEVOREVEO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxufTtcblBhcnNlci5wcm90b3R5cGUubnVtYmVyID0gZnVuY3Rpb24oY2hhcikge1xuICBpZiAoZGlnZXRzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgKz0gY2hhcjtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVuZFRoaW5ncy50ZXN0KGNoYXIpKSB7XG4gICAgdGhpcy53b3JkID0gcGFyc2VGbG9hdCh0aGlzLndvcmQpO1xuICAgIHRoaXMuYWZ0ZXJJdGVtKGNoYXIpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ2hhdm5cXCd0IGhhbmRsZWQgXCInICtjaGFyICsgJ1wiIGluIG51bWJlciB5ZXQsIGluZGV4ICcgKyB0aGlzLnBsYWNlKTtcbn07XG5QYXJzZXIucHJvdG90eXBlLnF1b3RlZCA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgaWYgKGNoYXIgPT09ICdcIicpIHtcbiAgICB0aGlzLnN0YXRlID0gQUZURVJRVU9URTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy53b3JkICs9IGNoYXI7XG4gIHJldHVybjtcbn07XG5QYXJzZXIucHJvdG90eXBlLmtleXdvcmQgPSBmdW5jdGlvbihjaGFyKSB7XG4gIGlmIChrZXl3b3JkLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgKz0gY2hhcjtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNoYXIgPT09ICdbJykge1xuICAgIHZhciBuZXdPYmplY3RzID0gW107XG4gICAgbmV3T2JqZWN0cy5wdXNoKHRoaXMud29yZCk7XG4gICAgdGhpcy5sZXZlbCsrO1xuICAgIGlmICh0aGlzLnJvb3QgPT09IG51bGwpIHtcbiAgICAgIHRoaXMucm9vdCA9IG5ld09iamVjdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudE9iamVjdC5wdXNoKG5ld09iamVjdHMpO1xuICAgIH1cbiAgICB0aGlzLnN0YWNrLnB1c2godGhpcy5jdXJyZW50T2JqZWN0KTtcbiAgICB0aGlzLmN1cnJlbnRPYmplY3QgPSBuZXdPYmplY3RzO1xuICAgIHRoaXMuc3RhdGUgPSBORVVUUkFMO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZW5kVGhpbmdzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLmFmdGVySXRlbShjaGFyKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdoYXZuXFwndCBoYW5kbGVkIFwiJyArY2hhciArICdcIiBpbiBrZXl3b3JkIHlldCwgaW5kZXggJyArIHRoaXMucGxhY2UpO1xufTtcblBhcnNlci5wcm90b3R5cGUubmV1dHJhbCA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgaWYgKGxhdGluLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgPSBjaGFyO1xuICAgIHRoaXMuc3RhdGUgPSBLRVlXT1JEO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2hhciA9PT0gJ1wiJykge1xuICAgIHRoaXMud29yZCA9ICcnO1xuICAgIHRoaXMuc3RhdGUgPSBRVU9URUQ7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChkaWdldHMudGVzdChjaGFyKSkge1xuICAgIHRoaXMud29yZCA9IGNoYXI7XG4gICAgdGhpcy5zdGF0ZSA9IE5VTUJFUjtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVuZFRoaW5ncy50ZXN0KGNoYXIpKSB7XG4gICAgdGhpcy5hZnRlckl0ZW0oY2hhcik7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignaGF2blxcJ3QgaGFuZGxlZCBcIicgK2NoYXIgKyAnXCIgaW4gbmV1dHJhbCB5ZXQsIGluZGV4ICcgKyB0aGlzLnBsYWNlKTtcbn07XG5QYXJzZXIucHJvdG90eXBlLm91dHB1dCA9IGZ1bmN0aW9uKCkge1xuICB3aGlsZSAodGhpcy5wbGFjZSA8IHRoaXMudGV4dC5sZW5ndGgpIHtcbiAgICB0aGlzLnJlYWRDaGFyaWN0ZXIoKTtcbiAgfVxuICBpZiAodGhpcy5zdGF0ZSA9PT0gRU5ERUQpIHtcbiAgICByZXR1cm4gdGhpcy5yb290O1xuICB9XG4gIHRocm93IG5ldyBFcnJvcigndW5hYmxlIHRvIHBhcnNlIHN0cmluZyBcIicgK3RoaXMudGV4dCArICdcIi4gU3RhdGUgaXMgJyArIHRoaXMuc3RhdGUpO1xufTtcblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcodHh0KSB7XG4gIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKHR4dCk7XG4gIHJldHVybiBwYXJzZXIub3V0cHV0KCk7XG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wkt-parser/parser.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wkt-parser/process.js":
/*!********************************************!*\
  !*** ./node_modules/wkt-parser/process.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sExpr: () => (/* binding */ sExpr)\n/* harmony export */ });\n\n\nfunction mapit(obj, key, value) {\n  if (Array.isArray(key)) {\n    value.unshift(key);\n    key = null;\n  }\n  var thing = key ? {} : obj;\n\n  var out = value.reduce(function(newObj, item) {\n    sExpr(item, newObj);\n    return newObj\n  }, thing);\n  if (key) {\n    obj[key] = out;\n  }\n}\n\nfunction sExpr(v, obj) {\n  if (!Array.isArray(v)) {\n    obj[v] = true;\n    return;\n  }\n  var key = v.shift();\n  if (key === 'PARAMETER') {\n    key = v.shift();\n  }\n  if (v.length === 1) {\n    if (Array.isArray(v[0])) {\n      obj[key] = {};\n      sExpr(v[0], obj[key]);\n      return;\n    }\n    obj[key] = v[0];\n    return;\n  }\n  if (!v.length) {\n    obj[key] = true;\n    return;\n  }\n  if (key === 'TOWGS84') {\n    obj[key] = v;\n    return;\n  }\n  if (key === 'AXIS') {\n    if (!(key in obj)) {\n      obj[key] = [];\n    }\n    obj[key].push(v);\n    return;\n  }\n  if (!Array.isArray(key)) {\n    obj[key] = {};\n  }\n\n  var i;\n  switch (key) {\n    case 'UNIT':\n    case 'PRIMEM':\n    case 'VERT_DATUM':\n      obj[key] = {\n        name: v[0].toLowerCase(),\n        convert: v[1]\n      };\n      if (v.length === 3) {\n        sExpr(v[2], obj[key]);\n      }\n      return;\n    case 'SPHEROID':\n    case 'ELLIPSOID':\n      obj[key] = {\n        name: v[0],\n        a: v[1],\n        rf: v[2]\n      };\n      if (v.length === 4) {\n        sExpr(v[3], obj[key]);\n      }\n      return;\n    case 'EDATUM':\n    case 'ENGINEERINGDATUM':\n    case 'LOCAL_DATUM':\n    case 'DATUM':\n    case 'VERT_CS':\n    case 'VERTCRS':\n    case 'VERTICALCRS':\n      v[0] = ['name', v[0]];\n      mapit(obj, key, v);\n      return;\n    case 'COMPD_CS':\n    case 'COMPOUNDCRS':\n    case 'FITTED_CS':\n    // the followings are the crs defined in\n    // https://github.com/proj4js/proj4js/blob/1da4ed0b865d0fcb51c136090569210cdcc9019e/lib/parseCode.js#L11\n    case 'PROJECTEDCRS':\n    case 'PROJCRS':\n    case 'GEOGCS':\n    case 'GEOCCS':\n    case 'PROJCS':\n    case 'LOCAL_CS':\n    case 'GEODCRS':\n    case 'GEODETICCRS':\n    case 'GEODETICDATUM':\n    case 'ENGCRS':\n    case 'ENGINEERINGCRS':\n      v[0] = ['name', v[0]];\n      mapit(obj, key, v);\n      obj[key].type = key;\n      return;\n    default:\n      i = -1;\n      while (++i < v.length) {\n        if (!Array.isArray(v[i])) {\n          return sExpr(v, obj[key]);\n        }\n      }\n      return mapit(obj, key, v);\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2t0LXBhcnNlci9wcm9jZXNzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcTGVub3ZvXFxEZXNrdG9wXFxmaW5hbFxcbm9kZV9tb2R1bGVzXFx3a3QtcGFyc2VyXFxwcm9jZXNzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuXG5mdW5jdGlvbiBtYXBpdChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoa2V5KSkge1xuICAgIHZhbHVlLnVuc2hpZnQoa2V5KTtcbiAgICBrZXkgPSBudWxsO1xuICB9XG4gIHZhciB0aGluZyA9IGtleSA/IHt9IDogb2JqO1xuXG4gIHZhciBvdXQgPSB2YWx1ZS5yZWR1Y2UoZnVuY3Rpb24obmV3T2JqLCBpdGVtKSB7XG4gICAgc0V4cHIoaXRlbSwgbmV3T2JqKTtcbiAgICByZXR1cm4gbmV3T2JqXG4gIH0sIHRoaW5nKTtcbiAgaWYgKGtleSkge1xuICAgIG9ialtrZXldID0gb3V0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzRXhwcih2LCBvYmopIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgb2JqW3ZdID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGtleSA9IHYuc2hpZnQoKTtcbiAgaWYgKGtleSA9PT0gJ1BBUkFNRVRFUicpIHtcbiAgICBrZXkgPSB2LnNoaWZ0KCk7XG4gIH1cbiAgaWYgKHYubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodlswXSkpIHtcbiAgICAgIG9ialtrZXldID0ge307XG4gICAgICBzRXhwcih2WzBdLCBvYmpba2V5XSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9ialtrZXldID0gdlswXTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCF2Lmxlbmd0aCkge1xuICAgIG9ialtrZXldID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGtleSA9PT0gJ1RPV0dTODQnKSB7XG4gICAgb2JqW2tleV0gPSB2O1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoa2V5ID09PSAnQVhJUycpIHtcbiAgICBpZiAoIShrZXkgaW4gb2JqKSkge1xuICAgICAgb2JqW2tleV0gPSBbXTtcbiAgICB9XG4gICAgb2JqW2tleV0ucHVzaCh2KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICBvYmpba2V5XSA9IHt9O1xuICB9XG5cbiAgdmFyIGk7XG4gIHN3aXRjaCAoa2V5KSB7XG4gICAgY2FzZSAnVU5JVCc6XG4gICAgY2FzZSAnUFJJTUVNJzpcbiAgICBjYXNlICdWRVJUX0RBVFVNJzpcbiAgICAgIG9ialtrZXldID0ge1xuICAgICAgICBuYW1lOiB2WzBdLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGNvbnZlcnQ6IHZbMV1cbiAgICAgIH07XG4gICAgICBpZiAodi5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgc0V4cHIodlsyXSwgb2JqW2tleV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIGNhc2UgJ1NQSEVST0lEJzpcbiAgICBjYXNlICdFTExJUFNPSUQnOlxuICAgICAgb2JqW2tleV0gPSB7XG4gICAgICAgIG5hbWU6IHZbMF0sXG4gICAgICAgIGE6IHZbMV0sXG4gICAgICAgIHJmOiB2WzJdXG4gICAgICB9O1xuICAgICAgaWYgKHYubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHNFeHByKHZbM10sIG9ialtrZXldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICBjYXNlICdFREFUVU0nOlxuICAgIGNhc2UgJ0VOR0lORUVSSU5HREFUVU0nOlxuICAgIGNhc2UgJ0xPQ0FMX0RBVFVNJzpcbiAgICBjYXNlICdEQVRVTSc6XG4gICAgY2FzZSAnVkVSVF9DUyc6XG4gICAgY2FzZSAnVkVSVENSUyc6XG4gICAgY2FzZSAnVkVSVElDQUxDUlMnOlxuICAgICAgdlswXSA9IFsnbmFtZScsIHZbMF1dO1xuICAgICAgbWFwaXQob2JqLCBrZXksIHYpO1xuICAgICAgcmV0dXJuO1xuICAgIGNhc2UgJ0NPTVBEX0NTJzpcbiAgICBjYXNlICdDT01QT1VORENSUyc6XG4gICAgY2FzZSAnRklUVEVEX0NTJzpcbiAgICAvLyB0aGUgZm9sbG93aW5ncyBhcmUgdGhlIGNycyBkZWZpbmVkIGluXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Byb2o0anMvcHJvajRqcy9ibG9iLzFkYTRlZDBiODY1ZDBmY2I1MWMxMzYwOTA1NjkyMTBjZGNjOTAxOWUvbGliL3BhcnNlQ29kZS5qcyNMMTFcbiAgICBjYXNlICdQUk9KRUNURURDUlMnOlxuICAgIGNhc2UgJ1BST0pDUlMnOlxuICAgIGNhc2UgJ0dFT0dDUyc6XG4gICAgY2FzZSAnR0VPQ0NTJzpcbiAgICBjYXNlICdQUk9KQ1MnOlxuICAgIGNhc2UgJ0xPQ0FMX0NTJzpcbiAgICBjYXNlICdHRU9EQ1JTJzpcbiAgICBjYXNlICdHRU9ERVRJQ0NSUyc6XG4gICAgY2FzZSAnR0VPREVUSUNEQVRVTSc6XG4gICAgY2FzZSAnRU5HQ1JTJzpcbiAgICBjYXNlICdFTkdJTkVFUklOR0NSUyc6XG4gICAgICB2WzBdID0gWyduYW1lJywgdlswXV07XG4gICAgICBtYXBpdChvYmosIGtleSwgdik7XG4gICAgICBvYmpba2V5XS50eXBlID0ga2V5O1xuICAgICAgcmV0dXJuO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpID0gLTE7XG4gICAgICB3aGlsZSAoKytpIDwgdi5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIHNFeHByKHYsIG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1hcGl0KG9iaiwga2V5LCB2KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wkt-parser/process.js\n");

/***/ })

};
;