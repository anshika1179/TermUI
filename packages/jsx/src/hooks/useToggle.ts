import { useBoolean } from './useBoolean.js';

export interface UseToggleResult {
  toggle: () => void;
  on: () => void;
  off: () => void;
}

export function useToggle(initialValue = false): [boolean, UseToggleResult] {
  const [value, { toggle, setTrue, setFalse }] = useBoolean(initialValue);

  return [value, {
    toggle,
    on: setTrue,
    off: setFalse,
  }];
}
