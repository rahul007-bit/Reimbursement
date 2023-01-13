import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

const FormName = ({ setFormName, formName }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = (event) => {
    setFormName(event.target.value);
  };

  return (
    <Card variant="outlined">
      <Tooltip title={"Form Name"}>
        {isEditing ? (
          <CardContent>
            <TextField
              fullWidth
              label={"Form Name"}
              value={formName}
              autofocus
              onBlur={() => {
                if (formName === "") {
                  setFormName("Untitled Form");
                }
                setIsEditing(false);
              }}
              onChange={handleEdit}
              variant={"standard"}
            />
          </CardContent>
        ) : (
          <CardActionArea
            sx={{
              borderRadius: "5px",
            }}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <CardContent
              sx={{
                padding: "0.5rem",
              }}
            >
              <Typography variant={"h6"} fontWeight={"bold"} padding={"10px"}>
                {formName}
              </Typography>
            </CardContent>
          </CardActionArea>
        )}
      </Tooltip>
    </Card>
  );
};

export default FormName;
