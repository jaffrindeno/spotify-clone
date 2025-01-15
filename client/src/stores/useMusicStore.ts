import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
import {create} from 'zustand';

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    isFetched: boolean;
    error: String | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];
    stats: Stats;
    
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id:string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
}

export const UseMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    isFetched: false,
    error: null,
    currentAlbum: null,
    featuredSongs: [],
    madeForYouSongs: [],
    trendingSongs: [],
    stats: {
        totalAlbums: 0,
        totalArtists: 0,
        totalSongs: 0,
        totalUsers: 0
    },

    deleteSong: async(id: string) => {
        set({isLoading: true, error:null});
        try{
            await axiosInstance.delete(`admin/songs/${id}`);

            set(state => ({
                songs: state.songs.filter(song => song._id !== id)
            }));
            toast.success("Song deleted Successfully");
        }catch(error: any) {
            console.log("Error in deleteSong", error);
            toast.error("Error Deleting Song");
        } finally {
            set({isLoading: false});
        }
    },
    deleteAlbum: async(id:string) => {
        set({isLoading: true, error:null});
        try{
            await axiosInstance.delete(`admin/albums/${id}`);

            set(state => ({
                albums: state.albums.filter(album => album._id !== id),
                songs: state.songs.map((song) => 
                    song.albumId === state.albums.find((a) => a._id === id)?.title? {...song, album: null} : song
                ),
            }));
            toast.success("Album deleted Successfully");
        }catch(error: any) {
            console.log("Error in deleteAlbum", error);
            toast.error("Error Deleting Album");
        } finally {
            set({isLoading: false});
        }
    },
    fetchSongs: async() => {
        set({isLoading:true, error: null});
        try{
            const response = await axiosInstance("/songs");
            set({songs: response.data});
        } catch (error: any) {
            set({error: error.message})
        } finally{
            set({isLoading: false});
        }
    },
    fetchStats: async() => {
        set({isLoading: true, error:null});
        try{
            const response = await axiosInstance("/stats");
            set({stats: response.data})
        } catch(error: any) {
            set({error: error.message})
        } finally {
            set({isLoading: false})
        }
    },
    fetchAlbums: async() => {
        set((state) => {
            if(state.isFetched) return state;
            return {
                isLoading: true,
                error: null,
            }
        });

        try{
            const response = await axiosInstance("/album");
            set({
                albums: response.data,
                isLoading: false,
                isFetched: true,
            });
        } catch (error: any) {
            set({error: error.response.data.message});
        } 
    },
    fetchAlbumById: async(id) => {
        set({
            isLoading: true,
            error:null
        });

        try{
            const response = await axiosInstance(`/album/${id}`);
            set({currentAlbum: response.data});
        } catch(error: any){
            set({error: error})
        } finally {
            set({isLoading: false});
        }
    },
    fetchFeaturedSongs: async() => {
        set({isLoading:true, error: null});
        try{
            const response = await axiosInstance("/songs/featured")
            set({featuredSongs: response.data});
        } catch(error: any) {
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false})
        }
    },
    fetchMadeForYouSongs: async() => {
        set({isLoading:true, error: null});
        try{
            const response = await axiosInstance("/songs/made-for-you")
            set({madeForYouSongs: response.data});
        } catch(error: any) {
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false})
        }
    },
    fetchTrendingSongs: async() => {
        set({isLoading:true, error: null});
        try{
            const response = await axiosInstance("/songs/trending")
            set({trendingSongs: response.data});
        } catch(error: any) {
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false})
        }
    },
}))