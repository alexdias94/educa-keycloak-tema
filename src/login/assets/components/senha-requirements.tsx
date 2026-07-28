import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CheckCircleOutlined, RadioButtonUnchecked } from "@mui/icons-material";
import { useEffect } from "react";

interface PasswordRequirementsProps {
  password: string;
  t: (key: string) => string;
  onValidationChange?: (isValid: boolean) => void;
}

// Componente para exibir os requisitos
const PasswordRequirements = ({ password, t, onValidationChange }: PasswordRequirementsProps) => {
  const requirements = [
    { key: "MinLength", test: password.length >= 8 },
    { key: "Number", test: /\d/.test(password) },
    { key: "Uppercase", test: /[A-Z]/.test(password) },
    { key: "Lowercase", test: /[a-z]/.test(password) },
    { key: "SpecialChar", test: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  useEffect(() => {
    const isValid = requirements.every(req => req.test);
    onValidationChange?.(isValid);
  }, [password]); // O array de dependências agora é monitorado pelo hook real

  return (
    <Paper variant="outlined" sx={{ p: 1, mt: 0, bgcolor: '#F5F7FA' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: '#343435' }}>
        {t("passwordRequirementsTitle")}
      </Typography>
      <List dense sx={{ p: 0 }}>
        {requirements.map((req) => (
          <ListItem key={req.key} sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              {req.test ? <CheckCircleOutlined color="success" fontSize="small" /> : <RadioButtonUnchecked fontSize="small" />}
            </ListItemIcon>
            <ListItemText 
              primary={t(`passwordRequirements${req.key}`)} 
              sx={{ 
                color: req.test ? 'green' : 'text.secondary', 
                fontSize: '14px' 
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export { PasswordRequirements };
