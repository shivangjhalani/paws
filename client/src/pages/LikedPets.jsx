import React, { useState, useEffect } from 'react';
import { Heart, Phone, Mail, MapPin, Activity, Users, Baby, Dog, Cross, Syringe } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
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
      if (!data[0]?.rehomerId?.email) {
        console.error('Rehomer information not populated:', data);
        setError('Unable to load complete pet information. Please try again.');
      }
      setLikedPets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch liked pets. Please try again.');
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

  const ContactInfo = ({ rehomer }) => {
    if (!rehomer) return null;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span>{rehomer.location || 'Location not available'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-gray-500" />
          <span>{rehomer.phone || 'Phone not available'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <span>{rehomer.email || 'Email not available'}</span>
        </div>
      </div>
    );
  };

  const HealthBadge = ({ condition, label, icon: Icon }) => (
    condition && (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Icon className="w-4 h-4" />
        {label}
      </Badge>
    )
  );

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
            You haven't liked any pets yet. Explore available pets to find your perfect companion!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {likedPets.map((pet) => (
            <Card key={pet._id} className="w-full">
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

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="aspect-square">
                    <PetImages petId={pet._id} />
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Type</p>
                        <p>{pet.species}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Breed</p>
                        <p>{pet.breed}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Age</p>
                        <p>{pet.age} years</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Gender</p>
                        <p className="capitalize">{pet.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Size</p>
                        <p className="capitalize">{pet.size}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <p className="capitalize">{pet.status}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Health Status</h4>
                      <div className="flex flex-wrap gap-2">
                        <HealthBadge condition={pet.healthStatus?.vaccinated} label="Vaccinated" icon={Syringe} />
                        <HealthBadge condition={pet.healthStatus?.neutered} label="Neutered" icon={Cross} />
                        <HealthBadge condition={pet.healthStatus?.specialNeeds} label="Special Needs" icon={Cross} />
                      </div>
                      {pet.healthStatus?.specialNeedsDescription && (
                        <p className="mt-2 text-sm text-gray-600">{pet.healthStatus.specialNeedsDescription}</p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Behavior</h4>
                      <div className="flex flex-wrap gap-2">
                        <HealthBadge condition={pet.behavior?.goodWithKids} label="Good with Kids" icon={Baby} />
                        <HealthBadge condition={pet.behavior?.goodWithPets} label="Good with Pets" icon={Dog} />
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          Activity Level: {pet.behavior?.activityLevel || 'N/A'}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Location & Fee</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <span>{pet.location}</span>
                        </div>
                        <div>
                          <span className="font-medium">Adoption Fee:</span> ${pet.adoptionFee}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">About {pet.name}</h4>
                  <p className="text-gray-600">{pet.description}</p>
                </div>
              </CardContent>

              <CardFooter className="border-t pt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Contact Rehomer</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Rehomer Details</DialogTitle>
                    </DialogHeader>
                    <ContactInfo rehomer={pet.rehomerId} />
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
