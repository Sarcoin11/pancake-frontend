export enum MANAGER {
  PCS = 'pcs-position-manager',
  BRIL = 'bril-position-manager',
}

export interface BaseManager {
  id: MANAGER
  name: string
  introLink?: string
}

export const baseManagers: { [manager in MANAGER]: BaseManager } = {
  [MANAGER.PCS]: {
    id: MANAGER.PCS,
    name: 'PCS',
  },
  [MANAGER.BRIL]: {
    id: MANAGER.BRIL,
    name: 'Bril Finance',
    introLink: 'https://www.ichi.org/',
  },
}

export const VERIFIED_MANAGERS = [MANAGER.PCS]
