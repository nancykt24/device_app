import { ADD_DEVICE } from './constants';

export function addDevice(device) {
  return {
    type: ADD_DEVICE,
    device,
  };
}
