import React, { useState, useEffect } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { pets } from '../services/api';

const ExplorePets = () => {
  const [availablePets, setAvailablePets] = useState([]);
  const [likedPets, setLikedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userType, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPets();
    if (isAuthenticated && userType === 'adopter') {
      fetchLikedPets();
    }
  }, [isAuthenticated, userType]);

  const fetchPets = async () => {
    try {
      const data = await pets.getAll();
      setAvailablePets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch pets. Please try again later.');
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedPets = async () => {
    try {
      const data = await pets.getLiked();
      setLikedPets(data.map(pet => pet._id));
      setError(null);
    } catch (err) {
      console.error('Error fetching liked pets:', err);
    }
  };

  const handleLikeToggle = async (petId) => {
    if (!isAuthenticated) {
      setError('Please login as an adopter to like pets');
      return;
    }

    if (userType !== 'adopter') {
      setError('Only adopters can like pets');
      return;
    }

    try {
      const isLiked = likedPets.includes(petId);

      if (isLiked) {
        await pets.unlike(petId);
        setLikedPets(likedPets.filter(id => id !== petId));
      } else {
        await pets.like(petId);
        setLikedPets([...likedPets, petId]);
      }
      setError(null);
    } catch (err) {
      setError('Failed to update pet like status. Please try again.');
      console.error('Error toggling like:', err);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading pets...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Pets</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availablePets.map((pet) => (
          <Card key={pet._id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{pet.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLikeToggle(pet._id)}
                  className={`${likedPets.includes(pet._id) ? 'text-red-500' : 'text-gray-400'
                    } hover:text-red-500`}
                >
                  {likedPets.includes(pet._id) ? (
                    <Heart className="w-6 h-6 fill-current" />
                  ) : (
                    <HeartOff className="w-6 h-6" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pet.images && pet.images.length > 0 && (
                <img
                  src={pet.images[0]}
                  alt={pet.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <div className="space-y-2">
                <p><strong>Type:</strong> {pet.type}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Location:</strong> {pet.rehomerId?.location}</p>
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <p className="text-sm text-muted-foreground">{pet.description}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExplorePets;
