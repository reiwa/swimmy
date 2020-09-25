import { https } from 'firebase-functions'

export const ABORTED: https.FunctionsErrorCode = 'aborted'
export const ALREADY_EXISTS: https.FunctionsErrorCode = 'already-exists'
export const CANCELLED: https.FunctionsErrorCode = 'cancelled'
export const DATA_LOSS: https.FunctionsErrorCode = 'data-loss'
export const DEADLINE_EXCEEDED: https.FunctionsErrorCode = 'deadline-exceeded'
export const FAILED_PRECONDITION: https.FunctionsErrorCode =
  'failed-precondition'
export const INTERNAL: https.FunctionsErrorCode = 'internal'
export const INVALID_ARGUMENT: https.FunctionsErrorCode = 'invalid-argument'
export const NOT_FOUND: https.FunctionsErrorCode = 'not-found'
export const OK: https.FunctionsErrorCode = 'ok'
export const OUT_OF_RANGE: https.FunctionsErrorCode = 'out-of-range'
export const PERMISSION_DENIED: https.FunctionsErrorCode = 'permission-denied'
export const RESOURCE_EXHAUSTED: https.FunctionsErrorCode = 'resource-exhausted'
export const UNAUTHENTICATED: https.FunctionsErrorCode = 'unauthenticated'
export const UNAVAILABLE: https.FunctionsErrorCode = 'unavailable'
export const UNIMPLEMENTED: https.FunctionsErrorCode = 'unimplemented'
export const UNKNOWN: https.FunctionsErrorCode = 'unknown'