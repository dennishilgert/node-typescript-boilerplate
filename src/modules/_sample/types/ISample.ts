import { IDatabaseModel } from '../../../common/interfaces'

export interface ISample extends IDatabaseModel {
  uuid: string
  email: string
  name: string
}
