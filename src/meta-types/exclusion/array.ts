import { A, B } from "ts-toolbelt";

import { Get, And, DoesExtend } from "../../utils";

import { MetaType, Never, Const, Error } from "..";
import { Arr, Values } from "../array";
import { Values as TupleValues, IsOpen, OpenProps } from "../tuple";

import { Exclude } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";
import { IsRepresentable } from "../utils";

export type ExcludeFromArray<Source, Excluded> = {
  any: Never;
  never: Source;
  const: Source;
  enum: Source;
  primitive: Source;
  array: ExcludeArrs<Source, Excluded>;
  tuple: And<
    DoesExtend<A.Equals<TupleValues<Excluded>, []>, B.True>,
    IsOpen<Excluded>
  > extends true
    ? ExcludeArrs<Source, Arr<OpenProps<Excluded>>>
    : Source;
  object: Source;
  union: ExcludeUnion<Source, Excluded>;
  intersection: ExcludeIntersection<Source, Excluded>;
  exclusion: ExcludeExclusion<Source, Excluded>;
  error: Excluded;
  errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends MetaType
  ? Get<Excluded, "type">
  : "errorTypeProperty"];

type ExcludeArrs<
  Source,
  Excluded,
  ExcludedValues = Exclude<Values<Source>, Values<Excluded>>
> = IsRepresentable<ExcludedValues> extends true ? Source : Const<[]>;
