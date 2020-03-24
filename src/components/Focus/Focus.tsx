import React, {memo, useEffect} from 'react';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';

export interface FocusProps {
  children?: React.ReactNode;
  disabled?: boolean;
  root: React.RefObject<HTMLElement> | HTMLElement | null;
}

export const Focus = memo(function Focus({
  children,
  disabled,
  root,
}: FocusProps) {
  useEffect(() => {
    if (disabled || !root) {
      return;
    }

    let node: HTMLElement | null;
    if ('current' in root) {
      node = (root as React.RefObject<HTMLElement>).current;
    } else {
      node = root as HTMLElement;
    }

    if (!node || node.querySelector('[autofocus]')) {
      return;
    }

    focusFirstFocusableNode(node, false);
  }, [disabled, root]);

  return <React.Fragment>{children}</React.Fragment>;
});
