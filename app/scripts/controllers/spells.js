(function () {
  'use strict';
  angular
      .module('myappApp')
      .controller('SpellsCtrl', SpellsCtrl);
  function SpellsCtrl ($scope, $timeout, $q, $log, $cookieStore, $filter ) {
      
      var spellsArray = $cookieStore.get('spellsArray');
      $scope.mySpells = [];
      
    if(typeof spellsArray === 'undefined'){        
        $scope.details = [];
        $cookieStore.put('spellsArray', $scope.details);
        spellsArray = $cookieStore.get('spellsArray');
        
    } else {
        console.log(spellsArray);
        for(var item in spellsArray){
            console.log(spellsArray[item].name);
            $scope.mySpells.push(spellsArray[item]);
        }
    }
    var self = this;
     // $scope.test = '423';
    // list of `state` value/display objects
    self.states        = loadAll();
    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
      //self.getSpellInfo = getSpellInfo;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
//      var results = query ? self.states.filter( createFilterFor(query) ) : [],
//          deferred;
        var results = self.states.filter( createFilterFor(query) );
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      //$log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      //$log.info('Item changed to ' + item);
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
//        var spells = { 
//            uncannyDodge: {
//                level: 5
//            }
//        };
      var allStates = 'Sneak Attack, Expertise, Evasion, Uncanny Dodge, Reliable Talent, Blindside, Slippery Mind, Elusive, Stroke of Luck, Guidance, Prayer of Healing, Death Ward, Detect Magic, Beacon of Hope, Ray of Frost, Fireball, Magic Missile, Invisibility, Ice Storm, Second Wind, Action Surge, Extra Attack, Indomitable';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    };

      
//    function loadAll_2() {      
        $scope.spellInfo = [{
            'Expertise': {
                class: 'Rogue',
                level: 1,
                name: 'Expertise',
                id: 'expertise', 
                description: 'choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves’ tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.'
            },
            'Sneak Attack': {
                class: 'Rogue',
                level: 2,
                name: 'Sneak Attack',
                id: 'sneakAttack',
                description: 'Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll.'
            },
            'Uncanny Dodge': {
                class: 'Rogue',
                level: 5,
                name: 'Uncanny Dodge',
                id: 'uncannyDodge',
                description: 'When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack’s damage against you.'
            },
            'Evasion': {
                class: 'Rogue',
                level: 7,
                name: 'Evasion',
                id: 'evasion',
                description: 'When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.'
            },
            'Reliable Talent': {
                class: 'Rogue',
                level: 11,
                name: 'Reliable Talent',
                id: 'reliableTalent', 
                description: 'Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.'
            },
            'Blindside': {
                class: 'Rogue',
                level: 14,
                name: 'Blindside',
                id: 'blindside',
                description: 'If you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.'
            },
            'Slippery Mind': {
                class: 'Rogue',
                level: 15,
                name: 'Slippery Mind',
                id: 'slipperyMind',  
                description: 'you have acquired greater mental strength. You gain proficiency in Wisdom saving throws.'
            },
            'Elusive': {
                class: 'Rogue',
                level: 18,
                name: 'Elusive',
                id: 'elusive', 
                description: 'You are so evasive that attackers rarely gain the upper hand against you. No attack roll has advantage against you while you aren’t incapacitated.'
            },
            'Stroke of Luck': {
                class: 'Rogue',
                level: 20,
                name: 'Stroke of Luck',
                id: 'strokeOfLuck',
                description: 'If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20.'
            },
            
            
            //clearic cantrips
            'Guidance': {
                class: 'Cleric',
                level: 0,
                name: 'Guidance',
                id: 'guidance',
                description: 'You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.'
            },
            'Detect Magic': {
                class: 'Cleric',
                level: 1,
                name: 'Detect Magic',
                id: 'detectMagic',
                description: 'For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.'
            },
            'Prayer of Healing': {
                class: 'Cleric',
                level: 2,
                name: 'Prayer of Healing',
                id: 'prayerOfHealing',
                description: 'Up to six creatures of your choice that you can see within range each regain hit points equal to 2d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.'
            },
            'Beacon of Hope': {
                class: 'Cleric',
                level: 3,
                name: 'Beacon of Hope',
                id: 'beaconOfHope',
                description: 'This spell bestows hope and vitality. Choose any number of creatures within range. For the duration, each target has advantage on Wisdom saving throws and death saving throws, and regains the maximum number of hit points possible from any healing.'
            },
            'Death Ward': {
                class: 'Cleric',
                level: 4,
                name: 'Death Ward',
                id: 'deathWard',
                description: 'You touch a creature and grant it a measure of protection from death. The first time the target would drop to 0 hit points as a result of taking damage, the target instead drops to 1 hit point, and the spell ends. If the spell is still in effect when the target is subjected to an effect that would kill it instantaneously without dealing damage, that effect is instead negated against the target, and the spell ends.'
            },
            
            //Wizard cantrips
            'Ray of Frost': {
                class: 'Wizard',
                level: 0,
                name: 'Ray of Frost',
                id: 'rayOfFrost',
                description: 'A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.'
            },
            'Magic Missile': {
                class: 'Wizard',
                level: 1,
                name: 'Magic Missile',
                id: 'magicMissile',
                description: 'You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.'
            },
            'Invisibility': {
                class: 'Wizard',
                level: 2,
                name: 'Invisibility',
                id: 'invisibility',
                description: 'A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person. The spell ends for a target that attacks or casts a spell.'
            },
            'Fireball': {
                class: 'Wizard',
                level: 3,
                name: 'Fireball',
                id: 'fireball',
                description: 'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.'
            },
            'Ice Storm': {
                class: 'Wizard',
                level: 4,
                name: 'Ice Storm',
                id: 'iceStorm',
                description: 'A hail of rock-hard ice pounds to the ground in a 20-foot-radius, 40-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a Dexterity saving throw. A creature takes 2d8 bludgeoning damage and 4d6 cold damage on a failed save, or half as much damage on a successful one. Hailstones turn the storm’s area of effect into difficult terrain until the end of your next turn.'
            },
            
            //Fighter Abilities cantrips
            'Second Wind': {
                class: 'Fighter',
                level: 0,
                name: 'Second Wind',
                id: 'secondWind',
                description: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.'
            },
            'Action Surge': {
                class: 'Fighter',
                level: 2    ,
                name: 'Action Surge',
                id: 'actionSurge',
                description: 'You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.'
            },
            'Extra Attack': {
                class: 'Fighter',
                level: 5,
                name: 'Extra Attack',
                id: 'extraAttack',
                description: 'Whenever you take the Attack action on your turn, you can attack twice instead of once.'
            },
            'Indomitable': {
                class: 'Fighter',
                level: 9,
                name: 'Indomitable',
                id: 'indomitable',
                description: 'You can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can’t use this feature again until you finish a long rest.'
            }
            
        }];
        //console.log($scope.spellInfo);
        //return $scope.spellInfo.keys();
//       for(var key in $scope.spellInfo[0]){
//            //console.log(key);
//           return{
//                value: key.name,
//               display: key.name
//           }
//        }
//    }
    /**
     * Create filter function for a query string
     */
    
      
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    };
      
    //function retrieves the spell info to be added to the list of spells
    $scope.getSpellInfo = function getSpellInfo(spell) {
        console.log(spell);
        
        //check to see if the spell exists
        if(!$scope.spellInfo[0][spell]){
            console.log('no such spell exists');
            return;
        } else {
            console.log($scope.spellInfo[0][spell]);
            
            //go through the list of known spells to check for duplicates
            for(var item in $scope.mySpells ){
                if ($scope.mySpells[item].name == spell){
                    console.log('You cant add a duplicate spell');
                    return;
                }
            }
            //add the spell to the list and update the cookieStore
            $scope.mySpells.push($scope.spellInfo[0][spell]);            
            $cookieStore.put('spellsArray', $scope.mySpells);
            spellsArray = $cookieStore.get('spellsArray');
        }
    };
      
    $scope.removeSpell = function removeSpell(spell) {
        console.log('Removing: ' + spell);
        
        var array = $scope.mySpells;
        var index = $scope.spellInfo[0][spell];
        
        console.log(array);
        
        //go through the list of spells to find the one that matches
        for(var item in $scope.mySpells){
            if($scope.mySpells[item].name == spell){
                $scope.mySpells.splice(item, 1);
            }
        }
        
        //update the cookies
        $cookieStore.put('spellsArray', $scope.mySpells);
        spellsArray = $cookieStore.get('spellsArray');
        
        //delete $scope.mySpells[0][spell];
        //$scope.mySpells.splice($scope.spellInfo[0][spell], 1);
    }
        $scope.reverse = true;
        var orderBy = $filter('orderBy');
      $scope.order = function(predicate, reverse) {
          console.log('ORDER ' + predicate + ' ' + reverse);
          $scope.mySpells = orderBy($scope.mySpells, predicate, reverse);
      };
      //$scope.order('-age',false);
      
//    $scope.orderByLevel = function () {
//        var orderBy = $filter('orderBy');
//        $scope.mySpells = orderBy($scope.mySpells, 'level');
//    }
//    
//    $scope.orderByName = function () {
//        var orderBy = $filter('orderBy');
//        $scope.mySpells = orderBy($scope.mySpells, 'name', false);
//        var testOrder = orderBy($scope.mySpells, 'name', false);
//        console.log(testOrder);
//        
//        if($scope.mySpells === testOrder){
//            console.log('THEY IS THE SAME');
//            $scope.mySpells = orderBy($scope.mySpells, 'name', true);
//            
//        } else {   
//            console.log('THEY AINT THE SAME');
//            $scope.mySpells = orderBy($scope.mySpells, 'name', false);
//        }
//        console.log($scope.mySpells);
//    }
    //console.log(getSpellInfo('Stroke of Luck'));
    
      
    //hammer script for gestures
//    for(var item in $scope.mySpells){
//        console.log('WOWOWOWOW');
//        console.log($scope.mySpells[item].id);
//        //var myElement = document.getElementById('doc-content');
//        
//        
//        //$scope.mySpells[item].element = document.getElementById($scope.mySpells[item].id);
//        //var element = document.getElementById($scope.mySpells[item].id);
//        //var target = angular.element('#appBusyIndicator');
//        var myEl = $document.find('#' + $scope.mySpells[item].id);
//        console.log(myEl);
//    }
//        var myElement = document.getElementById('doc-content');
////        var leftNav = document.getElementById('leftNav');
//        
//        var mc = new Hammer(myElement);
////        var ln = new Hammer(leftNav);
//    
//        var pan = new Hammer.Pan({threshold: 200});
////        var pan2 = new Hammer.Pan({threshold: 200});
//        mc.add([pan]);
////        ln.add([pan2]);
//        
////        ln.on('panleft', function(ev) {
////            console.log('PAN RIGHT');
////        });
//        
//        mc.on("panright", 'jester', function(ev) {
//            console.log('PAN RIGHT');
//        });
  }
    
      
})();

