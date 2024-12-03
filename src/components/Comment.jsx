import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserCircle, CornerDownRight, ThumbsUp, Clock } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Comment = ({ comment, onReply, depth = 0 }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Toggle the reply form and clear content if closing
  const handleToggleReplyForm = () => {
    if (showReplyForm) {
      setReplyContent(''); // Clear the reply content when closing the form
    }
    setShowReplyForm(!showReplyForm);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmittingReply(true);
    await onReply(comment.id, replyContent);
    setReplyContent('');
    setShowReplyForm(false);
    setIsSubmittingReply(false);
  };

  // Generate initials for avatars
  const getUserInitials = (name) => {
    if (!name) return 'A';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Avatar colors
  const avatarColors = ['bg-lime-600', 'bg-blue-600', 'bg-pink-600', 'bg-purple-600'];
  const avatarColor = avatarColors[comment.id % avatarColors.length];

  // Format timestamp
  const formattedTimestamp = formatDistanceToNow(parseISO(comment.timestamp), { addSuffix: true });

  return (
    <div className={`mb-6 ${depth > 0 ? 'ml-12' : ''}`}>
      {/* Comment Container */}
      <div className="flex items-start">
        {/* Avatar */}
        <div className="flex-shrink-0 mr-4">
          <div
            className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold`}
          >
            {getUserInitials(comment.username)}
          </div>
        </div>
        {/* Comment Content */}
        <div className="flex-grow bg-white p-4 rounded-2xl shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">
              {comment.username || 'Anonymous'}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {formattedTimestamp}
            </div>
          </div>
          <p className="mt-2 text-gray-700">{comment.content}</p>
          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={handleToggleReplyForm}
              className="flex items-center text-sm text-lime-600 hover:text-lime-800 transition-colors duration-200"
            >
              <CornerDownRight className="h-4 w-4 mr-1" />
              {showReplyForm ? 'Cancel' : 'Reply'}
            </button>
            {/* Like Button (optional) */}
            <button
              onClick={() => alert('Liked!')}
              className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors duration-200"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Like
            </button>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-4 ml-14">
          <Textarea
  value={replyContent}
  onChange={(e) => setReplyContent(e.target.value)}
  placeholder="Write a reply..."
  required
  className="w-full mb-2 p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-lime-600 focus:outline-none text-gray-800 placeholder-gray-400"
  rows={1}
  style={{ overflow: 'hidden' }}
  onInput={(e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }}
/>
          <div className="flex items-center space-x-2">
            <Button type="submit" disabled={isSubmittingReply}>
              {isSubmittingReply ? 'Posting...' : 'Post Reply'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleToggleReplyForm}
              disabled={isSubmittingReply}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-6">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;