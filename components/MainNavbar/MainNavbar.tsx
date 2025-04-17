'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar, NavbarItem } from '@heroui/navbar';

export default function MainNavbar() {
  return (
    <Navbar className="bg-white shadow mb-6">
      <NavbarItem>
        <Link
          href="/mems/table"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded font-bold"
        >
          Table View
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link
          href="/mems/list"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded font-bold"
        >
          List View
        </Link>
      </NavbarItem>
    </Navbar>
  );
}
