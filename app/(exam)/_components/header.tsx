import { Button } from "@/components/ui/button";
import { TimerIcon } from "lucide-react";
import Countdown from "./count-down";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b h-[60px]">
      <h1 className="font-bold">模拟考试</h1>

      <div className="flex items-center gap-2 text-sm">
        <div>
          <span>满分：</span>
          <span>1000 分</span>
        </div>

        <div>
          <span>及格：</span>
          <span>600 分</span>
        </div>

        <div>
          <span>已答：</span>
          <span>0/60</span>
        </div>

        <div className="flex w-[150px]">
          <TimerIcon size={18} />
          <span>剩余时间：</span>
          <Countdown minutes={90} />
        </div>

        <Button size="sm">交卷</Button>
      </div>
    </header>
  );
};

export default Header;
