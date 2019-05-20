# Pio X
Der Pio X Source Code

## Development

### Installation

API Abhängigkeiten installieren:

 * Ins API Verzeichnis wechseln: `cd api`
 * composer.phar herunterladen: `curl -sS https://getcomposer.org/installer | php`
 * Composer ausführen: `php composer.phar install`

Backend starten:

 * Konfigurationsfiles anlegen: `cp api/conf.local.php api/conf.php`
 * Docker Compose [installieren](https://docs.docker.com/compose/install/), falls nicht vorhanden
 * `docker-compose up` um die Container zu starten
 * Das Backend ist nun unter [http://localhost:8082](http://localhost:8082) erreichbar. Auf dem Default-DB-Dump lautet das Passwort `Adressen5Ostafrikas`
 
App Abhängigkeiten installieren:

 * Install [Node.js](https://nodejs.org/en/)
 * Update NPM: `npm install npm@latest -g`
 * Install Ionic & Cordova: `npm install -g cordova ionic`
 * Ins App Verzeichnis wechseln: `cd app`
 * NPM Pakete installieren: `npm install`
 * Ionic starten: `ionic serve` (Browser mit der App wird gestartet)

### Android App

Voraussetzungen:
 * Android SDK installieren
 * Java 1.8 installieren
 * Die Android Plattform und Plugins installieren: `ionic cordova prepare` (einmalig)

Folgende Befehle alle im `/app` Verzeichnis ausführen

Test APK generieren:

`ionic cordova build android`

Test APK generieren und auf angeschlossenem Gerät starten:

`ionic cordova run android`


#### Release Build erstellen:

Commands um einen Release Build zu erstellen sind im release_android.sh zu finden.

Um das APK zu signieren benötigst du zusätzlich den korrekten Keystore und das Passwort (nicht im GIT)

#### Ionic updaten

Ionic (CLI) auf die neuste Version updaten:

`sudo npm update -g cordova ionic`

#### Plugins installieren

Wenn man ein neues Plugin oder eine Plattform installiert hat,
dann muss man folgenden Befehl ausführen um alles ins package.json
zu schreiben:

`ionic cordova plugin save`

oder

`ionic cordova platform save`


## Allgemeine Spielregeln:

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