import {
  Any,
  Between,
  Equal,
  FindOperator,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import {
  IFilterOption,
  LogicEnum,
  OperatorEnum,
} from './dynamic-filter.interface';

export function dynamicFilter<T extends ObjectLiteral>(
  query: IFilterOption,
  repo: Repository<T> | SelectQueryBuilder<T>,
) {
  const { filters, sorts } = query;

  let queryBuilder: SelectQueryBuilder<T>;

  if (repo instanceof Repository) {
    queryBuilder = repo.createQueryBuilder('e');
  }

  if (repo instanceof SelectQueryBuilder) {
    queryBuilder = repo;
  }

  if (filters) {
    for (const filter of filters) {
      let conditions = {
        [filter.field]: OperatorSymbolToFunction.get(filter.operator)(
          filter.value,
        ),
      };

      if (filter.operator == OperatorEnum.Between) {
        const values = filter.value.replaceAll(/[()\\]/g, '').split(',');
        conditions = {
          [filter.field]: Between(values[0], values[1]),
        };
      }

      if (filter.logic == LogicEnum.OR) {
        queryBuilder.orWhere(conditions);
      } else {
        queryBuilder.andWhere(conditions);
      }
    }
  }

  if (sorts) {
    for (const sort of sorts) {
      queryBuilder.addOrderBy(sort.field, sort.dir);
    }
  }

  return queryBuilder;
}

export const OperatorSymbolToFunction = new Map<
  OperatorEnum,
  (...args: any[]) => FindOperator<string>
>([
  [OperatorEnum.Not, Not],
  [OperatorEnum.LessThan, LessThan],
  [OperatorEnum.LessThanOrEqual, LessThanOrEqual],
  [OperatorEnum.MoreThan, MoreThan],
  [OperatorEnum.MoreThanOrEqual, MoreThanOrEqual],
  [OperatorEnum.Equal, Equal],
  [OperatorEnum.Like, Like],
  [OperatorEnum.ILike, ILike],
  [OperatorEnum.Between, Between],
  [OperatorEnum.In, In],
  [OperatorEnum.Any, Any],
  [OperatorEnum.IsNull, IsNull],
]);
