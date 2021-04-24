import { Intersection, Union } from "../meta-types/index.d.ts";
import { Tail, Head, Get, HasKeyIn, Merge } from "../utils/index.d.ts";
import { ParseSchema } from "./index.d.ts";
import { MergeSubSchema, RemoveInvalidAdditionalItems } from "./utils.d.ts";
export declare type ParseOneOfSchema<S> = Union<RecurseOnOneOfSchema<Get<S, "oneOf">, S>>;
declare type RecurseOnOneOfSchema<S, P, R = never> = {
    stop: R;
    continue: S extends any[] ? RecurseOnOneOfSchema<Tail<S>, P, R | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true ? Intersection<ParseSchema<Omit<P, "oneOf">>, ParseSchema<MergeSubSchema<Omit<P, "oneOf">, Head<S>>>> : ParseSchema<Merge<Omit<P, "oneOf">, RemoveInvalidAdditionalItems<Head<S>>>>)> : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
export {};
