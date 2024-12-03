import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';

function AddArtPiecePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    year: '',
    medium: '',
    description: '',
    photo: null,
    email: '',
    is_contributed: 'true'
  });

  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of artists from the backend
    const fetchArtists = async () => {
      try {
        const response = await fetch('https://artlab.pythonanywhere.com/api/artists/');
        const data = await response.json();
        setArtists(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

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
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('artist', formData.artist);
    formDataToSubmit.append('created_year', formData.year);
    formDataToSubmit.append('medium', formData.medium);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('image', formData.photo);
    formDataToSubmit.append('contributor_email', formData.email);

    try {
      const response = await fetch('https://artlab.pythonanywhere.com/api/art_pieces/', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        console.log('Art piece created successfully');
        navigate('/contribute/success');
      } else {
        const errorData = await response.json();
        console.error('Failed to create art piece:', errorData);
        console.log(formDataToSubmit)
        alert('Failed to create the art piece. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting art piece data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Add an Art Piece</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
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
        <div className="space-y-2">
          <Label htmlFor="artist">Artist</Label>
          {isLoading ? (
            <p>Loading artists...</p>
          ) : (
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, artist: value }))
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="Select an artist"
                  defaultValue={formData.artist}
                />
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
            placeholder="contributor@example.com"
            className="focus-visible:ring-lime-500"
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddArtPiecePage;