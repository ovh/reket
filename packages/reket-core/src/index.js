/**
 * @module core
 * @description
 * Entry point of the module. It exports everything needed to have an optimal use of Reket.
 *
 * It exports:
 * - Reket class
 * - ReketClient class
 * - config module
 * - ReketError class
 * - ReketResponse class
 *
 * @see ReketClient
 * @see module:core/config
 * @see ReketError
 * @see ReketResponse
 * @see Reket
 */
export * from './client';
export * from './config';
export * from './error';
export * from './response';
export * from './reket';
