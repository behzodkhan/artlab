import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useExtractColors } from 'react-extract-colors';
import { ArrowLeft, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Comment from '@/components/Comment';
import { Textarea } from '@/components/ui/textarea';
import { AuthContext } from '@/contexts/AuthContext';


export default function ArtPieceDetailPage() {
  const { isAuthenticated, username, email } = useContext(AuthContext);
  const { id } = useParams();
  const [artPiece, setArtPiece] = useState(null);
  const [artist, setArtist] = useState(null);
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchArtPiece = async () => {
      try {
        const response = await fetch(`https://artlab.pythonanywhere.com/api/art_pieces/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch art piece');
        const data = await response.json();
        setArtPiece(data);

        const artistResponse = await fetch(`https://artlab.pythonanywhere.com/api/artists/${data.artist}/`);
        if (!artistResponse.ok) throw new Error('Failed to fetch artist');
        const artistData = await artistResponse.json();
        setArtist(artistData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch(`https://artlab.pythonanywhere.com/api/genres/`);
        if (!response.ok) throw new Error('Failed to fetch genres');
        const data = await response.json();
        const genreMap = data.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genreMap);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`https://artlab.pythonanywhere.com/api/art_pieces/${id}/comments/`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data.reverse());
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchArtPiece();
    fetchGenres();
    fetchComments();
  }, [id]);

  const { colors, loading } = useExtractColors(artPiece?.image || '', {
    maxColors: 12,
    format: 'hex',
    maxSize: 200,
    orderBy: 'vibrance',
  });

  const getOrCreateProfile = async () => {
    try {
      const response = await fetch('https://artlab.pythonanywhere.com/api/profiles/', {
      });
      if (!response.ok) throw new Error('Failed to fetch profiles');

      const profiles = await response.json();
      console.log(profiles)
      const existingProfile = profiles.find((profile) => profile.username === username);

      if (existingProfile) {
        return existingProfile.id;
      }

      const createResponse = await fetch('https://artlab.pythonanywhere.com/api/profiles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });

      if (!createResponse.ok) throw new Error('Failed to create profile');

      const newProfile = await createResponse.json();
      return newProfile.id;
    } catch (error) {
      console.error('Error in getOrCreateProfile:', error);
      return '1'; // Default to Anonymous profile
    }
  };

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;

    setIsSubmitting(true);

    try {
      let ownerId = '1'; // Default to Anonymous profile ID
      if (isAuthenticated) {
        ownerId = await getOrCreateProfile();
      }

      const bodyData = { art_piece: id, content: newCommentContent, owner: ownerId };

      const response = await fetch(`https://artlab.pythonanywhere.com/api/art_pieces/${id}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setNewCommentContent('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentId, content) => {
    if (!content.trim()) return;

    try {
      // Include 'art_piece' in the body
      const bodyData = { art_piece: id, content, parent: parentId };

      console.log('Submitting reply:', bodyData);

      const response = await fetch(`https://artlab.pythonanywhere.com/api/art_pieces/${id}/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      if (!response.ok) throw new Error('Failed to post reply');
      const newReply = await response.json();

      // Update the comments state with the new reply
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        } else if (comment.replies) {
          // Handle nested replies
          return {
            ...comment,
            replies: updateReplies(comment.replies, parentId, newReply),
          };
        }
        return comment;
      });

      setComments(updatedComments);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const updateReplies = (replies, parentId, newReply) => {
    return replies.map((reply) => {
      if (reply.id === parentId) {
        return {
          ...reply,
          replies: [...(reply.replies || []), newReply],
        };
      } else if (reply.replies) {
        return {
          ...reply,
          replies: updateReplies(reply.replies, parentId, newReply),
        };
      }
      return reply;
    });
  };

  if (isLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (!artPiece) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Art piece not found.</p>
        <Link to="/">
          <Button className="mt-4">Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="mb-6 inline-flex items-center hover:text-lime-800">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative">
          <img
            src={artPiece.image}
            alt={artPiece.title}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
          {/* Dominant Colors Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Dominant Colors</h3>
            <div className="flex flex-wrap gap-2">
              {colors?.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-md"
                  style={{ backgroundColor: color }}
                  title={color}
                ></div>
              ))}
            </div>
          </div>
        </div>
        {/* Details Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{artPiece.title}</h1>
          <p className="text-lg text-gray-600 mt-2">
            Created in {artPiece.created_year} by{' '}
            <Link to={`/artists/${artPiece.artist}`} className="text-lime-600 hover:underline">
              {artist?.name || 'Loading...'}
            </Link>
          </p>
          <p className="mt-4 text-gray-700">{artPiece.description}</p>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Details</h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Medium:</span> {artPiece.medium || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Style:</span> {artPiece.style || 'N/A'}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {artPiece.genres.map((genreId) => (
                <Badge key={genreId} className="bg-lime-100 text-lime-800">
                  {genres[genreId] || 'Loading...'}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contributor</h3>
            <div className="flex items-center gap-4">
              <User className="h-6 w-6 text-gray-600" />
              <p className="text-sm text-gray-600">
                {artPiece.contributor_email || 'Anonymous'}
              </p>
            </div>
            {artPiece.contributor_email && (
              <div className="flex items-center gap-4 mt-2">
                <Mail className="h-6 w-6 text-gray-600" />
                <p className="text-sm text-gray-600">{artPiece.contributor_email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments</h2>

        {/* New Comment Form */}
        <form onSubmit={handleNewCommentSubmit} className="mb-6">
          <Textarea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="Write a comment..."
            required
            className="w-full mb-2"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>

        {/* Comments List */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleReplySubmit}
            />
          ))
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}