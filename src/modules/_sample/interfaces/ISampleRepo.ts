import { ISample, ISampleCreateData, ISampleUpdateData } from '../types'

export interface ISampleRepo {
  create(data: ISampleCreateData): Promise<ISample>
  getByUuid(uuid: string, scopes?: string[]): Promise<ISample | null>
  getByName(name: string, scopes?: string[]): Promise<ISample[]>
  updateByUuid(uuid: string, updates: ISampleUpdateData): Promise<Array<number>>
  deleteByUuid(uuid: string): Promise<number>
}
