{
    "manifest_version": 2,
    "name": "Text and Image Highlight Saver",
    "version": "1.0",
    "description": "This extension allows users to save text and image highlights from web pages.",
    "permissions": ["activeTab"],
    "background": {
      "scripts": ["background.js"]
    },
    "content_scripts": [{
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }],
    "browser_action": {
      "default_icon": "icon.png",
      "default_title": "Save highlights"
    }
  }
  

//   Next, create a file called background.js in the same directory. This file will contain the code that runs in the background of the extension and handles the saving of highlights.

// In the background.js file, you can add code to listen for the browser action button to be clicked, and then send a message to the content script to retrieve the highlighted text or image. You can also add code to save the highlight to a storage area, such as local storage or a server.

// Create a file called content.js in the same directory. This file will contain the code that runs in the context of the web page and retrieves the highlighted text or image.

// In the content.js file, you can add code to listen for messages from the background script and retrieve the highlighted text or image using the window.getSelection function for text or the canvas element for images.

// Finally, create a file called icon.png in the same directory and use it as the default icon for the browser action button.

// To test your extension, go to the Chrome extensions page (chrome://extensions/) and enable "Developer mode". Then click "Load unpacked" and select the directory of your extension. The extension should now be installed and the browser action button should appear in the toolbar.

// BACKGROUND.JS
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
  });
  
  // This listens for the message from the content script and saves the highlight
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "save_highlight" ) {
        // Save the highlight to storage
        chrome.storage.local.set({"highlight": request.highlight}, function() {
          console.log("Highlight saved: " + request.highlight);
        });
      }
    }
  );
//   In this code, the chrome.browserAction.onClicked listener is triggered when the browser action button is clicked, and it sends a message to the active tab. The content script receives this message and retrieves the highlighted text or image. The highlight is then sent back to the background script through a message, which is handled by the chrome.runtime.onMessage listener. The highlight is then saved to storage using the chrome.storage.local.set function.
  

  // CONTENT.JS
//   Here is an example of the code you can use in the content.js file of your Chrome extension to retrieve the highlighted text or image:

  // Listen for messages from the background script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        // Retrieve the highlight
        var highlight = "";
        if (window.getSelection) {
          highlight = window.getSelection().toString();
        }
  
        // Send the highlight back to the background script
        chrome.runtime.sendMessage({"message": "save_highlight", "highlight": highlight});
      }
    }
  );
//   In this code, the chrome.runtime.onMessage listener is triggered when the background script sends a message to the content script. If the message is "clicked_browser_action", the content script retrieves the highlighted text using the window.getSelection function and sends it back to the background script through a message using the chrome.runtime.sendMessage function.

// To retrieve an image highlight, you can use the canvas element to draw the image onto a canvas, and then use the toDataURL function to get a data URL representation of the image. Here is an example of how you can do this:

// Select the image
var img = document.querySelector("img");

// Create a canvas element
var canvas = document.createElement("canvas");

// Draw the image onto the canvas
canvas.getContext("2d").drawImage(img, 0, 0);

// Get the data URL of the image
var dataURL = canvas.toDataURL();

// Send the data URL back to the background script
chrome.runtime.sendMessage({"message": "save_highlight", "highlight": dataURL});


// To show the saved text and image highlights in a new tab page along with the date and time and domain link, you can follow these steps:

// In the background.js file, add a listener for the chrome.tabs.onCreated event, which is triggered when a new tab is created. In the listener, you can retrieve the saved highlights from storage using the chrome.storage.local.get function and pass them to the new tab page through a message using the chrome.tabs.sendMessage function.

// In the newtab.html file, which is the HTML file for the new tab page, add a script tag to include the newtab.js file. This file will contain the code to receive the highlights and display them on the page.

// In the newtab.js file, add a listener for the chrome.runtime.onMessage event, which is triggered when the background script sends a message. In the listener, you can retrieve the highlights from the message and display them on the page using DOM manipulation.

// Here is an example of the code you can use in the background.js file to send the highlights to the new tab page:

chrome.tabs.onCreated.addListener(function(tab) {
    // Retrieve the saved highlights from storage
    chrome.storage.local.get(["highlights"], function(result) {
      // Send the highlights to the new tab page
      chrome.tabs.sendMessage(tab.id, {"message": "show_highlights", "highlights": result.highlights});
    });
  });
//   And here is an example of the code you can use in the newtab.js file to receive and display the highlights:
  // Listen for messages from the background script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "show_highlights" ) {
        // Loop through the highlights and display them on the page
        for (var i = 0; i < request.highlights.length; i++) {
          var highlight = request.highlights[i];
          if (highlight.type === "text") {
            // Create a div element to contain the text highlight
            var div = document.createElement("div");
            div.innerHTML = highlight.text;
  
            // Append the div to the page
            document.body.appendChild(div);
          } else if (highlight.type === "image") {
            // Create an img element to contain the image highlight
            var img = document.createElement("img");
            img.src = highlight.image;
  
            // Append the img to the page
            document.body.appendChild(img);
          }
        }
      }
    }
  );
  

//   Here is an example of an updated manifest.json file for a Chrome extension that allows users to save text and image highlights and displays them in a new tab page along with the date and time and domain link:
  {
    "manifest_version": 2,
    "name": "Text and Image Highlight Saver",
    "version": "1.0",
    "description": "This extension allows users to save text and image highlights from web pages and displays them in a new tab page along with the date and time and domain link.",
    "permissions": ["activeTab", "storage", "tabs"],
    "background": {
      "scripts": ["background.js"]
    },
    "content_scripts": [{
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }],
    "browser_action": {
      "default_icon": "icon.png",
      "default_title": "Save highlights"
    },
    "chrome_url_overrides": {
      "newtab": "newtab.html"
    }
  }
