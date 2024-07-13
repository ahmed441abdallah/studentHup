import * as React from "react";

export const EmailTemplate = ({ firstName }) => {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>
        We're glad to have you here. Click {""}
        <a href="https://drive.google.com/drive/folders/1-0Id4lPq9Pnd8c7wNYDokqBi-N-Drt4q">
          here
        </a>
        to get content.
      </p>
    </div>
  );
};
