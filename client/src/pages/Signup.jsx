import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import api from '@/services/api';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [adopterForm, setAdopterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const [rehomerForm, setRehomerForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    phone: '',
    address: ''
  });

  const handleAdopterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (adopterForm.password !== adopterForm.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, you would make an API call here
      // const response = await api.signup({ 
      //   ...adopterForm, 
      //   userType: 'adopter' 
      // });
      
      // Simulating successful signup
      const userData = {
        id: Date.now().toString(),
        email: adopterForm.email,
        firstName: adopterForm.firstName,
        lastName: adopterForm.lastName
      };
      
      login(userData, 'adopter');
      navigate('/explore');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRehomerSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (rehomerForm.password !== rehomerForm.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, you would make an API call here
      // const response = await api.signup({ 
      //   ...rehomerForm, 
      //   userType: 'rehomer' 
      // });
      
      // Simulating successful signup
      const userData = {
        id: Date.now().toString(),
        email: rehomerForm.email,
        organizationName: rehomerForm.organizationName
      };
      
      login(userData, 'rehomer');
      navigate('/list-pets');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="adopter">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="adopter">Pet Adopter</TabsTrigger>
              <TabsTrigger value="rehomer">Pet Rehomer</TabsTrigger>
            </TabsList>

            {error && (
              <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md mt-4">
                {error}
              </div>
            )}

            <TabsContent value="adopter">
              <form onSubmit={handleAdopterSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      required
                      value={adopterForm.firstName}
                      onChange={(e) => setAdopterForm({
                        ...adopterForm,
                        firstName: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      value={adopterForm.lastName}
                      onChange={(e) => setAdopterForm({
                        ...adopterForm,
                        lastName: e.target.value
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adopter-email">Email</Label>
                  <Input
                    id="adopter-email"
                    type="email"
                    required
                    value={adopterForm.email}
                    onChange={(e) => setAdopterForm({
                      ...adopterForm,
                      email: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adopter-phone">Phone Number</Label>
                  <Input
                    id="adopter-phone"
                    type="tel"
                    required
                    value={adopterForm.phone}
                    onChange={(e) => setAdopterForm({
                      ...adopterForm,
                      phone: e.target.value
                    })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adopter-password">Password</Label>
                    <Input
                      id="adopter-password"
                      type="password"
                      required
                      value={adopterForm.password}
                      onChange={(e) => setAdopterForm({
                        ...adopterForm,
                        password: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adopter-confirm-password">Confirm Password</Label>
                    <Input
                      id="adopter-confirm-password"
                      type="password"
                      required
                      value={adopterForm.confirmPassword}
                      onChange={(e) => setAdopterForm({
                        ...adopterForm,
                        confirmPassword: e.target.value
                      })}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up as Adopter'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="rehomer">
              <form onSubmit={handleRehomerSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    required
                    value={rehomerForm.organizationName}
                    onChange={(e) => setRehomerForm({
                      ...rehomerForm,
                      organizationName: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rehomer-email">Email</Label>
                  <Input
                    id="rehomer-email"
                    type="email"
                    required
                    value={rehomerForm.email}
                    onChange={(e) => setRehomerForm({
                      ...rehomerForm,
                      email: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rehomer-phone">Phone Number</Label>
                  <Input
                    id="rehomer-phone"
                    type="tel"
                    required
                    value={rehomerForm.phone}
                    onChange={(e) => setRehomerForm({
                      ...rehomerForm,
                      phone: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={rehomerForm.address}
                    onChange={(e) => setRehomerForm({
                      ...rehomerForm,
                      address: e.target.value
                    })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rehomer-password">Password</Label>
                    <Input
                      id="rehomer-password"
                      type="password"
                      required
                      value={rehomerForm.password}
                      onChange={(e) => setRehomerForm({
                        ...rehomerForm,
                        password: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rehomer-confirm-password">Confirm Password</Label>
                    <Input
                      id="rehomer-confirm-password"
                      type="password"
                      required
                      value={rehomerForm.confirmPassword}
                      onChange={(e) => setRehomerForm({
                        ...rehomerForm,
                        confirmPassword: e.target.value
                      })}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up as Rehomer'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
