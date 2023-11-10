import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";

export const PaperSXX = {
    border: "2px solid",
    borderColor: "secondary.main",
    borderRadius: "10px",
    backgroundColor:
        "linear-gradient(180deg, #0D2430 0%, rgba(13, 36, 48, 0) 100%)",
    background: "linear-gradient(180deg, #0D2430 0%, rgba(13, 36, 48, 0) 100%)",
    transition: 'transform .2s',
};

// export const CustomBox = styled(Box)({
//     border: "2px solid",
//     borderColor: "secondary.main",
//     borderRadius: "10px",
//     margin: '-2px',
//     position: 'relative',
//     zIndex: 1,
//     p: 2,
// });

export const CustomTextField = styled(TextField)({
    "& input": {
        color: "white", // Color del texto
    },
    "& label.Mui-focused": {
        color: "#A0AAB4",
    },
    "& label": {
        color: "white", // Color del label
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#E0E3E7", // Color del Borde
            backgroundColor: "rgb(255,255,255, 0.1)",
        },
        "&:hover fieldset": {
            borderColor: "#B2BAC2",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#6F7E8C",
        },
    },
});
