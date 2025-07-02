import { Query } from '@contexts/shared/domain/cqrs/Query';
import { QueryHandler } from '@contexts/shared/domain/cqrs/QueryHandler';
import { QueryNotRegisteredError } from '@contexts/shared/domain/errors/QueryNotRegisteredError';

export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
    super();
    queryHandlers.forEach((queryHandler) => {
      this.set(queryHandler.subscribedTo(), queryHandler);
    });
  }

  public get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
