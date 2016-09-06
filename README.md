# curvy

#### What is an L-System?
Check out the wikipedia article [here](https://en.wikipedia.org/wiki/L-system). All four of the curves that I implemented are used as examples in the article.

## Overview

To draw a curve, these are the necessary inputs:

  * **state**: Tracks the current state of the curve.
  * **constants**: Interpreted as instructions to perform an action such as drawing or turning. 
  * **variables**: Characters to be replaced based on the rules of production
  * **rules of production**: Describes how to replace variables to systematically create new iterations of the curve. 

### Hilbert Curve

THe Hilbert Curve is a great example:

**variables** : A, B  
**constants** : F + −  
(F == draw, + == turn right 90°, - == turn left by 90°)  
**state** : A  
**production rules** :  
A → − B F + A F A + F B −  
B → + A F − B F B − F A +

Since the initial ```state``` is ```A``` and the rules dictate that ```A → − B F + A F A + F B −```, this is what ```state looks like after the first iteration:

```B F + A F A + F B −```

![hilbert 1](http://res.cloudinary.com/doilr7vvv/image/upload/v1473203040/Screen_Shot_2016-09-06_at_4.01.11_PM_kmpi0p.png "Hilbert First Iteration")

The second iteration will iterate through the previous state and replace all variables again:

```
+-AF+BFB+FA-F-+BF-AFA-FB+F+BF-AFA-FB+-F-AF+BFB+FA-+
```

![hilbert 2](http://res.cloudinary.com/doilr7vvv/image/upload/v1473203219/Screen_Shot_2016-09-06_at_4.01.25_PM_kutt2n.png "Hilbert Second Iteration")

##Implementation

To replace variables, I used regex:

```javascript
setInstructions(parser){
  this.state = this.state.replace(new RegExp(parser, 'gi'), match => {
    return this.rules[match];
  });
}
```

Once the desired state is reached, I match all the constants and follow the instructions appropriately:

```javascript
const matched = this.state.match(new RegExp(parser + "|\\+|-", 'gi'));
```

No vectors were used in this implementation. Points are calculated using trigonometry and then connected to make a line:

```javascript
this.x += Math.round((Math.cos(this.currentAngle) * canvas.height) / offset);
this.y += Math.round((Math.sin(this.currentAngle) * canvas.height) / offset);
```

Finally, setTimeout is used to asynchronously draw using Canvas:

```javascript
if(index < array.length - 1 ){
  let timeOutkey = setTimeout(() => this.async(array, index + 1), delay);
  this.timeoutKeys.push(timeOutkey);
}
```
