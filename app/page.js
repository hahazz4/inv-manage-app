'use client';
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Add } from "@mui/icons-material";
import { useDbActions } from "./dbActions/route";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Link from "next/link";

const placeholders = [
    "Enter the ingredient here",
    "How many apples are there?",
    "A square sponge that lives in a pineapple under the sea?",
];
 
const handleChange = () => {

};

const onSubmit = () => {
    
};

export default function Home() {
    const {
        inv,
        open,
        itemName,
        showAlert,
        setItemName,
        setShowAlert,
        handleOpen,
        handleClose,
        searchInv,
        addItem,
        removeItem
    } = useDbActions();

    return (
        <div className="justify-center items-center h-[100vh] w-[100vw] bg-black">
            <Modal
                open={open}
                onClose={handleClose}>
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    width={400}
                    bgcolor="black"
                    color="white"
                    border="2px solid black"
                    boxShadow={24}
                    padding={4}
                    display="flex"
                    flexDirection="column"
                    gap={3}
                    sx={{
                        transform: "translate(-50%, -50%)"
                    }}>
                    {/* <Box
                        width={800}
                        height={100}
                        bgcolor="black"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"> */}
                    {/* </Box> */}
                    <Typography variant="h5">Add Item</Typography>
                    <Stack width="100%" direction="row" spacing={2}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            sx={{
                                color: "black",
                                bgcolor: "white"
                            }}/>
                        <Button variant="contained" onClick={() => {
                            addItem(itemName);
                            setItemName('');
                            handleClose();
                        }}>
                            Add
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            <div className="text-center justify-center items-center">
                <div className="pt-10">
                    <Typography variant="h1" color="white">
                        PantryCook
                    </Typography>
                </div>

                <h2 className="text-center justify-center items-center text-xl mt-10 mb-5 dark:text-white text-black">
                    Search for Ingredients from the Pantry
                </h2>

                <PlaceholdersAndVanishInput
                placeholders={placeholders}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onSubmit={() => {
                    searchInv(itemName)
                    setItemName('');
                }}/>

                <div className="flex gap-5 text-center justify-center items-center">
                    <h5 className="text-center justify-center items-center text-xl mt-5 mb-5 dark:text-white text-black">
                        An ingredient missing?
                    </h5>
                    <Button variant="contained" onClick={handleOpen}>
                        Add Product
                   </Button>
                   {showAlert && (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={() => setShowAlert(false)}>
                        {itemName} was successfully added!
                    </Alert>
                    )}
                </div>
            </div>

            <div className="flex gap-5 text-center justify-center items-center">
                <h5 className="text-center justify-center items-center text-xl mt-5 mb-5 dark:text-white text-black">
                    Want to generate a recipe from the ingredients in your pantry?
                </h5>
                <Link href="/">
                    <Button variant="contained" onClick={handleOpen}>
                        Generate Recipe
                    </Button>
                </Link>
            </div>

            <div className="justify-center items-center">
                <div className="text-center justify-center items-center py-5">
                    <Typography variant="h2" color="white">
                        Inventory Items
                    </Typography>
                </div>
                
                <div className="mx-[20vw] justify-center items-center mb-20">
                    <Stack width="60vw" height="30vh" spacing={2} overflow="auto" id="listBg" sx={{marginBottom: 10, justifyContent: "center", alignItems: "center"}}>
                        {inv.map(({ name, quantity }) => (
                            <Box 
                                key={name}
                                width="100%"
                                minHeight={150}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                padding={8}>
                                <Typography variant="h3" justifyContent="center" alignItems="center" display="flex">
                                    {name.charAt(0).toUpperCase() + name.slice(1)}
                                </Typography>
                                <Typography variant="h3" justifyContent="center" alignItems="center" display="flex">
                                    {quantity}
                                </Typography>
                                <Stack direction="row" spacing={3}>
                                    <Button variant="contained" startIcon={<Add />} onClick={() => addItem(name)}>
                                        Add
                                    </Button>
                                    <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => removeItem(name)}>
                                        Remove
                                    </Button>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </div>
            </div>
        </div>
    );
}
