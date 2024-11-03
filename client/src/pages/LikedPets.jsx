import React, { useState, useEffect } from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { pets } from '../services/api';
import PetImages from '../components/PetImages';

const LikedPets = () => {
  const [likedPets, setLikedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userType, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && userType === 'adopter') {
      fetchLikedPets();
    }
  }, [isAuthenticated, userType]);

  const fetchLikedPets = async () => {
    try {
      const data = await pets.getLiked();
      setLikedPets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch liked pets. Please try again later.');
      console.error('Error fetching liked pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async (petId) => {
    try {
      await pets.unlike(petId);
      setLikedPets(likedPets.filter(pet => pet._id !== petId));
      setError(null);
    } catch (err) {
      setError('Failed to unlike pet. Please try again.');
      console.error('Error unliking pet:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || userType !== 'adopter') {
    return (
      <div className="text-center p-4">
        Please login as an adopter to view liked pets.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Liked Pets</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {likedPets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            You haven&apost liked any pets yet. Explore available pets to find your perfect companion!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedPets.map((pet) => (
            <Card key={pet._id} className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-xl font-semibold">{pet.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUnlike(pet._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Heart className="w-6 h-6 fill-current" />
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
                      <p className="text-sm font-medium text-gray-500">Gender</p>
                      <p className="text-sm">{pet.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Size</p>
                      <p className="text-sm">{pet.size}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Fee</p>
                      <p className="text-sm">${pet.adoptionFee}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-sm">{pet.rehomerId?.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <p className="text-sm">{pet.status || 'Available'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t pt-4 flex flex-col gap-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {pet.description}
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Contact Rehomer</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Rehomer Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <span>{pet.rehomerId?.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <span>{pet.rehomerId?.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <span>{pet.rehomerId?.email}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">About {pet.name}</h4>
                        <p className="text-sm text-gray-600">{pet.description}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedPets;
