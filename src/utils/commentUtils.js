// src/utils/commentUtils.js
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const useHandleReply = () => {
  const { isAuthenticated, username, email, accessToken } = useContext(AuthContext);

  const handleReply = async (parentId, content) => {
    try {
      let ownerId;

      if (isAuthenticated) {
        // Fetch the Profile by username
        const profileResponse = await axios.get('https://artlab.pythonanywhere.com/api/profiles/', {
          params: { username },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (profileResponse.data.length > 0) {
          // Profile exists
          ownerId = profileResponse.data[0].id;
        } else {
          // Create a new Profile
          const createProfileResponse = await axios.post(
            'https://artlab.pythonanywhere.com/api/profiles/',
            { username, email },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          ownerId = createProfileResponse.data.id;
        }
      } else {
        // Unauthenticated user uses Anonymous Profile with id 1
        ownerId = 1;
      }

      // Create the Comment
      await axios.post(
        'https://artlab.pythonanywhere.com/api/comments/',
        {
          parent: parentId,
          content,
          owner: ownerId,
          art_piece: null, // Adjust if you have art_piece context
        },
        {
          headers: isAuthenticated
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : {},
        }
      );

      // Optionally, you can return success status or updated comments
      return true;
    } catch (error) {
      console.error('Error posting reply:', error);
      alert('Failed to post reply. Please try again.');
      return false;
    }
  };

  return handleReply;
};