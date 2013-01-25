REM @echo off
set API_BOOKMARKS=curl -H "Content-Type: application/json" -H "Accept: application/json"
 
REM Ajout d"un bookmark
%API_BOOKMARKS% -X POST -d "{\"title\":\"naholyr.fr\",\"url\":\"http://naholyr.fr\",\"tags\":[\"nodejs\",\"javascript\",\"web\"]}" "http://localhost:3000/bookmarks"
REM R�ponse: {"title":"naholyr.fr","url":"http://naholyr.fr","tags":["nodejs","javascript","web"],\"id":1}
 
REM Listing de tous les bookmarks
%API_BOOKMARKS% -X GET "http://localhost:3000/bookmarks"
REM R�ponse: ["/bookmarks/bookmark/1"]
 
 REM R�cup�ration de notre bookmark
%API_BOOKMARKS% -X GET "http://localhost:3000/bookmarks/bookmark/1"
REM R�ponse: {"title":"naholyr.fr","url":"http://naholyr.fr","tags":["nodejs","javascript","web"],"id":1}
 
REM Suppression de notre bookmark
%API_BOOKMARKS% -X DELETE "http://localhost:3000/bookmarks/bookmark/1"
REM R�ponse: {"result":true}
 
REM Lecture du bookmark
%API_BOOKMARKS% -X GET "http://localhost:3000/bookmarks/bookmark/1"
REM R�ponse: {"code":404,"status":"Not Found","message":"[object Object]"} (code de statut 404 visible avec "curl -v")
 
REM On remet notre bookmark
%API_BOOKMARKS% -X POST -d "{\"title\":\"naholyr.fr\",\"url\":\"http://naholyr.fr\",\"tags\":[\"nodejs\",\"javascript\",\"web\"]}" "http://localhost:3000/bookmarks"
REM R�ponse: {"title":"naholyr.fr",\"url":\"http://naholyr.fr","tags":["nodejs","javascript\",\"web\"],\"id":2}
 
REM On le met � jour (changement de title)
%API_BOOKMARKS% -X PUT -d "{\"title\":\"naholyr.fr, p�regrinations webistiques\"}" "http://localhost:3000/bookmarks"
REM R�ponse: {\"code":405,"status\":"Method Not Allowed","message":null} (code de statut 405 visible avec "curl -v")
REM Ah mais oui, on a essay� de faire un PUT sur /bookmarks ;)
 
REM On la refait :P
%API_BOOKMARKS% -X PUT -d "{\"title\":\"naholyr.fr, p�regrinations webistiques\"}" "http://localhost:3000/bookmarks/bookmark/2"
REM R�ponse: {"title":"naholyr.fr, p�regrinations webistiques","url":"http://naholyr.fr","tags":["nodejs","javascript","web"],"id":"2"}
 
REM On vide la base
%API_BOOKMARKS% -X DELETE "http://localhost:3000/bookmarks"
REM R�ponse: {"result":true}