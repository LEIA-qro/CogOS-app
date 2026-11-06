// Barra de arriba con marca, pausa, ergonomía y reloj
import React from 'react';
import { Brand } from './shell/Brand.js';
import { PauseButton } from './shell/PauseButton.js';
import { ErgonomicsMenu } from './shell/ErgonomicsMenu.js';
import { Clock } from './shell/Clock.js';

export const TopBar: React.FC = () => (
  <header className="z-50 flex h-12 items-center justify-between border-b border-line bg-paper px-4 text-sm md:px-6">
    <Brand />
    <div className="flex items-center gap-2">
      <PauseButton />
      <ErgonomicsMenu />
      <Clock />
    </div>
  </header>
);