//   In this updated manifest.json file, the permissions field includes the storage and tabs permissions, which are needed to access the storage area and create new tabs. The chrome_url_overrides field specifies the newtab.html file as the HTML file for the new tab page.

//   Here is an example of the newtab.html file for a Chrome extension that displays saved text and image highlights in a new tab page:

  <!DOCTYPE html>
<html>
  <head>
    <title>Text and Image Highlight Saver</title>
  </head>
  <body>
    <script src="newtab.js"></script>
  </body>
</html>
// To include the date and time and domain name when saving the text or image highlights, you can follow these steps:

// In the content.js file, retrieve the date and time and domain name when the highlight is retrieved. You can use the Date object to get the current date and time, and the location object to get the domain name.

// Add the date and time and domain name as properties of the highlight object, along with the text or image data.

// In the background.js file, save the highlight object to storage instead of just the text or image data.

// Here is an example of the code you can use in the content.js file to include the date and time and domain name in the highlight object:

// Retrieve the highlight
var highlight = {};
if (window.getSelection) {
  highlight.text = window.getSelection().toString();
  highlight.type = "text";
} else {
  // Select the image
  var img = document.querySelector("img");

  // Create a canvas element
  var canvas = document.createElement("canvas");

  // Draw the image onto the canvas
  canvas.getContext("2d").drawImage(img, 0, 0);

  // Get the data URL of the image
  highlight.image = canvas.toDataURL();
  highlight.type = "image";
}

// Add the date and time and domain name to the highlight object
highlight.date = new Date();
highlight.domain = location.hostname;

// Send the highlight to the background script
chrome.runtime.sendMessage({"message": "save_highlight", "highlight": highlight});

// And here is an example of the code you can use in the background.js file to save the highlight object to storage:
// This listens for the message from the content script and saves the highlight
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "save_highlight" ) {
        // Save the highlight object to storage
        chrome.storage.local.set({"highlight": request.highlight}, function() {
          console.log("Highlight saved: " + request.highlight);
        });
      }
    }
  );
  
//   To add a download button for downloading the text highlights as text files and the image highlights as a zip file, you can follow these steps:

// In the newtab.js file, add a download button for each highlight. You can use the a element with the download attribute to create the download button.

// When the download button is clicked, create a text file or a zip file with the text or image data and use the URL.createObjectURL function to create a URL for the file.

// Set the href attribute of the a element to the URL of the file and use the click method to simulate a click on the element.

// Here is an example of the code you can use in the newtab.js file to add the download button and download the text highlights as text files:

// Loop through the highlights and display them on the page
for (var i = 0; i < request.highlights.length; i++) {
    var highlight = request.highlights[i];
    if (highlight.type === "text") {
      // Create a div element to contain the text highlight
      var div = document.createElement("div");
      div.innerHTML = highlight.text;
  
      // Create a download button
      var a = document.createElement("a");
      a.innerHTML = "Download";
      a.download = "highlight.txt";
  
      // Set the href attribute to a URL for the text file
      var blob = new Blob([highlight.text], {type: "text/plain"});
      a.href = URL.createObjectURL(blob);
  
      // Append the download button to the div
      div.appendChild(a);
  
      // Append the div to the page
      document.body.appendChild(div);
    } else if (highlight.type === "image") {
      // ...
    }
  }

//   To download the image highlights as a zip file, you can use a library like JSZip to create the zip file and add the images to it. Here is an example of how you can do this:
  // Loop through the highlights and display them on the page
for (var i = 0; i < request.highlights.length; i++) {
    var highlight = request.highlights[i];
    if (highlight.type === "text") {
      // ...
    } else if (highlight.type === "image") {
      // Create an img element to contain the image highlight
      var img = document.createElement("img");
      img.src = highlight.image;
  
      // Create a download button
      var a = document.createElement("a");
      a.innerHTML = "Download";
      a.download = "highlights.zip";
  
      // Add the image to a zip file using JSZip
      var zip = new JSZip();
      zip.file("image.png", highlight.image.split(',')[1], {base64: true});
      zip.generateAsync({type: "blob"}).then(function(content) {
        // Set the href attribute to a URL for the zip file
        a.href = URL.createObjectURL(content);
      });
  
      // Append the download button to the img
      img.appendChild(a);
  
      // App
//   To create a sync button for syncing the saved text and image highlights to Firebase, you can follow these steps:

// In the newtab.js file, add a sync button for the highlights.

// When the sync button is clicked, check if the user is logged in to Firebase. If not, prompt the user to log in. You can use the firebase.auth().currentUser property to check if the user is logged in, and the firebase.auth().signInWithPopup method to prompt the user to log in.

// Once the user is logged in, use the firebase.database().ref function to get a reference to the location in the database where you want to store the highlights, and use the set method to save the highlights to that location.

// Here is an example of the code you can use in the newtab.js file to add the sync button and sync the highlights to Firebase:

// Initialize Firebase
firebase.initializeApp({
    // Your Firebase config goes here
  });
  
  // Add the sync button
  var syncButton = document.createElement("button");
  syncButton.innerHTML = "Sync";
  document.body.appendChild(syncButton);
  
  // Listen for clicks on the sync button
  syncButton.addEventListener("click", function() {
    // Check if the user is logged in
    if (firebase.auth().currentUser) {
      // User is logged in, sync the highlights
      syncHighlights();
    } else {
      // User is not logged in, prompt them to log in
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function() {
        // User is logged in, sync the highlights
        syncHighlights();
      });
    }
  });
  
  function syncHighlights() {
    // Get a reference to the highlights location in the database
    var highlightsRef = firebase.database().ref("highlights");
  
    // Save the highlights to the database
    highlightsRef.set(request.highlights);
  }
  