function Player(options) {
	options = options || {};
	
	this.name = options.name || "";
	this.runImage = options.runImage;
	this.hasFinished = false;
	this.minSpeed = options.minSpeed || 3;
	this.orgMinSpeed = this.minSpeed;
	this.maxSpeed = options.maxSpeed || 10;
	this.orgMaxSpeed = this.maxSpeed;
	this.skillPercent = options.skillPercent || 1;
	this.skill = options.skill;
	this.penaltySpeed = options.penaltySpeed || 1;
	this.lastSkillTime = 0;
    
    this.x = 0;
}

Player.prototype = {	
	activateSkill: function() {},
	
	getLeft: function() {
        return this.x;
	},
    
    setLeft: function(left) {
        if (left > trackWidth - 50)
            left = trackWidth - 50;
        
        this.x = left;
        this.node.css("left", parseInt(left, 10) + "px");
    },
	
	moveBy: function(dx) {
		var left = this.getLeft() + dx;
		
		if (left < 0)
			left = 0;
		
		this.setLeft(left);
	}
};

var Mario = function() {
	return new Player({
		name: "Mario",
		runImage: "img/mario-run.gif",
		minSpeed: 5,
		maxSpeed: 8,
		skillPercent: 0.5,
		penaltySpeed: 14,
		skill: function() {
			showSkillOverlay("img/mario-skill.jpg", "Mario got Star!");
			
			var self = this;
            
            setTimeout(function() {
                showMagicEffect(self);
            }, 1300);
            
			this.maxSpeed = this.minSpeed = this.penaltySpeed;
			
            if (this.penaltyTimer) {
				clearTimeout(this.penaltyTimer);
                this.penaltyTimer = null;
            }
			
			this.penaltyTimer = setTimeout(function() {
				self.maxSpeed = self.orgMaxSpeed;
				self.minSpeed = self.orgMinSpeed;
				
				clearTimeout(self.penaltyTimer);
                self.penaltyTimer = null;
			}, 3000);
		}
	});
};

var Sonic = function() {
	return new Player({
		name: "Sonic",
		runImage: "img/sonic-run.gif",
		minSpeed: 3,
		maxSpeed: 16,
		skillPercent: 0.8,
		penaltySpeed: 2,
		skill: function() {
			showSkillOverlay("img/sonic-skill.jpg", "Sonic got hit!");
			
			var self = this;
            
            setTimeout(function() {
                showMagicEffect(self);
            }, 1300);
			
			this.maxSpeed = this.minSpeed = this.penaltySpeed;
			
            if (this.penaltyTimer) {
				clearTimeout(this.penaltyTimer);
                this.penaltyTimer = null;
            }
			
			this.penaltyTimer = setTimeout(function() {
				self.maxSpeed = self.orgMaxSpeed;
				self.minSpeed = self.orgMinSpeed;
				
				clearTimeout(self.penaltyTimer);
                this.penaltyTimer = null;
			}, 3500);
		}
	});
};

var MegaMan = function() {
	return new Player({
		name: "MegaMan",
		runImage: "img/megaman-run.gif",
		minSpeed: 6,
		maxSpeed: 8,
		skillPercent: 0.15,
		penaltySpeed: -2,
		skill: function() {
			showSkillOverlay("img/megaman-skill.jpg", "Mega Fire!!");
			
			var self = this;
			
			players.forEach(function(p) {
				if (p.name !== "MegaMan" && !p.hasFinished) {
                    setTimeout(function() {
                        showMagicEffect(p);
                    }, 1300);
                    
                    p.maxSpeed = p.minSpeed = self.penaltySpeed;
					
                    if (p.penaltyTimer) {
						clearTimeout(p.penaltyTimer);
                        p.penaltyTimer = null;
                    }
					
					p.penaltyTimer = setTimeout(function() {
						p.maxSpeed = p.orgMaxSpeed;
						p.minSpeed = p.orgMinSpeed;
						
						clearTimeout(p.penaltyTimer);
                        p.penaltyTimer = null;
					}, 2500);
				}
			});
		}
	});
};

var Pikachu = function() {
	return new Player({
		name: "Pikachu",
		runImage: "img/pikachu-run.gif",
		minSpeed: 4,
		maxSpeed: 9,
		skillPercent: 0.15,
		penaltySpeed: 0,
		skill: function() {
			showSkillOverlay("img/pikachu-skill.png", "Pika Pika!!");
			
			var self = this;
			
			players.forEach(function(p) {
				if (p.name !== "Pikachu" && !p.hasFinished) {
                    setTimeout(function() {
                        showMagicEffect(p);
                    }, 1300);
                    
                    p.maxSpeed = p.minSpeed = self.penaltySpeed;
					
                    if (p.penaltyTimer) {
						clearTimeout(p.penaltyTimer);
                        p.penaltyTimer = null;
                    }
					
					p.penaltyTimer = setTimeout(function() {
						p.maxSpeed = p.orgMaxSpeed;
						p.minSpeed = p.orgMinSpeed;
						
						clearTimeout(p.penaltyTimer);
                        p.penaltyTimer = null;
					}, 3500);
				}
			});
		}
	});
};

var Smurf = function() {
	return new Player({
		name: "Smurf",
		runImage: "img/smurf-run.gif",
		minSpeed: 5,
		maxSpeed: 9,
		skillPercent: 0.5,
		penaltySpeed: -2,
		skill: function() {
			showSkillOverlay("img/smurf-skill.png", "La la la la");
			
			var self = this;
			var leader = null;
			var leaderLength = -1;
			
			players.forEach(function(p) {
				if (p.getLeft() > leaderLength && !p.hasFinished) {
					leaderLength = p.getLeft();
					leader = p;
				}
			});
					
            setTimeout(function() {
                showMagicEffect(leader);
            }, 1300);
            
            leader.maxSpeed = leader.minSpeed = this.penaltySpeed;
			
            if (leader.penaltyTimer) {
				clearTimeout(leader.penaltyTimer);
                leader.penaltyTimer = null;
            }
            
			leader.penaltyTimer = setTimeout(function() {
				leader.maxSpeed = leader.orgMaxSpeed;
				leader.minSpeed = leader.orgMinSpeed;
				
				clearTimeout(leader.penaltyTimer);
                leader.penaltyTimer = null;
			}, 3500);
		}
	});
};

var Ryu = function() {
    return new Player({
        name: "Ryu",
        runImage: "img/ryu-run.gif",
        minSpeed: 5,
        maxSpeed: 8,
        skillPercent: 0.2,
        penaltySpeed: 0,
        skill: function() {
            showSkillOverlay("img/ryu-skill.jpg", "Hadouken!!");
            
            var self = this;
            
            players.forEach(function(p) {
                if (p.getLeft() > self.getLeft() && !p.hasFinished) {
                    setTimeout(function() {
                        showMagicEffect(p);
                    }, 1300);
                    
                    p.maxSpeed = p.minSpeed = self.penaltySpeed;
                    
                    if (p.penaltyTimer) {
                        clearTimeout(p.penaltyTimer);
                        p.penaltyTimer = null;
                    }
                    
                    p.penaltyTimer = setTimeout(function() {
                        p.maxSpeed = p.orgMaxSpeed;
                        p.minSpeed = p.orgMinSpeed;
                        
                        clearTimeout(p.penaltyTimer);
                        p.penaltyTimer = null;
                    }, 3500);
                }
            });
        }
    });
};

var Zelda = function() {
    return new Player({
        name: "Zelda",
        runImage: "img/zelda-run.gif",
        minSpeed: 5,
        maxSpeed: 10,
        skillPercent: 0.5,
        penaltySpeed: 0,
        skill: function() {
            showSkillOverlay("img/zelda-skill.png", "Attaaack!");
            
            var self = this;
            var front = null;
            var frontLength = 100000000;
            
            players.forEach(function(p) {
                if (p.name !== "Zelda" && !p.hasFinished) {
                    if (p.getLeft() > self.getLeft() && p.getLeft() < frontLength) {
                        frontLength = p.getLeft();
                        front = p;
                    }
                }
            });
            
            if (front) {
                setTimeout(function() {
                    showMagicEffect(front);
                }, 1300);
                
                front.maxSpeed = front.minSpeed = this.penaltySpeed;
                
                if (front.penaltyTimer) {
                    clearTimeout(front.penaltyTimer);
                    front.penaltyTimer = null;
                }
                
                front.penaltyTimer = setTimeout(function() {
                    front.maxSpeed = front.orgMaxSpeed;
                    front.minSpeed = front.orgMinSpeed;
                    
                    clearTimeout(front.penaltyTimer);
                    front.penaltyTimer = null;
                }, 3500);
            }
        }
    });
};

var Kirby = function() {
    return new Player({
        name: "Kirby",
        runImage: "img/kirby-run.gif",
        minSpeed: 4,
        maxSpeed: 10,
        skillPercent: 0.2,
        penaltySpeed: 0,
        skill: function() {
            var self = this;
            var n = parseInt(players.length * Math.random());
            var p = players[n];
            
            if (p.name === "Kirby" || p.hasFinished) {
                isPaused = false;
                return;
            }
            
            showSkillOverlay("img/kirby-skill.png", "Shuuuuuuu!");
            
            setTimeout(function() {
                showMagicEffect(p);
                showMagicEffect(self);
            }, 1300);
            
            var left = self.getLeft();
            self.setLeft(p.getLeft());
            p.setLeft(left);
        }
    });
};

var Prince = function() {
    return new Player({
        name: "Prince",
        runImage: "img/prince-run.gif",
        minSpeed: 4,
        maxSpeed: 8,
        skillPercent: 0.2,
        penaltySpeed: 0,
        skill: function() {
            showSkillOverlay("img/prince-skill.jpg", "Juuuump!");
            
            var self = this;
            
            setTimeout(function() {
                showMagicEffect(self);
            }, 1300);
            
            self.setLeft(self.getLeft() + (trackWidth / 10));
        }
    });
};

var Duke = function() {
    return new Player({
        name: "Duke",
        runImage: "img/duke-run.gif",
        minSpeed: 4,
        maxSpeed: 9,
        skillPercent: 0.2,
        penaltySpeed: 0,
        skill: function() {
            showSkillOverlay("img/duke-skill.jpg", "Let's Rock!");
            
            var self = this;
            
            players.forEach(function(p) {
                if (p.name !== "Duke") {
                    var b = parseInt(Math.random() * 2);
                    
                    if (b === 1) {
                        setTimeout(function() {
                            showMagicEffect(p);
                        }, 1300);
                        
                        p.maxSpeed = p.minSpeed = self.penaltySpeed;
                        
                        if (p.penaltyTimer) {
                            clearTimeout(p.penaltyTimer);
                            p.penaltyTimer = null;
                        }
                        
                        p.penaltyTimer = setTimeout(function() {
                            p.maxSpeed = p.orgMaxSpeed;
                            p.minSpeed = p.orgMinSpeed;
                            
                            clearTimeout(p.penaltyTimer);
                            p.penaltyTimer = null;
                        }, 3500);
                    }
                }
            });
        }
    });
};