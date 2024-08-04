'use client'
import Image from "next/image";
// import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { collection, getDocs, getDoc, query, doc, setDoc, deleteDoc } from "firebase/firestore";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Add } from "@mui/icons-material";

export default function Home(){
  //Setting state variables
  const [inv, setInv] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const updateInv = async() => {
    const snapshot = query(collection(firestore, 'inv'));
    const docs = await getDocs(snapshot);
    const invList = [];
    docs.forEach((doc) => {
      invList.push({
        name: doc.id,
        ...doc.data(),
      });
    })
    setInv(invList);
    // console.log(invList); //Testing
  };

  //Add item
  const addItem = async(item) => {
    if (item === null || item === '')
      return;
    const docRefer = doc(collection(firestore, 'inv'), item);
    const docSnapshot = await getDoc(docRefer);
    if (docSnapshot.exists()){
      const {quantity} = docSnapshot.data()
      await setDoc(docRefer, {quantity: quantity + 1})
      setShowAlert(true);
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Here is a gentle confirmation that your action was successful.
    </Alert>
    }
    else
      await setDoc(docRefer, {quantity: 1})
    await updateInv();
    
  };

  //Remove Item
  const removeItem = async(item) => {
    const docRefer = doc(collection(firestore, 'inv'), item);
    const docSnapshot = await getDoc(docRefer);
    if (docSnapshot.exists()){
      const {quantity} = docSnapshot.data()
      if (quantity === 1)
        await deleteDoc(docRefer)
      else
        await setDoc(docRefer, {quantity: quantity - 1})
    }
    await updateInv();
  };

  useEffect(() => {
    updateInv();
  }, []);

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box 
      width = "100vw" 
      height = "100vh" 
      alignItems = {"center"} 
      justifyContent = {"center"} 
      display = {"flex"}
      flexDirection={"column"}
      gap = {2}>
        {/* <Typography variant="h1">Inventory Management</Typography> */}
        <Modal
          open = {open}
          onClose = {handleClose}>
            <Box
              position={"absolute"}
              top="50%"
              left="50%"
              width={400}
              bgcolor="black"
              color="white"
              border="2px solid black"
              boxShadow={24}
              padding={4}
              display={"flex"}
              flexDirection={"column"}
              gap={3}
              sx={{
                transform: "translate(-50%, -50%)"
              }}>
                <Typography variant="h5">Add Item</Typography>
                <Stack width="100%" direction="row" spacing={2}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={itemName}
                    onChange={(e) => {
                      setItemName(e.target.value)
                    }}
                    sx={{
                      color: "black",
                      bgcolor: "white"
                    }}/>

                    <Button variant="contained"
                      onClick={() => {
                        addItem();
                        setItemName('');
                        handleClose();
                      }}
                      // sx={{
                      //   color: "black",
                      //   bgcolor: "white",
                      // }}
                      >
                        Add</Button>
                </Stack>
            </Box>
        </Modal>
        <Button variant="contained" onClick={()=>{handleOpen();}}>
          Add Product
        </Button>
        <Box border="2px solid black">
          <Box
            width={800}
            height={100}
            bgcolor="black"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center">
              <Typography variant="h2" color="white">
                Inventory Items
              </Typography>
          </Box>
          <Stack width={800} height={300} spacing={2} overflow="auto">
            {
              inv.map(({name, quantity}) => (
                <Box 
                  key={name}
                  width="100%"
                  minHeight={150}
                  display="flex"
                  alignItems="center"
                  justifyContent={"space-between"}
                  padding={5}>
                    <Typography variant="h3" justifyContent={"center"} alignItems={"center"} display={"flex"}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography variant="h3" justifyContent={"center"} alignItems={"center"} display={"flex"}>
                      {quantity}
                    </Typography>
                    <Stack direction={"row"} spacing={3}>
                      <Button variant="contained" startIcon={<Add />} onClick={()=>{addItem(name);}}>
                        Add
                      </Button>
                      <Button variant="contained" startIcon={<DeleteIcon />} onClick={()=>{removeItem(name);}}>
                        Remove
                      </Button>
                    </Stack>
                  </Box>
              ))
            }
          </Stack>
        </Box>
    </Box>
  );
}
