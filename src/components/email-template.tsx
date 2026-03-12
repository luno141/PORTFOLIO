import * as React from "react";
interface EmailTemplateProps {
  fullName: string;
  email: string;
  focus?: string;
  message: string;
}
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  focus,
  message,
}) => (
  <div>
    <h1>New portfolio inquiry</h1>
    <p>
      <strong>From:</strong> {fullName}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    {focus ? (
      <p>
        <strong>Focus:</strong> {focus}
      </p>
    ) : null}
    <blockquote>{message}</blockquote>
  </div>
);
