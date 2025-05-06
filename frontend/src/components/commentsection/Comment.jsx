import React from 'react';

const Comment = ({ comment, onReply }) => {
    
  return (
    <div>
      <h4>{comment.user.username}</h4>
      <p>{comment.content}</p>
      <p>{comment.timestamp}</p>
      {comment.replies.length > 0 && (
        <ul>
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment comment={reply} onReply={onReply} />
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => onReply(comment.id)}>Reply</button>
    </div>
  )
};

export default Comment