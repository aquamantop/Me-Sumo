import { styled } from "@mui/material/styles";
import { Box, TextField, Button } from "@mui/material";

export const PaperSXX = {
    border: "2px solid",
    borderColor: "secondary.main",
    borderRadius: "10px",
    backgroundColor:
        "linear-gradient(180deg, #0D2430 0%, rgba(13, 36, 48, 0) 100%)",
    background: "linear-gradient(180deg, #0D2430 0%, rgba(13, 36, 48, 0) 100%)",
    transition: 'transform .2s',
};

export const BoxSX = {
    border: "2px solid",
    borderColor: "secondary.main",
    borderRadius: "10px",
    margin: '-2px',
    position: 'relative',
    zIndex: 1,
    p: 2,
};

export const MenuListSX = {
    '&:hover': {
        backgroundColor: "rgb(255,255,255, 0.1)",
      },
}
export const TextFieldSX = {
    "& label": {
        color: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#E0E3E7",
            backgroundColor: "rgb(255,255,255, 0.1)",
            
        },
    },
}
export const ButtonSX = {
    p: 1.5,
    backgroundColor: "background.paper",
    borderColor: '#3FEBBD',
    fontWeight: 700,
    borderWidth: '2px',
    borderStyle: 'solid',
    color: 'secondary.main',
    '&:hover': {
        backgroundColor: 'secondary.main',
        color: 'background.paper',
    },
}

export const TabsSX = {
    marginLeft: '30px',
    '& .MuiTab-root': {
        textTransform: 'none',
        minWidth: 'auto',
        padding: '2px 10px',
        fontSize: '20px',
        fontWeight: 500,
        marginLeft: '10px',
        // backgroundColor: '#5DBE7A',
        borderRadius: '10px 10px 0 0',
        border: '1px solid #3FEBBD',
        '&.Mui-selected': { // Estilos para la pestaña seleccionada
            color: '#000', // Color del texto
            backgroundColor: '#3FEBBD', // Color de fondo
        },
    },
}

export const CustomButton = ({ buttonText }) => {
    return (
        <Button
            variant="contained"
            color="background"
            sx={{

                height: '50px',
                borderColor: '#3FEBBD',
                fontWeight: 700,
                borderWidth: '2px',
                borderStyle: 'solid',
                color: '#3FEBBD',
                '&:hover': {
                    backgroundColor: '#3FEBBD',
                    color: '#03081B',
                },
            }}
            fullWidth
        >
            {buttonText}
        </Button>
    );
}


export const CustomTextField = styled(TextField)({
    "& label": {
        color: "white", 
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#E0E3E7",
            backgroundColor: "rgb(255,255,255, 0.1)",
        },
    },
});
