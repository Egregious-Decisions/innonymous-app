import { Action } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from 'usehooks-ts';

/**
 * A hook to store the Redux value in the `localStorage`.
 *
 * When used, calls `reduxSetAction` to save the value from `localStorage` to Redux.
 * Whenever the value matched by `selector` changes, saves it to `localStorage`.
 *
 * @param {Function} selector the selector to retrieve the Redux value
 * @param {Function} reduxSetAction action to dispatch to save the value to the Redux store
 * @param {string} key string key for saving to `localStorage`
 * @param {TValue} initialValue the value to restore if there is no value in `localStorage`
 *
 * @returns {TValue} the current value stored in the Redux store
 */
const useReduxLocalStorage = <TState, TValue>(
  selector: (state: TState) => TValue,
  reduxSetAction: (value: TValue) => Action,
  key: string,
  initialValue: TValue,
): TValue => {
  const reduxValue = useSelector(selector);
  const dispatch = useDispatch();

  const [savedValue, saveValue] = useLocalStorage<TValue>(key, initialValue);

  useEffect(() => {
    if (reduxValue === savedValue) {
      return;
    }

    dispatch(reduxSetAction(savedValue));
    // This has to be done exactly once, so
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveValue(reduxValue);
  }, [reduxValue, saveValue]);

  return reduxValue;
};

export default useReduxLocalStorage;
