import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { GetKlineProps } from "@/interfaces";

interface FormProps extends GetKlineProps {
  symbol: string;
  interval: string;
  limit: string;
}

interface CryptoFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formSubmit: any;
}

const CryptoForm = ({ formSubmit }: CryptoFormProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormProps>({
    defaultValues: {
      interval: "30m",
      limit: "500",
    },
  });

  const interval = watch("interval");
  const limit = watch("limit");

  const onSubmit: SubmitHandler<FormProps> = ({ symbol, interval, limit }) => {
    formSubmit({
      symbol,
      interval,
      limit,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="symbol">幣種</Label>
          <Input
            type="symbol"
            id="symbol"
            placeholder="幣種"
            {...register("symbol", { required: true })}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="interval">時間</Label>
          <Select
            value={interval}
            onValueChange={(value) => setValue("interval", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="30m" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="30m">30m</SelectItem>
              <SelectItem value="1h">1h</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="interval">筆數</Label>
          <Select
            value={limit}
            onValueChange={(value) => setValue("limit", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="500" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500">500</SelectItem>
              <SelectItem value="1000">1000</SelectItem>
              <SelectItem value="1500">1500</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <div />
          <Button type="submit">送出</Button>
        </div>
      </div>
    </form>
  );
};

export default CryptoForm;
