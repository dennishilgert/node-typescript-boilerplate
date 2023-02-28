import { container } from '../dependencyContainer'
import { DI_TYPES } from './diTypes'

// binding module injectable things to global DI container
import { ISampleService } from './interfaces'
import SampleService from './services/sampleService'

// we bind both private and public services as well as Repos to the global container
// but exposing only PUBLIC_DI_TYPES in the index.ts file makes these things non accessible from outside
container.bind<ISampleService>(DI_TYPES.SampleService).to(SampleService)

export default container
