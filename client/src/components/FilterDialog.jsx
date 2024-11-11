import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const FilterDialog = ({ onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    species: 'all',
    gender: 'all',
    size: 'all',
    activityLevel: 'all',
    ageSort: 'default',
    goodWithKids: false,
    goodWithPets: false,
    vaccinated: false,
    neutered: false
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setOpen(false); // Close dialog after applying filters
  };

  const handleReset = () => {
    const resetFilters = {
      species: 'all',
      gender: 'all',
      size: 'all',
      activityLevel: 'all',
      ageSort: 'default',
      goodWithKids: false,
      goodWithPets: false,
      vaccinated: false,
      neutered: false
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filter & Sort
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filter & Sort Pets</DialogTitle>
        </DialogHeader>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="basic">
            <AccordionTrigger>Basic Filters</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Species</Label>
                <Select 
                  value={filters.species}
                  onValueChange={(value) => handleFilterChange('species', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="bird">Bird</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <Select
                  value={filters.size}
                  onValueChange={(value) => handleFilterChange('size', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={filters.gender}
                  onValueChange={(value) => handleFilterChange('gender', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="behavior">
            <AccordionTrigger>Behavior & Health</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select
                  value={filters.activityLevel}
                  onValueChange={(value) => handleFilterChange('activityLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="goodWithKids"
                    checked={filters.goodWithKids}
                    onCheckedChange={(checked) => 
                      handleFilterChange('goodWithKids', checked)
                    }
                  />
                  <Label htmlFor="goodWithKids">Good with kids</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="goodWithPets"
                    checked={filters.goodWithPets}
                    onCheckedChange={(checked) => 
                      handleFilterChange('goodWithPets', checked)
                    }
                  />
                  <Label htmlFor="goodWithPets">Good with other pets</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vaccinated"
                    checked={filters.vaccinated}
                    onCheckedChange={(checked) => 
                      handleFilterChange('vaccinated', checked)
                    }
                  />
                  <Label htmlFor="vaccinated">Vaccinated</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="neutered"
                    checked={filters.neutered}
                    onCheckedChange={(checked) => 
                      handleFilterChange('neutered', checked)
                    }
                  />
                  <Label htmlFor="neutered">Neutered/Spayed</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sort">
            <AccordionTrigger>Sort</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <Label>Age</Label>
                <Select
                  value={filters.ageSort}
                  onValueChange={(value) => handleFilterChange('ageSort', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="asc">Youngest first</SelectItem>
                    <SelectItem value="desc">Oldest first</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