//'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:SpellsCtrl
 * @description
 * # SpellsCtrl
 * Controller of the myappApp
 */
//angular.module('myappApp')
//  .controller('SpellsCtrl', function ($scope, $log) {
//    //var self = this;
//    // list of `state` value/display objects
//    $scope.states        = loadAll();
//    $scope.selectedItem  = null;
//    $scope.searchText    = null;
//    $scope.querySearch   = querySearch;
//    $scope.simulateQuery = false;
//    $scope.isDisabled    = false;
//    $scope.selectedItemChange = selectedItemChange;
//    $scope.searchTextChange   = searchTextChange;
//    // ******************************
//    // Internal methods
//    // ******************************
//    /**
//     * Search for states... use $timeout to simulate
//     * remote dataservice call.
//     */
//    function querySearch (query) {
//      var results = query ? $scope.states.filter( createFilterFor(query) ) : [],
//          deferred;
//      if ($scope.simulateQuery) {
//        deferred = $q.defer();
//        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
//        return deferred.promise;
//      } else {
//        return results;
//      }
//    }
//    function searchTextChange(text) {
//      $log.info('Text changed to ' + text);
//    }
//    function selectedItemChange(item) {
//        if(item){
//            $log.info('Item changed to ' + item.display);
//            $scope.test = item.display;
//            //console.log($scope.test);
//            $scope.searchText = item.display;        
//        }        
//    }
//    /**
//     * Build `states` list of key/value pairs
//     */
//    function loadAll() {
//      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
//              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
//              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
//              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
//              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
//              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
//              Wisconsin, Wyoming';
//      return allStates.split(/, +/g).map( function (state) {
//        return {
//          value: state.toLowerCase(),
//          display: state
//        };
//      });
//    }
//    /**
//     * Create filter function for a query string
//     */
//    function createFilterFor(query) {
//      var lowercaseQuery = angular.lowercase(query);
//      return function filterFn(state) {
//        return (state.value.indexOf(lowercaseQuery) === 0);
//      };
//    }
//  });
//  });
