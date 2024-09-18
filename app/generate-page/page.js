'use client';
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { PiMouseScroll } from "react-icons/pi";
import { useDbActions } from "../dbActions/route";
import { Suspense, useState } from "react";
import { Button } from "@mui/material";
import Loading from "./loading";
import InvLoad2 from "../loading_3";

const placeholders = [
    "Enter preferences/restrictions here",
    "In a mood for Pakistani cuisine? Middle Eastern cuisine?",
    "Love that chicken from Popeyes (I love fried chicken)",
];

export default function ResultsPage(){
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

    return (
        <div className="items-center bg-black w-[100vw] h-[100vh]">
            <Link href="/">
                <Button className="mt-10 ml-10" id="buttons" variant="contained">
                    Home
                </Button>
            </Link>
            <div className="my-[10vh] flex px-5">
                <div className="mx-auto h-[60vh] w-[80vw] bg-white text-black overflow-auto rounded-xl">
                    <div className="justify-center items-center">
                        <p className="pt-10 text-center font-bold text-3xl">Recipe Generator</p>
                        <p className="p-5 text-center text-md italic">Enter what cuisine you would like to have, and if you have any preferences/restrictions.</p>
                        <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        onSubmit={() => setMsg("hello")}/>
                        <PiMouseScroll className="my-auto" size={30} color="black"/>
                        {loading ? (
                            <InvLoad2/>
                        ) : (
                        msg && (
                            <div className="justify-center items-center pb-20">
                                <p className="pt-10 text-center font-bold text-3xl">Butter Chicken</p>
                                <p className="text-center text-md italic">Hover over the link for a preview</p>
                                <div className="mt-5 flex gap-5 justify-center">
                                    <p className="text-xl">Cooking Time: 25 Minutes</p>
                                    <Link href="/"><p className="text-xl">Recipe Link Here</p></Link>
                                </div>
                                <p className="pt-5 mx-10 h-[25vh] text-md">writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                    writing recipe here dog, please provide all of it to ensure you dont troll
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
