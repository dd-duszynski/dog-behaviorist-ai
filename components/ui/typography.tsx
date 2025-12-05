import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'span'
  | 'blockquote'
  | 'lead'
  | 'small'
  | 'muted';

interface TypographyProps {
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-2xl font-extrabold tracking-tight my-4',
  h2: 'text-xl font-semibold tracking-tight my-3',
  h3: 'text-lg font-semibold tracking-tight my-2',
  h4: 'text-base font-semibold tracking-tight my-2',
  p: 'text-sm leading-7 my-1',
  span: 'text-sm',
  blockquote: 'text-sm border-l-2 pl-6 italic',
  lead: 'text-sm text-muted-foreground my-1',
  small: 'text-xs font-medium leading-none my-1',
  muted: 'text-xs text-muted-foreground my-1',
};

const variantElements: Record<TypographyVariant, any> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  span: 'span',
  blockquote: 'blockquote',
  lead: 'p',
  small: 'small',
  muted: 'p',
};

export function Typography({ variant, children, className }: TypographyProps) {
  const Component = variantElements[variant];

  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  );
}
