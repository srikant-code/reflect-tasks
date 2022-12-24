import CONSTANTS from "../../common/constants";

const Heading = ({ style, fontSize = 32, children, ...props }) => {
  return (
    <h1
      style={{ fontSize: CONSTANTS.TEXT.SIZES[fontSize], ...style }}
      {...props}
    >
      {children}
    </h1>
  );
};

export const P = ({ style, fontSize = 16, children, ...props }) => {
  return (
    <h1
      style={{ fontSize: CONSTANTS.TEXT.SIZES[fontSize], ...style }}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Heading;
