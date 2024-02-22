import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
} from "@mui/material";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";

enum EmailPasswordField {
  EMAIL = "email",
  PASSWORD = "password",
}

export type EmailPasswordForm = {
  [key in EmailPasswordField]: string;
};

type EmailPasswordProps = {
  onValid: (formData: EmailPasswordForm) => void;
  title: string;
  isProcessing: boolean;
};

function EmailPassword({ onValid, title, isProcessing }: EmailPasswordProps) {
  const { handleSubmit, register } = useForm<EmailPasswordForm>();
  return (
    <div className={styles.contentContainer}>
      <Card variant="outlined" className={styles.card}>
        <form onSubmit={handleSubmit(onValid)}>
          <CardHeader title={title} />
          <CardContent className={styles.form}>
            <TextField
              {...register(EmailPasswordField.EMAIL, { required: true })}
              required={true}
              label="Email"
              variant="outlined"
            />
            <TextField
              {...register(EmailPasswordField.PASSWORD, { required: true })}
              required={true}
              label="Password"
              variant="outlined"
            />
            <Button type="submit" variant="contained" disabled={isProcessing}>
              {title}
            </Button>
            {isProcessing && <CircularProgress />}
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

export default EmailPassword;
