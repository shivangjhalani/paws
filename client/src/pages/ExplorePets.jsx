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
import PetImages from '../components/PetImages';

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Pets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availablePets.map((pet) => (
          <Card key={pet._id} className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl font-semibold">{pet.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLikeToggle(pet._id)}
                  className={`${likedPets.includes(pet._id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                >
                  {likedPets.includes(pet._id) ? (
                    <Heart className="w-6 h-6 fill-current" />
                  ) : (
                    <HeartOff className="w-6 h-6" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="mb-4 aspect-square">
                <PetImages petId={pet._id} />
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="text-sm">{pet.species || pet.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Breed</p>
                    <p className="text-sm">{pet.breed}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="text-sm">{pet.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-sm">{pet.rehomerId?.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {pet.description}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {availablePets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No pets available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ExplorePets;
