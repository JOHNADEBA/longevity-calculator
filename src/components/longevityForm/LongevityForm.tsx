import React, { useState } from "react";
import { useGlobalContext } from "../../services/context";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { additionalFormInputData, formInputsData } from "../../services/data";
import SendIcon from '@mui/icons-material/Send';

import styles from "./LongevityForm.module.scss";
import Result from "../result/Result";

const LongevityForm: React.FC = () => {
  const {
    handleChange,
    getState,
    getLifeExpectancy
  } = useGlobalContext();

  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const toggleResultsModal = () => {
    setShowResultsModal(!showResultsModal);
  };

  const capitalizeFirstLetter = (label: string): string => {
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getLifeExpectancy();
    toggleResultsModal();
  };

  return (

    <div className={styles["longevity-container"]}>
      <Grid container spacing={2}>
        {formInputsData?.map((formInput) => (
          <React.Fragment key={formInput.id}>
            {formInput?.type === "select" && (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {capitalizeFirstLetter(formInput.label)}
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getState(formInput.label.split(" ")[0])}
                    label={formInput.label}
                    name={formInput.label.split(" ")[0]}
                    onChange={(e) => handleChange(e.target.name, e.target.value)
                    }
                  >
                    {formInput?.items?.map((item: string, index: number) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {formInput?.type === "text" && (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Box>
                  <TextField
                    required fullWidth
                    type="number"
                    id="outlined-error-helper-text"
                    label={capitalizeFirstLetter(formInput.label)}
                    variant="outlined"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    name={formInput.label.split(" ")[0]}
                    value={getState(formInput.label.split(" ")[0])}
                  />
                </Box>
              </Grid>
            )}

            {formInput?.type === "radio" && (
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name={formInput.label.split(" ")[0]}
                    defaultValue={getState(formInput.label.split(" ")[0])}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    value={getState(formInput.label.split(" ")[0])}
                  >
                    {formInput?.items?.map((item: string, index: number) => (
                      <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
      <div className={styles["divider-container"]}>
        <Divider
          textAlign="center"
          sx={{
            "&.MuiDivider-root::before, &.MuiDivider-root::after": {
              borderTop: "3px solid rgba(76, 74, 92, 0.1)",
              borderBottom: "none",
            },
          }}
          className={styles.divider}
        >
          ADDITIONAL LIFESTYLE FACTORS
        </Divider>
      </div>

      <Grid sx={{ mb: 5 }} container spacing={2}>
        {additionalFormInputData?.map((formInput) => (
          <React.Fragment key={formInput.id}>
            {formInput?.type === "select" && (
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {capitalizeFirstLetter(formInput.label)}
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getState(formInput.label.split(" ")[0])}
                    label={formInput.label}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    name={formInput.label.split(" ")[0]}
                  >
                    {formInput?.items?.map((item: string, index: number) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {formInput?.type === "text" && (
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    fullWidth
                    type="number"
                    id="outlined-basic"
                    label={capitalizeFirstLetter(formInput.label)}
                    variant="outlined"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    name={formInput.label.split(" ")[0]}
                    value={getState(formInput.label.split(" ")[0])
                    }
                  />
                </Box>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>

      <p className="seperator"></p>
      <Box className={styles["btn-container"]}  >
        <Button className={styles["calculate-btn"]} endIcon={<SendIcon />}
          variant="contained" onClick={(e) => handleSubmit(e)}>
          Calculate
        </Button>
      </Box>

      <Result
        showResultsModal={showResultsModal}
        toggleResultsModal={toggleResultsModal}
      />
    </div>
  );
};

export default LongevityForm;
