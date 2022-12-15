type TupleToString<T, S extends string = ""> = T extends [infer head extends string, ...infer tail extends string[]]
  ? TupleToString<tail, `${S}${head}`>
  : S;

type UnionToFnInsertion<T> = (T extends any ? (arg: () => T) => any : never) extends (arg: infer P) => any ? P : never;

type UnionToTuple<T> = UnionToFnInsertion<T> extends () => infer R ? [...UnionToTuple<Exclude<T, R>>, R] : [];

type TupleOfLength<T extends string, L extends number, Arr extends any[] = []> = T extends `${infer F}${infer Rest}`
  ? [...Arr, F]["length"] extends L
    ? [...Arr, F]
    : TupleOfLength<Rest, L, [...Arr, F]>
  : [...Arr];

type TupleToUnion<T extends any[]> = T extends [infer F, ...infer Rest] ? F | TupleToUnion<Rest> : never;

type StrSplit<T extends string> = T extends `${infer R}${infer Rest}` ? [R, ...StrSplit<Rest>] : [];
type StringLen<T extends string> = StrSplit<T>["length"];

type FindLastUnique<S extends string, N extends number> = UnionToTuple<
  TupleToUnion<TupleOfLength<S, N>>
>["length"] extends N
  ? S
  : "not-found";

type FindUnique<
  input extends string,
  length extends number,
  set extends string = "",
> = input extends `${infer head}${infer tail}`
  ? TupleOfLength<set, length>["length"] extends length
    ? UnionToTuple<TupleToUnion<TupleOfLength<set, length>>>["length"] extends length
      ? set
      : set extends `${infer setHead}${infer setTail}`
      ? FindUnique<tail, length, `${setTail}${head}`>
      : never
    : FindUnique<tail, length, `${set}${head}`>
  : StringLen<set> extends length
  ? FindLastUnique<set, length>
  : "string-too-short";

type StringOfLength<length extends number, Arr extends string[] = []> = Arr["length"] extends length
  ? TupleToString<Arr>
  : StringOfLength<length, [...Arr, " "]>;

type FindIndex<input, length extends number, marker extends string> = input extends `${infer start}${marker}${string}`
  ? StringLen<`${StringOfLength<length>}${start}`>
  : never;

type exampleInput = "abcd";

type Marker = FindUnique<exampleInput, 4>;

type Test2 = FindIndex<exampleInput, 4, Marker>;
