import { BindingScopeEnum, Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import DI_TYPES from './dependencyContainerTypes'

import 'reflect-metadata'

const container = new Container({
  defaultScope: BindingScopeEnum.Singleton
})
const { lazyInject } = getDecorators(container, false)

// Only register global, non module specific components here

export { lazyInject, container, DI_TYPES as types }
