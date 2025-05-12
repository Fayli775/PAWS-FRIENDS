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



export default async function ProfileSectionPage({ params }: {params:Promise<{id:string, section:string}>}) {
  const { section } = await params;
  const SectionComponent = sectionComponents[section];

  if (SectionComponent) {
    return <SectionComponent />;
  } else {
    return notFound();
  }
}