import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="relative h-96 mb-12">
        <img
          src="/about.webp"
          alt="Happy dogs"
          className="w-full h-full object-scale-down rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            Connecting Hearts, One Paw at a Time
          </h1>
        </div>
      </div>

      {/* Mission Section */}
      <div className="px-4 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-8">
          At Pawfect, we believe every pet deserves a loving home. Our platform brings together pet owners who need to rehome their beloved companions with families eager to provide a forever home.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
          <div className="text-gray-600">Pets Rehomed</div>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-600 mb-2">15,000+</div>
          <div className="text-gray-600">Happy Families</div>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
          <div className="text-gray-600">Cities Covered</div>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Compassion First</h3>
                <p className="text-gray-600">We understand that rehoming a pet is a difficult decision. Our platform provides support and guidance throughout the process.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Safety & Trust</h3>
                <p className="text-gray-600">Our verified user system and secure messaging ensure safe and reliable connections between pet owners and adopters.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">How We Help</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
                <p className="text-gray-600">Our platform facilitates direct communication between pet owners and potential adopters, making the process smooth and transparent.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Resource Center</h3>
                <p className="text-gray-600">Access our comprehensive guides, tips, and support for both pet owners and adopters throughout the rehoming journey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-50 rounded-lg p-8 text-center mb-12 mx-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-lg text-gray-700 mb-6">Join our community and help create more happy endings for pets in need of a new home.</p>
        <Link to="/signup">
          <Button className="px-8 py-3 rounded-lg font-semibold">
            Get Started Today
          </Button>
        </Link>
      </div>
    </div>
  );
}
