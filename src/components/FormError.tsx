import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { getErrorMessage } from '../store/apiSlice';

const FormError = ({
  error,
  isError,
  validationError,
}: {
  error?: FetchBaseQueryError | SerializedError;
  validationError: string;
  isError: boolean;
}) => (
  <FormControl isInvalid={isError}>
    {error && (
      <FormErrorMessage justifyContent="center">
        {getErrorMessage(error, validationError)}
      </FormErrorMessage>
    )}
  </FormControl>
);

export default FormError;
