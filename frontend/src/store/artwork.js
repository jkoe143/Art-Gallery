import { create } from "zustand";

export const useArtworkGallery = create((set) => ({
  artworks: [],
  setArtworks: (artworks) => set({ artworks }),
  
  createArtwork: async (newArtwork) => {
    if (!newArtwork.title || !newArtwork.date || !newArtwork.artist ||!newArtwork.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/artworks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArtwork),
    });
    const data = await res.json();
    set((state) => ({ artworks: [...state.artworks, data.data] }));
    return { success: true, message: "Artwork created successfully" };
  },
  
  fetchArtworks: async () => {
    const res = await fetch("/api/artworks");
    const data = await res.json();
    set({ artworks: data.data });
  },
  
  deleteArtwork: async (pid) => {
    const res = await fetch(`/api/artworks/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({ artworks: state.artworks.filter((artwork) => artwork._id !== pid) }));
    return { success: true, message: data.message };
  },
  
  updateArtwork: async (pid, updatedArtwork) => {
    const res = await fetch(`/api/artworks/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedArtwork),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      artworks: state.artworks.map((artwork) => (artwork._id === pid ? data.data : artwork)),
    }));

    return { success: true, message: data.message };
  },
}));





