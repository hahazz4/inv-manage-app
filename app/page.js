'use client';
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { collection, getDocs, getDoc, query, doc, setDoc, deleteDoc } from "firebase/firestore";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Add } from "@mui/icons-material";

export default function Home() {
  const [inv, setInv] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const updateInv = async () => {
    console.log("Fetching inventory items...");
    try {
      const snapshot = await getDocs(query(collection(firestore, 'inv')));
      const invList = [];
      snapshot.forEach((doc) => {
        console.log("Fetched item:", doc.id, doc.data());
        invList.push({
          name: doc.id,
          ...doc.data(),
        });
      });
      setInv(invList);
      console.log("Updated inventory list:", invList);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  const addItem = async (item) => {
    if (!item) return;
    try {
      const docRef = doc(firestore, 'inv', item);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const { quantity } = docSnapshot.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
      setShowAlert(true);
      await updateInv();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const removeItem = async (item) => {
    try {
      const docRef = doc(firestore, 'inv', item);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const { quantity } = docSnapshot.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
      }
      await updateInv();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    updateInv();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box 
      id="bg"
      width="100vw" 
      height="100vh" 
      alignItems="center" 
      justifyContent="center" 
      display="flex"
      flexDirection="column"
      gap={2}>
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
      <Button variant="contained" onClick={handleOpen}>
        Add Product
      </Button>
      {showAlert && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={() => setShowAlert(false)}>
          {itemName} was successfully added!
        </Alert>
      )}
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
        <Stack width={800} height={300} spacing={2} overflow="auto" id="listBg">
          {inv.map(({ name, quantity }) => (
            <Box 
              key={name}
              width="100%"
              minHeight={150}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={5}>
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
      </Box>
    </Box>
  );
}
