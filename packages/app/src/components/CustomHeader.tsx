import * as React from 'react';
import { useState } from 'react';
import { Header } from '@backstage/core-components';
import { SearchBar } from '@backstage/plugin-search-react';
import { UserSettingsSignInAvatar } from '@backstage/plugin-user-settings';
import { useApi } from '@backstage/core-plugin-api';
import { identityApiRef } from '@backstage/core-plugin-api';
import { Avatar, Typography, Box, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';


/**
 * CustomHeader uses the portal's primary color and a shadow line on top.
 * Use this in place of Header for a consistent look across all pages.
 */
export const CustomHeader = ({ children, ...props }: React.ComponentProps<typeof Header>) => {
  const theme = useTheme();
  // Use black header in light theme, dark palette in dark theme
  const isDark = theme.palette.type === 'dark' || theme.palette.mode === 'dark';
  const headerBg = isDark ? theme.palette.background.paper : '#171717';
  const headerColor = '#fff';
  const searchBg = isDark ? theme.palette.background.default : '#fff';
  const searchText = isDark ? '#fff' : '#111';
  const searchPlaceholder = isDark ? '#bbb' : '#888';
  // AvatarMenu component: only avatar and Profile link, no user info
  function AvatarMenu() {
    const identity = useApi(identityApiRef);
    const user = identity.profile;
    const displayName = user?.displayName || user?.email || 'Guest';
    const email = user?.email;
    const picture = user?.picture;
    // Defensive: fallback to Guest if user is undefined
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleProfile = () => {
      handleClose();
      window.location.href = '/settings';
    };

    return (
      <>
        <IconButton
          aria-label="user menu"
          onClick={handleClick}
          style={{ padding: 0 }}
          size="medium"
        >
          <UserSettingsSignInAvatar size={40} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          style={{ minWidth: 260 }}
        >
          <Box display="flex" alignItems="center" px={2} py={1}>
            <Avatar src={picture ?? undefined} alt={displayName} sx={{ width: 48, height: 48, mr: 2 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} noWrap>{displayName}</Typography>
              {email && (
                <Typography variant="body2" color="text.secondary" noWrap>{email}</Typography>
              )}
            </Box>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfile} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: 12 }}>
              <UserSettingsSignInAvatar size={24} />
            </span>
            Profile
          </MenuItem>
        </Menu>
      </>
    );
  }

  // You can adjust the color here to match your portal's main color (e.g., #212121 or theme.palette.primary.main)
  return (
    <Header
      title=""
      style={{
        background: headerBg,
        color: headerColor,
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px -4px 12px 0px, rgb(22 24 25) 0px 2px 0px 0px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        minHeight: 64,
      }}
    >
      
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 700 }}>
          <SearchBar
            placeholder="Search..."
            style={{
              width: '100%',
              background: searchBg,
              borderRadius: 4,
              color: searchText,
            }}
            InputProps={{
              style: { color: searchText, background: searchBg },
              placeholder: 'Search...',
              inputProps: {
                style: { color: searchText },
              },
            }}
          />
          <style>{`
            header input[type="text"]::placeholder {
              color: ${searchPlaceholder} !important;
            }
            header .MuiInputBase-root .MuiButton-label {
              color: ${searchText} !important;
            }
          `}</style>
        </div>
      </div>
      <div style={{ marginLeft: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-16px -16px -16px 0px' }}>
          <AvatarMenu />
        </div>
      </div>
    </Header>
  );
};
