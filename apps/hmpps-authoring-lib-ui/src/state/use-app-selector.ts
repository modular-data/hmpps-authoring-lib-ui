'use client';

import { useSelector } from 'react-redux';
import { type RootState } from './make-store';

export const useAppSelector = useSelector.withTypes<RootState>();
