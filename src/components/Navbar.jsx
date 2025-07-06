import React from 'react';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <a href="#" className="flex items-center justify-center">
        <span className="font-bold">Kyma</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
          Docs
        </a>
        <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
          GitHub
        </a>
        <Button size="sm">Login</Button>
      </nav>
    </header>
  );
}