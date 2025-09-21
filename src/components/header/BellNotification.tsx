"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LOCAL_STORAGE_USER_ID } from "@/lib/constants";
import {
  fetchUnreadCount,
  fetchUserNotifications,
  markAllRead,
  markAsRead,
} from "@/actions/userService";

interface Notification {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function BellNotification() {
  const t = useTranslations("notification");
  const [unreadCount, setUnreadCount] = useState<number>(-1);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("unread");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (userId) return;
    const fetchData = async () => {
      const id = localStorage.getItem(LOCAL_STORAGE_USER_ID);
      if (!id) return;
      setUserId(id);
      await handleFetchUnreadCount(id);
      await handleFetchNotifications(id);
    };
    fetchData();
  }, [userId]);

  const handleFetchUnreadCount = async (userId: string) => {
    fetchUnreadCount(userId).then(setUnreadCount);
  };

  const handleFetchNotifications = async (userId: string) => {
    fetchUserNotifications(userId).then(setNotifications);
  };

  const handleMarkAllRead = async (userId: string) => {
    await markAllRead(userId);
    handleFetchNotifications(userId);
    handleFetchUnreadCount(userId);
  };

  const handleMarkAsRead = async (userId: string, id: string) => {
    await markAsRead(userId, id);
    handleFetchNotifications(userId);
    handleFetchUnreadCount(userId);
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="relative cursor-pointer">
        <Bell className="hover:text-primary" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        )}
      </div>

      {open && (
        <div className="absolute right-0 w-[320px] background border rounded-lg shadow-lg z-50 p-3 text-sm ">
          <div className="flex justify-end items-center mb-2">
            {unreadNotifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleMarkAllRead(userId || "");
                }}
                className="text-zinc-900 dark:text-primary cursor-pointer"
              >
                {t("mark-all-read")}
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-2 w-full cursor-pointer">
              <TabsTrigger value="unread" className="cursor-pointer">
                {t("unread")}
              </TabsTrigger>
              <TabsTrigger value="all" className="cursor-pointer">
                {t("all")}
              </TabsTrigger>
            </TabsList>

            <div className="overflow-y-auto max-h-64">
              <TabsContent value="unread">
                {unreadNotifications.length === 0 ? (
                  <p className="text-center text-gray-400 pb-10">
                    {t("no-unread-notifications")}
                  </p>
                ) : (
                  unreadNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "flex justify-between items-center mb-3 border-b pb-2",
                        !n.isRead && "font-semibold cursor-pointer"
                      )}
                      onClick={() => handleMarkAsRead(userId || "", n.id)}
                    >
                      <div>
                        <p>{n.message}</p>
                        <small className="text-gray-500">
                          {new Date(n.createdAt).toLocaleString()}
                        </small>
                      </div>
                      {!n.isRead && (
                        <div className="flex items-start justify-center">
                          <span className="h-2 w-2 rounded-full bg-red-500" />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="all">
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-400 pb-10">
                    {t("no-notifications")}
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "flex justify-between items-center mb-3 border-b pb-2",
                        !n.isRead && "font-semibold cursor-pointer"
                      )}
                      onClick={() => {
                        if (!n.isRead) {
                          handleMarkAsRead(userId || "", n.id);
                        }
                      }}
                    >
                      <div>
                        <p>{n.message}</p>
                        <small className="text-gray-500">
                          {new Date(n.createdAt).toLocaleString()}
                        </small>
                      </div>
                      {!n.isRead && (
                        <div className="flex items-start justify-center">
                          <span className="h-2 w-2 rounded-full bg-red-500" />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </TabsContent>
            </div>
          </Tabs>

          <div className="flex items-center justify-center pt-3">
            <Link
              href="notifications"
              onClick={() => setOpen(false)}
              className="text-zinc-900 dark:text-primary font-bold"
            >
              {t("view-history")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
