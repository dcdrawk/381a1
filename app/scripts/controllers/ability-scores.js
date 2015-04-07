'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:AScoreCtrl
 * @description
 * # AScoreCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  .controller('AScoreCtrl', function ($scope, $cookies, $log, $mdDialog, $cookieStore) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var detailsArray = $cookieStore.get('charDetails');
    var scoreArray = $cookieStore.get('scoreArray');
    var modifierArray = $cookieStore.get('modifierArray');
    var SkillBonuses = $cookieStore.get('SkillBonuses');
    var SkillMod = $cookieStore.get('SkillMod');
    
    //var modifierArray = $cookieStore.get('modifierArray');
    var defaultObj = {
        trained: false,
        bonus: ''
    }
    //  setting up the cookies
    if(typeof detailsArray === 'undefined'){        
        $scope.details = {
            race: '',
            subrace: '',
        };
        $cookieStore.put('detailsArray', $scope.details);
        detailsArray = $cookieStore.get('detailsArray');
    }
    if(typeof scoreArray === 'undefined'){        
        $scope.details = {
            str: '',
            dex: '',
            con: '',
            int: '',
            wis: '',
            cha: '',
        };
        $cookieStore.put('scoreArray', $scope.details);
        scoreArray = $cookieStore.get('scoreArray');
    }
    
    if(typeof modifierArray === 'undefined'){        
        $scope.details = {
            str: '',
            dex: '',
            con: '',
            int: '',
            wis: '',
            cha: '',
        };
        $cookieStore.put('modifierArray', $scope.details);
        modifierArray = $cookieStore.get('modifierArray');
    }
    
    if(typeof SkillBonuses === 'undefined'){        
        $scope.details = [{
            ath: defaultObj,
            
            acr: defaultObj,
            soh: defaultObj,
            stl: defaultObj,
            
            arc: defaultObj,
            his: defaultObj,
            inv: defaultObj,
            nat: defaultObj,
            rel: defaultObj,
            
            anh: defaultObj,
            ins: defaultObj,
            med: defaultObj,
            perc: defaultObj,
            sur: defaultObj,
            
            dec: defaultObj,
            int: defaultObj,
            perf: defaultObj,
            pers: defaultObj
        }];
        $cookieStore.put('SkillBonuses', $scope.details);
        SkillBonuses = $cookieStore.get('SkillBonuses');
    }
    
    if(typeof SkillMod === 'undefined'){        
        $scope.details = {
            ath: '',
            
            acr: '',
            soh: '',
            stl: '',
            
            arc: '',
            his: '',
            inv: '',
            nat: '',
            rel: '',
            
            anh: '',
            ins: '',
            med: '',
            perc: '',
            sur: '',
            
            dec: '',
            int: '',
            perf: '',
            pers: ''
        };
        $cookieStore.put('SkillMod', $scope.details);
        SkillMod = $cookieStore.get('SkillMod');
    }
    
    var myRace = detailsArray.race;
    var mySubrace = detailsArray.subrace;
    var profBonus = $cookies.profBonus;
    console.log('HERE IS THE PROF BONUS');
    console.log($cookies.profBonus);
    if(!$cookies.profBonus){
        profBonus = 0;
    }
    
//    var myStr = $cookies.str;
//    var myDex = $cookies.dex;
//    var myCon = $cookies.con;
//    var myInt = $cookies.int;
//    var myWis = $cookies.wis;
//    var myCha = $cookies.cha;
    
    var myStr = scoreArray.str;
    var myDex = scoreArray.dex;
    var myCon = scoreArray.con;
    var myInt = scoreArray.int;
    var myWis = scoreArray.wis;
    var myCha = scoreArray.cha;

    //Booleans to set warning/message classes
    $scope.isHidden = false;
    $scope.isMessage = false;
    $scope.isWarning = false;

    //test array for basic details needed for this controller
    $scope.characterDetails = [{
      race: myRace,
      subrace: mySubrace
    }];

    $scope.abilityScores = [{//sets the bonus message and value
      str : myStr,
      dex : myDex,
      con : myCon,
      int : myInt,
      wis : myWis,
      cha : myCha,
    }];
    
