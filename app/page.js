'use client';
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { PiMouseScroll } from "react-icons/pi";
import { Add } from "@mui/icons-material";
import { useDbActions } from "./dbActions/route";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Link from "next/link";
import { useState, useEffect } from "react";
import InvLoad from "./loading_2";

const placeholders = [
    "Enter the ingredient here",
    "How many apples are there?",
    "A square sponge that lives in a pineapple under the sea?",
];

export default function Home() {
    const {
        inv,
        open,
        itemName,
        showAlert,
        searchRes,
        loading,
        setItemName,
        setShowAlert,
        handleOpen,
        handleClose,
        searchInv,
        addItem,
        removeItem
    } = useDbActions();

    const [msg, setMsg] = useState("");

    const handleSearch = async () => {
        await searchInv(itemName);
        setItemName('');
    };

    useEffect(() => {
        if (searchRes){
            const timer = setTimeout(() => {
                setMsg('');
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [searchRes]);

    useEffect(() => {
        if (searchRes){
            if (searchRes.status === "found")
                setMsg(`Your search was found! Quantity: ${searchRes.quantity}`);
            else if (searchRes.status === "not-found")
                setMsg(`Sorry, it is not in the pantry.`);
        }
    }, [searchRes]);

    return (
        <div className= "w-[100vw] bg-black">
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
                    <Typography variant="h5">Add a Item</Typography>
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
                        <Button id="buttons" variant="contained" onClick={() => {
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
                    <Typography variant="h2" fontWeight="bold" color="white">
                        PantryCook
                    </Typography>
                </div>

                <h2 className="text-center justify-center items-center text-xl mt-10 mb-5 dark:text-white text-black">
                    Search for Ingredients
                </h2>

                <PlaceholdersAndVanishInput
                placeholders={placeholders}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onSubmit={handleSearch}/>

                {msg && (
                    <div className="p-5 justify-center text-center items-center text-white">
                        {msg}
                    </div>
                )}

                <div className="flex gap-5 text-center justify-center items-center">
                    <h5 className="text-center justify-center items-center text-xl mt-5 mb-5 dark:text-white text-black">
                        An ingredient missing?
                    </h5>
                    <Button id="buttons" variant="contained" onClick={handleOpen}>
                        Add Ingredient
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
                    Want to generate a recipe from the ingredients available?
                </h5>
                <Link href="/generate-page/">
                    <Button id="buttons" variant="contained" onClick={handleOpen}>
                        Generate Recipe
                    </Button>
                </Link>
            </div>

            <div className="justify-center items-center">
                <div className="text-center justify-center items-center py-5">
                    <Typography variant="h4" color="white">
                        Inventory Items
                    </Typography>
                </div>
                
                <div className="flex mx-[10vw] pb-20 justify-center items-center">
                    <Stack width="80vw" height="30vh" overflow="auto" id="listBg" borderRadius={10}>
                        {loading ? (
                            <InvLoad/>
                        ) : (
                        inv.map(({ name, quantity }) => (
                            <Box
                            key={name}
                            width="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            padding={4}>
                                <Typography variant="h5" justifyContent="center" alignItems="center" display="flex">
                                    {name.charAt(0).toUpperCase() + name.slice(1)}
                                </Typography>
                                <Typography variant="h5" justifyContent="center" alignItems="center" display="flex">
                                    {quantity}
                                </Typography>
                                <Stack direction="row" spacing={3}>
                                    <Button id="buttons" variant="contained" startIcon={<Add />} onClick={() => addItem(name)}>
                                        Add
                                    </Button>
                                    <Button id="buttons" variant="contained" startIcon={<DeleteIcon />} onClick={() => removeItem(name)}>
                                        Remove
                                    </Button>
                                </Stack>
                            </Box>
                        ))
                    )}
                    </Stack>
                    <PiMouseScroll size={50} color="white"/>
                </div>
            </div>
        </div>
    );
}
