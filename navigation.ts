import { Locales } from 'next-intl/dist/types/src/routing/types';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

const locales: Locales = ['nb', 'nn'];

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
