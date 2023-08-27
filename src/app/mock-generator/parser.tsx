import ArrayParser from "./array";
import BooleanParser from "./parsers/boolean";
import NumberParser from "./parsers/number";
import ObjectParser from "./object";
import { Param } from "./type";
import StringParser from "./parsers/string";

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
