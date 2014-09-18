Quad = function(){};
Quad.In = function(t) {
    return (t /= 1) * t;
};
Quad.Out = function(t) {
    return -(t /= 1) * (t - 2);
};
Quad.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t;
    return -.5 * ((--t) * (t - 2) - 1);
};

Cubic = function(){};
Cubic.In = function(t) {
    return (t /= 1) * t * t;
};
Cubic.Out = function(t) {
    return ((t = t / 1 - 1) * t * t + 1);
};
Cubic.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t * t;
    return .5 * ((t -= 2) * t * t + 2);
};

Quart = function(){};
Quart.In = function(t) {
    return (t /= 1) * t * t * t;
};
Quart.Out = function(t) {
    return -((t = t / 1 - 1) * t * t * t - 1);
};
Quart.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t * t * t;
    return -.5 * ((t -= 2) * t * t * t - 2);
};

Quint = function(){};
Quint.In = function(t) {
    return (t /= 1) * t * t * t * t;
};
Quint.Out = function(t) {
    return ((t = t / 1 - 1) * t * t * t * t + 1);
};
Quint.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t * t * t * t;
    return .5 * ((t -= 2) * t * t * t * t + 2);
};

Sine = function(){};
Sine.In = function(t) {
    return -Math.cos(t / 1 * (Math.PI / 2)) + 1;
};
Sine.Out = function(t) {
    return Math.sin(t / 1 * (Math.PI / 2));
};
Sine.InOut = function(t) {
    return -.5 * (Math.cos(Math.PI * t / 1) - 1);
};

Expo = function(){};
Expo.In = function(t) {
    return (t == 0) ? 0 : Math.pow(2, 10 * (t / 1 - 1));
};
Expo.Out = function(t) {
    return (t == 1) ? 1 : (-Math.pow(2, -10 * t / 1) + 1);
};
Expo.InOut = function(t) {
    if (t == 0) return 0;
    if (t == 1) return 1;
    if ((t /= 1 / 2) < 1) return .5 * Math.pow(2, 10 * (t - 1));
    return .5 * (-Math.pow(2, -10 * --t) + 2);
};

Circ = function(){};
Circ.In = function(t) {
    return -(Math.sqrt(1 - (t /= 1) * t) - 1);
};
Circ.Out = function(t) {
    return Math.sqrt(1 - (t = t / 1 - 1) * t);
};
Circ.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
    return .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};

Elastic = function(){};
Elastic.In = function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t == 0) return 0;
    if ((t /= 1) == 1) return 1;
    if (!p) p = .3;
    if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
};
Elastic.Out = function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t == 0) return 0;
    if ((t /= 1) == 1) return 1;
    if (!p) p = .3;
    if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
};
Elastic.InOut = function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t == 0) return 0;
    if ((t /= 1 / 2) == 2) return 1;
    if (!p) p = (.3 * 1.5);
    if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * .5 + 1;
};

Back = function(){};
Back.In = function(t, s) {
    if (s == undefined) s = 1.70158;
    return (t /= 1) * t * ((s + 1) * t - s);
};
Back.Out = function(t, s) {
    if (s == undefined) s = 1.70158;
    return ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
};
Back.InOut = function(t, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= 1 / 2) < 1) return .5 * (t * t * (((s *= (1.525)) + 1) * t - s));
    return .5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
};

