// Arma la app con providers, barra, grid, ventanas y dock
import React from 'react';
import { SensoryProvider } from './context/SensoryContext.js';
import { WindowProvider } from './context/WindowContext.js';
import { TopBar } from './components/TopBar.js';
import { Dock } from './components/Dock.js';
import { Window } from './components/Window.js';
import { AppGrid } from './components/shell/AppGrid.js';
import { windowIds, windowRegistry } from './components/shell/windowRegistry.js';

export const App: React.FC = () => (
  <SensoryProvider>
    <WindowProvider>
      <div className="relative flex h-dvh w-screen flex-col overflow-hidden bg-paper text-ink">
        <TopBar />
        <main className="relative flex flex-1 items-start justify-center overflow-y-auto px-4 pb-28 pt-8 sm:items-center sm:px-10 sm:pt-0">
          <AppGrid />
          {windowIds.map((id) => {
            const Module = windowRegistry[id];
            return (
              <Window key={id} id={id}>
                <Module />
              </Window>
            );
          })}
        </main>
        <Dock />
      </div>
    </WindowProvider>
  </SensoryProvider>
);

export default App;
