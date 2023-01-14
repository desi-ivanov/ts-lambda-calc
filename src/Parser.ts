import { App, Func, Var } from "./Lang";
import { Stringify } from "./Semantics";

export type ParseBodyVar<S> = 
  S extends "" 
    ? ["", ""]
    : S extends `${infer c}${infer Rest}`
      ? c extends "(" | " " | ")" | "λ" | ""
        ? ["", S]
        : ParseBodyVar<Rest> extends [infer cs, infer Remain] 
          ?  cs extends string 
            ? [`${c}${cs}`, Remain]
            : never
          : never
      : never


type ParseList<S> = 
  S extends `)${infer _}`
    ? [[], S]
  : S extends ""
    ? [[], S]
  : S extends ` ${infer Rest}`
    ? ParseList<Rest>
  : S extends `(${infer Rest}`
    ? ParseBody<Rest> extends [infer Body, infer Remain]
      ? Remain extends `)${infer Rest2}`
        ? ParseList<Rest2> extends [[...infer List], infer Remain2]
          ? [[Body, ...List], Remain2]
        : never
      : never
    : never
  : ParseBodyVar<S> extends [infer X, infer Remain]
    ? X extends string 
      ? ParseList<Remain> extends [[...infer List], infer Remain2]
        ? [[Var<X>, ...List], Remain2]
      : never
    : never
  : never 

type FoldRApps<Ms> = 
    Ms extends [infer M] ? M  
  : Ms extends [...infer Init, infer M] ? App<FoldRApps<Init>, M> : never

type ParseApps<S> = 
  ParseList<S> extends [infer Ms, infer Remain]
    ? [FoldRApps<Ms>, Remain]
    : never
    
export type ParseBody<S> =
  S extends `λ${infer X}.${infer Remain}` 
    ? ParseBody<Remain> extends [infer Body, infer Remain2] 
      ? [Func<Body, X>, Remain2] 
      : never
  : ParseApps<S>

export type Parse<S> = 
  ParseBody<S> extends [infer M, infer Rest] 
    ? Rest extends "" 
      ? M 
      : never 
    : never

//tests
const t1: Stringify<Parse<"f f f"> >  = "((f f) f)"
const t2: Stringify<Parse<"f (f f)">> = "(f (f f))"
const t3: Stringify<Parse<"λf.(λx.(f (x x))) (λx.(f (x x)))">> = "(λf.((λx.(f (x x))) (λx.(f (x x)))))"
const t4: Stringify<Parse<"(λf.(λx.(f (x x))) (λx.(f (x x)))) z">> = "((λf.((λx.(f (x x))) (λx.(f (x x))))) z)"