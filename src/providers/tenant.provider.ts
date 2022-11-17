import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export class TenantProvider {
  private readonly _tenantId: string = '1asdasd';

  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {
    if (this.request.headers['x-tenant-id']) {
      this._tenantId = this.request.headers['x-tenant-id'] as string;
    } else if (this.request.query['tenant-id']) {
      this._tenantId = this.request.query['tenant-id'] as string;
    }
  }

  get tenantId(): string {
    return this._tenantId;
  }
}
