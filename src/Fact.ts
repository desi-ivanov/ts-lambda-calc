import { App, Func, Var } from "./Lang"
import { Parse } from "./Parser"

type TRUE = "(λx.(λy.x))"
type FALSE = "(λx.(λy.y))"
type IF = "(λz.z)"

type ZERO = "(λf.(λx.x))"
type SUCC = "(λa.(λf.(λx.(a f) (f x))))"
type ONE = "(λf.(λx.f x))"

type PAIR = `(λx.λy.λz.z x y)`
type FST = `(λp.p ${TRUE})`
type SND = `(λp.p ${FALSE})`
type NEXT = `(λp.${PAIR} (${SND} p) (${SUCC} (${SND} p)))`
type PRED = `(λa.${FST} (a ${NEXT} (${PAIR} ${ZERO} ${ZERO})))`

type ISZERO = `(λa.a (λx.${FALSE}) ${TRUE})`

type ADD = `(λa.(λb.(b (${SUCC} a))))`
type MUL = `(λm.λn.m (${ADD} n) ${ZERO})`


type FIX = "(λf.(λx.(f (x x))) (λx.(f (x x))))"
type FACT = `${FIX} (λf.λa.${IF} (${ISZERO} a) ${ONE} (${MUL} a (f (${PRED} a))))` // too hard to parse

type fix = Parse<FIX>
type if_ = Parse<IF>
type one = Parse<ONE>
type mul = Parse<MUL>
type fst = Parse<FST>
type next = Parse<NEXT>
type pred2 = Parse<`${PAIR} ${ZERO} ${ZERO}`>
type pred1 = App<fst, App<App<Var<'a'>, next>, pred2>>
type pred = Func<pred1, 'a'>
type r1 = App<Var<'f'>, App<pred, Var<'a'>>>
type r2 = App<App<mul, Var<"a">>, r1>
// (λf.λa.IF (ISZERO a) ONE (MUL a (f (PRED a))))
type aux = Func<
  Func<
    App<
        App<App<if_, Parse<`${ISZERO} a`>>,one>
        , r2
      >
  , "a">
, "f"> 


type fact = App<
  fix,
  aux
>
// Type instantiation is excessively deep and possibly infinite...
// type z = Eval<App<fact, one>> 
