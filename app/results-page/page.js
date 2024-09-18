'use client';
import Link from "next/link";

export default function ResultsPage(){
    return (
        <div className="items-center bg-black w-[100vw] h-[100vh]">
            <div className="pt-[20vh]">
                <div className="mx-auto h-[60vh] w-[80vw] bg-white text-black overflow-auto rounded-xl">
                    <div className="justify-center items-center">
                        <p className="pt-10 text-center font-bold text-3xl">Your Recipes</p>
                        <p className="text-center text-md italic">Hover over the link for a preview</p>
                        <div className="mt-5 flex gap-5 justify-center">
                            <p className="text-xl">Butter Chicken</p>
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
                </div>
            </div>
        </div>
    );
}
