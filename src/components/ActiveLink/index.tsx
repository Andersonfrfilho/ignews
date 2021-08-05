import { useRouter } from 'next/router';
import Link from 'next/link';
import { cloneElement } from 'react';
import { IActiveLinkProps } from './interface';

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: IActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : '';

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}
