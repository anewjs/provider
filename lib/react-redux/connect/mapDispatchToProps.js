import { bindActionCreators } from 'redux';
import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps';
export function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
export function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (store) {
    return {
      store: store
    };
  }) : undefined;
}
export default [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing];