(function(){
  achievementName = [
    'Memory exceed', 'A Dollar<br>*', 'Upgrade!', 'Let\'s count to ten', 'A to Z',
    'Tech lab?', 'Boost!', 'Multi Process', 'Larger Memory', 'Power of Science',
    'Sacrifice', 'A to z', 'Sacrifice II', 'Rich', 'Ultimate Science',
    'New Age', '2^10', 'Skilled', 'Lab Town', '2^50',
    'Richer', 'A to Œ', 'Infinity Research', 'Infinity Boost', '2 more?<br>*',
    'Singularity<br>*', 'Second Singularity', 'Challenge', 'Bulk QL Challenge<br>*', 'More Challenges<br>*',
    'Singularit<br>ies<br>*', 'none', 'Bugged Reality<br>*', 'none', 'none'
  ];
  achievementGoal = [
    'Reach ${formatWithBase(63, game.base)}(${dNotation(game.base, 4, 0)})<br>Reward: Multiply mine power by x1.25', 'Have a ${dNotation(1, 0, 0)} $', 'Buy ${dNotation(3, 0, 0)} CPU upgrade', 'Reach base ${dNotation(10, 0, 0)}', 'Reach base ${dNotation(36, 0, 0)}',
    'Perform Reboot', 'Reach Bonus CPU Level ${dNotation(3, 0, 0)}', 'Reach Multi Process Level ${dNotation(1, 0, 0)}', 'Reach Extra Digit Level ${dNotation(5, 0, 0)}', 'Have ${dNotation(1e3, 4, 0)} RP',
    'Perform Overclock', 'Reach base ${dNotation(62, 4, 0)}', 'Perform Overclock with Power ${dNotation(1e10, 4, 0)}', 'Have ${dNotation(1e100)} $', 'Have ${dNotation(1.11e11, 4, 0)} RP',
    'Perform Quantum', 'Have ${dNotation(10, 4, 0)} Qubits', 'Have ${dNotation(8, 4, 0)} Quantum Upgrades', "Have ${dNotation(7, 0, 0)} Quantum Labs", 'Have ${dNotation(50, 4, 0)} Qubits',
    'Have ${dNotation("1e1000", 4, 0)} $', 'Reach base ${dNotation(250, 4, 0)}', 'Have ${dNotation(D(2).pow(1024), 6, 0)} RP', 'Have ${dNotation(1024, 4, 0)} Qubits', 'Have ${dNotation(82, 0, 0)} Labs<br>Reward: Shift Qubit production by +2QL',
    'Go singularity<br>Reward: CPU speed x25', 'Go singularity one more time', 'Complete a challenge', 'Reach bulk ${dNotation(20, 0, 0)} Quantum Labs<br>Reward: Pow Quantum requirements by ^0.9', 'Complete ${dNotation(10, 0, 0)} Challenges<br>Reward: All Challenge requirement -2',
    'Go singularity ${dNotation(100, 0, 0)} times<br>Reward: SP gain x4', 'Coming soon', 'Reach Infinity$<br>Reward: Game speed x2', 'Coming soon', 'Coming soon'
  ];
  achievementGoalFunc = [
    'game.number.gte(63)', 'game.money.gte(1)', 'game.shopBought[5] >= 3', 'game.base.gte(10)', 'game.base.gte(36)',
    'rebooting', 'game.researchLevel[0]>=3', 'game.researchLevel[1]>=1', 'game.researchLevel[2]>=5', 'game.researchPoint.gte(1e3)',
    'getOverclockPower().gt(1)', 'game.base.gte(62)', 'getOverclockPower().gte(1e10)', 'game.money.gte(1e100)', 'game.researchPoint.gte(1.11e11)',
    'game.quantumLab.gte(1)', 'game.qubit.gte(10)', 'game.quantumUpgradeBought.length>=8', 'game.quantumLab.gte(7)', 'game.qubit.gte(50)',
    'game.money.gte(\'1e1000\')', 'game.base.gte(250)', 'game.researchPoint.gte(D(2).pow(1024))', 'game.qubit.gte(1024)', 'game.quantumLab.gte(82)',
    'game.t4resets.gte(1)', 'game.t4resets.gte(2)', 'calcChallengeDone() >= 1', 'calcQuantumLabGain().gte(20)', 'calcChallengeDone() >= 10',
    'game.t4resets.gte(100)', '0', 'game.money.gte("1e9000000000000")', '0', '0'
  ];
})();

function initAchievements() {
  var tableNode = document.getElementById('achWarp');
  var cNode = document.createElement('tbody');
  tableNode.appendChild(cNode);
  tableNode = document.querySelector('#achWarp > tbody');
  var trNode = document.querySelector('#achWarp > tbody > tr:last-child');
  for (var i = 0; i < achievementName.length; i++) {
    if (i%5 == 0) {
      var cNode = document.createElement('tr');
      tableNode.appendChild(cNode);
      trNode = document.querySelector('#achWarp > tbody > tr:last-child');
    }
    var cNode = document.createElement('td');
    cNode.innerHTML = achievementName[i];
    cNode.onmouseover = new Function(`achivenementHover.bind(this)(${i})`);
    cNode.onmouseout = new Function(`achivenementUnhover()`);
    cNode.classList.add("achievementNode");
    trNode.appendChild(cNode);
  }
}
function calcAchievements() {
  var achTxt = '';
  for (var i = 0, l = achievementName.length; i < l; i++) {
    if (game.achievements.includes(i)) continue;
    if (new Function('return ' + achievementGoalFunc[i])()) {
      achTxt = achievementName[i];
      game.achievements.push(i);
      break;
    }
  }

  if (achTxt != '') {
    commandAppend(`Got an Achievement: ${achTxt}`, -40)
  }
}
function renderAchievements() {
  [...document.getElementsByClassName("achievementNode")].forEach((ele, idx) => ele.style.filter = `grayscale(${!game.achievements.includes(idx)*1})`)
}

function achivenementHover(idx) {
  $("#achDesc").style.opacity = 1;
  $("#achDesc").innerHTML = new Function("return `" + achievementGoal[idx] + "`")();
  $("#achDesc").style.top = (this.getBoundingClientRect().top - innerHeight/100 - $("#achDesc").offsetHeight) + 'px';
  $("#achDesc").style.left = (this.getBoundingClientRect().left - $("#achDesc").offsetWidth/4) + 'px';
}
function achivenementUnhover() {
  $("#achDesc").style.opacity = 0;
}