import { match } from 'src/libs/utils';
import { Identifier } from './types';

export const assertWhereClause = (identifier: Identifier): any =>
  match(identifier)
    .on(
      (identifier: Identifier) => typeof identifier === 'string',
      () => ({
        username: identifier,
      })
    )
    .on(
      (identifier: Identifier) => typeof identifier === 'number',
      () => ({
        id: identifier,
      })
    )
    .otherwise(() => null);
