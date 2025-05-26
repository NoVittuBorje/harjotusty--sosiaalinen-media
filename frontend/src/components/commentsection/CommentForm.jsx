import React,{useState} from 'react';

const CommentForm = ({ onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Comment"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;