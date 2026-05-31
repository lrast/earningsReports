function J0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
function hh(c) {
  if (Object.prototype.hasOwnProperty.call(c, "__esModule")) return c;
  var f = c.default;
  if (typeof f == "function") {
    var v = function g() {
      return this instanceof g ? Reflect.construct(f, arguments, this.constructor) : f.apply(this, arguments);
    };
    v.prototype = f.prototype;
  } else v = {};
  return Object.defineProperty(v, "__esModule", { value: !0 }), Object.keys(c).forEach(function(g) {
    var r = Object.getOwnPropertyDescriptor(c, g);
    Object.defineProperty(v, g, r.get ? r : {
      enumerable: !0,
      get: function() {
        return c[g];
      }
    });
  }), v;
}
var ar = { exports: {} }, yu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Av;
function $0() {
  if (Av) return yu;
  Av = 1;
  var c = Symbol.for("react.transitional.element"), f = Symbol.for("react.fragment");
  function v(g, r, y) {
    var h = null;
    if (y !== void 0 && (h = "" + y), r.key !== void 0 && (h = "" + r.key), "key" in r) {
      y = {};
      for (var p in r)
        p !== "key" && (y[p] = r[p]);
    } else y = r;
    return r = y.ref, {
      $$typeof: c,
      type: g,
      key: h,
      ref: r !== void 0 ? r : null,
      props: y
    };
  }
  return yu.Fragment = f, yu.jsx = v, yu.jsxs = v, yu;
}
var zv;
function Vi() {
  return zv || (zv = 1, ar.exports = $0()), ar.exports;
}
var It = Vi(), ur = { exports: {} }, mu = {}, ir = { exports: {} }, cr = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tv;
function W0() {
  return Tv || (Tv = 1, (function(c) {
    function f(Y, N) {
      var Q = Y.length;
      Y.push(N);
      t: for (; 0 < Q; ) {
        var ut = Q - 1 >>> 1, ct = Y[ut];
        if (0 < r(ct, N))
          Y[ut] = N, Y[Q] = ct, Q = ut;
        else break t;
      }
    }
    function v(Y) {
      return Y.length === 0 ? null : Y[0];
    }
    function g(Y) {
      if (Y.length === 0) return null;
      var N = Y[0], Q = Y.pop();
      if (Q !== N) {
        Y[0] = Q;
        t: for (var ut = 0, ct = Y.length, Ot = ct >>> 1; ut < Ot; ) {
          var O = 2 * (ut + 1) - 1, J = Y[O], et = O + 1, lt = Y[et];
          if (0 > r(J, Q))
            et < ct && 0 > r(lt, J) ? (Y[ut] = lt, Y[et] = Q, ut = et) : (Y[ut] = J, Y[O] = Q, ut = O);
          else if (et < ct && 0 > r(lt, Q))
            Y[ut] = lt, Y[et] = Q, ut = et;
          else break t;
        }
      }
      return N;
    }
    function r(Y, N) {
      var Q = Y.sortIndex - N.sortIndex;
      return Q !== 0 ? Q : Y.id - N.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      c.unstable_now = function() {
        return y.now();
      };
    } else {
      var h = Date, p = h.now();
      c.unstable_now = function() {
        return h.now() - p;
      };
    }
    var s = [], d = [], S = 1, m = null, b = 3, R = !1, M = !1, j = !1, C = !1, L = typeof setTimeout == "function" ? setTimeout : null, q = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function H(Y) {
      for (var N = v(d); N !== null; ) {
        if (N.callback === null) g(d);
        else if (N.startTime <= Y)
          g(d), N.sortIndex = N.expirationTime, f(s, N);
        else break;
        N = v(d);
      }
    }
    function X(Y) {
      if (j = !1, H(Y), !M)
        if (v(s) !== null)
          M = !0, F || (F = !0, W());
        else {
          var N = v(d);
          N !== null && I(X, N.startTime - Y);
        }
    }
    var F = !1, P = -1, tt = 5, k = -1;
    function D() {
      return C ? !0 : !(c.unstable_now() - k < tt);
    }
    function A() {
      if (C = !1, F) {
        var Y = c.unstable_now();
        k = Y;
        var N = !0;
        try {
          t: {
            M = !1, j && (j = !1, q(P), P = -1), R = !0;
            var Q = b;
            try {
              e: {
                for (H(Y), m = v(s); m !== null && !(m.expirationTime > Y && D()); ) {
                  var ut = m.callback;
                  if (typeof ut == "function") {
                    m.callback = null, b = m.priorityLevel;
                    var ct = ut(
                      m.expirationTime <= Y
                    );
                    if (Y = c.unstable_now(), typeof ct == "function") {
                      m.callback = ct, H(Y), N = !0;
                      break e;
                    }
                    m === v(s) && g(s), H(Y);
                  } else g(s);
                  m = v(s);
                }
                if (m !== null) N = !0;
                else {
                  var Ot = v(d);
                  Ot !== null && I(
                    X,
                    Ot.startTime - Y
                  ), N = !1;
                }
              }
              break t;
            } finally {
              m = null, b = Q, R = !1;
            }
            N = void 0;
          }
        } finally {
          N ? W() : F = !1;
        }
      }
    }
    var W;
    if (typeof z == "function")
      W = function() {
        z(A);
      };
    else if (typeof MessageChannel < "u") {
      var w = new MessageChannel(), V = w.port2;
      w.port1.onmessage = A, W = function() {
        V.postMessage(null);
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
      return b;
    }, c.unstable_next = function(Y) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var N = 3;
          break;
        default:
          N = b;
      }
      var Q = b;
      b = N;
      try {
        return Y();
      } finally {
        b = Q;
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
      var Q = b;
      b = Y;
      try {
        return N();
      } finally {
        b = Q;
      }
    }, c.unstable_scheduleCallback = function(Y, N, Q) {
      var ut = c.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? ut + Q : ut) : Q = ut, Y) {
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
      return ct = Q + ct, Y = {
        id: S++,
        callback: N,
        priorityLevel: Y,
        startTime: Q,
        expirationTime: ct,
        sortIndex: -1
      }, Q > ut ? (Y.sortIndex = Q, f(d, Y), v(s) === null && Y === v(d) && (j ? (q(P), P = -1) : j = !0, I(X, Q - ut))) : (Y.sortIndex = ct, f(s, Y), M || R || (M = !0, F || (F = !0, W()))), Y;
    }, c.unstable_shouldYield = D, c.unstable_wrapCallback = function(Y) {
      var N = b;
      return function() {
        var Q = b;
        b = N;
        try {
          return Y.apply(this, arguments);
        } finally {
          b = Q;
        }
      };
    };
  })(cr)), cr;
}
var Rv;
function k0() {
  return Rv || (Rv = 1, ir.exports = W0()), ir.exports;
}
var fr = { exports: {} }, ot = {}, Dv;
function F0() {
  if (Dv) return ot;
  Dv = 1;
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
  var f = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), p = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), R = Symbol.iterator;
  function M(O) {
    return O === null || typeof O != "object" ? null : (O = R && O[R] || O["@@iterator"], typeof O == "function" ? O : null);
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
  function q(O, J, et) {
    this.props = O, this.context = J, this.refs = L, this.updater = et || j;
  }
  q.prototype.isReactComponent = {}, q.prototype.setState = function(O, J) {
    if (typeof O != "object" && typeof O != "function" && O != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, O, J, "setState");
  }, q.prototype.forceUpdate = function(O) {
    this.updater.enqueueForceUpdate(this, O, "forceUpdate");
  };
  function z() {
  }
  z.prototype = q.prototype;
  function H(O, J, et) {
    this.props = O, this.context = J, this.refs = L, this.updater = et || j;
  }
  var X = H.prototype = new z();
  X.constructor = H, C(X, q.prototype), X.isPureReactComponent = !0;
  var F = Array.isArray;
  function P() {
  }
  var tt = { H: null, A: null, T: null, S: null }, k = Object.prototype.hasOwnProperty;
  function D(O, J, et) {
    var lt = et.ref;
    return {
      $$typeof: f,
      type: O,
      key: J,
      ref: lt !== void 0 ? lt : null,
      props: et
    };
  }
  function A(O, J) {
    return D(O.type, J, O.props);
  }
  function W(O) {
    return typeof O == "object" && O !== null && O.$$typeof === f;
  }
  function w(O) {
    var J = { "=": "=0", ":": "=2" };
    return "$" + O.replace(/[=:]/g, function(et) {
      return J[et];
    });
  }
  var V = /\/+/g;
  function I(O, J) {
    return typeof O == "object" && O !== null && O.key != null ? w("" + O.key) : J.toString(36);
  }
  function Y(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (typeof O.status == "string" ? O.then(P, P) : (O.status = "pending", O.then(
          function(J) {
            O.status === "pending" && (O.status = "fulfilled", O.value = J);
          },
          function(J) {
            O.status === "pending" && (O.status = "rejected", O.reason = J);
          }
        )), O.status) {
          case "fulfilled":
            return O.value;
          case "rejected":
            throw O.reason;
        }
    }
    throw O;
  }
  function N(O, J, et, lt, ht) {
    var st = typeof O;
    (st === "undefined" || st === "boolean") && (O = null);
    var bt = !1;
    if (O === null) bt = !0;
    else
      switch (st) {
        case "bigint":
        case "string":
        case "number":
          bt = !0;
          break;
        case "object":
          switch (O.$$typeof) {
            case f:
            case v:
              bt = !0;
              break;
            case m:
              return bt = O._init, N(
                bt(O._payload),
                J,
                et,
                lt,
                ht
              );
          }
      }
    if (bt)
      return ht = ht(O), bt = lt === "" ? "." + I(O, 0) : lt, F(ht) ? (et = "", bt != null && (et = bt.replace(V, "$&/") + "/"), N(ht, J, et, "", function(Dl) {
        return Dl;
      })) : ht != null && (W(ht) && (ht = A(
        ht,
        et + (ht.key == null || O && O.key === ht.key ? "" : ("" + ht.key).replace(
          V,
          "$&/"
        ) + "/") + bt
      )), J.push(ht)), 1;
    bt = 0;
    var Pt = lt === "" ? "." : lt + ":";
    if (F(O))
      for (var xt = 0; xt < O.length; xt++)
        lt = O[xt], st = Pt + I(lt, xt), bt += N(
          lt,
          J,
          et,
          st,
          ht
        );
    else if (xt = M(O), typeof xt == "function")
      for (O = xt.call(O), xt = 0; !(lt = O.next()).done; )
        lt = lt.value, st = Pt + I(lt, xt++), bt += N(
          lt,
          J,
          et,
          st,
          ht
        );
    else if (st === "object") {
      if (typeof O.then == "function")
        return N(
          Y(O),
          J,
          et,
          lt,
          ht
        );
      throw J = String(O), Error(
        "Objects are not valid as a React child (found: " + (J === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : J) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return bt;
  }
  function Q(O, J, et) {
    if (O == null) return O;
    var lt = [], ht = 0;
    return N(O, lt, "", "", function(st) {
      return J.call(et, st, ht++);
    }), lt;
  }
  function ut(O) {
    if (O._status === -1) {
      var J = O._result;
      J = J(), J.then(
        function(et) {
          (O._status === 0 || O._status === -1) && (O._status = 1, O._result = et);
        },
        function(et) {
          (O._status === 0 || O._status === -1) && (O._status = 2, O._result = et);
        }
      ), O._status === -1 && (O._status = 0, O._result = J);
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var ct = typeof reportError == "function" ? reportError : function(O) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var J = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof O == "object" && O !== null && typeof O.message == "string" ? String(O.message) : String(O),
        error: O
      });
      if (!window.dispatchEvent(J)) return;
    } else if (typeof c == "object" && typeof c.emit == "function") {
      c.emit("uncaughtException", O);
      return;
    }
    console.error(O);
  }, Ot = {
    map: Q,
    forEach: function(O, J, et) {
      Q(
        O,
        function() {
          J.apply(this, arguments);
        },
        et
      );
    },
    count: function(O) {
      var J = 0;
      return Q(O, function() {
        J++;
      }), J;
    },
    toArray: function(O) {
      return Q(O, function(J) {
        return J;
      }) || [];
    },
    only: function(O) {
      if (!W(O))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return O;
    }
  };
  return ot.Activity = b, ot.Children = Ot, ot.Component = q, ot.Fragment = g, ot.Profiler = y, ot.PureComponent = H, ot.StrictMode = r, ot.Suspense = d, ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = tt, ot.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(O) {
      return tt.H.useMemoCache(O);
    }
  }, ot.cache = function(O) {
    return function() {
      return O.apply(null, arguments);
    };
  }, ot.cacheSignal = function() {
    return null;
  }, ot.cloneElement = function(O, J, et) {
    if (O == null)
      throw Error(
        "The argument must be a React element, but you passed " + O + "."
      );
    var lt = C({}, O.props), ht = O.key;
    if (J != null)
      for (st in J.key !== void 0 && (ht = "" + J.key), J)
        !k.call(J, st) || st === "key" || st === "__self" || st === "__source" || st === "ref" && J.ref === void 0 || (lt[st] = J[st]);
    var st = arguments.length - 2;
    if (st === 1) lt.children = et;
    else if (1 < st) {
      for (var bt = Array(st), Pt = 0; Pt < st; Pt++)
        bt[Pt] = arguments[Pt + 2];
      lt.children = bt;
    }
    return D(O.type, ht, lt);
  }, ot.createContext = function(O) {
    return O = {
      $$typeof: p,
      _currentValue: O,
      _currentValue2: O,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, O.Provider = O, O.Consumer = {
      $$typeof: h,
      _context: O
    }, O;
  }, ot.createElement = function(O, J, et) {
    var lt, ht = {}, st = null;
    if (J != null)
      for (lt in J.key !== void 0 && (st = "" + J.key), J)
        k.call(J, lt) && lt !== "key" && lt !== "__self" && lt !== "__source" && (ht[lt] = J[lt]);
    var bt = arguments.length - 2;
    if (bt === 1) ht.children = et;
    else if (1 < bt) {
      for (var Pt = Array(bt), xt = 0; xt < bt; xt++)
        Pt[xt] = arguments[xt + 2];
      ht.children = Pt;
    }
    if (O && O.defaultProps)
      for (lt in bt = O.defaultProps, bt)
        ht[lt] === void 0 && (ht[lt] = bt[lt]);
    return D(O, st, ht);
  }, ot.createRef = function() {
    return { current: null };
  }, ot.forwardRef = function(O) {
    return { $$typeof: s, render: O };
  }, ot.isValidElement = W, ot.lazy = function(O) {
    return {
      $$typeof: m,
      _payload: { _status: -1, _result: O },
      _init: ut
    };
  }, ot.memo = function(O, J) {
    return {
      $$typeof: S,
      type: O,
      compare: J === void 0 ? null : J
    };
  }, ot.startTransition = function(O) {
    var J = tt.T, et = {};
    tt.T = et;
    try {
      var lt = O(), ht = tt.S;
      ht !== null && ht(et, lt), typeof lt == "object" && lt !== null && typeof lt.then == "function" && lt.then(P, ct);
    } catch (st) {
      ct(st);
    } finally {
      J !== null && et.types !== null && (J.types = et.types), tt.T = J;
    }
  }, ot.unstable_useCacheRefresh = function() {
    return tt.H.useCacheRefresh();
  }, ot.use = function(O) {
    return tt.H.use(O);
  }, ot.useActionState = function(O, J, et) {
    return tt.H.useActionState(O, J, et);
  }, ot.useCallback = function(O, J) {
    return tt.H.useCallback(O, J);
  }, ot.useContext = function(O) {
    return tt.H.useContext(O);
  }, ot.useDebugValue = function() {
  }, ot.useDeferredValue = function(O, J) {
    return tt.H.useDeferredValue(O, J);
  }, ot.useEffect = function(O, J) {
    return tt.H.useEffect(O, J);
  }, ot.useEffectEvent = function(O) {
    return tt.H.useEffectEvent(O);
  }, ot.useId = function() {
    return tt.H.useId();
  }, ot.useImperativeHandle = function(O, J, et) {
    return tt.H.useImperativeHandle(O, J, et);
  }, ot.useInsertionEffect = function(O, J) {
    return tt.H.useInsertionEffect(O, J);
  }, ot.useLayoutEffect = function(O, J) {
    return tt.H.useLayoutEffect(O, J);
  }, ot.useMemo = function(O, J) {
    return tt.H.useMemo(O, J);
  }, ot.useOptimistic = function(O, J) {
    return tt.H.useOptimistic(O, J);
  }, ot.useReducer = function(O, J, et) {
    return tt.H.useReducer(O, J, et);
  }, ot.useRef = function(O) {
    return tt.H.useRef(O);
  }, ot.useState = function(O) {
    return tt.H.useState(O);
  }, ot.useSyncExternalStore = function(O, J, et) {
    return tt.H.useSyncExternalStore(
      O,
      J,
      et
    );
  }, ot.useTransition = function() {
    return tt.H.useTransition();
  }, ot.version = "19.2.6", ot;
}
var jv;
function kt() {
  return jv || (jv = 1, fr.exports = F0()), fr.exports;
}
var rr = { exports: {} }, fe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cv;
function I0() {
  if (Cv) return fe;
  Cv = 1;
  var c = kt();
  function f(s) {
    var d = "https://react.dev/errors/" + s;
    if (1 < arguments.length) {
      d += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        d += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + s + "; visit " + d + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function v() {
  }
  var g = {
    d: {
      f: v,
      r: function() {
        throw Error(f(522));
      },
      D: v,
      C: v,
      L: v,
      m: v,
      X: v,
      S: v,
      M: v
    },
    p: 0,
    findDOMNode: null
  }, r = Symbol.for("react.portal");
  function y(s, d, S) {
    var m = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: m == null ? null : "" + m,
      children: s,
      containerInfo: d,
      implementation: S
    };
  }
  var h = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(s, d) {
    if (s === "font") return "";
    if (typeof d == "string")
      return d === "use-credentials" ? d : "";
  }
  return fe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = g, fe.createPortal = function(s, d) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!d || d.nodeType !== 1 && d.nodeType !== 9 && d.nodeType !== 11)
      throw Error(f(299));
    return y(s, d, null, S);
  }, fe.flushSync = function(s) {
    var d = h.T, S = g.p;
    try {
      if (h.T = null, g.p = 2, s) return s();
    } finally {
      h.T = d, g.p = S, g.d.f();
    }
  }, fe.preconnect = function(s, d) {
    typeof s == "string" && (d ? (d = d.crossOrigin, d = typeof d == "string" ? d === "use-credentials" ? d : "" : void 0) : d = null, g.d.C(s, d));
  }, fe.prefetchDNS = function(s) {
    typeof s == "string" && g.d.D(s);
  }, fe.preinit = function(s, d) {
    if (typeof s == "string" && d && typeof d.as == "string") {
      var S = d.as, m = p(S, d.crossOrigin), b = typeof d.integrity == "string" ? d.integrity : void 0, R = typeof d.fetchPriority == "string" ? d.fetchPriority : void 0;
      S === "style" ? g.d.S(
        s,
        typeof d.precedence == "string" ? d.precedence : void 0,
        {
          crossOrigin: m,
          integrity: b,
          fetchPriority: R
        }
      ) : S === "script" && g.d.X(s, {
        crossOrigin: m,
        integrity: b,
        fetchPriority: R,
        nonce: typeof d.nonce == "string" ? d.nonce : void 0
      });
    }
  }, fe.preinitModule = function(s, d) {
    if (typeof s == "string")
      if (typeof d == "object" && d !== null) {
        if (d.as == null || d.as === "script") {
          var S = p(
            d.as,
            d.crossOrigin
          );
          g.d.M(s, {
            crossOrigin: S,
            integrity: typeof d.integrity == "string" ? d.integrity : void 0,
            nonce: typeof d.nonce == "string" ? d.nonce : void 0
          });
        }
      } else d == null && g.d.M(s);
  }, fe.preload = function(s, d) {
    if (typeof s == "string" && typeof d == "object" && d !== null && typeof d.as == "string") {
      var S = d.as, m = p(S, d.crossOrigin);
      g.d.L(s, S, {
        crossOrigin: m,
        integrity: typeof d.integrity == "string" ? d.integrity : void 0,
        nonce: typeof d.nonce == "string" ? d.nonce : void 0,
        type: typeof d.type == "string" ? d.type : void 0,
        fetchPriority: typeof d.fetchPriority == "string" ? d.fetchPriority : void 0,
        referrerPolicy: typeof d.referrerPolicy == "string" ? d.referrerPolicy : void 0,
        imageSrcSet: typeof d.imageSrcSet == "string" ? d.imageSrcSet : void 0,
        imageSizes: typeof d.imageSizes == "string" ? d.imageSizes : void 0,
        media: typeof d.media == "string" ? d.media : void 0
      });
    }
  }, fe.preloadModule = function(s, d) {
    if (typeof s == "string")
      if (d) {
        var S = p(d.as, d.crossOrigin);
        g.d.m(s, {
          as: typeof d.as == "string" && d.as !== "script" ? d.as : void 0,
          crossOrigin: S,
          integrity: typeof d.integrity == "string" ? d.integrity : void 0
        });
      } else g.d.m(s);
  }, fe.requestFormReset = function(s) {
    g.d.r(s);
  }, fe.unstable_batchedUpdates = function(s, d) {
    return s(d);
  }, fe.useFormState = function(s, d, S) {
    return h.H.useFormState(s, d, S);
  }, fe.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, fe.version = "19.2.6", fe;
}
var Nv;
function Ar() {
  if (Nv) return rr.exports;
  Nv = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (f) {
        console.error(f);
      }
  }
  return c(), rr.exports = I0(), rr.exports;
}
var Uv;
function P0() {
  if (Uv) return mu;
  Uv = 1;
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
  var f = k0(), v = kt(), g = Ar();
  function r(t) {
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
  function h(t) {
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
  function d(t) {
    if (h(t) !== t)
      throw Error(r(188));
  }
  function S(t) {
    var e = t.alternate;
    if (!e) {
      if (e = h(t), e === null) throw Error(r(188));
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
          if (u === l) return d(a), t;
          if (u === n) return d(a), e;
          u = u.sibling;
        }
        throw Error(r(188));
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
          if (!i) throw Error(r(189));
        }
      }
      if (l.alternate !== n) throw Error(r(190));
    }
    if (l.tag !== 3) throw Error(r(188));
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
  var b = Object.assign, R = Symbol.for("react.element"), M = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), q = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), H = Symbol.for("react.context"), X = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), tt = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), D = Symbol.for("react.activity"), A = Symbol.for("react.memo_cache_sentinel"), W = Symbol.iterator;
  function w(t) {
    return t === null || typeof t != "object" ? null : (t = W && t[W] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var V = Symbol.for("react.client.reference");
  function I(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === V ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case C:
        return "Fragment";
      case q:
        return "Profiler";
      case L:
        return "StrictMode";
      case F:
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
        case k:
          e = t._payload, t = t._init;
          try {
            return I(t(e));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, N = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = g.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ut = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ct = [], Ot = -1;
  function O(t) {
    return { current: t };
  }
  function J(t) {
    0 > Ot || (t.current = ct[Ot], ct[Ot] = null, Ot--);
  }
  function et(t, e) {
    Ot++, ct[Ot] = t.current, t.current = e;
  }
  var lt = O(null), ht = O(null), st = O(null), bt = O(null);
  function Pt(t, e) {
    switch (et(st, e), et(ht, t), et(lt, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? $d(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = $d(e), t = Wd(e, t);
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
  function Dl(t) {
    t.memoizedState !== null && et(bt, t);
    var e = lt.current, l = Wd(e, t.type);
    e !== l && (et(ht, t), et(lt, l));
  }
  function jl(t) {
    ht.current === t && (J(lt), J(ht)), bt.current === t && (J(bt), su._currentValue = ut);
  }
  var qn, Su;
  function Pe(t) {
    if (qn === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        qn = e && e[1] || "", Su = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + qn + t + Su;
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
  function Qi(t, e) {
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
        e += Qi(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var Vt = Object.prototype.hasOwnProperty, Rt = f.unstable_scheduleCallback, ce = f.unstable_cancelCallback, Zt = f.unstable_shouldYield, we = f.unstable_requestPaint, Ht = f.unstable_now, qe = f.unstable_getCurrentPriorityLevel, fn = f.unstable_ImmediatePriority, tl = f.unstable_UserBlockingPriority, _e = f.unstable_NormalPriority, xn = f.unstable_LowPriority, Hn = f.unstable_IdlePriority, bu = f.log, Xi = f.unstable_setDisableYieldValue, cl = null, Se = null;
  function Cl(t) {
    if (typeof bu == "function" && Xi(t), Se && typeof Se.setStrictMode == "function")
      try {
        Se.setStrictMode(cl, t);
      } catch {
      }
  }
  var be = Math.clz32 ? Math.clz32 : Uh, Ch = Math.log, Nh = Math.LN2;
  function Uh(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Ch(t) / Nh | 0) | 0;
  }
  var Ou = 256, Eu = 262144, Mu = 4194304;
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
  function Au(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var o = n & 134217727;
    return o !== 0 ? (n = o & ~u, n !== 0 ? a = rn(n) : (i &= o, i !== 0 ? a = rn(i) : l || (l = o & ~t, l !== 0 && (a = rn(l))))) : (o = n & ~u, o !== 0 ? a = rn(o) : i !== 0 ? a = rn(i) : l || (l = n & ~t, l !== 0 && (a = rn(l)))), a === 0 ? 0 : e !== 0 && e !== a && (e & u) === 0 && (u = a & -a, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : a;
  }
  function Ma(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Bh(t, e) {
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
  function Rr() {
    var t = Mu;
    return Mu <<= 1, (Mu & 62914560) === 0 && (Mu = 4194304), t;
  }
  function Zi(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Aa(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function qh(t, e, l, n, a, u) {
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
    n !== 0 && Dr(t, n, 0), u !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function Dr(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var n = 31 - be(e);
    t.entangledLanes |= e, t.entanglements[n] = t.entanglements[n] | 1073741824 | l & 261930;
  }
  function jr(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var n = 31 - be(l), a = 1 << n;
      a & e | t[n] & e && (t[n] |= e), l &= ~a;
    }
  }
  function Cr(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : wi(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function wi(t) {
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
  function Ji(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Nr() {
    var t = Q.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : pv(t.type));
  }
  function Ur(t, e) {
    var l = Q.p;
    try {
      return Q.p = t, e();
    } finally {
      Q.p = l;
    }
  }
  var Nl = Math.random().toString(36).slice(2), le = "__reactFiber$" + Nl, de = "__reactProps$" + Nl, Yn = "__reactContainer$" + Nl, $i = "__reactEvents$" + Nl, xh = "__reactListeners$" + Nl, Hh = "__reactHandles$" + Nl, Br = "__reactResources$" + Nl, za = "__reactMarker$" + Nl;
  function Wi(t) {
    delete t[le], delete t[de], delete t[$i], delete t[xh], delete t[Hh];
  }
  function Kn(t) {
    var e = t[le];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Yn] || l[le]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = lv(t); t !== null; ) {
            if (l = t[le]) return l;
            t = lv(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Ln(t) {
    if (t = t[le] || t[Yn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Ta(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Gn(t) {
    var e = t[Br];
    return e || (e = t[Br] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function te(t) {
    t[za] = !0;
  }
  var qr = /* @__PURE__ */ new Set(), xr = {};
  function on(t, e) {
    Vn(t, e), Vn(t + "Capture", e);
  }
  function Vn(t, e) {
    for (xr[t] = e, t = 0; t < e.length; t++)
      qr.add(e[t]);
  }
  var Yh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hr = {}, Yr = {};
  function Kh(t) {
    return Vt.call(Yr, t) ? !0 : Vt.call(Hr, t) ? !1 : Yh.test(t) ? Yr[t] = !0 : (Hr[t] = !0, !1);
  }
  function zu(t, e, l) {
    if (Kh(e))
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
  function Tu(t, e, l) {
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
  function fl(t, e, l, n) {
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
  function Kr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Lh(t, e, l) {
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
  function ki(t) {
    if (!t._valueTracker) {
      var e = Kr(t) ? "checked" : "value";
      t._valueTracker = Lh(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Lr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), n = "";
    return t && (n = Kr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== l ? (e.setValue(t), !0) : !1;
  }
  function Ru(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Gh = /[\n"\\]/g;
  function He(t) {
    return t.replace(
      Gh,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Fi(t, e, l, n, a, u, i, o) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + xe(e)) : t.value !== "" + xe(e) && (t.value = "" + xe(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? Ii(t, i, xe(e)) : l != null ? Ii(t, i, xe(l)) : n != null && t.removeAttribute("value"), a == null && u != null && (t.defaultChecked = !!u), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? t.name = "" + xe(o) : t.removeAttribute("name");
  }
  function Gr(t, e, l, n, a, u, i, o) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        ki(t);
        return;
      }
      l = l != null ? "" + xe(l) : "", e = e != null ? "" + xe(e) : l, o || e === t.value || (t.value = e), t.defaultValue = e;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = o ? t.checked : !!n, t.defaultChecked = !!n, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), ki(t);
  }
  function Ii(t, e, l) {
    e === "number" && Ru(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
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
  function Vr(t, e, l) {
    if (e != null && (e = "" + xe(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + xe(l) : "";
  }
  function Qr(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(r(92));
        if (Y(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), e = l;
    }
    l = xe(e), t.defaultValue = l, n = t.textContent, n === l && n !== "" && n !== null && (t.value = n), ki(t);
  }
  function Xn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Vh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Xr(t, e, l) {
    var n = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : n ? t.setProperty(e, l) : typeof l != "number" || l === 0 || Vh.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Zr(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, l != null) {
      for (var n in l)
        !l.hasOwnProperty(n) || e != null && e.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var a in e)
        n = e[a], e.hasOwnProperty(a) && l[a] !== n && Xr(t, a, n);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Xr(t, u, e[u]);
  }
  function Pi(t) {
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
  var Qh = /* @__PURE__ */ new Map([
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
  ]), Xh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Du(t) {
    return Xh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function rl() {
  }
  var tc = null;
  function ec(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Zn = null, wn = null;
  function wr(t) {
    var e = Ln(t);
    if (e && (t = e.stateNode)) {
      var l = t[de] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Fi(
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
                var a = n[de] || null;
                if (!a) throw Error(r(90));
                Fi(
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
              n = l[e], n.form === t.form && Lr(n);
          }
          break t;
        case "textarea":
          Vr(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && Qn(t, !!l.multiple, e, !1);
      }
    }
  }
  var lc = !1;
  function Jr(t, e, l) {
    if (lc) return t(e, l);
    lc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (lc = !1, (Zn !== null || wn !== null) && (mi(), Zn && (e = Zn, t = wn, wn = Zn = null, wr(e), t)))
        for (e = 0; e < t.length; e++) wr(t[e]);
    }
  }
  function Ra(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[de] || null;
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
        r(231, e, typeof l)
      );
    return l;
  }
  var ol = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nc = !1;
  if (ol)
    try {
      var Da = {};
      Object.defineProperty(Da, "passive", {
        get: function() {
          nc = !0;
        }
      }), window.addEventListener("test", Da, Da), window.removeEventListener("test", Da, Da);
    } catch {
      nc = !1;
    }
  var Ul = null, ac = null, ju = null;
  function $r() {
    if (ju) return ju;
    var t, e = ac, l = e.length, n, a = "value" in Ul ? Ul.value : Ul.textContent, u = a.length;
    for (t = 0; t < l && e[t] === a[t]; t++) ;
    var i = l - t;
    for (n = 1; n <= i && e[l - n] === a[u - n]; n++) ;
    return ju = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function Cu(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Nu() {
    return !0;
  }
  function Wr() {
    return !1;
  }
  function ve(t) {
    function e(l, n, a, u, i) {
      this._reactName = l, this._targetInst = a, this.type = n, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var o in t)
        t.hasOwnProperty(o) && (l = t[o], this[o] = l ? l(u) : u[o]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Nu : Wr, this.isPropagationStopped = Wr, this;
    }
    return b(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Nu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Nu);
      },
      persist: function() {
      },
      isPersistent: Nu
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
  }, Uu = ve(sn), ja = b({}, sn, { view: 0, detail: 0 }), Zh = ve(ja), uc, ic, Ca, Bu = b({}, ja, {
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
    getModifierState: fc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ca && (Ca && t.type === "mousemove" ? (uc = t.screenX - Ca.screenX, ic = t.screenY - Ca.screenY) : ic = uc = 0, Ca = t), uc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ic;
    }
  }), kr = ve(Bu), wh = b({}, Bu, { dataTransfer: 0 }), Jh = ve(wh), $h = b({}, ja, { relatedTarget: 0 }), cc = ve($h), Wh = b({}, sn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), kh = ve(Wh), Fh = b({}, sn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Ih = ve(Fh), Ph = b({}, sn, { data: 0 }), Fr = ve(Ph), ty = {
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
  }, ey = {
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
  }, ly = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ny(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = ly[t]) ? !!e[t] : !1;
  }
  function fc() {
    return ny;
  }
  var ay = b({}, ja, {
    key: function(t) {
      if (t.key) {
        var e = ty[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Cu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? ey[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: fc,
    charCode: function(t) {
      return t.type === "keypress" ? Cu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Cu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), uy = ve(ay), iy = b({}, Bu, {
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
  }), Ir = ve(iy), cy = b({}, ja, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fc
  }), fy = ve(cy), ry = b({}, sn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), oy = ve(ry), sy = b({}, Bu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), dy = ve(sy), vy = b({}, sn, {
    newState: 0,
    oldState: 0
  }), hy = ve(vy), yy = [9, 13, 27, 32], rc = ol && "CompositionEvent" in window, Na = null;
  ol && "documentMode" in document && (Na = document.documentMode);
  var my = ol && "TextEvent" in window && !Na, Pr = ol && (!rc || Na && 8 < Na && 11 >= Na), to = " ", eo = !1;
  function lo(t, e) {
    switch (t) {
      case "keyup":
        return yy.indexOf(e.keyCode) !== -1;
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
  function no(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Jn = !1;
  function gy(t, e) {
    switch (t) {
      case "compositionend":
        return no(e);
      case "keypress":
        return e.which !== 32 ? null : (eo = !0, to);
      case "textInput":
        return t = e.data, t === to && eo ? null : t;
      default:
        return null;
    }
  }
  function py(t, e) {
    if (Jn)
      return t === "compositionend" || !rc && lo(t, e) ? (t = $r(), ju = ac = Ul = null, Jn = !1, t) : null;
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
        return Pr && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var _y = {
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
  function ao(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!_y[t.type] : e === "textarea";
  }
  function uo(t, e, l, n) {
    Zn ? wn ? wn.push(n) : wn = [n] : Zn = n, e = Ei(e, "onChange"), 0 < e.length && (l = new Uu(
      "onChange",
      "change",
      null,
      l,
      n
    ), t.push({ event: l, listeners: e }));
  }
  var Ua = null, Ba = null;
  function Sy(t) {
    Vd(t, 0);
  }
  function qu(t) {
    var e = Ta(t);
    if (Lr(e)) return t;
  }
  function io(t, e) {
    if (t === "change") return e;
  }
  var co = !1;
  if (ol) {
    var oc;
    if (ol) {
      var sc = "oninput" in document;
      if (!sc) {
        var fo = document.createElement("div");
        fo.setAttribute("oninput", "return;"), sc = typeof fo.oninput == "function";
      }
      oc = sc;
    } else oc = !1;
    co = oc && (!document.documentMode || 9 < document.documentMode);
  }
  function ro() {
    Ua && (Ua.detachEvent("onpropertychange", oo), Ba = Ua = null);
  }
  function oo(t) {
    if (t.propertyName === "value" && qu(Ba)) {
      var e = [];
      uo(
        e,
        Ba,
        t,
        ec(t)
      ), Jr(Sy, e);
    }
  }
  function by(t, e, l) {
    t === "focusin" ? (ro(), Ua = e, Ba = l, Ua.attachEvent("onpropertychange", oo)) : t === "focusout" && ro();
  }
  function Oy(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return qu(Ba);
  }
  function Ey(t, e) {
    if (t === "click") return qu(e);
  }
  function My(t, e) {
    if (t === "input" || t === "change")
      return qu(e);
  }
  function Ay(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Oe = typeof Object.is == "function" ? Object.is : Ay;
  function qa(t, e) {
    if (Oe(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var a = l[n];
      if (!Vt.call(e, a) || !Oe(t[a], e[a]))
        return !1;
    }
    return !0;
  }
  function so(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function vo(t, e) {
    var l = so(t);
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
      l = so(l);
    }
  }
  function ho(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? ho(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function yo(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Ru(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Ru(t.document);
    }
    return e;
  }
  function dc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var zy = ol && "documentMode" in document && 11 >= document.documentMode, $n = null, vc = null, xa = null, hc = !1;
  function mo(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    hc || $n == null || $n !== Ru(n) || (n = $n, "selectionStart" in n && dc(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), xa && qa(xa, n) || (xa = n, n = Ei(vc, "onSelect"), 0 < n.length && (e = new Uu(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: n }), e.target = $n)));
  }
  function dn(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var Wn = {
    animationend: dn("Animation", "AnimationEnd"),
    animationiteration: dn("Animation", "AnimationIteration"),
    animationstart: dn("Animation", "AnimationStart"),
    transitionrun: dn("Transition", "TransitionRun"),
    transitionstart: dn("Transition", "TransitionStart"),
    transitioncancel: dn("Transition", "TransitionCancel"),
    transitionend: dn("Transition", "TransitionEnd")
  }, yc = {}, go = {};
  ol && (go = document.createElement("div").style, "AnimationEvent" in window || (delete Wn.animationend.animation, delete Wn.animationiteration.animation, delete Wn.animationstart.animation), "TransitionEvent" in window || delete Wn.transitionend.transition);
  function vn(t) {
    if (yc[t]) return yc[t];
    if (!Wn[t]) return t;
    var e = Wn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in go)
        return yc[t] = e[l];
    return t;
  }
  var po = vn("animationend"), _o = vn("animationiteration"), So = vn("animationstart"), Ty = vn("transitionrun"), Ry = vn("transitionstart"), Dy = vn("transitioncancel"), bo = vn("transitionend"), Oo = /* @__PURE__ */ new Map(), mc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  mc.push("scrollEnd");
  function Je(t, e) {
    Oo.set(t, e), on(e, [t]);
  }
  var xu = typeof reportError == "function" ? reportError : function(t) {
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
  }, Ye = [], kn = 0, gc = 0;
  function Hu() {
    for (var t = kn, e = gc = kn = 0; e < t; ) {
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
      u !== 0 && Eo(l, a, u);
    }
  }
  function Yu(t, e, l, n) {
    Ye[kn++] = t, Ye[kn++] = e, Ye[kn++] = l, Ye[kn++] = n, gc |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function pc(t, e, l, n) {
    return Yu(t, e, l, n), Ku(t);
  }
  function hn(t, e) {
    return Yu(t, null, null, e), Ku(t);
  }
  function Eo(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var a = !1, u = t.return; u !== null; )
      u.childLanes |= l, n = u.alternate, n !== null && (n.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (a = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, a && e !== null && (a = 31 - be(l), t = u.hiddenUpdates, n = t[a], n === null ? t[a] = [e] : n.push(e), e.lane = l | 536870912), u) : null;
  }
  function Ku(t) {
    if (50 < au)
      throw au = 0, Rf = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Fn = {};
  function jy(t, e, l, n) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ee(t, e, l, n) {
    return new jy(t, e, l, n);
  }
  function _c(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function sl(t, e) {
    var l = t.alternate;
    return l === null ? (l = Ee(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function Mo(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Lu(t, e, l, n, a, u) {
    var i = 0;
    if (n = t, typeof t == "function") _c(t) && (i = 1);
    else if (typeof t == "string")
      i = q0(
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
        case F:
          return t = Ee(13, l, e, a), t.elementType = F, t.lanes = u, t;
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
              case k:
                i = 16, n = null;
                break t;
            }
          i = 29, l = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return e = Ee(i, l, e, a), e.elementType = t, e.type = n, e.lanes = u, e;
  }
  function yn(t, e, l, n) {
    return t = Ee(7, t, n, e), t.lanes = l, t;
  }
  function Sc(t, e, l) {
    return t = Ee(6, t, null, e), t.lanes = l, t;
  }
  function Ao(t) {
    var e = Ee(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function bc(t, e, l) {
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
  var zo = /* @__PURE__ */ new WeakMap();
  function Ke(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = zo.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Nt(e)
      }, zo.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Nt(e)
    };
  }
  var In = [], Pn = 0, Gu = null, Ha = 0, Le = [], Ge = 0, Bl = null, el = 1, ll = "";
  function dl(t, e) {
    In[Pn++] = Ha, In[Pn++] = Gu, Gu = t, Ha = e;
  }
  function To(t, e, l) {
    Le[Ge++] = el, Le[Ge++] = ll, Le[Ge++] = Bl, Bl = t;
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
  function Oc(t) {
    t.return !== null && (dl(t, 1), To(t, 1, 0));
  }
  function Ec(t) {
    for (; t === Gu; )
      Gu = In[--Pn], In[Pn] = null, Ha = In[--Pn], In[Pn] = null;
    for (; t === Bl; )
      Bl = Le[--Ge], Le[Ge] = null, ll = Le[--Ge], Le[Ge] = null, el = Le[--Ge], Le[Ge] = null;
  }
  function Ro(t, e) {
    Le[Ge++] = el, Le[Ge++] = ll, Le[Ge++] = Bl, el = e.id, ll = e.overflow, Bl = t;
  }
  var ne = null, Bt = null, St = !1, ql = null, Ve = !1, Mc = Error(r(519));
  function xl(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ya(Ke(e, t)), Mc;
  }
  function Do(t) {
    var e = t.stateNode, l = t.type, n = t.memoizedProps;
    switch (e[le] = t, e[de] = n, l) {
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
        for (l = 0; l < iu.length; l++)
          mt(iu[l], e);
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
        mt("invalid", e), Gr(
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
        mt("invalid", e), Qr(e, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || n.suppressHydrationWarning === !0 || wd(e.textContent, l) ? (n.popover != null && (mt("beforetoggle", e), mt("toggle", e)), n.onScroll != null && mt("scroll", e), n.onScrollEnd != null && mt("scrollend", e), n.onClick != null && (e.onclick = rl), e = !0) : e = !1, e || xl(t, !0);
  }
  function jo(t) {
    for (ne = t.return; ne; )
      switch (ne.tag) {
        case 5:
        case 31:
        case 13:
          Ve = !1;
          return;
        case 27:
        case 3:
          Ve = !0;
          return;
        default:
          ne = ne.return;
      }
  }
  function ta(t) {
    if (t !== ne) return !1;
    if (!St) return jo(t), St = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Qf(t.type, t.memoizedProps)), l = !l), l && Bt && xl(t), jo(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Bt = ev(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Bt = ev(t);
    } else
      e === 27 ? (e = Bt, kl(t.type) ? (t = $f, $f = null, Bt = t) : Bt = e) : Bt = ne ? Xe(t.stateNode.nextSibling) : null;
    return !0;
  }
  function mn() {
    Bt = ne = null, St = !1;
  }
  function Ac() {
    var t = ql;
    return t !== null && (ge === null ? ge = t : ge.push.apply(
      ge,
      t
    ), ql = null), t;
  }
  function Ya(t) {
    ql === null ? ql = [t] : ql.push(t);
  }
  var zc = O(null), gn = null, vl = null;
  function Hl(t, e, l) {
    et(zc, e._currentValue), e._currentValue = l;
  }
  function hl(t) {
    t._currentValue = zc.current, J(zc);
  }
  function Tc(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function Rc(t, e, l, n) {
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
              u.lanes |= l, o = u.alternate, o !== null && (o.lanes |= l), Tc(
                u.return,
                l,
                t
              ), n || (i = null);
              break t;
            }
          u = o.next;
        }
      } else if (a.tag === 18) {
        if (i = a.return, i === null) throw Error(r(341));
        i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), Tc(i, l, t), i = null;
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
  function ea(t, e, l, n) {
    t = null;
    for (var a = e, u = !1; a !== null; ) {
      if (!u) {
        if ((a.flags & 524288) !== 0) u = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var i = a.alternate;
        if (i === null) throw Error(r(387));
        if (i = i.memoizedProps, i !== null) {
          var o = a.type;
          Oe(a.pendingProps.value, i.value) || (t !== null ? t.push(o) : t = [o]);
        }
      } else if (a === bt.current) {
        if (i = a.alternate, i === null) throw Error(r(387));
        i.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(su) : t = [su]);
      }
      a = a.return;
    }
    t !== null && Rc(
      e,
      t,
      l,
      n
    ), e.flags |= 262144;
  }
  function Vu(t) {
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
    return Co(gn, t);
  }
  function Qu(t, e) {
    return gn === null && pn(t), Co(t, e);
  }
  function Co(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, vl === null) {
      if (t === null) throw Error(r(308));
      vl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else vl = vl.next = e;
    return l;
  }
  var Cy = typeof AbortController < "u" ? AbortController : function() {
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
  }, Ny = f.unstable_scheduleCallback, Uy = f.unstable_NormalPriority, wt = {
    $$typeof: H,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Dc() {
    return {
      controller: new Cy(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ka(t) {
    t.refCount--, t.refCount === 0 && Ny(Uy, function() {
      t.controller.abort();
    });
  }
  var La = null, jc = 0, la = 0, na = null;
  function By(t, e) {
    if (La === null) {
      var l = La = [];
      jc = 0, la = Bf(), na = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return jc++, e.then(No, No), e;
  }
  function No() {
    if (--jc === 0 && La !== null) {
      na !== null && (na.status = "fulfilled");
      var t = La;
      La = null, la = 0, na = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function qy(t, e) {
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
  var Uo = N.S;
  N.S = function(t, e) {
    md = Ht(), typeof e == "object" && e !== null && typeof e.then == "function" && By(t, e), Uo !== null && Uo(t, e);
  };
  var _n = O(null);
  function Cc() {
    var t = _n.current;
    return t !== null ? t : Ut.pooledCache;
  }
  function Xu(t, e) {
    e === null ? et(_n, _n.current) : et(_n, e.pool);
  }
  function Bo() {
    var t = Cc();
    return t === null ? null : { parent: wt._currentValue, pool: t };
  }
  var aa = Error(r(460)), Nc = Error(r(474)), Zu = Error(r(542)), wu = { then: function() {
  } };
  function qo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function xo(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(rl, rl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Yo(t), t;
      default:
        if (typeof e.status == "string") e.then(rl, rl);
        else {
          if (t = Ut, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
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
            throw t = e.reason, Yo(t), t;
        }
        throw bn = e, aa;
    }
  }
  function Sn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (bn = l, aa) : l;
    }
  }
  var bn = null;
  function Ho() {
    if (bn === null) throw Error(r(459));
    var t = bn;
    return bn = null, t;
  }
  function Yo(t) {
    if (t === aa || t === Zu)
      throw Error(r(483));
  }
  var ua = null, Ga = 0;
  function Ju(t) {
    var e = Ga;
    return Ga += 1, ua === null && (ua = []), xo(ua, t, e);
  }
  function Va(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function $u(t, e) {
    throw e.$$typeof === R ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Ko(t) {
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
      return T = sl(T, E), T.index = 0, T.sibling = null, T;
    }
    function u(T, E, U) {
      return T.index = U, t ? (U = T.alternate, U !== null ? (U = U.index, U < E ? (T.flags |= 67108866, E) : U) : (T.flags |= 67108866, E)) : (T.flags |= 1048576, E);
    }
    function i(T) {
      return t && T.alternate === null && (T.flags |= 67108866), T;
    }
    function o(T, E, U, Z) {
      return E === null || E.tag !== 6 ? (E = Sc(U, T.mode, Z), E.return = T, E) : (E = a(E, U), E.return = T, E);
    }
    function _(T, E, U, Z) {
      var it = U.type;
      return it === C ? G(
        T,
        E,
        U.props.children,
        Z,
        U.key
      ) : E !== null && (E.elementType === it || typeof it == "object" && it !== null && it.$$typeof === k && Sn(it) === E.type) ? (E = a(E, U.props), Va(E, U), E.return = T, E) : (E = Lu(
        U.type,
        U.key,
        U.props,
        null,
        T.mode,
        Z
      ), Va(E, U), E.return = T, E);
    }
    function B(T, E, U, Z) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== U.containerInfo || E.stateNode.implementation !== U.implementation ? (E = bc(U, T.mode, Z), E.return = T, E) : (E = a(E, U.children || []), E.return = T, E);
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
        return E = Sc(
          "" + E,
          T.mode,
          U
        ), E.return = T, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case M:
            return U = Lu(
              E.type,
              E.key,
              E.props,
              null,
              T.mode,
              U
            ), Va(U, E), U.return = T, U;
          case j:
            return E = bc(
              E,
              T.mode,
              U
            ), E.return = T, E;
          case k:
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
          return $(T, Ju(E), U);
        if (E.$$typeof === H)
          return $(
            T,
            Qu(T, E),
            U
          );
        $u(T, E);
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
          case k:
            return U = Sn(U), x(T, E, U, Z);
        }
        if (Y(U) || w(U))
          return it !== null ? null : G(T, E, U, Z, null);
        if (typeof U.then == "function")
          return x(
            T,
            E,
            Ju(U),
            Z
          );
        if (U.$$typeof === H)
          return x(
            T,
            E,
            Qu(T, U),
            Z
          );
        $u(T, U);
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
          case k:
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
            Ju(Z),
            it
          );
        if (Z.$$typeof === H)
          return K(
            T,
            E,
            U,
            Qu(E, Z),
            it
          );
        $u(E, Z);
      }
      return null;
    }
    function nt(T, E, U, Z) {
      for (var it = null, Et = null, at = E, vt = E = 0, _t = null; at !== null && vt < U.length; vt++) {
        at.index > vt ? (_t = at, at = null) : _t = at.sibling;
        var Mt = x(
          T,
          at,
          U[vt],
          Z
        );
        if (Mt === null) {
          at === null && (at = _t);
          break;
        }
        t && at && Mt.alternate === null && e(T, at), E = u(Mt, E, vt), Et === null ? it = Mt : Et.sibling = Mt, Et = Mt, at = _t;
      }
      if (vt === U.length)
        return l(T, at), St && dl(T, vt), it;
      if (at === null) {
        for (; vt < U.length; vt++)
          at = $(T, U[vt], Z), at !== null && (E = u(
            at,
            E,
            vt
          ), Et === null ? it = at : Et.sibling = at, Et = at);
        return St && dl(T, vt), it;
      }
      for (at = n(at); vt < U.length; vt++)
        _t = K(
          at,
          T,
          vt,
          U[vt],
          Z
        ), _t !== null && (t && _t.alternate !== null && at.delete(
          _t.key === null ? vt : _t.key
        ), E = u(
          _t,
          E,
          vt
        ), Et === null ? it = _t : Et.sibling = _t, Et = _t);
      return t && at.forEach(function(en) {
        return e(T, en);
      }), St && dl(T, vt), it;
    }
    function ft(T, E, U, Z) {
      if (U == null) throw Error(r(151));
      for (var it = null, Et = null, at = E, vt = E = 0, _t = null, Mt = U.next(); at !== null && !Mt.done; vt++, Mt = U.next()) {
        at.index > vt ? (_t = at, at = null) : _t = at.sibling;
        var en = x(T, at, Mt.value, Z);
        if (en === null) {
          at === null && (at = _t);
          break;
        }
        t && at && en.alternate === null && e(T, at), E = u(en, E, vt), Et === null ? it = en : Et.sibling = en, Et = en, at = _t;
      }
      if (Mt.done)
        return l(T, at), St && dl(T, vt), it;
      if (at === null) {
        for (; !Mt.done; vt++, Mt = U.next())
          Mt = $(T, Mt.value, Z), Mt !== null && (E = u(Mt, E, vt), Et === null ? it = Mt : Et.sibling = Mt, Et = Mt);
        return St && dl(T, vt), it;
      }
      for (at = n(at); !Mt.done; vt++, Mt = U.next())
        Mt = K(at, T, vt, Mt.value, Z), Mt !== null && (t && Mt.alternate !== null && at.delete(Mt.key === null ? vt : Mt.key), E = u(Mt, E, vt), Et === null ? it = Mt : Et.sibling = Mt, Et = Mt);
      return t && at.forEach(function(w0) {
        return e(T, w0);
      }), St && dl(T, vt), it;
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
                  } else if (E.elementType === it || typeof it == "object" && it !== null && it.$$typeof === k && Sn(it) === E.type) {
                    l(
                      T,
                      E.sibling
                    ), Z = a(E, U.props), Va(Z, U), Z.return = T, T = Z;
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
              ), Z.return = T, T = Z) : (Z = Lu(
                U.type,
                U.key,
                U.props,
                null,
                T.mode,
                Z
              ), Va(Z, U), Z.return = T, T = Z);
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
              Z = bc(U, T.mode, Z), Z.return = T, T = Z;
            }
            return i(T);
          case k:
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
          if (it = w(U), typeof it != "function") throw Error(r(150));
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
            Ju(U),
            Z
          );
        if (U.$$typeof === H)
          return Ct(
            T,
            E,
            Qu(T, U),
            Z
          );
        $u(T, U);
      }
      return typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint" ? (U = "" + U, E !== null && E.tag === 6 ? (l(T, E.sibling), Z = a(E, U), Z.return = T, T = Z) : (l(T, E), Z = Sc(U, T.mode, Z), Z.return = T, T = Z), i(T)) : l(T, E);
    }
    return function(T, E, U, Z) {
      try {
        Ga = 0;
        var it = Ct(
          T,
          E,
          U,
          Z
        );
        return ua = null, it;
      } catch (at) {
        if (at === aa || at === Zu) throw at;
        var Et = Ee(29, at, null, T.mode);
        return Et.lanes = Z, Et.return = T, Et;
      } finally {
      }
    };
  }
  var On = Ko(!0), Lo = Ko(!1), Yl = !1;
  function Uc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Bc(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Kl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ll(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (At & 2) !== 0) {
      var a = n.pending;
      return a === null ? e.next = e : (e.next = a.next, a.next = e), n.pending = e, e = Ku(t), Eo(t, null, l), e;
    }
    return Yu(t, n, e, l), Ku(t);
  }
  function Qa(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, jr(t, l);
    }
  }
  function qc(t, e) {
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
  var xc = !1;
  function Xa() {
    if (xc) {
      var t = na;
      if (t !== null) throw t;
    }
  }
  function Za(t, e, l, n) {
    xc = !1;
    var a = t.updateQueue;
    Yl = !1;
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
          x !== 0 && x === la && (xc = !0), G !== null && (G = G.next = {
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
                $ = b({}, $, x);
                break t;
              case 2:
                Yl = !0;
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
      G === null && (_ = $), a.baseState = _, a.firstBaseUpdate = B, a.lastBaseUpdate = G, u === null && (a.shared.lanes = 0), Zl |= i, t.lanes = i, t.memoizedState = $;
    }
  }
  function Go(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function Vo(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Go(l[t], e);
  }
  var ia = O(null), Wu = O(0);
  function Qo(t, e) {
    t = El, et(Wu, t), et(ia, e), El = t | e.baseLanes;
  }
  function Hc() {
    et(Wu, El), et(ia, ia.current);
  }
  function Yc() {
    El = Wu.current, J(ia), J(Wu);
  }
  var Me = O(null), Qe = null;
  function Gl(t) {
    var e = t.alternate;
    et(Qt, Qt.current & 1), et(Me, t), Qe === null && (e === null || ia.current !== null || e.memoizedState !== null) && (Qe = t);
  }
  function Kc(t) {
    et(Qt, Qt.current), et(Me, t), Qe === null && (Qe = t);
  }
  function Xo(t) {
    t.tag === 22 ? (et(Qt, Qt.current), et(Me, t), Qe === null && (Qe = t)) : Vl();
  }
  function Vl() {
    et(Qt, Qt.current), et(Me, Me.current);
  }
  function Ae(t) {
    J(Me), Qe === t && (Qe = null), J(Qt);
  }
  var Qt = O(0);
  function ku(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || wf(l) || Jf(l)))
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
  var yl = 0, dt = null, Dt = null, Jt = null, Fu = !1, ca = !1, En = !1, Iu = 0, wa = 0, fa = null, xy = 0;
  function Kt() {
    throw Error(r(321));
  }
  function Lc(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Oe(t[l], e[l])) return !1;
    return !0;
  }
  function Gc(t, e, l, n, a, u) {
    return yl = u, dt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, N.H = t === null || t.memoizedState === null ? Ts : lf, En = !1, u = l(n, a), En = !1, ca && (u = wo(
      e,
      l,
      n,
      a
    )), Zo(t), u;
  }
  function Zo(t) {
    N.H = Wa;
    var e = Dt !== null && Dt.next !== null;
    if (yl = 0, Jt = Dt = dt = null, Fu = !1, wa = 0, fa = null, e) throw Error(r(300));
    t === null || $t || (t = t.dependencies, t !== null && Vu(t) && ($t = !0));
  }
  function wo(t, e, l, n) {
    dt = t;
    var a = 0;
    do {
      if (ca && (fa = null), wa = 0, ca = !1, 25 <= a) throw Error(r(301));
      if (a += 1, Jt = Dt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      N.H = Rs, u = e(l, n);
    } while (ca);
    return u;
  }
  function Hy() {
    var t = N.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Ja(e) : e, t = t.useState()[0], (Dt !== null ? Dt.memoizedState : null) !== t && (dt.flags |= 1024), e;
  }
  function Vc() {
    var t = Iu !== 0;
    return Iu = 0, t;
  }
  function Qc(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Xc(t) {
    if (Fu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Fu = !1;
    }
    yl = 0, Jt = Dt = dt = null, ca = !1, wa = Iu = 0, fa = null;
  }
  function re() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Jt === null ? dt.memoizedState = Jt = t : Jt = Jt.next = t, Jt;
  }
  function Xt() {
    if (Dt === null) {
      var t = dt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Dt.next;
    var e = Jt === null ? dt.memoizedState : Jt.next;
    if (e !== null)
      Jt = e, Dt = t;
    else {
      if (t === null)
        throw dt.alternate === null ? Error(r(467)) : Error(r(310));
      Dt = t, t = {
        memoizedState: Dt.memoizedState,
        baseState: Dt.baseState,
        baseQueue: Dt.baseQueue,
        queue: Dt.queue,
        next: null
      }, Jt === null ? dt.memoizedState = Jt = t : Jt = Jt.next = t;
    }
    return Jt;
  }
  function Pu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ja(t) {
    var e = wa;
    return wa += 1, fa === null && (fa = []), t = xo(fa, t, e), e = dt, (Jt === null ? e.memoizedState : Jt.next) === null && (e = e.alternate, N.H = e === null || e.memoizedState === null ? Ts : lf), t;
  }
  function ti(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ja(t);
      if (t.$$typeof === H) return ae(t);
    }
    throw Error(r(438, String(t)));
  }
  function Zc(t) {
    var e = null, l = dt.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var n = dt.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (e = {
        data: n.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Pu(), dt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++)
        l[n] = A;
    return e.index++, l;
  }
  function ml(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ei(t) {
    var e = Xt();
    return wc(e, Dt, t);
  }
  function wc(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(r(311));
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
        if ($ !== B.lane ? (pt & $) === $ : (yl & $) === $) {
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
            }), $ === la && (G = !0);
          else if ((yl & x) === x) {
            B = B.next, x === la && (G = !0);
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
            }, _ === null ? (o = _ = $, i = u) : _ = _.next = $, dt.lanes |= x, Zl |= x;
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
          }, _ === null ? (o = _ = x, i = u) : _ = _.next = x, dt.lanes |= $, Zl |= $;
        B = B.next;
      } while (B !== null && B !== e);
      if (_ === null ? i = u : _.next = o, !Oe(u, t.memoizedState) && ($t = !0, G && (l = na, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = _, n.lastRenderedState = u;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function Jc(t) {
    var e = Xt(), l = e.queue;
    if (l === null) throw Error(r(311));
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
  function Jo(t, e, l) {
    var n = dt, a = Xt(), u = St;
    if (u) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = e();
    var i = !Oe(
      (Dt || a).memoizedState,
      l
    );
    if (i && (a.memoizedState = l, $t = !0), a = a.queue, kc(ko.bind(null, n, a, t), [
      t
    ]), a.getSnapshot !== e || i || Jt !== null && Jt.memoizedState.tag & 1) {
      if (n.flags |= 2048, ra(
        9,
        { destroy: void 0 },
        Wo.bind(
          null,
          n,
          a,
          l,
          e
        ),
        null
      ), Ut === null) throw Error(r(349));
      u || (yl & 127) !== 0 || $o(n, e, l);
    }
    return l;
  }
  function $o(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = dt.updateQueue, e === null ? (e = Pu(), dt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function Wo(t, e, l, n) {
    e.value = l, e.getSnapshot = n, Fo(e) && Io(t);
  }
  function ko(t, e, l) {
    return l(function() {
      Fo(e) && Io(t);
    });
  }
  function Fo(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Oe(t, l);
    } catch {
      return !0;
    }
  }
  function Io(t) {
    var e = hn(t, 2);
    e !== null && pe(e, t, 2);
  }
  function $c(t) {
    var e = re();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), En) {
        Cl(!0);
        try {
          l();
        } finally {
          Cl(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ml,
      lastRenderedState: t
    }, e;
  }
  function Po(t, e, l, n) {
    return t.baseState = l, wc(
      t,
      Dt,
      typeof n == "function" ? n : ml
    );
  }
  function Yy(t, e, l, n, a) {
    if (ai(t)) throw Error(r(485));
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
      N.T !== null ? l(!0) : u.isTransition = !1, n(u), l = e.pending, l === null ? (u.next = e.pending = u, ts(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function ts(t, e) {
    var l = e.action, n = e.payload, a = t.state;
    if (e.isTransition) {
      var u = N.T, i = {};
      N.T = i;
      try {
        var o = l(a, n), _ = N.S;
        _ !== null && _(i, o), es(t, e, o);
      } catch (B) {
        Wc(t, e, B);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), N.T = u;
      }
    } else
      try {
        u = l(a, n), es(t, e, u);
      } catch (B) {
        Wc(t, e, B);
      }
  }
  function es(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        ls(t, e, n);
      },
      function(n) {
        return Wc(t, e, n);
      }
    ) : ls(t, e, l);
  }
  function ls(t, e, l) {
    e.status = "fulfilled", e.value = l, ns(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, ts(t, l)));
  }
  function Wc(t, e, l) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        e.status = "rejected", e.reason = l, ns(e), e = e.next;
      while (e !== n);
    }
    t.action = null;
  }
  function ns(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function as(t, e) {
    return e;
  }
  function us(t, e) {
    if (St) {
      var l = Ut.formState;
      if (l !== null) {
        t: {
          var n = dt;
          if (St) {
            if (Bt) {
              e: {
                for (var a = Bt, u = Ve; a.nodeType !== 8; ) {
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
            xl(n);
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
      lastRenderedReducer: as,
      lastRenderedState: e
    }, l.queue = n, l = Ms.bind(
      null,
      dt,
      n
    ), n.dispatch = l, n = $c(!1), u = ef.bind(
      null,
      dt,
      !1,
      n.queue
    ), n = re(), a = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, l = Yy.bind(
      null,
      dt,
      a,
      u,
      l
    ), a.dispatch = l, n.memoizedState = t, [e, l, !1];
  }
  function is(t) {
    var e = Xt();
    return cs(e, Dt, t);
  }
  function cs(t, e, l) {
    if (e = wc(
      t,
      e,
      as
    )[0], t = ei(ml)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var n = Ja(e);
      } catch (i) {
        throw i === aa ? Zu : i;
      }
    else n = e;
    e = Xt();
    var a = e.queue, u = a.dispatch;
    return l !== e.memoizedState && (dt.flags |= 2048, ra(
      9,
      { destroy: void 0 },
      Ky.bind(null, a, l),
      null
    )), [n, u, t];
  }
  function Ky(t, e) {
    t.action = e;
  }
  function fs(t) {
    var e = Xt(), l = Dt;
    if (l !== null)
      return cs(e, l, t);
    Xt(), e = e.memoizedState, l = Xt();
    var n = l.queue.dispatch;
    return l.memoizedState = t, [e, n, !1];
  }
  function ra(t, e, l, n) {
    return t = { tag: t, create: l, deps: n, inst: e, next: null }, e = dt.updateQueue, e === null && (e = Pu(), dt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (n = l.next, l.next = t, t.next = n, e.lastEffect = t), t;
  }
  function rs() {
    return Xt().memoizedState;
  }
  function li(t, e, l, n) {
    var a = re();
    dt.flags |= t, a.memoizedState = ra(
      1 | e,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function ni(t, e, l, n) {
    var a = Xt();
    n = n === void 0 ? null : n;
    var u = a.memoizedState.inst;
    Dt !== null && n !== null && Lc(n, Dt.memoizedState.deps) ? a.memoizedState = ra(e, u, l, n) : (dt.flags |= t, a.memoizedState = ra(
      1 | e,
      u,
      l,
      n
    ));
  }
  function os(t, e) {
    li(8390656, 8, t, e);
  }
  function kc(t, e) {
    ni(2048, 8, t, e);
  }
  function Ly(t) {
    dt.flags |= 4;
    var e = dt.updateQueue;
    if (e === null)
      e = Pu(), dt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function ss(t) {
    var e = Xt().memoizedState;
    return Ly({ ref: e, nextImpl: t }), function() {
      if ((At & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function ds(t, e) {
    return ni(4, 2, t, e);
  }
  function vs(t, e) {
    return ni(4, 4, t, e);
  }
  function hs(t, e) {
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
  function ys(t, e, l) {
    l = l != null ? l.concat([t]) : null, ni(4, 4, hs.bind(null, e, t), l);
  }
  function Fc() {
  }
  function ms(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && Lc(e, n[1]) ? n[0] : (l.memoizedState = [t, e], t);
  }
  function gs(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && Lc(e, n[1]))
      return n[0];
    if (n = t(), En) {
      Cl(!0);
      try {
        t();
      } finally {
        Cl(!1);
      }
    }
    return l.memoizedState = [n, e], n;
  }
  function Ic(t, e, l) {
    return l === void 0 || (yl & 1073741824) !== 0 && (pt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = pd(), dt.lanes |= t, Zl |= t, l);
  }
  function ps(t, e, l, n) {
    return Oe(l, e) ? l : ia.current !== null ? (t = Ic(t, l, n), Oe(t, e) || ($t = !0), t) : (yl & 42) === 0 || (yl & 1073741824) !== 0 && (pt & 261930) === 0 ? ($t = !0, t.memoizedState = l) : (t = pd(), dt.lanes |= t, Zl |= t, e);
  }
  function _s(t, e, l, n, a) {
    var u = Q.p;
    Q.p = u !== 0 && 8 > u ? u : 8;
    var i = N.T, o = {};
    N.T = o, ef(t, !1, e, l);
    try {
      var _ = a(), B = N.S;
      if (B !== null && B(o, _), _ !== null && typeof _ == "object" && typeof _.then == "function") {
        var G = qy(
          _,
          n
        );
        $a(
          t,
          e,
          G,
          Re(t)
        );
      } else
        $a(
          t,
          e,
          n,
          Re(t)
        );
    } catch ($) {
      $a(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: $ },
        Re()
      );
    } finally {
      Q.p = u, i !== null && o.types !== null && (i.types = o.types), N.T = i;
    }
  }
  function Gy() {
  }
  function Pc(t, e, l, n) {
    if (t.tag !== 5) throw Error(r(476));
    var a = Ss(t).queue;
    _s(
      t,
      a,
      e,
      ut,
      l === null ? Gy : function() {
        return bs(t), l(n);
      }
    );
  }
  function Ss(t) {
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
        lastRenderedReducer: ml,
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
        lastRenderedReducer: ml,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function bs(t) {
    var e = Ss(t);
    e.next === null && (e = t.alternate.memoizedState), $a(
      t,
      e.next.queue,
      {},
      Re()
    );
  }
  function tf() {
    return ae(su);
  }
  function Os() {
    return Xt().memoizedState;
  }
  function Es() {
    return Xt().memoizedState;
  }
  function Vy(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Re();
          t = Kl(l);
          var n = Ll(e, t, l);
          n !== null && (pe(n, e, l), Qa(n, e, l)), e = { cache: Dc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Qy(t, e, l) {
    var n = Re();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ai(t) ? As(e, l) : (l = pc(t, e, l, n), l !== null && (pe(l, t, n), zs(l, e, n)));
  }
  function Ms(t, e, l) {
    var n = Re();
    $a(t, e, l, n);
  }
  function $a(t, e, l, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ai(t)) As(e, a);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, o = u(i, l);
          if (a.hasEagerState = !0, a.eagerState = o, Oe(o, i))
            return Yu(t, e, a, 0), Ut === null && Hu(), !1;
        } catch {
        } finally {
        }
      if (l = pc(t, e, a, n), l !== null)
        return pe(l, t, n), zs(l, e, n), !0;
    }
    return !1;
  }
  function ef(t, e, l, n) {
    if (n = {
      lane: 2,
      revertLane: Bf(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ai(t)) {
      if (e) throw Error(r(479));
    } else
      e = pc(
        t,
        l,
        n,
        2
      ), e !== null && pe(e, t, 2);
  }
  function ai(t) {
    var e = t.alternate;
    return t === dt || e !== null && e === dt;
  }
  function As(t, e) {
    ca = Fu = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function zs(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, jr(t, l);
    }
  }
  var Wa = {
    readContext: ae,
    use: ti,
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
  Wa.useEffectEvent = Kt;
  var Ts = {
    readContext: ae,
    use: ti,
    useCallback: function(t, e) {
      return re().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ae,
    useEffect: os,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, li(
        4194308,
        4,
        hs.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return li(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      li(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = re();
      e = e === void 0 ? null : e;
      var n = t();
      if (En) {
        Cl(!0);
        try {
          t();
        } finally {
          Cl(!1);
        }
      }
      return l.memoizedState = [n, e], n;
    },
    useReducer: function(t, e, l) {
      var n = re();
      if (l !== void 0) {
        var a = l(e);
        if (En) {
          Cl(!0);
          try {
            l(e);
          } finally {
            Cl(!1);
          }
        }
      } else a = e;
      return n.memoizedState = n.baseState = a, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a
      }, n.queue = t, t = t.dispatch = Qy.bind(
        null,
        dt,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var e = re();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = $c(t);
      var e = t.queue, l = Ms.bind(null, dt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Fc,
    useDeferredValue: function(t, e) {
      var l = re();
      return Ic(l, t, e);
    },
    useTransition: function() {
      var t = $c(!1);
      return t = _s.bind(
        null,
        dt,
        t.queue,
        !0,
        !1
      ), re().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var n = dt, a = re();
      if (St) {
        if (l === void 0)
          throw Error(r(407));
        l = l();
      } else {
        if (l = e(), Ut === null)
          throw Error(r(349));
        (pt & 127) !== 0 || $o(n, e, l);
      }
      a.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return a.queue = u, os(ko.bind(null, n, u, t), [
        t
      ]), n.flags |= 2048, ra(
        9,
        { destroy: void 0 },
        Wo.bind(
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
        l = (n & ~(1 << 32 - be(n) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = Iu++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = xy++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: tf,
    useFormState: us,
    useActionState: us,
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
      return e.queue = l, e = ef.bind(
        null,
        dt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Zc,
    useCacheRefresh: function() {
      return re().memoizedState = Vy.bind(
        null,
        dt
      );
    },
    useEffectEvent: function(t) {
      var e = re(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((At & 2) !== 0)
          throw Error(r(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, lf = {
    readContext: ae,
    use: ti,
    useCallback: ms,
    useContext: ae,
    useEffect: kc,
    useImperativeHandle: ys,
    useInsertionEffect: ds,
    useLayoutEffect: vs,
    useMemo: gs,
    useReducer: ei,
    useRef: rs,
    useState: function() {
      return ei(ml);
    },
    useDebugValue: Fc,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return ps(
        l,
        Dt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ei(ml)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ja(t),
        e
      ];
    },
    useSyncExternalStore: Jo,
    useId: Os,
    useHostTransitionStatus: tf,
    useFormState: is,
    useActionState: is,
    useOptimistic: function(t, e) {
      var l = Xt();
      return Po(l, Dt, t, e);
    },
    useMemoCache: Zc,
    useCacheRefresh: Es
  };
  lf.useEffectEvent = ss;
  var Rs = {
    readContext: ae,
    use: ti,
    useCallback: ms,
    useContext: ae,
    useEffect: kc,
    useImperativeHandle: ys,
    useInsertionEffect: ds,
    useLayoutEffect: vs,
    useMemo: gs,
    useReducer: Jc,
    useRef: rs,
    useState: function() {
      return Jc(ml);
    },
    useDebugValue: Fc,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return Dt === null ? Ic(l, t, e) : ps(
        l,
        Dt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Jc(ml)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ja(t),
        e
      ];
    },
    useSyncExternalStore: Jo,
    useId: Os,
    useHostTransitionStatus: tf,
    useFormState: fs,
    useActionState: fs,
    useOptimistic: function(t, e) {
      var l = Xt();
      return Dt !== null ? Po(l, Dt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Zc,
    useCacheRefresh: Es
  };
  Rs.useEffectEvent = ss;
  function nf(t, e, l, n) {
    e = t.memoizedState, l = l(n, e), l = l == null ? e : b({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var af = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var n = Re(), a = Kl(n);
      a.payload = e, l != null && (a.callback = l), e = Ll(t, a, n), e !== null && (pe(e, t, n), Qa(e, t, n));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var n = Re(), a = Kl(n);
      a.tag = 1, a.payload = e, l != null && (a.callback = l), e = Ll(t, a, n), e !== null && (pe(e, t, n), Qa(e, t, n));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Re(), n = Kl(l);
      n.tag = 2, e != null && (n.callback = e), e = Ll(t, n, l), e !== null && (pe(e, t, l), Qa(e, t, l));
    }
  };
  function Ds(t, e, l, n, a, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, u, i) : e.prototype && e.prototype.isPureReactComponent ? !qa(l, n) || !qa(a, u) : !0;
  }
  function js(t, e, l, n) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, n), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, n), e.state !== t && af.enqueueReplaceState(e, e.state, null);
  }
  function Mn(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var n in e)
        n !== "ref" && (l[n] = e[n]);
    }
    if (t = t.defaultProps) {
      l === e && (l = b({}, l));
      for (var a in t)
        l[a] === void 0 && (l[a] = t[a]);
    }
    return l;
  }
  function Cs(t) {
    xu(t);
  }
  function Ns(t) {
    console.error(t);
  }
  function Us(t) {
    xu(t);
  }
  function ui(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Bs(t, e, l) {
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
  function uf(t, e, l) {
    return l = Kl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      ui(t, e);
    }, l;
  }
  function qs(t) {
    return t = Kl(t), t.tag = 3, t;
  }
  function xs(t, e, l, n) {
    var a = l.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = n.value;
      t.payload = function() {
        return a(u);
      }, t.callback = function() {
        Bs(e, l, n);
      };
    }
    var i = l.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Bs(e, l, n), typeof a != "function" && (wl === null ? wl = /* @__PURE__ */ new Set([this]) : wl.add(this));
      var o = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: o !== null ? o : ""
      });
    });
  }
  function Xy(t, e, l, n, a) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (e = l.alternate, e !== null && ea(
        e,
        l,
        a,
        !0
      ), l = Me.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Qe === null ? gi() : l.alternate === null && Lt === 0 && (Lt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, n === wu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : e.add(n), Cf(t, n, a)), !1;
          case 22:
            return l.flags |= 65536, n === wu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), Cf(t, n, a)), !1;
        }
        throw Error(r(435, l.tag));
      }
      return Cf(t, n, a), gi(), !1;
    }
    if (St)
      return e = Me.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = a, n !== Mc && (t = Error(r(422), { cause: n }), Ya(Ke(t, l)))) : (n !== Mc && (e = Error(r(423), {
        cause: n
      }), Ya(
        Ke(e, l)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = Ke(n, l), a = uf(
        t.stateNode,
        n,
        a
      ), qc(t, a), Lt !== 4 && (Lt = 2)), !1;
    var u = Error(r(520), { cause: n });
    if (u = Ke(u, l), nu === null ? nu = [u] : nu.push(u), Lt !== 4 && (Lt = 2), e === null) return !0;
    n = Ke(n, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = a & -a, l.lanes |= t, t = uf(l.stateNode, n, t), qc(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (wl === null || !wl.has(u))))
            return l.flags |= 65536, a &= -a, l.lanes |= a, a = qs(a), xs(
              a,
              t,
              l,
              n
            ), qc(l, a), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var cf = Error(r(461)), $t = !1;
  function ue(t, e, l, n) {
    e.child = t === null ? Lo(e, null, l, n) : On(
      e,
      t.child,
      l,
      n
    );
  }
  function Hs(t, e, l, n, a) {
    l = l.render;
    var u = e.ref;
    if ("ref" in n) {
      var i = {};
      for (var o in n)
        o !== "ref" && (i[o] = n[o]);
    } else i = n;
    return pn(e), n = Gc(
      t,
      e,
      l,
      i,
      u,
      a
    ), o = Vc(), t !== null && !$t ? (Qc(t, e, a), gl(t, e, a)) : (St && o && Oc(e), e.flags |= 1, ue(t, e, n, a), e.child);
  }
  function Ys(t, e, l, n, a) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !_c(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Ks(
        t,
        e,
        u,
        n,
        a
      )) : (t = Lu(
        l.type,
        null,
        n,
        e,
        e.mode,
        a
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !yf(t, a)) {
      var i = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : qa, l(i, n) && t.ref === e.ref)
        return gl(t, e, a);
    }
    return e.flags |= 1, t = sl(u, n), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Ks(t, e, l, n, a) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (qa(u, n) && t.ref === e.ref)
        if ($t = !1, e.pendingProps = n = u, yf(t, a))
          (t.flags & 131072) !== 0 && ($t = !0);
        else
          return e.lanes = t.lanes, gl(t, e, a);
    }
    return ff(
      t,
      e,
      l,
      n,
      a
    );
  }
  function Ls(t, e, l, n) {
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
        return Gs(
          t,
          e,
          u,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Xu(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Qo(e, u) : Hc(), Xo(e);
      else
        return n = e.lanes = 536870912, Gs(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          n
        );
    } else
      u !== null ? (Xu(e, u.cachePool), Qo(e, u), Vl(), e.memoizedState = null) : (t !== null && Xu(e, null), Hc(), Vl());
    return ue(t, e, a, l), e.child;
  }
  function ka(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Gs(t, e, l, n, a) {
    var u = Cc();
    return u = u === null ? null : { parent: wt._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && Xu(e, null), Hc(), Xo(e), t !== null && ea(t, e, n, !0), e.childLanes = a, null;
  }
  function ii(t, e) {
    return e = fi(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Vs(t, e, l) {
    return On(e, t.child, null, l), t = ii(e, e.pendingProps), t.flags |= 2, Ae(e), e.memoizedState = null, t;
  }
  function Zy(t, e, l) {
    var n = e.pendingProps, a = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (St) {
        if (n.mode === "hidden")
          return t = ii(e, n), e.lanes = 536870912, ka(null, t);
        if (Kc(e), (t = Bt) ? (t = tv(
          t,
          Ve
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Bl !== null ? { id: el, overflow: ll } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Ao(t), l.return = e, e.child = l, ne = e, Bt = null)) : t = null, t === null) throw xl(e);
        return e.lanes = 536870912, null;
      }
      return ii(e, n);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Kc(e), a)
        if (e.flags & 256)
          e.flags &= -257, e = Vs(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if ($t || ea(t, e, l, !1), a = (l & t.childLanes) !== 0, $t || a) {
        if (n = Ut, n !== null && (i = Cr(n, l), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, hn(t, i), pe(n, t, i), cf;
        gi(), e = Vs(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Bt = Xe(i.nextSibling), ne = e, St = !0, ql = null, Ve = !1, t !== null && Ro(e, t), e = ii(e, n), e.flags |= 4096;
      return e;
    }
    return t = sl(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function ci(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(r(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function ff(t, e, l, n, a) {
    return pn(e), l = Gc(
      t,
      e,
      l,
      n,
      void 0,
      a
    ), n = Vc(), t !== null && !$t ? (Qc(t, e, a), gl(t, e, a)) : (St && n && Oc(e), e.flags |= 1, ue(t, e, l, a), e.child);
  }
  function Qs(t, e, l, n, a, u) {
    return pn(e), e.updateQueue = null, l = wo(
      e,
      n,
      l,
      a
    ), Zo(t), n = Vc(), t !== null && !$t ? (Qc(t, e, u), gl(t, e, u)) : (St && n && Oc(e), e.flags |= 1, ue(t, e, l, u), e.child);
  }
  function Xs(t, e, l, n, a) {
    if (pn(e), e.stateNode === null) {
      var u = Fn, i = l.contextType;
      typeof i == "object" && i !== null && (u = ae(i)), u = new l(n, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = af, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = n, u.state = e.memoizedState, u.refs = {}, Uc(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? ae(i) : Fn, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (nf(
        e,
        l,
        i,
        n
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && af.enqueueReplaceState(u, u.state, null), Za(e, n, u, a), Xa(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !0;
    } else if (t === null) {
      u = e.stateNode;
      var o = e.memoizedProps, _ = Mn(l, o);
      u.props = _;
      var B = u.context, G = l.contextType;
      i = Fn, typeof G == "object" && G !== null && (i = ae(G));
      var $ = l.getDerivedStateFromProps;
      G = typeof $ == "function" || typeof u.getSnapshotBeforeUpdate == "function", o = e.pendingProps !== o, G || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (o || B !== i) && js(
        e,
        u,
        n,
        i
      ), Yl = !1;
      var x = e.memoizedState;
      u.state = x, Za(e, n, u, a), Xa(), B = e.memoizedState, o || x !== B || Yl ? (typeof $ == "function" && (nf(
        e,
        l,
        $,
        n
      ), B = e.memoizedState), (_ = Yl || Ds(
        e,
        l,
        _,
        n,
        x,
        B,
        i
      )) ? (G || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = n, e.memoizedState = B), u.props = n, u.state = B, u.context = i, n = _) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
    } else {
      u = e.stateNode, Bc(t, e), i = e.memoizedProps, G = Mn(l, i), u.props = G, $ = e.pendingProps, x = u.context, B = l.contextType, _ = Fn, typeof B == "object" && B !== null && (_ = ae(B)), o = l.getDerivedStateFromProps, (B = typeof o == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== $ || x !== _) && js(
        e,
        u,
        n,
        _
      ), Yl = !1, x = e.memoizedState, u.state = x, Za(e, n, u, a), Xa();
      var K = e.memoizedState;
      i !== $ || x !== K || Yl || t !== null && t.dependencies !== null && Vu(t.dependencies) ? (typeof o == "function" && (nf(
        e,
        l,
        o,
        n
      ), K = e.memoizedState), (G = Yl || Ds(
        e,
        l,
        G,
        n,
        x,
        K,
        _
      ) || t !== null && t.dependencies !== null && Vu(t.dependencies)) ? (B || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, K, _), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        K,
        _
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (e.flags |= 1024), e.memoizedProps = n, e.memoizedState = K), u.props = n, u.state = K, u.context = _, n = G) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (e.flags |= 1024), n = !1);
    }
    return u = n, ci(t, e), n = (e.flags & 128) !== 0, u || n ? (u = e.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && n ? (e.child = On(
      e,
      t.child,
      null,
      a
    ), e.child = On(
      e,
      null,
      l,
      a
    )) : ue(t, e, l, a), e.memoizedState = u.state, t = e.child) : t = gl(
      t,
      e,
      a
    ), t;
  }
  function Zs(t, e, l, n) {
    return mn(), e.flags |= 256, ue(t, e, l, n), e.child;
  }
  var rf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function of(t) {
    return { baseLanes: t, cachePool: Bo() };
  }
  function sf(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Te), t;
  }
  function ws(t, e, l) {
    var n = e.pendingProps, a = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Qt.current & 2) !== 0), i && (a = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (St) {
        if (a ? Gl(e) : Vl(), (t = Bt) ? (t = tv(
          t,
          Ve
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Bl !== null ? { id: el, overflow: ll } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Ao(t), l.return = e, e.child = l, ne = e, Bt = null)) : t = null, t === null) throw xl(e);
        return Jf(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var o = n.children;
      return n = n.fallback, a ? (Vl(), a = e.mode, o = fi(
        { mode: "hidden", children: o },
        a
      ), n = yn(
        n,
        a,
        l,
        null
      ), o.return = e, n.return = e, o.sibling = n, e.child = o, n = e.child, n.memoizedState = of(l), n.childLanes = sf(
        t,
        i,
        l
      ), e.memoizedState = rf, ka(null, n)) : (Gl(e), df(e, o));
    }
    var _ = t.memoizedState;
    if (_ !== null && (o = _.dehydrated, o !== null)) {
      if (u)
        e.flags & 256 ? (Gl(e), e.flags &= -257, e = vf(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (Vl(), e.child = t.child, e.flags |= 128, e = null) : (Vl(), o = n.fallback, a = e.mode, n = fi(
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
        ), n = e.child, n.memoizedState = of(l), n.childLanes = sf(
          t,
          i,
          l
        ), e.memoizedState = rf, e = ka(null, n));
      else if (Gl(e), Jf(o)) {
        if (i = o.nextSibling && o.nextSibling.dataset, i) var B = i.dgst;
        i = B, n = Error(r(419)), n.stack = "", n.digest = i, Ya({ value: n, source: null, stack: null }), e = vf(
          t,
          e,
          l
        );
      } else if ($t || ea(t, e, l, !1), i = (l & t.childLanes) !== 0, $t || i) {
        if (i = Ut, i !== null && (n = Cr(i, l), n !== 0 && n !== _.retryLane))
          throw _.retryLane = n, hn(t, n), pe(i, t, n), cf;
        wf(o) || gi(), e = vf(
          t,
          e,
          l
        );
      } else
        wf(o) ? (e.flags |= 192, e.child = t.child, e = null) : (t = _.treeContext, Bt = Xe(
          o.nextSibling
        ), ne = e, St = !0, ql = null, Ve = !1, t !== null && Ro(e, t), e = df(
          e,
          n.children
        ), e.flags |= 4096);
      return e;
    }
    return a ? (Vl(), o = n.fallback, a = e.mode, _ = t.child, B = _.sibling, n = sl(_, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = _.subtreeFlags & 65011712, B !== null ? o = sl(
      B,
      o
    ) : (o = yn(
      o,
      a,
      l,
      null
    ), o.flags |= 2), o.return = e, n.return = e, n.sibling = o, e.child = n, ka(null, n), n = e.child, o = t.child.memoizedState, o === null ? o = of(l) : (a = o.cachePool, a !== null ? (_ = wt._currentValue, a = a.parent !== _ ? { parent: _, pool: _ } : a) : a = Bo(), o = {
      baseLanes: o.baseLanes | l,
      cachePool: a
    }), n.memoizedState = o, n.childLanes = sf(
      t,
      i,
      l
    ), e.memoizedState = rf, ka(t.child, n)) : (Gl(e), l = t.child, t = l.sibling, l = sl(l, {
      mode: "visible",
      children: n.children
    }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function df(t, e) {
    return e = fi(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function fi(t, e) {
    return t = Ee(22, t, null, e), t.lanes = 0, t;
  }
  function vf(t, e, l) {
    return On(e, t.child, null, l), t = df(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Js(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), Tc(t.return, e, l);
  }
  function hf(t, e, l, n, a, u) {
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
  function $s(t, e, l) {
    var n = e.pendingProps, a = n.revealOrder, u = n.tail;
    n = n.children;
    var i = Qt.current, o = (i & 2) !== 0;
    if (o ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, et(Qt, i), ue(t, e, n, l), n = St ? Ha : 0, !o && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Js(t, l, e);
        else if (t.tag === 19)
          Js(t, l, e);
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
          t = l.alternate, t !== null && ku(t) === null && (a = l), l = l.sibling;
        l = a, l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), hf(
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
          if (t = a.alternate, t !== null && ku(t) === null) {
            e.child = a;
            break;
          }
          t = a.sibling, a.sibling = l, l = a, a = t;
        }
        hf(
          e,
          !0,
          l,
          null,
          u,
          n
        );
        break;
      case "together":
        hf(
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
  function gl(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), Zl |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (ea(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, l = sl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = sl(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function yf(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Vu(t)));
  }
  function wy(t, e, l) {
    switch (e.tag) {
      case 3:
        Pt(e, e.stateNode.containerInfo), Hl(e, wt, t.memoizedState.cache), mn();
        break;
      case 27:
      case 5:
        Dl(e);
        break;
      case 4:
        Pt(e, e.stateNode.containerInfo);
        break;
      case 10:
        Hl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Kc(e), null;
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (Gl(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? ws(t, e, l) : (Gl(e), t = gl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        Gl(e);
        break;
      case 19:
        var a = (t.flags & 128) !== 0;
        if (n = (l & e.childLanes) !== 0, n || (ea(
          t,
          e,
          l,
          !1
        ), n = (l & e.childLanes) !== 0), a) {
          if (n)
            return $s(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), et(Qt, Qt.current), n) break;
        return null;
      case 22:
        return e.lanes = 0, Ls(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Hl(e, wt, t.memoizedState.cache);
    }
    return gl(t, e, l);
  }
  function Ws(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        $t = !0;
      else {
        if (!yf(t, l) && (e.flags & 128) === 0)
          return $t = !1, wy(
            t,
            e,
            l
          );
        $t = (t.flags & 131072) !== 0;
      }
    else
      $t = !1, St && (e.flags & 1048576) !== 0 && To(e, Ha, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (t = Sn(e.elementType), e.type = t, typeof t == "function")
            _c(t) ? (n = Mn(t, n), e.tag = 1, e = Xs(
              null,
              e,
              t,
              n,
              l
            )) : (e.tag = 0, e = ff(
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
                e.tag = 11, e = Hs(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              } else if (a === tt) {
                e.tag = 14, e = Ys(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              }
            }
            throw e = I(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return ff(
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
        ), Xs(
          t,
          e,
          n,
          a,
          l
        );
      case 3:
        t: {
          if (Pt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          n = e.pendingProps;
          var u = e.memoizedState;
          a = u.element, Bc(t, e), Za(e, n, null, l);
          var i = e.memoizedState;
          if (n = i.cache, Hl(e, wt, n), n !== u.cache && Rc(
            e,
            [wt],
            l,
            !0
          ), Xa(), n = i.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: i.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Zs(
                t,
                e,
                n,
                l
              );
              break t;
            } else if (n !== a) {
              a = Ke(
                Error(r(424)),
                e
              ), Ya(a), e = Zs(
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
              for (Bt = Xe(t.firstChild), ne = e, St = !0, ql = null, Ve = !0, l = Lo(
                e,
                null,
                n,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (mn(), n === a) {
              e = gl(
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
        return ci(t, e), t === null ? (l = iv(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : St || (l = e.type, t = e.pendingProps, n = Mi(
          st.current
        ).createElement(l), n[le] = e, n[de] = t, ie(n, l, t), te(n), e.stateNode = n) : e.memoizedState = iv(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Dl(e), t === null && St && (n = e.stateNode = nv(
          e.type,
          e.pendingProps,
          st.current
        ), ne = e, Ve = !0, a = Bt, kl(e.type) ? ($f = a, Bt = Xe(n.firstChild)) : Bt = a), ue(
          t,
          e,
          e.pendingProps.children,
          l
        ), ci(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && St && ((a = n = Bt) && (n = O0(
          n,
          e.type,
          e.pendingProps,
          Ve
        ), n !== null ? (e.stateNode = n, ne = e, Bt = Xe(n.firstChild), Ve = !1, a = !0) : a = !1), a || xl(e)), Dl(e), a = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, n = u.children, Qf(a, u) ? n = null : i !== null && Qf(a, i) && (e.flags |= 32), e.memoizedState !== null && (a = Gc(
          t,
          e,
          Hy,
          null,
          null,
          l
        ), su._currentValue = a), ci(t, e), ue(t, e, n, l), e.child;
      case 6:
        return t === null && St && ((t = l = Bt) && (l = E0(
          l,
          e.pendingProps,
          Ve
        ), l !== null ? (e.stateNode = l, ne = e, Bt = null, t = !0) : t = !1), t || xl(e)), null;
      case 13:
        return ws(t, e, l);
      case 4:
        return Pt(
          e,
          e.stateNode.containerInfo
        ), n = e.pendingProps, t === null ? e.child = On(
          e,
          null,
          n,
          l
        ) : ue(t, e, n, l), e.child;
      case 11:
        return Hs(
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
        return n = e.pendingProps, Hl(e, e.type, n.value), ue(t, e, n.children, l), e.child;
      case 9:
        return a = e.type._context, n = e.pendingProps.children, pn(e), a = ae(a), n = n(a), e.flags |= 1, ue(t, e, n, l), e.child;
      case 14:
        return Ys(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Ks(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return $s(t, e, l);
      case 31:
        return Zy(t, e, l);
      case 22:
        return Ls(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return pn(e), n = ae(wt), t === null ? (a = Cc(), a === null && (a = Ut, u = Dc(), a.pooledCache = u, u.refCount++, u !== null && (a.pooledCacheLanes |= l), a = u), e.memoizedState = { parent: n, cache: a }, Uc(e), Hl(e, wt, a)) : ((t.lanes & l) !== 0 && (Bc(t, e), Za(e, null, null, l), Xa()), a = t.memoizedState, u = e.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), Hl(e, wt, n)) : (n = u.cache, Hl(e, wt, n), n !== a.cache && Rc(
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
    throw Error(r(156, e.tag));
  }
  function pl(t) {
    t.flags |= 4;
  }
  function mf(t, e, l, n, a) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Od()) t.flags |= 8192;
        else
          throw bn = wu, Nc;
    } else t.flags &= -16777217;
  }
  function ks(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !sv(e))
      if (Od()) t.flags |= 8192;
      else
        throw bn = wu, Nc;
  }
  function ri(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Rr() : 536870912, t.lanes |= e, va |= e);
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
  function Jy(t, e, l) {
    var n = e.pendingProps;
    switch (Ec(e), e.tag) {
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
        return l = e.stateNode, n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), hl(wt), xt(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (ta(e) ? pl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Ac())), qt(e), null;
      case 26:
        var a = e.type, u = e.memoizedState;
        return t === null ? (pl(e), u !== null ? (qt(e), ks(e, u)) : (qt(e), mf(
          e,
          a,
          null,
          n,
          l
        ))) : u ? u !== t.memoizedState ? (pl(e), qt(e), ks(e, u)) : (qt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== n && pl(e), qt(e), mf(
          e,
          a,
          t,
          n,
          l
        )), null;
      case 27:
        if (jl(e), l = st.current, a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && pl(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(r(166));
            return qt(e), null;
          }
          t = lt.current, ta(e) ? Do(e) : (t = nv(a, n, l), e.stateNode = t, pl(e));
        }
        return qt(e), null;
      case 5:
        if (jl(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && pl(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(r(166));
            return qt(e), null;
          }
          if (u = lt.current, ta(e))
            Do(e);
          else {
            var i = Mi(
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
            u[le] = e, u[de] = n;
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
            n && pl(e);
          }
        }
        return qt(e), mf(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== n && pl(e);
        else {
          if (typeof n != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = st.current, ta(e)) {
            if (t = e.stateNode, l = e.memoizedProps, n = null, a = ne, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[le] = e, t = !!(t.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || wd(t.nodeValue, l)), t || xl(e, !0);
          } else
            t = Mi(t).createTextNode(
              n
            ), t[le] = e, e.stateNode = t;
        }
        return qt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (n = ta(e), l !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[le] = e;
            } else
              mn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            qt(e), t = !1;
          } else
            l = Ac(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Ae(e), e) : (Ae(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return qt(e), null;
      case 13:
        if (n = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = ta(e), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
              a[le] = e;
            } else
              mn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            qt(e), a = !1;
          } else
            a = Ac(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return e.flags & 256 ? (Ae(e), e) : (Ae(e), null);
        }
        return Ae(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = n !== null, t = t !== null && t.memoizedState !== null, l && (n = e.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== a && (n.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), ri(e, e.updateQueue), qt(e), null);
      case 4:
        return xt(), t === null && Yf(e.stateNode.containerInfo), qt(e), null;
      case 10:
        return hl(e.type), qt(e), null;
      case 19:
        if (J(Qt), n = e.memoizedState, n === null) return qt(e), null;
        if (a = (e.flags & 128) !== 0, u = n.rendering, u === null)
          if (a) Fa(n, !1);
          else {
            if (Lt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = ku(t), u !== null) {
                  for (e.flags |= 128, Fa(n, !1), t = u.updateQueue, e.updateQueue = t, ri(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    Mo(l, t), l = l.sibling;
                  return et(
                    Qt,
                    Qt.current & 1 | 2
                  ), St && dl(e, n.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && Ht() > hi && (e.flags |= 128, a = !0, Fa(n, !1), e.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = ku(u), t !== null) {
              if (e.flags |= 128, a = !0, t = t.updateQueue, e.updateQueue = t, ri(e, t), Fa(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !St)
                return qt(e), null;
            } else
              2 * Ht() - n.renderingStartTime > hi && l !== 536870912 && (e.flags |= 128, a = !0, Fa(n, !1), e.lanes = 4194304);
          n.isBackwards ? (u.sibling = e.child, e.child = u) : (t = n.last, t !== null ? t.sibling = u : e.child = u, n.last = u);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = Ht(), t.sibling = null, l = Qt.current, et(
          Qt,
          a ? l & 1 | 2 : l & 1
        ), St && dl(e, n.treeForkCount), t) : (qt(e), null);
      case 22:
      case 23:
        return Ae(e), Yc(), n = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (e.flags |= 8192) : n && (e.flags |= 8192), n ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (qt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : qt(e), l = e.updateQueue, l !== null && ri(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== l && (e.flags |= 2048), t !== null && J(_n), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), hl(wt), qt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function $y(t, e) {
    switch (Ec(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return hl(wt), xt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return jl(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Ae(e), e.alternate === null)
            throw Error(r(340));
          mn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Ae(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          mn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return J(Qt), null;
      case 4:
        return xt(), null;
      case 10:
        return hl(e.type), null;
      case 22:
      case 23:
        return Ae(e), Yc(), t !== null && J(_n), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return hl(wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Fs(t, e) {
    switch (Ec(e), e.tag) {
      case 3:
        hl(wt), xt();
        break;
      case 26:
      case 27:
      case 5:
        jl(e);
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
        J(Qt);
        break;
      case 10:
        hl(e.type);
        break;
      case 22:
      case 23:
        Ae(e), Yc(), t !== null && J(_n);
        break;
      case 24:
        hl(wt);
    }
  }
  function Ia(t, e) {
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
  function Is(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Vo(e, l);
      } catch (n) {
        Tt(t, t.return, n);
      }
    }
  }
  function Ps(t, e, l) {
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
  function Pa(t, e) {
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
  function td(t) {
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
  function gf(t, e, l) {
    try {
      var n = t.stateNode;
      m0(n, t.type, l, e), n[de] = e;
    } catch (a) {
      Tt(t, t.return, a);
    }
  }
  function ed(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && kl(t.type) || t.tag === 4;
  }
  function pf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || ed(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && kl(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function _f(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = rl));
    else if (n !== 4 && (n === 27 && kl(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (_f(t, e, l), t = t.sibling; t !== null; )
        _f(t, e, l), t = t.sibling;
  }
  function oi(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (n !== 4 && (n === 27 && kl(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (oi(t, e, l), t = t.sibling; t !== null; )
        oi(t, e, l), t = t.sibling;
  }
  function ld(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var n = t.type, a = e.attributes; a.length; )
        e.removeAttributeNode(a[0]);
      ie(e, n, l), e[le] = t, e[de] = l;
    } catch (u) {
      Tt(t, t.return, u);
    }
  }
  var _l = !1, Wt = !1, Sf = !1, nd = typeof WeakSet == "function" ? WeakSet : Set, ee = null;
  function Wy(t, e) {
    if (t = t.containerInfo, Gf = Ci, t = yo(t), dc(t)) {
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
    for (Vf = { focusedElem: t, selectionRange: l }, Ci = !1, ee = e; ee !== null; )
      if (e = ee, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, ee = t;
      else
        for (; ee !== null; ) {
          switch (e = ee, u = e.alternate, t = e.flags, e.tag) {
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
                  Zf(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Zf(t);
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
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, ee = t;
            break;
          }
          ee = e.return;
        }
  }
  function ad(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        bl(t, l), n & 4 && Ia(5, l);
        break;
      case 1:
        if (bl(t, l), n & 4)
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
        n & 64 && Is(l), n & 512 && Pa(l, l.return);
        break;
      case 3:
        if (bl(t, l), n & 64 && (t = l.updateQueue, t !== null)) {
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
            Vo(t, e);
          } catch (i) {
            Tt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && n & 4 && ld(l);
      case 26:
      case 5:
        bl(t, l), e === null && n & 4 && td(l), n & 512 && Pa(l, l.return);
        break;
      case 12:
        bl(t, l);
        break;
      case 31:
        bl(t, l), n & 4 && cd(t, l);
        break;
      case 13:
        bl(t, l), n & 4 && fd(t, l), n & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = a0.bind(
          null,
          l
        ), M0(t, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || _l, !n) {
          e = e !== null && e.memoizedState !== null || Wt, a = _l;
          var u = Wt;
          _l = n, (Wt = e) && !u ? Ol(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : bl(t, l), _l = a, Wt = u;
        }
        break;
      case 30:
        break;
      default:
        bl(t, l);
    }
  }
  function ud(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, ud(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Wi(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Yt = null, he = !1;
  function Sl(t, e, l) {
    for (l = l.child; l !== null; )
      id(t, e, l), l = l.sibling;
  }
  function id(t, e, l) {
    if (Se && typeof Se.onCommitFiberUnmount == "function")
      try {
        Se.onCommitFiberUnmount(cl, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Wt || nl(l, e), Sl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Wt || nl(l, e);
        var n = Yt, a = he;
        kl(l.type) && (Yt = l.stateNode, he = !1), Sl(
          t,
          e,
          l
        ), fu(l.stateNode), Yt = n, he = a;
        break;
      case 5:
        Wt || nl(l, e);
      case 6:
        if (n = Yt, a = he, Yt = null, Sl(
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
        Yt !== null && (he ? (t = Yt, Id(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), ba(t)) : Id(Yt, l.stateNode));
        break;
      case 4:
        n = Yt, a = he, Yt = l.stateNode.containerInfo, he = !0, Sl(
          t,
          e,
          l
        ), Yt = n, he = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ql(2, l, e), Wt || Ql(4, l, e), Sl(
          t,
          e,
          l
        );
        break;
      case 1:
        Wt || (nl(l, e), n = l.stateNode, typeof n.componentWillUnmount == "function" && Ps(
          l,
          e,
          n
        )), Sl(
          t,
          e,
          l
        );
        break;
      case 21:
        Sl(
          t,
          e,
          l
        );
        break;
      case 22:
        Wt = (n = Wt) || l.memoizedState !== null, Sl(
          t,
          e,
          l
        ), Wt = n;
        break;
      default:
        Sl(
          t,
          e,
          l
        );
    }
  }
  function cd(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ba(t);
      } catch (l) {
        Tt(e, e.return, l);
      }
    }
  }
  function fd(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ba(t);
      } catch (l) {
        Tt(e, e.return, l);
      }
  }
  function ky(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new nd()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new nd()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function si(t, e) {
    var l = ky(t);
    e.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var a = u0.bind(null, t, n);
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
              if (kl(o.type)) {
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
        if (Yt === null) throw Error(r(160));
        id(u, i, a), Yt = null, he = !1, u = a.alternate, u !== null && (u.return = null), a.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        rd(e, t), e = e.sibling;
  }
  var $e = null;
  function rd(t, e) {
    var l = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ye(e, t), me(t), n & 4 && (Ql(3, t, t.return), Ia(3, t), Ql(5, t, t.return));
        break;
      case 1:
        ye(e, t), me(t), n & 512 && (Wt || l === null || nl(l, l.return)), n & 64 && _l && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? n : l.concat(n))));
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
                      u = a.getElementsByTagName("title")[0], (!u || u[za] || u[le] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = a.createElement(n), a.head.insertBefore(
                        u,
                        a.querySelector("head > title")
                      )), ie(u, n, l), u[le] = t, te(u), n = u;
                      break t;
                    case "link":
                      var i = rv(
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
                      if (i = rv(
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
                      throw Error(r(468, n));
                  }
                  u[le] = t, te(u), n = u;
                }
                t.stateNode = n;
              } else
                ov(
                  a,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = fv(
                a,
                n,
                t.memoizedProps
              );
          else
            u !== n ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, n === null ? ov(
              a,
              t.type,
              t.stateNode
            ) : fv(
              a,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && gf(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ye(e, t), me(t), n & 512 && (Wt || l === null || nl(l, l.return)), l !== null && n & 4 && gf(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ye(e, t), me(t), n & 512 && (Wt || l === null || nl(l, l.return)), t.flags & 32) {
          a = t.stateNode;
          try {
            Xn(a, "");
          } catch (nt) {
            Tt(t, t.return, nt);
          }
        }
        n & 4 && t.stateNode != null && (a = t.memoizedProps, gf(
          t,
          a,
          l !== null ? l.memoizedProps : a
        )), n & 1024 && (Sf = !0);
        break;
      case 6:
        if (ye(e, t), me(t), n & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          n = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = n;
          } catch (nt) {
            Tt(t, t.return, nt);
          }
        }
        break;
      case 3:
        if (Ti = null, a = $e, $e = Ai(e.containerInfo), ye(e, t), $e = a, me(t), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ba(e.containerInfo);
          } catch (nt) {
            Tt(t, t.return, nt);
          }
        Sf && (Sf = !1, od(t));
        break;
      case 4:
        n = $e, $e = Ai(
          t.stateNode.containerInfo
        ), ye(e, t), me(t), $e = n;
        break;
      case 12:
        ye(e, t), me(t);
        break;
      case 31:
        ye(e, t), me(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, si(t, n)));
        break;
      case 13:
        ye(e, t), me(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (vi = Ht()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, si(t, n)));
        break;
      case 22:
        a = t.memoizedState !== null;
        var _ = l !== null && l.memoizedState !== null, B = _l, G = Wt;
        if (_l = B || a, Wt = G || _, ye(e, t), Wt = G, _l = B, me(t), n & 8192)
          t: for (e = t.stateNode, e._visibility = a ? e._visibility & -2 : e._visibility | 1, a && (l === null || _ || _l || Wt || An(t)), l = null, e = t; ; ) {
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
                  a ? Pd(K, !0) : Pd(_.stateNode, !1);
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
        n & 4 && (n = t.updateQueue, n !== null && (l = n.retryQueue, l !== null && (n.retryQueue = null, si(t, l))));
        break;
      case 19:
        ye(e, t), me(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, si(t, n)));
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
          if (ed(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var a = l.stateNode, u = pf(t);
            oi(t, u, a);
            break;
          case 5:
            var i = l.stateNode;
            l.flags & 32 && (Xn(i, ""), l.flags &= -33);
            var o = pf(t);
            oi(t, o, i);
            break;
          case 3:
          case 4:
            var _ = l.stateNode.containerInfo, B = pf(t);
            _f(
              t,
              B,
              _
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (G) {
        Tt(t, t.return, G);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function od(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        od(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function bl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        ad(t, e.alternate, e), e = e.sibling;
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
          typeof l.componentWillUnmount == "function" && Ps(
            e,
            e.return,
            l
          ), An(e);
          break;
        case 27:
          fu(e.stateNode);
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
  function Ol(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate, a = t, u = e, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Ol(
            a,
            u,
            l
          ), Ia(4, u);
          break;
        case 1:
          if (Ol(
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
                  Go(_[a], o);
            } catch (B) {
              Tt(n, n.return, B);
            }
          }
          l && i & 64 && Is(u), Pa(u, u.return);
          break;
        case 27:
          ld(u);
        case 26:
        case 5:
          Ol(
            a,
            u,
            l
          ), l && n === null && i & 4 && td(u), Pa(u, u.return);
          break;
        case 12:
          Ol(
            a,
            u,
            l
          );
          break;
        case 31:
          Ol(
            a,
            u,
            l
          ), l && i & 4 && cd(a, u);
          break;
        case 13:
          Ol(
            a,
            u,
            l
          ), l && i & 4 && fd(a, u);
          break;
        case 22:
          u.memoizedState === null && Ol(
            a,
            u,
            l
          ), Pa(u, u.return);
          break;
        case 30:
          break;
        default:
          Ol(
            a,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function bf(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Ka(l));
  }
  function Of(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ka(t));
  }
  function We(t, e, l, n) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        sd(
          t,
          e,
          l,
          n
        ), e = e.sibling;
  }
  function sd(t, e, l, n) {
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
        ), a & 2048 && Ia(9, e);
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
        ), a & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ka(t)));
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
        ) : tu(t, e) : u._visibility & 2 ? We(
          t,
          e,
          l,
          n
        ) : (u._visibility |= 2, oa(
          t,
          e,
          l,
          n,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && bf(i, e);
        break;
      case 24:
        We(
          t,
          e,
          l,
          n
        ), a & 2048 && Of(e.alternate, e);
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
  function oa(t, e, l, n, a) {
    for (a = a && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, o = l, _ = n, B = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          oa(
            u,
            i,
            o,
            _,
            a
          ), Ia(8, i);
          break;
        case 23:
          break;
        case 22:
          var G = i.stateNode;
          i.memoizedState !== null ? G._visibility & 2 ? oa(
            u,
            i,
            o,
            _,
            a
          ) : tu(
            u,
            i
          ) : (G._visibility |= 2, oa(
            u,
            i,
            o,
            _,
            a
          )), a && B & 2048 && bf(
            i.alternate,
            i
          );
          break;
        case 24:
          oa(
            u,
            i,
            o,
            _,
            a
          ), a && B & 2048 && Of(i.alternate, i);
          break;
        default:
          oa(
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
  function tu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, n = e, a = n.flags;
        switch (n.tag) {
          case 22:
            tu(l, n), a & 2048 && bf(
              n.alternate,
              n
            );
            break;
          case 24:
            tu(l, n), a & 2048 && Of(n.alternate, n);
            break;
          default:
            tu(l, n);
        }
        e = e.sibling;
      }
  }
  var eu = 8192;
  function sa(t, e, l) {
    if (t.subtreeFlags & eu)
      for (t = t.child; t !== null; )
        dd(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function dd(t, e, l) {
    switch (t.tag) {
      case 26:
        sa(
          t,
          e,
          l
        ), t.flags & eu && t.memoizedState !== null && x0(
          l,
          $e,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        sa(
          t,
          e,
          l
        );
        break;
      case 3:
      case 4:
        var n = $e;
        $e = Ai(t.stateNode.containerInfo), sa(
          t,
          e,
          l
        ), $e = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = eu, eu = 16777216, sa(
          t,
          e,
          l
        ), eu = n) : sa(
          t,
          e,
          l
        ));
        break;
      default:
        sa(
          t,
          e,
          l
        );
    }
  }
  function vd(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function lu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          ee = n, yd(
            n,
            t
          );
        }
      vd(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        hd(t), t = t.sibling;
  }
  function hd(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        lu(t), t.flags & 2048 && Ql(9, t, t.return);
        break;
      case 3:
        lu(t);
        break;
      case 12:
        lu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, di(t)) : lu(t);
        break;
      default:
        lu(t);
    }
  }
  function di(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          ee = n, yd(
            n,
            t
          );
        }
      vd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          Ql(8, e, e.return), di(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, di(e));
          break;
        default:
          di(e);
      }
      t = t.sibling;
    }
  }
  function yd(t, e) {
    for (; ee !== null; ) {
      var l = ee;
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
          Ka(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, ee = n;
      else
        t: for (l = t; ee !== null; ) {
          n = ee;
          var a = n.sibling, u = n.return;
          if (ud(n), n === l) {
            ee = null;
            break t;
          }
          if (a !== null) {
            a.return = u, ee = a;
            break t;
          }
          ee = u;
        }
    }
  }
  var Fy = {
    getCacheForType: function(t) {
      var e = ae(wt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return ae(wt).controller.signal;
    }
  }, Iy = typeof WeakMap == "function" ? WeakMap : Map, At = 0, Ut = null, yt = null, pt = 0, zt = 0, ze = null, Xl = !1, da = !1, Ef = !1, El = 0, Lt = 0, Zl = 0, zn = 0, Mf = 0, Te = 0, va = 0, nu = null, ge = null, Af = !1, vi = 0, md = 0, hi = 1 / 0, yi = null, wl = null, Ft = 0, Jl = null, ha = null, Ml = 0, zf = 0, Tf = null, gd = null, au = 0, Rf = null;
  function Re() {
    return (At & 2) !== 0 && pt !== 0 ? pt & -pt : N.T !== null ? Bf() : Nr();
  }
  function pd() {
    if (Te === 0)
      if ((pt & 536870912) === 0 || St) {
        var t = Eu;
        Eu <<= 1, (Eu & 3932160) === 0 && (Eu = 262144), Te = t;
      } else Te = 536870912;
    return t = Me.current, t !== null && (t.flags |= 32), Te;
  }
  function pe(t, e, l) {
    (t === Ut && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null) && (ya(t, 0), $l(
      t,
      pt,
      Te,
      !1
    )), Aa(t, l), ((At & 2) === 0 || t !== Ut) && (t === Ut && ((At & 2) === 0 && (zn |= l), Lt === 4 && $l(
      t,
      pt,
      Te,
      !1
    )), al(t));
  }
  function _d(t, e, l) {
    if ((At & 6) !== 0) throw Error(r(327));
    var n = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Ma(t, e), a = n ? e0(t, e) : jf(t, e, !0), u = n;
    do {
      if (a === 0) {
        da && !n && $l(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !Py(l)) {
          a = jf(t, e, !1), u = !1;
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
              a = nu;
              var _ = o.current.memoizedState.isDehydrated;
              if (_ && (ya(o, i).flags |= 256), i = jf(
                o,
                i,
                !1
              ), i !== 2) {
                if (Ef && !_) {
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
          ya(t, 0), $l(t, e, 0, !0);
          break;
        }
        t: {
          switch (n = t, u = a, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              $l(
                n,
                e,
                Te,
                !Xl
              );
              break t;
            case 2:
              ge = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (a = vi + 300 - Ht(), 10 < a)) {
            if ($l(
              n,
              e,
              Te,
              !Xl
            ), Au(n, 0, !0) !== 0) break t;
            Ml = e, n.timeoutHandle = kd(
              Sd.bind(
                null,
                n,
                l,
                ge,
                yi,
                Af,
                e,
                Te,
                zn,
                va,
                Xl,
                u,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          Sd(
            n,
            l,
            ge,
            yi,
            Af,
            e,
            Te,
            zn,
            va,
            Xl,
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
  function Sd(t, e, l, n, a, u, i, o, _, B, G, $, x, K) {
    if (t.timeoutHandle = -1, $ = e.subtreeFlags, $ & 8192 || ($ & 16785408) === 16785408) {
      $ = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: rl
      }, dd(
        e,
        u,
        $
      );
      var nt = (u & 62914560) === u ? vi - Ht() : (u & 4194048) === u ? md - Ht() : 0;
      if (nt = H0(
        $,
        nt
      ), nt !== null) {
        Ml = u, t.cancelPendingCommit = nt(
          Rd.bind(
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
        ), $l(t, u, i, !B);
        return;
      }
    }
    Rd(
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
  function Py(t) {
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
  function $l(t, e, l, n) {
    e &= ~Mf, e &= ~zn, t.suspendedLanes |= e, t.pingedLanes &= ~e, n && (t.warmLanes |= e), n = t.expirationTimes;
    for (var a = e; 0 < a; ) {
      var u = 31 - be(a), i = 1 << u;
      n[u] = -1, a &= ~i;
    }
    l !== 0 && Dr(t, l, e);
  }
  function mi() {
    return (At & 6) === 0 ? (uu(0), !1) : !0;
  }
  function Df() {
    if (yt !== null) {
      if (zt === 0)
        var t = yt.return;
      else
        t = yt, vl = gn = null, Xc(t), ua = null, Ga = 0, t = yt;
      for (; t !== null; )
        Fs(t.alternate, t), t = t.return;
      yt = null;
    }
  }
  function ya(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, _0(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Ml = 0, Df(), Ut = t, yt = l = sl(t.current, null), pt = e, zt = 0, ze = null, Xl = !1, da = Ma(t, e), Ef = !1, va = Te = Mf = zn = Zl = Lt = 0, ge = nu = null, Af = !1, (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var a = 31 - be(n), u = 1 << a;
        e |= t[a], n &= ~u;
      }
    return El = e, Hu(), l;
  }
  function bd(t, e) {
    dt = null, N.H = Wa, e === aa || e === Zu ? (e = Ho(), zt = 3) : e === Nc ? (e = Ho(), zt = 4) : zt = e === cf ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, ze = e, yt === null && (Lt = 1, ui(
      t,
      Ke(e, t.current)
    ));
  }
  function Od() {
    var t = Me.current;
    return t === null ? !0 : (pt & 4194048) === pt ? Qe === null : (pt & 62914560) === pt || (pt & 536870912) !== 0 ? t === Qe : !1;
  }
  function Ed() {
    var t = N.H;
    return N.H = Wa, t === null ? Wa : t;
  }
  function Md() {
    var t = N.A;
    return N.A = Fy, t;
  }
  function gi() {
    Lt = 4, Xl || (pt & 4194048) !== pt && Me.current !== null || (da = !0), (Zl & 134217727) === 0 && (zn & 134217727) === 0 || Ut === null || $l(
      Ut,
      pt,
      Te,
      !1
    );
  }
  function jf(t, e, l) {
    var n = At;
    At |= 2;
    var a = Ed(), u = Md();
    (Ut !== t || pt !== e) && (yi = null, ya(t, e)), e = !1;
    var i = Lt;
    t: do
      try {
        if (zt !== 0 && yt !== null) {
          var o = yt, _ = ze;
          switch (zt) {
            case 8:
              Df(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Me.current === null && (e = !0);
              var B = zt;
              if (zt = 0, ze = null, ma(t, o, _, B), l && da) {
                i = 0;
                break t;
              }
              break;
            default:
              B = zt, zt = 0, ze = null, ma(t, o, _, B);
          }
        }
        t0(), i = Lt;
        break;
      } catch (G) {
        bd(t, G);
      }
    while (!0);
    return e && t.shellSuspendCounter++, vl = gn = null, At = n, N.H = a, N.A = u, yt === null && (Ut = null, pt = 0, Hu()), i;
  }
  function t0() {
    for (; yt !== null; ) Ad(yt);
  }
  function e0(t, e) {
    var l = At;
    At |= 2;
    var n = Ed(), a = Md();
    Ut !== t || pt !== e ? (yi = null, hi = Ht() + 500, ya(t, e)) : da = Ma(
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
              zt = 0, ze = null, ma(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (qo(u)) {
                zt = 0, ze = null, zd(e);
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
              qo(u) ? (zt = 0, ze = null, zd(e)) : (zt = 0, ze = null, ma(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (yt.tag) {
                case 26:
                  i = yt.memoizedState;
                case 5:
                case 27:
                  var o = yt;
                  if (i ? sv(i) : o.stateNode.complete) {
                    zt = 0, ze = null;
                    var _ = o.sibling;
                    if (_ !== null) yt = _;
                    else {
                      var B = o.return;
                      B !== null ? (yt = B, pi(B)) : yt = null;
                    }
                    break e;
                  }
              }
              zt = 0, ze = null, ma(t, e, u, 5);
              break;
            case 6:
              zt = 0, ze = null, ma(t, e, u, 6);
              break;
            case 8:
              Df(), Lt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        l0();
        break;
      } catch (G) {
        bd(t, G);
      }
    while (!0);
    return vl = gn = null, N.H = n, N.A = a, At = l, yt !== null ? 0 : (Ut = null, pt = 0, Hu(), Lt);
  }
  function l0() {
    for (; yt !== null && !Zt(); )
      Ad(yt);
  }
  function Ad(t) {
    var e = Ws(t.alternate, t, El);
    t.memoizedProps = t.pendingProps, e === null ? pi(t) : yt = e;
  }
  function zd(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Qs(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          pt
        );
        break;
      case 11:
        e = Qs(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          pt
        );
        break;
      case 5:
        Xc(e);
      default:
        Fs(l, e), e = yt = Mo(e, El), e = Ws(l, e, El);
    }
    t.memoizedProps = t.pendingProps, e === null ? pi(t) : yt = e;
  }
  function ma(t, e, l, n) {
    vl = gn = null, Xc(e), ua = null, Ga = 0;
    var a = e.return;
    try {
      if (Xy(
        t,
        a,
        e,
        l,
        pt
      )) {
        Lt = 1, ui(
          t,
          Ke(l, t.current)
        ), yt = null;
        return;
      }
    } catch (u) {
      if (a !== null) throw yt = a, u;
      Lt = 1, ui(
        t,
        Ke(l, t.current)
      ), yt = null;
      return;
    }
    e.flags & 32768 ? (St || n === 1 ? t = !0 : da || (pt & 536870912) !== 0 ? t = !1 : (Xl = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Me.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Td(e, t)) : pi(e);
  }
  function pi(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Td(
          e,
          Xl
        );
        return;
      }
      t = e.return;
      var l = Jy(
        e.alternate,
        e,
        El
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
  function Td(t, e) {
    do {
      var l = $y(t.alternate, t);
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
  function Rd(t, e, l, n, a, u, i, o, _) {
    t.cancelPendingCommit = null;
    do
      _i();
    while (Ft !== 0);
    if ((At & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (u = e.lanes | e.childLanes, u |= gc, qh(
        t,
        l,
        u,
        i,
        o,
        _
      ), t === Ut && (yt = Ut = null, pt = 0), ha = e, Jl = t, Ml = l, zf = u, Tf = a, gd = n, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, i0(_e, function() {
        return Ud(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || n) {
        n = N.T, N.T = null, a = Q.p, Q.p = 2, i = At, At |= 4;
        try {
          Wy(t, e, l);
        } finally {
          At = i, Q.p = a, N.T = n;
        }
      }
      Ft = 1, Dd(), jd(), Cd();
    }
  }
  function Dd() {
    if (Ft === 1) {
      Ft = 0;
      var t = Jl, e = ha, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = N.T, N.T = null;
        var n = Q.p;
        Q.p = 2;
        var a = At;
        At |= 4;
        try {
          rd(e, t);
          var u = Vf, i = yo(t.containerInfo), o = u.focusedElem, _ = u.selectionRange;
          if (i !== o && o && o.ownerDocument && ho(
            o.ownerDocument.documentElement,
            o
          )) {
            if (_ !== null && dc(o)) {
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
                  var T = vo(
                    o,
                    ft
                  ), E = vo(
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
          Ci = !!Gf, Vf = Gf = null;
        } finally {
          At = a, Q.p = n, N.T = l;
        }
      }
      t.current = e, Ft = 2;
    }
  }
  function jd() {
    if (Ft === 2) {
      Ft = 0;
      var t = Jl, e = ha, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = N.T, N.T = null;
        var n = Q.p;
        Q.p = 2;
        var a = At;
        At |= 4;
        try {
          ad(t, e.alternate, e);
        } finally {
          At = a, Q.p = n, N.T = l;
        }
      }
      Ft = 3;
    }
  }
  function Cd() {
    if (Ft === 4 || Ft === 3) {
      Ft = 0, we();
      var t = Jl, e = ha, l = Ml, n = gd;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Ft = 5 : (Ft = 0, ha = Jl = null, Nd(t, t.pendingLanes));
      var a = t.pendingLanes;
      if (a === 0 && (wl = null), Ji(l), e = e.stateNode, Se && typeof Se.onCommitFiberRoot == "function")
        try {
          Se.onCommitFiberRoot(
            cl,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        e = N.T, a = Q.p, Q.p = 2, N.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < n.length; i++) {
            var o = n[i];
            u(o.value, {
              componentStack: o.stack
            });
          }
        } finally {
          N.T = e, Q.p = a;
        }
      }
      (Ml & 3) !== 0 && _i(), al(t), a = t.pendingLanes, (l & 261930) !== 0 && (a & 42) !== 0 ? t === Rf ? au++ : (au = 0, Rf = t) : au = 0, uu(0);
    }
  }
  function Nd(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Ka(e)));
  }
  function _i() {
    return Dd(), jd(), Cd(), Ud();
  }
  function Ud() {
    if (Ft !== 5) return !1;
    var t = Jl, e = zf;
    zf = 0;
    var l = Ji(Ml), n = N.T, a = Q.p;
    try {
      Q.p = 32 > l ? 32 : l, N.T = null, l = Tf, Tf = null;
      var u = Jl, i = Ml;
      if (Ft = 0, ha = Jl = null, Ml = 0, (At & 6) !== 0) throw Error(r(331));
      var o = At;
      if (At |= 4, hd(u.current), sd(
        u,
        u.current,
        i,
        l
      ), At = o, uu(0, !1), Se && typeof Se.onPostCommitFiberRoot == "function")
        try {
          Se.onPostCommitFiberRoot(cl, u);
        } catch {
        }
      return !0;
    } finally {
      Q.p = a, N.T = n, Nd(t, e);
    }
  }
  function Bd(t, e, l) {
    e = Ke(l, e), e = uf(t.stateNode, e, 2), t = Ll(t, e, 2), t !== null && (Aa(t, 2), al(t));
  }
  function Tt(t, e, l) {
    if (t.tag === 3)
      Bd(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Bd(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (wl === null || !wl.has(n))) {
            t = Ke(l, t), l = qs(2), n = Ll(e, l, 2), n !== null && (xs(
              l,
              n,
              e,
              t
            ), Aa(n, 2), al(n));
            break;
          }
        }
        e = e.return;
      }
  }
  function Cf(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new Iy();
      var a = /* @__PURE__ */ new Set();
      n.set(e, a);
    } else
      a = n.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(e, a));
    a.has(l) || (Ef = !0, a.add(l), t = n0.bind(null, t, e, l), e.then(t, t));
  }
  function n0(t, e, l) {
    var n = t.pingCache;
    n !== null && n.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Ut === t && (pt & l) === l && (Lt === 4 || Lt === 3 && (pt & 62914560) === pt && 300 > Ht() - vi ? (At & 2) === 0 && ya(t, 0) : Mf |= l, va === pt && (va = 0)), al(t);
  }
  function qd(t, e) {
    e === 0 && (e = Rr()), t = hn(t, e), t !== null && (Aa(t, e), al(t));
  }
  function a0(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), qd(t, l);
  }
  function u0(t, e) {
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
        throw Error(r(314));
    }
    n !== null && n.delete(e), qd(t, l);
  }
  function i0(t, e) {
    return Rt(t, e);
  }
  var Si = null, ga = null, Nf = !1, bi = !1, Uf = !1, Wl = 0;
  function al(t) {
    t !== ga && t.next === null && (ga === null ? Si = ga = t : ga = ga.next = t), bi = !0, Nf || (Nf = !0, f0());
  }
  function uu(t, e) {
    if (!Uf && bi) {
      Uf = !0;
      do
        for (var l = !1, n = Si; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var u = 0;
            else {
              var i = n.suspendedLanes, o = n.pingedLanes;
              u = (1 << 31 - be(42 | t) + 1) - 1, u &= a & ~(i & ~o), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Kd(n, u));
          } else
            u = pt, u = Au(
              n,
              n === Ut ? u : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (u & 3) === 0 || Ma(n, u) || (l = !0, Kd(n, u));
          n = n.next;
        }
      while (l);
      Uf = !1;
    }
  }
  function c0() {
    xd();
  }
  function xd() {
    bi = Nf = !1;
    var t = 0;
    Wl !== 0 && p0() && (t = Wl);
    for (var e = Ht(), l = null, n = Si; n !== null; ) {
      var a = n.next, u = Hd(n, e);
      u === 0 ? (n.next = null, l === null ? Si = a : l.next = a, a === null && (ga = l)) : (l = n, (t !== 0 || (u & 3) !== 0) && (bi = !0)), n = a;
    }
    Ft !== 0 && Ft !== 5 || uu(t), Wl !== 0 && (Wl = 0);
  }
  function Hd(t, e) {
    for (var l = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - be(u), o = 1 << i, _ = a[i];
      _ === -1 ? ((o & l) === 0 || (o & n) !== 0) && (a[i] = Bh(o, e)) : _ <= e && (t.expiredLanes |= o), u &= ~o;
    }
    if (e = Ut, l = pt, l = Au(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, l === 0 || t === e && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && ce(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Ma(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (n !== null && ce(n), Ji(l)) {
        case 2:
        case 8:
          l = tl;
          break;
        case 32:
          l = _e;
          break;
        case 268435456:
          l = Hn;
          break;
        default:
          l = _e;
      }
      return n = Yd.bind(null, t), l = Rt(l, n), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return n !== null && n !== null && ce(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Yd(t, e) {
    if (Ft !== 0 && Ft !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (_i() && t.callbackNode !== l)
      return null;
    var n = pt;
    return n = Au(
      t,
      t === Ut ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (_d(t, n, e), Hd(t, Ht()), t.callbackNode != null && t.callbackNode === l ? Yd.bind(null, t) : null);
  }
  function Kd(t, e) {
    if (_i()) return null;
    _d(t, e, !0);
  }
  function f0() {
    S0(function() {
      (At & 6) !== 0 ? Rt(
        fn,
        c0
      ) : xd();
    });
  }
  function Bf() {
    if (Wl === 0) {
      var t = la;
      t === 0 && (t = Ou, Ou <<= 1, (Ou & 261888) === 0 && (Ou = 256)), Wl = t;
    }
    return Wl;
  }
  function Ld(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Du("" + t);
  }
  function Gd(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function r0(t, e, l, n, a) {
    if (e === "submit" && l && l.stateNode === a) {
      var u = Ld(
        (a[de] || null).action
      ), i = n.submitter;
      i && (e = (e = i[de] || null) ? Ld(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var o = new Uu(
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
                if (Wl !== 0) {
                  var _ = i ? Gd(a, i) : new FormData(a);
                  Pc(
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
                typeof u == "function" && (o.preventDefault(), _ = i ? Gd(a, i) : new FormData(a), Pc(
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
  for (var qf = 0; qf < mc.length; qf++) {
    var xf = mc[qf], o0 = xf.toLowerCase(), s0 = xf[0].toUpperCase() + xf.slice(1);
    Je(
      o0,
      "on" + s0
    );
  }
  Je(po, "onAnimationEnd"), Je(_o, "onAnimationIteration"), Je(So, "onAnimationStart"), Je("dblclick", "onDoubleClick"), Je("focusin", "onFocus"), Je("focusout", "onBlur"), Je(Ty, "onTransitionRun"), Je(Ry, "onTransitionStart"), Je(Dy, "onTransitionCancel"), Je(bo, "onTransitionEnd"), Vn("onMouseEnter", ["mouseout", "mouseover"]), Vn("onMouseLeave", ["mouseout", "mouseover"]), Vn("onPointerEnter", ["pointerout", "pointerover"]), Vn("onPointerLeave", ["pointerout", "pointerover"]), on(
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
  var iu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), d0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(iu)
  );
  function Vd(t, e) {
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
              xu(G);
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
              xu(G);
            }
            a.currentTarget = null, u = _;
          }
      }
    }
  }
  function mt(t, e) {
    var l = e[$i];
    l === void 0 && (l = e[$i] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    l.has(n) || (Qd(e, t, 2, !1), l.add(n));
  }
  function Hf(t, e, l) {
    var n = 0;
    e && (n |= 4), Qd(
      l,
      t,
      n,
      e
    );
  }
  var Oi = "_reactListening" + Math.random().toString(36).slice(2);
  function Yf(t) {
    if (!t[Oi]) {
      t[Oi] = !0, qr.forEach(function(l) {
        l !== "selectionchange" && (d0.has(l) || Hf(l, !1, t), Hf(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Oi] || (e[Oi] = !0, Hf("selectionchange", !1, e));
    }
  }
  function Qd(t, e, l, n) {
    switch (pv(e)) {
      case 2:
        var a = L0;
        break;
      case 8:
        a = G0;
        break;
      default:
        a = Pf;
    }
    l = a.bind(
      null,
      e,
      l,
      t
    ), a = void 0, !nc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: a
    }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
      passive: a
    }) : t.addEventListener(e, l, !1);
  }
  function Kf(t, e, l, n, a) {
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
            if (i = Kn(o), i === null) return;
            if (_ = i.tag, _ === 5 || _ === 6 || _ === 26 || _ === 27) {
              n = u = i;
              continue t;
            }
            o = o.parentNode;
          }
        }
        n = n.return;
      }
    Jr(function() {
      var B = u, G = ec(l), $ = [];
      t: {
        var x = Oo.get(t);
        if (x !== void 0) {
          var K = Uu, nt = t;
          switch (t) {
            case "keypress":
              if (Cu(l) === 0) break t;
            case "keydown":
            case "keyup":
              K = uy;
              break;
            case "focusin":
              nt = "focus", K = cc;
              break;
            case "focusout":
              nt = "blur", K = cc;
              break;
            case "beforeblur":
            case "afterblur":
              K = cc;
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
              K = kr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              K = Jh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              K = fy;
              break;
            case po:
            case _o:
            case So:
              K = kh;
              break;
            case bo:
              K = oy;
              break;
            case "scroll":
            case "scrollend":
              K = Zh;
              break;
            case "wheel":
              K = dy;
              break;
            case "copy":
            case "cut":
            case "paste":
              K = Ih;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              K = Ir;
              break;
            case "toggle":
            case "beforetoggle":
              K = hy;
          }
          var ft = (e & 4) !== 0, Ct = !ft && (t === "scroll" || t === "scrollend"), T = ft ? x !== null ? x + "Capture" : null : x;
          ft = [];
          for (var E = B, U; E !== null; ) {
            var Z = E;
            if (U = Z.stateNode, Z = Z.tag, Z !== 5 && Z !== 26 && Z !== 27 || U === null || T === null || (Z = Ra(E, T), Z != null && ft.push(
              cu(E, Z, U)
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
          if (x = t === "mouseover" || t === "pointerover", K = t === "mouseout" || t === "pointerout", x && l !== tc && (nt = l.relatedTarget || l.fromElement) && (Kn(nt) || nt[Yn]))
            break t;
          if ((K || x) && (x = G.window === G ? G : (x = G.ownerDocument) ? x.defaultView || x.parentWindow : window, K ? (nt = l.relatedTarget || l.toElement, K = B, nt = nt ? Kn(nt) : null, nt !== null && (Ct = h(nt), ft = nt.tag, nt !== Ct || ft !== 5 && ft !== 27 && ft !== 6) && (nt = null)) : (K = null, nt = B), K !== nt)) {
            if (ft = kr, Z = "onMouseLeave", T = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && (ft = Ir, Z = "onPointerLeave", T = "onPointerEnter", E = "pointer"), Ct = K == null ? x : Ta(K), U = nt == null ? x : Ta(nt), x = new ft(
              Z,
              E + "leave",
              K,
              l,
              G
            ), x.target = Ct, x.relatedTarget = U, Z = null, Kn(G) === B && (ft = new ft(
              T,
              E + "enter",
              nt,
              l,
              G
            ), ft.target = U, ft.relatedTarget = Ct, Z = ft), Ct = Z, K && nt)
              e: {
                for (ft = v0, T = K, E = nt, U = 0, Z = T; Z; Z = ft(Z))
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
            K !== null && Xd(
              $,
              x,
              K,
              ft,
              !1
            ), nt !== null && Ct !== null && Xd(
              $,
              Ct,
              nt,
              ft,
              !0
            );
          }
        }
        t: {
          if (x = B ? Ta(B) : window, K = x.nodeName && x.nodeName.toLowerCase(), K === "select" || K === "input" && x.type === "file")
            var Et = io;
          else if (ao(x))
            if (co)
              Et = My;
            else {
              Et = Oy;
              var at = by;
            }
          else
            K = x.nodeName, !K || K.toLowerCase() !== "input" || x.type !== "checkbox" && x.type !== "radio" ? B && Pi(B.elementType) && (Et = io) : Et = Ey;
          if (Et && (Et = Et(t, B))) {
            uo(
              $,
              Et,
              l,
              G
            );
            break t;
          }
          at && at(t, x, B), t === "focusout" && B && x.type === "number" && B.memoizedProps.value != null && Ii(x, "number", x.value);
        }
        switch (at = B ? Ta(B) : window, t) {
          case "focusin":
            (ao(at) || at.contentEditable === "true") && ($n = at, vc = B, xa = null);
            break;
          case "focusout":
            xa = vc = $n = null;
            break;
          case "mousedown":
            hc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            hc = !1, mo($, l, G);
            break;
          case "selectionchange":
            if (zy) break;
          case "keydown":
          case "keyup":
            mo($, l, G);
        }
        var vt;
        if (rc)
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
          Jn ? lo(t, l) && (_t = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (_t = "onCompositionStart");
        _t && (Pr && l.locale !== "ko" && (Jn || _t !== "onCompositionStart" ? _t === "onCompositionEnd" && Jn && (vt = $r()) : (Ul = G, ac = "value" in Ul ? Ul.value : Ul.textContent, Jn = !0)), at = Ei(B, _t), 0 < at.length && (_t = new Fr(
          _t,
          t,
          null,
          l,
          G
        ), $.push({ event: _t, listeners: at }), vt ? _t.data = vt : (vt = no(l), vt !== null && (_t.data = vt)))), (vt = my ? gy(t, l) : py(t, l)) && (_t = Ei(B, "onBeforeInput"), 0 < _t.length && (at = new Fr(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          G
        ), $.push({
          event: at,
          listeners: _t
        }), at.data = vt)), r0(
          $,
          t,
          B,
          l,
          G
        );
      }
      Vd($, e);
    });
  }
  function cu(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function Ei(t, e) {
    for (var l = e + "Capture", n = []; t !== null; ) {
      var a = t, u = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || u === null || (a = Ra(t, l), a != null && n.unshift(
        cu(t, a, u)
      ), a = Ra(t, e), a != null && n.push(
        cu(t, a, u)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function v0(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Xd(t, e, l, n, a) {
    for (var u = e._reactName, i = []; l !== null && l !== n; ) {
      var o = l, _ = o.alternate, B = o.stateNode;
      if (o = o.tag, _ !== null && _ === n) break;
      o !== 5 && o !== 26 && o !== 27 || B === null || (_ = B, a ? (B = Ra(l, u), B != null && i.unshift(
        cu(l, B, _)
      )) : a || (B = Ra(l, u), B != null && i.push(
        cu(l, B, _)
      ))), l = l.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var h0 = /\r\n?/g, y0 = /\u0000|\uFFFD/g;
  function Zd(t) {
    return (typeof t == "string" ? t : "" + t).replace(h0, `
`).replace(y0, "");
  }
  function wd(t, e) {
    return e = Zd(e), Zd(t) === e;
  }
  function jt(t, e, l, n, a, u) {
    switch (l) {
      case "children":
        typeof n == "string" ? e === "body" || e === "textarea" && n === "" || Xn(t, n) : (typeof n == "number" || typeof n == "bigint") && e !== "body" && Xn(t, "" + n);
        break;
      case "className":
        Tu(t, "class", n);
        break;
      case "tabIndex":
        Tu(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Tu(t, l, n);
        break;
      case "style":
        Zr(t, n, u);
        break;
      case "data":
        if (e !== "object") {
          Tu(t, "data", n);
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
        n = Du("" + n), t.setAttribute(l, n);
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
        n = Du("" + n), t.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (t.onclick = rl);
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
            throw Error(r(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(r(60));
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
        l = Du("" + n), t.setAttributeNS(
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
        mt("beforetoggle", t), mt("toggle", t), zu(t, "popover", n);
        break;
      case "xlinkActuate":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        fl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        fl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        fl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        zu(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Qh.get(l) || l, zu(t, l, n));
    }
  }
  function Lf(t, e, l, n, a, u) {
    switch (l) {
      case "style":
        Zr(t, n, u);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(r(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(r(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof n == "string" ? Xn(t, n) : (typeof n == "number" || typeof n == "bigint") && Xn(t, "" + n);
        break;
      case "onScroll":
        n != null && mt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && mt("scrollend", t);
        break;
      case "onClick":
        n != null && (t.onclick = rl);
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
        if (!xr.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), e = l.slice(2, a ? l.length - 7 : void 0), u = t[de] || null, u = u != null ? u[l] : null, typeof u == "function" && t.removeEventListener(e, u, a), typeof n == "function")) {
              typeof u != "function" && u !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, n, a);
              break t;
            }
            l in t ? t[l] = n : n === !0 ? t.setAttribute(l, "") : zu(t, l, n);
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
                  throw Error(r(137, e));
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
                    throw Error(r(137, e));
                  break;
                default:
                  jt(t, e, n, G, l, null);
              }
          }
        Gr(
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
                if (o != null) throw Error(r(91));
                break;
              default:
                jt(t, e, i, o, l, null);
            }
        Qr(t, n, a, u);
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
        for (n = 0; n < iu.length; n++)
          mt(iu[n], t);
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
                throw Error(r(137, e));
              default:
                jt(t, e, B, n, l, null);
            }
        return;
      default:
        if (Pi(e)) {
          for (G in l)
            l.hasOwnProperty(G) && (n = l[G], n !== void 0 && Lf(
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
  function m0(t, e, l, n) {
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
                  throw Error(r(137, e));
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
        Fi(
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
                if (a != null) throw Error(r(91));
                break;
              default:
                a !== u && jt(t, e, i, a, n, u);
            }
        Vr(t, x, K);
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
                  throw Error(r(137, e));
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
        if (Pi(e)) {
          for (var Ct in l)
            x = l[Ct], l.hasOwnProperty(Ct) && x !== void 0 && !n.hasOwnProperty(Ct) && Lf(
              t,
              e,
              Ct,
              void 0,
              n,
              x
            );
          for (G in n)
            x = n[G], K = l[G], !n.hasOwnProperty(G) || x === K || x === void 0 && K === void 0 || Lf(
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
  function Jd(t) {
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
  function g0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var a = l[n], u = a.transferSize, i = a.initiatorType, o = a.duration;
        if (u && o && Jd(i)) {
          for (i = 0, o = a.responseEnd, n += 1; n < l.length; n++) {
            var _ = l[n], B = _.startTime;
            if (B > o) break;
            var G = _.transferSize, $ = _.initiatorType;
            G && Jd($) && (_ = _.responseEnd, i += G * (_ < o ? 1 : (o - B) / (_ - B)));
          }
          if (--n, e += 8 * (u + i) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Gf = null, Vf = null;
  function Mi(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function $d(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Wd(t, e) {
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
  function Qf(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Xf = null;
  function p0() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Xf ? !1 : (Xf = t, !0) : (Xf = null, !1);
  }
  var kd = typeof setTimeout == "function" ? setTimeout : void 0, _0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Fd = typeof Promise == "function" ? Promise : void 0, S0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fd < "u" ? function(t) {
    return Fd.resolve(null).then(t).catch(b0);
  } : kd;
  function b0(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function kl(t) {
    return t === "head";
  }
  function Id(t, e) {
    var l = e, n = 0;
    do {
      var a = l.nextSibling;
      if (t.removeChild(l), a && a.nodeType === 8)
        if (l = a.data, l === "/$" || l === "/&") {
          if (n === 0) {
            t.removeChild(a), ba(e);
            return;
          }
          n--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          n++;
        else if (l === "html")
          fu(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, fu(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, o = u.nodeName;
            u[za] || o === "SCRIPT" || o === "STYLE" || o === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && fu(t.ownerDocument.body);
      l = a;
    } while (l);
    ba(e);
  }
  function Pd(t, e) {
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
  function Zf(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Zf(l), Wi(l);
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
  function O0(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var a = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[za])
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
  function E0(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Xe(t.nextSibling), t === null)) return null;
    return t;
  }
  function tv(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Xe(t.nextSibling), t === null)) return null;
    return t;
  }
  function wf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Jf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function M0(t, e) {
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
  var $f = null;
  function ev(t) {
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
  function lv(t) {
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
  function nv(t, e, l) {
    switch (e = Mi(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function fu(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Wi(t);
  }
  var Ze = /* @__PURE__ */ new Map(), av = /* @__PURE__ */ new Set();
  function Ai(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Al = Q.d;
  Q.d = {
    f: A0,
    r: z0,
    D: T0,
    C: R0,
    L: D0,
    m: j0,
    X: N0,
    S: C0,
    M: U0
  };
  function A0() {
    var t = Al.f(), e = mi();
    return t || e;
  }
  function z0(t) {
    var e = Ln(t);
    e !== null && e.tag === 5 && e.type === "form" ? bs(e) : Al.r(t);
  }
  var pa = typeof document > "u" ? null : document;
  function uv(t, e, l) {
    var n = pa;
    if (n && typeof e == "string" && e) {
      var a = He(e);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), av.has(a) || (av.add(a), t = { rel: t, crossOrigin: l, href: e }, n.querySelector(a) === null && (e = n.createElement("link"), ie(e, "link", t), te(e), n.head.appendChild(e)));
    }
  }
  function T0(t) {
    Al.D(t), uv("dns-prefetch", t, null);
  }
  function R0(t, e) {
    Al.C(t, e), uv("preconnect", t, e);
  }
  function D0(t, e, l) {
    Al.L(t, e, l);
    var n = pa;
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
          u = _a(t);
          break;
        case "script":
          u = Sa(t);
      }
      Ze.has(u) || (t = b(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), Ze.set(u, t), n.querySelector(a) !== null || e === "style" && n.querySelector(ru(u)) || e === "script" && n.querySelector(ou(u)) || (e = n.createElement("link"), ie(e, "link", t), te(e), n.head.appendChild(e)));
    }
  }
  function j0(t, e) {
    Al.m(t, e);
    var l = pa;
    if (l && t) {
      var n = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + He(n) + '"][href="' + He(t) + '"]', u = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Sa(t);
      }
      if (!Ze.has(u) && (t = b({ rel: "modulepreload", href: t }, e), Ze.set(u, t), l.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(ou(u)))
              return;
        }
        n = l.createElement("link"), ie(n, "link", t), te(n), l.head.appendChild(n);
      }
    }
  }
  function C0(t, e, l) {
    Al.S(t, e, l);
    var n = pa;
    if (n && t) {
      var a = Gn(n).hoistableStyles, u = _a(t);
      e = e || "default";
      var i = a.get(u);
      if (!i) {
        var o = { loading: 0, preload: null };
        if (i = n.querySelector(
          ru(u)
        ))
          o.loading = 5;
        else {
          t = b(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = Ze.get(u)) && Wf(t, l);
          var _ = i = n.createElement("link");
          te(_), ie(_, "link", t), _._p = new Promise(function(B, G) {
            _.onload = B, _.onerror = G;
          }), _.addEventListener("load", function() {
            o.loading |= 1;
          }), _.addEventListener("error", function() {
            o.loading |= 2;
          }), o.loading |= 4, zi(i, e, n);
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
  function N0(t, e) {
    Al.X(t, e);
    var l = pa;
    if (l && t) {
      var n = Gn(l).hoistableScripts, a = Sa(t), u = n.get(a);
      u || (u = l.querySelector(ou(a)), u || (t = b({ src: t, async: !0 }, e), (e = Ze.get(a)) && kf(t, e), u = l.createElement("script"), te(u), ie(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function U0(t, e) {
    Al.M(t, e);
    var l = pa;
    if (l && t) {
      var n = Gn(l).hoistableScripts, a = Sa(t), u = n.get(a);
      u || (u = l.querySelector(ou(a)), u || (t = b({ src: t, async: !0, type: "module" }, e), (e = Ze.get(a)) && kf(t, e), u = l.createElement("script"), te(u), ie(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function iv(t, e, l, n) {
    var a = (a = st.current) ? Ai(a) : null;
    if (!a) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (e = _a(l.href), l = Gn(
          a
        ).hoistableStyles, n = l.get(e), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = _a(l.href);
          var u = Gn(
            a
          ).hoistableStyles, i = u.get(t);
          if (i || (a = a.ownerDocument || a, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = a.querySelector(
            ru(t)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Ze.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Ze.set(t, l), u || B0(
            a,
            t,
            l,
            i.state
          ))), e && n === null)
            throw Error(r(528, ""));
          return i;
        }
        if (e && n !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Sa(l), l = Gn(
          a
        ).hoistableScripts, n = l.get(e), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function _a(t) {
    return 'href="' + He(t) + '"';
  }
  function ru(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function cv(t) {
    return b({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function B0(t, e, l, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? n.loading = 1 : (e = t.createElement("link"), n.preload = e, e.addEventListener("load", function() {
      return n.loading |= 1;
    }), e.addEventListener("error", function() {
      return n.loading |= 2;
    }), ie(e, "link", l), te(e), t.head.appendChild(e));
  }
  function Sa(t) {
    return '[src="' + He(t) + '"]';
  }
  function ou(t) {
    return "script[async]" + t;
  }
  function fv(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + He(l.href) + '"]'
          );
          if (n)
            return e.instance = n, te(n), n;
          var a = b({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), te(n), ie(n, "style", a), zi(n, l.precedence, t), e.instance = n;
        case "stylesheet":
          a = _a(l.href);
          var u = t.querySelector(
            ru(a)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, te(u), u;
          n = cv(l), (a = Ze.get(a)) && Wf(n, a), u = (t.ownerDocument || t).createElement("link"), te(u);
          var i = u;
          return i._p = new Promise(function(o, _) {
            i.onload = o, i.onerror = _;
          }), ie(u, "link", n), e.state.loading |= 4, zi(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Sa(l.src), (a = t.querySelector(
            ou(u)
          )) ? (e.instance = a, te(a), a) : (n = l, (a = Ze.get(u)) && (n = b({}, l), kf(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), te(a), ie(a, "link", n), t.head.appendChild(a), e.instance = a);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (n = e.instance, e.state.loading |= 4, zi(n, l.precedence, t));
    return e.instance;
  }
  function zi(t, e, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, u = a, i = 0; i < n.length; i++) {
      var o = n[i];
      if (o.dataset.precedence === e) u = o;
      else if (u !== a) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Wf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function kf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Ti = null;
  function rv(t, e, l) {
    if (Ti === null) {
      var n = /* @__PURE__ */ new Map(), a = Ti = /* @__PURE__ */ new Map();
      a.set(l, n);
    } else
      a = Ti, n = a.get(l), n || (n = /* @__PURE__ */ new Map(), a.set(l, n));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
      var u = l[a];
      if (!(u[za] || u[le] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var o = n.get(i);
        o ? o.push(u) : n.set(i, [u]);
      }
    }
    return n;
  }
  function ov(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function q0(t, e, l) {
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
  function sv(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function x0(t, e, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var a = _a(n.href), u = e.querySelector(
          ru(a)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Ri.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, te(u);
          return;
        }
        u = e.ownerDocument || e, n = cv(n), (a = Ze.get(a)) && Wf(n, a), u = u.createElement("link"), te(u);
        var i = u;
        i._p = new Promise(function(o, _) {
          i.onload = o, i.onerror = _;
        }), ie(u, "link", n), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Ri.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var Ff = 0;
  function H0(t, e) {
    return t.stylesheets && t.count === 0 && ji(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (t.stylesheets && ji(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Ff === 0 && (Ff = 62500 * g0());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && ji(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Ff ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function Ri() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ji(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Di = null;
  function ji(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Di = /* @__PURE__ */ new Map(), e.forEach(Y0, t), Di = null, Ri.call(t));
  }
  function Y0(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Di.get(t);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Di.set(t, l);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < a.length; u++) {
          var i = a[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), n = i);
        }
        n && l.set(null, n);
      }
      a = e.instance, i = a.getAttribute("data-precedence"), u = l.get(i) || n, u === n && l.set(null, a), l.set(i, a), this.count++, n = Ri.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), u ? u.parentNode.insertBefore(a, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
    }
  }
  var su = {
    $$typeof: H,
    Provider: null,
    Consumer: null,
    _currentValue: ut,
    _currentValue2: ut,
    _threadCount: 0
  };
  function K0(t, e, l, n, a, u, i, o, _) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Zi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zi(0), this.hiddenUpdates = Zi(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = _, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function dv(t, e, l, n, a, u, i, o, _, B, G, $) {
    return t = new K0(
      t,
      e,
      l,
      i,
      _,
      B,
      G,
      $,
      o
    ), e = 1, u === !0 && (e |= 24), u = Ee(3, null, null, e), t.current = u, u.stateNode = t, e = Dc(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: e
    }, Uc(u), t;
  }
  function vv(t) {
    return t ? (t = Fn, t) : Fn;
  }
  function hv(t, e, l, n, a, u) {
    a = vv(a), n.context === null ? n.context = a : n.pendingContext = a, n = Kl(e), n.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (n.callback = u), l = Ll(t, n, e), l !== null && (pe(l, t, e), Qa(l, t, e));
  }
  function yv(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function If(t, e) {
    yv(t, e), (t = t.alternate) && yv(t, e);
  }
  function mv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = hn(t, 67108864);
      e !== null && pe(e, t, 67108864), If(t, 67108864);
    }
  }
  function gv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Re();
      e = wi(e);
      var l = hn(t, e);
      l !== null && pe(l, t, e), If(t, e);
    }
  }
  var Ci = !0;
  function L0(t, e, l, n) {
    var a = N.T;
    N.T = null;
    var u = Q.p;
    try {
      Q.p = 2, Pf(t, e, l, n);
    } finally {
      Q.p = u, N.T = a;
    }
  }
  function G0(t, e, l, n) {
    var a = N.T;
    N.T = null;
    var u = Q.p;
    try {
      Q.p = 8, Pf(t, e, l, n);
    } finally {
      Q.p = u, N.T = a;
    }
  }
  function Pf(t, e, l, n) {
    if (Ci) {
      var a = tr(n);
      if (a === null)
        Kf(
          t,
          e,
          n,
          Ni,
          l
        ), _v(t, n);
      else if (Q0(
        a,
        t,
        e,
        l,
        n
      ))
        n.stopPropagation();
      else if (_v(t, n), e & 4 && -1 < V0.indexOf(t)) {
        for (; a !== null; ) {
          var u = Ln(a);
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
                    al(u), (At & 6) === 0 && (hi = Ht() + 500, uu(0));
                  }
                }
                break;
              case 31:
              case 13:
                o = hn(u, 2), o !== null && pe(o, u, 2), mi(), If(u, 2);
            }
          if (u = tr(n), u === null && Kf(
            t,
            e,
            n,
            Ni,
            l
          ), u === a) break;
          a = u;
        }
        a !== null && n.stopPropagation();
      } else
        Kf(
          t,
          e,
          n,
          null,
          l
        );
    }
  }
  function tr(t) {
    return t = ec(t), er(t);
  }
  var Ni = null;
  function er(t) {
    if (Ni = null, t = Kn(t), t !== null) {
      var e = h(t);
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
    return Ni = t, null;
  }
  function pv(t) {
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
          case xn:
            return 32;
          case Hn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var lr = !1, Fl = null, Il = null, Pl = null, du = /* @__PURE__ */ new Map(), vu = /* @__PURE__ */ new Map(), tn = [], V0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function _v(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Fl = null;
        break;
      case "dragenter":
      case "dragleave":
        Il = null;
        break;
      case "mouseover":
      case "mouseout":
        Pl = null;
        break;
      case "pointerover":
      case "pointerout":
        du.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vu.delete(e.pointerId);
    }
  }
  function hu(t, e, l, n, a, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [a]
    }, e !== null && (e = Ln(e), e !== null && mv(e)), t) : (t.eventSystemFlags |= n, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
  }
  function Q0(t, e, l, n, a) {
    switch (e) {
      case "focusin":
        return Fl = hu(
          Fl,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "dragenter":
        return Il = hu(
          Il,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "mouseover":
        return Pl = hu(
          Pl,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "pointerover":
        var u = a.pointerId;
        return du.set(
          u,
          hu(
            du.get(u) || null,
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
          hu(
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
  function Sv(t) {
    var e = Kn(t.target);
    if (e !== null) {
      var l = h(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = p(l), e !== null) {
            t.blockedOn = e, Ur(t.priority, function() {
              gv(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = s(l), e !== null) {
            t.blockedOn = e, Ur(t.priority, function() {
              gv(l);
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
  function Ui(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = tr(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        tc = n, l.target.dispatchEvent(n), tc = null;
      } else
        return e = Ln(l), e !== null && mv(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function bv(t, e, l) {
    Ui(t) && l.delete(e);
  }
  function X0() {
    lr = !1, Fl !== null && Ui(Fl) && (Fl = null), Il !== null && Ui(Il) && (Il = null), Pl !== null && Ui(Pl) && (Pl = null), du.forEach(bv), vu.forEach(bv);
  }
  function Bi(t, e) {
    t.blockedOn === e && (t.blockedOn = null, lr || (lr = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      X0
    )));
  }
  var qi = null;
  function Ov(t) {
    qi !== t && (qi = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        qi === t && (qi = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], n = t[e + 1], a = t[e + 2];
          if (typeof n != "function") {
            if (er(n || l) === null)
              continue;
            break;
          }
          var u = Ln(l);
          u !== null && (t.splice(e, 3), e -= 3, Pc(
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
  function ba(t) {
    function e(_) {
      return Bi(_, t);
    }
    Fl !== null && Bi(Fl, t), Il !== null && Bi(Il, t), Pl !== null && Bi(Pl, t), du.forEach(e), vu.forEach(e);
    for (var l = 0; l < tn.length; l++) {
      var n = tn[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < tn.length && (l = tn[0], l.blockedOn === null); )
      Sv(l), l.blockedOn === null && tn.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var a = l[n], u = l[n + 1], i = a[de] || null;
        if (typeof u == "function")
          i || Ov(l);
        else if (i) {
          var o = null;
          if (u && u.hasAttribute("formAction")) {
            if (a = u, i = u[de] || null)
              o = i.formAction;
            else if (er(a) !== null) continue;
          } else o = i.action;
          typeof o == "function" ? l[n + 1] = o : (l.splice(n, 3), n -= 3), Ov(l);
        }
      }
  }
  function Ev() {
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
  function nr(t) {
    this._internalRoot = t;
  }
  xi.prototype.render = nr.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var l = e.current, n = Re();
    hv(l, n, t, e, null, null);
  }, xi.prototype.unmount = nr.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      hv(t.current, 2, null, t, null, null), mi(), e[Yn] = null;
    }
  };
  function xi(t) {
    this._internalRoot = t;
  }
  xi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Nr();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < tn.length && e !== 0 && e < tn[l].priority; l++) ;
      tn.splice(l, 0, t), l === 0 && Sv(t);
    }
  };
  var Mv = v.version;
  if (Mv !== "19.2.6")
    throw Error(
      r(
        527,
        Mv,
        "19.2.6"
      )
    );
  Q.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = S(e), t = t !== null ? m(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Z0 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: N,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Hi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Hi.isDisabled && Hi.supportsFiber)
      try {
        cl = Hi.inject(
          Z0
        ), Se = Hi;
      } catch {
      }
  }
  return mu.createRoot = function(t, e) {
    if (!y(t)) throw Error(r(299));
    var l = !1, n = "", a = Cs, u = Ns, i = Us;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = dv(
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
      Ev
    ), t[Yn] = e.current, Yf(t), new nr(e);
  }, mu.hydrateRoot = function(t, e, l) {
    if (!y(t)) throw Error(r(299));
    var n = !1, a = "", u = Cs, i = Ns, o = Us, _ = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (o = l.onRecoverableError), l.formState !== void 0 && (_ = l.formState)), e = dv(
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
      Ev
    ), e.context = vv(null), l = e.current, n = Re(), n = wi(n), a = Kl(n), a.callback = null, Ll(l, a, n), l = n, e.current.lanes = l, Aa(e, l), al(e), t[Yn] = e.current, Yf(t), new xi(e);
  }, mu.version = "19.2.6", mu;
}
var Bv;
function tm() {
  if (Bv) return ur.exports;
  Bv = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (f) {
        console.error(f);
      }
  }
  return c(), ur.exports = P0(), ur.exports;
}
var em = tm(), Un = kt();
const Gt = /* @__PURE__ */ J0(Un);
var Tn = {}, gt = {}, qv;
function Bn() {
  if (qv) return gt;
  qv = 1;
  var c = gt && gt.__assign || function() {
    return c = Object.assign || function(q) {
      for (var z, H = 1, X = arguments.length; H < X; H++) {
        z = arguments[H];
        for (var F in z) Object.prototype.hasOwnProperty.call(z, F) && (q[F] = z[F]);
      }
      return q;
    }, c.apply(this, arguments);
  }, f = gt && gt.__createBinding || (Object.create ? (function(q, z, H, X) {
    X === void 0 && (X = H), Object.defineProperty(q, X, { enumerable: !0, get: function() {
      return z[H];
    } });
  }) : (function(q, z, H, X) {
    X === void 0 && (X = H), q[X] = z[H];
  })), v = gt && gt.__setModuleDefault || (Object.create ? (function(q, z) {
    Object.defineProperty(q, "default", { enumerable: !0, value: z });
  }) : function(q, z) {
    q.default = z;
  }), g = gt && gt.__importStar || function(q) {
    if (q && q.__esModule) return q;
    var z = {};
    if (q != null) for (var H in q) H !== "default" && Object.prototype.hasOwnProperty.call(q, H) && f(z, q, H);
    return v(z, q), z;
  }, r = gt && gt.__spreadArray || function(q, z, H) {
    if (H || arguments.length === 2) for (var X = 0, F = z.length, P; X < F; X++)
      (P || !(X in z)) && (P || (P = Array.prototype.slice.call(z, 0, X)), P[X] = z[X]);
    return q.concat(P || Array.prototype.slice.call(z));
  };
  Object.defineProperty(gt, "__esModule", { value: !0 }), gt.Priority = gt.isModKey = gt.shouldRejectKeystrokes = gt.useThrottledValue = gt.getScrollbarWidth = gt.useIsomorphicLayout = gt.noop = gt.createAction = gt.randomId = gt.usePointerMovedSinceMount = gt.useOuterClick = gt.swallowEvent = void 0;
  var y = g(kt());
  function h(q) {
    q.stopPropagation(), q.preventDefault();
  }
  gt.swallowEvent = h;
  function p(q, z) {
    var H = y.useRef(z);
    H.current = z, y.useEffect(function() {
      function X(F) {
        var P, tt;
        !((P = q.current) === null || P === void 0) && P.contains(F.target) || // Add support for ReactShadowRoot
        // @ts-expect-error wrong types, the `host` property exists https://stackoverflow.com/a/25340456
        F.target === ((tt = q.current) === null || tt === void 0 ? void 0 : tt.getRootNode().host) || (F.preventDefault(), F.stopPropagation(), H.current());
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
  function d() {
    return Math.random().toString(36).substring(2, 9);
  }
  gt.randomId = d;
  function S(q) {
    return c({ id: d() }, q);
  }
  gt.createAction = S;
  function m() {
  }
  gt.noop = m, gt.useIsomorphicLayout = typeof window > "u" ? m : y.useLayoutEffect;
  function b() {
    var q = document.createElement("div");
    q.style.visibility = "hidden", q.style.overflow = "scroll", document.body.appendChild(q);
    var z = document.createElement("div");
    q.appendChild(z);
    var H = q.offsetWidth - z.offsetWidth;
    return q.parentNode.removeChild(q), H;
  }
  gt.getScrollbarWidth = b;
  function R(q, z) {
    z === void 0 && (z = 100);
    var H = y.useState(q), X = H[0], F = H[1], P = y.useRef(Date.now());
    return y.useEffect(function() {
      if (z !== 0) {
        var tt = setTimeout(function() {
          F(q), P.current = Date.now();
        }, P.current - (Date.now() - z));
        return function() {
          clearTimeout(tt);
        };
      }
    }, [z, q]), z === 0 ? q : X;
  }
  gt.useThrottledValue = R;
  function M(q) {
    var z, H, X, F = q === void 0 ? { ignoreWhenFocused: [] } : q, P = F.ignoreWhenFocused, tt = r(["input", "textarea"], P, !0).map(function(A) {
      return A.toLowerCase();
    }), k = document.activeElement, D = k && (tt.indexOf(k.tagName.toLowerCase()) !== -1 || ((z = k.attributes.getNamedItem("role")) === null || z === void 0 ? void 0 : z.value) === "textbox" || ((H = k.attributes.getNamedItem("contenteditable")) === null || H === void 0 ? void 0 : H.value) === "true" || ((X = k.attributes.getNamedItem("contenteditable")) === null || X === void 0 ? void 0 : X.value) === "plaintext-only");
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
var ke = {}, De = {}, zl = {}, oe = {}, pu = { exports: {} }, lm = pu.exports, xv;
function nm() {
  return xv || (xv = 1, (function(c, f) {
    (function(v, g) {
      g(f);
    })(lm, (function(v) {
      var g = typeof WeakSet == "function", r = Object.keys;
      function y(D, A) {
        return D === A || D !== D && A !== A;
      }
      function h(D) {
        return D.constructor === Object || D.constructor == null;
      }
      function p(D) {
        return !!D && typeof D.then == "function";
      }
      function s(D) {
        return !!(D && D.$$typeof);
      }
      function d() {
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
        } : d;
      })(g);
      function m(D) {
        return function(W) {
          var w = D || W;
          return function(I, Y, N) {
            N === void 0 && (N = S());
            var Q = !!I && typeof I == "object", ut = !!Y && typeof Y == "object";
            if (Q || ut) {
              var ct = Q && N.has(I), Ot = ut && N.has(Y);
              if (ct || Ot)
                return ct && Ot;
              Q && N.add(I), ut && N.add(Y);
            }
            return w(I, Y, N);
          };
        };
      }
      function b(D, A, W, w) {
        var V = D.length;
        if (A.length !== V)
          return !1;
        for (; V-- > 0; )
          if (!W(D[V], A[V], w))
            return !1;
        return !0;
      }
      function R(D, A, W, w) {
        var V = D.size === A.size;
        if (V && D.size) {
          var I = {};
          D.forEach(function(Y, N) {
            if (V) {
              var Q = !1, ut = 0;
              A.forEach(function(ct, Ot) {
                !Q && !I[ut] && (Q = W(N, Ot, w) && W(Y, ct, w), Q && (I[ut] = !0)), ut++;
              }), V = Q;
            }
          });
        }
        return V;
      }
      var M = "_owner", j = Function.prototype.bind.call(Function.prototype.call, Object.prototype.hasOwnProperty);
      function C(D, A, W, w) {
        var V = r(D), I = V.length;
        if (r(A).length !== I)
          return !1;
        if (I)
          for (var Y = void 0; I-- > 0; ) {
            if (Y = V[I], Y === M) {
              var N = s(D), Q = s(A);
              if ((N || Q) && N !== Q)
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
        var V = D.size === A.size;
        if (V && D.size) {
          var I = {};
          D.forEach(function(Y) {
            if (V) {
              var N = !1, Q = 0;
              A.forEach(function(ut) {
                !N && !I[Q] && (N = W(Y, ut, w), N && (I[Q] = !0)), Q++;
              }), V = N;
            }
          });
        }
        return V;
      }
      var z = typeof Map == "function", H = typeof Set == "function";
      function X(D) {
        var A = (
          /* eslint-disable no-use-before-define */
          typeof D == "function" ? D(W) : W
        );
        function W(w, V, I) {
          if (w === V)
            return !0;
          if (w && V && typeof w == "object" && typeof V == "object") {
            if (h(w) && h(V))
              return C(w, V, A, I);
            var Y = Array.isArray(w), N = Array.isArray(V);
            return Y || N ? Y === N && b(w, V, A, I) : (Y = w instanceof Date, N = V instanceof Date, Y || N ? Y === N && y(w.getTime(), V.getTime()) : (Y = w instanceof RegExp, N = V instanceof RegExp, Y || N ? Y === N && L(w, V) : p(w) || p(V) ? w === V : z && (Y = w instanceof Map, N = V instanceof Map, Y || N) ? Y === N && R(w, V, A, I) : H && (Y = w instanceof Set, N = V instanceof Set, Y || N) ? Y === N && q(w, V, A, I) : C(w, V, A, I)));
          }
          return w !== w && V !== V;
        }
        return W;
      }
      var F = X(), P = X(function() {
        return y;
      }), tt = X(m()), k = X(m(y));
      v.circularDeepEqual = tt, v.circularShallowEqual = k, v.createCustomEqual = X, v.deepEqual = F, v.sameValueZeroEqual = y, v.shallowEqual = P, Object.defineProperty(v, "__esModule", { value: !0 });
    }));
  })(pu, pu.exports)), pu.exports;
}
var or, Hv;
function zr() {
  if (Hv) return or;
  Hv = 1;
  var c = "Invariant failed";
  function f(v, g) {
    if (!v)
      throw new Error(c);
  }
  return or = f, or;
}
var Tl = {}, Rn = {}, gu = {}, Yv;
function am() {
  if (Yv) return gu;
  Yv = 1, Object.defineProperty(gu, "__esModule", { value: !0 }), gu.Command = void 0;
  var c = (
    /** @class */
    /* @__PURE__ */ (function() {
      function f(v, g) {
        var r = this;
        g === void 0 && (g = {}), this.perform = function() {
          var y = v.perform();
          if (typeof y == "function") {
            var h = g.history;
            h && (r.historyItem && h.remove(r.historyItem), r.historyItem = h.add({
              perform: v.perform,
              negate: y
            }), r.history = {
              undo: function() {
                return h.undo(r.historyItem);
              },
              redo: function() {
                return h.redo(r.historyItem);
              }
            });
          }
        };
      }
      return f;
    })()
  );
  return gu.Command = c, gu;
}
var Kv;
function yh() {
  if (Kv) return Rn;
  Kv = 1;
  var c = Rn && Rn.__importDefault || function(h) {
    return h && h.__esModule ? h : { default: h };
  };
  Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.ActionImpl = void 0;
  var f = c(/* @__PURE__ */ zr()), v = am(), g = Bn(), r = function(h) {
    var p = h.keywords, s = p === void 0 ? "" : p, d = h.section, S = d === void 0 ? "" : d;
    return (s + " " + (typeof S == "string" ? S : S.name)).trim();
  }, y = (
    /** @class */
    (function() {
      function h(p, s) {
        var d = this, S;
        this.priority = g.Priority.NORMAL, this.ancestors = [], this.children = [], Object.assign(this, p), this.id = p.id, this.name = p.name, this.keywords = r(p);
        var m = p.perform;
        if (this.command = m && new v.Command({
          perform: function() {
            return m(d);
          }
        }, {
          history: s.history
        }), this.perform = (S = this.command) === null || S === void 0 ? void 0 : S.perform, p.parent) {
          var b = s.store[p.parent];
          (0, f.default)(b, "attempted to create an action whos parent: " + p.parent + " does not exist in the store."), b.addChild(this);
        }
      }
      return h.prototype.addChild = function(p) {
        p.ancestors.unshift(this);
        for (var s = this.parentActionImpl; s; )
          p.ancestors.unshift(s), s = s.parentActionImpl;
        this.children.push(p);
      }, h.prototype.removeChild = function(p) {
        var s = this, d = this.children.indexOf(p);
        d !== -1 && this.children.splice(d, 1), p.children && p.children.forEach(function(S) {
          s.removeChild(S);
        });
      }, Object.defineProperty(h.prototype, "parentActionImpl", {
        // easily access parentActionImpl after creation
        get: function() {
          return this.ancestors[this.ancestors.length - 1];
        },
        enumerable: !1,
        configurable: !0
      }), h.create = function(p, s) {
        return new h(p, s);
      }, h;
    })()
  );
  return Rn.ActionImpl = y, Rn;
}
var Lv;
function mh() {
  if (Lv) return Tl;
  Lv = 1;
  var c = Tl && Tl.__assign || function() {
    return c = Object.assign || function(y) {
      for (var h, p = 1, s = arguments.length; p < s; p++) {
        h = arguments[p];
        for (var d in h) Object.prototype.hasOwnProperty.call(h, d) && (y[d] = h[d]);
      }
      return y;
    }, c.apply(this, arguments);
  }, f = Tl && Tl.__importDefault || function(y) {
    return y && y.__esModule ? y : { default: y };
  };
  Object.defineProperty(Tl, "__esModule", { value: !0 }), Tl.ActionInterface = void 0;
  var v = f(/* @__PURE__ */ zr()), g = yh(), r = (
    /** @class */
    (function() {
      function y(h, p) {
        h === void 0 && (h = []), p === void 0 && (p = {}), this.actions = {}, this.options = p, this.add(h);
      }
      return y.prototype.add = function(h) {
        for (var p = 0; p < h.length; p++) {
          var s = h[p];
          s.parent && (0, v.default)(this.actions[s.parent], 'Attempted to create action "' + s.name + '" without registering its parent "' + s.parent + '" first.'), this.actions[s.id] = g.ActionImpl.create(s, {
            history: this.options.historyManager,
            store: this.actions
          });
        }
        return c({}, this.actions);
      }, y.prototype.remove = function(h) {
        var p = this;
        return h.forEach(function(s) {
          var d = p.actions[s.id];
          if (d) {
            for (var S = d.children; S.length; ) {
              var m = S.pop();
              if (!m)
                return;
              delete p.actions[m.id], m.parentActionImpl && m.parentActionImpl.removeChild(m), m.children && S.push.apply(S, m.children);
            }
            d.parentActionImpl && d.parentActionImpl.removeChild(d), delete p.actions[s.id];
          }
        }), c({}, this.actions);
      }, y;
    })()
  );
  return Tl.ActionInterface = r, Tl;
}
var Dn = {}, Gv;
function um() {
  if (Gv) return Dn;
  Gv = 1, Object.defineProperty(Dn, "__esModule", { value: !0 }), Dn.history = Dn.HistoryItemImpl = void 0;
  var c = Bn(), f = (
    /** @class */
    (function() {
      function r(y) {
        this.perform = y.perform, this.negate = y.negate;
      }
      return r.create = function(y) {
        return new r(y);
      }, r;
    })()
  );
  Dn.HistoryItemImpl = f;
  var v = (
    /** @class */
    (function() {
      function r() {
        return this.undoStack = [], this.redoStack = [], r.instance || (r.instance = this, this.init()), r.instance;
      }
      return r.prototype.init = function() {
        var y = this;
        typeof window > "u" || window.addEventListener("keydown", function(h) {
          var p;
          if (!(!y.redoStack.length && !y.undoStack.length || (0, c.shouldRejectKeystrokes)())) {
            var s = (p = h.key) === null || p === void 0 ? void 0 : p.toLowerCase();
            h.metaKey && s === "z" && h.shiftKey ? y.redo() : h.metaKey && s === "z" && y.undo();
          }
        });
      }, r.prototype.add = function(y) {
        var h = f.create(y);
        return this.undoStack.push(h), h;
      }, r.prototype.remove = function(y) {
        var h = this.undoStack.findIndex(function(s) {
          return s === y;
        });
        if (h !== -1) {
          this.undoStack.splice(h, 1);
          return;
        }
        var p = this.redoStack.findIndex(function(s) {
          return s === y;
        });
        p !== -1 && this.redoStack.splice(p, 1);
      }, r.prototype.undo = function(y) {
        if (!y) {
          var h = this.undoStack.pop();
          return h ? (h == null || h.negate(), this.redoStack.push(h), h) : void 0;
        }
        var p = this.undoStack.findIndex(function(s) {
          return s === y;
        });
        if (p !== -1)
          return this.undoStack.splice(p, 1), y.negate(), this.redoStack.push(y), y;
      }, r.prototype.redo = function(y) {
        if (!y) {
          var h = this.redoStack.pop();
          return h ? (h == null || h.perform(), this.undoStack.push(h), h) : void 0;
        }
        var p = this.redoStack.findIndex(function(s) {
          return s === y;
        });
        if (p !== -1)
          return this.redoStack.splice(p, 1), y.perform(), this.undoStack.push(y), y;
      }, r.prototype.reset = function() {
        this.undoStack.splice(0), this.redoStack.splice(0);
      }, r;
    })()
  ), g = new v();
  return Dn.history = g, Object.freeze(g), Dn;
}
var sr = {}, Vv;
function Oa() {
  return Vv || (Vv = 1, (function(c) {
    Object.defineProperty(c, "__esModule", { value: !0 }), c.VisualState = void 0, (function(f) {
      f.animatingIn = "animating-in", f.showing = "showing", f.animatingOut = "animating-out", f.hidden = "hidden";
    })(c.VisualState || (c.VisualState = {}));
  })(sr)), sr;
}
var Qv;
function im() {
  if (Qv) return oe;
  Qv = 1;
  var c = oe && oe.__assign || function() {
    return c = Object.assign || function(M) {
      for (var j, C = 1, L = arguments.length; C < L; C++) {
        j = arguments[C];
        for (var q in j) Object.prototype.hasOwnProperty.call(j, q) && (M[q] = j[q]);
      }
      return M;
    }, c.apply(this, arguments);
  }, f = oe && oe.__createBinding || (Object.create ? (function(M, j, C, L) {
    L === void 0 && (L = C), Object.defineProperty(M, L, { enumerable: !0, get: function() {
      return j[C];
    } });
  }) : (function(M, j, C, L) {
    L === void 0 && (L = C), M[L] = j[C];
  })), v = oe && oe.__setModuleDefault || (Object.create ? (function(M, j) {
    Object.defineProperty(M, "default", { enumerable: !0, value: j });
  }) : function(M, j) {
    M.default = j;
  }), g = oe && oe.__importStar || function(M) {
    if (M && M.__esModule) return M;
    var j = {};
    if (M != null) for (var C in M) C !== "default" && Object.prototype.hasOwnProperty.call(M, C) && f(j, M, C);
    return v(j, M), j;
  }, r = oe && oe.__importDefault || function(M) {
    return M && M.__esModule ? M : { default: M };
  };
  Object.defineProperty(oe, "__esModule", { value: !0 }), oe.useStore = void 0;
  var y = /* @__PURE__ */ nm(), h = g(kt()), p = r(/* @__PURE__ */ zr()), s = mh(), d = um(), S = Oa();
  function m(M) {
    var j = h.useRef(c({ animations: {
      enterMs: 200,
      exitMs: 100
    } }, M.options)), C = h.useMemo(
      function() {
        return new s.ActionInterface(M.actions || [], {
          historyManager: j.current.enableHistory ? d.history : void 0
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ), L = h.useState({
      searchQuery: "",
      currentRootActionId: null,
      visualState: S.VisualState.hidden,
      actions: c({}, C.actions),
      activeIndex: 0,
      disabled: !1
    }), q = L[0], z = L[1], H = h.useRef(q);
    H.current = q;
    var X = h.useCallback(function() {
      return H.current;
    }, []), F = h.useMemo(function() {
      return new b(X);
    }, [X]);
    h.useEffect(function() {
      H.current = q, F.notify();
    }, [q, F]);
    var P = h.useCallback(function(k) {
      return z(function(D) {
        return c(c({}, D), { actions: C.add(k) });
      }), function() {
        z(function(A) {
          return c(c({}, A), { actions: C.remove(k) });
        });
      };
    }, [C]), tt = h.useRef(null);
    return h.useMemo(function() {
      var k = {
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
        query: k,
        options: j.current,
        subscribe: function(D, A) {
          return F.subscribe(D, A);
        }
      };
    }, [X, F, P]);
  }
  oe.useStore = m;
  var b = (
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
var je = {}, Yi = {}, Xv;
function cm() {
  if (Xv) return Yi;
  Xv = 1, Object.defineProperty(Yi, "__esModule", { value: !0 });
  var c = ["Shift", "Meta", "Alt", "Control"], f = 1e3, v = "keydown", g = typeof navigator == "object" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Meta" : "Control";
  function r(s, d) {
    return typeof s.getModifierState == "function" ? s.getModifierState(d) : !1;
  }
  function y(s) {
    return s.trim().split(" ").map(function(d) {
      var S = d.split(/\b\+/), m = S.pop();
      return S = S.map(function(b) {
        return b === "$mod" ? g : b;
      }), [S, m];
    });
  }
  function h(s, d) {
    return /^[^A-Za-z0-9]$/.test(s.key) && d[1] === s.key ? !0 : !// Allow either the `event.key` or the `event.code`
    // MDN event.key: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
    // MDN event.code: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    (d[1].toUpperCase() !== s.key.toUpperCase() && d[1] !== s.code || // Ensure all the modifiers in the keybinding are pressed.
    d[0].find(function(S) {
      return !r(s, S);
    }) || // KEYBINDING_MODIFIER_KEYS (Shift/Control/etc) change the meaning of a
    // keybinding. So if they are pressed but aren't part of the current
    // keybinding press, then we don't have a match.
    c.find(function(S) {
      return !d[0].includes(S) && d[1] !== S && r(s, S);
    }));
  }
  function p(s, d, S) {
    var m, b;
    S === void 0 && (S = {});
    var R = (m = S.timeout) !== null && m !== void 0 ? m : f, M = (b = S.event) !== null && b !== void 0 ? b : v, j = Object.keys(d).map(function(z) {
      return [y(z), d[z]];
    }), C = /* @__PURE__ */ new Map(), L = null, q = function(z) {
      z instanceof KeyboardEvent && (j.forEach(function(H) {
        var X = H[0], F = H[1], P = C.get(X), tt = P || X, k = tt[0], D = h(z, k);
        D ? tt.length > 1 ? C.set(X, tt.slice(1)) : (C.delete(X), F(z)) : r(z, z.key) || C.delete(X);
      }), L && clearTimeout(L), L = setTimeout(C.clear.bind(C), R));
    };
    return s.addEventListener(M, q), function() {
      s.removeEventListener(M, q);
    };
  }
  return Yi.default = p, Yi;
}
var Zv;
function fm() {
  if (Zv) return je;
  Zv = 1;
  var c = je && je.__createBinding || (Object.create ? (function(C, L, q, z) {
    z === void 0 && (z = q), Object.defineProperty(C, z, { enumerable: !0, get: function() {
      return L[q];
    } });
  }) : (function(C, L, q, z) {
    z === void 0 && (z = q), C[z] = L[q];
  })), f = je && je.__setModuleDefault || (Object.create ? (function(C, L) {
    Object.defineProperty(C, "default", { enumerable: !0, value: L });
  }) : function(C, L) {
    C.default = L;
  }), v = je && je.__importStar || function(C) {
    if (C && C.__esModule) return C;
    var L = {};
    if (C != null) for (var q in C) q !== "default" && Object.prototype.hasOwnProperty.call(C, q) && c(L, C, q);
    return f(L, C), L;
  }, g = je && je.__importDefault || function(C) {
    return C && C.__esModule ? C : { default: C };
  };
  Object.defineProperty(je, "__esModule", { value: !0 }), je.InternalEvents = void 0;
  var r = v(kt()), y = g(cm()), h = Oa(), p = nn(), s = Bn();
  function d() {
    return S(), m(), M(), j(), null;
  }
  je.InternalEvents = d;
  function S() {
    var C, L, q = (0, p.useKBar)(function(D) {
      return {
        visualState: D.visualState,
        showing: D.visualState !== h.VisualState.hidden,
        disabled: D.disabled
      };
    }), z = q.query, H = q.options, X = q.visualState, F = q.showing, P = q.disabled;
    r.useEffect(function() {
      var D, A = function() {
        z.setVisualState(function(V) {
          return V === h.VisualState.hidden || V === h.VisualState.animatingOut ? V : h.VisualState.animatingOut;
        });
      };
      if (P) {
        A();
        return;
      }
      var W = H.toggleShortcut || "$mod+k", w = (0, y.default)(window, (D = {}, D[W] = function(V) {
        var I, Y, N, Q;
        V.defaultPrevented || (V.preventDefault(), z.toggle(), F ? (Y = (I = H.callbacks) === null || I === void 0 ? void 0 : I.onClose) === null || Y === void 0 || Y.call(I) : (Q = (N = H.callbacks) === null || N === void 0 ? void 0 : N.onOpen) === null || Q === void 0 || Q.call(N));
      }, D.Escape = function(V) {
        var I, Y;
        F && (V.stopPropagation(), V.preventDefault(), (Y = (I = H.callbacks) === null || I === void 0 ? void 0 : I.onClose) === null || Y === void 0 || Y.call(I)), A();
      }, D));
      return function() {
        w();
      };
    }, [H.callbacks, H.toggleShortcut, z, F, P]);
    var tt = r.useRef(), k = r.useCallback(function(D) {
      var A, W, w = 0;
      D === h.VisualState.animatingIn && (w = ((A = H.animations) === null || A === void 0 ? void 0 : A.enterMs) || 0), D === h.VisualState.animatingOut && (w = ((W = H.animations) === null || W === void 0 ? void 0 : W.exitMs) || 0), clearTimeout(tt.current), tt.current = setTimeout(function() {
        var V = !1;
        z.setVisualState(function() {
          var I = D === h.VisualState.animatingIn ? h.VisualState.showing : h.VisualState.hidden;
          return I === h.VisualState.hidden && (V = !0), I;
        }), V && z.setCurrentRootAction(null);
      }, w);
    }, [(C = H.animations) === null || C === void 0 ? void 0 : C.enterMs, (L = H.animations) === null || L === void 0 ? void 0 : L.exitMs, z]);
    r.useEffect(function() {
      switch (X) {
        case h.VisualState.animatingIn:
        case h.VisualState.animatingOut:
          k(X);
          break;
      }
    }, [k, X]);
  }
  function m() {
    var C = (0, p.useKBar)(function(z) {
      return {
        visualState: z.visualState
      };
    }), L = C.visualState, q = C.options;
    r.useEffect(function() {
      if (!q.disableDocumentLock)
        if (L === h.VisualState.animatingIn) {
          if (document.body.style.overflow = "hidden", !q.disableScrollbarManagement) {
            var z = (0, s.getScrollbarWidth)(), H = getComputedStyle(document.body)["margin-right"];
            H && (z += Number(H.replace(/\D/g, ""))), document.body.style.marginRight = z + "px";
          }
        } else L === h.VisualState.hidden && (document.body.style.removeProperty("overflow"), q.disableScrollbarManagement || document.body.style.removeProperty("margin-right"));
    }, [
      q.disableDocumentLock,
      q.disableScrollbarManagement,
      L
    ]);
  }
  var b = /* @__PURE__ */ new WeakSet();
  function R(C) {
    return function(L) {
      b.has(L) || (C(L), b.add(L));
    };
  }
  function M() {
    var C = (0, p.useKBar)(function(F) {
      return {
        actions: F.actions,
        open: F.visualState === h.VisualState.showing,
        disabled: F.disabled
      };
    }), L = C.actions, q = C.query, z = C.open, H = C.options, X = C.disabled;
    r.useEffect(function() {
      var F;
      if (!(z || X)) {
        for (var P = Object.keys(L).map(function(N) {
          return L[N];
        }), tt = [], k = 0, D = P; k < D.length; k++) {
          var A = D[k];
          !((F = A.shortcut) === null || F === void 0) && F.length && tt.push(A);
        }
        tt = tt.sort(function(N, Q) {
          return Q.shortcut.join(" ").length - N.shortcut.join(" ").length;
        });
        for (var W = {}, w = function(N) {
          var Q = N.shortcut.join(" ");
          W[Q] = R(function(ut) {
            var ct, Ot, O, J, et, lt;
            (0, s.shouldRejectKeystrokes)() || (ut.preventDefault(), !((ct = N.children) === null || ct === void 0) && ct.length ? (q.setCurrentRootAction(N.id), q.toggle(), (O = (Ot = H.callbacks) === null || Ot === void 0 ? void 0 : Ot.onOpen) === null || O === void 0 || O.call(Ot)) : ((J = N.command) === null || J === void 0 || J.perform(), (lt = (et = H.callbacks) === null || et === void 0 ? void 0 : et.onSelectAction) === null || lt === void 0 || lt.call(et, N)));
          });
        }, V = 0, I = tt; V < I.length; V++) {
          var A = I[V];
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
    var C = r.useRef(!0), L = (0, p.useKBar)(function(X) {
      return {
        isShowing: X.visualState === h.VisualState.showing || X.visualState === h.VisualState.animatingIn
      };
    }), q = L.isShowing, z = L.query, H = r.useRef(null);
    r.useEffect(function() {
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
      var F = H.current;
      F && F !== X && F.focus();
    }, [q]), r.useEffect(function() {
      function X(F) {
        var P = z.getInput();
        F.target !== P && P.focus();
      }
      if (q)
        return window.addEventListener("keydown", X), function() {
          window.removeEventListener("keydown", X);
        };
    }, [q, z]);
  }
  return je;
}
var wv;
function gh() {
  return wv || (wv = 1, (function(c) {
    var f = zl && zl.__createBinding || (Object.create ? (function(s, d, S, m) {
      m === void 0 && (m = S), Object.defineProperty(s, m, { enumerable: !0, get: function() {
        return d[S];
      } });
    }) : (function(s, d, S, m) {
      m === void 0 && (m = S), s[m] = d[S];
    })), v = zl && zl.__setModuleDefault || (Object.create ? (function(s, d) {
      Object.defineProperty(s, "default", { enumerable: !0, value: d });
    }) : function(s, d) {
      s.default = d;
    }), g = zl && zl.__importStar || function(s) {
      if (s && s.__esModule) return s;
      var d = {};
      if (s != null) for (var S in s) S !== "default" && Object.prototype.hasOwnProperty.call(s, S) && f(d, s, S);
      return v(d, s), d;
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), c.KBarProvider = c.KBarContext = void 0;
    var r = im(), y = g(kt()), h = fm();
    c.KBarContext = y.createContext({});
    var p = function(s) {
      var d = (0, r.useStore)(s);
      return y.createElement(
        c.KBarContext.Provider,
        { value: d },
        y.createElement(h.InternalEvents, null),
        s.children
      );
    };
    c.KBarProvider = p;
  })(zl)), zl;
}
var Jv;
function nn() {
  if (Jv) return De;
  Jv = 1;
  var c = De && De.__assign || function() {
    return c = Object.assign || function(p) {
      for (var s, d = 1, S = arguments.length; d < S; d++) {
        s = arguments[d];
        for (var m in s) Object.prototype.hasOwnProperty.call(s, m) && (p[m] = s[m]);
      }
      return p;
    }, c.apply(this, arguments);
  }, f = De && De.__createBinding || (Object.create ? (function(p, s, d, S) {
    S === void 0 && (S = d), Object.defineProperty(p, S, { enumerable: !0, get: function() {
      return s[d];
    } });
  }) : (function(p, s, d, S) {
    S === void 0 && (S = d), p[S] = s[d];
  })), v = De && De.__setModuleDefault || (Object.create ? (function(p, s) {
    Object.defineProperty(p, "default", { enumerable: !0, value: s });
  }) : function(p, s) {
    p.default = s;
  }), g = De && De.__importStar || function(p) {
    if (p && p.__esModule) return p;
    var s = {};
    if (p != null) for (var d in p) d !== "default" && Object.prototype.hasOwnProperty.call(p, d) && f(s, p, d);
    return v(s, p), s;
  };
  Object.defineProperty(De, "__esModule", { value: !0 }), De.useKBar = void 0;
  var r = g(kt()), y = gh();
  function h(p) {
    var s = r.useContext(y.KBarContext), d = s.query, S = s.getState, m = s.subscribe, b = s.options, R = r.useRef(p == null ? void 0 : p(S())), M = r.useRef(p), j = r.useCallback(function(z) {
      return c(c({}, z), { query: d, options: b });
    }, [d, b]), C = r.useState(j(R.current)), L = C[0], q = C[1];
    return r.useEffect(function() {
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
  return De.useKBar = h, De;
}
function Rl(c) {
  return Array.isArray ? Array.isArray(c) : Sh(c) === "[object Array]";
}
function rm(c) {
  if (typeof c == "string")
    return c;
  let f = c + "";
  return f == "0" && 1 / c == -1 / 0 ? "-0" : f;
}
function om(c) {
  return c == null ? "" : rm(c);
}
function il(c) {
  return typeof c == "string";
}
function ph(c) {
  return typeof c == "number";
}
function sm(c) {
  return c === !0 || c === !1 || dm(c) && Sh(c) == "[object Boolean]";
}
function _h(c) {
  return typeof c == "object";
}
function dm(c) {
  return _h(c) && c !== null;
}
function Be(c) {
  return c != null;
}
function dr(c) {
  return !c.trim().length;
}
function Sh(c) {
  return c == null ? c === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(c);
}
const vm = "Incorrect 'index' type", hm = (c) => `Invalid value for key ${c}`, ym = (c) => `Pattern length exceeds max of ${c}.`, mm = (c) => `Missing ${c} property in key`, gm = (c) => `Property 'weight' in key '${c}' must be a positive integer`, $v = Object.prototype.hasOwnProperty;
class pm {
  constructor(f) {
    this._keys = [], this._keyMap = {};
    let v = 0;
    f.forEach((g) => {
      let r = bh(g);
      v += r.weight, this._keys.push(r), this._keyMap[r.id] = r, v += r.weight;
    }), this._keys.forEach((g) => {
      g.weight /= v;
    });
  }
  get(f) {
    return this._keyMap[f];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function bh(c) {
  let f = null, v = null, g = null, r = 1, y = null;
  if (il(c) || Rl(c))
    g = c, f = Wv(c), v = _r(c);
  else {
    if (!$v.call(c, "name"))
      throw new Error(mm("name"));
    const h = c.name;
    if (g = h, $v.call(c, "weight") && (r = c.weight, r <= 0))
      throw new Error(gm(h));
    f = Wv(h), v = _r(h), y = c.getFn;
  }
  return { path: f, id: v, weight: r, src: g, getFn: y };
}
function Wv(c) {
  return Rl(c) ? c : c.split(".");
}
function _r(c) {
  return Rl(c) ? c.join(".") : c;
}
function _m(c, f) {
  let v = [], g = !1;
  const r = (y, h, p) => {
    if (Be(y))
      if (!h[p])
        v.push(y);
      else {
        let s = h[p];
        const d = y[s];
        if (!Be(d))
          return;
        if (p === h.length - 1 && (il(d) || ph(d) || sm(d)))
          v.push(om(d));
        else if (Rl(d)) {
          g = !0;
          for (let S = 0, m = d.length; S < m; S += 1)
            r(d[S], h, p + 1);
        } else h.length && r(d, h, p + 1);
      }
  };
  return r(c, il(f) ? f.split(".") : f, 0), g ? v : v[0];
}
const Sm = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: !1,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: !1,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
}, bm = {
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
  sortFn: (c, f) => c.score === f.score ? c.idx < f.idx ? -1 : 1 : c.score < f.score ? -1 : 1
}, Om = {
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
}, Em = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: !1,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: _m,
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
  ...bm,
  ...Sm,
  ...Om,
  ...Em
};
const Mm = /[^ ]+/g;
function Am(c = 1, f = 3) {
  const v = /* @__PURE__ */ new Map(), g = Math.pow(10, f);
  return {
    get(r) {
      const y = r.match(Mm).length;
      if (v.has(y))
        return v.get(y);
      const h = 1 / Math.pow(y, 0.5 * c), p = parseFloat(Math.round(h * g) / g);
      return v.set(y, p), p;
    },
    clear() {
      v.clear();
    }
  };
}
class Tr {
  constructor({
    getFn: f = rt.getFn,
    fieldNormWeight: v = rt.fieldNormWeight
  } = {}) {
    this.norm = Am(v, 3), this.getFn = f, this.isCreated = !1, this.setIndexRecords();
  }
  setSources(f = []) {
    this.docs = f;
  }
  setIndexRecords(f = []) {
    this.records = f;
  }
  setKeys(f = []) {
    this.keys = f, this._keysMap = {}, f.forEach((v, g) => {
      this._keysMap[v.id] = g;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, il(this.docs[0]) ? this.docs.forEach((f, v) => {
      this._addString(f, v);
    }) : this.docs.forEach((f, v) => {
      this._addObject(f, v);
    }), this.norm.clear());
  }
  // Adds a doc to the end of the index
  add(f) {
    const v = this.size();
    il(f) ? this._addString(f, v) : this._addObject(f, v);
  }
  // Removes the doc at the specified index of the index
  removeAt(f) {
    this.records.splice(f, 1);
    for (let v = f, g = this.size(); v < g; v += 1)
      this.records[v].i -= 1;
  }
  getValueForItemAtKeyId(f, v) {
    return f[this._keysMap[v]];
  }
  size() {
    return this.records.length;
  }
  _addString(f, v) {
    if (!Be(f) || dr(f))
      return;
    let g = {
      v: f,
      i: v,
      n: this.norm.get(f)
    };
    this.records.push(g);
  }
  _addObject(f, v) {
    let g = { i: v, $: {} };
    this.keys.forEach((r, y) => {
      let h = r.getFn ? r.getFn(f) : this.getFn(f, r.path);
      if (Be(h)) {
        if (Rl(h)) {
          let p = [];
          const s = [{ nestedArrIndex: -1, value: h }];
          for (; s.length; ) {
            const { nestedArrIndex: d, value: S } = s.pop();
            if (Be(S))
              if (il(S) && !dr(S)) {
                let m = {
                  v: S,
                  i: d,
                  n: this.norm.get(S)
                };
                p.push(m);
              } else Rl(S) && S.forEach((m, b) => {
                s.push({
                  nestedArrIndex: b,
                  value: m
                });
              });
          }
          g.$[y] = p;
        } else if (il(h) && !dr(h)) {
          let p = {
            v: h,
            n: this.norm.get(h)
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
function Oh(c, f, { getFn: v = rt.getFn, fieldNormWeight: g = rt.fieldNormWeight } = {}) {
  const r = new Tr({ getFn: v, fieldNormWeight: g });
  return r.setKeys(c.map(bh)), r.setSources(f), r.create(), r;
}
function zm(c, { getFn: f = rt.getFn, fieldNormWeight: v = rt.fieldNormWeight } = {}) {
  const { keys: g, records: r } = c, y = new Tr({ getFn: f, fieldNormWeight: v });
  return y.setKeys(g), y.setIndexRecords(r), y;
}
function Ki(c, {
  errors: f = 0,
  currentLocation: v = 0,
  expectedLocation: g = 0,
  distance: r = rt.distance,
  ignoreLocation: y = rt.ignoreLocation
} = {}) {
  const h = f / c.length;
  if (y)
    return h;
  const p = Math.abs(g - v);
  return r ? h + p / r : p ? 1 : h;
}
function Tm(c = [], f = rt.minMatchCharLength) {
  let v = [], g = -1, r = -1, y = 0;
  for (let h = c.length; y < h; y += 1) {
    let p = c[y];
    p && g === -1 ? g = y : !p && g !== -1 && (r = y - 1, r - g + 1 >= f && v.push([g, r]), g = -1);
  }
  return c[y - 1] && y - g >= f && v.push([g, y - 1]), v;
}
const Cn = 32;
function Rm(c, f, v, {
  location: g = rt.location,
  distance: r = rt.distance,
  threshold: y = rt.threshold,
  findAllMatches: h = rt.findAllMatches,
  minMatchCharLength: p = rt.minMatchCharLength,
  includeMatches: s = rt.includeMatches,
  ignoreLocation: d = rt.ignoreLocation
} = {}) {
  if (f.length > Cn)
    throw new Error(ym(Cn));
  const S = f.length, m = c.length, b = Math.max(0, Math.min(g, m));
  let R = y, M = b;
  const j = p > 1 || s, C = j ? Array(m) : [];
  let L;
  for (; (L = c.indexOf(f, M)) > -1; ) {
    let P = Ki(f, {
      currentLocation: L,
      expectedLocation: b,
      distance: r,
      ignoreLocation: d
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
    let tt = 0, k = H;
    for (; tt < k; )
      Ki(f, {
        errors: P,
        currentLocation: b + k,
        expectedLocation: b,
        distance: r,
        ignoreLocation: d
      }) <= R ? tt = k : H = k, k = Math.floor((H - tt) / 2 + tt);
    H = k;
    let D = Math.max(1, b - k + 1), A = h ? m : Math.min(b + k, m) + S, W = Array(A + 2);
    W[A + 1] = (1 << P) - 1;
    for (let V = A; V >= D; V -= 1) {
      let I = V - 1, Y = v[c.charAt(I)];
      if (j && (C[I] = +!!Y), W[V] = (W[V + 1] << 1 | 1) & Y, P && (W[V] |= (q[V + 1] | q[V]) << 1 | 1 | q[V + 1]), W[V] & X && (z = Ki(f, {
        errors: P,
        currentLocation: I,
        expectedLocation: b,
        distance: r,
        ignoreLocation: d
      }), z <= R)) {
        if (R = z, M = I, M <= b)
          break;
        D = Math.max(1, 2 * b - M);
      }
    }
    if (Ki(f, {
      errors: P + 1,
      currentLocation: b,
      expectedLocation: b,
      distance: r,
      ignoreLocation: d
    }) > R)
      break;
    q = W;
  }
  const F = {
    isMatch: M >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, z)
  };
  if (j) {
    const P = Tm(C, p);
    P.length ? s && (F.indices = P) : F.isMatch = !1;
  }
  return F;
}
function Dm(c) {
  let f = {};
  for (let v = 0, g = c.length; v < g; v += 1) {
    const r = c.charAt(v);
    f[r] = (f[r] || 0) | 1 << g - v - 1;
  }
  return f;
}
class Eh {
  constructor(f, {
    location: v = rt.location,
    threshold: g = rt.threshold,
    distance: r = rt.distance,
    includeMatches: y = rt.includeMatches,
    findAllMatches: h = rt.findAllMatches,
    minMatchCharLength: p = rt.minMatchCharLength,
    isCaseSensitive: s = rt.isCaseSensitive,
    ignoreLocation: d = rt.ignoreLocation
  } = {}) {
    if (this.options = {
      location: v,
      threshold: g,
      distance: r,
      includeMatches: y,
      findAllMatches: h,
      minMatchCharLength: p,
      isCaseSensitive: s,
      ignoreLocation: d
    }, this.pattern = s ? f : f.toLowerCase(), this.chunks = [], !this.pattern.length)
      return;
    const S = (b, R) => {
      this.chunks.push({
        pattern: b,
        alphabet: Dm(b),
        startIndex: R
      });
    }, m = this.pattern.length;
    if (m > Cn) {
      let b = 0;
      const R = m % Cn, M = m - R;
      for (; b < M; )
        S(this.pattern.substr(b, Cn), b), b += Cn;
      if (R) {
        const j = m - Cn;
        S(this.pattern.substr(j), j);
      }
    } else
      S(this.pattern, 0);
  }
  searchIn(f) {
    const { isCaseSensitive: v, includeMatches: g } = this.options;
    if (v || (f = f.toLowerCase()), this.pattern === f) {
      let M = {
        isMatch: !0,
        score: 0
      };
      return g && (M.indices = [[0, f.length - 1]]), M;
    }
    const {
      location: r,
      distance: y,
      threshold: h,
      findAllMatches: p,
      minMatchCharLength: s,
      ignoreLocation: d
    } = this.options;
    let S = [], m = 0, b = !1;
    this.chunks.forEach(({ pattern: M, alphabet: j, startIndex: C }) => {
      const { isMatch: L, score: q, indices: z } = Rm(f, M, j, {
        location: r + C,
        distance: y,
        threshold: h,
        findAllMatches: p,
        minMatchCharLength: s,
        includeMatches: g,
        ignoreLocation: d
      });
      L && (b = !0), m += q, L && z && (S = [...S, ...z]);
    });
    let R = {
      isMatch: b,
      score: b ? m / this.chunks.length : 1
    };
    return b && g && (R.indices = S), R;
  }
}
class an {
  constructor(f) {
    this.pattern = f;
  }
  static isMultiMatch(f) {
    return kv(f, this.multiRegex);
  }
  static isSingleMatch(f) {
    return kv(f, this.singleRegex);
  }
  search() {
  }
}
function kv(c, f) {
  const v = c.match(f);
  return v ? v[1] : null;
}
class jm extends an {
  constructor(f) {
    super(f);
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
  search(f) {
    const v = f === this.pattern;
    return {
      isMatch: v,
      score: v ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class Cm extends an {
  constructor(f) {
    super(f);
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
  search(f) {
    const g = f.indexOf(this.pattern) === -1;
    return {
      isMatch: g,
      score: g ? 0 : 1,
      indices: [0, f.length - 1]
    };
  }
}
class Nm extends an {
  constructor(f) {
    super(f);
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
  search(f) {
    const v = f.startsWith(this.pattern);
    return {
      isMatch: v,
      score: v ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class Um extends an {
  constructor(f) {
    super(f);
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
  search(f) {
    const v = !f.startsWith(this.pattern);
    return {
      isMatch: v,
      score: v ? 0 : 1,
      indices: [0, f.length - 1]
    };
  }
}
class Bm extends an {
  constructor(f) {
    super(f);
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
  search(f) {
    const v = f.endsWith(this.pattern);
    return {
      isMatch: v,
      score: v ? 0 : 1,
      indices: [f.length - this.pattern.length, f.length - 1]
    };
  }
}
class qm extends an {
  constructor(f) {
    super(f);
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
  search(f) {
    const v = !f.endsWith(this.pattern);
    return {
      isMatch: v,
      score: v ? 0 : 1,
      indices: [0, f.length - 1]
    };
  }
}
class Mh extends an {
  constructor(f, {
    location: v = rt.location,
    threshold: g = rt.threshold,
    distance: r = rt.distance,
    includeMatches: y = rt.includeMatches,
    findAllMatches: h = rt.findAllMatches,
    minMatchCharLength: p = rt.minMatchCharLength,
    isCaseSensitive: s = rt.isCaseSensitive,
    ignoreLocation: d = rt.ignoreLocation
  } = {}) {
    super(f), this._bitapSearch = new Eh(f, {
      location: v,
      threshold: g,
      distance: r,
      includeMatches: y,
      findAllMatches: h,
      minMatchCharLength: p,
      isCaseSensitive: s,
      ignoreLocation: d
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
  search(f) {
    return this._bitapSearch.searchIn(f);
  }
}
class Ah extends an {
  constructor(f) {
    super(f);
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
  search(f) {
    let v = 0, g;
    const r = [], y = this.pattern.length;
    for (; (g = f.indexOf(this.pattern, v)) > -1; )
      v = g + y, r.push([g, v - 1]);
    const h = !!r.length;
    return {
      isMatch: h,
      score: h ? 0 : 1,
      indices: r
    };
  }
}
const Sr = [
  jm,
  Ah,
  Nm,
  Um,
  qm,
  Bm,
  Cm,
  Mh
], Fv = Sr.length, xm = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, Hm = "|";
function Ym(c, f = {}) {
  return c.split(Hm).map((v) => {
    let g = v.trim().split(xm).filter((y) => y && !!y.trim()), r = [];
    for (let y = 0, h = g.length; y < h; y += 1) {
      const p = g[y];
      let s = !1, d = -1;
      for (; !s && ++d < Fv; ) {
        const S = Sr[d];
        let m = S.isMultiMatch(p);
        m && (r.push(new S(m, f)), s = !0);
      }
      if (!s)
        for (d = -1; ++d < Fv; ) {
          const S = Sr[d];
          let m = S.isSingleMatch(p);
          if (m) {
            r.push(new S(m, f));
            break;
          }
        }
    }
    return r;
  });
}
const Km = /* @__PURE__ */ new Set([Mh.type, Ah.type]);
class Lm {
  constructor(f, {
    isCaseSensitive: v = rt.isCaseSensitive,
    includeMatches: g = rt.includeMatches,
    minMatchCharLength: r = rt.minMatchCharLength,
    ignoreLocation: y = rt.ignoreLocation,
    findAllMatches: h = rt.findAllMatches,
    location: p = rt.location,
    threshold: s = rt.threshold,
    distance: d = rt.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: v,
      includeMatches: g,
      minMatchCharLength: r,
      findAllMatches: h,
      ignoreLocation: y,
      location: p,
      threshold: s,
      distance: d
    }, this.pattern = v ? f : f.toLowerCase(), this.query = Ym(this.pattern, this.options);
  }
  static condition(f, v) {
    return v.useExtendedSearch;
  }
  searchIn(f) {
    const v = this.query;
    if (!v)
      return {
        isMatch: !1,
        score: 1
      };
    const { includeMatches: g, isCaseSensitive: r } = this.options;
    f = r ? f : f.toLowerCase();
    let y = 0, h = [], p = 0;
    for (let s = 0, d = v.length; s < d; s += 1) {
      const S = v[s];
      h.length = 0, y = 0;
      for (let m = 0, b = S.length; m < b; m += 1) {
        const R = S[m], { isMatch: M, indices: j, score: C } = R.search(f);
        if (M) {
          if (y += 1, p += C, g) {
            const L = R.constructor.type;
            Km.has(L) ? h = [...h, ...j] : h.push(j);
          }
        } else {
          p = 0, y = 0, h.length = 0;
          break;
        }
      }
      if (y) {
        let m = {
          isMatch: !0,
          score: p / y
        };
        return g && (m.indices = h), m;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const br = [];
function Gm(...c) {
  br.push(...c);
}
function Or(c, f) {
  for (let v = 0, g = br.length; v < g; v += 1) {
    let r = br[v];
    if (r.condition(c, f))
      return new r(c, f);
  }
  return new Eh(c, f);
}
const Li = {
  AND: "$and",
  OR: "$or"
}, Er = {
  PATH: "$path",
  PATTERN: "$val"
}, Mr = (c) => !!(c[Li.AND] || c[Li.OR]), Vm = (c) => !!c[Er.PATH], Qm = (c) => !Rl(c) && _h(c) && !Mr(c), Iv = (c) => ({
  [Li.AND]: Object.keys(c).map((f) => ({
    [f]: c[f]
  }))
});
function zh(c, f, { auto: v = !0 } = {}) {
  const g = (r) => {
    let y = Object.keys(r);
    const h = Vm(r);
    if (!h && y.length > 1 && !Mr(r))
      return g(Iv(r));
    if (Qm(r)) {
      const s = h ? r[Er.PATH] : y[0], d = h ? r[Er.PATTERN] : r[s];
      if (!il(d))
        throw new Error(hm(s));
      const S = {
        keyId: _r(s),
        pattern: d
      };
      return v && (S.searcher = Or(d, f)), S;
    }
    let p = {
      children: [],
      operator: y[0]
    };
    return y.forEach((s) => {
      const d = r[s];
      Rl(d) && d.forEach((S) => {
        p.children.push(g(S));
      });
    }), p;
  };
  return Mr(c) || (c = Iv(c)), g(c);
}
function Xm(c, { ignoreFieldNorm: f = rt.ignoreFieldNorm }) {
  c.forEach((v) => {
    let g = 1;
    v.matches.forEach(({ key: r, norm: y, score: h }) => {
      const p = r ? r.weight : null;
      g *= Math.pow(
        h === 0 && p ? Number.EPSILON : h,
        (p || 1) * (f ? 1 : y)
      );
    }), v.score = g;
  });
}
function Zm(c, f) {
  const v = c.matches;
  f.matches = [], Be(v) && v.forEach((g) => {
    if (!Be(g.indices) || !g.indices.length)
      return;
    const { indices: r, value: y } = g;
    let h = {
      indices: r,
      value: y
    };
    g.key && (h.key = g.key.src), g.idx > -1 && (h.refIndex = g.idx), f.matches.push(h);
  });
}
function wm(c, f) {
  f.score = c.score;
}
function Jm(c, f, {
  includeMatches: v = rt.includeMatches,
  includeScore: g = rt.includeScore
} = {}) {
  const r = [];
  return v && r.push(Zm), g && r.push(wm), c.map((y) => {
    const { idx: h } = y, p = {
      item: f[h],
      refIndex: h
    };
    return r.length && r.forEach((s) => {
      s(y, p);
    }), p;
  });
}
class Ea {
  constructor(f, v = {}, g) {
    this.options = { ...rt, ...v }, this.options.useExtendedSearch, this._keyStore = new pm(this.options.keys), this.setCollection(f, g);
  }
  setCollection(f, v) {
    if (this._docs = f, v && !(v instanceof Tr))
      throw new Error(vm);
    this._myIndex = v || Oh(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(f) {
    Be(f) && (this._docs.push(f), this._myIndex.add(f));
  }
  remove(f = () => !1) {
    const v = [];
    for (let g = 0, r = this._docs.length; g < r; g += 1) {
      const y = this._docs[g];
      f(y, g) && (this.removeAt(g), g -= 1, r -= 1, v.push(y));
    }
    return v;
  }
  removeAt(f) {
    this._docs.splice(f, 1), this._myIndex.removeAt(f);
  }
  getIndex() {
    return this._myIndex;
  }
  search(f, { limit: v = -1 } = {}) {
    const {
      includeMatches: g,
      includeScore: r,
      shouldSort: y,
      sortFn: h,
      ignoreFieldNorm: p
    } = this.options;
    let s = il(f) ? il(this._docs[0]) ? this._searchStringList(f) : this._searchObjectList(f) : this._searchLogical(f);
    return Xm(s, { ignoreFieldNorm: p }), y && s.sort(h), ph(v) && v > -1 && (s = s.slice(0, v)), Jm(s, this._docs, {
      includeMatches: g,
      includeScore: r
    });
  }
  _searchStringList(f) {
    const v = Or(f, this.options), { records: g } = this._myIndex, r = [];
    return g.forEach(({ v: y, i: h, n: p }) => {
      if (!Be(y))
        return;
      const { isMatch: s, score: d, indices: S } = v.searchIn(y);
      s && r.push({
        item: y,
        idx: h,
        matches: [{ score: d, value: y, norm: p, indices: S }]
      });
    }), r;
  }
  _searchLogical(f) {
    const v = zh(f, this.options), g = (p, s, d) => {
      if (!p.children) {
        const { keyId: m, searcher: b } = p, R = this._findMatches({
          key: this._keyStore.get(m),
          value: this._myIndex.getValueForItemAtKeyId(s, m),
          searcher: b
        });
        return R && R.length ? [
          {
            idx: d,
            item: s,
            matches: R
          }
        ] : [];
      }
      const S = [];
      for (let m = 0, b = p.children.length; m < b; m += 1) {
        const R = p.children[m], M = g(R, s, d);
        if (M.length)
          S.push(...M);
        else if (p.operator === Li.AND)
          return [];
      }
      return S;
    }, r = this._myIndex.records, y = {}, h = [];
    return r.forEach(({ $: p, i: s }) => {
      if (Be(p)) {
        let d = g(v, p, s);
        d.length && (y[s] || (y[s] = { idx: s, item: p, matches: [] }, h.push(y[s])), d.forEach(({ matches: S }) => {
          y[s].matches.push(...S);
        }));
      }
    }), h;
  }
  _searchObjectList(f) {
    const v = Or(f, this.options), { keys: g, records: r } = this._myIndex, y = [];
    return r.forEach(({ $: h, i: p }) => {
      if (!Be(h))
        return;
      let s = [];
      g.forEach((d, S) => {
        s.push(
          ...this._findMatches({
            key: d,
            value: h[S],
            searcher: v
          })
        );
      }), s.length && y.push({
        idx: p,
        item: h,
        matches: s
      });
    }), y;
  }
  _findMatches({ key: f, value: v, searcher: g }) {
    if (!Be(v))
      return [];
    let r = [];
    if (Rl(v))
      v.forEach(({ v: y, i: h, n: p }) => {
        if (!Be(y))
          return;
        const { isMatch: s, score: d, indices: S } = g.searchIn(y);
        s && r.push({
          score: d,
          key: f,
          value: y,
          idx: h,
          norm: p,
          indices: S
        });
      });
    else {
      const { v: y, n: h } = v, { isMatch: p, score: s, indices: d } = g.searchIn(y);
      p && r.push({ score: s, key: f, value: y, norm: h, indices: d });
    }
    return r;
  }
}
Ea.version = "6.6.2";
Ea.createIndex = Oh;
Ea.parseIndex = zm;
Ea.config = rt;
Ea.parseQuery = zh;
Gm(Lm);
const $m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ea
}, Symbol.toStringTag, { value: "Module" })), Wm = /* @__PURE__ */ hh($m);
var Pv;
function km() {
  return Pv || (Pv = 1, (function(c) {
    var f = ke && ke.__createBinding || (Object.create ? (function(R, M, j, C) {
      C === void 0 && (C = j), Object.defineProperty(R, C, { enumerable: !0, get: function() {
        return M[j];
      } });
    }) : (function(R, M, j, C) {
      C === void 0 && (C = j), R[C] = M[j];
    })), v = ke && ke.__setModuleDefault || (Object.create ? (function(R, M) {
      Object.defineProperty(R, "default", { enumerable: !0, value: M });
    }) : function(R, M) {
      R.default = M;
    }), g = ke && ke.__importStar || function(R) {
      if (R && R.__esModule) return R;
      var M = {};
      if (R != null) for (var j in R) j !== "default" && Object.prototype.hasOwnProperty.call(R, j) && f(M, R, j);
      return v(M, R), M;
    }, r = ke && ke.__importDefault || function(R) {
      return R && R.__esModule ? R : { default: R };
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), c.useDeepMatches = c.useMatches = c.NO_GROUP = void 0;
    var y = g(kt()), h = nn(), p = Bn(), s = r(Wm);
    c.NO_GROUP = {
      name: "none",
      priority: p.Priority.NORMAL
    };
    var d = {
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
      var R = (0, h.useKBar)(function(k) {
        return {
          search: k.searchQuery,
          actions: k.actions,
          rootActionId: k.currentRootActionId
        };
      }), M = R.search, j = R.actions, C = R.rootActionId, L = y.useMemo(function() {
        return Object.keys(j).reduce(function(k, D) {
          var A = j[D];
          if (!A.parent && !C && k.push(A), A.id === C)
            for (var W = 0; W < A.children.length; W++)
              k.push(A.children[W]);
          return k;
        }, []).sort(S);
      }, [j, C]), q = y.useCallback(function(k) {
        for (var D = [], A = 0; A < k.length; A++)
          D.push(k[A]);
        return (function W(w, V) {
          V === void 0 && (V = D);
          for (var I = 0; I < w.length; I++)
            if (w[I].children.length > 0) {
              for (var Y = w[I].children, N = 0; N < Y.length; N++)
                V.push(Y[N]);
              W(w[I].children, V);
            }
          return V;
        })(k);
      }, []), z = !M, H = y.useMemo(function() {
        return z ? L : q(L);
      }, [q, L, z]), X = y.useMemo(function() {
        return new s.default(H, d);
      }, [H]), F = b(H, M, X), P = y.useMemo(function() {
        for (var k, D, A = {}, W = [], w = [], V = 0; V < F.length; V++) {
          var I = F[V], Y = I.action, N = I.score || p.Priority.NORMAL, Q = {
            name: typeof Y.section == "string" ? Y.section : ((k = Y.section) === null || k === void 0 ? void 0 : k.name) || c.NO_GROUP.name,
            priority: typeof Y.section == "string" ? N : ((D = Y.section) === null || D === void 0 ? void 0 : D.priority) || 0 + N
          };
          A[Q.name] || (A[Q.name] = [], W.push(Q)), A[Q.name].push({
            priority: Y.priority + N,
            action: Y
          });
        }
        w = W.sort(S).map(function(O) {
          return {
            name: O.name,
            actions: A[O.name].sort(S).map(function(J) {
              return J.action;
            })
          };
        });
        for (var ut = [], V = 0; V < w.length; V++) {
          var ct = w[V];
          ct.name !== c.NO_GROUP.name && ut.push(ct.name);
          for (var Ot = 0; Ot < ct.actions.length; Ot++)
            ut.push(ct.actions[Ot]);
        }
        return ut;
      }, [F]), tt = y.useMemo(function() {
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
    function b(R, M, j) {
      var C = y.useMemo(function() {
        return {
          filtered: R,
          search: M
        };
      }, [R, M]), L = (0, p.useThrottledValue)(C), q = L.filtered, z = L.search;
      return y.useMemo(function() {
        if (z.trim() === "")
          return q.map(function(F) {
            return { score: 0, action: F };
          });
        var H = [], X = j.search(z);
        return H = X.map(function(F) {
          var P = F.item, tt = F.score;
          return {
            score: 1 / ((tt ?? 0) + 1),
            action: P
          };
        }), H;
      }, [q, z, j]);
    }
    c.useDeepMatches = m;
  })(ke)), ke;
}
var Fe = {}, vr, th;
function Fm() {
  if (th) return vr;
  th = 1;
  var c = Object.create, f = Object.defineProperty, v = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, r = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, h = (j, C) => {
    for (var L in C)
      f(j, L, { get: C[L], enumerable: !0 });
  }, p = (j, C, L, q) => {
    if (C && typeof C == "object" || typeof C == "function")
      for (let z of g(C))
        !y.call(j, z) && z !== L && f(j, z, { get: () => C[z], enumerable: !(q = v(C, z)) || q.enumerable });
    return j;
  }, s = (j, C, L) => (L = j != null ? c(r(j)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !j || !j.__esModule ? f(L, "default", { value: j, enumerable: !0 }) : L,
    j
  )), d = (j) => p(f({}, "__esModule", { value: !0 }), j), S = {};
  h(S, {
    composeRefs: () => R,
    useComposedRefs: () => M
  }), vr = d(S);
  var m = s(kt());
  function b(j, C) {
    if (typeof j == "function")
      return j(C);
    j != null && (j.current = C);
  }
  function R(...j) {
    return (C) => {
      let L = !1;
      const q = j.map((z) => {
        const H = b(z, C);
        return !L && typeof H == "function" && (L = !0), H;
      });
      if (L)
        return () => {
          for (let z = 0; z < q.length; z++) {
            const H = q[z];
            typeof H == "function" ? H() : b(j[z], null);
          }
        };
    };
  }
  function M(...j) {
    return m.useCallback(R(...j), j);
  }
  return vr;
}
var hr, eh;
function Im() {
  if (eh) return hr;
  eh = 1;
  var c = Object.create, f = Object.defineProperty, v = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, r = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, h = (A, W) => {
    for (var w in W)
      f(A, w, { get: W[w], enumerable: !0 });
  }, p = (A, W, w, V) => {
    if (W && typeof W == "object" || typeof W == "function")
      for (let I of g(W))
        !y.call(A, I) && I !== w && f(A, I, { get: () => W[I], enumerable: !(V = v(W, I)) || V.enumerable });
    return A;
  }, s = (A, W, w) => (w = A != null ? c(r(A)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !A || !A.__esModule ? f(w, "default", { value: A, enumerable: !0 }) : w,
    A
  )), d = (A) => p(f({}, "__esModule", { value: !0 }), A), S = {};
  h(S, {
    Root: () => z,
    Slot: () => z,
    Slottable: () => P,
    createSlot: () => q,
    createSlottable: () => F
  }), hr = d(S);
  var m = s(kt()), b = /* @__PURE__ */ Fm(), R = Vi(), M = Symbol.for("react.lazy"), j = m[" use ".trim().toString()];
  function C(A) {
    return typeof A == "object" && A !== null && "then" in A;
  }
  function L(A) {
    return A != null && typeof A == "object" && "$$typeof" in A && A.$$typeof === M && "_payload" in A && C(A._payload);
  }
  // @__NO_SIDE_EFFECTS__
  function q(A) {
    const W = /* @__PURE__ */ H(A), w = m.forwardRef((V, I) => {
      let { children: Y, ...N } = V;
      L(Y) && typeof j == "function" && (Y = j(Y._payload));
      const Q = m.Children.toArray(Y), ut = Q.find(tt);
      if (ut) {
        const ct = ut.props.children, Ot = Q.map((O) => O === ut ? m.Children.count(ct) > 1 ? m.Children.only(null) : m.isValidElement(ct) ? ct.props.children : null : O);
        return /* @__PURE__ */ (0, R.jsx)(W, { ...N, ref: I, children: m.isValidElement(ct) ? m.cloneElement(ct, void 0, Ot) : null });
      }
      return /* @__PURE__ */ (0, R.jsx)(W, { ...N, ref: I, children: Y });
    });
    return w.displayName = `${A}.Slot`, w;
  }
  var z = /* @__PURE__ */ q("Slot");
  // @__NO_SIDE_EFFECTS__
  function H(A) {
    const W = m.forwardRef((w, V) => {
      let { children: I, ...Y } = w;
      if (L(I) && typeof j == "function" && (I = j(I._payload)), m.isValidElement(I)) {
        const N = D(I), Q = k(Y, I.props);
        return I.type !== m.Fragment && (Q.ref = V ? (0, b.composeRefs)(V, N) : N), m.cloneElement(I, Q);
      }
      return m.Children.count(I) > 1 ? m.Children.only(null) : null;
    });
    return W.displayName = `${A}.SlotClone`, W;
  }
  var X = Symbol("radix.slottable");
  // @__NO_SIDE_EFFECTS__
  function F(A) {
    const W = ({ children: w }) => /* @__PURE__ */ (0, R.jsx)(R.Fragment, { children: w });
    return W.displayName = `${A}.Slottable`, W.__radixId = X, W;
  }
  var P = /* @__PURE__ */ F("Slottable");
  function tt(A) {
    return m.isValidElement(A) && typeof A.type == "function" && "__radixId" in A.type && A.type.__radixId === X;
  }
  function k(A, W) {
    const w = { ...W };
    for (const V in W) {
      const I = A[V], Y = W[V];
      /^on[A-Z]/.test(V) ? I && Y ? w[V] = (...Q) => {
        const ut = Y(...Q);
        return I(...Q), ut;
      } : I && (w[V] = I) : V === "style" ? w[V] = { ...I, ...Y } : V === "className" && (w[V] = [I, Y].filter(Boolean).join(" "));
    }
    return { ...A, ...w };
  }
  function D(A) {
    var V, I;
    let W = (V = Object.getOwnPropertyDescriptor(A.props, "ref")) == null ? void 0 : V.get, w = W && "isReactWarning" in W && W.isReactWarning;
    return w ? A.ref : (W = (I = Object.getOwnPropertyDescriptor(A, "ref")) == null ? void 0 : I.get, w = W && "isReactWarning" in W && W.isReactWarning, w ? A.props.ref : A.props.ref || A.ref);
  }
  return hr;
}
var yr, lh;
function Pm() {
  if (lh) return yr;
  lh = 1;
  var c = Object.create, f = Object.defineProperty, v = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, r = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, h = (z, H) => {
    for (var X in H)
      f(z, X, { get: H[X], enumerable: !0 });
  }, p = (z, H, X, F) => {
    if (H && typeof H == "object" || typeof H == "function")
      for (let P of g(H))
        !y.call(z, P) && P !== X && f(z, P, { get: () => H[P], enumerable: !(F = v(H, P)) || F.enumerable });
    return z;
  }, s = (z, H, X) => (X = z != null ? c(r(z)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !z || !z.__esModule ? f(X, "default", { value: z, enumerable: !0 }) : X,
    z
  )), d = (z) => p(f({}, "__esModule", { value: !0 }), z), S = {};
  h(S, {
    Primitive: () => C,
    Root: () => q,
    dispatchDiscreteCustomEvent: () => L
  }), yr = d(S);
  var m = s(kt()), b = s(Ar()), R = /* @__PURE__ */ Im(), M = Vi(), j = [
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
    const X = (0, R.createSlot)(`Primitive.${H}`), F = m.forwardRef((P, tt) => {
      const { asChild: k, ...D } = P, A = k ? X : H;
      return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, M.jsx)(A, { ...D, ref: tt });
    });
    return F.displayName = `Primitive.${H}`, { ...z, [H]: F };
  }, {});
  function L(z, H) {
    z && b.flushSync(() => z.dispatchEvent(H));
  }
  var q = C;
  return yr;
}
var mr, nh;
function tg() {
  if (nh) return mr;
  nh = 1;
  var c = Object.create, f = Object.defineProperty, v = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, r = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, h = (R, M) => {
    for (var j in M)
      f(R, j, { get: M[j], enumerable: !0 });
  }, p = (R, M, j, C) => {
    if (M && typeof M == "object" || typeof M == "function")
      for (let L of g(M))
        !y.call(R, L) && L !== j && f(R, L, { get: () => M[L], enumerable: !(C = v(M, L)) || C.enumerable });
    return R;
  }, s = (R, M, j) => (j = R != null ? c(r(R)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !R || !R.__esModule ? f(j, "default", { value: R, enumerable: !0 }) : j,
    R
  )), d = (R) => p(f({}, "__esModule", { value: !0 }), R), S = {};
  h(S, {
    useLayoutEffect: () => b
  }), mr = d(S);
  var m = s(kt()), b = globalThis != null && globalThis.document ? m.useLayoutEffect : () => {
  };
  return mr;
}
var gr, ah;
function eg() {
  if (ah) return gr;
  ah = 1;
  var c = Object.create, f = Object.defineProperty, v = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, r = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty, h = (z, H) => {
    for (var X in H)
      f(z, X, { get: H[X], enumerable: !0 });
  }, p = (z, H, X, F) => {
    if (H && typeof H == "object" || typeof H == "function")
      for (let P of g(H))
        !y.call(z, P) && P !== X && f(z, P, { get: () => H[P], enumerable: !(F = v(H, P)) || F.enumerable });
    return z;
  }, s = (z, H, X) => (X = z != null ? c(r(z)) : {}, p(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !z || !z.__esModule ? f(X, "default", { value: z, enumerable: !0 }) : X,
    z
  )), d = (z) => p(f({}, "__esModule", { value: !0 }), z), S = {};
  h(S, {
    Portal: () => L,
    Root: () => q
  }), gr = d(S);
  var m = s(kt()), b = s(Ar()), R = /* @__PURE__ */ Pm(), M = /* @__PURE__ */ tg(), j = Vi(), C = "Portal", L = m.forwardRef((z, H) => {
    var D;
    const { container: X, ...F } = z, [P, tt] = m.useState(!1);
    (0, M.useLayoutEffect)(() => tt(!0), []);
    const k = X || P && ((D = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : D.body);
    return k ? b.default.createPortal(/* @__PURE__ */ (0, j.jsx)(R.Primitive.div, { ...F, ref: H }), k) : null;
  });
  L.displayName = C;
  var q = L;
  return gr;
}
var uh;
function lg() {
  if (uh) return Fe;
  uh = 1;
  var c = Fe && Fe.__createBinding || (Object.create ? (function(s, d, S, m) {
    m === void 0 && (m = S), Object.defineProperty(s, m, { enumerable: !0, get: function() {
      return d[S];
    } });
  }) : (function(s, d, S, m) {
    m === void 0 && (m = S), s[m] = d[S];
  })), f = Fe && Fe.__setModuleDefault || (Object.create ? (function(s, d) {
    Object.defineProperty(s, "default", { enumerable: !0, value: d });
  }) : function(s, d) {
    s.default = d;
  }), v = Fe && Fe.__importStar || function(s) {
    if (s && s.__esModule) return s;
    var d = {};
    if (s != null) for (var S in s) S !== "default" && Object.prototype.hasOwnProperty.call(s, S) && c(d, s, S);
    return f(d, s), d;
  };
  Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.KBarPortal = void 0;
  var g = /* @__PURE__ */ eg(), r = v(kt()), y = Oa(), h = nn();
  function p(s) {
    var d = s.children, S = s.container, m = (0, h.useKBar)(function(b) {
      return {
        showing: b.visualState !== y.VisualState.hidden
      };
    }).showing;
    return m ? r.createElement(g.Portal, { container: S }, d) : null;
  }
  return Fe.KBarPortal = p, Fe;
}
var se = {}, ih;
function ng() {
  if (ih) return se;
  ih = 1;
  var c = se && se.__assign || function() {
    return c = Object.assign || function(s) {
      for (var d, S = 1, m = arguments.length; S < m; S++) {
        d = arguments[S];
        for (var b in d) Object.prototype.hasOwnProperty.call(d, b) && (s[b] = d[b]);
      }
      return s;
    }, c.apply(this, arguments);
  }, f = se && se.__createBinding || (Object.create ? (function(s, d, S, m) {
    m === void 0 && (m = S), Object.defineProperty(s, m, { enumerable: !0, get: function() {
      return d[S];
    } });
  }) : (function(s, d, S, m) {
    m === void 0 && (m = S), s[m] = d[S];
  })), v = se && se.__setModuleDefault || (Object.create ? (function(s, d) {
    Object.defineProperty(s, "default", { enumerable: !0, value: d });
  }) : function(s, d) {
    s.default = d;
  }), g = se && se.__importStar || function(s) {
    if (s && s.__esModule) return s;
    var d = {};
    if (s != null) for (var S in s) S !== "default" && Object.prototype.hasOwnProperty.call(s, S) && f(d, s, S);
    return v(d, s), d;
  }, r = se && se.__rest || function(s, d) {
    var S = {};
    for (var m in s) Object.prototype.hasOwnProperty.call(s, m) && d.indexOf(m) < 0 && (S[m] = s[m]);
    if (s != null && typeof Object.getOwnPropertySymbols == "function")
      for (var b = 0, m = Object.getOwnPropertySymbols(s); b < m.length; b++)
        d.indexOf(m[b]) < 0 && Object.prototype.propertyIsEnumerable.call(s, m[b]) && (S[m[b]] = s[m[b]]);
    return S;
  };
  Object.defineProperty(se, "__esModule", { value: !0 }), se.KBarPositioner = void 0;
  var y = g(kt()), h = {
    position: "fixed",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    inset: "0px",
    padding: "14vh 16px 16px"
  };
  function p(s) {
    return s ? c(c({}, h), s) : h;
  }
  return se.KBarPositioner = y.forwardRef(function(s, d) {
    var S = s.style, m = s.children, b = r(s, ["style", "children"]);
    return y.createElement("div", c({ ref: d, style: p(S) }, b), m);
  }), se;
}
var Ce = {}, ch;
function Th() {
  return ch || (ch = 1, (function(c) {
    var f = Ce && Ce.__assign || function() {
      return f = Object.assign || function(m) {
        for (var b, R = 1, M = arguments.length; R < M; R++) {
          b = arguments[R];
          for (var j in b) Object.prototype.hasOwnProperty.call(b, j) && (m[j] = b[j]);
        }
        return m;
      }, f.apply(this, arguments);
    }, v = Ce && Ce.__createBinding || (Object.create ? (function(m, b, R, M) {
      M === void 0 && (M = R), Object.defineProperty(m, M, { enumerable: !0, get: function() {
        return b[R];
      } });
    }) : (function(m, b, R, M) {
      M === void 0 && (M = R), m[M] = b[R];
    })), g = Ce && Ce.__setModuleDefault || (Object.create ? (function(m, b) {
      Object.defineProperty(m, "default", { enumerable: !0, value: b });
    }) : function(m, b) {
      m.default = b;
    }), r = Ce && Ce.__importStar || function(m) {
      if (m && m.__esModule) return m;
      var b = {};
      if (m != null) for (var R in m) R !== "default" && Object.prototype.hasOwnProperty.call(m, R) && v(b, m, R);
      return g(b, m), b;
    }, y = Ce && Ce.__rest || function(m, b) {
      var R = {};
      for (var M in m) Object.prototype.hasOwnProperty.call(m, M) && b.indexOf(M) < 0 && (R[M] = m[M]);
      if (m != null && typeof Object.getOwnPropertySymbols == "function")
        for (var j = 0, M = Object.getOwnPropertySymbols(m); j < M.length; j++)
          b.indexOf(M[j]) < 0 && Object.prototype.propertyIsEnumerable.call(m, M[j]) && (R[M[j]] = m[M[j]]);
      return R;
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), c.KBarSearch = c.getListboxItemId = c.KBAR_LISTBOX = void 0;
    var h = r(kt()), p = Oa(), s = nn();
    c.KBAR_LISTBOX = "kbar-listbox";
    var d = function(m) {
      return "kbar-listbox-item-" + m;
    };
    c.getListboxItemId = d;
    function S(m) {
      var b = (0, s.useKBar)(function(D) {
        return {
          search: D.searchQuery,
          currentRootActionId: D.currentRootActionId,
          actions: D.actions,
          activeIndex: D.activeIndex,
          showing: D.visualState === p.VisualState.showing
        };
      }), R = b.query, M = b.search, j = b.actions, C = b.currentRootActionId, L = b.activeIndex, q = b.showing, z = b.options, H = h.useState(M), X = H[0], F = H[1];
      h.useEffect(function() {
        R.setSearch(X);
      }, [X, R]);
      var P = m.defaultPlaceholder, tt = y(m, ["defaultPlaceholder"]);
      h.useEffect(function() {
        return R.setSearch(""), R.getInput().focus(), function() {
          return R.setSearch("");
        };
      }, [C, R]);
      var k = h.useMemo(function() {
        var D = P ?? "Type a command or search…";
        return C && j[C] ? j[C].name : D;
      }, [j, C, P]);
      return h.createElement("input", f({}, tt, { ref: R.inputRefSetter, autoFocus: !0, autoComplete: "off", role: "combobox", spellCheck: "false", "aria-expanded": q, "aria-controls": c.KBAR_LISTBOX, "aria-activedescendant": (0, c.getListboxItemId)(L), value: X, placeholder: k, onChange: function(D) {
        var A, W, w;
        (A = m.onChange) === null || A === void 0 || A.call(m, D), F(D.target.value), (w = (W = z == null ? void 0 : z.callbacks) === null || W === void 0 ? void 0 : W.onQueryChange) === null || w === void 0 || w.call(W, D.target.value);
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
    for (var f = 1; f < arguments.length; f++) {
      var v = arguments[f];
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (c[g] = v[g]);
    }
    return c;
  }, Nn.apply(this, arguments);
}
function ag(c, f) {
  if (c == null) return {};
  var v = {}, g = Object.keys(c), r, y;
  for (y = 0; y < g.length; y++)
    r = g[y], !(f.indexOf(r) >= 0) && (v[r] = c[r]);
  return v;
}
var ug = ["bottom", "height", "left", "right", "top", "width"], ig = function(f, v) {
  return f === void 0 && (f = {}), v === void 0 && (v = {}), ug.some(function(g) {
    return f[g] !== v[g];
  });
}, ln = /* @__PURE__ */ new Map(), Rh, cg = function c() {
  var f = [];
  ln.forEach(function(v, g) {
    var r = g.getBoundingClientRect();
    ig(r, v.rect) && (v.rect = r, f.push(v));
  }), f.forEach(function(v) {
    v.callbacks.forEach(function(g) {
      return g(v.rect);
    });
  }), Rh = window.requestAnimationFrame(c);
};
function fg(c, f) {
  return {
    observe: function() {
      var g = ln.size === 0;
      ln.has(c) ? ln.get(c).callbacks.push(f) : ln.set(c, {
        rect: void 0,
        hasRectChanged: !1,
        callbacks: [f]
      }), g && cg();
    },
    unobserve: function() {
      var g = ln.get(c);
      if (g) {
        var r = g.callbacks.indexOf(f);
        r >= 0 && g.callbacks.splice(r, 1), g.callbacks.length || ln.delete(c), ln.size || cancelAnimationFrame(Rh);
      }
    }
  };
}
var Gi = typeof window < "u" ? Gt.useLayoutEffect : Gt.useEffect;
function rg(c, f) {
  f === void 0 && (f = {
    width: 0,
    height: 0
  });
  var v = Gt.useState(c.current), g = v[0], r = v[1], y = Gt.useReducer(og, f), h = y[0], p = y[1], s = Gt.useRef(!1);
  return Gi(function() {
    c.current !== g && r(c.current);
  }), Gi(function() {
    if (g && !s.current) {
      s.current = !0;
      var d = g.getBoundingClientRect();
      p({
        rect: d
      });
    }
  }, [g]), Gt.useEffect(function() {
    if (g) {
      var d = fg(g, function(S) {
        p({
          rect: S
        });
      });
      return d.observe(), function() {
        d.unobserve();
      };
    }
  }, [g]), h;
}
function og(c, f) {
  var v = f.rect;
  return c.height !== v.height || c.width !== v.width ? v : c;
}
var sg = function() {
  return 50;
}, dg = function(f) {
  return f;
}, vg = function(f, v) {
  var g = v ? "offsetWidth" : "offsetHeight";
  return f[g];
}, Dh = function(f) {
  for (var v = Math.max(f.start - f.overscan, 0), g = Math.min(f.end + f.overscan, f.size - 1), r = [], y = v; y <= g; y++)
    r.push(y);
  return r;
};
function hg(c) {
  var f, v = c.size, g = v === void 0 ? 0 : v, r = c.estimateSize, y = r === void 0 ? sg : r, h = c.overscan, p = h === void 0 ? 1 : h, s = c.paddingStart, d = s === void 0 ? 0 : s, S = c.paddingEnd, m = S === void 0 ? 0 : S, b = c.parentRef, R = c.horizontal, M = c.scrollToFn, j = c.useObserver, C = c.initialRect, L = c.onScrollElement, q = c.scrollOffsetFn, z = c.keyExtractor, H = z === void 0 ? dg : z, X = c.measureSize, F = X === void 0 ? vg : X, P = c.rangeExtractor, tt = P === void 0 ? Dh : P, k = R ? "width" : "height", D = R ? "scrollLeft" : "scrollTop", A = Gt.useRef({
    scrollOffset: 0,
    measurements: []
  }), W = Gt.useState(0), w = W[0], V = W[1];
  A.current.scrollOffset = w;
  var I = j || rg, Y = I(b, C), N = Y[k];
  A.current.outerSize = N;
  var Q = Gt.useCallback(function(Nt) {
    b.current && (b.current[D] = Nt);
  }, [b, D]), ut = M || Q;
  M = Gt.useCallback(function(Nt) {
    ut(Nt, Q);
  }, [Q, ut]);
  var ct = Gt.useState({}), Ot = ct[0], O = ct[1], J = Gt.useCallback(function() {
    return O({});
  }, []), et = Gt.useRef([]), lt = Gt.useMemo(function() {
    var Nt = et.current.length > 0 ? Math.min.apply(Math, et.current) : 0;
    et.current = [];
    for (var Vt = A.current.measurements.slice(0, Nt), Rt = Nt; Rt < g; Rt++) {
      var ce = H(Rt), Zt = Ot[ce], we = Vt[Rt - 1] ? Vt[Rt - 1].end : d, Ht = typeof Zt == "number" ? Zt : y(Rt), qe = we + Ht;
      Vt[Rt] = {
        index: Rt,
        start: we,
        size: Ht,
        end: qe,
        key: ce
      };
    }
    return Vt;
  }, [y, Ot, d, g, H]), ht = (((f = lt[g - 1]) == null ? void 0 : f.end) || d) + m;
  A.current.measurements = lt, A.current.totalSize = ht;
  var st = L ? L.current : b.current, bt = Gt.useRef(q);
  bt.current = q, Gi(function() {
    if (!st) {
      V(0);
      return;
    }
    var Nt = function(Rt) {
      var ce = bt.current ? bt.current(Rt) : st[D];
      V(ce);
    };
    return Nt(), st.addEventListener("scroll", Nt, {
      capture: !1,
      passive: !0
    }), function() {
      st.removeEventListener("scroll", Nt);
    };
  }, [st, D]);
  var Pt = mg(A.current), xt = Pt.start, Dl = Pt.end, jl = Gt.useMemo(function() {
    return tt({
      start: xt,
      end: Dl,
      overscan: p,
      size: lt.length
    });
  }, [xt, Dl, p, lt.length, tt]), qn = Gt.useRef(F);
  qn.current = F;
  var Su = Gt.useMemo(function() {
    for (var Nt = [], Vt = function(we, Ht) {
      var qe = jl[we], fn = lt[qe], tl = Nn(Nn({}, fn), {}, {
        measureRef: function(xn) {
          if (xn) {
            var Hn = qn.current(xn, R);
            if (Hn !== tl.size) {
              var bu = A.current.scrollOffset;
              tl.start < bu && Q(bu + (Hn - tl.size)), et.current.push(qe), O(function(Xi) {
                var cl;
                return Nn(Nn({}, Xi), {}, (cl = {}, cl[tl.key] = Hn, cl));
              });
            }
          }
        }
      });
      Nt.push(tl);
    }, Rt = 0, ce = jl.length; Rt < ce; Rt++)
      Vt(Rt);
    return Nt;
  }, [jl, Q, R, lt]), Pe = Gt.useRef(!1);
  Gi(function() {
    Pe.current && O({}), Pe.current = !0;
  }, [y]);
  var un = Gt.useCallback(function(Nt, Vt) {
    var Rt = Vt === void 0 ? {} : Vt, ce = Rt.align, Zt = ce === void 0 ? "start" : ce, we = A.current, Ht = we.scrollOffset, qe = we.outerSize;
    Zt === "auto" && (Nt <= Ht ? Zt = "start" : Nt >= Ht + qe ? Zt = "end" : Zt = "start"), Zt === "start" ? M(Nt) : Zt === "end" ? M(Nt - qe) : Zt === "center" && M(Nt - qe / 2);
  }, [M]), cn = Gt.useCallback(function(Nt, Vt) {
    var Rt = Vt === void 0 ? {} : Vt, ce = Rt.align, Zt = ce === void 0 ? "auto" : ce, we = ag(Rt, ["align"]), Ht = A.current, qe = Ht.measurements, fn = Ht.scrollOffset, tl = Ht.outerSize, _e = qe[Math.max(0, Math.min(Nt, g - 1))];
    if (_e) {
      if (Zt === "auto")
        if (_e.end >= fn + tl)
          Zt = "end";
        else if (_e.start <= fn)
          Zt = "start";
        else
          return;
      var xn = Zt === "center" ? _e.start + _e.size / 2 : Zt === "end" ? _e.end : _e.start;
      un(xn, Nn({
        align: Zt
      }, we));
    }
  }, [un, g]), Qi = Gt.useCallback(function() {
    for (var Nt = arguments.length, Vt = new Array(Nt), Rt = 0; Rt < Nt; Rt++)
      Vt[Rt] = arguments[Rt];
    cn.apply(void 0, Vt), requestAnimationFrame(function() {
      cn.apply(void 0, Vt);
    });
  }, [cn]);
  return {
    virtualItems: Su,
    totalSize: ht,
    scrollToOffset: un,
    scrollToIndex: Qi,
    measure: J
  };
}
var yg = function(f, v, g, r) {
  for (; f <= v; ) {
    var y = (f + v) / 2 | 0, h = g(y);
    if (h < r)
      f = y + 1;
    else if (h > r)
      v = y - 1;
    else
      return y;
  }
  return f > 0 ? f - 1 : 0;
};
function mg(c) {
  for (var f = c.measurements, v = c.outerSize, g = c.scrollOffset, r = f.length - 1, y = function(d) {
    return f[d].start;
  }, h = yg(0, r, y, g), p = h; p < r && f[p].end < g + v; )
    p++;
  return {
    start: h,
    end: p
  };
}
const gg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defaultRangeExtractor: Dh,
  useVirtual: hg
}, Symbol.toStringTag, { value: "Module" })), pg = /* @__PURE__ */ hh(gg);
var fh;
function _g() {
  if (fh) return Ne;
  fh = 1;
  var c = Ne && Ne.__assign || function() {
    return c = Object.assign || function(m) {
      for (var b, R = 1, M = arguments.length; R < M; R++) {
        b = arguments[R];
        for (var j in b) Object.prototype.hasOwnProperty.call(b, j) && (m[j] = b[j]);
      }
      return m;
    }, c.apply(this, arguments);
  }, f = Ne && Ne.__createBinding || (Object.create ? (function(m, b, R, M) {
    M === void 0 && (M = R), Object.defineProperty(m, M, { enumerable: !0, get: function() {
      return b[R];
    } });
  }) : (function(m, b, R, M) {
    M === void 0 && (M = R), m[M] = b[R];
  })), v = Ne && Ne.__setModuleDefault || (Object.create ? (function(m, b) {
    Object.defineProperty(m, "default", { enumerable: !0, value: b });
  }) : function(m, b) {
    m.default = b;
  }), g = Ne && Ne.__importStar || function(m) {
    if (m && m.__esModule) return m;
    var b = {};
    if (m != null) for (var R in m) R !== "default" && Object.prototype.hasOwnProperty.call(m, R) && f(b, m, R);
    return v(b, m), b;
  };
  Object.defineProperty(Ne, "__esModule", { value: !0 }), Ne.KBarResults = void 0;
  var r = g(kt()), y = pg, h = Th(), p = nn(), s = Bn(), d = 0, S = function(m) {
    var b = r.useRef(null), R = r.useRef(null), M = r.useRef(m.items);
    M.current = m.items;
    var j = (0, y.useVirtual)({
      size: M.current.length,
      parentRef: R
    }), C = (0, p.useKBar)(function(k) {
      return {
        search: k.searchQuery,
        currentRootActionId: k.currentRootActionId,
        activeIndex: k.activeIndex
      };
    }), L = C.query, q = C.search, z = C.currentRootActionId, H = C.activeIndex, X = C.options;
    r.useEffect(function() {
      var k = function(D) {
        var A;
        D.isComposing || (D.key === "ArrowUp" || D.ctrlKey && D.key === "p" ? (D.preventDefault(), D.stopPropagation(), L.setActiveIndex(function(W) {
          var w = W > d ? W - 1 : W;
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
        })) : D.key === "Enter" && (D.preventDefault(), D.stopPropagation(), (A = b.current) === null || A === void 0 || A.click()));
      };
      return window.addEventListener("keydown", k, { capture: !0 }), function() {
        return window.removeEventListener("keydown", k, { capture: !0 });
      };
    }, [L]);
    var F = j.scrollToIndex;
    r.useEffect(function() {
      F(H, {
        // ensure that if the first item in the list is a group
        // name and we are focused on the second item, to not
        // scroll past that group, hiding it.
        align: H <= 1 ? "end" : "auto"
      });
    }, [H, F]), r.useEffect(function() {
      L.setActiveIndex(
        // avoid setting active index on a group
        typeof M.current[d] == "string" ? d + 1 : d
      );
    }, [q, z, L]), r.useEffect(function() {
      var k = H, D = M.current.length - 1;
      if (k > D && D >= 0) {
        var A = D;
        typeof M.current[A] == "string" && A > 0 && (A -= 1), L.setActiveIndex(A);
      } else if (k <= D && typeof M.current[k] == "string") {
        var A = k + 1;
        (A > D || typeof M.current[A] == "string") && (A = k - 1), A >= 0 && A <= D && typeof M.current[A] != "string" && L.setActiveIndex(A);
      }
    }, [m.items, H, L]);
    var P = r.useCallback(function(k) {
      var D, A;
      typeof k != "string" && (k.command ? (k.command.perform(k), L.toggle()) : (L.setSearch(""), L.setCurrentRootAction(k.id)), (A = (D = X.callbacks) === null || D === void 0 ? void 0 : D.onSelectAction) === null || A === void 0 || A.call(D, k));
    }, [L, X]), tt = (0, s.usePointerMovedSinceMount)();
    return r.createElement(
      "div",
      { ref: R, style: {
        maxHeight: m.maxHeight || 400,
        position: "relative",
        overflow: "auto"
      } },
      r.createElement("div", { role: "listbox", id: h.KBAR_LISTBOX, style: {
        height: j.totalSize + "px",
        width: "100%"
      } }, j.virtualItems.map(function(k) {
        var D = M.current[k.index], A = typeof D != "string" && {
          onPointerMove: function() {
            return tt && H !== k.index && L.setActiveIndex(k.index);
          },
          onPointerDown: function() {
            return L.setActiveIndex(k.index);
          },
          onClick: function() {
            return P(D);
          }
        }, W = k.index === H;
        return r.createElement("div", c({ ref: W ? b : null, id: (0, h.getListboxItemId)(k.index), role: "option", "aria-selected": W, key: k.index, style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: "translateY(" + k.start + "px)"
        } }, A), r.cloneElement(m.onRender({
          item: D,
          active: W
        }), {
          ref: k.measureRef
        }));
      }))
    );
  };
  return Ne.KBarResults = S, Ne;
}
var Ie = {}, rh;
function Sg() {
  if (rh) return Ie;
  rh = 1;
  var c = Ie && Ie.__createBinding || (Object.create ? (function(h, p, s, d) {
    d === void 0 && (d = s), Object.defineProperty(h, d, { enumerable: !0, get: function() {
      return p[s];
    } });
  }) : (function(h, p, s, d) {
    d === void 0 && (d = s), h[d] = p[s];
  })), f = Ie && Ie.__setModuleDefault || (Object.create ? (function(h, p) {
    Object.defineProperty(h, "default", { enumerable: !0, value: p });
  }) : function(h, p) {
    h.default = p;
  }), v = Ie && Ie.__importStar || function(h) {
    if (h && h.__esModule) return h;
    var p = {};
    if (h != null) for (var s in h) s !== "default" && Object.prototype.hasOwnProperty.call(h, s) && c(p, h, s);
    return f(p, h), p;
  };
  Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.useRegisterActions = void 0;
  var g = v(kt()), r = nn();
  function y(h, p) {
    p === void 0 && (p = []);
    var s = (0, r.useKBar)().query, d = g.useMemo(function() {
      return h;
    }, p);
    g.useEffect(function() {
      if (d.length) {
        var S = s.registerActions(d);
        return function() {
          S();
        };
      }
    }, [s, d]);
  }
  return Ie.useRegisterActions = y, Ie;
}
var Ue = {}, oh;
function bg() {
  if (oh) return Ue;
  oh = 1;
  var c = Ue && Ue.__assign || function() {
    return c = Object.assign || function(m) {
      for (var b, R = 1, M = arguments.length; R < M; R++) {
        b = arguments[R];
        for (var j in b) Object.prototype.hasOwnProperty.call(b, j) && (m[j] = b[j]);
      }
      return m;
    }, c.apply(this, arguments);
  }, f = Ue && Ue.__createBinding || (Object.create ? (function(m, b, R, M) {
    M === void 0 && (M = R), Object.defineProperty(m, M, { enumerable: !0, get: function() {
      return b[R];
    } });
  }) : (function(m, b, R, M) {
    M === void 0 && (M = R), m[M] = b[R];
  })), v = Ue && Ue.__setModuleDefault || (Object.create ? (function(m, b) {
    Object.defineProperty(m, "default", { enumerable: !0, value: b });
  }) : function(m, b) {
    m.default = b;
  }), g = Ue && Ue.__importStar || function(m) {
    if (m && m.__esModule) return m;
    var b = {};
    if (m != null) for (var R in m) R !== "default" && Object.prototype.hasOwnProperty.call(m, R) && f(b, m, R);
    return v(b, m), b;
  };
  Object.defineProperty(Ue, "__esModule", { value: !0 }), Ue.KBarAnimator = void 0;
  var r = g(kt()), y = Oa(), h = nn(), p = Bn(), s = [
    {
      opacity: 0,
      transform: "scale(.99)"
    },
    { opacity: 1, transform: "scale(1.01)" },
    { opacity: 1, transform: "scale(1)" }
  ], d = [
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
    var b, R, M = m.children, j = m.style, C = m.className, L = m.disableCloseOnOuterClick, q = (0, h.useKBar)(function(w) {
      return {
        visualState: w.visualState,
        currentRootActionId: w.currentRootActionId
      };
    }), z = q.visualState, H = q.currentRootActionId, X = q.query, F = q.options, P = r.useRef(null), tt = r.useRef(null), k = ((b = F == null ? void 0 : F.animations) === null || b === void 0 ? void 0 : b.enterMs) || 0, D = ((R = F == null ? void 0 : F.animations) === null || R === void 0 ? void 0 : R.exitMs) || 0;
    r.useEffect(function() {
      if (z !== y.VisualState.showing) {
        var w = z === y.VisualState.animatingIn ? k : D, V = P.current;
        V == null || V.animate(s, {
          duration: w,
          easing: (
            // TODO: expose easing in options
            z === y.VisualState.animatingOut ? "ease-in" : "ease-out"
          ),
          direction: z === y.VisualState.animatingOut ? "reverse" : "normal",
          fill: "forwards"
        });
      }
    }, [F, z, k, D]);
    var A = r.useRef();
    r.useEffect(function() {
      if (z === y.VisualState.showing) {
        var w = P.current, V = tt.current;
        if (!w || !V)
          return;
        var I = new ResizeObserver(function(Y) {
          for (var N = 0, Q = Y; N < Q.length; N++) {
            var ut = Q[N], ct = ut.contentRect;
            A.current || (A.current = ct.height), w.animate([
              {
                height: A.current + "px"
              },
              {
                height: ct.height + "px"
              }
            ], {
              duration: k / 2,
              // TODO: expose configs here
              easing: "ease-out",
              fill: "forwards"
            }), A.current = ct.height;
          }
        });
        return I.observe(V), function() {
          I.unobserve(V);
        };
      }
    }, [z, F, k, D]);
    var W = r.useRef(!0);
    return r.useEffect(function() {
      if (W.current) {
        W.current = !1;
        return;
      }
      var w = P.current;
      w && w.animate(d, {
        duration: k,
        easing: "ease-out"
      });
    }, [H, k]), (0, p.useOuterClick)(P, function() {
      var w, V;
      L || (X.setVisualState(y.VisualState.animatingOut), (V = (w = F.callbacks) === null || w === void 0 ? void 0 : w.onClose) === null || V === void 0 || V.call(w));
    }), r.createElement(
      "div",
      { ref: P, style: c(c(c({}, s[0]), j), { pointerEvents: "auto" }), className: C },
      r.createElement("div", { ref: tt }, M)
    );
  };
  return Ue.KBarAnimator = S, Ue;
}
var jn = {}, sh;
function Og() {
  return sh || (sh = 1, (function(c) {
    var f = jn && jn.__createBinding || (Object.create ? (function(g, r, y, h) {
      h === void 0 && (h = y), Object.defineProperty(g, h, { enumerable: !0, get: function() {
        return r[y];
      } });
    }) : (function(g, r, y, h) {
      h === void 0 && (h = y), g[h] = r[y];
    })), v = jn && jn.__exportStar || function(g, r) {
      for (var y in g) y !== "default" && !Object.prototype.hasOwnProperty.call(r, y) && f(r, g, y);
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), v(mh(), c), v(yh(), c);
  })(jn)), jn;
}
var dh;
function Eg() {
  return dh || (dh = 1, (function(c) {
    var f = Tn && Tn.__createBinding || (Object.create ? (function(r, y, h, p) {
      p === void 0 && (p = h), Object.defineProperty(r, p, { enumerable: !0, get: function() {
        return y[h];
      } });
    }) : (function(r, y, h, p) {
      p === void 0 && (p = h), r[p] = y[h];
    })), v = Tn && Tn.__exportStar || function(r, y) {
      for (var h in r) h !== "default" && !Object.prototype.hasOwnProperty.call(y, h) && f(y, r, h);
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), c.Priority = c.createAction = void 0;
    var g = Bn();
    Object.defineProperty(c, "createAction", { enumerable: !0, get: function() {
      return g.createAction;
    } }), Object.defineProperty(c, "Priority", { enumerable: !0, get: function() {
      return g.Priority;
    } }), v(km(), c), v(lg(), c), v(ng(), c), v(Th(), c), v(_g(), c), v(nn(), c), v(Sg(), c), v(gh(), c), v(bg(), c), v(Oa(), c), v(Og(), c);
  })(Tn)), Tn;
}
var ul = Eg();
const Mg = { "refresh-data": { name: "Refresh data", icon: "🔄", section: "Data" }, "export-csv": { name: "Export to CSV", icon: "📤", section: "Data" }, "toggle-filters": { name: "Toggle filters", icon: "🔍", section: "View" }, "reset-layout": { name: "Reset layout", icon: "📐", section: "View" }, "open-settings": { name: "Open settings", icon: "⚙️", section: "App" } }, Ag = [{ slug: "all", name: "All sources" }, { slug: "filings", name: "Filings only" }, { slug: "tables", name: "Tables only" }], zg = [{ slug: "A", name: "A" }, { slug: "B", name: "B" }, { slug: "C", name: "C" }], _u = {
  commands: Mg,
  subcommands: Ag,
  subsubcommands: zg
};
function Tg(c = _u) {
  return Object.entries(c.commands).map(([f, v]) => ({
    id: f,
    name: v.name,
    icon: v.icon,
    section: v.section ?? "Commands",
    lazy: !0
  }));
}
function Rg(c, f) {
  return `${c}/${f}`;
}
function Dg(c, f) {
  return `${c}/${f}`;
}
function jg(c, f = _u) {
  return (f.subcommands ?? []).map((v) => ({
    id: Rg(c, v.slug),
    name: v.name,
    lazy: !0
  }));
}
function Cg(c, f = _u) {
  return (f.subsubcommands ?? []).map((v) => ({
    id: Dg(c, v.slug),
    name: v.name
  }));
}
function Ng(c, f = _u) {
  const v = c.split("/").length - 1;
  return v === 0 ? jg(c, f) : v === 1 ? Cg(c, f) : [];
}
function Ug({ openAt: c, onOpened: f }) {
  const { query: v } = ul.useKBar(), g = Un.useRef(null);
  return Un.useEffect(() => {
    !c || c === g.current || (g.current = c, v.setCurrentRootAction(c), v.setSearch(""), v.isOpen || v.toggle(), f == null || f());
  }, [c, f, v]), null;
}
function Bg() {
  const c = document.querySelector('[data-testid="stSidebarCollapseButton"]') ?? document.querySelector('[data-testid="collapsedControl"]');
  c == null || c.click();
}
function jh(c, f, v, g, r = null) {
  const y = (m) => {
    var b, R;
    (R = (b = f()) == null ? void 0 : b.setStateValue) == null || R.call(b, "value", m);
  }, h = v[c.id] ?? [], p = c.lazy && h.length === 0, s = !c.lazy && h.length === 0, d = {
    id: c.id,
    name: c.name,
    section: c.section ?? "Commands",
    keywords: `${c.name} ${c.id}`
  };
  r && (d.parent = r), c.icon && (d.icon = /* @__PURE__ */ It.jsx("span", { className: "kbar-result-icon", children: c.icon })), s ? d.perform = () => y(c.id) : p && (d.perform = () => g(c.id));
  const S = [d];
  for (const m of h)
    S.push(
      ...jh(
        m,
        f,
        v,
        g,
        c.id
      )
    );
  return S;
}
function qg(c, f, v, g) {
  return [
    ...c.flatMap(
      (y) => jh(y, v, f, g)
    ),
    {
      id: "toggle-sidebar",
      name: "Toggle sidebar",
      section: "App",
      keywords: "sidebar collapse expand panel",
      perform: Bg
    },
    {
      id: "ks-open",
      name: "Open command palette — ⌘K / Ctrl+K",
      section: "Help",
      keywords: "help hotkeys keys open palette",
      perform: () => {
      }
    },
    {
      id: "ks-nav",
      name: "Move selection — ↑ / ↓",
      section: "Help",
      keywords: "help hotkeys keys navigate arrows",
      perform: () => {
      }
    },
    {
      id: "ks-select",
      name: "Run action — Enter",
      section: "Help",
      keywords: "help hotkeys keys enter select",
      perform: () => {
      }
    },
    {
      id: "ks-back",
      name: "Go back — Backspace",
      section: "Help",
      keywords: "help hotkeys keys back backspace",
      perform: () => {
      }
    },
    {
      id: "ks-close",
      name: "Close palette — Esc",
      section: "Help",
      keywords: "help hotkeys keys escape close",
      perform: () => {
      }
    }
  ];
}
function xg({
  commands: c,
  subcommandCache: f,
  getComponent: v,
  onLazyNavigate: g
}) {
  const r = Un.useMemo(
    () => qg(c, f, v, g),
    [c, f, v, g]
  );
  return ul.useRegisterActions(r, [r]), null;
}
function Hg() {
  const { results: c } = ul.useMatches();
  return /* @__PURE__ */ It.jsx(
    ul.KBarResults,
    {
      items: c,
      onRender: ({ item: f, active: v }) => {
        var r, y;
        if (typeof f == "string")
          return /* @__PURE__ */ It.jsx("div", { className: "kbar-group-label", children: f });
        const g = (r = f.id) == null ? void 0 : r.startsWith("ks-");
        return /* @__PURE__ */ It.jsxs(
          "div",
          {
            className: `kbar-result${g ? " kbar-result--info" : ""}`,
            "data-active": v,
            children: [
              f.icon,
              /* @__PURE__ */ It.jsx("span", { className: "kbar-result-name", children: f.name }),
              (y = f.shortcut) != null && y.length ? /* @__PURE__ */ It.jsx("span", { className: "kbar-result-shortcut", children: f.shortcut.map((h) => /* @__PURE__ */ It.jsx("kbd", { children: h }, h)) }) : null
            ]
          }
        );
      }
    }
  );
}
function Yg() {
  const { currentRootActionId: c } = ul.useKBar((f) => ({
    currentRootActionId: f.currentRootActionId
  }));
  return /* @__PURE__ */ It.jsxs(ul.KBarPortal, { children: [
    /* @__PURE__ */ It.jsx("div", { className: "kbar-overlay" }),
    /* @__PURE__ */ It.jsx(ul.KBarPositioner, { className: "kbar-positioner", children: /* @__PURE__ */ It.jsxs(ul.KBarAnimator, { className: "kbar-animator", children: [
      /* @__PURE__ */ It.jsx(
        ul.KBarSearch,
        {
          className: "kbar-search",
          placeholder: "Search commands…"
        },
        c ?? "root"
      ),
      /* @__PURE__ */ It.jsx("div", { className: "kbar-results", children: /* @__PURE__ */ It.jsx(Hg, {}) })
    ] }) })
  ] });
}
function Kg({ getComponent: c }) {
  const f = Un.useMemo(() => Tg(_u), []), [v, g] = Un.useState({}), [r, y] = Un.useState(null), h = (p) => {
    const s = Ng(p);
    s.length && (g((d) => ({ ...d, [p]: s })), y(p));
  };
  return /* @__PURE__ */ It.jsxs(ul.KBarProvider, { options: { animations: { enterMs: 0, exitMs: 0 } }, children: [
    /* @__PURE__ */ It.jsx(
      xg,
      {
        commands: f,
        subcommandCache: v,
        getComponent: c,
        onLazyNavigate: h
      }
    ),
    /* @__PURE__ */ It.jsx(Ug, { openAt: r, onOpened: () => y(null) }),
    /* @__PURE__ */ It.jsx(Yg, {})
  ] });
}
let vh = null, pr = null;
function Lg(c) {
  if (vh = c, !pr) {
    const f = document.createElement("div");
    f.id = "ce-command-palette-root", document.body.appendChild(f), pr = em.createRoot(f);
  }
  pr.render(/* @__PURE__ */ It.jsx(Kg, { getComponent: () => vh }));
}
export {
  Lg as default
};
