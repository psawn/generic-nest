import { BaseEntity, Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['tenantId', 'uid'])
export class TenantBaseAppEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  tenantId: string;
}
