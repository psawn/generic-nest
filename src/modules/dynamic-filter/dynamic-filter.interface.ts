export interface IFilterOption {
  page?: string | number;
  limit?: string | number;
  filters?: IFilter[];
  sorts?: ISort[];
}

interface IFilter {
  field: string;
  operator: OperatorEnum;
  value: string;
  logic: LogicEnum;
}

interface ISort {
  field: string;
  dir: DirEnum;
}

export enum OperatorEnum {
  Not = 'Not',
  LessThan = 'LessThan',
  LessThanOrEqual = 'LessThanOrEqual',
  MoreThan = 'MoreThan',
  MoreThanOrEqual = 'MoreThanOrEqual',
  Equal = 'Equal',
  Like = 'Like',
  ILike = 'ILike',
  Between = 'Between',
  In = 'In',
  Any = 'Any',
  IsNull = 'IsNull',
}

export enum LogicEnum {
  AND = 'AND',
  OR = 'OR',
}

enum DirEnum {
  DESC = 'DESC',
  ASC = 'ASC',
}
