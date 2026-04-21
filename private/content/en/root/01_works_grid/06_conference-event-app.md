---
title: "Conference Event App"
description: "Mobile app for conference attendees with scheduling and networking features"
pubDate: 2024-06-22
author: "Mario"
'service-icon': "it-consulting"
---

Enhance the conference experience with this comprehensive attendee app. Built with React Native for both iOS and Android, it works offline and provides real-time updates throughout the event.

### Session Management

The app provides a comprehensive schedule view with:
- Personalized agenda based on saved sessions
- Room locations with indoor maps
- Speaker information and bios
- Session materials downloads
- Reminders before each session

```typescript
// Session notification scheduling
interface SessionNotification {
  sessionId: string;
  title: string;
  room: string;
  startsAt: Date;
  reminderMinutes: number;
}

function scheduleNotification(session: SessionNotification) {
  const trigger = new Date(session.startsAt);
  trigger.setMinutes(trigger.getMinutes() - session.reminderMinutes);
  
  Notifications.scheduleNotificationAsync({
    content: {
      title: `Starting Soon: ${session.title}`,
      body: `Room ${session.room}`,
    },
    trigger,
  });
}
```

### Speaker Profiles

Each speaker has a rich profile page featuring:
- Photo and professional bio
- Social media links
- List of their sessions
- Previous talks (video archive)
- Contact information (optional)

> "Attendees can bookmark speakers and get notified when they go live in Q&A sessions."

### Networking Features

Connect with other attendees through:

1. **Attendee directory** - Search by name, company, or interests
2. **AI-powered recommendations** - "People you should meet"
3. **Meeting scheduler** - Book 1:1 meetings during the event
4. **QR code exchange** - Scan badges to connect
5. **Chat rooms** - Topic-based discussion groups

```javascript
// Meeting request handler
async function requestMeeting(attendeeId, suggestedTimes) {
  const response = await api.post('/meetings/request', {
    targetId: attendeeId,
    preferredTimes: suggestedTimes,
    topic: 'Networking',
  });
  
  return response.status === 'pending' 
    ? 'Meeting request sent'
    : 'Could not send request';
}
```

### Real-Time Notifications

Push notifications keep attendees informed about:
- Schedule changes and room updates
- Session cancellations
- Live poll announcements
- Sponsor giveaways
- WiFi credentials
- Emergency alerts

---

*Built with React Native, Expo, Firebase, Node.js*