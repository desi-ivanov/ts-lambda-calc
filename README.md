# ts-lambda-calc
Lambda calculus at type-level with TypeScript.

The project includes:
- a parser which transforms raw strings representing lambda expressions into an ASTs
- an evaluator which reduces ASTs
- a stringifyier which transforms an AST back into a string

Try it out in the [TypeScript Playground](https://www.typescriptlang.org/play?#code/KYDwDg9gTgLgBDAnmYcBqBDKAeAGnUGYAOwBMBnOcmKAS2IHMA+OAXjgG8FlgAuOAEQA3LAIA0cEVH74AvgChQkWNxRwAYgFdiAY2wBZCfkIkKVGvWZtOqvoIBm2neLgAjCKUT9DkrDLgKStDwSGoAgmBgBhIAcizsXKF2AhiRLo663hJYDPwxAYrgwbZwAKIAjpoYADbYYRIAQvFwYQQgRGSUDXAA-HDdJp0tvQhQmqj89jXkE1PVM-KFyiE8cAAKWDMNHoiYOADKzfJwcPttHWYCAnDHJyMA2lcSVwC6tyf8Z4NmAAYAJBx6PZgFA4DpZACgSC4AAlYDUWQ-d53Po6c6mSgCAAU1wAPoICfiBABKPGCQDdwGSrsi7g8nqc3rTafwNlAtjs9tg4dQWN9KPcoaCdOQJILYcAALYYegvG5Mpl9MGUPnmOiMOXyhVwe7-DjggHCxESOFSmU0zX8YjAIQg83MuBWm1Qc2W622xZJdabYAAGVo1Gwh2sty+7QxcB+xMhxGBoIA+ojkX17vcXhJ9oy4J90UNqbTk6n05nsyqfnBo7HxQikfmvWzff6YFz4TAmLcS2Ghj8sRXodyYIna6z2Z5mzyc2YBTHodtPKLp6CTdLiJna0v6BPKJHe4uWwAmQeavrDhsB-t73mdyf3AB0d7FfuoabgYvXxD3q6P2vus8QEjvN6PjAz5vh+dpZg6brOvKrpOsisG2h8dYjrsWCBpeFz8mKuDzpWb6fn0xhXpQ1BqgwGpDt6QHNqaxAYeGKYAQ+jbPq+krLmBmoPPcnK4Ew-53kBIHsfQnFMgh0F3BJ7aQU6NzyJ66gQNUpAwhEYDkAY5BHLS+jKsR2pivosp9PoJwyXpm7akxC5wAAksQtAwLh0LGSM6nYEpKlqZEmkOU5-FwPoLDSQpqwnupmlBuwtwntRQYqlOlZ6S5u60QR2peapkVaYF+HwbJiF3EsxSeiev7oWwIZWT85I7nAuCyDe9VvoiFEjOVOw0cu9FDElM47Kl4q0R+7UnMmWi6Ngv5GHlInvrKLqFZJLLejlhyLEEKhld6lUxScnWjglBn9aCPhsU+7V9P2VlXGNIxmUtjrQgVz3OvIAD0H1ENQ5DyDoEDENQCAAIyfBYjC0PYiDYCe2ACPYcCI-YAgsCw1jYliyPEkjpL-YDwMwHu4NkVDMNwwjcBY7jqPNNiiPU-YxJ4wDQMhAAzCTlhk7Du0COS9g3li5IgELDMgHAIDMzjwui9TWIS1LzO0xjwuC1isti1TivS1TItawrkvS8r+NswgAAsXOQ9DvP1vDatC-r8s68zety+LRu6wAXir7CYwLQua87nsy07HtK97eMldtqzqGgBg6UFVmcthLCERq3hWZNehGXuQ18SMpQgDo1SaKQwCefH+gXrNGdJyqHm50NcQjHHBgXnA+Jt3EMlvZtRQx2oADiJAghgRAAKrEJoMykHgVmkZYEgAJrNERmFwMvIwj1aUDj8AU8z8Ac8-CAAKNT8K8hQ1-fLCU+yaK4AY+DEV9VScZkqintkF+nKpb30fI3gLJWUbrZfQIMhrVzTi0SIgZH7P0gXAV+m9AoPyfk2ausQr5tiQp-Ay2dsBGSQanXoyJ17hgAUFAqFChjdxgeaHeY9J7T1nvDEALg24QJYF3eOcRepmDFAALRGOBERKpF7qh6OBE4hD0EBnkZgpBnIhGBT4tg1BEhVEQT7lxJCujxIaCcPAjBBgkEoNXrNXuUEADct9SqrDhKQTQOgK7BXfvXAy39Ky-2oXgrOxjiH5xYOaPohCnEuLcSDNRuCIL4I3mA5KJDbItyTOKZxrizECMoGxUgoT0kBKmmKdQQ1V7gWusfSJJiAwlOQTgpaHknGxFiXg6xcF7GD1QKUEQtR3HsAiZk9xKpXyF0qDUaIsJsmjHGCMGEEFunjJhNfPu0cVhqH2BDBgPM+m3HieGbx0JfG4BASqQhTcXw-xCbWbsdUOCNWahwDZpMbbQNkMSGscTQFwKCRcysPdrk9keZs7Z0TZDliBc8mGcQ3kfNCp6PeAB3EG1gbmiylnARASJPRgG9KQZF7A4aIuiTcT01oahVCIHi6wCzag4vrHitsnpJFbPsLQY++LTjAptmS0u+8GUelWEI0oMIADyqsA6ayVgIMK6yJ4AGE5XiowI7dWTsMC4ypojCOeNPRhAACJ6pRcLZVwtXBC1cOC-Y8q5VgowNLJEMrUBexBBAawcMhWisZascgLi0QEt2lahVXq1CA1QP6u2upA02vBR6kViJg2oBgAi114aZjYEjdasFgKo1goBLGmFbZHVwERSKq01gnncxtqGlgX0qbGpVY7OWWJ1VM01SHV2DtJXSwFWoRFAAVZN5auUwyTRAGtH0qb3T0dO2kta9YmolU7ZtGrqbapxjImdei511vJAu1VTaW0yy1cbUO+6bwRw3ZuzUtbiSXqvUyItPKhEuqHZC7ANLsDOqgGO9GtbO36yVo+nppaw2crfR+6tv6J3-vdiHIDNQB0prA5WmGH7R1MCg3rM98tj3ds+hO9mcAADUcA9zWAAKxFrpbPN1u1dT6r1VmgEOaqbMczaxx57G83CrjbrbN7H+MKtzRwfNzMfgJuLRgBFJ5SCvpQ9gajx9x11vraawOFrVOLoPSu3Dxs4B2tdne+9W7oOaew8u1tq6T1TuM1ev9ZnG2B0PW2tdRnbPyns7uhtQcLNHvbaexza713uZC55vdjmNbOas3ptzIW7hhe80uqLumO1afPSe+DvLKVyetqhnpCncUYbgH+rTsGcNttXUF4kQA)!

## Examples
### Intro
When parsing the string `(??x.x) y`, 
- the parser produces `App<Func<Var<"x">, "x">, Var<"y">>`
- the evaluator derives `Var<"y">`
- the stringifier produces `y`:
```ts
import { Parse, } from "./Parser"
import { Eval, Stringify } from "./Semantics"
type raw = `(??x.x) y`
type parsed = Parse<raw> 
type evaluated = Eval<parsed>
type stringified = Stringify<evaluated>
```
### Arithmetics
The following example shows simple arithmetic operations with [Church Encoding](https://en.wikipedia.org/wiki/Church_encoding):

```ts
type ZERO = "(??f.(??x.x))"
type SUCC = "(??a.(??f.(??x.(a f) (f x))))"
type ADD = `(??a.(??b.(b ${SUCC} a)))`

type zero = Parse<ZERO>
type succ = Parse<SUCC>
type one = Parse<`${SUCC} ${ZERO}`>
type two = Parse<`${SUCC} (${SUCC} ${ZERO})`>

type rawOne = Stringify<one> // ((??a.(??f.(??x.((a f) (f x))))) (??f.(??x.x)))

type rawTwo = Stringify<two> // ( 
                             //  (??a.(??f.(??x.((a f) (f x))))) 
                             //   ((??a.(??f.(??x.((a f) (f x))))) (??f.(??x.x)))
                             // )

type evalZero = Stringify<Eval<zero>>  // (??f.(??x.x))
type evalOne = Stringify<Eval<one>>  // (??f.(??x.(f x)))
type evalTwo = Stringify<Eval<two>>  // (??f.(??x.(f (f x))))

// 3 + 2 = 5
type parsed = Parse<`${ADD} (${SUCC} (${SUCC} (${SUCC} ${ZERO}))) (${SUCC} (${SUCC} ${ZERO}))`>
type rawParsed = Stringify<parsed> // (((??a.(??b.((b (??a.(??f.(??x.((a f) (f x)))))) a))) 
                                   // ((??a.(??f.(??x.((a f) (f x))))) 
                                   //   ((??a.(??f.(??x.((a f) (f x)))))
                                   //     ((??a.(??f.(??x.((a f) (f x))))) 
                                   //       (??f.(??x.x)))))) 
                                   // ((??a.(??f.(??x.((a f) (f x))))) 
                                   //   ((??a.(??f.(??x.((a f) (f x))))) 
                                   //     (??f.(??x.x)))))

type evaluated = Stringify<Eval<parsed>> // (??f.(??xx.(f (f (f (f (f xx)))))))
```

## Factorial and limitations
There is an implementation of factorial in [Fact.ts](./Fact.ts), but unfortunately the compiler has hardcoded type-instantiation depth limits and fails with *Type instantiation is excessively deep and possibly infinite*.
