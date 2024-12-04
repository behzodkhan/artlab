import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Mail, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArtistDetailPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`https://behzod.pythonanywhere.com/api/artists/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch artist');
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtist();

    // Load voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Some browsers load voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();

    // Cleanup function to stop speech when component unmounts
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [id]);

  const formatLifespan = () => {
    if (!artist?.birth_date) return '';
    const birthYear = new Date(artist.birth_date).getFullYear();
    const deathYear = artist.death_date
      ? new Date(artist.death_date).getFullYear()
      : null;

    return deathYear ? `${birthYear} - ${deathYear}` : `b. ${birthYear}`;
  };

  const handleReadBiography = () => {
    if (isSpeaking) {
      // Stop speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setHighlightedWordIndex(-1);
    } else {
      // Start speaking
      if (artist && artist.bio) {
        const utterance = new SpeechSynthesisUtterance(artist.bio);
        utteranceRef.current = utterance;

        // Find the desired voice
        const selectedVoice = voices.find(
          (voice) =>
            voice.name === 'Microsoft David Desktop - English (United States)' ||
            voice.name === 'Microsoft David' ||
            voice.name.includes('David')
        );

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        } else {
          console.warn('Desired voice not found, using default voice.');
        }

        // Split the biography into words
        const words = artist.bio.match(/\S+/g) || [];

        utterance.onboundary = (event) => {
          if (event.name === 'word') {
            const charIndex = event.charIndex;
            // Find the index of the word being spoken
            let wordIndex = 0;
            let totalLength = 0;

            for (let i = 0; i < words.length; i++) {
              totalLength += words[i].length + 1; // +1 for the space
              if (totalLength > charIndex) {
                wordIndex = i;
                break;
              }
            }
            setHighlightedWordIndex(wordIndex);
          }
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          setHighlightedWordIndex(-1);
        };

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-64 mb-6 rounded-full mx-auto" />
        <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-6 w-2/3 mx-auto mb-4" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Artist not found.</p>
        <Link to="/">
          <Button className="mt-4">Return to Home</Button>
        </Link>
      </div>
    );
  }

  // Prepare biography with highlighted word
  const renderBiography = () => {
    if (!artist.bio) return 'Biography not available.';
    const words = artist.bio.match(/\S+/g) || [];

    return words.map((word, index) => (
      <span
        key={index}
        className={
          index === highlightedWordIndex ? 'bg-yellow-200' : ''
        }
      >
        {word}{' '}
      </span>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Link */}
      <Link to="/artists" className="mb-6 inline-flex items-center hover:text-lime-800">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Artists page
      </Link>

      {/* Artist Header */}
      <div className="text-center mb-8">
        <img
          src={artist.profile_picture || 'https://via.placeholder.com/150'}
          alt={artist.name}
          className="w-40 h-40 rounded-full shadow-md object-cover mx-auto"
        />
        <h1 className="text-4xl font-bold text-gray-900 mt-4">{artist.name}</h1>
        <p className="text-lg text-gray-600 mt-2">{formatLifespan()}</p>
      </div>

      {/* Artist Details */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        {/* Biography Section */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Biography</h3>
          <button
            onClick={handleReadBiography}
            className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label={isSpeaking ? 'Stop reading biography' : 'Read biography'}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="h-5 w-5 mr-1" />
                Stop Reading
              </>
            ) : (
              <>
                <Volume2 className="h-5 w-5 mr-1" />
                Read Biography
              </>
            )}
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {renderBiography()}
        </p>

        {/* Additional Details */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-700" />
              <span>
                <span className="font-semibold">Born:</span>{' '}
                {artist.birth_date
                  ? new Date(artist.birth_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Unknown'}
              </span>
            </div>
            {artist.death_date && (
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-700" />
                <span>
                  <span className="font-semibold">Died:</span>{' '}
                  {new Date(artist.death_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Contributor Information */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contributor</h3>
          {artist.contributor_email ? (
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-gray-600" />
              <p className="text-sm text-gray-600">{artist.contributor_email}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Anonymous contributor.</p>
          )}
        </div>
      </div>
    </div>
  );
}