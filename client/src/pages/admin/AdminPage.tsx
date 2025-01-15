import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";
import SongTabContent from "./components/SongTabContent";
import AlbumTabContent from "./components/AlbumTabContent";
import { useEffect } from "react";
import { UseMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
    const {isAdmin, isLoading} =  useAuthStore();
    const {fetchAlbums, fetchSongs, fetchStats} = UseMusicStore();
    useEffect(() => {
        fetchAlbums();
        fetchSongs();
        fetchStats();
    },[fetchAlbums, fetchSongs, fetchStats]);

    if(!isAdmin && !isLoading) return <div>Unauthorized</div>
   
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
            <Header />

            <DashboardStats /> 

            <Tabs defaultValue="songs" className="data-[state=active]:bg-zinc-700">
                <TabsList className="p-1 bg-zinc-800/50">
                    <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white">
                        <Music className="mr-2 size-4"/>Songs
                    </TabsTrigger>
                    <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white">
                        <Album className="mr-2 size-4"/>Albums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='songs'>
                    <SongTabContent />
                </TabsContent>
                <TabsContent value='albums'>
                    <AlbumTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AdminPage;