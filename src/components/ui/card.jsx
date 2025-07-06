import React from 'react';
import clsx from 'clsx';

function Card({ className, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div className={clsx('flex flex-col space-y-1.5 p-6', className)} {...props} />
  );
}

function CardContent({ className, ...props }) {
  return <div className={clsx('p-6 pt-0', className)} {...props} />;
}

export { Card, CardHeader, CardContent };