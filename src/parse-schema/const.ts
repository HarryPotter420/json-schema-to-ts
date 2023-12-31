import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MultipleTypesSchema } from "./multipleTypes";
import type { SingleTypeSchema } from "./singleType";

export type ConstSchema = JSONSchema7 & { const: unknown };

export type ParseConstSchema<
  S extends ConstSchema,
  O extends ParseSchemaOptions,
> = S extends SingleTypeSchema
  ? IntersectConstAndTypeSchema<S, O>
  : S extends MultipleTypesSchema
  ? IntersectConstAndTypeSchema<S, O>
  : ParseConst<S>;

type IntersectConstAndTypeSchema<
  S extends ConstSchema & (SingleTypeSchema | MultipleTypesSchema),
  O extends ParseSchemaOptions,
  // TOIMPROVE: Directly use ParseMultipleTypeSchema and ParseSingleTypeSchema
> = M.$Intersect<ParseConst<S>, ParseSchema<Omit<S, "const">, O>>;

type ParseConst<S extends ConstSchema> = M.Const<S["const"]>;
