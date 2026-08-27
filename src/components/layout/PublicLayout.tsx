import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { DemoAccountSwitcher } from '../common/DemoAccountSwitcher';

export const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-rajmudra-off-white text-rajmudra-charcoal">
      <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <PublicFooter />
      <DemoAccountSwitcher />
    </div>
  );
};

