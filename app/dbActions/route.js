'use client'
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { collection, getDocs, getDoc, query, doc, setDoc, deleteDoc } from "firebase/firestore";

export function useDbActions() {
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

    return {
        inv,
        open,
        itemName,
        showAlert,
        setItemName,
        setShowAlert,
        handleOpen,
        handleClose,
        addItem,
        removeItem
    };
}
