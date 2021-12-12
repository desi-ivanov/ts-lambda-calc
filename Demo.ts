import { App, Func, Var } from "./Lang"
import { Parse, ParseBodyVar } from "./Parser"
import { FV, ReduceStar, Subst } from "./Semantics"



type a = Subst<Func<Var<"x">, "y">, Var<"y">, "z"> 


type t1 = FV<Var<"x">>
type t2 = FV<Func<Var<"x">, "y">>
type t3 = FV<Func<Var<"y">, "y">> //never
type t4 = FV<App<Var<"x">, Var<"y">>>


type zzz = ReduceStar<App<Func<Var<"x">, "x">, Var<"y">>>

type a1 = ParseBodyVar<"aasd asdf">



type lam = Parse<"(ƛa.(ƛb.b) ((ƛb.b) 2)) 42">


type eval = ReduceStar<lam>


type fix = Parse<"(ƛf.(ƛx.(f (x x))) (ƛx.(f (x x))))">