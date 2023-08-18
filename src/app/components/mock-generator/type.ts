export type Param =
  | { type: ObjectType; value: any; config: any }
  | ArrayParam
  | StringParam
  | NumberParam;

export type ObjectType = "boolean" | "object";

export type NumberParam =
  | {
      type: "number";
      value: number;
      config: {
        option: NumberOption.HARDCODED | NumberOption.TIMESTAMP;
      };
    }
  | {
      type: "number";
      value: number;
      config: {
        option: NumberOption.RANDOM_BETWEEN;
        start: number;
        end: number;
      };
    };

export enum NumberOption {
  HARDCODED = "HARDCODED",
  TIMESTAMP = "TIMESTAMP",
  RANDOM_BETWEEN = "RANDOM_BETWEEN",
}

export type ArrayParam = {
  type: "array";
  value: any;
  config: {
    size: number;
    rules: ArrayRule[];
  };
};

export const enum StringOption {
  HARDCODED = "HARDCODED",
  IMAGE = "IMAGE",
  RANDOM_CHARACTERS = "RANDOM_CHARACTERS",
  RANDOM_WITH_OPTION = "RANDOM_WITH_OPTION",
}

export type StringConfig =
  | { option: StringOption.HARDCODED | StringOption.IMAGE }
  | { option: StringOption.RANDOM_CHARACTERS; size: number }
  | { option: StringOption.RANDOM_WITH_OPTION; options: string[] };

export type StringParam = {
  type: "string";
  value: string;
  config: StringConfig;
};

export enum ArrayRuleCategory {
  TIME_SERIES = "TIME_SERIES",
  TOTAL = "TOTAL",
}

export type ArrayRule = ArrayRuleTimeSeries | ArrayRuleTotal;

export type ArrayRuleTimeSeries = {
  category: ArrayRuleCategory.TIME_SERIES;
  payload:
    | {
        path: string;
        startTimestamp: number;
        period: number;
      }
    | EmptyObj;
};

export type ArrayRuleTotal = {
  category: ArrayRuleCategory.TOTAL;
  payload:
    | {
        path: string;
        total: number;
      }
    | EmptyObj;
};

type EmptyObj = Record<PropertyKey, never>;
