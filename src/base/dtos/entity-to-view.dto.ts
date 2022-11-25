export class EntityToViewDto {
  constructor(entity: any) {
    //
  }
}

export type ViewDtoContructor<E> = new (entity: E) => {
  //
};
