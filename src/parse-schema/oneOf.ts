import { Intersection, Union } from "../meta-types";
import { Tail, Head, Get, HasKeyIn, Merge } from "../utils";

import { ParseSchema } from ".";
import { RemoveInvalidAdditionalItems } from "./utils";

export type ParseOneOfSchema<S> = Union<
  RecurseOnOneOfSchema<Get<S, "oneOf">, S>
>;

type RecurseOnOneOfSchema<S, P, R = never> = {
  stop: R;
  continue: S extends any[]
    ? RecurseOnOneOfSchema<
        Tail<S>,
        P,
        | R
        | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true
            ? Intersection<
                ParseSchema<Omit<P, "oneOf">>,
                ParseSchema<
                  Merge<
                    Omit<P, "oneOf">,
                    Merge<
                      {
                        properties: {};
                        additionalProperties: true;
                        required: [];
                      },
                      RemoveInvalidAdditionalItems<Head<S>>
                    >
                  >
                >
              >
            : ParseSchema<
                Merge<Omit<P, "oneOf">, RemoveInvalidAdditionalItems<Head<S>>>
              >)
      >
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
