<div class="markdown prose w-full break-words dark:prose-invert light">
  <p>
    To create a contact us form in React that stores the form data in a Google
    Sheet, you will need to perform the following steps:
  </p>
  <ol>
    <li>Set up a Google Sheet to store the form data:</li>
  </ol>
  <ul>
    <li>Create a new Google Sheet and give it a name.</li>
    <li>
      Add a row for each field that you want to include in your form (e.g. name,
      email, message).
    </li>
  </ul>
  <ol start="2">
    <li>Set up a Google API key:</li>
  </ol>
  <ul>
    <li>
      Go to the Google Cloud Console (
      <a href="https://console.cloud.google.com/" target="_new">
        https://console.cloud.google.com/
      </a>
      ).
    </li>
    <li>
      Click the project drop-down and select or create the project that you want
      to use for this tutorial.
    </li>
    <li>
      Click the hamburger menu and select APIs &amp; Services &gt; Credentials.
    </li>
    <li>On the Credentials page, click Create credentials &gt; API key.</li>
    <li>The API key created dialog displays your newly created API key.</li>
    <li>Click Close.</li>
    <li>The new API key is listed on the Credentials page under API keys.</li>
    <li>
      To restrict the API key for use only with your React app, click the Edit
      button for the API key, navigate to the Key restriction section, and set
      Application restrictions to HTTP referrers.
    </li>
    <li>
      Add the Referrers. The referrers are the domains that you want to allow to
      use the API key.
    </li>
  </ul>
  <ol start="3">
    <li>Create a React form component:</li>
  </ol>
  <ul>
    <li>In your React app, create a new component for the form.</li>
    <li>
      Add form fields for each of the columns in your Google Sheet (e.g. name,
      email, message).
    </li>
    <li>Add a submit button to the form.</li>
  </ul>
  <ol start="4">
    <li>Add form validation:</li>
  </ol>
  <ul>
    <li>
      Add validation to the form fields to ensure that the user has entered
      valid data (e.g. a valid email address).
    </li>
    <li>
      Display error messages to the user if any of the fields are invalid.
    </li>
  </ul>
  <ol start="5">
    <li>Send the form data to the Google Sheet:</li>
  </ol>
  <ul>
    <li>
      When the user submits the form, send an HTTP POST request to the Google
      Sheets API to add a new row to the sheet with the form data.
    </li>
    <li>
      Use the API key that you created in step 2 to authenticate the request.
    </li>
  </ul>
  <ol start="6">
    <li>Display a confirmation message to the user:</li>
  </ol>
  <ul>
    <li>
      After the form data has been successfully sent to the Google Sheet,
      display a confirmation message to the user to let them know that their
      message has been received.
    </li>
  </ul>
  <p>I hope this helps! Let me know if you have any questions.</p>
</div>;

// React Code
import React, { useState } from "react";
import axios from "axios";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.name) {
      formIsValid = false;
      errors.name = "Name is required";
    }

    if (!formData.email) {
      formIsValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors.email = "Email is invalid";
    }

    if (!formData.message) {
      formIsValid = false;
      errors.message = "Message is required";
    }

    setFormError(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      axios
        .post(
          "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append",
          {
            values: [[formData.name, formData.email, formData.message]],
            insertDataOption: "INSERT_ROWS",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer YOUR_API_KEY",
            },
          }
        )
        .then((response) => {
          setIsSubmitting(false);
          setFormSuccess("Your message has been received!");
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          setFormError({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formSuccess && <p className="success-message">{formSuccess}</p>}
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {formError.name && <p className="error-message">{formError.name}</p>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {formError.email && <p className="error-message">{formError.email}</p>}
      <label htmlFor="message">Message:</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
      {formError.message && (
        <p className="error-message">{formError.message}</p>
      )}
      <button type="submit" disabled={isSubmitting}>
        Send
      </button>
    </form>
  );
}
// This component renders a form with fields for the user's name, email, and message, as well as a submit button. When the user submits the form, the handleSubmit function is called, which sends an HTTP POST request to the Google Sheets API to add a new row to the sheet with the form data. If the form is invalid, error messages are displayed to the user. If the form is valid and the request to the API is successful, a success message is displayed to the user.
