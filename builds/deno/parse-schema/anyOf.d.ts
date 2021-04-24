import { Intersection, Union } from "../meta-types/index.d.ts";
import { Tail, Head, Get, HasKeyIn, Merge } from "../utils/index.d.ts";
import { ParseSchema } from "./index.d.ts";
import { MergeSubSchema, RemoveInvalidAdditionalItems } from "./utils.d.ts";
export declare type ParseAnyOfSchema<S> = Union<RecurseOnAnyOfSchema<Get<S, "anyOf">, S>>;
declare type RecurseOnAnyOfSchema<S, P, R = never> = {
    stop: R;
    continue: S extends any[] ? RecurseOnAnyOfSchema<Tail<S>, P, R | (HasKeyIn<P, "enum" | "const" | "type"> extends true ? Intersection<ParseSchema<Omit<P, "anyOf">>, ParseSchema<MergeSubSchema<Omit<P, "anyOf">, Head<S>>>> : ParseSchema<Merge<Omit<P, "anyOf">, RemoveInvalidAdditionalItems<Head<S>>>>)> : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
export {};
