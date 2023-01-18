import { injectable } from 'inversify'
import { ISampleRepo } from '../interfaces'
import { ISample, ISampleCreateData, ISampleUpdateData } from '../types'
import database from '../../databaseModels'

@injectable()
class SampleRepo implements ISampleRepo {
  /**
   * It creates a new sample in the database
   * @param {ISampleCreateData} data - ISampleCreateData
   * @returns The newly created sample
   */
  async create(data: ISampleCreateData): Promise<ISample> {
    return database.Sample.create(data)
  }

  /**
   * It returns a single instance of the Sample model, based on the criteria passed in
   * @param {object} criteria - object - The criteria to search for
   * @param {string[] | false} [scopes] - An array of scopes to apply to the query
   * @returns A promise that resolves to a single instance of the Sample model
   */
  async getOneByCriteria(criteria: object, scopes?: string[] | false): Promise<ISample | null> {
    const definedScopes = scopes || (scopes === false ? false : ['defaultScope'])
    const parameters: object = {
      where: criteria
    }
    if (definedScopes) {
      return database.Sample.scope(definedScopes).findOne(parameters)
    }
    return database.Sample.unscoped().findOne(parameters)
  }

  async getByUuid(uuid: string, scopes?: string[]): Promise<ISample | null> {
    return this.getOneByCriteria({ uuid }, scopes)
  }

  /**
   * It returns an array of instances of the Sample model, based on the criteria passed in
   * @param {object} criteria - object - The criteria to use to find the samples
   * @param {string[] | false} [scopes] - An array of scopes to apply to the query
   * @returns An array of Sample objects
   */
  async getManyByCriteria(criteria: object, scopes?: string[] | false): Promise<ISample[]> {
    const definedScopes = scopes || (scopes === false ? false : ['defaultScope'])
    const parameters: object = {
      where: criteria
    }
    if (definedScopes) {
      return database.Sample.scope(definedScopes).findAll(parameters)
    }
    return database.Sample.unscoped().findAll(parameters)
  }

  async getByName(name: string, scopes?: string[]): Promise<ISample[]> {
    return this.getManyByCriteria({ name }, scopes)
  }

  /**
   * It updates the database with the given updates, where the criteria is met
   * @param {object} criteria - object - The criteria to use to find the records to update
   * @param {object} updates - The object containing the new values to be updated
   * @returns The number of rows affected
   */
  async update(criteria: object, updates: object): Promise<Array<number>> {
    return database.Sample.update(updates, {
      where: criteria
    })
  }

  async updateByUuid(uuid: string, updates: ISampleUpdateData): Promise<Array<number>> {
    return this.update({ uuid }, updates)
  }

  /**
   * It deletes a record from the database
   * @param {object} criteria - object - This is the criteria that you want to use to delete the
   * record
   * @returns The number of rows deleted
   */
  async delete(criteria: object): Promise<number> {
    return database.Sample.destroy({
      where: criteria
    })
  }

  async deleteByUuid(uuid: string): Promise<number> {
    return this.delete({ uuid })
  }
}

export default SampleRepo
