import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '../context/AuthContext';

const ListPets = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, userType } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect if not authenticated or not a rehomer
  useEffect(() => {
    if (!loading && (!isAuthenticated || userType !== 'rehomer')) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, userType, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    description: '',
    location: '',
    adoptionFee: '',
    healthStatus: {
      vaccinated: false,
      neutered: false,
      specialNeeds: false,
      specialNeedsDescription: ''
    },
    behavior: {
      goodWithKids: false,
      goodWithPets: false,
      activityLevel: 'medium'
    }
  });

  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [group, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [group]: {
          ...prev[group],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError('Maximum 5 images allowed');
      e.target.value = '';
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Get token from localStorage instead of context
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to create a pet listing');
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      images.forEach(image => {
        formDataToSend.append('images', image);
      });
      formDataToSend.append('petData', JSON.stringify(formData));

      const response = await fetch('http://localhost:8080/api/pets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to create pet listing: ${responseData.message}`);
      }

      setSuccess('Pet listed successfully!');
      setTimeout(() => {
        navigate('/dashboard/rehomer/manage');
      }, 2000);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">List a Pet for Adoption</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Pet Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="species">Species</Label>
                  <Input
                    id="species"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="0"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <select
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="h-32"
                />
              </div>

              {/* Images */}
              <div className="space-y-2">
                <Label htmlFor="images">Pet Images (up to 5)</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  required
                />
                <p className="text-sm text-gray-500">Maximum 5 images allowed</p>
              </div>

              {/* Location and Fee */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adoptionFee">Adoption Fee ($)</Label>
                  <Input
                    id="adoptionFee"
                    name="adoptionFee"
                    type="number"
                    min="0"
                    value={formData.adoptionFee}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Health Status */}
              <div className="space-y-2">
                <Label className="text-base">Health Status</Label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="healthStatus.vaccinated"
                      checked={formData.healthStatus.vaccinated}
                      onChange={handleInputChange}
                    />
                    <span>Vaccinated</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="healthStatus.neutered"
                      checked={formData.healthStatus.neutered}
                      onChange={handleInputChange}
                    />
                    <span>Neutered/Spayed</span>
                  </label>
                </div>

                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    name="healthStatus.specialNeeds"
                    checked={formData.healthStatus.specialNeeds}
                    onChange={handleInputChange}
                  />
                  <span>Special Needs</span>
                </label>

                {formData.healthStatus.specialNeeds && (
                  <div className="mt-2">
                    <Label htmlFor="specialNeedsDescription">Special Needs Description</Label>
                    <Textarea
                      id="specialNeedsDescription"
                      name="healthStatus.specialNeedsDescription"
                      value={formData.healthStatus.specialNeedsDescription}
                      onChange={handleInputChange}
                      required={formData.healthStatus.specialNeeds}
                    />
                  </div>
                )}
              </div>

              {/* Behavior */}
              <div className="space-y-4">
                <Label className="text-base">Behavior</Label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="behavior.goodWithKids"
                      checked={formData.behavior.goodWithKids}
                      onChange={handleInputChange}
                    />
                    <span>Good with Kids</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="behavior.goodWithPets"
                      checked={formData.behavior.goodWithPets}
                      onChange={handleInputChange}
                    />
                    <span>Good with Other Pets</span>
                  </label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <select
                    id="activityLevel"
                    name="behavior.activityLevel"
                    value={formData.behavior.activityLevel}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard/rehomer/manage')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Listing...' : 'Create Listing'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ListPets;
