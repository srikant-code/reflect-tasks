import CONSTANTS from "../common/constants";
import STRINGS from "../common/strings";
import Heading from "../components/Heading";
import { P } from "../components/Heading";
import Input, { TextArea } from "../components/Input";
import CommonCSS from "../css/common";

const Home = () => {
  return (
    <div
      style={{
        // ...CommonCSS.box,
        ...CommonCSS.flexColumn,
        ...CommonCSS.flexStart,
      }}
    >
      <Heading children={STRINGS.HOME.heading()} />
      <P
        children={STRINGS.HOME.subHeadingText}
        style={{ marginTop: -CONSTANTS.SPACING[8] }}
      />
      <div
        style={{
          ...CommonCSS.box,
          ...CommonCSS.flexColumn,
          ...CommonCSS.flexStart,
          width: "90%",
          height: 200,
        }}
      >
        <Input placeholder={"Enter the heading"} />
        <TextArea placeholder={"Enter the text"} />
      </div>
    </div>
  );
};

export default Home;
