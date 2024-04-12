import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/icons-material";

function CustomCard(props) {
  return (
    <Card className="job-card" style={{ backgroundColor: "#9FAFCA" }}>
      <CardContent style={{ paddingBottom: "8px" }}>
        <Typography
          variant="h6"
          component="h2"
          fontWeight="bold"
          fontFamily="Poppins, sans-serif"
        >
          {props.name}: {props.title}
        </Typography>
        <Typography
          color="textSecondary"
          style={{
            fontStyle: "italic",
            fontFamily: "Poppins, sans-serif",
            margin: "16px 0",
          }}
        >
          Salary: {props.salary}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{
            fontFamily: "Poppins, sans-serif",
            margin: "16px 0",
            fontSize: "1rem",
          }}
        >
          {props.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="https://www.indeed.com/"
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<Link />}
        >
          Apply
        </Button>
      </CardContent>
    </Card>
  );
}

export default CustomCard;
