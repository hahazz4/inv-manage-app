'use client'
import Image from "next/image";
// import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { firestore, Firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Box, Modal, Stack, TextField, Typography } from "@mui/material";

export default function Home(){
  //Setting state variables
  const [inv, setInv] = useState([]);
  const [open, setOpen] = useState([false]);
  const [itemName, setItemName] = useState('');
  
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
    const docRefer = doc(collection(firestore, 'inv'), item);
    const docSnapshot = await getDocs(docRefer);
    if (docSnapshot.exists()){
      const {quantity} = docSnapshot.data()
      await setDoc(docRefer, {quantity: quantity + 1})
    }
    else
      await setDoc(docRefer, {quantity: 1})
    await updateInv();
  };

  //Remove Item
  const removeItem = async(item) => {
    const docRefer = doc(collection(firestore, 'inv'), item);
    const docSnapshot = await getDocs(docRefer);
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
      gap = {2}>
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
                    }}>
                  </TextField>
                </Stack>
            </Box>
        </Modal>
        <Typography variant="h1">Inventory Management</Typography>  
    </Box>
  );
}
