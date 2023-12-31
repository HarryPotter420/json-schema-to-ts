import type { A } from "ts-toolbelt";

import type { ExtendedJSONSchema, FromExtendedSchema } from "~/index";

type CustomProps = {
  numberType: "int" | "float" | "bigInt";
};

const bigIntSchema = {
  type: "number",
  numberType: "bigInt",
} as const;

type AssertExtends = A.Extends<
  typeof bigIntSchema,
  ExtendedJSONSchema<CustomProps>
>;
const assertExtends: AssertExtends = 1;
assertExtends;

const invalidSchema = {
  type: "number",
  numberType: "bigIntt",
} as const;

type AssertNotExtends = A.Extends<
  typeof invalidSchema,
  ExtendedJSONSchema<CustomProps>
>;
const assertNotExtends: AssertNotExtends = 0;
assertNotExtends;

type BigInt = FromExtendedSchema<
  CustomProps,
  typeof bigIntSchema,
  {
    deserialize: [
      {
        pattern: {
          type: "number";
          numberType: "bigInt";
        };
        output: bigint;
      },
    ];
  }
>;
type AssertBigInt = A.Equals<BigInt, bigint>;
const assertBigInt: AssertBigInt = 1;
assertBigInt;

const nestedSchema = {
  type: "object",
  properties: {
    nested: {
      numberType: "bigInt",
    },
  },
  required: ["nested"],
  additionalProperties: false,
} as const;

type NestedBigInt = FromExtendedSchema<
  CustomProps,
  typeof nestedSchema,
  {
    deserialize: [
      {
        pattern: {
          numberType: "bigInt";
        };
        output: bigint;
      },
    ];
  }
>;
type AssertNestedBigInt = A.Equals<NestedBigInt, { nested: bigint }>;
const assertNestedBigInt: AssertNestedBigInt = 1;
assertNestedBigInt;
