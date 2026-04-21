"use client";
import React from 'react';
import Navvar from './Navvar';
import { usePathname } from 'next/navigation';

const Header = () => {
      const pathName = usePathname();
  if (pathName.startsWith("/dashboard")) return <></>;
    return (
        <div>
            <Navvar/>
        </div>
    );
};

export default Header;