Bounce = function(){};
Bounce.In = function(t) {
    return 1 - Bounce.Out(1 - t, 0);
};
Bounce.Out = function(t) {
    if ((t /= 1) < (1/2.75)) {
        return (7.5625 * t * t);
    } else if (t < (2 / 2.75)) {
        return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
    } else if (t < (2.5 / 2.75)) {
        return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
    } else {
        return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
    }
};
Bounce.InOut = function(t) {
    if (t < .5) return Bounce.In (t * 2, 0) * .5;
    return Bounce.Out(t * 2 - 1, 0) * .5 + .5;
};(function(window, undefined) {  
    _idMap = [];
    _idMap['Motion'] = 0;
    _idMap['Tween'] = 0;
    _idMap['Property'] = 0;
    _idMap['Parallel'] = 0;
    _idMap['Sequence'] = 0;
    _idMap['Timeline'] = 0;
    _idMap['KeyFrame'] = 0;

    _motions = [];

    /**
   * Returns the duration of the HTML5 media element.
   * 
   * @method duration
   * @return {Number} duration
   */
    MOTION = function(duration, delay, easing) {
        if (this.isTween())
            this._id = 'Tween' + _idMap['Tween']++;
        else if (this.isParallel())
            this._id = 'Parallel' + _idMap['Parallel']++;
        else if (this.isSequence())
            this._id = 'Sequence' + _idMap['Sequence']++;
        else if (this.isTimeline())
            this._id = 'Timeline' + _idMap['Timeline']++;
        else
            this._id = 'Motion' + _idMap['Motion']++;

        this._name = '';

        this._playTime = 0;
        this._playCount = 0;

        this._time = 0;
        this._timeScale = 1;

        this._duration = (typeof duration == 'undefined') ? 0 : duration;

        this._delay = (typeof delay == 'undefined') ? 0 : delay;

        this._easing = (typeof easing == 'undefined') ? (function(t) {
            return t;
        }) : easing;

        this._repeatCount = 0;
        this._repeatDuration = 0;

        this._isPlaying = false;
        this._isRepeating = false;
        this._isRepeatingDelay = false;
        this._isReversing = false;
        this._isSeeking = false;

        this._isAutoUpdating = true;

        this._reverseTime = 0;

        this._order = 0;

        this._onStart = undefined;
        this._onEnd = undefined;
        this._onUpdate = undefined;
        this._onRepeat = undefined;

        this._valueMode = MOTION.ABSOLUTE;

        _motions.push(this);
    };

    MOTION.REVISION = '1';

    MOTION.SECONDS = "seconds";
    MOTION.FRAMES = "frames";

    _timeMode = MOTION.SECONDS;

    MOTION.RELATIVE = 'relative';
    MOTION.ABSOLUTE = 'absolute';

    MOTION.REVERSE = "reverse";
    MOTION.NO_REVERSE = "noReverse";

    MOTION.ONCE = "once";
    MOTION.REPEAT = "repeat";

    MOTION.setTimeMode = function(timeMode) {
        _timeMode = timeMode;
        return this;
    };

    MOTION.getTimeMode = function() {
        return _timeMode;
    };

    MOTION.remove = function(child) {
        var i = _motions.indexOf(child);
        _motions.splice(i, 1);
    };

    MOTION.prototype.constructor = MOTION;

    MOTION.prototype.play = function() { 
        this.dispatchStartedEvent();

        this.seek(0);
        this.resume();

        this._playCount++;
        this._repeatCount = 0;

        return this;
    };

    MOTION.prototype.stop = function() { 
        this._reverseTime = (this._reverseTime === 0) ? this._duration : 0;

        if (this._isRepeating && (this._repeatDuration === 0 || this._repeatCount < this._repeatDuration)) {
            this.seek(0);
            this.resume();

            if (!this._isRepeatingDelay)
                this._delay = 0;

            this._repeatCount++;

            this.dispatchRepeatedEvent();
        } else {
            this.seek(1);
            this.pause();

            this._repeatCount = 0;

            this.dispatchEndedEvent();
        }

        return this;
    };

    MOTION.prototype.pause = function() {  
        this._isPlaying = false; 

        this._playTime = this._time;

        return this;
    };

    MOTION.prototype.resume = function() { 
        this._isPlaying = true;  

        this._playTime = new Date().getTime() - this._playTime * 1000;

        return this;
    };

    MOTION.prototype.seek = function(value) {
        this._isPlaying = false; 
        this._isSeeking = true;

        this._playTime = (this._delay + this._duration) * value;

        this.setTime(this._playTime);
 
        this.dispatchChangedEvent();  

        this._isSeeking = false;

        return this;
    };

    MOTION.prototype.repeat = function(duration) {
        this._isRepeating = true;

        if (typeof repeat != 'undefined') this._repeatDuration = duration;

        return this;
    };

    MOTION.prototype.oRepeat = function() {
        this._isRepeating = false;
        this._repeatDuration = 0;

        return this;
    };

    MOTION.prototype.reverse = function() {
        this._isReversing = true;
        return this;
    };

    MOTION.prototype.noReverse = function() {
        this._isReversing = false;
        return this;
    };

    MOTION.prototype.update = function(time) {  
        if (this._isPlaying) {
            if (typeof time == 'undefined')
                this.updateTime();
            else
                this.setTime(time);

            this.dispatchChangedEvent(); 

             if (!this.isInsidePlayingTime(this._time)) 
                this.stop();
        }  
    };

    MOTION.prototype.updateTime = function() {
        this._time = (new Date().getTime() - this._playTime) / 1000 * this._timeScale;

        if (this._isReversing && this._reverseTime !== 0)
            this._time = this._reverseTime - this._time; 
    };

    MOTION.prototype.setName = function(name) {
        this._name = name;
        return this;
    };

    MOTION.prototype.getName = function() {
        return this._name;
    };

    MOTION.prototype.setTime = function(time) {
        this._time = time;
        if (this._isReversing && this._reverseTime !== 0) this._time = this._reverseTime - this._time;
        return this;
    };

    MOTION.prototype.getTime = function() {
        return (this._time < this._delay) ? 0 : (this._time - this._delay);
    };

    MOTION.prototype.setTimeScale = function(_timeScale) {
        this._timeScale = _timeScale;
        return this;
    };

    MOTION.prototype.getTimeScale = function() {
        return this._timeScale;
    };

    MOTION.prototype.getPosition = function() {
        var t = this.getTime();
        return this._easing((t > 0) ? this.getTime() / this._duration : 0);
    };

    MOTION.prototype.setDuration = function(_duration) {
        this._duration = _duration;
        return this;
    };

    MOTION.prototype.duration = MOTION.prototype.setDuration;

    MOTION.prototype.getDuration = function() {
        return this._duration;
    };

    MOTION.prototype.getRepeatCount = function() {
        return this._repeatCount;
    };

    MOTION.prototype.setDelay = function(delay) {
        this._delay = delay;
        return this;
    };

    MOTION.prototype.delay = MOTION.prototype.setDelay;

    MOTION.prototype.noDelay = function() {
        this._delay = 0;
        return this;
    };

    MOTION.prototype.getDelay = function() {
        return this._delay;
    };

    MOTION.prototype.repeatDelay = function(duration) {
        this.repeat(duration);
        this._isRepeatingDelay = true;
        return this;
    };

    MOTION.prototype.noRepeatDelay = function() {
        this.noRepeat();
        this._isRepeatingDelay = false;
        return this;
    };

    MOTION.prototype.setEasing = function(easing) {
        this._easing = easing;
        return this;
    };

    MOTION.prototype.easing = MOTION.prototype.setEasing;

    MOTION.prototype.getEasing = function() {
        return this._easing;
    };

    MOTION.prototype.noEasing = function() {
        this.setEasing(function(t) {
            return t;
        });
        return this;
    };

    MOTION.prototype.relative = function() {
        this.setValueMode(MOTION.RELATIVE);
        return this;
    };

    MOTION.prototype.absolute = function() {
        this.setValueMode(MOTION.ABSOLUTE);
        return this;
    };

    MOTION.prototype.setValueMode = function(_valueMode) {
        this._valueMode = _valueMode;
        return this;
    };

    MOTION.prototype.getValueMode = function() {
        return this._valueMode;
    };

    MOTION.prototype.isRelative = function() {
        return this._valueMode == MOTION.RELATIVE;
    };

    MOTION.prototype.isAbsolute = function() {
        return this._valueMode == MOTION.ABSOLUTE;
    };

    MOTION.prototype.autoUpdate = function() {
        this._isAutoUpdating = true;
        return this;
    };

    MOTION.prototype.noAutoUpdate = function() {
        this._isAutoUpdating = false;
        return this;
    };

    MOTION.prototype.isAutoUpdating = function() {
        return this._isAutoUpdating;
    };

    MOTION.prototype.isDelaying = function() {
        return (this._time <= this._delay);
    };

    MOTION.prototype.isPlaying = function() {
        return this._isPlaying;
    };

    MOTION.prototype.isReversing = function() {
        return this._isReversing;
    };

    MOTION.prototype.isInsideDelayingTime = function(value) {
        return (value >= 0 && value < this._delay);
    };

    MOTION.prototype.isInsidePlayingTime = function(value) {
        return (value >= this._delay && value < this._delay + this._duration);
    };

    MOTION.prototype.isAbovePlayingTime = function(value) {
        return value >= this._delay + this._duration;
    };

    MOTION.prototype.isTween = function() {
        return this instanceof MOTION.Tween;
    };

    MOTION.prototype.isParallel = function() {
        return this instanceof MOTION.Parallel;
    };

    MOTION.prototype.isSequence = function() {
        return this instanceof MOTION.Sequence;
    };

    MOTION.prototype.isTimeline = function() {
        return this instanceof MOTION.Timeline;
    };

    MOTION.prototype.isKeyframe = function() {
        return this instanceof MOTION.Keyframe;
    };

    MOTION.prototype.usingSeconds = function() {
        return _timeMode == MOTION.SECONDS;
    };

    MOTION.prototype.usingFrames = function() {
        return _timeMode == MOTION.FRAMES;
    };

    MOTION.prototype.onStart = function(func) {
        this._onStart = func;
        return this;
    };

    MOTION.prototype.onEnd = function(func) {
        this._onEnd = func;
        return this;
    };

    MOTION.prototype.onUpdate = function(func) {
        this._onUpdate = func;
        return this;
    };

    MOTION.prototype.onRepeat = function(func) {
        this._onRepeat = func;
        return this;
    };

    MOTION.prototype.dispatchStartedEvent = function() {
        if (this._onStart)
            this._onStart(window);
    };

    MOTION.prototype.dispatchEndedEvent = function() {
        if (this._onEnd)
            this._onEnd(window);
    };

    MOTION.prototype.dispatchChangedEvent = function() {
        if (this._onUpdate)
            this._onUpdate(window);
    };

    MOTION.prototype.dispatchRepeatedEvent = function() {
        if (this._onRepeat)
            this._onRepeat(window);
    };

    MOTION.prototype.kill = function() {
        MOTION.remove(this);
        delete this;
    };

    window.MOTION = MOTION;
})(window);(function(MOTION, undefined) {
    MOTION.MotionController = function(motions) {
        MOTION.call(this);

        this._motions = [];
        this._motionMap = [];

        this._tweens = [];

        if (motions) this.addAll(motions);
    };

    MOTION.MotionController.prototype = Object.create(MOTION.prototype);
    MOTION.MotionController.prototype.constructor = MOTION.MotionController

    MOTION.MotionController.prototype.updateMotions = function() {
        for (var i = 0; i < this._motions.length; i++) {
            var m = this._motions[i];

            if (this._isSeeking) {
                if (m.isInsidePlayingTime(this.getTime()))
                    m.seek(map(this.getTime(), 0, m.getDelay() + m.getDuration(), 0, 1));
                else if (m.isAbovePlayingTime(this.getTime()))
                    m.seek(1);
                else
                    m.seek(0);
            } else if (m.isInsidePlayingTime(this.getTime())) {
                if (m.isPlaying())
                    m.update(this.getTime());
                else
                    m.play();
            } else if (m.isPlaying())
                m.stop();
        }
    };

    MOTION.MotionController.prototype.updateTweens = function() {
        var orderMap = [];
        var ppropertyMap = [];

        for (var i = 0; i < this._tweens.length; i++) {
            var t = this._tweens[i];
            var properties = t.get();

            for (var j = 0; j < properties.length; j++) {
                var p = properties[j];

                var name = (t.isRelative()) ? p.getField() : t._id + '.' + p.getField();
                var order = 0;

                if (name in orderMap) {
                    order = orderMap[name];
                    order++;

                    var pp = ppropertyMap[name];
                    p.setBegin(pp.getEnd());
                } else
                    p.setBegin();

                p.setOrder(order);

                orderMap[name] = order;
                ppropertyMap[name] = p;
            }
        }
    };

    MOTION.MotionController.prototype.updateDuration = function() {
        for (var i = 0; i < this._motions.length; i++)
            this._duration = Math.max(this._duration, this._motions[i].getDelay() + this._motions[i].getDuration());
    };

    MOTION.MotionController.prototype.getPosition = function() {
        return this.getTime() / this._duration;
    };

    MOTION.MotionController.prototype.get = function(name) {
        if (typeof arguments[0] == 'number')
            return this._motions[arguments[0]];
        else if (typeof arguments[0] == 'string')
            return this._motionMap[arguments[0]];
        return this._motions;
    };

    MOTION.MotionController.prototype.getCount = function() {
        return this._motions.length;
    };

    MOTION.MotionController.prototype.setValueMode = function(_valueMode) {
        MOTION.prototype.setValueMode.call(this, _valueMode);

        for (var i = 0; i < this._motions.length; i++)
            this._motions[i].setValueMode(_valueMode);

        return this;
    };

    MOTION.MotionController.prototype.add = function(motion) {
        this.insert(motion, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(motion, time) {
        motion.delay(time);
        motion.noAutoUpdate();

        this._motions.push(motion);

        if (motion.getName() != null)
            this._motionMap[motion.getName()] = motion;

        if (motion.isTween()) {
            this._tweens.push(motion);
            this.updateTweens();
        }

        this.updateDuration();

        return this;
    };

    MOTION.MotionController.prototype.remove = function(motion) {
        var motion, i;

        if (typeof arguments[0] == 'number') {
            i = arguments[0]
            motion = this._motions[i]
        } else if (typeof arguments[0] == 'name') {
            motion = this._motionMap[arguments[0]]
            i = this._motions.indexOf(motion);
        } else if (typeof arguments[0] == 'object') {
            motion = arguments[0]
            i = this._motions.indexOf(motion);
        }

        if (i != -1)
            this._motions.splice(i, 1);

        if (motion.getName() in this._motionMap)
            delete this._motionMap[motion.getName()];

        if (motion.isTween()) {
            i = this._tweens.indexOf(motion);
            this._tweens.splice(i, 1);

            this.updateTweens();
        }

        this.updateDuration();

        motion.kill();

        return this;
    };

    MOTION.MotionController.prototype.addAll = function(motions) {
        for (var i = 0; i < motions.length; i++)
            this.add(motions[i]);

        return this;
    };

    MOTION.MotionController.prototype.removeAll = function() {
        for (var i = 0; i < motions.length; i++)
            this.remove(motions[i]);

        return this;
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this.updateMotions();
        MOTION.prototype.dispatchChangedEvent.call(this)
    };
})(MOTION);(function(MOTION, undefined) {
  MOTION.Parallel = function(motions) {
    MOTION.MotionController.call(this, name, motions);
  };

  MOTION.Parallel.prototype = Object.create(MOTION.MotionController.prototype);
  MOTION.Parallel.prototype.constructor = MOTION.Parallel; 
})(MOTION);(function(MOTION, undefined) {
    MOTION.Property = function(object, field, end) {
        this._object = object;
        this._field = field;

        this._id = 'Property' + _idMap['Property']++;

        this._begin = (typeof object[field] == "undefined") ? 0 : object[field];
        this._end = (typeof end == "undefined") ? 0 : end;

        this._position = 0;
    }

    MOTION.Property.prototype.update = function(position) {
        this._position = position;

        if ((this._position > 0 && this._position <= 1) || (this._position == 0 && this._order == 0)) {
            this._object[this._field] = this._position * (this._end - this._begin) + this._begin;
        } else {
            // console.log(this._position);
        }
    };

    MOTION.Property.prototype.getId = function() {
        return this._id;
    };

    MOTION.Property.prototype.getBegin = function() {
        return this._begin;
    };

    MOTION.Property.prototype.setBegin = function(begin) {
        if (typeof begin === 'undefined') {
            // this._begin = (typeof this._object[this._field] === 'undefined') ? 0 : this._object[this._field];
            if (typeof this._object[this._field] === 'undefined')
                this._begin = 0
            else
                this._begin = this._object[this._field];
        } else
            this._begin = begin;

        return this;
    };

    MOTION.Property.prototype.getEnd = function() {
        return this._end;
    };

    MOTION.Property.prototype.setEnd = function(end) {
        this._end = end;
        return this;
    };

    MOTION.Property.prototype.getPosition = function() {
        return this._position
    };

    MOTION.Property.prototype.setPosition = function(position) {
        this._position = position;
        this.update();
        return this;
    };

    MOTION.Property.prototype.getValue = function() {
        return this._object[this._field];
    };

    MOTION.Property.prototype.getObject = function() {
        return this._object
    };

    MOTION.Property.prototype.getField = function() {
        return this._field
    };

    MOTION.Property.prototype.setOrder = function(order) {
        this._order = order
        return this;
    };

    MOTION.Property.prototype.getOrder = function() {
        return this._order
    };

    MOTION.NumberProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end)
    };

    MOTION.NumberProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.NumberProperty.prototype.constrctor = MOTION.NumberProperty
})(MOTION);(function(MOTION, undefined) {
    MOTION.Sequence = function(children) {
        MOTION.MotionController.call(this, children);

        this._current = null;
        this._currentIndex = 0;
    };

    MOTION.Sequence.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Sequence.prototype.constructor = MOTION.Sequence;

    MOTION.Sequence.prototype.add = function(child) {
        MOTION.MotionController.prototype.insert.call(this, child, this._duration);
        return this;
    };

    MOTION.Sequence.prototype.get = function(name) {
        if (typeof arguments[0] == 'number')
            return this._motions[arguments[0]];
        else if (typeof arguments[0] == 'string')
            return this._motions[arguments[0]];
        else
            return this._current;
    };

    MOTION.Sequence.prototype.getIndex = function() {
        return this._currentIndex;
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this.updateMotions();

         if (this._isPlaying) {
            for (var i = 0; i < this._motions.length; i++) {
                var c = this._motions[i];

                if (c.isInsidePlayingTime(this._time)) {
                    this._currentIndex = i;
                    this._current = c;

                    break;
                }
            }
        }
        
        MOTION.prototype.dispatchChangedEvent.call(this)
    };
})(MOTION);;(function(MOTION, undefined) {
    MOTION.Keyframe = function(time, motions) {
        MOTION.MotionController.call(this, motions)
        this.delay(time);
    };

    MOTION.Keyframe.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Keyframe.prototype.constructor = MOTION.Keyframe;

    MOTION.Timeline = function() {
        MOTION.MotionController.call(this);
    };

    MOTION.Timeline.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Timeline.prototype.constructor = MOTION.Timeline;

    MOTION.Timeline.prototype.add = function(motion, time) {
        if (motion.isKeyframe()) {
            if (typeof time == 'undefined')
                this.insert(motion, motion.getDelay());
            else
                this.insert(motion, time);
        } else {
            if (typeof time == 'undefined') {
                var c = this._motionMap.get(motion.getName());
                c.add(motion);

                this._motions[this._motions.indexOf(c)] = c;
            } else {
                var key = time + '';

                if (key in this._motionMap)
                    this._motionMap[key].add(motion);
                else {
                    var k = new MOTION.Keyframe(time + '');
                    k.add(motion);

                    this.insert(k, time);
                }

            }
        }

        return this;
    };

    MOTION.Timeline.prototype.get = function(index) {
        if (typeof arguments[0] == 'number')
            return this._motions[arguments[0]];
        else if (typeof arguments == 'string')
            return this._motionMap[arguments[0]];
        else {
            var current = [];

            for (var i = 0; i < this._motions.length; i++)
                if (this._motions[i].isInsidePlayingTime(this.getTime()))
                    current.push(this._motions[i]);

            if (current.length == 0)
                return null;
            else
                return current;
        }
    };

    MOTION.Timeline.prototype.gotoAndPlay = function(time) {
        if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.resume();
        } else if (typeof arguments[0] == 'string') {
            var k = this.get(arguments[0]);

            this.seek(k.getPlayTime() / this._duration);
            this.resume();
        } else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.resume();
        }
    };

    MOTION.Timeline.prototype.gotoAndStop = function(time) {
        if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.pause();
        } else if (typeof arguments[0] == 'string') {
            var k = this.get(arguments[0]);

            this.seek(k.getPlayTime() / this._duration);
            this.pause();
        } else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.pause();
        }
    };
})(MOTION);(function(MOTION, undefined) {
    MOTION.Tween = function(object, property, end, duration, delay, easing) {
        this._object = (typeof arguments[0] == 'undefined' || typeof arguments[0] == 'number') ? window : arguments[0];

        this._properties = [];
        this._propertyMap = [];

        if (typeof arguments[1] == 'string') {
            if (typeof object == 'undefined' || typeof arguments[0] == 'number')
                MOTION.call(this, arguments[0], arguments[1], arguments[2]);
            else
                MOTION.call(this, duration, delay, easing);

            this.addProperty(this._object, property, end);
        } else {
            if (typeof object == 'undefined' || typeof arguments[0] == 'number')
                MOTION.call(this, arguments[0], arguments[1], arguments[2]);
            else
                MOTION.call(this, arguments[1], arguments[2], arguments[3]);
        }
    };

    MOTION.Tween.prototype = Object.create(MOTION.prototype);
    MOTION.Tween.prototype.constrctor = MOTION.Tween;

    MOTION.Tween.prototype.updateProperties = function() {
        for (var i = 0; i < this._properties.length; i++)
            this._properties[i].update(this.getPosition());
    };

    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        var p = (typeof arguments[0] == 'string') ? new MOTION.NumberProperty(this._object, arguments[0], arguments[1]) : new MOTION.NumberProperty(object, property, end);

        this._properties.push(p);
        this._propertyMap[p.getField()] = p;

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;


    MOTION.Tween.prototype.remove = function(child) {
        var property, i;

        if (typeof arguments[0] == 'number') {
            i = arguments[0];
            property = this._properties[i];
        } else if (typeof arguments[0] == 'name') {
            property = this._propertyMap[arguments[0]];
            i = this._properties.indexOf(property);
        } else if (typeof arguments[0] == 'object') {
            property = arguments[0];
            i = this._properties.indexOf(property);
        }

        if (i && i != -1)
            this._properties.splice(i, 1);

        if (property && property.getName() in this._propertyMap)
            delete this._propertyMap[c.getName()];

        return this;
    };

    MOTION.Tween.prototype.getProperty = function() {
        if (typeof arguments[0] == 'string')
            return this._propertyMap[arguments[0]];
        else if (typeof arguments[0] == 'number')
            return this._properties[arguments[0]];
        else
            return this._properties;
    };

    MOTION.Tween.prototype.get = MOTION.Tween.prototype.getProperty;

    MOTION.Tween.prototype.getCount = function() {
        return this._properties.length;
    };

    MOTION.Tween.prototype.dispatchStartedEvent = function() {
        if (this.isRelative())
            for (var i = 0; i < this._properties.length; i++)
                this._properties[i].setBegin();

        if (this._onStart)
            this._onStart(window, this._object);
    };

    MOTION.Tween.prototype.dispatchEndedEvent = function() {
        if (this._onEnd)
            this._onEnd(window, this._object);
    };

    MOTION.Tween.prototype.dispatchChangedEvent = function() {
        this.updateProperties();

        if (this._onUpdate)
            this._onUpdate(window, this._object);
    };

    MOTION.Tween.prototype.dispatchRepeatedEvent = function() {
        if (this._onRepeat)
            this._onRepeat(window, this._object);
    };
})(MOTION);;(function(MOTION, undefined) {
    REVISION = '1';

    _timeMode = MOTION.FRAMES;
    _valueMode = MOTION.ABSOLUTE;

    p5.prototype.registerMethod('pre', function() {
        for (var i = 0; i < _motions.length; i++)
            if (_motions[i].isAutoUpdating())
                _motions[i].update();
    });

    p5.prototype.createMotion = function(duration, delay, easing) {
        return new MOTION(duration, delay, easing);
    };

    p5.prototype.createTween = function(object, property, end, duration, delay, easing) {
        return new MOTION.Tween(object, property, end, duration, delay, easing);
    };

    p5.prototype.createParallel = function(children) {
        return new MOTION.Parallel(children);
    };

    p5.prototype.createSequence = function(children) {
        return new MOTION.Sequence(children);
    };

    p5.prototype.createTimeline = function(children) {
        return new MOTION.Timeline(children);
    };

    p5.prototype.seconds = function() {
        _timeMode = MOTION.SECONDS;

        return this;
    };

    p5.prototype.frames = function() {
        _timeMode = MOTION.FRAMES;

        return this;
    };

    _currentEasing = null;

    p5.prototype.easing = function(easing) {
        _currentEasing = easing;

        return this;
    };

    p5.prototype.relative = function() {
        _valueMode = MOTION.RELATIVE;

        // if (_current)
        //     _current.setValueMode(_valueMode)

        return this;
    };

    p5.prototype.absolute = function() {
        _valueMode = MOTION.ABSOLUTE;

        if (_current)
            _current.setValueMode(_valueMode)

        return this;
    };

    _current = null;

    p5.prototype.tween = function(object, property, end, duration, delay, easing) {
        t = new MOTION.Tween(object, property, end, duration, delay, easing).setValueMode(_valueMode);

        if (_currentEasing)
            t.easing(_currentEasing)

        if (_current)
            _current.add(t);

        return t;
    };

    p5.prototype.beginParallel = function(name) {
        _current = new MOTION.Parallel();

        if (typeof name != 'undefined')
            _current.setName(name);

        return _currentParallel;
    };

    p5.prototype.endParallel = function() {
        _current.updateTweens();
    };

    p5.prototype.beginSequence = function(name) {
        _current = new MOTION.Sequence();

        if (typeof name != 'undefined')
            _current.setName(name);

        return _current;
    };

    p5.prototype.endSequence = function() {
        _current.updateTweens();
    };

    p5.prototype.beginTimeline = function(name) {
        _current = new MOTION.Timeline();

        if (typeof name != 'undefined')
            _current.setName(name);

        return _current;
    };

    p5.prototype.endTimeline = function() {
        _current.updateTweens();
    };

    _currentKeyframe = null;

    p5.prototype.beginKeyframe = function(name, time) {
        _currentKeyframe = new MOTION.keyFrame();

        if (arguments.length == 1 && typeof arguments[0] != 'undefined') {
            if (typeof arguments[0] == 'number')
                _currentKeyframe.delay(arguments[0]);
            else if (typeof arguments[0] == 'string')
                _currentKeyframe.setName(arguments[0]);
        } else if (arguments.length == 2) {
            _currentKeyframe.setName(name);
            _currentKeyframe.delay(time);
        }

        return _currentKeyframe;
    };

    p5.prototype.endkeyFrame = function() {
        _currentKeyframe.updateTweens();

        if (_current.isTimeline())
            _current.add(_currentKeyframe);

        _currentKeyframe = null;
    };

    // p5.prototype.play = function(m) {
    //     if (m)
    //         m.play();
    //     else
    //         _current.play();
    // };

    // p5.prototype.repeat = function(m) { 
    // if (m)
    //     m.repeat();
    // else
    //     _current.repeat();
    // };

    // p5.prototype.stop = function(m) {
    //     if (m)
    //         m.stop();
    //     else
    //         _current.stop();
    // };

    // p5.prototype.pause = function(m) {
    //     if (m)
    //         m.pause();
    //     else
    //         _current.pause();
    // };

    // p5.prototype.resume = function(m) {
    //     if (m)
    //         m.resume();
    //     else
    //         _current.resume();
    // };

    // p5.prototype.seek = function(m, t) {
    //     if (m)
    //         m.resume(t);
    //     else
    //         _current.resume(arguments[0]);
    // };

    // p5.prototype.onStart = function(func) {
    //     _current.onStart(func);
    //     return this;
    // };

    // p5.prototype.onEnd = function(func) {
    //     _current.onEnd(func);
    //     return this;
    // };

    // p5.prototype.onUpdate = function(func) {
    //     _current.onUpdate(func);
    //     return this;
    // };

    // p5.prototype.onRepeat = function(func) { 
    //     _current.onRepeat(func);
    //     return this;
    // };

    MOTION.prototype.resume = function() {
        this._isPlaying = true;
        this._isSeeking = false;

        this._playTime = (_timeMode == MOTION.SECONDS) ? (millis() - this._playTime * 1000) : (frameCount - this._playTime);

        return this;
    };

    MOTION.prototype.updateTime = function() {
        this._time = ((_timeMode == MOTION.SECONDS) ? ((millis() - this._playTime) / 1000) : (frameCount - this._playTime)) * this._timeScale;

        if (this._isReversing && this._reverseTime !== 0)
            this._time = this._reverseTime - this._time;
    };

    MOTION.ColorProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end);
    };

    MOTION.ColorProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.ColorProperty.prototype.constrctor = MOTION.ColorProperty

    MOTION.ColorProperty.prototype.update = function(position) {
        this._position = position;
        this._object[this._field] = lerpColor(this._begin, this._end, this._position);
    };

    MOTION.VectorProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end);
    };

    MOTION.VectorProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.VectorProperty.prototype.constrctor = MOTION.VectorProperty;

    MOTION.VectorProperty.prototype.update = function(position) {
        this._position = position;
        this._object[this._field] = p5.Vector.lerp(this._begin, this._end, this._position);
    };

    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        var p;

        if (typeof arguments[0] == 'string') {
            var v = this._object[arguments[0]];

            if (typeof v == 'number')
                p = new MOTION.NumberProperty(this._object, arguments[0], arguments[1]);
            else if (v instanceof p5.Color)
                p = new MOTION.ColorProperty(this._object, arguments[0], arguments[1]);
            else if (v instanceof p5.Vector)
                p = new MOTION.VectorProperty(this._object, arguments[0], arguments[1]);
            else
                console.warn('Only numbers, p5.colors and p5.vectors are supported.');
        } else {
            var v = object[property];

            if (typeof v == 'number')
                p = new MOTION.NumberProperty(object, property, end);
            else if (v instanceof p5.Color)
                p = new MOTION.ColorProperty(object, property, end);
            else if (v instanceof p5.Vector)
                p = new MOTION.VectorProperty(object, property, end);
            else
                console.warn('Only numbers, p5.colors and p5.vectors are supported.');
        }

        this._properties.push(p);
        this._propertyMap[p.getField()] = p;

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;
})(MOTION);