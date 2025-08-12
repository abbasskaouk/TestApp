import {ReactElement} from 'react';

export type TCtaButton = {
  title: string;
  boxSize?: number;
  disabled: boolean;
  icon: ReactElement;
  onPress: () => void;
};
