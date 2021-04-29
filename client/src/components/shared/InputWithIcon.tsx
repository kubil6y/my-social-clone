import React from 'react';
import {
  Icon,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from '@chakra-ui/react';

interface InputWithIconProps {
  icon: any;
  id: string;
  label?: string;
  type: string;
  placeholder: string;
  helperText?: string;
  name: string;
  value: string;
  onChange: any;
  handleIconClick?: () => void;
  required?: boolean;
  error: string;
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  id,
  label,
  placeholder,
  helperText,
  name,
  value,
  type,
  onChange,
  handleIconClick,
  required,
  error,
  ...rest
}) => {
  return (
    <FormControl id={id} {...rest} isInvalid={error?.length > 0}>
      <FormLabel mb="5px">{label}</FormLabel>
      <InputGroup>
        <InputLeftElement
          onClick={handleIconClick}
          sx={{ cursor: 'pointer' }}
          children={<Icon as={icon} h={5} w={5} color="gray.500" />}
        />
        <Input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
          required={required}
        />
      </InputGroup>
      <FormErrorMessage>{error && error}</FormErrorMessage>
      {helperText && !error && (
        <FormHelperText fontSize="xs">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
