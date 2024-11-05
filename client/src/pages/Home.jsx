import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, MessageCircle, Search } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Search className="w-10 h-10 text-blue-500" />,
      title: "Easy Search",
      description: "Find your perfect companion with our advanced search filters."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      title: "Verified Profiles",
      description: "All pet listings are verified for your peace of mind."
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-blue-500" />,
      title: "Direct Communication",
      description: "Chat directly with pet owners through our secure platform."
    },
    {
      icon: <Heart className="w-10 h-10 text-blue-500" />,
      title: "Support System",
      description: "Get guidance throughout your adoption journey."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="w-full flex justify-center max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col space-y-6 lg:w-1/2">
            <Badge className="w-fit" variant="secondary">🎉 Over 10,000 pets found new homes!</Badge>
            <h1 className="text-5xl font-bold">
              Find your{' '}
              <span className="text-blue-600">pawfect</span>{' '}
              match
            </h1>
            <p className="text-xl text-gray-600">
              The new revolutionary pet finding platform. For dog owners, made by dog owners.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link to="/signup">
                <Button size="lg" className="text-lg">Adopt a Pet</Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="text-lg">Rehome a Pet</Button>
              </Link>
            </div>
          </div>
          <div className="relative lg:w-1/2 h-96 flex items-center justify-center">
            <img src="/hero.png" alt="Happy pets" className="object-contain max-w-full max-h-full" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Pawfect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your New Best Friend?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of happy pet owners who found their perfect match on Pawfect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard/adopter/explore">
              <Button size="lg" className="text-lg px-8">Browse Pets</Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-lg px-8">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600 mb-2">10,000+</h3>
            <p className="text-gray-600">Successful Adoptions</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600 mb-2">15,000+</h3>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600 mb-2">50+</h3>
            <p className="text-gray-600">Cities Covered</p>
          </div>
        </div>
      </div>
    </div>
  );
}
