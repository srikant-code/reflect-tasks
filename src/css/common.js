import CONSTANTS from "../common/constants";

const CommonCSS = {
  ellipses: {},
  box: {
    border: "solid",
    borderWidth: 1,
    borderColor: "grey",
    background: "white",
    borderRadius: 8,
    padding: 10,
    margin: 4,
  },
  flexRow: {
    display: "flex",
    flexFlow: "row wrap",
  },
  flexColumn: {
    display: "flex",
    flexFlow: "column wrap",
  },
  flexStart: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: CONSTANTS.SPACING[12],
    margin: CONSTANTS.SPACING[5],
    border: `1px solid grey`,
    borderRadius: CONSTANTS.SPACING[8],
    outline: "none",
    fontSize: CONSTANTS.TEXT.SIZES[16],
  },
};

export default CommonCSS;
