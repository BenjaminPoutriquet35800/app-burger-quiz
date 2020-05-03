# Présentation App Burger Quiz

<p align="center">
<img src="https://raw.githubusercontent.com/BenjaminPoutriquet35800/app-burger-quiz/master/views/public/images/backgrounds/menus.svg?sanitize=true" height="250"> 
</p>

:hamburger: Burger quiz est le jeu qui reprend les codes de la célèbre émission présentée par Alain Chabat. 

## Prérequis
Installer NodeJs : https://nodejs.org/fr/

## Installation

Cloner le répo :

```
https://github.com/BenjaminPoutriquet35800/app-burger-quiz.git
```

Se rendre à la base du répertoire où se trouve le fichier **'package.json'** puis lancer la commande :

```
npm install
```

## Déploiement

Une fois que les dépendances ont été installées vous pouvez lancer l'application :

```
node server.js
```

Par défaut le serveur écoute sur le port **3000**. 

Vous pouvez à présent accèder à l'application via cette adressse : http://localhost:3000/ qui permet de choisir une équipe (Ketchup / Mayo) :

<p align="center">
<img src="https://user-images.githubusercontent.com/25900708/52507764-ce9d3500-2bf2-11e9-91ba-4518018d0a5f.png" height="300"> 
</p>

Ouvrir un second onglet puis taper l'adresse suivante : http://localhost:3000/game :

Vous arriverez sur une fenêtre permettant aux joueurs de flasher un **QR-Code** pour qu'ils puissent se rendre directement au choix des équipes :

<p align="center">
<img src="https://user-images.githubusercontent.com/25900708/80916842-8fa95100-8d5b-11ea-8a51-c097a5bee720.PNG" height="300"> 
</p>

Une fois que tout le monde est prêt vous pouvez cliquer sur le bouton : **Tout le monde est prêt!**. 

Vous arrivez enfin sur l'écran du jeu :blush: :
<p align="center">
<img src="https://user-images.githubusercontent.com/25900708/52507593-461e9480-2bf2-11e9-9882-60ca26b7a568.png" height="300"> 
</p>

Cette page est l'écran principal de l'application. 
En effet elle permet l'affichage des points de chacune des équipes, de lancer les différentes transitions (nuggets, sel & poivre, menus, addition, burger de la mort) enfin de pouvoir cheese buzzer :smiley:

Ouvrez enfin un dernier onglet : http://localhost:3000/admin :

<p align="center">
<img src="https://user-images.githubusercontent.com/25900708/52508059-977b5380-2bf3-11e9-8e7f-9c875a5a5718.png" height="300"> 
</p>

Cette page va permettre d'administrer le jeu. Vous allez pouvoir ajouter les points des différentes équipes lancer les transitions et de bloquer / débloquer les cheeses buzzer.

**NOTA**: Si vous êtes sous **Google Chrome** cliquer une première fois sur la fenêtre du jeu car vous aurez une erreur de type **'Uncaught (in promise) DOMException'** et l'animation ne se lancera pas.

## Auteurs

* **Poutriquet Benjamin** - *Initial work* - [app-burger-quiz](https://github.com/BenjaminPoutriquet35800/app-burger-quiz)
* Voir aussi la liste des [contributeurs](https://github.com/BenjaminPoutriquet35800/app-burger-quiz/graphs/contributors) ayant participé à ce projet.




