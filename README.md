 # REST avec NodeJS et Express

 Ce projet est le code source écrit en suivant le tutoriel de Nicolas Chambrier (Naholyr) sur l'implémentation d'une interface RESTFull avec Node.js, disponible ici : http://naholyr.fr/2011/08/ecrire-service-rest-nodejs-express-partie-1/

 Mise en place et mise à jour du tuto avec les versions suivantes :
 * Express v3
 * Node.js v0.8.16
 * Api-easy v0.3.7
 * Redis v2.4

## Utilisation (sous Windows XP)

1. Démarer le serveur redis :

	bookmarks-service\redis-2.4\redis-server.exe

Note: Les exécutables ont été générés via VisualStudio 2010 Express avec les sources :
	https://github.com/MSOpenTech/Redis

2. Lancer des tests via curl :
	bookmarks-service\test\curl_bookmarks_test.bat

3. Lancer les tests unitaires via vows :
	bookmarks-service\test\vows db-test.js
	bookmarks-service\test\vows rest-test.js

Note: installer vows via "npm install vows -g"