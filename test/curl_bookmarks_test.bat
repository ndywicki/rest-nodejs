REM @echo off
set API_BOOKMARKS=curl -H "Content-Type: application/json" -H "Accept: application/json"
 
REM Ajout d"un bookmark
%API_BOOKMARKS% -X POST -d "{\"title\":\"naholyr.fr\",\"url\":\"http://naholyr.fr\",\"tags\":[\"nodejs\",\"javascript\",\"web\"]}" "http://localhost:3000/bookmarks"
REM Réponse: {"title":"naholyr.fr","url":"http://naholyr.fr","tags":["nodejs","javascript","web"],\"id":1}
 
REM Listing de tous les bookmarks
%API_BOOKMARKS% -X GET "http://localhost:3000/bookmarks"
REM Réponse: ["/bookmarks/bookmark/1"]
 
 REM Récupération de notre bookmark
%API_BOOKMARKS% -X GET "http://localhost:3000/bookmarks/bookmark/1"
REM Réponse: {"title":"naholyr.fr","url":"http://naholyr.fr","tags":["nodejs","javascript","web"],"id":1}
 
REM Suppression de notre bookmark
%API_BOOKMARKS% -X DELETE "http://localhost:3000/bookmarks/bookmark/1"
REM Réponse: {"result":true}
 
REM Lecture du bookmark
%API_BOOKMARKS% -X GET "http://localhost:3000/bookmarks/bookmark/1"
REM Réponse: {"code":404,"status":"Not Found","message":"[object Object]"} (code de statut 404 visible avec "curl -v")
 
REM On remet notre bookmark
%API_BOOKMARKS% -X POST -d "{\"title\":\"naholyr.fr\",\"url\":\"http://naholyr.fr\",\"tags\":[\"nodejs\",\"javascript\",\"web\"]}" "http://localhost:3000/bookmarks"
REM Réponse: {"title":"naholyr.fr",\"url":\"http://naholyr.fr","tags":["nodejs","javascript\",\"web\"],\"id":2}
 
REM On le met à jour (changement de title)
%API_BOOKMARKS% -X PUT -d "{\"title\":\"naholyr.fr, péregrinations webistiques\"}" "http://localhost:3000/bookmarks"
REM Réponse: {\"code":405,"status\":"Method Not Allowed","message":null} (code de statut 405 visible avec "curl -v")
REM Ah mais oui, on a essayé de faire un PUT sur /bookmarks ;)
 
REM On la refait :P
%API_BOOKMARKS% -X PUT -d "{\"title\":\"naholyr.fr, péregrinations webistiques\"}" "http://localhost:3000/bookmarks/bookmark/2"
REM Réponse: {"title":"naholyr.fr, péregrinations webistiques","url":"http://naholyr.fr","tags":["nodejs","javascript","web"],"id":"2"}
 
REM On vide la base
%API_BOOKMARKS% -X DELETE "http://localhost:3000/bookmarks"
REM Réponse: {"result":true}