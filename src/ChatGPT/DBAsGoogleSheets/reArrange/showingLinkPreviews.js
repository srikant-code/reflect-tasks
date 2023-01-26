// Sure, here is a function that you can use to extract links from a string of text in JavaScript:

// Copy code
function extractLinks(text) {
  const linkRegex = /https?:\/\/[^\s]+/g;
  const links = text.match(linkRegex);
  return links || [];
}
// This function uses a regular expression to find all links in the text. It returns an array of links, or an empty array if no links are found.

// Here's an example of how you can use this function:

// Copy code
const text =
  "Here are some links: https://www.example.com, https://www.example.org";
const links = extractLinks(text);
console.log(links); // Output: ["https://www.example.com", "https://www.example.org"]

// Here is an example of how you could create a React component that displays a preview of a list of links:
import React, { useState } from "react";

function LinkPreview({ links }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  function showPreview(index) {
    setPreviewIndex(index);
    setPreviewVisible(true);
  }

  function hidePreview() {
    setPreviewVisible(false);
  }

  return (
    <div>
      {links.map((link, index) => (
        <div
          key={link}
          onMouseEnter={() => showPreview(index)}
          onMouseLeave={hidePreview}
        >
          {link}
        </div>
      ))}
      {previewVisible && (
        <div>
          <iframe src={links[previewIndex]} />
          <button onClick={hidePreview}>Close Preview</button>
        </div>
      )}
    </div>
  );
}

// Sure, here is an example of how you can create a React component that displays a preview of a list of links, without using an iframe. Instead, it fetches the preview information (title, description, image, and favicon) from the link's HTML <head> element using the fetch API and the Link header.
import React, { useState, useEffect } from "react";

function LinkPreview({ links }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    async function fetchPreviewData() {
      const response = await fetch(links[previewIndex], {
        method: "HEAD",
      });
      const linkHeader = response.headers.get("Link");
      if (linkHeader) {
        const previewLink = linkHeader.match(/<(.*?)>; rel="prerender"/)[1];
        const previewResponse = await fetch(previewLink);
        const previewText = await previewResponse.text();
        const parser = new DOMParser();
        const previewDoc = parser.parseFromString(previewText, "text/html");
        const title = previewDoc.querySelector("title").innerText;
        const description = previewDoc.querySelector(
          'meta[name="description"]'
        ).content;
        const image = previewDoc.querySelector(
          'meta[property="og:image"]'
        ).content;
        const favicon = previewDoc.querySelector('link[rel="icon"]').href;
        setPreviewData({ title, description, image, favicon });
      }
    }
    if (previewVisible) {
      fetchPreviewData();
    }
  }, [previewVisible, previewIndex, links]);

  function showPreview(index) {
    setPreviewIndex(index);
    setPreviewVisible(true);
  }

  function hidePreview() {
    setPreviewVisible(false);
  }

  return (
    <div>
      {links.map((link, index) => (
        <div
          key={link}
          onMouseEnter={() => showPreview(index)}
          onMouseLeave={hidePreview}
        >
          {link}
        </div>
      ))}
      {previewVisible && (
        <div>
          <div>
            <img src={previewData.favicon} alt="Favicon" />
            <h1>{previewData.title}</h1>
            <p>{previewData.description}</p>
            <img src={previewData.image} alt="Preview Image" />
          </div>
          <button onClick={hidePreview}>Close Preview</button>
        </div>
      )}
    </div>
  );
}

import LinkPreview from "./LinkPreview";

function App() {
  const links = ["https://www.example.com", "https://www.example.org"];

  return (
    <div>
      <LinkPreview links={links} />
    </div>
  );
}
