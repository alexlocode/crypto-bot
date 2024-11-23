"use client";
import CryptoForm from "@/components/cryptoForm";
import CryptoTable from "@/components/cryptoTable";
import { getCoinAnalytics } from "@/services/cryptoService";
import { useState } from "react";
import type { GetKlineProps, CoinAnalytics } from "@/interfaces";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [data, setData] = useState<CoinAnalytics>();

  const getData = async (data: GetKlineProps) => {
    try {
      const res = await getCoinAnalytics(data);
      setData(res);
      toast({
        description: "獲取資料成功!",
      });
    } catch (error) {
      console.log("error", error);
      toast({
        variant: "destructive",
        description: "獲取資料失敗!",
      });
    }
  };
  return (
    <div className="bg-[#323232] min-h-screen pt-[100px]">
      <div className="m-auto w-[1000px] bg-white rounded p-5">
        <h1 className="text-xl font-bold text-center pb-3">幣安合約策略計算</h1>
        <CryptoForm formSubmit={getData} />

        <div className="py-5">
          <CryptoTable data={data} />
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Home;
