import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  ArrayRule,
  ArrayRuleCategory,
  NumberOption,
  Param,
  StringOption,
} from "./type";

export function editArray<T>(array: T[], item: T, idx: number) {
  const starting = array.slice(0, idx);
  const end = array.slice(idx + 1);
  return [...starting, item, ...end];
}

export const dateManager = (function () {
  dayjs.extend(duration);
  return dayjs;
})();

export function formatDate(timestamp: number) {
  return dateManager.unix(timestamp).format("YYYY-MM-DD");
}

export function generateRandomNumber(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

function generateRandomCharacters(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function generateRandomStringWithOptions(options: string[]) {
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}

export function map(obj: any): Param {
  if (typeof obj === "string") {
    return {
      type: "string",
      value: obj,
      config: { option: StringOption.HARDCODED },
    };
  }

  if (typeof obj === "number") {
    return {
      type: "number",
      value: obj,
      config: {
        option: NumberOption.HARDCODED,
      },
    };
  }

  if (typeof obj === "boolean") {
    return { type: "boolean", value: obj, config: {} };
  }

  if (Array.isArray(obj)) {
    if (obj.length < 1) {
      throw "Can't parse when there is no content in the array!";
    }
    return {
      type: "array",
      value: map(obj[0]),
      config: { size: 1, rules: [] },
    };
  }

  return {
    type: "object",
    value: Object.fromEntries(
      Object.entries(obj).map(([key, value]: any) => {
        return [key, map(value)];
      })
    ),
    config: {},
  };
}

export function generate(obj: Param): any {
  if (obj.type === "string") {
    switch (obj.config.option) {
      case StringOption.RANDOM_CHARACTERS:
        return generateRandomCharacters(obj.config.size);
      case StringOption.RANDOM_WITH_OPTION:
        return generateRandomStringWithOptions(obj.config.options);
      case StringOption.IMAGE:
        return `https://picsum.photos/id/${generateRandomNumber(
          0,
          200
        )}/200/30`;
      default:
        return obj.value;
    }
  }

  if (obj.type === "number") {
    switch (obj.config.option) {
      case NumberOption.RANDOM_BETWEEN:
        return generateRandomNumber(obj.config.start, obj.config.end);
      case NumberOption.HARDCODED:
      case NumberOption.TIMESTAMP:
      default:
        obj.value;
    }
  }

  if (obj.type === "number" || obj.type === "boolean") {
    return obj.value;
  }

  if (obj.type === "array") {
    const temp = Array(obj.config.size)
      .fill(0)
      .map(() => generate(obj.value));

    return implementArrayRules(temp, obj.config.rules);
  }

  if (obj.type === "object") {
    return Object.fromEntries(
      Object.entries(obj.value).map(([key, value]: any) => {
        return [key, generate(value)];
      })
    );
  }
}

function implementArrayRules(initialArray: Array<any>, rules: ArrayRule[]) {
  rules.forEach((rule) => {
    implementRule(initialArray, rule);
  });

  return initialArray;
}

function implementRule(initialArray: Array<any>, rule: ArrayRule) {
  if (rule.category === ArrayRuleCategory.TIME_SERIES && rule.payload.path) {
    let runningTimestamp = rule.payload.startTimestamp;
    for (let item of initialArray) {
      mutatePath(item, rule.payload.path.split("."), runningTimestamp);
      runningTimestamp += rule.payload.period;
    }
  }
}

function mutatePath(object: any, paths: string[], newItem: number | string) {
  const [first, ...rest] = paths;
  if (rest.length === 0) {
    object[first] = newItem;
  } else {
    mutatePath(object[first], rest, newItem);
  }
}
