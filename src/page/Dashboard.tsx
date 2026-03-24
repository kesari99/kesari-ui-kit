import {  ChartBarDecreasing, File, PanelRightInactive, User } from "lucide-react";
import Profile from "@/components/User";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import Booking from "@/components/Booking";
import DynamicFilter from "@/components/DynamicFilter";
import RecursiveFileExplorer from "@/components/RecursiveFileExplorer";
import RecursiveCommentTree from "@/components/RecursiveCommentTree";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("booking");

  const items = [
    {
      icon: User,
      label: "User",
      value: "user",
      component: <Profile />,
    },
    {
      icon:PanelRightInactive,
      label:"Dynamic Filter",
      value:"dynamic-filter",
      component:<DynamicFilter />
    },
    {
      icon:File,
      label:"File Explorer",
      value:"file-explorer",
      component:<RecursiveFileExplorer />
    },
    {
      icon:ChartBarDecreasing,
      label:"Comment Box",
      value:"comment-box",
      component:<RecursiveCommentTree />
    },
    // {
    //   icon: LucideArrowBigUp,
    //   label: "Booking",
    //   value: "booking",
    //   component: <Booking 

    //   layout={{
    //     rows: 8,
    //     seatsPerRow: 12,
    //     aislePosition: 5,
    //   }}
    //   seatType={{
    //     regular: { name: "Regular", price: 150, rows: [0, 1, 2] },
    //     premium: { name: "Premium", price: 250, rows: [3, 4, 5] },
    //     vip: { name: "VIP", price: 350, rows: [6, 7] },
    //   }}
      
    //   />,



    // },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 p-2  bg-gray-200">
        <h1>Dashboard view</h1>

        <nav>
          {items.map((item) => (
            <Button
              className="bg-slate-400 w-full mb-2"
              variant = {activeTab === item.value ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab(item.value)}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="max-w-7xl font-bold mb-8">Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.component ?? null}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
