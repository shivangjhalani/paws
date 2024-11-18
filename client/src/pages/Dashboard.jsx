import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import ExplorePets from './ExplorePets';
import LikedPets from './LikedPets';
import ListPets from './ListPets';
import ManagePets from './ManagePets';
import EditPet from './EditPet';
import ProfileUpdate from './ProfileUpdate';

const DashboardLayout = ({ children, links }) => {
  const location = useLocation();

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="p-4 col-span-1 h-fit">
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 rounded-lg transition-colors ${location.pathname === link.path
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Card>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-3">
          <Card className="p-6">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export const AdopterDashboard = () => {
  const { user } = useAuth();

  const links = [
    { path: '/dashboard/adopter', label: 'Overview' },
    { path: '/dashboard/adopter/explore', label: 'Explore Pets' },
    { path: '/dashboard/adopter/liked', label: 'Liked Pets' }
  ];

  return (
    <DashboardLayout links={links}>
      <Routes>
        <Route path="" element={<ProfileUpdate />} />
        <Route path="explore" element={<ExplorePets />} />
        <Route path="liked" element={<LikedPets />} />
      </Routes>
    </DashboardLayout>
  );
};

export const RehomerDashboard = () => {
  const { user } = useAuth();

  const links = [
    { path: '/dashboard/rehomer', label: 'Overview' },
    { path: '/dashboard/rehomer/list', label: 'List a Pet' },
    { path: '/dashboard/rehomer/manage', label: 'Manage Listings' }
  ];

  return (
    <DashboardLayout links={links}>
      <Routes>
        <Route path="" element={<ProfileUpdate />} />
        <Route path="list" element={<ListPets />} />
        <Route path="edit/:id" element={<EditPet />} />
        <Route path="manage" element={<ManagePets />} />
      </Routes>
    </DashboardLayout>
  );
};
