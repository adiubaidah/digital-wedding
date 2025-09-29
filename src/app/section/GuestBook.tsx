import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "sonner";
import { axiosInstance } from "~/lib/utils";

function GuestBook() {
  const queryClient = useQueryClient()
  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [kehadiran, setKehadiran] = useState("hadir");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/api/guestbook", {
        nama,
        ucapan,
        isHadir: kehadiran === "hadir",
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Alhamdulillah");
      queryClient.invalidateQueries({ queryKey: ['guestbook'] })
      setNama("");
      setUcapan("");
      setKehadiran("hadir");
    },
    onError: () => {
      toast.error("Waduh gagal, coba lagi yaa");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="mt-10 px-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-noto-serif">Buku Tamu</h1>
        <p className="text-[11px] font-poppins">
          Isi Nama dan Ucapan Pernikahan Kami
        </p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Masukkan Nama"
          className="bg-white"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <Textarea
          placeholder="Masukkan Ucapan dan Doa"
          className="bg-white"
          value={ucapan}
          onChange={(e) => setUcapan(e.target.value)}
        />
        <Select value={kehadiran} onValueChange={setKehadiran}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Kehadiran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hadir">Insyallah Hadir</SelectItem>
            <SelectItem value="tidak">Ngapunten, Tidak Bisa Hadir</SelectItem>
          </SelectContent>
        </Select>

        <Button
          className="bg-gray-800 w-full hover:bg-gray-400 text-white"
          disabled={mutation.isPending}
          type="submit"
        >
          Kirim Sekarang
        </Button>
      </form>
    </div>
  );
}

export default GuestBook;
