import { Equal } from "./Equality";
import { App, Func, Var } from "./Lang";

export type FV<M> = 
  M extends Var<infer X> ? X 
  : M extends Func<infer M2, infer X> ? Exclude<FV<M2>, X> 
  : M extends App<infer M2, infer N> ? FV<M2> | FV<N>
  : never

export type GenerateUnused<X extends string, Y> = X extends Y ? GenerateUnused<`x${X}`, Y> : X

export type Subst<M, N, Y> =
  M extends Var<infer X> ? X extends Y ? N : M
  : M extends App<infer M1, infer M2> ? App<Subst<M1, N, Y>, Subst<M2, N, Y>>
  : M extends Func<infer M1, infer X> ?
    X extends Y ? M
    : X extends FV<N> ? 
      GenerateUnused<"x", FV<M1> | FV<N>> extends infer Z ? 
        Z extends string ?
          Func<Subst<Subst<M1, Var<Z>, X>, N, Y>, Z> : never
          : never
      : Func<Subst<M1, N, Y>, X>
  : never;

  
export type Reduce<M> =
  M extends Var<infer X> ? M
  : M extends Func<infer M1, infer X> 
      ? Func<Reduce<M1>, X>
  : M extends App<infer M1, infer N> 
    ? Reduce<M1> extends infer Red
      ? Red extends Func<infer F, infer Y>
        ? Reduce<Subst<F, N, Y>>
      : App<Red, N>
    : M
  : never


export type Eval<M> = Reduce<M> extends infer R ? Equal<M, R> extends true ? R : Eval<R> : never



export type Stringify<M> =
  M extends Var<infer X> ? X
  : M extends Func<infer M2, infer X> 
    ? `(ƛ${X}.${Stringify<M2>})`
  : M extends App<infer M1, infer N>
    ? `(${Stringify<M1>} ${Stringify<N>})`
  : never

export type StringifyTabs<M, Tabs extends string = ""> =
  M extends Var<infer X> ? `\n${Tabs}${X}`
  : M extends Func<infer M2, infer X> 
    ? `\n${Tabs}(ƛ${X}.${StringifyTabs<M2, `${Tabs} `>})`
  : M extends App<infer M1, infer N>
    ? `\n${Tabs}(${StringifyTabs<M1, `${Tabs} `>} ${StringifyTabs<N, `${Tabs} `>})`
  : never