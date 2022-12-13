import { match } from 'src/libs/utils';
import { Identifier, Result } from './types';

export const assertWhereClause = (identifier: Identifier): Result =>
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
