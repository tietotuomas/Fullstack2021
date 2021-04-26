const Message = ({ message }) => {
  if (message.message === "") {
    return null;
  }
  if (message.error) {
    return <div className="error">{message.message}</div>;
  }

  return <div className="confirmation">{message.message}</div>;
};

export default Message;
