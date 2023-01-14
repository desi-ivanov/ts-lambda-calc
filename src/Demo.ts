import { Parse, } from "./Parser"
import { Eval, Stringify, } from "./Semantics"

type ZERO = "(λf.(λx.x))"
type SUCC = "(λa.(λf.(λx.(a f) (f x))))"
type ADD = `(λa.(λb.(b ${SUCC} a)))`

type zero = Parse<ZERO>
type succ = Parse<SUCC>
type one = Parse<`${SUCC} ${ZERO}`>
type two = Parse<`${SUCC} (${SUCC} ${ZERO})`>

type rawOne = Stringify<one> // ((λa.(λf.(λx.((a f) (f x))))) (λf.(λx.x)))

type rawTwo = Stringify<two> // ( 
                             //  (λa.(λf.(λx.((a f) (f x))))) 
                             //   ((λa.(λf.(λx.((a f) (f x))))) (λf.(λx.x)))
                             // )
                             
type evalZero = Stringify<Eval<zero>>  // (λf.(λx.x))
type evalOne = Stringify<Eval<one>>  // (λf.(λx.(f x)))
type evalTwo = Stringify<Eval<two>>  // (λf.(λx.(f (f x))))

// 3 + 2 = 5
type parsed = Parse<`${ADD} (${SUCC} (${SUCC} (${SUCC} ${ZERO}))) (${SUCC} (${SUCC} ${ZERO}))`>
type rawParsed = Stringify<parsed> // (((λa.(λb.((b (λa.(λf.(λx.((a f) (f x)))))) a))) 
                                   //     ((λa.(λf.(λx.((a f) (f x))))) 
                                   //     ((λa.(λf.(λx.((a f) (f x)))))
                                   //     ((λa.(λf.(λx.((a f) (f x))))) (λf.(λx.x)))))) 
                                   //     ((λa.(λf.(λx.((a f) (f x))))) 
                                   //     ((λa.(λf.(λx.((a f) (f x))))) (λf.(λx.x)))))
type evaluated = Stringify<Eval<parsed>> // (λf.(λxx.(f (f (f (f (f xx)))))))