import { HomeIcon, LogsIcon, MessageCircleIcon } from "lucide-react";

const PracticePage = () => {
  return (
    <div className="flex h-screen w-full  bg-zinc-950 gap-0">
        {/* Left sideBar */}
        <div className="w-[400px] m-4 rounded-lg flex flex-col">
            {/* Top Bar */}
            <div className="bg-zinc-800 rounded-lg">
                <div className="flex flex-col justify-center items-start rounded-md m-4">
                    <div className="flex p-2 w-full hover:bg-zinc-700 rounded-lg transition-colors duration-300 ease-in-out">
                        <HomeIcon className="text-white mr-4"/>
                        <p className="text-white text-sm font-medium">Home</p>
                    </div>
                    <div className="flex p-2 w-full hover:bg-zinc-700 rounded-lg transition-colors duration-300 ease-in-out">
                        <MessageCircleIcon className="text-white mr-4"/>
                        <p className="text-white text-sm font-medium">Message</p>
                    </div>
                </div>
            </div>
            {/* Second bar */}
            <div className="bg-zinc-800 rounded-lg mt-4 h-full">
                <div className="flex flex-col m-2">
                    <div className="flex p-2 w-full">
                        <LogsIcon className="ml-4 text-white"/>
                        <h3 className="text-white text-sm font-bold ml-4">Playlists</h3>
                    </div>
                    {/* Skeleton */}
                    <div className="mx-2 hover:bg-zinc-700 rounded-sm transition-colors duration-300 ease-in-out">
                        <div className="flex ml-4 my-2">
                            <div className="bg-white size-14 rounded-md" />
                            <div className="flex flex-col justify-around ml-4">
                                <div className="bg-zinc-600 rounded-md h-4 w-[160px] animate-pulse"/>
                                <div className="bg-zinc-600 rounded-md h-2 w-[160px] animate-pulse"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Main Layout */}
        <div className="bg-zinc-500 w-full m-4 rounded-lg"></div>
    </div>
  );
}

export default PracticePage;