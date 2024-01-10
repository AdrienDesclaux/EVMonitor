type MessageProps = {
  text: string;
  type: string;
};

function Message({ text, type }: MessageProps) {
  return <div className={type === 'error' ? 'error-message' : 'info-message'}>{text}</div>;
}

export default Message;
