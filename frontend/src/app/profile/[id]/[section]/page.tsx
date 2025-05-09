'use client';

import React from 'react';
import PersonalInfo from '../components/PersonalInfo';
import Calendar from '../components/Calendar';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import Pets from '../components/Pets';
import ChangePassword from '../components/ChangePassword';
import Certifications from '../components/Certifications';
import Notice from '../components/Notice';
import OrdersPage from '../components/OrdersPage';
import { notFound } from 'next/navigation';


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

export default function ProfileSectionPage({ params }: { params: { id: string, section: string } }) {
  const SectionComponent = sectionComponents[params.section];

  if (SectionComponent) {
    return <SectionComponent />;
  } else {
    return notFound();
  }
}