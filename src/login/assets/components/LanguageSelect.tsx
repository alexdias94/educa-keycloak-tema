import { Button, Menu, MenuItem } from "@mui/material";
import { I18n } from "./../../i18n";
import { Language as LanguageIcon } from '@mui/icons-material';
import { MouseEvent, useState } from "react";
import type { SxProps, Theme } from "@mui/material";

interface LanguageSelectProps {
  i18n: I18n;
  sx?: SxProps<Theme>;
}

const LanguageSelect = ({ i18n, sx }: LanguageSelectProps) => {
  const { currentLanguage, enabledLanguages } = i18n;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (href?: string) => {
    if (href?.length) {
      window.location.href = href;
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Button 
        aria-haspopup="true" 
        onClick={handleClick} 
        startIcon={<LanguageIcon />} 
        sx={{ 
          color: '#444', 
          textTransform: 'none',
          ...sx 
        }}
      >
        {currentLanguage.label}
      </Button>
      <Menu 
        anchorEl={anchorEl} 
        open={open} 
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {enabledLanguages.map(({ href, label, languageTag }) => (
          <MenuItem 
            onClick={() => handleClose(href)} 
            selected={languageTag === currentLanguage.languageTag} 
            key={languageTag}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { LanguageSelect };