import { type } from "os";

type isTwo<T> = T extends 2 ? true : false;

type one = isTwo<1>;
type two = isTwo<2>;

// type returnFunctionType<T extends (...args: any) => any> = T extends (
//   ...ards: any
// ) => infer R
//   ? R
//   : any;
type returnFunctionType<T extends (...args: any) => any> = T extends (
  ...ards: infer R
) => any
  ? R
  : any;
const aa = (a: string) => {
  return a;
};

type a = returnFunctionType<typeof aa>;

const sutdent = {
  name: "lili",
  class: 12,
};

function getPropValue<T extends object, Key extends keyof T>(obj: T, key: Key) {
  return obj[key];
}

const studentName = getPropValue(sutdent, "name");

type Tuple = [number, string];
interface IPerson {
  name: string;
  age: number;
}
class Person implements IPerson {
  name: string;
  age: number;
  constructor() {
    this.age = 12;
    this.name = "ww";
  }
}
const obj: IPerson = {
  name: "lili",
  age: 12,
};

interface SayHello {
  (name: string): string;
}
const fun: SayHello = (name: string) => {
  return "hello," + name;
};

interface PersonConstrutor {
  new (name: string, age: number): IPerson;
}
function createPerson(cto: PersonConstrutor) {
  return new cto("liu", 12);
}

enum Transpiler {
  Babel = "Babel",
  Postcss = "potcss",
  Terser = "terser",
  Prettier = "prettier",
  TypeScriptComiler = "tsc",
}
const transpiler = Transpiler.TypeScriptComiler;

// 获取元组的第一个元素
type First<T extends unknown[]> = T extends [infer T, ...infer R] ? T : never;
type res = First<[1, 2, 3]>;

type Union = 1 | 2 | 3;

type ObjType = { a: number } & { c: boolean };
type res2 = { a: number; c: boolean } extends ObjType ? true : false;

type res3 = "qqq" & 111;

type arr = ["", 2, 3];

type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;

type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
  ? Last
  : never;

type PopArr<T extends unknown[]> = T extends []
  ? []
  : T extends [...infer R, unknown]
  ? R
  : never;

type ShiftArr<T extends unknown[]> = T extends []
  ? []
  : T extends [unknown, ...infer R]
  ? R
  : never;

type arr4 = ShiftArr<arr>;

type StartsWith<T extends string, P extends string> = T extends `${P}${string}`
  ? true
  : false;

type RePlace<
  Str extends string,
  F extends string,
  To extends string
> = Str extends `${infer Prefix}${F}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;

type RePlaceResult = RePlace<"liu liu ", "?", "pp">;

type GetParameter<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;

type GetReturnType<Func extends Function> = Func extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never;

type GetReturnTyperResult = GetReturnType<
  (name: string, age: number) => string
>;

class Dong {
  name: string;

  constructor() {
    this.name = "liu";
  }

  hello(this: Dong) {
    console.log("你好，我是" + this.name);
  }
}
const dong = new Dong();
dong.hello();
// dong.hello().call({ xxx: 12 });

type GetThisParameterType<T> = T extends (
  this: infer ThisType,
  ...args: any[]
) => any
  ? ThisType
  : unknown;

// export default function App4() {
//   return <div>App4</div>;
// }

interface Person {
  name: string;
}

interface PersonConstructor {
  new (name: string): Person;
}

type GetInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer InstanceType
  ? InstanceType
  : any;

type GetInstanceTypeResult = GetInstanceType<PersonConstructor>;

type GetConstructorParameters<
  ConstructorType extends new (...args: any) => any
> = ConstructorType extends new (...args: infer ParametersType) => any
  ? ParametersType
  : never;

type GetConstructorParaRes = GetConstructorParameters<PersonConstructor>;

type GetRefProps<Props> = "ref" extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never;

type GetRefPropsRes = GetRefProps<{ ref?: 1; name: "liu" }>;

type Push<Arr extends unknown[], Ele> = [...Arr, Ele];

type PushRes = Push<arr, 9>;

type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];

type Zip<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>]
    : []
  : [];

type ZipRes = Zip<[1, 2, 3, 4, 5], ["one", "two", "three"]>;

type CapitalizeStr<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : Str;

type CapitalizeStrRes = CapitalizeStr<"liu">;

type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;

type CamelCaseRes = CamelCase<"dong_dong_dong_dong">;

type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
  : Str;

type DropSubStrRes = DropSubStr<"liu-sh-u-n-r-ui", "-">;

type AppendArgument<Func extends Function, Arg> = Func extends (
  ...arg: infer Args
) => infer ReturnType
  ? (...arg: [...Args, Arg]) => ReturnType
  : never;

type AppendArgumentRes = AppendArgument<
  (name: string, age: number) => any,
  boolean
>;

// type AddFuncArg<Func extends Function, Arg> = Func extends (
//   ...args: infer Args
// ) => infer ReturnType
//   ? (...args: [...Args, Arg]) => RePlaceResult
//   : never;

type Mapping<Obj extends object> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]];
};

type res4 = Mapping<obj>;

type UppercaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type UppercaseRes = UppercaseKey<obj>;

type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

type ToReadonlyRes = ToReadonly<obj>;

type ToPartial<T> = {
  [Key in keyof T]?: T[Key];
};

type ToPartialRes = ToPartial<obj>;

type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
type obj = {
  name: string;
  age: number;
};

type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};
type FilterByValueTypeRes = FilterByValueType<obj, string>;

type ReverseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest
]
  ? [...ReverseArr<Rest>, First]
  : Arr;

type ReverseArrRes = ReverseArr<[1, 2, 3, 4]>;

type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);
type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false;

type IncludesRes = Includes<[1, 2, 3, 4], 1>;

type RemoveItem<
  Arr extends unknown[],
  Item,
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item, Result>
    : RemoveItem<Rest, Item, [...Result, First]>
  : Result;

type RemoveItemRes = RemoveItem<[1, 2, 2, 1, 3], 1>;

type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceStr<Right, From, To>}`
  : Str;

