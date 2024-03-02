import React from 'react';
import { useIntl } from 'react-intl';

export function Translate(label) {
  const intl = useIntl();
  return intl.messages[label]
}