// src/pages/AddArtPiecePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { AuthContext } from '@/contexts/AuthContext'; // Import AuthContext

function AddArtPiecePage() {
  const navigate = useNavigate();
  const { isAuthenticated, email: userEmail, accessToken, isLoading } = useContext(AuthContext); // Destructure from AuthContext

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    year: '',
    medium: '',
    description: '',
    photo: null,
    email: isAuthenticated ? userEmail : '', // Initialize based on authentication
    is_contributed: 'true'
  });

  const [artists, setArtists] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission
  const [isFetchingArtists, setIsFetchingArtists] = useState(true); // Separate loading state for artists

  useEffect(() => {
    // Fetch the list of artists from the backend
    const fetchArtists = async () => {
      try {
        const response = await fetch('https://behzod.pythonanywhere.com/api/artists/');
        if (response.ok) {
          const data = await response.json();
          setArtists(data);
        } else {
          console.error('Failed to fetch artists:', response.statusText);
          alert('Failed to load artists. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
        alert('An error occurred while fetching artists.');
      } finally {
        setIsFetchingArtists(false);
      }
    };

    fetchArtists();
  }, []);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent changes to email if authenticated
    if (isAuthenticated && name === 'email') {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submission

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('is_contributed', 'true');
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('artist', formData.artist);
    formDataToSubmit.append('created_year', formData.year);
    formDataToSubmit.append('medium', formData.medium);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('image', formData.photo);
    formDataToSubmit.append('contributor_email', isAuthenticated ? userEmail : formData.email);
    formDataToSubmit.append('is_verified', 'false'); // Default to unverified

    try {
      const response = await fetch('https://behzod.pythonanywhere.com/api/art_pieces/', {
        method: 'POST',
        body: formDataToSubmit,
        headers: isAuthenticated
          ? {
              Authorization: `Bearer ${accessToken}`, // Include access token if authenticated
            }
          : {},
      });

      if (response.ok) {
        console.log('Art piece created successfully');
        alert('Art piece created successfully!');
        navigate('/contribute/success');
      } else {
        const errorData = await response.json();
        console.error('Failed to create art piece:', errorData);
        alert(`Failed to create the art piece: ${errorData.detail || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting art piece data:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  // Prevent rendering the form until loading is complete
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div> {/* Replace with your loader component */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Add an Art Piece</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Art Piece Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Art Piece Title</Label>
          <Input
            placeholder="Starry Night"
            className="focus-visible:ring-lime-500"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* Artist */}
        <div className="space-y-2">
          <Label htmlFor="artist">Artist</Label>
          {isFetchingArtists ? (
            <p>Loading artists...</p>
          ) : (
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, artist: value }))
              }
              value={formData.artist}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an artist" />
              </SelectTrigger>
              <SelectContent>
                {artists.map((artist) => (
                  <SelectItem key={artist.id} value={artist.id.toString()}>
                    {artist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Year Created */}
        <div className="space-y-2">
          <Label htmlFor="year">Year Created</Label>
          <Input
            placeholder="1889"
            className="focus-visible:ring-lime-500"
            id="year"
            name="year"
            type="number"
            required
            value={formData.year}
            onChange={handleInputChange}
          />
        </div>

        {/* Medium */}
        <div className="space-y-2">
          <Label htmlFor="medium">Medium</Label>
          <Input
            placeholder="Oil on canvas"
            className="focus-visible:ring-lime-500"
            id="medium"
            name="medium"
            required
            value={formData.medium}
            onChange={handleInputChange}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Describe the art piece..."
            className="focus-visible:ring-lime-500"
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Photo */}
        <div className="space-y-2">
          <Label htmlFor="photo">Photo</Label>
          <Input
            className="focus-visible:ring-lime-500"
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
          />
        </div>

        {/* Contact Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input
            placeholder={isAuthenticated ? userEmail : "contributor@example.com"}
            className="focus-visible:ring-lime-500"
            id="email"
            name="email"
            type="email"
            required={!isAuthenticated} // Make required only if not authenticated
            value={isAuthenticated ? userEmail : formData.email}
            onChange={handleInputChange}
            disabled={isAuthenticated} // Disable if authenticated
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-lime-500 hover:bg-lime-600"
          disabled={isSubmitting} // Disable while submitting
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default AddArtPiecePage;