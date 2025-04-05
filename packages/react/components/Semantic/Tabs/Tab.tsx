import { PropsWithChildren } from 'react';
import { FC } from 'react';

import { useIsActive } from '@binaryoperations/json-forms-react/context/ActiveStateContext';
import { ID } from '@binaryoperations/json-forms-react/type';

export type TabProps = PropsWithChildren<{ id: ID }>;
export type Tab = FC<PropsWithChildren<{ id: ID }>>;

export const Tab: Tab = (props) => {
  return !useIsActive(props.id) ? null : (props.children ?? null);
};
