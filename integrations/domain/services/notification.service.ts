type Notification = {
  isRead: boolean
}

/**
 * 通知
 * @category Services
 */
export class NotificationService {
  /**
   * if there is an 'unread' notification
   * 通知の中に未読のものが混じっているかどうか
   */
  hasUnread(notifications: Notification[]) {
    const unreadNotifications = notifications.filter((notification) => {
      if (notification === null) return false

      return !notification.isRead
    })

    return unreadNotifications.length > 0
  }
}
