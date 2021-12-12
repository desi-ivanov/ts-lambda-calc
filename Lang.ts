export type Var<X extends string> = { type: "var", var: X }
export type Func<M, X extends string> = { type: "func", body: M, var: X }
export type App<M, N> = { type: "app", func: M, arg: N }


