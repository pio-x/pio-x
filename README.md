# Pio X
Der Pio X Source Code

# Installation

Abhängigkeiten installieren:

 * Install (Node.js)[https://nodejs.org/en/]
 * Update NPM: `npm install npm@latest -g`
 * Install Ionic & Cordova: `npm install -g cordova ionic`
 * Ins App Verzeichnis wechseln: `cd app`
 * NPM Pakete installieren: `npm install`
 * Ionic starten: `ionic serve` (Browser mit der App wird gestartet)

App Plattformen hinzufügen (optional):

 * `ionic platform add ios`
 * `ionic platform add android`


#Allgemeine Regeln:

Stationen:
 * Einnehmen gibt keine Punkte
 * nur Punkte über Zeit, alle 5 Minuten

MisterX:
 * Jeder MisterX kann pro Gruppe nur einmal gecatcht werden
 * Infos über alle MisterX's können immer nach einer gewissen Punkteanzahl angezeigt werden. Dafür kann die Gruppe manuell einen 'Timer' starten, Für eine gewisse Zeit werden dann alle MisterX angezeigt

Rätsel:
 * nur einmal pro Gruppe lösbar
 * Rätsel werden unlocked wenn in der Nähe ('unlocked' = Rätseltext kann angezeigt werden)

Passcode:
 * Code (und evtl. Bild) eingeben
 * Passcodes werden für rätsel und MisterX verwendet
 * einige rätsel können nach einem obligatorischen (required) Bild verlangen

Nicht-technische-Regeln:
 * Stationen dürfen weder von innerhalb eines Busses aus eingenommen werden, noch darf man die 'raus-click-rein' Technik benutzen. Nach einem Capture einer Station muss man den Bus abfahren lassen.
 * MisterX's sollen vorgegebenes Gebiet nicht verlassen