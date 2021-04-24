import { Get } from "../../utils/index.d.ts";
import { MetaType, Never, Error } from "../index.d.ts";
import { ExcludeUnion } from "./union.d.ts";
import { ExcludeIntersection } from "./intersection.d.ts";
import { ExcludeExclusion } from "./exclusion.d.ts";
export declare type ExcludeFromAny<Source, Excluded> = {
    any: Never;
    never: Source;
    const: Source;
    enum: Source;
    primitive: Source;
    array: Source;
    tuple: Source;
    object: Source;
    union: ExcludeUnion<Source, Excluded>;
    intersection: ExcludeIntersection<Source, Excluded>;
    exclusion: ExcludeExclusion<Source, Excluded>;
    error: Excluded;
    errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends MetaType ? Get<Excluded, "type"> : "errorTypeProperty"];
