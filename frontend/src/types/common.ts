import { ReactNode } from 'react';

export interface DialogProps {
  position?: 'top' | 'bottom' | 'center';
  children: ReactNode;
  show?: boolean;
  onClick?: () => void;
  clickOnModal?: boolean;
  width?: number;
  okName?: string;
  okAction?: () => void;
  cancelName?: string;
  cancelAction?: () => void;
  buttonCenter?: boolean;
  title?: string;
  titleFill?: boolean;
  closeButton?: boolean;
  autoClose?: number;
  transparent?: boolean;
  limitHeight?: boolean;
}

export interface NavigateProps {
  onNext?: () => void;
  onPrev?: () => void;
  children: ReactNode;
  className?: string;
}

export interface TextProps {
  value?: string
  className?: string
}

export type ListQueryType = {
  filterOpts?: any,
  rangeOpts?: any;
  search?: string,
  sort?: any,
  pageNumber?: number,
  pageSize?: number
}
