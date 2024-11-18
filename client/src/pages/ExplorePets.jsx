import React, { useState, useEffect } from 'react';
import { Heart, HeartOff, Activity, Baby, Dog, Cross, Syringe } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { pets } from '../services/api';
import PetImages from '../components/PetImages';
import FilterDialog from '../components/FilterDialog';

const ExplorePets = () => {
  const [availablePets, setAvailablePets] = useState([]);
  const [likedPets, setLikedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userType, isAuthenticated } = useAuth();

  const [filters, setFilters] = useState({});
  const [filteredPets, setFilteredPets] = useState([]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);

    let filtered = [...availablePets];

    // Apply filters
    if (newFilters.species !== 'all') {
      filtered = filtered.filter(pet =>
        (pet.species || pet.type)?.toLowerCase() === newFilters.species
      );
    }
    if (newFilters.gender !== 'all') {
      filtered = filtered.filter(pet =>
        pet.gender?.toLowerCase() === newFilters.gender
      );
    }
    if (newFilters.size !== 'all') {
      filtered = filtered.filter(pet =>
        pet.size?.toLowerCase() === newFilters.size?.toLowerCase()
      );
    }
    if (newFilters.activityLevel !== 'all') {
      filtered = filtered.filter(pet =>
        pet.behavior?.activityLevel?.toLowerCase() === newFilters.activityLevel
      );
    }
    if (newFilters.goodWithKids) {
      filtered = filtered.filter(pet => pet.behavior?.goodWithKids === true);
    }
    if (newFilters.goodWithPets) {
      filtered = filtered.filter(pet => pet.behavior?.goodWithPets === true);
    }
    if (newFilters.vaccinated) {
      filtered = filtered.filter(pet => pet.healthStatus?.vaccinated === true);
    }
    if (newFilters.neutered) {
      filtered = filtered.filter(pet => pet.healthStatus?.neutered === true);
    }

    // Apply sorting
    if (newFilters.ageSort !== 'default') {
      filtered.sort((a, b) => {
        if (newFilters.ageSort === 'asc') {
          return (a.age || 0) - (b.age || 0);
        } else {
          return (b.age || 0) - (a.age || 0);
        }
      });
    }

    setFilteredPets(filtered);
  };

  useEffect(() => {
    if (availablePets.length > 0) {
      setFilteredPets(availablePets);
    }
  }, [availablePets]);
  useEffect(() => {
    fetchPets();
    if (isAuthenticated && userType === 'adopter') {
      fetchLikedPets();
    }
  }, [isAuthenticated, userType]);

  const HealthBadge = ({ condition, label, icon: Icon }) => (
    condition && (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {label}
      </Badge>
    )
  );

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
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold mb-6">Explore Pets</h2>
        <FilterDialog onApplyFilters={handleApplyFilters} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <Card key={pet._id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="relative aspect-square">
              <PetImages petId={pet._id} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLikeToggle(pet._id)}
                className={`absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white ${likedPets.includes(pet._id) ? 'text-red-500' : 'text-gray-600'
                  }`}
              >
                {likedPets.includes(pet._id) ? (
                  <Heart className="w-5 h-5 fill-current" />
                ) : (
                  <HeartOff className="w-5 h-5" />
                )}
              </Button>
            </div>

            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{pet.name}</h3>
                    <p className="text-sm text-gray-500">
                      {pet.breed} • {pet.age} years
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {pet.behavior?.goodWithKids && (
                    <Badge variant="outline" className="text-xs">
                      Good with Kids
                    </Badge>
                  )}
                  {pet.behavior?.goodWithPets && (
                    <Badge variant="outline" className="text-xs">
                      Good with Pets
                    </Badge>
                  )}
                  {pet.behavior?.activityLevel && (
                    <Badge variant="outline" className="text-xs">
                      Activity level: {pet.behavior.activityLevel}
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {pet.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No pets available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ExplorePets;
