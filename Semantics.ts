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
          Func<Subst<Subst<M1, Z, X>, N, Y>, Z> : never
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
  
  
export type ReduceStar<M> = Reduce<M> extends infer R ? Equal<M, R> extends true ? M : ReduceStar<R> : never
