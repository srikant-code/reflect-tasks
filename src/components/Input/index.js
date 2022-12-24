import CONSTANTS from "../../common/constants";
import CommonCSS from "../../css/common";

const Input = ({ style, ...props }) => {
  return (
    <input
      style={{
        ...CommonCSS.input,
        ...style,
      }}
      {...props}
    />
  );
};
export const TextArea = ({ style, rows = 4, ...props }) => {
  return (
    <textarea
      style={{
        ...CommonCSS.input,
        ...style,
      }}
      rows={rows}
      {...props}
    />
  );
};

export default Input;
