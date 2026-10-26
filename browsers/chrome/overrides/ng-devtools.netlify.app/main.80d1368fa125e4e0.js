"use strict";
(self.webpackChunkdemo_angular = self.webpackChunkdemo_angular || []).push([[179], {
    53: (G, Q, E) => {
        function v(e) {
            return "function" == typeof e
        }
        function F(e) {
            const n = e(r => {
                Error.call(r),
                r.stack = (new Error).stack
            }
            );
            return n.prototype = Object.create(Error.prototype),
            n.prototype.constructor = n,
            n
        }
        const k = F(e => function(n) {
            e(this),
            this.message = n ? `${n.length} errors occurred during unsubscription:\n${n.map( (r, i) => `${i + 1}) ${r.toString()}`).join("\n  ")}` : "",
            this.name = "UnsubscriptionError",
            this.errors = n
        }
        );
        function V(e, t) {
            if (e) {
                const n = e.indexOf(t);
                0 <= n && e.splice(n, 1)
            }
        }
        class A {
            constructor(t) {
                this.initialTeardown = t,
                this.closed = !1,
                this._parentage = null,
                this._finalizers = null
            }
            unsubscribe() {
                let t;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage: n} = this;
                    if (n)
                        if (this._parentage = null,
                        Array.isArray(n))
                            for (const o of n)
                                o.remove(this);
                        else
                            n.remove(this);
                    const {initialTeardown: r} = this;
                    if (v(r))
                        try {
                            r()
                        } catch (o) {
                            t = o instanceof k ? o.errors : [o]
                        }
                    const {_finalizers: i} = this;
                    if (i) {
                        this._finalizers = null;
                        for (const o of i)
                            try {
                                _(o)
                            } catch (s) {
                                t = t ?? [],
                                s instanceof k ? t = [...t, ...s.errors] : t.push(s)
                            }
                    }
                    if (t)
                        throw new k(t)
                }
            }
            add(t) {
                var n;
                if (t && t !== this)
                    if (this.closed)
                        _(t);
                    else {
                        if (t instanceof A) {
                            if (t.closed || t._hasParent(this))
                                return;
                            t._addParent(this)
                        }
                        (this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
                    }
            }
            _hasParent(t) {
                const {_parentage: n} = this;
                return n === t || Array.isArray(n) && n.includes(t)
            }
            _addParent(t) {
                const {_parentage: n} = this;
                this._parentage = Array.isArray(n) ? (n.push(t),
                n) : n ? [n, t] : t
            }
            _removeParent(t) {
                const {_parentage: n} = this;
                n === t ? this._parentage = null : Array.isArray(n) && V(n, t)
            }
            remove(t) {
                const {_finalizers: n} = this;
                n && V(n, t),
                t instanceof A && t._removeParent(this)
            }
        }
        A.EMPTY = ( () => {
            const e = new A;
            return e.closed = !0,
            e
        }
        )();
        const j = A.EMPTY;
        function O(e) {
            return e instanceof A || e && "closed"in e && v(e.remove) && v(e.add) && v(e.unsubscribe)
        }
        function _(e) {
            v(e) ? e() : e.unsubscribe()
        }
        const m = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }
          , T = {
            setTimeout(e, t, ...n) {
                const {delegate: r} = T;
                return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
            },
            clearTimeout(e) {
                const {delegate: t} = T;
                return (t?.clearTimeout || clearTimeout)(e)
            },
            delegate: void 0
        };
        function q(e) {
            T.setTimeout( () => {
                const {onUnhandledError: t} = m;
                if (!t)
                    throw e;
                t(e)
            }
            )
        }
        function L() {}
        const h = U("C", void 0, void 0);
        function U(e, t, n) {
            return {
                kind: e,
                value: t,
                error: n
            }
        }
        let I = null;
        function $(e) {
            if (m.useDeprecatedSynchronousErrorHandling) {
                const t = !I;
                if (t && (I = {
                    errorThrown: !1,
                    error: null
                }),
                e(),
                t) {
                    const {errorThrown: n, error: r} = I;
                    if (I = null,
                    n)
                        throw r
                }
            } else
                e()
        }
        class R extends A {
            constructor(t) {
                super(),
                this.isStopped = !1,
                t ? (this.destination = t,
                O(t) && t.add(this)) : this.destination = wt
            }
            static create(t, n, r) {
                return new X(t,n,r)
            }
            next(t) {
                this.isStopped ? Je(function M(e) {
                    return U("N", e, void 0)
                }(t), this) : this._next(t)
            }
            error(t) {
                this.isStopped ? Je(function S(e) {
                    return U("E", void 0, e)
                }(t), this) : (this.isStopped = !0,
                this._error(t))
            }
            complete() {
                this.isStopped ? Je(h, this) : (this.isStopped = !0,
                this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                super.unsubscribe(),
                this.destination = null)
            }
            _next(t) {
                this.destination.next(t)
            }
            _error(t) {
                try {
                    this.destination.error(t)
                } finally {
                    this.unsubscribe()
                }
            }
            _complete() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
        }
        const y = Function.prototype.bind;
        function x(e, t) {
            return y.call(e, t)
        }
        class B {
            constructor(t) {
                this.partialObserver = t
            }
            next(t) {
                const {partialObserver: n} = this;
                if (n.next)
                    try {
                        n.next(t)
                    } catch (r) {
                        le(r)
                    }
            }
            error(t) {
                const {partialObserver: n} = this;
                if (n.error)
                    try {
                        n.error(t)
                    } catch (r) {
                        le(r)
                    }
                else
                    le(t)
            }
            complete() {
                const {partialObserver: t} = this;
                if (t.complete)
                    try {
                        t.complete()
                    } catch (n) {
                        le(n)
                    }
            }
        }
        class X extends R {
            constructor(t, n, r) {
                let i;
                if (super(),
                v(t) || !t)
                    i = {
                        next: t ?? void 0,
                        error: n ?? void 0,
                        complete: r ?? void 0
                    };
                else {
                    let o;
                    this && m.useDeprecatedNextContext ? (o = Object.create(t),
                    o.unsubscribe = () => this.unsubscribe(),
                    i = {
                        next: t.next && x(t.next, o),
                        error: t.error && x(t.error, o),
                        complete: t.complete && x(t.complete, o)
                    }) : i = t
                }
                this.destination = new B(i)
            }
        }
        function le(e) {
            m.useDeprecatedSynchronousErrorHandling ? function Z(e) {
                m.useDeprecatedSynchronousErrorHandling && I && (I.errorThrown = !0,
                I.error = e)
            }(e) : q(e)
        }
        function Je(e, t) {
            const {onStoppedNotification: n} = m;
            n && T.setTimeout( () => n(e, t))
        }
        const wt = {
            closed: !0,
            next: L,
            error: function ot(e) {
                throw e
            },
            complete: L
        }
          , Xe = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function Tt(e) {
            return e
        }
        let et = ( () => {
            class e {
                constructor(n) {
                    n && (this._subscribe = n)
                }
                lift(n) {
                    const r = new e;
                    return r.source = this,
                    r.operator = n,
                    r
                }
                subscribe(n, r, i) {
                    const o = function jo(e) {
                        return e && e instanceof R || function Fa(e) {
                            return e && v(e.next) && v(e.error) && v(e.complete)
                        }(e) && O(e)
                    }(n) ? n : new X(n,r,i);
                    return $( () => {
                        const {operator: s, source: a} = this;
                        o.add(s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o))
                    }
                    ),
                    o
                }
                _trySubscribe(n) {
                    try {
                        return this._subscribe(n)
                    } catch (r) {
                        n.error(r)
                    }
                }
                forEach(n, r) {
                    return new (r = Bo(r))( (i, o) => {
                        const s = new X({
                            next: a => {
                                try {
                                    n(a)
                                } catch (c) {
                                    o(c),
                                    s.unsubscribe()
                                }
                            }
                            ,
                            error: o,
                            complete: i
                        });
                        this.subscribe(s)
                    }
                    )
                }
                _subscribe(n) {
                    var r;
                    return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n)
                }
                [Xe]() {
                    return this
                }
                pipe(...n) {
                    return function st(e) {
                        return 0 === e.length ? Tt : 1 === e.length ? e[0] : function(n) {
                            return e.reduce( (r, i) => i(r), n)
                        }
                    }(n)(this)
                }
                toPromise(n) {
                    return new (n = Bo(n))( (r, i) => {
                        let o;
                        this.subscribe(s => o = s, s => i(s), () => r(o))
                    }
                    )
                }
            }
            return e.create = t => new e(t),
            e
        }
        )();
        function Bo(e) {
            var t;
            return null !== (t = e ?? m.Promise) && void 0 !== t ? t : Promise
        }
        const La = F(e => function() {
            e(this),
            this.name = "ObjectUnsubscribedError",
            this.message = "object unsubscribed"
        }
        );
        let or = ( () => {
            class e extends et {
                constructor() {
                    super(),
                    this.closed = !1,
                    this.currentObservers = null,
                    this.observers = [],
                    this.isStopped = !1,
                    this.hasError = !1,
                    this.thrownError = null
                }
                lift(n) {
                    const r = new Uo(this,this);
                    return r.operator = n,
                    r
                }
                _throwIfClosed() {
                    if (this.closed)
                        throw new La
                }
                next(n) {
                    $( () => {
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const r of this.currentObservers)
                                r.next(n)
                        }
                    }
                    )
                }
                error(n) {
                    $( () => {
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.hasError = this.isStopped = !0,
                            this.thrownError = n;
                            const {observers: r} = this;
                            for (; r.length; )
                                r.shift().error(n)
                        }
                    }
                    )
                }
                complete() {
                    $( () => {
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.isStopped = !0;
                            const {observers: n} = this;
                            for (; n.length; )
                                n.shift().complete()
                        }
                    }
                    )
                }
                unsubscribe() {
                    this.isStopped = this.closed = !0,
                    this.observers = this.currentObservers = null
                }
                get observed() {
                    var n;
                    return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0
                }
                _trySubscribe(n) {
                    return this._throwIfClosed(),
                    super._trySubscribe(n)
                }
                _subscribe(n) {
                    return this._throwIfClosed(),
                    this._checkFinalizedStatuses(n),
                    this._innerSubscribe(n)
                }
                _innerSubscribe(n) {
                    const {hasError: r, isStopped: i, observers: o} = this;
                    return r || i ? j : (this.currentObservers = null,
                    o.push(n),
                    new A( () => {
                        this.currentObservers = null,
                        V(o, n)
                    }
                    ))
                }
                _checkFinalizedStatuses(n) {
                    const {hasError: r, thrownError: i, isStopped: o} = this;
                    r ? n.error(i) : o && n.complete()
                }
                asObservable() {
                    const n = new et;
                    return n.source = this,
                    n
                }
            }
            return e.create = (t, n) => new Uo(t,n),
            e
        }
        )();
        class Uo extends or {
            constructor(t, n) {
                super(),
                this.destination = t,
                this.source = n
            }
            next(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) || void 0 === r || r.call(n, t)
            }
            error(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) || void 0 === r || r.call(n, t)
            }
            complete() {
                var t, n;
                null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) || void 0 === n || n.call(t)
            }
            _subscribe(t) {
                var n, r;
                return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) && void 0 !== r ? r : j
            }
        }
        function sr(e) {
            return t => {
                if (function Ti(e) {
                    return v(e?.lift)
                }(t))
                    return t.lift(function(n) {
                        try {
                            return e(n, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }
        function Ir(e, t, n, r, i) {
            return new $o(e,t,n,r,i)
        }
        class $o extends R {
            constructor(t, n, r, i, o, s) {
                super(t),
                this.onFinalize = o,
                this.shouldUnsubscribe = s,
                this._next = n ? function(a) {
                    try {
                        n(a)
                    } catch (c) {
                        t.error(c)
                    }
                }
                : super._next,
                this._error = i ? function(a) {
                    try {
                        i(a)
                    } catch (c) {
                        t.error(c)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._error,
                this._complete = r ? function() {
                    try {
                        r()
                    } catch (a) {
                        t.error(a)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._complete
            }
            unsubscribe() {
                var t;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed: n} = this;
                    super.unsubscribe(),
                    !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
                }
            }
        }
        function un(e) {
            return this instanceof un ? (this.v = e,
            this) : new un(e)
        }
        function oD(e) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var n, t = e[Symbol.asyncIterator];
            return t ? t.call(e) : (e = function Le(e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                  , n = t && e[t]
                  , r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0),
                            {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }(e),
            n = {},
            r("next"),
            r("throw"),
            r("return"),
            n[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            n);
            function r(o) {
                n[o] = e[o] && function(s) {
                    return new Promise(function(a, c) {
                        !function i(o, s, a, c) {
                            Promise.resolve(c).then(function(u) {
                                o({
                                    value: u,
                                    done: a
                                })
                            }, s)
                        }(a, c, (s = e[o](s)).done, s.value)
                    }
                    )
                }
            }
        }
        const Ud = e => e && "number" == typeof e.length && "function" != typeof e;
        function $d(e) {
            return v(e?.then)
        }
        function Hd(e) {
            return v(e[Xe])
        }
        function Vd(e) {
            return Symbol.asyncIterator && v(e?.[Symbol.asyncIterator])
        }
        function Gd(e) {
            return new TypeError(`You provided ${null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
        }
        const Yd = function aD() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }();
        function Wd(e) {
            return v(e?.[Yd])
        }
        function zd(e) {
            return function iD(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var i, r = n.apply(e, t || []), o = [];
                return i = {},
                s("next"),
                s("throw"),
                s("return"),
                i[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                i;
                function s(f) {
                    r[f] && (i[f] = function(p) {
                        return new Promise(function(g, D) {
                            o.push([f, p, g, D]) > 1 || a(f, p)
                        }
                        )
                    }
                    )
                }
                function a(f, p) {
                    try {
                        !function c(f) {
                            f.value instanceof un ? Promise.resolve(f.value.v).then(u, l) : d(o[0][2], f)
                        }(r[f](p))
                    } catch (g) {
                        d(o[0][3], g)
                    }
                }
                function u(f) {
                    a("next", f)
                }
                function l(f) {
                    a("throw", f)
                }
                function d(f, p) {
                    f(p),
                    o.shift(),
                    o.length && a(o[0][0], o[0][1])
                }
            }(this, arguments, function*() {
                const n = e.getReader();
                try {
                    for (; ; ) {
                        const {value: r, done: i} = yield un(n.read());
                        if (i)
                            return yield un(void 0);
                        yield yield un(r)
                    }
                } finally {
                    n.releaseLock()
                }
            })
        }
        function Kd(e) {
            return v(e?.getReader)
        }
        function cr(e) {
            if (e instanceof et)
                return e;
            if (null != e) {
                if (Hd(e))
                    return function cD(e) {
                        return new et(t => {
                            const n = e[Xe]();
                            if (v(n.subscribe))
                                return n.subscribe(t);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        }
                        )
                    }(e);
                if (Ud(e))
                    return function uD(e) {
                        return new et(t => {
                            for (let n = 0; n < e.length && !t.closed; n++)
                                t.next(e[n]);
                            t.complete()
                        }
                        )
                    }(e);
                if ($d(e))
                    return function lD(e) {
                        return new et(t => {
                            e.then(n => {
                                t.closed || (t.next(n),
                                t.complete())
                            }
                            , n => t.error(n)).then(null, q)
                        }
                        )
                    }(e);
                if (Vd(e))
                    return qd(e);
                if (Wd(e))
                    return function dD(e) {
                        return new et(t => {
                            for (const n of e)
                                if (t.next(n),
                                t.closed)
                                    return;
                            t.complete()
                        }
                        )
                    }(e);
                if (Kd(e))
                    return function fD(e) {
                        return qd(zd(e))
                    }(e)
            }
            throw Gd(e)
        }
        function qd(e) {
            return new et(t => {
                (function pD(e, t) {
                    var n, r, i, o;
                    return function Y(e, t, n, r) {
                        return new (n || (n = Promise))(function(o, s) {
                            function a(l) {
                                try {
                                    u(r.next(l))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function c(l) {
                                try {
                                    u(r.throw(l))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function u(l) {
                                l.done ? o(l.value) : function i(o) {
                                    return o instanceof n ? o : new n(function(s) {
                                        s(o)
                                    }
                                    )
                                }(l.value).then(a, c)
                            }
                            u((r = r.apply(e, t || [])).next())
                        }
                        )
                    }(this, void 0, void 0, function*() {
                        try {
                            for (n = oD(e); !(r = yield n.next()).done; )
                                if (t.next(r.value),
                                t.closed)
                                    return
                        } catch (s) {
                            i = {
                                error: s
                            }
                        } finally {
                            try {
                                r && !r.done && (o = n.return) && (yield o.call(n))
                            } finally {
                                if (i)
                                    throw i.error
                            }
                        }
                        t.complete()
                    })
                }
                )(e, t).catch(n => t.error(n))
            }
            )
        }
        function Un(e, t, n, r=0, i=!1) {
            const o = t.schedule(function() {
                n(),
                i ? e.add(this.schedule(null, r)) : this.unsubscribe()
            }, r);
            if (e.add(o),
            !i)
                return o
        }
        function Zd(e, t, n=1 / 0) {
            return v(t) ? Zd( (r, i) => function Ba(e, t) {
                return sr( (n, r) => {
                    let i = 0;
                    n.subscribe(Ir(r, o => {
                        r.next(e.call(t, o, i++))
                    }
                    ))
                }
                )
            }( (o, s) => t(r, o, i, s))(cr(e(r, i))), n) : ("number" == typeof t && (n = t),
            sr( (r, i) => function hD(e, t, n, r, i, o, s, a) {
                const c = [];
                let u = 0
                  , l = 0
                  , d = !1;
                const f = () => {
                    d && !c.length && !u && t.complete()
                }
                  , p = D => u < r ? g(D) : c.push(D)
                  , g = D => {
                    o && t.next(D),
                    u++;
                    let C = !1;
                    cr(n(D, l++)).subscribe(Ir(t, P => {
                        i?.(P),
                        o ? p(P) : t.next(P)
                    }
                    , () => {
                        C = !0
                    }
                    , void 0, () => {
                        if (C)
                            try {
                                for (u--; c.length && u < r; ) {
                                    const P = c.shift();
                                    s ? Un(t, s, () => g(P)) : g(P)
                                }
                                f()
                            } catch (P) {
                                t.error(P)
                            }
                    }
                    ))
                }
                ;
                return e.subscribe(Ir(t, p, () => {
                    d = !0,
                    f()
                }
                )),
                () => {
                    a?.()
                }
            }(r, i, e, n)))
        }
        const Qd = new et(e => e.complete());
        function Ua(e) {
            return e[e.length - 1]
        }
        function Jd(e, t=0) {
            return sr( (n, r) => {
                n.subscribe(Ir(r, i => Un(r, e, () => r.next(i), t), () => Un(r, e, () => r.complete(), t), i => Un(r, e, () => r.error(i), t)))
            }
            )
        }
        function Xd(e, t=0) {
            return sr( (n, r) => {
                r.add(e.schedule( () => n.subscribe(r), t))
            }
            )
        }
        function ef(e, t) {
            if (!e)
                throw new Error("Iterable cannot be null");
            return new et(n => {
                Un(n, t, () => {
                    const r = e[Symbol.asyncIterator]();
                    Un(n, t, () => {
                        r.next().then(i => {
                            i.done ? n.complete() : n.next(i.value)
                        }
                        )
                    }
                    , 0, !0)
                }
                )
            }
            )
        }
        function CD(...e) {
            const t = function yD(e) {
                return function _D(e) {
                    return e && v(e.schedule)
                }(Ua(e)) ? e.pop() : void 0
            }(e)
              , n = function ED(e, t) {
                return "number" == typeof Ua(e) ? e.pop() : t
            }(e, 1 / 0)
              , r = e;
            return r.length ? 1 === r.length ? cr(r[0]) : function gD(e=1 / 0) {
                return Zd(Tt, e)
            }(n)(function ID(e, t) {
                return t ? function TD(e, t) {
                    if (null != e) {
                        if (Hd(e))
                            return function DD(e, t) {
                                return cr(e).pipe(Xd(t), Jd(t))
                            }(e, t);
                        if (Ud(e))
                            return function SD(e, t) {
                                return new et(n => {
                                    let r = 0;
                                    return t.schedule(function() {
                                        r === e.length ? n.complete() : (n.next(e[r++]),
                                        n.closed || this.schedule())
                                    })
                                }
                                )
                            }(e, t);
                        if ($d(e))
                            return function vD(e, t) {
                                return cr(e).pipe(Xd(t), Jd(t))
                            }(e, t);
                        if (Vd(e))
                            return ef(e, t);
                        if (Wd(e))
                            return function bD(e, t) {
                                return new et(n => {
                                    let r;
                                    return Un(n, t, () => {
                                        r = e[Yd](),
                                        Un(n, t, () => {
                                            let i, o;
                                            try {
                                                ({value: i, done: o} = r.next())
                                            } catch (s) {
                                                return void n.error(s)
                                            }
                                            o ? n.complete() : n.next(i)
                                        }
                                        , 0, !0)
                                    }
                                    ),
                                    () => v(r?.return) && r.return()
                                }
                                )
                            }(e, t);
                        if (Kd(e))
                            return function wD(e, t) {
                                return ef(zd(e), t)
                            }(e, t)
                    }
                    throw Gd(e)
                }(e, t) : cr(e)
            }(r, t)) : Qd
        }
        function $a(e, t, ...n) {
            if (!0 === t)
                return void e();
            if (!1 === t)
                return;
            const r = new X({
                next: () => {
                    r.unsubscribe(),
                    e()
                }
            });
            return t(...n).subscribe(r)
        }
        function Te(e) {
            for (let t in e)
                if (e[t] === Te)
                    return t;
            throw Error("Could not find renamed property on target object.")
        }
        function Me(e) {
            if ("string" == typeof e)
                return e;
            if (Array.isArray(e))
                return "[" + e.map(Me).join(", ") + "]";
            if (null == e)
                return "" + e;
            if (e.overriddenName)
                return `${e.overriddenName}`;
            if (e.name)
                return `${e.name}`;
            const t = e.toString();
            if (null == t)
                return "" + t;
            const n = t.indexOf("\n");
            return -1 === n ? t : t.substring(0, n)
        }
        function Va(e, t) {
            return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t
        }
        const RD = Te({
            __forward_ref__: Te
        });
        function Ga(e) {
            return e.__forward_ref__ = Ga,
            e.toString = function() {
                return Me(this())
            }
            ,
            e
        }
        function ne(e) {
            return function Ya(e) {
                return "function" == typeof e && e.hasOwnProperty(RD) && e.__forward_ref__ === Ga
            }(e) ? e() : e
        }
        function Wa(e) {
            return e && !!e.\u0275providers
        }
        class J extends Error {
            constructor(t, n) {
                super(Vo(t, n)),
                this.code = t
            }
        }
        function Vo(e, t) {
            return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`
        }
        function ae(e) {
            return "string" == typeof e ? e : null == e ? "" : String(e)
        }
        function Go(e, t) {
            throw new J(-201,!1)
        }
        function Ht(e, t) {
            null == e && function Se(e, t, n, r) {
                throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
            }(t, e, null, "!=")
        }
        function Pe(e) {
            return {
                token: e.token,
                providedIn: e.providedIn || null,
                factory: e.factory,
                value: void 0
            }
        }
        function ur(e) {
            return {
                providers: e.providers || [],
                imports: e.imports || []
            }
        }
        function Yo(e) {
            return nf(e, Wo) || nf(e, of)
        }
        function nf(e, t) {
            return e.hasOwnProperty(t) ? e[t] : null
        }
        function rf(e) {
            return e && (e.hasOwnProperty(za) || e.hasOwnProperty(LD)) ? e[za] : null
        }
        const Wo = Te({
            \u0275prov: Te
        })
          , za = Te({
            \u0275inj: Te
        })
          , of = Te({
            ngInjectableDef: Te
        })
          , LD = Te({
            ngInjectorDef: Te
        });
        var se = ( () => ((se = se || {})[se.Default = 0] = "Default",
        se[se.Host = 1] = "Host",
        se[se.Self = 2] = "Self",
        se[se.SkipSelf = 4] = "SkipSelf",
        se[se.Optional = 8] = "Optional",
        se))();
        let Ka;
        function Vt(e) {
            const t = Ka;
            return Ka = e,
            t
        }
        function sf(e, t, n) {
            const r = Yo(e);
            return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & se.Optional ? null : void 0 !== t ? t : void Go(Me(e))
        }
        const Ae = ( () => typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)()
          , Ii = {}
          , qa = "__NG_DI_FLAG__"
          , zo = "ngTempTokenPath"
          , jD = "ngTokenPath"
          , UD = /\n/gm
          , $D = "\u0275"
          , af = "__source";
        let Ci;
        function Cr(e) {
            const t = Ci;
            return Ci = e,
            t
        }
        function HD(e, t=se.Default) {
            if (void 0 === Ci)
                throw new J(-203,!1);
            return null === Ci ? sf(e, void 0, t) : Ci.get(e, t & se.Optional ? null : void 0, t)
        }
        function Ee(e, t=se.Default) {
            return (function BD() {
                return Ka
            }() || HD)(ne(e), t)
        }
        function Ko(e) {
            return typeof e > "u" || "number" == typeof e ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
        }
        function Za(e) {
            const t = [];
            for (let n = 0; n < e.length; n++) {
                const r = ne(e[n]);
                if (Array.isArray(r)) {
                    if (0 === r.length)
                        throw new J(900,!1);
                    let i, o = se.Default;
                    for (let s = 0; s < r.length; s++) {
                        const a = r[s]
                          , c = GD(a);
                        "number" == typeof c ? -1 === c ? i = a.token : o |= c : i = a
                    }
                    t.push(Ee(i, o))
                } else
                    t.push(Ee(r))
            }
            return t
        }
        function GD(e) {
            return e[qa]
        }
        function wn(e) {
            return {
                toString: e
            }.toString()
        }
        var ln = ( () => ((ln = ln || {})[ln.OnPush = 0] = "OnPush",
        ln[ln.Default = 1] = "Default",
        ln))()
          , dn = ( () => {
            return (e = dn || (dn = {}))[e.Emulated = 0] = "Emulated",
            e[e.None = 2] = "None",
            e[e.ShadowDom = 3] = "ShadowDom",
            dn;
            var e
        }
        )();
        const Tn = {}
          , De = []
          , qo = Te({
            \u0275cmp: Te
        })
          , Qa = Te({
            \u0275dir: Te
        })
          , Ja = Te({
            \u0275pipe: Te
        })
          , uf = Te({
            \u0275mod: Te
        })
          , In = Te({
            \u0275fac: Te
        })
          , Ri = Te({
            __NG_ELEMENT_ID__: Te
        });
        let zD = 0;
        function Zo(e) {
            return wn( () => {
                const t = function df(e) {
                    const t = {};
                    return {
                        type: e.type,
                        providersResolver: null,
                        factory: null,
                        hostBindings: e.hostBindings || null,
                        hostVars: e.hostVars || 0,
                        hostAttrs: e.hostAttrs || null,
                        contentQueries: e.contentQueries || null,
                        declaredInputs: t,
                        exportAs: e.exportAs || null,
                        standalone: !0 === e.standalone,
                        selectors: e.selectors || De,
                        viewQuery: e.viewQuery || null,
                        features: e.features || null,
                        setInput: null,
                        findHostDirectiveDefs: null,
                        hostDirectives: null,
                        inputs: lf(e.inputs, t),
                        outputs: lf(e.outputs)
                    }
                }(e)
                  , n = {
                    ...t,
                    decls: e.decls,
                    vars: e.vars,
                    template: e.template,
                    consts: e.consts || null,
                    ngContentSelectors: e.ngContentSelectors,
                    onPush: e.changeDetection === ln.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    dependencies: t.standalone && e.dependencies || null,
                    getStandaloneInjector: null,
                    data: e.data || {},
                    encapsulation: e.encapsulation || dn.Emulated,
                    id: "c" + zD++,
                    styles: e.styles || De,
                    _: null,
                    schemas: e.schemas || null,
                    tView: null
                };
                !function ff(e) {
                    e.features?.forEach(t => t(e))
                }(n);
                const r = e.dependencies;
                return n.directiveDefs = Qo(r, !1),
                n.pipeDefs = Qo(r, !0),
                n
            }
            )
        }
        function qD(e) {
            return be(e) || dt(e)
        }
        function ZD(e) {
            return null !== e
        }
        function Mr(e) {
            return wn( () => ({
                type: e.type,
                bootstrap: e.bootstrap || De,
                declarations: e.declarations || De,
                imports: e.imports || De,
                exports: e.exports || De,
                transitiveCompileScopes: null,
                schemas: e.schemas || null,
                id: e.id || null
            }))
        }
        function lf(e, t) {
            if (null == e)
                return Tn;
            const n = {};
            for (const r in e)
                if (e.hasOwnProperty(r)) {
                    let i = e[r]
                      , o = i;
                    Array.isArray(i) && (o = i[1],
                    i = i[0]),
                    n[i] = r,
                    t && (t[i] = o)
                }
            return n
        }
        function be(e) {
            return e[qo] || null
        }
        function dt(e) {
            return e[Qa] || null
        }
        function Mt(e) {
            return e[Ja] || null
        }
        function Qo(e, t) {
            if (!e)
                return null;
            const n = t ? Mt : qD;
            return () => ("function" == typeof e ? e() : e).map(r => n(r)).filter(ZD)
        }
        const Cn = 0
          , W = 1
          , de = 2
          , Ue = 3
          , Zt = 4
          , lr = 5
          , ft = 6
          , Rr = 7
          , Ge = 8
          , Jo = 9
          , Xo = 10
          , he = 11
          , Xa = 12
          , Ai = 13
          , pf = 14
          , Nr = 15
          , pt = 16
          , Oi = 17
          , Ar = 18
          , fn = 19
          , Pi = 20
          , hf = 21
          , Oe = 22
          , ec = 1
          , gf = 2
          , es = 7
          , Or = 9
          , Et = 10;
        function kt(e) {
            return Array.isArray(e) && "object" == typeof e[ec]
        }
        function Qt(e) {
            return Array.isArray(e) && !0 === e[ec]
        }
        function tc(e) {
            return 0 != (4 & e.flags)
        }
        function xi(e) {
            return e.componentOffset > -1
        }
        function ns(e) {
            return 1 == (1 & e.flags)
        }
        function Jt(e) {
            return !!e.template
        }
        function JD(e) {
            return 0 != (256 & e[de])
        }
        function dr(e, t) {
            return e.hasOwnProperty(In) ? e[In] : null
        }
        class tv {
            constructor(t, n, r) {
                this.previousValue = t,
                this.currentValue = n,
                this.firstChange = r
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        function yf(e) {
            return e.type.prototype.ngOnChanges && (e.setInput = rv),
            nv
        }
        function nv() {
            const e = Df(this)
              , t = e?.current;
            if (t) {
                const n = e.previous;
                if (n === Tn)
                    e.previous = t;
                else
                    for (let r in t)
                        n[r] = t[r];
                e.current = null,
                this.ngOnChanges(t)
            }
        }
        function rv(e, t, n, r) {
            const i = this.declaredInputs[n]
              , o = Df(e) || function iv(e, t) {
                return e[Ef] = t
            }(e, {
                previous: Tn,
                current: null
            })
              , s = o.current || (o.current = {})
              , a = o.previous
              , c = a[i];
            s[i] = new tv(c && c.currentValue,t,a === Tn),
            e[r] = t
        }
        const Ef = "__ngSimpleChanges__";
        function Df(e) {
            return e[Ef] || null
        }
        const Gt = function(e, t, n) {};
        function at(e) {
            for (; Array.isArray(e); )
                e = e[Cn];
            return e
        }
        function is(e, t) {
            return at(t[e])
        }
        function Ft(e, t) {
            return at(t[e.index])
        }
        function bf(e, t) {
            return e.data[t]
        }
        function Lt(e, t) {
            const n = t[e];
            return kt(n) ? n : n[Cn]
        }
        function os(e) {
            return 64 == (64 & e[de])
        }
        function Hn(e, t) {
            return null == t ? null : e[t]
        }
        function wf(e) {
            e[Ar] = 0
        }
        function rc(e, t) {
            e[lr] += t;
            let n = e
              , r = e[Ue];
            for (; null !== r && (1 === t && 1 === n[lr] || -1 === t && 0 === n[lr]); )
                r[lr] += t,
                n = r,
                r = r[Ue]
        }
        const ce = {
            lFrame: xf(null),
            bindingsEnabled: !0
        };
        function If() {
            return ce.bindingsEnabled
        }
        function N() {
            return ce.lFrame.lView
        }
        function ye() {
            return ce.lFrame.tView
        }
        function ct() {
            let e = Cf();
            for (; null !== e && 64 === e.type; )
                e = e.parent;
            return e
        }
        function Cf() {
            return ce.lFrame.currentTNode
        }
        function pn(e, t) {
            const n = ce.lFrame;
            n.currentTNode = e,
            n.isParent = t
        }
        function ic() {
            return ce.lFrame.isParent
        }
        function xr() {
            return ce.lFrame.bindingIndex++
        }
        function Ev(e, t) {
            const n = ce.lFrame;
            n.bindingIndex = n.bindingRootIndex = e,
            sc(t)
        }
        function sc(e) {
            ce.lFrame.currentDirectiveIndex = e
        }
        function cc(e) {
            ce.lFrame.currentQueryIndex = e
        }
        function vv(e) {
            const t = e[W];
            return 2 === t.type ? t.declTNode : 1 === t.type ? e[ft] : null
        }
        function Of(e, t, n) {
            if (n & se.SkipSelf) {
                let i = t
                  , o = e;
                for (; !(i = i.parent,
                null !== i || n & se.Host || (i = vv(o),
                null === i || (o = o[Nr],
                10 & i.type))); )
                    ;
                if (null === i)
                    return !1;
                t = i,
                e = o
            }
            const r = ce.lFrame = Pf();
            return r.currentTNode = t,
            r.lView = e,
            !0
        }
        function uc(e) {
            const t = Pf()
              , n = e[W];
            ce.lFrame = t,
            t.currentTNode = n.firstChild,
            t.lView = e,
            t.tView = n,
            t.contextLView = e,
            t.bindingIndex = n.bindingStartIndex,
            t.inI18n = !1
        }
        function Pf() {
            const e = ce.lFrame
              , t = null === e ? null : e.child;
            return null === t ? xf(e) : t
        }
        function xf(e) {
            const t = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: e,
                child: null,
                inI18n: !1
            };
            return null !== e && (e.child = t),
            t
        }
        function kf() {
            const e = ce.lFrame;
            return ce.lFrame = e.parent,
            e.currentTNode = null,
            e.lView = null,
            e
        }
        const Ff = kf;
        function lc() {
            const e = kf();
            e.isParent = !0,
            e.tView = null,
            e.selectedIndex = -1,
            e.contextLView = null,
            e.elementDepthCount = 0,
            e.currentDirectiveIndex = -1,
            e.currentNamespace = null,
            e.bindingRootIndex = -1,
            e.bindingIndex = -1,
            e.currentQueryIndex = 0
        }
        function vt() {
            return ce.lFrame.selectedIndex
        }
        function fr(e) {
            ce.lFrame.selectedIndex = e
        }
        function Be() {
            const e = ce.lFrame;
            return bf(e.tView, e.selectedIndex)
        }
        function ss(e, t) {
            for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
                const o = e.data[n].type.prototype
                  , {ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: c, ngAfterViewChecked: u, ngOnDestroy: l} = o;
                s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
                a && ((e.contentHooks || (e.contentHooks = [])).push(n, a),
                (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
                c && (e.viewHooks || (e.viewHooks = [])).push(-n, c),
                u && ((e.viewHooks || (e.viewHooks = [])).push(n, u),
                (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, u)),
                null != l && (e.destroyHooks || (e.destroyHooks = [])).push(n, l)
            }
        }
        function as(e, t, n) {
            Lf(e, t, 3, n)
        }
        function cs(e, t, n, r) {
            (3 & e[de]) === n && Lf(e, t, n, r)
        }
        function dc(e, t) {
            let n = e[de];
            (3 & n) === t && (n &= 2047,
            n += 1,
            e[de] = n)
        }
        function Lf(e, t, n, r) {
            const o = r ?? -1
              , s = t.length - 1;
            let a = 0;
            for (let c = void 0 !== r ? 65535 & e[Ar] : 0; c < s; c++)
                if ("number" == typeof t[c + 1]) {
                    if (a = t[c],
                    null != r && a >= r)
                        break
                } else
                    t[c] < 0 && (e[Ar] += 65536),
                    (a < o || -1 == o) && (Nv(e, n, t, c),
                    e[Ar] = (4294901760 & e[Ar]) + c + 2),
                    c++
        }
        function Nv(e, t, n, r) {
            const i = n[r] < 0
              , o = n[r + 1]
              , a = e[i ? -n[r] : n[r]];
            if (i) {
                if (e[de] >> 11 < e[Ar] >> 16 && (3 & e[de]) === t) {
                    e[de] += 2048,
                    Gt(4, a, o);
                    try {
                        o.call(a)
                    } finally {
                        Gt(5, a, o)
                    }
                }
            } else {
                Gt(4, a, o);
                try {
                    o.call(a)
                } finally {
                    Gt(5, a, o)
                }
            }
        }
        const kr = -1;
        class Fi {
            constructor(t, n, r) {
                this.factory = t,
                this.resolving = !1,
                this.canSeeViewProviders = n,
                this.injectImpl = r
            }
        }
        function pc(e, t, n) {
            let r = 0;
            for (; r < n.length; ) {
                const i = n[r];
                if ("number" == typeof i) {
                    if (0 !== i)
                        break;
                    r++;
                    const o = n[r++]
                      , s = n[r++]
                      , a = n[r++];
                    e.setAttribute(t, s, a, o)
                } else {
                    const o = i
                      , s = n[++r];
                    jf(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s),
                    r++
                }
            }
            return r
        }
        function Bf(e) {
            return 3 === e || 4 === e || 6 === e
        }
        function jf(e) {
            return 64 === e.charCodeAt(0)
        }
        function Li(e, t) {
            if (null !== t && 0 !== t.length)
                if (null === e || 0 === e.length)
                    e = t.slice();
                else {
                    let n = -1;
                    for (let r = 0; r < t.length; r++) {
                        const i = t[r];
                        "number" == typeof i ? n = i : 0 === n || Uf(e, n, i, null, -1 === n || 2 === n ? t[++r] : null)
                    }
                }
            return e
        }
        function Uf(e, t, n, r, i) {
            let o = 0
              , s = e.length;
            if (-1 === t)
                s = -1;
            else
                for (; o < e.length; ) {
                    const a = e[o++];
                    if ("number" == typeof a) {
                        if (a === t) {
                            s = -1;
                            break
                        }
                        if (a > t) {
                            s = o - 1;
                            break
                        }
                    }
                }
            for (; o < e.length; ) {
                const a = e[o];
                if ("number" == typeof a)
                    break;
                if (a === n) {
                    if (null === r)
                        return void (null !== i && (e[o + 1] = i));
                    if (r === e[o + 1])
                        return void (e[o + 2] = i)
                }
                o++,
                null !== r && o++,
                null !== i && o++
            }
            -1 !== s && (e.splice(s, 0, t),
            o = s + 1),
            e.splice(o++, 0, n),
            null !== r && e.splice(o++, 0, r),
            null !== i && e.splice(o++, 0, i)
        }
        function us(e) {
            return 32767 & e
        }
        function ls(e, t) {
            let n = function xv(e) {
                return e >> 16
            }(e)
              , r = t;
            for (; n > 0; )
                r = r[Nr],
                n--;
            return r
        }
        let hc = !0;
        function ds(e) {
            const t = hc;
            return hc = e,
            t
        }
        const Hf = 255
          , Vf = 5;
        let kv = 0;
        const hn = {};
        function fs(e, t) {
            const n = Gf(e, t);
            if (-1 !== n)
                return n;
            const r = t[W];
            r.firstCreatePass && (e.injectorIndex = t.length,
            gc(r.data, e),
            gc(t, null),
            gc(r.blueprint, null));
            const i = mc(e, t)
              , o = e.injectorIndex;
            if (function $f(e) {
                return e !== kr
            }(i)) {
                const s = us(i)
                  , a = ls(i, t)
                  , c = a[W].data;
                for (let u = 0; u < 8; u++)
                    t[o + u] = a[s + u] | c[s + u]
            }
            return t[o + 8] = i,
            o
        }
        function gc(e, t) {
            e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
        }
        function Gf(e, t) {
            return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === t[e.injectorIndex + 8] ? -1 : e.injectorIndex
        }
        function mc(e, t) {
            if (e.parent && -1 !== e.parent.injectorIndex)
                return e.parent.injectorIndex;
            let n = 0
              , r = null
              , i = t;
            for (; null !== i; ) {
                if (r = Qf(i),
                null === r)
                    return kr;
                if (n++,
                i = i[Nr],
                -1 !== r.injectorIndex)
                    return r.injectorIndex | n << 16
            }
            return kr
        }
        function _c(e, t, n) {
            !function Fv(e, t, n) {
                let r;
                "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(Ri) && (r = n[Ri]),
                null == r && (r = n[Ri] = kv++);
                const i = r & Hf;
                t.data[e + (i >> Vf)] |= 1 << i
            }(e, t, n)
        }
        function Yf(e, t, n) {
            if (n & se.Optional || void 0 !== e)
                return e;
            Go()
        }
        function Wf(e, t, n, r) {
            if (n & se.Optional && void 0 === r && (r = null),
            !(n & (se.Self | se.Host))) {
                const i = e[Jo]
                  , o = Vt(void 0);
                try {
                    return i ? i.get(t, r, n & se.Optional) : sf(t, r, n & se.Optional)
                } finally {
                    Vt(o)
                }
            }
            return Yf(r, 0, n)
        }
        function zf(e, t, n, r=se.Default, i) {
            if (null !== e) {
                if (1024 & t[de]) {
                    const s = function Hv(e, t, n, r, i) {
                        let o = e
                          , s = t;
                        for (; null !== o && null !== s && 1024 & s[de] && !(256 & s[de]); ) {
                            const a = Kf(o, s, n, r | se.Self, hn);
                            if (a !== hn)
                                return a;
                            let c = o.parent;
                            if (!c) {
                                const u = s[hf];
                                if (u) {
                                    const l = u.get(n, hn, r);
                                    if (l !== hn)
                                        return l
                                }
                                c = Qf(s),
                                s = s[Nr]
                            }
                            o = c
                        }
                        return i
                    }(e, t, n, r, hn);
                    if (s !== hn)
                        return s
                }
                const o = Kf(e, t, n, r, hn);
                if (o !== hn)
                    return o
            }
            return Wf(t, n, r, i)
        }
        function Kf(e, t, n, r, i) {
            const o = function jv(e) {
                if ("string" == typeof e)
                    return e.charCodeAt(0) || 0;
                const t = e.hasOwnProperty(Ri) ? e[Ri] : void 0;
                return "number" == typeof t ? t >= 0 ? t & Hf : Uv : t
            }(n);
            if ("function" == typeof o) {
                if (!Of(t, e, r))
                    return r & se.Host ? Yf(i, 0, r) : Wf(t, n, r, i);
                try {
                    const s = o(r);
                    if (null != s || r & se.Optional)
                        return s;
                    Go()
                } finally {
                    Ff()
                }
            } else if ("number" == typeof o) {
                let s = null
                  , a = Gf(e, t)
                  , c = kr
                  , u = r & se.Host ? t[pt][ft] : null;
                for ((-1 === a || r & se.SkipSelf) && (c = -1 === a ? mc(e, t) : t[a + 8],
                c !== kr && Zf(r, !1) ? (s = t[W],
                a = us(c),
                t = ls(c, t)) : a = -1); -1 !== a; ) {
                    const l = t[W];
                    if (qf(o, a, l.data)) {
                        const d = Bv(a, t, n, s, r, u);
                        if (d !== hn)
                            return d
                    }
                    c = t[a + 8],
                    c !== kr && Zf(r, t[W].data[a + 8] === u) && qf(o, a, t) ? (s = l,
                    a = us(c),
                    t = ls(c, t)) : a = -1
                }
            }
            return i
        }
        function Bv(e, t, n, r, i, o) {
            const s = t[W]
              , a = s.data[e + 8]
              , l = function ps(e, t, n, r, i) {
                const o = e.providerIndexes
                  , s = t.data
                  , a = 1048575 & o
                  , c = e.directiveStart
                  , l = o >> 20
                  , f = i ? a + l : e.directiveEnd;
                for (let p = r ? a : a + l; p < f; p++) {
                    const g = s[p];
                    if (p < c && n === g || p >= c && g.type === n)
                        return p
                }
                if (i) {
                    const p = s[c];
                    if (p && Jt(p) && p.type === n)
                        return c
                }
                return null
            }(a, s, n, null == r ? xi(a) && hc : r != s && 0 != (3 & a.type), i & se.Host && o === a);
            return null !== l ? pr(t, s, l, a) : hn
        }
        function pr(e, t, n, r) {
            let i = e[n];
            const o = t.data;
            if (function Av(e) {
                return e instanceof Fi
            }(i)) {
                const s = i;
                s.resolving && function ND(e, t) {
                    const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
                    throw new J(-200,`Circular dependency in DI detected for ${e}${n}`)
                }(function ve(e) {
                    return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : ae(e)
                }(o[n]));
                const a = ds(s.canSeeViewProviders);
                s.resolving = !0;
                const c = s.injectImpl ? Vt(s.injectImpl) : null;
                Of(e, r, se.Default);
                try {
                    i = e[n] = s.factory(void 0, o, e, r),
                    t.firstCreatePass && n >= r.directiveStart && function Rv(e, t, n) {
                        const {ngOnChanges: r, ngOnInit: i, ngDoCheck: o} = t.type.prototype;
                        if (r) {
                            const s = yf(t);
                            (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                            (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, s)
                        }
                        i && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i),
                        o && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, o),
                        (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, o))
                    }(n, o[n], t)
                } finally {
                    null !== c && Vt(c),
                    ds(a),
                    s.resolving = !1,
                    Ff()
                }
            }
            return i
        }
        function qf(e, t, n) {
            return !!(n[t + (e >> Vf)] & 1 << e)
        }
        function Zf(e, t) {
            return !(e & se.Self || e & se.Host && t)
        }
        class Fr {
            constructor(t, n) {
                this._tNode = t,
                this._lView = n
            }
            get(t, n, r) {
                return zf(this._tNode, this._lView, t, Ko(r), n)
            }
        }
        function Uv() {
            return new Fr(ct(),N())
        }
        function Qf(e) {
            const t = e[W]
              , n = t.type;
            return 2 === n ? t.declTNode : 1 === n ? e[ft] : null
        }
        class ge {
            constructor(t, n) {
                this._desc = t,
                this.ngMetadataName = "InjectionToken",
                this.\u0275prov = void 0,
                "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.\u0275prov = Pe({
                    token: this,
                    providedIn: n.providedIn || "root",
                    factory: n.factory
                }))
            }
            get multi() {
                return this
            }
            toString() {
                return `InjectionToken ${this._desc}`
            }
        }
        function hr(e, t) {
            e.forEach(n => Array.isArray(n) ? hr(n, t) : t(n))
        }
        function hs(e, t) {
            return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
        }
        function Bt(e, t, n) {
            let r = $r(e, t);
            return r >= 0 ? e[1 | r] = n : (r = ~r,
            function Wv(e, t, n, r) {
                let i = e.length;
                if (i == t)
                    e.push(n, r);
                else if (1 === i)
                    e.push(r, e[0]),
                    e[0] = n;
                else {
                    for (i--,
                    e.push(e[i - 1], e[i]); i > t; )
                        e[i] = e[i - 2],
                        i--;
                    e[t] = n,
                    e[t + 1] = r
                }
            }(e, r, t, n)),
            r
        }
        function Sc(e, t) {
            const n = $r(e, t);
            if (n >= 0)
                return e[1 | n]
        }
        function $r(e, t) {
            return function ep(e, t, n) {
                let r = 0
                  , i = e.length >> n;
                for (; i !== r; ) {
                    const o = r + (i - r >> 1)
                      , s = e[o << n];
                    if (t === s)
                        return o << n;
                    s > t ? i = o : r = o + 1
                }
                return ~(i << n)
            }(e, t, 1)
        }
        var Rt = ( () => ((Rt = Rt || {})[Rt.Important = 1] = "Important",
        Rt[Rt.DashCase = 2] = "DashCase",
        Rt))();
        const Mc = new Map;
        let hS = 0;
        const Nc = "__ngContext__";
        function ht(e, t) {
            kt(t) ? (e[Nc] = t[Pi],
            function mS(e) {
                Mc.set(e[Pi], e)
            }(t)) : e[Nc] = t
        }
        let Ac;
        function Oc(e, t) {
            return Ac(e, t)
        }
        function Gi(e) {
            const t = e[Ue];
            return Qt(t) ? t[Ue] : t
        }
        function Pc(e) {
            return Dp(e[Ai])
        }
        function xc(e) {
            return Dp(e[Zt])
        }
        function Dp(e) {
            for (; null !== e && !Qt(e); )
                e = e[Zt];
            return e
        }
        function Vr(e, t, n, r, i) {
            if (null != r) {
                let o, s = !1;
                Qt(r) ? o = r : kt(r) && (s = !0,
                r = r[Cn]);
                const a = at(r);
                0 === e && null !== n ? null == i ? Ip(t, n, a) : gr(t, n, a, i || null, !0) : 1 === e && null !== n ? gr(t, n, a, i || null, !0) : 2 === e ? function $c(e, t, n) {
                    const r = function Ds(e, t) {
                        return e.parentNode(t)
                    }(e, t);
                    r && function FS(e, t, n, r) {
                        e.removeChild(t, n, r)
                    }(e, r, t, n)
                }(t, a, s) : 3 === e && t.destroyNode(a),
                null != o && function jS(e, t, n, r, i) {
                    const o = n[es];
                    o !== at(n) && Vr(t, e, r, o, i);
                    for (let a = Et; a < n.length; a++) {
                        const c = n[a];
                        Yi(c[W], c, e, t, r, o)
                    }
                }(t, e, o, n, i)
            }
        }
        function Fc(e, t, n) {
            return e.createElement(t, n)
        }
        function Sp(e, t) {
            const n = e[Or]
              , r = n.indexOf(t)
              , i = t[Ue];
            512 & t[de] && (t[de] &= -513,
            rc(i, -1)),
            n.splice(r, 1)
        }
        function Bc(e, t) {
            if (!(128 & t[de])) {
                t[de] &= -65,
                t[de] |= 128,
                function kS(e, t) {
                    let n;
                    if (null != e && null != (n = e.destroyHooks))
                        for (let r = 0; r < n.length; r += 2) {
                            const i = t[n[r]];
                            if (!(i instanceof Fi)) {
                                const o = n[r + 1];
                                if (Array.isArray(o))
                                    for (let s = 0; s < o.length; s += 2) {
                                        const a = i[o[s]]
                                          , c = o[s + 1];
                                        Gt(4, a, c);
                                        try {
                                            c.call(a)
                                        } finally {
                                            Gt(5, a, c)
                                        }
                                    }
                                else {
                                    Gt(4, i, o);
                                    try {
                                        o.call(i)
                                    } finally {
                                        Gt(5, i, o)
                                    }
                                }
                            }
                        }
                }(e, t),
                function xS(e, t) {
                    const n = e.cleanup
                      , r = t[Rr];
                    let i = -1;
                    if (null !== n)
                        for (let o = 0; o < n.length - 1; o += 2)
                            if ("string" == typeof n[o]) {
                                const s = n[o + 3];
                                s >= 0 ? r[i = s]() : r[i = -s].unsubscribe(),
                                o += 2
                            } else {
                                const s = r[i = n[o + 1]];
                                n[o].call(s)
                            }
                    if (null !== r) {
                        for (let o = i + 1; o < r.length; o++)
                            (0,
                            r[o])();
                        t[Rr] = null
                    }
                }(e, t),
                1 === t[W].type && t[he].destroy();
                const n = t[Oi];
                if (null !== n && Qt(t[Ue])) {
                    n !== t[Ue] && Sp(n, t);
                    const r = t[fn];
                    null !== r && r.detachView(e)
                }
                !function _S(e) {
                    Mc.delete(e[Pi])
                }(t)
            }
        }
        function wp(e, t, n) {
            return function Tp(e, t, n) {
                let r = t;
                for (; null !== r && 40 & r.type; )
                    r = (t = r).parent;
                if (null === r)
                    return n[Cn];
                {
                    const {componentOffset: i} = r;
                    if (i > -1) {
                        const {encapsulation: o} = e.data[r.directiveStart + i];
                        if (o === dn.None || o === dn.Emulated)
                            return null
                    }
                    return Ft(r, n)
                }
            }(e, t.parent, n)
        }
        function gr(e, t, n, r, i) {
            e.insertBefore(t, n, r, i)
        }
        function Ip(e, t, n) {
            e.appendChild(t, n)
        }
        function Cp(e, t, n, r, i) {
            null !== r ? gr(e, t, n, r, i) : Ip(e, t, n)
        }
        let jc, Gc, Np = function Rp(e, t, n) {
            return 40 & e.type ? Ft(e, n) : null
        };
        function vs(e, t, n, r) {
            const i = wp(e, r, t)
              , o = t[he]
              , a = function Mp(e, t, n) {
                return Np(e, t, n)
            }(r.parent || t[ft], r, t);
            if (null != i)
                if (Array.isArray(n))
                    for (let c = 0; c < n.length; c++)
                        Cp(o, i, n[c], a, !1);
                else
                    Cp(o, i, n, a, !1);
            void 0 !== jc && jc(o, r, t, n, i)
        }
        function Op(e, t) {
            return null !== t ? e[pt][ft].projection[t.projection] : null
        }
        function Hc(e, t, n, r, i, o, s) {
            for (; null != n; ) {
                const a = r[n.index]
                  , c = n.type;
                if (s && 0 === t && (a && ht(at(a), r),
                n.flags |= 2),
                32 != (32 & n.flags))
                    if (8 & c)
                        Hc(e, t, n.child, r, i, o, !1),
                        Vr(t, e, i, a, o);
                    else if (32 & c) {
                        const u = Oc(n, r);
                        let l;
                        for (; l = u(); )
                            Vr(t, e, i, l, o);
                        Vr(t, e, i, a, o)
                    } else
                        16 & c ? Pp(e, t, r, n, i, o) : Vr(t, e, i, a, o);
                n = s ? n.projectionNext : n.next
            }
        }
        function Yi(e, t, n, r, i, o) {
            Hc(n, r, e.firstChild, t, i, o, !1)
        }
        function Pp(e, t, n, r, i, o) {
            const s = n[pt]
              , c = s[ft].projection[r.projection];
            if (Array.isArray(c))
                for (let u = 0; u < c.length; u++)
                    Vr(t, e, i, c[u], o);
            else
                Hc(e, t, c, s[Ue], i, o, !0)
        }
        function xp(e, t, n) {
            "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
        }
        function kp(e, t, n) {
            const {mergedAttrs: r, classes: i, styles: o} = n;
            null !== r && pc(e, t, r),
            null !== i && xp(e, t, i),
            null !== o && function $S(e, t, n) {
                e.setAttribute(t, "style", n)
            }(e, t, o)
        }
        class Up {
            constructor(t) {
                this.changingThisBreaksApplicationSecurity = t
            }
            toString() {
                return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
            }
        }
        const qp = new ge("ENVIRONMENT_INITIALIZER")
          , Zp = new ge("INJECTOR",-1)
          , Qp = new ge("INJECTOR_DEF_TYPES");
        class Jp {
            get(t, n=Ii) {
                if (n === Ii) {
                    const r = new Error(`NullInjectorError: No provider for ${Me(t)}!`);
                    throw r.name = "NullInjectorError",
                    r
                }
                return n
            }
        }
        function m0(...e) {
            return {
                \u0275providers: Xp(0, e),
                \u0275fromNgModule: !0
            }
        }
        function Xp(e, ...t) {
            const n = []
              , r = new Set;
            let i;
            return hr(t, o => {
                const s = o;
                Zc(s, n, [], r) && (i || (i = []),
                i.push(s))
            }
            ),
            void 0 !== i && eh(i, n),
            n
        }
        function eh(e, t) {
            for (let n = 0; n < e.length; n++) {
                const {providers: i} = e[n];
                Qc(i, o => {
                    t.push(o)
                }
                )
            }
        }
        function Zc(e, t, n, r) {
            if (!(e = ne(e)))
                return !1;
            let i = null
              , o = rf(e);
            const s = !o && be(e);
            if (o || s) {
                if (s && !s.standalone)
                    return !1;
                i = e
            } else {
                const c = e.ngModule;
                if (o = rf(c),
                !o)
                    return !1;
                i = c
            }
            const a = r.has(i);
            if (s) {
                if (a)
                    return !1;
                if (r.add(i),
                s.dependencies) {
                    const c = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                    for (const u of c)
                        Zc(u, t, n, r)
                }
            } else {
                if (!o)
                    return !1;
                {
                    if (null != o.imports && !a) {
                        let u;
                        r.add(i);
                        try {
                            hr(o.imports, l => {
                                Zc(l, t, n, r) && (u || (u = []),
                                u.push(l))
                            }
                            )
                        } finally {}
                        void 0 !== u && eh(u, t)
                    }
                    if (!a) {
                        const u = dr(i) || ( () => new i);
                        t.push({
                            provide: i,
                            useFactory: u,
                            deps: De
                        }, {
                            provide: Qp,
                            useValue: i,
                            multi: !0
                        }, {
                            provide: qp,
                            useValue: () => Ee(i),
                            multi: !0
                        })
                    }
                    const c = o.providers;
                    null == c || a || Qc(c, l => {
                        t.push(l)
                    }
                    )
                }
            }
            return i !== e && void 0 !== e.providers
        }
        function Qc(e, t) {
            for (let n of e)
                Wa(n) && (n = n.\u0275providers),
                Array.isArray(n) ? Qc(n, t) : t(n)
        }
        const _0 = Te({
            provide: String,
            useValue: Te
        });
        function Jc(e) {
            return null !== e && "object" == typeof e && _0 in e
        }
        function mr(e) {
            return "function" == typeof e
        }
        const Xc = new ge("Set Injector scope.")
          , Is = {}
          , E0 = {};
        let eu;
        function Cs() {
            return void 0 === eu && (eu = new Jp),
            eu
        }
        class Yr {
        }
        class rh extends Yr {
            get destroyed() {
                return this._destroyed
            }
            constructor(t, n, r, i) {
                super(),
                this.parent = n,
                this.source = r,
                this.scopes = i,
                this.records = new Map,
                this._ngOnDestroyHooks = new Set,
                this._onDestroyHooks = [],
                this._destroyed = !1,
                nu(t, s => this.processProvider(s)),
                this.records.set(Zp, Wr(void 0, this)),
                i.has("environment") && this.records.set(Yr, Wr(void 0, this));
                const o = this.records.get(Xc);
                null != o && "string" == typeof o.value && this.scopes.add(o.value),
                this.injectorDefTypes = new Set(this.get(Qp.multi, De, se.Self))
            }
            destroy() {
                this.assertNotDestroyed(),
                this._destroyed = !0;
                try {
                    for (const t of this._ngOnDestroyHooks)
                        t.ngOnDestroy();
                    for (const t of this._onDestroyHooks)
                        t()
                } finally {
                    this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear(),
                    this._onDestroyHooks.length = 0
                }
            }
            onDestroy(t) {
                this._onDestroyHooks.push(t)
            }
            runInContext(t) {
                this.assertNotDestroyed();
                const n = Cr(this)
                  , r = Vt(void 0);
                try {
                    return t()
                } finally {
                    Cr(n),
                    Vt(r)
                }
            }
            get(t, n=Ii, r=se.Default) {
                this.assertNotDestroyed(),
                r = Ko(r);
                const i = Cr(this)
                  , o = Vt(void 0);
                try {
                    if (!(r & se.SkipSelf)) {
                        let a = this.records.get(t);
                        if (void 0 === a) {
                            const c = function w0(e) {
                                return "function" == typeof e || "object" == typeof e && e instanceof ge
                            }(t) && Yo(t);
                            a = c && this.injectableDefInScope(c) ? Wr(tu(t), Is) : null,
                            this.records.set(t, a)
                        }
                        if (null != a)
                            return this.hydrate(t, a)
                    }
                    return (r & se.Self ? Cs() : this.parent).get(t, n = r & se.Optional && n === Ii ? null : n)
                } catch (s) {
                    if ("NullInjectorError" === s.name) {
                        if ((s[zo] = s[zo] || []).unshift(Me(t)),
                        i)
                            throw s;
                        return function YD(e, t, n, r) {
                            const i = e[zo];
                            throw t[af] && i.unshift(t[af]),
                            e.message = function WD(e, t, n, r=null) {
                                e = e && "\n" === e.charAt(0) && e.charAt(1) == $D ? e.slice(2) : e;
                                let i = Me(t);
                                if (Array.isArray(t))
                                    i = t.map(Me).join(" -> ");
                                else if ("object" == typeof t) {
                                    let o = [];
                                    for (let s in t)
                                        if (t.hasOwnProperty(s)) {
                                            let a = t[s];
                                            o.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : Me(a)))
                                        }
                                    i = `{${o.join(", ")}}`
                                }
                                return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(UD, "\n  ")}`
                            }("\n" + e.message, i, n, r),
                            e[jD] = i,
                            e[zo] = null,
                            e
                        }(s, t, "R3InjectorError", this.source)
                    }
                    throw s
                } finally {
                    Vt(o),
                    Cr(i)
                }
            }
            resolveInjectorInitializers() {
                const t = Cr(this)
                  , n = Vt(void 0);
                try {
                    const r = this.get(qp.multi, De, se.Self);
                    for (const i of r)
                        i()
                } finally {
                    Cr(t),
                    Vt(n)
                }
            }
            toString() {
                const t = []
                  , n = this.records;
                for (const r of n.keys())
                    t.push(Me(r));
                return `R3Injector[${t.join(", ")}]`
            }
            assertNotDestroyed() {
                if (this._destroyed)
                    throw new J(205,!1)
            }
            processProvider(t) {
                let n = mr(t = ne(t)) ? t : ne(t && t.provide);
                const r = function v0(e) {
                    return Jc(e) ? Wr(void 0, e.useValue) : Wr(function ih(e, t, n) {
                        let r;
                        if (mr(e)) {
                            const i = ne(e);
                            return dr(i) || tu(i)
                        }
                        if (Jc(e))
                            r = () => ne(e.useValue);
                        else if (function nh(e) {
                            return !(!e || !e.useFactory)
                        }(e))
                            r = () => e.useFactory(...Za(e.deps || []));
                        else if (function th(e) {
                            return !(!e || !e.useExisting)
                        }(e))
                            r = () => Ee(ne(e.useExisting));
                        else {
                            const i = ne(e && (e.useClass || e.provide));
                            if (!function S0(e) {
                                return !!e.deps
                            }(e))
                                return dr(i) || tu(i);
                            r = () => new i(...Za(e.deps))
                        }
                        return r
                    }(e), Is)
                }(t);
                if (mr(t) || !0 !== t.multi)
                    this.records.get(n);
                else {
                    let i = this.records.get(n);
                    i || (i = Wr(void 0, Is, !0),
                    i.factory = () => Za(i.multi),
                    this.records.set(n, i)),
                    n = t,
                    i.multi.push(t)
                }
                this.records.set(n, r)
            }
            hydrate(t, n) {
                return n.value === Is && (n.value = E0,
                n.value = n.factory()),
                "object" == typeof n.value && n.value && function b0(e) {
                    return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                }(n.value) && this._ngOnDestroyHooks.add(n.value),
                n.value
            }
            injectableDefInScope(t) {
                if (!t.providedIn)
                    return !1;
                const n = ne(t.providedIn);
                return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
            }
        }
        function tu(e) {
            const t = Yo(e)
              , n = null !== t ? t.factory : dr(e);
            if (null !== n)
                return n;
            if (e instanceof ge)
                throw new J(204,!1);
            if (e instanceof Function)
                return function D0(e) {
                    const t = e.length;
                    if (t > 0)
                        throw function Ui(e, t) {
                            const n = [];
                            for (let r = 0; r < e; r++)
                                n.push(t);
                            return n
                        }(t, "?"),
                        new J(204,!1);
                    const n = function kD(e) {
                        const t = e && (e[Wo] || e[of]);
                        return t ? (function FD(e) {
                            if (e.hasOwnProperty("name"))
                                return e.name;
                            ("" + e).match(/^function\s*([^\s(]+)/)
                        }(e),
                        t) : null
                    }(e);
                    return null !== n ? () => n.factory(e) : () => new e
                }(e);
            throw new J(204,!1)
        }
        function Wr(e, t, n=!1) {
            return {
                factory: e,
                value: t,
                multi: n ? [] : void 0
            }
        }
        function nu(e, t) {
            for (const n of e)
                Array.isArray(n) ? nu(n, t) : n && Wa(n) ? nu(n.\u0275providers, t) : t(n)
        }
        class T0 {
        }
        class oh {
        }
        class C0 {
            resolveComponentFactory(t) {
                throw function I0(e) {
                    const t = Error(`No component factory found for ${Me(e)}. Did you add it to @NgModule.entryComponents?`);
                    return t.ngComponent = e,
                    t
                }(t)
            }
        }
        let Ms = ( () => {
            class e {
            }
            return e.NULL = new C0,
            e
        }
        )();
        function M0() {
            return zr(ct(), N())
        }
        function zr(e, t) {
            return new Kr(Ft(e, t))
        }
        let Kr = ( () => {
            class e {
                constructor(n) {
                    this.nativeElement = n
                }
            }
            return e.__NG_ELEMENT_ID__ = M0,
            e
        }
        )();
        class ah {
        }
        let A0 = ( () => {
            class e {
            }
            return e.\u0275prov = Pe({
                token: e,
                providedIn: "root",
                factory: () => null
            }),
            e
        }
        )();
        class ru {
            constructor(t) {
                this.full = t,
                this.major = t.split(".")[0],
                this.minor = t.split(".")[1],
                this.patch = t.split(".").slice(2).join(".")
            }
        }
        const Rs = new ru("15.2.4")
          , iu = {}
          , ou = "ngOriginalError";
        function su(e) {
            return e[ou]
        }
        class _r {
            constructor() {
                this._console = console
            }
            handleError(t) {
                const n = this._findOriginalError(t);
                this._console.error("ERROR", t),
                n && this._console.error("ORIGINAL ERROR", n)
            }
            _findOriginalError(t) {
                let n = t && su(t);
                for (; n && su(n); )
                    n = su(n);
                return n || null
            }
        }
        function lh(e, t, n) {
            let r = e.length;
            for (; ; ) {
                const i = e.indexOf(t, n);
                if (-1 === i)
                    return i;
                if (0 === i || e.charCodeAt(i - 1) <= 32) {
                    const o = t.length;
                    if (i + o === r || e.charCodeAt(i + o) <= 32)
                        return i
                }
                n = i + 1
            }
        }
        const dh = "ng-template";
        function H0(e, t, n) {
            let r = 0
              , i = !0;
            for (; r < e.length; ) {
                let o = e[r++];
                if ("string" == typeof o && i) {
                    const s = e[r++];
                    if (n && "class" === o && -1 !== lh(s.toLowerCase(), t, 0))
                        return !0
                } else {
                    if (1 === o) {
                        for (; r < e.length && "string" == typeof (o = e[r++]); )
                            if (o.toLowerCase() === t)
                                return !0;
                        return !1
                    }
                    "number" == typeof o && (i = !1)
                }
            }
            return !1
        }
        function fh(e) {
            return 4 === e.type && e.value !== dh
        }
        function V0(e, t, n) {
            return t === (4 !== e.type || n ? e.value : dh)
        }
        function G0(e, t, n) {
            let r = 4;
            const i = e.attrs || []
              , o = function z0(e) {
                for (let t = 0; t < e.length; t++)
                    if (Bf(e[t]))
                        return t;
                return e.length
            }(i);
            let s = !1;
            for (let a = 0; a < t.length; a++) {
                const c = t[a];
                if ("number" != typeof c) {
                    if (!s)
                        if (4 & r) {
                            if (r = 2 | 1 & r,
                            "" !== c && !V0(e, c, n) || "" === c && 1 === t.length) {
                                if (Xt(r))
                                    return !1;
                                s = !0
                            }
                        } else {
                            const u = 8 & r ? c : t[++a];
                            if (8 & r && null !== e.attrs) {
                                if (!H0(e.attrs, u, n)) {
                                    if (Xt(r))
                                        return !1;
                                    s = !0
                                }
                                continue
                            }
                            const d = Y0(8 & r ? "class" : c, i, fh(e), n);
                            if (-1 === d) {
                                if (Xt(r))
                                    return !1;
                                s = !0;
                                continue
                            }
                            if ("" !== u) {
                                let f;
                                f = d > o ? "" : i[d + 1].toLowerCase();
                                const p = 8 & r ? f : null;
                                if (p && -1 !== lh(p, u, 0) || 2 & r && u !== f) {
                                    if (Xt(r))
                                        return !1;
                                    s = !0
                                }
                            }
                        }
                } else {
                    if (!s && !Xt(r) && !Xt(c))
                        return !1;
                    if (s && Xt(c))
                        continue;
                    s = !1,
                    r = c | 1 & r
                }
            }
            return Xt(r) || s
        }
        function Xt(e) {
            return 0 == (1 & e)
        }
        function Y0(e, t, n, r) {
            if (null === t)
                return -1;
            let i = 0;
            if (r || !n) {
                let o = !1;
                for (; i < t.length; ) {
                    const s = t[i];
                    if (s === e)
                        return i;
                    if (3 === s || 6 === s)
                        o = !0;
                    else {
                        if (1 === s || 2 === s) {
                            let a = t[++i];
                            for (; "string" == typeof a; )
                                a = t[++i];
                            continue
                        }
                        if (4 === s)
                            break;
                        if (0 === s) {
                            i += 4;
                            continue
                        }
                    }
                    i += o ? 1 : 2
                }
                return -1
            }
            return function K0(e, t) {
                let n = e.indexOf(4);
                if (n > -1)
                    for (n++; n < e.length; ) {
                        const r = e[n];
                        if ("number" == typeof r)
                            return -1;
                        if (r === t)
                            return n;
                        n++
                    }
                return -1
            }(t, e)
        }
        function ph(e, t, n=!1) {
            for (let r = 0; r < t.length; r++)
                if (G0(e, t[r], n))
                    return !0;
            return !1
        }
        function hh(e, t) {
            return e ? ":not(" + t.trim() + ")" : t
        }
        function Z0(e) {
            let t = e[0]
              , n = 1
              , r = 2
              , i = ""
              , o = !1;
            for (; n < e.length; ) {
                let s = e[n];
                if ("string" == typeof s)
                    if (2 & r) {
                        const a = e[++n];
                        i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                    } else
                        8 & r ? i += "." + s : 4 & r && (i += " " + s);
                else
                    "" !== i && !Xt(s) && (t += hh(o, i),
                    i = ""),
                    r = s,
                    o = o || !Xt(r);
                n++
            }
            return "" !== i && (t += hh(o, i)),
            t
        }
        const ue = {};
        function au(e) {
            gh(ye(), N(), vt() + e, !1)
        }
        function gh(e, t, n, r) {
            if (!r)
                if (3 == (3 & t[de])) {
                    const o = e.preOrderCheckHooks;
                    null !== o && as(t, o, n)
                } else {
                    const o = e.preOrderHooks;
                    null !== o && cs(t, o, 0, n)
                }
            fr(n)
        }
        function Eh(e, t=null, n=null, r) {
            const i = Dh(e, t, n, r);
            return i.resolveInjectorInitializers(),
            i
        }
        function Dh(e, t=null, n=null, r, i=new Set) {
            const o = [n || De, m0(e)];
            return r = r || ("object" == typeof e ? void 0 : Me(e)),
            new rh(o,t || Cs(),r || null,i)
        }
        let yr = ( () => {
            class e {
                static create(n, r) {
                    if (Array.isArray(n))
                        return Eh({
                            name: ""
                        }, r, n, "");
                    {
                        const i = n.name ?? "";
                        return Eh({
                            name: i
                        }, n.parent, n.providers, i)
                    }
                }
            }
            return e.THROW_IF_NOT_FOUND = Ii,
            e.NULL = new Jp,
            e.\u0275prov = Pe({
                token: e,
                providedIn: "any",
                factory: () => Ee(Zp)
            }),
            e.__NG_ELEMENT_ID__ = -1,
            e
        }
        )();
        function me(e, t=se.Default) {
            const n = N();
            return null === n ? Ee(e, t) : zf(ct(), n, ne(e), t)
        }
        function Ch(e, t) {
            const n = e.contentQueries;
            if (null !== n)
                for (let r = 0; r < n.length; r += 2) {
                    const o = n[r + 1];
                    if (-1 !== o) {
                        const s = e.data[o];
                        cc(n[r]),
                        s.contentQueries(2, t[o], o)
                    }
                }
        }
        function As(e, t, n, r, i, o, s, a, c, u, l) {
            const d = t.blueprint.slice();
            return d[Cn] = i,
            d[de] = 76 | r,
            (null !== l || e && 1024 & e[de]) && (d[de] |= 1024),
            wf(d),
            d[Ue] = d[Nr] = e,
            d[Ge] = n,
            d[Xo] = s || e && e[Xo],
            d[he] = a || e && e[he],
            d[Xa] = c || e && e[Xa] || null,
            d[Jo] = u || e && e[Jo] || null,
            d[ft] = o,
            d[Pi] = function gS() {
                return hS++
            }(),
            d[hf] = l,
            d[pt] = 2 == t.type ? e[pt] : d,
            d
        }
        function Qr(e, t, n, r, i) {
            let o = e.data[t];
            if (null === o)
                o = function fu(e, t, n, r, i) {
                    const o = Cf()
                      , s = ic()
                      , c = e.data[t] = function bb(e, t, n, r, i, o) {
                        return {
                            type: n,
                            index: r,
                            insertBeforeIndex: null,
                            injectorIndex: t ? t.injectorIndex : -1,
                            directiveStart: -1,
                            directiveEnd: -1,
                            directiveStylingLast: -1,
                            componentOffset: -1,
                            propertyBindings: null,
                            flags: 0,
                            providerIndexes: 0,
                            value: i,
                            attrs: o,
                            mergedAttrs: null,
                            localNames: null,
                            initialInputs: void 0,
                            inputs: null,
                            outputs: null,
                            tView: null,
                            next: null,
                            prev: null,
                            projectionNext: null,
                            child: null,
                            parent: t,
                            projection: null,
                            styles: null,
                            stylesWithoutHost: null,
                            residualStyles: void 0,
                            classes: null,
                            classesWithoutHost: null,
                            residualClasses: void 0,
                            classBindings: 0,
                            styleBindings: 0
                        }
                    }(0, s ? o : o && o.parent, n, t, r, i);
                    return null === e.firstChild && (e.firstChild = c),
                    null !== o && (s ? null == o.child && null !== c.parent && (o.child = c) : null === o.next && (o.next = c,
                    c.prev = o)),
                    c
                }(e, t, n, r, i),
                function yv() {
                    return ce.lFrame.inI18n
                }() && (o.flags |= 32);
            else if (64 & o.type) {
                o.type = n,
                o.value = r,
                o.attrs = i;
                const s = function ki() {
                    const e = ce.lFrame
                      , t = e.currentTNode;
                    return e.isParent ? t : t.parent
                }();
                o.injectorIndex = null === s ? -1 : s.injectorIndex
            }
            return pn(o, !0),
            o
        }
        function qi(e, t, n, r) {
            if (0 === n)
                return -1;
            const i = t.length;
            for (let o = 0; o < n; o++)
                t.push(r),
                e.blueprint.push(r),
                e.data.push(null);
            return i
        }
        function pu(e, t, n) {
            uc(t);
            try {
                const r = e.viewQuery;
                null !== r && bu(1, r, n);
                const i = e.template;
                null !== i && Mh(e, t, i, 1, n),
                e.firstCreatePass && (e.firstCreatePass = !1),
                e.staticContentQueries && Ch(e, t),
                e.staticViewQueries && bu(2, e.viewQuery, n);
                const o = e.components;
                null !== o && function Db(e, t) {
                    for (let n = 0; n < t.length; n++)
                        Hb(e, t[n])
                }(t, o)
            } catch (r) {
                throw e.firstCreatePass && (e.incompleteFirstPass = !0,
                e.firstCreatePass = !1),
                r
            } finally {
                t[de] &= -5,
                lc()
            }
        }
        function Os(e, t, n, r) {
            const i = t[de];
            if (128 != (128 & i)) {
                uc(t);
                try {
                    wf(t),
                    function Rf(e) {
                        return ce.lFrame.bindingIndex = e
                    }(e.bindingStartIndex),
                    null !== n && Mh(e, t, n, 2, r);
                    const s = 3 == (3 & i);
                    if (s) {
                        const u = e.preOrderCheckHooks;
                        null !== u && as(t, u, null)
                    } else {
                        const u = e.preOrderHooks;
                        null !== u && cs(t, u, 0, null),
                        dc(t, 0)
                    }
                    if (function Ub(e) {
                        for (let t = Pc(e); null !== t; t = xc(t)) {
                            if (!t[gf])
                                continue;
                            const n = t[Or];
                            for (let r = 0; r < n.length; r++) {
                                const i = n[r];
                                512 & i[de] || rc(i[Ue], 1),
                                i[de] |= 512
                            }
                        }
                    }(t),
                    function jb(e) {
                        for (let t = Pc(e); null !== t; t = xc(t))
                            for (let n = Et; n < t.length; n++) {
                                const r = t[n]
                                  , i = r[W];
                                os(r) && Os(i, r, i.template, r[Ge])
                            }
                    }(t),
                    null !== e.contentQueries && Ch(e, t),
                    s) {
                        const u = e.contentCheckHooks;
                        null !== u && as(t, u)
                    } else {
                        const u = e.contentHooks;
                        null !== u && cs(t, u, 1),
                        dc(t, 1)
                    }
                    !function yb(e, t) {
                        const n = e.hostBindingOpCodes;
                        if (null !== n)
                            try {
                                for (let r = 0; r < n.length; r++) {
                                    const i = n[r];
                                    if (i < 0)
                                        fr(~i);
                                    else {
                                        const o = i
                                          , s = n[++r]
                                          , a = n[++r];
                                        Ev(s, o),
                                        a(2, t[o])
                                    }
                                }
                            } finally {
                                fr(-1)
                            }
                    }(e, t);
                    const a = e.components;
                    null !== a && function Eb(e, t) {
                        for (let n = 0; n < t.length; n++)
                            $b(e, t[n])
                    }(t, a);
                    const c = e.viewQuery;
                    if (null !== c && bu(2, c, r),
                    s) {
                        const u = e.viewCheckHooks;
                        null !== u && as(t, u)
                    } else {
                        const u = e.viewHooks;
                        null !== u && cs(t, u, 2),
                        dc(t, 2)
                    }
                    !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
                    t[de] &= -41,
                    512 & t[de] && (t[de] &= -513,
                    rc(t[Ue], -1))
                } finally {
                    lc()
                }
            }
        }
        function Mh(e, t, n, r, i) {
            const o = vt()
              , s = 2 & r;
            try {
                fr(-1),
                s && t.length > Oe && gh(e, t, Oe, !1),
                Gt(s ? 2 : 0, i),
                n(r, i)
            } finally {
                fr(o),
                Gt(s ? 3 : 1, i)
            }
        }
        function hu(e, t, n) {
            if (tc(t)) {
                const i = t.directiveEnd;
                for (let o = t.directiveStart; o < i; o++) {
                    const s = e.data[o];
                    s.contentQueries && s.contentQueries(1, n[o], o)
                }
            }
        }
        function Rh(e) {
            const t = e.tView;
            return null === t || t.incompleteFirstPass ? e.tView = _u(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts) : t
        }
        function _u(e, t, n, r, i, o, s, a, c, u) {
            const l = Oe + r
              , d = l + i
              , f = function vb(e, t) {
                const n = [];
                for (let r = 0; r < t; r++)
                    n.push(r < e ? null : ue);
                return n
            }(l, d)
              , p = "function" == typeof u ? u() : u;
            return f[W] = {
                type: e,
                blueprint: f,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: t,
                data: f.slice().fill(null, l),
                bindingStartIndex: l,
                expandoStartIndex: d,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof o ? o() : o,
                pipeRegistry: "function" == typeof s ? s() : s,
                firstChild: null,
                schemas: c,
                consts: p,
                incompleteFirstPass: !1
            }
        }
        function Ah(e, t, n, r) {
            for (let i in e)
                if (e.hasOwnProperty(i)) {
                    n = null === n ? {} : n;
                    const o = e[i];
                    null === r ? Oh(n, t, i, o) : r.hasOwnProperty(i) && Oh(n, t, r[i], o)
                }
            return n
        }
        function Oh(e, t, n, r) {
            e.hasOwnProperty(n) ? e[n].push(t, r) : e[n] = [t, r]
        }
        function jt(e, t, n, r, i, o, s, a) {
            const c = Ft(t, n);
            let l, u = t.inputs;
            !a && null != u && (l = u[r]) ? (wu(e, n, l, r, i),
            xi(t) && Ph(n, t.index)) : 3 & t.type && (r = function Tb(e) {
                return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
            }(r),
            i = null != s ? s(i, t.value || "", r) : i,
            o.setProperty(c, r, i))
        }
        function Ph(e, t) {
            const n = Lt(t, e);
            16 & n[de] || (n[de] |= 32)
        }
        function xh(e, t, n, r, i, o) {
            for (let u = 0; u < r.length; u++)
                _c(fs(n, t), e, r[u].type);
            !function xb(e, t, n) {
                e.flags |= 1,
                e.directiveStart = t,
                e.directiveEnd = t + n,
                e.providerIndexes = t
            }(n, e.data.length, r.length);
            for (let u = 0; u < r.length; u++) {
                const l = r[u];
                l.providersResolver && l.providersResolver(l)
            }
            let s = !1
              , a = !1
              , c = qi(e, t, r.length, null);
            for (let u = 0; u < r.length; u++) {
                const l = r[u];
                n.mergedAttrs = Li(n.mergedAttrs, l.hostAttrs),
                kb(e, n, t, c, l),
                Pb(c, l, i),
                null !== l.contentQueries && (n.flags |= 4),
                (null !== l.hostBindings || null !== l.hostAttrs || 0 !== l.hostVars) && (n.flags |= 64);
                const d = l.type.prototype;
                !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                s = !0),
                !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n.index),
                a = !0),
                c++
            }
            !function wb(e, t, n) {
                const i = t.directiveEnd
                  , o = e.data
                  , s = t.attrs
                  , a = [];
                let c = null
                  , u = null;
                for (let l = t.directiveStart; l < i; l++) {
                    const d = o[l]
                      , f = n ? n.get(d) : null
                      , g = f ? f.outputs : null;
                    c = Ah(d.inputs, l, c, f ? f.inputs : null),
                    u = Ah(d.outputs, l, u, g);
                    const D = null === c || null === s || fh(t) ? null : Bb(c, l, s);
                    a.push(D)
                }
                null !== c && (c.hasOwnProperty("class") && (t.flags |= 8),
                c.hasOwnProperty("style") && (t.flags |= 16)),
                t.initialInputs = a,
                t.inputs = c,
                t.outputs = u
            }(e, n, o)
        }
        function kh(e, t, n) {
            const r = n.directiveStart
              , i = n.directiveEnd
              , o = n.index
              , s = function Dv() {
                return ce.lFrame.currentDirectiveIndex
            }();
            try {
                fr(o);
                for (let a = r; a < i; a++) {
                    const c = e.data[a]
                      , u = t[a];
                    sc(a),
                    (null !== c.hostBindings || 0 !== c.hostVars || null !== c.hostAttrs) && Nb(c, u)
                }
            } finally {
                fr(-1),
                sc(s)
            }
        }
        function Nb(e, t) {
            null !== e.hostBindings && e.hostBindings(1, t)
        }
        function Eu(e, t, n) {
            t.componentOffset = n,
            (e.components || (e.components = [])).push(t.index)
        }
        function Pb(e, t, n) {
            if (n) {
                if (t.exportAs)
                    for (let r = 0; r < t.exportAs.length; r++)
                        n[t.exportAs[r]] = e;
                Jt(t) && (n[""] = e)
            }
        }
        function kb(e, t, n, r, i) {
            e.data[r] = i;
            const o = i.factory || (i.factory = dr(i.type))
              , s = new Fi(o,Jt(i),me);
            e.blueprint[r] = s,
            n[r] = s,
            function Cb(e, t, n, r, i) {
                const o = i.hostBindings;
                if (o) {
                    let s = e.hostBindingOpCodes;
                    null === s && (s = e.hostBindingOpCodes = []);
                    const a = ~t.index;
                    (function Mb(e) {
                        let t = e.length;
                        for (; t > 0; ) {
                            const n = e[--t];
                            if ("number" == typeof n && n < 0)
                                return n
                        }
                        return 0
                    }
                    )(s) != a && s.push(a),
                    s.push(n, r, o)
                }
            }(e, t, r, qi(e, n, i.hostVars, ue), i)
        }
        function Lb(e, t, n, r, i, o) {
            const s = o[t];
            if (null !== s) {
                const a = r.setInput;
                for (let c = 0; c < s.length; ) {
                    const u = s[c++]
                      , l = s[c++]
                      , d = s[c++];
                    null !== a ? r.setInput(n, d, u, l) : n[l] = d
                }
            }
        }
        function Bb(e, t, n) {
            let r = null
              , i = 0;
            for (; i < n.length; ) {
                const o = n[i];
                if (0 !== o)
                    if (5 !== o) {
                        if ("number" == typeof o)
                            break;
                        if (e.hasOwnProperty(o)) {
                            null === r && (r = []);
                            const s = e[o];
                            for (let a = 0; a < s.length; a += 2)
                                if (s[a] === t) {
                                    r.push(o, s[a + 1], n[i + 1]);
                                    break
                                }
                        }
                        i += 2
                    } else
                        i += 2;
                else
                    i += 4
            }
            return r
        }
        function $b(e, t) {
            const n = Lt(t, e);
            if (os(n)) {
                const r = n[W];
                48 & n[de] ? Os(r, n, r.template, n[Ge]) : n[lr] > 0 && vu(n)
            }
        }
        function vu(e) {
            for (let r = Pc(e); null !== r; r = xc(r))
                for (let i = Et; i < r.length; i++) {
                    const o = r[i];
                    if (os(o))
                        if (512 & o[de]) {
                            const s = o[W];
                            Os(s, o, s.template, o[Ge])
                        } else
                            o[lr] > 0 && vu(o)
                }
            const n = e[W].components;
            if (null !== n)
                for (let r = 0; r < n.length; r++) {
                    const i = Lt(n[r], e);
                    os(i) && i[lr] > 0 && vu(i)
                }
        }
        function Hb(e, t) {
            const n = Lt(t, e)
              , r = n[W];
            (function Vb(e, t) {
                for (let n = t.length; n < e.blueprint.length; n++)
                    t.push(e.blueprint[n])
            }
            )(r, n),
            pu(r, n, n[Ge])
        }
        function Ps(e, t) {
            return e[Ai] ? e[pf][Zt] = t : e[Ai] = t,
            e[pf] = t,
            t
        }
        function Su(e) {
            for (; e; ) {
                e[de] |= 32;
                const t = Gi(e);
                if (JD(e) && !t)
                    return e;
                e = t
            }
            return null
        }
        function xs(e, t, n, r=!0) {
            const i = t[Xo];
            i.begin && i.begin();
            try {
                Os(e, t, e.template, n)
            } catch (s) {
                throw r && Uh(t, s),
                s
            } finally {
                i.end && i.end()
            }
        }
        function bu(e, t, n) {
            cc(0),
            t(e, n)
        }
        function Lh(e) {
            return e[Rr] || (e[Rr] = [])
        }
        function Bh(e) {
            return e.cleanup || (e.cleanup = [])
        }
        function Uh(e, t) {
            const n = e[Jo]
              , r = n ? n.get(_r, null) : null;
            r && r.handleError(t)
        }
        function wu(e, t, n, r, i) {
            for (let o = 0; o < n.length; ) {
                const s = n[o++]
                  , a = n[o++]
                  , c = t[s]
                  , u = e.data[s];
                null !== u.setInput ? u.setInput(c, i, r, a) : c[a] = i
            }
        }
        function ks(e, t, n) {
            let r = n ? e.styles : null
              , i = n ? e.classes : null
              , o = 0;
            if (null !== t)
                for (let s = 0; s < t.length; s++) {
                    const a = t[s];
                    "number" == typeof a ? o = a : 1 == o ? i = Va(i, a) : 2 == o && (r = Va(r, a + ": " + t[++s] + ";"))
                }
            n ? e.styles = r : e.stylesWithoutHost = r,
            n ? e.classes = i : e.classesWithoutHost = i
        }
        function Fs(e, t, n, r, i=!1) {
            for (; null !== n; ) {
                const o = t[n.index];
                if (null !== o && r.push(at(o)),
                Qt(o))
                    for (let a = Et; a < o.length; a++) {
                        const c = o[a]
                          , u = c[W].firstChild;
                        null !== u && Fs(c[W], c, u, r)
                    }
                const s = n.type;
                if (8 & s)
                    Fs(e, t, n.child, r);
                else if (32 & s) {
                    const a = Oc(n, t);
                    let c;
                    for (; c = a(); )
                        r.push(c)
                } else if (16 & s) {
                    const a = Op(t, n);
                    if (Array.isArray(a))
                        r.push(...a);
                    else {
                        const c = Gi(t[pt]);
                        Fs(c[W], c, a, r, !0)
                    }
                }
                n = i ? n.projectionNext : n.next
            }
            return r
        }
        class Zi {
            get rootNodes() {
                const t = this._lView
                  , n = t[W];
                return Fs(n, t, n.firstChild, [])
            }
            constructor(t, n) {
                this._lView = t,
                this._cdRefInjectingView = n,
                this._appRef = null,
                this._attachedToViewContainer = !1
            }
            get context() {
                return this._lView[Ge]
            }
            set context(t) {
                this._lView[Ge] = t
            }
            get destroyed() {
                return 128 == (128 & this._lView[de])
            }
            destroy() {
                if (this._appRef)
                    this._appRef.detachView(this);
                else if (this._attachedToViewContainer) {
                    const t = this._lView[Ue];
                    if (Qt(t)) {
                        const n = t[8]
                          , r = n ? n.indexOf(this) : -1;
                        r > -1 && (function Lc(e, t) {
                            if (e.length <= Et)
                                return;
                            const n = Et + t
                              , r = e[n];
                            if (r) {
                                const i = r[Oi];
                                null !== i && i !== e && Sp(i, r),
                                t > 0 && (e[n - 1][Zt] = r[Zt]);
                                const o = hs(e, Et + t);
                                !function MS(e, t) {
                                    Yi(e, t, t[he], 2, null, null),
                                    t[Cn] = null,
                                    t[ft] = null
                                }(r[W], r);
                                const s = o[fn];
                                null !== s && s.detachView(o[W]),
                                r[Ue] = null,
                                r[Zt] = null,
                                r[de] &= -65
                            }
                            return r
                        }(t, r),
                        hs(n, r))
                    }
                    this._attachedToViewContainer = !1
                }
                !function bp(e, t) {
                    if (!(128 & t[de])) {
                        const n = t[he];
                        n.destroyNode && Yi(e, t, n, 3, null, null),
                        function AS(e) {
                            let t = e[Ai];
                            if (!t)
                                return Bc(e[W], e);
                            for (; t; ) {
                                let n = null;
                                if (kt(t))
                                    n = t[Ai];
                                else {
                                    const r = t[Et];
                                    r && (n = r)
                                }
                                if (!n) {
                                    for (; t && !t[Zt] && t !== e; )
                                        kt(t) && Bc(t[W], t),
                                        t = t[Ue];
                                    null === t && (t = e),
                                    kt(t) && Bc(t[W], t),
                                    n = t && t[Zt]
                                }
                                t = n
                            }
                        }(t)
                    }
                }(this._lView[W], this._lView)
            }
            onDestroy(t) {
                !function Nh(e, t, n, r) {
                    const i = Lh(t);
                    null === n ? i.push(r) : (i.push(n),
                    e.firstCreatePass && Bh(e).push(r, i.length - 1))
                }(this._lView[W], this._lView, null, t)
            }
            markForCheck() {
                Su(this._cdRefInjectingView || this._lView)
            }
            detach() {
                this._lView[de] &= -65
            }
            reattach() {
                this._lView[de] |= 64
            }
            detectChanges() {
                xs(this._lView[W], this._lView, this.context)
            }
            checkNoChanges() {}
            attachToViewContainerRef() {
                if (this._appRef)
                    throw new J(902,!1);
                this._attachedToViewContainer = !0
            }
            detachFromAppRef() {
                this._appRef = null,
                function NS(e, t) {
                    Yi(e, t, t[he], 2, null, null)
                }(this._lView[W], this._lView)
            }
            attachToAppRef(t) {
                if (this._attachedToViewContainer)
                    throw new J(902,!1);
                this._appRef = t
            }
        }
        class Gb extends Zi {
            constructor(t) {
                super(t),
                this._view = t
            }
            detectChanges() {
                const t = this._view;
                xs(t[W], t, t[Ge], !1)
            }
            checkNoChanges() {}
            get context() {
                return null
            }
        }
        class $h extends Ms {
            constructor(t) {
                super(),
                this.ngModule = t
            }
            resolveComponentFactory(t) {
                const n = be(t);
                return new Qi(n,this.ngModule)
            }
        }
        function Hh(e) {
            const t = [];
            for (let n in e)
                e.hasOwnProperty(n) && t.push({
                    propName: e[n],
                    templateName: n
                });
            return t
        }
        class Wb {
            constructor(t, n) {
                this.injector = t,
                this.parentInjector = n
            }
            get(t, n, r) {
                r = Ko(r);
                const i = this.injector.get(t, iu, r);
                return i !== iu || n === iu ? i : this.parentInjector.get(t, n, r)
            }
        }
        class Qi extends oh {
            get inputs() {
                return Hh(this.componentDef.inputs)
            }
            get outputs() {
                return Hh(this.componentDef.outputs)
            }
            constructor(t, n) {
                super(),
                this.componentDef = t,
                this.ngModule = n,
                this.componentType = t.type,
                this.selector = function Q0(e) {
                    return e.map(Z0).join(",")
                }(t.selectors),
                this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [],
                this.isBoundToModule = !!n
            }
            create(t, n, r, i) {
                let o = (i = i || this.ngModule)instanceof Yr ? i : i?.injector;
                o && null !== this.componentDef.getStandaloneInjector && (o = this.componentDef.getStandaloneInjector(o) || o);
                const s = o ? new Wb(t,o) : t
                  , a = s.get(ah, null);
                if (null === a)
                    throw new J(407,!1);
                const c = s.get(A0, null)
                  , u = a.createRenderer(null, this.componentDef)
                  , l = this.componentDef.selectors[0][0] || "div"
                  , d = r ? function Sb(e, t, n) {
                    return e.selectRootElement(t, n === dn.ShadowDom)
                }(u, r, this.componentDef.encapsulation) : Fc(u, l, function Yb(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null
                }(l))
                  , f = this.componentDef.onPush ? 288 : 272
                  , p = _u(0, null, null, 1, 0, null, null, null, null, null)
                  , g = As(null, p, null, f, null, null, a, u, c, s, null);
                let D, C;
                uc(g);
                try {
                    const P = this.componentDef;
                    let z, w = null;
                    P.findHostDirectiveDefs ? (z = [],
                    w = new Map,
                    P.findHostDirectiveDefs(P, z, w),
                    z.push(P)) : z = [P];
                    const te = function Kb(e, t) {
                        const n = e[W]
                          , r = Oe;
                        return e[r] = t,
                        Qr(n, r, 2, "#host", null)
                    }(g, d)
                      , Ce = function qb(e, t, n, r, i, o, s, a) {
                        const c = i[W];
                        !function Zb(e, t, n, r) {
                            for (const i of e)
                                t.mergedAttrs = Li(t.mergedAttrs, i.hostAttrs);
                            null !== t.mergedAttrs && (ks(t, t.mergedAttrs, !0),
                            null !== n && kp(r, n, t))
                        }(r, e, t, s);
                        const u = o.createRenderer(t, n)
                          , l = As(i, Rh(n), null, n.onPush ? 32 : 16, i[e.index], e, o, u, a || null, null, null);
                        return c.firstCreatePass && Eu(c, e, r.length - 1),
                        Ps(i, l),
                        i[e.index] = l
                    }(te, d, P, z, g, a, u);
                    C = bf(p, Oe),
                    d && function Jb(e, t, n, r) {
                        if (r)
                            pc(e, n, ["ng-version", Rs.full]);
                        else {
                            const {attrs: i, classes: o} = function J0(e) {
                                const t = []
                                  , n = [];
                                let r = 1
                                  , i = 2;
                                for (; r < e.length; ) {
                                    let o = e[r];
                                    if ("string" == typeof o)
                                        2 === i ? "" !== o && t.push(o, e[++r]) : 8 === i && n.push(o);
                                    else {
                                        if (!Xt(i))
                                            break;
                                        i = o
                                    }
                                    r++
                                }
                                return {
                                    attrs: t,
                                    classes: n
                                }
                            }(t.selectors[0]);
                            i && pc(e, n, i),
                            o && o.length > 0 && xp(e, n, o.join(" "))
                        }
                    }(u, P, d, r),
                    void 0 !== n && function Xb(e, t, n) {
                        const r = e.projection = [];
                        for (let i = 0; i < t.length; i++) {
                            const o = n[i];
                            r.push(null != o ? Array.from(o) : null)
                        }
                    }(C, this.ngContentSelectors, n),
                    D = function Qb(e, t, n, r, i, o) {
                        const s = ct()
                          , a = i[W]
                          , c = Ft(s, i);
                        xh(a, i, s, n, null, r);
                        for (let l = 0; l < n.length; l++)
                            ht(pr(i, a, s.directiveStart + l, s), i);
                        kh(a, i, s),
                        c && ht(c, i);
                        const u = pr(i, a, s.directiveStart + s.componentOffset, s);
                        if (e[Ge] = i[Ge] = u,
                        null !== o)
                            for (const l of o)
                                l(u, t);
                        return hu(a, s, e),
                        u
                    }(Ce, P, z, w, g, [ew]),
                    pu(p, g, null)
                } finally {
                    lc()
                }
                return new zb(this.componentType,D,zr(C, g),g,C)
            }
        }
        class zb extends T0 {
            constructor(t, n, r, i, o) {
                super(),
                this.location = r,
                this._rootLView = i,
                this._tNode = o,
                this.instance = n,
                this.hostView = this.changeDetectorRef = new Gb(i),
                this.componentType = t
            }
            setInput(t, n) {
                const r = this._tNode.inputs;
                let i;
                if (null !== r && (i = r[t])) {
                    const o = this._rootLView;
                    wu(o[W], o, i, t, n),
                    Ph(o, this._tNode.index)
                }
            }
            get injector() {
                return new Fr(this._tNode,this._rootLView)
            }
            destroy() {
                this.hostView.destroy()
            }
            onDestroy(t) {
                this.hostView.onDestroy(t)
            }
        }
        function ew() {
            const e = ct();
            ss(N()[W], e)
        }
        function gt(e, t, n) {
            return !Object.is(e[t], n) && (e[t] = n,
            !0)
        }
        function Xr(e, t, n, r) {
            return gt(e, xr(), n) ? t + ae(n) + r : ue
        }
        function Cu(e, t, n) {
            const r = N();
            return gt(r, xr(), t) && jt(ye(), Be(), r, e, t, r[he], n, !1),
            Cu
        }
        function Mu(e, t, n, r, i) {
            const s = i ? "class" : "style";
            wu(e, n, t.inputs[s], s, r)
        }
        function Gn(e, t, n, r) {
            const i = N()
              , o = ye()
              , s = Oe + e
              , a = i[he]
              , c = o.firstCreatePass ? function yw(e, t, n, r, i, o) {
                const s = t.consts
                  , c = Qr(t, e, 2, r, Hn(s, i));
                return function yu(e, t, n, r) {
                    if (If()) {
                        const i = null === r ? null : {
                            "": -1
                        }
                          , o = function Ab(e, t) {
                            const n = e.directiveRegistry;
                            let r = null
                              , i = null;
                            if (n)
                                for (let o = 0; o < n.length; o++) {
                                    const s = n[o];
                                    if (ph(t, s.selectors, !1))
                                        if (r || (r = []),
                                        Jt(s))
                                            if (null !== s.findHostDirectiveDefs) {
                                                const a = [];
                                                i = i || new Map,
                                                s.findHostDirectiveDefs(s, a, i),
                                                r.unshift(...a, s),
                                                Eu(e, t, a.length)
                                            } else
                                                r.unshift(s),
                                                Eu(e, t, 0);
                                        else
                                            i = i || new Map,
                                            s.findHostDirectiveDefs?.(s, r, i),
                                            r.push(s)
                                }
                            return null === r ? null : [r, i]
                        }(e, n);
                        let s, a;
                        null === o ? s = a = null : [s,a] = o,
                        null !== s && xh(e, t, n, s, i, a),
                        i && function Ob(e, t, n) {
                            if (t) {
                                const r = e.localNames = [];
                                for (let i = 0; i < t.length; i += 2) {
                                    const o = n[t[i + 1]];
                                    if (null == o)
                                        throw new J(-301,!1);
                                    r.push(t[i], o)
                                }
                            }
                        }(n, r, i)
                    }
                    n.mergedAttrs = Li(n.mergedAttrs, n.attrs)
                }(t, n, c, Hn(s, o)),
                null !== c.attrs && ks(c, c.attrs, !1),
                null !== c.mergedAttrs && ks(c, c.mergedAttrs, !0),
                null !== t.queries && t.queries.elementStart(t, c),
                c
            }(s, o, i, t, n, r) : o.data[s]
              , u = i[s] = Fc(a, t, function Mv() {
                return ce.lFrame.currentNamespace
            }())
              , l = ns(c);
            return pn(c, !0),
            kp(a, u, c),
            32 != (32 & c.flags) && vs(o, i, u, c),
            0 === function lv() {
                return ce.lFrame.elementDepthCount
            }() && ht(u, i),
            function dv() {
                ce.lFrame.elementDepthCount++
            }(),
            l && (function gu(e, t, n) {
                If() && (function Rb(e, t, n, r) {
                    const i = n.directiveStart
                      , o = n.directiveEnd;
                    xi(n) && function Fb(e, t, n) {
                        const r = Ft(t, e)
                          , i = Rh(n)
                          , o = e[Xo]
                          , s = Ps(e, As(e, i, null, n.onPush ? 32 : 16, r, t, o, o.createRenderer(r, n), null, null, null));
                        e[t.index] = s
                    }(t, n, e.data[i + n.componentOffset]),
                    e.firstCreatePass || fs(n, t),
                    ht(r, t);
                    const s = n.initialInputs;
                    for (let a = i; a < o; a++) {
                        const c = e.data[a]
                          , u = pr(t, e, a, n);
                        ht(u, t),
                        null !== s && Lb(0, a - i, u, c, 0, s),
                        Jt(c) && (Lt(n.index, t)[Ge] = pr(t, e, a, n))
                    }
                }(e, t, n, Ft(n, t)),
                64 == (64 & n.flags) && kh(e, t, n))
            }(o, i, c),
            hu(o, c, i)),
            null !== r && function mu(e, t, n=Ft) {
                const r = t.localNames;
                if (null !== r) {
                    let i = t.index + 1;
                    for (let o = 0; o < r.length; o += 2) {
                        const s = r[o + 1]
                          , a = -1 === s ? n(t, e) : e[s];
                        e[i++] = a
                    }
                }
            }(i, c),
            Gn
        }
        function Yn() {
            let e = ct();
            ic() ? function oc() {
                ce.lFrame.isParent = !1
            }() : (e = e.parent,
            pn(e, !1));
            const t = e;
            !function fv() {
                ce.lFrame.elementDepthCount--
            }();
            const n = ye();
            return n.firstCreatePass && (ss(n, e),
            tc(e) && n.queries.elementEnd(e)),
            null != t.classesWithoutHost && function Ov(e) {
                return 0 != (8 & e.flags)
            }(t) && Mu(n, t, N(), t.classesWithoutHost, !0),
            null != t.stylesWithoutHost && function Pv(e) {
                return 0 != (16 & e.flags)
            }(t) && Mu(n, t, N(), t.stylesWithoutHost, !1),
            Yn
        }
        function Ru(e, t, n, r) {
            return Gn(e, t, n, r),
            Yn(),
            Ru
        }
        function Ou(e) {
            return !!e && "function" == typeof e.then
        }
        const vw = function og(e) {
            return !!e && "function" == typeof e.subscribe
        };
        function Xi(e, t, n, r) {
            const i = N()
              , o = ye()
              , s = ct();
            return function ag(e, t, n, r, i, o, s) {
                const a = ns(r)
                  , u = e.firstCreatePass && Bh(e)
                  , l = t[Ge]
                  , d = Lh(t);
                let f = !0;
                if (3 & r.type || s) {
                    const D = Ft(r, t)
                      , C = s ? s(D) : D
                      , P = d.length
                      , z = s ? te => s(at(te[r.index])) : r.index;
                    let w = null;
                    if (!s && a && (w = function Sw(e, t, n, r) {
                        const i = e.cleanup;
                        if (null != i)
                            for (let o = 0; o < i.length - 1; o += 2) {
                                const s = i[o];
                                if (s === n && i[o + 1] === r) {
                                    const a = t[Rr]
                                      , c = i[o + 2];
                                    return a.length > c ? a[c] : null
                                }
                                "string" == typeof s && (o += 2)
                            }
                        return null
                    }(e, t, i, r.index)),
                    null !== w)
                        (w.__ngLastListenerFn__ || w).__ngNextListenerFn__ = o,
                        w.__ngLastListenerFn__ = o,
                        f = !1;
                    else {
                        o = ug(r, t, l, o, !1);
                        const te = n.listen(C, i, o);
                        d.push(o, te),
                        u && u.push(i, z, P, P + 1)
                    }
                } else
                    o = ug(r, t, l, o, !1);
                const p = r.outputs;
                let g;
                if (f && null !== p && (g = p[i])) {
                    const D = g.length;
                    if (D)
                        for (let C = 0; C < D; C += 2) {
                            const Ce = t[g[C]][g[C + 1]].subscribe(o)
                              , Ke = d.length;
                            d.push(o, Ce),
                            u && u.push(i, r.index, Ke, -(Ke + 1))
                        }
                }
            }(o, i, i[he], s, e, t, r),
            Xi
        }
        function cg(e, t, n, r) {
            try {
                return Gt(6, t, n),
                !1 !== n(r)
            } catch (i) {
                return Uh(e, i),
                !1
            } finally {
                Gt(7, t, n)
            }
        }
        function ug(e, t, n, r, i) {
            return function o(s) {
                if (s === Function)
                    return r;
                Su(e.componentOffset > -1 ? Lt(e.index, t) : t);
                let c = cg(t, n, r, s)
                  , u = o.__ngNextListenerFn__;
                for (; u; )
                    c = cg(t, n, u, s) && c,
                    u = u.__ngNextListenerFn__;
                return i && !1 === c && (s.preventDefault(),
                s.returnValue = !1),
                c
            }
        }
        function Pu(e, t, n) {
            return xu(e, "", t, "", n),
            Pu
        }
        function xu(e, t, n, r, i) {
            const o = N()
              , s = Xr(o, t, n, r);
            return s !== ue && jt(ye(), Be(), o, e, s, o[he], i, !1),
            xu
        }
        function js(e, t) {
            return e << 17 | t << 2
        }
        function Wn(e) {
            return e >> 17 & 32767
        }
        function ku(e) {
            return 2 | e
        }
        function Dr(e) {
            return (131068 & e) >> 2
        }
        function Fu(e, t) {
            return -131069 & e | t << 2
        }
        function Lu(e) {
            return 1 | e
        }
        function yg(e, t, n, r, i) {
            const o = e[n + 1]
              , s = null === t;
            let a = r ? Wn(o) : Dr(o)
              , c = !1;
            for (; 0 !== a && (!1 === c || s); ) {
                const l = e[a + 1];
                Ow(e[a], t) && (c = !0,
                e[a + 1] = r ? Lu(l) : ku(l)),
                a = r ? Wn(l) : Dr(l)
            }
            c && (e[n + 1] = r ? ku(o) : Lu(o))
        }
        function Ow(e, t) {
            return null === e || null == t || (Array.isArray(e) ? e[1] : e) === t || !(!Array.isArray(e) || "string" != typeof t) && $r(e, t) >= 0
        }
        const nt = {
            textEnd: 0,
            key: 0,
            keyEnd: 0,
            value: 0,
            valueEnd: 0
        };
        function Eg(e) {
            return e.substring(nt.key, nt.keyEnd)
        }
        function Dg(e, t) {
            const n = nt.textEnd;
            return n === t ? -1 : (t = nt.keyEnd = function Fw(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; )
                    t++;
                return t
            }(e, nt.key = t, n),
            ai(e, t, n))
        }
        function ai(e, t, n) {
            for (; t < n && e.charCodeAt(t) <= 32; )
                t++;
            return t
        }
        function Cg(e) {
            !function tn(e, t, n, r) {
                const i = ye()
                  , o = function Rn(e) {
                    const t = ce.lFrame
                      , n = t.bindingIndex;
                    return t.bindingIndex = t.bindingIndex + e,
                    n
                }(2);
                i.firstUpdatePass && function Rg(e, t, n, r) {
                    const i = e.data;
                    if (null === i[n + 1]) {
                        const o = i[vt()]
                          , s = Mg(e, n);
                        Pg(o, r) && null === t && !s && (t = !1),
                        t = function Uw(e, t, n, r) {
                            const i = function ac(e) {
                                const t = ce.lFrame.currentDirectiveIndex;
                                return -1 === t ? null : e[t]
                            }(e);
                            let o = r ? t.residualClasses : t.residualStyles;
                            if (null === i)
                                0 === (r ? t.classBindings : t.styleBindings) && (n = eo(n = Bu(null, e, t, n, r), t.attrs, r),
                                o = null);
                            else {
                                const s = t.directiveStylingLast;
                                if (-1 === s || e[s] !== i)
                                    if (n = Bu(i, e, t, n, r),
                                    null === o) {
                                        let c = function $w(e, t, n) {
                                            const r = n ? t.classBindings : t.styleBindings;
                                            if (0 !== Dr(r))
                                                return e[Wn(r)]
                                        }(e, t, r);
                                        void 0 !== c && Array.isArray(c) && (c = Bu(null, e, t, c[1], r),
                                        c = eo(c, t.attrs, r),
                                        function Hw(e, t, n, r) {
                                            e[Wn(n ? t.classBindings : t.styleBindings)] = r
                                        }(e, t, r, c))
                                    } else
                                        o = function Vw(e, t, n) {
                                            let r;
                                            const i = t.directiveEnd;
                                            for (let o = 1 + t.directiveStylingLast; o < i; o++)
                                                r = eo(r, e[o].hostAttrs, n);
                                            return eo(r, t.attrs, n)
                                        }(e, t, r)
                            }
                            return void 0 !== o && (r ? t.residualClasses = o : t.residualStyles = o),
                            n
                        }(i, o, t, r),
                        function Nw(e, t, n, r, i, o) {
                            let s = o ? t.classBindings : t.styleBindings
                              , a = Wn(s)
                              , c = Dr(s);
                            e[r] = n;
                            let l, u = !1;
                            if (Array.isArray(n) ? (l = n[1],
                            (null === l || $r(n, l) > 0) && (u = !0)) : l = n,
                            i)
                                if (0 !== c) {
                                    const f = Wn(e[a + 1]);
                                    e[r + 1] = js(f, a),
                                    0 !== f && (e[f + 1] = Fu(e[f + 1], r)),
                                    e[a + 1] = function Mw(e, t) {
                                        return 131071 & e | t << 17
                                    }(e[a + 1], r)
                                } else
                                    e[r + 1] = js(a, 0),
                                    0 !== a && (e[a + 1] = Fu(e[a + 1], r)),
                                    a = r;
                            else
                                e[r + 1] = js(c, 0),
                                0 === a ? a = r : e[c + 1] = Fu(e[c + 1], r),
                                c = r;
                            u && (e[r + 1] = ku(e[r + 1])),
                            yg(e, l, r, !0),
                            yg(e, l, r, !1),
                            function Aw(e, t, n, r, i) {
                                const o = i ? e.residualClasses : e.residualStyles;
                                null != o && "string" == typeof t && $r(o, t) >= 0 && (n[r + 1] = Lu(n[r + 1]))
                            }(t, l, e, r, o),
                            s = js(a, c),
                            o ? t.classBindings = s : t.styleBindings = s
                        }(i, o, t, n, s, r)
                    }
                }(i, null, o, r);
                const s = N();
                if (n !== ue && gt(s, o, n)) {
                    const a = i.data[vt()];
                    if (Pg(a, r) && !Mg(i, o)) {
                        let c = r ? a.classesWithoutHost : a.stylesWithoutHost;
                        null !== c && (n = Va(c, n || "")),
                        Mu(i, a, s, n, r)
                    } else
                        !function Yw(e, t, n, r, i, o, s, a) {
                            i === ue && (i = De);
                            let c = 0
                              , u = 0
                              , l = 0 < i.length ? i[0] : null
                              , d = 0 < o.length ? o[0] : null;
                            for (; null !== l || null !== d; ) {
                                const f = c < i.length ? i[c + 1] : void 0
                                  , p = u < o.length ? o[u + 1] : void 0;
                                let D, g = null;
                                l === d ? (c += 2,
                                u += 2,
                                f !== p && (g = d,
                                D = p)) : null === d || null !== l && l < d ? (c += 2,
                                g = l) : (u += 2,
                                g = d,
                                D = p),
                                null !== g && Ag(e, t, n, r, g, D, s, a),
                                l = c < i.length ? i[c] : null,
                                d = u < o.length ? o[u] : null
                            }
                        }(i, a, s, s[he], s[o + 1], s[o + 1] = function Gw(e, t, n) {
                            if (null == n || "" === n)
                                return De;
                            const r = []
                              , i = function Vn(e) {
                                return e instanceof Up ? e.changingThisBreaksApplicationSecurity : e
                            }(n);
                            if (Array.isArray(i))
                                for (let o = 0; o < i.length; o++)
                                    e(r, i[o], !0);
                            else if ("object" == typeof i)
                                for (const o in i)
                                    i.hasOwnProperty(o) && e(r, o, i[o]);
                            else
                                "string" == typeof i && t(r, i);
                            return r
                        }(e, t, n), r, o)
                }
            }(Bt, yn, e, !0)
        }
        function yn(e, t) {
            for (let n = function xw(e) {
                return function Sg(e) {
                    nt.key = 0,
                    nt.keyEnd = 0,
                    nt.value = 0,
                    nt.valueEnd = 0,
                    nt.textEnd = e.length
                }(e),
                Dg(e, ai(e, 0, nt.textEnd))
            }(t); n >= 0; n = Dg(t, n))
                Bt(e, Eg(t), !0)
        }
        function Mg(e, t) {
            return t >= e.expandoStartIndex
        }
        function Bu(e, t, n, r, i) {
            let o = null;
            const s = n.directiveEnd;
            let a = n.directiveStylingLast;
            for (-1 === a ? a = n.directiveStart : a++; a < s && (o = t[a],
            r = eo(r, o.hostAttrs, i),
            o !== e); )
                a++;
            return null !== e && (n.directiveStylingLast = a),
            r
        }
        function eo(e, t, n) {
            const r = n ? 1 : 2;
            let i = -1;
            if (null !== t)
                for (let o = 0; o < t.length; o++) {
                    const s = t[o];
                    "number" == typeof s ? i = s : i === r && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                    Bt(e, s, !!n || t[++o]))
                }
            return void 0 === e ? null : e
        }
        function Ag(e, t, n, r, i, o, s, a) {
            if (!(3 & t.type))
                return;
            const c = e.data
              , u = c[a + 1]
              , l = function Rw(e) {
                return 1 == (1 & e)
            }(u) ? Og(c, t, n, i, Dr(u), s) : void 0;
            Us(l) || (Us(o) || function Cw(e) {
                return 2 == (2 & e)
            }(u) && (o = Og(c, null, n, i, a, s)),
            function US(e, t, n, r, i) {
                if (t)
                    i ? e.addClass(n, r) : e.removeClass(n, r);
                else {
                    let o = -1 === r.indexOf("-") ? void 0 : Rt.DashCase;
                    null == i ? e.removeStyle(n, r, o) : ("string" == typeof i && i.endsWith("!important") && (i = i.slice(0, -10),
                    o |= Rt.Important),
                    e.setStyle(n, r, i, o))
                }
            }(r, s, is(vt(), n), i, o))
        }
        function Og(e, t, n, r, i, o) {
            const s = null === t;
            let a;
            for (; i > 0; ) {
                const c = e[i]
                  , u = Array.isArray(c)
                  , l = u ? c[1] : c
                  , d = null === l;
                let f = n[i + 1];
                f === ue && (f = d ? De : void 0);
                let p = d ? Sc(f, r) : l === r ? f : void 0;
                if (u && !Us(p) && (p = Sc(c, r)),
                Us(p) && (a = p,
                s))
                    return a;
                const g = e[i + 1];
                i = s ? Wn(g) : Dr(g)
            }
            if (null !== t) {
                let c = o ? t.residualClasses : t.residualStyles;
                null != c && (a = Sc(c, r))
            }
            return a
        }
        function Us(e) {
            return void 0 !== e
        }
        function Pg(e, t) {
            return 0 != (e.flags & (t ? 8 : 16))
        }
        function ju(e, t="") {
            const n = N()
              , r = ye()
              , i = e + Oe
              , o = r.firstCreatePass ? Qr(r, i, 1, t, null) : r.data[i]
              , s = n[i] = function kc(e, t) {
                return e.createText(t)
            }(n[he], t);
            vs(r, n, s, o),
            pn(o, !1)
        }
        function Uu(e) {
            return $u("", e, ""),
            Uu
        }
        function $u(e, t, n) {
            const r = N()
              , i = Xr(r, e, t, n);
            return i !== ue && function On(e, t, n) {
                const r = is(t, e);
                !function vp(e, t, n) {
                    e.setValue(t, n)
                }(e[he], r, n)
            }(r, vt(), i),
            $u
        }
        const ui = "en-US";
        let tm = ui;
        class li {
        }
        class fI {
        }
        class Cm extends li {
            constructor(t, n) {
                super(),
                this._parent = n,
                this._bootstrapComponents = [],
                this.destroyCbs = [],
                this.componentFactoryResolver = new $h(this);
                const r = function xt(e, t) {
                    const n = e[uf] || null;
                    if (!n && !0 === t)
                        throw new Error(`Type ${Me(e)} does not have '\u0275mod' property.`);
                    return n
                }(t);
                this._bootstrapComponents = function An(e) {
                    return e instanceof Function ? e() : e
                }(r.bootstrap),
                this._r3Injector = Dh(t, n, [{
                    provide: li,
                    useValue: this
                }, {
                    provide: Ms,
                    useValue: this.componentFactoryResolver
                }], Me(t), new Set(["environment"])),
                this._r3Injector.resolveInjectorInitializers(),
                this.instance = this._r3Injector.get(t)
            }
            get injector() {
                return this._r3Injector
            }
            destroy() {
                const t = this._r3Injector;
                !t.destroyed && t.destroy(),
                this.destroyCbs.forEach(n => n()),
                this.destroyCbs = null
            }
            onDestroy(t) {
                this.destroyCbs.push(t)
            }
        }
        class Ku extends fI {
            constructor(t) {
                super(),
                this.moduleType = t
            }
            create(t) {
                return new Cm(this.moduleType,t)
            }
        }
        function Zu(e) {
            return t => {
                setTimeout(e, void 0, t)
            }
        }
        const En = class HI extends or {
            constructor(t=!1) {
                super(),
                this.__isAsync = t
            }
            emit(t) {
                super.next(t)
            }
            subscribe(t, n, r) {
                let i = t
                  , o = n || ( () => null)
                  , s = r;
                if (t && "object" == typeof t) {
                    const c = t;
                    i = c.next?.bind(c),
                    o = c.error?.bind(c),
                    s = c.complete?.bind(c)
                }
                this.__isAsync && (o = Zu(o),
                i && (i = Zu(i)),
                s && (s = Zu(s)));
                const a = super.subscribe({
                    next: i,
                    error: o,
                    complete: s
                });
                return t instanceof A && t.add(a),
                a
            }
        }
        ;
        function zs(...e) {}
        const f_ = new ge("Application Initializer");
        let Ks = ( () => {
            class e {
                constructor(n) {
                    this.appInits = n,
                    this.resolve = zs,
                    this.reject = zs,
                    this.initialized = !1,
                    this.done = !1,
                    this.donePromise = new Promise( (r, i) => {
                        this.resolve = r,
                        this.reject = i
                    }
                    )
                }
                runInitializers() {
                    if (this.initialized)
                        return;
                    const n = []
                      , r = () => {
                        this.done = !0,
                        this.resolve()
                    }
                    ;
                    if (this.appInits)
                        for (let i = 0; i < this.appInits.length; i++) {
                            const o = this.appInits[i]();
                            if (Ou(o))
                                n.push(o);
                            else if (vw(o)) {
                                const s = new Promise( (a, c) => {
                                    o.subscribe({
                                        complete: a,
                                        error: c
                                    })
                                }
                                );
                                n.push(s)
                            }
                        }
                    Promise.all(n).then( () => {
                        r()
                    }
                    ).catch(i => {
                        this.reject(i)
                    }
                    ),
                    0 === n.length && r(),
                    this.initialized = !0
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(f_, 8))
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        const uo = new ge("AppId",{
            providedIn: "root",
            factory: function p_() {
                return `${cl()}${cl()}${cl()}`
            }
        });
        function cl() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }
        const h_ = new ge("Platform Initializer")
          , g_ = new ge("Platform ID",{
            providedIn: "platform",
            factory: () => "unknown"
        })
          , xn = new ge("LocaleId",{
            providedIn: "root",
            factory: () => function VD(e, t=se.Default) {
                return Ee(e, Ko(t))
            }(xn, se.Optional | se.SkipSelf) || function TC() {
                return typeof $localize < "u" && $localize.locale || ui
            }()
        })
          , NC = ( () => Promise.resolve(0))();
        function ul(e) {
            typeof Zone > "u" ? NC.then( () => {
                e && e.apply(null, null)
            }
            ) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
        }
        class mt {
            constructor({enableLongStackTrace: t=!1, shouldCoalesceEventChangeDetection: n=!1, shouldCoalesceRunChangeDetection: r=!1}) {
                if (this.hasPendingMacrotasks = !1,
                this.hasPendingMicrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new En(!1),
                this.onMicrotaskEmpty = new En(!1),
                this.onStable = new En(!1),
                this.onError = new En(!1),
                typeof Zone > "u")
                    throw new J(908,!1);
                Zone.assertZonePatched();
                const i = this;
                i._nesting = 0,
                i._outer = i._inner = Zone.current,
                Zone.TaskTrackingZoneSpec && (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec)),
                t && Zone.longStackTraceZoneSpec && (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
                i.shouldCoalesceEventChangeDetection = !r && n,
                i.shouldCoalesceRunChangeDetection = r,
                i.lastRequestAnimationFrameId = -1,
                i.nativeRequestAnimationFrame = function AC() {
                    let e = Ae.requestAnimationFrame
                      , t = Ae.cancelAnimationFrame;
                    if (typeof Zone < "u" && e && t) {
                        const n = e[Zone.__symbol__("OriginalDelegate")];
                        n && (e = n);
                        const r = t[Zone.__symbol__("OriginalDelegate")];
                        r && (t = r)
                    }
                    return {
                        nativeRequestAnimationFrame: e,
                        nativeCancelAnimationFrame: t
                    }
                }().nativeRequestAnimationFrame,
                function xC(e) {
                    const t = () => {
                        !function PC(e) {
                            e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(Ae, () => {
                                e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                    e.lastRequestAnimationFrameId = -1,
                                    dl(e),
                                    e.isCheckStableRunning = !0,
                                    ll(e),
                                    e.isCheckStableRunning = !1
                                }
                                , void 0, () => {}
                                , () => {}
                                )),
                                e.fakeTopEventTask.invoke()
                            }
                            ),
                            dl(e))
                        }(e)
                    }
                    ;
                    e._inner = e._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (n, r, i, o, s, a) => {
                            try {
                                return y_(e),
                                n.invokeTask(i, o, s, a)
                            } finally {
                                (e.shouldCoalesceEventChangeDetection && "eventTask" === o.type || e.shouldCoalesceRunChangeDetection) && t(),
                                E_(e)
                            }
                        }
                        ,
                        onInvoke: (n, r, i, o, s, a, c) => {
                            try {
                                return y_(e),
                                n.invoke(i, o, s, a, c)
                            } finally {
                                e.shouldCoalesceRunChangeDetection && t(),
                                E_(e)
                            }
                        }
                        ,
                        onHasTask: (n, r, i, o) => {
                            n.hasTask(i, o),
                            r === i && ("microTask" == o.change ? (e._hasPendingMicrotasks = o.microTask,
                            dl(e),
                            ll(e)) : "macroTask" == o.change && (e.hasPendingMacrotasks = o.macroTask))
                        }
                        ,
                        onHandleError: (n, r, i, o) => (n.handleError(i, o),
                        e.runOutsideAngular( () => e.onError.emit(o)),
                        !1)
                    })
                }(i)
            }
            static isInAngularZone() {
                return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!mt.isInAngularZone())
                    throw new J(909,!1)
            }
            static assertNotInAngularZone() {
                if (mt.isInAngularZone())
                    throw new J(909,!1)
            }
            run(t, n, r) {
                return this._inner.run(t, n, r)
            }
            runTask(t, n, r, i) {
                const o = this._inner
                  , s = o.scheduleEventTask("NgZoneEvent: " + i, t, OC, zs, zs);
                try {
                    return o.runTask(s, n, r)
                } finally {
                    o.cancelTask(s)
                }
            }
            runGuarded(t, n, r) {
                return this._inner.runGuarded(t, n, r)
            }
            runOutsideAngular(t) {
                return this._outer.run(t)
            }
        }
        const OC = {};
        function ll(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
                try {
                    e._nesting++,
                    e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--,
                    !e.hasPendingMicrotasks)
                        try {
                            e.runOutsideAngular( () => e.onStable.emit(null))
                        } finally {
                            e.isStable = !0
                        }
                }
        }
        function dl(e) {
            e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
        }
        function y_(e) {
            e._nesting++,
            e.isStable && (e.isStable = !1,
            e.onUnstable.emit(null))
        }
        function E_(e) {
            e._nesting--,
            ll(e)
        }
        class kC {
            constructor() {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new En,
                this.onMicrotaskEmpty = new En,
                this.onStable = new En,
                this.onError = new En
            }
            run(t, n, r) {
                return t.apply(n, r)
            }
            runGuarded(t, n, r) {
                return t.apply(n, r)
            }
            runOutsideAngular(t) {
                return t()
            }
            runTask(t, n, r, i) {
                return t.apply(n, r)
            }
        }
        const D_ = new ge("")
          , qs = new ge("");
        let hl, fl = ( () => {
            class e {
                constructor(n, r, i) {
                    this._ngZone = n,
                    this.registry = r,
                    this._pendingCount = 0,
                    this._isZoneStable = !0,
                    this._didWork = !1,
                    this._callbacks = [],
                    this.taskTrackingZone = null,
                    hl || (function FC(e) {
                        hl = e
                    }(i),
                    i.addToWindow(r)),
                    this._watchAngularEvents(),
                    n.run( () => {
                        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                    }
                    )
                }
                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: () => {
                            this._didWork = !0,
                            this._isZoneStable = !1
                        }
                    }),
                    this._ngZone.runOutsideAngular( () => {
                        this._ngZone.onStable.subscribe({
                            next: () => {
                                mt.assertNotInAngularZone(),
                                ul( () => {
                                    this._isZoneStable = !0,
                                    this._runCallbacksIfReady()
                                }
                                )
                            }
                        })
                    }
                    )
                }
                increasePendingRequestCount() {
                    return this._pendingCount += 1,
                    this._didWork = !0,
                    this._pendingCount
                }
                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1,
                    this._pendingCount < 0)
                        throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(),
                    this._pendingCount
                }
                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }
                _runCallbacksIfReady() {
                    if (this.isStable())
                        ul( () => {
                            for (; 0 !== this._callbacks.length; ) {
                                let n = this._callbacks.pop();
                                clearTimeout(n.timeoutId),
                                n.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        }
                        );
                    else {
                        let n = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId),
                        !1)),
                        this._didWork = !0
                    }
                }
                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n => ({
                        source: n.source,
                        creationLocation: n.creationLocation,
                        data: n.data
                    })) : []
                }
                addCallback(n, r, i) {
                    let o = -1;
                    r && r > 0 && (o = setTimeout( () => {
                        this._callbacks = this._callbacks.filter(s => s.timeoutId !== o),
                        n(this._didWork, this.getPendingTasks())
                    }
                    , r)),
                    this._callbacks.push({
                        doneCb: n,
                        timeoutId: o,
                        updateCb: i
                    })
                }
                whenStable(n, r, i) {
                    if (i && !this.taskTrackingZone)
                        throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(n, r, i),
                    this._runCallbacksIfReady()
                }
                getPendingRequestCount() {
                    return this._pendingCount
                }
                registerApplication(n) {
                    this.registry.registerApplication(n, this)
                }
                unregisterApplication(n) {
                    this.registry.unregisterApplication(n)
                }
                findProviders(n, r, i) {
                    return []
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(mt),Ee(pl),Ee(qs))
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )(), pl = ( () => {
            class e {
                constructor() {
                    this._applications = new Map
                }
                registerApplication(n, r) {
                    this._applications.set(n, r)
                }
                unregisterApplication(n) {
                    this._applications.delete(n)
                }
                unregisterAllApplications() {
                    this._applications.clear()
                }
                getTestability(n) {
                    return this._applications.get(n) || null
                }
                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }
                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }
                findTestabilityInTree(n, r=!0) {
                    return hl?.findTestabilityInTree(this, n, r) ?? null
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            }),
            e
        }
        )();
        const kn = !1;
        let zn = null;
        const v_ = new ge("AllowMultipleToken")
          , gl = new ge("PlatformDestroyListeners")
          , LC = new ge("appBootstrapListener");
        function b_(e, t, n=[]) {
            const r = `Platform: ${t}`
              , i = new ge(r);
            return (o=[]) => {
                let s = ml();
                if (!s || s.injector.get(v_, !1)) {
                    const a = [...n, ...o, {
                        provide: i,
                        useValue: !0
                    }];
                    e ? e(a) : function UC(e) {
                        if (zn && !zn.get(v_, !1))
                            throw new J(400,!1);
                        zn = e;
                        const t = e.get(T_);
                        (function S_(e) {
                            const t = e.get(h_, null);
                            t && t.forEach(n => n())
                        }
                        )(e)
                    }(function w_(e=[], t) {
                        return yr.create({
                            name: t,
                            providers: [{
                                provide: Xc,
                                useValue: "platform"
                            }, {
                                provide: gl,
                                useValue: new Set([ () => zn = null])
                            }, ...e]
                        })
                    }(a, r))
                }
                return function HC(e) {
                    const t = ml();
                    if (!t)
                        throw new J(401,!1);
                    return t
                }()
            }
        }
        function ml() {
            return zn?.get(T_) ?? null
        }
        let T_ = ( () => {
            class e {
                constructor(n) {
                    this._injector = n,
                    this._modules = [],
                    this._destroyListeners = [],
                    this._destroyed = !1
                }
                bootstrapModuleFactory(n, r) {
                    const i = function C_(e, t) {
                        let n;
                        return n = "noop" === e ? new kC : ("zone.js" === e ? void 0 : e) || new mt(t),
                        n
                    }(r?.ngZone, function I_(e) {
                        return {
                            enableLongStackTrace: !1,
                            shouldCoalesceEventChangeDetection: !(!e || !e.ngZoneEventCoalescing) || !1,
                            shouldCoalesceRunChangeDetection: !(!e || !e.ngZoneRunCoalescing) || !1
                        }
                    }(r))
                      , o = [{
                        provide: mt,
                        useValue: i
                    }];
                    return i.run( () => {
                        const s = yr.create({
                            providers: o,
                            parent: this.injector,
                            name: n.moduleType.name
                        })
                          , a = n.create(s)
                          , c = a.injector.get(_r, null);
                        if (!c)
                            throw new J(402,!1);
                        return i.runOutsideAngular( () => {
                            const u = i.onError.subscribe({
                                next: l => {
                                    c.handleError(l)
                                }
                            });
                            a.onDestroy( () => {
                                Zs(this._modules, a),
                                u.unsubscribe()
                            }
                            )
                        }
                        ),
                        function M_(e, t, n) {
                            try {
                                const r = n();
                                return Ou(r) ? r.catch(i => {
                                    throw t.runOutsideAngular( () => e.handleError(i)),
                                    i
                                }
                                ) : r
                            } catch (r) {
                                throw t.runOutsideAngular( () => e.handleError(r)),
                                r
                            }
                        }(c, i, () => {
                            const u = a.injector.get(Ks);
                            return u.runInitializers(),
                            u.donePromise.then( () => (function nm(e) {
                                Ht(e, "Expected localeId to be defined"),
                                "string" == typeof e && (tm = e.toLowerCase().replace(/_/g, "-"))
                            }(a.injector.get(xn, ui) || ui),
                            this._moduleDoBootstrap(a),
                            a))
                        }
                        )
                    }
                    )
                }
                bootstrapModule(n, r=[]) {
                    const i = R_({}, r);
                    return function BC(e, t, n) {
                        const r = new Ku(n);
                        return Promise.resolve(r)
                    }(0, 0, n).then(o => this.bootstrapModuleFactory(o, i))
                }
                _moduleDoBootstrap(n) {
                    const r = n.injector.get(_l);
                    if (n._bootstrapComponents.length > 0)
                        n._bootstrapComponents.forEach(i => r.bootstrap(i));
                    else {
                        if (!n.instance.ngDoBootstrap)
                            throw new J(-403,!1);
                        n.instance.ngDoBootstrap(r)
                    }
                    this._modules.push(n)
                }
                onDestroy(n) {
                    this._destroyListeners.push(n)
                }
                get injector() {
                    return this._injector
                }
                destroy() {
                    if (this._destroyed)
                        throw new J(404,!1);
                    this._modules.slice().forEach(r => r.destroy()),
                    this._destroyListeners.forEach(r => r());
                    const n = this._injector.get(gl, null);
                    n && (n.forEach(r => r()),
                    n.clear()),
                    this._destroyed = !0
                }
                get destroyed() {
                    return this._destroyed
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(yr))
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            }),
            e
        }
        )();
        function R_(e, t) {
            return Array.isArray(t) ? t.reduce(R_, e) : {
                ...e,
                ...t
            }
        }
        let _l = ( () => {
            class e {
                get destroyed() {
                    return this._destroyed
                }
                get injector() {
                    return this._injector
                }
                constructor(n, r, i) {
                    this._zone = n,
                    this._injector = r,
                    this._exceptionHandler = i,
                    this._bootstrapListeners = [],
                    this._views = [],
                    this._runningTick = !1,
                    this._stable = !0,
                    this._destroyed = !1,
                    this._destroyListeners = [],
                    this.componentTypes = [],
                    this.components = [],
                    this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this._zone.run( () => {
                                this.tick()
                            }
                            )
                        }
                    });
                    const o = new et(a => {
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks,
                        this._zone.runOutsideAngular( () => {
                            a.next(this._stable),
                            a.complete()
                        }
                        )
                    }
                    )
                      , s = new et(a => {
                        let c;
                        this._zone.runOutsideAngular( () => {
                            c = this._zone.onStable.subscribe( () => {
                                mt.assertNotInAngularZone(),
                                ul( () => {
                                    !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0,
                                    a.next(!0))
                                }
                                )
                            }
                            )
                        }
                        );
                        const u = this._zone.onUnstable.subscribe( () => {
                            mt.assertInAngularZone(),
                            this._stable && (this._stable = !1,
                            this._zone.runOutsideAngular( () => {
                                a.next(!1)
                            }
                            ))
                        }
                        );
                        return () => {
                            c.unsubscribe(),
                            u.unsubscribe()
                        }
                    }
                    );
                    this.isStable = CD(o, s.pipe(function MD(e={}) {
                        const {connector: t=( () => new or), resetOnError: n=!0, resetOnComplete: r=!0, resetOnRefCountZero: i=!0} = e;
                        return o => {
                            let s, a, c, u = 0, l = !1, d = !1;
                            const f = () => {
                                a?.unsubscribe(),
                                a = void 0
                            }
                              , p = () => {
                                f(),
                                s = c = void 0,
                                l = d = !1
                            }
                              , g = () => {
                                const D = s;
                                p(),
                                D?.unsubscribe()
                            }
                            ;
                            return sr( (D, C) => {
                                u++,
                                !d && !l && f();
                                const P = c = c ?? t();
                                C.add( () => {
                                    u--,
                                    0 === u && !d && !l && (a = $a(g, i))
                                }
                                ),
                                P.subscribe(C),
                                !s && u > 0 && (s = new X({
                                    next: z => P.next(z),
                                    error: z => {
                                        d = !0,
                                        f(),
                                        a = $a(p, n, z),
                                        P.error(z)
                                    }
                                    ,
                                    complete: () => {
                                        l = !0,
                                        f(),
                                        a = $a(p, r),
                                        P.complete()
                                    }
                                }),
                                cr(D).subscribe(s))
                            }
                            )(o)
                        }
                    }()))
                }
                bootstrap(n, r) {
                    const i = n instanceof oh;
                    if (!this._injector.get(Ks).done) {
                        !i && function Ni(e) {
                            const t = be(e) || dt(e) || Mt(e);
                            return null !== t && t.standalone
                        }(n);
                        throw new J(405,kn)
                    }
                    let s;
                    s = i ? n : this._injector.get(Ms).resolveComponentFactory(n),
                    this.componentTypes.push(s.componentType);
                    const a = function jC(e) {
                        return e.isBoundToModule
                    }(s) ? void 0 : this._injector.get(li)
                      , u = s.create(yr.NULL, [], r || s.selector, a)
                      , l = u.location.nativeElement
                      , d = u.injector.get(D_, null);
                    return d?.registerApplication(l),
                    u.onDestroy( () => {
                        this.detachView(u.hostView),
                        Zs(this.components, u),
                        d?.unregisterApplication(l)
                    }
                    ),
                    this._loadComponent(u),
                    u
                }
                tick() {
                    if (this._runningTick)
                        throw new J(101,!1);
                    try {
                        this._runningTick = !0;
                        for (let n of this._views)
                            n.detectChanges()
                    } catch (n) {
                        this._zone.runOutsideAngular( () => this._exceptionHandler.handleError(n))
                    } finally {
                        this._runningTick = !1
                    }
                }
                attachView(n) {
                    const r = n;
                    this._views.push(r),
                    r.attachToAppRef(this)
                }
                detachView(n) {
                    const r = n;
                    Zs(this._views, r),
                    r.detachFromAppRef()
                }
                _loadComponent(n) {
                    this.attachView(n.hostView),
                    this.tick(),
                    this.components.push(n);
                    const r = this._injector.get(LC, []);
                    r.push(...this._bootstrapListeners),
                    r.forEach(i => i(n))
                }
                ngOnDestroy() {
                    if (!this._destroyed)
                        try {
                            this._destroyListeners.forEach(n => n()),
                            this._views.slice().forEach(n => n.destroy()),
                            this._onMicrotaskEmptySubscription.unsubscribe()
                        } finally {
                            this._destroyed = !0,
                            this._views = [],
                            this._bootstrapListeners = [],
                            this._destroyListeners = []
                        }
                }
                onDestroy(n) {
                    return this._destroyListeners.push(n),
                    () => Zs(this._destroyListeners, n)
                }
                destroy() {
                    if (this._destroyed)
                        throw new J(406,!1);
                    const n = this._injector;
                    n.destroy && !n.destroyed && n.destroy()
                }
                get viewCount() {
                    return this._views.length
                }
                warnIfDestroyed() {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(mt),Ee(Yr),Ee(_r))
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        function Zs(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }
        const oM = b_(null, "core", []);
        let sM = ( () => {
            class e {
                constructor(n) {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(_l))
            }
            ,
            e.\u0275mod = Mr({
                type: e
            }),
            e.\u0275inj = ur({}),
            e
        }
        )()
          , Sl = null;
        function ea() {
            return Sl
        }
        class uM {
        }
        const Fn = new ge("DocumentToken");
        let IR = ( () => {
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275mod = Mr({
                type: e
            }),
            e.\u0275inj = ur({}),
            e
        }
        )();
        class iN extends uM {
            constructor() {
                super(...arguments),
                this.supportsDOMEvents = !0
            }
        }
        class jl extends iN {
            static makeCurrent() {
                !function cM(e) {
                    Sl || (Sl = e)
                }(new jl)
            }
            onAndCancel(t, n, r) {
                return t.addEventListener(n, r, !1),
                () => {
                    t.removeEventListener(n, r, !1)
                }
            }
            dispatchEvent(t, n) {
                t.dispatchEvent(n)
            }
            remove(t) {
                t.parentNode && t.parentNode.removeChild(t)
            }
            createElement(t, n) {
                return (n = n || this.getDefaultDocument()).createElement(t)
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            isElementNode(t) {
                return t.nodeType === Node.ELEMENT_NODE
            }
            isShadowRoot(t) {
                return t instanceof DocumentFragment
            }
            getGlobalEventTarget(t, n) {
                return "window" === n ? window : "document" === n ? t : "body" === n ? t.body : null
            }
            getBaseHref(t) {
                const n = function oN() {
                    return go = go || document.querySelector("base"),
                    go ? go.getAttribute("href") : null
                }();
                return null == n ? null : function sN(e) {
                    fa = fa || document.createElement("a"),
                    fa.setAttribute("href", e);
                    const t = fa.pathname;
                    return "/" === t.charAt(0) ? t : `/${t}`
                }(n)
            }
            resetBaseElement() {
                go = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            getCookie(t) {
                return function KM(e, t) {
                    t = encodeURIComponent(t);
                    for (const n of e.split(";")) {
                        const r = n.indexOf("=")
                          , [i,o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
                        if (i.trim() === t)
                            return decodeURIComponent(o)
                    }
                    return null
                }(document.cookie, t)
            }
        }
        let fa, go = null;
        const cy = new ge("TRANSITION_ID")
          , cN = [{
            provide: f_,
            useFactory: function aN(e, t, n) {
                return () => {
                    n.get(Ks).donePromise.then( () => {
                        const r = ea()
                          , i = t.querySelectorAll(`style[ng-transition="${e}"]`);
                        for (let o = 0; o < i.length; o++)
                            r.remove(i[o])
                    }
                    )
                }
            },
            deps: [cy, Fn, yr],
            multi: !0
        }];
        let lN = ( () => {
            class e {
                build() {
                    return new XMLHttpRequest
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const pa = new ge("EventManagerPlugins");
        let ha = ( () => {
            class e {
                constructor(n, r) {
                    this._zone = r,
                    this._eventNameToPlugin = new Map,
                    n.forEach(i => {
                        i.manager = this
                    }
                    ),
                    this._plugins = n.slice().reverse()
                }
                addEventListener(n, r, i) {
                    return this._findPluginFor(r).addEventListener(n, r, i)
                }
                addGlobalEventListener(n, r, i) {
                    return this._findPluginFor(r).addGlobalEventListener(n, r, i)
                }
                getZone() {
                    return this._zone
                }
                _findPluginFor(n) {
                    const r = this._eventNameToPlugin.get(n);
                    if (r)
                        return r;
                    const i = this._plugins;
                    for (let o = 0; o < i.length; o++) {
                        const s = i[o];
                        if (s.supports(n))
                            return this._eventNameToPlugin.set(n, s),
                            s
                    }
                    throw new Error(`No event manager plugin found for event ${n}`)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(pa),Ee(mt))
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        class uy {
            constructor(t) {
                this._doc = t
            }
            addGlobalEventListener(t, n, r) {
                const i = ea().getGlobalEventTarget(this._doc, t);
                if (!i)
                    throw new Error(`Unsupported event target ${i} for event ${n}`);
                return this.addEventListener(i, n, r)
            }
        }
        let ly = ( () => {
            class e {
                constructor() {
                    this.usageCount = new Map
                }
                addStyles(n) {
                    for (const r of n)
                        1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
                }
                removeStyles(n) {
                    for (const r of n)
                        0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r)
                }
                onStyleRemoved(n) {}
                onStyleAdded(n) {}
                getAllStyles() {
                    return this.usageCount.keys()
                }
                changeUsageCount(n, r) {
                    const i = this.usageCount;
                    let o = i.get(n) ?? 0;
                    return o += r,
                    o > 0 ? i.set(n, o) : i.delete(n),
                    o
                }
                ngOnDestroy() {
                    for (const n of this.getAllStyles())
                        this.onStyleRemoved(n);
                    this.usageCount.clear()
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )()
          , mo = ( () => {
            class e extends ly {
                constructor(n) {
                    super(),
                    this.doc = n,
                    this.styleRef = new Map,
                    this.hostNodes = new Set,
                    this.resetHostNodes()
                }
                onStyleAdded(n) {
                    for (const r of this.hostNodes)
                        this.addStyleToHost(r, n)
                }
                onStyleRemoved(n) {
                    const r = this.styleRef;
                    r.get(n)?.forEach(o => o.remove()),
                    r.delete(n)
                }
                ngOnDestroy() {
                    super.ngOnDestroy(),
                    this.styleRef.clear(),
                    this.resetHostNodes()
                }
                addHost(n) {
                    this.hostNodes.add(n);
                    for (const r of this.getAllStyles())
                        this.addStyleToHost(n, r)
                }
                removeHost(n) {
                    this.hostNodes.delete(n)
                }
                addStyleToHost(n, r) {
                    const i = this.doc.createElement("style");
                    i.textContent = r,
                    n.appendChild(i);
                    const o = this.styleRef.get(r);
                    o ? o.push(i) : this.styleRef.set(r, [i])
                }
                resetHostNodes() {
                    const n = this.hostNodes;
                    n.clear(),
                    n.add(this.doc.head)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(Fn))
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const Ul = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/MathML/"
        }
          , $l = /%COMP%/g
          , py = new ge("RemoveStylesOnCompDestory",{
            providedIn: "root",
            factory: () => !1
        });
        function hy(e, t) {
            return t.flat(100).map(n => n.replace($l, e))
        }
        function gy(e) {
            return t => {
                if ("__ngUnwrap__" === t)
                    return e;
                !1 === e(t) && (t.preventDefault(),
                t.returnValue = !1)
            }
        }
        let Hl = ( () => {
            class e {
                constructor(n, r, i, o) {
                    this.eventManager = n,
                    this.sharedStylesHost = r,
                    this.appId = i,
                    this.removeStylesOnCompDestory = o,
                    this.rendererByCompId = new Map,
                    this.defaultRenderer = new Vl(n)
                }
                createRenderer(n, r) {
                    if (!n || !r)
                        return this.defaultRenderer;
                    const i = this.getOrCreateRenderer(n, r);
                    return i instanceof yy ? i.applyToHost(n) : i instanceof Gl && i.applyStyles(),
                    i
                }
                getOrCreateRenderer(n, r) {
                    const i = this.rendererByCompId;
                    let o = i.get(r.id);
                    if (!o) {
                        const s = this.eventManager
                          , a = this.sharedStylesHost
                          , c = this.removeStylesOnCompDestory;
                        switch (r.encapsulation) {
                        case dn.Emulated:
                            o = new yy(s,a,r,this.appId,c);
                            break;
                        case dn.ShadowDom:
                            return new _N(s,a,n,r);
                        default:
                            o = new Gl(s,a,r,c)
                        }
                        o.onDestroy = () => i.delete(r.id),
                        i.set(r.id, o)
                    }
                    return o
                }
                ngOnDestroy() {
                    this.rendererByCompId.clear()
                }
                begin() {}
                end() {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(ha),Ee(mo),Ee(uo),Ee(py))
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        class Vl {
            constructor(t) {
                this.eventManager = t,
                this.data = Object.create(null),
                this.destroyNode = null
            }
            destroy() {}
            createElement(t, n) {
                return n ? document.createElementNS(Ul[n] || n, t) : document.createElement(t)
            }
            createComment(t) {
                return document.createComment(t)
            }
            createText(t) {
                return document.createTextNode(t)
            }
            appendChild(t, n) {
                (_y(t) ? t.content : t).appendChild(n)
            }
            insertBefore(t, n, r) {
                t && (_y(t) ? t.content : t).insertBefore(n, r)
            }
            removeChild(t, n) {
                t && t.removeChild(n)
            }
            selectRootElement(t, n) {
                let r = "string" == typeof t ? document.querySelector(t) : t;
                if (!r)
                    throw new Error(`The selector "${t}" did not match any elements`);
                return n || (r.textContent = ""),
                r
            }
            parentNode(t) {
                return t.parentNode
            }
            nextSibling(t) {
                return t.nextSibling
            }
            setAttribute(t, n, r, i) {
                if (i) {
                    n = i + ":" + n;
                    const o = Ul[i];
                    o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r)
                } else
                    t.setAttribute(n, r)
            }
            removeAttribute(t, n, r) {
                if (r) {
                    const i = Ul[r];
                    i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`)
                } else
                    t.removeAttribute(n)
            }
            addClass(t, n) {
                t.classList.add(n)
            }
            removeClass(t, n) {
                t.classList.remove(n)
            }
            setStyle(t, n, r, i) {
                i & (Rt.DashCase | Rt.Important) ? t.style.setProperty(n, r, i & Rt.Important ? "important" : "") : t.style[n] = r
            }
            removeStyle(t, n, r) {
                r & Rt.DashCase ? t.style.removeProperty(n) : t.style[n] = ""
            }
            setProperty(t, n, r) {
                t[n] = r
            }
            setValue(t, n) {
                t.nodeValue = n
            }
            listen(t, n, r) {
                return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, n, gy(r)) : this.eventManager.addEventListener(t, n, gy(r))
            }
        }
        function _y(e) {
            return "TEMPLATE" === e.tagName && void 0 !== e.content
        }
        class _N extends Vl {
            constructor(t, n, r, i) {
                super(t),
                this.sharedStylesHost = n,
                this.hostEl = r,
                this.shadowRoot = r.attachShadow({
                    mode: "open"
                }),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const o = hy(i.id, i.styles);
                for (const s of o) {
                    const a = document.createElement("style");
                    a.textContent = s,
                    this.shadowRoot.appendChild(a)
                }
            }
            nodeOrShadowRoot(t) {
                return t === this.hostEl ? this.shadowRoot : t
            }
            appendChild(t, n) {
                return super.appendChild(this.nodeOrShadowRoot(t), n)
            }
            insertBefore(t, n, r) {
                return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
            }
            removeChild(t, n) {
                return super.removeChild(this.nodeOrShadowRoot(t), n)
            }
            parentNode(t) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
        }
        class Gl extends Vl {
            constructor(t, n, r, i, o=r.id) {
                super(t),
                this.sharedStylesHost = n,
                this.removeStylesOnCompDestory = i,
                this.rendererUsageCount = 0,
                this.styles = hy(o, r.styles)
            }
            applyStyles() {
                this.sharedStylesHost.addStyles(this.styles),
                this.rendererUsageCount++
            }
            destroy() {
                this.removeStylesOnCompDestory && (this.sharedStylesHost.removeStyles(this.styles),
                this.rendererUsageCount--,
                0 === this.rendererUsageCount && this.onDestroy?.())
            }
        }
        class yy extends Gl {
            constructor(t, n, r, i, o) {
                const s = i + "-" + r.id;
                super(t, n, r, o, s),
                this.contentAttr = function hN(e) {
                    return "_ngcontent-%COMP%".replace($l, e)
                }(s),
                this.hostAttr = function gN(e) {
                    return "_nghost-%COMP%".replace($l, e)
                }(s)
            }
            applyToHost(t) {
                this.applyStyles(),
                this.setAttribute(t, this.hostAttr, "")
            }
            createElement(t, n) {
                const r = super.createElement(t, n);
                return super.setAttribute(r, this.contentAttr, ""),
                r
            }
        }
        let yN = ( () => {
            class e extends uy {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return !0
                }
                addEventListener(n, r, i) {
                    return n.addEventListener(r, i, !1),
                    () => this.removeEventListener(n, r, i)
                }
                removeEventListener(n, r, i) {
                    return n.removeEventListener(r, i)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(Fn))
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const Ey = ["alt", "control", "meta", "shift"]
          , EN = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
          , DN = {
            alt: e => e.altKey,
            control: e => e.ctrlKey,
            meta: e => e.metaKey,
            shift: e => e.shiftKey
        };
        let vN = ( () => {
            class e extends uy {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return null != e.parseEventName(n)
                }
                addEventListener(n, r, i) {
                    const o = e.parseEventName(r)
                      , s = e.eventCallback(o.fullKey, i, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular( () => ea().onAndCancel(n, o.domEventName, s))
                }
                static parseEventName(n) {
                    const r = n.toLowerCase().split(".")
                      , i = r.shift();
                    if (0 === r.length || "keydown" !== i && "keyup" !== i)
                        return null;
                    const o = e._normalizeKey(r.pop());
                    let s = ""
                      , a = r.indexOf("code");
                    if (a > -1 && (r.splice(a, 1),
                    s = "code."),
                    Ey.forEach(u => {
                        const l = r.indexOf(u);
                        l > -1 && (r.splice(l, 1),
                        s += u + ".")
                    }
                    ),
                    s += o,
                    0 != r.length || 0 === o.length)
                        return null;
                    const c = {};
                    return c.domEventName = i,
                    c.fullKey = s,
                    c
                }
                static matchEventFullKeyCode(n, r) {
                    let i = EN[n.key] || n.key
                      , o = "";
                    return r.indexOf("code.") > -1 && (i = n.code,
                    o = "code."),
                    !(null == i || !i) && (i = i.toLowerCase(),
                    " " === i ? i = "space" : "." === i && (i = "dot"),
                    Ey.forEach(s => {
                        s !== i && (0,
                        DN[s])(n) && (o += s + ".")
                    }
                    ),
                    o += i,
                    o === r)
                }
                static eventCallback(n, r, i) {
                    return o => {
                        e.matchEventFullKeyCode(o, n) && i.runGuarded( () => r(o))
                    }
                }
                static _normalizeKey(n) {
                    return "esc" === n ? "escape" : n
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(Fn))
            }
            ,
            e.\u0275prov = Pe({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const vy = [{
            provide: g_,
            useValue: "browser"
        }, {
            provide: h_,
            useValue: function SN() {
                jl.makeCurrent()
            },
            multi: !0
        }, {
            provide: Fn,
            useFactory: function wN() {
                return function YS(e) {
                    Gc = e
                }(document),
                document
            },
            deps: []
        }]
          , TN = b_(oM, "browser", vy)
          , Sy = new ge("")
          , by = [{
            provide: qs,
            useClass: class uN {
                addToWindow(t) {
                    Ae.getAngularTestability = (r, i=!0) => {
                        const o = t.findTestabilityInTree(r, i);
                        if (null == o)
                            throw new Error("Could not find testability for element.");
                        return o
                    }
                    ,
                    Ae.getAllAngularTestabilities = () => t.getAllTestabilities(),
                    Ae.getAllAngularRootElements = () => t.getAllRootElements(),
                    Ae.frameworkStabilizers || (Ae.frameworkStabilizers = []),
                    Ae.frameworkStabilizers.push(r => {
                        const i = Ae.getAllAngularTestabilities();
                        let o = i.length
                          , s = !1;
                        const a = function(c) {
                            s = s || c,
                            o--,
                            0 == o && r(s)
                        };
                        i.forEach(function(c) {
                            c.whenStable(a)
                        })
                    }
                    )
                }
                findTestabilityInTree(t, n, r) {
                    return null == n ? null : t.getTestability(n) ?? (r ? ea().isShadowRoot(n) ? this.findTestabilityInTree(t, n.host, !0) : this.findTestabilityInTree(t, n.parentElement, !0) : null)
                }
            }
            ,
            deps: []
        }, {
            provide: D_,
            useClass: fl,
            deps: [mt, pl, qs]
        }, {
            provide: fl,
            useClass: fl,
            deps: [mt, pl, qs]
        }]
          , wy = [{
            provide: Xc,
            useValue: "root"
        }, {
            provide: _r,
            useFactory: function bN() {
                return new _r
            },
            deps: []
        }, {
            provide: pa,
            useClass: yN,
            multi: !0,
            deps: [Fn, mt, g_]
        }, {
            provide: pa,
            useClass: vN,
            multi: !0,
            deps: [Fn]
        }, {
            provide: Hl,
            useClass: Hl,
            deps: [ha, mo, uo, py]
        }, {
            provide: ah,
            useExisting: Hl
        }, {
            provide: ly,
            useExisting: mo
        }, {
            provide: mo,
            useClass: mo,
            deps: [Fn]
        }, {
            provide: ha,
            useClass: ha,
            deps: [pa, mt]
        }, {
            provide: class AR {
            }
            ,
            useClass: lN,
            deps: []
        }, []];
        let IN = ( () => {
            class e {
                constructor(n) {}
                static withServerTransition(n) {
                    return {
                        ngModule: e,
                        providers: [{
                            provide: uo,
                            useValue: n.appId
                        }, {
                            provide: cy,
                            useExisting: uo
                        }, cN]
                    }
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(Ee(Sy, 12))
            }
            ,
            e.\u0275mod = Mr({
                type: e
            }),
            e.\u0275inj = ur({
                providers: [...wy, ...by],
                imports: [IR, sM]
            }),
            e
        }
        )();
        typeof window < "u" && window;
        const ga = "7.45.0";
        var ze = E(981)
          , vn = E(76)
          , Bn = E(103);
        function zl(e, t=0) {
            return "string" != typeof e || 0 === t || e.length <= t ? e : `${e.slice(0, t)}...`
        }
        function Kl(e, t=[], n=!1) {
            return t.some(r => function xN(e, t, n=!1) {
                return !!(0,
                Bn.HD)(e) && ((0,
                Bn.Kj)(t) ? t.test(e) : !!(0,
                Bn.HD)(t) && (n ? e === t : e.includes(t)))
            }(e, r, n))
        }
        const kN = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
        class pi {
            static __initStatic() {
                this.id = "InboundFilters"
            }
            __init() {
                this.name = pi.id
            }
            constructor(t={}) {
                this._options = t,
                pi.prototype.__init.call(this)
            }
            setupOnce(t, n) {
                const r = i => {
                    const o = n();
                    if (o) {
                        const s = o.getIntegration(pi);
                        if (s) {
                            const a = o.getClient()
                              , c = a ? a.getOptions() : {}
                              , u = function FN(e={}, t={}) {
                                return {
                                    allowUrls: [...e.allowUrls || [], ...t.allowUrls || []],
                                    denyUrls: [...e.denyUrls || [], ...t.denyUrls || []],
                                    ignoreErrors: [...e.ignoreErrors || [], ...t.ignoreErrors || [], ...kN],
                                    ignoreInternal: void 0 === e.ignoreInternal || e.ignoreInternal
                                }
                            }(s._options, c);
                            return function LN(e, t) {
                                return t.ignoreInternal && function HN(e) {
                                    try {
                                        return "SentryError" === e.exception.values[0].type
                                    } catch {}
                                    return !1
                                }(e) ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.warn(`Event dropped due to being internal Sentry Error.\nEvent: ${(0,
                                vn.jH)(e)}`),
                                !0) : function BN(e, t) {
                                    return !(e.type || !t || !t.length) && function $N(e) {
                                        if (e.message)
                                            return [e.message];
                                        if (e.exception)
                                            try {
                                                const {type: t="", value: n=""} = e.exception.values && e.exception.values[0] || {};
                                                return [`${n}`, `${t}: ${n}`]
                                            } catch {
                                                return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.error(`Cannot extract message for event ${(0,
                                                vn.jH)(e)}`),
                                                []
                                            }
                                        return []
                                    }(e).some(n => Kl(n, t))
                                }(e, t.ignoreErrors) ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${(0,
                                vn.jH)(e)}`),
                                !0) : function jN(e, t) {
                                    if (!t || !t.length)
                                        return !1;
                                    const n = ma(e);
                                    return !!n && Kl(n, t)
                                }(e, t.denyUrls) ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${(0,
                                vn.jH)(e)}.\nUrl: ${ma(e)}`),
                                !0) : !function UN(e, t) {
                                    if (!t || !t.length)
                                        return !0;
                                    const n = ma(e);
                                    return !n || Kl(n, t)
                                }(e, t.allowUrls) && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${(0,
                                vn.jH)(e)}.\nUrl: ${ma(e)}`),
                                !0)
                            }(i, u) ? null : i
                        }
                    }
                    return i
                }
                ;
                r.id = this.name,
                t(r)
            }
        }
        function ma(e) {
            try {
                let t;
                try {
                    t = e.exception.values[0].stacktrace.frames
                } catch {}
                return t ? function VN(e=[]) {
                    for (let t = e.length - 1; t >= 0; t--) {
                        const n = e[t];
                        if (n && "<anonymous>" !== n.filename && "[native code]" !== n.filename)
                            return n.filename || null
                    }
                    return null
                }(t) : null
            } catch {
                return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.error(`Cannot extract url for event ${(0,
                vn.jH)(e)}`),
                null
            }
        }
        pi.__initStatic();
        var _o = E(47);
        let Cy;
        class yo {
            constructor() {
                yo.prototype.__init.call(this)
            }
            static __initStatic() {
                this.id = "FunctionToString"
            }
            __init() {
                this.name = yo.id
            }
            setupOnce() {
                Cy = Function.prototype.toString,
                Function.prototype.toString = function(...t) {
                    const n = (0,
                    _o.HK)(this) || this;
                    return Cy.apply(n, t)
                }
            }
        }
        yo.__initStatic();
        var He = E(10)
          , _a = E(670);
        const My = [];
        function YN(e) {
            const t = e.defaultIntegrations || []
              , n = e.integrations;
            let r;
            t.forEach(s => {
                s.isDefaultInstance = !0
            }
            ),
            r = Array.isArray(n) ? [...t, ...n] : "function" == typeof n ? (0,
            vn.lE)(n(t)) : t;
            const i = function GN(e) {
                const t = {};
                return e.forEach(n => {
                    const {name: r} = n
                      , i = t[r];
                    i && !i.isDefaultInstance && n.isDefaultInstance || (t[r] = n)
                }
                ),
                Object.keys(t).map(n => t[n])
            }(r)
              , o = function zN(e, t) {
                for (let n = 0; n < e.length; n++)
                    if (!0 === t(e[n]))
                        return n;
                return -1
            }(i, s => "Debug" === s.name);
            if (-1 !== o) {
                const [s] = i.splice(o, 1);
                i.push(s)
            }
            return i
        }
        function Ry(e, t) {
            t[e.name] = e,
            -1 === My.indexOf(e.name) && (e.setupOnce(_a.c, He.Gd),
            My.push(e.name),
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.log(`Integration installed: ${e.name}`))
        }
        const Ny = 50
          , Ay = /\(error: (.*)\)/;
        function Oy(...e) {
            const t = e.sort( (n, r) => n[0] - r[0]).map(n => n[1]);
            return (n, r=0) => {
                const i = []
                  , o = n.split("\n");
                for (let s = r; s < o.length; s++) {
                    const a = o[s];
                    if (a.length > 1024)
                        continue;
                    const c = Ay.test(a) ? a.replace(Ay, "$1") : a;
                    for (const u of t) {
                        const l = u(c);
                        if (l) {
                            i.push(l);
                            break
                        }
                    }
                    if (i.length >= Ny)
                        break
                }
                return function ZN(e) {
                    if (!e.length)
                        return [];
                    const t = e.slice(0, Ny)
                      , n = t[t.length - 1].function;
                    n && /sentryWrapped/.test(n) && t.pop(),
                    t.reverse();
                    const r = t[t.length - 1].function;
                    return r && /captureMessage|captureException/.test(r) && t.pop(),
                    t.map(i => ({
                        ...i,
                        filename: i.filename || t[t.length - 1].filename,
                        function: i.function || "?"
                    }))
                }(i)
            }
        }
        function qN(e) {
            return Array.isArray(e) ? Oy(...e) : e
        }
        const ql = "<anonymous>";
        function qn(e) {
            try {
                return e && "function" == typeof e && e.name || ql
            } catch {
                return ql
            }
        }
        var Zn = E(124);
        const JN = "Sentry Logger "
          , ya = ["debug", "info", "warn", "error", "log", "assert", "trace"];
        function Py() {
            let e = !1;
            const t = {
                enable: () => {
                    e = !0
                }
                ,
                disable: () => {
                    e = !1
                }
            };
            return typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? ya.forEach(n => {
                t[n] = (...r) => {
                    e && function XN(e) {
                        if (!("console"in Zn.n2))
                            return e();
                        const t = Zn.n2.console
                          , n = {};
                        ya.forEach(r => {
                            const i = t[r] && t[r].__sentry_original__;
                            r in t && i && (n[r] = t[r],
                            t[r] = i)
                        }
                        );
                        try {
                            e()
                        } finally {
                            Object.keys(n).forEach(r => {
                                t[r] = n[r]
                            }
                            )
                        }
                    }( () => {
                        Zn.n2.console[n](`${JN}[${n}]:`, ...r)
                    }
                    )
                }
            }
            ) : ya.forEach(n => {
                t[n] = () => {}
            }
            ),
            t
        }
        let Ut;
        Ut = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? (0,
        Zn.YO)("logger", Py) : Py();
        const Qn = (0,
        Zn.Rf)();
        function Zl() {
            if (!("fetch"in Qn))
                return !1;
            try {
                return new Headers,
                new Request("http://www.example.com"),
                new Response,
                !0
            } catch {
                return !1
            }
        }
        function Ql(e) {
            return e && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
        }
        const xy = Object.prototype.toString;
        function ky(e) {
            switch (xy.call(e)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
                return !0;
            default:
                return Jn(e, Error)
            }
        }
        function hi(e, t) {
            return xy.call(e) === `[object ${t}]`
        }
        function Fy(e) {
            return hi(e, "ErrorEvent")
        }
        function Ly(e) {
            return hi(e, "DOMError")
        }
        function Eo(e) {
            return hi(e, "String")
        }
        function By(e) {
            return hi(e, "Object")
        }
        function Jl(e) {
            return typeof Event < "u" && Jn(e, Event)
        }
        function Jn(e, t) {
            try {
                return e instanceof t
            } catch {
                return !1
            }
        }
        const Ea = (0,
        Zn.Rf)()
          , cA = 80;
        function Xl(e, t={}) {
            try {
                let n = e;
                const r = 5
                  , i = [];
                let o = 0
                  , s = 0;
                const a = " > "
                  , c = a.length;
                let u;
                const l = Array.isArray(t) ? t : t.keyAttrs
                  , d = !Array.isArray(t) && t.maxStringLength || cA;
                for (; n && o++ < r && (u = uA(n, l),
                !("html" === u || o > 1 && s + i.length * c + u.length >= d)); )
                    i.push(u),
                    s += u.length,
                    n = n.parentNode;
                return i.reverse().join(a)
            } catch {
                return "<unknown>"
            }
        }
        function uA(e, t) {
            const n = e
              , r = [];
            let i, o, s, a, c;
            if (!n || !n.tagName)
                return "";
            r.push(n.tagName.toLowerCase());
            const u = t && t.length ? t.filter(d => n.getAttribute(d)).map(d => [d, n.getAttribute(d)]) : null;
            if (u && u.length)
                u.forEach(d => {
                    r.push(`[${d[0]}="${d[1]}"]`)
                }
                );
            else if (n.id && r.push(`#${n.id}`),
            i = n.className,
            i && Eo(i))
                for (o = i.split(/\s+/),
                c = 0; c < o.length; c++)
                    r.push(`.${o[c]}`);
            const l = ["aria-label", "type", "name", "title", "alt"];
            for (c = 0; c < l.length; c++)
                s = l[c],
                a = n.getAttribute(s),
                a && r.push(`[${s}="${a}"]`);
            return r.join("")
        }
        function jy(e, t=0) {
            return "string" != typeof e || 0 === t || e.length <= t ? e : `${e.slice(0, t)}...`
        }
        function Uy(e, t) {
            if (!Array.isArray(e))
                return "";
            const n = [];
            for (let r = 0; r < e.length; r++) {
                const i = e[r];
                try {
                    n.push(String(i))
                } catch {
                    n.push("[value cannot be serialized]")
                }
            }
            return n.join(t)
        }
        function _t(e, t, n) {
            if (!(t in e))
                return;
            const r = e[t]
              , i = n(r);
            if ("function" == typeof i)
                try {
                    Hy(i, r)
                } catch {}
            e[t] = i
        }
        function $y(e, t, n) {
            Object.defineProperty(e, t, {
                value: n,
                writable: !0,
                configurable: !0
            })
        }
        function Hy(e, t) {
            e.prototype = t.prototype = t.prototype || {},
            $y(e, "__sentry_original__", t)
        }
        function Vy(e) {
            return e.__sentry_original__
        }
        function Gy(e) {
            if (ky(e))
                return {
                    message: e.message,
                    name: e.name,
                    stack: e.stack,
                    ...Wy(e)
                };
            if (Jl(e)) {
                const t = {
                    type: e.type,
                    target: Yy(e.target),
                    currentTarget: Yy(e.currentTarget),
                    ...Wy(e)
                };
                return typeof CustomEvent < "u" && Jn(e, CustomEvent) && (t.detail = e.detail),
                t
            }
            return e
        }
        function Yy(e) {
            try {
                return function iA(e) {
                    return typeof Element < "u" && Jn(e, Element)
                }(e) ? Xl(e) : Object.prototype.toString.call(e)
            } catch {
                return "<unknown>"
            }
        }
        function Wy(e) {
            if ("object" == typeof e && null !== e) {
                const t = {};
                for (const n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t
            }
            return {}
        }
        function fA(e, t=40) {
            const n = Object.keys(Gy(e));
            if (n.sort(),
            !n.length)
                return "[object has no keys]";
            if (n[0].length >= t)
                return jy(n[0], t);
            for (let r = n.length; r > 0; r--) {
                const i = n.slice(0, r).join(", ");
                if (!(i.length > t))
                    return r === n.length ? i : jy(i, t)
            }
            return ""
        }
        const xe = (0,
        Zn.Rf)()
          , Do = {}
          , zy = {};
        function Xn(e, t) {
            Do[e] = Do[e] || [],
            Do[e].push(t),
            function pA(e) {
                if (!zy[e])
                    switch (zy[e] = !0,
                    e) {
                    case "console":
                        !function hA() {
                            "console"in xe && ya.forEach(function(e) {
                                e in xe.console && _t(xe.console, e, function(t) {
                                    return function(...n) {
                                        sn("console", {
                                            args: n,
                                            level: e
                                        }),
                                        t && t.apply(xe.console, n)
                                    }
                                })
                            })
                        }();
                        break;
                    case "dom":
                        !function bA() {
                            if (!("document"in xe))
                                return;
                            const e = sn.bind(null, "dom")
                              , t = Ky(e, !0);
                            xe.document.addEventListener("click", t, !1),
                            xe.document.addEventListener("keypress", t, !1),
                            ["EventTarget", "Node"].forEach(n => {
                                const r = xe[n] && xe[n].prototype;
                                !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (_t(r, "addEventListener", function(i) {
                                    return function(o, s, a) {
                                        if ("click" === o || "keypress" == o)
                                            try {
                                                const c = this
                                                  , u = c.__sentry_instrumentation_handlers__ = c.__sentry_instrumentation_handlers__ || {}
                                                  , l = u[o] = u[o] || {
                                                    refCount: 0
                                                };
                                                if (!l.handler) {
                                                    const d = Ky(e);
                                                    l.handler = d,
                                                    i.call(this, o, d, a)
                                                }
                                                l.refCount++
                                            } catch {}
                                        return i.call(this, o, s, a)
                                    }
                                }),
                                _t(r, "removeEventListener", function(i) {
                                    return function(o, s, a) {
                                        if ("click" === o || "keypress" == o)
                                            try {
                                                const c = this
                                                  , u = c.__sentry_instrumentation_handlers__ || {}
                                                  , l = u[o];
                                                l && (l.refCount--,
                                                l.refCount <= 0 && (i.call(this, o, l.handler, a),
                                                l.handler = void 0,
                                                delete u[o]),
                                                0 === Object.keys(u).length && delete c.__sentry_instrumentation_handlers__)
                                            } catch {}
                                        return i.call(this, o, s, a)
                                    }
                                }))
                            }
                            )
                        }();
                        break;
                    case "xhr":
                        !function yA() {
                            if (!("XMLHttpRequest"in xe))
                                return;
                            const e = XMLHttpRequest.prototype;
                            _t(e, "open", function(t) {
                                return function(...n) {
                                    const r = n[1]
                                      , i = this.__sentry_xhr__ = {
                                        method: Eo(n[0]) ? n[0].toUpperCase() : n[0],
                                        url: n[1]
                                    };
                                    Eo(r) && "POST" === i.method && r.match(/sentry_key/) && (this.__sentry_own_request__ = !0);
                                    const o = () => {
                                        const s = this.__sentry_xhr__;
                                        if (s && 4 === this.readyState) {
                                            try {
                                                s.status_code = this.status
                                            } catch {}
                                            sn("xhr", {
                                                args: n,
                                                endTimestamp: Date.now(),
                                                startTimestamp: Date.now(),
                                                xhr: this
                                            })
                                        }
                                    }
                                    ;
                                    return "onreadystatechange"in this && "function" == typeof this.onreadystatechange ? _t(this, "onreadystatechange", function(s) {
                                        return function(...a) {
                                            return o(),
                                            s.apply(this, a)
                                        }
                                    }) : this.addEventListener("readystatechange", o),
                                    t.apply(this, n)
                                }
                            }),
                            _t(e, "send", function(t) {
                                return function(...n) {
                                    return this.__sentry_xhr__ && void 0 !== n[0] && (this.__sentry_xhr__.body = n[0]),
                                    sn("xhr", {
                                        args: n,
                                        startTimestamp: Date.now(),
                                        xhr: this
                                    }),
                                    t.apply(this, n)
                                }
                            })
                        }();
                        break;
                    case "fetch":
                        !function gA() {
                            (function eA() {
                                if (!Zl())
                                    return !1;
                                if (Ql(Qn.fetch))
                                    return !0;
                                let e = !1;
                                const t = Qn.document;
                                if (t && "function" == typeof t.createElement)
                                    try {
                                        const n = t.createElement("iframe");
                                        n.hidden = !0,
                                        t.head.appendChild(n),
                                        n.contentWindow && n.contentWindow.fetch && (e = Ql(n.contentWindow.fetch)),
                                        t.head.removeChild(n)
                                    } catch (n) {
                                        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", n)
                                    }
                                return e
                            }
                            )() && _t(xe, "fetch", function(e) {
                                return function(...t) {
                                    const n = {
                                        args: t,
                                        fetchData: {
                                            method: mA(t),
                                            url: _A(t)
                                        },
                                        startTimestamp: Date.now()
                                    };
                                    return sn("fetch", {
                                        ...n
                                    }),
                                    e.apply(xe, t).then(r => (sn("fetch", {
                                        ...n,
                                        endTimestamp: Date.now(),
                                        response: r
                                    }),
                                    r), r => {
                                        throw sn("fetch", {
                                            ...n,
                                            endTimestamp: Date.now(),
                                            error: r
                                        }),
                                        r
                                    }
                                    )
                                }
                            })
                        }();
                        break;
                    case "history":
                        !function EA() {
                            if (!function tA() {
                                const e = Qn.chrome;
                                return !(e && e.app && e.app.runtime || !("history"in Qn) || !Qn.history.pushState || !Qn.history.replaceState)
                            }())
                                return;
                            const e = xe.onpopstate;
                            function t(n) {
                                return function(...r) {
                                    const i = r.length > 2 ? r[2] : void 0;
                                    if (i) {
                                        const o = Da
                                          , s = String(i);
                                        Da = s,
                                        sn("history", {
                                            from: o,
                                            to: s
                                        })
                                    }
                                    return n.apply(this, r)
                                }
                            }
                            xe.onpopstate = function(...n) {
                                const r = xe.location.href
                                  , i = Da;
                                if (Da = r,
                                sn("history", {
                                    from: i,
                                    to: r
                                }),
                                e)
                                    try {
                                        return e.apply(this, n)
                                    } catch {}
                            }
                            ,
                            _t(xe.history, "pushState", t),
                            _t(xe.history, "replaceState", t)
                        }();
                        break;
                    case "error":
                        !function wA() {
                            td = xe.onerror,
                            xe.onerror = function(e, t, n, r, i) {
                                return sn("error", {
                                    column: r,
                                    error: i,
                                    line: n,
                                    msg: e,
                                    url: t
                                }),
                                !!td && td.apply(this, arguments)
                            }
                        }();
                        break;
                    case "unhandledrejection":
                        !function TA() {
                            nd = xe.onunhandledrejection,
                            xe.onunhandledrejection = function(e) {
                                return sn("unhandledrejection", e),
                                !nd || nd.apply(this, arguments)
                            }
                        }();
                        break;
                    default:
                        return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.warn("unknown instrumentation type:", e))
                    }
            }(e)
        }
        function sn(e, t) {
            if (e && Do[e])
                for (const n of Do[e] || [])
                    try {
                        n(t)
                    } catch (r) {
                        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${qn(n)}\nError:`, r)
                    }
        }
        function mA(e=[]) {
            return "Request"in xe && Jn(e[0], Request) && e[0].method ? String(e[0].method).toUpperCase() : e[1] && e[1].method ? String(e[1].method).toUpperCase() : "GET"
        }
        function _A(e=[]) {
            return "string" == typeof e[0] ? e[0] : "Request"in xe && Jn(e[0], Request) ? e[0].url : String(e[0])
        }
        let Da;
        const DA = 1e3;
        let va, Sa;
        function Ky(e, t=!1) {
            return n => {
                if (!n || Sa === n || function SA(e) {
                    if ("keypress" !== e.type)
                        return !1;
                    try {
                        const t = e.target;
                        if (!t || !t.tagName)
                            return !0;
                        if ("INPUT" === t.tagName || "TEXTAREA" === t.tagName || t.isContentEditable)
                            return !1
                    } catch {}
                    return !0
                }(n))
                    return;
                const r = "keypress" === n.type ? "input" : n.type;
                (void 0 === va || function vA(e, t) {
                    if (!e || e.type !== t.type)
                        return !0;
                    try {
                        if (e.target !== t.target)
                            return !0
                    } catch {}
                    return !1
                }(Sa, n)) && (e({
                    event: n,
                    name: r,
                    global: t
                }),
                Sa = n),
                clearTimeout(va),
                va = xe.setTimeout( () => {
                    va = void 0
                }
                , DA)
            }
        }
        let td = null
          , nd = null;
        class yt extends Error {
            constructor(t, n="warn") {
                super(t),
                this.message = t,
                this.name = new.target.prototype.constructor.name,
                Object.setPrototypeOf(this, new.target.prototype),
                this.logLevel = n
            }
        }
        const IA = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
        function qy(e, t=!1) {
            const {host: n, path: r, pass: i, port: o, projectId: s, protocol: a, publicKey: c} = e;
            return `${a}://${c}${t && i ? `:${i}` : ""}@${n}${o ? `:${o}` : ""}/${r && `${r}/`}${s}`
        }
        function Zy(e) {
            return {
                protocol: e.protocol,
                publicKey: e.publicKey || "",
                pass: e.pass || "",
                host: e.host,
                port: e.port || "",
                path: e.path || "",
                projectId: e.projectId
            }
        }
        var Sn = E(69)
          , OA = E(378);
        function er(e, t=1 / 0, n=1 / 0) {
            try {
                return rd("", e, t, n)
            } catch (r) {
                return {
                    ERROR: `**non-serializable** (${r})`
                }
            }
        }
        function rd(e, t, n=1 / 0, r=1 / 0, i=function AA() {
            const e = "function" == typeof WeakSet
              , t = e ? new WeakSet : [];
            return [function n(i) {
                if (e)
                    return !!t.has(i) || (t.add(i),
                    !1);
                for (let o = 0; o < t.length; o++)
                    if (t[o] === i)
                        return !0;
                return t.push(i),
                !1
            }
            , function r(i) {
                if (e)
                    t.delete(i);
                else
                    for (let o = 0; o < t.length; o++)
                        if (t[o] === i) {
                            t.splice(o, 1);
                            break
                        }
            }
            ]
        }()) {
            const [o,s] = i;
            if (null === t || ["number", "boolean", "string"].includes(typeof t) && !(0,
            Bn.i2)(t))
                return t;
            const a = function xA(e, t) {
                try {
                    return "domain" === e && t && "object" == typeof t && t._events ? "[Domain]" : "domainEmitter" === e ? "[DomainEmitter]" : typeof global < "u" && t === global ? "[Global]" : typeof window < "u" && t === window ? "[Window]" : typeof document < "u" && t === document ? "[Document]" : (0,
                    Bn.Cy)(t) ? "[SyntheticEvent]" : "number" == typeof t && t != t ? "[NaN]" : void 0 === t ? "[undefined]" : "function" == typeof t ? `[Function: ${(0,
                    OA.$P)(t)}]` : "symbol" == typeof t ? `[${String(t)}]` : "bigint" == typeof t ? `[BigInt: ${String(t)}]` : `[object ${function kA(e) {
                        const t = Object.getPrototypeOf(e);
                        return t ? t.constructor.name : "null prototype"
                    }(t)}]`
                } catch (n) {
                    return `**non-serializable** (${n})`
                }
            }(e, t);
            if (!a.startsWith("[object "))
                return a;
            if (t.__sentry_skip_normalization__)
                return t;
            let c = n;
            if ("number" == typeof t.__sentry_override_normalization_depth__ && (c = t.__sentry_override_normalization_depth__),
            0 === c)
                return a.replace("object ", "");
            if (o(t))
                return "[Circular ~]";
            const u = t;
            if (u && "function" == typeof u.toJSON)
                try {
                    return rd("", u.toJSON(), c - 1, r, i)
                } catch {}
            const l = Array.isArray(t) ? [] : {};
            let d = 0;
            const f = (0,
            _o.Sh)(t);
            for (const p in f)
                if (Object.prototype.hasOwnProperty.call(f, p)) {
                    if (d >= r) {
                        l[p] = "[MaxProperties ~]";
                        break
                    }
                    l[p] = rd(p, f[p], c - 1, r, i),
                    d++
                }
            return s(t),
            l
        }
        function id(e, t=[]) {
            return [e, t]
        }
        function BA(e, t) {
            const [n,r] = e;
            return [n, [...r, t]]
        }
        function od(e, t) {
            const n = e[1];
            for (const r of n)
                if (t(r, r[0].type))
                    return !0;
            return !1
        }
        function sd(e, t) {
            return (t || new TextEncoder).encode(e)
        }
        function jA(e, t) {
            const [n,r] = e;
            let i = JSON.stringify(n);
            function o(s) {
                "string" == typeof i ? i = "string" == typeof s ? i + s : [sd(i, t), s] : i.push("string" == typeof s ? sd(s, t) : s)
            }
            for (const s of r) {
                const [a,c] = s;
                if (o(`\n${JSON.stringify(a)}\n`),
                "string" == typeof c || c instanceof Uint8Array)
                    o(c);
                else {
                    let u;
                    try {
                        u = JSON.stringify(c)
                    } catch {
                        u = JSON.stringify(er(c))
                    }
                    o(u)
                }
            }
            return "string" == typeof i ? i : function UA(e) {
                const t = e.reduce( (i, o) => i + o.length, 0)
                  , n = new Uint8Array(t);
                let r = 0;
                for (const i of e)
                    n.set(i, r),
                    r += i.length;
                return n
            }(i)
        }
        function $A(e, t) {
            const n = "string" == typeof e.data ? sd(e.data, t) : e.data;
            return [(0,
            _o.Jr)({
                type: "attachment",
                length: n.length,
                filename: e.filename,
                content_type: e.contentType,
                attachment_type: e.attachmentType
            }), n]
        }
        const HA = {
            session: "session",
            sessions: "session",
            attachment: "attachment",
            transaction: "transaction",
            event: "error",
            client_report: "internal",
            user_report: "default",
            profile: "profile",
            replay_event: "replay",
            replay_recording: "replay"
        };
        function Qy(e) {
            return HA[e]
        }
        function Jy(e) {
            if (!e || !e.sdk)
                return;
            const {name: t, version: n} = e.sdk;
            return {
                name: t,
                version: n
            }
        }
        const GA = "7";
        var eE = E(998)
          , QA = E(966)
          , JA = E(474)
          , XA = E(291);
        const tE = "Not capturing exception because it's already been captured.";
        class br {
            __init() {
                this._integrations = {}
            }
            __init2() {
                this._integrationsInitialized = !1
            }
            __init3() {
                this._numProcessing = 0
            }
            __init4() {
                this._outcomes = {}
            }
            __init5() {
                this._hooks = {}
            }
            constructor(t) {
                if (br.prototype.__init.call(this),
                br.prototype.__init2.call(this),
                br.prototype.__init3.call(this),
                br.prototype.__init4.call(this),
                br.prototype.__init5.call(this),
                this._options = t,
                t.dsn) {
                    this._dsn = function NA(e) {
                        const t = "string" == typeof e ? function MA(e) {
                            const t = IA.exec(e);
                            if (!t)
                                throw new yt(`Invalid Sentry Dsn: ${e}`);
                            const [n,r,i="",o,s="",a] = t.slice(1);
                            let c = ""
                              , u = a;
                            const l = u.split("/");
                            if (l.length > 1 && (c = l.slice(0, -1).join("/"),
                            u = l.pop()),
                            u) {
                                const d = u.match(/^\d+/);
                                d && (u = d[0])
                            }
                            return Zy({
                                host: o,
                                pass: i,
                                path: c,
                                projectId: u,
                                port: s,
                                protocol: n,
                                publicKey: r
                            })
                        }(e) : Zy(e);
                        return function RA(e) {
                            if (!(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__))
                                return;
                            const {port: t, projectId: n, protocol: r} = e;
                            if (["protocol", "publicKey", "host", "projectId"].forEach(o => {
                                if (!e[o])
                                    throw new yt(`Invalid Sentry Dsn: ${o} missing`)
                            }
                            ),
                            !n.match(/^\d+$/))
                                throw new yt(`Invalid Sentry Dsn: Invalid projectId ${n}`);
                            if (!function CA(e) {
                                return "http" === e || "https" === e
                            }(r))
                                throw new yt(`Invalid Sentry Dsn: Invalid protocol ${r}`);
                            if (t && isNaN(parseInt(t, 10)))
                                throw new yt(`Invalid Sentry Dsn: Invalid port ${t}`)
                        }(t),
                        t
                    }(t.dsn);
                    const n = function zA(e, t={}) {
                        const r = "string" != typeof t && t._metadata ? t._metadata.sdk : void 0;
                        return ("string" == typeof t ? t : t.tunnel) || `${function YA(e) {
                            return `${function Xy(e) {
                                return `${e.protocol ? `${e.protocol}:` : ""}//${e.host}${e.port ? `:${e.port}` : ""}${e.path ? `/${e.path}` : ""}/api/`
                            }(e)}${e.projectId}/envelope/`
                        }(e)}?${function WA(e, t) {
                            return (0,
                            _o._j)({
                                sentry_key: e.publicKey,
                                sentry_version: GA,
                                ...t && {
                                    sentry_client: `${t.name}/${t.version}`
                                }
                            })
                        }(e, r)}`
                    }(this._dsn, t);
                    this._transport = t.transport({
                        recordDroppedEvent: this.recordDroppedEvent.bind(this),
                        ...t.transportOptions,
                        url: n
                    })
                } else
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.warn("No DSN provided, client will not do anything.")
            }
            captureException(t, n, r) {
                if ((0,
                vn.YO)(t))
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.log(tE));
                let i = n && n.event_id;
                return this._process(this.eventFromException(t, n).then(o => this._captureEvent(o, n, r)).then(o => {
                    i = o
                }
                )),
                i
            }
            captureMessage(t, n, r, i) {
                let o = r && r.event_id;
                const s = (0,
                Bn.pt)(t) ? this.eventFromMessage(String(t), n, r) : this.eventFromException(t, r);
                return this._process(s.then(a => this._captureEvent(a, r, i)).then(a => {
                    o = a
                }
                )),
                o
            }
            captureEvent(t, n, r) {
                if (n && n.originalException && (0,
                vn.YO)(n.originalException))
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.log(tE));
                let i = n && n.event_id;
                return this._process(this._captureEvent(t, n, r).then(o => {
                    i = o
                }
                )),
                i
            }
            captureSession(t) {
                this._isEnabled() ? "string" != typeof t.release ? (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.warn("Discarded session because of missing or non-string release") : (this.sendSession(t),
                (0,
                eE.CT)(t, {
                    init: !1
                })) : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.warn("SDK not enabled, will not capture session.")
            }
            getDsn() {
                return this._dsn
            }
            getOptions() {
                return this._options
            }
            getSdkMetadata() {
                return this._options._metadata
            }
            getTransport() {
                return this._transport
            }
            flush(t) {
                const n = this._transport;
                return n ? this._isClientDoneProcessing(t).then(r => n.flush(t).then(i => r && i)) : (0,
                Sn.WD)(!0)
            }
            close(t) {
                return this.flush(t).then(n => (this.getOptions().enabled = !1,
                n))
            }
            setupIntegrations() {
                this._isEnabled() && !this._integrationsInitialized && (this._integrations = function WN(e) {
                    const t = {};
                    return e.forEach(n => {
                        n && Ry(n, t)
                    }
                    ),
                    t
                }(this._options.integrations),
                this._integrationsInitialized = !0)
            }
            getIntegrationById(t) {
                return this._integrations[t]
            }
            getIntegration(t) {
                try {
                    return this._integrations[t.id] || null
                } catch {
                    return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.warn(`Cannot retrieve integration ${t.id} from the current Client`),
                    null
                }
            }
            addIntegration(t) {
                Ry(t, this._integrations)
            }
            sendEvent(t, n={}) {
                if (this._dsn) {
                    let r = function ZA(e, t, n, r) {
                        const i = Jy(n)
                          , o = e.type && "replay_event" !== e.type ? e.type : "event";
                        !function KA(e, t) {
                            t && (e.sdk = e.sdk || {},
                            e.sdk.name = e.sdk.name || t.name,
                            e.sdk.version = e.sdk.version || t.version,
                            e.sdk.integrations = [...e.sdk.integrations || [], ...t.integrations || []],
                            e.sdk.packages = [...e.sdk.packages || [], ...t.packages || []])
                        }(e, n && n.sdk);
                        const s = function VA(e, t, n, r) {
                            const i = e.sdkProcessingMetadata && e.sdkProcessingMetadata.dynamicSamplingContext;
                            return {
                                event_id: e.event_id,
                                sent_at: (new Date).toISOString(),
                                ...t && {
                                    sdk: t
                                },
                                ...!!n && {
                                    dsn: qy(r)
                                },
                                ..."transaction" === e.type && i && {
                                    trace: (0,
                                    _o.Jr)({
                                        ...i
                                    })
                                }
                            }
                        }(e, i, r, t);
                        return delete e.sdkProcessingMetadata,
                        id(s, [[{
                            type: o
                        }, e]])
                    }(t, this._dsn, this._options._metadata, this._options.tunnel);
                    for (const o of n.attachments || [])
                        r = BA(r, $A(o, this._options.transportOptions && this._options.transportOptions.textEncoder));
                    const i = this._sendEnvelope(r);
                    i && i.then(o => this.emit("afterSendEvent", t, o), null)
                }
            }
            sendSession(t) {
                if (this._dsn) {
                    const n = function qA(e, t, n, r) {
                        const i = Jy(n);
                        return id({
                            sent_at: (new Date).toISOString(),
                            ...i && {
                                sdk: i
                            },
                            ...!!r && {
                                dsn: qy(t)
                            }
                        }, ["aggregates"in e ? [{
                            type: "sessions"
                        }, e] : [{
                            type: "session"
                        }, e]])
                    }(t, this._dsn, this._options._metadata, this._options.tunnel);
                    this._sendEnvelope(n)
                }
            }
            recordDroppedEvent(t, n, r) {
                if (this._options.sendClientReports) {
                    const i = `${t}:${n}`;
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.log(`Adding outcome: "${i}"`),
                    this._outcomes[i] = this._outcomes[i] + 1 || 1
                }
            }
            on(t, n) {
                this._hooks[t] || (this._hooks[t] = []),
                this._hooks[t].push(n)
            }
            emit(t, ...n) {
                this._hooks[t] && this._hooks[t].forEach(r => r(...n))
            }
            _updateSessionFromEvent(t, n) {
                let r = !1
                  , i = !1;
                const o = n.exception && n.exception.values;
                if (o) {
                    i = !0;
                    for (const c of o) {
                        const u = c.mechanism;
                        if (u && !1 === u.handled) {
                            r = !0;
                            break
                        }
                    }
                }
                const s = "ok" === t.status;
                (s && 0 === t.errors || s && r) && ((0,
                eE.CT)(t, {
                    ...r && {
                        status: "crashed"
                    },
                    errors: t.errors || Number(i || r)
                }),
                this.captureSession(t))
            }
            _isClientDoneProcessing(t) {
                return new Sn.cW(n => {
                    let r = 0;
                    const o = setInterval( () => {
                        0 == this._numProcessing ? (clearInterval(o),
                        n(!0)) : (r += 1,
                        t && r >= t && (clearInterval(o),
                        n(!1)))
                    }
                    , 1)
                }
                )
            }
            _isEnabled() {
                return !1 !== this.getOptions().enabled && void 0 !== this._dsn
            }
            _prepareEvent(t, n, r) {
                const i = this.getOptions()
                  , o = Object.keys(this._integrations);
                return !n.integrations && o.length > 0 && (n.integrations = o),
                function eO(e, t, n, r) {
                    const {normalizeDepth: i=3, normalizeMaxBreadth: o=1e3} = e
                      , s = {
                        ...t,
                        event_id: t.event_id || n.event_id || (0,
                        vn.DM)(),
                        timestamp: t.timestamp || (0,
                        QA.yW)()
                    }
                      , a = n.integrations || e.integrations.map(l => l.name);
                    (function tO(e, t) {
                        const {environment: n, release: r, dist: i, maxValueLength: o=250} = t;
                        "environment"in e || (e.environment = "environment"in t ? n : XA.J),
                        void 0 === e.release && void 0 !== r && (e.release = r),
                        void 0 === e.dist && void 0 !== i && (e.dist = i),
                        e.message && (e.message = zl(e.message, o));
                        const s = e.exception && e.exception.values && e.exception.values[0];
                        s && s.value && (s.value = zl(s.value, o));
                        const a = e.request;
                        a && a.url && (a.url = zl(a.url, o))
                    }
                    )(s, e),
                    function rO(e, t) {
                        t.length > 0 && (e.sdk = e.sdk || {},
                        e.sdk.integrations = [...e.sdk.integrations || [], ...t])
                    }(s, a),
                    function nO(e, t) {
                        const n = JA.n2._sentryDebugIds;
                        if (!n)
                            return;
                        const r = Object.keys(n).reduce( (s, a) => {
                            const c = t(a);
                            for (const u of c)
                                if (u.abs_path) {
                                    s[u.abs_path] = n[a];
                                    break
                                }
                            return s
                        }
                        , {})
                          , i = new Set;
                        try {
                            e.exception.values.forEach(s => {
                                s.stacktrace.frames.forEach(a => {
                                    a.abs_path && i.add(a.abs_path)
                                }
                                )
                            }
                            )
                        } catch {}
                        e.debug_meta = e.debug_meta || {},
                        e.debug_meta.images = e.debug_meta.images || [];
                        const o = e.debug_meta.images;
                        i.forEach(s => {
                            r[s] && o.push({
                                type: "sourcemap",
                                code_file: s,
                                debug_id: r[s]
                            })
                        }
                        )
                    }(s, e.stackParser);
                    let c = r;
                    n.captureContext && (c = _a.s.clone(c).update(n.captureContext));
                    let u = (0,
                    Sn.WD)(s);
                    if (c) {
                        if (c.getAttachments) {
                            const l = [...n.attachments || [], ...c.getAttachments()];
                            l.length && (n.attachments = l)
                        }
                        u = c.applyToEvent(s, n)
                    }
                    return u.then(l => "number" == typeof i && i > 0 ? function iO(e, t, n) {
                        if (!e)
                            return null;
                        const r = {
                            ...e,
                            ...e.breadcrumbs && {
                                breadcrumbs: e.breadcrumbs.map(i => ({
                                    ...i,
                                    ...i.data && {
                                        data: er(i.data, t, n)
                                    }
                                }))
                            },
                            ...e.user && {
                                user: er(e.user, t, n)
                            },
                            ...e.contexts && {
                                contexts: er(e.contexts, t, n)
                            },
                            ...e.extra && {
                                extra: er(e.extra, t, n)
                            }
                        };
                        return e.contexts && e.contexts.trace && r.contexts && (r.contexts.trace = e.contexts.trace,
                        e.contexts.trace.data && (r.contexts.trace.data = er(e.contexts.trace.data, t, n))),
                        e.spans && (r.spans = e.spans.map(i => (i.data && (i.data = er(i.data, t, n)),
                        i))),
                        r
                    }(l, i, o) : l)
                }(i, t, n, r)
            }
            _captureEvent(t, n={}, r) {
                return this._processEvent(t, n, r).then(i => i.event_id, i => {
                    if (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) {
                        const o = i;
                        "log" === o.logLevel ? ze.kg.log(o.message) : ze.kg.warn(o)
                    }
                }
                )
            }
            _processEvent(t, n, r) {
                const i = this.getOptions()
                  , {sampleRate: o} = i;
                if (!this._isEnabled())
                    return (0,
                    Sn.$2)(new yt("SDK not enabled, will not capture event.","log"));
                const s = rE(t)
                  , a = nE(t)
                  , c = t.type || "error"
                  , u = `before send for type \`${c}\``;
                if (a && "number" == typeof o && Math.random() > o)
                    return this.recordDroppedEvent("sample_rate", "error", t),
                    (0,
                    Sn.$2)(new yt(`Discarding event because it's not included in the random sample (sampling rate = ${o})`,"log"));
                const l = "replay_event" === c ? "replay" : c;
                return this._prepareEvent(t, n, r).then(d => {
                    if (null === d)
                        throw this.recordDroppedEvent("event_processor", l, t),
                        new yt("An event processor returned `null`, will not send event.","log");
                    if (n.data && !0 === n.data.__sentry__)
                        return d;
                    const p = function sO(e, t, n) {
                        const {beforeSend: r, beforeSendTransaction: i} = e;
                        return nE(t) && r ? r(t, n) : rE(t) && i ? i(t, n) : t
                    }(i, d, n);
                    return function oO(e, t) {
                        const n = `${t} must return \`null\` or a valid event.`;
                        if ((0,
                        Bn.J8)(e))
                            return e.then(r => {
                                if (!(0,
                                Bn.PO)(r) && null !== r)
                                    throw new yt(n);
                                return r
                            }
                            , r => {
                                throw new yt(`${t} rejected with ${r}`)
                            }
                            );
                        if (!(0,
                        Bn.PO)(e) && null !== e)
                            throw new yt(n);
                        return e
                    }(p, u)
                }
                ).then(d => {
                    if (null === d)
                        throw this.recordDroppedEvent("before_send", l, t),
                        new yt(`${u} returned \`null\`, will not send event.`,"log");
                    const f = r && r.getSession();
                    !s && f && this._updateSessionFromEvent(f, d);
                    const p = d.transaction_info;
                    if (s && p && d.transaction !== t.transaction) {
                        const g = "custom";
                        d.transaction_info = {
                            ...p,
                            source: g
                        }
                    }
                    return this.sendEvent(d, n),
                    d
                }
                ).then(null, d => {
                    throw d instanceof yt ? d : (this.captureException(d, {
                        data: {
                            __sentry__: !0
                        },
                        originalException: d
                    }),
                    new yt(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${d}`))
                }
                )
            }
            _process(t) {
                this._numProcessing++,
                t.then(n => (this._numProcessing--,
                n), n => (this._numProcessing--,
                n))
            }
            _sendEnvelope(t) {
                if (this._transport && this._dsn)
                    return this.emit("beforeEnvelope", t),
                    this._transport.send(t).then(null, n => {
                        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.error("Error while sending event:", n)
                    }
                    );
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.error("Transport disabled")
            }
            _clearOutcomes() {
                const t = this._outcomes;
                return this._outcomes = {},
                Object.keys(t).map(n => {
                    const [r,i] = n.split(":");
                    return {
                        reason: r,
                        category: i,
                        quantity: t[n]
                    }
                }
                )
            }
        }
        function nE(e) {
            return void 0 === e.type
        }
        function rE(e) {
            return "transaction" === e.type
        }
        var jn, e, aO = E(436), fO = E(613);
        function DO(e, t=1 / 0, n=1 / 0) {
            try {
                return cd("", e, t, n)
            } catch (r) {
                return {
                    ERROR: `**non-serializable** (${r})`
                }
            }
        }
        function oE(e, t=3, n=102400) {
            const r = DO(e, t);
            return function wO(e) {
                return function bO(e) {
                    return ~-encodeURI(e).split(/%..|./).length
                }(JSON.stringify(e))
            }(r) > n ? oE(e, t - 1, n) : r
        }
        function cd(e, t, n=1 / 0, r=1 / 0, i=function EO() {
            const e = "function" == typeof WeakSet
              , t = e ? new WeakSet : [];
            return [function n(i) {
                if (e)
                    return !!t.has(i) || (t.add(i),
                    !1);
                for (let o = 0; o < t.length; o++)
                    if (t[o] === i)
                        return !0;
                return t.push(i),
                !1
            }
            , function r(i) {
                if (e)
                    t.delete(i);
                else
                    for (let o = 0; o < t.length; o++)
                        if (t[o] === i) {
                            t.splice(o, 1);
                            break
                        }
            }
            ]
        }()) {
            const [o,s] = i;
            if (null === t || ["number", "boolean", "string"].includes(typeof t) && !function aA(e) {
                return "number" == typeof e && e != e
            }(t))
                return t;
            const a = function vO(e, t) {
                try {
                    return "domain" === e && t && "object" == typeof t && t._events ? "[Domain]" : "domainEmitter" === e ? "[DomainEmitter]" : typeof global < "u" && t === global ? "[Global]" : typeof window < "u" && t === window ? "[Window]" : typeof document < "u" && t === document ? "[Document]" : function sA(e) {
                        return By(e) && "nativeEvent"in e && "preventDefault"in e && "stopPropagation"in e
                    }(t) ? "[SyntheticEvent]" : "number" == typeof t && t != t ? "[NaN]" : void 0 === t ? "[undefined]" : "function" == typeof t ? `[Function: ${qn(t)}]` : "symbol" == typeof t ? `[${String(t)}]` : "bigint" == typeof t ? `[BigInt: ${String(t)}]` : `[object ${function SO(e) {
                        const t = Object.getPrototypeOf(e);
                        return t ? t.constructor.name : "null prototype"
                    }(t)}]`
                } catch (n) {
                    return `**non-serializable** (${n})`
                }
            }(e, t);
            if (!a.startsWith("[object "))
                return a;
            if (t.__sentry_skip_normalization__)
                return t;
            let c = n;
            if ("number" == typeof t.__sentry_override_normalization_depth__ && (c = t.__sentry_override_normalization_depth__),
            0 === c)
                return a.replace("object ", "");
            if (o(t))
                return "[Circular ~]";
            const u = t;
            if (u && "function" == typeof u.toJSON)
                try {
                    return cd("", u.toJSON(), c - 1, r, i)
                } catch {}
            const l = Array.isArray(t) ? [] : {};
            let d = 0;
            const f = Gy(t);
            for (const p in f)
                if (Object.prototype.hasOwnProperty.call(f, p)) {
                    if (d >= r) {
                        l[p] = "[MaxProperties ~]";
                        break
                    }
                    l[p] = cd(p, f[p], c - 1, r, i),
                    d++
                }
            return s(t),
            l
        }
        function sE(e) {
            return e.exception && e.exception.values ? e.exception.values[0] : void 0
        }
        function TO(e) {
            const {message: t, event_id: n} = e;
            if (t)
                return t;
            const r = sE(e);
            return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>"
        }
        function ud(e, t, n) {
            const r = e.exception = e.exception || {}
              , i = r.values = r.values || []
              , o = i[0] = i[0] || {};
            o.value || (o.value = t || ""),
            o.type || (o.type = n || "Error")
        }
        function vo(e, t) {
            const n = sE(e);
            if (!n)
                return;
            const i = n.mechanism;
            if (n.mechanism = {
                type: "generic",
                handled: !0,
                ...i,
                ...t
            },
            t && "data"in t) {
                const o = {
                    ...i && i.data,
                    ...t.data
                };
                n.mechanism.data = o
            }
        }
        function aE(e) {
            return new qt(t => {
                t(e)
            }
            )
        }
        (e = jn || (jn = {}))[e.PENDING = 0] = "PENDING",
        e[e.RESOLVED = 1] = "RESOLVED",
        e[e.REJECTED = 2] = "REJECTED";
        class qt {
            __init() {
                this._state = jn.PENDING
            }
            __init2() {
                this._handlers = []
            }
            constructor(t) {
                qt.prototype.__init.call(this),
                qt.prototype.__init2.call(this),
                qt.prototype.__init3.call(this),
                qt.prototype.__init4.call(this),
                qt.prototype.__init5.call(this),
                qt.prototype.__init6.call(this);
                try {
                    t(this._resolve, this._reject)
                } catch (n) {
                    this._reject(n)
                }
            }
            then(t, n) {
                return new qt( (r, i) => {
                    this._handlers.push([!1, o => {
                        if (t)
                            try {
                                r(t(o))
                            } catch (s) {
                                i(s)
                            }
                        else
                            r(o)
                    }
                    , o => {
                        if (n)
                            try {
                                r(n(o))
                            } catch (s) {
                                i(s)
                            }
                        else
                            i(o)
                    }
                    ]),
                    this._executeHandlers()
                }
                )
            }
            catch(t) {
                return this.then(n => n, t)
            }
            finally(t) {
                return new qt( (n, r) => {
                    let i, o;
                    return this.then(s => {
                        o = !1,
                        i = s,
                        t && t()
                    }
                    , s => {
                        o = !0,
                        i = s,
                        t && t()
                    }
                    ).then( () => {
                        o ? r(i) : n(i)
                    }
                    )
                }
                )
            }
            __init3() {
                this._resolve = t => {
                    this._setResult(jn.RESOLVED, t)
                }
            }
            __init4() {
                this._reject = t => {
                    this._setResult(jn.REJECTED, t)
                }
            }
            __init5() {
                this._setResult = (t, n) => {
                    if (this._state === jn.PENDING) {
                        if (function oA(e) {
                            return Boolean(e && e.then && "function" == typeof e.then)
                        }(n))
                            return void n.then(this._resolve, this._reject);
                        this._state = t,
                        this._value = n,
                        this._executeHandlers()
                    }
                }
            }
            __init6() {
                this._executeHandlers = () => {
                    if (this._state === jn.PENDING)
                        return;
                    const t = this._handlers.slice();
                    this._handlers = [],
                    t.forEach(n => {
                        n[0] || (this._state === jn.RESOLVED && n[1](this._value),
                        this._state === jn.REJECTED && n[2](this._value),
                        n[0] = !0)
                    }
                    )
                }
            }
        }
        function cE(e, t) {
            const n = dd(e, t)
              , r = {
                type: t && t.name,
                value: AO(t)
            };
            return n.length && (r.stacktrace = {
                frames: n
            }),
            void 0 === r.type && "" === r.value && (r.value = "Unrecoverable error caught"),
            r
        }
        function ld(e, t) {
            return {
                exception: {
                    values: [cE(e, t)]
                }
            }
        }
        function dd(e, t) {
            const n = t.stacktrace || t.stack || ""
              , r = function NO(e) {
                if (e) {
                    if ("number" == typeof e.framesToPop)
                        return e.framesToPop;
                    if (RO.test(e.message))
                        return 1
                }
                return 0
            }(t);
            try {
                return e(n, r)
            } catch {}
            return []
        }
        const RO = /Minified React error #\d+;/i;
        function AO(e) {
            const t = e && e.message;
            return t ? t.error && "string" == typeof t.error.message ? t.error.message : t : "No error message"
        }
        function fd(e, t, n, r, i) {
            let o;
            if (Fy(t) && t.error)
                return ld(e, t.error);
            if (Ly(t) || function nA(e) {
                return hi(e, "DOMException")
            }(t)) {
                const s = t;
                if ("stack"in t)
                    o = ld(e, t);
                else {
                    const a = s.name || (Ly(s) ? "DOMError" : "DOMException")
                      , c = s.message ? `${a}: ${s.message}` : a;
                    o = pd(e, c, n, r),
                    ud(o, c)
                }
                return "code"in s && (o.tags = {
                    ...o.tags,
                    "DOMException.code": `${s.code}`
                }),
                o
            }
            return ky(t) ? ld(e, t) : By(t) || Jl(t) ? (o = function MO(e, t, n, r) {
                const o = (0,
                He.Gd)().getClient()
                  , s = o && o.getOptions().normalizeDepth
                  , a = {
                    exception: {
                        values: [{
                            type: Jl(t) ? t.constructor.name : r ? "UnhandledRejection" : "Error",
                            value: `Non-Error ${r ? "promise rejection" : "exception"} captured with keys: ${fA(t)}`
                        }]
                    },
                    extra: {
                        __serialized__: oE(t, s)
                    }
                };
                if (n) {
                    const c = dd(e, n);
                    c.length && (a.exception.values[0].stacktrace = {
                        frames: c
                    })
                }
                return a
            }(e, t, n, i),
            vo(o, {
                synthetic: !0
            }),
            o) : (o = pd(e, t, n, r),
            ud(o, `${t}`, void 0),
            vo(o, {
                synthetic: !0
            }),
            o)
        }
        function pd(e, t, n, r) {
            const i = {
                message: t
            };
            if (r && n) {
                const o = dd(e, n);
                o.length && (i.exception = {
                    values: [{
                        value: t,
                        stacktrace: {
                            frames: o
                        }
                    }]
                })
            }
            return i
        }
        function uE(e, t) {
            return (0,
            He.Gd)().captureException(e, {
                captureContext: t
            })
        }
        const we = Zn.n2;
        let hd = 0;
        function lE() {
            return hd > 0
        }
        function gi(e, t={}, n) {
            if ("function" != typeof e)
                return e;
            try {
                const i = e.__sentry_wrapped__;
                if (i)
                    return i;
                if (Vy(e))
                    return e
            } catch {
                return e
            }
            const r = function() {
                const i = Array.prototype.slice.call(arguments);
                try {
                    n && "function" == typeof n && n.apply(this, arguments);
                    const o = i.map(s => gi(s, t));
                    return e.apply(this, o)
                } catch (o) {
                    throw function FO() {
                        hd++,
                        setTimeout( () => {
                            hd--
                        }
                        )
                    }(),
                    function kO(e) {
                        (0,
                        He.Gd)().withScope(e)
                    }(s => {
                        s.addEventProcessor(a => (t.mechanism && (ud(a, void 0, void 0),
                        vo(a, t.mechanism)),
                        a.extra = {
                            ...a.extra,
                            arguments: i
                        },
                        a)),
                        uE(o)
                    }
                    ),
                    o
                }
            };
            try {
                for (const i in e)
                    Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i])
            } catch {}
            Hy(r, e),
            $y(e, "__sentry_wrapped__", r);
            try {
                Object.getOwnPropertyDescriptor(r, "name").configurable && Object.defineProperty(r, "name", {
                    get: () => e.name
                })
            } catch {}
            return r
        }
        const LO = ["fatal", "error", "warning", "log", "info", "debug"];
        function dE(e) {
            return "warn" === e ? "warning" : LO.includes(e) ? e : "log"
        }
        function gd(e) {
            if (!e)
                return {};
            const t = e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
            return t ? {
                host: t[4],
                path: t[5],
                protocol: t[2],
                relative: t[5] + (t[6] || "") + (t[8] || "")
            } : {}
        }
        const ba = 1024
          , fE = "Breadcrumbs";
        class So {
            static __initStatic() {
                this.id = fE
            }
            __init() {
                this.name = So.id
            }
            constructor(t) {
                So.prototype.__init.call(this),
                this.options = {
                    console: !0,
                    dom: !0,
                    fetch: !0,
                    history: !0,
                    sentry: !0,
                    xhr: !0,
                    ...t
                }
            }
            setupOnce() {
                this.options.console && Xn("console", jO),
                this.options.dom && Xn("dom", function BO(e) {
                    return function t(n) {
                        let r, i = "object" == typeof e ? e.serializeAttribute : void 0, o = "object" == typeof e && "number" == typeof e.maxStringLength ? e.maxStringLength : void 0;
                        o && o > ba && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.warn(`\`dom.maxStringLength\` cannot exceed ${ba}, but a value of ${o} was configured. Sentry will use ${ba} instead.`),
                        o = ba),
                        "string" == typeof i && (i = [i]);
                        try {
                            const s = n.event;
                            r = function VO(e) {
                                return e && !!e.target
                            }(s) ? Xl(s.target, {
                                keyAttrs: i,
                                maxStringLength: o
                            }) : Xl(s, {
                                keyAttrs: i,
                                maxStringLength: o
                            })
                        } catch {
                            r = "<unknown>"
                        }
                        0 !== r.length && (0,
                        He.Gd)().addBreadcrumb({
                            category: `ui.${n.name}`,
                            message: r
                        }, {
                            event: n.event,
                            name: n.name,
                            global: n.global
                        })
                    }
                }(this.options.dom)),
                this.options.xhr && Xn("xhr", UO),
                this.options.fetch && Xn("fetch", $O),
                this.options.history && Xn("history", HO)
            }
            addSentryBreadcrumb(t) {
                this.options.sentry && (0,
                He.Gd)().addBreadcrumb({
                    category: "sentry." + ("transaction" === t.type ? "transaction" : "event"),
                    event_id: t.event_id,
                    level: t.level,
                    message: TO(t)
                }, {
                    event: t
                })
            }
        }
        function jO(e) {
            for (let n = 0; n < e.args.length; n++)
                if ("ref=Ref<" === e.args[n]) {
                    e.args[n + 1] = "viewRef";
                    break
                }
            const t = {
                category: "console",
                data: {
                    arguments: e.args,
                    logger: "console"
                },
                level: dE(e.level),
                message: Uy(e.args, " ")
            };
            if ("assert" === e.level) {
                if (!1 !== e.args[0])
                    return;
                t.message = `Assertion failed: ${Uy(e.args.slice(1), " ") || "console.assert"}`,
                t.data.arguments = e.args.slice(1)
            }
            (0,
            He.Gd)().addBreadcrumb(t, {
                input: e.args,
                level: e.level
            })
        }
        function UO(e) {
            const {startTimestamp: t, endTimestamp: n} = e;
            if (!t || !n || !e.xhr.__sentry_xhr__)
                return;
            const {method: r, url: i, status_code: o, body: s} = e.xhr.__sentry_xhr__
              , a = {
                method: r,
                url: i,
                status_code: o
            }
              , c = {
                xhr: e.xhr,
                input: s,
                startTimestamp: t,
                endTimestamp: n
            };
            (0,
            He.Gd)().addBreadcrumb({
                category: "xhr",
                data: a,
                type: "http"
            }, c)
        }
        function $O(e) {
            const {startTimestamp: t, endTimestamp: n} = e;
            if (n && (!e.fetchData.url.match(/sentry_key/) || "POST" !== e.fetchData.method))
                if (e.error) {
                    const r = e.fetchData
                      , i = {
                        data: e.error,
                        input: e.args,
                        startTimestamp: t,
                        endTimestamp: n
                    };
                    (0,
                    He.Gd)().addBreadcrumb({
                        category: "fetch",
                        data: r,
                        level: "error",
                        type: "http"
                    }, i)
                } else {
                    const r = {
                        ...e.fetchData,
                        status_code: e.response && e.response.status
                    }
                      , i = {
                        input: e.args,
                        response: e.response,
                        startTimestamp: t,
                        endTimestamp: n
                    };
                    (0,
                    He.Gd)().addBreadcrumb({
                        category: "fetch",
                        data: r,
                        type: "http"
                    }, i)
                }
        }
        function HO(e) {
            let t = e.from
              , n = e.to;
            const r = gd(we.location.href);
            let i = gd(t);
            const o = gd(n);
            i.path || (i = r),
            r.protocol === o.protocol && r.host === o.host && (n = o.relative),
            r.protocol === i.protocol && r.host === i.host && (t = i.relative),
            (0,
            He.Gd)().addBreadcrumb({
                category: "navigation",
                data: {
                    from: t,
                    to: n
                }
            })
        }
        So.__initStatic();
        class GO extends br {
            constructor(t) {
                const n = we.SENTRY_SDK_SOURCE || (0,
                aO.S)();
                t._metadata = t._metadata || {},
                t._metadata.sdk = t._metadata.sdk || {
                    name: "sentry.javascript.browser",
                    packages: [{
                        name: `${n}:@sentry/browser`,
                        version: ga
                    }],
                    version: ga
                },
                super(t),
                t.sendClientReports && we.document && we.document.addEventListener("visibilitychange", () => {
                    "hidden" === we.document.visibilityState && this._flushOutcomes()
                }
                )
            }
            eventFromException(t, n) {
                return function OO(e, t, n, r) {
                    const o = fd(e, t, n && n.syntheticException || void 0, r);
                    return vo(o),
                    o.level = "error",
                    n && n.event_id && (o.event_id = n.event_id),
                    aE(o)
                }(this._options.stackParser, t, n, this._options.attachStacktrace)
            }
            eventFromMessage(t, n="info", r) {
                return function PO(e, t, n="info", r, i) {
                    const s = pd(e, t, r && r.syntheticException || void 0, i);
                    return s.level = n,
                    r && r.event_id && (s.event_id = r.event_id),
                    aE(s)
                }(this._options.stackParser, t, n, r, this._options.attachStacktrace)
            }
            sendEvent(t, n) {
                const r = this.getIntegrationById(fE);
                r && r.addSentryBreadcrumb && r.addSentryBreadcrumb(t),
                super.sendEvent(t, n)
            }
            _prepareEvent(t, n, r) {
                return t.platform = t.platform || "javascript",
                super._prepareEvent(t, n, r)
            }
            _flushOutcomes() {
                const t = this._clearOutcomes();
                if (0 === t.length)
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.log("No outcomes to send"));
                if (!this._dsn)
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.log("No dsn provided, will not send outcomes"));
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.log("Sending outcomes:", t);
                const n = function pO(e, t, n) {
                    return function cO(e, t=[]) {
                        return [e, t]
                    }(t ? {
                        dsn: t
                    } : {}, [[{
                        type: "client_report"
                    }, {
                        timestamp: n || (0,
                        fO.yW)(),
                        discarded_events: e
                    }]])
                }(t, this._options.tunnel && function mO(e, t=!1) {
                    const {host: n, path: r, pass: i, port: o, projectId: s, protocol: a, publicKey: c} = e;
                    return `${a}://${c}${t && i ? `:${i}` : ""}@${n}${o ? `:${o}` : ""}/${r && `${r}/`}${s}`
                }(this._dsn));
                this._sendEnvelope(n)
            }
        }
        class tr {
            static __initStatic() {
                this.id = "GlobalHandlers"
            }
            __init() {
                this.name = tr.id
            }
            __init2() {
                this._installFunc = {
                    onerror: YO,
                    onunhandledrejection: WO
                }
            }
            constructor(t) {
                tr.prototype.__init.call(this),
                tr.prototype.__init2.call(this),
                this._options = {
                    onerror: !0,
                    onunhandledrejection: !0,
                    ...t
                }
            }
            setupOnce() {
                Error.stackTraceLimit = 50;
                const t = this._options;
                for (const n in t) {
                    const r = this._installFunc[n];
                    r && t[n] && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.log(`Global Handler attached: ${n}`),
                    r(),
                    this._installFunc[n] = void 0)
                }
            }
        }
        function YO() {
            Xn("error", e => {
                const [t,n,r] = gE();
                if (!t.getIntegration(tr))
                    return;
                const {msg: i, url: o, line: s, column: a, error: c} = e;
                if (lE() || c && c.__sentry_own_request__)
                    return;
                const u = void 0 === c && Eo(i) ? function KO(e, t, n, r) {
                    let o = Fy(e) ? e.message : e
                      , s = "Error";
                    const a = o.match(/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i);
                    return a && (s = a[1],
                    o = a[2]),
                    pE({
                        exception: {
                            values: [{
                                type: s,
                                value: o
                            }]
                        }
                    }, t, n, r)
                }(i, o, s, a) : pE(fd(n, c || i, void 0, r, !1), o, s, a);
                u.level = "error",
                hE(t, c, u, "onerror")
            }
            )
        }
        function WO() {
            Xn("unhandledrejection", e => {
                const [t,n,r] = gE();
                if (!t.getIntegration(tr))
                    return;
                let i = e;
                try {
                    "reason"in e ? i = e.reason : "detail"in e && "reason"in e.detail && (i = e.detail.reason)
                } catch {}
                if (lE() || i && i.__sentry_own_request__)
                    return !0;
                const o = function rA(e) {
                    return null === e || "object" != typeof e && "function" != typeof e
                }(i) ? function zO(e) {
                    return {
                        exception: {
                            values: [{
                                type: "UnhandledRejection",
                                value: `Non-Error promise rejection captured with value: ${String(e)}`
                            }]
                        }
                    }
                }(i) : fd(n, i, void 0, r, !0);
                o.level = "error",
                hE(t, i, o, "onunhandledrejection")
            }
            )
        }
        function pE(e, t, n, r) {
            const i = e.exception = e.exception || {}
              , o = i.values = i.values || []
              , s = o[0] = o[0] || {}
              , a = s.stacktrace = s.stacktrace || {}
              , c = a.frames = a.frames || []
              , u = isNaN(parseInt(r, 10)) ? void 0 : r
              , l = isNaN(parseInt(n, 10)) ? void 0 : n
              , d = Eo(t) && t.length > 0 ? t : function lA() {
                try {
                    return Ea.document.location.href
                } catch {
                    return ""
                }
            }();
            return 0 === c.length && c.push({
                colno: u,
                filename: d,
                function: "?",
                in_app: !0,
                lineno: l
            }),
            e
        }
        function hE(e, t, n, r) {
            vo(n, {
                handled: !1,
                type: r
            }),
            e.captureEvent(n, {
                originalException: t
            })
        }
        function gE() {
            const e = (0,
            He.Gd)()
              , t = e.getClient()
              , n = t && t.getOptions() || {
                stackParser: () => [],
                attachStacktrace: !1
            };
            return [e, n.stackParser, n.attachStacktrace]
        }
        tr.__initStatic();
        const ZO = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"];
        class bo {
            static __initStatic() {
                this.id = "TryCatch"
            }
            __init() {
                this.name = bo.id
            }
            constructor(t) {
                bo.prototype.__init.call(this),
                this._options = {
                    XMLHttpRequest: !0,
                    eventTarget: !0,
                    requestAnimationFrame: !0,
                    setInterval: !0,
                    setTimeout: !0,
                    ...t
                }
            }
            setupOnce() {
                this._options.setTimeout && _t(we, "setTimeout", mE),
                this._options.setInterval && _t(we, "setInterval", mE),
                this._options.requestAnimationFrame && _t(we, "requestAnimationFrame", QO),
                this._options.XMLHttpRequest && "XMLHttpRequest"in we && _t(XMLHttpRequest.prototype, "send", JO);
                const t = this._options.eventTarget;
                t && (Array.isArray(t) ? t : ZO).forEach(XO)
            }
        }
        function mE(e) {
            return function(...t) {
                return t[0] = gi(t[0], {
                    mechanism: {
                        data: {
                            function: qn(e)
                        },
                        handled: !0,
                        type: "instrument"
                    }
                }),
                e.apply(this, t)
            }
        }
        function QO(e) {
            return function(t) {
                return e.apply(this, [gi(t, {
                    mechanism: {
                        data: {
                            function: "requestAnimationFrame",
                            handler: qn(e)
                        },
                        handled: !0,
                        type: "instrument"
                    }
                })])
            }
        }
        function JO(e) {
            return function(...t) {
                const n = this;
                return ["onload", "onerror", "onprogress", "onreadystatechange"].forEach(i => {
                    i in n && "function" == typeof n[i] && _t(n, i, function(o) {
                        const s = {
                            mechanism: {
                                data: {
                                    function: i,
                                    handler: qn(o)
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        }
                          , a = Vy(o);
                        return a && (s.mechanism.data.handler = qn(a)),
                        gi(o, s)
                    })
                }
                ),
                e.apply(this, t)
            }
        }
        function XO(e) {
            const n = we[e] && we[e].prototype;
            !n || !n.hasOwnProperty || !n.hasOwnProperty("addEventListener") || (_t(n, "addEventListener", function(r) {
                return function(i, o, s) {
                    try {
                        "function" == typeof o.handleEvent && (o.handleEvent = gi(o.handleEvent, {
                            mechanism: {
                                data: {
                                    function: "handleEvent",
                                    handler: qn(o),
                                    target: e
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        }))
                    } catch {}
                    return r.apply(this, [i, gi(o, {
                        mechanism: {
                            data: {
                                function: "addEventListener",
                                handler: qn(o),
                                target: e
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }), s])
                }
            }),
            _t(n, "removeEventListener", function(r) {
                return function(i, o, s) {
                    const a = o;
                    try {
                        const c = a && a.__sentry_wrapped__;
                        c && r.call(this, i, c, s)
                    } catch {}
                    return r.call(this, i, a, s)
                }
            }))
        }
        bo.__initStatic();
        class mi {
            static __initStatic() {
                this.id = "LinkedErrors"
            }
            __init() {
                this.name = mi.id
            }
            constructor(t={}) {
                mi.prototype.__init.call(this),
                this._key = t.key || "cause",
                this._limit = t.limit || 5
            }
            setupOnce() {
                const t = (0,
                He.Gd)().getClient();
                t && (0,
                _a.c)( (n, r) => {
                    const i = (0,
                    He.Gd)().getIntegration(mi);
                    return i ? function nP(e, t, n, r, i) {
                        if (!(r.exception && r.exception.values && i && Jn(i.originalException, Error)))
                            return r;
                        const o = _E(e, n, i.originalException, t);
                        return r.exception.values = [...o, ...r.exception.values],
                        r
                    }(t.getOptions().stackParser, i._key, i._limit, n, r) : n
                }
                )
            }
        }
        function _E(e, t, n, r, i=[]) {
            if (!Jn(n[r], Error) || i.length + 1 >= t)
                return i;
            const o = cE(e, n[r]);
            return _E(e, t, n[r], r, [o, ...i])
        }
        mi.__initStatic();
        class _i {
            constructor() {
                _i.prototype.__init.call(this)
            }
            static __initStatic() {
                this.id = "HttpContext"
            }
            __init() {
                this.name = _i.id
            }
            setupOnce() {
                (0,
                _a.c)(t => {
                    if ((0,
                    He.Gd)().getIntegration(_i)) {
                        if (!we.navigator && !we.location && !we.document)
                            return t;
                        const n = t.request && t.request.url || we.location && we.location.href
                          , {referrer: r} = we.document || {}
                          , {userAgent: i} = we.navigator || {}
                          , o = {
                            ...t.request && t.request.headers,
                            ...r && {
                                Referer: r
                            },
                            ...i && {
                                "User-Agent": i
                            }
                        }
                          , s = {
                            ...t.request,
                            ...n && {
                                url: n
                            },
                            headers: o
                        };
                        return {
                            ...t,
                            request: s
                        }
                    }
                    return t
                }
                )
            }
        }
        _i.__initStatic();
        class yi {
            constructor() {
                yi.prototype.__init.call(this)
            }
            static __initStatic() {
                this.id = "Dedupe"
            }
            __init() {
                this.name = yi.id
            }
            setupOnce(t, n) {
                const r = i => {
                    if (i.type)
                        return i;
                    const o = n().getIntegration(yi);
                    if (o) {
                        try {
                            if (function rP(e, t) {
                                return !(!t || !function iP(e, t) {
                                    const n = e.message
                                      , r = t.message;
                                    return !(!n && !r || n && !r || !n && r || n !== r || !EE(e, t) || !yE(e, t))
                                }(e, t) && !function oP(e, t) {
                                    const n = DE(t)
                                      , r = DE(e);
                                    return !!(n && r && n.type === r.type && n.value === r.value && EE(e, t) && yE(e, t))
                                }(e, t))
                            }(i, o._previousEvent))
                                return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.warn("Event dropped due to being a duplicate of previously captured event."),
                                null
                        } catch {
                            return o._previousEvent = i
                        }
                        return o._previousEvent = i
                    }
                    return i
                }
                ;
                r.id = this.name,
                t(r)
            }
        }
        function yE(e, t) {
            let n = vE(e)
              , r = vE(t);
            if (!n && !r)
                return !0;
            if (n && !r || !n && r || r.length !== n.length)
                return !1;
            for (let i = 0; i < r.length; i++) {
                const o = r[i]
                  , s = n[i];
                if (o.filename !== s.filename || o.lineno !== s.lineno || o.colno !== s.colno || o.function !== s.function)
                    return !1
            }
            return !0
        }
        function EE(e, t) {
            let n = e.fingerprint
              , r = t.fingerprint;
            if (!n && !r)
                return !0;
            if (n && !r || !n && r)
                return !1;
            try {
                return n.join("") === r.join("")
            } catch {
                return !1
            }
        }
        function DE(e) {
            return e.exception && e.exception.values && e.exception.values[0]
        }
        function vE(e) {
            const t = e.exception;
            if (t)
                try {
                    return t.values[0].stacktrace.frames
                } catch {
                    return
                }
        }
        function wo(e, t, n, r) {
            const i = {
                filename: e,
                abs_path: e,
                function: t,
                in_app: !0
            };
            return void 0 !== n && (i.lineno = n),
            void 0 !== r && (i.colno = r),
            i
        }
        yi.__initStatic();
        const dP = /^\s*at (?:(.*\).*?|.*?) ?\((?:address at )?)?(?:async )?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i
          , fP = /\((\S*)(?::(\d+))(?::(\d+))\)/
          , hP = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|safari-extension|safari-web-extension|capacitor)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i
          , gP = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i
          , _P = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i
          , vP = Oy([30, e => {
            const t = dP.exec(e);
            if (t) {
                if (t[2] && 0 === t[2].indexOf("eval")) {
                    const o = fP.exec(t[2]);
                    o && (t[2] = o[1],
                    t[3] = o[2],
                    t[4] = o[3])
                }
                const [r,i] = SE(t[1] || "?", t[2]);
                return wo(i, r, t[3] ? +t[3] : void 0, t[4] ? +t[4] : void 0)
            }
        }
        ], [50, e => {
            const t = hP.exec(e);
            if (t) {
                if (t[3] && t[3].indexOf(" > eval") > -1) {
                    const o = gP.exec(t[3]);
                    o && (t[1] = t[1] || "eval",
                    t[3] = o[1],
                    t[4] = o[2],
                    t[5] = "")
                }
                let r = t[3]
                  , i = t[1] || "?";
                return [i,r] = SE(i, r),
                wo(r, i, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
            }
        }
        ], [40, e => {
            const t = _P.exec(e);
            return t ? wo(t[2], t[1] || "?", +t[3], t[4] ? +t[4] : void 0) : void 0
        }
        ])
          , SE = (e, t) => {
            const n = -1 !== e.indexOf("safari-extension")
              , r = -1 !== e.indexOf("safari-web-extension");
            return n || r ? [-1 !== e.indexOf("@") ? e.split("@")[0] : "?", n ? `safari-extension:${t}` : `safari-web-extension:${t}`] : [e, t]
        }
        ;
        const bP = 6e4;
        const MP = 30;
        function bE(e, t, n=function SP(e) {
            const t = [];
            function r(s) {
                return t.splice(t.indexOf(s), 1)[0]
            }
            return {
                $: t,
                add: function i(s) {
                    if (!function n() {
                        return void 0 === e || t.length < e
                    }())
                        return (0,
                        Sn.$2)(new yt("Not adding Promise because buffer limit was reached."));
                    const a = s();
                    return -1 === t.indexOf(a) && t.push(a),
                    a.then( () => r(a)).then(null, () => r(a).then(null, () => {}
                    )),
                    a
                },
                drain: function o(s) {
                    return new Sn.cW( (a, c) => {
                        let u = t.length;
                        if (!u)
                            return a(!0);
                        const l = setTimeout( () => {
                            s && s > 0 && a(!1)
                        }
                        , s);
                        t.forEach(d => {
                            (0,
                            Sn.WD)(d).then( () => {
                                --u || (clearTimeout(l),
                                a(!0))
                            }
                            , c)
                        }
                        )
                    }
                    )
                }
            }
        }(e.bufferSize || MP)) {
            let r = {};
            function o(s) {
                const a = [];
                if (od(s, (d, f) => {
                    const p = Qy(f);
                    if (function IP(e, t, n=Date.now()) {
                        return function TP(e, t) {
                            return e[t] || e.all || 0
                        }(e, t) > n
                    }(r, p)) {
                        const g = wE(d, f);
                        e.recordDroppedEvent("ratelimit_backoff", p, g)
                    } else
                        a.push(d)
                }
                ),
                0 === a.length)
                    return (0,
                    Sn.WD)();
                const c = id(s[0], a)
                  , u = d => {
                    od(c, (f, p) => {
                        const g = wE(f, p);
                        e.recordDroppedEvent(d, Qy(p), g)
                    }
                    )
                }
                ;
                return n.add( () => t({
                    body: jA(c, e.textEncoder)
                }).then(d => (void 0 !== d.statusCode && (d.statusCode < 200 || d.statusCode >= 300) && (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),
                r = function CP(e, {statusCode: t, headers: n}, r=Date.now()) {
                    const i = {
                        ...e
                    }
                      , o = n && n["x-sentry-rate-limits"]
                      , s = n && n["retry-after"];
                    if (o)
                        for (const a of o.trim().split(",")) {
                            const [c,u] = a.split(":", 2)
                              , l = parseInt(c, 10)
                              , d = 1e3 * (isNaN(l) ? 60 : l);
                            if (u)
                                for (const f of u.split(";"))
                                    i[f] = r + d;
                            else
                                i.all = r + d
                        }
                    else
                        s ? i.all = r + function wP(e, t=Date.now()) {
                            const n = parseInt(`${e}`, 10);
                            if (!isNaN(n))
                                return 1e3 * n;
                            const r = Date.parse(`${e}`);
                            return isNaN(r) ? bP : r - t
                        }(s, r) : 429 === t && (i.all = r + 6e4);
                    return i
                }(r, d),
                d), d => {
                    throw u("network_error"),
                    d
                }
                )).then(d => d, d => {
                    if (d instanceof yt)
                        return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ze.kg.error("Skipped sending event because buffer is full."),
                        u("queue_overflow"),
                        (0,
                        Sn.WD)();
                    throw d
                }
                )
            }
            return o.__sentry__baseTransport__ = !0,
            {
                send: o,
                flush: s => n.drain(s)
            }
        }
        function wE(e, t) {
            if ("event" === t || "transaction" === t)
                return Array.isArray(e) ? e[1] : void 0
        }
        let To;
        function AP(e, t=function RP() {
            if (To)
                return To;
            if (Ql(we.fetch))
                return To = we.fetch.bind(we);
            const e = we.document;
            let t = we.fetch;
            if (e && "function" == typeof e.createElement)
                try {
                    const n = e.createElement("iframe");
                    n.hidden = !0,
                    e.head.appendChild(n);
                    const r = n.contentWindow;
                    r && r.fetch && (t = r.fetch),
                    e.head.removeChild(n)
                } catch (n) {
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", n)
                }
            return To = t.bind(we)
        }()) {
            let n = 0
              , r = 0;
            return bE(e, function i(o) {
                const s = o.body.length;
                n += s,
                r++;
                const a = {
                    body: o.body,
                    method: "POST",
                    referrerPolicy: "origin",
                    headers: e.headers,
                    keepalive: n <= 6e4 && r < 15,
                    ...e.fetchOptions
                };
                try {
                    return t(e.url, a).then(c => (n -= s,
                    r--,
                    {
                        statusCode: c.status,
                        headers: {
                            "x-sentry-rate-limits": c.headers.get("X-Sentry-Rate-Limits"),
                            "retry-after": c.headers.get("Retry-After")
                        }
                    }))
                } catch (c) {
                    return function NP() {
                        To = void 0
                    }(),
                    n -= s,
                    r--,
                    function CO(e) {
                        return new qt( (t, n) => {
                            n(e)
                        }
                        )
                    }(c)
                }
            })
        }
        const OP = 4;
        function PP(e) {
            return bE(e, function t(n) {
                return new qt( (r, i) => {
                    const o = new XMLHttpRequest;
                    o.onerror = i,
                    o.onreadystatechange = () => {
                        o.readyState === OP && r({
                            statusCode: o.status,
                            headers: {
                                "x-sentry-rate-limits": o.getResponseHeader("X-Sentry-Rate-Limits"),
                                "retry-after": o.getResponseHeader("Retry-After")
                            }
                        })
                    }
                    ,
                    o.open("POST", e.url);
                    for (const s in e.headers)
                        Object.prototype.hasOwnProperty.call(e.headers, s) && o.setRequestHeader(s, e.headers[s]);
                    o.send(n.body)
                }
                )
            })
        }
        const xP = [new pi, new yo, new bo, new So, new tr, new mi, new yi, new _i];
        function TE(e) {
            e.startSession({
                ignoreDuration: !0
            }),
            e.captureSession()
        }
        function wa(e) {
            return e && e.Math == Math ? e : void 0
        }
        const Io = "object" == typeof globalThis && wa(globalThis) || "object" == typeof window && wa(window) || "object" == typeof self && wa(self) || "object" == typeof global && wa(global) || function() {
            return this
        }() || {}
          , BP = "Sentry Logger "
          , md = ["debug", "info", "warn", "error", "log", "assert", "trace"];
        function IE() {
            let e = !1;
            const t = {
                enable: () => {
                    e = !0
                }
                ,
                disable: () => {
                    e = !1
                }
            };
            return typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? md.forEach(n => {
                t[n] = (...r) => {
                    e && function jP(e) {
                        if (!("console"in Io))
                            return e();
                        const t = Io.console
                          , n = {};
                        md.forEach(r => {
                            const i = t[r] && t[r].__sentry_original__;
                            r in t && i && (n[r] = t[r],
                            t[r] = i)
                        }
                        );
                        try {
                            e()
                        } finally {
                            Object.keys(n).forEach(r => {
                                t[r] = n[r]
                            }
                            )
                        }
                    }( () => {
                        Io.console[n](`${BP}[${n}]:`, ...r)
                    }
                    )
                }
            }
            ) : md.forEach(n => {
                t[n] = () => {}
            }
            ),
            t
        }
        let _d;
        _d = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? function LP(e, t, n) {
            const r = n || Io
              , i = r.__SENTRY__ = r.__SENTRY__ || {};
            return i[e] || (i[e] = t())
        }("logger", IE) : IE();
        const UP = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__;
        let zP, KP, qP;
        function pe(e) {
            let t, n = e[0], r = 1;
            for (; r < e.length; ) {
                const i = e[r]
                  , o = e[r + 1];
                if (r += 2,
                ("optionalAccess" === i || "optionalCall" === i) && null == n)
                    return;
                "access" === i || "optionalAccess" === i ? (t = n,
                n = o(n)) : ("call" === i || "optionalCall" === i) && (n = o( (...s) => n.call(t, ...s)),
                t = void 0)
            }
            return n
        }
        typeof Zone < "u" && Zone;
        var nr = E(104);
        const XP = "Sentry Logger "
          , Ta = ["debug", "info", "warn", "error", "log", "assert", "trace"];
        function ME() {
            let e = !1;
            const t = {
                enable: () => {
                    e = !0
                }
                ,
                disable: () => {
                    e = !1
                }
            };
            return typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? Ta.forEach(n => {
                t[n] = (...r) => {
                    e && function ex(e) {
                        if (!("console"in nr.n2))
                            return e();
                        const t = nr.n2.console
                          , n = {};
                        Ta.forEach(r => {
                            const i = t[r] && t[r].__sentry_original__;
                            r in t && i && (n[r] = t[r],
                            t[r] = i)
                        }
                        );
                        try {
                            e()
                        } finally {
                            Object.keys(n).forEach(r => {
                                t[r] = n[r]
                            }
                            )
                        }
                    }( () => {
                        nr.n2.console[n](`${XP}[${n}]:`, ...r)
                    }
                    )
                }
            }
            ) : Ta.forEach(n => {
                t[n] = () => {}
            }
            ),
            t
        }
        let oe;
        function Ia(e) {
            return e.split(/\\?\//).filter(t => t.length > 0 && "," !== t).length
        }
        oe = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? (0,
        nr.YO)("logger", ME) : ME();
        const AE = Object.prototype.toString;
        function Di(e, t) {
            return AE.call(e) === `[object ${t}]`
        }
        function vi(e) {
            return Di(e, "String")
        }
        function OE(e) {
            return Di(e, "RegExp")
        }
        function Co(e) {
            return Boolean(e && e.then && "function" == typeof e.then)
        }
        function wr(e, t) {
            try {
                return e instanceof t
            } catch {
                return !1
            }
        }
        function Tr(e) {
            const t = pe([e, "call", r => r(), "access", r => r.getClient, "call", r => r(), "optionalAccess", r => r.getOptions, "call", r => r()]);
            return "sentry" !== (pe([t, "optionalAccess", r => r.instrumenter]) || "sentry")
        }
        class Mo {
            static __initStatic() {
                this.id = "Express"
            }
            __init() {
                this.name = Mo.id
            }
            constructor(t={}) {
                Mo.prototype.__init.call(this),
                this._router = t.router || t.app,
                this._methods = (Array.isArray(t.methods) ? t.methods : []).concat("use")
            }
            setupOnce(t, n) {
                this._router ? Tr(n) ? (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("Express Integration is skipped because of instrumenter configuration.") : (function lx(e, t=[]) {
                    t.forEach(n => function ux(e, t) {
                        const n = e[t];
                        return e[t] = function(...r) {
                            return n.call(this, ...function cx(e, t) {
                                return e.map(n => "function" == typeof n ? PE(n, t) : Array.isArray(n) ? n.map(r => "function" == typeof r ? PE(r, t) : r) : n)
                            }(r, t))
                        }
                        ,
                        e
                    }(e, n))
                }(this._router, this._methods),
                function dx(e) {
                    const t = "settings"in e;
                    t && void 0 === e._router && e.lazyrouter && e.lazyrouter();
                    const n = t ? e._router : e;
                    if (!n)
                        return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.debug("Cannot instrument router for URL Parameterization (did not find a valid router)."),
                        void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.debug("Routing instrumentation is currently only supported in Express 4."));
                    const r = Object.getPrototypeOf(n)
                      , i = r.process_params;
                    r.process_params = function(s, a, c, u, l) {
                        c._reconstructedRoute || (c._reconstructedRoute = "");
                        const {layerRoutePath: d, isRegex: f, isArray: p, numExtraSegments: g} = function fx(e) {
                            const t = pe([e, "access", s => s.route, "optionalAccess", s => s.path])
                              , n = OE(t)
                              , r = Array.isArray(t);
                            if (!t)
                                return {
                                    isRegex: n,
                                    isArray: r,
                                    numExtraSegments: 0
                                };
                            const i = r ? Math.max(function px(e) {
                                return e.reduce( (t, n) => t + Ia(n.toString()), 0)
                            }(t) - Ia(e.path || ""), 0) : 0;
                            return {
                                layerRoutePath: hx(r, t),
                                isRegex: n,
                                isArray: r,
                                numExtraSegments: i
                            }
                        }(s);
                        (d || f || p) && (c._hasParameters = !0);
                        const C = (d || s.path || "").split("/").filter(w => w.length > 0 && (f || p || !w.includes("*"))).join("/");
                        if (C && C.length > 0 && (c._reconstructedRoute += `/${C}${f ? "/" : ""}`),
                        Ia(c.originalUrl || "") + g === Ia(c._reconstructedRoute)) {
                            c._hasParameters || c._reconstructedRoute !== c.originalUrl && (c._reconstructedRoute = c.originalUrl);
                            const w = u.__sentry_transaction;
                            w && "custom" !== w.metadata.source && w.setName(...function Ca(e, t={}) {
                                const n = e.method && e.method.toUpperCase();
                                let r = ""
                                  , i = "url";
                                t.customRoute || e.route ? (r = t.customRoute || `${e.baseUrl || ""}${e.route && e.route.path}`,
                                i = "route") : (e.originalUrl || e.url) && (r = function tx(e) {
                                    return e.split(/[\?#]/, 1)[0]
                                }(e.originalUrl || e.url || ""));
                                let o = "";
                                return t.method && n && (o += n),
                                t.method && t.path && (o += " "),
                                t.path && r && (o += r),
                                [o, i]
                            }(c, {
                                path: !0,
                                method: !0,
                                customRoute: c._reconstructedRoute || "/"
                            }))
                        }
                        return i.call(this, s, a, c, u, l)
                    }
                }(this._router)) : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error("ExpressIntegration is missing an Express instance")
            }
        }
        function PE(e, t) {
            const n = e.length;
            switch (n) {
            case 2:
                return function(r, i) {
                    const o = i.__sentry_transaction;
                    if (o) {
                        const s = o.startChild({
                            description: e.name,
                            op: `middleware.express.${t}`
                        });
                        i.once("finish", () => {
                            s.finish()
                        }
                        )
                    }
                    return e.call(this, r, i)
                }
                ;
            case 3:
                return function(r, i, o) {
                    const a = pe([i.__sentry_transaction, "optionalAccess", c => c.startChild, "call", c => c({
                        description: e.name,
                        op: `middleware.express.${t}`
                    })]);
                    e.call(this, r, i, function(...c) {
                        pe([a, "optionalAccess", u => u.finish, "call", u => u()]),
                        o.call(this, ...c)
                    })
                }
                ;
            case 4:
                return function(r, i, o, s) {
                    const c = pe([o.__sentry_transaction, "optionalAccess", u => u.startChild, "call", u => u({
                        description: e.name,
                        op: `middleware.express.${t}`
                    })]);
                    e.call(this, r, i, o, function(...u) {
                        pe([c, "optionalAccess", l => l.finish, "call", l => l()]),
                        s.call(this, ...u)
                    })
                }
                ;
            default:
                throw new Error(`Express middleware takes 2-4 arguments. Got: ${n}`)
            }
        }
        function hx(e, t) {
            return e ? t.map(n => n.toString()).join(",") : t && t.toString()
        }
        Mo.__initStatic();
        var Si = E(911);
        function ut(e, t, n) {
            if (!(t in e))
                return;
            const r = e[t]
              , i = n(r);
            if ("function" == typeof i)
                try {
                    !function mx(e, t) {
                        e.prototype = t.prototype = t.prototype || {},
                        function gx(e, t, n) {
                            Object.defineProperty(e, t, {
                                value: n,
                                writable: !0,
                                configurable: !0
                            })
                        }(e, "__sentry_original__", t)
                    }(i, r)
                } catch {}
            e[t] = i
        }
        class Ro {
            static __initStatic() {
                this.id = "Postgres"
            }
            __init() {
                this.name = Ro.id
            }
            constructor(t={}) {
                Ro.prototype.__init.call(this),
                this._usePgNative = !!t.usePgNative
            }
            setupOnce(t, n) {
                if (Tr(n))
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("Postgres Integration is skipped because of instrumenter configuration."));
                const r = (0,
                Si.$y)("pg");
                if (!r)
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error("Postgres Integration was unable to require `pg` package."));
                if (this._usePgNative && !pe([r, "access", o => o.native, "optionalAccess", o => o.Client]))
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error("Postgres Integration was unable to access 'pg-native' bindings."));
                const {Client: i} = this._usePgNative ? r.native : r;
                ut(i.prototype, "query", function(o) {
                    return function(s, a, c) {
                        const l = pe([n().getScope(), "optionalAccess", p => p.getSpan, "call", p => p()])
                          , d = pe([l, "optionalAccess", p => p.startChild, "call", p => p({
                            description: "string" == typeof s ? s : s.text,
                            op: "db"
                        })]);
                        if ("function" == typeof c)
                            return o.call(this, s, a, function(p, g) {
                                pe([d, "optionalAccess", D => D.finish, "call", D => D()]),
                                c(p, g)
                            });
                        if ("function" == typeof a)
                            return o.call(this, s, function(p, g) {
                                pe([d, "optionalAccess", D => D.finish, "call", D => D()]),
                                a(p, g)
                            });
                        const f = typeof a < "u" ? o.call(this, s, a) : o.call(this, s);
                        return Co(f) ? f.then(p => (pe([d, "optionalAccess", g => g.finish, "call", g => g()]),
                        p)) : (pe([d, "optionalAccess", p => p.finish, "call", p => p()]),
                        f)
                    }
                })
            }
        }
        Ro.__initStatic();
        class No {
            constructor() {
                No.prototype.__init.call(this)
            }
            static __initStatic() {
                this.id = "Mysql"
            }
            __init() {
                this.name = No.id
            }
            setupOnce(t, n) {
                if (Tr(n))
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("Mysql Integration is skipped because of instrumenter configuration."));
                const r = (0,
                Si.$y)("mysql/lib/Connection.js");
                r ? ut(r, "createQuery", function(i) {
                    return function(o, s, a) {
                        const u = pe([n().getScope(), "optionalAccess", d => d.getSpan, "call", d => d()])
                          , l = pe([u, "optionalAccess", d => d.startChild, "call", d => d({
                            description: "string" == typeof o ? o : o.sql,
                            op: "db"
                        })]);
                        return "function" == typeof a ? i.call(this, o, s, function(d, f, p) {
                            pe([l, "optionalAccess", g => g.finish, "call", g => g()]),
                            a(d, f, p)
                        }) : "function" == typeof s ? i.call(this, o, function(d, f, p) {
                            pe([l, "optionalAccess", g => g.finish, "call", g => g()]),
                            s(d, f, p)
                        }) : i.call(this, o, s, a)
                    }
                }) : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error("Mysql Integration was unable to require `mysql` package.")
            }
        }
        No.__initStatic();
        const yx = ["aggregate", "bulkWrite", "countDocuments", "createIndex", "createIndexes", "deleteMany", "deleteOne", "distinct", "drop", "dropIndex", "dropIndexes", "estimatedDocumentCount", "find", "findOne", "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate", "indexes", "indexExists", "indexInformation", "initializeOrderedBulkOp", "insertMany", "insertOne", "isCapped", "mapReduce", "options", "parallelCollectionScan", "rename", "replaceOne", "stats", "updateMany", "updateOne"]
          , Ex = {
            bulkWrite: ["operations"],
            countDocuments: ["query"],
            createIndex: ["fieldOrSpec"],
            createIndexes: ["indexSpecs"],
            deleteMany: ["filter"],
            deleteOne: ["filter"],
            distinct: ["key", "query"],
            dropIndex: ["indexName"],
            find: ["query"],
            findOne: ["query"],
            findOneAndDelete: ["filter"],
            findOneAndReplace: ["filter", "replacement"],
            findOneAndUpdate: ["filter", "update"],
            indexExists: ["indexes"],
            insertMany: ["docs"],
            insertOne: ["doc"],
            mapReduce: ["map", "reduce"],
            rename: ["newName"],
            replaceOne: ["filter", "doc"],
            updateMany: ["filter", "update"],
            updateOne: ["filter", "update"]
        };
        class Ao {
            static __initStatic() {
                this.id = "Mongo"
            }
            __init() {
                this.name = Ao.id
            }
            constructor(t={}) {
                Ao.prototype.__init.call(this),
                this._operations = Array.isArray(t.operations) ? t.operations : yx,
                this._describeOperations = !("describeOperations"in t) || t.describeOperations,
                this._useMongoose = !!t.useMongoose
            }
            setupOnce(t, n) {
                if (Tr(n))
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("Mongo Integration is skipped because of instrumenter configuration."));
                const r = this._useMongoose ? "mongoose" : "mongodb"
                  , i = (0,
                Si.$y)(r);
                i ? this._instrumentOperations(i.Collection, this._operations, n) : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error(`Mongo Integration was unable to require \`${r}\` package.`)
            }
            _instrumentOperations(t, n, r) {
                n.forEach(i => this._patchOperation(t, i, r))
            }
            _patchOperation(t, n, r) {
                if (!(n in t.prototype))
                    return;
                const i = this._getSpanContextFromOperationArguments.bind(this);
                ut(t.prototype, n, function(o) {
                    return function(...s) {
                        const a = s[s.length - 1]
                          , u = pe([r().getScope(), "optionalAccess", d => d.getSpan, "call", d => d()]);
                        if ("function" != typeof a || "mapReduce" === n && 2 === s.length) {
                            const d = pe([u, "optionalAccess", p => p.startChild, "call", p => p(i(this, n, s))])
                              , f = o.call(this, ...s);
                            if (Co(f))
                                return f.then(p => (pe([d, "optionalAccess", g => g.finish, "call", g => g()]),
                                p));
                            if (function Dx(e) {
                                return e && "object" == typeof e && e.once && "function" == typeof e.once
                            }(f)) {
                                const p = f;
                                try {
                                    p.once("close", () => {
                                        pe([d, "optionalAccess", g => g.finish, "call", g => g()])
                                    }
                                    )
                                } catch {
                                    pe([d, "optionalAccess", D => D.finish, "call", D => D()])
                                }
                                return p
                            }
                            return pe([d, "optionalAccess", p => p.finish, "call", p => p()]),
                            f
                        }
                        const l = pe([u, "optionalAccess", d => d.startChild, "call", d => d(i(this, n, s.slice(0, -1)))]);
                        return o.call(this, ...s.slice(0, -1), function(d, f) {
                            pe([l, "optionalAccess", p => p.finish, "call", p => p()]),
                            a(d, f)
                        })
                    }
                })
            }
            _getSpanContextFromOperationArguments(t, n, r) {
                const i = {
                    collectionName: t.collectionName,
                    dbName: t.dbName,
                    namespace: t.namespace
                }
                  , o = {
                    op: "db",
                    description: n,
                    data: i
                }
                  , s = Ex[n]
                  , a = Array.isArray(this._describeOperations) ? this._describeOperations.includes(n) : this._describeOperations;
                if (!s || !a)
                    return o;
                try {
                    if ("mapReduce" === n) {
                        const [c,u] = r;
                        i[s[0]] = "string" == typeof c ? c : c.name || "<anonymous>",
                        i[s[1]] = "string" == typeof u ? u : u.name || "<anonymous>"
                    } else
                        for (let c = 0; c < s.length; c++)
                            i[s[c]] = JSON.stringify(r[c])
                } catch {}
                return o
            }
        }
        Ao.__initStatic();
        class Oo {
            static __initStatic() {
                this.id = "Prisma"
            }
            __init() {
                this.name = Oo.id
            }
            constructor(t={}) {
                Oo.prototype.__init.call(this),
                function vx(e) {
                    return e && !!e.$use
                }(t.client) ? this._client = t.client : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.warn(`Unsupported Prisma client provided to PrismaIntegration. Provided client: ${JSON.stringify(t.client)}`)
            }
            setupOnce(t, n) {
                this._client ? Tr(n) ? (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("Prisma Integration is skipped because of instrumenter configuration.") : this._client.$use( (r, i) => {
                    const s = pe([n().getScope(), "optionalAccess", d => d.getSpan, "call", d => d()])
                      , a = r.action
                      , c = r.model
                      , u = pe([s, "optionalAccess", d => d.startChild, "call", d => d({
                        description: c ? `${c} ${a}` : a,
                        op: "db.sql.prisma"
                    })])
                      , l = i(r);
                    return Co(l) ? l.then(d => (pe([u, "optionalAccess", f => f.finish, "call", f => f()]),
                    d)) : (pe([u, "optionalAccess", d => d.finish, "call", d => d()]),
                    l)
                }
                ) : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error("PrismaIntegration is missing a Prisma Client Instance")
            }
        }
        Oo.__initStatic();
        class Po {
            constructor() {
                Po.prototype.__init.call(this)
            }
            static __initStatic() {
                this.id = "GraphQL"
            }
            __init() {
                this.name = Po.id
            }
            setupOnce(t, n) {
                if (Tr(n))
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("GraphQL Integration is skipped because of instrumenter configuration."));
                const r = (0,
                Si.$y)("graphql/execution/execute.js");
                r ? ut(r, "execute", function(i) {
                    return function(...o) {
                        const s = n().getScope()
                          , a = pe([s, "optionalAccess", l => l.getSpan, "call", l => l()])
                          , c = pe([a, "optionalAccess", l => l.startChild, "call", l => l({
                            description: "execute",
                            op: "graphql.execute"
                        })]);
                        pe([s, "optionalAccess", l => l.setSpan, "call", l => l(c)]);
                        const u = i.call(this, ...o);
                        return Co(u) ? u.then(l => (pe([c, "optionalAccess", d => d.finish, "call", d => d()]),
                        pe([s, "optionalAccess", d => d.setSpan, "call", d => d(a)]),
                        l)) : (pe([c, "optionalAccess", l => l.finish, "call", l => l()]),
                        pe([s, "optionalAccess", l => l.setSpan, "call", l => l(a)]),
                        u)
                    }
                }) : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error("GraphQL Integration was unable to require graphql/execution package.")
            }
        }
        function LE(e) {
            return Array.isArray(e) ? e : [e]
        }
        Po.__initStatic();
        class xo {
            static __initStatic() {
                this.id = "Apollo"
            }
            __init() {
                this.name = xo.id
            }
            constructor(t={
                useNestjs: !1
            }) {
                xo.prototype.__init.call(this),
                this._useNest = !!t.useNestjs
            }
            setupOnce(t, n) {
                if (Tr(n))
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("Apollo Integration is skipped because of instrumenter configuration.");
                else if (this._useNest) {
                    const r = (0,
                    Si.$y)("@nestjs/graphql");
                    if (!r)
                        return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error("Apollo-NestJS Integration was unable to require @nestjs/graphql package."));
                    ut(r.GraphQLFactory.prototype, "mergeWithSchema", function(i) {
                        return function(...o) {
                            return ut(this.resolversExplorerService, "explore", function(s) {
                                return function() {
                                    return BE(LE(s.call(this)), n)
                                }
                            }),
                            i.call(this, ...o)
                        }
                    })
                } else {
                    const r = (0,
                    Si.$y)("apollo-server-core");
                    if (!r)
                        return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error("Apollo Integration was unable to require apollo-server-core package."));
                    ut(r.ApolloServerBase.prototype, "constructSchema", function(i) {
                        return function() {
                            if (!this.config.resolvers)
                                return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && (this.config.schema ? (oe.warn("Apollo integration is not able to trace `ApolloServer` instances constructed via `schema` property.If you are using NestJS with Apollo, please use `Sentry.Integrations.Apollo({ useNestjs: true })` instead."),
                                oe.warn()) : this.config.modules && oe.warn("Apollo integration is not able to trace `ApolloServer` instances constructed via `modules` property."),
                                oe.error("Skipping tracing as no resolvers found on the `ApolloServer` instance.")),
                                i.call(this);
                            const o = LE(this.config.resolvers);
                            return this.config.resolvers = BE(o, n),
                            i.call(this)
                        }
                    })
                }
            }
        }
        function BE(e, t) {
            return e.map(n => (Object.keys(n).forEach(r => {
                Object.keys(n[r]).forEach(i => {
                    "function" == typeof n[r][i] && function bx(e, t, n, r) {
                        ut(e[t], n, function(i) {
                            return function(...o) {
                                const a = pe([r().getScope(), "optionalAccess", l => l.getSpan, "call", l => l()])
                                  , c = pe([a, "optionalAccess", l => l.startChild, "call", l => l({
                                    description: `${t}.${n}`,
                                    op: "graphql.resolve"
                                })])
                                  , u = i.call(this, ...o);
                                return Co(u) ? u.then(l => (pe([c, "optionalAccess", d => d.finish, "call", d => d()]),
                                l)) : (pe([c, "optionalAccess", l => l.finish, "call", l => l()]),
                                u)
                            }
                        })
                    }(n, r, i, t)
                }
                )
            }
            ),
            n))
        }
        xo.__initStatic(),
        E(110);
        var wx = E(31)
          , Dd = E(439);
        const Tx = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$")
          , vd = "baggage"
          , jE = "sentry-"
          , Cx = /^sentry-/
          , Mx = 8192;
        function UE(e) {
            return function Nx(e) {
                if (0 !== Object.keys(e).length)
                    return Object.entries(e).reduce( (t, [n,r], i) => {
                        const o = `${encodeURIComponent(n)}=${encodeURIComponent(r)}`
                          , s = 0 === i ? o : `${t},${o}`;
                        return s.length > Mx ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.warn(`Not adding key: ${n} with val: ${r} to baggage header due to exceeding baggage size limits.`),
                        t) : s
                    }
                    , "")
            }(Object.entries(e).reduce( (n, [r,i]) => (i && (n[`${jE}${r}`] = i),
            n), {}))
        }
        function $E(e) {
            return e.split(",").map(t => t.split("=").map(n => decodeURIComponent(n.trim()))).reduce( (t, [n,r]) => (t[n] = r,
            t), {})
        }
        const Ma = (0,
        nr.Rf)()
          , Ax = 80;
        function Sd(e, t={}) {
            try {
                let n = e;
                const r = 5
                  , i = [];
                let o = 0
                  , s = 0;
                const a = " > "
                  , c = a.length;
                let u;
                const l = Array.isArray(t) ? t : t.keyAttrs
                  , d = !Array.isArray(t) && t.maxStringLength || Ax;
                for (; n && o++ < r && (u = Ox(n, l),
                !("html" === u || o > 1 && s + i.length * c + u.length >= d)); )
                    i.push(u),
                    s += u.length,
                    n = n.parentNode;
                return i.reverse().join(a)
            } catch {
                return "<unknown>"
            }
        }
        function Ox(e, t) {
            const n = e
              , r = [];
            let i, o, s, a, c;
            if (!n || !n.tagName)
                return "";
            r.push(n.tagName.toLowerCase());
            const u = t && t.length ? t.filter(d => n.getAttribute(d)).map(d => [d, n.getAttribute(d)]) : null;
            if (u && u.length)
                u.forEach(d => {
                    r.push(`[${d[0]}="${d[1]}"]`)
                }
                );
            else if (n.id && r.push(`#${n.id}`),
            i = n.className,
            i && vi(i))
                for (o = i.split(/\s+/),
                c = 0; c < o.length; c++)
                    r.push(`.${o[c]}`);
            const l = ["aria-label", "type", "name", "title", "alt"];
            for (c = 0; c < l.length; c++)
                s = l[c],
                a = n.getAttribute(s),
                a && r.push(`[${s}="${a}"]`);
            return r.join("")
        }
        var bd = E(888);
        const Ie = nr.n2;
        var bi = E(625);
        const wd = (e, t, n) => {
            let r, i;
            return o => {
                t.value >= 0 && (o || n) && (i = t.value - (r || 0),
                (i || void 0 === r) && (r = t.value,
                t.delta = i,
                e(t)))
            }
        }
          , HE = () => Ie.__WEB_VITALS_POLYFILL__ ? Ie.performance && (performance.getEntriesByType && performance.getEntriesByType("navigation")[0] || ( () => {
            const e = Ie.performance.timing
              , t = Ie.performance.navigation.type
              , n = {
                entryType: "navigation",
                startTime: 0,
                type: 2 == t ? "back_forward" : 1 === t ? "reload" : "navigate"
            };
            for (const r in e)
                "navigationStart" !== r && "toJSON" !== r && (n[r] = Math.max(e[r] - e.navigationStart, 0));
            return n
        }
        )()) : Ie.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
          , VE = () => {
            const e = HE();
            return e && e.activationStart || 0
        }
          , Td = (e, t) => {
            const n = HE();
            let r = "navigate";
            return n && (r = Ie.document.prerendering || VE() > 0 ? "prerender" : n.type.replace(/_/g, "-")),
            {
                name: e,
                value: typeof t > "u" ? -1 : t,
                rating: "good",
                delta: 0,
                entries: [],
                id: `v3-${Date.now()}-${Math.floor(8999999999999 * Math.random()) + 1e12}`,
                navigationType: r
            }
        }
          , ko = (e, t, n) => {
            try {
                if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                    const r = new PerformanceObserver(i => {
                        t(i.getEntries())
                    }
                    );
                    return r.observe(Object.assign({
                        type: e,
                        buffered: !0
                    }, n || {})),
                    r
                }
            } catch {}
        }
          , Ra = (e, t) => {
            const n = r => {
                ("pagehide" === r.type || "hidden" === Ie.document.visibilityState) && (e(r),
                t && (removeEventListener("visibilitychange", n, !0),
                removeEventListener("pagehide", n, !0)))
            }
            ;
            addEventListener("visibilitychange", n, !0),
            addEventListener("pagehide", n, !0)
        }
          , Lx = e => {
            const t = Td("CLS", 0);
            let n, r = 0, i = [];
            const o = a => {
                a.forEach(c => {
                    c.hadRecentInput || (r && 0 !== i.length && c.startTime - i[i.length - 1].startTime < 1e3 && c.startTime - i[0].startTime < 5e3 ? (r += c.value,
                    i.push(c)) : (r = c.value,
                    i = [c]),
                    r > t.value && (t.value = r,
                    t.entries = i,
                    n && n()))
                }
                )
            }
              , s = ko("layout-shift", o);
            if (s) {
                n = wd(e, t);
                const a = () => {
                    o(s.takeRecords()),
                    n(!0)
                }
                ;
                return Ra(a),
                a
            }
        }
        ;
        let Na = -1;
        const Id = () => (Na < 0 && (Na = "hidden" !== Ie.document.visibilityState || Ie.document.prerendering ? 1 / 0 : 0,
        Ra( ({timeStamp: e}) => {
            Na = e
        }
        , !0)),
        {
            get firstHiddenTime() {
                return Na
            }
        })
          , Ux = e => {
            const t = Id()
              , n = Td("FID");
            let r;
            const i = a => {
                a.startTime < t.firstHiddenTime && (n.value = a.processingStart - a.startTime,
                n.entries.push(a),
                r(!0))
            }
              , o = a => {
                a.forEach(i)
            }
              , s = ko("first-input", o);
            r = wd(e, n),
            s && Ra( () => {
                o(s.takeRecords()),
                s.disconnect()
            }
            , !0)
        }
          , GE = {}
          , $x = e => {
            const t = Id()
              , n = Td("LCP");
            let r;
            const i = s => {
                const a = s[s.length - 1];
                if (a) {
                    const c = Math.max(a.startTime - VE(), 0);
                    c < t.firstHiddenTime && (n.value = c,
                    n.entries = [a],
                    r())
                }
            }
              , o = ko("largest-contentful-paint", i);
            if (o) {
                r = wd(e, n);
                const s = () => {
                    GE[n.id] || (i(o.takeRecords()),
                    o.disconnect(),
                    GE[n.id] = !0,
                    r(!0))
                }
                ;
                return ["keydown", "click"].forEach(a => {
                    addEventListener(a, s, {
                        once: !0,
                        capture: !0
                    })
                }
                ),
                Ra(s, !0),
                s
            }
        }
        ;
        function Cd(e) {
            return "number" == typeof e && isFinite(e)
        }
        function wi(e, {startTimestamp: t, ...n}) {
            return t && e.startTimestamp > t && (e.startTimestamp = t),
            e.startChild({
                startTimestamp: t,
                ...n
            })
        }
        function it(e) {
            return e / 1e3
        }
        function YE() {
            return Ie && Ie.addEventListener && Ie.performance
        }
        let bn, Fo, WE = 0, Ve = {};
        function Aa(e, t, n, r, i, o) {
            const s = o ? t[o] : t[`${n}End`]
              , a = t[`${n}Start`];
            !a || !s || wi(e, {
                op: "browser",
                description: i || n,
                startTimestamp: r + it(a),
                endTimestamp: r + it(s)
            })
        }
        var zE = E(406);
        const Md = "<anonymous>";
        function r1(e) {
            try {
                return e && "function" == typeof e && e.name || Md
            } catch {
                return Md
            }
        }
        const rr = (0,
        nr.Rf)();
        function QE(e) {
            return e && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
        }
        const ke = (0,
        nr.Rf)()
          , Lo = {}
          , JE = {};
        function c1(e) {
            if (!JE[e])
                switch (JE[e] = !0,
                e) {
                case "console":
                    !function u1() {
                        "console"in ke && Ta.forEach(function(e) {
                            e in ke.console && ut(ke.console, e, function(t) {
                                return function(...n) {
                                    an("console", {
                                        args: n,
                                        level: e
                                    }),
                                    t && t.apply(ke.console, n)
                                }
                            })
                        })
                    }();
                    break;
                case "dom":
                    !function y1() {
                        if (!("document"in ke))
                            return;
                        const e = an.bind(null, "dom")
                          , t = XE(e, !0);
                        ke.document.addEventListener("click", t, !1),
                        ke.document.addEventListener("keypress", t, !1),
                        ["EventTarget", "Node"].forEach(n => {
                            const r = ke[n] && ke[n].prototype;
                            !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (ut(r, "addEventListener", function(i) {
                                return function(o, s, a) {
                                    if ("click" === o || "keypress" == o)
                                        try {
                                            const c = this
                                              , u = c.__sentry_instrumentation_handlers__ = c.__sentry_instrumentation_handlers__ || {}
                                              , l = u[o] = u[o] || {
                                                refCount: 0
                                            };
                                            if (!l.handler) {
                                                const d = XE(e);
                                                l.handler = d,
                                                i.call(this, o, d, a)
                                            }
                                            l.refCount++
                                        } catch {}
                                    return i.call(this, o, s, a)
                                }
                            }),
                            ut(r, "removeEventListener", function(i) {
                                return function(o, s, a) {
                                    if ("click" === o || "keypress" == o)
                                        try {
                                            const c = this
                                              , u = c.__sentry_instrumentation_handlers__ || {}
                                              , l = u[o];
                                            l && (l.refCount--,
                                            l.refCount <= 0 && (i.call(this, o, l.handler, a),
                                            l.handler = void 0,
                                            delete u[o]),
                                            0 === Object.keys(u).length && delete c.__sentry_instrumentation_handlers__)
                                        } catch {}
                                    return i.call(this, o, s, a)
                                }
                            }))
                        }
                        )
                    }();
                    break;
                case "xhr":
                    !function p1() {
                        if (!("XMLHttpRequest"in ke))
                            return;
                        const e = XMLHttpRequest.prototype;
                        ut(e, "open", function(t) {
                            return function(...n) {
                                const r = n[1]
                                  , i = this.__sentry_xhr__ = {
                                    method: vi(n[0]) ? n[0].toUpperCase() : n[0],
                                    url: n[1]
                                };
                                vi(r) && "POST" === i.method && r.match(/sentry_key/) && (this.__sentry_own_request__ = !0);
                                const o = () => {
                                    const s = this.__sentry_xhr__;
                                    if (s && 4 === this.readyState) {
                                        try {
                                            s.status_code = this.status
                                        } catch {}
                                        an("xhr", {
                                            args: n,
                                            endTimestamp: Date.now(),
                                            startTimestamp: Date.now(),
                                            xhr: this
                                        })
                                    }
                                }
                                ;
                                return "onreadystatechange"in this && "function" == typeof this.onreadystatechange ? ut(this, "onreadystatechange", function(s) {
                                    return function(...a) {
                                        return o(),
                                        s.apply(this, a)
                                    }
                                }) : this.addEventListener("readystatechange", o),
                                t.apply(this, n)
                            }
                        }),
                        ut(e, "send", function(t) {
                            return function(...n) {
                                return this.__sentry_xhr__ && void 0 !== n[0] && (this.__sentry_xhr__.body = n[0]),
                                an("xhr", {
                                    args: n,
                                    startTimestamp: Date.now(),
                                    xhr: this
                                }),
                                t.apply(this, n)
                            }
                        })
                    }();
                    break;
                case "fetch":
                    !function l1() {
                        (function s1() {
                            if (!function ZE() {
                                if (!("fetch"in rr))
                                    return !1;
                                try {
                                    return new Headers,
                                    new Request("http://www.example.com"),
                                    new Response,
                                    !0
                                } catch {
                                    return !1
                                }
                            }())
                                return !1;
                            if (QE(rr.fetch))
                                return !0;
                            let e = !1;
                            const t = rr.document;
                            if (t && "function" == typeof t.createElement)
                                try {
                                    const n = t.createElement("iframe");
                                    n.hidden = !0,
                                    t.head.appendChild(n),
                                    n.contentWindow && n.contentWindow.fetch && (e = QE(n.contentWindow.fetch)),
                                    t.head.removeChild(n)
                                } catch (n) {
                                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", n)
                                }
                            return e
                        }
                        )() && ut(ke, "fetch", function(e) {
                            return function(...t) {
                                const n = {
                                    args: t,
                                    fetchData: {
                                        method: d1(t),
                                        url: f1(t)
                                    },
                                    startTimestamp: Date.now()
                                };
                                return an("fetch", {
                                    ...n
                                }),
                                e.apply(ke, t).then(r => (an("fetch", {
                                    ...n,
                                    endTimestamp: Date.now(),
                                    response: r
                                }),
                                r), r => {
                                    throw an("fetch", {
                                        ...n,
                                        endTimestamp: Date.now(),
                                        error: r
                                    }),
                                    r
                                }
                                )
                            }
                        })
                    }();
                    break;
                case "history":
                    !function h1() {
                        if (!function a1() {
                            const e = rr.chrome;
                            return !(e && e.app && e.app.runtime || !("history"in rr) || !rr.history.pushState || !rr.history.replaceState)
                        }())
                            return;
                        const e = ke.onpopstate;
                        function t(n) {
                            return function(...r) {
                                const i = r.length > 2 ? r[2] : void 0;
                                if (i) {
                                    const o = Oa
                                      , s = String(i);
                                    Oa = s,
                                    an("history", {
                                        from: o,
                                        to: s
                                    })
                                }
                                return n.apply(this, r)
                            }
                        }
                        ke.onpopstate = function(...n) {
                            const r = ke.location.href
                              , i = Oa;
                            if (Oa = r,
                            an("history", {
                                from: i,
                                to: r
                            }),
                            e)
                                try {
                                    return e.apply(this, n)
                                } catch {}
                        }
                        ,
                        ut(ke.history, "pushState", t),
                        ut(ke.history, "replaceState", t)
                    }();
                    break;
                case "error":
                    !function E1() {
                        Nd = ke.onerror,
                        ke.onerror = function(e, t, n, r, i) {
                            return an("error", {
                                column: r,
                                error: i,
                                line: n,
                                msg: e,
                                url: t
                            }),
                            !!Nd && Nd.apply(this, arguments)
                        }
                    }();
                    break;
                case "unhandledrejection":
                    !function D1() {
                        Ad = ke.onunhandledrejection,
                        ke.onunhandledrejection = function(e) {
                            return an("unhandledrejection", e),
                            !Ad || Ad.apply(this, arguments)
                        }
                    }();
                    break;
                default:
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.warn("unknown instrumentation type:", e))
                }
        }
        function Rd(e, t) {
            Lo[e] = Lo[e] || [],
            Lo[e].push(t),
            c1(e)
        }
        function an(e, t) {
            if (e && Lo[e])
                for (const n of Lo[e] || [])
                    try {
                        n(t)
                    } catch (r) {
                        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${r1(n)}\nError:`, r)
                    }
        }
        function d1(e=[]) {
            return "Request"in ke && wr(e[0], Request) && e[0].method ? String(e[0].method).toUpperCase() : e[1] && e[1].method ? String(e[1].method).toUpperCase() : "GET"
        }
        function f1(e=[]) {
            return "string" == typeof e[0] ? e[0] : "Request"in ke && wr(e[0], Request) ? e[0].url : String(e[0])
        }
        let Oa;
        const g1 = 1e3;
        let Pa, xa;
        function XE(e, t=!1) {
            return n => {
                if (!n || xa === n || function _1(e) {
                    if ("keypress" !== e.type)
                        return !1;
                    try {
                        const t = e.target;
                        if (!t || !t.tagName)
                            return !0;
                        if ("INPUT" === t.tagName || "TEXTAREA" === t.tagName || t.isContentEditable)
                            return !1
                    } catch {}
                    return !0
                }(n))
                    return;
                const r = "keypress" === n.type ? "input" : n.type;
                (void 0 === Pa || function m1(e, t) {
                    if (!e || e.type !== t.type)
                        return !0;
                    try {
                        if (e.target !== t.target)
                            return !0
                    } catch {}
                    return !1
                }(xa, n)) && (e({
                    event: n,
                    name: r,
                    global: t
                }),
                xa = n),
                clearTimeout(Pa),
                Pa = ke.setTimeout( () => {
                    Pa = void 0
                }
                , g1)
            }
        }
        let Nd = null
          , Ad = null;
        const Od = ["localhost", /^\//]
          , Pd = {
            traceFetch: !0,
            traceXHR: !0,
            tracingOrigins: Od,
            tracePropagationTargets: Od
        };
        function b1(e) {
            const {traceFetch: t, traceXHR: n, tracePropagationTargets: r, tracingOrigins: i, shouldCreateSpanForRequest: o} = {
                traceFetch: Pd.traceFetch,
                traceXHR: Pd.traceXHR,
                ...e
            }
              , s = "function" == typeof o ? o : u => !0
              , a = u => function w1(e, t) {
                return function S1(e, t=[], n=!1) {
                    return t.some(r => function v1(e, t, n=!1) {
                        return !!vi(e) && (OE(t) ? t.test(e) : !!vi(t) && (n ? e === t : e.includes(t)))
                    }(e, r, n))
                }(e, t || Od)
            }(u, r || i)
              , c = {};
            t && Rd("fetch", u => {
                !function T1(e, t, n, r) {
                    if (!(0,
                    zE.z)() || !e.fetchData || !t(e.fetchData.url))
                        return;
                    if (e.endTimestamp) {
                        const a = e.fetchData.__span;
                        if (!a)
                            return;
                        const c = r[a];
                        return void (c && (e.response ? c.setHttpStatus(e.response.status) : e.error && c.setStatus("internal_error"),
                        c.finish(),
                        delete r[a]))
                    }
                    const i = (0,
                    He.Gd)().getScope()
                      , o = i && i.getSpan()
                      , s = o && o.transaction;
                    if (o && s) {
                        const a = o.startChild({
                            data: {
                                ...e.fetchData,
                                type: "fetch"
                            },
                            description: `${e.fetchData.method} ${e.fetchData.url}`,
                            op: "http.client"
                        });
                        e.fetchData.__span = a.spanId,
                        r[a.spanId] = a;
                        const c = e.args[0];
                        e.args[1] = e.args[1] || {};
                        const u = e.args[1];
                        n(e.fetchData.url) && (u.headers = function I1(e, t, n, r) {
                            const i = UE(t)
                              , o = n.toTraceparent()
                              , s = typeof Request < "u" && wr(e, Request) ? e.headers : r.headers;
                            if (s) {
                                if (typeof Headers < "u" && wr(s, Headers)) {
                                    const a = new Headers(s);
                                    return a.append("sentry-trace", o),
                                    i && a.append(vd, i),
                                    a
                                }
                                if (Array.isArray(s)) {
                                    const a = [...s, ["sentry-trace", o]];
                                    return i && a.push([vd, i]),
                                    a
                                }
                                {
                                    const a = "baggage"in s ? s.baggage : void 0
                                      , c = [];
                                    return Array.isArray(a) ? c.push(...a) : a && c.push(a),
                                    i && c.push(i),
                                    {
                                        ...s,
                                        "sentry-trace": o,
                                        baggage: c.length > 0 ? c.join(",") : void 0
                                    }
                                }
                            }
                            return {
                                "sentry-trace": o,
                                baggage: i
                            }
                        }(c, s.getDynamicSamplingContext(), a, u))
                    }
                }(u, s, a, c)
            }
            ),
            n && Rd("xhr", u => {
                !function C1(e, t, n, r) {
                    if (!(0,
                    zE.z)() || e.xhr && e.xhr.__sentry_own_request__ || !(e.xhr && e.xhr.__sentry_xhr__ && t(e.xhr.__sentry_xhr__.url)))
                        return;
                    const i = e.xhr.__sentry_xhr__;
                    if (e.endTimestamp) {
                        const c = e.xhr.__sentry_xhr_span_id__;
                        if (!c)
                            return;
                        const u = r[c];
                        return void (u && (u.setHttpStatus(i.status_code),
                        u.finish(),
                        delete r[c]))
                    }
                    const o = (0,
                    He.Gd)().getScope()
                      , s = o && o.getSpan()
                      , a = s && s.transaction;
                    if (s && a) {
                        const c = s.startChild({
                            data: {
                                ...i.data,
                                type: "xhr",
                                method: i.method,
                                url: i.url
                            },
                            description: `${i.method} ${i.url}`,
                            op: "http.client"
                        });
                        if (e.xhr.__sentry_xhr_span_id__ = c.spanId,
                        r[e.xhr.__sentry_xhr_span_id__] = c,
                        e.xhr.setRequestHeader && n(e.xhr.__sentry_xhr__.url))
                            try {
                                e.xhr.setRequestHeader("sentry-trace", c.toTraceparent());
                                const l = UE(a.getDynamicSamplingContext());
                                l && e.xhr.setRequestHeader(vd, l)
                            } catch {}
                    }
                }(u, s, a, c)
            }
            )
        }
        const N1 = {
            ...wx.AT,
            markBackgroundTransactions: !0,
            routingInstrumentation: function M1(e, t=!0, n=!0) {
                if (!Ie || !Ie.location)
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.warn("Could not initialize routing instrumentation due to invalid location"));
                let i, r = Ie.location.href;
                t && (i = e({
                    name: Ie.location.pathname,
                    op: "pageload",
                    metadata: {
                        source: "url"
                    }
                })),
                n && Rd("history", ({to: o, from: s}) => {
                    void 0 === s && r && -1 !== r.indexOf(o) ? r = void 0 : s !== o && (r = void 0,
                    i && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log(`[Tracing] Finishing current transaction with op: ${i.op}`),
                    i.finish()),
                    i = e({
                        name: Ie.location.pathname,
                        op: "navigation",
                        metadata: {
                            source: "url"
                        }
                    }))
                }
                )
            },
            startTransactionOnLocationChange: !0,
            startTransactionOnPageLoad: !0,
            enableLongTask: !0,
            _experiments: {},
            ...Pd
        };
        class ka {
            __init() {
                this.name = "BrowserTracing"
            }
            constructor(t) {
                ka.prototype.__init.call(this),
                (0,
                Dd.T)(),
                this.options = {
                    ...N1,
                    ...t
                },
                void 0 !== this.options._experiments.enableLongTask && (this.options.enableLongTask = this.options._experiments.enableLongTask),
                t && !t.tracePropagationTargets && t.tracingOrigins && (this.options.tracePropagationTargets = t.tracingOrigins),
                this._collectWebVitals = function Hx() {
                    const e = YE();
                    if (e && bi.Z1) {
                        e.mark && Ie.performance.mark("sentry-tracing-init"),
                        function zx() {
                            Ux(e => {
                                const t = e.entries.pop();
                                if (!t)
                                    return;
                                const n = it(bi.Z1)
                                  , r = it(t.startTime);
                                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("[Measurements] Adding FID"),
                                Ve.fid = {
                                    value: e.value,
                                    unit: "millisecond"
                                },
                                Ve["mark.fid"] = {
                                    value: n + r,
                                    unit: "second"
                                }
                            }
                            )
                        }();
                        const t = function Yx() {
                            return Lx(e => {
                                const t = e.entries.pop();
                                t && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("[Measurements] Adding CLS"),
                                Ve.cls = {
                                    value: e.value,
                                    unit: ""
                                },
                                Fo = t)
                            }
                            )
                        }()
                          , n = function Wx() {
                            return $x(e => {
                                const t = e.entries.pop();
                                t && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("[Measurements] Adding LCP"),
                                Ve.lcp = {
                                    value: e.value,
                                    unit: "millisecond"
                                },
                                bn = t)
                            }
                            )
                        }();
                        return () => {
                            t && t(),
                            n && n()
                        }
                    }
                    return () => {}
                }(),
                this.options.enableLongTask && function Vx() {
                    ko("longtask", t => {
                        for (const n of t) {
                            const r = (0,
                            bd.x1)();
                            if (!r)
                                return;
                            const i = it(bi.Z1 + n.startTime)
                              , o = it(n.duration);
                            r.startChild({
                                description: "Main UI thread blocked",
                                op: "ui.long-task",
                                startTimestamp: i,
                                endTimestamp: i + o
                            })
                        }
                    }
                    )
                }(),
                this.options._experiments.enableInteractions && function Gx() {
                    ko("event", t => {
                        for (const n of t) {
                            const r = (0,
                            bd.x1)();
                            if (!r)
                                return;
                            if ("click" === n.name) {
                                const i = it(bi.Z1 + n.startTime)
                                  , o = it(n.duration);
                                r.startChild({
                                    description: Sd(n.target),
                                    op: `ui.interaction.${n.name}`,
                                    startTimestamp: i,
                                    endTimestamp: i + o
                                })
                            }
                        }
                    }
                    , {
                        durationThreshold: 0
                    })
                }()
            }
            setupOnce(t, n) {
                this._getCurrentHub = n;
                const {routingInstrumentation: r, startTransactionOnLocationChange: i, startTransactionOnPageLoad: o, markBackgroundTransactions: s, traceFetch: a, traceXHR: c, tracePropagationTargets: u, shouldCreateSpanForRequest: l, _experiments: d} = this.options;
                r(f => {
                    const p = this._createRouteTransaction(f);
                    return this.options._experiments.onStartRouteTransaction && this.options._experiments.onStartRouteTransaction(p, f, n),
                    p
                }
                , o, i),
                s && function xx() {
                    Ie && Ie.document ? Ie.document.addEventListener("visibilitychange", () => {
                        const e = (0,
                        bd.x1)();
                        if (Ie.document.hidden && e) {
                            const t = "cancelled";
                            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log(`[Tracing] Transaction: ${t} -> since tab moved to the background, op: ${e.op}`),
                            e.status || e.setStatus(t),
                            e.setTag("visibilitychange", "document.hidden"),
                            e.finish()
                        }
                    }
                    ) : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.warn("[Tracing] Could not set up background tab detection due to lack of global document")
                }(),
                d.enableInteractions && this._registerInteractionListener(),
                b1({
                    traceFetch: a,
                    traceXHR: c,
                    tracePropagationTargets: u,
                    shouldCreateSpanForRequest: l
                })
            }
            _createRouteTransaction(t) {
                if (!this._getCurrentHub)
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.warn(`[Tracing] Did not create ${t.op} transaction because _getCurrentHub is invalid.`));
                const {beforeNavigate: n, idleTimeout: r, finalTimeout: i, heartbeatInterval: o} = this.options
                  , s = "pageload" === t.op
                  , a = s ? eD("sentry-trace") : null
                  , c = s ? eD("baggage") : null
                  , u = a ? function Ix(e) {
                    const t = e.match(Tx);
                    if (!e || !t)
                        return;
                    let n;
                    return "1" === t[3] ? n = !0 : "0" === t[3] && (n = !1),
                    {
                        traceId: t[1],
                        parentSampled: n,
                        parentSpanId: t[2]
                    }
                }(a) : void 0
                  , l = c ? function Rx(e) {
                    if (!vi(e) && !Array.isArray(e))
                        return;
                    let t = {};
                    if (Array.isArray(e))
                        t = e.reduce( (r, i) => ({
                            ...r,
                            ...$E(i)
                        }), {});
                    else {
                        if (!e)
                            return;
                        t = $E(e)
                    }
                    const n = Object.entries(t).reduce( (r, [i,o]) => (i.match(Cx) && (r[i.slice(jE.length)] = o),
                    r), {});
                    return Object.keys(n).length > 0 ? n : void 0
                }(c) : void 0
                  , d = {
                    ...t,
                    ...u,
                    metadata: {
                        ...t.metadata,
                        dynamicSamplingContext: u && !l ? {} : l
                    },
                    trimEnd: !0
                }
                  , f = "function" == typeof n ? n(d) : d
                  , p = void 0 === f ? {
                    ...d,
                    sampled: !1
                } : f;
                p.metadata = p.name !== d.name ? {
                    ...p.metadata,
                    source: "custom"
                } : p.metadata,
                this._latestRouteName = p.name,
                this._latestRouteSource = p.metadata && p.metadata.source,
                !1 === p.sampled && (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log(`[Tracing] Will not send ${p.op} transaction because of beforeNavigate.`),
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log(`[Tracing] Starting ${p.op} transaction on scope`);
                const g = this._getCurrentHub()
                  , {location: D} = Ie
                  , C = (0,
                Dd.l)(g, p, r, i, !0, {
                    location: D
                }, o);
                return C.registerBeforeFinishCallback(P => {
                    this._collectWebVitals(),
                    function Kx(e) {
                        const t = YE();
                        if (!t || !Ie.performance.getEntries || !bi.Z1)
                            return;
                        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("[Tracing] Adding & adjusting spans using Performance API");
                        const n = it(bi.Z1)
                          , r = t.getEntries();
                        let i, o;
                        if (r.slice(WE).forEach(s => {
                            const a = it(s.startTime)
                              , c = it(s.duration);
                            if (!("navigation" === e.op && n + a < e.startTimestamp))
                                switch (s.entryType) {
                                case "navigation":
                                    (function Zx(e, t, n) {
                                        ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach(r => {
                                            Aa(e, t, r, n)
                                        }
                                        ),
                                        Aa(e, t, "secureConnection", n, "TLS/SSL", "connectEnd"),
                                        Aa(e, t, "fetch", n, "cache", "domainLookupStart"),
                                        Aa(e, t, "domainLookup", n, "DNS"),
                                        function Qx(e, t, n) {
                                            wi(e, {
                                                op: "browser",
                                                description: "request",
                                                startTimestamp: n + it(t.requestStart),
                                                endTimestamp: n + it(t.responseEnd)
                                            }),
                                            wi(e, {
                                                op: "browser",
                                                description: "response",
                                                startTimestamp: n + it(t.responseStart),
                                                endTimestamp: n + it(t.responseEnd)
                                            })
                                        }(e, t, n)
                                    }
                                    )(e, s, n),
                                    i = n + it(s.responseStart),
                                    o = n + it(s.requestStart);
                                    break;
                                case "mark":
                                case "paint":
                                case "measure":
                                    {
                                        !function qx(e, t, n, r, i) {
                                            const o = i + n;
                                            wi(e, {
                                                description: t.name,
                                                endTimestamp: o + r,
                                                op: t.entryType,
                                                startTimestamp: o
                                            })
                                        }(e, s, a, c, n);
                                        const u = Id()
                                          , l = s.startTime < u.firstHiddenTime;
                                        "first-paint" === s.name && l && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("[Measurements] Adding FP"),
                                        Ve.fp = {
                                            value: s.startTime,
                                            unit: "millisecond"
                                        }),
                                        "first-contentful-paint" === s.name && l && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("[Measurements] Adding FCP"),
                                        Ve.fcp = {
                                            value: s.startTime,
                                            unit: "millisecond"
                                        });
                                        break
                                    }
                                case "resource":
                                    {
                                        const u = s.name.replace(Ie.location.origin, "");
                                        !function Jx(e, t, n, r, i, o) {
                                            if ("xmlhttprequest" === t.initiatorType || "fetch" === t.initiatorType)
                                                return;
                                            const s = {};
                                            "transferSize"in t && (s["Transfer Size"] = t.transferSize),
                                            "encodedBodySize"in t && (s["Encoded Body Size"] = t.encodedBodySize),
                                            "decodedBodySize"in t && (s["Decoded Body Size"] = t.decodedBodySize),
                                            "renderBlockingStatus"in t && (s["resource.render_blocking_status"] = t.renderBlockingStatus);
                                            const a = o + r;
                                            wi(e, {
                                                description: n,
                                                endTimestamp: a + i,
                                                op: t.initiatorType ? `resource.${t.initiatorType}` : "resource.other",
                                                startTimestamp: a,
                                                data: s
                                            })
                                        }(e, s, u, a, c, n);
                                        break
                                    }
                                }
                        }
                        ),
                        WE = Math.max(r.length - 1, 0),
                        function Xx(e) {
                            const t = Ie.navigator;
                            if (!t)
                                return;
                            const n = t.connection;
                            n && (n.effectiveType && e.setTag("effectiveConnectionType", n.effectiveType),
                            n.type && e.setTag("connectionType", n.type),
                            Cd(n.rtt) && (Ve["connection.rtt"] = {
                                value: n.rtt,
                                unit: "millisecond"
                            })),
                            Cd(t.deviceMemory) && e.setTag("deviceMemory", `${t.deviceMemory} GB`),
                            Cd(t.hardwareConcurrency) && e.setTag("hardwareConcurrency", String(t.hardwareConcurrency))
                        }(e),
                        "pageload" === e.op) {
                            "number" == typeof i && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("[Measurements] Adding TTFB"),
                            Ve.ttfb = {
                                value: 1e3 * (i - e.startTimestamp),
                                unit: "millisecond"
                            },
                            "number" == typeof o && o <= i && (Ve["ttfb.requestTime"] = {
                                value: 1e3 * (i - o),
                                unit: "millisecond"
                            })),
                            ["fcp", "fp", "lcp"].forEach(a => {
                                if (!Ve[a] || n >= e.startTimestamp)
                                    return;
                                const c = Ve[a].value
                                  , u = n + it(c)
                                  , l = Math.abs(1e3 * (u - e.startTimestamp));
                                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log(`[Measurements] Normalized ${a} from ${c} to ${l} (${l - c})`),
                                Ve[a].value = l
                            }
                            );
                            const s = Ve["mark.fid"];
                            s && Ve.fid && (wi(e, {
                                description: "first input delay",
                                endTimestamp: s.value + it(Ve.fid.value),
                                op: "ui.action",
                                startTimestamp: s.value
                            }),
                            delete Ve["mark.fid"]),
                            "fcp"in Ve || delete Ve.cls,
                            Object.keys(Ve).forEach(a => {
                                e.setMeasurement(a, Ve[a].value, Ve[a].unit)
                            }
                            ),
                            function e1(e) {
                                bn && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("[Measurements] Adding LCP Data"),
                                bn.element && e.setTag("lcp.element", Sd(bn.element)),
                                bn.id && e.setTag("lcp.id", bn.id),
                                bn.url && e.setTag("lcp.url", bn.url.trim().slice(0, 200)),
                                e.setTag("lcp.size", bn.size)),
                                Fo && Fo.sources && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.log("[Measurements] Adding CLS Data"),
                                Fo.sources.forEach( (t, n) => e.setTag(`cls.source.${n + 1}`, Sd(t.node))))
                            }(e)
                        }
                        bn = void 0,
                        Fo = void 0,
                        Ve = {}
                    }(P)
                }
                ),
                C
            }
            _registerInteractionListener() {
                let t;
                const n = () => {
                    const {idleTimeout: r, finalTimeout: i, heartbeatInterval: o} = this.options
                      , s = "ui.action.click";
                    if (t && (t.finish(),
                    t = void 0),
                    !this._getCurrentHub)
                        return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.warn(`[Tracing] Did not create ${s} transaction because _getCurrentHub is invalid.`));
                    if (!this._latestRouteName)
                        return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && oe.warn(`[Tracing] Did not create ${s} transaction because _latestRouteName is missing.`));
                    const a = this._getCurrentHub()
                      , {location: c} = Ie;
                    t = (0,
                    Dd.l)(a, {
                        name: this._latestRouteName,
                        op: s,
                        trimEnd: !0,
                        metadata: {
                            source: this._latestRouteSource || "url"
                        }
                    }, r, i, !0, {
                        location: c
                    }, o)
                }
                ;
                ["click"].forEach(r => {
                    addEventListener(r, n, {
                        once: !1,
                        capture: !0
                    })
                }
                )
            }
        }
        function eD(e) {
            const t = function Px(e) {
                return Ma.document && Ma.document.querySelector ? Ma.document.querySelector(e) : null
            }(`meta[name=${e}]`);
            return t ? t.getAttribute("content") : null
        }
        var A1 = E(800);
        function tD(e, t, n, r, i, o, s) {
            try {
                var a = e[o](s)
                  , c = a.value
            } catch (u) {
                return void n(u)
            }
            a.done ? t(c) : Promise.resolve(c).then(r, i)
        }
        function nD(e) {
            return function() {
                var t = this
                  , n = arguments;
                return new Promise(function(r, i) {
                    var o = e.apply(t, n);
                    function s(c) {
                        tD(o, r, i, s, a, "next", c)
                    }
                    function a(c) {
                        tD(o, r, i, s, a, "throw", c)
                    }
                    s(void 0)
                }
                )
            }
        }
        (typeof __SENTRY_TRACING__ > "u" || __SENTRY_TRACING__) && (0,
        A1.r)();
        let O1 = ( () => {
            class e {
                constructor() {
                    this.label = "?",
                    this.handleClick = new En
                }
                ngOnInit() {}
                onClick() {
                    this.handleClick.emit()
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275cmp = Zo({
                type: e,
                selectors: [["app-button"]],
                inputs: {
                    label: "label"
                },
                outputs: {
                    handleClick: "handleClick"
                },
                decls: 1,
                vars: 1,
                consts: [["type", "button", 3, "value", "click"]],
                template: function(n, r) {
                    1 & n && (Gn(0, "input", 0),
                    Xi("click", function() {
                        return r.onClick()
                    }),
                    Yn()),
                    2 & n && Pu("value", r.label)
                },
                styles: ["input{font-size:40px;width:40px}\n\n/*# sourceMappingURL=button.component.css.map*/"],
                encapsulation: 2
            }),
            e
        }
        )()
          , P1 = ( () => {
            class e {
                get isNegeative() {
                    return this.counter < 0
                }
                constructor() {
                    this.counter = 0
                }
                ngOnInit() {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275cmp = Zo({
                type: e,
                selectors: [["app-label"]],
                inputs: {
                    counter: "counter"
                },
                decls: 2,
                vars: 3,
                template: function(n, r) {
                    1 & n && (Gn(0, "span"),
                    ju(1),
                    Yn()),
                    2 & n && (Cg(r.isNegeative ? "red" : ""),
                    au(1),
                    Uu(r.counter))
                },
                styles: [".red[_ngcontent-%COMP%]{color:red}\n/*# sourceMappingURL=label.component.css.map*/"]
            }),
            e
        }
        )();
        function rD(e) {
            return new Promise(t => setTimeout(t, e))
        }
        let x1 = ( () => {
            class e {
                constructor() {
                    this.counter = 0
                }
                increment() {
                    var n = this;
                    return nD(function*() {
                        let r;
                        yield Promise.resolve().then( () => rD(100));
                        try {
                            r = yield(yield fetch("/random-number").then(o => {
                                if (404 === o.status)
                                    throw new Error("wrong url");
                                return o
                            }
                            )).text().catch(o => {
                                throw o
                            }
                            )
                        } finally {
                            n.counter = n.counter + +(r || 1)
                        }
                    })()
                }
                decrement() {
                    var n = this;
                    return nD(function*() {
                        throw yield Promise.resolve().then( () => rD(100)),
                        n.counter--,
                        new Error("not decremented")
                    })()
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275cmp = Zo({
                type: e,
                selectors: [["app-root"]],
                decls: 6,
                vars: 1,
                consts: [["label", "-", 3, "handleClick"], [3, "counter"], ["label", "+", 3, "handleClick"], ["href", "https://github.com/jecfish/demo-angular"]],
                template: function(n, r) {
                    1 & n && (Gn(0, "section")(1, "app-button", 0),
                    Xi("handleClick", function() {
                        return r.decrement()
                    }),
                    Yn(),
                    Ru(2, "app-label", 1),
                    Gn(3, "app-button", 2),
                    Xi("handleClick", function() {
                        return r.increment()
                    }),
                    Yn()(),
                    Gn(4, "a", 3),
                    ju(5, "GitHub"),
                    Yn()),
                    2 & n && (au(2),
                    Cu("counter", r.counter))
                },
                dependencies: [O1, P1],
                encapsulation: 2
            }),
            e
        }
        )();
        !function $P(e) {
            e._metadata = e._metadata || {},
            e._metadata.sdk = {
                name: "sentry.javascript.angular",
                packages: [{
                    name: "npm:@sentry/angular",
                    version: ga
                }],
                version: ga
            },
            function HP() {
                const t = Rs && Rs.major ? parseInt(Rs.major, 10) : void 0;
                t && (t < 10 && UP && _d.warn(`The Sentry SDK does not officially support Angular ${t}.`, "This version of the Sentry SDK supports Angular 10 and above.", "Please consider upgrading your Angular version or downgrading the Sentry SDK."),
                function xO(e, t) {
                    (0,
                    He.Gd)().setContext(e, t)
                }("angular", {
                    version: t
                }))
            }(),
            function kP(e={}) {
                void 0 === e.defaultIntegrations && (e.defaultIntegrations = xP),
                void 0 === e.release && ("string" == typeof __SENTRY_RELEASE__ && (e.release = __SENTRY_RELEASE__),
                we.SENTRY_RELEASE && we.SENTRY_RELEASE.id && (e.release = we.SENTRY_RELEASE.id)),
                void 0 === e.autoSessionTracking && (e.autoSessionTracking = !0),
                void 0 === e.sendClientReports && (e.sendClientReports = !0);
                const t = {
                    ...e,
                    stackParser: qN(e.stackParser || vP),
                    integrations: YN(e),
                    transport: e.transport || (Zl() ? AP : PP)
                };
                (function KN(e, t) {
                    !0 === t.debug && (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? ze.kg.enable() : console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."));
                    const n = (0,
                    He.Gd)();
                    n.getScope().update(t.initialScope);
                    const i = new e(t);
                    n.bindClient(i)
                }
                )(GO, t),
                e.autoSessionTracking && function FP() {
                    if (typeof we.document > "u")
                        return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Ut.warn("Session tracking in non-browser environment with @sentry/browser is not supported."));
                    const e = (0,
                    He.Gd)();
                    e.captureSession && (TE(e),
                    Xn("history", ({from: t, to: n}) => {
                        void 0 === t || t === n || TE((0,
                        He.Gd)())
                    }
                    ))
                }()
            }(e)
        }({
            dsn: "https://77c3e22c82be474e9ab9aeb1ac6a4494@o4503925390245888.ingest.sentry.io/4503925392277504",
            integrations: [new ka({
                tracingOrigins: ["localhost:4200", "https://ng-devtools.netlify.app/"],
                routingInstrumentation: function ZP(e, t=!0, n=!0) {
                    zP = !0,
                    KP = e,
                    qP = n,
                    t && we && we.location && e({
                        name: we.location.pathname,
                        op: "pageload",
                        metadata: {
                            source: "url"
                        }
                    })
                }
            })],
            tracesSampleRate: 1
        });
        class k1 {
            handleError(t) {
                uE(t.originalError || t)
            }
        }
        let F1 = ( () => {
            class e {
                constructor() {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275mod = Mr({
                type: e,
                bootstrap: [x1]
            }),
            e.\u0275inj = ur({
                providers: [{
                    provide: _r,
                    useClass: k1
                }],
                imports: [IN]
            }),
            e
        }
        )();
        TN().bootstrapModule(F1).catch(e => console.error(e))
    }
    ,
    800: (G, Q, E) => {
        E.d(Q, {
            r: () => A
        });
        var v = E(10)
          , F = E(439)
          , k = E(911);
        function A() {
            (0,
            F.T)(),
            (0,
            k.KV)() && function V() {
                const j = (0,
                v.cu)();
                if (!j.__SENTRY__)
                    return;
                const O = {
                    mongodb: () => new ((0,
                    k.l$)(G, "./node/integrations/mongo").Mongo),
                    mongoose: () => new ((0,
                    k.l$)(G, "./node/integrations/mongo").Mongo)({
                        mongoose: !0
                    }),
                    mysql: () => new ((0,
                    k.l$)(G, "./node/integrations/mysql").Mysql),
                    pg: () => new ((0,
                    k.l$)(G, "./node/integrations/postgres").Postgres)
                }
                  , _ = Object.keys(O).filter(m => !!(0,
                k.$y)(m)).map(m => {
                    try {
                        return O[m]()
                    } catch {
                        return
                    }
                }
                ).filter(m => m);
                _.length > 0 && (j.__SENTRY__.integrations = [...j.__SENTRY__.integrations || [], ..._])
            }()
        }
        G = E.hmd(G)
    }
    ,
    110: (G, Q, E) => {
        E(911),
        G = E.hmd(G)
    }
    ,
    911: (G, Q, E) => {
        function k() {
            return !function v() {
                return typeof __SENTRY_BROWSER_BUNDLE__ < "u" && !!__SENTRY_BROWSER_BUNDLE__
            }() && "[object process]" === Object.prototype.toString.call(typeof process < "u" ? process : 0)
        }
        function V(j, O) {
            return j.require(O)
        }
        function A(j) {
            let O;
            try {
                O = V(G, j)
            } catch {}
            try {
                const {cwd: _} = V(G, "process");
                O = V(G, `${_()}/node_modules/${j}`)
            } catch {}
            return O
        }
        E.d(Q, {
            l$: () => V,
            KV: () => k,
            $y: () => A
        }),
        G = E.hmd(G)
    }
    ,
    625: (G, Q, E) => {
        E.d(Q, {
            Z1: () => S
        });
        var v = E(911)
          , F = E(104);
        G = E.hmd(G);
        const k = (0,
        F.Rf)()
          , V = {
            nowSeconds: () => Date.now() / 1e3
        }
          , O = (0,
        v.KV)() ? function j() {
            try {
                return (0,
                v.l$)(G, "perf_hooks").performance
            } catch {
                return
            }
        }() : function A() {
            const {performance: M} = k;
            if (M && M.now)
                return {
                    now: () => M.now(),
                    timeOrigin: Date.now() - M.now()
                }
        }()
          , _ = void 0 === O ? V : {
            nowSeconds: () => (O.timeOrigin + O.now()) / 1e3
        };
        let h;
        V.nowSeconds.bind(V),
        _.nowSeconds.bind(_);
        const S = ( () => {
            const {performance: M} = k;
            if (!M || !M.now)
                return void (h = "none");
            const U = 36e5
              , I = M.now()
              , $ = Date.now()
              , Z = M.timeOrigin ? Math.abs(M.timeOrigin + I - $) : U
              , R = Z < U
              , y = M.timing && M.timing.navigationStart
              , B = "number" == typeof y ? Math.abs(y + I - $) : U;
            return R || B < U ? Z <= B ? (h = "timeOrigin",
            M.timeOrigin) : (h = "navigationStart",
            y) : (h = "dateNow",
            $)
        }
        )()
    }
    ,
    104: (G, Q, E) => {
        function v(A) {
            return A && A.Math == Math ? A : void 0
        }
        E.d(Q, {
            Rf: () => k,
            YO: () => V,
            n2: () => F
        });
        const F = "object" == typeof globalThis && v(globalThis) || "object" == typeof window && v(window) || "object" == typeof self && v(self) || "object" == typeof global && v(global) || function() {
            return this
        }() || {};
        function k() {
            return F
        }
        function V(A, j, O) {
            const _ = O || F
              , m = _.__SENTRY__ = _.__SENTRY__ || {};
            return m[A] || (m[A] = j())
        }
    }
    ,
    436: (G, Q, E) => {
        function v() {
            return typeof __SENTRY_BROWSER_BUNDLE__ < "u" && !!__SENTRY_BROWSER_BUNDLE__
        }
        function F() {
            return "npm"
        }
        E.d(Q, {
            S: () => F,
            n: () => v
        })
    }
    ,
    423: (G, Q, E) => {
        E.d(Q, {
            KV: () => F,
            l$: () => k
        });
        var v = E(436);
        function F() {
            return !(0,
            v.n)() && "[object process]" === Object.prototype.toString.call(typeof process < "u" ? process : 0)
        }
        function k(A, j) {
            return A.require(j)
        }
        G = E.hmd(G)
    }
    ,
    613: (G, Q, E) => {
        E.d(Q, {
            yW: () => m
        });
        var v = E(423)
          , F = E(124);
        G = E.hmd(G);
        const k = (0,
        F.Rf)()
          , V = {
            nowSeconds: () => Date.now() / 1e3
        }
          , O = (0,
        v.KV)() ? function j() {
            try {
                return (0,
                v.l$)(G, "perf_hooks").performance
            } catch {
                return
            }
        }() : function A() {
            const {performance: M} = k;
            if (M && M.now)
                return {
                    now: () => M.now(),
                    timeOrigin: Date.now() - M.now()
                }
        }()
          , _ = void 0 === O ? V : {
            nowSeconds: () => (O.timeOrigin + O.now()) / 1e3
        }
          , m = V.nowSeconds.bind(V);
        let h;
        _.nowSeconds.bind(_),
        ( () => {
            const {performance: M} = k;
            if (!M || !M.now)
                return void (h = "none");
            const U = 36e5
              , I = M.now()
              , $ = Date.now()
              , Z = M.timeOrigin ? Math.abs(M.timeOrigin + I - $) : U
              , R = Z < U
              , y = M.timing && M.timing.navigationStart
              , B = "number" == typeof y ? Math.abs(y + I - $) : U;
            h = R || B < U ? Z <= B ? "timeOrigin" : "navigationStart" : "dateNow"
        }
        )()
    }
    ,
    124: (G, Q, E) => {
        function v(A) {
            return A && A.Math == Math ? A : void 0
        }
        E.d(Q, {
            Rf: () => k,
            YO: () => V,
            n2: () => F
        });
        const F = "object" == typeof globalThis && v(globalThis) || "object" == typeof window && v(window) || "object" == typeof self && v(self) || "object" == typeof global && v(global) || function() {
            return this
        }() || {};
        function k() {
            return F
        }
        function V(A, j, O) {
            const _ = O || F
              , m = _.__SENTRY__ = _.__SENTRY__ || {};
            return m[A] || (m[A] = j())
        }
    }
    ,
    291: (G, Q, E) => {
        E.d(Q, {
            J: () => v
        });
        const v = "production"
    }
    ,
    10: (G, Q, E) => {
        E.d(Q, {
            Gd: () => S,
            cu: () => L
        });
        var v = E(76)
          , F = E(966)
          , k = E(981)
          , V = E(474)
          , A = E(708)
          , j = E(291)
          , O = E(670)
          , _ = E(998);
        const m = 4
          , T = 100;
        class q {
            constructor(R, y=new O.s, x=m) {
                this._version = x,
                this._stack = [{
                    scope: y
                }],
                R && this.bindClient(R)
            }
            isOlderThan(R) {
                return this._version < R
            }
            bindClient(R) {
                this.getStackTop().client = R,
                R && R.setupIntegrations && R.setupIntegrations()
            }
            pushScope() {
                const R = O.s.clone(this.getScope());
                return this.getStack().push({
                    client: this.getClient(),
                    scope: R
                }),
                R
            }
            popScope() {
                return !(this.getStack().length <= 1 || !this.getStack().pop())
            }
            withScope(R) {
                const y = this.pushScope();
                try {
                    R(y)
                } finally {
                    this.popScope()
                }
            }
            getClient() {
                return this.getStackTop().client
            }
            getScope() {
                return this.getStackTop().scope
            }
            getStack() {
                return this._stack
            }
            getStackTop() {
                return this._stack[this._stack.length - 1]
            }
            captureException(R, y) {
                const x = this._lastEventId = y && y.event_id ? y.event_id : (0,
                v.DM)()
                  , B = new Error("Sentry syntheticException");
                return this._withClient( (X, le) => {
                    X.captureException(R, {
                        originalException: R,
                        syntheticException: B,
                        ...y,
                        event_id: x
                    }, le)
                }
                ),
                x
            }
            captureMessage(R, y, x) {
                const B = this._lastEventId = x && x.event_id ? x.event_id : (0,
                v.DM)()
                  , X = new Error(R);
                return this._withClient( (le, ot) => {
                    le.captureMessage(R, y, {
                        originalException: R,
                        syntheticException: X,
                        ...x,
                        event_id: B
                    }, ot)
                }
                ),
                B
            }
            captureEvent(R, y) {
                const x = y && y.event_id ? y.event_id : (0,
                v.DM)();
                return R.type || (this._lastEventId = x),
                this._withClient( (B, X) => {
                    B.captureEvent(R, {
                        ...y,
                        event_id: x
                    }, X)
                }
                ),
                x
            }
            lastEventId() {
                return this._lastEventId
            }
            addBreadcrumb(R, y) {
                const {scope: x, client: B} = this.getStackTop();
                if (!B)
                    return;
                const {beforeBreadcrumb: X=null, maxBreadcrumbs: le=T} = B.getOptions && B.getOptions() || {};
                if (le <= 0)
                    return;
                const Je = {
                    timestamp: (0,
                    F.yW)(),
                    ...R
                }
                  , wt = X ? (0,
                k.Cf)( () => X(Je, y)) : Je;
                null !== wt && (B.emit && B.emit("beforeAddBreadcrumb", wt, y),
                x.addBreadcrumb(wt, le))
            }
            setUser(R) {
                this.getScope().setUser(R)
            }
            setTags(R) {
                this.getScope().setTags(R)
            }
            setExtras(R) {
                this.getScope().setExtras(R)
            }
            setTag(R, y) {
                this.getScope().setTag(R, y)
            }
            setExtra(R, y) {
                this.getScope().setExtra(R, y)
            }
            setContext(R, y) {
                this.getScope().setContext(R, y)
            }
            configureScope(R) {
                const {scope: y, client: x} = this.getStackTop();
                x && R(y)
            }
            run(R) {
                const y = h(this);
                try {
                    R(this)
                } finally {
                    h(y)
                }
            }
            getIntegration(R) {
                const y = this.getClient();
                if (!y)
                    return null;
                try {
                    return y.getIntegration(R)
                } catch {
                    return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && k.kg.warn(`Cannot retrieve integration ${R.id} from the current Hub`),
                    null
                }
            }
            startTransaction(R, y) {
                return this._callExtensionMethod("startTransaction", R, y)
            }
            traceHeaders() {
                return this._callExtensionMethod("traceHeaders")
            }
            captureSession(R=!1) {
                if (R)
                    return this.endSession();
                this._sendSessionUpdate()
            }
            endSession() {
                const y = this.getStackTop().scope
                  , x = y.getSession();
                x && (0,
                _.RJ)(x),
                this._sendSessionUpdate(),
                y.setSession()
            }
            startSession(R) {
                const {scope: y, client: x} = this.getStackTop()
                  , {release: B, environment: X=j.J} = x && x.getOptions() || {}
                  , {userAgent: le} = V.n2.navigator || {}
                  , ot = (0,
                _.Hv)({
                    release: B,
                    environment: X,
                    user: y.getUser(),
                    ...le && {
                        userAgent: le
                    },
                    ...R
                })
                  , Je = y.getSession && y.getSession();
                return Je && "ok" === Je.status && (0,
                _.CT)(Je, {
                    status: "exited"
                }),
                this.endSession(),
                y.setSession(ot),
                ot
            }
            shouldSendDefaultPii() {
                const R = this.getClient()
                  , y = R && R.getOptions();
                return Boolean(y && y.sendDefaultPii)
            }
            _sendSessionUpdate() {
                const {scope: R, client: y} = this.getStackTop();
                if (!R)
                    return;
                const x = R.getSession();
                x && y && y.captureSession && y.captureSession(x)
            }
            _withClient(R) {
                const {scope: y, client: x} = this.getStackTop();
                x && R(x, y)
            }
            _callExtensionMethod(R, ...y) {
                const B = L().__SENTRY__;
                if (B && B.extensions && "function" == typeof B.extensions[R])
                    return B.extensions[R].apply(this, y);
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && k.kg.warn(`Extension method ${R} couldn't be found, doing nothing.`)
            }
        }
        function L() {
            return V.n2.__SENTRY__ = V.n2.__SENTRY__ || {
                extensions: {},
                hub: void 0
            },
            V.n2
        }
        function h(Z) {
            const R = L()
              , y = I(R);
            return $(R, Z),
            y
        }
        function S() {
            const Z = L();
            return (!U(Z) || I(Z).isOlderThan(m)) && $(Z, new q),
            (0,
            A.KV)() ? function M(Z) {
                try {
                    const R = L().__SENTRY__
                      , y = R && R.extensions && R.extensions.domain && R.extensions.domain.active;
                    if (!y)
                        return I(Z);
                    if (!U(y) || I(y).isOlderThan(m)) {
                        const x = I(Z).getStackTop();
                        $(y, new q(x.client,O.s.clone(x.scope)))
                    }
                    return I(y)
                } catch {
                    return I(Z)
                }
            }(Z) : I(Z)
        }
        function U(Z) {
            return !!(Z && Z.__SENTRY__ && Z.__SENTRY__.hub)
        }
        function I(Z) {
            return (0,
            V.YO)("hub", () => new q, Z)
        }
        function $(Z, R) {
            return !!Z && ((Z.__SENTRY__ = Z.__SENTRY__ || {}).hub = R,
            !0)
        }
    }
    ,
    670: (G, Q, E) => {
        E.d(Q, {
            c: () => q,
            s: () => m
        });
        var v = E(103)
          , F = E(966)
          , k = E(69)
          , V = E(981)
          , A = E(76)
          , j = E(474)
          , O = E(998);
        class m {
            constructor() {
                this._notifyingListeners = !1,
                this._scopeListeners = [],
                this._eventProcessors = [],
                this._breadcrumbs = [],
                this._attachments = [],
                this._user = {},
                this._tags = {},
                this._extra = {},
                this._contexts = {},
                this._sdkProcessingMetadata = {}
            }
            static clone(h) {
                const S = new m;
                return h && (S._breadcrumbs = [...h._breadcrumbs],
                S._tags = {
                    ...h._tags
                },
                S._extra = {
                    ...h._extra
                },
                S._contexts = {
                    ...h._contexts
                },
                S._user = h._user,
                S._level = h._level,
                S._span = h._span,
                S._session = h._session,
                S._transactionName = h._transactionName,
                S._fingerprint = h._fingerprint,
                S._eventProcessors = [...h._eventProcessors],
                S._requestSession = h._requestSession,
                S._attachments = [...h._attachments],
                S._sdkProcessingMetadata = {
                    ...h._sdkProcessingMetadata
                }),
                S
            }
            addScopeListener(h) {
                this._scopeListeners.push(h)
            }
            addEventProcessor(h) {
                return this._eventProcessors.push(h),
                this
            }
            setUser(h) {
                return this._user = h || {},
                this._session && (0,
                O.CT)(this._session, {
                    user: h
                }),
                this._notifyScopeListeners(),
                this
            }
            getUser() {
                return this._user
            }
            getRequestSession() {
                return this._requestSession
            }
            setRequestSession(h) {
                return this._requestSession = h,
                this
            }
            setTags(h) {
                return this._tags = {
                    ...this._tags,
                    ...h
                },
                this._notifyScopeListeners(),
                this
            }
            setTag(h, S) {
                return this._tags = {
                    ...this._tags,
                    [h]: S
                },
                this._notifyScopeListeners(),
                this
            }
            setExtras(h) {
                return this._extra = {
                    ...this._extra,
                    ...h
                },
                this._notifyScopeListeners(),
                this
            }
            setExtra(h, S) {
                return this._extra = {
                    ...this._extra,
                    [h]: S
                },
                this._notifyScopeListeners(),
                this
            }
            setFingerprint(h) {
                return this._fingerprint = h,
                this._notifyScopeListeners(),
                this
            }
            setLevel(h) {
                return this._level = h,
                this._notifyScopeListeners(),
                this
            }
            setTransactionName(h) {
                return this._transactionName = h,
                this._notifyScopeListeners(),
                this
            }
            setContext(h, S) {
                return null === S ? delete this._contexts[h] : this._contexts[h] = S,
                this._notifyScopeListeners(),
                this
            }
            setSpan(h) {
                return this._span = h,
                this._notifyScopeListeners(),
                this
            }
            getSpan() {
                return this._span
            }
            getTransaction() {
                const h = this.getSpan();
                return h && h.transaction
            }
            setSession(h) {
                return h ? this._session = h : delete this._session,
                this._notifyScopeListeners(),
                this
            }
            getSession() {
                return this._session
            }
            update(h) {
                if (!h)
                    return this;
                if ("function" == typeof h) {
                    const S = h(this);
                    return S instanceof m ? S : this
                }
                return h instanceof m ? (this._tags = {
                    ...this._tags,
                    ...h._tags
                },
                this._extra = {
                    ...this._extra,
                    ...h._extra
                },
                this._contexts = {
                    ...this._contexts,
                    ...h._contexts
                },
                h._user && Object.keys(h._user).length && (this._user = h._user),
                h._level && (this._level = h._level),
                h._fingerprint && (this._fingerprint = h._fingerprint),
                h._requestSession && (this._requestSession = h._requestSession)) : (0,
                v.PO)(h) && (this._tags = {
                    ...this._tags,
                    ...h.tags
                },
                this._extra = {
                    ...this._extra,
                    ...h.extra
                },
                this._contexts = {
                    ...this._contexts,
                    ...h.contexts
                },
                h.user && (this._user = h.user),
                h.level && (this._level = h.level),
                h.fingerprint && (this._fingerprint = h.fingerprint),
                h.requestSession && (this._requestSession = h.requestSession)),
                this
            }
            clear() {
                return this._breadcrumbs = [],
                this._tags = {},
                this._extra = {},
                this._user = {},
                this._contexts = {},
                this._level = void 0,
                this._transactionName = void 0,
                this._fingerprint = void 0,
                this._requestSession = void 0,
                this._span = void 0,
                this._session = void 0,
                this._notifyScopeListeners(),
                this._attachments = [],
                this
            }
            addBreadcrumb(h, S) {
                const M = "number" == typeof S ? S : 100;
                if (M <= 0)
                    return this;
                const U = {
                    timestamp: (0,
                    F.yW)(),
                    ...h
                };
                return this._breadcrumbs = [...this._breadcrumbs, U].slice(-M),
                this._notifyScopeListeners(),
                this
            }
            getLastBreadcrumb() {
                return this._breadcrumbs[this._breadcrumbs.length - 1]
            }
            clearBreadcrumbs() {
                return this._breadcrumbs = [],
                this._notifyScopeListeners(),
                this
            }
            addAttachment(h) {
                return this._attachments.push(h),
                this
            }
            getAttachments() {
                return this._attachments
            }
            clearAttachments() {
                return this._attachments = [],
                this
            }
            applyToEvent(h, S={}) {
                if (this._extra && Object.keys(this._extra).length && (h.extra = {
                    ...this._extra,
                    ...h.extra
                }),
                this._tags && Object.keys(this._tags).length && (h.tags = {
                    ...this._tags,
                    ...h.tags
                }),
                this._user && Object.keys(this._user).length && (h.user = {
                    ...this._user,
                    ...h.user
                }),
                this._contexts && Object.keys(this._contexts).length && (h.contexts = {
                    ...this._contexts,
                    ...h.contexts
                }),
                this._level && (h.level = this._level),
                this._transactionName && (h.transaction = this._transactionName),
                this._span) {
                    h.contexts = {
                        trace: this._span.getTraceContext(),
                        ...h.contexts
                    };
                    const M = this._span.transaction && this._span.transaction.name;
                    M && (h.tags = {
                        transaction: M,
                        ...h.tags
                    })
                }
                return this._applyFingerprint(h),
                h.breadcrumbs = [...h.breadcrumbs || [], ...this._breadcrumbs],
                h.breadcrumbs = h.breadcrumbs.length > 0 ? h.breadcrumbs : void 0,
                h.sdkProcessingMetadata = {
                    ...h.sdkProcessingMetadata,
                    ...this._sdkProcessingMetadata
                },
                this._notifyEventProcessors([...T(), ...this._eventProcessors], h, S)
            }
            setSDKProcessingMetadata(h) {
                return this._sdkProcessingMetadata = {
                    ...this._sdkProcessingMetadata,
                    ...h
                },
                this
            }
            _notifyEventProcessors(h, S, M, U=0) {
                return new k.cW( (I, $) => {
                    const Z = h[U];
                    if (null === S || "function" != typeof Z)
                        I(S);
                    else {
                        const R = Z({
                            ...S
                        }, M);
                        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && Z.id && null === R && V.kg.log(`Event processor "${Z.id}" dropped event`),
                        (0,
                        v.J8)(R) ? R.then(y => this._notifyEventProcessors(h, y, M, U + 1).then(I)).then(null, $) : this._notifyEventProcessors(h, R, M, U + 1).then(I).then(null, $)
                    }
                }
                )
            }
            _notifyScopeListeners() {
                this._notifyingListeners || (this._notifyingListeners = !0,
                this._scopeListeners.forEach(h => {
                    h(this)
                }
                ),
                this._notifyingListeners = !1)
            }
            _applyFingerprint(h) {
                h.fingerprint = h.fingerprint ? (0,
                A.lE)(h.fingerprint) : [],
                this._fingerprint && (h.fingerprint = h.fingerprint.concat(this._fingerprint)),
                h.fingerprint && !h.fingerprint.length && delete h.fingerprint
            }
        }
        function T() {
            return (0,
            j.YO)("globalEventProcessors", () => [])
        }
        function q(L) {
            T().push(L)
        }
    }
    ,
    998: (G, Q, E) => {
        E.d(Q, {
            CT: () => A,
            Hv: () => V,
            RJ: () => j
        });
        var v = E(966)
          , F = E(76)
          , k = E(47);
        function V(_) {
            const m = (0,
            v.ph)()
              , T = {
                sid: (0,
                F.DM)(),
                init: !0,
                timestamp: m,
                started: m,
                duration: 0,
                status: "ok",
                errors: 0,
                ignoreDuration: !1,
                toJSON: () => function O(_) {
                    return (0,
                    k.Jr)({
                        sid: `${_.sid}`,
                        init: _.init,
                        started: new Date(1e3 * _.started).toISOString(),
                        timestamp: new Date(1e3 * _.timestamp).toISOString(),
                        status: _.status,
                        errors: _.errors,
                        did: "number" == typeof _.did || "string" == typeof _.did ? `${_.did}` : void 0,
                        duration: _.duration,
                        attrs: {
                            release: _.release,
                            environment: _.environment,
                            ip_address: _.ipAddress,
                            user_agent: _.userAgent
                        }
                    })
                }(T)
            };
            return _ && A(T, _),
            T
        }
        function A(_, m={}) {
            if (m.user && (!_.ipAddress && m.user.ip_address && (_.ipAddress = m.user.ip_address),
            !_.did && !m.did && (_.did = m.user.id || m.user.email || m.user.username)),
            _.timestamp = m.timestamp || (0,
            v.ph)(),
            m.ignoreDuration && (_.ignoreDuration = m.ignoreDuration),
            m.sid && (_.sid = 32 === m.sid.length ? m.sid : (0,
            F.DM)()),
            void 0 !== m.init && (_.init = m.init),
            !_.did && m.did && (_.did = `${m.did}`),
            "number" == typeof m.started && (_.started = m.started),
            _.ignoreDuration)
                _.duration = void 0;
            else if ("number" == typeof m.duration)
                _.duration = m.duration;
            else {
                const T = _.timestamp - _.started;
                _.duration = T >= 0 ? T : 0
            }
            m.release && (_.release = m.release),
            m.environment && (_.environment = m.environment),
            !_.ipAddress && m.ipAddress && (_.ipAddress = m.ipAddress),
            !_.userAgent && m.userAgent && (_.userAgent = m.userAgent),
            "number" == typeof m.errors && (_.errors = m.errors),
            m.status && (_.status = m.status)
        }
        function j(_, m) {
            let T = {};
            m ? T = {
                status: m
            } : "ok" === _.status && (T = {
                status: "exited"
            }),
            A(_, T)
        }
    }
    ,
    439: (G, Q, E) => {
        E.d(Q, {
            T: () => jd,
            l: () => Bd
        });
        var v = E(981)
          , F = E(103)
          , k = E(10)
          , V = E(406)
          , A = E(47)
          , j = E(378)
          , O = E(474);
        const _ = (0,
        O.Rf)();
        function h(b) {
            return b && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(b.toString())
        }
        const $ = (0,
        O.Rf)()
          , Z = {}
          , R = {};
        function y(b) {
            if (!R[b])
                switch (R[b] = !0,
                b) {
                case "console":
                    !function X() {
                        "console"in $ && v.RU.forEach(function(b) {
                            b in $.console && (0,
                            A.hl)($.console, b, function(K) {
                                return function(...Y) {
                                    B("console", {
                                        args: Y,
                                        level: b
                                    }),
                                    K && K.apply($.console, Y)
                                }
                            })
                        })
                    }();
                    break;
                case "dom":
                    !function La() {
                        if (!("document"in $))
                            return;
                        const b = B.bind(null, "dom")
                          , K = jo(b, !0);
                        $.document.addEventListener("click", K, !1),
                        $.document.addEventListener("keypress", K, !1),
                        ["EventTarget", "Node"].forEach(Y => {
                            const ie = $[Y] && $[Y].prototype;
                            !ie || !ie.hasOwnProperty || !ie.hasOwnProperty("addEventListener") || ((0,
                            A.hl)(ie, "addEventListener", function(Fe) {
                                return function(Ne, Le, lt) {
                                    if ("click" === Ne || "keypress" == Ne)
                                        try {
                                            const $t = this
                                              , It = $t.__sentry_instrumentation_handlers__ = $t.__sentry_instrumentation_handlers__ || {}
                                              , cn = It[Ne] = It[Ne] || {
                                                refCount: 0
                                            };
                                            if (!cn.handler) {
                                                const un = jo(b);
                                                cn.handler = un,
                                                Fe.call(this, Ne, un, lt)
                                            }
                                            cn.refCount++
                                        } catch {}
                                    return Fe.call(this, Ne, Le, lt)
                                }
                            }),
                            (0,
                            A.hl)(ie, "removeEventListener", function(Fe) {
                                return function(Ne, Le, lt) {
                                    if ("click" === Ne || "keypress" == Ne)
                                        try {
                                            const $t = this
                                              , It = $t.__sentry_instrumentation_handlers__ || {}
                                              , cn = It[Ne];
                                            cn && (cn.refCount--,
                                            cn.refCount <= 0 && (Fe.call(this, Ne, cn.handler, lt),
                                            cn.handler = void 0,
                                            delete It[Ne]),
                                            0 === Object.keys(It).length && delete $t.__sentry_instrumentation_handlers__)
                                        } catch {}
                                    return Fe.call(this, Ne, Le, lt)
                                }
                            }))
                        }
                        )
                    }();
                    break;
                case "xhr":
                    !function wt() {
                        if (!("XMLHttpRequest"in $))
                            return;
                        const b = XMLHttpRequest.prototype;
                        (0,
                        A.hl)(b, "open", function(K) {
                            return function(...Y) {
                                const ie = Y[1]
                                  , Fe = this.__sentry_xhr__ = {
                                    method: (0,
                                    F.HD)(Y[0]) ? Y[0].toUpperCase() : Y[0],
                                    url: Y[1]
                                };
                                (0,
                                F.HD)(ie) && "POST" === Fe.method && ie.match(/sentry_key/) && (this.__sentry_own_request__ = !0);
                                const Ne = () => {
                                    const Le = this.__sentry_xhr__;
                                    if (Le && 4 === this.readyState) {
                                        try {
                                            Le.status_code = this.status
                                        } catch {}
                                        B("xhr", {
                                            args: Y,
                                            endTimestamp: Date.now(),
                                            startTimestamp: Date.now(),
                                            xhr: this
                                        })
                                    }
                                }
                                ;
                                return "onreadystatechange"in this && "function" == typeof this.onreadystatechange ? (0,
                                A.hl)(this, "onreadystatechange", function(Le) {
                                    return function(...lt) {
                                        return Ne(),
                                        Le.apply(this, lt)
                                    }
                                }) : this.addEventListener("readystatechange", Ne),
                                K.apply(this, Y)
                            }
                        }),
                        (0,
                        A.hl)(b, "send", function(K) {
                            return function(...Y) {
                                return this.__sentry_xhr__ && void 0 !== Y[0] && (this.__sentry_xhr__.body = Y[0]),
                                B("xhr", {
                                    args: Y,
                                    startTimestamp: Date.now(),
                                    xhr: this
                                }),
                                K.apply(this, Y)
                            }
                        })
                    }();
                    break;
                case "fetch":
                    !function le() {
                        (function S() {
                            if (!function L() {
                                if (!("fetch"in _))
                                    return !1;
                                try {
                                    return new Headers,
                                    new Request("http://www.example.com"),
                                    new Response,
                                    !0
                                } catch {
                                    return !1
                                }
                            }())
                                return !1;
                            if (h(_.fetch))
                                return !0;
                            let b = !1;
                            const K = _.document;
                            if (K && "function" == typeof K.createElement)
                                try {
                                    const Y = K.createElement("iframe");
                                    Y.hidden = !0,
                                    K.head.appendChild(Y),
                                    Y.contentWindow && Y.contentWindow.fetch && (b = h(Y.contentWindow.fetch)),
                                    K.head.removeChild(Y)
                                } catch (Y) {
                                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", Y)
                                }
                            return b
                        }
                        )() && (0,
                        A.hl)($, "fetch", function(b) {
                            return function(...K) {
                                const Y = {
                                    args: K,
                                    fetchData: {
                                        method: ot(K),
                                        url: Je(K)
                                    },
                                    startTimestamp: Date.now()
                                };
                                return B("fetch", {
                                    ...Y
                                }),
                                b.apply($, K).then(ie => (B("fetch", {
                                    ...Y,
                                    endTimestamp: Date.now(),
                                    response: ie
                                }),
                                ie), ie => {
                                    throw B("fetch", {
                                        ...Y,
                                        endTimestamp: Date.now(),
                                        error: ie
                                    }),
                                    ie
                                }
                                )
                            }
                        })
                    }();
                    break;
                case "history":
                    !function Tt() {
                        if (!function I() {
                            const b = _.chrome;
                            return !(b && b.app && b.app.runtime || !("history"in _) || !_.history.pushState || !_.history.replaceState)
                        }())
                            return;
                        const b = $.onpopstate;
                        function K(Y) {
                            return function(...ie) {
                                const Fe = ie.length > 2 ? ie[2] : void 0;
                                if (Fe) {
                                    const Ne = Xe
                                      , Le = String(Fe);
                                    Xe = Le,
                                    B("history", {
                                        from: Ne,
                                        to: Le
                                    })
                                }
                                return Y.apply(this, ie)
                            }
                        }
                        $.onpopstate = function(...Y) {
                            const ie = $.location.href
                              , Fe = Xe;
                            if (Xe = ie,
                            B("history", {
                                from: Fe,
                                to: ie
                            }),
                            b)
                                try {
                                    return b.apply(this, Y)
                                } catch {}
                        }
                        ,
                        (0,
                        A.hl)($.history, "pushState", K),
                        (0,
                        A.hl)($.history, "replaceState", K)
                    }();
                    break;
                case "error":
                    !function Uo() {
                        or = $.onerror,
                        $.onerror = function(b, K, Y, ie, Fe) {
                            return B("error", {
                                column: ie,
                                error: Fe,
                                line: Y,
                                msg: b,
                                url: K
                            }),
                            !!or && or.apply(this, arguments)
                        }
                    }();
                    break;
                case "unhandledrejection":
                    !function sr() {
                        Ti = $.onunhandledrejection,
                        $.onunhandledrejection = function(b) {
                            return B("unhandledrejection", b),
                            !Ti || Ti.apply(this, arguments)
                        }
                    }();
                    break;
                default:
                    return void ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.warn("unknown instrumentation type:", b))
                }
        }
        function x(b, K) {
            Z[b] = Z[b] || [],
            Z[b].push(K),
            y(b)
        }
        function B(b, K) {
            if (b && Z[b])
                for (const Y of Z[b] || [])
                    try {
                        Y(K)
                    } catch (ie) {
                        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.error(`Error while triggering instrumentation handler.\nType: ${b}\nName: ${(0,
                        j.$P)(Y)}\nError:`, ie)
                    }
        }
        function ot(b=[]) {
            return "Request"in $ && (0,
            F.V9)(b[0], Request) && b[0].method ? String(b[0].method).toUpperCase() : b[1] && b[1].method ? String(b[1].method).toUpperCase() : "GET"
        }
        function Je(b=[]) {
            return "string" == typeof b[0] ? b[0] : "Request"in $ && (0,
            F.V9)(b[0], Request) ? b[0].url : String(b[0])
        }
        let Xe;
        const ir = 1e3;
        let st, et;
        function jo(b, K=!1) {
            return Y => {
                if (!Y || et === Y || function Fa(b) {
                    if ("keypress" !== b.type)
                        return !1;
                    try {
                        const K = b.target;
                        if (!K || !K.tagName)
                            return !0;
                        if ("INPUT" === K.tagName || "TEXTAREA" === K.tagName || K.isContentEditable)
                            return !1
                    } catch {}
                    return !0
                }(Y))
                    return;
                const ie = "keypress" === Y.type ? "input" : Y.type;
                (void 0 === st || function Bo(b, K) {
                    if (!b || b.type !== K.type)
                        return !0;
                    try {
                        if (b.target !== K.target)
                            return !0
                    } catch {}
                    return !1
                }(et, Y)) && (b({
                    event: Y,
                    name: ie,
                    global: K
                }),
                et = Y),
                clearTimeout(st),
                st = $.setTimeout( () => {
                    st = void 0
                }
                , ir)
            }
        }
        let or = null
          , Ti = null;
        var Ir = E(888);
        let $o = !1;
        function ar() {
            const b = (0,
            Ir.x1)();
            if (b) {
                const K = "internal_error";
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.log(`[Tracing] Transaction: ${K} -> Global error occured`),
                b.setStatus(K)
            }
        }
        ar.tag = "sentry_tracingErrorCallback";
        var xd = E(31)
          , Ho = E(404);
        function kd() {
            const K = this.getScope().getSpan();
            return K ? {
                "sentry-trace": K.toTraceparent()
            } : {}
        }
        function ja(b, K, Y) {
            if (!(0,
            V.z)(K))
                return b.sampled = !1,
                b;
            if (void 0 !== b.sampled)
                return b.setMetadata({
                    sampleRate: Number(b.sampled)
                }),
                b;
            let ie;
            return "function" == typeof K.tracesSampler ? (ie = K.tracesSampler(Y),
            b.setMetadata({
                sampleRate: Number(ie)
            })) : void 0 !== Y.parentSampled ? ie = Y.parentSampled : typeof K.tracesSampleRate < "u" ? (ie = K.tracesSampleRate,
            b.setMetadata({
                sampleRate: Number(ie)
            })) : (ie = 1,
            b.setMetadata({
                sampleRate: ie
            })),
            function Fd(b) {
                return (0,
                F.i2)(b) || "number" != typeof b && "boolean" != typeof b ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(b)} of type ${JSON.stringify(typeof b)}.`),
                !1) : !(b < 0 || b > 1) || ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${b}.`),
                !1)
            }(ie) ? ie ? (b.sampled = Math.random() < ie,
            b.sampled ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.log(`[Tracing] starting ${b.op} transaction - ${b.name}`),
            b) : ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(ie)})`),
            b)) : ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.log("[Tracing] Discarding transaction because " + ("function" == typeof K.tracesSampler ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0")),
            b.sampled = !1,
            b) : ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.warn("[Tracing] Discarding transaction because of invalid sample rate."),
            b.sampled = !1,
            b)
        }
        function Ld(b, K) {
            const Y = this.getClient()
              , ie = Y && Y.getOptions() || {}
              , Fe = ie.instrumenter || "sentry"
              , Ne = b.instrumenter || "sentry";
            Fe !== Ne && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.error(`A transaction was started with instrumenter=\`${Ne}\`, but the SDK is configured with the \`${Fe}\` instrumenter.\nThe transaction will not be sampled. Please use the ${Fe} instrumentation to start transactions.`),
            b.sampled = !1);
            let Le = new Ho.Y(b,this);
            return Le = ja(Le, ie, {
                parentSampled: b.parentSampled,
                transactionContext: b,
                ...K
            }),
            Le.sampled && Le.initSpanRecorder(ie._experiments && ie._experiments.maxSpans),
            Y && Y.emit && Y.emit("startTransaction", Le),
            Le
        }
        function Bd(b, K, Y, ie, Fe, Ne, Le) {
            const lt = b.getClient()
              , $t = lt && lt.getOptions() || {};
            let It = new xd.io(K,b,Y,ie,Le,Fe);
            return It = ja(It, $t, {
                parentSampled: K.parentSampled,
                transactionContext: K,
                ...Ne
            }),
            It.sampled && It.initSpanRecorder($t._experiments && $t._experiments.maxSpans),
            lt && lt.emit && lt.emit("startTransaction", It),
            It
        }
        function jd() {
            const b = (0,
            k.cu)();
            b.__SENTRY__ && (b.__SENTRY__.extensions = b.__SENTRY__.extensions || {},
            b.__SENTRY__.extensions.startTransaction || (b.__SENTRY__.extensions.startTransaction = Ld),
            b.__SENTRY__.extensions.traceHeaders || (b.__SENTRY__.extensions.traceHeaders = kd),
            function Ba() {
                $o || ($o = !0,
                x("error", ar),
                x("unhandledrejection", ar))
            }())
        }
    }
    ,
    31: (G, Q, E) => {
        E.d(Q, {
            AT: () => A,
            io: () => m
        });
        var v = E(966)
          , F = E(981)
          , k = E(717)
          , V = E(404);
        const A = {
            idleTimeout: 1e3,
            finalTimeout: 3e4,
            heartbeatInterval: 5e3
        }
          , O = ["heartbeatFailed", "idleTimeout", "documentHidden", "finalTimeout", "externalFinish", "cancelled"];
        class _ extends k.gB {
            constructor(L, h, S, M) {
                super(M),
                this._pushActivity = L,
                this._popActivity = h,
                this.transactionSpanId = S
            }
            add(L) {
                L.spanId !== this.transactionSpanId && (L.finish = h => {
                    L.endTimestamp = "number" == typeof h ? h : (0,
                    v._I)(),
                    this._popActivity(L.spanId)
                }
                ,
                void 0 === L.endTimestamp && this._pushActivity(L.spanId)),
                super.add(L)
            }
        }
        class m extends V.Y {
            __init() {
                this.activities = {}
            }
            __init2() {
                this._heartbeatCounter = 0
            }
            __init3() {
                this._finished = !1
            }
            __init4() {
                this._idleTimeoutCanceledPermanently = !1
            }
            __init5() {
                this._beforeFinishCallbacks = []
            }
            __init6() {
                this._finishReason = O[4]
            }
            constructor(L, h, S=A.idleTimeout, M=A.finalTimeout, U=A.heartbeatInterval, I=!1) {
                super(L, h),
                this._idleHub = h,
                this._idleTimeout = S,
                this._finalTimeout = M,
                this._heartbeatInterval = U,
                this._onScope = I,
                m.prototype.__init.call(this),
                m.prototype.__init2.call(this),
                m.prototype.__init3.call(this),
                m.prototype.__init4.call(this),
                m.prototype.__init5.call(this),
                m.prototype.__init6.call(this),
                I && (T(h),
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log(`Setting idle transaction on scope. Span ID: ${this.spanId}`),
                h.configureScope($ => $.setSpan(this))),
                this._restartIdleTimeout(),
                setTimeout( () => {
                    this._finished || (this.setStatus("deadline_exceeded"),
                    this._finishReason = O[3],
                    this.finish())
                }
                , this._finalTimeout)
            }
            finish(L=(0,
            v._I)()) {
                if (this._finished = !0,
                this.activities = {},
                "ui.action.click" === this.op && this.setTag("finishReason", this._finishReason),
                this.spanRecorder) {
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log("[Tracing] finishing IdleTransaction", new Date(1e3 * L).toISOString(), this.op);
                    for (const h of this._beforeFinishCallbacks)
                        h(this, L);
                    this.spanRecorder.spans = this.spanRecorder.spans.filter(h => {
                        if (h.spanId === this.spanId)
                            return !0;
                        h.endTimestamp || (h.endTimestamp = L,
                        h.setStatus("cancelled"),
                        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(h, void 0, 2)));
                        const S = h.startTimestamp < L;
                        return S || (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log("[Tracing] discarding Span since it happened after Transaction was finished", JSON.stringify(h, void 0, 2)),
                        S
                    }
                    ),
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log("[Tracing] flushing IdleTransaction")
                } else
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log("[Tracing] No active IdleTransaction");
                return this._onScope && T(this._idleHub),
                super.finish(L)
            }
            registerBeforeFinishCallback(L) {
                this._beforeFinishCallbacks.push(L)
            }
            initSpanRecorder(L) {
                this.spanRecorder || (this.spanRecorder = new _(M => {
                    this._finished || this._pushActivity(M)
                }
                ,M => {
                    this._finished || this._popActivity(M)
                }
                ,this.spanId,L),
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log("Starting heartbeat"),
                this._pingHeartbeat()),
                this.spanRecorder.add(this)
            }
            cancelIdleTimeout(L, {restartOnChildSpanChange: h}={
                restartOnChildSpanChange: !0
            }) {
                this._idleTimeoutCanceledPermanently = !1 === h,
                this._idleTimeoutID && (clearTimeout(this._idleTimeoutID),
                this._idleTimeoutID = void 0,
                0 === Object.keys(this.activities).length && this._idleTimeoutCanceledPermanently && (this._finishReason = O[5],
                this.finish(L)))
            }
            _restartIdleTimeout(L) {
                this.cancelIdleTimeout(),
                this._idleTimeoutID = setTimeout( () => {
                    !this._finished && 0 === Object.keys(this.activities).length && (this._finishReason = O[1],
                    this.finish(L))
                }
                , this._idleTimeout)
            }
            _pushActivity(L) {
                this.cancelIdleTimeout(void 0, {
                    restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently
                }),
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log(`[Tracing] pushActivity: ${L}`),
                this.activities[L] = !0,
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log("[Tracing] new activities count", Object.keys(this.activities).length)
            }
            _popActivity(L) {
                if (this.activities[L] && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log(`[Tracing] popActivity ${L}`),
                delete this.activities[L],
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log("[Tracing] new activities count", Object.keys(this.activities).length)),
                0 === Object.keys(this.activities).length) {
                    const h = (0,
                    v._I)();
                    this._idleTimeoutCanceledPermanently ? (this._finishReason = O[5],
                    this.finish(h)) : this._restartIdleTimeout(h + this._idleTimeout / 1e3)
                }
            }
            _beat() {
                if (this._finished)
                    return;
                const L = Object.keys(this.activities).join("");
                L === this._prevHeartbeatString ? this._heartbeatCounter++ : this._heartbeatCounter = 1,
                this._prevHeartbeatString = L,
                this._heartbeatCounter >= 3 ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log("[Tracing] Transaction finished because of no change for 3 heart beats"),
                this.setStatus("deadline_exceeded"),
                this._finishReason = O[0],
                this.finish()) : this._pingHeartbeat()
            }
            _pingHeartbeat() {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && F.kg.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`),
                setTimeout( () => {
                    this._beat()
                }
                , this._heartbeatInterval)
            }
        }
        function T(q) {
            const L = q.getScope();
            L.getTransaction() && L.setSpan(void 0)
        }
    }
    ,
    717: (G, Q, E) => {
        E.d(Q, {
            Dr: () => j,
            gB: () => A
        });
        var v = E(76)
          , F = E(966)
          , k = E(981)
          , V = E(47);
        class A {
            __init() {
                this.spans = []
            }
            constructor(m=1e3) {
                A.prototype.__init.call(this),
                this._maxlen = m
            }
            add(m) {
                this.spans.length > this._maxlen ? m.spanRecorder = void 0 : this.spans.push(m)
            }
        }
        class j {
            __init2() {
                this.traceId = (0,
                v.DM)()
            }
            __init3() {
                this.spanId = (0,
                v.DM)().substring(16)
            }
            __init4() {
                this.startTimestamp = (0,
                F._I)()
            }
            __init5() {
                this.tags = {}
            }
            __init6() {
                this.data = {}
            }
            __init7() {
                this.instrumenter = "sentry"
            }
            constructor(m) {
                if (j.prototype.__init2.call(this),
                j.prototype.__init3.call(this),
                j.prototype.__init4.call(this),
                j.prototype.__init5.call(this),
                j.prototype.__init6.call(this),
                j.prototype.__init7.call(this),
                !m)
                    return this;
                m.traceId && (this.traceId = m.traceId),
                m.spanId && (this.spanId = m.spanId),
                m.parentSpanId && (this.parentSpanId = m.parentSpanId),
                "sampled"in m && (this.sampled = m.sampled),
                m.op && (this.op = m.op),
                m.description && (this.description = m.description),
                m.data && (this.data = m.data),
                m.tags && (this.tags = m.tags),
                m.status && (this.status = m.status),
                m.startTimestamp && (this.startTimestamp = m.startTimestamp),
                m.endTimestamp && (this.endTimestamp = m.endTimestamp),
                m.instrumenter && (this.instrumenter = m.instrumenter)
            }
            startChild(m) {
                const T = new j({
                    ...m,
                    parentSpanId: this.spanId,
                    sampled: this.sampled,
                    traceId: this.traceId
                });
                if (T.spanRecorder = this.spanRecorder,
                T.spanRecorder && T.spanRecorder.add(T),
                T.transaction = this.transaction,
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && T.transaction) {
                    const S = `[Tracing] Starting '${m && m.op || "< unknown op >"}' span on transaction '${T.transaction.name || "< unknown name >"}' (${T.transaction.spanId}).`;
                    T.transaction.metadata.spanMetadata[T.spanId] = {
                        logMessage: S
                    },
                    k.kg.log(S)
                }
                return T
            }
            setTag(m, T) {
                return this.tags = {
                    ...this.tags,
                    [m]: T
                },
                this
            }
            setData(m, T) {
                return this.data = {
                    ...this.data,
                    [m]: T
                },
                this
            }
            setStatus(m) {
                return this.status = m,
                this
            }
            setHttpStatus(m) {
                this.setTag("http.status_code", String(m));
                const T = function O(_) {
                    if (_ < 400 && _ >= 100)
                        return "ok";
                    if (_ >= 400 && _ < 500)
                        switch (_) {
                        case 401:
                            return "unauthenticated";
                        case 403:
                            return "permission_denied";
                        case 404:
                            return "not_found";
                        case 409:
                            return "already_exists";
                        case 413:
                            return "failed_precondition";
                        case 429:
                            return "resource_exhausted";
                        default:
                            return "invalid_argument"
                        }
                    if (_ >= 500 && _ < 600)
                        switch (_) {
                        case 501:
                            return "unimplemented";
                        case 503:
                            return "unavailable";
                        case 504:
                            return "deadline_exceeded";
                        default:
                            return "internal_error"
                        }
                    return "unknown_error"
                }(m);
                return "unknown_error" !== T && this.setStatus(T),
                this
            }
            isSuccess() {
                return "ok" === this.status
            }
            finish(m) {
                if ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && this.transaction && this.transaction.spanId !== this.spanId) {
                    const {logMessage: T} = this.transaction.metadata.spanMetadata[this.spanId];
                    T && k.kg.log(T.replace("Starting", "Finishing"))
                }
                this.endTimestamp = "number" == typeof m ? m : (0,
                F._I)()
            }
            toTraceparent() {
                let m = "";
                return void 0 !== this.sampled && (m = this.sampled ? "-1" : "-0"),
                `${this.traceId}-${this.spanId}${m}`
            }
            toContext() {
                return (0,
                V.Jr)({
                    data: this.data,
                    description: this.description,
                    endTimestamp: this.endTimestamp,
                    op: this.op,
                    parentSpanId: this.parentSpanId,
                    sampled: this.sampled,
                    spanId: this.spanId,
                    startTimestamp: this.startTimestamp,
                    status: this.status,
                    tags: this.tags,
                    traceId: this.traceId
                })
            }
            updateWithContext(m) {
                return this.data = m.data || {},
                this.description = m.description,
                this.endTimestamp = m.endTimestamp,
                this.op = m.op,
                this.parentSpanId = m.parentSpanId,
                this.sampled = m.sampled,
                this.spanId = m.spanId || this.spanId,
                this.startTimestamp = m.startTimestamp || this.startTimestamp,
                this.status = m.status,
                this.tags = m.tags || {},
                this.traceId = m.traceId || this.traceId,
                this
            }
            getTraceContext() {
                return (0,
                V.Jr)({
                    data: Object.keys(this.data).length > 0 ? this.data : void 0,
                    description: this.description,
                    op: this.op,
                    parent_span_id: this.parentSpanId,
                    span_id: this.spanId,
                    status: this.status,
                    tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
                    trace_id: this.traceId
                })
            }
            toJSON() {
                return (0,
                V.Jr)({
                    data: Object.keys(this.data).length > 0 ? this.data : void 0,
                    description: this.description,
                    op: this.op,
                    parent_span_id: this.parentSpanId,
                    span_id: this.spanId,
                    start_timestamp: this.startTimestamp,
                    status: this.status,
                    tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
                    timestamp: this.endTimestamp,
                    trace_id: this.traceId
                })
            }
        }
    }
    ,
    404: (G, Q, E) => {
        E.d(Q, {
            Y: () => j
        });
        var v = E(981)
          , F = E(47)
          , k = E(291)
          , V = E(10)
          , A = E(717);
        class j extends A.Dr {
            __init() {
                this._measurements = {}
            }
            __init2() {
                this._contexts = {}
            }
            __init3() {
                this._frozenDynamicSamplingContext = void 0
            }
            constructor(_, m) {
                super(_),
                j.prototype.__init.call(this),
                j.prototype.__init2.call(this),
                j.prototype.__init3.call(this),
                this._hub = m || (0,
                V.Gd)(),
                this._name = _.name || "",
                this.metadata = {
                    source: "custom",
                    ..._.metadata,
                    spanMetadata: {}
                },
                this._trimEnd = _.trimEnd,
                this.transaction = this;
                const T = this.metadata.dynamicSamplingContext;
                T && (this._frozenDynamicSamplingContext = {
                    ...T
                })
            }
            get name() {
                return this._name
            }
            set name(_) {
                this.setName(_)
            }
            setName(_, m="custom") {
                this._name = _,
                this.metadata.source = m
            }
            initSpanRecorder(_=1e3) {
                this.spanRecorder || (this.spanRecorder = new A.gB(_)),
                this.spanRecorder.add(this)
            }
            setContext(_, m) {
                null === m ? delete this._contexts[_] : this._contexts[_] = m
            }
            setMeasurement(_, m, T="") {
                this._measurements[_] = {
                    value: m,
                    unit: T
                }
            }
            setMetadata(_) {
                this.metadata = {
                    ...this.metadata,
                    ..._
                }
            }
            finish(_) {
                if (void 0 !== this.endTimestamp)
                    return;
                this.name || ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),
                this.name = "<unlabeled transaction>"),
                super.finish(_);
                const m = this._hub.getClient();
                if (m && m.emit && m.emit("finishTransaction", this),
                !0 !== this.sampled)
                    return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."),
                    void (m && m.recordDroppedEvent("sample_rate", "transaction"));
                const T = this.spanRecorder ? this.spanRecorder.spans.filter(S => S !== this && S.endTimestamp) : [];
                this._trimEnd && T.length > 0 && (this.endTimestamp = T.reduce( (S, M) => S.endTimestamp && M.endTimestamp ? S.endTimestamp > M.endTimestamp ? S : M : S).endTimestamp);
                const q = this.metadata
                  , L = {
                    contexts: {
                        ...this._contexts,
                        trace: this.getTraceContext()
                    },
                    spans: T,
                    start_timestamp: this.startTimestamp,
                    tags: this.tags,
                    timestamp: this.endTimestamp,
                    transaction: this.name,
                    type: "transaction",
                    sdkProcessingMetadata: {
                        ...q,
                        dynamicSamplingContext: this.getDynamicSamplingContext()
                    },
                    ...q.source && {
                        transaction_info: {
                            source: q.source
                        }
                    }
                };
                return Object.keys(this._measurements).length > 0 && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2)),
                L.measurements = this._measurements),
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && v.kg.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`),
                this._hub.captureEvent(L)
            }
            toContext() {
                const _ = super.toContext();
                return (0,
                F.Jr)({
                    ..._,
                    name: this.name,
                    trimEnd: this._trimEnd
                })
            }
            updateWithContext(_) {
                return super.updateWithContext(_),
                this.name = _.name || "",
                this._trimEnd = _.trimEnd,
                this
            }
            getDynamicSamplingContext() {
                if (this._frozenDynamicSamplingContext)
                    return this._frozenDynamicSamplingContext;
                const _ = this._hub || (0,
                V.Gd)()
                  , m = _ && _.getClient();
                if (!m)
                    return {};
                const {environment: T, release: q} = m.getOptions() || {}
                  , {publicKey: L} = m.getDsn() || {}
                  , h = this.metadata.sampleRate
                  , S = void 0 !== h ? h.toString() : void 0
                  , {segment: M} = _.getScope().getUser() || {}
                  , U = this.metadata.source
                  , $ = (0,
                F.Jr)({
                    environment: T || k.J,
                    release: q,
                    transaction: U && "url" !== U ? this.name : void 0,
                    user_segment: M,
                    public_key: L,
                    trace_id: this.traceId,
                    sample_rate: S
                });
                return m.emit && m.emit("createDsc", $),
                $
            }
            setHub(_) {
                this._hub = _
            }
        }
    }
    ,
    888: (G, Q, E) => {
        E.d(Q, {
            x1: () => F
        });
        var v = E(10);
        function F(k) {
            return (k || (0,
            v.Gd)()).getScope().getTransaction()
        }
    }
    ,
    406: (G, Q, E) => {
        E.d(Q, {
            z: () => F
        });
        var v = E(10);
        function F(k) {
            if ("boolean" == typeof __SENTRY_TRACING__ && !__SENTRY_TRACING__)
                return !1;
            const V = (0,
            v.Gd)().getClient()
              , A = k || V && V.getOptions();
            return !!A && (A.enableTracing || "tracesSampleRate"in A || "tracesSampler"in A)
        }
    }
    ,
    103: (G, Q, E) => {
        E.d(Q, {
            Cy: () => S,
            HD: () => O,
            J8: () => h,
            Kj: () => L,
            PO: () => m,
            V9: () => U,
            VZ: () => F,
            cO: () => T,
            i2: () => M,
            kK: () => q,
            pt: () => _
        });
        const v = Object.prototype.toString;
        function F(I) {
            switch (v.call(I)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
                return !0;
            default:
                return U(I, Error)
            }
        }
        function k(I, $) {
            return v.call(I) === `[object ${$}]`
        }
        function O(I) {
            return k(I, "String")
        }
        function _(I) {
            return null === I || "object" != typeof I && "function" != typeof I
        }
        function m(I) {
            return k(I, "Object")
        }
        function T(I) {
            return typeof Event < "u" && U(I, Event)
        }
        function q(I) {
            return typeof Element < "u" && U(I, Element)
        }
        function L(I) {
            return k(I, "RegExp")
        }
        function h(I) {
            return Boolean(I && I.then && "function" == typeof I.then)
        }
        function S(I) {
            return m(I) && "nativeEvent"in I && "preventDefault"in I && "stopPropagation"in I
        }
        function M(I) {
            return "number" == typeof I && I != I
        }
        function U(I, $) {
            try {
                return I instanceof $
            } catch {
                return !1
            }
        }
    }
    ,
    981: (G, Q, E) => {
        E.d(Q, {
            Cf: () => V,
            RU: () => k,
            kg: () => j
        });
        var v = E(474);
        const F = "Sentry Logger "
          , k = ["debug", "info", "warn", "error", "log", "assert", "trace"];
        function V(O) {
            if (!("console"in v.n2))
                return O();
            const _ = v.n2.console
              , m = {};
            k.forEach(T => {
                const q = _[T] && _[T].__sentry_original__;
                T in _ && q && (m[T] = _[T],
                _[T] = q)
            }
            );
            try {
                return O()
            } finally {
                Object.keys(m).forEach(T => {
                    _[T] = m[T]
                }
                )
            }
        }
        function A() {
            let O = !1;
            const _ = {
                enable: () => {
                    O = !0
                }
                ,
                disable: () => {
                    O = !1
                }
            };
            return typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? k.forEach(m => {
                _[m] = (...T) => {
                    O && V( () => {
                        v.n2.console[m](`${F}[${m}]:`, ...T)
                    }
                    )
                }
            }
            ) : k.forEach(m => {
                _[m] = () => {}
            }
            ),
            _
        }
        let j;
        j = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__ ? (0,
        v.YO)("logger", A) : A()
    }
    ,
    76: (G, Q, E) => {
        E.d(Q, {
            DM: () => k,
            YO: () => q,
            jH: () => A,
            lE: () => L
        });
        var v = E(47)
          , F = E(474);
        function k() {
            const h = F.n2
              , S = h.crypto || h.msCrypto;
            if (S && S.randomUUID)
                return S.randomUUID().replace(/-/g, "");
            const M = S && S.getRandomValues ? () => S.getRandomValues(new Uint8Array(1))[0] : () => 16 * Math.random();
            return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, U => (U ^ (15 & M()) >> U / 4).toString(16))
        }
        function A(h) {
            const {message: S, event_id: M} = h;
            if (S)
                return S;
            const U = function V(h) {
                return h.exception && h.exception.values ? h.exception.values[0] : void 0
            }(h);
            return U ? U.type && U.value ? `${U.type}: ${U.value}` : U.type || U.value || M || "<unknown>" : M || "<unknown>"
        }
        function q(h) {
            if (h && h.__sentry_captured__)
                return !0;
            try {
                (0,
                v.xp)(h, "__sentry_captured__", !0)
            } catch {}
            return !1
        }
        function L(h) {
            return Array.isArray(h) ? h : [h]
        }
    }
    ,
    708: (G, Q, E) => {
        function k() {
            return !function v() {
                return typeof __SENTRY_BROWSER_BUNDLE__ < "u" && !!__SENTRY_BROWSER_BUNDLE__
            }() && "[object process]" === Object.prototype.toString.call(typeof process < "u" ? process : 0)
        }
        function V(j, O) {
            return j.require(O)
        }
        E.d(Q, {
            l$: () => V,
            KV: () => k
        }),
        G = E.hmd(G)
    }
    ,
    47: (G, Q, E) => {
        E.d(Q, {
            xp: () => T,
            Sh: () => S,
            Jr: () => $,
            hl: () => m,
            HK: () => L,
            _j: () => h
        });
        var v = E(103);
        (0,
        E(474).Rf)();
        const V = 80;
        function j(y, x) {
            const B = y
              , X = [];
            let le, ot, Je, wt, Xe;
            if (!B || !B.tagName)
                return "";
            X.push(B.tagName.toLowerCase());
            const Tt = x && x.length ? x.filter(st => B.getAttribute(st)).map(st => [st, B.getAttribute(st)]) : null;
            if (Tt && Tt.length)
                Tt.forEach(st => {
                    X.push(`[${st[0]}="${st[1]}"]`)
                }
                );
            else if (B.id && X.push(`#${B.id}`),
            le = B.className,
            le && (0,
            v.HD)(le))
                for (ot = le.split(/\s+/),
                Xe = 0; Xe < ot.length; Xe++)
                    X.push(`.${ot[Xe]}`);
            const ir = ["aria-label", "type", "name", "title", "alt"];
            for (Xe = 0; Xe < ir.length; Xe++)
                Je = ir[Xe],
                wt = B.getAttribute(Je),
                wt && X.push(`[${Je}="${wt}"]`);
            return X.join("")
        }
        function m(y, x, B) {
            if (!(x in y))
                return;
            const X = y[x]
              , le = B(X);
            if ("function" == typeof le)
                try {
                    !function q(y, x) {
                        y.prototype = x.prototype = x.prototype || {},
                        T(y, "__sentry_original__", x)
                    }(le, X)
                } catch {}
            y[x] = le
        }
        function T(y, x, B) {
            Object.defineProperty(y, x, {
                value: B,
                writable: !0,
                configurable: !0
            })
        }
        function L(y) {
            return y.__sentry_original__
        }
        function h(y) {
            return Object.keys(y).map(x => `${encodeURIComponent(x)}=${encodeURIComponent(y[x])}`).join("&")
        }
        function S(y) {
            if ((0,
            v.VZ)(y))
                return {
                    message: y.message,
                    name: y.name,
                    stack: y.stack,
                    ...U(y)
                };
            if ((0,
            v.cO)(y)) {
                const x = {
                    type: y.type,
                    target: M(y.target),
                    currentTarget: M(y.currentTarget),
                    ...U(y)
                };
                return typeof CustomEvent < "u" && (0,
                v.V9)(y, CustomEvent) && (x.detail = y.detail),
                x
            }
            return y
        }
        function M(y) {
            try {
                return (0,
                v.kK)(y) ? function A(y, x={}) {
                    try {
                        let B = y;
                        const X = 5
                          , le = [];
                        let ot = 0
                          , Je = 0;
                        const wt = " > "
                          , Xe = wt.length;
                        let Tt;
                        const ir = Array.isArray(x) ? x : x.keyAttrs
                          , st = !Array.isArray(x) && x.maxStringLength || V;
                        for (; B && ot++ < X && (Tt = j(B, ir),
                        !("html" === Tt || ot > 1 && Je + le.length * Xe + Tt.length >= st)); )
                            le.push(Tt),
                            Je += Tt.length,
                            B = B.parentNode;
                        return le.reverse().join(wt)
                    } catch {
                        return "<unknown>"
                    }
                }(y) : Object.prototype.toString.call(y)
            } catch {
                return "<unknown>"
            }
        }
        function U(y) {
            if ("object" == typeof y && null !== y) {
                const x = {};
                for (const B in y)
                    Object.prototype.hasOwnProperty.call(y, B) && (x[B] = y[B]);
                return x
            }
            return {}
        }
        function $(y) {
            return Z(y, new Map)
        }
        function Z(y, x) {
            if ((0,
            v.PO)(y)) {
                const B = x.get(y);
                if (void 0 !== B)
                    return B;
                const X = {};
                x.set(y, X);
                for (const le of Object.keys(y))
                    typeof y[le] < "u" && (X[le] = Z(y[le], x));
                return X
            }
            if (Array.isArray(y)) {
                const B = x.get(y);
                if (void 0 !== B)
                    return B;
                const X = [];
                return x.set(y, X),
                y.forEach(le => {
                    X.push(Z(le, x))
                }
                ),
                X
            }
            return y
        }
    }
    ,
    378: (G, Q, E) => {
        E.d(Q, {
            $P: () => O
        });
        const j = "<anonymous>";
        function O(T) {
            try {
                return T && "function" == typeof T && T.name || j
            } catch {
                return j
            }
        }
    }
    ,
    69: (G, Q, E) => {
        E.d(Q, {
            $2: () => V,
            WD: () => k,
            cW: () => A
        });
        var F, j, v = E(103);
        function k(j) {
            return new A(O => {
                O(j)
            }
            )
        }
        function V(j) {
            return new A( (O, _) => {
                _(j)
            }
            )
        }
        (j = F || (F = {}))[j.PENDING = 0] = "PENDING",
        j[j.RESOLVED = 1] = "RESOLVED",
        j[j.REJECTED = 2] = "REJECTED";
        class A {
            __init() {
                this._state = F.PENDING
            }
            __init2() {
                this._handlers = []
            }
            constructor(O) {
                A.prototype.__init.call(this),
                A.prototype.__init2.call(this),
                A.prototype.__init3.call(this),
                A.prototype.__init4.call(this),
                A.prototype.__init5.call(this),
                A.prototype.__init6.call(this);
                try {
                    O(this._resolve, this._reject)
                } catch (_) {
                    this._reject(_)
                }
            }
            then(O, _) {
                return new A( (m, T) => {
                    this._handlers.push([!1, q => {
                        if (O)
                            try {
                                m(O(q))
                            } catch (L) {
                                T(L)
                            }
                        else
                            m(q)
                    }
                    , q => {
                        if (_)
                            try {
                                m(_(q))
                            } catch (L) {
                                T(L)
                            }
                        else
                            T(q)
                    }
                    ]),
                    this._executeHandlers()
                }
                )
            }
            catch(O) {
                return this.then(_ => _, O)
            }
            finally(O) {
                return new A( (_, m) => {
                    let T, q;
                    return this.then(L => {
                        q = !1,
                        T = L,
                        O && O()
                    }
                    , L => {
                        q = !0,
                        T = L,
                        O && O()
                    }
                    ).then( () => {
                        q ? m(T) : _(T)
                    }
                    )
                }
                )
            }
            __init3() {
                this._resolve = O => {
                    this._setResult(F.RESOLVED, O)
                }
            }
            __init4() {
                this._reject = O => {
                    this._setResult(F.REJECTED, O)
                }
            }
            __init5() {
                this._setResult = (O, _) => {
                    if (this._state === F.PENDING) {
                        if ((0,
                        v.J8)(_))
                            return void _.then(this._resolve, this._reject);
                        this._state = O,
                        this._value = _,
                        this._executeHandlers()
                    }
                }
            }
            __init6() {
                this._executeHandlers = () => {
                    if (this._state === F.PENDING)
                        return;
                    const O = this._handlers.slice();
                    this._handlers = [],
                    O.forEach(_ => {
                        _[0] || (this._state === F.RESOLVED && _[1](this._value),
                        this._state === F.REJECTED && _[2](this._value),
                        _[0] = !0)
                    }
                    )
                }
            }
        }
    }
    ,
    966: (G, Q, E) => {
        E.d(Q, {
            _I: () => q,
            ph: () => T,
            yW: () => m
        });
        var v = E(708)
          , F = E(474);
        G = E.hmd(G);
        const k = (0,
        F.Rf)()
          , V = {
            nowSeconds: () => Date.now() / 1e3
        }
          , O = (0,
        v.KV)() ? function j() {
            try {
                return (0,
                v.l$)(G, "perf_hooks").performance
            } catch {
                return
            }
        }() : function A() {
            const {performance: M} = k;
            if (M && M.now)
                return {
                    now: () => M.now(),
                    timeOrigin: Date.now() - M.now()
                }
        }()
          , _ = void 0 === O ? V : {
            nowSeconds: () => (O.timeOrigin + O.now()) / 1e3
        }
          , m = V.nowSeconds.bind(V)
          , T = _.nowSeconds.bind(_)
          , q = T;
        let h;
        ( () => {
            const {performance: M} = k;
            if (!M || !M.now)
                return void (h = "none");
            const U = 36e5
              , I = M.now()
              , $ = Date.now()
              , Z = M.timeOrigin ? Math.abs(M.timeOrigin + I - $) : U
              , R = Z < U
              , y = M.timing && M.timing.navigationStart
              , B = "number" == typeof y ? Math.abs(y + I - $) : U;
            h = R || B < U ? Z <= B ? "timeOrigin" : "navigationStart" : "dateNow"
        }
        )()
    }
    ,
    474: (G, Q, E) => {
        function v(A) {
            return A && A.Math == Math ? A : void 0
        }
        E.d(Q, {
            Rf: () => k,
            YO: () => V,
            n2: () => F
        });
        const F = "object" == typeof globalThis && v(globalThis) || "object" == typeof window && v(window) || "object" == typeof self && v(self) || "object" == typeof global && v(global) || function() {
            return this
        }() || {};
        function k() {
            return F
        }
        function V(A, j, O) {
            const _ = O || F
              , m = _.__SENTRY__ = _.__SENTRY__ || {};
            return m[A] || (m[A] = j())
        }
    }
}, G => {
    G(G.s = 53)
}
]);
//# sourceMappingURL=main.80d1368fa125e4e0.js.map
