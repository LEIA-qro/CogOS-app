import React from 'react';
import { ModuleId } from '../../types/modules.js';
import { AccommodationPassport } from '../modules/AccommodationPassport.js';
import { TaskUnblocker } from '../modules/TaskUnblocker.js';
import { ToneDecoder } from '../modules/ToneDecoder.js';
import { SensoryPauseModal } from '../modules/SensoryPauseModal.js';
import { CompanyNavigator } from '../modules/CompanyNavigator.js';
import { About } from '../modules/About.js';

// El orden aquí es el orden en el DOM
export const windowRegistry: Record<ModuleId, React.ComponentType> = {
  passport: AccommodationPassport,
  unblocker: TaskUnblocker,
  decoder: ToneDecoder,
  crisis: SensoryPauseModal,
  navigator: CompanyNavigator,
  about: About,
};

export const windowIds = Object.keys(windowRegistry) as ModuleId[];