//    $scope.abilityScores = [{//sets the bonus message and value
//      str : myStr,
//      dex : myDex,
//      con : myCon,
//      int : myInt,
//      wis : myWis,
//      cha : myCha,
//    }];
//    
    
    $scope.getProfBonus = function() {
        var profBonus = $cookies.profBonus;

        if(!$cookies.profBonus){
            profBonus = 0;
        }    
    }
    //console.log(SkillBonuses);
    $scope.skillBonus = [{//sets the bonus message and value
        ath: SkillBonuses[0]['ath'],

        acr: SkillBonuses[0]['acr'],
        soh: SkillBonuses[0]['soh'],
        stl: SkillBonuses[0]['stl'],

        arc: SkillBonuses[0]['arc'],
        his: SkillBonuses[0]['his'],
        inv: SkillBonuses[0]['inv'],
        nat: SkillBonuses[0]['nat'],
        rel: SkillBonuses[0]['rel'],

        anh: SkillBonuses[0]['anh'],
        ins: SkillBonuses[0]['ins'],
        med: SkillBonuses[0]['med'],
        perc: SkillBonuses[0]['perc'],
        sur: SkillBonuses[0]['sur'],

        dec: SkillBonuses[0]['dec'],
        int: SkillBonuses[0]['int'],
        perf: SkillBonuses[0]['perf'],
        pers: SkillBonuses[0]['pers']
//        ath: SkillBonuses.ath,
//
//        acr: SkillBonuses.acr,
//        soh: SkillBonuses.soh,
//        stl: SkillBonuses.stl,
//
//        arc: SkillBonuses.arc,
//        his: SkillBonuses.his,
//        inv: SkillBonuses.inv,
//        nat: SkillBonuses.nat,
//        rel: SkillBonuses.rel,
//
//        anh: SkillBonuses.anh,
//        ins: SkillBonuses.ins,
//        med: SkillBonuses.med,
//        perc: SkillBonuses.perc,
//        sur: SkillBonuses.sur,
//
//        dec: SkillBonuses.dec,
//        int: SkillBonuses.int,
//        perf: SkillBonuses.perf,
//        pers: SkillBonuses.pers
    }];
    
    $scope.trained = [{//sets the bonus message and value
        ath: $scope.skillBonus[0]['ath']['trained'],

        acr: $scope.skillBonus[0]['acr']['trained'],
        soh: $scope.skillBonus[0]['soh']['trained'],
        stl: $scope.skillBonus[0]['stl']['trained'],

        arc: $scope.skillBonus[0]['arc']['trained'],
        his: $scope.skillBonus[0]['his']['trained'],
        inv: $scope.skillBonus[0]['inv']['trained'],
        nat: $scope.skillBonus[0]['nat']['trained'],
        rel: $scope.skillBonus[0]['rel']['trained'],

        anh: $scope.skillBonus[0]['anh']['trained'],
        ins: $scope.skillBonus[0]['ins']['trained'],
        med: $scope.skillBonus[0]['med']['trained'],
        perc: $scope.skillBonus[0]['perc']['trained'],
        sur: $scope.skillBonus[0]['sur']['trained'],

        dec: $scope.skillBonus[0]['dec']['trained'],
        int: $scope.skillBonus[0]['int']['trained'],
        perf: $scope.skillBonus[0]['perf']['trained'],
        pers: $scope.skillBonus[0]['pers']['trained']
    }];
    
    //console.log('TRAINED IN' + $scope.trained[0]['acr']);
    $scope.setTrained = function(skill) {
//        var testCon = $scope.skillBonus.skill;
        //console.log(skill);
        var trained = $scope.skillBonus[0][skill]['trained'];
        
        console.log($scope.skillBonus);
        console.log($cookieStore.get('SkillBonuses'));
        
        if(!trained){
            $scope.skillBonus[0][skill]['trained'] = true;            
            //var trainSkill = $scope.skillBonus[0][skill]['trained'];
            $cookieStore.put('SkillBonuses', $scope.skillBonus);
            $scope.SkillBonus = $cookieStore.get('SkillBonuses');
            
        } else if(trained){
            $scope.skillBonus[0][skill]['trained'] = false;            
            $cookieStore.put('SkillBonuses', $scope.skillBonus);
            $scope.SkillBonus = $cookieStore.get('SkillBonuses');
        }        
        //console.log($scope.strMod);
        //$scope.setSkillBonus(skill);
        $scope.skillMod[0][skill] = $scope.setSkillBonus(skill);
        //$scope.setSkillBonus[0][skill].trained = 
    }
    
    
    console.log('ARC SKILL BONUS: ' + $scope.skillBonus[0]['arc']['bonus']);
    
    $scope.setBonus = function(skill, value) {
        console.log('SKILL: ' + skill + ' VALUE:' + value);
        $scope.skillBonus[0][skill]['bonus'] = value;
        
        $cookieStore.put('SkillBonuses', $scope.skillBonus);
        $scope.SkillBonus = $cookieStore.get('SkillBonuses');

        $scope.skillMod[0][skill] = $scope.setSkillBonus(skill);
//        console.log('SKILL MOD: ' + $scope.skillMod[0][skill]);
    } 
    
    
    $scope.setSkillBonus = function(skill) {
   //     console.log(skill);
     //   console.log(profBonus);
      // console.log( $scope.skillBonus[0]);
        var trained = $scope.skillBonus[0][skill]['trained'];
//        var test = skill;
//        var trained = $scope.skillBonus.skill.trained;
        var bonus = $scope.skillBonus[0][skill]['bonus'];
//        
//        console.log('BONUS: ' + bonus)
        if(!bonus){
            bonus = 0;
        }
//        
        var modTotal = 0 + bonus;
       console.log(modTotal + ' ' + bonus);
        
        if(!profBonus){
            profBonus = 0;
        }
        
        if(trained){
            modTotal+=parseInt(profBonus);
            $scope.trained[skill] = true;
        }
        //console.log('MOD TOTAL: ' + modTotal);
        
        //add the ability modifier to the skill modifier
        if(skill == 'ath'){
            if(modifierArray.str){
                modTotal += modifierArray.str;
            }
        }
        if(skill == 'acr' || skill == 'soh' || skill == 'stl'){
            if(modifierArray.dex){
                modTotal += modifierArray.dex;
            }            
        }
        
        if(skill == 'arc' || skill == 'his' || skill == 'inv' || skill == 'nat' || skill == 'rel'){
            if(modifierArray.int){
                modTotal += modifierArray.int;
            }
        }
        if(skill == 'anh' || skill == 'ins' || skill == 'med' || skill == 'perc' || skill == 'sur'){
            if(modifierArray.wis){
                modTotal += modifierArray.wis;
            }
        }
        if(skill == 'dec' || skill == 'int' || skill == 'perf' || skill == 'pers'){
            if(modifierArray.cha){
                modTotal += modifierArray.cha;
            }
        }
        
        console.log('MOD TOTAL: ' + modTotal);
        return modTotal;
    }
    $scope.skillMod = [{//sets the bonus message and value
        ath: $scope.setSkillBonus('ath'),

        acr: $scope.setSkillBonus('acr'),
        soh: $scope.setSkillBonus('soh'),
        stl: $scope.setSkillBonus('stl'),

        arc: $scope.setSkillBonus('arc'),
        his: $scope.setSkillBonus('his'),
        inv: $scope.setSkillBonus('inv'),
        nat: $scope.setSkillBonus('nat'),
        rel: $scope.setSkillBonus('rel'),

        anh: $scope.setSkillBonus('anh'),
        ins: $scope.setSkillBonus('ins'),
        med: $scope.setSkillBonus('med'),
        perc: $scope.setSkillBonus('perc'),
        sur: $scope.setSkillBonus('sur'),

        dec: $scope.setSkillBonus('dec'),
        int: $scope.setSkillBonus('int'),
        perf: $scope.setSkillBonus('perf'),
        pers: $scope.setSkillBonus('pers')
    }];


    $scope.getRace = function() {
      //  $cookies.race = $scope.selectedRace;

      if(myRace === 'Select a Race' || typeof myRace === 'undefined'){//sees if race are undefined
        $log.debug('no race selected');
        $scope.detectRace = [{
          msg : 'No Race or Subrace selected. Select a Race and Subrace to display score bonuses.',//tell the user
          bns : ''
        }];
        $scope.isMessage = false;
        $scope.isWarning = true; //Sets the warning class on the message span
      }
      if(mySubrace === 'Select a Subrace' || mySubrace === 'None Available' || typeof mySubrace ==='undefined'){
        $log.debug('no subrace selected');
      }
      if(mySubrace === 'Select a Subrace' || mySubrace === 'None Available' && myRace !== 'Human' || typeof mySubrace ==='undefined'){
        $log.debug('no subrace selected');

        $scope.detectRace = [{
          msg : 'No Subrace selected. Select a Race and Subrace to display score bonuses.',//tell the user
          bns : ''
        }];
        $scope.isMessage = false;
        $scope.isWarning = true; //Sets the warning class on the message span
      } else {

        if(myRace === 'Dwarf'){ //Detects the race
          if(mySubrace === 'Hill Dwarf'){ //detects the subrace
            $scope.detectSubrace = [{
              msg : 'Hill Dwarf Race Bonus: ',
              bns : '+2con, +1 Wis'
            }];
          }
          if(mySubrace === 'Mountain Dwarf'){ //detects the subrace
            $scope.detectSubrace = [{
              msg : 'Mountain Dwarf Race Bonus: ',
              bns : '+2con, +2 Str'
            }];
          }
          $scope.isMessage = true;
          $scope.isWarning = false;
        }

        if(myRace === 'Elf'){ //Detects the race
          if(mySubrace === 'Wood Elf'){ //detects the subrace
            $scope.detectSubrace = [{
              msg : 'Wood Elf Race Bonus: ',
              bns : '+2 Dex, +1 Wis'
            }];
          }
          if(mySubrace === 'High Elf'){ //detects the subrace
            $scope.detectSubrace = [{
              msg : 'High Elf Race Bonus: ',
              bns : '+2 Dex, +1 Int'
            }];
          }
          $scope.isMessage = true;
          $scope.isWarning = false;
        }

        if(myRace === 'Halfling'){ //Detects the race
          if(mySubrace === 'Lightfoot'){ //detects the subrace
            $scope.detectSubrace = [{
              msg : 'Lightfoot Race Bonus: ',
              bns : '+2 Dex, +1 Cha'
            }];
          }
          if(mySubrace === 'Stout'){ //detects the subrace
            $scope.detectSubrace = [{
              msg : 'Stout Race Bonus: ',
              bns : '+2 Dex, +1 Con'
            }];
          }
          $scope.isMessage = true;
          $scope.isWarning = false;
        }
        if(myRace === 'Human'){ //Detects the race
          $scope.detectSubrace = [{//sets the bonus message and value
            msg : 'Human Race Bonus: ',
            bns : '+1 to all stats'
          }];
          $scope.isMessage = true;
          $scope.isWarning = false;
        }
      }
    }; //End of getRace();
    
    
    
    
    //sets up ability scores and modifiers if they exist
    $scope.abilityScores.str = parseFloat(myStr);
    $scope.abilityScores.dex = parseFloat(myDex);
    $scope.abilityScores.con = parseFloat(myCon);
    $scope.abilityScores.int = parseFloat(myInt);
    $scope.abilityScores.wis = parseFloat(myWis);
    $scope.abilityScores.cha = parseFloat(myCha);


    //Ability score calculations as defined by the basic player's guide
    $scope.setModifier = function( abilityScore ) {
      if(abilityScore === null){return null;}
      if(abilityScore <= 1){return -5;}
      if(abilityScore >= 2 && abilityScore <= 3){return -4;}
      if(abilityScore >= 4 && abilityScore <= 5){return -3;}
      if(abilityScore >= 6 && abilityScore <= 7){return -2;}
      if(abilityScore >= 8 && abilityScore <= 9){return -1;}
      if(abilityScore >= 10 && abilityScore <= 11){return 0;}
      if(abilityScore >= 12 && abilityScore <= 13){return 1;}
      if(abilityScore >= 14 && abilityScore <= 15){return 2;}
      if(abilityScore >= 16 && abilityScore <= 17){return 3;}
      if(abilityScore >= 18 && abilityScore <= 19){return 4;}
      if(abilityScore >= 20 && abilityScore <= 21){return 5;}
      if(abilityScore >= 22 && abilityScore <= 23){return 6;}
      if(abilityScore >= 24 && abilityScore <= 25){return 7;}
      if(abilityScore >= 26 && abilityScore <= 27){return 8;}
      if(abilityScore >= 28 && abilityScore <= 29){return 9;}
      if(abilityScore >= 30){return 10;}
    };

    //Using the function above, these set the cookies for each ability
    $scope.setStr = function() {
      $scope.strMod = $scope.setModifier(this.abilityScores.str);
        scoreArray.str = $scope.abilityScores.str;
        $cookieStore.put('scoreArray', scoreArray);
        
        modifierArray.str = $scope.setModifier(this.abilityScores.str);
        $cookieStore.put('modifierArray', modifierArray);
        
        $scope.skillMod[0]['ath'] = $scope.setSkillBonus('ath');
    };
    $scope.setDex = function() {
        
        $scope.dexMod = $scope.setModifier(this.abilityScores.dex);
        scoreArray.dex = $scope.abilityScores.dex;
        $cookieStore.put('scoreArray', scoreArray);
        
        modifierArray.dex = $scope.setModifier(this.abilityScores.dex);
        $cookieStore.put('modifierArray', modifierArray);
        
        $scope.skillMod[0]['acr'] = $scope.setSkillBonus('acr');
        $scope.skillMod[0]['soh'] = $scope.setSkillBonus('soh');
        $scope.skillMod[0]['stl'] = $scope.setSkillBonus('stl');
    };
    $scope.setCon = function() {
      $scope.conMod = $scope.setModifier(this.abilityScores.con);
      scoreArray.con = $scope.abilityScores.con;
        $cookieStore.put('scoreArray', scoreArray);
        
        modifierArray.con = $scope.setModifier(this.abilityScores.con);
        $cookieStore.put('modifierArray', modifierArray);   
    };
    $scope.setInt = function() {
      $scope.intMod = $scope.setModifier(this.abilityScores.int);
      scoreArray.int = $scope.abilityScores.int;
        $cookieStore.put('scoreArray', scoreArray);
        
        modifierArray.int = $scope.setModifier(this.abilityScores.int);
        $cookieStore.put('modifierArray', modifierArray);
        
        $scope.skillMod[0]['arc'] = $scope.setSkillBonus('arc');
        $scope.skillMod[0]['his'] = $scope.setSkillBonus('his');
        $scope.skillMod[0]['inv'] = $scope.setSkillBonus('inv');
        $scope.skillMod[0]['nat'] = $scope.setSkillBonus('nat');
        $scope.skillMod[0]['rel'] = $scope.setSkillBonus('rel');
    };
    $scope.setWis = function() {
      $scope.wisMod = $scope.setModifier(this.abilityScores.wis);
      scoreArray.wis = $scope.abilityScores.wis;
        $cookieStore.put('scoreArray', scoreArray);
        
        modifierArray.wis = $scope.setModifier(this.abilityScores.wis);
        $cookieStore.put('modifierArray', modifierArray);
        
        $scope.skillMod[0]['anh'] = $scope.setSkillBonus('anh');
        $scope.skillMod[0]['ins'] = $scope.setSkillBonus('ins');
        $scope.skillMod[0]['med'] = $scope.setSkillBonus('med');
        $scope.skillMod[0]['perc'] = $scope.setSkillBonus('perc');
        $scope.skillMod[0]['sur'] = $scope.setSkillBonus('sur');
    };
    $scope.setCha = function() {
      $scope.chaMod = $scope.setModifier(this.abilityScores.cha);
      scoreArray.cha = $scope.abilityScores.cha;
        $cookieStore.put('scoreArray', scoreArray);
        
        modifierArray.cha = $scope.setModifier(this.abilityScores.cha);
        $cookieStore.put('modifierArray', modifierArray);
        
        $scope.skillMod[0]['dec'] = $scope.setSkillBonus('dec');
        $scope.skillMod[0]['int'] = $scope.setSkillBonus('int');
        $scope.skillMod[0]['perf'] = $scope.setSkillBonus('perf');
        $scope.skillMod[0]['pers'] = $scope.setSkillBonus('pers');
    };
    

    //Code from https://material.angularjs.org/#/demo/material.components.dialog
    //Use to help build alter dialogues, we would like to use them to explain this to the user.
    $scope.alert = '';
    $scope.showAlert = function(ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Ability Score Info')
          .content('Ability scores determine your characters power in 6 categories (str, dex, con, int, wis, cha) and can range from 0-30. The score determines the modifier, which can be added to your skills and dice rolls.')
          .ariaLabel('Ability Score Info')
          .ok('Close')
          .targetEvent(ev)
      );
    };

//    function DialogController($scope, $mdDialog) {
//      $scope.hide = function() {
//        $mdDialog.hide();
//      };
//      $scope.cancel = function() {
//        $mdDialog.cancel();
//      };
//      $scope.answer = function(answer) {
//        $mdDialog.hide(answer);
//      };
//    }
    });
