'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
.controller('DetailsCtrl', function ($scope, $log, $cookies, $cookieStore) {
    var i; //Setting variables for forloops
    var j;

    //cookie example
    // Put cookie
//    $cookieStore.put('myFavorite','oatmeal');
//    // Get cookie
//    var favoriteCookie = $cookieStore.get('myFavorite');
//        
//    // Removing a cookie
//    $cookieStore.remove('myFavorite');
//    $log.debug(favoriteCookie);
    
//    var testcc = $cookieStore.get('charDetails');
//    if(typeof testcc === 'undefined'){
//        
//    }
    //$cookieStore.put('charDetails');
    var detailsArray = $cookieStore.get('charDetails');
    
    if(typeof detailsArray === 'undefined'){
        $scope.details = {
            name: '',
            race: '',
            subrace: '',
            class: '',
            background: '',
            alignment: '',
            experience: '',
            level: ''
        };
        $cookieStore.put('charDetails', $scope.details);
        detailsArray = $cookieStore.get('charDetails');
    } else {
        $scope.details = {
            name: detailsArray.name,
            race: detailsArray.race,
            subrace: detailsArray.subrace,
            class: detailsArray.class,
            background: detailsArray.background,
            alignment: detailsArray.alignment,
            experience: detailsArray.experience,
            level: detailsArray.level,
        };
    }
    
    var myRace = $scope.details.race;
    var mySubrace = $scope.details.subrace;
    //var myName = $scope.details.charName;
    var myClass = $scope.details.class;
    var myBackground = $scope.details.background;
    var myAlignment = $scope.details.alignment;
    var myExp = $scope.details.experience;
    var myLevel = $scope.details.level;
    
    //$cookieStore.put('charDetails')

    
    //$cookieStore.put('charDetails', $scope.details);

      
    
    
    $scope.customRace = false;
    $scope.races = ['Select a Race', 'Dwarf', 'Elf', 'Halfling', 'Human', 'Custom Race'];
    $scope.subraces = ['None Available', 'Custom Subrace'];
    $scope.subracesDwarf = ['Select a Subrace', 'Hill Dwarf', 'Mountain Dwarf'];
    $scope.subracesElf = ['Select a Subrace', 'High Elf', 'Wood Elf'];
    $scope.subracesHalfling = ['Select a Subrace', 'High Elf', 'Wood Elf'];
    
    $scope.characterClasses = ['Select a Class', 'Cleric', 'Fighter', 'Rogue', 'Wizard'];
    $scope.backgrounds = ['Select a Background', 'Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier'];
    $scope.alignment = ['Select an Alignment', 'Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil','Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'];

    $scope.testarray = [{ 'value': 222, 'text': '1st' }, { 'value': 2, 'text': '2nd' }];
    $scope.selectedSubrace = $scope.subraces[0]; //Initially sets subraces select to index 0

    //This loop goes the list of races and sets it to the cookie, else sets it to the default
    for(i = 0; i < $scope.races.length; i++){
        if($cookies.race !== $scope.races[i]){ //first check if it's not there
            $scope.selectedRace = $scope.races[0];
        }
        if($cookies.race === $scope.races[i]){ //this one checks if it is there
            $scope.selectedRace = $scope.races[i];
            break; //break out of the for loop once this has been set
        }
    }

    for(i=0; i < $scope.races.length; i++){
        if($scope.selectedRace === 'Select a Race'){ //updates the options for subrace
            $scope.subraces = ['None Available'];
            $scope.selectedSubrace = $scope.subraces[0];
        }
        if($scope.selectedRace === 'Dwarf'){ //updates the options for subrace
            $scope.subraces = ['Select a Subrace', 'Hill Dwarf', 'Mountain Dwarf'];
            for(j=0; j < $scope.subraces.length; j++){ //Go through subrace array
                if(mySubrace === $scope.subraces[j]){ //checks for a subrace that matches the current one
                    $scope.selectedSubrace = $scope.subraces[j];
                    break;
                }
            }
        }
        if($scope.selectedRace === 'Elf'){
            $scope.subraces = ['Select a Subrace', 'High Elf', 'Wood Elf'];
            for(j=0; j < $scope.subraces.length; j++){
                if(mySubrace === $scope.subraces[j]){
                    $scope.selectedSubrace = $scope.subraces[j];
                    break;
                }
            }
        }
        if($scope.selectedRace === 'Halfling'){
            $scope.subraces = ['Select a Subrace', 'Lightfoot', 'Stout'];
            for(j=0; j < $scope.subraces.length; j++){
                if(mySubrace === $scope.subraces[j]){
                    $scope.selectedSubrace = $scope.subraces[j];
                    break;
                }
            }
        }
        if($scope.selectedRace === 'Human'){
            $scope.subraces = ['None Available'];
            for(j=0; j < $scope.subraces.length; j++){
                if(mySubrace === $scope.subraces[j]){
                    $scope.selectedSubrace = $scope.subraces[j];
                    break;
                }
            }
        }
        if($scope.selectedRace === 'Custom Race'){
            $scope.subraces = ['Custom!'];
            for(j=0; j < $scope.subraces.length; j++){
                if(mySubrace === $scope.subraces[j]){
                    $scope.selectedSubrace = $scope.subraces[j];
                    break;
                }
            }
        }
//        $log.debug($scope.selectedRace);
//        $log.debug(myRace);
//        for(j=0; j < $scope.races.length; j++){
            if(myRace !== 'Select a Race' && myRace !== 'Dwarf' && myRace !== 'Elf' && myRace !== 'Halfling' && myRace !== 'Human' && myRace !== 'Custom Race' && typeof(myRace) !== 'undefined' && myRace !== ''){
                $scope.customRace = true;
                $scope.selectedRace = myRace;
                break;
//            }else{
//                $scope.customRace = false;
            }
//        }
//        } else {

//        }
    }//End of race/subrace for loop

    //Loop for setting the class
    for(i=0; i < $scope.characterClasses.length; i++){
      if(myClass === $scope.characterClasses[i]){
        $scope.selectedClass = $scope.characterClasses[i];
        break;
      } else {
        $scope.selectedClass = $scope.characterClasses[0];
      }
    }//End of class loop

    //Loop for setting the background
    for(i=0; i < $scope.backgrounds.length; i++){
      if(myBackground === $scope.backgrounds[i]){
        $scope.selectedBackground = $scope.backgrounds[i];
        break;
      } else {
        $scope.selectedBackground = $scope.backgrounds[0];
      }
    }//End of background loop

    //Loop for setting the alignment
    for(i=0; i < $scope.alignment.length; i++){
      if(myAlignment === $scope.alignment[i]){
        $scope.selectedAlignment = $scope.alignment[i];
        break;
      } else {
        $scope.selectedAlignment = $scope.alignment[0];
      }
    }//End of alignment loop

    if(myExp >= 0){
      $scope.characterExp = parseInt(myExp);
    }

    if(myLevel >= 0){
      $scope.characterLevel = parseInt(myLevel);
    }

  //  $scope.selectedBackground = $scope.backgrounds[0];
  //  $scope.selectedAlignment = $scope.alignment[0];

    $scope.setName = function() {
        detailsArray.name = $scope.details.name;
        $cookieStore.put('charDetails', detailsArray);  
    };
    $scope.setRace = function() {
      $cookies.race = $scope.selectedRace;
    };

    $scope.setSubrace = function() {
      $cookies.subrace = $scope.selectedSubrace;
    };

    $scope.setClass = function() {
      $cookies.class = $scope.selectedClass;
    };

    $scope.setBackground = function() {
      $cookies.background = $scope.selectedBackground;
    };

    $scope.setAlignment = function() {
      $cookies.alignment = $scope.selectedAlignment;
    };

    $scope.setExp = function() {
      $cookies.experience = parseInt($scope.characterExp);
      $cookies.level = parseInt($scope.characterLevel);
    };

    $scope.setLevel = function() {
      $cookies.level = parseInt($scope.characterLevel);
      $log.debug('etest');
    };
    
    $scope.clearRace = function() {
        $scope.customRace = false;
        $scope.selectedRace = $scope.races[0];
        $cookies.race = 'Select a Race';
    };



    $scope.updateSubrace = function() {
      if($scope.selectedRace === 'Select a Race'){
        $log.debug('no race selected');
        $scope.subraces = ['None available'];
        $scope.selectedSubrace = $scope.subraces[0];
      }
      if($scope.selectedRace === 'Dwarf'){
        $log.debug('Dwarf race selected');
        $scope.subraces = ['Select a Subrace', 'Hill Dwarf', 'Mountain Dwarf'];
        $scope.selectedSubrace = $scope.subraces[0];
      }
      if($scope.selectedRace === 'Elf'){
        $log.debug('Elf race selected');
        $scope.subraces = ['Select a Subrace', 'High Elf', 'Wood Elf'];
        $scope.selectedSubrace = $scope.subraces[0];
      }
      if($scope.selectedRace === 'Halfling'){
        $log.debug('Halfling race selected');
        $scope.subraces = ['Select a Subrace', 'Lightfoot', 'Stout'];
        $scope.selectedSubrace = $scope.subraces[0];
      }
      if($scope.selectedRace === 'Human'){
        $log.debug('Human race selected');
        $scope.subraces = ['None Available'];
        $scope.selectedSubrace = $scope.subraces[0];
      }
      if($scope.selectedRace === 'Custom Race'){
        $scope.subraces = ['None Available'];
        $scope.selectedSubrace = $scope.subraces[0];
          
          $scope.customRace = true;
          $scope.customSubrace = true;
          $scope.selectedRace = '';
          
      }
        
    };
    // Calculates the character's level based on the experience entered
    $scope.calculateLevel = function() {
      if(this.characterExp >= 0){ $scope.characterLevel = 1; }
      if(this.characterExp >= 300){ $scope.characterLevel = 2; }
      if(this.characterExp >= 900){ $scope.characterLevel = 3; }
      if(this.characterExp >= 2700){ $scope.characterLevel = 4; }
      if(this.characterExp >= 6500){ $scope.characterLevel = 5; }
      if(this.characterExp >= 14000){ $scope.characterLevel = 6; }
      if(this.characterExp >= 23000){ $scope.characterLevel = 7; }
      if(this.characterExp >= 34000){ $scope.characterLevel = 8; }
      if(this.characterExp >= 48000){ $scope.characterLevel = 9; }
      if(this.characterExp >= 64000){ $scope.characterLevel = 10; }
      if(this.characterExp >= 85000){ $scope.characterLevel = 11; }
      if(this.characterExp >= 100000){ $scope.characterLevel = 12; }
      if(this.characterExp >= 120000){ $scope.characterLevel = 13; }
      if(this.characterExp >= 140000){ $scope.characterLevel = 14; }
      if(this.characterExp >= 164000){ $scope.characterLevel = 15; }
      if(this.characterExp >= 195000){ $scope.characterLevel = 16; }
      if(this.characterExp >= 225000){ $scope.characterLevel = 17; }
      if(this.characterExp >= 265000){ $scope.characterLevel = 18; }
      if(this.characterExp >= 305000){ $scope.characterLevel = 19; }
      if(this.characterExp >= 355000){ $scope.characterLevel = 20; }
    };

  });
