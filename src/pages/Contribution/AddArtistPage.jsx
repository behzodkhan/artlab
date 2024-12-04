// src/pages/AddArtistPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AuthContext } from '@/contexts/AuthContext'; // Import AuthContext

function AddArtistPage() {
  const navigate = useNavigate();
  const { isAuthenticated, email: userEmail, accessToken } = useContext(AuthContext); // Destructure isAuthenticated, email, and accessToken
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    birthYear: '',
    deathYear: '',
    photo: null,
    email: isAuthenticated ? userEmail : '', // Initialize email based on authentication
    is_contributed: 'true'
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission status

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the email field is being changed while authenticated, prevent it
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
    setIsSubmitting(true); // Set submitting state

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('is_contributed', 'true');
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('bio', formData.bio);
    formDataToSubmit.append('birth_date', `${formData.birthYear}-01-01`);
    if (formData.deathYear) {
      formDataToSubmit.append('death_date', `${formData.deathYear}-01-01`);
    }
    if (formData.photo) {
      formDataToSubmit.append('profile_picture', formData.photo);
    }

    // Set contributor_email based on authentication
    if (isAuthenticated) {
      formDataToSubmit.append('contributor_email', userEmail);
    } else if (formData.email) {
      formDataToSubmit.append('contributor_email', formData.email);
    }

    formDataToSubmit.append('is_verified', 'false'); // Default to unverified

    try {
      const response = await fetch('https://behzod.pythonanywhere.com/api/artists/', {
        method: 'POST',
        body: formDataToSubmit,
        headers: isAuthenticated
          ? {
              Authorization: `Bearer ${accessToken}`, // Include access token if authenticated
            }
          : {},
      });

      if (response.ok) {
        console.log('Artist created successfully');
        alert('Artist created successfully!');
        navigate('/contribute/success');
      } else {
        const errorData = await response.json();
        console.error('Failed to create artist:', errorData);
        alert(`Failed to create the artist: ${errorData.detail || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting artist data:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Add an Artist</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Artist Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Artist Name</Label>
          <Input
            placeholder="Leonardo da Vinci"
            className="focus-visible:ring-lime-500"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Biography */}
        <div className="space-y-2">
          <Label htmlFor="bio">Biography</Label>
          <Textarea
            placeholder="Tell us a little bit about the artist..."
            className="focus-visible:ring-lime-500"
            id="bio"
            name="bio"
            required
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>

        {/* Birth Year */}
        <div className="space-y-2">
          <Label htmlFor="birthYear">Birth Year</Label>
          <Input
            placeholder="1452"
            className="focus-visible:ring-lime-500"
            id="birthYear"
            name="birthYear"
            type="number"
            required
            value={formData.birthYear}
            onChange={handleInputChange}
          />
        </div>

        {/* Death Year */}
        <div className="space-y-2">
          <Label htmlFor="deathYear">Death Year (if applicable)</Label>
          <Input
            placeholder="1519"
            className="focus-visible:ring-lime-500"
            id="deathYear"
            name="deathYear"
            type="number"
            value={formData.deathYear}
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
            placeholder={isAuthenticated ? userEmail : "dovuchcha@dovuchcha.uz (not required)"}
            className="focus-visible:ring-lime-500"
            id="email"
            name="email"
            type="email"
            value={isAuthenticated ? userEmail : formData.email}
            onChange={handleInputChange}
            disabled={isAuthenticated} // Disable if authenticated
            required={!isAuthenticated} // Make required only if not authenticated
          />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-lime-500 hover:bg-lime-600"
          type="submit"
          disabled={isSubmitting} // Disable while submitting
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default AddArtistPage;