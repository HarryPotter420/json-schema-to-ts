import { Get } from "../utils/index.d.ts";
import { MetaType } from "./index.d.ts";
import { IsEnumRepresentable } from "./enum.d.ts";
import { IsTupleRepresentable } from "./tuple.d.ts";
import { IsObjectRepresentable } from "./object.d.ts";
import { IsUnionRepresentable } from "./union.d.ts";
import { IsIntersectionRepresentable } from "./intersection/index.d.ts";
import { IsExclusionRepresentable } from "./exclusion/index.d.ts";
export declare type IsRepresentable<A> = {
    any: true;
    never: false;
    const: true;
    enum: IsEnumRepresentable<A>;
    primitive: true;
    array: true;
    tuple: IsTupleRepresentable<A>;
    object: IsObjectRepresentable<A>;
    union: IsUnionRepresentable<A>;
    intersection: IsIntersectionRepresentable<A>;
    exclusion: IsExclusionRepresentable<A>;
    error: false;
    errorMissingType: false;
}[Get<A, "type"> extends MetaType ? Get<A, "type"> : "errorMissingType"];
