import React, { createContext, useContext } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
  type TextProps,
  type ColorValue,
} from 'react-native';
import { useTheme } from '@/theme';

type ButtonVariant = 'solid' | 'outline' | 'link';
type ButtonAction = 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonContextValue {
  variant: ButtonVariant;
  action: ButtonAction;
  size: ButtonSize;
  isDisabled: boolean;
}

const ButtonContext = createContext<ButtonContextValue>({
  variant: 'solid',
  action: 'primary',
  size: 'md',
  isDisabled: false,
});

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  variant?: ButtonVariant;
  action?: ButtonAction;
  size?: ButtonSize;
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const buttonBaseClasses = 'flex-row items-center justify-center rounded-xl font-medium select-none';

const buttonSizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1.5 gap-1',
  sm: 'px-3 py-2 gap-1.5',
  md: 'px-4 py-2.5 gap-2',
  lg: 'px-5 py-3 gap-2.5',
};

const buttonVariantActionClasses: Record<ButtonVariant, Record<ButtonAction, string>> = {
  solid: {
    primary: 'bg-indigo-600 active:bg-indigo-700 disabled:bg-indigo-300',
    secondary: 'bg-slate-700 active:bg-slate-800 disabled:bg-slate-300',
    positive: 'bg-emerald-600 active:bg-emerald-700 disabled:bg-emerald-300',
    negative: 'bg-rose-600 active:bg-rose-700 disabled:bg-rose-300',
    default: 'bg-slate-100 active:bg-slate-200 disabled:bg-slate-50',
  },
  outline: {
    primary: 'border border-indigo-600 active:bg-indigo-50 disabled:border-indigo-300',
    secondary: 'border border-slate-600 active:bg-slate-50 disabled:border-slate-300',
    positive: 'border border-emerald-600 active:bg-emerald-50 disabled:border-emerald-300',
    negative: 'border border-rose-600 active:bg-rose-50 disabled:border-rose-300',
    default: 'border border-slate-300 active:bg-slate-50 disabled:border-slate-200',
  },
  link: {
    primary: 'bg-transparent active:opacity-70',
    secondary: 'bg-transparent active:opacity-70',
    positive: 'bg-transparent active:opacity-70',
    negative: 'bg-transparent active:opacity-70',
    default: 'bg-transparent active:opacity-70',
  },
};

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      variant = 'solid',
      action = 'primary',
      size = 'md',
      isDisabled = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const effectiveDisabled = isDisabled || !!disabled;
    const sizeStyle = buttonSizeClasses[size] || buttonSizeClasses.md;
    const variantActionStyle =
      buttonVariantActionClasses[variant]?.[action] || buttonVariantActionClasses.solid.primary;

    return (
      <ButtonContext.Provider value={{ variant, action, size, isDisabled: effectiveDisabled }}>
        <Pressable
          ref={ref}
          role="button"
          accessibilityRole="button"
          accessibilityState={{ disabled: effectiveDisabled }}
          disabled={effectiveDisabled}
          className={`${buttonBaseClasses} ${sizeStyle} ${variantActionStyle} ${className}`}
          {...props}
        >
          {children}
        </Pressable>
      </ButtonContext.Provider>
    );
  }
);
Button.displayName = 'Button';

export interface ButtonTextProps extends TextProps {
  className?: string;
  children: React.ReactNode;
}

const textSizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const textVariantActionClasses: Record<ButtonVariant, Record<ButtonAction, string>> = {
  solid: {
    primary: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    positive: 'text-white font-semibold',
    negative: 'text-white font-semibold',
    default: 'text-slate-900 font-medium',
  },
  outline: {
    primary: 'text-indigo-600 font-semibold',
    secondary: 'text-slate-700 font-semibold',
    positive: 'text-emerald-600 font-semibold',
    negative: 'text-rose-600 font-semibold',
    default: 'text-slate-700 font-medium',
  },
  link: {
    primary: 'text-indigo-600 font-semibold underline',
    secondary: 'text-slate-700 font-semibold underline',
    positive: 'text-emerald-600 font-semibold underline',
    negative: 'text-rose-600 font-semibold underline',
    default: 'text-slate-700 font-medium underline',
  },
};

export const ButtonText = React.forwardRef<any, ButtonTextProps>(
  ({ className = '', children, style, ...props }, ref) => {
    const { variant, action, size, isDisabled } = useContext(ButtonContext);
    const sizeStyle = textSizeClasses[size] || textSizeClasses.md;
    const colorStyle = textVariantActionClasses[variant]?.[action] || textVariantActionClasses.solid.primary;
    const disabledStyle = isDisabled ? 'opacity-50' : '';

    return (
      <Text
        ref={ref}
        className={`font-sans ${sizeStyle} ${colorStyle} ${disabledStyle} ${className}`}
        style={style}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
ButtonText.displayName = 'ButtonText';

export interface ButtonSpinnerProps {
  className?: string;
  color?: ColorValue;
  size?: 'small' | 'large';
}

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({
  color,
  size = 'small',
}) => {
  const { colors } = useTheme();
  const { variant, action } = useContext(ButtonContext);
  const defaultColor = variant === 'solid' && action !== 'default' ? colors.onAccent : colors.accent;
  return <ActivityIndicator size={size} color={color || defaultColor} />;
};
ButtonSpinner.displayName = 'ButtonSpinner';

export interface ButtonIconProps {
  as: React.ComponentType<{ size?: number; color?: any; className?: string }>;
  className?: string;
  size?: number;
  color?: ColorValue;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  as: IconComponent,
  className = '',
  size = 18,
  color,
}) => {
  const { colors } = useTheme();
  const { variant, action } = useContext(ButtonContext);
  const defaultColor = variant === 'solid' && action !== 'default' ? colors.onAccent : colors.accent;
  return <IconComponent size={size} color={color || defaultColor} className={className} />;
};
ButtonIcon.displayName = 'ButtonIcon';
