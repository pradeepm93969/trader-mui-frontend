import Link from "next/link";
import { useTheme, Typography } from "@mui/material";

interface CustomLinkProps {
  href: string;
  text: string;
  fontWeight?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, text, fontWeight }) => {
  const theme = useTheme();
  const color =
    theme.palette.mode === "light" ? "#09090B" : theme.palette.primary.main; // use primary color in dark mode

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography
        variant="body1"
        fontWeight={fontWeight}
        sx={{
          color: color,
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        }}
      >
        {text}
      </Typography>
    </Link>
  );
};

export default CustomLink;
