# app-burger-quiz

<p align="center">
<img src="https://raw.githubusercontent.com/BenjaminPoutriquet35800/app-burger-quiz/master/views/public/images/backgrounds/menus.svg?sanitize=true" height="250"> 
</p>

Burger quiz est le jeu qui reprend les codes de la célèbre émission présentée par Alain Chabat. 

### Prérequis
Installer NodeJs : https://nodejs.org/fr/

### Installation

Cloner le répo :

```
https://github.com/BenjaminPoutriquet35800/app-burger-quiz.git
```

Se rendre à la base du répertoire où se trouve le fichier **'package.json'** puis lancer la commande :

```
npm install
```

Une fois que les dépendances ont été installées vous pouvez lancer l'application :

```
node server.js
```

### Démonstration

Par défaut le serveur écoute sur le port **3000**. 

Vous pouvez à présent accèder à l'application via cette adressse : http://localhost:3000/ qui permet de choisir une équipe (Ketchup / Mayo).

Ouvrir un second onglet puis taper l'adresse suivante : http://localhost:3000/game.

Cette page est l'écran principal de l'application. 
En effet elle permet l'affichage des points de chacune des équipes, de lancer les différentes transitions (nuggets, sel & poivre, menus, addition, burger de la mort) enfin de pouvoir cheese buzzer :)

Ouvrer enfin un dernier onglet : http://localhost:3000/admin. 

Cette page va permettre d'administrer le jeu. Vous allez pouvoir ajouter les points des différentes équipes lancer les transitions et de bloquer / débloquer les cheeses buzzer.

**NOTA**: Si vous êtes sous **Google Chrome** cliquer une première fois sur la fenêtre du jeu car vous aurez une erreur de type **'Uncaught (in promise) DOMException'** et l'animation ne se lancera pas.



