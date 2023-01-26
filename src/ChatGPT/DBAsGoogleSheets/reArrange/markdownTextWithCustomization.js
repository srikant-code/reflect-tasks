// To create a React app that converts normal text to Markdown formatting, you will need to perform the following steps:

// Install the required dependencies by running the following command:

// npm install react react-dom marked
// Create a new React app using the create-react-app tool:

// npx create-react-app markdown-converter
// Navigate to the project directory and start the development server:

// cd markdown-converter
// npm start

import React, { useState } from "react";
import marked from "marked";

const MarkdownConverter = () => {
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState({
    backgroundColor: "#fafafa",
    color: "#333",
    fontSize: "16px",
    lineHeight: "1.5",
  });

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme({
      ...theme,
      [event.target.name]: event.target.value,
    });
  };

  const getMarkdownText = () => {
    const { backgroundColor, color, fontSize, lineHeight } = theme;
    return {
      __html: marked(input, {
        renderer: new marked.Renderer(),
        breaks: true,
        gfm: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        customStyles: `
          body {
            background-color: ${backgroundColor};
            color: ${color};
            font-size: ${fontSize};
            line-height: ${lineHeight};
          }
        `,
      }),
    };
  };

  return (
    <div>
      <form>
        <label>
          Background Color:
          <input
            type="color"
            name="backgroundColor"
            value={theme.backgroundColor}
            onChange={handleThemeChange}
          />
        </label>
        <br />
        <label>
          Text Color:
          <input
            type="color"
            name="color"
            value={theme.color}
            onChange={handleThemeChange}
          />
        </label>
        <br />
        <label>
          Font Size:
          <select
            name="fontSize"
            value={theme.fontSize}
            onChange={handleThemeChange}
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
        </label>
        <br />
        <label>
          Line Height:
          <select
            name="lineHeight"
            value={theme.lineHeight}
            onChange={handleThemeChange}
          >
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
          </select>
        </label>
      </form>
      <textarea onChange={handleChange}></textarea>
      <div dangerouslySetInnerHTML={getMarkdownText()} />
    </div>
  );
};
