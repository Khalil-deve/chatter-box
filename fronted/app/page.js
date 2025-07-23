'use client';

import { AuthForm } from '@/components/AuthForm';
import AuthLayout from '@/layouts/AuthLayout';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <AuthLayout>
      <ToastContainer position="top-right" />
      <AuthForm initialMode="signup" />
    </AuthLayout>
  );
}
