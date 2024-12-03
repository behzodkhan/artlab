import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function AddArtistPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    birthYear: '',
    deathYear: '',
    photo: null,
    email: '',
    is_contributed: 'true'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('is_contributed', 'true');
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('bio', formData.bio);
    formDataToSubmit.append('birth_date', `${formData.birthYear}-01-01`);
    if (formData.deathYear) {
      formDataToSubmit.append('death_date', `${formData.deathYear}-01-01`);
    }
    formDataToSubmit.append('profile_picture', formData.photo);
    if (formData.email) {
      formDataToSubmit.append('contributor_email', formData.email);
    }
    formDataToSubmit.append('is_verified', 'false'); // Default to unverified

    try {
      const response = await fetch('https://artlab.pythonanywhere.com/api/artists/', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        console.log('Artist created successfully');
        navigate('/contribute/success');
      } else {
        console.error('Failed to create artist');
        alert('Failed to create the artist. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting artist data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Add an Artist</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
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
        <div className="space-y-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input
            placeholder="dovuchcha@dovuchcha.uz (not required)"
            className="focus-visible:ring-lime-500"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <Button className="w-full bg-lime-500 hover:bg-lime-600" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddArtistPage;