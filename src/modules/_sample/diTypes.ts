// public services accessible outside of module scope
const PUBLIC_DI_TYPES = {
  SampleService: Symbol.for('SampleService')
}

const DI_TYPES = {
  ...PUBLIC_DI_TYPES,
  SampleRepo: Symbol.for('SampleRepo')
}

export { PUBLIC_DI_TYPES, DI_TYPES }
