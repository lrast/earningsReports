function Z0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
function vh(c) {
  if (Object.prototype.hasOwnProperty.call(c, "__esModule")) return c;
  var r = c.default;
  if (typeof r == "function") {
    var h = function g() {
      return this instanceof g ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    h.prototype = r.prototype;
  } else h = {};
  return Object.defineProperty(h, "__esModule", { value: !0 }), Object.keys(c).forEach(function(g) {
    var f = Object.getOwnPropertyDescriptor(c, g);
    Object.defineProperty(h, g, f.get ? f : {
      enumerable: !0,
      get: function() {
        return c[g];
      }
    });
  }), h;
}
var lr = { exports: {} }, hu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Od;
function w0() {
  if (Od) return hu;
  Od = 1;
  var c = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function h(g, f, y) {
    var d = null;
    if (y !== void 0 && (d = "" + y), f.key !== void 0 && (d = "" + f.key), "key" in f) {
      y = {};
      for (var p in f)
        p !== "key" && (y[p] = f[p]);
    } else y = f;
    return f = y.ref, {
      $$typeof: c,
      type: g,
      key: d,
      ref: f !== void 0 ? f : null,
      props: y
    };
  }
  return hu.Fragment = r, hu.jsx = h, hu.jsxs = h, hu;
}
var Ed;
function Li() {
  return Ed || (Ed = 1, lr.exports = w0()), lr.exports;
}
var ee = Li(), nr = { exports: {} }, yu = {}, ar = { exports: {} }, ur = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Md;
function J0() {
  return Md || (Md = 1, (function(c) {
    function r(Y, N) {
      var V = Y.length;
      Y.push(N);
      t: for (; 0 < V; ) {
        var ut = V - 1 >>> 1, ct = Y[ut];
        if (0 < f(ct, N))
          Y[ut] = N, Y[V] = ct, V = ut;
        else break t;
      }
    }
    function h(Y) {
      return Y.length === 0 ? null : Y[0];
    }
    function g(Y) {
      if (Y.length === 0) return null;
      var N = Y[0], V = Y.pop();
      if (V !== N) {
        Y[0] = V;
        t: for (var ut = 0, ct = Y.length, Ot = ct >>> 1; ut < Ot; ) {
          var b = 2 * (ut + 1) - 1, J = Y[b], et = b + 1, lt = Y[et];
          if (0 > f(J, V))
            et < ct && 0 > f(lt, J) ? (Y[ut] = lt, Y[et] = V, ut = et) : (Y[ut] = J, Y[b] = V, ut = b);
          else if (et < ct && 0 > f(lt, V))
            Y[ut] = lt, Y[et] = V, ut = et;
          else break t;
        }
      }
      return N;
    }
    function f(Y, N) {
      var V = Y.sortIndex - N.sortIndex;
      return V !== 0 ? V : Y.id - N.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      c.unstable_now = function() {
        return y.now();
      };
    } else {
      var d = Date, p = d.now();
      c.unstable_now = function() {
        return d.now() - p;
      };
    }
    var s = [], v = [], S = 1, m = null, O = 3, R = !1, M = !1, j = !1, C = !1, L = typeof setTimeout == "function" ? setTimeout : null, q = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function H(Y) {
      for (var N = h(v); N !== null; ) {
        if (N.callback === null) g(v);
        else if (N.startTime <= Y)
          g(v), N.sortIndex = N.expirationTime, r(s, N);
        else break;
        N = h(v);
      }
    }
    function X(Y) {
      if (j = !1, H(Y), !M)
        if (h(s) !== null)
          M = !0, k || (k = !0, W());
        else {
          var N = h(v);
          N !== null && I(X, N.startTime - Y);
        }
    }
    var k = !1, P = -1, tt = 5, F = -1;
    function D() {
      return C ? !0 : !(c.unstable_now() - F < tt);
    }
    function A() {
      if (C = !1, k) {
        var Y = c.unstable_now();
        F = Y;
        var N = !0;
        try {
          t: {
            M = !1, j && (j = !1, q(P), P = -1), R = !0;
            var V = O;
            try {
              e: {
                for (H(Y), m = h(s); m !== null && !(m.expirationTime > Y && D()); ) {
                  var ut = m.callback;
                  if (typeof ut == "function") {
                    m.callback = null, O = m.priorityLevel;
                    var ct = ut(
                      m.expirationTime <= Y
                    );
                    if (Y = c.unstable_now(), typeof ct == "function") {
                      m.callback = ct, H(Y), N = !0;
                      break e;
                    }
                    m === h(s) && g(s), H(Y);
                  } else g(s);
                  m = h(s);
                }
                if (m !== null) N = !0;
                else {
                  var Ot = h(v);
                  Ot !== null && I(
                    X,
                    Ot.startTime - Y
                  ), N = !1;
                }
              }
              break t;
            } finally {
              m = null, O = V, R = !1;
            }
            N = void 0;
          }
        } finally {
          N ? W() : k = !1;
        }
      }
    }
    var W;
    if (typeof z == "function")
      W = function() {
        z(A);
      };
    else if (typeof MessageChannel < "u") {
      var w = new MessageChannel(), Q = w.port2;
      w.port1.onmessage = A, W = function() {
        Q.postMessage(null);
      };
    } else
      W = function() {
        L(A, 0);
      };
    function I(Y, N) {
      P = L(function() {
        Y(c.unstable_now());
      }, N);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(Y) {
      Y.callback = null;
    }, c.unstable_forceFrameRate = function(Y) {
      0 > Y || 125 < Y ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : tt = 0 < Y ? Math.floor(1e3 / Y) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return O;
    }, c.unstable_next = function(Y) {
      switch (O) {
        case 1:
        case 2:
        case 3:
          var N = 3;
          break;
        default:
          N = O;
      }
      var V = O;
      O = N;
      try {
        return Y();
      } finally {
        O = V;
      }
    }, c.unstable_requestPaint = function() {
      C = !0;
    }, c.unstable_runWithPriority = function(Y, N) {
      switch (Y) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Y = 3;
      }
      var V = O;
      O = Y;
      try {
        return N();
      } finally {
        O = V;
      }
    }, c.unstable_scheduleCallback = function(Y, N, V) {
      var ut = c.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? ut + V : ut) : V = ut, Y) {
        case 1:
          var ct = -1;
          break;
        case 2:
          ct = 250;
          break;
        case 5:
          ct = 1073741823;
          break;
        case 4:
          ct = 1e4;
          break;
        default:
          ct = 5e3;
      }
      return ct = V + ct, Y = {
        id: S++,
        callback: N,
        priorityLevel: Y,
        startTime: V,
        expirationTime: ct,
        sortIndex: -1
      }, V > ut ? (Y.sortIndex = V, r(v, Y), h(s) === null && Y === h(v) && (j ? (q(P), P = -1) : j = !0, I(X, V - ut))) : (Y.sortIndex = ct, r(s, Y), M || R || (M = !0, k || (k = !0, W()))), Y;
    }, c.unstable_shouldYield = D, c.unstable_wrapCallback = function(Y) {
      var N = O;
      return function() {
        var V = O;
        O = N;
        try {
          return Y.apply(this, arguments);
        } finally {
          O = V;
        }
      };
    };
  })(ur)), ur;
}
var Ad;
function $0() {
  return Ad || (Ad = 1, ar.exports = J0()), ar.exports;
}
var ir = { exports: {} }, ot = {}, zd;
function W0() {
  if (zd) return ot;
  zd = 1;
  var c = { env: { NODE_ENV: "production" } };
  /**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var r = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), p = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), R = Symbol.iterator;
  function M(b) {
    return b === null || typeof b != "object" ? null : (b = R && b[R] || b["@@iterator"], typeof b == "function" ? b : null);
  }
  var j = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, C = Object.assign, L = {};
  function q(b, J, et) {
    this.props = b, this.context = J, this.refs = L, this.updater = et || j;
  }
  q.prototype.isReactComponent = {}, q.prototype.setState = function(b, J) {
    if (typeof b != "object" && typeof b != "function" && b != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, b, J, "setState");
  }, q.prototype.forceUpdate = function(b) {
    this.updater.enqueueForceUpdate(this, b, "forceUpdate");
  };
  function z() {
  }
  z.prototype = q.prototype;
  function H(b, J, et) {
    this.props = b, this.context = J, this.refs = L, this.updater = et || j;
  }
  var X = H.prototype = new z();
  X.constructor = H, C(X, q.prototype), X.isPureReactComponent = !0;
  var k = Array.isArray;
  function P() {
  }
  var tt = { H: null, A: null, T: null, S: null }, F = Object.prototype.hasOwnProperty;
  function D(b, J, et) {
    var lt = et.ref;
    return {
      $$typeof: r,
      type: b,
      key: J,
      ref: lt !== void 0 ? lt : null,
      props: et
    };
  }
  function A(b, J) {
    return D(b.type, J, b.props);
  }
  function W(b) {
    return typeof b == "object" && b !== null && b.$$typeof === r;
  }
  function w(b) {
    var J = { "=": "=0", ":": "=2" };
    return "$" + b.replace(/[=:]/g, function(et) {
      return J[et];
    });
  }
  var Q = /\/+/g;
  function I(b, J) {
    return typeof b == "object" && b !== null && b.key != null ? w("" + b.key) : J.toString(36);
  }
  function Y(b) {
    switch (b.status) {
      case "fulfilled":
        return b.value;
      case "rejected":
        throw b.reason;
      default:
        switch (typeof b.status == "string" ? b.then(P, P) : (b.status = "pending", b.then(
          function(J) {
            b.status === "pending" && (b.status = "fulfilled", b.value = J);
          },
          function(J) {
            b.status === "pending" && (b.status = "rejected", b.reason = J);
          }
        )), b.status) {
          case "fulfilled":
            return b.value;
          case "rejected":
            throw b.reason;
        }
    }
    throw b;
  }
  function N(b, J, et, lt, ht) {
    var st = typeof b;
    (st === "undefined" || st === "boolean") && (b = null);
    var bt = !1;
    if (b === null) bt = !0;
    else
      switch (st) {
        case "bigint":
        case "string":
        case "number":
          bt = !0;
          break;
        case "object":
          switch (b.$$typeof) {
            case r:
            case h:
              bt = !0;
              break;
            case m:
              return bt = b._init, N(
                bt(b._payload),
                J,
                et,
                lt,
                ht
              );
          }
      }
    if (bt)
      return ht = ht(b), bt = lt === "" ? "." + I(b, 0) : lt, k(ht) ? (et = "", bt != null && (et = bt.replace(Q, "$&/") + "/"), N(ht, J, et, "", function(Rl) {
        return Rl;
      })) : ht != null && (W(ht) && (ht = A(
        ht,
        et + (ht.key == null || b && b.key === ht.key ? "" : ("" + ht.key).replace(
          Q,
          "$&/"
        ) + "/") + bt
      )), J.push(ht)), 1;
    bt = 0;
    var It = lt === "" ? "." : lt + ":";
    if (k(b))
      for (var xt = 0; xt < b.length; xt++)
        lt = b[xt], st = It + I(lt, xt), bt += N(
          lt,
          J,
          et,
          st,
          ht
        );
    else if (xt = M(b), typeof xt == "function")
      for (b = xt.call(b), xt = 0; !(lt = b.next()).done; )
        lt = lt.value, st = It + I(lt, xt++), bt += N(
          lt,
          J,
          et,
          st,
          ht
        );
    else if (st === "object") {
      if (typeof b.then == "function")
        return N(
          Y(b),
          J,
          et,
          lt,
          ht
        );
      throw J = String(b), Error(
        "Objects are not valid as a React child (found: " + (J === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : J) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return bt;
  }
  function V(b, J, et) {
    if (b == null) return b;
    var lt = [], ht = 0;
    return N(b, lt, "", "", function(st) {
      return J.call(et, st, ht++);
    }), lt;
  }
  function ut(b) {
    if (b._status === -1) {
      var J = b._result;
      J = J(), J.then(
        function(et) {
          (b._status === 0 || b._status === -1) && (b._status = 1, b._result = et);
        },
        function(et) {
          (b._status === 0 || b._status === -1) && (b._status = 2, b._result = et);
        }
      ), b._status === -1 && (b._status = 0, b._result = J);
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var ct = typeof reportError == "function" ? reportError : function(b) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var J = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof b == "object" && b !== null && typeof b.message == "string" ? String(b.message) : String(b),
        error: b
      });
      if (!window.dispatchEvent(J)) return;
    } else if (typeof c == "object" && typeof c.emit == "function") {
      c.emit("uncaughtException", b);
      return;
    }
    console.error(b);
  }, Ot = {
    map: V,
    forEach: function(b, J, et) {
      V(
        b,
        function() {
          J.apply(this, arguments);
        },
        et
      );
    },
    count: function(b) {
      var J = 0;
      return V(b, function() {
        J++;
      }), J;
    },
    toArray: function(b) {
      return V(b, function(J) {
        return J;
      }) || [];
    },
    only: function(b) {
      if (!W(b))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return b;
    }
  };
  return ot.Activity = O, ot.Children = Ot, ot.Component = q, ot.Fragment = g, ot.Profiler = y, ot.PureComponent = H, ot.StrictMode = f, ot.Suspense = v, ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = tt, ot.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(b) {
      return tt.H.useMemoCache(b);
    }
  }, ot.cache = function(b) {
    return function() {
      return b.apply(null, arguments);
    };
  }, ot.cacheSignal = function() {
    return null;
  }, ot.cloneElement = function(b, J, et) {
    if (b == null)
      throw Error(
        "The argument must be a React element, but you passed " + b + "."
      );
    var lt = C({}, b.props), ht = b.key;
    if (J != null)
      for (st in J.key !== void 0 && (ht = "" + J.key), J)
        !F.call(J, st) || st === "key" || st === "__self" || st === "__source" || st === "ref" && J.ref === void 0 || (lt[st] = J[st]);
    var st = arguments.length - 2;
    if (st === 1) lt.children = et;
    else if (1 < st) {
      for (var bt = Array(st), It = 0; It < st; It++)
        bt[It] = arguments[It + 2];
      lt.children = bt;
    }
    return D(b.type, ht, lt);
  }, ot.createContext = function(b) {
    return b = {
      $$typeof: p,
      _currentValue: b,
      _currentValue2: b,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, b.Provider = b, b.Consumer = {
      $$typeof: d,
      _context: b
    }, b;
  }, ot.createElement = function(b, J, et) {
    var lt, ht = {}, st = null;
    if (J != null)
      for (lt in J.key !== void 0 && (st = "" + J.key), J)
        F.call(J, lt) && lt !== "key" && lt !== "__self" && lt !== "__source" && (ht[lt] = J[lt]);
    var bt = arguments.length - 2;
    if (bt === 1) ht.children = et;
    else if (1 < bt) {
      for (var It = Array(bt), xt = 0; xt < bt; xt++)
        It[xt] = arguments[xt + 2];
      ht.children = It;
    }
    if (b && b.defaultProps)
      for (lt in bt = b.defaultProps, bt)
        ht[lt] === void 0 && (ht[lt] = bt[lt]);
    return D(b, st, ht);
  }, ot.createRef = function() {
    return { current: null };
  }, ot.forwardRef = function(b) {
    return { $$typeof: s, render: b };
  }, ot.isValidElement = W, ot.lazy = function(b) {
    return {
      $$typeof: m,
      _payload: { _status: -1, _result: b },
      _init: ut
    };
  }, ot.memo = function(b, J) {
    return {
      $$typeof: S,
      type: b,
      compare: J === void 0 ? null : J
    };
  }, ot.startTransition = function(b) {
    var J = tt.T, et = {};
    tt.T = et;
    try {
      var lt = b(), ht = tt.S;
      ht !== null && ht(et, lt), typeof lt == "object" && lt !== null && typeof lt.then == "function" && lt.then(P, ct);
    } catch (st) {
      ct(st);
    } finally {
      J !== null && et.types !== null && (J.types = et.types), tt.T = J;
    }
  }, ot.unstable_useCacheRefresh = function() {
    return tt.H.useCacheRefresh();
  }, ot.use = function(b) {
    return tt.H.use(b);
  }, ot.useActionState = function(b, J, et) {
    return tt.H.useActionState(b, J, et);
  }, ot.useCallback = function(b, J) {
    return tt.H.useCallback(b, J);
  }, ot.useContext = function(b) {
    return tt.H.useContext(b);
  }, ot.useDebugValue = function() {
  }, ot.useDeferredValue = function(b, J) {
    return tt.H.useDeferredValue(b, J);
  }, ot.useEffect = function(b, J) {
    return tt.H.useEffect(b, J);
  }, ot.useEffectEvent = function(b) {
    return tt.H.useEffectEvent(b);
  }, ot.useId = function() {
    return tt.H.useId();
  }, ot.useImperativeHandle = function(b, J, et) {
    return tt.H.useImperativeHandle(b, J, et);
  }, ot.useInsertionEffect = function(b, J) {
    return tt.H.useInsertionEffect(b, J);
  }, ot.useLayoutEffect = function(b, J) {
    return tt.H.useLayoutEffect(b, J);
  }, ot.useMemo = function(b, J) {
    return tt.H.useMemo(b, J);
  }, ot.useOptimistic = function(b, J) {
    return tt.H.useOptimistic(b, J);
  }, ot.useReducer = function(b, J, et) {
    return tt.H.useReducer(b, J, et);
  }, ot.useRef = function(b) {
    return tt.H.useRef(b);
  }, ot.useState = function(b) {
    return tt.H.useState(b);
  }, ot.useSyncExternalStore = function(b, J, et) {
    return tt.H.useSyncExternalStore(
      b,
      J,
      et
    );
  }, ot.useTransition = function() {
    return tt.H.useTransition();
  }, ot.version = "19.2.6", ot;
}
var Td;
function Ft() {
  return Td || (Td = 1, ir.exports = W0()), ir.exports;
}
var cr = { exports: {} }, fe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rd;
function F0() {
  if (Rd) return fe;
  Rd = 1;
  var c = Ft();
  function r(s) {
    var v = "https://react.dev/errors/" + s;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        v += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + s + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function h() {
  }
  var g = {
    d: {
      f: h,
      r: function() {
        throw Error(r(522));
      },
      D: h,
      C: h,
      L: h,
      m: h,
      X: h,
      S: h,
      M: h
    },
    p: 0,
    findDOMNode: null
  }, f = Symbol.for("react.portal");
  function y(s, v, S) {
    var m = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: m == null ? null : "" + m,
      children: s,
      containerInfo: v,
      implementation: S
    };
  }
  var d = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(s, v) {
    if (s === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return fe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = g, fe.createPortal = function(s, v) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(r(299));
    return y(s, v, null, S);
  }, fe.flushSync = function(s) {
    var v = d.T, S = g.p;
    try {
      if (d.T = null, g.p = 2, s) return s();
    } finally {
      d.T = v, g.p = S, g.d.f();
    }
  }, fe.preconnect = function(s, v) {
    typeof s == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, g.d.C(s, v));
  }, fe.prefetchDNS = function(s) {
    typeof s == "string" && g.d.D(s);
  }, fe.preinit = function(s, v) {
    if (typeof s == "string" && v && typeof v.as == "string") {
      var S = v.as, m = p(S, v.crossOrigin), O = typeof v.integrity == "string" ? v.integrity : void 0, R = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      S === "style" ? g.d.S(
        s,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: m,
          integrity: O,
          fetchPriority: R
        }
      ) : S === "script" && g.d.X(s, {
        crossOrigin: m,
        integrity: O,
        fetchPriority: R,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, fe.preinitModule = function(s, v) {
    if (typeof s == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var S = p(
            v.as,
            v.crossOrigin
          );
          g.d.M(s, {
            crossOrigin: S,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && g.d.M(s);
  }, fe.preload = function(s, v) {
    if (typeof s == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var S = v.as, m = p(S, v.crossOrigin);
      g.d.L(s, S, {
        crossOrigin: m,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, fe.preloadModule = function(s, v) {
    if (typeof s == "string")
      if (v) {
        var S = p(v.as, v.crossOrigin);
        g.d.m(s, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: S,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else g.d.m(s);
  }, fe.requestFormReset = function(s) {
    g.d.r(s);
  }, fe.unstable_batchedUpdates = function(s, v) {
    return s(v);
  }, fe.useFormState = function(s, v, S) {
    return d.H.useFormState(s, v, S);
  }, fe.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, fe.version = "19.2.6", fe;
}
var Dd;
function Or() {
  if (Dd) return cr.exports;
  Dd = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), cr.exports = F0(), cr.exports;
}
var jd;
function k0() {
  if (jd) return yu;
  jd = 1;
  var c = { env: { NODE_ENV: "production" } };
  /**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var r = $0(), h = Ft(), g = Or();
  function f(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function y(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
    var e = t, l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (l = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function p(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function s(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function v(t) {
    if (d(t) !== t)
      throw Error(f(188));
  }
  function S(t) {
    var e = t.alternate;
    if (!e) {
      if (e = d(t), e === null) throw Error(f(188));
      return e !== t ? null : t;
    }
    for (var l = t, n = e; ; ) {
      var a = l.return;
      if (a === null) break;
      var u = a.alternate;
      if (u === null) {
        if (n = a.return, n !== null) {
          l = n;
          continue;
        }
        break;
      }
      if (a.child === u.child) {
        for (u = a.child; u; ) {
          if (u === l) return v(a), t;
          if (u === n) return v(a), e;
          u = u.sibling;
        }
        throw Error(f(188));
      }
      if (l.return !== n.return) l = a, n = u;
      else {
        for (var i = !1, o = a.child; o; ) {
          if (o === l) {
            i = !0, l = a, n = u;
            break;
          }
          if (o === n) {
            i = !0, n = a, l = u;
            break;
          }
          o = o.sibling;
        }
        if (!i) {
          for (o = u.child; o; ) {
            if (o === l) {
              i = !0, l = u, n = a;
              break;
            }
            if (o === n) {
              i = !0, n = u, l = a;
              break;
            }
            o = o.sibling;
          }
          if (!i) throw Error(f(189));
        }
      }
      if (l.alternate !== n) throw Error(f(190));
    }
    if (l.tag !== 3) throw Error(f(188));
    return l.stateNode.current === l ? t : e;
  }
  function m(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = m(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var O = Object.assign, R = Symbol.for("react.element"), M = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), q = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), H = Symbol.for("react.context"), X = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), tt = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), D = Symbol.for("react.activity"), A = Symbol.for("react.memo_cache_sentinel"), W = Symbol.iterator;
  function w(t) {
    return t === null || typeof t != "object" ? null : (t = W && t[W] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Q = Symbol.for("react.client.reference");
  function I(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Q ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case C:
        return "Fragment";
      case q:
        return "Profiler";
      case L:
        return "StrictMode";
      case k:
        return "Suspense";
      case P:
        return "SuspenseList";
      case D:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case j:
          return "Portal";
        case H:
          return t.displayName || "Context";
        case z:
          return (t._context.displayName || "Context") + ".Consumer";
        case X:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case tt:
          return e = t.displayName || null, e !== null ? e : I(t.type) || "Memo";
        case F:
          e = t._payload, t = t._init;
          try {
            return I(t(e));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, N = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = g.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ut = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ct = [], Ot = -1;
  function b(t) {
    return { current: t };
  }
  function J(t) {
    0 > Ot || (t.current = ct[Ot], ct[Ot] = null, Ot--);
  }
  function et(t, e) {
    Ot++, ct[Ot] = t.current, t.current = e;
  }
  var lt = b(null), ht = b(null), st = b(null), bt = b(null);
  function It(t, e) {
    switch (et(st, e), et(ht, t), et(lt, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Zv(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Zv(e), t = wv(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    J(lt), et(lt, t);
  }
  function xt() {
    J(lt), J(ht), J(st);
  }
  function Rl(t) {
    t.memoizedState !== null && et(bt, t);
    var e = lt.current, l = wv(e, t.type);
    e !== l && (et(ht, t), et(lt, l));
  }
  function Dl(t) {
    ht.current === t && (J(lt), J(ht)), bt.current === t && (J(bt), ou._currentValue = ut);
  }
  var Bn, pu;
  function Pe(t) {
    if (Bn === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        Bn = e && e[1] || "", pu = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Bn + t + pu;
  }
  var un = !1;
  function cn(t, e) {
    if (!t || un) return "";
    un = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var $ = function() {
                throw Error();
              };
              if (Object.defineProperty($.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct($, []);
                } catch (K) {
                  var x = K;
                }
                Reflect.construct(t, [], $);
              } else {
                try {
                  $.call();
                } catch (K) {
                  x = K;
                }
                t.call($.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (K) {
                x = K;
              }
              ($ = t()) && typeof $.catch == "function" && $.catch(function() {
              });
            }
          } catch (K) {
            if (K && x && typeof K.stack == "string")
              return [K.stack, x.stack];
          }
          return [null, null];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        n.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = n.DetermineComponentFrameRoot(), i = u[0], o = u[1];
      if (i && o) {
        var _ = i.split(`
`), B = o.split(`
`);
        for (a = n = 0; n < _.length && !_[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; a < B.length && !B[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (n === _.length || a === B.length)
          for (n = _.length - 1, a = B.length - 1; 1 <= n && 0 <= a && _[n] !== B[a]; )
            a--;
        for (; 1 <= n && 0 <= a; n--, a--)
          if (_[n] !== B[a]) {
            if (n !== 1 || a !== 1)
              do
                if (n--, a--, 0 > a || _[n] !== B[a]) {
                  var G = `
` + _[n].replace(" at new ", " at ");
                  return t.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", t.displayName)), G;
                }
              while (1 <= n && 0 <= a);
            break;
          }
      }
    } finally {
      un = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Pe(l) : "";
  }
  function Gi(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Pe(t.type);
      case 16:
        return Pe("Lazy");
      case 13:
        return t.child !== e && e !== null ? Pe("Suspense Fallback") : Pe("Suspense");
      case 19:
        return Pe("SuspenseList");
      case 0:
      case 15:
        return cn(t.type, !1);
      case 11:
        return cn(t.type.render, !1);
      case 1:
        return cn(t.type, !0);
      case 31:
        return Pe("Activity");
      default:
        return "";
    }
  }
  function Nt(t) {
    try {
      var e = "", l = null;
      do
        e += Gi(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var Qt = Object.prototype.hasOwnProperty, Rt = r.unstable_scheduleCallback, ce = r.unstable_cancelCallback, Zt = r.unstable_shouldYield, we = r.unstable_requestPaint, Ht = r.unstable_now, qe = r.unstable_getCurrentPriorityLevel, fn = r.unstable_ImmediatePriority, tl = r.unstable_UserBlockingPriority, _e = r.unstable_NormalPriority, qn = r.unstable_LowPriority, xn = r.unstable_IdlePriority, _u = r.log, Qi = r.unstable_setDisableYieldValue, il = null, Se = null;
  function jl(t) {
    if (typeof _u == "function" && Qi(t), Se && typeof Se.setStrictMode == "function")
      try {
        Se.setStrictMode(il, t);
      } catch {
      }
  }
  var be = Math.clz32 ? Math.clz32 : Ch, Dh = Math.log, jh = Math.LN2;
  function Ch(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Dh(t) / jh | 0) | 0;
  }
  var Su = 256, bu = 262144, Ou = 4194304;
  function rn(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Eu(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var o = n & 134217727;
    return o !== 0 ? (n = o & ~u, n !== 0 ? a = rn(n) : (i &= o, i !== 0 ? a = rn(i) : l || (l = o & ~t, l !== 0 && (a = rn(l))))) : (o = n & ~u, o !== 0 ? a = rn(o) : i !== 0 ? a = rn(i) : l || (l = n & ~t, l !== 0 && (a = rn(l)))), a === 0 ? 0 : e !== 0 && e !== a && (e & u) === 0 && (u = a & -a, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : a;
  }
  function Ea(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Nh(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ar() {
    var t = Ou;
    return Ou <<= 1, (Ou & 62914560) === 0 && (Ou = 4194304), t;
  }
  function Vi(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Ma(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Uh(t, e, l, n, a, u) {
    var i = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var o = t.entanglements, _ = t.expirationTimes, B = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var G = 31 - be(l), $ = 1 << G;
      o[G] = 0, _[G] = -1;
      var x = B[G];
      if (x !== null)
        for (B[G] = null, G = 0; G < x.length; G++) {
          var K = x[G];
          K !== null && (K.lane &= -536870913);
        }
      l &= ~$;
    }
    n !== 0 && zr(t, n, 0), u !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function zr(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var n = 31 - be(e);
    t.entangledLanes |= e, t.entanglements[n] = t.entanglements[n] | 1073741824 | l & 261930;
  }
  function Tr(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var n = 31 - be(l), a = 1 << n;
      a & e | t[n] & e && (t[n] |= e), l &= ~a;
    }
  }
  function Rr(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : Xi(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function Xi(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Zi(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Dr() {
    var t = V.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : yd(t.type));
  }
  function jr(t, e) {
    var l = V.p;
    try {
      return V.p = t, e();
    } finally {
      V.p = l;
    }
  }
  var Cl = Math.random().toString(36).slice(2), le = "__reactFiber$" + Cl, ve = "__reactProps$" + Cl, Hn = "__reactContainer$" + Cl, wi = "__reactEvents$" + Cl, Bh = "__reactListeners$" + Cl, qh = "__reactHandles$" + Cl, Cr = "__reactResources$" + Cl, Aa = "__reactMarker$" + Cl;
  function Ji(t) {
    delete t[le], delete t[ve], delete t[wi], delete t[Bh], delete t[qh];
  }
  function Yn(t) {
    var e = t[le];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Hn] || l[le]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = Pv(t); t !== null; ) {
            if (l = t[le]) return l;
            t = Pv(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Kn(t) {
    if (t = t[le] || t[Hn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function za(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(f(33));
  }
  function Ln(t) {
    var e = t[Cr];
    return e || (e = t[Cr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Pt(t) {
    t[Aa] = !0;
  }
  var Nr = /* @__PURE__ */ new Set(), Ur = {};
  function on(t, e) {
    Gn(t, e), Gn(t + "Capture", e);
  }
  function Gn(t, e) {
    for (Ur[t] = e, t = 0; t < e.length; t++)
      Nr.add(e[t]);
  }
  var xh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Br = {}, qr = {};
  function Hh(t) {
    return Qt.call(qr, t) ? !0 : Qt.call(Br, t) ? !1 : xh.test(t) ? qr[t] = !0 : (Br[t] = !0, !1);
  }
  function Mu(t, e, l) {
    if (Hh(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var n = e.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + l);
      }
  }
  function Au(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + l);
    }
  }
  function cl(t, e, l, n) {
    if (n === null) t.removeAttribute(l);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, "" + n);
    }
  }
  function xe(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function xr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Yh(t, e, l) {
    var n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, u = n.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(i) {
          l = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(t, e, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(i) {
          l = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function $i(t) {
    if (!t._valueTracker) {
      var e = xr(t) ? "checked" : "value";
      t._valueTracker = Yh(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Hr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), n = "";
    return t && (n = xr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== l ? (e.setValue(t), !0) : !1;
  }
  function zu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Kh = /[\n"\\]/g;
  function He(t) {
    return t.replace(
      Kh,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Wi(t, e, l, n, a, u, i, o) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + xe(e)) : t.value !== "" + xe(e) && (t.value = "" + xe(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? Fi(t, i, xe(e)) : l != null ? Fi(t, i, xe(l)) : n != null && t.removeAttribute("value"), a == null && u != null && (t.defaultChecked = !!u), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? t.name = "" + xe(o) : t.removeAttribute("name");
  }
  function Yr(t, e, l, n, a, u, i, o) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        $i(t);
        return;
      }
      l = l != null ? "" + xe(l) : "", e = e != null ? "" + xe(e) : l, o || e === t.value || (t.value = e), t.defaultValue = e;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = o ? t.checked : !!n, t.defaultChecked = !!n, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), $i(t);
  }
  function Fi(t, e, l) {
    e === "number" && zu(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
  }
  function Qn(t, e, l, n) {
    if (t = t.options, e) {
      e = {};
      for (var a = 0; a < l.length; a++)
        e["$" + l[a]] = !0;
      for (l = 0; l < t.length; l++)
        a = e.hasOwnProperty("$" + t[l].value), t[l].selected !== a && (t[l].selected = a), a && n && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + xe(l), e = null, a = 0; a < t.length; a++) {
        if (t[a].value === l) {
          t[a].selected = !0, n && (t[a].defaultSelected = !0);
          return;
        }
        e !== null || t[a].disabled || (e = t[a]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Kr(t, e, l) {
    if (e != null && (e = "" + xe(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + xe(l) : "";
  }
  function Lr(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(f(92));
        if (Y(n)) {
          if (1 < n.length) throw Error(f(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), e = l;
    }
    l = xe(e), t.defaultValue = l, n = t.textContent, n === l && n !== "" && n !== null && (t.value = n), $i(t);
  }
  function Vn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Lh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Gr(t, e, l) {
    var n = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : n ? t.setProperty(e, l) : typeof l != "number" || l === 0 || Lh.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Qr(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(f(62));
    if (t = t.style, l != null) {
      for (var n in l)
        !l.hasOwnProperty(n) || e != null && e.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var a in e)
        n = e[a], e.hasOwnProperty(a) && l[a] !== n && Gr(t, a, n);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Gr(t, u, e[u]);
  }
  function ki(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Gh = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Qh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Tu(t) {
    return Qh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function fl() {
  }
  var Ii = null;
  function Pi(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Xn = null, Zn = null;
  function Vr(t) {
    var e = Kn(t);
    if (e && (t = e.stateNode)) {
      var l = t[ve] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Wi(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), e = l.name, l.type === "radio" && e != null) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + He(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var n = l[e];
              if (n !== t && n.form === t.form) {
                var a = n[ve] || null;
                if (!a) throw Error(f(90));
                Wi(
                  n,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (e = 0; e < l.length; e++)
              n = l[e], n.form === t.form && Hr(n);
          }
          break t;
        case "textarea":
          Kr(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && Qn(t, !!l.multiple, e, !1);
      }
    }
  }
  var tc = !1;
  function Xr(t, e, l) {
    if (tc) return t(e, l);
    tc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (tc = !1, (Xn !== null || Zn !== null) && (hi(), Xn && (e = Xn, t = Zn, Zn = Xn = null, Vr(e), t)))
        for (e = 0; e < t.length; e++) Vr(t[e]);
    }
  }
  function Ta(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[ve] || null;
    if (n === null) return null;
    l = n[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !n;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function")
      throw Error(
        f(231, e, typeof l)
      );
    return l;
  }
  var rl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ec = !1;
  if (rl)
    try {
      var Ra = {};
      Object.defineProperty(Ra, "passive", {
        get: function() {
          ec = !0;
        }
      }), window.addEventListener("test", Ra, Ra), window.removeEventListener("test", Ra, Ra);
    } catch {
      ec = !1;
    }
  var Nl = null, lc = null, Ru = null;
  function Zr() {
    if (Ru) return Ru;
    var t, e = lc, l = e.length, n, a = "value" in Nl ? Nl.value : Nl.textContent, u = a.length;
    for (t = 0; t < l && e[t] === a[t]; t++) ;
    var i = l - t;
    for (n = 1; n <= i && e[l - n] === a[u - n]; n++) ;
    return Ru = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function Du(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function ju() {
    return !0;
  }
  function wr() {
    return !1;
  }
  function de(t) {
    function e(l, n, a, u, i) {
      this._reactName = l, this._targetInst = a, this.type = n, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var o in t)
        t.hasOwnProperty(o) && (l = t[o], this[o] = l ? l(u) : u[o]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ju : wr, this.isPropagationStopped = wr, this;
    }
    return O(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ju);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ju);
      },
      persist: function() {
      },
      isPersistent: ju
    }), e;
  }
  var sn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Cu = de(sn), Da = O({}, sn, { view: 0, detail: 0 }), Vh = de(Da), nc, ac, ja, Nu = O({}, Da, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ic,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== ja && (ja && t.type === "mousemove" ? (nc = t.screenX - ja.screenX, ac = t.screenY - ja.screenY) : ac = nc = 0, ja = t), nc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ac;
    }
  }), Jr = de(Nu), Xh = O({}, Nu, { dataTransfer: 0 }), Zh = de(Xh), wh = O({}, Da, { relatedTarget: 0 }), uc = de(wh), Jh = O({}, sn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), $h = de(Jh), Wh = O({}, sn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Fh = de(Wh), kh = O({}, sn, { data: 0 }), $r = de(kh), Ih = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Ph = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, ty = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ey(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = ty[t]) ? !!e[t] : !1;
  }
  function ic() {
    return ey;
  }
  var ly = O({}, Da, {
    key: function(t) {
      if (t.key) {
        var e = Ih[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Du(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Ph[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ic,
    charCode: function(t) {
      return t.type === "keypress" ? Du(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Du(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), ny = de(ly), ay = O({}, Nu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Wr = de(ay), uy = O({}, Da, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ic
  }), iy = de(uy), cy = O({}, sn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), fy = de(cy), ry = O({}, Nu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), oy = de(ry), sy = O({}, sn, {
    newState: 0,
    oldState: 0
  }), vy = de(sy), dy = [9, 13, 27, 32], cc = rl && "CompositionEvent" in window, Ca = null;
  rl && "documentMode" in document && (Ca = document.documentMode);
  var hy = rl && "TextEvent" in window && !Ca, Fr = rl && (!cc || Ca && 8 < Ca && 11 >= Ca), kr = " ", Ir = !1;
  function Pr(t, e) {
    switch (t) {
      case "keyup":
        return dy.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function to(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var wn = !1;
  function yy(t, e) {
    switch (t) {
      case "compositionend":
        return to(e);
      case "keypress":
        return e.which !== 32 ? null : (Ir = !0, kr);
      case "textInput":
        return t = e.data, t === kr && Ir ? null : t;
      default:
        return null;
    }
  }
  function my(t, e) {
    if (wn)
      return t === "compositionend" || !cc && Pr(t, e) ? (t = Zr(), Ru = lc = Nl = null, wn = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Fr && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var gy = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function eo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!gy[t.type] : e === "textarea";
  }
  function lo(t, e, l, n) {
    Xn ? Zn ? Zn.push(n) : Zn = [n] : Xn = n, e = bi(e, "onChange"), 0 < e.length && (l = new Cu(
      "onChange",
      "change",
      null,
      l,
      n
    ), t.push({ event: l, listeners: e }));
  }
  var Na = null, Ua = null;
  function py(t) {
    Kv(t, 0);
  }
  function Uu(t) {
    var e = za(t);
    if (Hr(e)) return t;
  }
  function no(t, e) {
    if (t === "change") return e;
  }
  var ao = !1;
  if (rl) {
    var fc;
    if (rl) {
      var rc = "oninput" in document;
      if (!rc) {
        var uo = document.createElement("div");
        uo.setAttribute("oninput", "return;"), rc = typeof uo.oninput == "function";
      }
      fc = rc;
    } else fc = !1;
    ao = fc && (!document.documentMode || 9 < document.documentMode);
  }
  function io() {
    Na && (Na.detachEvent("onpropertychange", co), Ua = Na = null);
  }
  function co(t) {
    if (t.propertyName === "value" && Uu(Ua)) {
      var e = [];
      lo(
        e,
        Ua,
        t,
        Pi(t)
      ), Xr(py, e);
    }
  }
  function _y(t, e, l) {
    t === "focusin" ? (io(), Na = e, Ua = l, Na.attachEvent("onpropertychange", co)) : t === "focusout" && io();
  }
  function Sy(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Uu(Ua);
  }
  function by(t, e) {
    if (t === "click") return Uu(e);
  }
  function Oy(t, e) {
    if (t === "input" || t === "change")
      return Uu(e);
  }
  function Ey(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Oe = typeof Object.is == "function" ? Object.is : Ey;
  function Ba(t, e) {
    if (Oe(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var a = l[n];
      if (!Qt.call(e, a) || !Oe(t[a], e[a]))
        return !1;
    }
    return !0;
  }
  function fo(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function ro(t, e) {
    var l = fo(t);
    t = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (n = t + l.textContent.length, t <= e && n >= e)
          return { node: l, offset: e - t };
        t = n;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = fo(l);
    }
  }
  function oo(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? oo(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function so(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = zu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = zu(t.document);
    }
    return e;
  }
  function oc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var My = rl && "documentMode" in document && 11 >= document.documentMode, Jn = null, sc = null, qa = null, vc = !1;
  function vo(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    vc || Jn == null || Jn !== zu(n) || (n = Jn, "selectionStart" in n && oc(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), qa && Ba(qa, n) || (qa = n, n = bi(sc, "onSelect"), 0 < n.length && (e = new Cu(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: n }), e.target = Jn)));
  }
  function vn(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var $n = {
    animationend: vn("Animation", "AnimationEnd"),
    animationiteration: vn("Animation", "AnimationIteration"),
    animationstart: vn("Animation", "AnimationStart"),
    transitionrun: vn("Transition", "TransitionRun"),
    transitionstart: vn("Transition", "TransitionStart"),
    transitioncancel: vn("Transition", "TransitionCancel"),
    transitionend: vn("Transition", "TransitionEnd")
  }, dc = {}, ho = {};
  rl && (ho = document.createElement("div").style, "AnimationEvent" in window || (delete $n.animationend.animation, delete $n.animationiteration.animation, delete $n.animationstart.animation), "TransitionEvent" in window || delete $n.transitionend.transition);
  function dn(t) {
    if (dc[t]) return dc[t];
    if (!$n[t]) return t;
    var e = $n[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in ho)
        return dc[t] = e[l];
    return t;
  }
  var yo = dn("animationend"), mo = dn("animationiteration"), go = dn("animationstart"), Ay = dn("transitionrun"), zy = dn("transitionstart"), Ty = dn("transitioncancel"), po = dn("transitionend"), _o = /* @__PURE__ */ new Map(), hc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  hc.push("scrollEnd");
  function Je(t, e) {
    _o.set(t, e), on(e, [t]);
  }
  var Bu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof c == "object" && typeof c.emit == "function") {
      c.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Ye = [], Wn = 0, yc = 0;
  function qu() {
    for (var t = Wn, e = yc = Wn = 0; e < t; ) {
      var l = Ye[e];
      Ye[e++] = null;
      var n = Ye[e];
      Ye[e++] = null;
      var a = Ye[e];
      Ye[e++] = null;
      var u = Ye[e];
      if (Ye[e++] = null, n !== null && a !== null) {
        var i = n.pending;
        i === null ? a.next = a : (a.next = i.next, i.next = a), n.pending = a;
      }
      u !== 0 && So(l, a, u);
    }
  }
  function xu(t, e, l, n) {
    Ye[Wn++] = t, Ye[Wn++] = e, Ye[Wn++] = l, Ye[Wn++] = n, yc |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function mc(t, e, l, n) {
    return xu(t, e, l, n), Hu(t);
  }
  function hn(t, e) {
    return xu(t, null, null, e), Hu(t);
  }
  function So(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var a = !1, u = t.return; u !== null; )
      u.childLanes |= l, n = u.alternate, n !== null && (n.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (a = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, a && e !== null && (a = 31 - be(l), t = u.hiddenUpdates, n = t[a], n === null ? t[a] = [e] : n.push(e), e.lane = l | 536870912), u) : null;
  }
  function Hu(t) {
    if (50 < nu)
      throw nu = 0, zf = null, Error(f(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Fn = {};
  function Ry(t, e, l, n) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ee(t, e, l, n) {
    return new Ry(t, e, l, n);
  }
  function gc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function ol(t, e) {
    var l = t.alternate;
    return l === null ? (l = Ee(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function bo(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Yu(t, e, l, n, a, u) {
    var i = 0;
    if (n = t, typeof t == "function") gc(t) && (i = 1);
    else if (typeof t == "string")
      i = U0(
        t,
        l,
        lt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case D:
          return t = Ee(31, l, e, a), t.elementType = D, t.lanes = u, t;
        case C:
          return yn(l.children, a, u, e);
        case L:
          i = 8, a |= 24;
          break;
        case q:
          return t = Ee(12, l, e, a | 2), t.elementType = q, t.lanes = u, t;
        case k:
          return t = Ee(13, l, e, a), t.elementType = k, t.lanes = u, t;
        case P:
          return t = Ee(19, l, e, a), t.elementType = P, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case H:
                i = 10;
                break t;
              case z:
                i = 9;
                break t;
              case X:
                i = 11;
                break t;
              case tt:
                i = 14;
                break t;
              case F:
                i = 16, n = null;
                break t;
            }
          i = 29, l = Error(
            f(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return e = Ee(i, l, e, a), e.elementType = t, e.type = n, e.lanes = u, e;
  }
  function yn(t, e, l, n) {
    return t = Ee(7, t, n, e), t.lanes = l, t;
  }
  function pc(t, e, l) {
    return t = Ee(6, t, null, e), t.lanes = l, t;
  }
  function Oo(t) {
    var e = Ee(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function _c(t, e, l) {
    return e = Ee(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = l, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var Eo = /* @__PURE__ */ new WeakMap();
  function Ke(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Eo.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Nt(e)
      }, Eo.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Nt(e)
    };
  }
  var kn = [], In = 0, Ku = null, xa = 0, Le = [], Ge = 0, Ul = null, el = 1, ll = "";
  function sl(t, e) {
    kn[In++] = xa, kn[In++] = Ku, Ku = t, xa = e;
  }
  function Mo(t, e, l) {
    Le[Ge++] = el, Le[Ge++] = ll, Le[Ge++] = Ul, Ul = t;
    var n = el;
    t = ll;
    var a = 32 - be(n) - 1;
    n &= ~(1 << a), l += 1;
    var u = 32 - be(e) + a;
    if (30 < u) {
      var i = a - a % 5;
      u = (n & (1 << i) - 1).toString(32), n >>= i, a -= i, el = 1 << 32 - be(e) + a | l << a | n, ll = u + t;
    } else
      el = 1 << u | l << a | n, ll = t;
  }
  function Sc(t) {
    t.return !== null && (sl(t, 1), Mo(t, 1, 0));
  }
  function bc(t) {
    for (; t === Ku; )
      Ku = kn[--In], kn[In] = null, xa = kn[--In], kn[In] = null;
    for (; t === Ul; )
      Ul = Le[--Ge], Le[Ge] = null, ll = Le[--Ge], Le[Ge] = null, el = Le[--Ge], Le[Ge] = null;
  }
  function Ao(t, e) {
    Le[Ge++] = el, Le[Ge++] = ll, Le[Ge++] = Ul, el = e.id, ll = e.overflow, Ul = t;
  }
  var ne = null, Bt = null, St = !1, Bl = null, Qe = !1, Oc = Error(f(519));
  function ql(t) {
    var e = Error(
      f(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ha(Ke(e, t)), Oc;
  }
  function zo(t) {
    var e = t.stateNode, l = t.type, n = t.memoizedProps;
    switch (e[le] = t, e[ve] = n, l) {
      case "dialog":
        mt("cancel", e), mt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        mt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < uu.length; l++)
          mt(uu[l], e);
        break;
      case "source":
        mt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        mt("error", e), mt("load", e);
        break;
      case "details":
        mt("toggle", e);
        break;
      case "input":
        mt("invalid", e), Yr(
          e,
          n.value,
          n.defaultValue,
          n.checked,
          n.defaultChecked,
          n.type,
          n.name,
          !0
        );
        break;
      case "select":
        mt("invalid", e);
        break;
      case "textarea":
        mt("invalid", e), Lr(e, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || n.suppressHydrationWarning === !0 || Vv(e.textContent, l) ? (n.popover != null && (mt("beforetoggle", e), mt("toggle", e)), n.onScroll != null && mt("scroll", e), n.onScrollEnd != null && mt("scrollend", e), n.onClick != null && (e.onclick = fl), e = !0) : e = !1, e || ql(t, !0);
  }
  function To(t) {
    for (ne = t.return; ne; )
      switch (ne.tag) {
        case 5:
        case 31:
        case 13:
          Qe = !1;
          return;
        case 27:
        case 3:
          Qe = !0;
          return;
        default:
          ne = ne.return;
      }
  }
  function Pn(t) {
    if (t !== ne) return !1;
    if (!St) return To(t), St = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Gf(t.type, t.memoizedProps)), l = !l), l && Bt && ql(t), To(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      Bt = Iv(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      Bt = Iv(t);
    } else
      e === 27 ? (e = Bt, Wl(t.type) ? (t = wf, wf = null, Bt = t) : Bt = e) : Bt = ne ? Xe(t.stateNode.nextSibling) : null;
    return !0;
  }
  function mn() {
    Bt = ne = null, St = !1;
  }
  function Ec() {
    var t = Bl;
    return t !== null && (ge === null ? ge = t : ge.push.apply(
      ge,
      t
    ), Bl = null), t;
  }
  function Ha(t) {
    Bl === null ? Bl = [t] : Bl.push(t);
  }
  var Mc = b(null), gn = null, vl = null;
  function xl(t, e, l) {
    et(Mc, e._currentValue), e._currentValue = l;
  }
  function dl(t) {
    t._currentValue = Mc.current, J(Mc);
  }
  function Ac(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function zc(t, e, l, n) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var u = a.dependencies;
      if (u !== null) {
        var i = a.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var o = u;
          u = a;
          for (var _ = 0; _ < e.length; _++)
            if (o.context === e[_]) {
              u.lanes |= l, o = u.alternate, o !== null && (o.lanes |= l), Ac(
                u.return,
                l,
                t
              ), n || (i = null);
              break t;
            }
          u = o.next;
        }
      } else if (a.tag === 18) {
        if (i = a.return, i === null) throw Error(f(341));
        i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), Ac(i, l, t), i = null;
      } else i = a.child;
      if (i !== null) i.return = a;
      else
        for (i = a; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (a = i.sibling, a !== null) {
            a.return = i.return, i = a;
            break;
          }
          i = i.return;
        }
      a = i;
    }
  }
  function ta(t, e, l, n) {
    t = null;
    for (var a = e, u = !1; a !== null; ) {
      if (!u) {
        if ((a.flags & 524288) !== 0) u = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var i = a.alternate;
        if (i === null) throw Error(f(387));
        if (i = i.memoizedProps, i !== null) {
          var o = a.type;
          Oe(a.pendingProps.value, i.value) || (t !== null ? t.push(o) : t = [o]);
        }
      } else if (a === bt.current) {
        if (i = a.alternate, i === null) throw Error(f(387));
        i.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(ou) : t = [ou]);
      }
      a = a.return;
    }
    t !== null && zc(
      e,
      t,
      l,
      n
    ), e.flags |= 262144;
  }
  function Lu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Oe(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function pn(t) {
    gn = t, vl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ae(t) {
    return Ro(gn, t);
  }
  function Gu(t, e) {
    return gn === null && pn(t), Ro(t, e);
  }
  function Ro(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, vl === null) {
      if (t === null) throw Error(f(308));
      vl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else vl = vl.next = e;
    return l;
  }
  var Dy = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(l, n) {
        t.push(n);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(l) {
        return l();
      });
    };
  }, jy = r.unstable_scheduleCallback, Cy = r.unstable_NormalPriority, wt = {
    $$typeof: H,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Tc() {
    return {
      controller: new Dy(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ya(t) {
    t.refCount--, t.refCount === 0 && jy(Cy, function() {
      t.controller.abort();
    });
  }
  var Ka = null, Rc = 0, ea = 0, la = null;
  function Ny(t, e) {
    if (Ka === null) {
      var l = Ka = [];
      Rc = 0, ea = Nf(), la = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return Rc++, e.then(Do, Do), e;
  }
  function Do() {
    if (--Rc === 0 && Ka !== null) {
      la !== null && (la.status = "fulfilled");
      var t = Ka;
      Ka = null, ea = 0, la = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Uy(t, e) {
    var l = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        l.push(a);
      }
    };
    return t.then(
      function() {
        n.status = "fulfilled", n.value = e;
        for (var a = 0; a < l.length; a++) (0, l[a])(e);
      },
      function(a) {
        for (n.status = "rejected", n.reason = a, a = 0; a < l.length; a++)
          (0, l[a])(void 0);
      }
    ), n;
  }
  var jo = N.S;
  N.S = function(t, e) {
    dv = Ht(), typeof e == "object" && e !== null && typeof e.then == "function" && Ny(t, e), jo !== null && jo(t, e);
  };
  var _n = b(null);
  function Dc() {
    var t = _n.current;
    return t !== null ? t : Ut.pooledCache;
  }
  function Qu(t, e) {
    e === null ? et(_n, _n.current) : et(_n, e.pool);
  }
  function Co() {
    var t = Dc();
    return t === null ? null : { parent: wt._currentValue, pool: t };
  }
  var na = Error(f(460)), jc = Error(f(474)), Vu = Error(f(542)), Xu = { then: function() {
  } };
  function No(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Uo(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(fl, fl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, qo(t), t;
      default:
        if (typeof e.status == "string") e.then(fl, fl);
        else {
          if (t = Ut, t !== null && 100 < t.shellSuspendCounter)
            throw Error(f(482));
          t = e, t.status = "pending", t.then(
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "fulfilled", a.value = n;
              }
            },
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "rejected", a.reason = n;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, qo(t), t;
        }
        throw bn = e, na;
    }
  }
  function Sn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (bn = l, na) : l;
    }
  }
  var bn = null;
  function Bo() {
    if (bn === null) throw Error(f(459));
    var t = bn;
    return bn = null, t;
  }
  function qo(t) {
    if (t === na || t === Vu)
      throw Error(f(483));
  }
  var aa = null, La = 0;
  function Zu(t) {
    var e = La;
    return La += 1, aa === null && (aa = []), Uo(aa, t, e);
  }
  function Ga(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function wu(t, e) {
    throw e.$$typeof === R ? Error(f(525)) : (t = Object.prototype.toString.call(e), Error(
      f(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function xo(t) {
    function e(T, E) {
      if (t) {
        var U = T.deletions;
        U === null ? (T.deletions = [E], T.flags |= 16) : U.push(E);
      }
    }
    function l(T, E) {
      if (!t) return null;
      for (; E !== null; )
        e(T, E), E = E.sibling;
      return null;
    }
    function n(T) {
      for (var E = /* @__PURE__ */ new Map(); T !== null; )
        T.key !== null ? E.set(T.key, T) : E.set(T.index, T), T = T.sibling;
      return E;
    }
    function a(T, E) {
      return T = ol(T, E), T.index = 0, T.sibling = null, T;
    }
    function u(T, E, U) {
      return T.index = U, t ? (U = T.alternate, U !== null ? (U = U.index, U < E ? (T.flags |= 67108866, E) : U) : (T.flags |= 67108866, E)) : (T.flags |= 1048576, E);
    }
    function i(T) {
      return t && T.alternate === null && (T.flags |= 67108866), T;
    }
    function o(T, E, U, Z) {
      return E === null || E.tag !== 6 ? (E = pc(U, T.mode, Z), E.return = T, E) : (E = a(E, U), E.return = T, E);
    }
    function _(T, E, U, Z) {
      var it = U.type;
      return it === C ? G(
        T,
        E,
        U.props.children,
        Z,
        U.key
      ) : E !== null && (E.elementType === it || typeof it == "object" && it !== null && it.$$typeof === F && Sn(it) === E.type) ? (E = a(E, U.props), Ga(E, U), E.return = T, E) : (E = Yu(
        U.type,
        U.key,
        U.props,
        null,
        T.mode,
        Z
      ), Ga(E, U), E.return = T, E);
    }
    function B(T, E, U, Z) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== U.containerInfo || E.stateNode.implementation !== U.implementation ? (E = _c(U, T.mode, Z), E.return = T, E) : (E = a(E, U.children || []), E.return = T, E);
    }
    function G(T, E, U, Z, it) {
      return E === null || E.tag !== 7 ? (E = yn(
        U,
        T.mode,
        Z,
        it
      ), E.return = T, E) : (E = a(E, U), E.return = T, E);
    }
    function $(T, E, U) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = pc(
          "" + E,
          T.mode,
          U
        ), E.return = T, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case M:
            return U = Yu(
              E.type,
              E.key,
              E.props,
              null,
              T.mode,
              U
            ), Ga(U, E), U.return = T, U;
          case j:
            return E = _c(
              E,
              T.mode,
              U
            ), E.return = T, E;
          case F:
            return E = Sn(E), $(T, E, U);
        }
        if (Y(E) || w(E))
          return E = yn(
            E,
            T.mode,
            U,
            null
          ), E.return = T, E;
        if (typeof E.then == "function")
          return $(T, Zu(E), U);
        if (E.$$typeof === H)
          return $(
            T,
            Gu(T, E),
            U
          );
        wu(T, E);
      }
      return null;
    }
    function x(T, E, U, Z) {
      var it = E !== null ? E.key : null;
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return it !== null ? null : o(T, E, "" + U, Z);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case M:
            return U.key === it ? _(T, E, U, Z) : null;
          case j:
            return U.key === it ? B(T, E, U, Z) : null;
          case F:
            return U = Sn(U), x(T, E, U, Z);
        }
        if (Y(U) || w(U))
          return it !== null ? null : G(T, E, U, Z, null);
        if (typeof U.then == "function")
          return x(
            T,
            E,
            Zu(U),
            Z
          );
        if (U.$$typeof === H)
          return x(
            T,
            E,
            Gu(T, U),
            Z
          );
        wu(T, U);
      }
      return null;
    }
    function K(T, E, U, Z, it) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint")
        return T = T.get(U) || null, o(E, T, "" + Z, it);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case M:
            return T = T.get(
              Z.key === null ? U : Z.key
            ) || null, _(E, T, Z, it);
          case j:
            return T = T.get(
              Z.key === null ? U : Z.key
            ) || null, B(E, T, Z, it);
          case F:
            return Z = Sn(Z), K(
              T,
              E,
              U,
              Z,
              it
            );
        }
        if (Y(Z) || w(Z))
          return T = T.get(U) || null, G(E, T, Z, it, null);
        if (typeof Z.then == "function")
          return K(
            T,
            E,
            U,
            Zu(Z),
            it
          );
        if (Z.$$typeof === H)
          return K(
            T,
            E,
            U,
            Gu(E, Z),
            it
          );
        wu(E, Z);
      }
      return null;
    }
    function nt(T, E, U, Z) {
      for (var it = null, Et = null, at = E, dt = E = 0, _t = null; at !== null && dt < U.length; dt++) {
        at.index > dt ? (_t = at, at = null) : _t = at.sibling;
        var Mt = x(
          T,
          at,
          U[dt],
          Z
        );
        if (Mt === null) {
          at === null && (at = _t);
          break;
        }
        t && at && Mt.alternate === null && e(T, at), E = u(Mt, E, dt), Et === null ? it = Mt : Et.sibling = Mt, Et = Mt, at = _t;
      }
      if (dt === U.length)
        return l(T, at), St && sl(T, dt), it;
      if (at === null) {
        for (; dt < U.length; dt++)
          at = $(T, U[dt], Z), at !== null && (E = u(
            at,
            E,
            dt
          ), Et === null ? it = at : Et.sibling = at, Et = at);
        return St && sl(T, dt), it;
      }
      for (at = n(at); dt < U.length; dt++)
        _t = K(
          at,
          T,
          dt,
          U[dt],
          Z
        ), _t !== null && (t && _t.alternate !== null && at.delete(
          _t.key === null ? dt : _t.key
        ), E = u(
          _t,
          E,
          dt
        ), Et === null ? it = _t : Et.sibling = _t, Et = _t);
      return t && at.forEach(function(tn) {
        return e(T, tn);
      }), St && sl(T, dt), it;
    }
    function ft(T, E, U, Z) {
      if (U == null) throw Error(f(151));
      for (var it = null, Et = null, at = E, dt = E = 0, _t = null, Mt = U.next(); at !== null && !Mt.done; dt++, Mt = U.next()) {
        at.index > dt ? (_t = at, at = null) : _t = at.sibling;
        var tn = x(T, at, Mt.value, Z);
        if (tn === null) {
          at === null && (at = _t);
          break;
        }
        t && at && tn.alternate === null && e(T, at), E = u(tn, E, dt), Et === null ? it = tn : Et.sibling = tn, Et = tn, at = _t;
      }
      if (Mt.done)
        return l(T, at), St && sl(T, dt), it;
      if (at === null) {
        for (; !Mt.done; dt++, Mt = U.next())
          Mt = $(T, Mt.value, Z), Mt !== null && (E = u(Mt, E, dt), Et === null ? it = Mt : Et.sibling = Mt, Et = Mt);
        return St && sl(T, dt), it;
      }
      for (at = n(at); !Mt.done; dt++, Mt = U.next())
        Mt = K(at, T, dt, Mt.value, Z), Mt !== null && (t && Mt.alternate !== null && at.delete(Mt.key === null ? dt : Mt.key), E = u(Mt, E, dt), Et === null ? it = Mt : Et.sibling = Mt, Et = Mt);
      return t && at.forEach(function(X0) {
        return e(T, X0);
      }), St && sl(T, dt), it;
    }
    function Ct(T, E, U, Z) {
      if (typeof U == "object" && U !== null && U.type === C && U.key === null && (U = U.props.children), typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case M:
            t: {
              for (var it = U.key; E !== null; ) {
                if (E.key === it) {
                  if (it = U.type, it === C) {
                    if (E.tag === 7) {
                      l(
                        T,
                        E.sibling
                      ), Z = a(
                        E,
                        U.props.children
                      ), Z.return = T, T = Z;
                      break t;
                    }
                  } else if (E.elementType === it || typeof it == "object" && it !== null && it.$$typeof === F && Sn(it) === E.type) {
                    l(
                      T,
                      E.sibling
                    ), Z = a(E, U.props), Ga(Z, U), Z.return = T, T = Z;
                    break t;
                  }
                  l(T, E);
                  break;
                } else e(T, E);
                E = E.sibling;
              }
              U.type === C ? (Z = yn(
                U.props.children,
                T.mode,
                Z,
                U.key
              ), Z.return = T, T = Z) : (Z = Yu(
                U.type,
                U.key,
                U.props,
                null,
                T.mode,
                Z
              ), Ga(Z, U), Z.return = T, T = Z);
            }
            return i(T);
          case j:
            t: {
              for (it = U.key; E !== null; ) {
                if (E.key === it)
                  if (E.tag === 4 && E.stateNode.containerInfo === U.containerInfo && E.stateNode.implementation === U.implementation) {
                    l(
                      T,
                      E.sibling
                    ), Z = a(E, U.children || []), Z.return = T, T = Z;
                    break t;
                  } else {
                    l(T, E);
                    break;
                  }
                else e(T, E);
                E = E.sibling;
              }
              Z = _c(U, T.mode, Z), Z.return = T, T = Z;
            }
            return i(T);
          case F:
            return U = Sn(U), Ct(
              T,
              E,
              U,
              Z
            );
        }
        if (Y(U))
          return nt(
            T,
            E,
            U,
            Z
          );
        if (w(U)) {
          if (it = w(U), typeof it != "function") throw Error(f(150));
          return U = it.call(U), ft(
            T,
            E,
            U,
            Z
          );
        }
        if (typeof U.then == "function")
          return Ct(
            T,
            E,
            Zu(U),
            Z
          );
        if (U.$$typeof === H)
          return Ct(
            T,
            E,
            Gu(T, U),
            Z
          );
        wu(T, U);
      }
      return typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint" ? (U = "" + U, E !== null && E.tag === 6 ? (l(T, E.sibling), Z = a(E, U), Z.return = T, T = Z) : (l(T, E), Z = pc(U, T.mode, Z), Z.return = T, T = Z), i(T)) : l(T, E);
    }
    return function(T, E, U, Z) {
      try {
        La = 0;
        var it = Ct(
          T,
          E,
          U,
          Z
        );
        return aa = null, it;
      } catch (at) {
        if (at === na || at === Vu) throw at;
        var Et = Ee(29, at, null, T.mode);
        return Et.lanes = Z, Et.return = T, Et;
      } finally {
      }
    };
  }
  var On = xo(!0), Ho = xo(!1), Hl = !1;
  function Cc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Nc(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Yl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Kl(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (At & 2) !== 0) {
      var a = n.pending;
      return a === null ? e.next = e : (e.next = a.next, a.next = e), n.pending = e, e = Hu(t), So(t, null, l), e;
    }
    return xu(t, n, e, l), Hu(t);
  }
  function Qa(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, Tr(t, l);
    }
  }
  function Uc(t, e) {
    var l = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var a = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var i = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? a = u = i : u = u.next = i, l = l.next;
        } while (l !== null);
        u === null ? a = u = e : u = u.next = e;
      } else a = u = e;
      l = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: u,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var Bc = !1;
  function Va() {
    if (Bc) {
      var t = la;
      if (t !== null) throw t;
    }
  }
  function Xa(t, e, l, n) {
    Bc = !1;
    var a = t.updateQueue;
    Hl = !1;
    var u = a.firstBaseUpdate, i = a.lastBaseUpdate, o = a.shared.pending;
    if (o !== null) {
      a.shared.pending = null;
      var _ = o, B = _.next;
      _.next = null, i === null ? u = B : i.next = B, i = _;
      var G = t.alternate;
      G !== null && (G = G.updateQueue, o = G.lastBaseUpdate, o !== i && (o === null ? G.firstBaseUpdate = B : o.next = B, G.lastBaseUpdate = _));
    }
    if (u !== null) {
      var $ = a.baseState;
      i = 0, G = B = _ = null, o = u;
      do {
        var x = o.lane & -536870913, K = x !== o.lane;
        if (K ? (pt & x) === x : (n & x) === x) {
          x !== 0 && x === ea && (Bc = !0), G !== null && (G = G.next = {
            lane: 0,
            tag: o.tag,
            payload: o.payload,
            callback: null,
            next: null
          });
          t: {
            var nt = t, ft = o;
            x = e;
            var Ct = l;
            switch (ft.tag) {
              case 1:
                if (nt = ft.payload, typeof nt == "function") {
                  $ = nt.call(Ct, $, x);
                  break t;
                }
                $ = nt;
                break t;
              case 3:
                nt.flags = nt.flags & -65537 | 128;
              case 0:
                if (nt = ft.payload, x = typeof nt == "function" ? nt.call(Ct, $, x) : nt, x == null) break t;
                $ = O({}, $, x);
                break t;
              case 2:
                Hl = !0;
            }
          }
          x = o.callback, x !== null && (t.flags |= 64, K && (t.flags |= 8192), K = a.callbacks, K === null ? a.callbacks = [x] : K.push(x));
        } else
          K = {
            lane: x,
            tag: o.tag,
            payload: o.payload,
            callback: o.callback,
            next: null
          }, G === null ? (B = G = K, _ = $) : G = G.next = K, i |= x;
        if (o = o.next, o === null) {
          if (o = a.shared.pending, o === null)
            break;
          K = o, o = K.next, K.next = null, a.lastBaseUpdate = K, a.shared.pending = null;
        }
      } while (!0);
      G === null && (_ = $), a.baseState = _, a.firstBaseUpdate = B, a.lastBaseUpdate = G, u === null && (a.shared.lanes = 0), Xl |= i, t.lanes = i, t.memoizedState = $;
    }
  }
  function Yo(t, e) {
    if (typeof t != "function")
      throw Error(f(191, t));
    t.call(e);
  }
  function Ko(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Yo(l[t], e);
  }
  var ua = b(null), Ju = b(0);
  function Lo(t, e) {
    t = Ol, et(Ju, t), et(ua, e), Ol = t | e.baseLanes;
  }
  function qc() {
    et(Ju, Ol), et(ua, ua.current);
  }
  function xc() {
    Ol = Ju.current, J(ua), J(Ju);
  }
  var Me = b(null), Ve = null;
  function Ll(t) {
    var e = t.alternate;
    et(Vt, Vt.current & 1), et(Me, t), Ve === null && (e === null || ua.current !== null || e.memoizedState !== null) && (Ve = t);
  }
  function Hc(t) {
    et(Vt, Vt.current), et(Me, t), Ve === null && (Ve = t);
  }
  function Go(t) {
    t.tag === 22 ? (et(Vt, Vt.current), et(Me, t), Ve === null && (Ve = t)) : Gl();
  }
  function Gl() {
    et(Vt, Vt.current), et(Me, Me.current);
  }
  function Ae(t) {
    J(Me), Ve === t && (Ve = null), J(Vt);
  }
  var Vt = b(0);
  function $u(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Xf(l) || Zf(l)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var hl = 0, vt = null, Dt = null, Jt = null, Wu = !1, ia = !1, En = !1, Fu = 0, Za = 0, ca = null, By = 0;
  function Kt() {
    throw Error(f(321));
  }
  function Yc(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Oe(t[l], e[l])) return !1;
    return !0;
  }
  function Kc(t, e, l, n, a, u) {
    return hl = u, vt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, N.H = t === null || t.memoizedState === null ? Ms : tf, En = !1, u = l(n, a), En = !1, ia && (u = Vo(
      e,
      l,
      n,
      a
    )), Qo(t), u;
  }
  function Qo(t) {
    N.H = $a;
    var e = Dt !== null && Dt.next !== null;
    if (hl = 0, Jt = Dt = vt = null, Wu = !1, Za = 0, ca = null, e) throw Error(f(300));
    t === null || $t || (t = t.dependencies, t !== null && Lu(t) && ($t = !0));
  }
  function Vo(t, e, l, n) {
    vt = t;
    var a = 0;
    do {
      if (ia && (ca = null), Za = 0, ia = !1, 25 <= a) throw Error(f(301));
      if (a += 1, Jt = Dt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      N.H = As, u = e(l, n);
    } while (ia);
    return u;
  }
  function qy() {
    var t = N.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? wa(e) : e, t = t.useState()[0], (Dt !== null ? Dt.memoizedState : null) !== t && (vt.flags |= 1024), e;
  }
  function Lc() {
    var t = Fu !== 0;
    return Fu = 0, t;
  }
  function Gc(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Qc(t) {
    if (Wu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Wu = !1;
    }
    hl = 0, Jt = Dt = vt = null, ia = !1, Za = Fu = 0, ca = null;
  }
  function re() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Jt === null ? vt.memoizedState = Jt = t : Jt = Jt.next = t, Jt;
  }
  function Xt() {
    if (Dt === null) {
      var t = vt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Dt.next;
    var e = Jt === null ? vt.memoizedState : Jt.next;
    if (e !== null)
      Jt = e, Dt = t;
    else {
      if (t === null)
        throw vt.alternate === null ? Error(f(467)) : Error(f(310));
      Dt = t, t = {
        memoizedState: Dt.memoizedState,
        baseState: Dt.baseState,
        baseQueue: Dt.baseQueue,
        queue: Dt.queue,
        next: null
      }, Jt === null ? vt.memoizedState = Jt = t : Jt = Jt.next = t;
    }
    return Jt;
  }
  function ku() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function wa(t) {
    var e = Za;
    return Za += 1, ca === null && (ca = []), t = Uo(ca, t, e), e = vt, (Jt === null ? e.memoizedState : Jt.next) === null && (e = e.alternate, N.H = e === null || e.memoizedState === null ? Ms : tf), t;
  }
  function Iu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return wa(t);
      if (t.$$typeof === H) return ae(t);
    }
    throw Error(f(438, String(t)));
  }
  function Vc(t) {
    var e = null, l = vt.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var n = vt.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (e = {
        data: n.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = ku(), vt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++)
        l[n] = A;
    return e.index++, l;
  }
  function yl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Pu(t) {
    var e = Xt();
    return Xc(e, Dt, t);
  }
  function Xc(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(f(311));
    n.lastRenderedReducer = l;
    var a = t.baseQueue, u = n.pending;
    if (u !== null) {
      if (a !== null) {
        var i = a.next;
        a.next = u.next, u.next = i;
      }
      e.baseQueue = a = u, n.pending = null;
    }
    if (u = t.baseState, a === null) t.memoizedState = u;
    else {
      e = a.next;
      var o = i = null, _ = null, B = e, G = !1;
      do {
        var $ = B.lane & -536870913;
        if ($ !== B.lane ? (pt & $) === $ : (hl & $) === $) {
          var x = B.revertLane;
          if (x === 0)
            _ !== null && (_ = _.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: B.action,
              hasEagerState: B.hasEagerState,
              eagerState: B.eagerState,
              next: null
            }), $ === ea && (G = !0);
          else if ((hl & x) === x) {
            B = B.next, x === ea && (G = !0);
            continue;
          } else
            $ = {
              lane: 0,
              revertLane: B.revertLane,
              gesture: null,
              action: B.action,
              hasEagerState: B.hasEagerState,
              eagerState: B.eagerState,
              next: null
            }, _ === null ? (o = _ = $, i = u) : _ = _.next = $, vt.lanes |= x, Xl |= x;
          $ = B.action, En && l(u, $), u = B.hasEagerState ? B.eagerState : l(u, $);
        } else
          x = {
            lane: $,
            revertLane: B.revertLane,
            gesture: B.gesture,
            action: B.action,
            hasEagerState: B.hasEagerState,
            eagerState: B.eagerState,
            next: null
          }, _ === null ? (o = _ = x, i = u) : _ = _.next = x, vt.lanes |= $, Xl |= $;
        B = B.next;
      } while (B !== null && B !== e);
      if (_ === null ? i = u : _.next = o, !Oe(u, t.memoizedState) && ($t = !0, G && (l = la, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = _, n.lastRenderedState = u;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function Zc(t) {
    var e = Xt(), l = e.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch, a = l.pending, u = e.memoizedState;
    if (a !== null) {
      l.pending = null;
      var i = a = a.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== a);
      Oe(u, e.memoizedState) || ($t = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, n];
  }
  function Xo(t, e, l) {
    var n = vt, a = Xt(), u = St;
    if (u) {
      if (l === void 0) throw Error(f(407));
      l = l();
    } else l = e();
    var i = !Oe(
      (Dt || a).memoizedState,
      l
    );
    if (i && (a.memoizedState = l, $t = !0), a = a.queue, $c(Jo.bind(null, n, a, t), [
      t
    ]), a.getSnapshot !== e || i || Jt !== null && Jt.memoizedState.tag & 1) {
      if (n.flags |= 2048, fa(
        9,
        { destroy: void 0 },
        wo.bind(
          null,
          n,
          a,
          l,
          e
        ),
        null
      ), Ut === null) throw Error(f(349));
      u || (hl & 127) !== 0 || Zo(n, e, l);
    }
    return l;
  }
  function Zo(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = vt.updateQueue, e === null ? (e = ku(), vt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function wo(t, e, l, n) {
    e.value = l, e.getSnapshot = n, $o(e) && Wo(t);
  }
  function Jo(t, e, l) {
    return l(function() {
      $o(e) && Wo(t);
    });
  }
  function $o(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Oe(t, l);
    } catch {
      return !0;
    }
  }
  function Wo(t) {
    var e = hn(t, 2);
    e !== null && pe(e, t, 2);
  }
  function wc(t) {
    var e = re();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), En) {
        jl(!0);
        try {
          l();
        } finally {
          jl(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: yl,
      lastRenderedState: t
    }, e;
  }
  function Fo(t, e, l, n) {
    return t.baseState = l, Xc(
      t,
      Dt,
      typeof n == "function" ? n : yl
    );
  }
  function xy(t, e, l, n, a) {
    if (li(t)) throw Error(f(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: a,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          u.listeners.push(i);
        }
      };
      N.T !== null ? l(!0) : u.isTransition = !1, n(u), l = e.pending, l === null ? (u.next = e.pending = u, ko(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function ko(t, e) {
    var l = e.action, n = e.payload, a = t.state;
    if (e.isTransition) {
      var u = N.T, i = {};
      N.T = i;
      try {
        var o = l(a, n), _ = N.S;
        _ !== null && _(i, o), Io(t, e, o);
      } catch (B) {
        Jc(t, e, B);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), N.T = u;
      }
    } else
      try {
        u = l(a, n), Io(t, e, u);
      } catch (B) {
        Jc(t, e, B);
      }
  }
  function Io(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        Po(t, e, n);
      },
      function(n) {
        return Jc(t, e, n);
      }
    ) : Po(t, e, l);
  }
  function Po(t, e, l) {
    e.status = "fulfilled", e.value = l, ts(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, ko(t, l)));
  }
  function Jc(t, e, l) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        e.status = "rejected", e.reason = l, ts(e), e = e.next;
      while (e !== n);
    }
    t.action = null;
  }
  function ts(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function es(t, e) {
    return e;
  }
  function ls(t, e) {
    if (St) {
      var l = Ut.formState;
      if (l !== null) {
        t: {
          var n = vt;
          if (St) {
            if (Bt) {
              e: {
                for (var a = Bt, u = Qe; a.nodeType !== 8; ) {
                  if (!u) {
                    a = null;
                    break e;
                  }
                  if (a = Xe(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break e;
                  }
                }
                u = a.data, a = u === "F!" || u === "F" ? a : null;
              }
              if (a) {
                Bt = Xe(
                  a.nextSibling
                ), n = a.data === "F!";
                break t;
              }
            }
            ql(n);
          }
          n = !1;
        }
        n && (e = l[0]);
      }
    }
    return l = re(), l.memoizedState = l.baseState = e, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: es,
      lastRenderedState: e
    }, l.queue = n, l = bs.bind(
      null,
      vt,
      n
    ), n.dispatch = l, n = wc(!1), u = Pc.bind(
      null,
      vt,
      !1,
      n.queue
    ), n = re(), a = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, l = xy.bind(
      null,
      vt,
      a,
      u,
      l
    ), a.dispatch = l, n.memoizedState = t, [e, l, !1];
  }
  function ns(t) {
    var e = Xt();
    return as(e, Dt, t);
  }
  function as(t, e, l) {
    if (e = Xc(
      t,
      e,
      es
    )[0], t = Pu(yl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var n = wa(e);
      } catch (i) {
        throw i === na ? Vu : i;
      }
    else n = e;
    e = Xt();
    var a = e.queue, u = a.dispatch;
    return l !== e.memoizedState && (vt.flags |= 2048, fa(
      9,
      { destroy: void 0 },
      Hy.bind(null, a, l),
      null
    )), [n, u, t];
  }
  function Hy(t, e) {
    t.action = e;
  }
  function us(t) {
    var e = Xt(), l = Dt;
    if (l !== null)
      return as(e, l, t);
    Xt(), e = e.memoizedState, l = Xt();
    var n = l.queue.dispatch;
    return l.memoizedState = t, [e, n, !1];
  }
  function fa(t, e, l, n) {
    return t = { tag: t, create: l, deps: n, inst: e, next: null }, e = vt.updateQueue, e === null && (e = ku(), vt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (n = l.next, l.next = t, t.next = n, e.lastEffect = t), t;
  }
  function is() {
    return Xt().memoizedState;
  }
  function ti(t, e, l, n) {
    var a = re();
    vt.flags |= t, a.memoizedState = fa(
      1 | e,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function ei(t, e, l, n) {
    var a = Xt();
    n = n === void 0 ? null : n;
    var u = a.memoizedState.inst;
    Dt !== null && n !== null && Yc(n, Dt.memoizedState.deps) ? a.memoizedState = fa(e, u, l, n) : (vt.flags |= t, a.memoizedState = fa(
      1 | e,
      u,
      l,
      n
    ));
  }
  function cs(t, e) {
    ti(8390656, 8, t, e);
  }
  function $c(t, e) {
    ei(2048, 8, t, e);
  }
  function Yy(t) {
    vt.flags |= 4;
    var e = vt.updateQueue;
    if (e === null)
      e = ku(), vt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function fs(t) {
    var e = Xt().memoizedState;
    return Yy({ ref: e, nextImpl: t }), function() {
      if ((At & 2) !== 0) throw Error(f(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function rs(t, e) {
    return ei(4, 2, t, e);
  }
  function os(t, e) {
    return ei(4, 4, t, e);
  }
  function ss(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function() {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function vs(t, e, l) {
    l = l != null ? l.concat([t]) : null, ei(4, 4, ss.bind(null, e, t), l);
  }
  function Wc() {
  }
  function ds(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && Yc(e, n[1]) ? n[0] : (l.memoizedState = [t, e], t);
  }
  function hs(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && Yc(e, n[1]))
      return n[0];
    if (n = t(), En) {
      jl(!0);
      try {
        t();
      } finally {
        jl(!1);
      }
    }
    return l.memoizedState = [n, e], n;
  }
  function Fc(t, e, l) {
    return l === void 0 || (hl & 1073741824) !== 0 && (pt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = yv(), vt.lanes |= t, Xl |= t, l);
  }
  function ys(t, e, l, n) {
    return Oe(l, e) ? l : ua.current !== null ? (t = Fc(t, l, n), Oe(t, e) || ($t = !0), t) : (hl & 42) === 0 || (hl & 1073741824) !== 0 && (pt & 261930) === 0 ? ($t = !0, t.memoizedState = l) : (t = yv(), vt.lanes |= t, Xl |= t, e);
  }
  function ms(t, e, l, n, a) {
    var u = V.p;
    V.p = u !== 0 && 8 > u ? u : 8;
    var i = N.T, o = {};
    N.T = o, Pc(t, !1, e, l);
    try {
      var _ = a(), B = N.S;
      if (B !== null && B(o, _), _ !== null && typeof _ == "object" && typeof _.then == "function") {
        var G = Uy(
          _,
          n
        );
        Ja(
          t,
          e,
          G,
          Re(t)
        );
      } else
        Ja(
          t,
          e,
          n,
          Re(t)
        );
    } catch ($) {
      Ja(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: $ },
        Re()
      );
    } finally {
      V.p = u, i !== null && o.types !== null && (i.types = o.types), N.T = i;
    }
  }
  function Ky() {
  }
  function kc(t, e, l, n) {
    if (t.tag !== 5) throw Error(f(476));
    var a = gs(t).queue;
    ms(
      t,
      a,
      e,
      ut,
      l === null ? Ky : function() {
        return ps(t), l(n);
      }
    );
  }
  function gs(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: ut,
      baseState: ut,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: yl,
        lastRenderedState: ut
      },
      next: null
    };
    var l = {};
    return e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: yl,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function ps(t) {
    var e = gs(t);
    e.next === null && (e = t.alternate.memoizedState), Ja(
      t,
      e.next.queue,
      {},
      Re()
    );
  }
  function Ic() {
    return ae(ou);
  }
  function _s() {
    return Xt().memoizedState;
  }
  function Ss() {
    return Xt().memoizedState;
  }
  function Ly(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Re();
          t = Yl(l);
          var n = Kl(e, t, l);
          n !== null && (pe(n, e, l), Qa(n, e, l)), e = { cache: Tc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Gy(t, e, l) {
    var n = Re();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, li(t) ? Os(e, l) : (l = mc(t, e, l, n), l !== null && (pe(l, t, n), Es(l, e, n)));
  }
  function bs(t, e, l) {
    var n = Re();
    Ja(t, e, l, n);
  }
  function Ja(t, e, l, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (li(t)) Os(e, a);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, o = u(i, l);
          if (a.hasEagerState = !0, a.eagerState = o, Oe(o, i))
            return xu(t, e, a, 0), Ut === null && qu(), !1;
        } catch {
        } finally {
        }
      if (l = mc(t, e, a, n), l !== null)
        return pe(l, t, n), Es(l, e, n), !0;
    }
    return !1;
  }
  function Pc(t, e, l, n) {
    if (n = {
      lane: 2,
      revertLane: Nf(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, li(t)) {
      if (e) throw Error(f(479));
    } else
      e = mc(
        t,
        l,
        n,
        2
      ), e !== null && pe(e, t, 2);
  }
  function li(t) {
    var e = t.alternate;
    return t === vt || e !== null && e === vt;
  }
  function Os(t, e) {
    ia = Wu = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function Es(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, Tr(t, l);
    }
  }
  var $a = {
    readContext: ae,
    use: Iu,
    useCallback: Kt,
    useContext: Kt,
    useEffect: Kt,
    useImperativeHandle: Kt,
    useLayoutEffect: Kt,
    useInsertionEffect: Kt,
    useMemo: Kt,
    useReducer: Kt,
    useRef: Kt,
    useState: Kt,
    useDebugValue: Kt,
    useDeferredValue: Kt,
    useTransition: Kt,
    useSyncExternalStore: Kt,
    useId: Kt,
    useHostTransitionStatus: Kt,
    useFormState: Kt,
    useActionState: Kt,
    useOptimistic: Kt,
    useMemoCache: Kt,
    useCacheRefresh: Kt
  };
  $a.useEffectEvent = Kt;
  var Ms = {
    readContext: ae,
    use: Iu,
    useCallback: function(t, e) {
      return re().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ae,
    useEffect: cs,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, ti(
        4194308,
        4,
        ss.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return ti(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      ti(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = re();
      e = e === void 0 ? null : e;
      var n = t();
      if (En) {
        jl(!0);
        try {
          t();
        } finally {
          jl(!1);
        }
      }
      return l.memoizedState = [n, e], n;
    },
    useReducer: function(t, e, l) {
      var n = re();
      if (l !== void 0) {
        var a = l(e);
        if (En) {
          jl(!0);
          try {
            l(e);
          } finally {
            jl(!1);
          }
        }
      } else a = e;
      return n.memoizedState = n.baseState = a, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a
      }, n.queue = t, t = t.dispatch = Gy.bind(
        null,
        vt,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var e = re();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = wc(t);
      var e = t.queue, l = bs.bind(null, vt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Wc,
    useDeferredValue: function(t, e) {
      var l = re();
      return Fc(l, t, e);
    },
    useTransition: function() {
      var t = wc(!1);
      return t = ms.bind(
        null,
        vt,
        t.queue,
        !0,
        !1
      ), re().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var n = vt, a = re();
      if (St) {
        if (l === void 0)
          throw Error(f(407));
        l = l();
      } else {
        if (l = e(), Ut === null)
          throw Error(f(349));
        (pt & 127) !== 0 || Zo(n, e, l);
      }
      a.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return a.queue = u, cs(Jo.bind(null, n, u, t), [
        t
      ]), n.flags |= 2048, fa(
        9,
        { destroy: void 0 },
        wo.bind(
          null,
          n,
          u,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = re(), e = Ut.identifierPrefix;
      if (St) {
        var l = ll, n = el;
        l = (n & ~(1 << 32 - be(n) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = Fu++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = By++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Ic,
    useFormState: ls,
    useActionState: ls,
    useOptimistic: function(t) {
      var e = re();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = Pc.bind(
        null,
        vt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Vc,
    useCacheRefresh: function() {
      return re().memoizedState = Ly.bind(
        null,
        vt
      );
    },
    useEffectEvent: function(t) {
      var e = re(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((At & 2) !== 0)
          throw Error(f(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, tf = {
    readContext: ae,
    use: Iu,
    useCallback: ds,
    useContext: ae,
    useEffect: $c,
    useImperativeHandle: vs,
    useInsertionEffect: rs,
    useLayoutEffect: os,
    useMemo: hs,
    useReducer: Pu,
    useRef: is,
    useState: function() {
      return Pu(yl);
    },
    useDebugValue: Wc,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return ys(
        l,
        Dt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Pu(yl)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : wa(t),
        e
      ];
    },
    useSyncExternalStore: Xo,
    useId: _s,
    useHostTransitionStatus: Ic,
    useFormState: ns,
    useActionState: ns,
    useOptimistic: function(t, e) {
      var l = Xt();
      return Fo(l, Dt, t, e);
    },
    useMemoCache: Vc,
    useCacheRefresh: Ss
  };
  tf.useEffectEvent = fs;
  var As = {
    readContext: ae,
    use: Iu,
    useCallback: ds,
    useContext: ae,
    useEffect: $c,
    useImperativeHandle: vs,
    useInsertionEffect: rs,
    useLayoutEffect: os,
    useMemo: hs,
    useReducer: Zc,
    useRef: is,
    useState: function() {
      return Zc(yl);
    },
    useDebugValue: Wc,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return Dt === null ? Fc(l, t, e) : ys(
        l,
        Dt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Zc(yl)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : wa(t),
        e
      ];
    },
    useSyncExternalStore: Xo,
    useId: _s,
    useHostTransitionStatus: Ic,
    useFormState: us,
    useActionState: us,
    useOptimistic: function(t, e) {
      var l = Xt();
      return Dt !== null ? Fo(l, Dt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Vc,
    useCacheRefresh: Ss
  };
  As.useEffectEvent = fs;
  function ef(t, e, l, n) {
    e = t.memoizedState, l = l(n, e), l = l == null ? e : O({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var lf = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var n = Re(), a = Yl(n);
      a.payload = e, l != null && (a.callback = l), e = Kl(t, a, n), e !== null && (pe(e, t, n), Qa(e, t, n));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var n = Re(), a = Yl(n);
      a.tag = 1, a.payload = e, l != null && (a.callback = l), e = Kl(t, a, n), e !== null && (pe(e, t, n), Qa(e, t, n));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Re(), n = Yl(l);
      n.tag = 2, e != null && (n.callback = e), e = Kl(t, n, l), e !== null && (pe(e, t, l), Qa(e, t, l));
    }
  };
  function zs(t, e, l, n, a, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, u, i) : e.prototype && e.prototype.isPureReactComponent ? !Ba(l, n) || !Ba(a, u) : !0;
  }
  function Ts(t, e, l, n) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, n), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, n), e.state !== t && lf.enqueueReplaceState(e, e.state, null);
  }
  function Mn(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var n in e)
        n !== "ref" && (l[n] = e[n]);
    }
    if (t = t.defaultProps) {
      l === e && (l = O({}, l));
      for (var a in t)
        l[a] === void 0 && (l[a] = t[a]);
    }
    return l;
  }
  function Rs(t) {
    Bu(t);
  }
  function Ds(t) {
    console.error(t);
  }
  function js(t) {
    Bu(t);
  }
  function ni(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Cs(t, e, l) {
    try {
      var n = t.onCaughtError;
      n(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function nf(t, e, l) {
    return l = Yl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      ni(t, e);
    }, l;
  }
  function Ns(t) {
    return t = Yl(t), t.tag = 3, t;
  }
  function Us(t, e, l, n) {
    var a = l.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = n.value;
      t.payload = function() {
        return a(u);
      }, t.callback = function() {
        Cs(e, l, n);
      };
    }
    var i = l.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Cs(e, l, n), typeof a != "function" && (Zl === null ? Zl = /* @__PURE__ */ new Set([this]) : Zl.add(this));
      var o = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: o !== null ? o : ""
      });
    });
  }
  function Qy(t, e, l, n, a) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (e = l.alternate, e !== null && ta(
        e,
        l,
        a,
        !0
      ), l = Me.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Ve === null ? yi() : l.alternate === null && Lt === 0 && (Lt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, n === Xu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : e.add(n), Df(t, n, a)), !1;
          case 22:
            return l.flags |= 65536, n === Xu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), Df(t, n, a)), !1;
        }
        throw Error(f(435, l.tag));
      }
      return Df(t, n, a), yi(), !1;
    }
    if (St)
      return e = Me.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = a, n !== Oc && (t = Error(f(422), { cause: n }), Ha(Ke(t, l)))) : (n !== Oc && (e = Error(f(423), {
        cause: n
      }), Ha(
        Ke(e, l)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = Ke(n, l), a = nf(
        t.stateNode,
        n,
        a
      ), Uc(t, a), Lt !== 4 && (Lt = 2)), !1;
    var u = Error(f(520), { cause: n });
    if (u = Ke(u, l), lu === null ? lu = [u] : lu.push(u), Lt !== 4 && (Lt = 2), e === null) return !0;
    n = Ke(n, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = a & -a, l.lanes |= t, t = nf(l.stateNode, n, t), Uc(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Zl === null || !Zl.has(u))))
            return l.flags |= 65536, a &= -a, l.lanes |= a, a = Ns(a), Us(
              a,
              t,
              l,
              n
            ), Uc(l, a), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var af = Error(f(461)), $t = !1;
  function ue(t, e, l, n) {
    e.child = t === null ? Ho(e, null, l, n) : On(
      e,
      t.child,
      l,
      n
    );
  }
  function Bs(t, e, l, n, a) {
    l = l.render;
    var u = e.ref;
    if ("ref" in n) {
      var i = {};
      for (var o in n)
        o !== "ref" && (i[o] = n[o]);
    } else i = n;
    return pn(e), n = Kc(
      t,
      e,
      l,
      i,
      u,
      a
    ), o = Lc(), t !== null && !$t ? (Gc(t, e, a), ml(t, e, a)) : (St && o && Sc(e), e.flags |= 1, ue(t, e, n, a), e.child);
  }
  function qs(t, e, l, n, a) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !gc(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, xs(
        t,
        e,
        u,
        n,
        a
      )) : (t = Yu(
        l.type,
        null,
        n,
        e,
        e.mode,
        a
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !df(t, a)) {
      var i = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ba, l(i, n) && t.ref === e.ref)
        return ml(t, e, a);
    }
    return e.flags |= 1, t = ol(u, n), t.ref = e.ref, t.return = e, e.child = t;
  }
  function xs(t, e, l, n, a) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (Ba(u, n) && t.ref === e.ref)
        if ($t = !1, e.pendingProps = n = u, df(t, a))
          (t.flags & 131072) !== 0 && ($t = !0);
        else
          return e.lanes = t.lanes, ml(t, e, a);
    }
    return uf(
      t,
      e,
      l,
      n,
      a
    );
  }
  function Hs(t, e, l, n) {
    var a = n.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, t !== null) {
          for (n = e.child = t.child, a = 0; n !== null; )
            a = a | n.lanes | n.childLanes, n = n.sibling;
          n = a & ~u;
        } else n = 0, e.child = null;
        return Ys(
          t,
          e,
          u,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Qu(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Lo(e, u) : qc(), Go(e);
      else
        return n = e.lanes = 536870912, Ys(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          n
        );
    } else
      u !== null ? (Qu(e, u.cachePool), Lo(e, u), Gl(), e.memoizedState = null) : (t !== null && Qu(e, null), qc(), Gl());
    return ue(t, e, a, l), e.child;
  }
  function Wa(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Ys(t, e, l, n, a) {
    var u = Dc();
    return u = u === null ? null : { parent: wt._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && Qu(e, null), qc(), Go(e), t !== null && ta(t, e, n, !0), e.childLanes = a, null;
  }
  function ai(t, e) {
    return e = ii(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Ks(t, e, l) {
    return On(e, t.child, null, l), t = ai(e, e.pendingProps), t.flags |= 2, Ae(e), e.memoizedState = null, t;
  }
  function Vy(t, e, l) {
    var n = e.pendingProps, a = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (St) {
        if (n.mode === "hidden")
          return t = ai(e, n), e.lanes = 536870912, Wa(null, t);
        if (Hc(e), (t = Bt) ? (t = kv(
          t,
          Qe
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Ul !== null ? { id: el, overflow: ll } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Oo(t), l.return = e, e.child = l, ne = e, Bt = null)) : t = null, t === null) throw ql(e);
        return e.lanes = 536870912, null;
      }
      return ai(e, n);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Hc(e), a)
        if (e.flags & 256)
          e.flags &= -257, e = Ks(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(f(558));
      else if ($t || ta(t, e, l, !1), a = (l & t.childLanes) !== 0, $t || a) {
        if (n = Ut, n !== null && (i = Rr(n, l), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, hn(t, i), pe(n, t, i), af;
        yi(), e = Ks(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Bt = Xe(i.nextSibling), ne = e, St = !0, Bl = null, Qe = !1, t !== null && Ao(e, t), e = ai(e, n), e.flags |= 4096;
      return e;
    }
    return t = ol(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function ui(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(f(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function uf(t, e, l, n, a) {
    return pn(e), l = Kc(
      t,
      e,
      l,
      n,
      void 0,
      a
    ), n = Lc(), t !== null && !$t ? (Gc(t, e, a), ml(t, e, a)) : (St && n && Sc(e), e.flags |= 1, ue(t, e, l, a), e.child);
  }
  function Ls(t, e, l, n, a, u) {
    return pn(e), e.updateQueue = null, l = Vo(
      e,
      n,
      l,
      a
    ), Qo(t), n = Lc(), t !== null && !$t ? (Gc(t, e, u), ml(t, e, u)) : (St && n && Sc(e), e.flags |= 1, ue(t, e, l, u), e.child);
  }
  function Gs(t, e, l, n, a) {
    if (pn(e), e.stateNode === null) {
      var u = Fn, i = l.contextType;
      typeof i == "object" && i !== null && (u = ae(i)), u = new l(n, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = lf, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = n, u.state = e.memoizedState, u.refs = {}, Cc(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? ae(i) : Fn, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (ef(
        e,
        l,
        i,
        n
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && lf.enqueueReplaceState(u, u.state, null), Xa(e, n, u, a), Va(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !0;
    } else if (t === null) {
      u = e.stateNode;
      var o = e.memoizedProps, _ = Mn(l, o);
      u.props = _;
      var B = u.context, G = l.contextType;
      i = Fn, typeof G == "object" && G !== null && (i = ae(G));
      var $ = l.getDerivedStateFromProps;
      G = typeof $ == "function" || typeof u.getSnapshotBeforeUpdate == "function", o = e.pendingProps !== o, G || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (o || B !== i) && Ts(
        e,
        u,
        n,
        i
      ), Hl = !1;
      var x = e.memoizedState;
      u.state = x, Xa(e, n, u, a), Va(), B = e.memoizedState, o || x !== B || Hl ? (typeof $ == "function" && (ef(
        e,
        l,
        $,
        n
      ), B = e.memoizedState), (_ = Hl || zs(
        e,
        l,
        _,
        n,
        x,
        B,
        i
      )) ? (G || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = n, e.memoizedState = B), u.props = n, u.state = B, u.context = i, n = _) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
    } else {
      u = e.stateNode, Nc(t, e), i = e.memoizedProps, G = Mn(l, i), u.props = G, $ = e.pendingProps, x = u.context, B = l.contextType, _ = Fn, typeof B == "object" && B !== null && (_ = ae(B)), o = l.getDerivedStateFromProps, (B = typeof o == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== $ || x !== _) && Ts(
        e,
        u,
        n,
        _
      ), Hl = !1, x = e.memoizedState, u.state = x, Xa(e, n, u, a), Va();
      var K = e.memoizedState;
      i !== $ || x !== K || Hl || t !== null && t.dependencies !== null && Lu(t.dependencies) ? (typeof o == "function" && (ef(
        e,
        l,
        o,
        n
      ), K = e.memoizedState), (G = Hl || zs(
        e,
        l,
        G,
        n,
        x,
        K,
        _
      ) || t !== null && t.dependencies !== null && Lu(t.dependencies)) ? (B || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, K, _), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        K,
        _
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (e.flags |= 1024), e.memoizedProps = n, e.memoizedState = K), u.props = n, u.state = K, u.context = _, n = G) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (e.flags |= 1024), n = !1);
    }
    return u = n, ui(t, e), n = (e.flags & 128) !== 0, u || n ? (u = e.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && n ? (e.child = On(
      e,
      t.child,
      null,
      a
    ), e.child = On(
      e,
      null,
      l,
      a
    )) : ue(t, e, l, a), e.memoizedState = u.state, t = e.child) : t = ml(
      t,
      e,
      a
    ), t;
  }
  function Qs(t, e, l, n) {
    return mn(), e.flags |= 256, ue(t, e, l, n), e.child;
  }
  var cf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ff(t) {
    return { baseLanes: t, cachePool: Co() };
  }
  function rf(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Te), t;
  }
  function Vs(t, e, l) {
    var n = e.pendingProps, a = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Vt.current & 2) !== 0), i && (a = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (St) {
        if (a ? Ll(e) : Gl(), (t = Bt) ? (t = kv(
          t,
          Qe
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Ul !== null ? { id: el, overflow: ll } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Oo(t), l.return = e, e.child = l, ne = e, Bt = null)) : t = null, t === null) throw ql(e);
        return Zf(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var o = n.children;
      return n = n.fallback, a ? (Gl(), a = e.mode, o = ii(
        { mode: "hidden", children: o },
        a
      ), n = yn(
        n,
        a,
        l,
        null
      ), o.return = e, n.return = e, o.sibling = n, e.child = o, n = e.child, n.memoizedState = ff(l), n.childLanes = rf(
        t,
        i,
        l
      ), e.memoizedState = cf, Wa(null, n)) : (Ll(e), of(e, o));
    }
    var _ = t.memoizedState;
    if (_ !== null && (o = _.dehydrated, o !== null)) {
      if (u)
        e.flags & 256 ? (Ll(e), e.flags &= -257, e = sf(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (Gl(), e.child = t.child, e.flags |= 128, e = null) : (Gl(), o = n.fallback, a = e.mode, n = ii(
          { mode: "visible", children: n.children },
          a
        ), o = yn(
          o,
          a,
          l,
          null
        ), o.flags |= 2, n.return = e, o.return = e, n.sibling = o, e.child = n, On(
          e,
          t.child,
          null,
          l
        ), n = e.child, n.memoizedState = ff(l), n.childLanes = rf(
          t,
          i,
          l
        ), e.memoizedState = cf, e = Wa(null, n));
      else if (Ll(e), Zf(o)) {
        if (i = o.nextSibling && o.nextSibling.dataset, i) var B = i.dgst;
        i = B, n = Error(f(419)), n.stack = "", n.digest = i, Ha({ value: n, source: null, stack: null }), e = sf(
          t,
          e,
          l
        );
      } else if ($t || ta(t, e, l, !1), i = (l & t.childLanes) !== 0, $t || i) {
        if (i = Ut, i !== null && (n = Rr(i, l), n !== 0 && n !== _.retryLane))
          throw _.retryLane = n, hn(t, n), pe(i, t, n), af;
        Xf(o) || yi(), e = sf(
          t,
          e,
          l
        );
      } else
        Xf(o) ? (e.flags |= 192, e.child = t.child, e = null) : (t = _.treeContext, Bt = Xe(
          o.nextSibling
        ), ne = e, St = !0, Bl = null, Qe = !1, t !== null && Ao(e, t), e = of(
          e,
          n.children
        ), e.flags |= 4096);
      return e;
    }
    return a ? (Gl(), o = n.fallback, a = e.mode, _ = t.child, B = _.sibling, n = ol(_, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = _.subtreeFlags & 65011712, B !== null ? o = ol(
      B,
      o
    ) : (o = yn(
      o,
      a,
      l,
      null
    ), o.flags |= 2), o.return = e, n.return = e, n.sibling = o, e.child = n, Wa(null, n), n = e.child, o = t.child.memoizedState, o === null ? o = ff(l) : (a = o.cachePool, a !== null ? (_ = wt._currentValue, a = a.parent !== _ ? { parent: _, pool: _ } : a) : a = Co(), o = {
      baseLanes: o.baseLanes | l,
      cachePool: a
    }), n.memoizedState = o, n.childLanes = rf(
      t,
      i,
      l
    ), e.memoizedState = cf, Wa(t.child, n)) : (Ll(e), l = t.child, t = l.sibling, l = ol(l, {
      mode: "visible",
      children: n.children
    }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function of(t, e) {
    return e = ii(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function ii(t, e) {
    return t = Ee(22, t, null, e), t.lanes = 0, t;
  }
  function sf(t, e, l) {
    return On(e, t.child, null, l), t = of(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Xs(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), Ac(t.return, e, l);
  }
  function vf(t, e, l, n, a, u) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: a,
      treeForkCount: u
    } : (i.isBackwards = e, i.rendering = null, i.renderingStartTime = 0, i.last = n, i.tail = l, i.tailMode = a, i.treeForkCount = u);
  }
  function Zs(t, e, l) {
    var n = e.pendingProps, a = n.revealOrder, u = n.tail;
    n = n.children;
    var i = Vt.current, o = (i & 2) !== 0;
    if (o ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, et(Vt, i), ue(t, e, n, l), n = St ? xa : 0, !o && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Xs(t, l, e);
        else if (t.tag === 19)
          Xs(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (a) {
      case "forwards":
        for (l = e.child, a = null; l !== null; )
          t = l.alternate, t !== null && $u(t) === null && (a = l), l = l.sibling;
        l = a, l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), vf(
          e,
          !1,
          a,
          l,
          u,
          n
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, a = e.child, e.child = null; a !== null; ) {
          if (t = a.alternate, t !== null && $u(t) === null) {
            e.child = a;
            break;
          }
          t = a.sibling, a.sibling = l, l = a, a = t;
        }
        vf(
          e,
          !0,
          l,
          null,
          u,
          n
        );
        break;
      case "together":
        vf(
          e,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function ml(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), Xl |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (ta(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(f(153));
    if (e.child !== null) {
      for (t = e.child, l = ol(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = ol(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function df(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Lu(t)));
  }
  function Xy(t, e, l) {
    switch (e.tag) {
      case 3:
        It(e, e.stateNode.containerInfo), xl(e, wt, t.memoizedState.cache), mn();
        break;
      case 27:
      case 5:
        Rl(e);
        break;
      case 4:
        It(e, e.stateNode.containerInfo);
        break;
      case 10:
        xl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Hc(e), null;
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (Ll(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? Vs(t, e, l) : (Ll(e), t = ml(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        Ll(e);
        break;
      case 19:
        var a = (t.flags & 128) !== 0;
        if (n = (l & e.childLanes) !== 0, n || (ta(
          t,
          e,
          l,
          !1
        ), n = (l & e.childLanes) !== 0), a) {
          if (n)
            return Zs(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), et(Vt, Vt.current), n) break;
        return null;
      case 22:
        return e.lanes = 0, Hs(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        xl(e, wt, t.memoizedState.cache);
    }
    return ml(t, e, l);
  }
  function ws(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        $t = !0;
      else {
        if (!df(t, l) && (e.flags & 128) === 0)
          return $t = !1, Xy(
            t,
            e,
            l
          );
        $t = (t.flags & 131072) !== 0;
      }
    else
      $t = !1, St && (e.flags & 1048576) !== 0 && Mo(e, xa, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (t = Sn(e.elementType), e.type = t, typeof t == "function")
            gc(t) ? (n = Mn(t, n), e.tag = 1, e = Gs(
              null,
              e,
              t,
              n,
              l
            )) : (e.tag = 0, e = uf(
              null,
              e,
              t,
              n,
              l
            ));
          else {
            if (t != null) {
              var a = t.$$typeof;
              if (a === X) {
                e.tag = 11, e = Bs(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              } else if (a === tt) {
                e.tag = 14, e = qs(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              }
            }
            throw e = I(t) || t, Error(f(306, e, ""));
          }
        }
        return e;
      case 0:
        return uf(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return n = e.type, a = Mn(
          n,
          e.pendingProps
        ), Gs(
          t,
          e,
          n,
          a,
          l
        );
      case 3:
        t: {
          if (It(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(f(387));
          n = e.pendingProps;
          var u = e.memoizedState;
          a = u.element, Nc(t, e), Xa(e, n, null, l);
          var i = e.memoizedState;
          if (n = i.cache, xl(e, wt, n), n !== u.cache && zc(
            e,
            [wt],
            l,
            !0
          ), Va(), n = i.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: i.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Qs(
                t,
                e,
                n,
                l
              );
              break t;
            } else if (n !== a) {
              a = Ke(
                Error(f(424)),
                e
              ), Ha(a), e = Qs(
                t,
                e,
                n,
                l
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Bt = Xe(t.firstChild), ne = e, St = !0, Bl = null, Qe = !0, l = Ho(
                e,
                null,
                n,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (mn(), n === a) {
              e = ml(
                t,
                e,
                l
              );
              break t;
            }
            ue(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return ui(t, e), t === null ? (l = nd(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : St || (l = e.type, t = e.pendingProps, n = Oi(
          st.current
        ).createElement(l), n[le] = e, n[ve] = t, ie(n, l, t), Pt(n), e.stateNode = n) : e.memoizedState = nd(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Rl(e), t === null && St && (n = e.stateNode = td(
          e.type,
          e.pendingProps,
          st.current
        ), ne = e, Qe = !0, a = Bt, Wl(e.type) ? (wf = a, Bt = Xe(n.firstChild)) : Bt = a), ue(
          t,
          e,
          e.pendingProps.children,
          l
        ), ui(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && St && ((a = n = Bt) && (n = S0(
          n,
          e.type,
          e.pendingProps,
          Qe
        ), n !== null ? (e.stateNode = n, ne = e, Bt = Xe(n.firstChild), Qe = !1, a = !0) : a = !1), a || ql(e)), Rl(e), a = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, n = u.children, Gf(a, u) ? n = null : i !== null && Gf(a, i) && (e.flags |= 32), e.memoizedState !== null && (a = Kc(
          t,
          e,
          qy,
          null,
          null,
          l
        ), ou._currentValue = a), ui(t, e), ue(t, e, n, l), e.child;
      case 6:
        return t === null && St && ((t = l = Bt) && (l = b0(
          l,
          e.pendingProps,
          Qe
        ), l !== null ? (e.stateNode = l, ne = e, Bt = null, t = !0) : t = !1), t || ql(e)), null;
      case 13:
        return Vs(t, e, l);
      case 4:
        return It(
          e,
          e.stateNode.containerInfo
        ), n = e.pendingProps, t === null ? e.child = On(
          e,
          null,
          n,
          l
        ) : ue(t, e, n, l), e.child;
      case 11:
        return Bs(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return ue(
          t,
          e,
          e.pendingProps,
          l
        ), e.child;
      case 8:
        return ue(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return ue(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return n = e.pendingProps, xl(e, e.type, n.value), ue(t, e, n.children, l), e.child;
      case 9:
        return a = e.type._context, n = e.pendingProps.children, pn(e), a = ae(a), n = n(a), e.flags |= 1, ue(t, e, n, l), e.child;
      case 14:
        return qs(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return xs(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return Zs(t, e, l);
      case 31:
        return Vy(t, e, l);
      case 22:
        return Hs(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return pn(e), n = ae(wt), t === null ? (a = Dc(), a === null && (a = Ut, u = Tc(), a.pooledCache = u, u.refCount++, u !== null && (a.pooledCacheLanes |= l), a = u), e.memoizedState = { parent: n, cache: a }, Cc(e), xl(e, wt, a)) : ((t.lanes & l) !== 0 && (Nc(t, e), Xa(e, null, null, l), Va()), a = t.memoizedState, u = e.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), xl(e, wt, n)) : (n = u.cache, xl(e, wt, n), n !== a.cache && zc(
          e,
          [wt],
          l,
          !0
        ))), ue(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(f(156, e.tag));
  }
  function gl(t) {
    t.flags |= 4;
  }
  function hf(t, e, l, n, a) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (_v()) t.flags |= 8192;
        else
          throw bn = Xu, jc;
    } else t.flags &= -16777217;
  }
  function Js(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !fd(e))
      if (_v()) t.flags |= 8192;
      else
        throw bn = Xu, jc;
  }
  function ci(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Ar() : 536870912, t.lanes |= e, va |= e);
  }
  function Fa(t, e) {
    if (!St)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? t.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = t.tail;
          for (var n = null; l !== null; )
            l.alternate !== null && (n = l), l = l.sibling;
          n === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
      }
  }
  function qt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, n = 0;
    if (e)
      for (var a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags & 65011712, n |= a.flags & 65011712, a.return = t, a = a.sibling;
    else
      for (a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags, n |= a.flags, a.return = t, a = a.sibling;
    return t.subtreeFlags |= n, t.childLanes = l, e;
  }
  function Zy(t, e, l) {
    var n = e.pendingProps;
    switch (bc(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return qt(e), null;
      case 1:
        return qt(e), null;
      case 3:
        return l = e.stateNode, n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), dl(wt), xt(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Pn(e) ? gl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Ec())), qt(e), null;
      case 26:
        var a = e.type, u = e.memoizedState;
        return t === null ? (gl(e), u !== null ? (qt(e), Js(e, u)) : (qt(e), hf(
          e,
          a,
          null,
          n,
          l
        ))) : u ? u !== t.memoizedState ? (gl(e), qt(e), Js(e, u)) : (qt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== n && gl(e), qt(e), hf(
          e,
          a,
          t,
          n,
          l
        )), null;
      case 27:
        if (Dl(e), l = st.current, a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && gl(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(f(166));
            return qt(e), null;
          }
          t = lt.current, Pn(e) ? zo(e) : (t = td(a, n, l), e.stateNode = t, gl(e));
        }
        return qt(e), null;
      case 5:
        if (Dl(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && gl(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(f(166));
            return qt(e), null;
          }
          if (u = lt.current, Pn(e))
            zo(e);
          else {
            var i = Oi(
              st.current
            );
            switch (u) {
              case 1:
                u = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                u = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    u = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    u = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof n.is == "string" ? i.createElement("select", {
                      is: n.is
                    }) : i.createElement("select"), n.multiple ? u.multiple = !0 : n.size && (u.size = n.size);
                    break;
                  default:
                    u = typeof n.is == "string" ? i.createElement(a, { is: n.is }) : i.createElement(a);
                }
            }
            u[le] = e, u[ve] = n;
            t: for (i = e.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === e) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === e)
                  break t;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            e.stateNode = u;
            t: switch (ie(u, a, n), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break t;
              case "img":
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && gl(e);
          }
        }
        return qt(e), hf(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== n && gl(e);
        else {
          if (typeof n != "string" && e.stateNode === null)
            throw Error(f(166));
          if (t = st.current, Pn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, n = null, a = ne, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[le] = e, t = !!(t.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || Vv(t.nodeValue, l)), t || ql(e, !0);
          } else
            t = Oi(t).createTextNode(
              n
            ), t[le] = e, e.stateNode = t;
        }
        return qt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (n = Pn(e), l !== null) {
            if (t === null) {
              if (!n) throw Error(f(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(557));
              t[le] = e;
            } else
              mn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            qt(e), t = !1;
          } else
            l = Ec(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Ae(e), e) : (Ae(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(f(558));
        }
        return qt(e), null;
      case 13:
        if (n = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = Pn(e), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(f(318));
              if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(f(317));
              a[le] = e;
            } else
              mn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            qt(e), a = !1;
          } else
            a = Ec(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return e.flags & 256 ? (Ae(e), e) : (Ae(e), null);
        }
        return Ae(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = n !== null, t = t !== null && t.memoizedState !== null, l && (n = e.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== a && (n.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), ci(e, e.updateQueue), qt(e), null);
      case 4:
        return xt(), t === null && xf(e.stateNode.containerInfo), qt(e), null;
      case 10:
        return dl(e.type), qt(e), null;
      case 19:
        if (J(Vt), n = e.memoizedState, n === null) return qt(e), null;
        if (a = (e.flags & 128) !== 0, u = n.rendering, u === null)
          if (a) Fa(n, !1);
          else {
            if (Lt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = $u(t), u !== null) {
                  for (e.flags |= 128, Fa(n, !1), t = u.updateQueue, e.updateQueue = t, ci(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    bo(l, t), l = l.sibling;
                  return et(
                    Vt,
                    Vt.current & 1 | 2
                  ), St && sl(e, n.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && Ht() > vi && (e.flags |= 128, a = !0, Fa(n, !1), e.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = $u(u), t !== null) {
              if (e.flags |= 128, a = !0, t = t.updateQueue, e.updateQueue = t, ci(e, t), Fa(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !St)
                return qt(e), null;
            } else
              2 * Ht() - n.renderingStartTime > vi && l !== 536870912 && (e.flags |= 128, a = !0, Fa(n, !1), e.lanes = 4194304);
          n.isBackwards ? (u.sibling = e.child, e.child = u) : (t = n.last, t !== null ? t.sibling = u : e.child = u, n.last = u);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = Ht(), t.sibling = null, l = Vt.current, et(
          Vt,
          a ? l & 1 | 2 : l & 1
        ), St && sl(e, n.treeForkCount), t) : (qt(e), null);
      case 22:
      case 23:
        return Ae(e), xc(), n = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (e.flags |= 8192) : n && (e.flags |= 8192), n ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (qt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : qt(e), l = e.updateQueue, l !== null && ci(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== l && (e.flags |= 2048), t !== null && J(_n), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), dl(wt), qt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, e.tag));
  }
  function wy(t, e) {
    switch (bc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return dl(wt), xt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Dl(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Ae(e), e.alternate === null)
            throw Error(f(340));
          mn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Ae(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(f(340));
          mn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return J(Vt), null;
      case 4:
        return xt(), null;
      case 10:
        return dl(e.type), null;
      case 22:
      case 23:
        return Ae(e), xc(), t !== null && J(_n), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return dl(wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function $s(t, e) {
    switch (bc(e), e.tag) {
      case 3:
        dl(wt), xt();
        break;
      case 26:
      case 27:
      case 5:
        Dl(e);
        break;
      case 4:
        xt();
        break;
      case 31:
        e.memoizedState !== null && Ae(e);
        break;
      case 13:
        Ae(e);
        break;
      case 19:
        J(Vt);
        break;
      case 10:
        dl(e.type);
        break;
      case 22:
      case 23:
        Ae(e), xc(), t !== null && J(_n);
        break;
      case 24:
        dl(wt);
    }
  }
  function ka(t, e) {
    try {
      var l = e.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        l = a;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var u = l.create, i = l.inst;
            n = u(), i.destroy = n;
          }
          l = l.next;
        } while (l !== a);
      }
    } catch (o) {
      Tt(e, e.return, o);
    }
  }
  function Ql(t, e, l) {
    try {
      var n = e.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            var i = n.inst, o = i.destroy;
            if (o !== void 0) {
              i.destroy = void 0, a = e;
              var _ = l, B = o;
              try {
                B();
              } catch (G) {
                Tt(
                  a,
                  _,
                  G
                );
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (G) {
      Tt(e, e.return, G);
    }
  }
  function Ws(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Ko(e, l);
      } catch (n) {
        Tt(t, t.return, n);
      }
    }
  }
  function Fs(t, e, l) {
    l.props = Mn(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (n) {
      Tt(t, e, n);
    }
  }
  function Ia(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof l == "function" ? t.refCleanup = l(n) : l.current = n;
      }
    } catch (a) {
      Tt(t, e, a);
    }
  }
  function nl(t, e) {
    var l = t.ref, n = t.refCleanup;
    if (l !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (a) {
          Tt(t, e, a);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (a) {
          Tt(t, e, a);
        }
      else l.current = null;
  }
  function ks(t) {
    var e = t.type, l = t.memoizedProps, n = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && n.focus();
          break t;
        case "img":
          l.src ? n.src = l.src : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (a) {
      Tt(t, t.return, a);
    }
  }
  function yf(t, e, l) {
    try {
      var n = t.stateNode;
      h0(n, t.type, l, e), n[ve] = e;
    } catch (a) {
      Tt(t, t.return, a);
    }
  }
  function Is(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Wl(t.type) || t.tag === 4;
  }
  function mf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Is(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Wl(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function gf(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = fl));
    else if (n !== 4 && (n === 27 && Wl(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (gf(t, e, l), t = t.sibling; t !== null; )
        gf(t, e, l), t = t.sibling;
  }
  function fi(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (n !== 4 && (n === 27 && Wl(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (fi(t, e, l), t = t.sibling; t !== null; )
        fi(t, e, l), t = t.sibling;
  }
  function Ps(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var n = t.type, a = e.attributes; a.length; )
        e.removeAttributeNode(a[0]);
      ie(e, n, l), e[le] = t, e[ve] = l;
    } catch (u) {
      Tt(t, t.return, u);
    }
  }
  var pl = !1, Wt = !1, pf = !1, tv = typeof WeakSet == "function" ? WeakSet : Set, te = null;
  function Jy(t, e) {
    if (t = t.containerInfo, Kf = Di, t = so(t), oc(t)) {
      if ("selectionStart" in t)
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var a = n.anchorOffset, u = n.focusNode;
            n = n.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch {
              l = null;
              break t;
            }
            var i = 0, o = -1, _ = -1, B = 0, G = 0, $ = t, x = null;
            e: for (; ; ) {
              for (var K; $ !== l || a !== 0 && $.nodeType !== 3 || (o = i + a), $ !== u || n !== 0 && $.nodeType !== 3 || (_ = i + n), $.nodeType === 3 && (i += $.nodeValue.length), (K = $.firstChild) !== null; )
                x = $, $ = K;
              for (; ; ) {
                if ($ === t) break e;
                if (x === l && ++B === a && (o = i), x === u && ++G === n && (_ = i), (K = $.nextSibling) !== null) break;
                $ = x, x = $.parentNode;
              }
              $ = K;
            }
            l = o === -1 || _ === -1 ? null : { start: o, end: _ };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Lf = { focusedElem: t, selectionRange: l }, Di = !1, te = e; te !== null; )
      if (e = te, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, te = t;
      else
        for (; te !== null; ) {
          switch (e = te, u = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (l = 0; l < t.length; l++)
                  a = t[l], a.ref.impl = a.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, l = e, a = u.memoizedProps, u = u.memoizedState, n = l.stateNode;
                try {
                  var nt = Mn(
                    l.type,
                    a
                  );
                  t = n.getSnapshotBeforeUpdate(
                    nt,
                    u
                  ), n.__reactInternalSnapshotBeforeUpdate = t;
                } catch (ft) {
                  Tt(
                    l,
                    l.return,
                    ft
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, l = t.nodeType, l === 9)
                  Vf(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Vf(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(f(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, te = t;
            break;
          }
          te = e.return;
        }
  }
  function ev(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Sl(t, l), n & 4 && ka(5, l);
        break;
      case 1:
        if (Sl(t, l), n & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (i) {
              Tt(l, l.return, i);
            }
          else {
            var a = Mn(
              l.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                a,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              Tt(
                l,
                l.return,
                i
              );
            }
          }
        n & 64 && Ws(l), n & 512 && Ia(l, l.return);
        break;
      case 3:
        if (Sl(t, l), n & 64 && (t = l.updateQueue, t !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Ko(t, e);
          } catch (i) {
            Tt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && n & 4 && Ps(l);
      case 26:
      case 5:
        Sl(t, l), e === null && n & 4 && ks(l), n & 512 && Ia(l, l.return);
        break;
      case 12:
        Sl(t, l);
        break;
      case 31:
        Sl(t, l), n & 4 && av(t, l);
        break;
      case 13:
        Sl(t, l), n & 4 && uv(t, l), n & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = l0.bind(
          null,
          l
        ), O0(t, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || pl, !n) {
          e = e !== null && e.memoizedState !== null || Wt, a = pl;
          var u = Wt;
          pl = n, (Wt = e) && !u ? bl(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Sl(t, l), pl = a, Wt = u;
        }
        break;
      case 30:
        break;
      default:
        Sl(t, l);
    }
  }
  function lv(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, lv(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Ji(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Yt = null, he = !1;
  function _l(t, e, l) {
    for (l = l.child; l !== null; )
      nv(t, e, l), l = l.sibling;
  }
  function nv(t, e, l) {
    if (Se && typeof Se.onCommitFiberUnmount == "function")
      try {
        Se.onCommitFiberUnmount(il, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Wt || nl(l, e), _l(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Wt || nl(l, e);
        var n = Yt, a = he;
        Wl(l.type) && (Yt = l.stateNode, he = !1), _l(
          t,
          e,
          l
        ), cu(l.stateNode), Yt = n, he = a;
        break;
      case 5:
        Wt || nl(l, e);
      case 6:
        if (n = Yt, a = he, Yt = null, _l(
          t,
          e,
          l
        ), Yt = n, he = a, Yt !== null)
          if (he)
            try {
              (Yt.nodeType === 9 ? Yt.body : Yt.nodeName === "HTML" ? Yt.ownerDocument.body : Yt).removeChild(l.stateNode);
            } catch (u) {
              Tt(
                l,
                e,
                u
              );
            }
          else
            try {
              Yt.removeChild(l.stateNode);
            } catch (u) {
              Tt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        Yt !== null && (he ? (t = Yt, Wv(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Sa(t)) : Wv(Yt, l.stateNode));
        break;
      case 4:
        n = Yt, a = he, Yt = l.stateNode.containerInfo, he = !0, _l(
          t,
          e,
          l
        ), Yt = n, he = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ql(2, l, e), Wt || Ql(4, l, e), _l(
          t,
          e,
          l
        );
        break;
      case 1:
        Wt || (nl(l, e), n = l.stateNode, typeof n.componentWillUnmount == "function" && Fs(
          l,
          e,
          n
        )), _l(
          t,
          e,
          l
        );
        break;
      case 21:
        _l(
          t,
          e,
          l
        );
        break;
      case 22:
        Wt = (n = Wt) || l.memoizedState !== null, _l(
          t,
          e,
          l
        ), Wt = n;
        break;
      default:
        _l(
          t,
          e,
          l
        );
    }
  }
  function av(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Sa(t);
      } catch (l) {
        Tt(e, e.return, l);
      }
    }
  }
  function uv(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Sa(t);
      } catch (l) {
        Tt(e, e.return, l);
      }
  }
  function $y(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new tv()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new tv()), e;
      default:
        throw Error(f(435, t.tag));
    }
  }
  function ri(t, e) {
    var l = $y(t);
    e.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var a = n0.bind(null, t, n);
        n.then(a, a);
      }
    });
  }
  function ye(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var a = l[n], u = t, i = e, o = i;
        t: for (; o !== null; ) {
          switch (o.tag) {
            case 27:
              if (Wl(o.type)) {
                Yt = o.stateNode, he = !1;
                break t;
              }
              break;
            case 5:
              Yt = o.stateNode, he = !1;
              break t;
            case 3:
            case 4:
              Yt = o.stateNode.containerInfo, he = !0;
              break t;
          }
          o = o.return;
        }
        if (Yt === null) throw Error(f(160));
        nv(u, i, a), Yt = null, he = !1, u = a.alternate, u !== null && (u.return = null), a.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        iv(e, t), e = e.sibling;
  }
  var $e = null;
  function iv(t, e) {
    var l = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ye(e, t), me(t), n & 4 && (Ql(3, t, t.return), ka(3, t), Ql(5, t, t.return));
        break;
      case 1:
        ye(e, t), me(t), n & 512 && (Wt || l === null || nl(l, l.return)), n & 64 && pl && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? n : l.concat(n))));
        break;
      case 26:
        var a = $e;
        if (ye(e, t), me(t), n & 512 && (Wt || l === null || nl(l, l.return)), n & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (n = t.memoizedState, l === null)
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  n = t.type, l = t.memoizedProps, a = a.ownerDocument || a;
                  e: switch (n) {
                    case "title":
                      u = a.getElementsByTagName("title")[0], (!u || u[Aa] || u[le] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = a.createElement(n), a.head.insertBefore(
                        u,
                        a.querySelector("head > title")
                      )), ie(u, n, l), u[le] = t, Pt(u), n = u;
                      break t;
                    case "link":
                      var i = id(
                        "link",
                        "href",
                        a
                      ).get(n + (l.href || ""));
                      if (i) {
                        for (var o = 0; o < i.length; o++)
                          if (u = i[o], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            i.splice(o, 1);
                            break e;
                          }
                      }
                      u = a.createElement(n), ie(u, n, l), a.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = id(
                        "meta",
                        "content",
                        a
                      ).get(n + (l.content || ""))) {
                        for (o = 0; o < i.length; o++)
                          if (u = i[o], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            i.splice(o, 1);
                            break e;
                          }
                      }
                      u = a.createElement(n), ie(u, n, l), a.head.appendChild(u);
                      break;
                    default:
                      throw Error(f(468, n));
                  }
                  u[le] = t, Pt(u), n = u;
                }
                t.stateNode = n;
              } else
                cd(
                  a,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = ud(
                a,
                n,
                t.memoizedProps
              );
          else
            u !== n ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, n === null ? cd(
              a,
              t.type,
              t.stateNode
            ) : ud(
              a,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && yf(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ye(e, t), me(t), n & 512 && (Wt || l === null || nl(l, l.return)), l !== null && n & 4 && yf(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ye(e, t), me(t), n & 512 && (Wt || l === null || nl(l, l.return)), t.flags & 32) {
          a = t.stateNode;
          try {
            Vn(a, "");
          } catch (nt) {
            Tt(t, t.return, nt);
          }
        }
        n & 4 && t.stateNode != null && (a = t.memoizedProps, yf(
          t,
          a,
          l !== null ? l.memoizedProps : a
        )), n & 1024 && (pf = !0);
        break;
      case 6:
        if (ye(e, t), me(t), n & 4) {
          if (t.stateNode === null)
            throw Error(f(162));
          n = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = n;
          } catch (nt) {
            Tt(t, t.return, nt);
          }
        }
        break;
      case 3:
        if (Ai = null, a = $e, $e = Ei(e.containerInfo), ye(e, t), $e = a, me(t), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Sa(e.containerInfo);
          } catch (nt) {
            Tt(t, t.return, nt);
          }
        pf && (pf = !1, cv(t));
        break;
      case 4:
        n = $e, $e = Ei(
          t.stateNode.containerInfo
        ), ye(e, t), me(t), $e = n;
        break;
      case 12:
        ye(e, t), me(t);
        break;
      case 31:
        ye(e, t), me(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ri(t, n)));
        break;
      case 13:
        ye(e, t), me(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (si = Ht()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ri(t, n)));
        break;
      case 22:
        a = t.memoizedState !== null;
        var _ = l !== null && l.memoizedState !== null, B = pl, G = Wt;
        if (pl = B || a, Wt = G || _, ye(e, t), Wt = G, pl = B, me(t), n & 8192)
          t: for (e = t.stateNode, e._visibility = a ? e._visibility & -2 : e._visibility | 1, a && (l === null || _ || pl || Wt || An(t)), l = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                _ = l = e;
                try {
                  if (u = _.stateNode, a)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    o = _.stateNode;
                    var $ = _.memoizedProps.style, x = $ != null && $.hasOwnProperty("display") ? $.display : null;
                    o.style.display = x == null || typeof x == "boolean" ? "" : ("" + x).trim();
                  }
                } catch (nt) {
                  Tt(_, _.return, nt);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                _ = e;
                try {
                  _.stateNode.nodeValue = a ? "" : _.memoizedProps;
                } catch (nt) {
                  Tt(_, _.return, nt);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                _ = e;
                try {
                  var K = _.stateNode;
                  a ? Fv(K, !0) : Fv(_.stateNode, !1);
                } catch (nt) {
                  Tt(_, _.return, nt);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              l === e && (l = null), e = e.return;
            }
            l === e && (l = null), e.sibling.return = e.return, e = e.sibling;
          }
        n & 4 && (n = t.updateQueue, n !== null && (l = n.retryQueue, l !== null && (n.retryQueue = null, ri(t, l))));
        break;
      case 19:
        ye(e, t), me(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, ri(t, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ye(e, t), me(t);
    }
  }
  function me(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, n = t.return; n !== null; ) {
          if (Is(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(f(160));
        switch (l.tag) {
          case 27:
            var a = l.stateNode, u = mf(t);
            fi(t, u, a);
            break;
          case 5:
            var i = l.stateNode;
            l.flags & 32 && (Vn(i, ""), l.flags &= -33);
            var o = mf(t);
            fi(t, o, i);
            break;
          case 3:
          case 4:
            var _ = l.stateNode.containerInfo, B = mf(t);
            gf(
              t,
              B,
              _
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (G) {
        Tt(t, t.return, G);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function cv(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        cv(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function Sl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        ev(t, e.alternate, e), e = e.sibling;
  }
  function An(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ql(4, e, e.return), An(e);
          break;
        case 1:
          nl(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && Fs(
            e,
            e.return,
            l
          ), An(e);
          break;
        case 27:
          cu(e.stateNode);
        case 26:
        case 5:
          nl(e, e.return), An(e);
          break;
        case 22:
          e.memoizedState === null && An(e);
          break;
        case 30:
          An(e);
          break;
        default:
          An(e);
      }
      t = t.sibling;
    }
  }
  function bl(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate, a = t, u = e, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          bl(
            a,
            u,
            l
          ), ka(4, u);
          break;
        case 1:
          if (bl(
            a,
            u,
            l
          ), n = u, a = n.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (B) {
              Tt(n, n.return, B);
            }
          if (n = u, a = n.updateQueue, a !== null) {
            var o = n.stateNode;
            try {
              var _ = a.shared.hiddenCallbacks;
              if (_ !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < _.length; a++)
                  Yo(_[a], o);
            } catch (B) {
              Tt(n, n.return, B);
            }
          }
          l && i & 64 && Ws(u), Ia(u, u.return);
          break;
        case 27:
          Ps(u);
        case 26:
        case 5:
          bl(
            a,
            u,
            l
          ), l && n === null && i & 4 && ks(u), Ia(u, u.return);
          break;
        case 12:
          bl(
            a,
            u,
            l
          );
          break;
        case 31:
          bl(
            a,
            u,
            l
          ), l && i & 4 && av(a, u);
          break;
        case 13:
          bl(
            a,
            u,
            l
          ), l && i & 4 && uv(a, u);
          break;
        case 22:
          u.memoizedState === null && bl(
            a,
            u,
            l
          ), Ia(u, u.return);
          break;
        case 30:
          break;
        default:
          bl(
            a,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function _f(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Ya(l));
  }
  function Sf(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ya(t));
  }
  function We(t, e, l, n) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        fv(
          t,
          e,
          l,
          n
        ), e = e.sibling;
  }
  function fv(t, e, l, n) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        We(
          t,
          e,
          l,
          n
        ), a & 2048 && ka(9, e);
        break;
      case 1:
        We(
          t,
          e,
          l,
          n
        );
        break;
      case 3:
        We(
          t,
          e,
          l,
          n
        ), a & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ya(t)));
        break;
      case 12:
        if (a & 2048) {
          We(
            t,
            e,
            l,
            n
          ), t = e.stateNode;
          try {
            var u = e.memoizedProps, i = u.id, o = u.onPostCommit;
            typeof o == "function" && o(
              i,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (_) {
            Tt(e, e.return, _);
          }
        } else
          We(
            t,
            e,
            l,
            n
          );
        break;
      case 31:
        We(
          t,
          e,
          l,
          n
        );
        break;
      case 13:
        We(
          t,
          e,
          l,
          n
        );
        break;
      case 23:
        break;
      case 22:
        u = e.stateNode, i = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? We(
          t,
          e,
          l,
          n
        ) : Pa(t, e) : u._visibility & 2 ? We(
          t,
          e,
          l,
          n
        ) : (u._visibility |= 2, ra(
          t,
          e,
          l,
          n,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && _f(i, e);
        break;
      case 24:
        We(
          t,
          e,
          l,
          n
        ), a & 2048 && Sf(e.alternate, e);
        break;
      default:
        We(
          t,
          e,
          l,
          n
        );
    }
  }
  function ra(t, e, l, n, a) {
    for (a = a && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, o = l, _ = n, B = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ra(
            u,
            i,
            o,
            _,
            a
          ), ka(8, i);
          break;
        case 23:
          break;
        case 22:
          var G = i.stateNode;
          i.memoizedState !== null ? G._visibility & 2 ? ra(
            u,
            i,
            o,
            _,
            a
          ) : Pa(
            u,
            i
          ) : (G._visibility |= 2, ra(
            u,
            i,
            o,
            _,
            a
          )), a && B & 2048 && _f(
            i.alternate,
            i
          );
          break;
        case 24:
          ra(
            u,
            i,
            o,
            _,
            a
          ), a && B & 2048 && Sf(i.alternate, i);
          break;
        default:
          ra(
            u,
            i,
            o,
            _,
            a
          );
      }
      e = e.sibling;
    }
  }
  function Pa(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, n = e, a = n.flags;
        switch (n.tag) {
          case 22:
            Pa(l, n), a & 2048 && _f(
              n.alternate,
              n
            );
            break;
          case 24:
            Pa(l, n), a & 2048 && Sf(n.alternate, n);
            break;
          default:
            Pa(l, n);
        }
        e = e.sibling;
      }
  }
  var tu = 8192;
  function oa(t, e, l) {
    if (t.subtreeFlags & tu)
      for (t = t.child; t !== null; )
        rv(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function rv(t, e, l) {
    switch (t.tag) {
      case 26:
        oa(
          t,
          e,
          l
        ), t.flags & tu && t.memoizedState !== null && B0(
          l,
          $e,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        oa(
          t,
          e,
          l
        );
        break;
      case 3:
      case 4:
        var n = $e;
        $e = Ei(t.stateNode.containerInfo), oa(
          t,
          e,
          l
        ), $e = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = tu, tu = 16777216, oa(
          t,
          e,
          l
        ), tu = n) : oa(
          t,
          e,
          l
        ));
        break;
      default:
        oa(
          t,
          e,
          l
        );
    }
  }
  function ov(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function eu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          te = n, vv(
            n,
            t
          );
        }
      ov(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        sv(t), t = t.sibling;
  }
  function sv(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        eu(t), t.flags & 2048 && Ql(9, t, t.return);
        break;
      case 3:
        eu(t);
        break;
      case 12:
        eu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, oi(t)) : eu(t);
        break;
      default:
        eu(t);
    }
  }
  function oi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          te = n, vv(
            n,
            t
          );
        }
      ov(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          Ql(8, e, e.return), oi(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, oi(e));
          break;
        default:
          oi(e);
      }
      t = t.sibling;
    }
  }
  function vv(t, e) {
    for (; te !== null; ) {
      var l = te;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Ql(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Ya(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, te = n;
      else
        t: for (l = t; te !== null; ) {
          n = te;
          var a = n.sibling, u = n.return;
          if (lv(n), n === l) {
            te = null;
            break t;
          }
          if (a !== null) {
            a.return = u, te = a;
            break t;
          }
          te = u;
        }
    }
  }
  var Wy = {
    getCacheForType: function(t) {
      var e = ae(wt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return ae(wt).controller.signal;
    }
  }, Fy = typeof WeakMap == "function" ? WeakMap : Map, At = 0, Ut = null, yt = null, pt = 0, zt = 0, ze = null, Vl = !1, sa = !1, bf = !1, Ol = 0, Lt = 0, Xl = 0, zn = 0, Of = 0, Te = 0, va = 0, lu = null, ge = null, Ef = !1, si = 0, dv = 0, vi = 1 / 0, di = null, Zl = null, kt = 0, wl = null, da = null, El = 0, Mf = 0, Af = null, hv = null, nu = 0, zf = null;
  function Re() {
    return (At & 2) !== 0 && pt !== 0 ? pt & -pt : N.T !== null ? Nf() : Dr();
  }
  function yv() {
    if (Te === 0)
      if ((pt & 536870912) === 0 || St) {
        var t = bu;
        bu <<= 1, (bu & 3932160) === 0 && (bu = 262144), Te = t;
      } else Te = 536870912;
    return t = Me.current, t !== null && (t.flags |= 32), Te;
  }
  function pe(t, e, l) {
    (t === Ut && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null) && (ha(t, 0), Jl(
      t,
      pt,
      Te,
      !1
    )), Ma(t, l), ((At & 2) === 0 || t !== Ut) && (t === Ut && ((At & 2) === 0 && (zn |= l), Lt === 4 && Jl(
      t,
      pt,
      Te,
      !1
    )), al(t));
  }
  function mv(t, e, l) {
    if ((At & 6) !== 0) throw Error(f(327));
    var n = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Ea(t, e), a = n ? Py(t, e) : Rf(t, e, !0), u = n;
    do {
      if (a === 0) {
        sa && !n && Jl(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !ky(l)) {
          a = Rf(t, e, !1), u = !1;
          continue;
        }
        if (a === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            e = i;
            t: {
              var o = t;
              a = lu;
              var _ = o.current.memoizedState.isDehydrated;
              if (_ && (ha(o, i).flags |= 256), i = Rf(
                o,
                i,
                !1
              ), i !== 2) {
                if (bf && !_) {
                  o.errorRecoveryDisabledLanes |= u, zn |= u, a = 4;
                  break t;
                }
                u = ge, ge = a, u !== null && (ge === null ? ge = u : ge.push.apply(
                  ge,
                  u
                ));
              }
              a = i;
            }
            if (u = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          ha(t, 0), Jl(t, e, 0, !0);
          break;
        }
        t: {
          switch (n = t, u = a, u) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Jl(
                n,
                e,
                Te,
                !Vl
              );
              break t;
            case 2:
              ge = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((e & 62914560) === e && (a = si + 300 - Ht(), 10 < a)) {
            if (Jl(
              n,
              e,
              Te,
              !Vl
            ), Eu(n, 0, !0) !== 0) break t;
            El = e, n.timeoutHandle = Jv(
              gv.bind(
                null,
                n,
                l,
                ge,
                di,
                Ef,
                e,
                Te,
                zn,
                va,
                Vl,
                u,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          gv(
            n,
            l,
            ge,
            di,
            Ef,
            e,
            Te,
            zn,
            va,
            Vl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    al(t);
  }
  function gv(t, e, l, n, a, u, i, o, _, B, G, $, x, K) {
    if (t.timeoutHandle = -1, $ = e.subtreeFlags, $ & 8192 || ($ & 16785408) === 16785408) {
      $ = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: fl
      }, rv(
        e,
        u,
        $
      );
      var nt = (u & 62914560) === u ? si - Ht() : (u & 4194048) === u ? dv - Ht() : 0;
      if (nt = q0(
        $,
        nt
      ), nt !== null) {
        El = u, t.cancelPendingCommit = nt(
          Av.bind(
            null,
            t,
            e,
            u,
            l,
            n,
            a,
            i,
            o,
            _,
            G,
            $,
            null,
            x,
            K
          )
        ), Jl(t, u, i, !B);
        return;
      }
    }
    Av(
      t,
      e,
      u,
      l,
      n,
      a,
      i,
      o,
      _
    );
  }
  function ky(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var n = 0; n < l.length; n++) {
          var a = l[n], u = a.getSnapshot;
          a = a.value;
          try {
            if (!Oe(u(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = e.child, e.subtreeFlags & 16384 && l !== null)
        l.return = e, e = l;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Jl(t, e, l, n) {
    e &= ~Of, e &= ~zn, t.suspendedLanes |= e, t.pingedLanes &= ~e, n && (t.warmLanes |= e), n = t.expirationTimes;
    for (var a = e; 0 < a; ) {
      var u = 31 - be(a), i = 1 << u;
      n[u] = -1, a &= ~i;
    }
    l !== 0 && zr(t, l, e);
  }
  function hi() {
    return (At & 6) === 0 ? (au(0), !1) : !0;
  }
  function Tf() {
    if (yt !== null) {
      if (zt === 0)
        var t = yt.return;
      else
        t = yt, vl = gn = null, Qc(t), aa = null, La = 0, t = yt;
      for (; t !== null; )
        $s(t.alternate, t), t = t.return;
      yt = null;
    }
  }
  function ha(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, g0(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), El = 0, Tf(), Ut = t, yt = l = ol(t.current, null), pt = e, zt = 0, ze = null, Vl = !1, sa = Ea(t, e), bf = !1, va = Te = Of = zn = Xl = Lt = 0, ge = lu = null, Ef = !1, (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var a = 31 - be(n), u = 1 << a;
        e |= t[a], n &= ~u;
      }
    return Ol = e, qu(), l;
  }
  function pv(t, e) {
    vt = null, N.H = $a, e === na || e === Vu ? (e = Bo(), zt = 3) : e === jc ? (e = Bo(), zt = 4) : zt = e === af ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, ze = e, yt === null && (Lt = 1, ni(
      t,
      Ke(e, t.current)
    ));
  }
  function _v() {
    var t = Me.current;
    return t === null ? !0 : (pt & 4194048) === pt ? Ve === null : (pt & 62914560) === pt || (pt & 536870912) !== 0 ? t === Ve : !1;
  }
  function Sv() {
    var t = N.H;
    return N.H = $a, t === null ? $a : t;
  }
  function bv() {
    var t = N.A;
    return N.A = Wy, t;
  }
  function yi() {
    Lt = 4, Vl || (pt & 4194048) !== pt && Me.current !== null || (sa = !0), (Xl & 134217727) === 0 && (zn & 134217727) === 0 || Ut === null || Jl(
      Ut,
      pt,
      Te,
      !1
    );
  }
  function Rf(t, e, l) {
    var n = At;
    At |= 2;
    var a = Sv(), u = bv();
    (Ut !== t || pt !== e) && (di = null, ha(t, e)), e = !1;
    var i = Lt;
    t: do
      try {
        if (zt !== 0 && yt !== null) {
          var o = yt, _ = ze;
          switch (zt) {
            case 8:
              Tf(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Me.current === null && (e = !0);
              var B = zt;
              if (zt = 0, ze = null, ya(t, o, _, B), l && sa) {
                i = 0;
                break t;
              }
              break;
            default:
              B = zt, zt = 0, ze = null, ya(t, o, _, B);
          }
        }
        Iy(), i = Lt;
        break;
      } catch (G) {
        pv(t, G);
      }
    while (!0);
    return e && t.shellSuspendCounter++, vl = gn = null, At = n, N.H = a, N.A = u, yt === null && (Ut = null, pt = 0, qu()), i;
  }
  function Iy() {
    for (; yt !== null; ) Ov(yt);
  }
  function Py(t, e) {
    var l = At;
    At |= 2;
    var n = Sv(), a = bv();
    Ut !== t || pt !== e ? (di = null, vi = Ht() + 500, ha(t, e)) : sa = Ea(
      t,
      e
    );
    t: do
      try {
        if (zt !== 0 && yt !== null) {
          e = yt;
          var u = ze;
          e: switch (zt) {
            case 1:
              zt = 0, ze = null, ya(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (No(u)) {
                zt = 0, ze = null, Ev(e);
                break;
              }
              e = function() {
                zt !== 2 && zt !== 9 || Ut !== t || (zt = 7), al(t);
              }, u.then(e, e);
              break t;
            case 3:
              zt = 7;
              break t;
            case 4:
              zt = 5;
              break t;
            case 7:
              No(u) ? (zt = 0, ze = null, Ev(e)) : (zt = 0, ze = null, ya(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (yt.tag) {
                case 26:
                  i = yt.memoizedState;
                case 5:
                case 27:
                  var o = yt;
                  if (i ? fd(i) : o.stateNode.complete) {
                    zt = 0, ze = null;
                    var _ = o.sibling;
                    if (_ !== null) yt = _;
                    else {
                      var B = o.return;
                      B !== null ? (yt = B, mi(B)) : yt = null;
                    }
                    break e;
                  }
              }
              zt = 0, ze = null, ya(t, e, u, 5);
              break;
            case 6:
              zt = 0, ze = null, ya(t, e, u, 6);
              break;
            case 8:
              Tf(), Lt = 6;
              break t;
            default:
              throw Error(f(462));
          }
        }
        t0();
        break;
      } catch (G) {
        pv(t, G);
      }
    while (!0);
    return vl = gn = null, N.H = n, N.A = a, At = l, yt !== null ? 0 : (Ut = null, pt = 0, qu(), Lt);
  }
  function t0() {
    for (; yt !== null && !Zt(); )
      Ov(yt);
  }
  function Ov(t) {
    var e = ws(t.alternate, t, Ol);
    t.memoizedProps = t.pendingProps, e === null ? mi(t) : yt = e;
  }
  function Ev(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Ls(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          pt
        );
        break;
      case 11:
        e = Ls(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          pt
        );
        break;
      case 5:
        Qc(e);
      default:
        $s(l, e), e = yt = bo(e, Ol), e = ws(l, e, Ol);
    }
    t.memoizedProps = t.pendingProps, e === null ? mi(t) : yt = e;
  }
  function ya(t, e, l, n) {
    vl = gn = null, Qc(e), aa = null, La = 0;
    var a = e.return;
    try {
      if (Qy(
        t,
        a,
        e,
        l,
        pt
      )) {
        Lt = 1, ni(
          t,
          Ke(l, t.current)
        ), yt = null;
        return;
      }
    } catch (u) {
      if (a !== null) throw yt = a, u;
      Lt = 1, ni(
        t,
        Ke(l, t.current)
      ), yt = null;
      return;
    }
    e.flags & 32768 ? (St || n === 1 ? t = !0 : sa || (pt & 536870912) !== 0 ? t = !1 : (Vl = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Me.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Mv(e, t)) : mi(e);
  }
  function mi(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Mv(
          e,
          Vl
        );
        return;
      }
      t = e.return;
      var l = Zy(
        e.alternate,
        e,
        Ol
      );
      if (l !== null) {
        yt = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        yt = e;
        return;
      }
      yt = e = t;
    } while (e !== null);
    Lt === 0 && (Lt = 5);
  }
  function Mv(t, e) {
    do {
      var l = wy(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, yt = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        yt = t;
        return;
      }
      yt = t = l;
    } while (t !== null);
    Lt = 6, yt = null;
  }
  function Av(t, e, l, n, a, u, i, o, _) {
    t.cancelPendingCommit = null;
    do
      gi();
    while (kt !== 0);
    if ((At & 6) !== 0) throw Error(f(327));
    if (e !== null) {
      if (e === t.current) throw Error(f(177));
      if (u = e.lanes | e.childLanes, u |= yc, Uh(
        t,
        l,
        u,
        i,
        o,
        _
      ), t === Ut && (yt = Ut = null, pt = 0), da = e, wl = t, El = l, Mf = u, Af = a, hv = n, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, a0(_e, function() {
        return jv(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || n) {
        n = N.T, N.T = null, a = V.p, V.p = 2, i = At, At |= 4;
        try {
          Jy(t, e, l);
        } finally {
          At = i, V.p = a, N.T = n;
        }
      }
      kt = 1, zv(), Tv(), Rv();
    }
  }
  function zv() {
    if (kt === 1) {
      kt = 0;
      var t = wl, e = da, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = N.T, N.T = null;
        var n = V.p;
        V.p = 2;
        var a = At;
        At |= 4;
        try {
          iv(e, t);
          var u = Lf, i = so(t.containerInfo), o = u.focusedElem, _ = u.selectionRange;
          if (i !== o && o && o.ownerDocument && oo(
            o.ownerDocument.documentElement,
            o
          )) {
            if (_ !== null && oc(o)) {
              var B = _.start, G = _.end;
              if (G === void 0 && (G = B), "selectionStart" in o)
                o.selectionStart = B, o.selectionEnd = Math.min(
                  G,
                  o.value.length
                );
              else {
                var $ = o.ownerDocument || document, x = $ && $.defaultView || window;
                if (x.getSelection) {
                  var K = x.getSelection(), nt = o.textContent.length, ft = Math.min(_.start, nt), Ct = _.end === void 0 ? ft : Math.min(_.end, nt);
                  !K.extend && ft > Ct && (i = Ct, Ct = ft, ft = i);
                  var T = ro(
                    o,
                    ft
                  ), E = ro(
                    o,
                    Ct
                  );
                  if (T && E && (K.rangeCount !== 1 || K.anchorNode !== T.node || K.anchorOffset !== T.offset || K.focusNode !== E.node || K.focusOffset !== E.offset)) {
                    var U = $.createRange();
                    U.setStart(T.node, T.offset), K.removeAllRanges(), ft > Ct ? (K.addRange(U), K.extend(E.node, E.offset)) : (U.setEnd(E.node, E.offset), K.addRange(U));
                  }
                }
              }
            }
            for ($ = [], K = o; K = K.parentNode; )
              K.nodeType === 1 && $.push({
                element: K,
                left: K.scrollLeft,
                top: K.scrollTop
              });
            for (typeof o.focus == "function" && o.focus(), o = 0; o < $.length; o++) {
              var Z = $[o];
              Z.element.scrollLeft = Z.left, Z.element.scrollTop = Z.top;
            }
          }
          Di = !!Kf, Lf = Kf = null;
        } finally {
          At = a, V.p = n, N.T = l;
        }
      }
      t.current = e, kt = 2;
    }
  }
  function Tv() {
    if (kt === 2) {
      kt = 0;
      var t = wl, e = da, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = N.T, N.T = null;
        var n = V.p;
        V.p = 2;
        var a = At;
        At |= 4;
        try {
          ev(t, e.alternate, e);
        } finally {
          At = a, V.p = n, N.T = l;
        }
      }
      kt = 3;
    }
  }
  function Rv() {
    if (kt === 4 || kt === 3) {
      kt = 0, we();
      var t = wl, e = da, l = El, n = hv;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? kt = 5 : (kt = 0, da = wl = null, Dv(t, t.pendingLanes));
      var a = t.pendingLanes;
      if (a === 0 && (Zl = null), Zi(l), e = e.stateNode, Se && typeof Se.onCommitFiberRoot == "function")
        try {
          Se.onCommitFiberRoot(
            il,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        e = N.T, a = V.p, V.p = 2, N.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < n.length; i++) {
            var o = n[i];
            u(o.value, {
              componentStack: o.stack
            });
          }
        } finally {
          N.T = e, V.p = a;
        }
      }
      (El & 3) !== 0 && gi(), al(t), a = t.pendingLanes, (l & 261930) !== 0 && (a & 42) !== 0 ? t === zf ? nu++ : (nu = 0, zf = t) : nu = 0, au(0);
    }
  }
  function Dv(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Ya(e)));
  }
  function gi() {
    return zv(), Tv(), Rv(), jv();
  }
  function jv() {
    if (kt !== 5) return !1;
    var t = wl, e = Mf;
    Mf = 0;
    var l = Zi(El), n = N.T, a = V.p;
    try {
      V.p = 32 > l ? 32 : l, N.T = null, l = Af, Af = null;
      var u = wl, i = El;
      if (kt = 0, da = wl = null, El = 0, (At & 6) !== 0) throw Error(f(331));
      var o = At;
      if (At |= 4, sv(u.current), fv(
        u,
        u.current,
        i,
        l
      ), At = o, au(0, !1), Se && typeof Se.onPostCommitFiberRoot == "function")
        try {
          Se.onPostCommitFiberRoot(il, u);
        } catch {
        }
      return !0;
    } finally {
      V.p = a, N.T = n, Dv(t, e);
    }
  }
  function Cv(t, e, l) {
    e = Ke(l, e), e = nf(t.stateNode, e, 2), t = Kl(t, e, 2), t !== null && (Ma(t, 2), al(t));
  }
  function Tt(t, e, l) {
    if (t.tag === 3)
      Cv(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Cv(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Zl === null || !Zl.has(n))) {
            t = Ke(l, t), l = Ns(2), n = Kl(e, l, 2), n !== null && (Us(
              l,
              n,
              e,
              t
            ), Ma(n, 2), al(n));
            break;
          }
        }
        e = e.return;
      }
  }
  function Df(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new Fy();
      var a = /* @__PURE__ */ new Set();
      n.set(e, a);
    } else
      a = n.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(e, a));
    a.has(l) || (bf = !0, a.add(l), t = e0.bind(null, t, e, l), e.then(t, t));
  }
  function e0(t, e, l) {
    var n = t.pingCache;
    n !== null && n.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Ut === t && (pt & l) === l && (Lt === 4 || Lt === 3 && (pt & 62914560) === pt && 300 > Ht() - si ? (At & 2) === 0 && ha(t, 0) : Of |= l, va === pt && (va = 0)), al(t);
  }
  function Nv(t, e) {
    e === 0 && (e = Ar()), t = hn(t, e), t !== null && (Ma(t, e), al(t));
  }
  function l0(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Nv(t, l);
  }
  function n0(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode, a = t.memoizedState;
        a !== null && (l = a.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(f(314));
    }
    n !== null && n.delete(e), Nv(t, l);
  }
  function a0(t, e) {
    return Rt(t, e);
  }
  var pi = null, ma = null, jf = !1, _i = !1, Cf = !1, $l = 0;
  function al(t) {
    t !== ma && t.next === null && (ma === null ? pi = ma = t : ma = ma.next = t), _i = !0, jf || (jf = !0, i0());
  }
  function au(t, e) {
    if (!Cf && _i) {
      Cf = !0;
      do
        for (var l = !1, n = pi; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var u = 0;
            else {
              var i = n.suspendedLanes, o = n.pingedLanes;
              u = (1 << 31 - be(42 | t) + 1) - 1, u &= a & ~(i & ~o), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, xv(n, u));
          } else
            u = pt, u = Eu(
              n,
              n === Ut ? u : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (u & 3) === 0 || Ea(n, u) || (l = !0, xv(n, u));
          n = n.next;
        }
      while (l);
      Cf = !1;
    }
  }
  function u0() {
    Uv();
  }
  function Uv() {
    _i = jf = !1;
    var t = 0;
    $l !== 0 && m0() && (t = $l);
    for (var e = Ht(), l = null, n = pi; n !== null; ) {
      var a = n.next, u = Bv(n, e);
      u === 0 ? (n.next = null, l === null ? pi = a : l.next = a, a === null && (ma = l)) : (l = n, (t !== 0 || (u & 3) !== 0) && (_i = !0)), n = a;
    }
    kt !== 0 && kt !== 5 || au(t), $l !== 0 && ($l = 0);
  }
  function Bv(t, e) {
    for (var l = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - be(u), o = 1 << i, _ = a[i];
      _ === -1 ? ((o & l) === 0 || (o & n) !== 0) && (a[i] = Nh(o, e)) : _ <= e && (t.expiredLanes |= o), u &= ~o;
    }
    if (e = Ut, l = pt, l = Eu(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, l === 0 || t === e && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && ce(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Ea(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (n !== null && ce(n), Zi(l)) {
        case 2:
        case 8:
          l = tl;
          break;
        case 32:
          l = _e;
          break;
        case 268435456:
          l = xn;
          break;
        default:
          l = _e;
      }
      return n = qv.bind(null, t), l = Rt(l, n), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return n !== null && n !== null && ce(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function qv(t, e) {
    if (kt !== 0 && kt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (gi() && t.callbackNode !== l)
      return null;
    var n = pt;
    return n = Eu(
      t,
      t === Ut ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (mv(t, n, e), Bv(t, Ht()), t.callbackNode != null && t.callbackNode === l ? qv.bind(null, t) : null);
  }
  function xv(t, e) {
    if (gi()) return null;
    mv(t, e, !0);
  }
  function i0() {
    p0(function() {
      (At & 6) !== 0 ? Rt(
        fn,
        u0
      ) : Uv();
    });
  }
  function Nf() {
    if ($l === 0) {
      var t = ea;
      t === 0 && (t = Su, Su <<= 1, (Su & 261888) === 0 && (Su = 256)), $l = t;
    }
    return $l;
  }
  function Hv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Tu("" + t);
  }
  function Yv(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function c0(t, e, l, n, a) {
    if (e === "submit" && l && l.stateNode === a) {
      var u = Hv(
        (a[ve] || null).action
      ), i = n.submitter;
      i && (e = (e = i[ve] || null) ? Hv(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var o = new Cu(
        "action",
        "action",
        null,
        n,
        a
      );
      t.push({
        event: o,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if ($l !== 0) {
                  var _ = i ? Yv(a, i) : new FormData(a);
                  kc(
                    l,
                    {
                      pending: !0,
                      data: _,
                      method: a.method,
                      action: u
                    },
                    null,
                    _
                  );
                }
              } else
                typeof u == "function" && (o.preventDefault(), _ = i ? Yv(a, i) : new FormData(a), kc(
                  l,
                  {
                    pending: !0,
                    data: _,
                    method: a.method,
                    action: u
                  },
                  u,
                  _
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Uf = 0; Uf < hc.length; Uf++) {
    var Bf = hc[Uf], f0 = Bf.toLowerCase(), r0 = Bf[0].toUpperCase() + Bf.slice(1);
    Je(
      f0,
      "on" + r0
    );
  }
  Je(yo, "onAnimationEnd"), Je(mo, "onAnimationIteration"), Je(go, "onAnimationStart"), Je("dblclick", "onDoubleClick"), Je("focusin", "onFocus"), Je("focusout", "onBlur"), Je(Ay, "onTransitionRun"), Je(zy, "onTransitionStart"), Je(Ty, "onTransitionCancel"), Je(po, "onTransitionEnd"), Gn("onMouseEnter", ["mouseout", "mouseover"]), Gn("onMouseLeave", ["mouseout", "mouseover"]), Gn("onPointerEnter", ["pointerout", "pointerover"]), Gn("onPointerLeave", ["pointerout", "pointerover"]), on(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), on(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), on("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), on(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), on(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), on(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var uu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), o0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(uu)
  );
  function Kv(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l], a = n.event;
      n = n.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var i = n.length - 1; 0 <= i; i--) {
            var o = n[i], _ = o.instance, B = o.currentTarget;
            if (o = o.listener, _ !== u && a.isPropagationStopped())
              break t;
            u = o, a.currentTarget = B;
            try {
              u(a);
            } catch (G) {
              Bu(G);
            }
            a.currentTarget = null, u = _;
          }
        else
          for (i = 0; i < n.length; i++) {
            if (o = n[i], _ = o.instance, B = o.currentTarget, o = o.listener, _ !== u && a.isPropagationStopped())
              break t;
            u = o, a.currentTarget = B;
            try {
              u(a);
            } catch (G) {
              Bu(G);
            }
            a.currentTarget = null, u = _;
          }
      }
    }
  }
  function mt(t, e) {
    var l = e[wi];
    l === void 0 && (l = e[wi] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    l.has(n) || (Lv(e, t, 2, !1), l.add(n));
  }
  function qf(t, e, l) {
    var n = 0;
    e && (n |= 4), Lv(
      l,
      t,
      n,
      e
    );
  }
  var Si = "_reactListening" + Math.random().toString(36).slice(2);
  function xf(t) {
    if (!t[Si]) {
      t[Si] = !0, Nr.forEach(function(l) {
        l !== "selectionchange" && (o0.has(l) || qf(l, !1, t), qf(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Si] || (e[Si] = !0, qf("selectionchange", !1, e));
    }
  }
  function Lv(t, e, l, n) {
    switch (yd(e)) {
      case 2:
        var a = Y0;
        break;
      case 8:
        a = K0;
        break;
      default:
        a = kf;
    }
    l = a.bind(
      null,
      e,
      l,
      t
    ), a = void 0, !ec || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: a
    }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
      passive: a
    }) : t.addEventListener(e, l, !1);
  }
  function Hf(t, e, l, n, a) {
    var u = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var i = n.tag;
        if (i === 3 || i === 4) {
          var o = n.stateNode.containerInfo;
          if (o === a) break;
          if (i === 4)
            for (i = n.return; i !== null; ) {
              var _ = i.tag;
              if ((_ === 3 || _ === 4) && i.stateNode.containerInfo === a)
                return;
              i = i.return;
            }
          for (; o !== null; ) {
            if (i = Yn(o), i === null) return;
            if (_ = i.tag, _ === 5 || _ === 6 || _ === 26 || _ === 27) {
              n = u = i;
              continue t;
            }
            o = o.parentNode;
          }
        }
        n = n.return;
      }
    Xr(function() {
      var B = u, G = Pi(l), $ = [];
      t: {
        var x = _o.get(t);
        if (x !== void 0) {
          var K = Cu, nt = t;
          switch (t) {
            case "keypress":
              if (Du(l) === 0) break t;
            case "keydown":
            case "keyup":
              K = ny;
              break;
            case "focusin":
              nt = "focus", K = uc;
              break;
            case "focusout":
              nt = "blur", K = uc;
              break;
            case "beforeblur":
            case "afterblur":
              K = uc;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              K = Jr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              K = Zh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              K = iy;
              break;
            case yo:
            case mo:
            case go:
              K = $h;
              break;
            case po:
              K = fy;
              break;
            case "scroll":
            case "scrollend":
              K = Vh;
              break;
            case "wheel":
              K = oy;
              break;
            case "copy":
            case "cut":
            case "paste":
              K = Fh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              K = Wr;
              break;
            case "toggle":
            case "beforetoggle":
              K = vy;
          }
          var ft = (e & 4) !== 0, Ct = !ft && (t === "scroll" || t === "scrollend"), T = ft ? x !== null ? x + "Capture" : null : x;
          ft = [];
          for (var E = B, U; E !== null; ) {
            var Z = E;
            if (U = Z.stateNode, Z = Z.tag, Z !== 5 && Z !== 26 && Z !== 27 || U === null || T === null || (Z = Ta(E, T), Z != null && ft.push(
              iu(E, Z, U)
            )), Ct) break;
            E = E.return;
          }
          0 < ft.length && (x = new K(
            x,
            nt,
            null,
            l,
            G
          ), $.push({ event: x, listeners: ft }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (x = t === "mouseover" || t === "pointerover", K = t === "mouseout" || t === "pointerout", x && l !== Ii && (nt = l.relatedTarget || l.fromElement) && (Yn(nt) || nt[Hn]))
            break t;
          if ((K || x) && (x = G.window === G ? G : (x = G.ownerDocument) ? x.defaultView || x.parentWindow : window, K ? (nt = l.relatedTarget || l.toElement, K = B, nt = nt ? Yn(nt) : null, nt !== null && (Ct = d(nt), ft = nt.tag, nt !== Ct || ft !== 5 && ft !== 27 && ft !== 6) && (nt = null)) : (K = null, nt = B), K !== nt)) {
            if (ft = Jr, Z = "onMouseLeave", T = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && (ft = Wr, Z = "onPointerLeave", T = "onPointerEnter", E = "pointer"), Ct = K == null ? x : za(K), U = nt == null ? x : za(nt), x = new ft(
              Z,
              E + "leave",
              K,
              l,
              G
            ), x.target = Ct, x.relatedTarget = U, Z = null, Yn(G) === B && (ft = new ft(
              T,
              E + "enter",
              nt,
              l,
              G
            ), ft.target = U, ft.relatedTarget = Ct, Z = ft), Ct = Z, K && nt)
              e: {
                for (ft = s0, T = K, E = nt, U = 0, Z = T; Z; Z = ft(Z))
                  U++;
                Z = 0;
                for (var it = E; it; it = ft(it))
                  Z++;
                for (; 0 < U - Z; )
                  T = ft(T), U--;
                for (; 0 < Z - U; )
                  E = ft(E), Z--;
                for (; U--; ) {
                  if (T === E || E !== null && T === E.alternate) {
                    ft = T;
                    break e;
                  }
                  T = ft(T), E = ft(E);
                }
                ft = null;
              }
            else ft = null;
            K !== null && Gv(
              $,
              x,
              K,
              ft,
              !1
            ), nt !== null && Ct !== null && Gv(
              $,
              Ct,
              nt,
              ft,
              !0
            );
          }
        }
        t: {
          if (x = B ? za(B) : window, K = x.nodeName && x.nodeName.toLowerCase(), K === "select" || K === "input" && x.type === "file")
            var Et = no;
          else if (eo(x))
            if (ao)
              Et = Oy;
            else {
              Et = Sy;
              var at = _y;
            }
          else
            K = x.nodeName, !K || K.toLowerCase() !== "input" || x.type !== "checkbox" && x.type !== "radio" ? B && ki(B.elementType) && (Et = no) : Et = by;
          if (Et && (Et = Et(t, B))) {
            lo(
              $,
              Et,
              l,
              G
            );
            break t;
          }
          at && at(t, x, B), t === "focusout" && B && x.type === "number" && B.memoizedProps.value != null && Fi(x, "number", x.value);
        }
        switch (at = B ? za(B) : window, t) {
          case "focusin":
            (eo(at) || at.contentEditable === "true") && (Jn = at, sc = B, qa = null);
            break;
          case "focusout":
            qa = sc = Jn = null;
            break;
          case "mousedown":
            vc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vc = !1, vo($, l, G);
            break;
          case "selectionchange":
            if (My) break;
          case "keydown":
          case "keyup":
            vo($, l, G);
        }
        var dt;
        if (cc)
          t: {
            switch (t) {
              case "compositionstart":
                var _t = "onCompositionStart";
                break t;
              case "compositionend":
                _t = "onCompositionEnd";
                break t;
              case "compositionupdate":
                _t = "onCompositionUpdate";
                break t;
            }
            _t = void 0;
          }
        else
          wn ? Pr(t, l) && (_t = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (_t = "onCompositionStart");
        _t && (Fr && l.locale !== "ko" && (wn || _t !== "onCompositionStart" ? _t === "onCompositionEnd" && wn && (dt = Zr()) : (Nl = G, lc = "value" in Nl ? Nl.value : Nl.textContent, wn = !0)), at = bi(B, _t), 0 < at.length && (_t = new $r(
          _t,
          t,
          null,
          l,
          G
        ), $.push({ event: _t, listeners: at }), dt ? _t.data = dt : (dt = to(l), dt !== null && (_t.data = dt)))), (dt = hy ? yy(t, l) : my(t, l)) && (_t = bi(B, "onBeforeInput"), 0 < _t.length && (at = new $r(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          G
        ), $.push({
          event: at,
          listeners: _t
        }), at.data = dt)), c0(
          $,
          t,
          B,
          l,
          G
        );
      }
      Kv($, e);
    });
  }
  function iu(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function bi(t, e) {
    for (var l = e + "Capture", n = []; t !== null; ) {
      var a = t, u = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || u === null || (a = Ta(t, l), a != null && n.unshift(
        iu(t, a, u)
      ), a = Ta(t, e), a != null && n.push(
        iu(t, a, u)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function s0(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Gv(t, e, l, n, a) {
    for (var u = e._reactName, i = []; l !== null && l !== n; ) {
      var o = l, _ = o.alternate, B = o.stateNode;
      if (o = o.tag, _ !== null && _ === n) break;
      o !== 5 && o !== 26 && o !== 27 || B === null || (_ = B, a ? (B = Ta(l, u), B != null && i.unshift(
        iu(l, B, _)
      )) : a || (B = Ta(l, u), B != null && i.push(
        iu(l, B, _)
      ))), l = l.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var v0 = /\r\n?/g, d0 = /\u0000|\uFFFD/g;
  function Qv(t) {
    return (typeof t == "string" ? t : "" + t).replace(v0, `
`).replace(d0, "");
  }
  function Vv(t, e) {
    return e = Qv(e), Qv(t) === e;
  }
  function jt(t, e, l, n, a, u) {
    switch (l) {
      case "children":
        typeof n == "string" ? e === "body" || e === "textarea" && n === "" || Vn(t, n) : (typeof n == "number" || typeof n == "bigint") && e !== "body" && Vn(t, "" + n);
        break;
      case "className":
        Au(t, "class", n);
        break;
      case "tabIndex":
        Au(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Au(t, l, n);
        break;
      case "style":
        Qr(t, n, u);
        break;
      case "data":
        if (e !== "object") {
          Au(t, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = Tu("" + n), t.setAttribute(l, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (e !== "input" && jt(t, e, "name", a.name, a, null), jt(
            t,
            e,
            "formEncType",
            a.formEncType,
            a,
            null
          ), jt(
            t,
            e,
            "formMethod",
            a.formMethod,
            a,
            null
          ), jt(
            t,
            e,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (jt(t, e, "encType", a.encType, a, null), jt(t, e, "method", a.method, a, null), jt(t, e, "target", a.target, a, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = Tu("" + n), t.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (t.onclick = fl);
        break;
      case "onScroll":
        n != null && mt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && mt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(f(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(f(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        t.muted = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        l = Tu("" + n), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, "" + n) : t.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        n === !0 ? t.setAttribute(l, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(l) : t.setAttribute(l, n);
        break;
      case "popover":
        mt("beforetoggle", t), mt("toggle", t), Mu(t, "popover", n);
        break;
      case "xlinkActuate":
        cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        cl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        cl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        cl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        Mu(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Gh.get(l) || l, Mu(t, l, n));
    }
  }
  function Yf(t, e, l, n, a, u) {
    switch (l) {
      case "style":
        Qr(t, n, u);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(f(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(f(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof n == "string" ? Vn(t, n) : (typeof n == "number" || typeof n == "bigint") && Vn(t, "" + n);
        break;
      case "onScroll":
        n != null && mt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && mt("scrollend", t);
        break;
      case "onClick":
        n != null && (t.onclick = fl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Ur.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), e = l.slice(2, a ? l.length - 7 : void 0), u = t[ve] || null, u = u != null ? u[l] : null, typeof u == "function" && t.removeEventListener(e, u, a), typeof n == "function")) {
              typeof u != "function" && u !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, n, a);
              break t;
            }
            l in t ? t[l] = n : n === !0 ? t.setAttribute(l, "") : Mu(t, l, n);
          }
    }
  }
  function ie(t, e, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        mt("error", t), mt("load", t);
        var n = !1, a = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var i = l[u];
            if (i != null)
              switch (u) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(f(137, e));
                default:
                  jt(t, e, u, i, l, null);
              }
          }
        a && jt(t, e, "srcSet", l.srcSet, l, null), n && jt(t, e, "src", l.src, l, null);
        return;
      case "input":
        mt("invalid", t);
        var o = u = i = a = null, _ = null, B = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var G = l[n];
            if (G != null)
              switch (n) {
                case "name":
                  a = G;
                  break;
                case "type":
                  i = G;
                  break;
                case "checked":
                  _ = G;
                  break;
                case "defaultChecked":
                  B = G;
                  break;
                case "value":
                  u = G;
                  break;
                case "defaultValue":
                  o = G;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (G != null)
                    throw Error(f(137, e));
                  break;
                default:
                  jt(t, e, n, G, l, null);
              }
          }
        Yr(
          t,
          u,
          o,
          _,
          B,
          i,
          a,
          !1
        );
        return;
      case "select":
        mt("invalid", t), n = i = u = null;
        for (a in l)
          if (l.hasOwnProperty(a) && (o = l[a], o != null))
            switch (a) {
              case "value":
                u = o;
                break;
              case "defaultValue":
                i = o;
                break;
              case "multiple":
                n = o;
              default:
                jt(t, e, a, o, l, null);
            }
        e = u, l = i, t.multiple = !!n, e != null ? Qn(t, !!n, e, !1) : l != null && Qn(t, !!n, l, !0);
        return;
      case "textarea":
        mt("invalid", t), u = a = n = null;
        for (i in l)
          if (l.hasOwnProperty(i) && (o = l[i], o != null))
            switch (i) {
              case "value":
                n = o;
                break;
              case "defaultValue":
                a = o;
                break;
              case "children":
                u = o;
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(f(91));
                break;
              default:
                jt(t, e, i, o, l, null);
            }
        Lr(t, n, a, u);
        return;
      case "option":
        for (_ in l)
          if (l.hasOwnProperty(_) && (n = l[_], n != null))
            switch (_) {
              case "selected":
                t.selected = n && typeof n != "function" && typeof n != "symbol";
                break;
              default:
                jt(t, e, _, n, l, null);
            }
        return;
      case "dialog":
        mt("beforetoggle", t), mt("toggle", t), mt("cancel", t), mt("close", t);
        break;
      case "iframe":
      case "object":
        mt("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < uu.length; n++)
          mt(uu[n], t);
        break;
      case "image":
        mt("error", t), mt("load", t);
        break;
      case "details":
        mt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        mt("error", t), mt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (B in l)
          if (l.hasOwnProperty(B) && (n = l[B], n != null))
            switch (B) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, e));
              default:
                jt(t, e, B, n, l, null);
            }
        return;
      default:
        if (ki(e)) {
          for (G in l)
            l.hasOwnProperty(G) && (n = l[G], n !== void 0 && Yf(
              t,
              e,
              G,
              n,
              l,
              void 0
            ));
          return;
        }
    }
    for (o in l)
      l.hasOwnProperty(o) && (n = l[o], n != null && jt(t, e, o, n, l, null));
  }
  function h0(t, e, l, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null, u = null, i = null, o = null, _ = null, B = null, G = null;
        for (K in l) {
          var $ = l[K];
          if (l.hasOwnProperty(K) && $ != null)
            switch (K) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                _ = $;
              default:
                n.hasOwnProperty(K) || jt(t, e, K, null, n, $);
            }
        }
        for (var x in n) {
          var K = n[x];
          if ($ = l[x], n.hasOwnProperty(x) && (K != null || $ != null))
            switch (x) {
              case "type":
                u = K;
                break;
              case "name":
                a = K;
                break;
              case "checked":
                B = K;
                break;
              case "defaultChecked":
                G = K;
                break;
              case "value":
                i = K;
                break;
              case "defaultValue":
                o = K;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null)
                  throw Error(f(137, e));
                break;
              default:
                K !== $ && jt(
                  t,
                  e,
                  x,
                  K,
                  n,
                  $
                );
            }
        }
        Wi(
          t,
          i,
          o,
          _,
          B,
          G,
          u,
          a
        );
        return;
      case "select":
        K = i = o = x = null;
        for (u in l)
          if (_ = l[u], l.hasOwnProperty(u) && _ != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                K = _;
              default:
                n.hasOwnProperty(u) || jt(
                  t,
                  e,
                  u,
                  null,
                  n,
                  _
                );
            }
        for (a in n)
          if (u = n[a], _ = l[a], n.hasOwnProperty(a) && (u != null || _ != null))
            switch (a) {
              case "value":
                x = u;
                break;
              case "defaultValue":
                o = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== _ && jt(
                  t,
                  e,
                  a,
                  u,
                  n,
                  _
                );
            }
        e = o, l = i, n = K, x != null ? Qn(t, !!l, x, !1) : !!n != !!l && (e != null ? Qn(t, !!l, e, !0) : Qn(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        K = x = null;
        for (o in l)
          if (a = l[o], l.hasOwnProperty(o) && a != null && !n.hasOwnProperty(o))
            switch (o) {
              case "value":
                break;
              case "children":
                break;
              default:
                jt(t, e, o, null, n, a);
            }
        for (i in n)
          if (a = n[i], u = l[i], n.hasOwnProperty(i) && (a != null || u != null))
            switch (i) {
              case "value":
                x = a;
                break;
              case "defaultValue":
                K = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(f(91));
                break;
              default:
                a !== u && jt(t, e, i, a, n, u);
            }
        Kr(t, x, K);
        return;
      case "option":
        for (var nt in l)
          if (x = l[nt], l.hasOwnProperty(nt) && x != null && !n.hasOwnProperty(nt))
            switch (nt) {
              case "selected":
                t.selected = !1;
                break;
              default:
                jt(
                  t,
                  e,
                  nt,
                  null,
                  n,
                  x
                );
            }
        for (_ in n)
          if (x = n[_], K = l[_], n.hasOwnProperty(_) && x !== K && (x != null || K != null))
            switch (_) {
              case "selected":
                t.selected = x && typeof x != "function" && typeof x != "symbol";
                break;
              default:
                jt(
                  t,
                  e,
                  _,
                  x,
                  n,
                  K
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ft in l)
          x = l[ft], l.hasOwnProperty(ft) && x != null && !n.hasOwnProperty(ft) && jt(t, e, ft, null, n, x);
        for (B in n)
          if (x = n[B], K = l[B], n.hasOwnProperty(B) && x !== K && (x != null || K != null))
            switch (B) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (x != null)
                  throw Error(f(137, e));
                break;
              default:
                jt(
                  t,
                  e,
                  B,
                  x,
                  n,
                  K
                );
            }
        return;
      default:
        if (ki(e)) {
          for (var Ct in l)
            x = l[Ct], l.hasOwnProperty(Ct) && x !== void 0 && !n.hasOwnProperty(Ct) && Yf(
              t,
              e,
              Ct,
              void 0,
              n,
              x
            );
          for (G in n)
            x = n[G], K = l[G], !n.hasOwnProperty(G) || x === K || x === void 0 && K === void 0 || Yf(
              t,
              e,
              G,
              x,
              n,
              K
            );
          return;
        }
    }
    for (var T in l)
      x = l[T], l.hasOwnProperty(T) && x != null && !n.hasOwnProperty(T) && jt(t, e, T, null, n, x);
    for ($ in n)
      x = n[$], K = l[$], !n.hasOwnProperty($) || x === K || x == null && K == null || jt(t, e, $, x, n, K);
  }
  function Xv(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function y0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var a = l[n], u = a.transferSize, i = a.initiatorType, o = a.duration;
        if (u && o && Xv(i)) {
          for (i = 0, o = a.responseEnd, n += 1; n < l.length; n++) {
            var _ = l[n], B = _.startTime;
            if (B > o) break;
            var G = _.transferSize, $ = _.initiatorType;
            G && Xv($) && (_ = _.responseEnd, i += G * (_ < o ? 1 : (o - B) / (_ - B)));
          }
          if (--n, e += 8 * (u + i) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Kf = null, Lf = null;
  function Oi(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Zv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function wv(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function Gf(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Qf = null;
  function m0() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Qf ? !1 : (Qf = t, !0) : (Qf = null, !1);
  }
  var Jv = typeof setTimeout == "function" ? setTimeout : void 0, g0 = typeof clearTimeout == "function" ? clearTimeout : void 0, $v = typeof Promise == "function" ? Promise : void 0, p0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof $v < "u" ? function(t) {
    return $v.resolve(null).then(t).catch(_0);
  } : Jv;
  function _0(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Wl(t) {
    return t === "head";
  }
  function Wv(t, e) {
    var l = e, n = 0;
    do {
      var a = l.nextSibling;
      if (t.removeChild(l), a && a.nodeType === 8)
        if (l = a.data, l === "/$" || l === "/&") {
          if (n === 0) {
            t.removeChild(a), Sa(e);
            return;
          }
          n--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          n++;
        else if (l === "html")
          cu(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, cu(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, o = u.nodeName;
            u[Aa] || o === "SCRIPT" || o === "STYLE" || o === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && cu(t.ownerDocument.body);
      l = a;
    } while (l);
    Sa(e);
  }
  function Fv(t, e) {
    var l = t;
    t = 0;
    do {
      var n = l.nextSibling;
      if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), n && n.nodeType === 8)
        if (l = n.data, l === "/$") {
          if (t === 0) break;
          t--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
      l = n;
    } while (l);
  }
  function Vf(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Vf(l), Ji(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function S0(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var a = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[Aa])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Xe(t.nextSibling), t === null) break;
    }
    return null;
  }
  function b0(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Xe(t.nextSibling), t === null)) return null;
    return t;
  }
  function kv(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Xe(t.nextSibling), t === null)) return null;
    return t;
  }
  function Xf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Zf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function O0(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading")
      e();
    else {
      var n = function() {
        e(), l.removeEventListener("DOMContentLoaded", n);
      };
      l.addEventListener("DOMContentLoaded", n), t._reactRetry = n;
    }
  }
  function Xe(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var wf = null;
  function Iv(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return Xe(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Pv(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else l !== "/$" && l !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function td(t, e, l) {
    switch (e = Oi(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(f(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(f(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(f(454));
        return t;
      default:
        throw Error(f(451));
    }
  }
  function cu(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Ji(t);
  }
  var Ze = /* @__PURE__ */ new Map(), ed = /* @__PURE__ */ new Set();
  function Ei(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Ml = V.d;
  V.d = {
    f: E0,
    r: M0,
    D: A0,
    C: z0,
    L: T0,
    m: R0,
    X: j0,
    S: D0,
    M: C0
  };
  function E0() {
    var t = Ml.f(), e = hi();
    return t || e;
  }
  function M0(t) {
    var e = Kn(t);
    e !== null && e.tag === 5 && e.type === "form" ? ps(e) : Ml.r(t);
  }
  var ga = typeof document > "u" ? null : document;
  function ld(t, e, l) {
    var n = ga;
    if (n && typeof e == "string" && e) {
      var a = He(e);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), ed.has(a) || (ed.add(a), t = { rel: t, crossOrigin: l, href: e }, n.querySelector(a) === null && (e = n.createElement("link"), ie(e, "link", t), Pt(e), n.head.appendChild(e)));
    }
  }
  function A0(t) {
    Ml.D(t), ld("dns-prefetch", t, null);
  }
  function z0(t, e) {
    Ml.C(t, e), ld("preconnect", t, e);
  }
  function T0(t, e, l) {
    Ml.L(t, e, l);
    var n = ga;
    if (n && t && e) {
      var a = 'link[rel="preload"][as="' + He(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (a += '[imagesrcset="' + He(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (a += '[imagesizes="' + He(
        l.imageSizes
      ) + '"]')) : a += '[href="' + He(t) + '"]';
      var u = a;
      switch (e) {
        case "style":
          u = pa(t);
          break;
        case "script":
          u = _a(t);
      }
      Ze.has(u) || (t = O(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), Ze.set(u, t), n.querySelector(a) !== null || e === "style" && n.querySelector(fu(u)) || e === "script" && n.querySelector(ru(u)) || (e = n.createElement("link"), ie(e, "link", t), Pt(e), n.head.appendChild(e)));
    }
  }
  function R0(t, e) {
    Ml.m(t, e);
    var l = ga;
    if (l && t) {
      var n = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + He(n) + '"][href="' + He(t) + '"]', u = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = _a(t);
      }
      if (!Ze.has(u) && (t = O({ rel: "modulepreload", href: t }, e), Ze.set(u, t), l.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(ru(u)))
              return;
        }
        n = l.createElement("link"), ie(n, "link", t), Pt(n), l.head.appendChild(n);
      }
    }
  }
  function D0(t, e, l) {
    Ml.S(t, e, l);
    var n = ga;
    if (n && t) {
      var a = Ln(n).hoistableStyles, u = pa(t);
      e = e || "default";
      var i = a.get(u);
      if (!i) {
        var o = { loading: 0, preload: null };
        if (i = n.querySelector(
          fu(u)
        ))
          o.loading = 5;
        else {
          t = O(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = Ze.get(u)) && Jf(t, l);
          var _ = i = n.createElement("link");
          Pt(_), ie(_, "link", t), _._p = new Promise(function(B, G) {
            _.onload = B, _.onerror = G;
          }), _.addEventListener("load", function() {
            o.loading |= 1;
          }), _.addEventListener("error", function() {
            o.loading |= 2;
          }), o.loading |= 4, Mi(i, e, n);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: o
        }, a.set(u, i);
      }
    }
  }
  function j0(t, e) {
    Ml.X(t, e);
    var l = ga;
    if (l && t) {
      var n = Ln(l).hoistableScripts, a = _a(t), u = n.get(a);
      u || (u = l.querySelector(ru(a)), u || (t = O({ src: t, async: !0 }, e), (e = Ze.get(a)) && $f(t, e), u = l.createElement("script"), Pt(u), ie(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function C0(t, e) {
    Ml.M(t, e);
    var l = ga;
    if (l && t) {
      var n = Ln(l).hoistableScripts, a = _a(t), u = n.get(a);
      u || (u = l.querySelector(ru(a)), u || (t = O({ src: t, async: !0, type: "module" }, e), (e = Ze.get(a)) && $f(t, e), u = l.createElement("script"), Pt(u), ie(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function nd(t, e, l, n) {
    var a = (a = st.current) ? Ei(a) : null;
    if (!a) throw Error(f(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (e = pa(l.href), l = Ln(
          a
        ).hoistableStyles, n = l.get(e), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = pa(l.href);
          var u = Ln(
            a
          ).hoistableStyles, i = u.get(t);
          if (i || (a = a.ownerDocument || a, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = a.querySelector(
            fu(t)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Ze.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Ze.set(t, l), u || N0(
            a,
            t,
            l,
            i.state
          ))), e && n === null)
            throw Error(f(528, ""));
          return i;
        }
        if (e && n !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = _a(l), l = Ln(
          a
        ).hoistableScripts, n = l.get(e), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(f(444, t));
    }
  }
  function pa(t) {
    return 'href="' + He(t) + '"';
  }
  function fu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function ad(t) {
    return O({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function N0(t, e, l, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? n.loading = 1 : (e = t.createElement("link"), n.preload = e, e.addEventListener("load", function() {
      return n.loading |= 1;
    }), e.addEventListener("error", function() {
      return n.loading |= 2;
    }), ie(e, "link", l), Pt(e), t.head.appendChild(e));
  }
  function _a(t) {
    return '[src="' + He(t) + '"]';
  }
  function ru(t) {
    return "script[async]" + t;
  }
  function ud(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + He(l.href) + '"]'
          );
          if (n)
            return e.instance = n, Pt(n), n;
          var a = O({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), Pt(n), ie(n, "style", a), Mi(n, l.precedence, t), e.instance = n;
        case "stylesheet":
          a = pa(l.href);
          var u = t.querySelector(
            fu(a)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, Pt(u), u;
          n = ad(l), (a = Ze.get(a)) && Jf(n, a), u = (t.ownerDocument || t).createElement("link"), Pt(u);
          var i = u;
          return i._p = new Promise(function(o, _) {
            i.onload = o, i.onerror = _;
          }), ie(u, "link", n), e.state.loading |= 4, Mi(u, l.precedence, t), e.instance = u;
        case "script":
          return u = _a(l.src), (a = t.querySelector(
            ru(u)
          )) ? (e.instance = a, Pt(a), a) : (n = l, (a = Ze.get(u)) && (n = O({}, l), $f(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), Pt(a), ie(a, "link", n), t.head.appendChild(a), e.instance = a);
        case "void":
          return null;
        default:
          throw Error(f(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (n = e.instance, e.state.loading |= 4, Mi(n, l.precedence, t));
    return e.instance;
  }
  function Mi(t, e, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, u = a, i = 0; i < n.length; i++) {
      var o = n[i];
      if (o.dataset.precedence === e) u = o;
      else if (u !== a) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Jf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function $f(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Ai = null;
  function id(t, e, l) {
    if (Ai === null) {
      var n = /* @__PURE__ */ new Map(), a = Ai = /* @__PURE__ */ new Map();
      a.set(l, n);
    } else
      a = Ai, n = a.get(l), n || (n = /* @__PURE__ */ new Map(), a.set(l, n));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
      var u = l[a];
      if (!(u[Aa] || u[le] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var o = n.get(i);
        o ? o.push(u) : n.set(i, [u]);
      }
    }
    return n;
  }
  function cd(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function U0(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function fd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function B0(t, e, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var a = pa(n.href), u = e.querySelector(
          fu(a)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = zi.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, Pt(u);
          return;
        }
        u = e.ownerDocument || e, n = ad(n), (a = Ze.get(a)) && Jf(n, a), u = u.createElement("link"), Pt(u);
        var i = u;
        i._p = new Promise(function(o, _) {
          i.onload = o, i.onerror = _;
        }), ie(u, "link", n), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = zi.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var Wf = 0;
  function q0(t, e) {
    return t.stylesheets && t.count === 0 && Ri(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (t.stylesheets && Ri(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Wf === 0 && (Wf = 62500 * y0());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Ri(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Wf ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function zi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ri(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Ti = null;
  function Ri(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Ti = /* @__PURE__ */ new Map(), e.forEach(x0, t), Ti = null, zi.call(t));
  }
  function x0(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Ti.get(t);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Ti.set(t, l);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < a.length; u++) {
          var i = a[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), n = i);
        }
        n && l.set(null, n);
      }
      a = e.instance, i = a.getAttribute("data-precedence"), u = l.get(i) || n, u === n && l.set(null, a), l.set(i, a), this.count++, n = zi.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), u ? u.parentNode.insertBefore(a, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
    }
  }
  var ou = {
    $$typeof: H,
    Provider: null,
    Consumer: null,
    _currentValue: ut,
    _currentValue2: ut,
    _threadCount: 0
  };
  function H0(t, e, l, n, a, u, i, o, _) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Vi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vi(0), this.hiddenUpdates = Vi(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = _, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function rd(t, e, l, n, a, u, i, o, _, B, G, $) {
    return t = new H0(
      t,
      e,
      l,
      i,
      _,
      B,
      G,
      $,
      o
    ), e = 1, u === !0 && (e |= 24), u = Ee(3, null, null, e), t.current = u, u.stateNode = t, e = Tc(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: e
    }, Cc(u), t;
  }
  function od(t) {
    return t ? (t = Fn, t) : Fn;
  }
  function sd(t, e, l, n, a, u) {
    a = od(a), n.context === null ? n.context = a : n.pendingContext = a, n = Yl(e), n.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (n.callback = u), l = Kl(t, n, e), l !== null && (pe(l, t, e), Qa(l, t, e));
  }
  function vd(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Ff(t, e) {
    vd(t, e), (t = t.alternate) && vd(t, e);
  }
  function dd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = hn(t, 67108864);
      e !== null && pe(e, t, 67108864), Ff(t, 67108864);
    }
  }
  function hd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Re();
      e = Xi(e);
      var l = hn(t, e);
      l !== null && pe(l, t, e), Ff(t, e);
    }
  }
  var Di = !0;
  function Y0(t, e, l, n) {
    var a = N.T;
    N.T = null;
    var u = V.p;
    try {
      V.p = 2, kf(t, e, l, n);
    } finally {
      V.p = u, N.T = a;
    }
  }
  function K0(t, e, l, n) {
    var a = N.T;
    N.T = null;
    var u = V.p;
    try {
      V.p = 8, kf(t, e, l, n);
    } finally {
      V.p = u, N.T = a;
    }
  }
  function kf(t, e, l, n) {
    if (Di) {
      var a = If(n);
      if (a === null)
        Hf(
          t,
          e,
          n,
          ji,
          l
        ), md(t, n);
      else if (G0(
        a,
        t,
        e,
        l,
        n
      ))
        n.stopPropagation();
      else if (md(t, n), e & 4 && -1 < L0.indexOf(t)) {
        for (; a !== null; ) {
          var u = Kn(a);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = rn(u.pendingLanes);
                  if (i !== 0) {
                    var o = u;
                    for (o.pendingLanes |= 2, o.entangledLanes |= 2; i; ) {
                      var _ = 1 << 31 - be(i);
                      o.entanglements[1] |= _, i &= ~_;
                    }
                    al(u), (At & 6) === 0 && (vi = Ht() + 500, au(0));
                  }
                }
                break;
              case 31:
              case 13:
                o = hn(u, 2), o !== null && pe(o, u, 2), hi(), Ff(u, 2);
            }
          if (u = If(n), u === null && Hf(
            t,
            e,
            n,
            ji,
            l
          ), u === a) break;
          a = u;
        }
        a !== null && n.stopPropagation();
      } else
        Hf(
          t,
          e,
          n,
          null,
          l
        );
    }
  }
  function If(t) {
    return t = Pi(t), Pf(t);
  }
  var ji = null;
  function Pf(t) {
    if (ji = null, t = Yn(t), t !== null) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = p(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = s(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ji = t, null;
  }
  function yd(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (qe()) {
          case fn:
            return 2;
          case tl:
            return 8;
          case _e:
          case qn:
            return 32;
          case xn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var tr = !1, Fl = null, kl = null, Il = null, su = /* @__PURE__ */ new Map(), vu = /* @__PURE__ */ new Map(), Pl = [], L0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function md(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Fl = null;
        break;
      case "dragenter":
      case "dragleave":
        kl = null;
        break;
      case "mouseover":
      case "mouseout":
        Il = null;
        break;
      case "pointerover":
      case "pointerout":
        su.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vu.delete(e.pointerId);
    }
  }
  function du(t, e, l, n, a, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [a]
    }, e !== null && (e = Kn(e), e !== null && dd(e)), t) : (t.eventSystemFlags |= n, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
  }
  function G0(t, e, l, n, a) {
    switch (e) {
      case "focusin":
        return Fl = du(
          Fl,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "dragenter":
        return kl = du(
          kl,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "mouseover":
        return Il = du(
          Il,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "pointerover":
        var u = a.pointerId;
        return su.set(
          u,
          du(
            su.get(u) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return u = a.pointerId, vu.set(
          u,
          du(
            vu.get(u) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
    }
    return !1;
  }
  function gd(t) {
    var e = Yn(t.target);
    if (e !== null) {
      var l = d(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = p(l), e !== null) {
            t.blockedOn = e, jr(t.priority, function() {
              hd(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = s(l), e !== null) {
            t.blockedOn = e, jr(t.priority, function() {
              hd(l);
            });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ci(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = If(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        Ii = n, l.target.dispatchEvent(n), Ii = null;
      } else
        return e = Kn(l), e !== null && dd(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function pd(t, e, l) {
    Ci(t) && l.delete(e);
  }
  function Q0() {
    tr = !1, Fl !== null && Ci(Fl) && (Fl = null), kl !== null && Ci(kl) && (kl = null), Il !== null && Ci(Il) && (Il = null), su.forEach(pd), vu.forEach(pd);
  }
  function Ni(t, e) {
    t.blockedOn === e && (t.blockedOn = null, tr || (tr = !0, r.unstable_scheduleCallback(
      r.unstable_NormalPriority,
      Q0
    )));
  }
  var Ui = null;
  function _d(t) {
    Ui !== t && (Ui = t, r.unstable_scheduleCallback(
      r.unstable_NormalPriority,
      function() {
        Ui === t && (Ui = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], n = t[e + 1], a = t[e + 2];
          if (typeof n != "function") {
            if (Pf(n || l) === null)
              continue;
            break;
          }
          var u = Kn(l);
          u !== null && (t.splice(e, 3), e -= 3, kc(
            u,
            {
              pending: !0,
              data: a,
              method: l.method,
              action: n
            },
            n,
            a
          ));
        }
      }
    ));
  }
  function Sa(t) {
    function e(_) {
      return Ni(_, t);
    }
    Fl !== null && Ni(Fl, t), kl !== null && Ni(kl, t), Il !== null && Ni(Il, t), su.forEach(e), vu.forEach(e);
    for (var l = 0; l < Pl.length; l++) {
      var n = Pl[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Pl.length && (l = Pl[0], l.blockedOn === null); )
      gd(l), l.blockedOn === null && Pl.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var a = l[n], u = l[n + 1], i = a[ve] || null;
        if (typeof u == "function")
          i || _d(l);
        else if (i) {
          var o = null;
          if (u && u.hasAttribute("formAction")) {
            if (a = u, i = u[ve] || null)
              o = i.formAction;
            else if (Pf(a) !== null) continue;
          } else o = i.action;
          typeof o == "function" ? l[n + 1] = o : (l.splice(n, 3), n -= 3), _d(l);
        }
      }
  }
  function Sd() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(i) {
            return a = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      a !== null && (a(), a = null), n || setTimeout(l, 20);
    }
    function l() {
      if (!n && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, a = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
        n = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), a !== null && (a(), a = null);
      };
    }
  }
  function er(t) {
    this._internalRoot = t;
  }
  Bi.prototype.render = er.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(f(409));
    var l = e.current, n = Re();
    sd(l, n, t, e, null, null);
  }, Bi.prototype.unmount = er.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      sd(t.current, 2, null, t, null, null), hi(), e[Hn] = null;
    }
  };
  function Bi(t) {
    this._internalRoot = t;
  }
  Bi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Dr();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Pl.length && e !== 0 && e < Pl[l].priority; l++) ;
      Pl.splice(l, 0, t), l === 0 && gd(t);
    }
  };
  var bd = h.version;
  if (bd !== "19.2.6")
    throw Error(
      f(
        527,
        bd,
        "19.2.6"
      )
    );
  V.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(f(188)) : (t = Object.keys(t).join(","), Error(f(268, t)));
    return t = S(e), t = t !== null ? m(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var V0 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: N,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qi.isDisabled && qi.supportsFiber)
      try {
        il = qi.inject(
          V0
        ), Se = qi;
      } catch {
      }
  }
  return yu.createRoot = function(t, e) {
    if (!y(t)) throw Error(f(299));
    var l = !1, n = "", a = Rs, u = Ds, i = js;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = rd(
      t,
      1,
      !1,
      null,
      null,
      l,
      n,
      null,
      a,
      u,
      i,
      Sd
    ), t[Hn] = e.current, xf(t), new er(e);
  }, yu.hydrateRoot = function(t, e, l) {
    if (!y(t)) throw Error(f(299));
    var n = !1, a = "", u = Rs, i = Ds, o = js, _ = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (o = l.onRecoverableError), l.formState !== void 0 && (_ = l.formState)), e = rd(
      t,
      1,
      !0,
      e,
      l ?? null,
      n,
      a,
      _,
      u,
      i,
      o,
      Sd
    ), e.context = od(null), l = e.current, n = Re(), n = Xi(n), a = Yl(n), a.callback = null, Kl(l, a, n), l = n, e.current.lanes = l, Ma(e, l), al(e), t[Hn] = e.current, xf(t), new Bi(e);
  }, yu.version = "19.2.6", yu;
}
var Cd;
function I0() {
  if (Cd) return nr.exports;
  Cd = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), nr.exports = k0(), nr.exports;
}
var P0 = I0(), dh = Ft();
const Gt = /* @__PURE__ */ Z0(dh);
var Tn = {}, gt = {}, Nd;
function Un() {
  if (Nd) return gt;
  Nd = 1;
  var c = gt && gt.__assign || function() {
    return c = Object.assign || function(q) {
      for (var z, H = 1, X = arguments.length; H < X; H++) {
        z = arguments[H];
        for (var k in z) Object.prototype.hasOwnProperty.call(z, k) && (q[k] = z[k]);
      }
      return q;
    }, c.apply(this, arguments);
  }, r = gt && gt.__createBinding || (Object.create ? (function(q, z, H, X) {
    X === void 0 && (X = H), Object.defineProperty(q, X, { enumerable: !0, get: function() {
      return z[H];
    } });
  }) : (function(q, z, H, X) {
    X === void 0 && (X = H), q[X] = z[H];
  })), h = gt && gt.__setModuleDefault || (Object.create ? (function(q, z) {
    Object.defineProperty(q, "default", { enumerable: !0, value: z });
  }) : function(q, z) {
    q.default = z;
  }), g = gt && gt.__importStar || function(q) {
    if (q && q.__esModule) return q;
    var z = {};
    if (q != null) for (var H in q) H !== "default" && Object.prototype.hasOwnProperty.call(q, H) && r(z, q, H);
    return h(z, q), z;
  }, f = gt && gt.__spreadArray || function(q, z, H) {
    if (H || arguments.length === 2) for (var X = 0, k = z.length, P; X < k; X++)
      (P || !(X in z)) && (P || (P = Array.prototype.slice.call(z, 0, X)), P[X] = z[X]);
    return q.concat(P || Array.prototype.slice.call(z));
  };
  Object.defineProperty(gt, "__esModule", { value: !0 }), gt.Priority = gt.isModKey = gt.shouldRejectKeystrokes = gt.useThrottledValue = gt.getScrollbarWidth = gt.useIsomorphicLayout = gt.noop = gt.createAction = gt.randomId = gt.usePointerMovedSinceMount = gt.useOuterClick = gt.swallowEvent = void 0;
  var y = g(Ft());
  function d(q) {
    q.stopPropagation(), q.preventDefault();
  }
  gt.swallowEvent = d;
  function p(q, z) {
    var H = y.useRef(z);
    H.current = z, y.useEffect(function() {
      function X(k) {
        var P, tt;
        !((P = q.current) === null || P === void 0) && P.contains(k.target) || // Add support for ReactShadowRoot
        // @ts-expect-error wrong types, the `host` property exists https://stackoverflow.com/a/25340456
        k.target === ((tt = q.current) === null || tt === void 0 ? void 0 : tt.getRootNode().host) || (k.preventDefault(), k.stopPropagation(), H.current());
      }
      return window.addEventListener("pointerdown", X, !0), function() {
        return window.removeEventListener("pointerdown", X, !0);
      };
    }, [q]);
  }
  gt.useOuterClick = p;
  function s() {
    var q = y.useState(!1), z = q[0], H = q[1];
    return y.useEffect(function() {
      function X() {
        H(!0);
      }
      if (!z)
        return window.addEventListener("pointermove", X), function() {
          return window.removeEventListener("pointermove", X);
        };
    }, [z]), z;
  }
  gt.usePointerMovedSinceMount = s;
  function v() {
    return Math.random().toString(36).substring(2, 9);
  }
  gt.randomId = v;
  function S(q) {
    return c({ id: v() }, q);
  }
  gt.createAction = S;
  function m() {
  }
  gt.noop = m, gt.useIsomorphicLayout = typeof window > "u" ? m : y.useLayoutEffect;
  function O() {
    var q = document.createElement("div");
    q.style.visibility = "hidden", q.style.overflow = "scroll", document.body.appendChild(q);
    var z = document.createElement("div");
    q.appendChild(z);
    var H = q.offsetWidth - z.offsetWidth;
    return q.parentNode.removeChild(q), H;
  }
  gt.getScrollbarWidth = O;
  function R(q, z) {
    z === void 0 && (z = 100);
    var H = y.useState(q), X = H[0], k = H[1], P = y.useRef(Date.now());
    return y.useEffect(function() {
      if (z !== 0) {
        var tt = setTimeout(function() {
          k(q), P.current = Date.now();
        }, P.current - (Date.now() - z));
        return function() {
          clearTimeout(tt);
        };
      }
    }, [z, q]), z === 0 ? q : X;
  }
  gt.useThrottledValue = R;
  function M(q) {
    var z, H, X, k = q === void 0 ? { ignoreWhenFocused: [] } : q, P = k.ignoreWhenFocused, tt = f(["input", "textarea"], P, !0).map(function(A) {
      return A.toLowerCase();
    }), F = document.activeElement, D = F && (tt.indexOf(F.tagName.toLowerCase()) !== -1 || ((z = F.attributes.getNamedItem("role")) === null || z === void 0 ? void 0 : z.value) === "textbox" || ((H = F.attributes.getNamedItem("contenteditable")) === null || H === void 0 ? void 0 : H.value) === "true" || ((X = F.attributes.getNamedItem("contenteditable")) === null || X === void 0 ? void 0 : X.value) === "plaintext-only");
    return D;
  }
  gt.shouldRejectKeystrokes = M;
  var j = typeof window > "u", C = !j && window.navigator.platform === "MacIntel";
  function L(q) {
    return C ? q.metaKey : q.ctrlKey;
  }
  return gt.isModKey = L, gt.Priority = {
    HIGH: 1,
    NORMAL: 0,
    LOW: -1
  }, gt;
}
var Fe = {}, De = {}, Al = {}, oe = {}, gu = { exports: {} }, tm = gu.exports, Ud;
function em() {
  return Ud || (Ud = 1, (function(c, r) {
    (function(h, g) {
      g(r);
    })(tm, (function(h) {
      var g = typeof WeakSet == "function", f = Object.keys;
      function y(D, A) {
        return D === A || D !== D && A !== A;
      }
      function d(D) {
        return D.constructor === Object || D.constructor == null;
      }
      function p(D) {
        return !!D && typeof D.then == "function";
      }
      function s(D) {
        return !!(D && D.$$typeof);
      }
      function v() {
        var D = [];
        return {
          add: function(A) {
            D.push(A);
          },
          has: function(A) {
            return D.indexOf(A) !== -1;
          }
        };
      }
      var S = /* @__PURE__ */ (function(D) {
        return D ? function() {
          return /* @__PURE__ */ new WeakSet();
        } : v;
      })(g);
      function m(D) {
        return function(W) {
          var w = D || W;
          return function(I, Y, N) {
            N === void 0 && (N = S());
            var V = !!I && typeof I == "object", ut = !!Y && typeof Y == "object";
            if (V || ut) {
              var ct = V && N.has(I), Ot = ut && N.has(Y);
              if (ct || Ot)
                return ct && Ot;
              V && N.add(I), ut && N.add(Y);
            }
            return w(I, Y, N);
          };
        };
      }
      function O(D, A, W, w) {
        var Q = D.length;
        if (A.length !== Q)
          return !1;
        for (; Q-- > 0; )
          if (!W(D[Q], A[Q], w))
            return !1;
        return !0;
      }
      function R(D, A, W, w) {
        var Q = D.size === A.size;
        if (Q && D.size) {
          var I = {};
          D.forEach(function(Y, N) {
            if (Q) {
              var V = !1, ut = 0;
              A.forEach(function(ct, Ot) {
                !V && !I[ut] && (V = W(N, Ot, w) && W(Y, ct, w), V && (I[ut] = !0)), ut++;
              }), Q = V;
            }
          });
        }
        return Q;
      }
      var M = "_owner", j = Function.prototype.bind.call(Function.prototype.call, Object.prototype.hasOwnProperty);
      function C(D, A, W, w) {
        var Q = f(D), I = Q.length;
        if (f(A).length !== I)
          return !1;
        if (I)
          for (var Y = void 0; I-- > 0; ) {
            if (Y = Q[I], Y === M) {
              var N = s(D), V = s(A);
              if ((N || V) && N !== V)
                return !1;
            }
            if (!j(A, Y) || !W(D[Y], A[Y], w))
              return !1;
          }
        return !0;
      }
      function L(D, A) {
        return D.source === A.source && D.global === A.global && D.ignoreCase === A.ignoreCase && D.multiline === A.multiline && D.unicode === A.unicode && D.sticky === A.sticky && D.lastIndex === A.lastIndex;
      }
      function q(D, A, W, w) {
        var Q = D.size === A.size;
        if (Q && D.size) {
          var I = {};
          D.forEach(function(Y) {
            if (Q) {
              var N = !1, V = 0;
              A.forEach(function(ut) {
                !N && !I[V] && (N = W(Y, ut, w), N && (I[V] = !0)), V++;
              }), Q = N;
            }
          });
        }
        return Q;
      }
      var z = typeof Map == "function", H = typeof Set == "function";
      function X(D) {
        var A = (
          /* eslint-disable no-use-before-define */
          typeof D == "function" ? D(W) : W
        );
        function W(w, Q, I) {
          if (w === Q)
            return !0;
          if (w && Q && typeof w == "object" && typeof Q == "object") {
            if (d(w) && d(Q))
              return C(w, Q, A, I);
            var Y = Array.isArray(w), N = Array.isArray(Q);
            return Y || N ? Y === N && O(w, Q, A, I) : (Y = w instanceof Date, N = Q instanceof Date, Y || N ? Y === N && y(w.getTime(), Q.getTime()) : (Y = w instanceof RegExp, N = Q instanceof RegExp, Y || N ? Y === N && L(w, Q) : p(w) || p(Q) ? w === Q : z && (Y = w instanceof Map, N = Q instanceof Map, Y || N) ? Y === N && R(w, Q, A, I) : H && (Y = w instanceof Set, N = Q instanceof Set, Y || N) ? Y === N && q(w, Q, A, I) : C(w, Q, A, I)));
          }
          return w !== w && Q !== Q;
        }
        return W;
      }
      var k = X(), P = X(function() {
        return y;
      }), tt = X(m()), F = X(m(y));
      h.circularDeepEqual = tt, h.circularShallowEqual = F, h.createCustomEqual = X, h.deepEqual = k, h.sameValueZeroEqual = y, h.shallowEqual = P, Object.defineProperty(h, "__esModule", { value: !0 });
    }));
  })(gu, gu.exports)), gu.exports;
}
var fr, Bd;
function Er() {
  if (Bd) return fr;
  Bd = 1;
  var c = "Invariant failed";
  function r(h, g) {
    if (!h)
      throw new Error(c);
  }
  return fr = r, fr;
}
var zl = {}, Rn = {}, mu = {}, qd;
function lm() {
  if (qd) return mu;
  qd = 1, Object.defineProperty(mu, "__esModule", { value: !0 }), mu.Command = void 0;
  var c = (
    /** @class */
    /* @__PURE__ */ (function() {
      function r(h, g) {
        var f = this;
        g === void 0 && (g = {}), this.perform = function() {
          var y = h.perform();
          if (typeof y == "function") {
            var d = g.history;
            d && (f.historyItem && d.remove(f.historyItem), f.historyItem = d.add({
              perform: h.perform,
              negate: y
            }), f.history = {
              undo: function() {
                return d.undo(f.historyItem);
              },
              redo: function() {
                return d.redo(f.historyItem);
              }
            });
          }
        };
      }
      return r;
    })()
  );
  return mu.Command = c, mu;
}
var xd;
function hh() {
  if (xd) return Rn;
  xd = 1;
  var c = Rn && Rn.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.ActionImpl = void 0;
  var r = c(/* @__PURE__ */ Er()), h = lm(), g = Un(), f = function(d) {
    var p = d.keywords, s = p === void 0 ? "" : p, v = d.section, S = v === void 0 ? "" : v;
    return (s + " " + (typeof S == "string" ? S : S.name)).trim();
  }, y = (
    /** @class */
    (function() {
      function d(p, s) {
        var v = this, S;
        this.priority = g.Priority.NORMAL, this.ancestors = [], this.children = [], Object.assign(this, p), this.id = p.id, this.name = p.name, this.keywords = f(p);
        var m = p.perform;
        if (this.command = m && new h.Command({
          perform: function() {
            return m(v);
          }
        }, {
          history: s.history
        }), this.perform = (S = this.command) === null || S === void 0 ? void 0 : S.perform, p.parent) {
          var O = s.store[p.parent];
          (0, r.default)(O, "attempted to create an action whos parent: " + p.parent + " does not exist in the store."), O.addChild(this);
        }
      }
      return d.prototype.addChild = function(p) {
        p.ancestors.unshift(this);
        for (var s = this.parentActionImpl; s; )
          p.ancestors.unshift(s), s = s.parentActionImpl;
        this.children.push(p);
      }, d.prototype.removeChild = function(p) {
        var s = this, v = this.children.indexOf(p);
        v !== -1 && this.children.splice(v, 1), p.children && p.children.forEach(function(S) {
          s.removeChild(S);
        });
      }, Object.defineProperty(d.prototype, "parentActionImpl", {
        // easily access parentActionImpl after creation
        get: function() {
          return this.ancestors[this.ancestors.length - 1];
        },
        enumerable: !1,
        configurable: !0
      }), d.create = function(p, s) {
        return new d(p, s);
      }, d;
    })()
  );
  return Rn.ActionImpl = y, Rn;
}
var Hd;
function yh() {
  if (Hd) return zl;
  Hd = 1;
  var c = zl && zl.__assign || function() {
    return c = Object.assign || function(y) {
      for (var d, p = 1, s = arguments.length; p < s; p++) {
        d = arguments[p];
        for (var v in d) Object.prototype.hasOwnProperty.call(d, v) && (y[v] = d[v]);
      }
      return y;
    }, c.apply(this, arguments);
  }, r = zl && zl.__importDefault || function(y) {
    return y && y.__esModule ? y : { default: y };
  };
  Object.defineProperty(zl, "__esModule", { value: !0 }), zl.ActionInterface = void 0;
  var h = r(/* @__PURE__ */ Er()), g = hh(), f = (
    /** @class */
    (function() {
      function y(d, p) {
        d === void 0 && (d = []), p === void 0 && (p = {}), this.actions = {}, this.options = p, this.add(d);
      }
      return y.prototype.add = function(d) {
        for (var p = 0; p < d.length; p++) {
          var s = d[p];
          s.parent && (0, h.default)(this.actions[s.parent], 'Attempted to create action "' + s.name + '" without registering its parent "' + s.parent + '" first.'), this.actions[s.id] = g.ActionImpl.create(s, {
            history: this.options.historyManager,
            store: this.actions
          });
        }
        return c({}, this.actions);
      }, y.prototype.remove = function(d) {
        var p = this;
        return d.forEach(function(s) {
          var v = p.actions[s.id];
          if (v) {
            for (var S = v.children; S.length; ) {
              var m = S.pop();
              if (!m)
                return;
              delete p.actions[m.id], m.parentActionImpl && m.parentActionImpl.removeChild(m), m.children && S.push.apply(S, m.children);
            }
            v.parentActionImpl && v.parentActionImpl.removeChild(v), delete p.actions[s.id];
          }
        }), c({}, this.actions);
      }, y;
    })()
  );
  return zl.ActionInterface = f, zl;
}
var Dn = {}, Yd;
function nm() {
  if (Yd) return Dn;
  Yd = 1, Object.defineProperty(Dn, "__esModule", { value: !0 }), Dn.history = Dn.HistoryItemImpl = void 0;
  var c = Un(), r = (
    /** @class */
    (function() {
      function f(y) {
        this.perform = y.perform, this.negate = y.negate;
      }
      return f.create = function(y) {
        return new f(y);
      }, f;
    })()
  );
  Dn.HistoryItemImpl = r;
  var h = (
    /** @class */
    (function() {
      function f() {
        return this.undoStack = [], this.redoStack = [], f.instance || (f.instance = this, this.init()), f.instance;
      }
      return f.prototype.init = function() {
        var y = this;
        typeof window > "u" || window.addEventListener("keydown", function(d) {
          var p;
          if (!(!y.redoStack.length && !y.undoStack.length || (0, c.shouldRejectKeystrokes)())) {
            var s = (p = d.key) === null || p === void 0 ? void 0 : p.toLowerCase();
            d.metaKey && s === "z" && d.shiftKey ? y.redo() : d.metaKey && s === "z" && y.undo();
          }
        });
      }, f.prototype.add = function(y) {
        var d = r.create(y);
        return this.undoStack.push(d), d;
      }, f.prototype.remove = function(y) {
        var d = this.undoStack.findIndex(function(s) {
          return s === y;
        });
        if (d !== -1) {
          this.undoStack.splice(d, 1);
          return;
        }
        var p = this.redoStack.findIndex(function(s) {
          return s === y;
        });
        p !== -1 && this.redoStack.splice(p, 1);
      }, f.prototype.undo = function(y) {
        if (!y) {
          var d = this.undoStack.pop();
          return d ? (d == null || d.negate(), this.redoStack.push(d), d) : void 0;
        }
        var p = this.undoStack.findIndex(function(s) {
          return s === y;
        });
        if (p !== -1)
          return this.undoStack.splice(p, 1), y.negate(), this.redoStack.push(y), y;
      }, f.prototype.redo = function(y) {
        if (!y) {
          var d = this.redoStack.pop();
          return d ? (d == null || d.perform(), this.undoStack.push(d), d) : void 0;
        }
        var p = this.redoStack.findIndex(function(s) {
          return s === y;
        });
        if (p !== -1)
          return this.redoStack.splice(p, 1), y.perform(), this.undoStack.push(y), y;
      }, f.prototype.reset = function() {
        this.undoStack.splice(0), this.redoStack.splice(0);
      }, f;
    })()
  ), g = new h();
  return Dn.history = g, Object.freeze(g), Dn;
}
var rr = {}, Kd;
function ba() {
  return Kd || (Kd = 1, (function(c) {
    Object.defineProperty(c, "__esModule", { value: !0 }), c.VisualState = void 0, (function(r) {
      r.animatingIn = "animating-in", r.showing = "showing", r.animatingOut = "animating-out", r.hidden = "hidden";
    })(c.VisualState || (c.VisualState = {}));
  })(rr)), rr;
}
var Ld;
function am() {
  if (Ld) return oe;
  Ld = 1;
  var c = oe && oe.__assign || function() {
    return c = Object.assign || function(M) {
      for (var j, C = 1, L = arguments.length; C < L; C++) {
        j = arguments[C];
        for (var q in j) Object.prototype.hasOwnProperty.call(j, q) && (M[q] = j[q]);
      }
      return M;
    }, c.apply(this, arguments);
  }, r = oe && oe.__createBinding || (Object.create ? (function(M, j, C, L) {
    L === void 0 && (L = C), Object.defineProperty(M, L, { enumerable: !0, get: function() {
      return j[C];
    } });
  }) : (function(M, j, C, L) {
    L === void 0 && (L = C), M[L] = j[C];
  })), h = oe && oe.__setModuleDefault || (Object.create ? (function(M, j) {
    Object.defineProperty(M, "default", { enumerable: !0, value: j });
  }) : function(M, j) {
    M.default = j;
  }), g = oe && oe.__importStar || function(M) {
    if (M && M.__esModule) return M;
    var j = {};
    if (M != null) for (var C in M) C !== "default" && Object.prototype.hasOwnProperty.call(M, C) && r(j, M, C);
    return h(j, M), j;
  }, f = oe && oe.__importDefault || function(M) {
    return M && M.__esModule ? M : { default: M };
  };
  Object.defineProperty(oe, "__esModule", { value: !0 }), oe.useStore = void 0;
  var y = /* @__PURE__ */ em(), d = g(Ft()), p = f(/* @__PURE__ */ Er()), s = yh(), v = nm(), S = ba();
  function m(M) {
    var j = d.useRef(c({ animations: {
      enterMs: 200,
      exitMs: 100
    } }, M.options)), C = d.useMemo(
      function() {
        return new s.ActionInterface(M.actions || [], {
          historyManager: j.current.enableHistory ? v.history : void 0
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ), L = d.useState({
      searchQuery: "",
      currentRootActionId: null,
      visualState: S.VisualState.hidden,
      actions: c({}, C.actions),
      activeIndex: 0,
      disabled: !1
    }), q = L[0], z = L[1], H = d.useRef(q);
    H.current = q;
    var X = d.useCallback(function() {
      return H.current;
    }, []), k = d.useMemo(function() {
      return new O(X);
    }, [X]);
    d.useEffect(function() {
      H.current = q, k.notify();
    }, [q, k]);
    var P = d.useCallback(function(F) {
      return z(function(D) {
        return c(c({}, D), { actions: C.add(F) });
      }), function() {
        z(function(A) {
          return c(c({}, A), { actions: C.remove(F) });
        });
      };
    }, [C]), tt = d.useRef(null);
    return d.useMemo(function() {
      var F = {
        setCurrentRootAction: function(D) {
          z(function(A) {
            return c(c({}, A), { currentRootActionId: D });
          });
        },
        setVisualState: function(D) {
          z(function(A) {
            return c(c({}, A), { visualState: typeof D == "function" ? D(A.visualState) : D });
          });
        },
        setSearch: function(D) {
          return z(function(A) {
            return c(c({}, A), { searchQuery: D });
          });
        },
        registerActions: P,
        toggle: function() {
          return z(function(D) {
            return c(c({}, D), { visualState: [S.VisualState.animatingOut, S.VisualState.hidden].includes(D.visualState) ? S.VisualState.animatingIn : S.VisualState.animatingOut });
          });
        },
        setActiveIndex: function(D) {
          return z(function(A) {
            return c(c({}, A), { activeIndex: typeof D == "number" ? D : D(A.activeIndex) });
          });
        },
        inputRefSetter: function(D) {
          tt.current = D;
        },
        getInput: function() {
          return (0, p.default)(tt.current, "Input ref is undefined, make sure you attach `query.inputRefSetter` to your search input."), tt.current;
        },
        disable: function(D) {
          z(function(A) {
            return c(c({}, A), { disabled: D });
          });
        }
      };
      return {
        getState: X,
        query: F,
        options: j.current,
        subscribe: function(D, A) {
          return k.subscribe(D, A);
        }
      };
    }, [X, k, P]);
  }
  oe.useStore = m;
  var O = (
    /** @class */
    (function() {
      function M(j) {
        this.subscribers = [], this.getState = j;
      }
      return M.prototype.subscribe = function(j, C) {
        var L = this, q = new R(function() {
          return j(L.getState());
        }, C);
        return this.subscribers.push(q), this.unsubscribe.bind(this, q);
      }, M.prototype.unsubscribe = function(j) {
        if (this.subscribers.length) {
          var C = this.subscribers.indexOf(j);
          if (C > -1)
            return this.subscribers.splice(C, 1);
        }
      }, M.prototype.notify = function() {
        this.subscribers.forEach(function(j) {
          return j.collect();
        });
      }, M;
    })()
  ), R = (
    /** @class */
    (function() {
      function M(j, C) {
        this.collector = j, this.onChange = C;
      }
      return M.prototype.collect = function() {
        try {
          var j = this.collector();
          (0, y.deepEqual)(j, this.collected) || (this.collected = j, this.onChange && this.onChange(this.collected));
        } catch (C) {
          console.warn(C);
        }
      }, M;
    })()
  );
  return oe;
}
var je = {}, xi = {}, Gd;
function um() {
  if (Gd) return xi;
  Gd = 1, Object.defineProperty(xi, "__esModule", { value: !0 });
  var c = ["Shift", "Meta", "Alt", "Control"], r = 1e3, h = "keydown", g = typeof navigator == "object" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Meta" : "Control";
  function f(s, v) {
    return typeof s.getModifierState == "function" ? s.getModifierState(v) : !1;
  }
  function y(s) {
    return s.trim().split(" ").map(function(v) {
      var S = v.split(/\b\+/), m = S.pop();
      return S = S.map(function(O) {
        return O === "$mod" ? g : O;
      }), [S, m];
    });
  }
  function d(s, v) {
    return /^[^A-Za-z0-9]$/.test(s.key) && v[1] === s.key ? !0 : !// Allow either the `event.key` or the `event.code`
    // MDN event.key: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
    // MDN event.code: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    (v[1].toUpperCase() !== s.key.toUpperCase() && v[1] !== s.code || // Ensure all the modifiers in the keybinding are pressed.
    v[0].find(function(S) {
      return !f(s, S);
    }) || // KEYBINDING_MODIFIER_KEYS (Shift/Control/etc) change the meaning of a
    // keybinding. So if they are pressed but aren't part of the current
    // keybinding press, then we don't have a match.
    c.find(function(S) {
      return !v[0].includes(S) && v[1] !== S && f(s, S);
    }));
  }
  function p(s, v, S) {
    var m, O;
    S === void 0 && (S = {});
    var R = (m = S.timeout) !== null && m !== void 0 ? m : r, M = (O = S.event) !== null && O !== void 0 ? O : h, j = Object.keys(v).map(function(z) {
      return [y(z), v[z]];
    }), C = /* @__PURE__ */ new Map(), L = null, q = function(z) {
      z instanceof KeyboardEvent && (j.forEach(function(H) {
        var X = H[0], k = H[1], P = C.get(X), tt = P || X, F = tt[0], D = d(z, F);
        D ? tt.length > 1 ? C.set(X, tt.slice(1)) : (C.delete(X), k(z)) : f(z, z.key) || C.delete(X);
      }), L && clearTimeout(L), L = setTimeout(C.clear.bind(C), R));
    };
    return s.addEventListener(M, q), function() {
      s.removeEventListener(M, q);
    };
  }
  return xi.default = p, xi;
}
var Qd;
function im() {
  if (Qd) return je;
  Qd = 1;
  var c = je && je.__createBinding || (Object.create ? (function(C, L, q, z) {
    z === void 0 && (z = q), Object.defineProperty(C, z, { enumerable: !0, get: function() {
      return L[q];
    } });
  }) : (function(C, L, q, z) {
    z === void 0 && (z = q), C[z] = L[q];
  })), r = je && je.__setModuleDefault || (Object.create ? (function(C, L) {
    Object.defineProperty(C, "default", { enumerable: !0, value: L });
  }) : function(C, L) {
    C.default = L;
  }), h = je && je.__importStar || function(C) {
    if (C && C.__esModule) return C;
    var L = {};
    if (C != null) for (var q in C) q !== "default" && Object.prototype.hasOwnProperty.call(C, q) && c(L, C, q);
    return r(L, C), L;
  }, g = je && je.__importDefault || function(C) {
    return C && C.__esModule ? C : { default: C };
  };
  Object.defineProperty(je, "__esModule", { value: !0 }), je.InternalEvents = void 0;
  var f = h(Ft()), y = g(um()), d = ba(), p = nn(), s = Un();
  function v() {
    return S(), m(), M(), j(), null;
  }
  je.InternalEvents = v;
  function S() {
    var C, L, q = (0, p.useKBar)(function(D) {
      return {
        visualState: D.visualState,
        showing: D.visualState !== d.VisualState.hidden,
        disabled: D.disabled
      };
    }), z = q.query, H = q.options, X = q.visualState, k = q.showing, P = q.disabled;
    f.useEffect(function() {
      var D, A = function() {
        z.setVisualState(function(Q) {
          return Q === d.VisualState.hidden || Q === d.VisualState.animatingOut ? Q : d.VisualState.animatingOut;
        });
      };
      if (P) {
        A();
        return;
      }
      var W = H.toggleShortcut || "$mod+k", w = (0, y.default)(window, (D = {}, D[W] = function(Q) {
        var I, Y, N, V;
        Q.defaultPrevented || (Q.preventDefault(), z.toggle(), k ? (Y = (I = H.callbacks) === null || I === void 0 ? void 0 : I.onClose) === null || Y === void 0 || Y.call(I) : (V = (N = H.callbacks) === null || N === void 0 ? void 0 : N.onOpen) === null || V === void 0 || V.call(N));
      }, D.Escape = function(Q) {
        var I, Y;
        k && (Q.stopPropagation(), Q.preventDefault(), (Y = (I = H.callbacks) === null || I === void 0 ? void 0 : I.onClose) === null || Y === void 0 || Y.call(I)), A();
      }, D));
      return function() {
        w();
      };
    }, [H.callbacks, H.toggleShortcut, z, k, P]);
    var tt = f.useRef(), F = f.useCallback(function(D) {
      var A, W, w = 0;
      D === d.VisualState.animatingIn && (w = ((A = H.animations) === null || A === void 0 ? void 0 : A.enterMs) || 0), D === d.VisualState.animatingOut && (w = ((W = H.animations) === null || W === void 0 ? void 0 : W.exitMs) || 0), clearTimeout(tt.current), tt.current = setTimeout(function() {
        var Q = !1;
        z.setVisualState(function() {
          var I = D === d.VisualState.animatingIn ? d.VisualState.showing : d.VisualState.hidden;
          return I === d.VisualState.hidden && (Q = !0), I;
        }), Q && z.setCurrentRootAction(null);
      }, w);
    }, [(C = H.animations) === null || C === void 0 ? void 0 : C.enterMs, (L = H.animations) === null || L === void 0 ? void 0 : L.exitMs, z]);
    f.useEffect(function() {
      switch (X) {
        case d.VisualState.animatingIn:
        case d.VisualState.animatingOut:
          F(X);
          break;
      }
    }, [F, X]);
  }
  function m() {
    var C = (0, p.useKBar)(function(z) {
      return {
        visualState: z.visualState
      };
    }), L = C.visualState, q = C.options;
    f.useEffect(function() {
      if (!q.disableDocumentLock)
        if (L === d.VisualState.animatingIn) {
          if (document.body.style.overflow = "hidden", !q.disableScrollbarManagement) {
            var z = (0, s.getScrollbarWidth)(), H = getComputedStyle(document.body)["margin-right"];
            H && (z += Number(H.replace(/\D/g, ""))), document.body.style.marginRight = z + "px";
          }
        } else L === d.VisualState.hidden && (document.body.style.removeProperty("overflow"), q.disableScrollbarManagement || document.body.style.removeProperty("margin-right"));
    }, [
      q.disableDocumentLock,
      q.disableScrollbarManagement,
      L
    ]);
  }
  var O = /* @__PURE__ */ new WeakSet();
  function R(C) {
    return function(L) {
      O.has(L) || (C(L), O.add(L));
    };
  }
  function M() {
    var C = (0, p.useKBar)(function(k) {
      return {
        actions: k.actions,
        open: k.visualState === d.VisualState.showing,
        disabled: k.disabled
      };
    }), L = C.actions, q = C.query, z = C.open, H = C.options, X = C.disabled;
    f.useEffect(function() {
      var k;
      if (!(z || X)) {
        for (var P = Object.keys(L).map(function(N) {
          return L[N];
        }), tt = [], F = 0, D = P; F < D.length; F++) {
          var A = D[F];
          !((k = A.shortcut) === null || k === void 0) && k.length && tt.push(A);
        }
        tt = tt.sort(function(N, V) {
          return V.shortcut.join(" ").length - N.shortcut.join(" ").length;
        });
        for (var W = {}, w = function(N) {
          var V = N.shortcut.join(" ");
          W[V] = R(function(ut) {
            var ct, Ot, b, J, et, lt;
            (0, s.shouldRejectKeystrokes)() || (ut.preventDefault(), !((ct = N.children) === null || ct === void 0) && ct.length ? (q.setCurrentRootAction(N.id), q.toggle(), (b = (Ot = H.callbacks) === null || Ot === void 0 ? void 0 : Ot.onOpen) === null || b === void 0 || b.call(Ot)) : ((J = N.command) === null || J === void 0 || J.perform(), (lt = (et = H.callbacks) === null || et === void 0 ? void 0 : et.onSelectAction) === null || lt === void 0 || lt.call(et, N)));
          });
        }, Q = 0, I = tt; Q < I.length; Q++) {
          var A = I[Q];
          w(A);
        }
        var Y = (0, y.default)(window, W, {
          timeout: 400
        });
        return function() {
          Y();
        };
      }
    }, [L, z, H.callbacks, q, X]);
  }
  function j() {
    var C = f.useRef(!0), L = (0, p.useKBar)(function(X) {
      return {
        isShowing: X.visualState === d.VisualState.showing || X.visualState === d.VisualState.animatingIn
      };
    }), q = L.isShowing, z = L.query, H = f.useRef(null);
    f.useEffect(function() {
      if (C.current) {
        C.current = !1;
        return;
      }
      if (q) {
        H.current = document.activeElement;
        return;
      }
      var X = document.activeElement;
      (X == null ? void 0 : X.tagName.toLowerCase()) === "input" && X.blur();
      var k = H.current;
      k && k !== X && k.focus();
    }, [q]), f.useEffect(function() {
      function X(k) {
        var P = z.getInput();
        k.target !== P && P.focus();
      }
      if (q)
        return window.addEventListener("keydown", X), function() {
          window.removeEventListener("keydown", X);
        };
    }, [q, z]);
  }
  return je;
}
var Vd;
function mh() {
  return Vd || (Vd = 1, (function(c) {
    var r = Al && Al.__createBinding || (Object.create ? (function(s, v, S, m) {
      m === void 0 && (m = S), Object.defineProperty(s, m, { enumerable: !0, get: function() {
        return v[S];
      } });
    }) : (function(s, v, S, m) {
      m === void 0 && (m = S), s[m] = v[S];
    })), h = Al && Al.__setModuleDefault || (Object.create ? (function(s, v) {
      Object.defineProperty(s, "default", { enumerable: !0, value: v });
    }) : function(s, v) {
      s.default = v;
    }), g = Al && Al.__importStar || function(s) {
      if (s && s.__esModule) return s;
      var v = {};
      if (s != null) for (var S in s) S !== "default" && Object.prototype.hasOwnProperty.call(s, S) && r(v, s, S);
      return h(v, s), v;
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), c.KBarProvider = c.KBarContext = void 0;
    var f = am(), y = g(Ft()), d = im();
    c.KBarContext = y.createContext({});
    var p = function(s) {
      var v = (0, f.useStore)(s);
      return y.createElement(
        c.KBarContext.Provider,
        { value: v },
        y.createElement(d.InternalEvents, null),
        s.children
      );
    };
    c.KBarProvider = p;
  })(Al)), Al;
}
var Xd;
function nn() {
  if (Xd) return De;
  Xd = 1;
  var c = De && De.__assign || function() {
    return c = Object.assign || function(p) {
      for (var s, v = 1, S = arguments.length; v < S; v++) {
        s = arguments[v];
        for (var m in s) Object.prototype.hasOwnProperty.call(s, m) && (p[m] = s[m]);
      }
      return p;
    }, c.apply(this, arguments);
  }, r = De && De.__createBinding || (Object.create ? (function(p, s, v, S) {
    S === void 0 && (S = v), Object.defineProperty(p, S, { enumerable: !0, get: function() {
      return s[v];
    } });
  }) : (function(p, s, v, S) {
    S === void 0 && (S = v), p[S] = s[v];
  })), h = De && De.__setModuleDefault || (Object.create ? (function(p, s) {
    Object.defineProperty(p, "default", { enumerable: !0, value: s });
  }) : function(p, s) {
    p.default = s;
  }), g = De && De.__importStar || function(p) {
    if (p && p.__esModule) return p;
    var s = {};
    if (p != null) for (var v in p) v !== "default" && Object.prototype.hasOwnProperty.call(p, v) && r(s, p, v);
    return h(s, p), s;
  };
  Object.defineProperty(De, "__esModule", { value: !0 }), De.useKBar = void 0;
  var f = g(Ft()), y = mh();
  function d(p) {
    var s = f.useContext(y.KBarContext), v = s.query, S = s.getState, m = s.subscribe, O = s.options, R = f.useRef(p == null ? void 0 : p(S())), M = f.useRef(p), j = f.useCallback(function(z) {
      return c(c({}, z), { query: v, options: O });
    }, [v, O]), C = f.useState(j(R.current)), L = C[0], q = C[1];
    return f.useEffect(function() {
      var z;
      return M.current && (z = m(function(H) {
        return M.current(H);
      }, function(H) {
        return q(j(H));
      })), function() {
        z && z();
      };
    }, [j, m]), L;
  }
  return De.useKBar = d, De;
}
function Tl(c) {
  return Array.isArray ? Array.isArray(c) : _h(c) === "[object Array]";
}
function cm(c) {
  if (typeof c == "string")
    return c;
  let r = c + "";
  return r == "0" && 1 / c == -1 / 0 ? "-0" : r;
}
function fm(c) {
  return c == null ? "" : cm(c);
}
function ul(c) {
  return typeof c == "string";
}
function gh(c) {
  return typeof c == "number";
}
function rm(c) {
  return c === !0 || c === !1 || om(c) && _h(c) == "[object Boolean]";
}
function ph(c) {
  return typeof c == "object";
}
function om(c) {
  return ph(c) && c !== null;
}
function Be(c) {
  return c != null;
}
function or(c) {
  return !c.trim().length;
}
function _h(c) {
  return c == null ? c === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(c);
}
const sm = "Incorrect 'index' type", vm = (c) => `Invalid value for key ${c}`, dm = (c) => `Pattern length exceeds max of ${c}.`, hm = (c) => `Missing ${c} property in key`, ym = (c) => `Property 'weight' in key '${c}' must be a positive integer`, Zd = Object.prototype.hasOwnProperty;
class mm {
  constructor(r) {
    this._keys = [], this._keyMap = {};
    let h = 0;
    r.forEach((g) => {
      let f = Sh(g);
      h += f.weight, this._keys.push(f), this._keyMap[f.id] = f, h += f.weight;
    }), this._keys.forEach((g) => {
      g.weight /= h;
    });
  }
  get(r) {
    return this._keyMap[r];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function Sh(c) {
  let r = null, h = null, g = null, f = 1, y = null;
  if (ul(c) || Tl(c))
    g = c, r = wd(c), h = mr(c);
  else {
    if (!Zd.call(c, "name"))
      throw new Error(hm("name"));
    const d = c.name;
    if (g = d, Zd.call(c, "weight") && (f = c.weight, f <= 0))
      throw new Error(ym(d));
    r = wd(d), h = mr(d), y = c.getFn;
  }
  return { path: r, id: h, weight: f, src: g, getFn: y };
}
function wd(c) {
  return Tl(c) ? c : c.split(".");
}
function mr(c) {
  return Tl(c) ? c.join(".") : c;
}
function gm(c, r) {
  let h = [], g = !1;
  const f = (y, d, p) => {
    if (Be(y))
      if (!d[p])
        h.push(y);
      else {
        let s = d[p];
        const v = y[s];
        if (!Be(v))
          return;
        if (p === d.length - 1 && (ul(v) || gh(v) || rm(v)))
          h.push(fm(v));
        else if (Tl(v)) {
          g = !0;
          for (let S = 0, m = v.length; S < m; S += 1)
            f(v[S], d, p + 1);
        } else d.length && f(v, d, p + 1);
      }
  };
  return f(c, ul(r) ? r.split(".") : r, 0), g ? h : h[0];
}
const pm = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: !1,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: !1,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
}, _m = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: !1,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: !1,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: !0,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (c, r) => c.score === r.score ? c.idx < r.idx ? -1 : 1 : c.score < r.score ? -1 : 1
}, Sm = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
}, bm = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: !1,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: gm,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: !1,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: !1,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};
var rt = {
  ..._m,
  ...pm,
  ...Sm,
  ...bm
};
const Om = /[^ ]+/g;
function Em(c = 1, r = 3) {
  const h = /* @__PURE__ */ new Map(), g = Math.pow(10, r);
  return {
    get(f) {
      const y = f.match(Om).length;
      if (h.has(y))
        return h.get(y);
      const d = 1 / Math.pow(y, 0.5 * c), p = parseFloat(Math.round(d * g) / g);
      return h.set(y, p), p;
    },
    clear() {
      h.clear();
    }
  };
}
class Mr {
  constructor({
    getFn: r = rt.getFn,
    fieldNormWeight: h = rt.fieldNormWeight
  } = {}) {
    this.norm = Em(h, 3), this.getFn = r, this.isCreated = !1, this.setIndexRecords();
  }
  setSources(r = []) {
    this.docs = r;
  }
  setIndexRecords(r = []) {
    this.records = r;
  }
  setKeys(r = []) {
    this.keys = r, this._keysMap = {}, r.forEach((h, g) => {
      this._keysMap[h.id] = g;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, ul(this.docs[0]) ? this.docs.forEach((r, h) => {
      this._addString(r, h);
    }) : this.docs.forEach((r, h) => {
      this._addObject(r, h);
    }), this.norm.clear());
  }
  // Adds a doc to the end of the index
  add(r) {
    const h = this.size();
    ul(r) ? this._addString(r, h) : this._addObject(r, h);
  }
  // Removes the doc at the specified index of the index
  removeAt(r) {
    this.records.splice(r, 1);
    for (let h = r, g = this.size(); h < g; h += 1)
      this.records[h].i -= 1;
  }
  getValueForItemAtKeyId(r, h) {
    return r[this._keysMap[h]];
  }
  size() {
    return this.records.length;
  }
  _addString(r, h) {
    if (!Be(r) || or(r))
      return;
    let g = {
      v: r,
      i: h,
      n: this.norm.get(r)
    };
    this.records.push(g);
  }
  _addObject(r, h) {
    let g = { i: h, $: {} };
    this.keys.forEach((f, y) => {
      let d = f.getFn ? f.getFn(r) : this.getFn(r, f.path);
      if (Be(d)) {
        if (Tl(d)) {
          let p = [];
          const s = [{ nestedArrIndex: -1, value: d }];
          for (; s.length; ) {
            const { nestedArrIndex: v, value: S } = s.pop();
            if (Be(S))
              if (ul(S) && !or(S)) {
                let m = {
                  v: S,
                  i: v,
                  n: this.norm.get(S)
                };
                p.push(m);
              } else Tl(S) && S.forEach((m, O) => {
                s.push({
                  nestedArrIndex: O,
                  value: m
                });
              });
          }
          g.$[y] = p;
        } else if (ul(d) && !or(d)) {
          let p = {
            v: d,
            n: this.norm.get(d)
          };
          g.$[y] = p;
        }
      }
    }), this.records.push(g);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
}
function bh(c, r, { getFn: h = rt.getFn, fieldNormWeight: g = rt.fieldNormWeight } = {}) {
  const f = new Mr({ getFn: h, fieldNormWeight: g });
  return f.setKeys(c.map(Sh)), f.setSources(r), f.create(), f;
}
function Mm(c, { getFn: r = rt.getFn, fieldNormWeight: h = rt.fieldNormWeight } = {}) {
  const { keys: g, records: f } = c, y = new Mr({ getFn: r, fieldNormWeight: h });
  return y.setKeys(g), y.setIndexRecords(f), y;
}
function Hi(c, {
  errors: r = 0,
  currentLocation: h = 0,
  expectedLocation: g = 0,
  distance: f = rt.distance,
  ignoreLocation: y = rt.ignoreLocation
} = {}) {
  const d = r / c.length;
  if (y)
    return d;
  const p = Math.abs(g - h);
  return f ? d + p / f : p ? 1 : d;
}
function Am(c = [], r = rt.minMatchCharLength) {
  let h = [], g = -1, f = -1, y = 0;
  for (let d = c.length; y < d; y += 1) {
    let p = c[y];
    p && g === -1 ? g = y : !p && g !== -1 && (f = y - 1, f - g + 1 >= r && h.push([g, f]), g = -1);
  }
  return c[y - 1] && y - g >= r && h.push([g, y - 1]), h;
}
const Cn = 32;
function zm(c, r, h, {
  location: g = rt.location,
  distance: f = rt.distance,
  threshold: y = rt.threshold,
  findAllMatches: d = rt.findAllMatches,
  minMatchCharLength: p = rt.minMatchCharLength,
  includeMatches: s = rt.includeMatches,
  ignoreLocation: v = rt.ignoreLocation
} = {}) {
  if (r.length > Cn)
    throw new Error(dm(Cn));
  const S = r.length, m = c.length, O = Math.max(0, Math.min(g, m));
  let R = y, M = O;
  const j = p > 1 || s, C = j ? Array(m) : [];
  let L;
  for (; (L = c.indexOf(r, M)) > -1; ) {
    let P = Hi(r, {
      currentLocation: L,
      expectedLocation: O,
      distance: f,
      ignoreLocation: v
    });
    if (R = Math.min(P, R), M = L + S, j) {
      let tt = 0;
      for (; tt < S; )
        C[L + tt] = 1, tt += 1;
    }
  }
  M = -1;
  let q = [], z = 1, H = S + m;
  const X = 1 << S - 1;
  for (let P = 0; P < S; P += 1) {
    let tt = 0, F = H;
    for (; tt < F; )
      Hi(r, {
        errors: P,
        currentLocation: O + F,
        expectedLocation: O,
        distance: f,
        ignoreLocation: v
      }) <= R ? tt = F : H = F, F = Math.floor((H - tt) / 2 + tt);
    H = F;
    let D = Math.max(1, O - F + 1), A = d ? m : Math.min(O + F, m) + S, W = Array(A + 2);
    W[A + 1] = (1 << P) - 1;
    for (let Q = A; Q >= D; Q -= 1) {
      let I = Q - 1, Y = h[c.charAt(I)];
      if (j && (C[I] = +!!Y), W[Q] = (W[Q + 1] << 1 | 1) & Y, P && (W[Q] |= (q[Q + 1] | q[Q]) << 1 | 1 | q[Q + 1]), W[Q] & X && (z = Hi(r, {
        errors: P,
        currentLocation: I,
        expectedLocation: O,
        distance: f,
        ignoreLocation: v
      }), z <= R)) {
        if (R = z, M = I, M <= O)
          break;
        D = Math.max(1, 2 * O - M);
      }
    }
    if (Hi(r, {
      errors: P + 1,
      currentLocation: O,
      expectedLocation: O,
      distance: f,
      ignoreLocation: v
    }) > R)
      break;
    q = W;
  }
  const k = {
    isMatch: M >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, z)
  };
  if (j) {
    const P = Am(C, p);
    P.length ? s && (k.indices = P) : k.isMatch = !1;
  }
  return k;
}
function Tm(c) {
  let r = {};
  for (let h = 0, g = c.length; h < g; h += 1) {
    const f = c.charAt(h);
    r[f] = (r[f] || 0) | 1 << g - h - 1;
  }
  return r;
}
class Oh {
  constructor(r, {
    location: h = rt.location,
    threshold: g = rt.threshold,
    distance: f = rt.distance,
    includeMatches: y = rt.includeMatches,
    findAllMatches: d = rt.findAllMatches,
    minMatchCharLength: p = rt.minMatchCharLength,
    isCaseSensitive: s = rt.isCaseSensitive,
    ignoreLocation: v = rt.ignoreLocation
  } = {}) {
    if (this.options = {
      location: h,
      threshold: g,
      distance: f,
      includeMatches: y,
      findAllMatches: d,
      minMatchCharLength: p,
      isCaseSensitive: s,
      ignoreLocation: v
    }, this.pattern = s ? r : r.toLowerCase(), this.chunks = [], !this.pattern.length)
      return;
    const S = (O, R) => {
      this.chunks.push({
        pattern: O,
        alphabet: Tm(O),
        startIndex: R
      });
    }, m = this.pattern.length;
    if (m > Cn) {
      let O = 0;
      const R = m % Cn, M = m - R;
      for (; O < M; )
        S(this.pattern.substr(O, Cn), O), O += Cn;
      if (R) {
        const j = m - Cn;
        S(this.pattern.substr(j), j);
      }
    } else
      S(this.pattern, 0);
  }
  searchIn(r) {
    const { isCaseSensitive: h, includeMatches: g } = this.options;
    if (h || (r = r.toLowerCase()), this.pattern === r) {
      let M = {
        isMatch: !0,
        score: 0
      };
      return g && (M.indices = [[0, r.length - 1]]), M;
    }
    const {
      location: f,
      distance: y,
      threshold: d,
      findAllMatches: p,
      minMatchCharLength: s,
      ignoreLocation: v
    } = this.options;
    let S = [], m = 0, O = !1;
    this.chunks.forEach(({ pattern: M, alphabet: j, startIndex: C }) => {
      const { isMatch: L, score: q, indices: z } = zm(r, M, j, {
        location: f + C,
        distance: y,
        threshold: d,
        findAllMatches: p,
        minMatchCharLength: s,
        includeMatches: g,
        ignoreLocation: v
      });
      L && (O = !0), m += q, L && z && (S = [...S, ...z]);
    });
    let R = {
      isMatch: O,
      score: O ? m / this.chunks.length : 1
    };
    return O && g && (R.indices = S), R;
  }
}
class an {
  constructor(r) {
    this.pattern = r;
  }
  static isMultiMatch(r) {
    return Jd(r, this.multiRegex);
  }
  static isSingleMatch(r) {
    return Jd(r, this.singleRegex);
  }
  search() {
  }
}
function Jd(c, r) {
  const h = c.match(r);
  return h ? h[1] : null;
}
class Rm extends an {
  constructor(r) {
    super(r);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(r) {
    const h = r === this.pattern;
    return {
      isMatch: h,
      score: h ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class Dm extends an {
  constructor(r) {
    super(r);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(r) {
    const g = r.indexOf(this.pattern) === -1;
    return {
      isMatch: g,
      score: g ? 0 : 1,
      indices: [0, r.length - 1]
    };
  }
}
class jm extends an {
  constructor(r) {
    super(r);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(r) {
    const h = r.startsWith(this.pattern);
    return {
      isMatch: h,
      score: h ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class Cm extends an {
  constructor(r) {
    super(r);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(r) {
    const h = !r.startsWith(this.pattern);
    return {
      isMatch: h,
      score: h ? 0 : 1,
      indices: [0, r.length - 1]
    };
  }
}
class Nm extends an {
  constructor(r) {
    super(r);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(r) {
    const h = r.endsWith(this.pattern);
    return {
      isMatch: h,
      score: h ? 0 : 1,
      indices: [r.length - this.pattern.length, r.length - 1]
    };
  }
}
class Um extends an {
  constructor(r) {
    super(r);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(r) {
    const h = !r.endsWith(this.pattern);
    return {
      isMatch: h,
      score: h ? 0 : 1,
      indices: [0, r.length - 1]
    };
  }
}
class Eh extends an {
  constructor(r, {
    location: h = rt.location,
    threshold: g = rt.threshold,
    distance: f = rt.distance,
    includeMatches: y = rt.includeMatches,
    findAllMatches: d = rt.findAllMatches,
    minMatchCharLength: p = rt.minMatchCharLength,
    isCaseSensitive: s = rt.isCaseSensitive,
    ignoreLocation: v = rt.ignoreLocation
  } = {}) {
    super(r), this._bitapSearch = new Oh(r, {
      location: h,
      threshold: g,
      distance: f,
      includeMatches: y,
      findAllMatches: d,
      minMatchCharLength: p,
      isCaseSensitive: s,
      ignoreLocation: v
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(r) {
    return this._bitapSearch.searchIn(r);
  }
}
class Mh extends an {
  constructor(r) {
    super(r);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(r) {
    let h = 0, g;
    const f = [], y = this.pattern.length;
    for (; (g = r.indexOf(this.pattern, h)) > -1; )
      h = g + y, f.push([g, h - 1]);
    const d = !!f.length;
    return {
      isMatch: d,
      score: d ? 0 : 1,
      indices: f
    };
  }
}
const gr = [
  Rm,
  Mh,
  jm,
  Cm,
  Um,
  Nm,
  Dm,
  Eh
], $d = gr.length, Bm = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, qm = "|";
function xm(c, r = {}) {
  return c.split(qm).map((h) => {
    let g = h.trim().split(Bm).filter((y) => y && !!y.trim()), f = [];
    for (let y = 0, d = g.length; y < d; y += 1) {
      const p = g[y];
      let s = !1, v = -1;
      for (; !s && ++v < $d; ) {
        const S = gr[v];
        let m = S.isMultiMatch(p);
        m && (f.push(new S(m, r)), s = !0);
      }
      if (!s)
        for (v = -1; ++v < $d; ) {
          const S = gr[v];
          let m = S.isSingleMatch(p);
          if (m) {
            f.push(new S(m, r));
            break;
          }
        }
    }
    return f;
  });
}
const Hm = /* @__PURE__ */ new Set([Eh.type, Mh.type]);
class Ym {
  constructor(r, {
    isCaseSensitive: h = rt.isCaseSensitive,
    includeMatches: g = rt.includeMatches,
    minMatchCharLength: f = rt.minMatchCharLength,
    ignoreLocation: y = rt.ignoreLocation,
    findAllMatches: d = rt.findAllMatches,
    location: p = rt.location,
    threshold: s = rt.threshold,
    distance: v = rt.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: h,
      includeMatches: g,
      minMatchCharLength: f,
      findAllMatches: d,
      ignoreLocation: y,
      location: p,
      threshold: s,
      distance: v
    }, this.pattern = h ? r : r.toLowerCase(), this.query = xm(this.pattern, this.options);
  }
  static condition(r, h) {
    return h.useExtendedSearch;
  }
  searchIn(r) {
    const h = this.query;
    if (!h)
      return {
        isMatch: !1,
        score: 1
      };
    const { includeMatches: g, isCaseSensitive: f } = this.options;
    r = f ? r : r.toLowerCase();
    let y = 0, d = [], p = 0;
    for (let s = 0, v = h.length; s < v; s += 1) {
      const S = h[s];
      d.length = 0, y = 0;
      for (let m = 0, O = S.length; m < O; m += 1) {
        const R = S[m], { isMatch: M, indices: j, score: C } = R.search(r);
        if (M) {
          if (y += 1, p += C, g) {
            const L = R.constructor.type;
            Hm.has(L) ? d = [...d, ...j] : d.push(j);
          }
        } else {
          p = 0, y = 0, d.length = 0;
          break;
        }
      }
      if (y) {
        let m = {
          isMatch: !0,
          score: p / y
        };
        return g && (m.indices = d), m;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const pr = [];
function Km(...c) {
  pr.push(...c);
}
function _r(c, r) {
  for (let h = 0, g = pr.length; h < g; h += 1) {
    let f = pr[h];
    if (f.condition(c, r))
      return new f(c, r);
  }
  return new Oh(c, r);
}
const Yi = {
  AND: "$and",
  OR: "$or"
}, Sr = {
  PATH: "$path",
  PATTERN: "$val"
}, br = (c) => !!(c[Yi.AND] || c[Yi.OR]), Lm = (c) => !!c[Sr.PATH], Gm = (c) => !Tl(c) && ph(c) && !br(c), Wd = (c) => ({
  [Yi.AND]: Object.keys(c).map((r) => ({
    [r]: c[r]
  }))
});
function Ah(c, r, { auto: h = !0 } = {}) {
  const g = (f) => {
    let y = Object.keys(f);
    const d = Lm(f);
    if (!d && y.length > 1 && !br(f))
      return g(Wd(f));
    if (Gm(f)) {
      const s = d ? f[Sr.PATH] : y[0], v = d ? f[Sr.PATTERN] : f[s];
      if (!ul(v))
        throw new Error(vm(s));
      const S = {
        keyId: mr(s),
        pattern: v
      };
      return h && (S.searcher = _r(v, r)), S;
    }
    let p = {
      children: [],
      operator: y[0]
    };
    return y.forEach((s) => {
      const v = f[s];
      Tl(v) && v.forEach((S) => {
        p.children.push(g(S));
      });
    }), p;
  };
  return br(c) || (c = Wd(c)), g(c);
}
function Qm(c, { ignoreFieldNorm: r = rt.ignoreFieldNorm }) {
  c.forEach((h) => {
    let g = 1;
    h.matches.forEach(({ key: f, norm: y, score: d }) => {
      const p = f ? f.weight : null;
      g *= Math.pow(
        d === 0 && p ? Number.EPSILON : d,
        (p || 1) * (r ? 1 : y)
      );
    }), h.score = g;
  });
}
function Vm(c, r) {
  const h = c.matches;
  r.matches = [], Be(h) && h.forEach((g) => {
    if (!Be(g.indices) || !g.indices.length)
      return;
    const { indices: f, value: y } = g;
    let d = {
      indices: f,
      value: y
    };
    g.key && (d.key = g.key.src), g.idx > -1 && (d.refIndex = g.idx), r.matches.push(d);
  });
}
function Xm(c, r) {
  r.score = c.score;
}
function Zm(c, r, {
  includeMatches: h = rt.includeMatches,
  includeScore: g = rt.includeScore
} = {}) {
  const f = [];
  return h && f.push(Vm), g && f.push(Xm), c.map((y) => {
    const { idx: d } = y, p = {
      item: r[d],
      refIndex: d
    };
    return f.length && f.forEach((s) => {
      s(y, p);
    }), p;
  });
}
class Oa {
  constructor(r, h = {}, g) {
    this.options = { ...rt, ...h }, this.options.useExtendedSearch, this._keyStore = new mm(this.options.keys), this.setCollection(r, g);
  }
  setCollection(r, h) {
    if (this._docs = r, h && !(h instanceof Mr))
      throw new Error(sm);
    this._myIndex = h || bh(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(r) {
    Be(r) && (this._docs.push(r), this._myIndex.add(r));
  }
  remove(r = () => !1) {
    const h = [];
    for (let g = 0, f = this._docs.length; g < f; g += 1) {
      const y = this._docs[g];
      r(y, g) && (this.removeAt(g), g -= 1, f -= 1, h.push(y));
    }
    return h;
  }
  removeAt(r) {
    this._docs.splice(r, 1), this._myIndex.removeAt(r);
  }
  getIndex() {
    return this._myIndex;
  }
  search(r, { limit: h = -1 } = {}) {
    const {
      includeMatches: g,
      includeScore: f,
      shouldSort: y,
      sortFn: d,
      ignoreFieldNorm: p
    } = this.options;
    let s = ul(r) ? ul(this._docs[0]) ? this._searchStringList(r) : this._searchObjectList(r) : this._searchLogical(r);
    return Qm(s, { ignoreFieldNorm: p }), y && s.sort(d), gh(h) && h > -1 && (s = s.slice(0, h)), Zm(s, this._docs, {
      includeMatches: g,
      includeScore: f
    });
  }
  _searchStringList(r) {
    const h = _r(r, this.options), { records: g } = this._myIndex, f = [];
    return g.forEach(({ v: y, i: d, n: p }) => {
      if (!Be(y))
        return;
      const { isMatch: s, score: v, indices: S } = h.searchIn(y);
      s && f.push({
        item: y,
        idx: d,
        matches: [{ score: v, value: y, norm: p, indices: S }]
      });
    }), f;
  }
  _searchLogical(r) {
    const h = Ah(r, this.options), g = (p, s, v) => {
      if (!p.children) {
        const { keyId: m, searcher: O } = p, R = this._findMatches({
          key: this._keyStore.get(m),
          value: this._myIndex.getValueForItemAtKeyId(s, m),
          searcher: O
        });
        return R && R.length ? [
          {
            idx: v,
            item: s,
            matches: R
          }
        ] : [];
      }
      const S = [];
      for (let m = 0, O = p.children.length; m < O; m += 1) {
        const R = p.children[m], M = g(R, s, v);
        if (M.length)
          S.push(...M);
        else if (p.operator === Yi.AND)
          return [];
      }
      return S;
    }, f = this._myIndex.records, y = {}, d = [];
    return f.forEach(({ $: p, i: s }) => {
      if (Be(p)) {
        let v = g(h, p, s);
        v.length && (y[s] || (y[s] = { idx: s, item: p, matches: [] }, d.push(y[s])), v.forEach(({ matches: S }) => {
          y[s].matches.push(...S);
        }));
      }
    }), d;
  }
  _searchObjectList(r) {
    const h = _r(r, this.options), { keys: g, records: f } = this._myIndex, y = [];
    return f.forEach(({ $: d, i: p }) => {
      if (!Be(d))
        return;
      let s = [];
      g.forEach((v, S) => {
        s.push(
          ...this._findMatches({
            key: v,
            value: d[S],
            searcher: h
          })
        );
      }), s.length && y.push({
        idx: p,
        item: d,
        matches: s
      });
    }), y;
  }
  _findMatches({ key: r, value: h, searcher: g }) {
    if (!Be(h))
      return [];
    let f = [];
    if (Tl(h))
      h.forEach(({ v: y, i: d, n: p }) => {
        if (!Be(y))
          return;
        const { isMatch: s, score: v, indices: S } = g.searchIn(y);
        s && f.push({
          score: v,
          key: r,
          value: y,
          idx: d,
          norm: p,
          indices: S
        });
      });
    else {
      const { v: y, n: d } = h, { isMatch: p, score: s, indices: v } = g.searchIn(y);
      p && f.push({ score: s, key: r, value: y, norm: d, indices: v });
    }
    return f;
  }
}
Oa.version = "6.6.2";
Oa.createIndex = bh;
Oa.parseIndex = Mm;
Oa.config = rt;
Oa.parseQuery = Ah;
Km(Ym);
const wm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oa
}, Symbol.toStringTag, { value: "Module" })), Jm = /* @__PURE__ */ vh(wm);
var Fd;
function $m() {
  return Fd || (Fd = 1, (function(c) {
    var r = Fe && Fe.__createBinding || (Object.create ? (function(R, M, j, C) {
      C === void 0 && (C = j), Object.defineProperty(R, C, { enumerable: !0, get: function() {
        return M[j];
      } });
    }) : (function(R, M, j, C) {
      C === void 0 && (C = j), R[C] = M[j];
    })), h = Fe && Fe.__setModuleDefault || (Object.create ? (function(R, M) {
      Object.defineProperty(R, "default", { enumerable: !0, value: M });
    }) : function(R, M) {
      R.default = M;
    }), g = Fe && Fe.__importStar || function(R) {
      if (R && R.__esModule) return R;
      var M = {};
      if (R != null) for (var j in R) j !== "default" && Object.prototype.hasOwnProperty.call(R, j) && r(M, R, j);
      return h(M, R), M;
    }, f = Fe && Fe.__importDefault || function(R) {
      return R && R.__esModule ? R : { default: R };
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), c.useDeepMatches = c.useMatches = c.NO_GROUP = void 0;
    var y = g(Ft()), d = nn(), p = Un(), s = f(Jm);
    c.NO_GROUP = {
      name: "none",
      priority: p.Priority.NORMAL
    };
    var v = {
      keys: [
        {
          name: "name",
          weight: 0.5
        },
        {
          name: "keywords",
          getFn: function(R) {
            var M;
            return ((M = R.keywords) !== null && M !== void 0 ? M : "").split(",");
          },
          weight: 0.5
        },
        "subtitle"
      ],
      ignoreLocation: !0,
      includeScore: !0,
      includeMatches: !0,
      threshold: 0.2,
      minMatchCharLength: 1
    };
    function S(R, M) {
      return M.priority - R.priority;
    }
    function m() {
      var R = (0, d.useKBar)(function(F) {
        return {
          search: F.searchQuery,
          actions: F.actions,
          rootActionId: F.currentRootActionId
        };
      }), M = R.search, j = R.actions, C = R.rootActionId, L = y.useMemo(function() {
        return Object.keys(j).reduce(function(F, D) {
          var A = j[D];
          if (!A.parent && !C && F.push(A), A.id === C)
            for (var W = 0; W < A.children.length; W++)
              F.push(A.children[W]);
          return F;
        }, []).sort(S);
      }, [j, C]), q = y.useCallback(function(F) {
        for (var D = [], A = 0; A < F.length; A++)
          D.push(F[A]);
        return (function W(w, Q) {
          Q === void 0 && (Q = D);
          for (var I = 0; I < w.length; I++)
            if (w[I].children.length > 0) {
              for (var Y = w[I].children, N = 0; N < Y.length; N++)
                Q.push(Y[N]);
              W(w[I].children, Q);
            }
          return Q;
        })(F);
      }, []), z = !M, H = y.useMemo(function() {
        return z ? L : q(L);
      }, [q, L, z]), X = y.useMemo(function() {
        return new s.default(H, v);
      }, [H]), k = O(H, M, X), P = y.useMemo(function() {
        for (var F, D, A = {}, W = [], w = [], Q = 0; Q < k.length; Q++) {
          var I = k[Q], Y = I.action, N = I.score || p.Priority.NORMAL, V = {
            name: typeof Y.section == "string" ? Y.section : ((F = Y.section) === null || F === void 0 ? void 0 : F.name) || c.NO_GROUP.name,
            priority: typeof Y.section == "string" ? N : ((D = Y.section) === null || D === void 0 ? void 0 : D.priority) || 0 + N
          };
          A[V.name] || (A[V.name] = [], W.push(V)), A[V.name].push({
            priority: Y.priority + N,
            action: Y
          });
        }
        w = W.sort(S).map(function(b) {
          return {
            name: b.name,
            actions: A[b.name].sort(S).map(function(J) {
              return J.action;
            })
          };
        });
        for (var ut = [], Q = 0; Q < w.length; Q++) {
          var ct = w[Q];
          ct.name !== c.NO_GROUP.name && ut.push(ct.name);
          for (var Ot = 0; Ot < ct.actions.length; Ot++)
            ut.push(ct.actions[Ot]);
        }
        return ut;
      }, [k]), tt = y.useMemo(function() {
        return C;
      }, [P]);
      return y.useMemo(function() {
        return {
          results: P,
          rootActionId: tt
        };
      }, [tt, P]);
    }
    c.useMatches = m;
    function O(R, M, j) {
      var C = y.useMemo(function() {
        return {
          filtered: R,
          search: M
        };
      }, [R, M]), L = (0, p.useThrottledValue)(C), q = L.filtered, z = L.search;
      return y.useMemo(function() {
        if (z.trim() === "")
          return q.map(function(k) {
            return { score: 0, action: k };
          });
        var H = [], X = j.search(z);
        return H = X.map(function(k) {
          var P = k.item, tt = k.score;
          return {
            score: 1 / ((tt ?? 0) + 1),
            action: P
          };
        }), H;
      }, [q, z, j]);
    }
    c.useDeepMatches = m;
  })(Fe)), Fe;
}
var ke = {}, sr, kd;
function Wm() {
  if (kd) return sr;
  kd = 1;
  var c = Object.create, r = Object.defineProperty, h = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, f = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, d = (j, C) => {
    for (var L in C)
      r(j, L, { get: C[L], enumerable: !0 });
  }, p = (j, C, L, q) => {
    if (C && typeof C == "object" || typeof C == "function")
      for (let z of g(C))
        !y.call(j, z) && z !== L && r(j, z, { get: () => C[z], enumerable: !(q = h(C, z)) || q.enumerable });
    return j;
  }, s = (j, C, L) => (L = j != null ? c(f(j)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !j || !j.__esModule ? r(L, "default", { value: j, enumerable: !0 }) : L,
    j
  )), v = (j) => p(r({}, "__esModule", { value: !0 }), j), S = {};
  d(S, {
    composeRefs: () => R,
    useComposedRefs: () => M
  }), sr = v(S);
  var m = s(Ft());
  function O(j, C) {
    if (typeof j == "function")
      return j(C);
    j != null && (j.current = C);
  }
  function R(...j) {
    return (C) => {
      let L = !1;
      const q = j.map((z) => {
        const H = O(z, C);
        return !L && typeof H == "function" && (L = !0), H;
      });
      if (L)
        return () => {
          for (let z = 0; z < q.length; z++) {
            const H = q[z];
            typeof H == "function" ? H() : O(j[z], null);
          }
        };
    };
  }
  function M(...j) {
    return m.useCallback(R(...j), j);
  }
  return sr;
}
var vr, Id;
function Fm() {
  if (Id) return vr;
  Id = 1;
  var c = Object.create, r = Object.defineProperty, h = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, f = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, d = (A, W) => {
    for (var w in W)
      r(A, w, { get: W[w], enumerable: !0 });
  }, p = (A, W, w, Q) => {
    if (W && typeof W == "object" || typeof W == "function")
      for (let I of g(W))
        !y.call(A, I) && I !== w && r(A, I, { get: () => W[I], enumerable: !(Q = h(W, I)) || Q.enumerable });
    return A;
  }, s = (A, W, w) => (w = A != null ? c(f(A)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !A || !A.__esModule ? r(w, "default", { value: A, enumerable: !0 }) : w,
    A
  )), v = (A) => p(r({}, "__esModule", { value: !0 }), A), S = {};
  d(S, {
    Root: () => z,
    Slot: () => z,
    Slottable: () => P,
    createSlot: () => q,
    createSlottable: () => k
  }), vr = v(S);
  var m = s(Ft()), O = /* @__PURE__ */ Wm(), R = Li(), M = Symbol.for("react.lazy"), j = m[" use ".trim().toString()];
  function C(A) {
    return typeof A == "object" && A !== null && "then" in A;
  }
  function L(A) {
    return A != null && typeof A == "object" && "$$typeof" in A && A.$$typeof === M && "_payload" in A && C(A._payload);
  }
  // @__NO_SIDE_EFFECTS__
  function q(A) {
    const W = /* @__PURE__ */ H(A), w = m.forwardRef((Q, I) => {
      let { children: Y, ...N } = Q;
      L(Y) && typeof j == "function" && (Y = j(Y._payload));
      const V = m.Children.toArray(Y), ut = V.find(tt);
      if (ut) {
        const ct = ut.props.children, Ot = V.map((b) => b === ut ? m.Children.count(ct) > 1 ? m.Children.only(null) : m.isValidElement(ct) ? ct.props.children : null : b);
        return /* @__PURE__ */ (0, R.jsx)(W, { ...N, ref: I, children: m.isValidElement(ct) ? m.cloneElement(ct, void 0, Ot) : null });
      }
      return /* @__PURE__ */ (0, R.jsx)(W, { ...N, ref: I, children: Y });
    });
    return w.displayName = `${A}.Slot`, w;
  }
  var z = /* @__PURE__ */ q("Slot");
  // @__NO_SIDE_EFFECTS__
  function H(A) {
    const W = m.forwardRef((w, Q) => {
      let { children: I, ...Y } = w;
      if (L(I) && typeof j == "function" && (I = j(I._payload)), m.isValidElement(I)) {
        const N = D(I), V = F(Y, I.props);
        return I.type !== m.Fragment && (V.ref = Q ? (0, O.composeRefs)(Q, N) : N), m.cloneElement(I, V);
      }
      return m.Children.count(I) > 1 ? m.Children.only(null) : null;
    });
    return W.displayName = `${A}.SlotClone`, W;
  }
  var X = Symbol("radix.slottable");
  // @__NO_SIDE_EFFECTS__
  function k(A) {
    const W = ({ children: w }) => /* @__PURE__ */ (0, R.jsx)(R.Fragment, { children: w });
    return W.displayName = `${A}.Slottable`, W.__radixId = X, W;
  }
  var P = /* @__PURE__ */ k("Slottable");
  function tt(A) {
    return m.isValidElement(A) && typeof A.type == "function" && "__radixId" in A.type && A.type.__radixId === X;
  }
  function F(A, W) {
    const w = { ...W };
    for (const Q in W) {
      const I = A[Q], Y = W[Q];
      /^on[A-Z]/.test(Q) ? I && Y ? w[Q] = (...V) => {
        const ut = Y(...V);
        return I(...V), ut;
      } : I && (w[Q] = I) : Q === "style" ? w[Q] = { ...I, ...Y } : Q === "className" && (w[Q] = [I, Y].filter(Boolean).join(" "));
    }
    return { ...A, ...w };
  }
  function D(A) {
    var Q, I;
    let W = (Q = Object.getOwnPropertyDescriptor(A.props, "ref")) == null ? void 0 : Q.get, w = W && "isReactWarning" in W && W.isReactWarning;
    return w ? A.ref : (W = (I = Object.getOwnPropertyDescriptor(A, "ref")) == null ? void 0 : I.get, w = W && "isReactWarning" in W && W.isReactWarning, w ? A.props.ref : A.props.ref || A.ref);
  }
  return vr;
}
var dr, Pd;
function km() {
  if (Pd) return dr;
  Pd = 1;
  var c = Object.create, r = Object.defineProperty, h = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, f = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, d = (z, H) => {
    for (var X in H)
      r(z, X, { get: H[X], enumerable: !0 });
  }, p = (z, H, X, k) => {
    if (H && typeof H == "object" || typeof H == "function")
      for (let P of g(H))
        !y.call(z, P) && P !== X && r(z, P, { get: () => H[P], enumerable: !(k = h(H, P)) || k.enumerable });
    return z;
  }, s = (z, H, X) => (X = z != null ? c(f(z)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !z || !z.__esModule ? r(X, "default", { value: z, enumerable: !0 }) : X,
    z
  )), v = (z) => p(r({}, "__esModule", { value: !0 }), z), S = {};
  d(S, {
    Primitive: () => C,
    Root: () => q,
    dispatchDiscreteCustomEvent: () => L
  }), dr = v(S);
  var m = s(Ft()), O = s(Or()), R = /* @__PURE__ */ Fm(), M = Li(), j = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
  ], C = j.reduce((z, H) => {
    const X = (0, R.createSlot)(`Primitive.${H}`), k = m.forwardRef((P, tt) => {
      const { asChild: F, ...D } = P, A = F ? X : H;
      return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, M.jsx)(A, { ...D, ref: tt });
    });
    return k.displayName = `Primitive.${H}`, { ...z, [H]: k };
  }, {});
  function L(z, H) {
    z && O.flushSync(() => z.dispatchEvent(H));
  }
  var q = C;
  return dr;
}
var hr, th;
function Im() {
  if (th) return hr;
  th = 1;
  var c = Object.create, r = Object.defineProperty, h = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, f = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, d = (R, M) => {
    for (var j in M)
      r(R, j, { get: M[j], enumerable: !0 });
  }, p = (R, M, j, C) => {
    if (M && typeof M == "object" || typeof M == "function")
      for (let L of g(M))
        !y.call(R, L) && L !== j && r(R, L, { get: () => M[L], enumerable: !(C = h(M, L)) || C.enumerable });
    return R;
  }, s = (R, M, j) => (j = R != null ? c(f(R)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !R || !R.__esModule ? r(j, "default", { value: R, enumerable: !0 }) : j,
    R
  )), v = (R) => p(r({}, "__esModule", { value: !0 }), R), S = {};
  d(S, {
    useLayoutEffect: () => O
  }), hr = v(S);
  var m = s(Ft()), O = globalThis != null && globalThis.document ? m.useLayoutEffect : () => {
  };
  return hr;
}
var yr, eh;
function Pm() {
  if (eh) return yr;
  eh = 1;
  var c = Object.create, r = Object.defineProperty, h = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, f = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, d = (z, H) => {
    for (var X in H)
      r(z, X, { get: H[X], enumerable: !0 });
  }, p = (z, H, X, k) => {
    if (H && typeof H == "object" || typeof H == "function")
      for (let P of g(H))
        !y.call(z, P) && P !== X && r(z, P, { get: () => H[P], enumerable: !(k = h(H, P)) || k.enumerable });
    return z;
  }, s = (z, H, X) => (X = z != null ? c(f(z)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !z || !z.__esModule ? r(X, "default", { value: z, enumerable: !0 }) : X,
    z
  )), v = (z) => p(r({}, "__esModule", { value: !0 }), z), S = {};
  d(S, {
    Portal: () => L,
    Root: () => q
  }), yr = v(S);
  var m = s(Ft()), O = s(Or()), R = /* @__PURE__ */ km(), M = /* @__PURE__ */ Im(), j = Li(), C = "Portal", L = m.forwardRef((z, H) => {
    var D;
    const { container: X, ...k } = z, [P, tt] = m.useState(!1);
    (0, M.useLayoutEffect)(() => tt(!0), []);
    const F = X || P && ((D = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : D.body);
    return F ? O.default.createPortal(/* @__PURE__ */ (0, j.jsx)(R.Primitive.div, { ...k, ref: H }), F) : null;
  });
  L.displayName = C;
  var q = L;
  return yr;
}
var lh;
function tg() {
  if (lh) return ke;
  lh = 1;
  var c = ke && ke.__createBinding || (Object.create ? (function(s, v, S, m) {
    m === void 0 && (m = S), Object.defineProperty(s, m, { enumerable: !0, get: function() {
      return v[S];
    } });
  }) : (function(s, v, S, m) {
    m === void 0 && (m = S), s[m] = v[S];
  })), r = ke && ke.__setModuleDefault || (Object.create ? (function(s, v) {
    Object.defineProperty(s, "default", { enumerable: !0, value: v });
  }) : function(s, v) {
    s.default = v;
  }), h = ke && ke.__importStar || function(s) {
    if (s && s.__esModule) return s;
    var v = {};
    if (s != null) for (var S in s) S !== "default" && Object.prototype.hasOwnProperty.call(s, S) && c(v, s, S);
    return r(v, s), v;
  };
  Object.defineProperty(ke, "__esModule", { value: !0 }), ke.KBarPortal = void 0;
  var g = /* @__PURE__ */ Pm(), f = h(Ft()), y = ba(), d = nn();
  function p(s) {
    var v = s.children, S = s.container, m = (0, d.useKBar)(function(O) {
      return {
        showing: O.visualState !== y.VisualState.hidden
      };
    }).showing;
    return m ? f.createElement(g.Portal, { container: S }, v) : null;
  }
  return ke.KBarPortal = p, ke;
}
var se = {}, nh;
function eg() {
  if (nh) return se;
  nh = 1;
  var c = se && se.__assign || function() {
    return c = Object.assign || function(s) {
      for (var v, S = 1, m = arguments.length; S < m; S++) {
        v = arguments[S];
        for (var O in v) Object.prototype.hasOwnProperty.call(v, O) && (s[O] = v[O]);
      }
      return s;
    }, c.apply(this, arguments);
  }, r = se && se.__createBinding || (Object.create ? (function(s, v, S, m) {
    m === void 0 && (m = S), Object.defineProperty(s, m, { enumerable: !0, get: function() {
      return v[S];
    } });
  }) : (function(s, v, S, m) {
    m === void 0 && (m = S), s[m] = v[S];
  })), h = se && se.__setModuleDefault || (Object.create ? (function(s, v) {
    Object.defineProperty(s, "default", { enumerable: !0, value: v });
  }) : function(s, v) {
    s.default = v;
  }), g = se && se.__importStar || function(s) {
    if (s && s.__esModule) return s;
    var v = {};
    if (s != null) for (var S in s) S !== "default" && Object.prototype.hasOwnProperty.call(s, S) && r(v, s, S);
    return h(v, s), v;
  }, f = se && se.__rest || function(s, v) {
    var S = {};
    for (var m in s) Object.prototype.hasOwnProperty.call(s, m) && v.indexOf(m) < 0 && (S[m] = s[m]);
    if (s != null && typeof Object.getOwnPropertySymbols == "function")
      for (var O = 0, m = Object.getOwnPropertySymbols(s); O < m.length; O++)
        v.indexOf(m[O]) < 0 && Object.prototype.propertyIsEnumerable.call(s, m[O]) && (S[m[O]] = s[m[O]]);
    return S;
  };
  Object.defineProperty(se, "__esModule", { value: !0 }), se.KBarPositioner = void 0;
  var y = g(Ft()), d = {
    position: "fixed",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    inset: "0px",
    padding: "14vh 16px 16px"
  };
  function p(s) {
    return s ? c(c({}, d), s) : d;
  }
  return se.KBarPositioner = y.forwardRef(function(s, v) {
    var S = s.style, m = s.children, O = f(s, ["style", "children"]);
    return y.createElement("div", c({ ref: v, style: p(S) }, O), m);
  }), se;
}
var Ce = {}, ah;
function zh() {
  return ah || (ah = 1, (function(c) {
    var r = Ce && Ce.__assign || function() {
      return r = Object.assign || function(m) {
        for (var O, R = 1, M = arguments.length; R < M; R++) {
          O = arguments[R];
          for (var j in O) Object.prototype.hasOwnProperty.call(O, j) && (m[j] = O[j]);
        }
        return m;
      }, r.apply(this, arguments);
    }, h = Ce && Ce.__createBinding || (Object.create ? (function(m, O, R, M) {
      M === void 0 && (M = R), Object.defineProperty(m, M, { enumerable: !0, get: function() {
        return O[R];
      } });
    }) : (function(m, O, R, M) {
      M === void 0 && (M = R), m[M] = O[R];
    })), g = Ce && Ce.__setModuleDefault || (Object.create ? (function(m, O) {
      Object.defineProperty(m, "default", { enumerable: !0, value: O });
    }) : function(m, O) {
      m.default = O;
    }), f = Ce && Ce.__importStar || function(m) {
      if (m && m.__esModule) return m;
      var O = {};
      if (m != null) for (var R in m) R !== "default" && Object.prototype.hasOwnProperty.call(m, R) && h(O, m, R);
      return g(O, m), O;
    }, y = Ce && Ce.__rest || function(m, O) {
      var R = {};
      for (var M in m) Object.prototype.hasOwnProperty.call(m, M) && O.indexOf(M) < 0 && (R[M] = m[M]);
      if (m != null && typeof Object.getOwnPropertySymbols == "function")
        for (var j = 0, M = Object.getOwnPropertySymbols(m); j < M.length; j++)
          O.indexOf(M[j]) < 0 && Object.prototype.propertyIsEnumerable.call(m, M[j]) && (R[M[j]] = m[M[j]]);
      return R;
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), c.KBarSearch = c.getListboxItemId = c.KBAR_LISTBOX = void 0;
    var d = f(Ft()), p = ba(), s = nn();
    c.KBAR_LISTBOX = "kbar-listbox";
    var v = function(m) {
      return "kbar-listbox-item-" + m;
    };
    c.getListboxItemId = v;
    function S(m) {
      var O = (0, s.useKBar)(function(D) {
        return {
          search: D.searchQuery,
          currentRootActionId: D.currentRootActionId,
          actions: D.actions,
          activeIndex: D.activeIndex,
          showing: D.visualState === p.VisualState.showing
        };
      }), R = O.query, M = O.search, j = O.actions, C = O.currentRootActionId, L = O.activeIndex, q = O.showing, z = O.options, H = d.useState(M), X = H[0], k = H[1];
      d.useEffect(function() {
        R.setSearch(X);
      }, [X, R]);
      var P = m.defaultPlaceholder, tt = y(m, ["defaultPlaceholder"]);
      d.useEffect(function() {
        return R.setSearch(""), R.getInput().focus(), function() {
          return R.setSearch("");
        };
      }, [C, R]);
      var F = d.useMemo(function() {
        var D = P ?? "Type a command or search…";
        return C && j[C] ? j[C].name : D;
      }, [j, C, P]);
      return d.createElement("input", r({}, tt, { ref: R.inputRefSetter, autoFocus: !0, autoComplete: "off", role: "combobox", spellCheck: "false", "aria-expanded": q, "aria-controls": c.KBAR_LISTBOX, "aria-activedescendant": (0, c.getListboxItemId)(L), value: X, placeholder: F, onChange: function(D) {
        var A, W, w;
        (A = m.onChange) === null || A === void 0 || A.call(m, D), k(D.target.value), (w = (W = z == null ? void 0 : z.callbacks) === null || W === void 0 ? void 0 : W.onQueryChange) === null || w === void 0 || w.call(W, D.target.value);
      }, onKeyDown: function(D) {
        var A;
        if ((A = m.onKeyDown) === null || A === void 0 || A.call(m, D), C && !M && D.key === "Backspace") {
          var W = j[C].parent;
          R.setCurrentRootAction(W);
        }
      } }));
    }
    c.KBarSearch = S;
  })(Ce)), Ce;
}
var Ne = {};
function Nn() {
  return Nn = Object.assign || function(c) {
    for (var r = 1; r < arguments.length; r++) {
      var h = arguments[r];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (c[g] = h[g]);
    }
    return c;
  }, Nn.apply(this, arguments);
}
function lg(c, r) {
  if (c == null) return {};
  var h = {}, g = Object.keys(c), f, y;
  for (y = 0; y < g.length; y++)
    f = g[y], !(r.indexOf(f) >= 0) && (h[f] = c[f]);
  return h;
}
var ng = ["bottom", "height", "left", "right", "top", "width"], ag = function(r, h) {
  return r === void 0 && (r = {}), h === void 0 && (h = {}), ng.some(function(g) {
    return r[g] !== h[g];
  });
}, en = /* @__PURE__ */ new Map(), Th, ug = function c() {
  var r = [];
  en.forEach(function(h, g) {
    var f = g.getBoundingClientRect();
    ag(f, h.rect) && (h.rect = f, r.push(h));
  }), r.forEach(function(h) {
    h.callbacks.forEach(function(g) {
      return g(h.rect);
    });
  }), Th = window.requestAnimationFrame(c);
};
function ig(c, r) {
  return {
    observe: function() {
      var g = en.size === 0;
      en.has(c) ? en.get(c).callbacks.push(r) : en.set(c, {
        rect: void 0,
        hasRectChanged: !1,
        callbacks: [r]
      }), g && ug();
    },
    unobserve: function() {
      var g = en.get(c);
      if (g) {
        var f = g.callbacks.indexOf(r);
        f >= 0 && g.callbacks.splice(f, 1), g.callbacks.length || en.delete(c), en.size || cancelAnimationFrame(Th);
      }
    }
  };
}
var Ki = typeof window < "u" ? Gt.useLayoutEffect : Gt.useEffect;
function cg(c, r) {
  r === void 0 && (r = {
    width: 0,
    height: 0
  });
  var h = Gt.useState(c.current), g = h[0], f = h[1], y = Gt.useReducer(fg, r), d = y[0], p = y[1], s = Gt.useRef(!1);
  return Ki(function() {
    c.current !== g && f(c.current);
  }), Ki(function() {
    if (g && !s.current) {
      s.current = !0;
      var v = g.getBoundingClientRect();
      p({
        rect: v
      });
    }
  }, [g]), Gt.useEffect(function() {
    if (g) {
      var v = ig(g, function(S) {
        p({
          rect: S
        });
      });
      return v.observe(), function() {
        v.unobserve();
      };
    }
  }, [g]), d;
}
function fg(c, r) {
  var h = r.rect;
  return c.height !== h.height || c.width !== h.width ? h : c;
}
var rg = function() {
  return 50;
}, og = function(r) {
  return r;
}, sg = function(r, h) {
  var g = h ? "offsetWidth" : "offsetHeight";
  return r[g];
}, Rh = function(r) {
  for (var h = Math.max(r.start - r.overscan, 0), g = Math.min(r.end + r.overscan, r.size - 1), f = [], y = h; y <= g; y++)
    f.push(y);
  return f;
};
function vg(c) {
  var r, h = c.size, g = h === void 0 ? 0 : h, f = c.estimateSize, y = f === void 0 ? rg : f, d = c.overscan, p = d === void 0 ? 1 : d, s = c.paddingStart, v = s === void 0 ? 0 : s, S = c.paddingEnd, m = S === void 0 ? 0 : S, O = c.parentRef, R = c.horizontal, M = c.scrollToFn, j = c.useObserver, C = c.initialRect, L = c.onScrollElement, q = c.scrollOffsetFn, z = c.keyExtractor, H = z === void 0 ? og : z, X = c.measureSize, k = X === void 0 ? sg : X, P = c.rangeExtractor, tt = P === void 0 ? Rh : P, F = R ? "width" : "height", D = R ? "scrollLeft" : "scrollTop", A = Gt.useRef({
    scrollOffset: 0,
    measurements: []
  }), W = Gt.useState(0), w = W[0], Q = W[1];
  A.current.scrollOffset = w;
  var I = j || cg, Y = I(O, C), N = Y[F];
  A.current.outerSize = N;
  var V = Gt.useCallback(function(Nt) {
    O.current && (O.current[D] = Nt);
  }, [O, D]), ut = M || V;
  M = Gt.useCallback(function(Nt) {
    ut(Nt, V);
  }, [V, ut]);
  var ct = Gt.useState({}), Ot = ct[0], b = ct[1], J = Gt.useCallback(function() {
    return b({});
  }, []), et = Gt.useRef([]), lt = Gt.useMemo(function() {
    var Nt = et.current.length > 0 ? Math.min.apply(Math, et.current) : 0;
    et.current = [];
    for (var Qt = A.current.measurements.slice(0, Nt), Rt = Nt; Rt < g; Rt++) {
      var ce = H(Rt), Zt = Ot[ce], we = Qt[Rt - 1] ? Qt[Rt - 1].end : v, Ht = typeof Zt == "number" ? Zt : y(Rt), qe = we + Ht;
      Qt[Rt] = {
        index: Rt,
        start: we,
        size: Ht,
        end: qe,
        key: ce
      };
    }
    return Qt;
  }, [y, Ot, v, g, H]), ht = (((r = lt[g - 1]) == null ? void 0 : r.end) || v) + m;
  A.current.measurements = lt, A.current.totalSize = ht;
  var st = L ? L.current : O.current, bt = Gt.useRef(q);
  bt.current = q, Ki(function() {
    if (!st) {
      Q(0);
      return;
    }
    var Nt = function(Rt) {
      var ce = bt.current ? bt.current(Rt) : st[D];
      Q(ce);
    };
    return Nt(), st.addEventListener("scroll", Nt, {
      capture: !1,
      passive: !0
    }), function() {
      st.removeEventListener("scroll", Nt);
    };
  }, [st, D]);
  var It = hg(A.current), xt = It.start, Rl = It.end, Dl = Gt.useMemo(function() {
    return tt({
      start: xt,
      end: Rl,
      overscan: p,
      size: lt.length
    });
  }, [xt, Rl, p, lt.length, tt]), Bn = Gt.useRef(k);
  Bn.current = k;
  var pu = Gt.useMemo(function() {
    for (var Nt = [], Qt = function(we, Ht) {
      var qe = Dl[we], fn = lt[qe], tl = Nn(Nn({}, fn), {}, {
        measureRef: function(qn) {
          if (qn) {
            var xn = Bn.current(qn, R);
            if (xn !== tl.size) {
              var _u = A.current.scrollOffset;
              tl.start < _u && V(_u + (xn - tl.size)), et.current.push(qe), b(function(Qi) {
                var il;
                return Nn(Nn({}, Qi), {}, (il = {}, il[tl.key] = xn, il));
              });
            }
          }
        }
      });
      Nt.push(tl);
    }, Rt = 0, ce = Dl.length; Rt < ce; Rt++)
      Qt(Rt);
    return Nt;
  }, [Dl, V, R, lt]), Pe = Gt.useRef(!1);
  Ki(function() {
    Pe.current && b({}), Pe.current = !0;
  }, [y]);
  var un = Gt.useCallback(function(Nt, Qt) {
    var Rt = Qt === void 0 ? {} : Qt, ce = Rt.align, Zt = ce === void 0 ? "start" : ce, we = A.current, Ht = we.scrollOffset, qe = we.outerSize;
    Zt === "auto" && (Nt <= Ht ? Zt = "start" : Nt >= Ht + qe ? Zt = "end" : Zt = "start"), Zt === "start" ? M(Nt) : Zt === "end" ? M(Nt - qe) : Zt === "center" && M(Nt - qe / 2);
  }, [M]), cn = Gt.useCallback(function(Nt, Qt) {
    var Rt = Qt === void 0 ? {} : Qt, ce = Rt.align, Zt = ce === void 0 ? "auto" : ce, we = lg(Rt, ["align"]), Ht = A.current, qe = Ht.measurements, fn = Ht.scrollOffset, tl = Ht.outerSize, _e = qe[Math.max(0, Math.min(Nt, g - 1))];
    if (_e) {
      if (Zt === "auto")
        if (_e.end >= fn + tl)
          Zt = "end";
        else if (_e.start <= fn)
          Zt = "start";
        else
          return;
      var qn = Zt === "center" ? _e.start + _e.size / 2 : Zt === "end" ? _e.end : _e.start;
      un(qn, Nn({
        align: Zt
      }, we));
    }
  }, [un, g]), Gi = Gt.useCallback(function() {
    for (var Nt = arguments.length, Qt = new Array(Nt), Rt = 0; Rt < Nt; Rt++)
      Qt[Rt] = arguments[Rt];
    cn.apply(void 0, Qt), requestAnimationFrame(function() {
      cn.apply(void 0, Qt);
    });
  }, [cn]);
  return {
    virtualItems: pu,
    totalSize: ht,
    scrollToOffset: un,
    scrollToIndex: Gi,
    measure: J
  };
}
var dg = function(r, h, g, f) {
  for (; r <= h; ) {
    var y = (r + h) / 2 | 0, d = g(y);
    if (d < f)
      r = y + 1;
    else if (d > f)
      h = y - 1;
    else
      return y;
  }
  return r > 0 ? r - 1 : 0;
};
function hg(c) {
  for (var r = c.measurements, h = c.outerSize, g = c.scrollOffset, f = r.length - 1, y = function(v) {
    return r[v].start;
  }, d = dg(0, f, y, g), p = d; p < f && r[p].end < g + h; )
    p++;
  return {
    start: d,
    end: p
  };
}
const yg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defaultRangeExtractor: Rh,
  useVirtual: vg
}, Symbol.toStringTag, { value: "Module" })), mg = /* @__PURE__ */ vh(yg);
var uh;
function gg() {
  if (uh) return Ne;
  uh = 1;
  var c = Ne && Ne.__assign || function() {
    return c = Object.assign || function(m) {
      for (var O, R = 1, M = arguments.length; R < M; R++) {
        O = arguments[R];
        for (var j in O) Object.prototype.hasOwnProperty.call(O, j) && (m[j] = O[j]);
      }
      return m;
    }, c.apply(this, arguments);
  }, r = Ne && Ne.__createBinding || (Object.create ? (function(m, O, R, M) {
    M === void 0 && (M = R), Object.defineProperty(m, M, { enumerable: !0, get: function() {
      return O[R];
    } });
  }) : (function(m, O, R, M) {
    M === void 0 && (M = R), m[M] = O[R];
  })), h = Ne && Ne.__setModuleDefault || (Object.create ? (function(m, O) {
    Object.defineProperty(m, "default", { enumerable: !0, value: O });
  }) : function(m, O) {
    m.default = O;
  }), g = Ne && Ne.__importStar || function(m) {
    if (m && m.__esModule) return m;
    var O = {};
    if (m != null) for (var R in m) R !== "default" && Object.prototype.hasOwnProperty.call(m, R) && r(O, m, R);
    return h(O, m), O;
  };
  Object.defineProperty(Ne, "__esModule", { value: !0 }), Ne.KBarResults = void 0;
  var f = g(Ft()), y = mg, d = zh(), p = nn(), s = Un(), v = 0, S = function(m) {
    var O = f.useRef(null), R = f.useRef(null), M = f.useRef(m.items);
    M.current = m.items;
    var j = (0, y.useVirtual)({
      size: M.current.length,
      parentRef: R
    }), C = (0, p.useKBar)(function(F) {
      return {
        search: F.searchQuery,
        currentRootActionId: F.currentRootActionId,
        activeIndex: F.activeIndex
      };
    }), L = C.query, q = C.search, z = C.currentRootActionId, H = C.activeIndex, X = C.options;
    f.useEffect(function() {
      var F = function(D) {
        var A;
        D.isComposing || (D.key === "ArrowUp" || D.ctrlKey && D.key === "p" ? (D.preventDefault(), D.stopPropagation(), L.setActiveIndex(function(W) {
          var w = W > v ? W - 1 : W;
          if (typeof M.current[w] == "string") {
            if (w === 0)
              return W;
            w -= 1;
          }
          return w;
        })) : D.key === "ArrowDown" || D.ctrlKey && D.key === "n" ? (D.preventDefault(), D.stopPropagation(), L.setActiveIndex(function(W) {
          var w = W < M.current.length - 1 ? W + 1 : W;
          if (typeof M.current[w] == "string") {
            if (w === M.current.length - 1)
              return W;
            w += 1;
          }
          return w;
        })) : D.key === "Enter" && (D.preventDefault(), D.stopPropagation(), (A = O.current) === null || A === void 0 || A.click()));
      };
      return window.addEventListener("keydown", F, { capture: !0 }), function() {
        return window.removeEventListener("keydown", F, { capture: !0 });
      };
    }, [L]);
    var k = j.scrollToIndex;
    f.useEffect(function() {
      k(H, {
        // ensure that if the first item in the list is a group
        // name and we are focused on the second item, to not
        // scroll past that group, hiding it.
        align: H <= 1 ? "end" : "auto"
      });
    }, [H, k]), f.useEffect(function() {
      L.setActiveIndex(
        // avoid setting active index on a group
        typeof M.current[v] == "string" ? v + 1 : v
      );
    }, [q, z, L]), f.useEffect(function() {
      var F = H, D = M.current.length - 1;
      if (F > D && D >= 0) {
        var A = D;
        typeof M.current[A] == "string" && A > 0 && (A -= 1), L.setActiveIndex(A);
      } else if (F <= D && typeof M.current[F] == "string") {
        var A = F + 1;
        (A > D || typeof M.current[A] == "string") && (A = F - 1), A >= 0 && A <= D && typeof M.current[A] != "string" && L.setActiveIndex(A);
      }
    }, [m.items, H, L]);
    var P = f.useCallback(function(F) {
      var D, A;
      typeof F != "string" && (F.command ? (F.command.perform(F), L.toggle()) : (L.setSearch(""), L.setCurrentRootAction(F.id)), (A = (D = X.callbacks) === null || D === void 0 ? void 0 : D.onSelectAction) === null || A === void 0 || A.call(D, F));
    }, [L, X]), tt = (0, s.usePointerMovedSinceMount)();
    return f.createElement(
      "div",
      { ref: R, style: {
        maxHeight: m.maxHeight || 400,
        position: "relative",
        overflow: "auto"
      } },
      f.createElement("div", { role: "listbox", id: d.KBAR_LISTBOX, style: {
        height: j.totalSize + "px",
        width: "100%"
      } }, j.virtualItems.map(function(F) {
        var D = M.current[F.index], A = typeof D != "string" && {
          onPointerMove: function() {
            return tt && H !== F.index && L.setActiveIndex(F.index);
          },
          onPointerDown: function() {
            return L.setActiveIndex(F.index);
          },
          onClick: function() {
            return P(D);
          }
        }, W = F.index === H;
        return f.createElement("div", c({ ref: W ? O : null, id: (0, d.getListboxItemId)(F.index), role: "option", "aria-selected": W, key: F.index, style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: "translateY(" + F.start + "px)"
        } }, A), f.cloneElement(m.onRender({
          item: D,
          active: W
        }), {
          ref: F.measureRef
        }));
      }))
    );
  };
  return Ne.KBarResults = S, Ne;
}
var Ie = {}, ih;
function pg() {
  if (ih) return Ie;
  ih = 1;
  var c = Ie && Ie.__createBinding || (Object.create ? (function(d, p, s, v) {
    v === void 0 && (v = s), Object.defineProperty(d, v, { enumerable: !0, get: function() {
      return p[s];
    } });
  }) : (function(d, p, s, v) {
    v === void 0 && (v = s), d[v] = p[s];
  })), r = Ie && Ie.__setModuleDefault || (Object.create ? (function(d, p) {
    Object.defineProperty(d, "default", { enumerable: !0, value: p });
  }) : function(d, p) {
    d.default = p;
  }), h = Ie && Ie.__importStar || function(d) {
    if (d && d.__esModule) return d;
    var p = {};
    if (d != null) for (var s in d) s !== "default" && Object.prototype.hasOwnProperty.call(d, s) && c(p, d, s);
    return r(p, d), p;
  };
  Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.useRegisterActions = void 0;
  var g = h(Ft()), f = nn();
  function y(d, p) {
    p === void 0 && (p = []);
    var s = (0, f.useKBar)().query, v = g.useMemo(function() {
      return d;
    }, p);
    g.useEffect(function() {
      if (v.length) {
        var S = s.registerActions(v);
        return function() {
          S();
        };
      }
    }, [s, v]);
  }
  return Ie.useRegisterActions = y, Ie;
}
var Ue = {}, ch;
function _g() {
  if (ch) return Ue;
  ch = 1;
  var c = Ue && Ue.__assign || function() {
    return c = Object.assign || function(m) {
      for (var O, R = 1, M = arguments.length; R < M; R++) {
        O = arguments[R];
        for (var j in O) Object.prototype.hasOwnProperty.call(O, j) && (m[j] = O[j]);
      }
      return m;
    }, c.apply(this, arguments);
  }, r = Ue && Ue.__createBinding || (Object.create ? (function(m, O, R, M) {
    M === void 0 && (M = R), Object.defineProperty(m, M, { enumerable: !0, get: function() {
      return O[R];
    } });
  }) : (function(m, O, R, M) {
    M === void 0 && (M = R), m[M] = O[R];
  })), h = Ue && Ue.__setModuleDefault || (Object.create ? (function(m, O) {
    Object.defineProperty(m, "default", { enumerable: !0, value: O });
  }) : function(m, O) {
    m.default = O;
  }), g = Ue && Ue.__importStar || function(m) {
    if (m && m.__esModule) return m;
    var O = {};
    if (m != null) for (var R in m) R !== "default" && Object.prototype.hasOwnProperty.call(m, R) && r(O, m, R);
    return h(O, m), O;
  };
  Object.defineProperty(Ue, "__esModule", { value: !0 }), Ue.KBarAnimator = void 0;
  var f = g(Ft()), y = ba(), d = nn(), p = Un(), s = [
    {
      opacity: 0,
      transform: "scale(.99)"
    },
    { opacity: 1, transform: "scale(1.01)" },
    { opacity: 1, transform: "scale(1)" }
  ], v = [
    {
      transform: "scale(1)"
    },
    {
      transform: "scale(.98)"
    },
    {
      transform: "scale(1)"
    }
  ], S = function(m) {
    var O, R, M = m.children, j = m.style, C = m.className, L = m.disableCloseOnOuterClick, q = (0, d.useKBar)(function(w) {
      return {
        visualState: w.visualState,
        currentRootActionId: w.currentRootActionId
      };
    }), z = q.visualState, H = q.currentRootActionId, X = q.query, k = q.options, P = f.useRef(null), tt = f.useRef(null), F = ((O = k == null ? void 0 : k.animations) === null || O === void 0 ? void 0 : O.enterMs) || 0, D = ((R = k == null ? void 0 : k.animations) === null || R === void 0 ? void 0 : R.exitMs) || 0;
    f.useEffect(function() {
      if (z !== y.VisualState.showing) {
        var w = z === y.VisualState.animatingIn ? F : D, Q = P.current;
        Q == null || Q.animate(s, {
          duration: w,
          easing: (
            // TODO: expose easing in options
            z === y.VisualState.animatingOut ? "ease-in" : "ease-out"
          ),
          direction: z === y.VisualState.animatingOut ? "reverse" : "normal",
          fill: "forwards"
        });
      }
    }, [k, z, F, D]);
    var A = f.useRef();
    f.useEffect(function() {
      if (z === y.VisualState.showing) {
        var w = P.current, Q = tt.current;
        if (!w || !Q)
          return;
        var I = new ResizeObserver(function(Y) {
          for (var N = 0, V = Y; N < V.length; N++) {
            var ut = V[N], ct = ut.contentRect;
            A.current || (A.current = ct.height), w.animate([
              {
                height: A.current + "px"
              },
              {
                height: ct.height + "px"
              }
            ], {
              duration: F / 2,
              // TODO: expose configs here
              easing: "ease-out",
              fill: "forwards"
            }), A.current = ct.height;
          }
        });
        return I.observe(Q), function() {
          I.unobserve(Q);
        };
      }
    }, [z, k, F, D]);
    var W = f.useRef(!0);
    return f.useEffect(function() {
      if (W.current) {
        W.current = !1;
        return;
      }
      var w = P.current;
      w && w.animate(v, {
        duration: F,
        easing: "ease-out"
      });
    }, [H, F]), (0, p.useOuterClick)(P, function() {
      var w, Q;
      L || (X.setVisualState(y.VisualState.animatingOut), (Q = (w = k.callbacks) === null || w === void 0 ? void 0 : w.onClose) === null || Q === void 0 || Q.call(w));
    }), f.createElement(
      "div",
      { ref: P, style: c(c(c({}, s[0]), j), { pointerEvents: "auto" }), className: C },
      f.createElement("div", { ref: tt }, M)
    );
  };
  return Ue.KBarAnimator = S, Ue;
}
var jn = {}, fh;
function Sg() {
  return fh || (fh = 1, (function(c) {
    var r = jn && jn.__createBinding || (Object.create ? (function(g, f, y, d) {
      d === void 0 && (d = y), Object.defineProperty(g, d, { enumerable: !0, get: function() {
        return f[y];
      } });
    }) : (function(g, f, y, d) {
      d === void 0 && (d = y), g[d] = f[y];
    })), h = jn && jn.__exportStar || function(g, f) {
      for (var y in g) y !== "default" && !Object.prototype.hasOwnProperty.call(f, y) && r(f, g, y);
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), h(yh(), c), h(hh(), c);
  })(jn)), jn;
}
var rh;
function bg() {
  return rh || (rh = 1, (function(c) {
    var r = Tn && Tn.__createBinding || (Object.create ? (function(f, y, d, p) {
      p === void 0 && (p = d), Object.defineProperty(f, p, { enumerable: !0, get: function() {
        return y[d];
      } });
    }) : (function(f, y, d, p) {
      p === void 0 && (p = d), f[p] = y[d];
    })), h = Tn && Tn.__exportStar || function(f, y) {
      for (var d in f) d !== "default" && !Object.prototype.hasOwnProperty.call(y, d) && r(y, f, d);
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), c.Priority = c.createAction = void 0;
    var g = Un();
    Object.defineProperty(c, "createAction", { enumerable: !0, get: function() {
      return g.createAction;
    } }), Object.defineProperty(c, "Priority", { enumerable: !0, get: function() {
      return g.Priority;
    } }), h($m(), c), h(tg(), c), h(eg(), c), h(zh(), c), h(gg(), c), h(nn(), c), h(pg(), c), h(mh(), c), h(_g(), c), h(ba(), c), h(Sg(), c);
  })(Tn)), Tn;
}
var ln = bg();
function Og() {
  const c = document.querySelector('[data-testid="stSidebarCollapseButton"]') ?? document.querySelector('[data-testid="collapsedControl"]');
  c == null || c.click();
}
function Eg(c) {
  var f, y;
  const r = ((y = (f = c()) == null ? void 0 : f.data) == null ? void 0 : y.navItems) ?? [], h = (d) => {
    var p, s;
    (s = (p = c()) == null ? void 0 : p.setStateValue) == null || s.call(p, "value", d);
  };
  return [
    ...r.map((d) => ({
      id: `nav-${d.file}`,
      name: d.title,
      section: "Navigation",
      keywords: `${d.title} ${d.file} page`,
      icon: /* @__PURE__ */ ee.jsx("span", { className: "kbar-result-icon", children: d.icon }),
      perform: () => h(d.file)
    })),
    {
      id: "toggle-sidebar",
      name: "Toggle sidebar",
      section: "App",
      keywords: "sidebar collapse expand panel",
      perform: Og
    },
    {
      id: "keyboard-shortcuts",
      name: "Keyboard shortcuts",
      section: "Help",
      keywords: "help hotkeys keys",
      children: [
        {
          id: "ks-open",
          name: "Open command palette — ⌘K / Ctrl+K",
          perform: () => {
          }
        },
        {
          id: "ks-nav",
          name: "Move selection — ↑ / ↓",
          perform: () => {
          }
        },
        {
          id: "ks-select",
          name: "Run action — Enter",
          perform: () => {
          }
        },
        {
          id: "ks-back",
          name: "Go back — Backspace",
          perform: () => {
          }
        },
        {
          id: "ks-close",
          name: "Close palette — Esc",
          perform: () => {
          }
        }
      ]
    }
  ];
}
function Mg({ getComponent: c }) {
  const r = dh.useMemo(() => Eg(c), [c]);
  return ln.useRegisterActions(r, [r]), null;
}
function Ag() {
  const { results: c } = ln.useMatches();
  return /* @__PURE__ */ ee.jsx(
    ln.KBarResults,
    {
      items: c,
      onRender: ({ item: r, active: h }) => {
        var f, y;
        if (typeof r == "string")
          return /* @__PURE__ */ ee.jsx("div", { className: "kbar-group-label", children: r });
        const g = (f = r.id) == null ? void 0 : f.startsWith("ks-");
        return /* @__PURE__ */ ee.jsxs(
          "div",
          {
            className: `kbar-result${g ? " kbar-result--info" : ""}`,
            "data-active": h,
            children: [
              r.icon,
              /* @__PURE__ */ ee.jsx("span", { className: "kbar-result-name", children: r.name }),
              (y = r.shortcut) != null && y.length ? /* @__PURE__ */ ee.jsx("span", { className: "kbar-result-shortcut", children: r.shortcut.map((d) => /* @__PURE__ */ ee.jsx("kbd", { children: d }, d)) }) : null
            ]
          }
        );
      }
    }
  );
}
function zg() {
  return /* @__PURE__ */ ee.jsxs(ln.KBarPortal, { children: [
    /* @__PURE__ */ ee.jsx("div", { className: "kbar-overlay" }),
    /* @__PURE__ */ ee.jsx(ln.KBarPositioner, { className: "kbar-positioner", children: /* @__PURE__ */ ee.jsxs(ln.KBarAnimator, { className: "kbar-animator", children: [
      /* @__PURE__ */ ee.jsx(ln.KBarSearch, { className: "kbar-search", placeholder: "Search commands…" }),
      /* @__PURE__ */ ee.jsx("div", { className: "kbar-results", children: /* @__PURE__ */ ee.jsx(Ag, {}) })
    ] }) })
  ] });
}
function Tg({ getComponent: c }) {
  return /* @__PURE__ */ ee.jsxs(ln.KBarProvider, { options: { animations: { enterMs: 0, exitMs: 0 } }, children: [
    /* @__PURE__ */ ee.jsx(Mg, { getComponent: c }),
    /* @__PURE__ */ ee.jsx(zg, {})
  ] });
}
let oh = null, sh = !1;
function Rg(c) {
  if (oh = c, sh)
    return;
  sh = !0;
  const r = document.createElement("div");
  r.id = "ce-command-palette-root", document.body.appendChild(r), P0.createRoot(r).render(
    /* @__PURE__ */ ee.jsx(Tg, { getComponent: () => oh })
  );
}
export {
  Rg as default
};
