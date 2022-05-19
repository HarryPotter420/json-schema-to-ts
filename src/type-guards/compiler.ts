import {
  FromSchema,
  JSONSchema,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "../index";

export type $Compiler = (schema: JSONSchema) => (data: unknown) => boolean;

export type Compiler<O extends FromSchemaOptions = FromSchemaDefaultOptions> = <
  S extends JSONSchema,
  T = FromSchema<S, O>
>(
  schema: S
) => (data: unknown) => data is T;

type CompilerWrapper = <O extends FromSchemaOptions = FromSchemaDefaultOptions>(
  compiler: $Compiler
) => Compiler<O>;

export const wrapCompilerAsTypeGuard: CompilerWrapper =
  <O extends FromSchemaOptions = FromSchemaDefaultOptions>(
    compiler: $Compiler
  ) =>
  <S extends JSONSchema, T = FromSchema<S, O>>(schema: S) => {
    const validator = compiler(schema);
    return (data: unknown): data is T => validator(data);
  };
