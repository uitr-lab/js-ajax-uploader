/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://js-ajax-uploader/./node_modules/events/events.js?");

/***/ }),

/***/ "./src/FileDrop.js":
/*!*************************!*\
  !*** ./src/FileDrop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FileDropPageListener\": () => (/* binding */ FileDropPageListener),\n/* harmony export */   \"FileDropTarget\": () => (/* binding */ FileDropTarget)\n/* harmony export */ });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\n\nclass DropTarget{\n\n\tdeepest(validTargets){\n\t\tvalidTargets=validTargets.filter((target)=>{\n\t\t\t/**\n\t\t\t * remove any targets that contain another valid target (only allow deepest nested item)\n\t\t\t */\n\t\t\treturn validTargets.filter((otherTarget)=>{\n\t\t\t\treturn target!==otherTarget&&target.contains(otherTarget);\n\t\t\t}).length==0\n\t\t});\n\n\t\treturn validTargets[0];\n\n\t}\n\n}\n\nclass FileDropPageListener extends events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {\n\n\tconstructor() {\n\t\tsuper();\n\n\n\t\tvar activeTarget=null;\n\t\tvar container=null;\n\n\n\t\tdocument.body.ondragover = (ev) => {\n\t\t\tev.preventDefault();\n\t\t\tconsole.log(ev);\n\n\n\t\t\tvar target=this.getTarget(ev.target);\n\t\t\t\n\n\t\t\tif(!target){\n\n\t\t\t\tif(activeTarget){\n\t\t\t\t\tactiveTarget.classList.remove('drop-target');\n\t\t\t\t\tactiveTarget=null;\n\t\t\t\t}\n\t\t\t\treturn;\n\t\t\t}\n\n\n\t\t\tcontainer=target.getContainer(target);\n\t\t\tif(container!==activeTarget){\n\n\t\t\t\tif(activeTarget){\n\t\t\t\t\tactiveTarget.classList.remove('drop-target');\n\t\t\t\t}\n\n\t\t\t\tactiveTarget=container;\n\t\t\t\tactiveTarget.classList.add('drop-target');\n\t\t\t}\n\t\t\t\n\n\n\t\t};\n\t\tdocument.body.ondragleave = (ev) => {\n\t\t\tconsole.log(ev);\n\t\t};\n\t\tdocument.body.ondrop = (ev) => {\n\t\t\tev.preventDefault();\n\t\t\tvar files = Array.prototype.slice.call(ev.dataTransfer.items, 0).filter((item) =>{\n\t\t\t\treturn item.kind == \"file\";\n\t\t\t}).map((item)=>{\n \n\t\t\t\tif(item.getAsFileSystemHandle){\n\t\t\t\t\treturn item.getAsFileSystemHandle();\n\t\t\t\t}\n\n\t\t\t\t// No support for uploading folders\n\t\t\t\treturn item.getAsFile(); \n\t\t\t});\n\n\t\t\t\n\t\t\t\n\t\t\tthis.uploadFiles(files, ev.target);\n\t\t\t\n\n\n\t\t\tif(activeTarget){\n\t\t\t\tactiveTarget.classList.remove('drop-target');\n\t\t\t\tactiveTarget=null;\n\t\t\t}\n\n\t\t};\n\n\n\t}\n\n\t_resolveFiles(files){\n\t\treturn new Promise((resolve, reject)=>{\n\n\t\t\tif(files[0] instanceof Promise){\n\t\t\t\tPromise.all(files).then((fileHandles)=>{\n\n\t\t\t\t\tvar actualFiles=this._flattenHandles(fileHandles).then((actualFiles)=>{\n\t\t\t\t\t\tif(actualFiles.length>0){\n\t\t\t\t\t\t\tPromise.all(actualFiles.files||actualFiles).then(resolve).catch(reject);\n\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t}\n\t\t\t\t\t})\n\n\t\t\t\t\treturn;\n\n\t\t\t\t\t\n\n\t\t\t\t});\n\n\t\t\t\t\n\t\t\t}else{\n\t\t\t\tresolve(files);\n\t\t\t}\n\n\n\n\t\t})\n\t}\n\n\t_flattenHandles(fileHandles, path){\n\t\tvar actualFiles=[];\n\n\t\tif(fileHandles[0] instanceof Promise){\n\t\t\treturn Promise.all(fileHandles).then((fileHandles)=>{\n\t\t\t\treturn this._flattenHandles(fileHandles, path);\n\t\t\t});\n\t\t}\n\n\t\treturn Promise.all(fileHandles.map((handle, i)=>{\n\t\t\tif(handle.kind==\"file\"){\n\t\t\t\tactualFiles.push(handle.getFile().then((file)=>{\n\n\t\t\t\t\n\t\t\t\t\treturn {\n\t\t\t\t\t\tfile:file,\n\t\t\t\t\t\tpath:path||\"/\"\n\t\t\t\t\t};\n\t\t\t\t\t\n\t\t\t\t}));\n\t\t\t\treturn Promise.resolve(true);\n\t\t\t}\n\n\t\t\tif(handle.kind==\"directory\"){\n\n\t\t\t\n\t\t\t\t\n\t\t\t\treturn this._entries(handle).then((entries)=>{\n\n\t\t\t\t\treturn this._flattenHandles(entries, (path||\"\")+\"/\"+handle.name).then((handles)=>{\n\t\t\t\t\t\tactualFiles=actualFiles.concat(handles);\n\t\t\t\t\t\treturn handles;\n\t\t\t\t\t})\n\t\t\t\t});\n\t\t\t}\n\n\t\t})).then(()=>{\n\t\t\treturn actualFiles;\n\t\t});\n\n\t}\n\n\t_entries(folderHandle){\n\n\t\tvar interator=folderHandle.entries();\n\t\tvar items=[];\n\t\tvar _iterate=(entry)=>{\n\n\t\t\treturn entry.then((item)=>{\n\t\t\t\tif(item.done){\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t\titems.push(item.value[1]);\n\t\t\t\treturn _iterate(interator.next());\n\t\t\t});\n\n\t\t}\n\n\t\treturn _iterate(interator.next()).then(()=>{\n\t\t\treturn items;\n\t\t})\n\t\t\n\t\t\n\t\t\n\t}\n\n\taddTarget(item, callback) {\n\n\n\t\tthis._targets = this._targets || [];\n\t\tthis._callbacks = this._callbacks || [];\n\n\t\tthis._targets.push(item);\n\t\tthis._callbacks.push(callback);\n\n\t}\n\n\n\tgetTarget(target){\n\n\n\n\t\tvar targets = (this._targets || []).filter((t)=>{\n\t\t\treturn t.contains(target);\n\t\t});\n\n\t\tif (targets.length == 1) {\n\t\t\treturn targets[0];\n\t\t}\n\n\n\t\tif (targets.length > 1) {\n\n\n\t\t\tvar containers=targets.map((t)=>{\n\t\t\t\treturn t.getContainer(target);\n\t\t\t});\n\n\t\t\t//TODO select the inner most container;\n\t\t\tvar bestContainer=(new DropTarget()).deepest(containers);\n\t\t\tvar index=containers.indexOf(bestContainer);\n\n\t\t\treturn targets[index];\n\t\t}\n\n\n\t\treturn null;\n\n\t}\n\n\n\tuploadFiles(files, target){\n\n\t\tvar files=Array.prototype.slice.call(files, 0);\n\n\t\tif (files.length > 0) {\n\n\t\t\tthis._resolveFiles(files).then((resolvedFiles)=>{\n\t\t\t\n\n\t\t\t\tvar targets = (this._targets || []).filter((t)=>{\n\t\t\t\t\treturn t.contains(target);\n\t\t\t\t});\n\n\t\t\t\tif (targets.length == 1) {\n\t\t\t\t\tvar callback = this._callbacks[this._targets.indexOf(targets[0])];\n\t\t\t\t\tcallback(resolvedFiles);\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\n\t\t\t\tif (targets.length > 1) {\n\n\n\t\t\t\t\tvar containers=targets.map((t)=>{\n\t\t\t\t\t\treturn t.getContainer(target);\n\t\t\t\t\t});\n\n\t\t\t\t\t//TODO select the inner most container;\n\t\t\t\t\tvar bestContainer=(new DropTarget()).deepest(containers);\n\t\t\t\t\tvar index=containers.indexOf(bestContainer);\n\n\t\t\t\t\tvar callback = this._callbacks[this._targets.indexOf(targets[index])];\n\t\t\t\t\tcallback(resolvedFiles);\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t});\n\n\n\t\t}\n\n\t}\n}\n\nclass FileDropTarget extends events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {\n\n\tstatic FileDropPageListener;\n\n\tconstructor(target, options) {\n\t\tsuper();\n\t\tthis.elementOrSelector = target;\n\t\tthis.options = options\n\n\t\tif (!FileDropTarget.FileDropPageListener) {\n\t\t\tFileDropTarget.FileDropPageListener = new FileDropPageListener();\n\t\t}\n\n\t\tFileDropTarget.FileDropPageListener.addTarget(this, (files) => {\n\n\n\n\t\t\tPromise.all(files.map((fileInfo) => {\n\t\t\t\tconst formData = new FormData();\n\t\t\t\tformData.append(\"the_file\", fileInfo.file||fileInfo);\n\t\t\t\tif (this.options.data) {\n\n\t\t\t\t\tvar data=this.options.data;\n\n\t\t\t\t\tif(typeof data=='function'){\n\t\t\t\t\t\tdata=data(this, fileInfo);\n\t\t\t\t\t}\n\n\t\t\t\t\t//remove references, ensure json compatible\n\t\t\t\t\tvar obj = JSON.parse(JSON.stringify(data));\n\t\t\t\t\tObject.keys(obj).forEach((key) => {\n\t\t\t\t\t\tformData.append(key, obj[key]);\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\tformData.append('submit', '');\n\n\n\t\t\t\treturn fetch(this.options.url, {\n\t\t\t\t\t\tmethod: \"POST\",\n\t\t\t\t\t\tbody: formData,\n\t\t\t\t\t})\n\t\t\t\t\t.then((response) => response.json())\n\t\t\t\t\t.then((result) => {\n\t\t\t\t\t\tconsole.log(\"Success:\", result);\n\t\t\t\t\t})\n\t\t\t\t\t.catch((error) => {\n\t\t\t\t\t\tconsole.error(error);\n\t\t\t\t\t});\n\n\t\t\t})).then((results)=>{\n\t\t\t\tthis.emit('upload', results);\n\t\t\t});\n\n\n\t\t});\n\t}\n\tgetTargets(){\t\n\n\t\n\t\tif(typeof this.elementOrSelector=='string'){\n\n\t\t\treturn Array.prototype.slice.call(document.querySelectorAll(this.elementOrSelector));\n\t\t}\n\n\t\treturn [this.elementOrSelector];\n\t}\t\n\n\tuploadFiles(files, target){\n\t\tFileDropTarget.FileDropPageListener.uploadFiles(files, target||document.body);\n\t}\n\n\tgetContainer(targetEl){\n\t\treturn this._match;\n\t}\n\n\tcontains(targetEl){\n\n\t\tvar matches=this.getTargets().filter((el)=>{\n\t\t\treturn el.contains(targetEl);\n\t\t});\n\n\n\t\tif(matches.length==1){\n\t\t\tthis._match=matches[0];\n\t\t\treturn true;\n\t\t}\n\n\t\tif(matches.length>=1){\n\t\t\t//TODO: select the most inner most element \n\t\t\tthis._match=(new DropTarget()).deepest(matches);\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\n\n\n\t}\n\n}\n\nwindow.FileDropTarget = FileDropTarget;\n\n//# sourceURL=webpack://js-ajax-uploader/./src/FileDrop.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/FileDrop.js");
/******/ 	
/******/ })()
;