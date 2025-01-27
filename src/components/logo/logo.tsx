import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';


// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
};

export const Logo = forwardRef<HTMLAnchorElement, LogoProps>(
  (
    { href = '/' },
    ref
  ) => (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        aria-label="Logo"
        sx={{
          width: 100,
          height: 40,
        }}
      >
        <Box
          alt="Logo"
          component="img"
          src="public/assets/images/task.jpg"
          width="100%"
          height="100%"
          sx={{
            objectFit: 'contain',
          }}
        />
      </Box>
    )
);
