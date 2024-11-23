import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CoinAnalytics } from "@/interfaces";

interface CryptoTableProps {
  data: CoinAnalytics | undefined;
}

const CryptoTable = ({ data }: CryptoTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-black ">
        <TableRow>
          <TableHead className="text-white text-center">幣別</TableHead>
          <TableHead className="text-white text-center">時間</TableHead>
          <TableHead className="text-white text-center">筆數</TableHead>
          <TableHead className="text-white text-center">總反轉次數</TableHead>
          <TableHead className="text-white text-center">上升止盈次數</TableHead>
          <TableHead className="text-white text-center">上升止損次數</TableHead>
          <TableHead className="text-white text-center">下降止盈次數</TableHead>
          <TableHead className="text-white text-center">下降止損次數</TableHead>
          <TableHead className="text-white text-center">
            忽略的反轉次數
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data ? (
          <TableRow className="text-center">
            <TableCell className="font-bold">{data.symbol}</TableCell>
            <TableCell>{data.interval}</TableCell>
            <TableCell>{data.limit}</TableCell>
            <TableCell>{data.reversalCount}</TableCell>
            <TableCell>{data.profitHitCount}</TableCell>
            <TableCell>{data.lossHitCount}</TableCell>
            <TableCell>{data.downwardProfitHitCount}</TableCell>
            <TableCell>{data.downwardLossHitCount}</TableCell>
            <TableCell>{data.ignoredReversalCount}</TableCell>
          </TableRow>
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center font-cold text-lg">
              暫無資料
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CryptoTable;
