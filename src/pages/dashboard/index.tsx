import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { protectedRoute } from '@/common/utils/auth';

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/create');
  }, []);

  return;
};

export default protectedRoute(DashboardPage);
