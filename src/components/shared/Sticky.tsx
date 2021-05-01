import { Box } from '@chakra-ui/layout';
import React, { FC, ReactNode } from 'react';

interface StickyProps {
  children?: ReactNode;
  [key: string]: {};
}

export const Sticky: FC<StickyProps> = ({ children, ...restProps }) => {
  // designed for using in Grid element.
  return (
    <Box
      {...restProps}
      style={{
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        ...restProps?.style,
      }}
    >
      {children}
    </Box>
  );
};
