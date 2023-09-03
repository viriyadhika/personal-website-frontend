import ArrayParser from "./nested-parsers/array";
import BooleanParser from "./basic-parsers/boolean";
import NumberParser from "./basic-parsers/number";
import ObjectParser from "./nested-parsers/object";
import { Param } from "./utils/type";
import StringParser from "./basic-parsers/string";

export default function Parser({
  param,
  depth,
  onChange,
}: {
  param: Param;
  depth: number;
  onChange: (param: Param) => void;
}) {
  if (param.type === "string") {
    return (
      <StringParser
        defaultOption={param.config.option}
        defaultValue={param.value}
        onChange={onChange}
      />
    );
  }

  if (param.type === "number") {
    return <NumberParser defaultValue={param.value} onChange={onChange} />;
  }

  if (param.type === "boolean") {
    return <BooleanParser bool={param.value} onChange={onChange} />;
  }

  if (param.type === "array") {
    return (
      <ArrayParser
        defaultArrayContent={param.value}
        defaultSize={param.config.size}
        onChange={onChange}
        depth={depth + 1}
      />
    );
  }

  return (
    <ObjectParser param={param.value} onChange={onChange} depth={depth + 1} />
  );
}
