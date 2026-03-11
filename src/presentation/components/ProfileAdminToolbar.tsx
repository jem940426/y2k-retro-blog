'use client';

import { useState, useEffect } from 'react';
import { getSession } from '@/application/useCases/auth';
import { Profile } from '@/domain/models/Profile';
import { Category } from '@/domain/models/Category';
import ProfileEditModal from './ProfileEditModal';

interface Props {
  profile: Profile | null;
  categories: Category[];
}

export default function ProfileAdminToolbar({ profile, categories }: Props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getSession().then(({ session }) => {
      if (session) setIsAdmin(true);
    });
  }, []);

  if (!isAdmin) return null;

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-1 text-[8px] font-bold text-white hover:text-[#ffe6f0] underline decoration-dashed mr-1"
      >
        Edit
      </button>
      {isModalOpen && (
        <ProfileEditModal 
          profile={profile} 
          initialCategories={categories} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
