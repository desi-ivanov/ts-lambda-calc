import { App, Func, Var } from "./Lang";

export type ParseFuncArg<S> = 
  S extends `.${infer Rest}` 
    ? ["", Rest]
    : S extends `${infer c}${infer Rest}` 
      ? ParseFuncArg<Rest> extends [infer cs, infer Remain]
        ? cs extends string 
          ? [`${c}${cs}`, Remain] 
          : never
        : never
      : never;

export type ParseBodyVar<S> = 
  S extends "" 
    ? ["", ""]
    : S extends `${infer c}${infer Rest}`
      ? c extends "(" | " " | ")" | "ƛ" | ""
        ? ["", S]
        : ParseBodyVar<Rest> extends [infer cs, infer Remain] 
          ?  cs extends string 
            ? [`${c}${cs}`, Remain]
            : never
          : never
      : never

export type ParseBody<S> =
  S extends `(${infer Rest}` 
    ? ParseBody<Rest> extends [infer M, infer Remain] 
      ? Remain extends `)${infer Rest2}`
        ? Rest2 extends ` ${infer Rest3}`
          ? ParseBody<Rest3> extends [infer N, infer Remain2]
            ? [App<M, N>, Remain2]
            : never
          : [M, Rest2]
        : never
      : never
  : S extends `ƛ${infer Rest}` 
    ? ParseFuncArg<Rest> extends [infer X, infer Remain] 
      ? X extends string 
        ? ParseBody<Remain> extends [infer Body, infer Remain2] ?  [Func<Body, X>, Remain2] : never
        : never
      : never 
  : ParseBodyVar<S> extends [infer Key, infer Rest]
    ? Key extends string 
      ? Rest extends ` ${infer Rest2}`
        ? ParseBody<Rest2> extends [infer N, infer Remain]
          ? [App<Var<Key>, N>, Remain]
          : never
      : [Var<Key>, Rest] 
    : never
  : never

export type Parse<S> = ParseBody<S> extends [infer M, infer Rest] ? Rest extends "" ? M : never : never
