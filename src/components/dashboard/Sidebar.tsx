"use client";

import React from "react";
import { 
  FileText, 
  Mail, 
  Megaphone, 
  Clock, 
  Sparkles, 
  BarChart2, 
  Type 
} from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

function Sidebar() {
  return (
    <div className="w-80 h-[calc(100vh-4rem)] border-l bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        {/* Templates Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider">
            Templates
          </h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justification-start">
              <FileText className="mr-2 h-4 w-4" />
              Blog Post
            </Button>
            <Button variant="outline" className="w-full justification-start">
              <Mail className="mr-2 h-4 w-4" />
              Email Campaign
            </Button>
            <Button variant="outline" className="w-full justification-start">
              <Megaphone className="mr-2 h-4 w-4" />
              Ad Copy
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Recent Drafts Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider">
            Recent Drafts
          </h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm font-normal h-auto py-2">
              <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
              <div className="flex flex-col items-start truncate">
                <span className="truncate w-full">Project Alpha Launch</span>
                <span className="text-xs text-muted-foreground">Edited 2h ago</span>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm font-normal h-auto py-2">
              <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
              <div className="flex flex-col items-start truncate">
                <span className="truncate w-full">Q3 Marketing Strategy</span>
                <span className="text-xs text-muted-foreground">Edited 5h ago</span>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm font-normal h-auto py-2">
              <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
              <div className="flex flex-col items-start truncate">
                <span className="truncate w-full">Newsletter #42</span>
                <span className="text-xs text-muted-foreground">Edited 1d ago</span>
              </div>
            </Button>
          </div>
        </div>

         <Separator className="my-4" />

        {/* AI Suggestions Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider flex items-center">
            <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
            AI Suggestions
          </h3>
          <div className="bg-purple-50 dark:bg-zinc-800 p-3 rounded-md border border-purple-100 dark:border-zinc-700">
             <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
               Optimize your headline for better engagement.
             </p>
             <Button size="sm" variant="secondary" className="w-full text-xs h-7">
               Apply Fix
             </Button>
          </div>
        </div>
      </ScrollArea>
      
      {/* Stats Section (Fixed at bottom) */}
      <div className="p-4 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
         <h3 className="text-xs font-semibold mb-3 text-gray-500 uppercase tracking-wider">
            Stats
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-gray-100 dark:border-zinc-700">
               <div className="flex items-center text-xs text-muted-foreground mb-1">
                 <Type className="h-3 w-3 mr-1" />
                 Words
               </div>
               <div className="text-lg font-bold">1,240</div>
            </div>
             <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-gray-100 dark:border-zinc-700">
               <div className="flex items-center text-xs text-muted-foreground mb-1">
                 <BarChart2 className="h-3 w-3 mr-1" />
                 Score
               </div>
               <div className="text-lg font-bold text-green-600">92</div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Sidebar;
