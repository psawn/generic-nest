export class ResponseDto {
  readonly data: any;

  readonly metadata: IMatadate | Record<string, unknown>;

  constructor(metadata: IMatadate | Record<string, unknown>, data: any) {
    this.data = data?.items ? data.items : data;
    this.metadata = metadata;
  }
}

interface IMatadate {
  statusCode: number;
  message: string;
  pagination?: Record<string, unknown>;
}
