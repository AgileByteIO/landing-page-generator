---
title: "Lernmanagementsystem"
description: "Online-Bildungsplattform für Kurse mit interaktivem Lernen und Zertifizierung"
pubDate: 2024-04-18
author: "Mario"
'service-icon': "software-development"
---

Eine moderne E-Learning-Plattform zum Erstellen und Durchführen von Online-Kursen. Mit Skalierbarkeit gebaut, unterstützt das System tausende von gleichzeitigen Lernenden mit glattem Video-Streaming und interaktiver Inhaltslieferung.

### Video-Streaming-Architektur

Die Plattform verwendet adaptives Bitrate-Streaming (HLS) für Video-Inhalte, die für die Verbindungsgeschwindigkeit jedes Benutzers optimiert sind. Das System passt die Qualität automatisch an Netzwerkbedingungen an und gewährleistet pufferfreie Wiedergabe bei wechselnden Verbindungsgeschwindigkeiten.

### Interaktive quizzes

Über passiven Video-Konsum hinaus engagieren sich Learner mit verschiedenen Quiz-Formaten:

- **Multiple Choice** - Einzelne oder mehrere richtige Antworten
- **Lückentext** - Texteingabe mit Fuzzy-Matching
- **Coding-Challenges** - Code in einer Sandbox ausführen und testen
- **Drag und Drop** - Elemente Kategorien zuordnen
- **Peer-Bewertungen** - Die Arbeit anderer Studenten bewerten

> "Unsere Quiz-Engine unterstützt Formelrendering, was sie perfekt für Mathe- und Naturwissenschaftskurse macht."

### Fortschrittsverfolgung

Das System führt detaillierte Fortschrittsdaten für jeden Learner:

1. **Video-Suchzeit** - Prozentsatz des Videos abgeschlossen
2. **Quiz-Punkte** - Versuchsverlauf und beste Punkte
3. **Kursabschluss** - Gesamtfortschritt zum Zertifikat
4. **Verbrachte Zeit** - Aktive Lernzeit vs. Gesamzeit

### Zertifikatgenerierung

Nach Kursabschluss erhalten Learner ein einzigartiges, verifizierbares Zertifikat. Zertifikate enthalten:

- QR-Code zur Verifizierung
- Eindeutige Zertifikat-ID
- Ausstellungsdatum und Kursdetails
- Unterschrift des Dozenten (digital)

Zertifikate werden auf IPFS für dauerhafte Verfügbarkeit gespeichert und können direkt von der Plattform auf LinkedIn geteilt werden.

---

*Gebaut mit Next.js, AWS S3, Lambda@Edge und PostgreSQL*