'use client';

import { notFound } from 'next/navigation';
import React from 'react';
import Calendar from '../components/Calendar';
import Certifications from '../components/Certifications';
import ChangePassword from '../components/ChangePassword';
import Notice from '../components/Notice';
import OrdersPage from '../components/OrdersPage';
import PersonalInfo from '../components/PersonalInfo';
import Pets from '../components/Pets';
import Reviews from '../components/Reviews';
import Services from '../components/Services';


const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  'personal-info': PersonalInfo,
  'pets': Pets,
  'services': Services,
  'calendar': Calendar,
  'orders': OrdersPage,
  'reviews': Reviews,
  'security': ChangePassword,
  'certifications': Certifications,
  'notice': Notice,
};

interface ProfileSectionPageProps {
  params: { id: string; section: string };
}

export default function ProfileSectionPage({ params }:ProfileSectionPageProps) {
  const SectionComponent = sectionComponents[params.section];

  if (SectionComponent) {
    return <SectionComponent />;
  } else {
    return notFound();
  }
}