type ReplaceStrRes = ReplaceStr<"我最好的朋友是谁,谁", "谁", "小李">;

type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;

type StringToUnionRes = StringToUnion<"liu">;

type ReverseStr<
  Str extends string,
  Res extends string = ""
> = Str extends `${infer First}${infer Rest}`
  ? ReverseStr<Rest, `${First}${Res}`>
  : Res;

type Add<Num1 extends number, Num2 extends number> = [
  ...BuildArray<Num1>,
  ...BuildArray<Num2>
]["length"];

type AddRes = Add<1, 2>;

type Subtract<
  Num1 extends number,
  Num2 extends number
> = BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
  ? Rest["length"]
  : never;

type SubtractRes = Subtract<5, 2>;

type Mutiply<
  Num1 extends number,
  Num2 extends number,
  ResArr extends unknown[] = []
> = Num2 extends 0
  ? ResArr["length"]
  : Mutiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResArr]>;

type MutiplyRes = Mutiply<2, 3>;

type Divide<
  Num1 extends number,
  Num2 extends number,
  ResArr extends unknown[] = []
> = Num1 extends 0
  ? ResArr["length"]
  : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...ResArr]>;

type DivideRes = Divide<30, 5>;

// type  StrLength=<
//   Srt extends string,
//   CountArr extends unknown[]=[]
// >=Str extends `${string}${infer Rest}`
//   ? StrLength<Rest,[...CountArr,unknown]>
//   :CountArr['length']

// 比大小,第一个数小返回false
type GreaterThan<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends Num2
  ? true
  : CountArr["length"] extends Num2
  ? true
  : CountArr["length"] extends Num1
  ? false
  : GreaterThan<Num1, Num2, [...CountArr, unknown]>;

type GreaterThanRes = GreaterThan<4, 4>;

// 数列
type FibonacciLoop<
  // 代表之前累加值的数组
  PreArr extends unknown[],
  // 当前数值的数组
  CurrentArr extends unknown[],
  // 记录index 从0开始递归
  IndexArr extends unknown[] = [],
  // 代表数列的第几位数
  Num extends number = 1
> = IndexArr["length"] extends Num
  ? CurrentArr["length"]
  : FibonacciLoop<
      CurrentArr,
      [...PreArr, ...CurrentArr],
      [...IndexArr, unknown],
      Num
    >;
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;

// 1,1,2,3,5,8,
type FibonacciR = Fibonacci<6>;

// 提取 大写 联合
type CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Item;

type CamelcaseUnionRes = CamelcaseUnion<"aa_aa_aa" | "bb_bb_bb">;

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

// 提取函数参数类型
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type ParametersRes = Parameters<(name: string, age: number) => {}>;

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer P
  ? P
  : never;
type ReturnTypeRes = ReturnType<() => { name: string; age: number }>;

//
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
interface PersonConstructor {
  new (name: string): Person;
}
type ConstructorParametersRes = ConstructorParameters<PersonConstrutor>;

//
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer P ? P : never;
type InstanceTypeRes = InstanceType<PersonConstructor>;

//
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown;

//
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;
function say(this: Person, age: number) {
  console.log("this:Person: ", this.name);
  return this.name + "" + age;
}
type OmitThisParameterRes = OmitThisParameter<typeof say>;

// 把索引变成可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type PartialRes = Partial<{ name: string }>;

// 去掉可选
type Required<T> = {
  [P in keyof T]-?: T[P];
};
type RequiredRes = Required<{ name?: string }>;

//
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
type ReadonlyRes = Readonly<{ name: string }>;

//实现过滤
type Pink<T, K extends keyof T> = {
  [P in K]: T[P];
};
type PinkRes = Pink<{ name: "liu"; age: 12; sex: 1 }, "age" | "name">;

//创建索引类型，传入key和值的类型
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// 取交集
type Extract<T, U> = T extends U ? T : never;

//
// type Omit<T extends keyof any> = Pink<T, Extract<keyof T, K>>;

//
type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? Awaited<V>
    : never
  : T;

//
type NonNullable<T> = T extends null | undefined ? never : T;
