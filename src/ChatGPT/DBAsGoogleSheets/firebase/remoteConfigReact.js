import React from "react";
import firebase from "firebase";

class App extends React.Component {
  state = {
    sampleText: "",
  };

  componentDidMount() {
    const config = {
      apiKey: "your-api-key",
      authDomain: "your-auth-domain",
      databaseURL: "your-database-url",
      projectId: "your-project-id",
      storageBucket: "your-storage-bucket",
      messagingSenderId: "your-messaging-sender-id",
    };

    firebase.initializeApp(config);

    firebase
      .remoteConfig()
      .fetch()
      .then(() => {
        firebase.remoteConfig().activate();
      });

    const sampleText = firebase
      .remoteConfig()
      .getValue("sample_text")
      .asString();
    this.setState({ sampleText });
  }

  render() {
    return <div>{this.state.sampleText}</div>;
  }
}

export default App;

// This code initializes Firebase in the componentDidMount lifecycle method, fetches and activates the Remote Config parameters, and retrieves the value of the sample_text parameter. The value of sample_text is then stored in the component's state and displayed in the render method.
