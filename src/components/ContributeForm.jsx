import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

function ContributeForm({ type, onBack }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button type="button" variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      {type === 'artist' ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Artist Name</Label>
            <Input id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea id="bio" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthYear">Birth Year</Label>
            <Input id="birthYear" type="number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deathYear">Death Year (if applicable)</Label>
            <Input id="deathYear" type="number" />
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Art Piece Title</Label>
            <Input id="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="artist">Artist Name</Label>
            <Input id="artist" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year Created</Label>
            <Input id="year" type="number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medium">Medium</Label>
            <Input id="medium" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" required />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="photo">Photo</Label>
        <Input id="photo" type="file" accept="image/*" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Contact Email</Label>
        <Input id="email" type="email" required />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}

export default ContributeForm;