import { storeConfig } from "@/config/store";
import { canPublishAnnouncement } from "@/lib/commerce";

export function AnnouncementBar() {
  if (!canPublishAnnouncement()) return null;
  return <p className="announcement">{storeConfig.announcement.text}</p>;
}
