export const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null;
  }

  if (message) {
    return <div className="notification">{message}</div>;
  }

  if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }
};
